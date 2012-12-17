[Holler.js](http://bitpshr.info/holler)
=================

real-time, in-app notifications for web and mobile via the command line. [see it in action](http://bitpshr.info/holler)

##Usage
Sending notifications with Holler is as easy as four steps:

###1. Install a module
Holler is built with <a href="http://nodejs.org/">Node</a> and is distributed as an <a href="http://npmjs.org">npm</a> module. If you don't have Node yet, <a href="http://nodejs.org/">install the hell out of it</a>. After doing so, the <code>npm</code> command should be available via the command line. Then we just install holler:
```console
npm install holler
```

###2. Add a script tag
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

##Going forward
I definitely need to address the following:

* Security: need a way to lock down notifications so that only auth'd users can send them
* Simplicity: need a way to simplify the holler.js command (it's ugly to pass in 3 options)


##License
[WTFPL](http://sam.zoy.org/wtfpl/)
