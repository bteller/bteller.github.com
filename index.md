---
layout: default
title: bradteller.com
---

{% for post in site.posts limit:3 %}
  <div class="post">
    <h3><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h3>
    {{ post.content }}
  </div>
{% endfor %}