---
layout: post
title: "ASP.Net RadioButtonGroupFor() Extension"
---

The other day I wanted to create a group of radio buttons that corresponded to values in an Enum, and there wasn't anything already provided in the framework for doing so, or at least not that I am as of yet aware of. Given that MVC is so extensible though, I was able to hack something together very quickly.

The code below is the extension method itself.

{% highlight csharp %}
public static MvcHtmlString RadioButtonGroupFor<TModel, TValue>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TValue>> expression)
{
    ModelMetadata metaData = ModelMetadata.FromLambdaExpression(expression, helper.ViewData);
    var names = Enum.GetNames(metaData.ModelType);
    System.IO.StringWriter textWriter = new System.IO.StringWriter();
 
    using (System.Web.UI.HtmlTextWriter writer = new System.Web.UI.HtmlTextWriter(textWriter)) 
    {
        foreach (var item in Enum.GetValues(metaData.ModelType)) 
        {
            string enumName = Enum.GetName(metaData.ModelType, item);
            
            if (metaData.Model == item) 
            {
                writer.AddAttribute(HtmlTextWriterAttribute.Checked, "checked");
            }
            
            writer.AddAttribute("enum-name", enumName);
            writer.AddAttribute(HtmlTextWriterAttribute.Name, metaData.PropertyName);
            writer.AddAttribute(HtmlTextWriterAttribute.Value, Convert.ToInt32(item).ToString());
            writer.AddAttribute(HtmlTextWriterAttribute.Type, "radio");
            writer.RenderBeginTag(HtmlTextWriterTag.Input);
            writer.RenderEndTag();
            writer.Write(enumName);
        }
    }
 
    return MvcHtmlString.Create(textWriter.ToString());
}
{% endhighlight %}

And the markup below is a simple use case.

{% highlight html %}
<p>
  <label>Type:</label>
  @Html.RadioButtonGroupFor(m => m.AccountType)
</p>
{% endhighlight %}

Now provided your Model has a property on it of a type for your Enum, then all of those possible values will be written out to the screen, and of course the current value for the object, if there is one, will be selected.