---
layout: post
title: "Html.SelectForEnum Extension for MVC"
---

I was surprised not to find this in the arsenal of extension methods for ASP.Net MVC. The code snippet below is an extension method that you can use to display a select box of options corresponding to a property on your model that is of an Enum type. This way everything happens for you, and if your values ever change you only have to worry about updating the Enum itself, and not everywhere you have it exposed in the UI.

{% highlight vbnet %}
<Extension()> _
Public Function SelectForEnum(Of TModel, TValue)(ByVal helper As HtmlHelper(Of TModel), _
             ByVal expression As Expression(Of Func(Of TModel, TValue)), _
             Optional ByVal includeBlank As Boolean = False) As MvcHtmlString
 
 Dim metaData As ModelMetadata = ModelMetadata.FromLambdaExpression(expression, helper.ViewData)
 Dim names = [Enum].GetNames(metaData.ModelType)
 Dim textWriter As New System.IO.StringWriter()
 Dim fieldName As String = helper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(ExpressionHelper.GetExpressionText(expression))
 
 Using writer As New System.Web.UI.HtmlTextWriter(textWriter)
 
  writer.AddAttribute(HtmlTextWriterAttribute.Id, fieldName)
  writer.AddAttribute(HtmlTextWriterAttribute.Name, fieldName)
  writer.RenderBeginTag(HtmlTextWriterTag.Select)
 
  If includeBlank Then
   writer.AddAttribute(HtmlTextWriterAttribute.Value, "")
   writer.RenderBeginTag(HtmlTextWriterTag.Option)
   writer.RenderEndTag()
  End If
 
  For Each item In [Enum].GetValues(metaData.ModelType)
   Dim enumName As String = [Enum].GetName(metaData.ModelType, item)
 
   If metaData.Model = item Then
    writer.AddAttribute(HtmlTextWriterAttribute.Selected, "selected")
   End If
 
   writer.AddAttribute("enum-name", enumName)
   writer.AddAttribute(HtmlTextWriterAttribute.Value, item)
   writer.RenderBeginTag(HtmlTextWriterTag.Option)
   writer.Write(enumName)
   writer.RenderEndTag()
  Next
 
  writer.RenderEndTag()
 End Using
 
 Return MvcHtmlString.Create(textWriter.ToString())
End Function
```

As always I hope you find this useful.