---
layout: page
permalink: /posts/
title: Posts
tagline: Minimal Mistakes, a Jekyll Theme
tags: [about, Jekyll, theme, responsive]
modified: 9-9-2013
comments: true
image:
  feature: texture-feature-02.jpg
  credit: Texture Lovers
  creditlink: http://texturelovers.com
---

{% for post in site.posts %}
  {% if post.exclude != true %}
  {{ post.date | date_to_string }} - [{{ post.title }}]({{ BASE_PATH }}{{ post.url }})
  {% endif %}
{% endfor %}