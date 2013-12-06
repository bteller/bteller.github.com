---
layout: default
title: bradteller.com
---

{% for post in site.posts limit:3 %}
  <div class="post">
    <h2><a href="{{ BASE_PATH }}{{ post.url }}" class="plain">{{ post.title }}</a></h2>
    {{ post.content }}
  </div>
{% endfor %}