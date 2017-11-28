---
layout: post
title: I hate, hate, hate... Ruby on Rails
published: false
---

Once again I convinced myself I would try to learn this highly regarded framework for the popular Ruby language, and once again I have arrived at the conclusion that I hate, hate, hate, Ruby on Rails. Perhaps hate is a strong word and maybe I don't really hate it, maybe I just don’t understand it. At the end of the day what I really don't get is how every single time I try and consume a gem from the vast ecosystem I run into one with serious compatibility issues.

> Just an FYI, I might not entirely hate Rails. Read to the bottom. My other pain points are still valid though.

The last time I looked at Rails was right after Bundler was released. When I read about it I thought to myself “Now finally, here is something that will make Rails accessible to the masses”, but it didn’t end up being the silver bullet I thought it was. I have to admit that I’m a Windows user and do pretty much everything on Windows based systems, with the exception of my phone, that is an Android device. Now before you start shouting at me about that being the reason I think Rails sucks is because I wasn’t running it on a Linux platform let me tell you that I tried running it there too. Me, being the self respecting geek that I am, downloaded VMWare Player and configured myself a Linux VM running Ubuntu (I couldn’t tell you which version it was now), and fired it up. I was excited, really, thinking that I would finally thoroughly enjoy the Rails experience. Ha ha, nope! I guess I got my hopes up. Every time I tried to follow along with a blog post or other demo I constantly ran into problems with these gem dependencies and some kind of make file issue.

Fast forward to Friday night, I was over on JetBrains website downloading a demo copy of Resharper and while there I checked out some of their other products. Among them was RubyMine, something I had looked at way back when it was in beta and had problems just getting it to load, so I figure what the hell, why don’t I download it and give it, and Rails, another shot. I’m happy to say that this time I was able to get RubyMine to open, and all in all despite my other bad experiences with my trials, the IDE itself seems to be pretty solid now. Everything else seemed to be going just fine but then I decided I wanted to use Haml instead of ERB for my templates, so I updated my Gemfile, added “gem ‘haml’” to it and ran the “bundle” command. Immediately afterwards I run “rails server” and try and pull up the site and I get this.

> Sorry, I misplaced this image. I am trying to recover it.

When I run into something like this it means that I’ve got to spend time searching the web in the hopes of finding a solution. Now, maybe this isn’t Rails fault, but this kind of crap always happens. If it isn’t some nasty command line error message when installing a gem through the command line it is something like this.

So, once again, I’m not interested in Rails. That is my opinion for today at least. I’m pretty stubborn so there is no telling if next weekend I don’t get it in my head that I absolutely have to figure this thing out. In the meantime, I’ve been hearing a lot about Node.js over the past year, and since I already know a bit of JS, I think I’ll give that a try instead. I’m hoping that I have better luck with the node package manager than I have in the past with these gems.

**Now wait just a second here…**

I just hit publish on this post (using Windows Live Writer in case you were wondering) and immediately found this [article](http://railsapps.github.com/openssl-certificate-verify-failed.html). I accidentally ran “gem update” instead of “gem update –system” first so I had to wait a while for the documentation to be installed. In case I ever do decide to do something with Rails, does anybody know of a way to disable documentation installation with gems, or maybe a way to speed it up? Anyway. It turns out I didn’t have to follow all the steps, and in fact the mere act of running “gem update –system” seems to have addressed the problem. I didn’t try and update anything with my rails app test, I just blew it away and created another one, but I was able to get Haml in there and apparently working. Now I wish I had found this article on Friday. Since I didn’t though I think I’ll continue exploring the Node.js world for now and maybe come back to Rails at a later time.

I did run into this other [post](http://www.stormconsultancy.co.uk/blog/development/using-haml-with-rails-3-2/) that indicated you need to add “gem ‘haml-rails’” to your Gemfile if you want Rails generators to use Haml. To test things out I ran a quick scaffold and .html.haml views were in fact generated, and to make me even happier the site actually ran and allowed me to navigate to those views in my browser.

Man, what a love-hate world technology is.