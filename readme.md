# Foursquare test

## Introduction

This is a single page web app to test some of the functionality of the Foursquare API.


## Getting started

Clone the repo into a folder

`git clone https://github.com/rstphnsn/test-foursquare.git test-foursquare && cd test-foursquare`

Install the app’s node dependencies

`npm install`

The default grunt task will do a production build into a `html` folder. This will be the root of the app.

`grunt`

## Developer workflow and running locally

To work locally run `grunt dev` on the root folder.

Do your work in the `dev` folder. Grunt watch tasks will push changes into the HTML folder.

Grunt also provides a local connect server on

`http://localhost:3000`
