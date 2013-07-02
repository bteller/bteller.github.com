---
layout: default
title: blog.bradley-teller.me
---

{% for post in site.posts limit:5 %}
  <div class="post">
    <h3><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h3>
    {{ post.summary }}
  </div>
{% endfor %}