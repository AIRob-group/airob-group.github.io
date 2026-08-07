---
layout: page
permalink: /publications/
title: Publications
description: Publications from the AIRobers.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

<!-- {% include bib_search.liquid %} -->

<div class="publications">

<h2 class="bibliography">Preprints</h2>
{% bibliography -q @*[keywords~=preprint] --group_by none %}

{% bibliography -q @*[keywords!~preprint] --group_by year --group_order descending %}

</div>
