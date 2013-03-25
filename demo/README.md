HTML1337 Boilerplate
=================

HTML1337 Boilerplate is a professional front-end template for building fast, robust, and hella trill web apps or sites. 

This project is the product of many years of iterative development and combined community knowledge...sort of. It imposes a specific development philosophy because [Stylus](http://learnboost.github.com/stylus/), [Modernizr](http://modernizr.com/), and [Bootstrap's CSS](http://twitter.github.com/bootstrap/base-css.html) play great together, and [Grunt](http://gruntjs.com/) manages everything really nicely. It is based on the popular [HTML5 Boilerplate](http://html5boilerplate.com/) but does things a bit differently.

* Source: [https://github.com/bitpshr/html1337-boilerplate](https://github.com/bitpshr/html1337-boilerplate)
* Homepage: [http://bitpshr.info/html1337]()
* Twitter: [@bitpshr](http://twitter.com/bitpshr)

## Quick start
<ol>
	<li>
		Clone the repo
<pre>
git clone https://github.com/bitpshr/html1337-boilerplate.git --recursive
</pre>
	</li>
	<li>
		Install dependencies
<pre>
cd html1337-boilerplate
npm install
</pre>
	</li>
	<li>
		Build Bootstrap's CSS
<pre>
cd vendor/bootstrap && make bootstrap-css && cd ..
</pre>
	</li>
	<li>
		Develop your site, use Grunt to compile Stylus files
<pre>
grunt
</pre>
	</li>
	<li>
		Or just listen for Stylus changes and have it compile automatically
<pre>
grunt watch
</pre>
	</li>
</ol>

## Features

* **Stylus** - CSS3 preprocessing
* **Bootstrap Styles** - base and responsive CSS only, no JS
* **No JQuery** - because ew who wants JQuery
* **Grunt** - concat, minify, live-compile stylus
* **Clean** - keep the file structure simple

Plus all the standard features from the [HTML5 Boilerplate](http://html5boilerplate.com):

* HTML5 ready. Use the new elements with confidence.
* Cross-browser compatible (Chrome, Opera, Safari, Firefox 3.6+, IE6+).
* Designed with progressive enhancement in mind.
* Includes [Normalize.css](http://necolas.github.com/normalize.css/) for CSS
  normalizations and common bug fixes.
* The latest [Modernizr](http://modernizr.com/) build for feature detection.
* IE-specific classes for easier cross-browser control.
* Placeholder CSS Media Queries.
* Useful CSS helpers.
* Apache server caching, compression, and other configuration defaults for
  Grade-A performance.
* Cross-domain Ajax and Flash.
* "Delete-key friendly." Easy to strip out parts you don't need.
* Extensive inline and accompanying documentation.

## Documentation
 * [Modernizr](http://modernizr.com/docs/)
 * [Bootstrap's CSS](http://twitter.github.com/bootstrap/base-css.html)
 * [Stylus](http://learnboost.github.com/stylus/)
 * [Grunt](http://gruntjs.com/getting-started)
 * [Quick Start](https://github.com/bitpshr/html1337-boilerplate#quick-start)
 * [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate/blob/v4.1.0/doc/TOC.md)

## Contributing

Anyone and everyone is welcome to contribute. Just fork and pull and try to follow the same coding style.
