---
layout: page
permalink: /people/
title: People
description: Meet AIRobers!
nav: true
nav_order: 1
people_types: [PHD, MSC, UNDERGRAD, VISITOR, F_PHD, F_MSC, F_UNDERGRAD, F_VISITOR]

profiles:
  # if you want to include more than one profile, just replicate the following block
  # and create one content file for each profile inside _pages/
  - lastname: Assari
    firstname: Ryan
    type: PHD
    intro:

  - lastname: Mao
    firstname: Zining
    type: PHD
    image: ZiningMao.jpg
    intro: Zining received an M.Sc. in Computing Science from our lab at Simon Fraser University in 2025 and a B.Sc. in Computer Science from New York University Shanghai in 2021. He is interested in reinforcement learning and multi-agent systems.

  - lastname: Sun
    firstname: Dingyi
    type: PHD
    image: DingyiSun.jpg
    intro: Dingyi received a B.Eng. in Electrical Engineering and Automation from Huazhong University of Science and Technology in 2018 and an M.S. in Electrical and Computer Engineering (Robotics Track) from the University of Michigan in 2020. He is interested in path planning, machine learning, and robotic perception.

  - lastname: Tan
    firstname: Jiaqi
    type: PHD
    intro: Jiaqi received a B.Eng. in Computer Science and Technology from Shenzhen University in 2019 and an M.Sc. in Computing Science from Simon Fraser University in 2022.
    github: https://github.com/ChristinaTan0704

  - lastname: Tang
    firstname: Jingtao
    type: PHD
    image: JingtaoTang.jpg
    intro: Jingtao received a B.Eng. and an M.S., both in Software Engineering from East China Normal University, in 2018 and 2021, respectively. His research interests include planning and scheduling, multi-agent systems, combinatorial optimization, and machine learning. More information can be found on his <a href="https://reso1.github.io/blog/" target="_blank">homepage</a>.
    webpage: https://reso1.github.io/blog/
    github: https://github.com/reso1
    google_scholar: https://scholar.google.com/citations?user=58xSbH8AAAAJ

  - lastname: Yang
    firstname: Lufan
    type: PHD
    intro:

  - lastname: Yang
    firstname: Yifan
    type: PHD
    intro: Yifan received a B.Eng. and an M.Eng., both in Computer Science and Technology from Harbin Institute of Technology, in 2020 and 2024, respectively.

  - lastname: Samuel
    firstname: Ervin
    type: MSC
    image: ErvinSamuel.jpg
    intro: Ervin received a B.Sc. in Computer Science from National Tsing Hua University in 2022. He is interested in artificial intelligence, particularly reinforcement learning and its application to path planning.
    linkedin: https://www.linkedin.com/in/ervinsamuel/

  - lastname: Chamani
    firstname: Danoosh
    type: F_MSC
    image: DanooshChamani.jpg
    intro: Danoosh received a B.Sc. in Computer Software Engineering from the University of Tehran in 2019 and an M.Sc. in Computing Science from Simon Fraser University in 2022. He is interested in reinforcement learning, machine learning, and robotics.
    linkedin: https://www.linkedin.com/in/danoosh-chamani-64903b207
    positions:
      - Data Scientist at Health Canada

  - lastname: Li
    firstname: Baiyu
    type: F_MSC
    image: BaiyuLi.jpg
    intro: Baiyu received a B.Eng. in Computer Science from Northeastern University (Shenyang, China) in 2020 and an M.Sc. in Computing Science from Simon Fraser University in 2023. He is interested in path planning, multi-agent system, and parallel computing.
    linkedin: https://www.linkedin.com/in/%E6%9F%8F%E9%9B%A8-%E6%9D%8E-07494318b
    positions:
      - Software Engineer at TikTok
      - Software Developer at Fortinet

  - lastname: Xu
    firstname: Qinghong
    type: F_MSC
    image: QinghongXu.jpg
    intro: Qinghong received a B.S. in Computational Mathematics from Xiamen University in 2017 and an M.S. in Computational and Applied Mathematics in 2019 and an M.Sc. in Computing Science in 2022, both from Simon Fraser University. She is interested in multi-agent systems, path planning, and machine learning.
    linkedin: https://www.linkedin.com/in/qinghong-jackie-xu
    positions: Software Development Engineer at Amazon

  - lastname: Zhong
    firstname: Xinyi
    type: F_MSC
    image: XinyiZhong.jpg
    intro: Xinyi received a B.C.S. Honours in Computer Science from Carleton University in 2019 and an M.Sc. in Computing Science from Simon Fraser University in 2021. She is interested in path planning, multi-agent system, and robotics.
    linkedin: https://www.linkedin.com/in/xinyi-zhong-3802b5203
    positions: Software Development Engineer at Amazon

  - lastname: Chen
    firstname: Jialiang
    type: F_UNDERGRAD

  - lastname: Ma
    firstname: Ziyuan
    type: F_UNDERGRAD
    intro: Ziyuan received a B.Sc. in Computing Science from Simon Fraser University in 2020. He was an undergraduate research student in our lab in 2020/2021.
    github: https://github.com/ZiyuanMa

  - lastname: Zheng
    firstname: Xiaoye
    type: F_UNDERGRAD

  - lastname: Luo
    firstname: Yudong
    type: F_VISITOR
    image: YudongLuo.jpg
    intro: Yudong is a Ph.D. student at the University of Waterloo. He received a B.Eng. in Computer Science from Shanghai Jiao Tong University in 2018 and an M.Sc. in Computing Science from Simon Fraser University in 2020. He is interested in reinforcement learning, machine learning, and multi-agent system. Yudong visited our lab for 12 months in 2020/2021. More information can be found on his <a href="http://miyunluo.com" target="_blank">homepage</a>.
    webpage: http://miyunluo.com
    google_scholar: https://scholar.google.com/citations?user=1xPjAucAAAAJ
---

<div class="projects">
  <!-- PHDs -->
  {% assign phd_profiles = page.profiles | where: "type", "PHD" %}
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

{% assign masters_profiles = page.profiles | where: "type", "MSC" %}
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

{% assign undergrad_profiles = page.profiles | where: "type", "UNDERGRAD" %}
{% if undergrad_profiles.size > 0 %}

<h2 class="category text-muted text-left">Undergraduate Students</h2>
<div class="row row-cols-1 row-cols-md-4">
{% for profile in undergrad_profiles %}
{% include people_card.liquid %}
{% endfor %}

  </div>
  {% endif %}

  <!-- Visitors -->

{% assign visitor_profiles = page.profiles | where: "type", "VISITOR" %}
{% if visitor_profiles.size > 0 %}

<h2 class="category text-muted text-left">Visitors</h2>
<div class="row row-cols-1 row-cols-md-4">
{% for profile in visitor_profiles %}
{% include people_card.liquid %}
{% endfor %}

  </div>
  {% endif %}

  <!-- Alumni (all F_* types combined) -->

{% assign alumni_profiles = page.profiles | where_exp: "p", "p.type contains 'F_'" %}
{% if alumni_profiles.size > 0 %}

<h2 class="category text-muted text-left">Alumni</h2>
<div class="row row-cols-1 row-cols-md-4">
{% for profile in alumni_profiles %}
{% include people_card.liquid %}
{% endfor %}

</div>
{% endif %}

<div class="post">
  <article>
  {% for profile in page.profiles %}
    {% if profile.intro %}
      {% include profile.liquid %}
    {% endif %}
  {% endfor %}
  </article>
</div>
