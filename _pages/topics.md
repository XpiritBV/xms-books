---
layout: archive
permalink: /topics/
title: "Books by topic"
---

{% include base_path %}
{% include group-by-array collection=site.books field="topics" %}

{% for topic in group_names %}
  {% assign books = group_items[forloop.index0] %}

  <h2 id="{{ topic | slugify }}" class="archive__subtitle">{{ topic }}</h2>
  {% for post in books %} 
     {% include archive-single.html %}
  {% endfor %}
  <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
{% endfor %} 