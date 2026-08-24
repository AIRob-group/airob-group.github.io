module Jekyll
  module HideCustomBibtex
    def hideCustomBibtex(input)
      input = input.to_s
	    keywords = @context.registers[:site].config['filtered_bibtex_keywords']

	    keywords.each do |keyword|
		    input = input.gsub(/^\s*#{Regexp.escape(keyword.to_s)}\s*=\s*[^\r\n]*\r?\n?/, '')
	    end

      # Clean superscripts in author lists
      input = input.gsub(/^.*\bauthor\b *= *\{.*$\n/) { |line| line.gsub(/[*†‡§¶‖&^]/, '') }

      return input
    end
  end
end

Liquid::Template.register_filter(Jekyll::HideCustomBibtex)
