---
layout: default
title: bradteller.com
---

<div class="col-2of3">
{% for post in site.posts limit:5 %}
  <div class="post">
    <h1><a href="{{ BASE_PATH }}{{ post.url }}" class="plain">{{ post.title }}</a></h1>
    {{ post.content }}
  </div>
{% endfor %}
</div>

<div class="col-1of3">
  <div class="pull-right">

  </div>
</div>