---
layout: post
title: "massive-js issue workaround"
category : lessons
---

Yesterday I posted about an issue using I was having with Node.js communicating with a PostgreSQL database. You can view that [here](http://blog.bradley-teller.me/2012/08/08/postgresql-and-node-js-issue/).

I have since been able to confirm my suspicion that this was a problem inside massive-js. At this point I do not have a true solution for the problem, only a recommendation on what you can do to get around it. Part of the issue is that the initialization query massive-js runs does not distinguish between primary keys and foreign keys. This means that if you have one of each defined for the table it will return both of them, and it is the multiple return values that cause this query to error out. This is also an issue if you define a composite key as your primary key. Since both columns have their own records in information_schema.table_constraints multiple records are again returned into that query.

Until a more permanent fix is identified, or until the update I made locally finds its way into the package, you can update your copy of /node_modules/massive/lib/postgres.js with the code in this [gist](https://gist.github.com/3300228). Beyond that just remember not to use composite primary keys and you should be okay.

I’ve also forked the repo and have some ideas on some extensions, so you might want to follow watch [my fork](https://github.com/bteller/massive-js).