// 0. make sure we have the right number of options
if(process.argv.length!=5){
  console.error("usage: node holler.js [url] [type] [message]");
  process.exit();
}

// 1. define everything
var faye = require('faye'),
    os = require("os"),
    p = process.argv[2],
    type = process.argv[3],
    url = p.substring(p.length-1) == "/" ? p.substring(0,p.length-1) : p;

// 2. validate type
if(type!="log" && type!="success" && type!="error"){
  console.error("uh oh: [type] must be one of [log, success, error]");
  process.exit();
}

// 2. create a regular old client just like a browser would
var client = new faye.Client(url+'/faye');
var notification = client.publish('/holler', {
  type: type,
  message: process.argv[4]
});

// 3. when done, kill this sucker
notification.callback(function() {
  process.exit();
});

// 4. if we error out, kill this still
notification.errback(function(error) {
  alert('uh oh: ' + error.message);
  process.exit();
});