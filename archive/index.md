---
layout: default
title: bradteller.com | Archive
---

# Archive

{% for post in site.posts %}
  {% if post.exclude != true %}
  {{ post.date | date_to_string }} - [{{ post.title }}]({{ BASE_PATH }}{{ post.url }})
  {% endif %}
{% endfor %}