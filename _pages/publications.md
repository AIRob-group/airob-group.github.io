---
layout: page
permalink: /publications/
title: Publications
description: Publications from the AIRobers.
nav: true
nav_order: 2
---

<div class="alert alert-light border rounded-3 mb-4" role="alert">
  <i class="fa-solid fa-graduation-cap me-2"></i>
  View the full list of publications on
  <a href="https://scholar.google.com/citations?user=KJbsVl8AAAAJ" target="_blank" rel="noopener">Google Scholar</a>.
</div>

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

<!-- {% include bib_search.liquid %} -->

<div class="publications">

<h2 class="bibliography">Preprints</h2>
{% bibliography -q @*[keywords~=preprint] --group_by none %}

{% bibliography -q @*[keywords!~preprint && keywords!~thesis] --group_by year --group_order descending %}

<h2 class="bibliography">Thesis</h2>
{% bibliography -q @*[keywords~=thesis] --group_by none %}

</div>
