[Holler.js](http://bitpshr.info/holler)
=================

real-time, in-app notifications and admin for web and mobile via the command line. [see it in action](http://bitpshr.info/holler)

##Usage
Sending notifications with Holler is as easy as four steps:

###1. Install a module
Holler is built with <a href="http://nodejs.org/">Node</a> and is distributed as an <a href="http://npmjs.org">npm</a> module. If you don't have Node yet, <a href="http://nodejs.org/">install the hell out of it</a>. Next we just install holler:
```console
npm install holler -g
```

###2. Include Holler

**New!** Be sure to include the <code>holler.css</code> stylesheet as of v1.9.0:
```html
<link href="PATH/TO/holler/css" rel="stylesheet"/>
```

On the client, Holler can be easily configured to use a specific host and port regardless of the app's http server. This is done via a global <code>hollerConfig</code> object. The <code>holler-client.js</code> script tag should then be included:
```html
<script>
      var hollerConfig = {
        host: "http://127.0.0.1",
        port: "1337"
      }
</script>
<script type="text/javascript" src="PATH/TO/holler-client.min.js"></script>
```

###3. Start a server
The server can be started with an optional port. If no port is specified, it will be defaulted to 1337.
```console 
holler-server 1337
```

###4. Holler stuff
Show notifications to all users currently using your app in real-time using <code>holler.js</code>. Notifications use <a href="http://fabien-d.github.com/alertify.js/">Alertify</a> so they look nice and sexy.
* Log Messages

![](http://bitpshr.info/holler/css/img/log.png)
```console
holler http://yourServerUrl:port log "This is a standard log message."
```

* Success Messages

![](http://bitpshr.info/holler/css/img/success.png)
```console
holler http://yourServerUrl:port success "This is a success message."
```

* Error Messages

![](http://bitpshr.info/holler/css/img/error.png)
```console
holler http://yourServerUrl:port error "This is an error message."
```

* Refresh Page

Now you can use holler to perform admin tasks such as refreshing the current page. Again, all users using the app will have their page refreshed in real-time.
```console
holler http://yourServerUrl:port refresh
```

* Error Messages

You can also redirect the current page to a new url. Again, all users using the app will have their page redirected in real-time.
```console
holler http://yourServerUrl:port redirect http://someOtherUrl
```

##Contributing
Holler.js uses [Grunt](http://gruntjs.com) for file linting and uglification. To start contributing, first make sure [node](http://nodejs.org) is installed. Then:

```bash
git clone https://github.com/bitpshr/holler.git && cd holler
git submodules update --recursive --init
cd vendor/bootstrap && npm install && make bootstrap && cd ..
npm install
# start a server at localhost (e.g. http://127.0.0.1)
holler-server
# view demo.html in a browser
# send a log message
holler http://127.0.0.1:1337 log "foobar"
```

##License
[WTFPL](http://sam.zoy.org/wtfpl/)
