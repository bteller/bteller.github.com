---
layout: post
title: jQuery UI Validation Summary
---

Today I was exploring the ability to return model errors back to the view, and had wanted to replace the standard validation summary panel with a jQuery UI error message widget. Below is an extension method that allows you to do this very easily.

``` vbnet
Public Function PrettyValidationSummary(ByVal helper As HtmlHelper) As String
 
    Dim template As String = "<div class="ui-widget"><div class="ui-state-error ui-corner-all" style="padding:0 .7em"><div><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span><strong>Validation Exceptions:</strong></div><div style="margin-top: 5px;"><ul style="font-weight: normal;">{0}</ul></div></div></div>"
    Dim exceptionList As New StringBuilder
 
    ' Iterate through the exceptions.
    For Each m In helper.ViewData.ModelState
        For Each e In m.Value.Errors
            exceptionList.Append(String.Format("<li>{0}</li>", e.ErrorMessage))
        Next
    Next
 
    ' Make sure we have exceptions before we do anything.
    If exceptionList.Length.Equals(0) Then
        Return String.Empty
    Else
        Return String.Format(template, exceptionList.ToString())
    End If
End Function
```