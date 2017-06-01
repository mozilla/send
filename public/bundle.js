(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const UIWrapper = require('./file').UIWrapper;

let download = () => {

  let xhr = new XMLHttpRequest();
  xhr.open("get", "/assets" + location.pathname.slice(0, -1), true);
  xhr.responseType = "blob";
  
  let listelem = setupUI();
  xhr.addEventListener("progress", updateProgress.bind(null, listelem));
  
  xhr.onload = function(e) {

    // maybe send a separate request before this one to get the filename?

    // maybe render the html itself with the filename, since it's generated server side
    // after a get request with the unique id
    listelem.emit('name', xhr.getResponseHeader("Content-Disposition").match(/filename="(.+)"/)[1]);

    if (this.status == 200) {
      let self = this;
      let blob = new Blob([this.response]);
      let arrayBuffer;
      let fileReader = new FileReader();
      fileReader.onload = function() {
        arrayBuffer = this.result;
        let array = new Uint8Array(arrayBuffer);
        salt = strToIv(location.pathname.slice(10, -1));

        window.crypto.subtle.importKey(
          "jwk",
          {
              kty: "oct",
              k: location.hash.slice(1),
              alg: "A128CBC",
              ext: true,
          },
          {
              name: "AES-CBC",
          },
          true,
          ["encrypt", "decrypt"])
        .then((key) => {  
          return window.crypto.subtle.decrypt(
              {
                name: "AES-CBC",
                iv: salt,
              },
              key,
              array)
        })
        .then((decrypted) => {
          let dataView = new DataView(decrypted);
          let blob = new Blob([dataView]);
          let downloadUrl = URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = downloadUrl;
          a.download = xhr.getResponseHeader("Content-Disposition").match(/filename="(.+)"/)[1];
          document.body.appendChild(a);
          a.click();
        })
        .catch((err) => {
          alert("This link is either invalid or has expired, or the uploader has deleted the file.");
          console.error(err);
        });
      };

      fileReader.readAsArrayBuffer(blob);
    } else {
      alert("This link is either invalid or has expired, or the uploader has deleted the file.")
    }
  };
  xhr.send();
}

window.download = download;

let setupUI = () => {
  let li = document.createElement("li");
  let name = document.createElement("p");
  li.appendChild(name);

  let progress = document.createElement("p");
  li.appendChild(progress);

  document.getElementById("downloaded_files").appendChild(li);

  return new UIWrapper(li, name, null, progress);
}

let ivToStr = (iv) => {
  let hexStr = "";
  for (let i in iv) {
    if (iv[i] < 16) {
      hexStr += "0" + iv[i].toString(16);
    } else {
      hexStr += iv[i].toString(16);
    }
  }
  window.hexStr = hexStr;
  return hexStr;
}

let strToIv = (str) => {
  let iv = new Uint8Array(16);
  for (let i = 0; i < str.length; i += 2) {
    iv[i/2] = parseInt((str.charAt(i) + str.charAt(i + 1)), 16);
  }

  return iv;
}

let updateProgress = (UIelem, e) => {
  if (e.lengthComputable) { 
    let percentComplete = Math.floor((e.loaded / e.total) * 100);
    UIelem.emit('progress', "Progress: " + percentComplete + "%");

    if (percentComplete === 100) {
      let finished = document.createElement("p");
      finished.innerText = "Your download has finished.";
      UIelem.li.appendChild(finished);

      let close = document.createElement("button");
      close.innerText = "Ok";
      close.addEventListener("click", () => {
        document.getElementById("downloaded_files").removeChild(UIelem.li);
      });

      UIelem.li.appendChild(close);
    }
  } 
}
},{"./file":2}],2:[function(require,module,exports){
const EventEmitter = require('events');

class UIWrapper extends EventEmitter {
  constructor(li, name, link, progress) {
    super();
    this.li = li;
    this.name = name;
    this.link = link;
    this.progress = progress;

    this.on("name", (filename) => {
      this.name.innerText = filename;
    });

    this.on("link", (link) => {
      this.link.innerText = link;
      this.link.setAttribute('href', link);
    });

    this.on("progress", (progress) => {
      this.progress.innerText = progress;
      
    });
  }
}

exports.UIWrapper = UIWrapper;
},{"events":5}],3:[function(require,module,exports){
require('./upload');
require('./download');
require('./file');
},{"./download":1,"./file":2,"./upload":4}],4:[function(require,module,exports){
const EventEmitter = require('events');
const UIWrapper = require('./file').UIWrapper;

let onChange = (event) => {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsArrayBuffer(file);

  let random_iv = window.crypto.getRandomValues(new Uint8Array(16));
  let hex = ivToStr(random_iv);

  reader.onload = function(event) {
    let self = this;
    window.crypto.subtle.generateKey({
      name: "AES-CBC",
      length: 128 
    },
    true,
    ["encrypt", "decrypt"])
    .then((key) => {
      let arrayBuffer = self.result;
      let array = new Uint8Array(arrayBuffer);

      window.crypto.subtle.encrypt({
        name: "AES-CBC",
        iv: random_iv },
        key,
        array)
      .then(uploadFile.bind(null, file, hex, key))
      .catch((err) => console.error(err));

    }).catch((err) => console.error(err));   
  };
}

window.onChange = onChange;

let uploadFile = (file, hex, key, encrypted) => {
  let dataView = new DataView(encrypted);
  let blob = new Blob([dataView], { type: file.type });
  
  let fd = new FormData();
  fd.append("fname", file.name);
  fd.append("data", blob, file.name);

  let xhr = new XMLHttpRequest();
  xhr.open("post", "/upload/" + hex, true);

  let listelem = setupUI();
  listelem.emit('name', file.name);
  xhr.upload.addEventListener("progress", updateProgress.bind(null, listelem));

  xhr.onreadystatechange = () => { 
    if (xhr.readyState == XMLHttpRequest.DONE) {
      window.crypto.subtle.exportKey("jwk", key).then((keydata) => {
        localStorage.setItem(hex, xhr.responseText);

        listelem.emit('link', "http://localhost:3000/download/" + hex + "/#" + keydata.k)

        console.log("Share this link with a friend: http://localhost:3000/download/" + hex + "/#" + keydata.k);
      })
    }
  };

  xhr.send(fd);
}

let updateProgress = (UIelem, e) => {
  if (e.lengthComputable) {
    let percentComplete = Math.floor((e.loaded / e.total) * 100);
    UIelem.emit('progress', "Progress: " + percentComplete + "%")

    if (percentComplete === 100) {
      let btn = document.createElement("button");
      btn.innerText = "Delete from server";
      btn.addEventListener("click", () => {
        let segments = UIelem.link.innerText.split("/");
        let key = segments[segments.length - 2];

        let xhr = new XMLHttpRequest();
        xhr.open("post", "/delete/" + key, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        if (!localStorage.getItem(key)) return;

        xhr.send(JSON.stringify({delete_token: localStorage.getItem(key)}));

        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            document.getElementById("uploaded_files").removeChild(UIelem.li);
            localStorage.removeItem(key);
          }

          if (xhr.status === 200) {
            console.log("The file was successfully deleted.");
          } else {
            console.log("The file has expired, or has already been deleted.");
          }
        }
        
      });
      UIelem.li.appendChild(btn);
    }
  }
}

let setupUI = () => {
  let li = document.createElement("li");
  let name = document.createElement("p");
  li.appendChild(name);
  
  let link = document.createElement("a");
  li.appendChild(link);

  let progress = document.createElement("p");
  li.appendChild(progress);

  document.getElementById("uploaded_files").appendChild(li);

  return new UIWrapper(li, name, link, progress);
}

let ivToStr = (iv) => {
  let hexStr = "";
  for (let i in iv) {
    if (iv[i] < 16) {
      hexStr += "0" + iv[i].toString(16);
    } else {
      hexStr += iv[i].toString(16);
    }
  }
  window.hexStr = hexStr;
  return hexStr;
}

let strToIv = (str) => {
  let iv = new Uint8Array(16);
  for (let i = 0; i < str.length; i += 2) {
    iv[i/2] = parseInt((str.charAt(i) + str.charAt(i + 1)), 16);
  }

  return iv;
}
},{"./file":2,"events":5}],5:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJmcm9udGVuZC9zcmMvZG93bmxvYWQuanMiLCJmcm9udGVuZC9zcmMvZmlsZS5qcyIsImZyb250ZW5kL3NyYy9tYWluLmpzIiwiZnJvbnRlbmQvc3JjL3VwbG9hZC5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IFVJV3JhcHBlciA9IHJlcXVpcmUoJy4vZmlsZScpLlVJV3JhcHBlcjtcblxubGV0IGRvd25sb2FkID0gKCkgPT4ge1xuXG4gIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgeGhyLm9wZW4oXCJnZXRcIiwgXCIvYXNzZXRzXCIgKyBsb2NhdGlvbi5wYXRobmFtZS5zbGljZSgwLCAtMSksIHRydWUpO1xuICB4aHIucmVzcG9uc2VUeXBlID0gXCJibG9iXCI7XG4gIFxuICBsZXQgbGlzdGVsZW0gPSBzZXR1cFVJKCk7XG4gIHhoci5hZGRFdmVudExpc3RlbmVyKFwicHJvZ3Jlc3NcIiwgdXBkYXRlUHJvZ3Jlc3MuYmluZChudWxsLCBsaXN0ZWxlbSkpO1xuICBcbiAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcblxuICAgIC8vIG1heWJlIHNlbmQgYSBzZXBhcmF0ZSByZXF1ZXN0IGJlZm9yZSB0aGlzIG9uZSB0byBnZXQgdGhlIGZpbGVuYW1lP1xuXG4gICAgLy8gbWF5YmUgcmVuZGVyIHRoZSBodG1sIGl0c2VsZiB3aXRoIHRoZSBmaWxlbmFtZSwgc2luY2UgaXQncyBnZW5lcmF0ZWQgc2VydmVyIHNpZGVcbiAgICAvLyBhZnRlciBhIGdldCByZXF1ZXN0IHdpdGggdGhlIHVuaXF1ZSBpZFxuICAgIGxpc3RlbGVtLmVtaXQoJ25hbWUnLCB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LURpc3Bvc2l0aW9uXCIpLm1hdGNoKC9maWxlbmFtZT1cIiguKylcIi8pWzFdKTtcblxuICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGxldCBibG9iID0gbmV3IEJsb2IoW3RoaXMucmVzcG9uc2VdKTtcbiAgICAgIGxldCBhcnJheUJ1ZmZlcjtcbiAgICAgIGxldCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGFycmF5QnVmZmVyID0gdGhpcy5yZXN1bHQ7XG4gICAgICAgIGxldCBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKTtcbiAgICAgICAgc2FsdCA9IHN0clRvSXYobG9jYXRpb24ucGF0aG5hbWUuc2xpY2UoMTAsIC0xKSk7XG5cbiAgICAgICAgd2luZG93LmNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KFxuICAgICAgICAgIFwiandrXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBrdHk6IFwib2N0XCIsXG4gICAgICAgICAgICAgIGs6IGxvY2F0aW9uLmhhc2guc2xpY2UoMSksXG4gICAgICAgICAgICAgIGFsZzogXCJBMTI4Q0JDXCIsXG4gICAgICAgICAgICAgIGV4dDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJBRVMtQ0JDXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIFtcImVuY3J5cHRcIiwgXCJkZWNyeXB0XCJdKVxuICAgICAgICAudGhlbigoa2V5KSA9PiB7ICBcbiAgICAgICAgICByZXR1cm4gd2luZG93LmNyeXB0by5zdWJ0bGUuZGVjcnlwdChcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiQUVTLUNCQ1wiLFxuICAgICAgICAgICAgICAgIGl2OiBzYWx0LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgIGFycmF5KVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoZGVjcnlwdGVkKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KGRlY3J5cHRlZCk7XG4gICAgICAgICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbZGF0YVZpZXddKTtcbiAgICAgICAgICBsZXQgZG93bmxvYWRVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICAgIGxldCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgICAgYS5ocmVmID0gZG93bmxvYWRVcmw7XG4gICAgICAgICAgYS5kb3dubG9hZCA9IHhoci5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtRGlzcG9zaXRpb25cIikubWF0Y2goL2ZpbGVuYW1lPVwiKC4rKVwiLylbMV07XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICAgICAgICBhLmNsaWNrKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgYWxlcnQoXCJUaGlzIGxpbmsgaXMgZWl0aGVyIGludmFsaWQgb3IgaGFzIGV4cGlyZWQsIG9yIHRoZSB1cGxvYWRlciBoYXMgZGVsZXRlZCB0aGUgZmlsZS5cIik7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGZpbGVSZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwiVGhpcyBsaW5rIGlzIGVpdGhlciBpbnZhbGlkIG9yIGhhcyBleHBpcmVkLCBvciB0aGUgdXBsb2FkZXIgaGFzIGRlbGV0ZWQgdGhlIGZpbGUuXCIpXG4gICAgfVxuICB9O1xuICB4aHIuc2VuZCgpO1xufVxuXG53aW5kb3cuZG93bmxvYWQgPSBkb3dubG9hZDtcblxubGV0IHNldHVwVUkgPSAoKSA9PiB7XG4gIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbGV0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgbGkuYXBwZW5kQ2hpbGQobmFtZSk7XG5cbiAgbGV0IHByb2dyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxpLmFwcGVuZENoaWxkKHByb2dyZXNzKTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvd25sb2FkZWRfZmlsZXNcIikuYXBwZW5kQ2hpbGQobGkpO1xuXG4gIHJldHVybiBuZXcgVUlXcmFwcGVyKGxpLCBuYW1lLCBudWxsLCBwcm9ncmVzcyk7XG59XG5cbmxldCBpdlRvU3RyID0gKGl2KSA9PiB7XG4gIGxldCBoZXhTdHIgPSBcIlwiO1xuICBmb3IgKGxldCBpIGluIGl2KSB7XG4gICAgaWYgKGl2W2ldIDwgMTYpIHtcbiAgICAgIGhleFN0ciArPSBcIjBcIiArIGl2W2ldLnRvU3RyaW5nKDE2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGV4U3RyICs9IGl2W2ldLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gIH1cbiAgd2luZG93LmhleFN0ciA9IGhleFN0cjtcbiAgcmV0dXJuIGhleFN0cjtcbn1cblxubGV0IHN0clRvSXYgPSAoc3RyKSA9PiB7XG4gIGxldCBpdiA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBpdltpLzJdID0gcGFyc2VJbnQoKHN0ci5jaGFyQXQoaSkgKyBzdHIuY2hhckF0KGkgKyAxKSksIDE2KTtcbiAgfVxuXG4gIHJldHVybiBpdjtcbn1cblxubGV0IHVwZGF0ZVByb2dyZXNzID0gKFVJZWxlbSwgZSkgPT4ge1xuICBpZiAoZS5sZW5ndGhDb21wdXRhYmxlKSB7IFxuICAgIGxldCBwZXJjZW50Q29tcGxldGUgPSBNYXRoLmZsb29yKChlLmxvYWRlZCAvIGUudG90YWwpICogMTAwKTtcbiAgICBVSWVsZW0uZW1pdCgncHJvZ3Jlc3MnLCBcIlByb2dyZXNzOiBcIiArIHBlcmNlbnRDb21wbGV0ZSArIFwiJVwiKTtcblxuICAgIGlmIChwZXJjZW50Q29tcGxldGUgPT09IDEwMCkge1xuICAgICAgbGV0IGZpbmlzaGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBmaW5pc2hlZC5pbm5lclRleHQgPSBcIllvdXIgZG93bmxvYWQgaGFzIGZpbmlzaGVkLlwiO1xuICAgICAgVUllbGVtLmxpLmFwcGVuZENoaWxkKGZpbmlzaGVkKTtcblxuICAgICAgbGV0IGNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGNsb3NlLmlubmVyVGV4dCA9IFwiT2tcIjtcbiAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG93bmxvYWRlZF9maWxlc1wiKS5yZW1vdmVDaGlsZChVSWVsZW0ubGkpO1xuICAgICAgfSk7XG5cbiAgICAgIFVJZWxlbS5saS5hcHBlbmRDaGlsZChjbG9zZSk7XG4gICAgfVxuICB9IFxufSIsImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuXG5jbGFzcyBVSVdyYXBwZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihsaSwgbmFtZSwgbGluaywgcHJvZ3Jlc3MpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubGkgPSBsaTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubGluayA9IGxpbms7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzO1xuXG4gICAgdGhpcy5vbihcIm5hbWVcIiwgKGZpbGVuYW1lKSA9PiB7XG4gICAgICB0aGlzLm5hbWUuaW5uZXJUZXh0ID0gZmlsZW5hbWU7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKFwibGlua1wiLCAobGluaykgPT4ge1xuICAgICAgdGhpcy5saW5rLmlubmVyVGV4dCA9IGxpbms7XG4gICAgICB0aGlzLmxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgbGluayk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKFwicHJvZ3Jlc3NcIiwgKHByb2dyZXNzKSA9PiB7XG4gICAgICB0aGlzLnByb2dyZXNzLmlubmVyVGV4dCA9IHByb2dyZXNzO1xuICAgICAgXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0cy5VSVdyYXBwZXIgPSBVSVdyYXBwZXI7IiwicmVxdWlyZSgnLi91cGxvYWQnKTtcbnJlcXVpcmUoJy4vZG93bmxvYWQnKTtcbnJlcXVpcmUoJy4vZmlsZScpOyIsImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3QgVUlXcmFwcGVyID0gcmVxdWlyZSgnLi9maWxlJykuVUlXcmFwcGVyO1xuXG5sZXQgb25DaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgbGV0IGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF07XG4gIGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XG5cbiAgbGV0IHJhbmRvbV9pdiA9IHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDE2KSk7XG4gIGxldCBoZXggPSBpdlRvU3RyKHJhbmRvbV9pdik7XG5cbiAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHdpbmRvdy5jcnlwdG8uc3VidGxlLmdlbmVyYXRlS2V5KHtcbiAgICAgIG5hbWU6IFwiQUVTLUNCQ1wiLFxuICAgICAgbGVuZ3RoOiAxMjggXG4gICAgfSxcbiAgICB0cnVlLFxuICAgIFtcImVuY3J5cHRcIiwgXCJkZWNyeXB0XCJdKVxuICAgIC50aGVuKChrZXkpID0+IHtcbiAgICAgIGxldCBhcnJheUJ1ZmZlciA9IHNlbGYucmVzdWx0O1xuICAgICAgbGV0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpO1xuXG4gICAgICB3aW5kb3cuY3J5cHRvLnN1YnRsZS5lbmNyeXB0KHtcbiAgICAgICAgbmFtZTogXCJBRVMtQ0JDXCIsXG4gICAgICAgIGl2OiByYW5kb21faXYgfSxcbiAgICAgICAga2V5LFxuICAgICAgICBhcnJheSlcbiAgICAgIC50aGVuKHVwbG9hZEZpbGUuYmluZChudWxsLCBmaWxlLCBoZXgsIGtleSkpXG4gICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcblxuICAgIH0pLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7ICAgXG4gIH07XG59XG5cbndpbmRvdy5vbkNoYW5nZSA9IG9uQ2hhbmdlO1xuXG5sZXQgdXBsb2FkRmlsZSA9IChmaWxlLCBoZXgsIGtleSwgZW5jcnlwdGVkKSA9PiB7XG4gIGxldCBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyhlbmNyeXB0ZWQpO1xuICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtkYXRhVmlld10sIHsgdHlwZTogZmlsZS50eXBlIH0pO1xuICBcbiAgbGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZkLmFwcGVuZChcImZuYW1lXCIsIGZpbGUubmFtZSk7XG4gIGZkLmFwcGVuZChcImRhdGFcIiwgYmxvYiwgZmlsZS5uYW1lKTtcblxuICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKFwicG9zdFwiLCBcIi91cGxvYWQvXCIgKyBoZXgsIHRydWUpO1xuXG4gIGxldCBsaXN0ZWxlbSA9IHNldHVwVUkoKTtcbiAgbGlzdGVsZW0uZW1pdCgnbmFtZScsIGZpbGUubmFtZSk7XG4gIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcInByb2dyZXNzXCIsIHVwZGF0ZVByb2dyZXNzLmJpbmQobnVsbCwgbGlzdGVsZW0pKTtcblxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4geyBcbiAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgd2luZG93LmNyeXB0by5zdWJ0bGUuZXhwb3J0S2V5KFwiandrXCIsIGtleSkudGhlbigoa2V5ZGF0YSkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShoZXgsIHhoci5yZXNwb25zZVRleHQpO1xuXG4gICAgICAgIGxpc3RlbGVtLmVtaXQoJ2xpbmsnLCBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9kb3dubG9hZC9cIiArIGhleCArIFwiLyNcIiArIGtleWRhdGEuaylcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlNoYXJlIHRoaXMgbGluayB3aXRoIGEgZnJpZW5kOiBodHRwOi8vbG9jYWxob3N0OjMwMDAvZG93bmxvYWQvXCIgKyBoZXggKyBcIi8jXCIgKyBrZXlkYXRhLmspO1xuICAgICAgfSlcbiAgICB9XG4gIH07XG5cbiAgeGhyLnNlbmQoZmQpO1xufVxuXG5sZXQgdXBkYXRlUHJvZ3Jlc3MgPSAoVUllbGVtLCBlKSA9PiB7XG4gIGlmIChlLmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICBsZXQgcGVyY2VudENvbXBsZXRlID0gTWF0aC5mbG9vcigoZS5sb2FkZWQgLyBlLnRvdGFsKSAqIDEwMCk7XG4gICAgVUllbGVtLmVtaXQoJ3Byb2dyZXNzJywgXCJQcm9ncmVzczogXCIgKyBwZXJjZW50Q29tcGxldGUgKyBcIiVcIilcblxuICAgIGlmIChwZXJjZW50Q29tcGxldGUgPT09IDEwMCkge1xuICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBidG4uaW5uZXJUZXh0ID0gXCJEZWxldGUgZnJvbSBzZXJ2ZXJcIjtcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsZXQgc2VnbWVudHMgPSBVSWVsZW0ubGluay5pbm5lclRleHQuc3BsaXQoXCIvXCIpO1xuICAgICAgICBsZXQga2V5ID0gc2VnbWVudHNbc2VnbWVudHMubGVuZ3RoIC0gMl07XG5cbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbihcInBvc3RcIiwgXCIvZGVsZXRlL1wiICsga2V5LCB0cnVlKTtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpIHJldHVybjtcblxuICAgICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeSh7ZGVsZXRlX3Rva2VuOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpfSkpO1xuXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZGVkX2ZpbGVzXCIpLnJlbW92ZUNoaWxkKFVJZWxlbS5saSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGZpbGUgd2FzIHN1Y2Nlc3NmdWxseSBkZWxldGVkLlwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgZmlsZSBoYXMgZXhwaXJlZCwgb3IgaGFzIGFscmVhZHkgYmVlbiBkZWxldGVkLlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9KTtcbiAgICAgIFVJZWxlbS5saS5hcHBlbmRDaGlsZChidG4pO1xuICAgIH1cbiAgfVxufVxuXG5sZXQgc2V0dXBVSSA9ICgpID0+IHtcbiAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBsZXQgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsaS5hcHBlbmRDaGlsZChuYW1lKTtcbiAgXG4gIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gIGxpLmFwcGVuZENoaWxkKGxpbmspO1xuXG4gIGxldCBwcm9ncmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsaS5hcHBlbmRDaGlsZChwcm9ncmVzcyk7XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGxvYWRlZF9maWxlc1wiKS5hcHBlbmRDaGlsZChsaSk7XG5cbiAgcmV0dXJuIG5ldyBVSVdyYXBwZXIobGksIG5hbWUsIGxpbmssIHByb2dyZXNzKTtcbn1cblxubGV0IGl2VG9TdHIgPSAoaXYpID0+IHtcbiAgbGV0IGhleFN0ciA9IFwiXCI7XG4gIGZvciAobGV0IGkgaW4gaXYpIHtcbiAgICBpZiAoaXZbaV0gPCAxNikge1xuICAgICAgaGV4U3RyICs9IFwiMFwiICsgaXZbaV0udG9TdHJpbmcoMTYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZXhTdHIgKz0gaXZbaV0udG9TdHJpbmcoMTYpO1xuICAgIH1cbiAgfVxuICB3aW5kb3cuaGV4U3RyID0gaGV4U3RyO1xuICByZXR1cm4gaGV4U3RyO1xufVxuXG5sZXQgc3RyVG9JdiA9IChzdHIpID0+IHtcbiAgbGV0IGl2ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkgKz0gMikge1xuICAgIGl2W2kvMl0gPSBwYXJzZUludCgoc3RyLmNoYXJBdChpKSArIHN0ci5jaGFyQXQoaSArIDEpKSwgMTYpO1xuICB9XG5cbiAgcmV0dXJuIGl2O1xufSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiJdfQ==
