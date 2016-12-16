---
layout: post
title: "ASP.Net MVC 2 Client-Side Validation with jQuery Error"
---

For anybody that finds themselves unsure as to why the hell the Html.ValidationSummary() does not render out the client-side errors when using JQuery to do this, you'll have to look at the MicrosoftMvcJQueryValidation.js file and what you'll find at the bottom is a function for `__MVC_EnableClientValidation`, which is simply wrong.

The code below doesn't allow you to turn on and off the use of a validation summary control, but does physically allow it, and will only use it. Hopefully I'll get to edit this post some other time, but in the meantime, you can use this as a starting point.

``` js
function __MVC_EnableClientValidation(validationContext) {
    // this represents the form containing elements to be validated
    var theForm = $("#" + validationContext.FormId);
 
    var fields = validationContext.Fields;
    var rulesObj = __MVC_CreateValidationOptions(fields);
    var fieldToMessageMappings = __MVC_CreateFieldToValidationMessageMapping(fields);
    var errorMessagesObj = __MVC_CreateErrorMessagesObject(fields);
    var errorContainer = '#' + validationContext.ValidationSummaryId;
 
    var options = {
        errorContainer: errorContainer,
        errorLabelContainer: errorContainer + ' ul',
        wrapper: 'li',
        messages: errorMessagesObj,
        rules: rulesObj
    };
 
    // register callbacks with our AJAX system
    var formElement = document.getElementById(validationContext.FormId);
    var registeredValidatorCallbacks = formElement.validationCallbacks;
    if (!registeredValidatorCallbacks) {
        registeredValidatorCallbacks = [];
        formElement.validationCallbacks = registeredValidatorCallbacks;
    }
    registeredValidatorCallbacks.push(function() {
        theForm.validate();
        return theForm.valid();
    });
 
    theForm.validate(options);
}
```