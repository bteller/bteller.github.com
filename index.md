---
layout: default
title: blog.bradley-teller.me
---

{% for post in site.posts limit:5 %}
  <div class="post">
    <!--<span class="post-date">{{ post.date | date_to_string }}</span>-->
    <h3><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h3>
    {{ post.summary }}
  </div>
{% endfor %}