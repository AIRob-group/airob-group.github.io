---
layout: page
permalink: /people/
title: People
description: Meet AIRobers!
nav: true
nav_order: 1
people_types: [PHD, MSC, UNDERGRAD, VISITOR, F_PHD, F_MSC, F_UNDERGRAD, F_VISITOR]
---

<div class="projects">
  <!-- PHDs -->
  {% assign phd_profiles = site.data.profiles | where: "type", "PHD" %}
  {% if phd_profiles.size > 0 %}
    <h2 class="text-muted text-left">Ph.D. Students</h2>
    <hr>
    <div class="row row-cols-1 row-cols-md-4">
    {% for profile in phd_profiles %}
      {% include people_card.liquid %}
    {% endfor %}
  </div>
  {% endif %}

  <!-- Masters -->

{% assign masters_profiles = site.data.profiles | where: "type", "MSC" %}
{% if masters_profiles.size > 0 %}

<h2 class="text-muted text-left">M.Sc. Students</h2>
<hr>
<div class="row row-cols-1 row-cols-md-4">
{% for profile in masters_profiles %}
{% include people_card.liquid %}
{% endfor %}

  </div>
  {% endif %}

  <!-- Undergrads -->

{% assign undergrad_profiles = site.data.profiles | where: "type", "UNDERGRAD" %}
{% if undergrad_profiles.size > 0 %}

<h2 class="category text-muted text-left">Undergraduate Students</h2>
<div class="row row-cols-1 row-cols-md-4">
{% for profile in undergrad_profiles %}
{% include people_card.liquid %}
{% endfor %}

  </div>
  {% endif %}

  <!-- Visitors -->

{% assign visitor_profiles = site.data.profiles | where: "type", "VISITOR" %}
{% if visitor_profiles.size > 0 %}

<h2 class="category text-muted text-left">Visitors</h2>
<div class="row row-cols-1 row-cols-md-4">
{% for profile in visitor_profiles %}
{% include people_card.liquid %}
{% endfor %}

  </div>
  {% endif %}

  <!-- Alumni (all F_* types combined) -->

{% assign alumni_profiles = site.data.profiles | where_exp: "p", "p.type contains 'F_'" %}
{% if alumni_profiles.size > 0 %}

<h2 class="category text-muted text-left">Alumni</h2>
<div class="row row-cols-1 row-cols-md-4">
{% for profile in alumni_profiles %}
{% include people_card.liquid %}
{% endfor %}

</div>
{% endif %}

<h2 class="category text-muted text-center">Current Members</h2>
<div class="post">
  <article>
  {% for profile in phd_profiles
   | concat: masters_profiles
   | concat: undergrad_profiles
   | concat: visitor_profiles %}
    {% if profile.intro %}
      {% include profile.liquid %}
    {% endif %}
  {% endfor %}
  </article>
</div>

<h2 class="category text-muted text-center">Alumni</h2>
<div class="post">
  <article>
  {% for profile in alumni_profiles %}
    {% if profile.intro %}
      {% include profile.liquid %}
    {% endif %}
  {% endfor %}
  </article>
</div>
