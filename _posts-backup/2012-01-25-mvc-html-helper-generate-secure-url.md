---
layout: post
title: "MVC Html Helper: Generate Secure URL"
---

Have you ever wanted to generate action links to your controller and have them be prefixed with the correct protocol? This was missing from the core set of extensions, at least from my poking around. I'm not sure if I should have taken it's absence as an indication that perhaps there is another approach that should be taken. We've all been told since the beginning that SSL communications should be reserved for times when encrypted communications is an absolute requirement, such as when authenticating a user, displaying a customers banking information, or accepting a payment method. While there is always going to be some level of overhead to these communications, in some situations it may be negligible.

Regardless of that the requirement here is quite clear. I have action methods on my controller that I'm decorating with the RequireHttps attribute. When I create the equivalent of an Html.ActionLink to them I want the protocol to be automatically specified correctly, that way secure pages will be routed of HTTPS. The following is an extension method to help make life a little easier dealing with that requirement.

``` csharp
public static MvcHtmlString GenerateUrl(this HtmlHelper helper, string linkText, string actionName, string controllerName) {
    string protocol = "";

    var c = ControllerBuilder.Current.GetControllerFactory().CreateController(helper.ViewContext.RequestContext, controllerName);
    var cd = new ReflectedControllerDescriptor(c.GetType());
    var ad = cd.FindAction(helper.ViewContext.Controller.ControllerContext, actionName);

    if (ad.GetCustomAttributes(typeof(RequireHttpsAttribute), false).Count() > 0) {
        protocol = "https";
    }

    return helper.ActionLink(linkText, actionName, controllerName, protocol, "", "", null, null);
}
```