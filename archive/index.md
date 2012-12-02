---
layout: default
title: blog.bradley-teller.me | Archive
---

{% for post in site.posts %}
  {{ post.date | date_to_string }} - [{{ post.title }}]({{ BASE_PATH }}{{ post.url }})
{% endfor %}