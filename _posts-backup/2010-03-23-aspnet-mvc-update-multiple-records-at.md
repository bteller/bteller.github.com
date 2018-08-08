---
layout: post
title: "ASP.Net MVC - Update Multiple Records At Once"
---

I had a need to update multiple records in one view, and as always a quick google search brought me to the following two articles:

- [http://haacked.com/archive/2008/10/23/model-binding-to-a-list.aspx](http://haacked.com/archive/2008/10/23/model-binding-to-a-list.aspx)
- [http://weblogs.asp.net/bhaskarghosh/archive/2009/06/18/7128803.aspx](http://weblogs.asp.net/bhaskarghosh/archive/2009/06/18/7128803.aspx)

I was going to include some snippets of code from my implementation, but Blogger doesn't seem to like me putting form elements on my blog the way I have it configured presently, so instead here is a quick list of notes.

- It is not a typo that the input elements are missing an id and instead are using the name attribute as it will not work otherwise.
- The prefix of the element name, which in my test case was "golfCourses", must match the parameter name of the method you are using to handle the post.
- A generic list does work as a parameter type.
- The last thing is that even though other posts would lead you to believe that your would be array indexes in your html input element names can be whatever you want, I have found in my own testing that it does not work as desired unless this is 0 based, meaning your first element must start with 0, and each additional group of elements that define the next object should increment by 1.

Other than that, things really are as simple as they seem. So who needs data grids?