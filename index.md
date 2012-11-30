---
layout: default
title: blog.bradley-teller.me
---
  
## Recent Posts

{% for post in site.posts %}
  <div class="post">
    <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a><br />
    {{ post.summary }}
  </div>
{% endfor %}