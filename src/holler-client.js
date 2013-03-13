// 
// name         : holler-client.js
// description  : Connects to a Faye server & subscribes to notifications
// 

(function (args) {

	// grab host & port off config obj
	var h = window.hollerConfig,
		port = h && h.port ? h.port : "1337",
		host = h && h.host ? h.host : "http://127.0.0.1";

	// quick n dirt dynamic js loader
	var loadScript = function(src, callback) {
		var head = document.getElementsByTagName('head')[0];
		if(head){
			var script = document.createElement('script');  
			script.setAttribute('src',src);
			script.setAttribute('type','text/javascript');
			var loadFunction = function(){
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
					callback(); 
				}
			};
			script.onreadystatechange = loadFunction;
			script.onload = callback;
			head.appendChild(script);
		}
	};

	// load faye js deps
	loadScript( host+":"+port+"/faye/client.js", function() {
		// when done, connect to client
		var client = new Faye.Client( host+":"+port+'/faye', {
			timeout: 120,
			retry: 5
		});
		// subscribe to notification channel
		var subscription = client.subscribe('/holler',function(obj) {
			// redirection support
			switch(obj.type){
				case "redirect":
					window.location = obj.message;
					break;
				case "refresh":
					window.location.reload(true);
					break;
				case "log":
				case "error":
				case "success":
					alertify.log(obj.message, obj.type);
					break;
				default:
					console.error("holler: unrecognized message type!");
					break;
			}
		});
	});

}(this));