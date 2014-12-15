---
layout: post
title: Perceptual Differencing, the Right Way!
---

##What is Perceptual Differencing
Perceptual differencing is a testing technique where browser automation tools take screen captures of the browser contents during test execution. These captures are then compared with baseline captures, and if the capture matches the baseline, the test is deemed to have passed. 

## Why leverage Perceptual Differencing?
One of the main reasons a human being is required to run manual regression tests is to verify the output of the page is visually correct. We can eliminate this need by leveraging browser automation and perceptual differencing. 

Beyond that simple fact, the technique provides a very quick way to verify a lot of your site functionality without having to ```Assert``` your life away. Consider a form that should prevent submission when certain input elements contain invalid data or no data at all. You could create assertions for each of the input elements, and maybe compare that with the DOM level changes made to the browser after a failed submission, or you could take a screen capture and verify the functionality with a single image.

## How do I use Perceptual Differencing effectively?
There are a few things I've noticed trying to build a reliable perceptual differencing tool.
- Full page screen captures are unreliable.
- Not all browsers support full page screen captures.
- The OS can have an effect on how your pages are rendered, causing perceived differences in the output of the page.
- Browsers take time to load and finalize your page, so the initial capture you take might not be what the end user actually sees.
- Differencing tools, like ImageMagick, do basic comparisons such as comparing the dimensions of an image, but also do other comparisions that consider every pixel. Simply comparing the dimensions of an image is not enough.
- Some of your content will always be dynamic, such as maybe a visit counter, and those elements must be excluded from your captures.

### Working around these issues

- Use a browser that supports full page screen captures, like Firefox.
- To make full page captures more reliable, take a number of screen captures for every test, waiting a prescribed amount of time between captures, and only send a capture after 3 of these have matched.
- Make sure the comparision tool you use considers both the dimensions of the image, and the pixel level differences.
- Instead of always taking full page captures, take captures that target specific elements on the page, or others that remove the element completely from your full page capture.

## How do I get started with Perceptual Differencing?
The tools I'm using for our perceptual differencing tool at work are:
- [Selenium](http://docs.seleniumhq.org/)
- ImageMagick
- [Resemble.js](http://huddle.github.io/Resemble.js/)
- SQL Database
- Disk Storage

Our automated test suite captures difference images and sends those to a web site. That site is then responsible for comparing the capture with the baseline. There is then a web app that provides a dashboard and mechanisms for approving and denying differences, and establishing new baselines. 

The code below is a simple extension method to the Selenium ```IWebDriver``` that will take up to 10 captures, waiting 1 second between each capture, and return the one that matched 3 times, or the very last capture taken.

```csharp
public static byte[] Diff(this IWebDriver driver, string name)
{
    MagickImage baseline = null;
    var matches = 0;
    ((IJavaScriptExecutor)driver).ExecuteScript("$('.carousel').carousel('pause');");

    for (var i = 0; i < 10; i++)
    {
        Thread.Sleep(1000);
        var capture = ((ITakesScreenshot)driver).GetScreenshot().AsByteArray;

        if (baseline == null)
        {
            baseline = new MagickImage(capture);
            continue;
        }

        var currentImage = new MagickImage(capture);
        var different = baseline.CompareTo(currentImage) != 0;

        if (!different)
        {
            var result = baseline.Compare(currentImage);
            different = result.MeanErrorPerPixel > 0.0;
        }

        if (!different)
            matches++;

        if (matches > 2)
            break;
    }

    if (matches < 2)
        Console.WriteLine("failed to match");

    return baseline.ToByteArray();
}
```

You might have noticed this line of code. Its purose is to disable the Twitter Bootstrap caurousel which might otherwise cause your captures to differ. If you have other dynamic content elements on the page, you should consider hiding them, or disabling them in this manner.

```csharp
((IJavaScriptExecutor)driver).ExecuteScript("$('.carousel').carousel('pause');");
```

The ability to capture full page screen captures or compare image contents isn't specific to Selenium or ImageMagick. You might choose to use PhantomJS for your browser automation, or to use only Resemble.js to compare your images. Instead of using SQL you might want to push your data into a document data store, or store your image captures directly in your database. The choice is yours.

## Conclusion
Adding perceptual differencing to your existing automated tests is something I would recommend everyone do. With that being said, it doesn't completely eliminate the need for manual testing by a human being. You will always need people to do exploratory testing, to review and approve captures as baselines, to ensure your automation test suite is testing all of what it should test, to approve a build for release, and more of course.

I don't yet have our own internal test tool in a state that I can push it out as an open-source project. Last night I was proving out some consistency issues though, so I had to write a quick stress test app, and that is available on GitHub at https://github.com/bteller/StressPdiff. 
