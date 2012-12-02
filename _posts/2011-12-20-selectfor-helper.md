---
layout: post
title: SelectFor Helper
---

I got a little tired of having to convert things into lists of SelectListItem. Unless I'm missing something with how Microsoft intended you to use Html.DropDownListFor that is. Instead I threw together the following.


{% highlight vbnet %}
<Extension()> _
    Public Function SelectFor(Of TModel, TValue)(ByVal helper As HtmlHelper(Of TModel), _
                                                 ByVal expression As Expression(Of Func(Of TModel, TValue)), _
                                                 ByVal options As IList,
                                                 ByVal textField As String,
                                                 ByVal valueField As String,
                                                 Optional ByVal includeBlank As Boolean = False) As MvcHtmlString
 
        Dim metaData As ModelMetadata = ModelMetadata.FromLambdaExpression(expression, helper.ViewData)
        Dim textWriter As New System.IO.StringWriter()
 
        Using writer As New System.Web.UI.HtmlTextWriter(textWriter)
 
            writer.AddAttribute(HtmlTextWriterAttribute.Id, helper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldId(ExpressionHelper.GetExpressionText(expression)))
            writer.AddAttribute(HtmlTextWriterAttribute.Name, helper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(ExpressionHelper.GetExpressionText(expression)))
            writer.RenderBeginTag(HtmlTextWriterTag.Select)
 
            If includeBlank Then
                writer.AddAttribute(HtmlTextWriterAttribute.Value, "")
                writer.RenderBeginTag(HtmlTextWriterTag.Option)
                writer.RenderEndTag()
            End If
 
            If options IsNot Nothing Then
                For Each item In options
                    If metaData.Model = item.GetType.GetProperty(valueField).GetValue(item, Nothing) Then
                        writer.AddAttribute(HtmlTextWriterAttribute.Selected, "selected")
                    End If
 
                    writer.AddAttribute(HtmlTextWriterAttribute.Value, item.GetType.GetProperty(valueField).GetValue(item, Nothing))
                    writer.RenderBeginTag(HtmlTextWriterTag.Option)
                    writer.Write(item.GetType.GetProperty(textField).GetValue(item, Nothing))
                    writer.RenderEndTag()
                Next
            End If
 
            writer.RenderEndTag()
        End Using
 
        Return MvcHtmlString.Create(textWriter.ToString())
    End Function
{% endhighlight %}