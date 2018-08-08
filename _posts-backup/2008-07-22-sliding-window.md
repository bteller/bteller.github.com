---
layout: post
title: Sliding Window
exclude: true
published: false
---

Along the road to implementing a new system, many decisions need to be made. After the proper application system has been identified, the physical architecture of the environment needs to be planned. This post will not help you identify the number of servers you'll need to implement your Microsoft Project Server environment, so stop reading now if that was what you were looking for. What I hope it will do though, is get you giving some serious thought as to the number of distinct environments you'll want to provision as part of the overall solution implementation.

For your traditional enterprise system, we seem to like to have 3 distinct environments. Call them what you will in your world, be that Development / QA / Production, or Sandbox / Validation / Production, or, well, I'm sure you get the idea. This type of setup is great! Isn't it? I'm going to have to go with, "not really". I mean, if money is simply not an issue, and you have all the connectivity in your server room necessary to create 3 distinct environments that are perfect mirrors of each other then absolutely I encourage you to go for it. But if your boss frowns on spending money foolishly, and you would like to be able to get a few other projects finished this year, then please read on.

Before I dive into this, I want to make one more thing perfectly clear about what this post is not. It is not the be all and end all for all systems. Certainly there will always be extenuating circumstances, special needs and the like, that sometimes drive other decisions to be made. What I am proposing here is simply an alternative to what I have come to understand is the common manner of thought on this topic. I also do not claim to be a proponent of each environment implemented being a perfect mirror of your Production system. I believe that there are times when this makes sense, and other times when it is pure idiocy to do it. If I can stomach it, maybe I'll tackle that topic in another post further down the road.

Okay, I think we've got all the niceties out of the way...

There are some preconditions to being able to approach your systems architecture this way. The primary requirements are:

- Storage Attached Network (SAN)
- Blade server architecture
- Rotating pool of servers

While you may be able to accomplish this with a slightly different setup, the SAN is really what makes the sliding window slide.

## Identifying a Sliding Window Candidate

Not every system implementation is a candidate for the sliding window approach. When you have a system, such as an environment that hosts internally developed applications, it makes sense to have 3 distinct environments. It makes sense because you will constantly be developing software, so the Development environment will constantly be used, as will the QA environment when application changes are deployed there for testing.

The sliding window approach is about conserving resources, which translates to saving money. The fewer servers we have to spin up for an environment, and power day in and day out, the better off we are, provided we can establish a process for temporarily spinning up that environment when it is needed later on.

Consider that organization ABC has purchased Application X. The functionality required by ABC is met 100% by the COTS solution Application X. Application X requires 2 application servers, and one web server, for a grand total of 3 servers in a single environment. Now, if we were to follow the industry standard, we'd end up with 3 distinct environments, and 9 servers in total, which would be on in your data center every day, of every week, of every year. As I mentioned previously though, we aren't making any changes to the core functionality of the application. In fact, once we identify the initial configuration of the application necessary to meet our needs, we'll probably never change it again.

## The Sliding Window Approach

Now that we have identified that the implementation of Application X is a candidate for the sliding window approach, it makes sense to explain exactly what this means. The concept is really quite simple. We know that the only environment we really need to have up is the Production environment, and at most we'll only ever make use of 6 servers at one time, because Development transitions to QA, and then QA transitions to Production. So what we do is allocate storage for 2 environments initially within our SAN. Then we build the Development environment, documenting the process for the configuration as we go. Then we execute the process on the QA environment, confirming that it works. Once we have a tried and true process, we can scrap the Development environment, and build Production based on that process.

At this point, you may even be able to tear down the QA environment. While I would recommend against it, if you do this, I would recommend at a minimum you maintain the LUN on your SAN so that you can quickly bring your QA environment back online.

**<<sigh>>**

Sorry, it is sometimes very painful to put get things out of my head and into a digestable and readable format. For now I am going to speed things along and say this much.

Essentially instead of having 9 servers that you would require at all times, 3 for each environment, you would only need 6. The idea here is that the QA/Validation environment is always up and running, as is Production. When the time comes that you need to upgrade the software, or perform some other change that requires testing, you will create a copy of the LUN's that the QA environment is using, and these will become the new QA environment's disks. Then you will perform the upgrade, documenting what is necessary in a process, and get ready to perform the same in our new QA environment. With the process in place, you then direct the servers, which by now you've probably realized are the same physical servers for both Development and QA, and point them to the QA LUNs we saved off previously, and then execute the upgrade script. With everything tested, we can then upgrade Production, delete the duplicate LUNs that had been created, and which we used for the Development environment. And then once again we are back with only 6 servers running at any time.

The possibility does exist to reduce this further, if you have servers in a pool that you are able to make use of at any point in time. This becomes difficult sometimes though, because one of the things you strive for in your environments is consistency. And if you maintain a server pool to be used for this purpose, it will likely be difficult to ensure the hardware is identical to your systems Production environment.

All in all what I hope I have communicated is an alternative to a standard that could very easily save you tremendous sums of money. I wish the best of luck to you implementing this, or something similar, within your own shops.

As a note, this is an old post from my previously active black, alwaysblackorwhite, which was posted back in April of 2008.