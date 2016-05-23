# Getting started with algolia UI kit

The algolia UI kit is intended to be used with Algolia and Algolia only. You
can create an account on https://www.algolia.com/users/sign_up

## Build the project (real distribution is coming)

 - clone repo : `git clone https://github.com/algolia/algolia-ui-kit.git`
 - move into the repo : `cd algolia-ui-kit`
 - download the dependencies : `npm install`
 - build the minified version : `npm run build:js`

The minified version is in dist/algolia-ui-kit.min.js.

## Bootstrap page

### Starting from scratch

 - Create a new HTML page
 - Import the minified algolia-ui-kit file (see dist/algolia-ui-kit.min.js)

### Starting from an existing project

 - Import the minified algolia-ui-kit file (see dist/algolia-ui-kit.min.js)

## Configure index

In order for the UI-kit to work, you need to provide informations about where
it should fetch the data from (eg. the index you want to use for your application)

This configuration needs to set on the body of the document with those keys :
 - data-algolia-key : the public search key of your index ( see https://www.algolia.com/licensing )
 - data-algolia-app-id : the id of your application ( see https://www.algolia.com/licensing )
 - data-algolia-index : the name of the index you want to target ( see https://www.algolia.com/explorer )

The markup should look like : 

```html
<html>
  ...
  <body data-algolia-app-id="latency"
        data-algolia-key="6be0576ff61c053d5f9a3225e2a90f76"
        data-algolia-index="bestbuy">
  ...
  </body>
</html>
```

## The search results

The results component let you specify how the search results will be displayed.
This is a mandatory component.

### Configuration

This component is configured by creating an empty div element that will hold
the rendered results. 

There are 3 parameters to configure on this component :
 - the number of items to retrieve : data-hits-per-page
 - the template used to render a single result : data-hit-template
 - the template used when there is no results to display : data-no-results-template

How the results are displayed can be customized by using templates (attribute
data-hits-template on the div). This template will receive a single "hit" or
"result" from the list of results retrieved from Algolia. The template is 
specified by giving the css selectors to the element that contains the template.
The template should be written using Hogan implementation of Mustache.

If no results are returned from the query, the content displayed can also be
specified with a template (attribute data-no-results-template). Similarly configured
this template will be rendered once and will receive the whole algolia results
object.

```html
<div class="algolia-magic result-items"
     data-no-results-template="#no-results-template"
     data-hit-template="#hit-template"
     data-hits-per-page="5"></div>
```

### Template

The templating system behind is Hogan.js. It's an implementation of Mustache
built by Twitter.

## Search box

The search box is the main entry for your users in the search. When a key is hit
then the query is updated and sent to the server. The results of this query is
then feed back to the results component.

### Configuration

The search box is defined with a div element with the classes "algolia-magic" and
"search-box". It has option only one option data-placeholder which defines the
value indicating to your user what they should search for.

```html
<div class="algolia-magic-search-box" data-placeholder="Search for products!"></div>
```

## Pagination

Results are returned by page with respect to the hits per page parameter from
the results component. In order to browse those pages, a search needs a pager
or paginator.

### Configuration

The paginator is described by a div element with the classes "algolia-magic" and
"pagination". The only parameter of this component is the number of items "around"
the selected page : **data-padding**.

```html
<div class="algolia-magic pagination" data-padding="3"></div>
```

## Facets

Facets are the attributes we can use to do some filtering over the results. By
default, none are provided on an index. The good news is that they can be easily
added from the administration website https://www.algolia.com/explorer#?tab=display

Once configured those facets can be used to display some filtering components.
Algolia UI kit currently supports :
 - list of facets
 - list of disjunctive facets (advanced facets that can be combine)
 - tab list (used for facetting sub categories)
 - slider (for filtering on numeric values)
