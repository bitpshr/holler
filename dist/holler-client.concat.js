/**
 * alertify
 * An unobtrusive customizable JavaScript notification system
 *
 * @author Fabien Doiron <fabien.doiron@gmail.com>
 * @copyright Fabien Doiron 2012
 * @license MIT <http://opensource.org/licenses/mit-license.php>
 * @link http://fabien-d.github.com/alertify.js/
 * @module alertify
 * @version 0.2.12
 */

/*global define setTimeout*/
(function (global, undefined) {
  "use strict";

  var document = global.document,
      Alertify;

  Alertify = function () {

    var _alertify = {},
        dialogs   = {},
        isopen    = false,
        keys      = { ENTER: 13, ESC: 27, SPACE: 32 },
        queue     = [],
        $, elCallee, elCover, elDialog, elLog;

    /**
     * Markup pieces
     * @type {Object}
     */
    dialogs = {
      buttons : {
        holder : "<nav class=\"alertify-buttons\">{{buttons}}</nav>",
        submit : "<button type=\"submit\" class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\" />{{ok}}</button>",
        ok     : "<a href=\"#\" class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\">{{ok}}</a>",
        cancel : "<a href=\"#\" class=\"alertify-button alertify-button-cancel\" id=\"alertify-cancel\">{{cancel}}</a>"
      },
      input   : "<input type=\"text\" class=\"alertify-text\" id=\"alertify-text\">",
      message : "<p class=\"alertify-message\">{{message}}</p>",
      log     : "<article class=\"alertify-log{{class}}\">{{message}}</article>"
    };

    /**
     * Shorthand for document.getElementById()
     *
     * @param  {String} id    A specific element ID
     * @return {Object}       HTML element
     */
    $ = function (id) {
      return document.getElementById(id);
    };

    /**
     * Alertify private object
     * @type {Object}
     */
    _alertify = {

      /**
       * Labels object
       * @type {Object}
       */
      labels : {
        ok     : "OK",
        cancel : "Cancel"
      },

      /**
       * Delay number
       * @type {Number}
       */
      delay : 5000,

      /**
       * Set the proper button click events
       *
       * @param {Function} fn    [Optional] Callback function
       *
       * @return {undefined}
       */
      addListeners : function (fn) {
        var btnReset  = $("alertify-resetFocus"),
            btnOK     = $("alertify-ok")     || undefined,
            btnCancel = $("alertify-cancel") || undefined,
            input     = $("alertify-text")   || undefined,
            form      = $("alertify-form")   || undefined,
            hasOK     = (typeof btnOK !== "undefined"),
            hasCancel = (typeof btnCancel !== "undefined"),
            hasInput  = (typeof input !== "undefined"),
            val       = "",
            self      = this,
            ok, cancel, common, key, reset;

        // ok event handler
        ok = function (event) {
          if (typeof event.preventDefault !== "undefined") event.preventDefault();
          common(event);
          if (typeof input !== "undefined") val = input.value;
          if (typeof fn === "function") fn(true, val);
        };

        // cancel event handler
        cancel = function (event) {
          if (typeof event.preventDefault !== "undefined") event.preventDefault();
          common(event);
          if (typeof fn === "function") fn(false);
        };

        // common event handler (keyup, ok and cancel)
        common = function (event) {
          self.hide();
          self.unbind(document.body, "keyup", key);
          self.unbind(btnReset, "focus", reset);
          if (hasInput) self.unbind(form, "submit", ok);
          if (hasOK) self.unbind(btnOK, "click", ok);
          if (hasCancel) self.unbind(btnCancel, "click", cancel);
        };

        // keyup handler
        key = function (event) {
          var keyCode = event.keyCode;
          if (keyCode === keys.SPACE && !hasInput) ok(event);
          if (keyCode === keys.ESC && hasCancel) cancel(event);
        };

        // reset focus to first item in the dialog
        reset = function (event) {
          if (hasInput) input.focus();
          else if (hasCancel) btnCancel.focus();
          else btnOK.focus();
        };

        // handle reset focus link
        // this ensures that the keyboard focus does not
        // ever leave the dialog box until an action has
        // been taken
        this.bind(btnReset, "focus", reset);
        // handle OK click
        if (hasOK) this.bind(btnOK, "click", ok);
        // handle Cancel click
        if (hasCancel) this.bind(btnCancel, "click", cancel);
        // listen for keys, Cancel => ESC
        this.bind(document.body, "keyup", key);
        // bind form submit
        if (hasInput) this.bind(form, "submit", ok);
        // set focus on OK button or the input text
        global.setTimeout(function () {
          if (input) {
            input.focus();
            input.select();
          }
          else btnOK.focus();
        }, 50);
      },

      /**
       * Bind events to elements
       *
       * @param  {Object}   el       HTML Object
       * @param  {Event}    event    Event to attach to element
       * @param  {Function} fn       Callback function
       *
       * @return {undefined}
       */
      bind : function (el, event, fn) {
        if (typeof el.addEventListener === "function") {
          el.addEventListener(event, fn, false);
        } else if (el.attachEvent) {
          el.attachEvent("on" + event, fn);
        }
      },

      /**
       * Build the proper message box
       *
       * @param  {Object} item    Current object in the queue
       *
       * @return {String}         An HTML string of the message box
       */
      build : function (item) {
        var html    = "",
            type    = item.type,
            message = item.message,
            css     = item.cssClass || "";

        html += "<div class=\"alertify-dialog\">";

        if (type === "prompt") html += "<form id=\"alertify-form\">";

        html += "<article class=\"alertify-inner\">";
        html += dialogs.message.replace("{{message}}", message);

        if (type === "prompt") html += dialogs.input;

        html += dialogs.buttons.holder;
        html += "</article>";

        if (type === "prompt") html += "</form>";

        html += "<a id=\"alertify-resetFocus\" class=\"alertify-resetFocus\" href=\"#\">Reset Focus</a>";
        html += "</div>";

        switch (type) {
        case "confirm":
          html = html.replace("{{buttons}}", dialogs.buttons.cancel + dialogs.buttons.ok);
          html = html.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
          break;
        case "prompt":
          html = html.replace("{{buttons}}", dialogs.buttons.cancel + dialogs.buttons.submit);
          html = html.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
          break;
        case "alert":
          html = html.replace("{{buttons}}", dialogs.buttons.ok);
          html = html.replace("{{ok}}", this.labels.ok);
          break;
        default:
          break;
        }

        elDialog.className = "alertify alertify-show alertify-" + type + " " + css;
        elCover.className  = "alertify-cover";
        return html;
      },

      /**
       * Close the log messages
       *
       * @param  {Object} elem    HTML Element of log message to close
       * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message
       *
       * @return {undefined}
       */
      close : function (elem, wait) {
        var timer = (wait && !isNaN(wait)) ? +wait : this.delay; // Unary Plus: +"2" === 2
        this.bind(elem, "click", function () {
          elLog.removeChild(elem);
        });
        setTimeout(function () {
          if (typeof elem !== "undefined" && elem.parentNode === elLog) elLog.removeChild(elem);
        }, timer);
      },

      /**
       * Create a dialog box
       *
       * @param  {String}   message        The message passed from the callee
       * @param  {String}   type           Type of dialog to create
       * @param  {Function} fn             [Optional] Callback function
       * @param  {String}   placeholder    [Optional] Default value for prompt input field
       * @param  {String}   cssClass       [Optional] Class(es) to append to dialog box
       *
       * @return {Object}
       */
      dialog : function (message, type, fn, placeholder, cssClass) {
        // set the current active element
        // this allows the keyboard focus to be resetted
        // after the dialog box is closed
        elCallee = document.activeElement;
        // check to ensure the alertify dialog element
        // has been successfully created
        var check = function () {
          if (elDialog && elDialog.scrollTop !== null) return;
          else check();
        };
        // error catching
        if (typeof message !== "string") throw new Error("message must be a string");
        if (typeof type !== "string") throw new Error("type must be a string");
        if (typeof fn !== "undefined" && typeof fn !== "function") throw new Error("fn must be a function");
        // initialize alertify if it hasn't already been done
        if (typeof this.init === "function") {
          this.init();
          check();
        }

        queue.push({ type: type, message: message, callback: fn, placeholder: placeholder, cssClass: cssClass });
        if (!isopen) this.setup();

        return this;
      },

      /**
       * Extend the log method to create custom methods
       *
       * @param  {String} type    Custom method name
       *
       * @return {Function}
       */
      extend : function (type) {
        if (typeof type !== "string") throw new Error("extend method must have exactly one paramter");
        return function (message, wait) {
          this.log(message, type, wait);
          return this;
        };
      },

      /**
       * Hide the dialog and rest to defaults
       *
       * @return {undefined}
       */
      hide : function () {
        // remove reference from queue
        queue.splice(0,1);
        // if items remaining in the queue
        if (queue.length > 0) this.setup();
        else {
          isopen = false;
          elDialog.className = "alertify alertify-hide alertify-hidden";
          elCover.className  = "alertify-cover alertify-hidden";
          // set focus to the last element or body
          // after the dialog is closed
          elCallee.focus();
        }
      },

      /**
       * Initialize Alertify
       * Create the 2 main elements
       *
       * @return {undefined}
       */
      init : function () {
        // ensure legacy browsers support html5 tags
        document.createElement("nav");
        document.createElement("article");
        document.createElement("section");
        // cover
        elCover = document.createElement("div");
        elCover.setAttribute("id", "alertify-cover");
        elCover.className = "alertify-cover alertify-hidden";
        document.body.appendChild(elCover);
        // main element
        elDialog = document.createElement("section");
        elDialog.setAttribute("id", "alertify");
        elDialog.className = "alertify alertify-hidden";
        document.body.appendChild(elDialog);
        // log element
        elLog = document.createElement("section");
        elLog.setAttribute("id", "alertify-logs");
        elLog.className = "alertify-logs";
        document.body.appendChild(elLog);
        // set tabindex attribute on body element
        // this allows script to give it focus
        // after the dialog is closed
        document.body.setAttribute("tabindex", "0");
        // clean up init method
        delete this.init;
      },

      /**
       * Show a new log message box
       *
       * @param  {String} message    The message passed from the callee
       * @param  {String} type       [Optional] Optional type of log message
       * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the log
       *
       * @return {Object}
       */
      log : function (message, type, wait) {
        // check to ensure the alertify dialog element
        // has been successfully created
        var check = function () {
          if (elLog && elLog.scrollTop !== null) return;
          else check();
        };
        // initialize alertify if it hasn't already been done
        if (typeof this.init === "function") {
          this.init();
          check();
        }
        this.notify(message, type, wait);
        return this;
      },

      /**
       * Add new log message
       * If a type is passed, a class name "alertify-log-{type}" will get added.
       * This allows for custom look and feel for various types of notifications.
       *
       * @param  {String} message    The message passed from the callee
       * @param  {String} type       [Optional] Type of log message
       * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding
       *
       * @return {undefined}
       */
      notify : function (message, type, wait) {
        var log = document.createElement("article");
        log.className = "alertify-log" + ((typeof type === "string" && type !== "") ? " alertify-log-" + type : "");
        log.innerHTML = message;
        // prepend child
        elLog.insertBefore(log, elLog.firstChild);
        // triggers the CSS animation
        setTimeout(function() { log.className = log.className + " alertify-log-show"; }, 50);
        this.close(log, wait);
      },

      /**
       * Set properties
       *
       * @param {Object} args     Passing parameters
       *
       * @return {undefined}
       */
      set : function (args) {
        var k;
        // error catching
        if (typeof args !== "object" && args instanceof Array) throw new Error("args must be an object");
        // set parameters
        for (k in args) {
          if (args.hasOwnProperty(k)) {
            this[k] = args[k];
          }
        }
      },

      /**
       * Initiate all the required pieces for the dialog box
       *
       * @return {undefined}
       */
      setup : function () {
        var item = queue[0];

        isopen = true;
        elDialog.innerHTML = this.build(item);
        if (typeof item.placeholder === "string" && item.placeholder !== "") $("alertify-text").value = item.placeholder;
        this.addListeners(item.callback);
      },

      /**
       * Unbind events to elements
       *
       * @param  {Object}   el       HTML Object
       * @param  {Event}    event    Event to detach to element
       * @param  {Function} fn       Callback function
       *
       * @return {undefined}
       */
      unbind : function (el, event, fn) {
        if (typeof el.removeEventListener === "function") {
          el.removeEventListener(event, fn, false);
        } else if (el.detachEvent) {
          el.detachEvent("on" + event, fn);
        }
      }
    };

    return {
      alert   : function (message, fn, cssClass) { _alertify.dialog(message, "alert", fn, "", cssClass); return this; },
      confirm : function (message, fn, cssClass) { _alertify.dialog(message, "confirm", fn, "", cssClass); return this; },
      extend  : _alertify.extend,
      init    : _alertify.init,
      log     : function (message, type, wait) { _alertify.log(message, type, wait); return this; },
      prompt  : function (message, fn, placeholder, cssClass) { _alertify.dialog(message, "prompt", fn, placeholder, cssClass); return this; },
      success : function (message, wait) { _alertify.log(message, "success", wait); return this; },
      error   : function (message, wait) { _alertify.log(message, "error", wait); return this; },
      set     : function (args) { _alertify.set(args); },
      labels  : _alertify.labels
    };
  };

  // AMD and window support
  if (typeof define === "function") {
    define([], function () { return new Alertify(); });
  } else {
    if (typeof global.alertify === "undefined") {
      global.alertify = new Alertify();
    }
  }

}(this));
// 
// name         : holler-client.js
// description  : Connects to a Faye server & subscribes to notifications
// 

(function (args) {

  // grab host & port off config obj
  var h     = window.hollerConfig,
      port  = h && h.port ? h.port : "1337",
      host  = h && h.host ? h.host : "http://127.0.0.1";

  // load alertify css
  // TODO : a better way to do this, this is brittle & ugly
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = ".alertify-show, .alertify-log { -webkit-transition: all 500ms cubic-bezier(0.175, 0.885, 0.320, 1); /* older webkit */ -webkit-transition: all 500ms cubic-bezier(0.175, 0.885, 0.320, 1.275); -moz-transition: all 500ms cubic-bezier(0.175, 0.885, 0.320, 1.275); -ms-transition: all 500ms cubic-bezier(0.175, 0.885, 0.320, 1.275); -o-transition: all 500ms cubic-bezier(0.175, 0.885, 0.320, 1.275); transition: all 500ms cubic-bezier(0.175, 0.885, 0.320, 1.275); /* easeOutBack */ } .alertify-hide { -webkit-transition: all 250ms cubic-bezier(0.600, 0, 0.735, 0.045); /* older webkit */ -webkit-transition: all 250ms cubic-bezier(0.600, -0.280, 0.735, 0.045); -moz-transition: all 250ms cubic-bezier(0.600, -0.280, 0.735, 0.045); -ms-transition: all 250ms cubic-bezier(0.600, -0.280, 0.735, 0.045); -o-transition: all 250ms cubic-bezier(0.600, -0.280, 0.735, 0.045); transition: all 250ms cubic-bezier(0.600, -0.280, 0.735, 0.045); /* easeInBack */ } .alertify-cover { position: fixed; z-index: 99999; top: 0; right: 0; bottom: 0; left: 0; } .alertify { position: fixed; z-index: 99999; top: 50px; left: 50%; width: 550px; margin-left: -275px; } .alertify-hidden { top: -50px; visibility: hidden; } .alertify-logs { position: fixed; z-index: 5000; bottom: 10px; right: 10px; width: 300px; } .alertify-log { display: block; margin-top: 10px; position: relative; right: -300px; } .alertify-log-show { right: 0; } .alertify-dialog { padding: 25px; } .alertify-resetFocus { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; } .alertify-inner { text-align: center; } .alertify-text { margin-bottom: 15px; width: 100%; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; font-size: 100%; } .alertify-buttons { } .alertify-button { /* line-height and font-size for input button */ line-height: 1.5; font-size: 100%; display: inline-block; cursor: pointer; margin-left: 5px; } @media only screen and (max-width: 680px) { .alertify, .alertify-logs { width: 90%; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; } .alertify { left: 5%; margin: 0; } } /** * Default Look and Feel */ .alertify, .alertify-log { font-family: sans-serif; } .alertify { background: #FFF; border: 10px solid #333; /* browsers that don't support rgba */ border: 10px solid rgba(0,0,0,.7); border-radius: 8px; box-shadow: 0 3px 3px rgba(0,0,0,.3); -webkit-background-clip: padding; /* Safari 4? Chrome 6? */ -moz-background-clip: padding; /* Firefox 3.6 */ background-clip: padding-box; /* Firefox 4, Safari 5, Opera 10, IE 9 */ } .alertify-text { border: 1px solid #CCC; padding: 10px; border-radius: 4px; } .alertify-button { border-radius: 4px; color: #FFF; font-weight: bold; padding: 6px 15px; text-decoration: none; text-shadow: 1px 1px 0 rgba(0,0,0,.5); box-shadow: inset 0 1px 0 0 rgba(255,255,255,.5); background-image: -webkit-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0)); background-image: -moz-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0)); background-image: -ms-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0)); background-image: -o-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0)); background-image: linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0)); } .alertify-button:hover, .alertify-button:focus { outline: none; box-shadow: 0 0 15px #2B72D5; background-image: -webkit-linear-gradient(top, rgba(0,0,0,.1), rgba(0,0,0,0)); background-image: -moz-linear-gradient(top, rgba(0,0,0,.1), rgba(0,0,0,0)); background-image: -ms-linear-gradient(top, rgba(0,0,0,.1), rgba(0,0,0,0)); background-image: -o-linear-gradient(top, rgba(0,0,0,.1), rgba(0,0,0,0)); background-image: linear-gradient(top, rgba(0,0,0,.1), rgba(0,0,0,0)); } .alertify-button:active { position: relative; top: 1px; } .alertify-button-cancel { background-color: #FE1A00; border: 1px solid #D83526; } .alertify-button-ok { background-color: #5CB811; border: 1px solid #3B7808; } .alertify-log { background: #1F1F1F; background: rgba(0,0,0,.9); padding: 15px; border-radius: 4px; color: #FFF; text-shadow: -1px -1px 0 rgba(0,0,0,.5); } .alertify-log-error { background: #FE1A00; background: rgba(254,26,0,.9); } .alertify-log-success { background: #5CB811; background: rgba(92,184,17,.9); }";
  document.getElementsByTagName('head')[0].appendChild(style);

  // quick n dirt dynamic js loader
  var loadScript = function(src, callback) {
    var head = document.getElementsByTagName('head')[0];
    if(head){
      var script = document.createElement('script');  
      script.setAttribute('src',src);
      script.setAttribute('type','text/javascript');
      var loadFunction = function(){
        if (this.readyState == 'complete' || this.readyState == 'loaded'){
          callback(); 
        }
      };
      script.onreadystatechange = loadFunction;
      script.onload = callback;
      head.appendChild(script);
    }
  };

  // load faye js deps
  loadScript(host+":"+port+"/faye/client.js", function(){
    // when done, connect to client
    var client = new Faye.Client(host+":"+port+'/faye',{
      timeout: 120,
      retry: 5
    });
    // subscribe to notification channel
    var subscription = client.subscribe('/holler',function(obj) {
      alertify.log(obj.message, obj.type);
    });
  });

}(this));