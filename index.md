---
layout: default
title: bradteller.com
---

{% for post in site.posts limit:3 %}
  <div class="post">
    <h1><a href="{{ BASE_PATH }}{{ post.url }}" class="plain">{{ post.title }}</a></h1>
    {{ post.summary }}
  </div>
  <hr />
{% endfor %}
