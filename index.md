---
layout: default
title: blog.bradley-teller.me
---

I'm going to undergo what will probably be a very slow and painful migration as I move to using Jekyll on GitHub Pages. In the process I'll be giving serious thought to possibly deleting some old posts, and perhaps updating some of the content of posts that I do choose to migrate. 
  
## Recent Posts

{% for post in site.posts %}
  <div class="post">
    <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
  </div>
{% endfor %}

but this isn't updating