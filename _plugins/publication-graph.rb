# Build a deterministic graph with the same BibTeX parser used by jekyll-scholar.
require 'bibtex'
require 'json'
require 'cgi'
require 'set'

module AIRob
  class PublicationGraph
    STOP = Set.new(%w[a an and are as at be been by can for from has have in into is it its of on or our that the their these this to using via we which with paper approach method results problem problems based]).freeze

    def self.clean(value)
      CGI.unescapeHTML(value.to_s.gsub(/<[^>]*>/, ' ').gsub(/\\[a-zA-Z]+/, ' ').delete('{}').gsub(/\s+/, ' ').strip)
    end

    def self.normalized(value)
      clean(value).downcase.gsub(/[^a-z0-9]+/, ' ').strip
    end

    def self.tokens(value)
      normalized(value).split.reject { |word| word.length < 3 || STOP.include?(word) }
    end

    def self.build(entries, themes)
      ids = themes.map { |theme| theme.fetch('id') }
      raise 'Publication themes require unique IDs and an other category' unless ids.uniq == ids && ids.include?('other')

      counts = []
      nodes = entries.sort_by { |entry| entry.key.to_s }.map do |entry|
        title = clean(entry[:title])
        abstract = clean(entry[:abstract])
        title_text = " #{normalized(title)} "
        abstract_text = " #{normalized(abstract)} "
        scores = themes.to_h do |theme|
          score = theme.fetch('phrases', []).sum do |phrase|
            needle = " #{normalized(phrase)} "
            (title_text.include?(needle) ? 3 : 0) + (abstract_text.include?(needle) ? 1 : 0)
          end
          [theme.fetch('id'), score]
        end
        overrides = entry[:themes].to_s.split(',').map(&:strip).reject(&:empty?)
        unknown = overrides - ids
        raise "Unknown themes for #{entry.key}: #{unknown.join(', ')}" unless unknown.empty?

        ranked = scores.sort_by { |id, score| [-score, ids.index(id)] }
        # Keep the best match, then include secondary themes with two pieces of
        # abstract evidence (or one title match) and at least 20% of the top score.
        automatic = ranked.select.with_index do |(_, score), i|
          score.positive? && (i.zero? || (score >= 2 && score >= ranked.first[1] * 0.2))
        end.map(&:first)
        assigned = overrides.empty? ? (automatic.empty? ? ['other'] : automatic) : overrides.uniq
        counts << (tokens(title) * 3 + tokens(abstract)).tally
        { 'id' => entry.key.to_s, 'title' => title, 'year' => entry[:year].to_s,
          'themes' => assigned, 'theme' => assigned.first, 'manual' => !overrides.empty?,
          'has_abstract' => !abstract.empty? }
      end

      # TF-IDF cosine similarity, using title words three times to balance long abstracts.
      frequency = Hash.new(0)
      counts.each { |count| count.each_key { |word| frequency[word] += 1 } }
      vectors = counts.map do |count|
        vector = count.to_h { |word, n| [word, (1 + Math.log(n)) * (1 + Math.log((nodes.size + 1.0) / (frequency[word] + 1)))] }
        norm = Math.sqrt(vector.values.sum { |v| v * v })
        vector.transform_values { |v| norm.zero? ? 0 : v / norm }
      end
      candidates = []
      nodes.each_index do |i|
        ((i + 1)...nodes.size).each do |j|
          similarity = vectors[i].sum { |word, weight| weight * vectors[j].fetch(word, 0) }
          candidates << [i, j, similarity] if similarity >= 0.12
        end
      end
      # Greedy degree cap prevents dense topics from turning into an unreadable mesh.
      degree = Array.new(nodes.size, 0)
      links = candidates.sort_by { |i, j, score| [-score, i, j] }.filter_map do |i, j, score|
        next if degree[i] >= 7 || degree[j] >= 7
        degree[i] += 1
        degree[j] += 1
        { 'source' => nodes[i]['id'], 'target' => nodes[j]['id'], 'weight' => score.round(4) }
      end

      # Soft, overlapping theme anchors; papers with several themes sit between
      # their anchors. Similarity springs and repulsion determine local structure.
      active = themes.select { |theme| nodes.any? { |node| node['themes'].include?(theme['id']) } }
      centers = active.each_with_index.to_h do |theme, i|
        angle = 2 * Math::PI * i / active.size - Math::PI / 2
        [theme['id'], [500 + 250 * Math.cos(angle), 300 + 150 * Math.sin(angle)]]
      end
      random = Random.new(42)
      targets = nodes.map do |node|
        anchors = node['themes'].map { |id| centers.fetch(id) }
        [0, 1].map { |axis| anchors.sum { |anchor| anchor[axis] } / anchors.size }
      end
      positions = targets.map { |target| target.map { |v| v + random.rand(-100.0..100.0) } }
      index = nodes.each_with_index.to_h { |node, i| [node['id'], i] }
      500.times do
        forces = nodes.map.with_index do |node, i|
          center = targets[i]
          [(center[0] - positions[i][0]) * 0.008, (center[1] - positions[i][1]) * 0.008]
        end
        nodes.each_index do |i|
          ((i + 1)...nodes.size).each do |j|
            dx = positions[i][0] - positions[j][0]
            dy = positions[i][1] - positions[j][1]
            d2 = [dx * dx + dy * dy, 1].max
            factor = 1800 / (d2 * Math.sqrt(d2))
            forces[i][0] += dx * factor; forces[i][1] += dy * factor
            forces[j][0] -= dx * factor; forces[j][1] -= dy * factor
          end
        end
        links.each do |link|
          i, j = index.fetch(link['source']), index.fetch(link['target'])
          distance = Math.hypot(positions[j][0] - positions[i][0], positions[j][1] - positions[i][1])
          spring = (distance - 55) / [distance, 1].max * 0.025
          2.times do |axis|
            force = (positions[j][axis] - positions[i][axis]) * spring
            forces[i][axis] += force; forces[j][axis] -= force
          end
        end
        positions.each_with_index do |position, i|
          2.times { |axis| position[axis] += forces[i][axis].clamp(-4, 4) }
          position[0] = position[0].clamp(30, 970)
          position[1] = position[1].clamp(35, 585)
        end
      end
      # Give the network a modest horizontal emphasis, then fit it into the canvas.
      unless positions.empty?
        positions.map! { |x, y| [500 + (x - 500) * 1.15, y] }
        xs, ys = positions.transpose
        scale = [840.0 / [xs.max - xs.min, 1].max, 470.0 / [ys.max - ys.min, 1].max, 2.5].min
        mid_x, mid_y = (xs.min + xs.max) / 2, (ys.min + ys.max) / 2
        positions.map! { |x, y| [500 + (x - mid_x) * scale, 310 + (y - mid_y) * scale] }
      end
      nodes.each_with_index { |node, i| node['x'], node['y'] = positions[i].map { |v| v.round(2) } }
      { 'themes' => themes.map { |theme| theme.reject { |key, _| key == 'phrases' } }, 'nodes' => nodes, 'links' => links }
    end
  end

  class PublicationGraphGenerator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      scholar = site.config.fetch('scholar')
      source = File.join(site.source, scholar.fetch('source').sub(%r{\A/}, ''), scholar.fetch('bibliography'))
      bibliography = BibTeX.open(source)
      data = PublicationGraph.build(bibliography.entries.values, site.data.fetch('publication_themes'))
      page = Jekyll::PageWithoutAFile.new(site, site.source, 'assets/data', 'publication-graph.json')
      page.content = JSON.generate(data)
      page.data.merge!('layout' => nil, 'sitemap' => false)
      site.pages << page
      Jekyll.logger.info 'Publication graph:', "#{data['nodes'].size} papers, #{data['links'].size} connections"
    end
  end
end
