# Run with: bundle exec ruby _scripts/test-publication-graph.rb
require 'jekyll'
require 'yaml'
require_relative '../_plugins/publication-graph'

def check(condition, message)
  raise message unless condition
end

themes = YAML.load_file(File.expand_path('../_data/publication_themes.yml', __dir__))
entries = BibTeX.parse(<<~BIB).entries.values
  @article{mapf, title = {Multi-Agent Path Finding with {Conflict-Based Search}}, year = {2024}}
  @article{coverage, title = {Multi-Robot Coverage}, year = {2025}}
  @article{inspection, title = {Robot Inspection}, year = {2025}}
  @article{allocation, title = {Task Assignment and Coordination}, year = {2025}}
  @article{mapping, title = {Visual Mapping}, abstract = {Sensor fusion for localization}, year = {2025}}
  @article{manual, title = {Visual Mapping}, themes = {motion-planning, coverage-inspection}, year = {2025}}
  @article{unknown, title = {Annual Activity Report}, year = {2023}}
  @article{cross, title = {Reinforcement Learning for Multi-Agent Path Finding and Motion Planning}, year = {2025}}
  @article{broad, title = {Coverage and Motion Planning with Reinforcement Learning for Multi-Agent Path Finding and Task Assignment}, year = {2025}}
  @article{weak, title = {Multi-Agent Path Finding}, abstract = {A reward is reported}, year = {2025}}
BIB
graph = AIRob::PublicationGraph.build(entries, themes)
by_id = graph['nodes'].to_h { |node| [node['id'], node] }
check(by_id['mapf']['theme'] == 'multi-agent-path-finding', 'Title-only classification failed')
check(by_id['mapping']['theme'] == 'other', 'Perception-only papers should fall back to Other Research')
check(by_id['coverage']['themes'] == ['coverage-inspection'], 'Coverage should be separate from task allocation')
check(by_id['inspection']['themes'] == ['coverage-inspection'], 'Inspection should be separate from task allocation')
check(by_id['allocation']['themes'] == ['multi-robot-coordination'], 'Task allocation should remain separate from coverage')
check(by_id['manual']['themes'] == %w[motion-planning coverage-inspection], 'Manual override was not preserved')
check(by_id['unknown']['theme'] == 'other', 'Unmatched papers must not receive an arbitrary theme')
check(by_id['cross']['themes'].size == 3, 'Clearly interdisciplinary papers should receive three themes')
check(by_id['broad']['themes'].size == 5, 'All well-supported themes should be retained without a fixed cap')
check(!by_id['weak']['themes'].include?('learning-and-decision-making'), 'An incidental abstract phrase must not add a secondary theme')
check(graph == AIRob::PublicationGraph.build(entries.reverse, themes), 'Graph must be deterministic regardless of input order')
check(AIRob::PublicationGraph.build([], themes)['nodes'].empty?, 'Empty bibliography failed')
check(AIRob::PublicationGraph.build(entries.first(1), themes)['links'].empty?, 'Single paper should not have edges')

bad = BibTeX.parse('@article{bad, title={Example}, themes={typo}}').entries.values
begin
  AIRob::PublicationGraph.build(bad, themes)
  raise 'Unknown theme override was silently accepted'
rescue RuntimeError => error
  raise unless error.message.start_with?('Unknown themes for bad:')
end

real = BibTeX.open(File.expand_path('../_bibliography/publications.bib', __dir__)).entries.values
graph = AIRob::PublicationGraph.build(real, themes)
ids = graph['nodes'].map { |node| node['id'] }
check(ids.sort == real.map { |entry| entry.key.to_s }.sort, 'Every bibliography entry must appear exactly once')
degree = Hash.new(0)
graph['links'].each do |link|
  check(ids.include?(link['source']) && ids.include?(link['target']), 'Broken edge endpoint')
  check(link['source'] != link['target'], 'Self link')
  degree[link['source']] += 1
  degree[link['target']] += 1
end
check(degree.values.all? { |value| value <= 7 }, 'Too many links per node')
check(graph['nodes'].all? { |node| node['x'].between?(0, 1000) && node['y'].between?(0, 620) }, 'Node outside canvas')
puts "Publication graph checks passed: #{ids.size} papers, #{graph['links'].size} links."
