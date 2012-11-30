---
layout: post
title: PostgreSQL and Node.js Issue
category : lessons
---

Everything was smooth sailing, until now. I tried to setup a mapping table to allow for a many-to-many relationship between tasks and tags in my application and ran into a bit of a snag. From a PostgreSQL perspective everything went just fine. I was allowed to be a good junior DBA and create a composite primary key in my mapping table, and I was also able to define foreign keys for both tagid and taskid. The surprising thing happened when I tried to run my app.

Instead of the server starting up and waiting to serve me I got an error that read “more than one row returned by a subquery used as an expression”. Wow, really helpful. It didn’t help at all that I had made a few changes to my server.js file, so I immediately thought I had something wrong in the code. After some rooting around in there, reverting to the previous version from source control, and general head scratching I was at a loss. Truthfully I am still at a loss. Hopefully I will find a better solution for this at some point, but for now I don’t want this to keep me from making progress and learning more that Node.js has to offer.

What I found was that either massive-js or one of the modules it uses, perhaps node-postgres, appears to have a problem with the constraints I had created on the mapping table. So, to allow me to move forward I just removed the constraints and everything went back to running as expected.

Check back, I’ll provide an actual fix for this once I do finally track one down.

> UPDATE: So far it seems like the problem is with massive-js. In particular it seems to be an issue starting at line 17 of ./lib/postgres.js where the schema is queried.

**WORKAROUND:** Since posting this yesterday I have identified and implemented a workaround for this issue. It’s the next post up, but just in case here is a [link to it](http://blog.bradley-teller.me/2012/08/09/massive-js-issue-workaround/).