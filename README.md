 > Thanks for your interest in this project. We decided that the approach used in `algolia-ui-kit` (html markup based with magic) is not the best suited for our users, therefore we created       [instantsearch.js](https://github.com/algolia/instantsearch.js). Let us know if you like the new project.
 
 
UI Design Kit (Figma)
---------------------------
You've been looking the the UI Design Kit (Figma) and landed on this page, just follow this link to get back on the right track.
https://www.algolia.com/doc/guides/building-search-ui/resources/ui-kit/js/
 
![image](https://user-images.githubusercontent.com/1101220/183423931-57e27b89-26b7-4e56-9590-dafc50e01695.png)




DEPRECATED - Algolia Kite
=============================

Algolia UI-kit Kite is a UI framework to build in minutes a fresh user experience.

This project is NOT FOR PROD and also not maintained anymore :) Have a look at [instantsearch.js](https://github.com/algolia/instantsearch.js) if you want javascript widgets for Algolia.

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
