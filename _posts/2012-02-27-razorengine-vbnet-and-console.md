---
layout: post
title: RazorEngine, VB.Net and a Console Application
---

**This solution only works for v3.0 of RazorEngine.**

Man, ain't it always the case that you can't find good documentation for how to apply something in VB.Net. I'm trying to use the Razor view engine to parse content from the database instead of running it through the view engine, and I want this code to live outside the presentation tier, so in this case a console application. I kept running across this delightfully concise articles that make use of [RazorEngine](http://razorengine.codeplex.com/). Trying to follow the basic example though I kept getting silly little errors about how $ was not defined (a lot of help that was). I then realized if I didn't try and pass in an anonymous object but instead passed in a class instance everything was happy, but that doesn't meet my needs. So, at this point in the night I'm getting a little pissed off.

More time goes by though, and that's why I'm writing this up at 2:15 AM, and finally a few things started to click. If you want to be able to use this RazorEngine with the VB language there is something you'll need to do which is to tell this thing we are trying to use it with VB. I didn't find any great documentation on the site about this so it took some digging, and we finally arrived at this here. This is so painfully simple, and now there is a VB example.

{% highlight vbnet %}
Imports RazorEngine
Imports RazorEngine.Configuration

Module Module1
    Sub Main()
        Dim config = New TemplateServiceConfiguration() With {
          .Language = RazorEngine.Language.VisualBasic
        }
        Dim service = New Templating.TemplateService(config)
        Razor.SetTemplateService(service)

        Dim template = "I declare at this hour @Model.Declaration"
        Dim result = Razor.Parse(Of Object)(template, New With {.Declaration = "SUCCESS!!!!"})

        Console.WriteLine(result)
    End Sub
End Module
{% endhighlight %}