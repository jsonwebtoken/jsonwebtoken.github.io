##JWT.io

<img src="https://cdn.auth0.com/blog/jwtio/jwtio.png"/>

[![Build Status](https://travis-ci.org/jsonwebtoken/jsonwebtoken.github.io.png?branch=master)](https://travis-ci.org/jsonwebtoken/jsonwebtoken.github.io)

### How to build

> Warning: `index.html` in the root folder is a generated file please edit `html/index.html`.

First, install the required dependencies:

```sh
npm install && bower install
```

In order to build (and run) the project execute:

```sh
grunt
```

And then go to http://0.0.0.0:8000.

That will create the css from the less files, minify the javascript and generate `index.html` from `html/index.html`.


### Happy hacking!
