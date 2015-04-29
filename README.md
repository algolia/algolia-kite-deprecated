Algolia Kite (name not final)
=============================

Algolia UI-kit Kite is a UI framework to build in minutes a fresh user experience.

IT IS NOT PRODUCTION READY, you've been warned. Nonetheless you can help us building
it by giving your inputs or even propose a PR :)

What is the algolia UI-kit?
---------------------------

It is UI framework based on a state of the art architecture with ease of use as
the key feature.

It uses DOM tagging features (classes and data attributes) for the configuration
and leverages React for displaying the UI. You are not forced to use React
yourself to use this UI kit. In fact, since the whole glue is made internally,
you should consider using the component raw if you are already using React.

Why should I bother?
--------------------

### Easy

After importing your data in Algolia, you can configure a whole new algolia
search experience in only 3 steps : 
 - add the script at the bottom of your page
 - add components and configurations directly in your HTML with only DOM classes
   and data attributes
 - reload your page!

The kit is auto loaded and will automatically read the configuration.

### Fast

Algolia UI-kit is built around two main components :
 - React, the blazing fast view layer built by Facebook
 - Algolia JS Helper v2, the search state managing layer on top of our raw API

It's not only fast during the execution time, we've made it so it is very easy
to get and deploy.

How does it look?
-----------------

```html
<!DOCTYPE HTML>
<html lang="en">
<head>
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
</head>
<body data-algolia-app-id="latency" data-algolia-key="6be0576ff61c053d5f9a3225e2a90f76" data-algolia-index="bestbuy">
  <div class="container-fluid header">
    <div class="header col-md-12">
      <h1>YOUR search! <span class="powered-by">Powered by Algolia</span></h1>
    </div>
  </div>
  <div class="container-fluid search-container">
    <div class="search col-md-12">
      <div class="algolia-magic search-box" data-placeholder="Search for an awesome product..."></div>
    </div>
    <div class="col-md-12">
      <div class="algolia-magic result-items col-md-12" data-hit-template="#hit-template" data-hits-per-page="5"></div>
      <div class="algolia-magic pagination col-md-12" data-padding="3"></div>
    </div>
  </div>
</body>
</html>
```
