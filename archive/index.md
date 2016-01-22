---
layout: page
title: Archive
---

<ul id="archive-list">
  {% for post in site.posts %}

    {% unless post.next %}
      <h3>{{ post.date | date: '%Y' }}</h3>
    {% else %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
      {% if year != nyear %}
        <h3>{{ post.date | date: '%Y' }}</h3>
      {% endif %}
    {% endunless %}

    <li><a class="archive-link" href="{{ post.url }}">{{ post.title }}</a> <span class="archive-date">| {{ post.date | date:"%B %-d, %Y" }} </a></li>
  {% endfor %}
</ul>
