---
layout: post
title: "The Problem with Open Source Software"
showImage: true
image: "/public/post_images/open-source.png"
imageStyle: "width: 50%;"
---

I really like open source software, but I've ran into some problems recently that really make me wonder why. Just a few days ago I was trying to work through getting Graphite up and running to determine if it was something I could leverage, and I ran into all sorts of problems.

## Why Can't Things Just Work?
I've always been one of those people that felt if you wanted true "Geek Cred" then you had to know Linux. Well, I've tried. And tried. And tried. Things will go really well for a few days, and then everything will just fall apart on me. Maybe I'm just a spoiled geek that lives in Windows happy-land.

### Dependencies
Why can't they just install by default? I know it's possible, because NPM does this really well. You have a `package.json` file where you define the dependencies your package or app has on other packages, specify the version of it you need, and then just run `npm install -d` and everything you need comes down and just works. Sure, every once in a while you run into something that just doesn't work on Windows, but I expect that, and can generally find something that does the exact same thing, and is perfectly happy running on Windows.

Now, move over to your Linux box and try to install something without running into a problem. Guess what... you can't! First, you can't even rely on the package manager. Which package manager? I don't know... there are so damn many of them. I know when running Ubuntu 12.04 if I run `sudo apt-get install nodejs`, I get a very old version of it that doesn't even come packaged with NPM. So that makes sense. Yes, I know you can register a PPA with your apt-get registry and run the command again to pull down the latest, but what I don't get is why the hell that is even necessary.

The first problem, there isn't a central package manager used across every Linux distribution. Even better than that, you have several options per distribution. Using Ubuntu you can try and use their own package manager, or apt-get, or aptitude, or probably 20 others I don't even know about. Clear as mud that is!

When all else fails though you can download the source, generate a make file, and `make install`, and surely that will work. Well, not in my experience, and not when I tried to install Graphite. I got errors. As luck would have it there was some "check-dependencies.py" script that I could run, after figuring out how to install python and python-dev on my box, and then I found a list of 10 or so dependencies it had. Well, I'm having a hard enough time getting this to install, and had a hard time installing python, why the hell would I install these just to uncover even more dependencies? Nope, I'm sorry. NOT GONNA HAPPEN!

### It Works Sometimes
The first time I used Vagrant I was seriously impressed. Creating a VM and provisioning it from a shell script or using Puppet or Chef was such an incredible idea. You want to refresh your environment, just run `vagrant destroy` and then `vagrant up`, and there you go. I barely scratched the surface of what Vagrant to do before I started running into problems on my Windows 8.1 box. What I started to see is that running `vagrant up` was launching the baseline VM, and no the VM I was expecting it to. So I quit on it the first day it happened, and shut down my computer. A few days later I give it another shot and up comes the correct VM. WTF?

Fast forward to this weekend and I'm running up'ing and halt'ing VMs left and right from different projects, and everything is going great, until it doesn't. I run `vagrant up` and up comes the wrong VM. I only had one defined in this Vagrantfile, so where the hell did this one come from? Turns out it was the baseline image that was downloaded when I first setup Vagrant. Wow, I didn't expect that! I googled, found out others had similar problems, didn't see a resolution, and promptly shook my head in dissappointment.

At this point I have a few options... I can keep digging around and hopefully run across a solution, dig into the source code and try to fix it, or wipe my hands of it all and go do something else. What did I do? I uninstalled Vagrant, deleted the other manual Linux VM I had created, and then breathed a sigh of relief.  

### Documentation
The last point I want to make is about documentation. You can tell that I like NPM, but that doesn't mean everything out there is well documented. Quite often you have to dig to find out how to use the packages out there.

When trying to get Graphite up and running I ran into another documentation issue. Some of the documentation was great. In fact, it was great, all the way up until the <a href="http://graphite.readthedocs.org/en/latest/config-webapp.html">setting up the webapp</a> step. Ha! Need I say more?

## It Doesn't Have to Be This Way. Really!
I can't speak for the Linux community. At the end of the day I have to admit that I'm completely lost there. I really don't have any interest in losing any more weekends trying to accomplish what seems like a super simple thing, on Linux. I've tried, put the time in, and have failed pretty much every time. I appreciate the security of it, but with such a lack of standards and standardization on tooling, I just don't see how anybody that doesn't live and breath that system being able to do anything with it.

What am I taking away from all of this? I still love the open source movement, and will still publish as much as I can out to GitHub and BitBucket for others to take, use, and make their own. When I do this though I'm going to make sure the documentation is there, and that it is accurate. You are doing your users a disservice otherwise.
