// make sure we have only one arg
if(process.argv.length>3){
  console.error("usage: node holler-server.js [port]");
  process.exit();
}

// define our ish
var port = process.argv.length==3 ? process.argv[2] : 1337,
    http = require('http'),
    faye = require('faye');

// start listening
var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});
bayeux.listen(port);

// let everyone know we're ready
console.log("ready to holler on port "+port);