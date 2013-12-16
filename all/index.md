---
layout: default
title: bradteller.com | All
---

# All

This is for my use only and will list all of the posts, without excluding those I don't much care for.

{% for post in site.posts %}
  {{ post.date | date_to_string }} - [{{ post.title }}]({{ BASE_PATH }}{{ post.url }})
{% endfor %}