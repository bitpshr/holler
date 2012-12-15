// 0. make sure we have only one arg
if(process.argv.length>3){
  console.error("usage: node holler-server.js [port]");
  process.exit();
}

// 1. define our ish
var port = process.argv.length==3 ? process.argv[2] : 1337,
    http = require('http'),
    faye = require('faye');

// 2. start listening
var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});
bayeux.listen(port);

// 3. let everyone know we're ready
console.log("ready to holler on port "+port);