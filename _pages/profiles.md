---
layout: page
permalink: /people/
title: People
description: Meet the AIRobers!
nav: true
nav_order: 1

PI:
  lastname: Ma
  firstname: Hang
  image: HangMa.jpg
  webpage: https://www2.cs.sfu.ca/~hangma/
  google_scholar: https://scholar.google.com/user=KJbsVl8AAAAJ
---

<div class="projects">
  <div class="row row-cols-1 row-cols-md-4 align-items-start">
    <div class="col-md-3 text-center mb-1">
      <a href="https://www2.cs.sfu.ca/~hangma/">
        <div class="card h-100 hoverable">
        {% assign profile_image_path = page.PI.image | prepend: 'assets/img/profiles/' %}
        {%
          include figure.liquid
          loading="eager"
          path=profile_image_path
          sizes="150px"
          width="75%"
          alt="profile thumbnail"
         class="card-img-top"
        %}
        <div class="row ml-1 mr-1 p-0 justify-content-center">
          {% assign profile=page.PI %}
          {% include profile_social.liquid %}
        </div>
        </div>
      </a>
    </div>
    <div class="col-md-9">
      <h2>Hang Ma</h2>
      <p class="mb-1">
        Director, AIRob Lab<br>
        Assistant Professor, School of Computing Science
      </p>
      <p class="mb-1">
      <i class="fa-solid fa-map-marker-alt fa-fw"></i> <a href="https://roomfinder.sfu.ca/apps/sfuroomfinder_web/?q=TASC18223">TASC1 8223</a>, Simon Fraser University<br>
      <i class="fa-solid fa-envelope fa-fw"></i> hangma at sfu dot ca<br>
      <br>
      </p>
      <p>
        Hang Ma is an Assistant Professor in the School of Computing Science at Simon Fraser University,
        where he leads the Autonomous Intelligent Robotics Lab (AIRob Lab). His research focuses on
        automated planning and multi-robot coordination, spanning both AI and robotics communities.
      </p>
    </div>
  </div>
  
  <!-- PHDs -->

{% assign phd_profiles = site.data.profiles | where: "type", "PHD" %}
{% if phd_profiles.size > 0 %}

<h2 class="category text-muted text-left">Ph.D. Students</h2>
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

<h2 class="category text-muted text-left">M.Sc. Students</h2>
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
