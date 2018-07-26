!(function(e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var i = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function(e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (r.t = function(e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var i in e)
          r.d(
            n,
            i,
            function(t) {
              return e[t];
            }.bind(null, i)
          );
      return n;
    }),
    (r.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return r.d(t, 'a', t), t;
    }),
    (r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = '/'),
    r((r.s = 3));
})({
  '+qE3': function(e, t) {
    function r() {
      (this._events = this._events || {}),
        (this._maxListeners = this._maxListeners || void 0);
    }
    function n(e) {
      return 'function' == typeof e;
    }
    function i(e) {
      return 'object' == typeof e && null !== e;
    }
    function o(e) {
      return void 0 === e;
    }
    (e.exports = r),
      (r.EventEmitter = r),
      (r.prototype._events = void 0),
      (r.prototype._maxListeners = void 0),
      (r.defaultMaxListeners = 10),
      (r.prototype.setMaxListeners = function(e) {
        if (
          !(function(e) {
            return 'number' == typeof e;
          })(e) ||
          e < 0 ||
          isNaN(e)
        )
          throw TypeError('n must be a positive number');
        return (this._maxListeners = e), this;
      }),
      (r.prototype.emit = function(e) {
        var t, r, s, a, u, c;
        if (
          (this._events || (this._events = {}),
          'error' === e &&
            (!this._events.error ||
              (i(this._events.error) && !this._events.error.length)))
        ) {
          if ((t = arguments[1]) instanceof Error) throw t;
          var f = new Error('Uncaught, unspecified "error" event. (' + t + ')');
          throw ((f.context = t), f);
        }
        if (o((r = this._events[e]))) return !1;
        if (n(r))
          switch (arguments.length) {
            case 1:
              r.call(this);
              break;
            case 2:
              r.call(this, arguments[1]);
              break;
            case 3:
              r.call(this, arguments[1], arguments[2]);
              break;
            default:
              (a = Array.prototype.slice.call(arguments, 1)), r.apply(this, a);
          }
        else if (i(r))
          for (
            a = Array.prototype.slice.call(arguments, 1),
              s = (c = r.slice()).length,
              u = 0;
            u < s;
            u++
          )
            c[u].apply(this, a);
        return !0;
      }),
      (r.prototype.addListener = function(e, t) {
        var s;
        if (!n(t)) throw TypeError('listener must be a function');
        return (
          this._events || (this._events = {}),
          this._events.newListener &&
            this.emit('newListener', e, n(t.listener) ? t.listener : t),
          this._events[e]
            ? i(this._events[e])
              ? this._events[e].push(t)
              : (this._events[e] = [this._events[e], t])
            : (this._events[e] = t),
          i(this._events[e]) &&
            !this._events[e].warned &&
            (s = o(this._maxListeners)
              ? r.defaultMaxListeners
              : this._maxListeners) &&
            s > 0 &&
            this._events[e].length > s &&
            ((this._events[e].warned = !0),
            console.error(
              '(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.',
              this._events[e].length
            ),
            'function' == typeof console.trace && console.trace()),
          this
        );
      }),
      (r.prototype.on = r.prototype.addListener),
      (r.prototype.once = function(e, t) {
        if (!n(t)) throw TypeError('listener must be a function');
        var r = !1;
        function i() {
          this.removeListener(e, i), r || ((r = !0), t.apply(this, arguments));
        }
        return (i.listener = t), this.on(e, i), this;
      }),
      (r.prototype.removeListener = function(e, t) {
        var r, o, s, a;
        if (!n(t)) throw TypeError('listener must be a function');
        if (!this._events || !this._events[e]) return this;
        if (
          ((s = (r = this._events[e]).length),
          (o = -1),
          r === t || (n(r.listener) && r.listener === t))
        )
          delete this._events[e],
            this._events.removeListener && this.emit('removeListener', e, t);
        else if (i(r)) {
          for (a = s; a-- > 0; )
            if (r[a] === t || (r[a].listener && r[a].listener === t)) {
              o = a;
              break;
            }
          if (o < 0) return this;
          1 === r.length
            ? ((r.length = 0), delete this._events[e])
            : r.splice(o, 1),
            this._events.removeListener && this.emit('removeListener', e, t);
        }
        return this;
      }),
      (r.prototype.removeAllListeners = function(e) {
        var t, r;
        if (!this._events) return this;
        if (!this._events.removeListener)
          return (
            0 === arguments.length
              ? (this._events = {})
              : this._events[e] && delete this._events[e],
            this
          );
        if (0 === arguments.length) {
          for (t in this._events)
            'removeListener' !== t && this.removeAllListeners(t);
          return (
            this.removeAllListeners('removeListener'), (this._events = {}), this
          );
        }
        if (n((r = this._events[e]))) this.removeListener(e, r);
        else if (r) for (; r.length; ) this.removeListener(e, r[r.length - 1]);
        return delete this._events[e], this;
      }),
      (r.prototype.listeners = function(e) {
        return this._events && this._events[e]
          ? n(this._events[e])
            ? [this._events[e]]
            : this._events[e].slice()
          : [];
      }),
      (r.prototype.listenerCount = function(e) {
        if (this._events) {
          var t = this._events[e];
          if (n(t)) return 1;
          if (t) return t.length;
        }
        return 0;
      }),
      (r.listenerCount = function(e, t) {
        return e.listenerCount(t);
      });
  },
  '0QlW': function(e, t, r) {
    'use strict';
    e.exports = function(e, t, r) {
      var n,
        i = e.length;
      if (!(t >= i || 0 === r)) {
        var o = i - (r = t + r > i ? i - t : r);
        for (n = t; n < o; ++n) e[n] = e[n + r];
        e.length = o;
      }
    };
  },
  '1YUc': function(e, t) {
    var r = 'undefined' != typeof window;
    function n(e) {
      (this.hasWindow = e),
        (this.hasIdle = this.hasWindow && window.requestIdleCallback),
        (this.method = this.hasIdle
          ? window.requestIdleCallback.bind(window)
          : this.setTimeout),
        (this.scheduled = !1),
        (this.queue = []);
    }
    (n.prototype.push = function(e) {
      this.queue.push(e), this.schedule();
    }),
      (n.prototype.schedule = function() {
        if (!this.scheduled) {
          this.scheduled = !0;
          var e = this;
          this.method(function(t) {
            for (; e.queue.length && t.timeRemaining() > 0; )
              e.queue.shift()(t);
            (e.scheduled = !1), e.queue.length && e.schedule();
          });
        }
      }),
      (n.prototype.setTimeout = function(e) {
        setTimeout(e, 0, {
          timeRemaining: function() {
            return 1;
          }
        });
      }),
      (e.exports = function() {
        var e;
        return (
          r
            ? (window._nanoScheduler || (window._nanoScheduler = new n(!0)),
              (e = window._nanoScheduler))
            : (e = new n()),
          e
        );
      });
  },
  3: function(e, t, r) {
    e.exports = r('mY2b');
  },
  '49sm': function(e, t) {
    var r = {}.toString;
    e.exports =
      Array.isArray ||
      function(e) {
        return '[object Array]' == r.call(e);
      };
  },
  '7+Rn': function(e, t, r) {
    var n = r('0QlW'),
      i = r('v2Ej');
    function o(e) {
      if (!(this instanceof o)) return new o(e);
      (this._name = e || 'nanobus'),
        (this._starListeners = []),
        (this._listeners = {});
    }
    (e.exports = o),
      (o.prototype.emit = function(e) {
        for (var t = [], r = 1, n = arguments.length; r < n; r++)
          t.push(arguments[r]);
        var o = i(this._name + "('" + e + "')"),
          s = this._listeners[e];
        return (
          s && s.length > 0 && this._emit(this._listeners[e], t),
          this._starListeners.length > 0 &&
            this._emit(this._starListeners, e, t, o.uuid),
          o(),
          this
        );
      }),
      (o.prototype.on = o.prototype.addListener = function(e, t) {
        return (
          '*' === e
            ? this._starListeners.push(t)
            : (this._listeners[e] || (this._listeners[e] = []),
              this._listeners[e].push(t)),
          this
        );
      }),
      (o.prototype.prependListener = function(e, t) {
        return (
          '*' === e
            ? this._starListeners.unshift(t)
            : (this._listeners[e] || (this._listeners[e] = []),
              this._listeners[e].unshift(t)),
          this
        );
      }),
      (o.prototype.once = function(e, t) {
        var r = this;
        return (
          this.on(e, function n() {
            t.apply(r, arguments);
            r.removeListener(e, n);
          }),
          this
        );
      }),
      (o.prototype.prependOnceListener = function(e, t) {
        var r = this;
        return (
          this.prependListener(e, function n() {
            t.apply(r, arguments);
            r.removeListener(e, n);
          }),
          this
        );
      }),
      (o.prototype.removeListener = function(e, t) {
        return '*' === e
          ? ((this._starListeners = this._starListeners.slice()),
            r(this._starListeners, t))
          : (void 0 !== this._listeners[e] &&
              (this._listeners[e] = this._listeners[e].slice()),
            r(this._listeners[e], t));
        function r(e, t) {
          if (e) {
            var r = e.indexOf(t);
            return -1 !== r ? (n(e, r, 1), !0) : void 0;
          }
        }
      }),
      (o.prototype.removeAllListeners = function(e) {
        return (
          e
            ? '*' === e
              ? (this._starListeners = [])
              : (this._listeners[e] = [])
            : ((this._starListeners = []), (this._listeners = {})),
          this
        );
      }),
      (o.prototype.listeners = function(e) {
        var t = '*' !== e ? this._listeners[e] : this._starListeners,
          r = [];
        if (t) for (var n = t.length, i = 0; i < n; i++) r.push(t[i]);
        return r;
      }),
      (o.prototype._emit = function(e, t, r, n) {
        if (void 0 !== e && 0 !== e.length) {
          void 0 === r && ((r = t), (t = null)),
            t && (r = void 0 !== n ? [t].concat(r, n) : [t].concat(r));
          for (var i = e.length, o = 0; o < i; o++) {
            var s = e[o];
            s.apply(s, r);
          }
        }
      });
  },
  'E/0c': function(e, t, r) {
    'use strict';
    var n = r('hwFe'),
      i = r('U82S'),
      o = (function() {
        return function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e))
            return (function(e, t) {
              var r = [],
                n = !0,
                i = !1,
                o = void 0;
              try {
                for (
                  var s, a = e[Symbol.iterator]();
                  !(n = (s = a.next()).done) &&
                  (r.push(s.value), !t || r.length !== t);
                  n = !0
                );
              } catch (e) {
                (i = !0), (o = e);
              } finally {
                try {
                  !n && a.return && a.return();
                } finally {
                  if (i) throw o;
                }
              }
              return r;
            })(e, t);
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance'
          );
        };
      })(),
      s = (function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
    function a(e, t) {
      if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function');
    }
    var u = (function() {
        function e() {
          a(this, e), (this.items = new Map());
        }
        return (
          s(e, [
            {
              key: 'getItem',
              value: function(e) {
                return this.items.get(e);
              }
            },
            {
              key: 'setItem',
              value: function(e, t) {
                return this.items.set(e, t);
              }
            },
            {
              key: 'removeItem',
              value: function(e) {
                return this.items.delete(e);
              }
            },
            {
              key: 'key',
              value: function(e) {
                return this.items.keys()[e];
              }
            },
            {
              key: 'length',
              get: function() {
                return this.items.size;
              }
            }
          ]),
          e
        );
      })(),
      c = (function() {
        function e() {
          a(this, e);
          try {
            this.engine = localStorage || new u();
          } catch (e) {
            this.engine = new u();
          }
          this._files = this.loadFiles();
        }
        return (
          s(e, [
            {
              key: 'loadFiles',
              value: function() {
                for (var e = [], t = 0; t < this.engine.length; t++) {
                  var r = this.engine.key(t);
                  if (Object(n.isFile)(r))
                    try {
                      var o = new i.a(JSON.parse(this.engine.getItem(r)));
                      o.id || (o.id = o.fileId), e.push(o);
                    } catch (e) {
                      this.engine.removeItem(r);
                    }
                }
                return e.sort(function(e, t) {
                  return e.createdAt - t.createdAt;
                });
              }
            },
            {
              key: 'enroll',
              value: function(e, t) {
                var r = this.enrolled;
                r.find(function(t) {
                  var r = o(t, 2),
                    n = r[0];
                  r[1];
                  return n === e;
                }) ||
                  (r.push([e, t]),
                  this.engine.setItem('experiments', JSON.stringify(r)));
              }
            },
            {
              key: 'getFileById',
              value: function(e) {
                return this._files.find(function(t) {
                  return t.id === e;
                });
              }
            },
            {
              key: 'get',
              value: function(e) {
                return this.engine.getItem(e);
              }
            },
            {
              key: 'remove',
              value: function(e) {
                Object(n.isFile)(e) &&
                  this._files.splice(
                    this._files.findIndex(function(t) {
                      return t.id === e;
                    }),
                    1
                  ),
                  this.engine.removeItem(e);
              }
            },
            {
              key: 'addFile',
              value: function(e) {
                this._files.push(e), this.writeFile(e);
              }
            },
            {
              key: 'writeFile',
              value: function(e) {
                this.engine.setItem(e.id, JSON.stringify(e));
              }
            },
            {
              key: 'writeFiles',
              value: function() {
                var e = this;
                this._files.forEach(function(t) {
                  return e.writeFile(t);
                });
              }
            },
            {
              key: 'totalDownloads',
              get: function() {
                return Number(this.engine.getItem('totalDownloads'));
              },
              set: function(e) {
                this.engine.setItem('totalDownloads', e);
              }
            },
            {
              key: 'totalUploads',
              get: function() {
                return Number(this.engine.getItem('totalUploads'));
              },
              set: function(e) {
                this.engine.setItem('totalUploads', e);
              }
            },
            {
              key: 'referrer',
              get: function() {
                return this.engine.getItem('referrer');
              },
              set: function(e) {
                this.engine.setItem('referrer', e);
              }
            },
            {
              key: 'enrolled',
              get: function() {
                return JSON.parse(this.engine.getItem('experiments') || '[]');
              }
            },
            {
              key: 'files',
              get: function() {
                return this._files;
              }
            }
          ]),
          e
        );
      })();
    t.a = new c();
  },
  H7XF: function(e, t, r) {
    'use strict';
    (t.byteLength = function(e) {
      var t = c(e),
        r = t[0],
        n = t[1];
      return (3 * (r + n)) / 4 - n;
    }),
      (t.toByteArray = function(e) {
        for (
          var t,
            r = c(e),
            n = r[0],
            s = r[1],
            a = new o(
              (function(e, t, r) {
                return (3 * (t + r)) / 4 - r;
              })(0, n, s)
            ),
            u = 0,
            f = s > 0 ? n - 4 : n,
            h = 0;
          h < f;
          h += 4
        )
          (t =
            (i[e.charCodeAt(h)] << 18) |
            (i[e.charCodeAt(h + 1)] << 12) |
            (i[e.charCodeAt(h + 2)] << 6) |
            i[e.charCodeAt(h + 3)]),
            (a[u++] = (t >> 16) & 255),
            (a[u++] = (t >> 8) & 255),
            (a[u++] = 255 & t);
        2 === s &&
          ((t = (i[e.charCodeAt(h)] << 2) | (i[e.charCodeAt(h + 1)] >> 4)),
          (a[u++] = 255 & t));
        1 === s &&
          ((t =
            (i[e.charCodeAt(h)] << 10) |
            (i[e.charCodeAt(h + 1)] << 4) |
            (i[e.charCodeAt(h + 2)] >> 2)),
          (a[u++] = (t >> 8) & 255),
          (a[u++] = 255 & t));
        return a;
      }),
      (t.fromByteArray = function(e) {
        for (
          var t, r = e.length, i = r % 3, o = [], s = 0, a = r - i;
          s < a;
          s += 16383
        )
          o.push(h(e, s, s + 16383 > a ? a : s + 16383));
        1 === i
          ? ((t = e[r - 1]), o.push(n[t >> 2] + n[(t << 4) & 63] + '=='))
          : 2 === i &&
            ((t = (e[r - 2] << 8) + e[r - 1]),
            o.push(n[t >> 10] + n[(t >> 4) & 63] + n[(t << 2) & 63] + '='));
        return o.join('');
      });
    for (
      var n = [],
        i = [],
        o = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
        s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        a = 0,
        u = s.length;
      a < u;
      ++a
    )
      (n[a] = s[a]), (i[s.charCodeAt(a)] = a);
    function c(e) {
      var t = e.length;
      if (t % 4 > 0)
        throw new Error('Invalid string. Length must be a multiple of 4');
      var r = e.indexOf('=');
      return -1 === r && (r = t), [r, r === t ? 0 : 4 - (r % 4)];
    }
    function f(e) {
      return (
        n[(e >> 18) & 63] + n[(e >> 12) & 63] + n[(e >> 6) & 63] + n[63 & e]
      );
    }
    function h(e, t, r) {
      for (var n, i = [], o = t; o < r; o += 3)
        (n =
          ((e[o] << 16) & 16711680) +
          ((e[o + 1] << 8) & 65280) +
          (255 & e[o + 2])),
          i.push(f(n));
      return i.join('');
    }
    (i['-'.charCodeAt(0)] = 62), (i['_'.charCodeAt(0)] = 63);
  },
  Ip04: function(e, t, r) {
    'use strict';
    var n = (function() {
        return function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e))
            return (function(e, t) {
              var r = [],
                n = !0,
                i = !1,
                o = void 0;
              try {
                for (
                  var s, a = e[Symbol.iterator]();
                  !(n = (s = a.next()).done) &&
                  (r.push(s.value), !t || r.length !== t);
                  n = !0
                );
              } catch (e) {
                (i = !0), (o = e);
              } finally {
                try {
                  !n && a.return && a.return();
                } finally {
                  if (i) throw o;
                }
              }
              return r;
            })(e, t);
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance'
          );
        };
      })(),
      i = (function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
    var o = {
        FIREFOX_NIGHTLY: 'nightly',
        FIREFOX_AURORA: 'release',
        FIREFOX_ESR: 'esr',
        FIREFOX_ESR_NEXT: 'esr',
        LATEST_FIREFOX_DEVEL_VERSION: 'developer',
        LATEST_FIREFOX_RELEASED_DEVEL_VERSION: 'developer',
        LATEST_FIREFOX_VERSION: 'release'
      },
      s = (function() {
        function e(t) {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, e),
            (this.debug = t.debug || !1),
            this.setOptions(t),
            this.getChannel(),
            this.validateOptions();
        }
        return (
          i(e, [
            {
              key: 'getChannel',
              value: function() {
                var e = this;
                'undefined' != typeof browser &&
                  Promise.all([
                    this.getProductDetails(),
                    browser.runtime.getBrowserInfo()
                  ]).then(function(t) {
                    var r = n(t, 2),
                      i = r[0],
                      o = r[1],
                      s = e.getVersionMap(i);
                    e.cd20 = e.getChannelConstant(o, s);
                  });
              }
            },
            {
              key: 'getVersionMap',
              value: function(e) {
                var t = {};
                return (
                  Object.entries(e).forEach(function(e) {
                    var r = n(e, 2),
                      i = r[0],
                      o = r[1];
                    o && o.length && (t[o] = i);
                    var s = o.match(/^[^a-z]+/);
                    s && s.length && (t[s[0]] = i);
                  }),
                  t
                );
              }
            },
            {
              key: 'getChannelConstant',
              value: function(e, t) {
                return e &&
                  e.version &&
                  t.hasOwnProperty(e.version) &&
                  o.hasOwnProperty(t[e.version])
                  ? o[t[e.version]]
                  : 'other';
              }
            },
            {
              key: 'getProductDetails',
              value: function() {
                return new Promise(function(e, t) {
                  var r = new window.XMLHttpRequest();
                  r.open(
                    'GET',
                    'https://product-details.mozilla.org/1.0/firefox_versions.json'
                  ),
                    (r.onload = function() {
                      r.status < 400
                        ? e(JSON.parse(r.response))
                        : t(r, Error(r.statusText));
                    }),
                    (r.onerror = function() {
                      t(r, Error('Network Error'));
                    }),
                    r.send();
                });
              }
            },
            {
              key: 'setOptions',
              value: function(t) {
                var r = this,
                  i = Object.assign({}, e.defaultOptions, t);
                Object.entries(i).forEach(function(e) {
                  var t = n(e, 2),
                    i = t[0],
                    o = t[1];
                  return (r[i] = o);
                });
              }
            },
            {
              key: 'validateOptions',
              value: function(t) {
                var r = this,
                  n = e.requiredOptions.reduce(function(e, t) {
                    return r.hasOwnProperty(t) || e.push(t), e;
                  }, []);
                n.length &&
                  console.error('Missing required options: ' + n.join(', '));
              }
            },
            {
              key: 'makeUUID',
              value: function() {
                return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
                  /[018]/g,
                  function(e) {
                    return (
                      e ^
                      (crypto.getRandomValues(new Uint8Array(1))[0] &
                        (15 >> (e / 4)))
                    ).toString(16);
                  }
                );
              }
            },
            {
              key: 'getCID',
              value: function() {
                var e = window.localStorage.getItem('testpilot_ga__cid');
                return (
                  e ||
                    ((e = this.makeUUID()),
                    window.localStorage.setItem('testpilot_ga__cid', e)),
                  e
                );
              }
            },
            {
              key: 'getParams',
              value: function(e) {
                var t = this.an,
                  r = this.aid,
                  n = this.aiid,
                  i = this.aip,
                  o = this.av,
                  s = this.cd19,
                  a = this.cd20,
                  u = this.ds,
                  c = this.t,
                  f = this.tid,
                  h = this.uid,
                  l = this.v,
                  p = this.xid,
                  d = this.xvar,
                  y = Object.assign(
                    {
                      an: t,
                      aid: r,
                      aiid: n,
                      aip: i,
                      av: o,
                      cd19: s,
                      cd20: a,
                      ds: u,
                      t: c,
                      tid: f,
                      uid: h,
                      v: l,
                      xid: p,
                      xvar: d
                    },
                    {
                      cid: this.getCID(),
                      ua: navigator.userAgent,
                      ul: navigator.language,
                      z: Date.now()
                    },
                    e
                  );
                return (
                  Object.keys(y).forEach(function(e) {
                    null === y[e] && delete y[e];
                  }),
                  y
                );
              }
            },
            {
              key: 'serializeObject',
              value: function(e) {
                return Object.keys(e)
                  .reduce(function(t, r) {
                    return (
                      t.push(
                        encodeURIComponent(r) + '=' + encodeURIComponent(e[r])
                      ),
                      t
                    );
                  }, [])
                  .join('&');
              }
            },
            {
              key: 'requestBody',
              value: function(e) {
                var t = this.getParams(e);
                return { allParams: t, requestBody: this.serializeObject(t) };
              }
            },
            {
              key: 'requestURI',
              value: function() {
                return (
                  'https://www.google-analytics.com/' +
                  (this.debug ? 'debug/' : '') +
                  'collect'
                );
              }
            },
            {
              key: 'sendEvent',
              value: function(e, t) {
                var r =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : {},
                  n = Object.assign({ ec: e, ea: t }, r),
                  i = this.requestBody(n),
                  o = i.allParams,
                  s = i.requestBody;
                console.log("Sending '" + e + "' '" + t + "':", o);
                var a = this.requestURI();
                return new Promise(function(e, t) {
                  if ('1' === navigator.doNotTrack)
                    t('Metrics not sent due to DNT.');
                  else {
                    var r = new window.XMLHttpRequest();
                    r.open('POST', a),
                      (r.onload = function() {
                        r.status < 400
                          ? e(r)
                          : t('Request error: ' + r.statusText);
                      }),
                      (r.onerror = function() {
                        t('Request error: ' + r.status);
                      }),
                      r.send(s);
                  }
                });
              }
            }
          ]),
          e
        );
      })();
    (s.defaultOptions = {
      aid: null,
      aiid: 'testpilot',
      aip: '1',
      av: null,
      cd19: 'dev',
      cd20: null,
      ds: 'addon',
      t: 'event',
      uid: null,
      v: '1',
      xid: null,
      xvar: null
    }),
      (s.requiredOptions = ['an', 'ds', 'tid']);
    var a = s,
      u = r('E/0c');
    r.d(t, 'g', function() {
      return p;
    }),
      r.d(t, 'f', function() {
        return O;
      }),
      r.d(t, 'j', function() {
        return g;
      }),
      r.d(t, 'b', function() {
        return w;
      }),
      r.d(t, 'l', function() {
        return E;
      }),
      r.d(t, 'e', function() {
        return b;
      }),
      r.d(t, 'c', function() {
        return _;
      }),
      r.d(t, 'h', function() {
        return S;
      }),
      r.d(t, 'i', function() {
        return x;
      }),
      r.d(t, 'k', function() {
        return R;
      }),
      r.d(t, 'd', function() {
        return A;
      }),
      r.d(t, 'a', function() {
        return k;
      });
    var c = !1;
    try {
      c = 'undefined' != typeof localStorage;
    } catch (e) {}
    var f = new a({
        an: 'Firefox Send',
        ds: 'web',
        tid: window.GOOGLE_ANALYTICS_ID
      }),
      h = null,
      l = null;
    function p(e, t) {
      (h = e),
        t.on('DOMContentLoaded', function() {
          Array.from(document.querySelectorAll('a')).forEach(function(e) {
            /^http/.test(e.getAttribute('href')) &&
              e.addEventListener('click', P);
          }),
            (l = u.a.enrolled[0]),
            y(d(), 'visit', {
              cm5: u.a.totalUploads,
              cm6: u.a.files.length,
              cm7: u.a.totalDownloads
            });
        }),
        t.on('exit', P),
        t.on('experiment', T);
    }
    function d() {
      switch (h.route) {
        case '/':
        case '/share/:id':
          return 'sender';
        case '/download/:id/:key':
        case '/download/:id':
        case '/completed':
          return 'recipient';
        default:
          return 'other';
      }
    }
    function y() {
      var e = Array.from(arguments);
      return (
        l && e[2] && ((e[2].xid = l[0]), (e[2].xvar = l[1])),
        c &&
          f.sendEvent.apply(f, e).catch(function() {
            return 0;
          })
      );
    }
    function v(e) {
      'sender' === d()
        ? e && (u.a.referrer = e + '-upload')
        : 'recipient' === d() && e && (u.a.referrer = e + '-download');
    }
    function m() {
      var e =
        u.a.referrer ||
        (/^https:\/\/testpilot\.firefox\.com/.test(document.referrer)
          ? 'testpilot'
          : 'external');
      return (u.a.referrer = null), e;
    }
    function g(e) {
      return y('sender', 'upload-started', {
        cm1: e.size,
        cm5: u.a.totalUploads,
        cm6: u.a.files.length + 1,
        cm7: u.a.totalDownloads,
        cd1: e.type,
        cd5: m()
      });
    }
    function w(e) {
      return (
        v('cancelled'),
        y('sender', 'upload-stopped', {
          cm1: e.size,
          cm5: u.a.totalUploads,
          cm6: u.a.files.length,
          cm7: u.a.totalDownloads,
          cd1: e.type,
          cd2: 'cancelled'
        })
      );
    }
    function b(e) {
      return y('sender', 'upload-stopped', {
        cm1: e.size,
        cm2: e.time,
        cm3: e.speed,
        cm5: u.a.totalUploads,
        cm6: u.a.files.length,
        cm7: u.a.totalDownloads,
        cd1: e.type,
        cd2: 'completed'
      });
    }
    function k(e) {
      return y('sender', 'password-added', {
        cm1: e.size,
        cm5: u.a.totalUploads,
        cm6: u.a.files.length,
        cm7: u.a.totalDownloads
      });
    }
    function x(e) {
      return y('recipient', 'download-started', {
        cm1: e.size,
        cm4: e.ttl,
        cm5: u.a.totalUploads,
        cm6: u.a.files.length,
        cm7: u.a.totalDownloads
      });
    }
    function R(e) {
      return y('recipient', 'download-stopped', {
        cm1: e.size,
        cm5: u.a.totalUploads,
        cm6: u.a.files.length,
        cm7: u.a.totalDownloads,
        cd2: 'errored',
        cd6: e.err
      });
    }
    function E(e) {
      return y('sender', 'upload-stopped', {
        cm1: e.size,
        cm5: u.a.totalUploads,
        cm6: u.a.files.length,
        cm7: u.a.totalDownloads,
        cd1: e.type,
        cd2: 'errored',
        cd6: e.err
      });
    }
    function _(e) {
      return y('sender', 'download-limit-changed', {
        cm1: e.size,
        cm5: u.a.totalUploads,
        cm6: u.a.files.length,
        cm7: u.a.totalDownloads,
        cm8: e.dlimit
      });
    }
    function A(e) {
      return y('recipient', 'download-stopped', {
        cm1: e.size,
        cm2: e.time,
        cm3: e.speed,
        cm5: u.a.totalUploads,
        cm6: u.a.files.length,
        cm7: u.a.totalDownloads,
        cd2: 'completed'
      });
    }
    function S(e) {
      return y(d(), 'upload-deleted', {
        cm1: e.size,
        cm2: e.time,
        cm3: e.speed,
        cm4: e.ttl,
        cm5: u.a.totalUploads,
        cm6: u.a.files.length,
        cm7: u.a.totalDownloads,
        cd1: e.type,
        cd4: e.location
      });
    }
    function O(e) {
      return y('sender', 'copied', { cd4: e.location });
    }
    function P(e) {
      return y(d(), 'exited', {
        cd3: (function(e) {
          switch (e) {
            case 'https://www.mozilla.org/':
              return 'mozilla';
            case 'https://www.mozilla.org/about/legal':
              return 'legal';
            case 'https://testpilot.firefox.com/about':
              return 'about';
            case 'https://testpilot.firefox.com/privacy':
              return 'privacy';
            case 'https://testpilot.firefox.com/terms':
              return 'terms';
            case 'https://www.mozilla.org/privacy/websites/#cookies':
              return 'cookies';
            case 'https://github.com/mozilla/send':
              return 'github';
            case 'https://twitter.com/FxTestPilot':
              return 'twitter';
            case 'https://www.mozilla.org/firefox/new/?scene=2':
              return 'download-firefox';
            case 'https://qsurvey.mozilla.com/s3/txp-firefox-send':
              return 'survey';
            case 'https://testpilot.firefox.com/':
            case 'https://testpilot.firefox.com/experiments/send':
              return 'testpilot';
            case 'https://www.mozilla.org/firefox/new/?utm_campaign=send-acquisition&utm_medium=referral&utm_source=send.firefox.com':
              return 'promo';
            default:
              return 'other';
          }
        })(e.currentTarget.href)
      });
    }
    function T(e) {
      return y(d(), 'experiment', e);
    }
  },
  NXOg: function(e, t, r) {
    'use strict';
    function n(e, t, r) {
      if ('function' == typeof TransformStream)
        return e.pipeThrough(new TransformStream(t));
      var n = e.getReader();
      return new ReadableStream({
        start: function(e) {
          if (t.start) return t.start(e);
        },
        pull: function(e) {
          var r = this;
          return (function(e) {
            return function() {
              var t = e.apply(this, arguments);
              return new Promise(function(e, r) {
                return (function n(i, o) {
                  try {
                    var s = t[i](o),
                      a = s.value;
                  } catch (e) {
                    return void r(e);
                  }
                  if (!s.done)
                    return Promise.resolve(a).then(
                      function(e) {
                        n('next', e);
                      },
                      function(e) {
                        n('throw', e);
                      }
                    );
                  e(a);
                })('next');
              });
            };
          })(
            regeneratorRuntime.mark(function i() {
              var o, s, a;
              return regeneratorRuntime.wrap(
                function(r) {
                  for (;;)
                    switch ((r.prev = r.next)) {
                      case 0:
                        (o = !1),
                          (s = {
                            enqueue: function(t) {
                              (o = !0), e.enqueue(t);
                            }
                          });
                      case 2:
                        if (o) {
                          r.next = 15;
                          break;
                        }
                        return (r.next = 5), n.read();
                      case 5:
                        if (!(a = r.sent).done) {
                          r.next = 11;
                          break;
                        }
                        if (!t.flush) {
                          r.next = 10;
                          break;
                        }
                        return (r.next = 10), t.flush(e);
                      case 10:
                        return r.abrupt('return', e.close());
                      case 11:
                        return (r.next = 13), t.transform(a.value, s);
                      case 13:
                        r.next = 2;
                        break;
                      case 15:
                      case 'end':
                        return r.stop();
                    }
                },
                i,
                r
              );
            })
          )();
        },
        cancel: function(t) {
          e.cancel(t), r && r(t);
        }
      });
    }
    r.d(t, 'a', function() {
      return n;
    });
  },
  R1vp: function(e, t, r) {
    'use strict';
    (function(e) {
      r('tjlA');
      var n = r('NXOg'),
        i = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })();
      function o(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise(function(e, r) {
            return (function n(i, o) {
              try {
                var s = t[i](o),
                  a = s.value;
              } catch (e) {
                return void r(e);
              }
              if (!s.done)
                return Promise.resolve(a).then(
                  function(e) {
                    n('next', e);
                  },
                  function(e) {
                    n('throw', e);
                  }
                );
              e(a);
            })('next');
          });
        };
      }
      function s(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var a = 16,
        u = 'encrypt',
        c = 65536,
        f = new TextEncoder();
      var h = (function() {
          function t(e, r, n, i) {
            s(this, t),
              (this.mode = e),
              this.prevChunk,
              (this.seq = 0),
              (this.firstchunk = !0),
              (this.rs = n),
              (this.ikm = r.buffer),
              (this.salt = i);
          }
          return (
            i(t, [
              {
                key: 'generateKey',
                value: (function() {
                  var e = o(
                    regeneratorRuntime.mark(function e() {
                      var t;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.next = 2),
                                  crypto.subtle.importKey(
                                    'raw',
                                    this.ikm,
                                    'HKDF',
                                    !1,
                                    ['deriveKey']
                                  )
                                );
                              case 2:
                                return (
                                  (t = e.sent),
                                  e.abrupt(
                                    'return',
                                    crypto.subtle.deriveKey(
                                      {
                                        name: 'HKDF',
                                        salt: this.salt,
                                        info: f.encode(
                                          'Content-Encoding: aes128gcm\0'
                                        ),
                                        hash: 'SHA-256'
                                      },
                                      t,
                                      { name: 'AES-GCM', length: 128 },
                                      !1,
                                      ['encrypt', 'decrypt']
                                    )
                                  )
                                );
                              case 4:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function() {
                    return e.apply(this, arguments);
                  };
                })()
              },
              {
                key: 'generateNonceBase',
                value: (function() {
                  var t = o(
                    regeneratorRuntime.mark(function t() {
                      var r, n;
                      return regeneratorRuntime.wrap(
                        function(t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                return (
                                  (t.next = 2),
                                  crypto.subtle.importKey(
                                    'raw',
                                    this.ikm,
                                    'HKDF',
                                    !1,
                                    ['deriveKey']
                                  )
                                );
                              case 2:
                                return (
                                  (r = t.sent),
                                  (t.t0 = crypto.subtle),
                                  (t.next = 6),
                                  crypto.subtle.deriveKey(
                                    {
                                      name: 'HKDF',
                                      salt: this.salt,
                                      info: f.encode(
                                        'Content-Encoding: nonce\0'
                                      ),
                                      hash: 'SHA-256'
                                    },
                                    r,
                                    { name: 'AES-GCM', length: 128 },
                                    !0,
                                    ['encrypt', 'decrypt']
                                  )
                                );
                              case 6:
                                return (
                                  (t.t1 = t.sent),
                                  (t.next = 9),
                                  t.t0.exportKey.call(t.t0, 'raw', t.t1)
                                );
                              case 9:
                                return (
                                  (n = t.sent),
                                  t.abrupt('return', e.from(n.slice(0, 12)))
                                );
                              case 11:
                              case 'end':
                                return t.stop();
                            }
                        },
                        t,
                        this
                      );
                    })
                  );
                  return function() {
                    return t.apply(this, arguments);
                  };
                })()
              },
              {
                key: 'generateNonce',
                value: function(t) {
                  if (t > 4294967295)
                    throw new Error('record sequence number exceeds limit');
                  var r = e.from(this.nonceBase),
                    n = (r.readUIntBE(r.length - 4, 4) ^ t) >>> 0;
                  return r.writeUIntBE(n, r.length - 4, 4), r;
                }
              },
              {
                key: 'pad',
                value: function(t, r) {
                  var n = t.length;
                  if (n + 16 >= this.rs)
                    throw new Error('data too large for record size');
                  if (r) {
                    var i = e.alloc(1);
                    return i.writeUInt8(2, 0), e.concat([t, i]);
                  }
                  var o = e.alloc(this.rs - n - 16);
                  return o.fill(0), o.writeUInt8(1, 0), e.concat([t, o]);
                }
              },
              {
                key: 'unpad',
                value: function(e, t) {
                  for (var r = e.length - 1; r >= 0; r--)
                    if (e[r]) {
                      if (t) {
                        if (2 !== e[r])
                          throw new Error('delimiter of final record is not 2');
                      } else if (1 !== e[r])
                        throw new Error(
                          'delimiter of not final record is not 1'
                        );
                      return e.slice(0, r);
                    }
                  throw new Error('no delimiter found');
                }
              },
              {
                key: 'createHeader',
                value: function() {
                  var t = e.alloc(5);
                  return (
                    t.writeUIntBE(this.rs, 0, 4),
                    t.writeUIntBE(0, 4, 1),
                    e.concat([e.from(this.salt), t])
                  );
                }
              },
              {
                key: 'readHeader',
                value: function(e) {
                  if (e.length < 21)
                    throw new Error('chunk too small for reading header');
                  var t = {};
                  (t.salt = e.buffer.slice(0, a)), (t.rs = e.readUIntBE(a, 4));
                  var r = e.readUInt8(a + 4);
                  return (t.length = r + a + 5), t;
                }
              },
              {
                key: 'encryptRecord',
                value: (function() {
                  var t = o(
                    regeneratorRuntime.mark(function t(r, n, i) {
                      var o, s;
                      return regeneratorRuntime.wrap(
                        function(t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                return (
                                  (o = this.generateNonce(n)),
                                  (t.next = 3),
                                  crypto.subtle.encrypt(
                                    { name: 'AES-GCM', iv: o },
                                    this.key,
                                    this.pad(r, i)
                                  )
                                );
                              case 3:
                                return (
                                  (s = t.sent), t.abrupt('return', e.from(s))
                                );
                              case 5:
                              case 'end':
                                return t.stop();
                            }
                        },
                        t,
                        this
                      );
                    })
                  );
                  return function(e, r, n) {
                    return t.apply(this, arguments);
                  };
                })()
              },
              {
                key: 'decryptRecord',
                value: (function() {
                  var t = o(
                    regeneratorRuntime.mark(function t(r, n, i) {
                      var o, s;
                      return regeneratorRuntime.wrap(
                        function(t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                return (
                                  (o = this.generateNonce(n)),
                                  (t.next = 3),
                                  crypto.subtle.decrypt(
                                    { name: 'AES-GCM', iv: o, tagLength: 128 },
                                    this.key,
                                    r
                                  )
                                );
                              case 3:
                                return (
                                  (s = t.sent),
                                  t.abrupt('return', this.unpad(e.from(s), i))
                                );
                              case 5:
                              case 'end':
                                return t.stop();
                            }
                        },
                        t,
                        this
                      );
                    })
                  );
                  return function(e, r, n) {
                    return t.apply(this, arguments);
                  };
                })()
              },
              {
                key: 'start',
                value: (function() {
                  var e = o(
                    regeneratorRuntime.mark(function e(t) {
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (this.mode !== u) {
                                  e.next = 10;
                                  break;
                                }
                                return (e.next = 3), this.generateKey();
                              case 3:
                                return (
                                  (this.key = e.sent),
                                  (e.next = 6),
                                  this.generateNonceBase()
                                );
                              case 6:
                                (this.nonceBase = e.sent),
                                  t.enqueue(this.createHeader()),
                                  (e.next = 12);
                                break;
                              case 10:
                                if ('decrypt' === this.mode) {
                                  e.next = 12;
                                  break;
                                }
                                throw new Error(
                                  'mode must be either encrypt or decrypt'
                                );
                              case 12:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function(t) {
                    return e.apply(this, arguments);
                  };
                })()
              },
              {
                key: 'transformPrevChunk',
                value: (function() {
                  var e = o(
                    regeneratorRuntime.mark(function e(t, r) {
                      var n;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (this.mode !== u) {
                                  e.next = 9;
                                  break;
                                }
                                return (
                                  (e.t0 = r),
                                  (e.next = 4),
                                  this.encryptRecord(
                                    this.prevChunk,
                                    this.seq,
                                    t
                                  )
                                );
                              case 4:
                                (e.t1 = e.sent),
                                  e.t0.enqueue.call(e.t0, e.t1),
                                  this.seq++,
                                  (e.next = 27);
                                break;
                              case 9:
                                if (0 !== this.seq) {
                                  e.next = 21;
                                  break;
                                }
                                return (
                                  (n = this.readHeader(this.prevChunk)),
                                  (this.salt = n.salt),
                                  (this.rs = n.rs),
                                  (e.next = 15),
                                  this.generateKey()
                                );
                              case 15:
                                return (
                                  (this.key = e.sent),
                                  (e.next = 18),
                                  this.generateNonceBase()
                                );
                              case 18:
                                (this.nonceBase = e.sent), (e.next = 26);
                                break;
                              case 21:
                                return (
                                  (e.t2 = r),
                                  (e.next = 24),
                                  this.decryptRecord(
                                    this.prevChunk,
                                    this.seq - 1,
                                    t
                                  )
                                );
                              case 24:
                                (e.t3 = e.sent), e.t2.enqueue.call(e.t2, e.t3);
                              case 26:
                                this.seq++;
                              case 27:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function(t, r) {
                    return e.apply(this, arguments);
                  };
                })()
              },
              {
                key: 'transform',
                value: (function() {
                  var t = o(
                    regeneratorRuntime.mark(function t(r, n) {
                      return regeneratorRuntime.wrap(
                        function(t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                if (this.firstchunk) {
                                  t.next = 3;
                                  break;
                                }
                                return (
                                  (t.next = 3), this.transformPrevChunk(!1, n)
                                );
                              case 3:
                                (this.firstchunk = !1),
                                  (this.prevChunk = e.from(r.buffer));
                              case 5:
                              case 'end':
                                return t.stop();
                            }
                        },
                        t,
                        this
                      );
                    })
                  );
                  return function(e, r) {
                    return t.apply(this, arguments);
                  };
                })()
              },
              {
                key: 'flush',
                value: (function() {
                  var e = o(
                    regeneratorRuntime.mark(function e(t) {
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (!this.prevChunk) {
                                  e.next = 3;
                                  break;
                                }
                                return (
                                  (e.next = 3), this.transformPrevChunk(!0, t)
                                );
                              case 3:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function(t) {
                    return e.apply(this, arguments);
                  };
                })()
              }
            ]),
            t
          );
        })(),
        l = (function() {
          function e(t, r, n) {
            s(this, e),
              (this.blob = t),
              (this.index = 0),
              (this.mode = n),
              (this.chunkSize = n === u ? r - 17 : r);
          }
          return (
            i(e, [
              {
                key: 'pull',
                value: function(e) {
                  var t = this;
                  return new Promise(function(r, n) {
                    var i = t.blob.size - t.index;
                    if (i <= 0) return e.close(), r();
                    var o = 1;
                    o =
                      'decrypt' === t.mode && 0 === t.index
                        ? Math.min(21, i)
                        : Math.min(t.chunkSize, i);
                    var s = t.blob.slice(t.index, t.index + o),
                      a = new FileReader();
                    (a.onload = function() {
                      e.enqueue(new Uint8Array(a.result)), r();
                    }),
                      (a.onerror = n),
                      a.readAsArrayBuffer(s),
                      (t.index += o);
                  });
                }
              }
            ]),
            e
          );
        })(),
        p = (function() {
          function e(t, r) {
            s(this, e),
              (this.mode = r),
              (this.rs = t),
              (this.chunkSize = r === u ? t - 17 : 21),
              (this.partialChunk = new Uint8Array(this.chunkSize)),
              (this.offset = 0);
          }
          return (
            i(e, [
              {
                key: 'send',
                value: function(e, t) {
                  t.enqueue(e),
                    21 === this.chunkSize &&
                      'decrypt' === this.mode &&
                      (this.chunkSize = this.rs),
                    (this.partialChunk = new Uint8Array(this.chunkSize)),
                    (this.offset = 0);
                }
              },
              {
                key: 'transform',
                value: function(e, t) {
                  var r = 0;
                  if (this.offset > 0) {
                    var n = Math.min(
                      e.byteLength,
                      this.chunkSize - this.offset
                    );
                    this.partialChunk.set(e.slice(0, n), this.offset),
                      (this.offset += n),
                      (r += n),
                      this.offset === this.chunkSize &&
                        this.send(this.partialChunk, t);
                  }
                  for (; r < e.byteLength; ) {
                    var i = e.byteLength - r;
                    if (i >= this.chunkSize) {
                      var o = e.slice(r, r + this.chunkSize);
                      (r += this.chunkSize), this.send(o, t);
                    } else {
                      var s = e.slice(r, r + i);
                      (r += s.byteLength),
                        this.partialChunk.set(s),
                        (this.offset = s.byteLength);
                    }
                  }
                }
              },
              {
                key: 'flush',
                value: function(e) {
                  this.offset > 0 &&
                    e.enqueue(this.partialChunk.slice(0, this.offset));
                }
              }
            ]),
            e
          );
        })(),
        d = (function() {
          function e(t, r, n, i, o) {
            s(this, e),
              (this.input = t),
              (this.key = r),
              (this.mode = n),
              (this.rs = i),
              (this.salt = o),
              void 0 === i && (this.rs = c),
              void 0 === o &&
                (this.salt = (function(e) {
                  var t = new Uint8Array(e);
                  return crypto.getRandomValues(t), t.buffer;
                })(a));
          }
          return (
            i(e, [
              {
                key: 'info',
                value: function() {
                  return {
                    recordSize: this.rs,
                    fileSize:
                      21 +
                      this.input.size +
                      16 * Math.floor(this.input.size / (this.rs - 17))
                  };
                }
              },
              {
                key: 'transform',
                value: function() {
                  var e = void 0;
                  return (
                    (e =
                      this.input instanceof Blob
                        ? new ReadableStream(
                            new l(this.input, this.rs, this.mode)
                          )
                        : Object(n.a)(this.input, new p(this.rs, this.mode))),
                    Object(n.a)(
                      e,
                      new h(this.mode, this.key, this.rs, this.salt)
                    )
                  );
                }
              }
            ]),
            e
          );
        })();
      t.a = d;
    }.call(this, r('tjlA').Buffer));
  },
  U82S: function(e, t, r) {
    'use strict';
    var n = r('b7qI'),
      i = r('hwFe'),
      o = r('st+R'),
      s = (function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
    function a(e) {
      return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
          return (function n(i, o) {
            try {
              var s = t[i](o),
                a = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(a).then(
                function(e) {
                  n('next', e);
                },
                function(e) {
                  n('throw', e);
                }
              );
            e(a);
          })('next');
        });
      };
    }
    var u = (function() {
      function e(t) {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, e),
          (this.id = t.id),
          (this.url = t.url),
          (this.name = t.name),
          (this.size = t.size),
          (this.type = t.type),
          (this.time = t.time),
          (this.speed = t.speed),
          (this.createdAt = t.createdAt),
          (this.expiresAt = t.expiresAt),
          (this.ownerToken = t.ownerToken),
          (this.dlimit = t.dlimit || 1),
          (this.dtotal = t.dtotal || 0),
          (this.keychain = new n.a(t.secretKey, t.nonce)),
          (this._hasPassword = !!t.hasPassword);
      }
      return (
        s(e, [
          {
            key: 'setPassword',
            value: (function() {
              var e = a(
                regeneratorRuntime.mark(function e(t) {
                  var r;
                  return regeneratorRuntime.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0),
                              (this.password = t),
                              (this._hasPassword = !0),
                              this.keychain.setPassword(t, this.url),
                              (e.next = 6),
                              Object(o.e)(
                                this.id,
                                this.ownerToken,
                                this.keychain
                              )
                            );
                          case 6:
                            return (r = e.sent), e.abrupt('return', r);
                          case 10:
                            throw ((e.prev = 10),
                            (e.t0 = e.catch(0)),
                            (this.password = null),
                            (this._hasPassword = !1),
                            e.t0);
                          case 15:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [[0, 10]]
                  );
                })
              );
              return function(t) {
                return e.apply(this, arguments);
              };
            })()
          },
          {
            key: 'del',
            value: function() {
              return Object(o.a)(this.id, this.ownerToken);
            }
          },
          {
            key: 'changeLimit',
            value: function(e) {
              return this.dlimit !== e
                ? ((this.dlimit = e),
                  Object(o.d)(this.id, this.ownerToken, { dlimit: e }))
                : Promise.resolve(!0);
            }
          },
          {
            key: 'updateDownloadCount',
            value: (function() {
              var e = a(
                regeneratorRuntime.mark(function e() {
                  var t;
                  return regeneratorRuntime.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0),
                              (e.next = 3),
                              Object(o.b)(this.id, this.ownerToken)
                            );
                          case 3:
                            (t = e.sent),
                              (this.dtotal = t.dtotal),
                              (this.dlimit = t.dlimit),
                              (e.next = 11);
                            break;
                          case 8:
                            (e.prev = 8),
                              (e.t0 = e.catch(0)),
                              '404' === e.t0.message &&
                                (this.dtotal = this.dlimit);
                          case 11:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [[0, 8]]
                  );
                })
              );
              return function() {
                return e.apply(this, arguments);
              };
            })()
          },
          {
            key: 'toJSON',
            value: function() {
              return {
                id: this.id,
                url: this.url,
                name: this.name,
                size: this.size,
                type: this.type,
                time: this.time,
                speed: this.speed,
                createdAt: this.createdAt,
                expiresAt: this.expiresAt,
                secretKey: Object(i.arrayToB64)(this.keychain.rawSecret),
                ownerToken: this.ownerToken,
                dlimit: this.dlimit,
                dtotal: this.dtotal,
                hasPassword: this.hasPassword
              };
            }
          },
          {
            key: 'hasPassword',
            get: function() {
              return !!this._hasPassword;
            }
          }
        ]),
        e
      );
    })();
    t.a = u;
  },
  b7qI: function(e, t, r) {
    'use strict';
    var n = r('hwFe'),
      i = r('R1vp'),
      o = (function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
    function s(e) {
      return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
          return (function n(i, o) {
            try {
              var s = t[i](o),
                a = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(a).then(
                function(e) {
                  n('next', e);
                },
                function(e) {
                  n('throw', e);
                }
              );
            e(a);
          })('next');
        });
      };
    }
    var a = new TextEncoder(),
      u = new TextDecoder(),
      c = (function() {
        function e(t, r, i) {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, e),
            (this._nonce = r || 'yRCdyQ1EMSA3mo4rqSkuNQ=='),
            (this.iv = i
              ? Object(n.b64ToArray)(i)
              : crypto.getRandomValues(new Uint8Array(12))),
            (this.rawSecret = t
              ? Object(n.b64ToArray)(t)
              : crypto.getRandomValues(new Uint8Array(16))),
            (this.secretKeyPromise = crypto.subtle.importKey(
              'raw',
              this.rawSecret,
              'HKDF',
              !1,
              ['deriveKey']
            )),
            (this.encryptKeyPromise = this.secretKeyPromise.then(function(e) {
              return crypto.subtle.deriveKey(
                {
                  name: 'HKDF',
                  salt: new Uint8Array(),
                  info: a.encode('encryption'),
                  hash: 'SHA-256'
                },
                e,
                { name: 'AES-GCM', length: 128 },
                !1,
                ['encrypt', 'decrypt']
              );
            })),
            (this.metaKeyPromise = this.secretKeyPromise.then(function(e) {
              return crypto.subtle.deriveKey(
                {
                  name: 'HKDF',
                  salt: new Uint8Array(),
                  info: a.encode('metadata'),
                  hash: 'SHA-256'
                },
                e,
                { name: 'AES-GCM', length: 128 },
                !1,
                ['encrypt', 'decrypt']
              );
            })),
            (this.authKeyPromise = this.secretKeyPromise.then(function(e) {
              return crypto.subtle.deriveKey(
                {
                  name: 'HKDF',
                  salt: new Uint8Array(),
                  info: a.encode('authentication'),
                  hash: 'SHA-256'
                },
                e,
                { name: 'HMAC', hash: { name: 'SHA-256' } },
                !0,
                ['sign']
              );
            }));
        }
        return (
          o(e, [
            {
              key: 'setIV',
              value: function(e) {
                this.iv = Object(n.b64ToArray)(e);
              }
            },
            {
              key: 'setPassword',
              value: function(e, t) {
                this.authKeyPromise = crypto.subtle
                  .importKey('raw', a.encode(e), { name: 'PBKDF2' }, !1, [
                    'deriveKey'
                  ])
                  .then(function(e) {
                    return crypto.subtle.deriveKey(
                      {
                        name: 'PBKDF2',
                        salt: a.encode(t),
                        iterations: 100,
                        hash: 'SHA-256'
                      },
                      e,
                      { name: 'HMAC', hash: 'SHA-256' },
                      !0,
                      ['sign']
                    );
                  });
              }
            },
            {
              key: 'setAuthKey',
              value: function(e) {
                this.authKeyPromise = crypto.subtle.importKey(
                  'raw',
                  Object(n.b64ToArray)(e),
                  { name: 'HMAC', hash: 'SHA-256' },
                  !0,
                  ['sign']
                );
              }
            },
            {
              key: 'authKeyB64',
              value: (function() {
                var e = s(
                  regeneratorRuntime.mark(function e() {
                    var t, r;
                    return regeneratorRuntime.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), this.authKeyPromise;
                            case 2:
                              return (
                                (t = e.sent),
                                (e.next = 5),
                                crypto.subtle.exportKey('raw', t)
                              );
                            case 5:
                              return (
                                (r = e.sent),
                                e.abrupt(
                                  'return',
                                  Object(n.arrayToB64)(new Uint8Array(r))
                                )
                              );
                            case 7:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function() {
                  return e.apply(this, arguments);
                };
              })()
            },
            {
              key: 'authHeader',
              value: (function() {
                var e = s(
                  regeneratorRuntime.mark(function e() {
                    var t, r;
                    return regeneratorRuntime.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), this.authKeyPromise;
                            case 2:
                              return (
                                (t = e.sent),
                                (e.next = 5),
                                crypto.subtle.sign(
                                  { name: 'HMAC' },
                                  t,
                                  Object(n.b64ToArray)(this.nonce)
                                )
                              );
                            case 5:
                              return (
                                (r = e.sent),
                                e.abrupt(
                                  'return',
                                  'send-v1 ' +
                                    Object(n.arrayToB64)(new Uint8Array(r))
                                )
                              );
                            case 7:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function() {
                  return e.apply(this, arguments);
                };
              })()
            },
            {
              key: 'encryptFile',
              value: (function() {
                var e = s(
                  regeneratorRuntime.mark(function e(t) {
                    var r, n;
                    return regeneratorRuntime.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), this.encryptKeyPromise;
                            case 2:
                              return (
                                (r = e.sent),
                                (e.next = 5),
                                crypto.subtle.encrypt(
                                  {
                                    name: 'AES-GCM',
                                    iv: this.iv,
                                    tagLength: 128
                                  },
                                  r,
                                  t
                                )
                              );
                            case 5:
                              return (n = e.sent), e.abrupt('return', n);
                            case 7:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function(t) {
                  return e.apply(this, arguments);
                };
              })()
            },
            {
              key: 'encryptMetadata',
              value: (function() {
                var e = s(
                  regeneratorRuntime.mark(function e(t) {
                    var r, i;
                    return regeneratorRuntime.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), this.metaKeyPromise;
                            case 2:
                              return (
                                (r = e.sent),
                                (e.next = 5),
                                crypto.subtle.encrypt(
                                  {
                                    name: 'AES-GCM',
                                    iv: new Uint8Array(12),
                                    tagLength: 128
                                  },
                                  r,
                                  a.encode(
                                    JSON.stringify({
                                      iv: Object(n.arrayToB64)(this.iv),
                                      name: t.name,
                                      size: t.size,
                                      type: t.type || 'application/octet-stream'
                                    })
                                  )
                                )
                              );
                            case 5:
                              return (i = e.sent), e.abrupt('return', i);
                            case 7:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function(t) {
                  return e.apply(this, arguments);
                };
              })()
            },
            {
              key: 'encryptStream',
              value: function(e) {
                var t = new i.a(e, this.rawSecret, 'encrypt');
                return { stream: t.transform(), streamInfo: t.info() };
              }
            },
            {
              key: 'decryptStream',
              value: function(e) {
                return new i.a(e, this.rawSecret, 'decrypt').transform();
              }
            },
            {
              key: 'decryptFile',
              value: (function() {
                var e = s(
                  regeneratorRuntime.mark(function e(t) {
                    var r, n;
                    return regeneratorRuntime.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), this.encryptKeyPromise;
                            case 2:
                              return (
                                (r = e.sent),
                                (e.next = 5),
                                crypto.subtle.decrypt(
                                  {
                                    name: 'AES-GCM',
                                    iv: this.iv,
                                    tagLength: 128
                                  },
                                  r,
                                  t
                                )
                              );
                            case 5:
                              return (n = e.sent), e.abrupt('return', n);
                            case 7:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function(t) {
                  return e.apply(this, arguments);
                };
              })()
            },
            {
              key: 'decryptMetadata',
              value: (function() {
                var e = s(
                  regeneratorRuntime.mark(function e(t) {
                    var r, n;
                    return regeneratorRuntime.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), this.metaKeyPromise;
                            case 2:
                              return (
                                (r = e.sent),
                                (e.next = 5),
                                crypto.subtle.decrypt(
                                  {
                                    name: 'AES-GCM',
                                    iv: new Uint8Array(12),
                                    tagLength: 128
                                  },
                                  r,
                                  t
                                )
                              );
                            case 5:
                              return (
                                (n = e.sent),
                                e.abrupt('return', JSON.parse(u.decode(n)))
                              );
                            case 7:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function(t) {
                  return e.apply(this, arguments);
                };
              })()
            },
            {
              key: 'nonce',
              get: function() {
                return this._nonce;
              },
              set: function(e) {
                e && e !== this._nonce && (this._nonce = e);
              }
            }
          ]),
          e
        );
      })();
    t.a = c;
  },
  hwFe: function(e, t, r) {
    var n =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            },
      i = (function() {
        var e = (function(e) {
          return function() {
            var t = e.apply(this, arguments);
            return new Promise(function(e, r) {
              return (function n(i, o) {
                try {
                  var s = t[i](o),
                    a = s.value;
                } catch (e) {
                  return void r(e);
                }
                if (!s.done)
                  return Promise.resolve(a).then(
                    function(e) {
                      n('next', e);
                    },
                    function(e) {
                      n('throw', e);
                    }
                  );
                e(a);
              })('next');
            });
          };
        })(
          regeneratorRuntime.mark(function e() {
            var t;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.prev = 0),
                        (e.next = 3),
                        crypto.subtle.generateKey(
                          { name: 'AES-GCM', length: 128 },
                          !0,
                          ['encrypt', 'decrypt']
                        )
                      );
                    case 3:
                      return (
                        (t = e.sent),
                        (e.next = 6),
                        crypto.subtle.encrypt(
                          {
                            name: 'AES-GCM',
                            iv: crypto.getRandomValues(new Uint8Array(12)),
                            tagLength: 128
                          },
                          t,
                          new ArrayBuffer(8)
                        )
                      );
                    case 6:
                      return (
                        (e.next = 8),
                        crypto.subtle.importKey(
                          'raw',
                          crypto.getRandomValues(new Uint8Array(16)),
                          'PBKDF2',
                          !1,
                          ['deriveKey']
                        )
                      );
                    case 8:
                      return (
                        (e.next = 10),
                        crypto.subtle.importKey(
                          'raw',
                          crypto.getRandomValues(new Uint8Array(16)),
                          'HKDF',
                          !1,
                          ['deriveKey']
                        )
                      );
                    case 10:
                      return e.abrupt('return', !0);
                    case 13:
                      return (
                        (e.prev = 13),
                        (e.t0 = e.catch(0)),
                        console.error(e.t0),
                        e.abrupt('return', !1)
                      );
                    case 17:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this,
              [[0, 13]]
            );
          })
        );
        return function() {
          return e.apply(this, arguments);
        };
      })();
    var o = r('H7XF');
    var s = !(
        'object' !== ('undefined' == typeof Intl ? 'undefined' : n(Intl)) ||
        !Intl ||
        'function' != typeof Intl.NumberFormat ||
        'object' !==
          ('undefined' == typeof navigator ? 'undefined' : n(navigator))
      ),
      a = ['B', 'kB', 'MB', 'GB'];
    function u() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 100;
      return new Promise(function(t) {
        return setTimeout(t, e);
      });
    }
    e.exports = {
      fadeOut: function(e) {
        var t = document.querySelector(e).classList;
        return t.remove('effect--fadeIn'), t.add('effect--fadeOut'), u(300);
      },
      delay: u,
      allowedCopy: function() {
        return (
          !!document.queryCommandSupported &&
          document.queryCommandSupported('copy')
        );
      },
      bytes: function(e) {
        if (e < 1) return '0B';
        var t = Math.min(Math.floor(Math.log10(e) / 3), a.length - 1),
          r = Number(e / Math.pow(1e3, t)),
          n = r.toFixed(1);
        if (s)
          try {
            var i = document.querySelector('html').lang;
            n = r.toLocaleString(i, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1
            });
          } catch (e) {}
        return '' + n + a[t];
      },
      percent: function(e) {
        if (s)
          try {
            var t = document.querySelector('html').lang;
            return e.toLocaleString(t, { style: 'percent' });
          } catch (e) {}
        return Math.floor(100 * e) + '%';
      },
      number: function(e) {
        if (s) {
          var t = document.querySelector('html').lang;
          return e.toLocaleString(t);
        }
        return e.toString();
      },
      copyToClipboard: function(e) {
        var t = document.createElement('input');
        if (
          (t.setAttribute('value', e),
          (t.contentEditable = !0),
          (t.readOnly = !0),
          document.body.appendChild(t),
          navigator.userAgent.match(/iphone|ipad|ipod/i))
        ) {
          var r = document.createRange();
          r.selectNodeContents(t);
          var n = getSelection();
          n.removeAllRanges(), n.addRange(r), t.setSelectionRange(0, e.length);
        } else t.select();
        var i = document.execCommand('copy');
        return document.body.removeChild(t), i;
      },
      arrayToB64: function(e) {
        return o
          .fromByteArray(e)
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
      },
      b64ToArray: function(e) {
        return o.toByteArray(e + '==='.slice((e.length + 3) % 4));
      },
      loadShim: function(e) {
        return new Promise(function(t, r) {
          var n = document.createElement('script');
          (n.src = e),
            n.addEventListener('load', function() {
              return t(!0);
            }),
            n.addEventListener('error', function() {
              return t(!1);
            }),
            document.head.appendChild(n);
        });
      },
      canHasSend: i,
      isFile: function(e) {
        return /^[0-9a-fA-F]{10}$/.test(e);
      },
      openLinksInNewTab: function(e) {
        var t =
          !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return (
          (e = e || Array.from(document.querySelectorAll('a:not([target])'))),
          t
            ? e.forEach(function(e) {
                e.setAttribute('target', '_blank'),
                  e.setAttribute('rel', 'noopener noreferrer');
              })
            : e.forEach(function(e) {
                e.removeAttribute('target'), e.removeAttribute('rel');
              }),
          e
        );
      }
    };
  },
  'kVK+': function(e, t) {
    (t.read = function(e, t, r, n, i) {
      var o,
        s,
        a = 8 * i - n - 1,
        u = (1 << a) - 1,
        c = u >> 1,
        f = -7,
        h = r ? i - 1 : 0,
        l = r ? -1 : 1,
        p = e[t + h];
      for (
        h += l, o = p & ((1 << -f) - 1), p >>= -f, f += a;
        f > 0;
        o = 256 * o + e[t + h], h += l, f -= 8
      );
      for (
        s = o & ((1 << -f) - 1), o >>= -f, f += n;
        f > 0;
        s = 256 * s + e[t + h], h += l, f -= 8
      );
      if (0 === o) o = 1 - c;
      else {
        if (o === u) return s ? NaN : (1 / 0) * (p ? -1 : 1);
        (s += Math.pow(2, n)), (o -= c);
      }
      return (p ? -1 : 1) * s * Math.pow(2, o - n);
    }),
      (t.write = function(e, t, r, n, i, o) {
        var s,
          a,
          u,
          c = 8 * o - i - 1,
          f = (1 << c) - 1,
          h = f >> 1,
          l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          p = n ? 0 : o - 1,
          d = n ? 1 : -1,
          y = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
        for (
          t = Math.abs(t),
            isNaN(t) || t === 1 / 0
              ? ((a = isNaN(t) ? 1 : 0), (s = f))
              : ((s = Math.floor(Math.log(t) / Math.LN2)),
                t * (u = Math.pow(2, -s)) < 1 && (s--, (u *= 2)),
                (t += s + h >= 1 ? l / u : l * Math.pow(2, 1 - h)) * u >= 2 &&
                  (s++, (u /= 2)),
                s + h >= f
                  ? ((a = 0), (s = f))
                  : s + h >= 1
                    ? ((a = (t * u - 1) * Math.pow(2, i)), (s += h))
                    : ((a = t * Math.pow(2, h - 1) * Math.pow(2, i)), (s = 0)));
          i >= 8;
          e[r + p] = 255 & a, p += d, a /= 256, i -= 8
        );
        for (
          s = (s << i) | a, c += i;
          c > 0;
          e[r + p] = 255 & s, p += d, s /= 256, c -= 8
        );
        e[r + p - d] |= 128 * y;
      });
  },
  mY2b: function(e, t, r) {
    window.webkit.messageHandlers.copy.postMessage('hello');
    const n = 2147483648,
      i = new (r('+qE3'))();
    function o(e, t, r = []) {
      const n = document.createElement(e);
      for (const e in t)
        0 === e.indexOf('on')
          ? (n[e] = t[e])
          : 'htmlFor' === e
            ? (n.htmlFor = t.htmlFor)
            : 'className' === e
              ? (n.className = t.className)
              : n.setAttribute(e, t[e]);
      r instanceof Array || (r = [r]);
      for (let e of r)
        'string' == typeof e && (e = document.createTextNode(e)),
          n.appendChild(e);
      return n;
    }
    const s = {
      storage: {
        files: [],
        remove: function(e) {
          console.log('REMOVE FILEID', e);
        },
        writeFile: function(e) {
          console.log('WRITEFILE', e);
        },
        addFile: function(e) {
          document.body.innerHTML = '';
          const t = o('input', { id: 'url', value: e.url }),
            r = o(
              'button',
              {
                id: 'copy-button',
                className: 'button',
                onclick: () => {
                  window.webkit.messageHandlers.copy.postMessage(t.value),
                    (r.textContent = 'Copied!'),
                    setTimeout(function() {
                      r.textContent = 'Copy to clipboard';
                    }, 2e3);
                }
              },
              'Copy to clipboard'
            ),
            n = o(
              'div',
              { id: 'striped' },
              o('div', { id: 'white' }, [
                t,
                r,
                o(
                  'button',
                  { id: 'send-another', className: 'button', onclick: u },
                  'Send another file'
                )
              ])
            );
          document.body.appendChild(n);
        },
        totalUploads: 0
      },
      transfer: null,
      uploading: !1,
      settingPassword: !1,
      passwordSetError: null,
      route: '/'
    };
    function a(e) {
      console.log('UPLOAD'), e.preventDefault();
      const t = e.target.files[0];
      0 !== t.size &&
        (t.size > n
          ? console.log('file too big (no bigger than ' + n + ')')
          : i.emit('upload', { file: t, type: 'click' }));
    }
    function u() {
      document.body.innerHTML = '';
      const e = o(
        'div',
        { id: 'striped' },
        o('div', { id: 'white' }, [
          o('label', { id: 'label', htmlFor: 'input' }, 'ChoOSODose fOIKMOile'),
          o('input', { id: 'input', type: 'file', name: 'input', onchange: a })
        ])
      );
      document.body.appendChild(e);
    }
    i.on('render', function() {
      document.body.innerHTML = '';
      const e = o(
        'div',
        { style: 'background-color: white; width: 100%' },
        o('span', {
          style: `display: inline-block; width: ${(s.transfer.progress[0] /
            s.transfer.progress[1]) *
            100}%; background-color: blue`
        })
      );
      document.body.appendChild(e);
    }),
      i.on('pushState', function(e) {
        console.log('pushState ' + e + ' ' + JSON.stringify(s));
      });
    const c = r('xBST').default;
    try {
      c(s, i);
    } catch (e) {
      console.error('error' + e), console.error(e);
    }
    window.addEventListener(
      'message',
      e => {
        fetch(e.data)
          .then(e => e.blob())
          .then(e => {
            i.emit('upload', { file: e, type: 'share' });
          });
      },
      !1
    ),
      u();
  },
  'st+R': function(e, t, r) {
    'use strict';
    r.d(t, 'a', function() {
      return p;
    }),
      r.d(t, 'd', function() {
        return d;
      }),
      r.d(t, 'b', function() {
        return y;
      }),
      r.d(t, 'c', function() {
        return v;
      }),
      r.d(t, 'e', function() {
        return m;
      }),
      r.d(t, 'f', function() {
        return b;
      });
    var n = r('hwFe'),
      i = (function() {
        var e = f(
          regeneratorRuntime.mark(function e(t, r, n) {
            var i, o, s, a;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (i = {}), (r = r || {}), (e.next = 4), n.authHeader()
                      );
                    case 4:
                      return (
                        (o = e.sent),
                        (r.headers = new Headers({ Authorization: o })),
                        (e.next = 8),
                        fetch(t, r)
                      );
                    case 8:
                      return (
                        (s = e.sent),
                        (i.response = s),
                        (i.ok = s.ok),
                        (a = l(s.headers.get('WWW-Authenticate'))),
                        (i.shouldRetry = 401 === s.status && a !== n.nonce),
                        (n.nonce = a),
                        e.abrupt('return', i)
                      );
                    case 15:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this
            );
          })
        );
        return function(t, r, n) {
          return e.apply(this, arguments);
        };
      })(),
      o = (function() {
        var e = f(
          regeneratorRuntime.mark(function e(t, r, n) {
            var o;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.next = 2), i(t, r, n);
                    case 2:
                      if (!(o = e.sent).shouldRetry) {
                        e.next = 5;
                        break;
                      }
                      return e.abrupt('return', i(t, r, n));
                    case 5:
                      return e.abrupt('return', o);
                    case 6:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this
            );
          })
        );
        return function(t, r, n) {
          return e.apply(this, arguments);
        };
      })(),
      s = (function() {
        var e = f(
          regeneratorRuntime.mark(function e(t, r, i, o, s, a) {
            var u, c, f, h, l, p, d, y, v, m, b, k, x, R;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (u = window.location.hostname),
                        (c = window.location.port),
                        (f =
                          'https:' === window.location.protocol
                            ? 'wss:'
                            : 'ws:'),
                        console.log(
                          'WINDOW.LOCATION.PROTOCOL',
                          window.location.protocol
                        ),
                        (h =
                          'file:' === window.location.protocol
                            ? 'wss://send2.dev.lcip.org/api/ws'
                            : f + '//' + u + ':' + c + '/api/ws'),
                        (e.next = 7),
                        g(h)
                      );
                    case 7:
                      return (
                        (l = e.sent),
                        (e.prev = 8),
                        (p = Object(n.arrayToB64)(new Uint8Array(i))),
                        (d = {
                          fileMetadata: p,
                          authorization: 'send-v1 ' + o
                        }),
                        (y = w(l, a)),
                        l.send(JSON.stringify(d)),
                        (v = t.getReader()),
                        (e.next = 16),
                        v.read()
                      );
                    case 16:
                      (m = e.sent), (b = 0);
                    case 18:
                      if (m.done) {
                        e.next = 35;
                        break;
                      }
                      if (((k = m.value), !a.cancelled)) {
                        e.next = 22;
                        break;
                      }
                      throw a.error;
                    case 22:
                      return (
                        l.send(k),
                        s([b, r.fileSize]),
                        (b += k.length),
                        (e.next = 27),
                        v.read()
                      );
                    case 27:
                      m = e.sent;
                    case 28:
                      if (!(l.bufferedAmount > 2 * r.recordSize)) {
                        e.next = 33;
                        break;
                      }
                      return (e.next = 31), Object(n.delay)();
                    case 31:
                      e.next = 28;
                      break;
                    case 33:
                      e.next = 18;
                      break;
                    case 35:
                      return (
                        (x = new Uint8Array([0])), l.send(x), (e.next = 39), y
                      );
                    case 39:
                      return (R = e.sent), l.close(), e.abrupt('return', R);
                    case 44:
                      throw ((e.prev = 44),
                      (e.t0 = e.catch(8)),
                      l.close(4e3),
                      e.t0);
                    case 48:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this,
              [[8, 44]]
            );
          })
        );
        return function(t, r, n, i, o, s) {
          return e.apply(this, arguments);
        };
      })(),
      a = (function() {
        var e = f(
          regeneratorRuntime.mark(function e(t, r, n) {
            var i, o, s;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.next = 2), r.authHeader();
                    case 2:
                      return (
                        (i = e.sent),
                        (e.next = 5),
                        fetch('/api/download/' + t, {
                          signal: n,
                          method: 'GET',
                          headers: { Authorization: i }
                        })
                      );
                    case 5:
                      if (
                        ((o = e.sent),
                        (s = o.headers.get('WWW-Authenticate')) &&
                          (r.nonce = l(s)),
                        200 === o.status)
                      ) {
                        e.next = 10;
                        break;
                      }
                      throw new Error(o.status);
                    case 10:
                      return e.abrupt('return', o.body);
                    case 11:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this
            );
          })
        );
        return function(t, r, n) {
          return e.apply(this, arguments);
        };
      })(),
      u = (function() {
        var e = f(
          regeneratorRuntime.mark(function e(t, r, n) {
            var i,
              o =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : 1;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.prev = 0), (e.next = 3), a(t, r, n);
                    case 3:
                      return (i = e.sent), e.abrupt('return', i);
                    case 7:
                      if (
                        ((e.prev = 7),
                        (e.t0 = e.catch(0)),
                        !('401' === e.t0.message && --o > 0))
                      ) {
                        e.next = 11;
                        break;
                      }
                      return e.abrupt('return', u(t, r, n, o));
                    case 11:
                      if ('AbortError' !== e.t0.name) {
                        e.next = 13;
                        break;
                      }
                      throw new Error('0');
                    case 13:
                      throw e.t0;
                    case 14:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this,
              [[0, 7]]
            );
          })
        );
        return function(t, r, n) {
          return e.apply(this, arguments);
        };
      })(),
      c = (function() {
        var e = f(
          regeneratorRuntime.mark(function e(t, r, n, i) {
            var o,
              s =
                arguments.length > 4 && void 0 !== arguments[4]
                  ? arguments[4]
                  : 1;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.prev = 0), (e.next = 3), k(t, r, n, i);
                    case 3:
                      return (o = e.sent), e.abrupt('return', o);
                    case 7:
                      if (
                        ((e.prev = 7),
                        (e.t0 = e.catch(0)),
                        !('401' === e.t0.message && --s > 0))
                      ) {
                        e.next = 11;
                        break;
                      }
                      return e.abrupt('return', c(t, r, n, i, s));
                    case 11:
                      throw e.t0;
                    case 12:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this,
              [[0, 7]]
            );
          })
        );
        return function(t, r, n, i) {
          return e.apply(this, arguments);
        };
      })();
    function f(e) {
      return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
          return (function n(i, o) {
            try {
              var s = t[i](o),
                a = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(a).then(
                function(e) {
                  n('next', e);
                },
                function(e) {
                  n('throw', e);
                }
              );
            e(a);
          })('next');
        });
      };
    }
    function h(e) {
      return {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(e)
      };
    }
    function l(e) {
      return (e = e || '').split(' ')[1];
    }
    var p = (function() {
        var e = f(
          regeneratorRuntime.mark(function e(t, r) {
            var n;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        fetch('/api/delete/' + t, h({ owner_token: r }))
                      );
                    case 2:
                      return (n = e.sent), e.abrupt('return', n.ok);
                    case 4:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this
            );
          })
        );
        return function(t, r) {
          return e.apply(this, arguments);
        };
      })(),
      d = (function() {
        var e = f(
          regeneratorRuntime.mark(function e(t, r, n) {
            var i;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        fetch(
                          '/api/params/' + t,
                          h({ owner_token: r, dlimit: n.dlimit })
                        )
                      );
                    case 2:
                      return (i = e.sent), e.abrupt('return', i.ok);
                    case 4:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this
            );
          })
        );
        return function(t, r, n) {
          return e.apply(this, arguments);
        };
      })(),
      y = (function() {
        var e = f(
          regeneratorRuntime.mark(function e(t, r) {
            var n, i;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        fetch('/api/info/' + t, h({ owner_token: r }))
                      );
                    case 2:
                      if (!(n = e.sent).ok) {
                        e.next = 8;
                        break;
                      }
                      return (e.next = 6), n.json();
                    case 6:
                      return (i = e.sent), e.abrupt('return', i);
                    case 8:
                      throw new Error(n.status);
                    case 9:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this
            );
          })
        );
        return function(t, r) {
          return e.apply(this, arguments);
        };
      })(),
      v = (function() {
        var e = f(
          regeneratorRuntime.mark(function e(t, r) {
            var i, s, a;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        o('/api/metadata/' + t, { method: 'GET' }, r)
                      );
                    case 2:
                      if (!(i = e.sent).ok) {
                        e.next = 11;
                        break;
                      }
                      return (e.next = 6), i.response.json();
                    case 6:
                      return (
                        (s = e.sent),
                        (e.next = 9),
                        r.decryptMetadata(Object(n.b64ToArray)(s.metadata))
                      );
                    case 9:
                      return (
                        (a = e.sent),
                        e.abrupt('return', {
                          size: a.size,
                          ttl: s.ttl,
                          iv: a.iv,
                          name: a.name,
                          type: a.type
                        })
                      );
                    case 11:
                      throw new Error(i.response.status);
                    case 12:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this
            );
          })
        );
        return function(t, r) {
          return e.apply(this, arguments);
        };
      })(),
      m = (function() {
        var e = f(
          regeneratorRuntime.mark(function e(t, r, n) {
            var i, o;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.next = 2), n.authKeyB64();
                    case 2:
                      return (
                        (i = e.sent),
                        (e.next = 5),
                        fetch(
                          '/api/password/' + t,
                          h({ owner_token: r, auth: i })
                        )
                      );
                    case 5:
                      return (o = e.sent), e.abrupt('return', o.ok);
                    case 7:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this
            );
          })
        );
        return function(t, r, n) {
          return e.apply(this, arguments);
        };
      })();
    function g(e) {
      return new Promise(function(t) {
        var r = new WebSocket(e);
        r.onopen = function() {
          t(r);
        };
      });
    }
    function w(e, t) {
      return new Promise(function(r, n) {
        e.addEventListener('message', function(i) {
          try {
            var o = JSON.parse(i.data);
            if (o.error) throw new Error(o.error);
            r({ url: o.url, id: o.id, ownerToken: o.owner });
          } catch (r) {
            e.close(), (t.cancelled = !0), (t.error = r), n(r);
          }
        });
      });
    }
    function b(e, t, r, n, i) {
      var o = { cancelled: !1 };
      return {
        cancel: function() {
          (o.error = new Error(0)), (o.cancelled = !0);
        },
        result: s(e, t, r, n, i, o)
      };
    }
    function k(e, t, r, n) {
      var i = new XMLHttpRequest();
      return (
        (n.oncancel = function() {
          i.abort();
        }),
        new Promise(
          (function() {
            var o = f(
              regeneratorRuntime.mark(function o(s, a) {
                var u;
                return regeneratorRuntime.wrap(
                  function(o) {
                    for (;;)
                      switch ((o.prev = o.next)) {
                        case 0:
                          return (
                            i.addEventListener('loadend', function() {
                              n.oncancel = function() {};
                              var e = i.getResponseHeader('WWW-Authenticate');
                              if ((e && (t.nonce = l(e)), 200 !== i.status))
                                return a(new Error(i.status));
                              var r = new Blob([i.response]);
                              s(r);
                            }),
                            i.addEventListener('progress', function(e) {
                              e.lengthComputable &&
                                200 === e.target.status &&
                                r([e.loaded, e.total]);
                            }),
                            (o.next = 4),
                            t.authHeader()
                          );
                        case 4:
                          (u = o.sent),
                            i.open('get', '/api/download/' + e),
                            i.setRequestHeader('Authorization', u),
                            (i.responseType = 'blob'),
                            i.send(),
                            r([0, 1]);
                        case 10:
                        case 'end':
                          return o.stop();
                      }
                  },
                  o,
                  this
                );
              })
            );
            return function(e, t) {
              return o.apply(this, arguments);
            };
          })()
        )
      );
    }
  },
  tjlA: function(e, t, r) {
    'use strict';
    (function(e) {
      /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
      var n = r('H7XF'),
        i = r('kVK+'),
        o = r('49sm');
      function s() {
        return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function a(e, t) {
        if (s() < t) throw new RangeError('Invalid typed array length');
        return (
          u.TYPED_ARRAY_SUPPORT
            ? ((e = new Uint8Array(t)).__proto__ = u.prototype)
            : (null === e && (e = new u(t)), (e.length = t)),
          e
        );
      }
      function u(e, t, r) {
        if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u))
          return new u(e, t, r);
        if ('number' == typeof e) {
          if ('string' == typeof t)
            throw new Error(
              'If encoding is specified then the first argument must be a string'
            );
          return h(this, e);
        }
        return c(this, e, t, r);
      }
      function c(e, t, r, n) {
        if ('number' == typeof t)
          throw new TypeError('"value" argument must not be a number');
        return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer
          ? (function(e, t, r, n) {
              if ((t.byteLength, r < 0 || t.byteLength < r))
                throw new RangeError("'offset' is out of bounds");
              if (t.byteLength < r + (n || 0))
                throw new RangeError("'length' is out of bounds");
              t =
                void 0 === r && void 0 === n
                  ? new Uint8Array(t)
                  : void 0 === n
                    ? new Uint8Array(t, r)
                    : new Uint8Array(t, r, n);
              u.TYPED_ARRAY_SUPPORT
                ? ((e = t).__proto__ = u.prototype)
                : (e = l(e, t));
              return e;
            })(e, t, r, n)
          : 'string' == typeof t
            ? (function(e, t, r) {
                ('string' == typeof r && '' !== r) || (r = 'utf8');
                if (!u.isEncoding(r))
                  throw new TypeError(
                    '"encoding" must be a valid string encoding'
                  );
                var n = 0 | d(t, r),
                  i = (e = a(e, n)).write(t, r);
                i !== n && (e = e.slice(0, i));
                return e;
              })(e, t, r)
            : (function(e, t) {
                if (u.isBuffer(t)) {
                  var r = 0 | p(t.length);
                  return 0 === (e = a(e, r)).length
                    ? e
                    : (t.copy(e, 0, 0, r), e);
                }
                if (t) {
                  if (
                    ('undefined' != typeof ArrayBuffer &&
                      t.buffer instanceof ArrayBuffer) ||
                    'length' in t
                  )
                    return 'number' != typeof t.length ||
                      (function(e) {
                        return e != e;
                      })(t.length)
                      ? a(e, 0)
                      : l(e, t);
                  if ('Buffer' === t.type && o(t.data)) return l(e, t.data);
                }
                throw new TypeError(
                  'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                );
              })(e, t);
      }
      function f(e) {
        if ('number' != typeof e)
          throw new TypeError('"size" argument must be a number');
        if (e < 0) throw new RangeError('"size" argument must not be negative');
      }
      function h(e, t) {
        if ((f(t), (e = a(e, t < 0 ? 0 : 0 | p(t))), !u.TYPED_ARRAY_SUPPORT))
          for (var r = 0; r < t; ++r) e[r] = 0;
        return e;
      }
      function l(e, t) {
        var r = t.length < 0 ? 0 : 0 | p(t.length);
        e = a(e, r);
        for (var n = 0; n < r; n += 1) e[n] = 255 & t[n];
        return e;
      }
      function p(e) {
        if (e >= s())
          throw new RangeError(
            'Attempt to allocate Buffer larger than maximum size: 0x' +
              s().toString(16) +
              ' bytes'
          );
        return 0 | e;
      }
      function d(e, t) {
        if (u.isBuffer(e)) return e.length;
        if (
          'undefined' != typeof ArrayBuffer &&
          'function' == typeof ArrayBuffer.isView &&
          (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
        )
          return e.byteLength;
        'string' != typeof e && (e = '' + e);
        var r = e.length;
        if (0 === r) return 0;
        for (var n = !1; ; )
          switch (t) {
            case 'ascii':
            case 'latin1':
            case 'binary':
              return r;
            case 'utf8':
            case 'utf-8':
            case void 0:
              return F(e).length;
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return 2 * r;
            case 'hex':
              return r >>> 1;
            case 'base64':
              return q(e).length;
            default:
              if (n) return F(e).length;
              (t = ('' + t).toLowerCase()), (n = !0);
          }
      }
      function y(e, t, r) {
        var n = e[t];
        (e[t] = e[r]), (e[r] = n);
      }
      function v(e, t, r, n, i) {
        if (0 === e.length) return -1;
        if (
          ('string' == typeof r
            ? ((n = r), (r = 0))
            : r > 2147483647
              ? (r = 2147483647)
              : r < -2147483648 && (r = -2147483648),
          (r = +r),
          isNaN(r) && (r = i ? 0 : e.length - 1),
          r < 0 && (r = e.length + r),
          r >= e.length)
        ) {
          if (i) return -1;
          r = e.length - 1;
        } else if (r < 0) {
          if (!i) return -1;
          r = 0;
        }
        if (('string' == typeof t && (t = u.from(t, n)), u.isBuffer(t)))
          return 0 === t.length ? -1 : m(e, t, r, n, i);
        if ('number' == typeof t)
          return (
            (t &= 255),
            u.TYPED_ARRAY_SUPPORT &&
            'function' == typeof Uint8Array.prototype.indexOf
              ? i
                ? Uint8Array.prototype.indexOf.call(e, t, r)
                : Uint8Array.prototype.lastIndexOf.call(e, t, r)
              : m(e, [t], r, n, i)
          );
        throw new TypeError('val must be string, number or Buffer');
      }
      function m(e, t, r, n, i) {
        var o,
          s = 1,
          a = e.length,
          u = t.length;
        if (
          void 0 !== n &&
          ('ucs2' === (n = String(n).toLowerCase()) ||
            'ucs-2' === n ||
            'utf16le' === n ||
            'utf-16le' === n)
        ) {
          if (e.length < 2 || t.length < 2) return -1;
          (s = 2), (a /= 2), (u /= 2), (r /= 2);
        }
        function c(e, t) {
          return 1 === s ? e[t] : e.readUInt16BE(t * s);
        }
        if (i) {
          var f = -1;
          for (o = r; o < a; o++)
            if (c(e, o) === c(t, -1 === f ? 0 : o - f)) {
              if ((-1 === f && (f = o), o - f + 1 === u)) return f * s;
            } else -1 !== f && (o -= o - f), (f = -1);
        } else
          for (r + u > a && (r = a - u), o = r; o >= 0; o--) {
            for (var h = !0, l = 0; l < u; l++)
              if (c(e, o + l) !== c(t, l)) {
                h = !1;
                break;
              }
            if (h) return o;
          }
        return -1;
      }
      function g(e, t, r, n) {
        r = Number(r) || 0;
        var i = e.length - r;
        n ? (n = Number(n)) > i && (n = i) : (n = i);
        var o = t.length;
        if (o % 2 != 0) throw new TypeError('Invalid hex string');
        n > o / 2 && (n = o / 2);
        for (var s = 0; s < n; ++s) {
          var a = parseInt(t.substr(2 * s, 2), 16);
          if (isNaN(a)) return s;
          e[r + s] = a;
        }
        return s;
      }
      function w(e, t, r, n) {
        return N(F(t, e.length - r), e, r, n);
      }
      function b(e, t, r, n) {
        return N(
          (function(e) {
            for (var t = [], r = 0; r < e.length; ++r)
              t.push(255 & e.charCodeAt(r));
            return t;
          })(t),
          e,
          r,
          n
        );
      }
      function k(e, t, r, n) {
        return b(e, t, r, n);
      }
      function x(e, t, r, n) {
        return N(q(t), e, r, n);
      }
      function R(e, t, r, n) {
        return N(
          (function(e, t) {
            for (
              var r, n, i, o = [], s = 0;
              s < e.length && !((t -= 2) < 0);
              ++s
            )
              (r = e.charCodeAt(s)),
                (n = r >> 8),
                (i = r % 256),
                o.push(i),
                o.push(n);
            return o;
          })(t, e.length - r),
          e,
          r,
          n
        );
      }
      function E(e, t, r) {
        return 0 === t && r === e.length
          ? n.fromByteArray(e)
          : n.fromByteArray(e.slice(t, r));
      }
      function _(e, t, r) {
        r = Math.min(e.length, r);
        for (var n = [], i = t; i < r; ) {
          var o,
            s,
            a,
            u,
            c = e[i],
            f = null,
            h = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
          if (i + h <= r)
            switch (h) {
              case 1:
                c < 128 && (f = c);
                break;
              case 2:
                128 == (192 & (o = e[i + 1])) &&
                  (u = ((31 & c) << 6) | (63 & o)) > 127 &&
                  (f = u);
                break;
              case 3:
                (o = e[i + 1]),
                  (s = e[i + 2]),
                  128 == (192 & o) &&
                    128 == (192 & s) &&
                    (u = ((15 & c) << 12) | ((63 & o) << 6) | (63 & s)) >
                      2047 &&
                    (u < 55296 || u > 57343) &&
                    (f = u);
                break;
              case 4:
                (o = e[i + 1]),
                  (s = e[i + 2]),
                  (a = e[i + 3]),
                  128 == (192 & o) &&
                    128 == (192 & s) &&
                    128 == (192 & a) &&
                    (u =
                      ((15 & c) << 18) |
                      ((63 & o) << 12) |
                      ((63 & s) << 6) |
                      (63 & a)) > 65535 &&
                    u < 1114112 &&
                    (f = u);
            }
          null === f
            ? ((f = 65533), (h = 1))
            : f > 65535 &&
              ((f -= 65536),
              n.push(((f >>> 10) & 1023) | 55296),
              (f = 56320 | (1023 & f))),
            n.push(f),
            (i += h);
        }
        return (function(e) {
          var t = e.length;
          if (t <= A) return String.fromCharCode.apply(String, e);
          var r = '',
            n = 0;
          for (; n < t; )
            r += String.fromCharCode.apply(String, e.slice(n, (n += A)));
          return r;
        })(n);
      }
      (t.Buffer = u),
        (t.SlowBuffer = function(e) {
          +e != e && (e = 0);
          return u.alloc(+e);
        }),
        (t.INSPECT_MAX_BYTES = 50),
        (u.TYPED_ARRAY_SUPPORT =
          void 0 !== e.TYPED_ARRAY_SUPPORT
            ? e.TYPED_ARRAY_SUPPORT
            : (function() {
                try {
                  var e = new Uint8Array(1);
                  return (
                    (e.__proto__ = {
                      __proto__: Uint8Array.prototype,
                      foo: function() {
                        return 42;
                      }
                    }),
                    42 === e.foo() &&
                      'function' == typeof e.subarray &&
                      0 === e.subarray(1, 1).byteLength
                  );
                } catch (e) {
                  return !1;
                }
              })()),
        (t.kMaxLength = s()),
        (u.poolSize = 8192),
        (u._augment = function(e) {
          return (e.__proto__ = u.prototype), e;
        }),
        (u.from = function(e, t, r) {
          return c(null, e, t, r);
        }),
        u.TYPED_ARRAY_SUPPORT &&
          ((u.prototype.__proto__ = Uint8Array.prototype),
          (u.__proto__ = Uint8Array),
          'undefined' != typeof Symbol &&
            Symbol.species &&
            u[Symbol.species] === u &&
            Object.defineProperty(u, Symbol.species, {
              value: null,
              configurable: !0
            })),
        (u.alloc = function(e, t, r) {
          return (function(e, t, r, n) {
            return (
              f(t),
              t <= 0
                ? a(e, t)
                : void 0 !== r
                  ? 'string' == typeof n
                    ? a(e, t).fill(r, n)
                    : a(e, t).fill(r)
                  : a(e, t)
            );
          })(null, e, t, r);
        }),
        (u.allocUnsafe = function(e) {
          return h(null, e);
        }),
        (u.allocUnsafeSlow = function(e) {
          return h(null, e);
        }),
        (u.isBuffer = function(e) {
          return !(null == e || !e._isBuffer);
        }),
        (u.compare = function(e, t) {
          if (!u.isBuffer(e) || !u.isBuffer(t))
            throw new TypeError('Arguments must be Buffers');
          if (e === t) return 0;
          for (
            var r = e.length, n = t.length, i = 0, o = Math.min(r, n);
            i < o;
            ++i
          )
            if (e[i] !== t[i]) {
              (r = e[i]), (n = t[i]);
              break;
            }
          return r < n ? -1 : n < r ? 1 : 0;
        }),
        (u.isEncoding = function(e) {
          switch (String(e).toLowerCase()) {
            case 'hex':
            case 'utf8':
            case 'utf-8':
            case 'ascii':
            case 'latin1':
            case 'binary':
            case 'base64':
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return !0;
            default:
              return !1;
          }
        }),
        (u.concat = function(e, t) {
          if (!o(e))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === e.length) return u.alloc(0);
          var r;
          if (void 0 === t)
            for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
          var n = u.allocUnsafe(t),
            i = 0;
          for (r = 0; r < e.length; ++r) {
            var s = e[r];
            if (!u.isBuffer(s))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            s.copy(n, i), (i += s.length);
          }
          return n;
        }),
        (u.byteLength = d),
        (u.prototype._isBuffer = !0),
        (u.prototype.swap16 = function() {
          var e = this.length;
          if (e % 2 != 0)
            throw new RangeError('Buffer size must be a multiple of 16-bits');
          for (var t = 0; t < e; t += 2) y(this, t, t + 1);
          return this;
        }),
        (u.prototype.swap32 = function() {
          var e = this.length;
          if (e % 4 != 0)
            throw new RangeError('Buffer size must be a multiple of 32-bits');
          for (var t = 0; t < e; t += 4)
            y(this, t, t + 3), y(this, t + 1, t + 2);
          return this;
        }),
        (u.prototype.swap64 = function() {
          var e = this.length;
          if (e % 8 != 0)
            throw new RangeError('Buffer size must be a multiple of 64-bits');
          for (var t = 0; t < e; t += 8)
            y(this, t, t + 7),
              y(this, t + 1, t + 6),
              y(this, t + 2, t + 5),
              y(this, t + 3, t + 4);
          return this;
        }),
        (u.prototype.toString = function() {
          var e = 0 | this.length;
          return 0 === e
            ? ''
            : 0 === arguments.length
              ? _(this, 0, e)
              : function(e, t, r) {
                  var n = !1;
                  if (((void 0 === t || t < 0) && (t = 0), t > this.length))
                    return '';
                  if (
                    ((void 0 === r || r > this.length) && (r = this.length),
                    r <= 0)
                  )
                    return '';
                  if ((r >>>= 0) <= (t >>>= 0)) return '';
                  for (e || (e = 'utf8'); ; )
                    switch (e) {
                      case 'hex':
                        return P(this, t, r);
                      case 'utf8':
                      case 'utf-8':
                        return _(this, t, r);
                      case 'ascii':
                        return S(this, t, r);
                      case 'latin1':
                      case 'binary':
                        return O(this, t, r);
                      case 'base64':
                        return E(this, t, r);
                      case 'ucs2':
                      case 'ucs-2':
                      case 'utf16le':
                      case 'utf-16le':
                        return T(this, t, r);
                      default:
                        if (n) throw new TypeError('Unknown encoding: ' + e);
                        (e = (e + '').toLowerCase()), (n = !0);
                    }
                }.apply(this, arguments);
        }),
        (u.prototype.equals = function(e) {
          if (!u.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
          return this === e || 0 === u.compare(this, e);
        }),
        (u.prototype.inspect = function() {
          var e = '',
            r = t.INSPECT_MAX_BYTES;
          return (
            this.length > 0 &&
              ((e = this.toString('hex', 0, r)
                .match(/.{2}/g)
                .join(' ')),
              this.length > r && (e += ' ... ')),
            '<Buffer ' + e + '>'
          );
        }),
        (u.prototype.compare = function(e, t, r, n, i) {
          if (!u.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
          if (
            (void 0 === t && (t = 0),
            void 0 === r && (r = e ? e.length : 0),
            void 0 === n && (n = 0),
            void 0 === i && (i = this.length),
            t < 0 || r > e.length || n < 0 || i > this.length)
          )
            throw new RangeError('out of range index');
          if (n >= i && t >= r) return 0;
          if (n >= i) return -1;
          if (t >= r) return 1;
          if (((t >>>= 0), (r >>>= 0), (n >>>= 0), (i >>>= 0), this === e))
            return 0;
          for (
            var o = i - n,
              s = r - t,
              a = Math.min(o, s),
              c = this.slice(n, i),
              f = e.slice(t, r),
              h = 0;
            h < a;
            ++h
          )
            if (c[h] !== f[h]) {
              (o = c[h]), (s = f[h]);
              break;
            }
          return o < s ? -1 : s < o ? 1 : 0;
        }),
        (u.prototype.includes = function(e, t, r) {
          return -1 !== this.indexOf(e, t, r);
        }),
        (u.prototype.indexOf = function(e, t, r) {
          return v(this, e, t, r, !0);
        }),
        (u.prototype.lastIndexOf = function(e, t, r) {
          return v(this, e, t, r, !1);
        }),
        (u.prototype.write = function(e, t, r, n) {
          if (void 0 === t) (n = 'utf8'), (r = this.length), (t = 0);
          else if (void 0 === r && 'string' == typeof t)
            (n = t), (r = this.length), (t = 0);
          else {
            if (!isFinite(t))
              throw new Error(
                'Buffer.write(string, encoding, offset[, length]) is no longer supported'
              );
            (t |= 0),
              isFinite(r)
                ? ((r |= 0), void 0 === n && (n = 'utf8'))
                : ((n = r), (r = void 0));
          }
          var i = this.length - t;
          if (
            ((void 0 === r || r > i) && (r = i),
            (e.length > 0 && (r < 0 || t < 0)) || t > this.length)
          )
            throw new RangeError('Attempt to write outside buffer bounds');
          n || (n = 'utf8');
          for (var o = !1; ; )
            switch (n) {
              case 'hex':
                return g(this, e, t, r);
              case 'utf8':
              case 'utf-8':
                return w(this, e, t, r);
              case 'ascii':
                return b(this, e, t, r);
              case 'latin1':
              case 'binary':
                return k(this, e, t, r);
              case 'base64':
                return x(this, e, t, r);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return R(this, e, t, r);
              default:
                if (o) throw new TypeError('Unknown encoding: ' + n);
                (n = ('' + n).toLowerCase()), (o = !0);
            }
        }),
        (u.prototype.toJSON = function() {
          return {
            type: 'Buffer',
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        });
      var A = 4096;
      function S(e, t, r) {
        var n = '';
        r = Math.min(e.length, r);
        for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
        return n;
      }
      function O(e, t, r) {
        var n = '';
        r = Math.min(e.length, r);
        for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
        return n;
      }
      function P(e, t, r) {
        var n = e.length;
        (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
        for (var i = '', o = t; o < r; ++o) i += D(e[o]);
        return i;
      }
      function T(e, t, r) {
        for (var n = e.slice(t, r), i = '', o = 0; o < n.length; o += 2)
          i += String.fromCharCode(n[o] + 256 * n[o + 1]);
        return i;
      }
      function I(e, t, r) {
        if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint');
        if (e + t > r)
          throw new RangeError('Trying to access beyond buffer length');
      }
      function L(e, t, r, n, i, o) {
        if (!u.isBuffer(e))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (t > i || t < o)
          throw new RangeError('"value" argument is out of bounds');
        if (r + n > e.length) throw new RangeError('Index out of range');
      }
      function C(e, t, r, n) {
        t < 0 && (t = 65535 + t + 1);
        for (var i = 0, o = Math.min(e.length - r, 2); i < o; ++i)
          e[r + i] =
            (t & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i));
      }
      function U(e, t, r, n) {
        t < 0 && (t = 4294967295 + t + 1);
        for (var i = 0, o = Math.min(e.length - r, 4); i < o; ++i)
          e[r + i] = (t >>> (8 * (n ? i : 3 - i))) & 255;
      }
      function B(e, t, r, n, i, o) {
        if (r + n > e.length) throw new RangeError('Index out of range');
        if (r < 0) throw new RangeError('Index out of range');
      }
      function M(e, t, r, n, o) {
        return o || B(e, 0, r, 4), i.write(e, t, r, n, 23, 4), r + 4;
      }
      function j(e, t, r, n, o) {
        return o || B(e, 0, r, 8), i.write(e, t, r, n, 52, 8), r + 8;
      }
      (u.prototype.slice = function(e, t) {
        var r,
          n = this.length;
        if (
          ((e = ~~e),
          (t = void 0 === t ? n : ~~t),
          e < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
          t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
          t < e && (t = e),
          u.TYPED_ARRAY_SUPPORT)
        )
          (r = this.subarray(e, t)).__proto__ = u.prototype;
        else {
          var i = t - e;
          r = new u(i, void 0);
          for (var o = 0; o < i; ++o) r[o] = this[o + e];
        }
        return r;
      }),
        (u.prototype.readUIntLE = function(e, t, r) {
          (e |= 0), (t |= 0), r || I(e, t, this.length);
          for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
            n += this[e + o] * i;
          return n;
        }),
        (u.prototype.readUIntBE = function(e, t, r) {
          (e |= 0), (t |= 0), r || I(e, t, this.length);
          for (var n = this[e + --t], i = 1; t > 0 && (i *= 256); )
            n += this[e + --t] * i;
          return n;
        }),
        (u.prototype.readUInt8 = function(e, t) {
          return t || I(e, 1, this.length), this[e];
        }),
        (u.prototype.readUInt16LE = function(e, t) {
          return t || I(e, 2, this.length), this[e] | (this[e + 1] << 8);
        }),
        (u.prototype.readUInt16BE = function(e, t) {
          return t || I(e, 2, this.length), (this[e] << 8) | this[e + 1];
        }),
        (u.prototype.readUInt32LE = function(e, t) {
          return (
            t || I(e, 4, this.length),
            (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
              16777216 * this[e + 3]
          );
        }),
        (u.prototype.readUInt32BE = function(e, t) {
          return (
            t || I(e, 4, this.length),
            16777216 * this[e] +
              ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
          );
        }),
        (u.prototype.readIntLE = function(e, t, r) {
          (e |= 0), (t |= 0), r || I(e, t, this.length);
          for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
            n += this[e + o] * i;
          return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n;
        }),
        (u.prototype.readIntBE = function(e, t, r) {
          (e |= 0), (t |= 0), r || I(e, t, this.length);
          for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256); )
            o += this[e + --n] * i;
          return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)), o;
        }),
        (u.prototype.readInt8 = function(e, t) {
          return (
            t || I(e, 1, this.length),
            128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
          );
        }),
        (u.prototype.readInt16LE = function(e, t) {
          t || I(e, 2, this.length);
          var r = this[e] | (this[e + 1] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (u.prototype.readInt16BE = function(e, t) {
          t || I(e, 2, this.length);
          var r = this[e + 1] | (this[e] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (u.prototype.readInt32LE = function(e, t) {
          return (
            t || I(e, 4, this.length),
            this[e] |
              (this[e + 1] << 8) |
              (this[e + 2] << 16) |
              (this[e + 3] << 24)
          );
        }),
        (u.prototype.readInt32BE = function(e, t) {
          return (
            t || I(e, 4, this.length),
            (this[e] << 24) |
              (this[e + 1] << 16) |
              (this[e + 2] << 8) |
              this[e + 3]
          );
        }),
        (u.prototype.readFloatLE = function(e, t) {
          return t || I(e, 4, this.length), i.read(this, e, !0, 23, 4);
        }),
        (u.prototype.readFloatBE = function(e, t) {
          return t || I(e, 4, this.length), i.read(this, e, !1, 23, 4);
        }),
        (u.prototype.readDoubleLE = function(e, t) {
          return t || I(e, 8, this.length), i.read(this, e, !0, 52, 8);
        }),
        (u.prototype.readDoubleBE = function(e, t) {
          return t || I(e, 8, this.length), i.read(this, e, !1, 52, 8);
        }),
        (u.prototype.writeUIntLE = function(e, t, r, n) {
          ((e = +e), (t |= 0), (r |= 0), n) ||
            L(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
          var i = 1,
            o = 0;
          for (this[t] = 255 & e; ++o < r && (i *= 256); )
            this[t + o] = (e / i) & 255;
          return t + r;
        }),
        (u.prototype.writeUIntBE = function(e, t, r, n) {
          ((e = +e), (t |= 0), (r |= 0), n) ||
            L(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
          var i = r - 1,
            o = 1;
          for (this[t + i] = 255 & e; --i >= 0 && (o *= 256); )
            this[t + i] = (e / o) & 255;
          return t + r;
        }),
        (u.prototype.writeUInt8 = function(e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || L(this, e, t, 1, 255, 0),
            u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            (this[t] = 255 & e),
            t + 1
          );
        }),
        (u.prototype.writeUInt16LE = function(e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || L(this, e, t, 2, 65535, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
              : C(this, e, t, !0),
            t + 2
          );
        }),
        (u.prototype.writeUInt16BE = function(e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || L(this, e, t, 2, 65535, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
              : C(this, e, t, !1),
            t + 2
          );
        }),
        (u.prototype.writeUInt32LE = function(e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || L(this, e, t, 4, 4294967295, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t + 3] = e >>> 24),
                (this[t + 2] = e >>> 16),
                (this[t + 1] = e >>> 8),
                (this[t] = 255 & e))
              : U(this, e, t, !0),
            t + 4
          );
        }),
        (u.prototype.writeUInt32BE = function(e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || L(this, e, t, 4, 4294967295, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = e >>> 24),
                (this[t + 1] = e >>> 16),
                (this[t + 2] = e >>> 8),
                (this[t + 3] = 255 & e))
              : U(this, e, t, !1),
            t + 4
          );
        }),
        (u.prototype.writeIntLE = function(e, t, r, n) {
          if (((e = +e), (t |= 0), !n)) {
            var i = Math.pow(2, 8 * r - 1);
            L(this, e, t, r, i - 1, -i);
          }
          var o = 0,
            s = 1,
            a = 0;
          for (this[t] = 255 & e; ++o < r && (s *= 256); )
            e < 0 && 0 === a && 0 !== this[t + o - 1] && (a = 1),
              (this[t + o] = (((e / s) >> 0) - a) & 255);
          return t + r;
        }),
        (u.prototype.writeIntBE = function(e, t, r, n) {
          if (((e = +e), (t |= 0), !n)) {
            var i = Math.pow(2, 8 * r - 1);
            L(this, e, t, r, i - 1, -i);
          }
          var o = r - 1,
            s = 1,
            a = 0;
          for (this[t + o] = 255 & e; --o >= 0 && (s *= 256); )
            e < 0 && 0 === a && 0 !== this[t + o + 1] && (a = 1),
              (this[t + o] = (((e / s) >> 0) - a) & 255);
          return t + r;
        }),
        (u.prototype.writeInt8 = function(e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || L(this, e, t, 1, 127, -128),
            u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            e < 0 && (e = 255 + e + 1),
            (this[t] = 255 & e),
            t + 1
          );
        }),
        (u.prototype.writeInt16LE = function(e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || L(this, e, t, 2, 32767, -32768),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
              : C(this, e, t, !0),
            t + 2
          );
        }),
        (u.prototype.writeInt16BE = function(e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || L(this, e, t, 2, 32767, -32768),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
              : C(this, e, t, !1),
            t + 2
          );
        }),
        (u.prototype.writeInt32LE = function(e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || L(this, e, t, 4, 2147483647, -2147483648),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = 255 & e),
                (this[t + 1] = e >>> 8),
                (this[t + 2] = e >>> 16),
                (this[t + 3] = e >>> 24))
              : U(this, e, t, !0),
            t + 4
          );
        }),
        (u.prototype.writeInt32BE = function(e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || L(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = e >>> 24),
                (this[t + 1] = e >>> 16),
                (this[t + 2] = e >>> 8),
                (this[t + 3] = 255 & e))
              : U(this, e, t, !1),
            t + 4
          );
        }),
        (u.prototype.writeFloatLE = function(e, t, r) {
          return M(this, e, t, !0, r);
        }),
        (u.prototype.writeFloatBE = function(e, t, r) {
          return M(this, e, t, !1, r);
        }),
        (u.prototype.writeDoubleLE = function(e, t, r) {
          return j(this, e, t, !0, r);
        }),
        (u.prototype.writeDoubleBE = function(e, t, r) {
          return j(this, e, t, !1, r);
        }),
        (u.prototype.copy = function(e, t, r, n) {
          if (
            (r || (r = 0),
            n || 0 === n || (n = this.length),
            t >= e.length && (t = e.length),
            t || (t = 0),
            n > 0 && n < r && (n = r),
            n === r)
          )
            return 0;
          if (0 === e.length || 0 === this.length) return 0;
          if (t < 0) throw new RangeError('targetStart out of bounds');
          if (r < 0 || r >= this.length)
            throw new RangeError('sourceStart out of bounds');
          if (n < 0) throw new RangeError('sourceEnd out of bounds');
          n > this.length && (n = this.length),
            e.length - t < n - r && (n = e.length - t + r);
          var i,
            o = n - r;
          if (this === e && r < t && t < n)
            for (i = o - 1; i >= 0; --i) e[i + t] = this[i + r];
          else if (o < 1e3 || !u.TYPED_ARRAY_SUPPORT)
            for (i = 0; i < o; ++i) e[i + t] = this[i + r];
          else Uint8Array.prototype.set.call(e, this.subarray(r, r + o), t);
          return o;
        }),
        (u.prototype.fill = function(e, t, r, n) {
          if ('string' == typeof e) {
            if (
              ('string' == typeof t
                ? ((n = t), (t = 0), (r = this.length))
                : 'string' == typeof r && ((n = r), (r = this.length)),
              1 === e.length)
            ) {
              var i = e.charCodeAt(0);
              i < 256 && (e = i);
            }
            if (void 0 !== n && 'string' != typeof n)
              throw new TypeError('encoding must be a string');
            if ('string' == typeof n && !u.isEncoding(n))
              throw new TypeError('Unknown encoding: ' + n);
          } else 'number' == typeof e && (e &= 255);
          if (t < 0 || this.length < t || this.length < r)
            throw new RangeError('Out of range index');
          if (r <= t) return this;
          var o;
          if (
            ((t >>>= 0),
            (r = void 0 === r ? this.length : r >>> 0),
            e || (e = 0),
            'number' == typeof e)
          )
            for (o = t; o < r; ++o) this[o] = e;
          else {
            var s = u.isBuffer(e) ? e : F(new u(e, n).toString()),
              a = s.length;
            for (o = 0; o < r - t; ++o) this[o + t] = s[o % a];
          }
          return this;
        });
      var z = /[^+\/0-9A-Za-z-_]/g;
      function D(e) {
        return e < 16 ? '0' + e.toString(16) : e.toString(16);
      }
      function F(e, t) {
        var r;
        t = t || 1 / 0;
        for (var n = e.length, i = null, o = [], s = 0; s < n; ++s) {
          if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
            if (!i) {
              if (r > 56319) {
                (t -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (s + 1 === n) {
                (t -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              i = r;
              continue;
            }
            if (r < 56320) {
              (t -= 3) > -1 && o.push(239, 191, 189), (i = r);
              continue;
            }
            r = 65536 + (((i - 55296) << 10) | (r - 56320));
          } else i && (t -= 3) > -1 && o.push(239, 191, 189);
          if (((i = null), r < 128)) {
            if ((t -= 1) < 0) break;
            o.push(r);
          } else if (r < 2048) {
            if ((t -= 2) < 0) break;
            o.push((r >> 6) | 192, (63 & r) | 128);
          } else if (r < 65536) {
            if ((t -= 3) < 0) break;
            o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
          } else {
            if (!(r < 1114112)) throw new Error('Invalid code point');
            if ((t -= 4) < 0) break;
            o.push(
              (r >> 18) | 240,
              ((r >> 12) & 63) | 128,
              ((r >> 6) & 63) | 128,
              (63 & r) | 128
            );
          }
        }
        return o;
      }
      function q(e) {
        return n.toByteArray(
          (function(e) {
            if (
              (e = (function(e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
              })(e).replace(z, '')).length < 2
            )
              return '';
            for (; e.length % 4 != 0; ) e += '=';
            return e;
          })(e)
        );
      }
      function N(e, t, r, n) {
        for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i)
          t[i + r] = e[i];
        return i;
      }
    }.call(this, r('yLpj')));
  },
  v2Ej: function(e, t, r) {
    var n,
      i = r('1YUc')();
    o.disabled = !0;
    try {
      (n = window.performance),
        (o.disabled =
          'true' === window.localStorage.DISABLE_NANOTIMING || !n.mark);
    } catch (e) {}
    function o(e) {
      if (o.disabled) return s;
      var t = (1e4 * n.now()).toFixed() % Number.MAX_SAFE_INTEGER,
        r = 'start-' + t + '-' + e;
      function a(o) {
        var s = 'end-' + t + '-' + e;
        n.mark(s),
          i.push(function() {
            var i = null;
            try {
              var a = e + ' [' + t + ']';
              n.measure(a, r, s), n.clearMarks(r), n.clearMarks(s);
            } catch (e) {
              i = e;
            }
            o && o(i, e);
          });
      }
      return n.mark(r), (a.uuid = t), a;
    }
    function s(e) {
      e &&
        i.push(function() {
          e(new Error('nanotiming: performance API unavailable'));
        });
    }
    e.exports = o;
  },
  xBST: function(e, t, r) {
    'use strict';
    r.r(t);
    var n = r('7+Rn'),
      i = r.n(n),
      o = r('U82S'),
      s = r('b7qI'),
      a = r('hwFe'),
      u = r('st+R'),
      c = (function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
    var f = (function(e) {
        function t(e) {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t);
          var r = (function(e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ('object' != typeof t && 'function' != typeof t)
              ? e
              : t;
          })(
            this,
            (t.__proto__ || Object.getPrototypeOf(t)).call(this, 'FileSender')
          );
          return (r.file = e), (r.keychain = new s.a()), r.reset(), r;
        }
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function, not ' +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, i.a),
          c(t, [
            {
              key: 'reset',
              value: function() {
                (this.uploadRequest = null),
                  (this.msg = 'importingFile'),
                  (this.progress = [0, 1]),
                  (this.cancelled = !1);
              }
            },
            {
              key: 'cancel',
              value: function() {
                (this.cancelled = !0),
                  this.uploadRequest && this.uploadRequest.cancel();
              }
            },
            {
              key: 'readFile',
              value: function() {
                var e = this;
                return new Promise(function(t, r) {
                  var n = new FileReader();
                  n.readAsArrayBuffer(e.file),
                    (n.onload = function(e) {
                      var r = new Uint8Array(this.result);
                      t(r);
                    }),
                    (n.onerror = function(e) {
                      r(e);
                    });
                });
              }
            },
            {
              key: 'upload',
              value: (function() {
                var e = (function(e) {
                  return function() {
                    var t = e.apply(this, arguments);
                    return new Promise(function(e, r) {
                      return (function n(i, o) {
                        try {
                          var s = t[i](o),
                            a = s.value;
                        } catch (e) {
                          return void r(e);
                        }
                        if (!s.done)
                          return Promise.resolve(a).then(
                            function(e) {
                              n('next', e);
                            },
                            function(e) {
                              n('throw', e);
                            }
                          );
                        e(a);
                      })('next');
                    });
                  };
                })(
                  regeneratorRuntime.mark(function e() {
                    var t,
                      r,
                      n,
                      i,
                      s,
                      c,
                      f,
                      h,
                      l = this;
                    return regeneratorRuntime.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (((t = Date.now()), !this.cancelled)) {
                                e.next = 3;
                                break;
                              }
                              throw new Error(0);
                            case 3:
                              return (
                                (this.msg = 'encryptingFile'),
                                this.emit('encrypting'),
                                (e.next = 7),
                                this.keychain.encryptStream(this.file)
                              );
                            case 7:
                              return (
                                (r = e.sent),
                                (e.next = 10),
                                this.keychain.encryptMetadata(this.file)
                              );
                            case 10:
                              return (
                                (n = e.sent),
                                (e.next = 13),
                                this.keychain.authKeyB64()
                              );
                            case 13:
                              if (
                                ((i = e.sent),
                                (this.uploadRequest = Object(u.f)(
                                  r.stream,
                                  r.streamInfo,
                                  n,
                                  i,
                                  function(e) {
                                    (l.progress = e), l.emit('progress');
                                  }
                                )),
                                !this.cancelled)
                              ) {
                                e.next = 17;
                                break;
                              }
                              throw new Error(0);
                            case 17:
                              return (
                                (this.msg = 'fileSizeProgress'),
                                this.emit('progress'),
                                (e.prev = 19),
                                (e.next = 22),
                                this.uploadRequest.result
                              );
                            case 22:
                              return (
                                (s = e.sent),
                                (c = Date.now() - t),
                                (this.msg = 'notifyUploadDone'),
                                (this.uploadRequest = null),
                                (this.progress = [1, 1]),
                                (f = Object(a.arrayToB64)(
                                  this.keychain.rawSecret
                                )),
                                (h = new o.a({
                                  id: s.id,
                                  url: s.url + '#' + f,
                                  name: this.file.name,
                                  size: this.file.size,
                                  time: c,
                                  speed: this.file.size / (c / 1e3),
                                  createdAt: Date.now(),
                                  expiresAt: Date.now() + 1e3 * EXPIRE_SECONDS,
                                  secretKey: f,
                                  nonce: this.keychain.nonce,
                                  ownerToken: s.ownerToken
                                })),
                                e.abrupt('return', h)
                              );
                            case 32:
                              throw ((e.prev = 32),
                              (e.t0 = e.catch(19)),
                              (this.msg = 'errorPageHeader'),
                              (this.uploadRequest = null),
                              e.t0);
                            case 37:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[19, 32]]
                    );
                  })
                );
                return function() {
                  return e.apply(this, arguments);
                };
              })()
            },
            {
              key: 'progressRatio',
              get: function() {
                return this.progress[0] / this.progress[1];
              }
            },
            {
              key: 'progressIndefinite',
              get: function() {
                return (
                  -1 ===
                  ['fileSizeProgress', 'notifyUploadDone'].indexOf(this.msg)
                );
              }
            },
            {
              key: 'sizes',
              get: function() {
                return {
                  partialSize: Object(a.bytes)(this.progress[0]),
                  totalSize: Object(a.bytes)(this.progress[1])
                };
              }
            }
          ]),
          t
        );
      })(),
      h = (function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
    function l(e) {
      return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
          return (function n(i, o) {
            try {
              var s = t[i](o),
                a = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(a).then(
                function(e) {
                  n('next', e);
                },
                function(e) {
                  n('throw', e);
                }
              );
            e(a);
          })('next');
        });
      };
    }
    var p = (function(e) {
        function t(e) {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t);
          var r = (function(e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ('object' != typeof t && 'function' != typeof t)
              ? e
              : t;
          })(
            this,
            (t.__proto__ || Object.getPrototypeOf(t)).call(this, 'FileReceiver')
          );
          return (
            (r.keychain = new s.a(e.secretKey, e.nonce)),
            e.requiresPassword && r.keychain.setPassword(e.password, e.url),
            (r.fileInfo = e),
            r.reset(),
            r
          );
        }
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function, not ' +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, i.a),
          h(t, [
            {
              key: 'cancel',
              value: function() {
                this.downloadRequest && this.downloadRequest.cancel();
              }
            },
            {
              key: 'reset',
              value: function() {
                (this.msg = 'fileSizeProgress'),
                  (this.state = 'initialized'),
                  (this.progress = [0, 1]);
              }
            },
            {
              key: 'getMetadata',
              value: (function() {
                var e = l(
                  regeneratorRuntime.mark(function e() {
                    var t;
                    return regeneratorRuntime.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 2),
                                Object(u.c)(this.fileInfo.id, this.keychain)
                              );
                            case 2:
                              (t = e.sent),
                                this.keychain.setIV(t.iv),
                                (this.fileInfo.name = t.name),
                                (this.fileInfo.type = t.type),
                                (this.fileInfo.iv = t.iv),
                                (this.fileInfo.size = t.size),
                                (this.state = 'ready');
                            case 9:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function() {
                  return e.apply(this, arguments);
                };
              })()
            },
            {
              key: 'streamToArrayBuffer',
              value: (function() {
                var e = l(
                  regeneratorRuntime.mark(function e(t, r, n) {
                    var i, o, s, a;
                    return regeneratorRuntime.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (i = new Uint8Array(r)),
                                (o = 0),
                                (s = t.getReader()),
                                (e.next = 5),
                                s.read()
                              );
                            case 5:
                              a = e.sent;
                            case 6:
                              if (a.done) {
                                e.next = 15;
                                break;
                              }
                              return (
                                i.set(a.value, o),
                                (o += a.value.length),
                                (e.next = 11),
                                s.read()
                              );
                            case 11:
                              (a = e.sent), n([o, r]), (e.next = 6);
                              break;
                            case 15:
                              return (
                                n([r, r]),
                                e.abrupt('return', i.slice(0, o).buffer)
                              );
                            case 17:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function(t, r, n) {
                  return e.apply(this, arguments);
                };
              })()
            },
            {
              key: 'sendMessageToSw',
              value: function(e) {
                return new Promise(function(t, r) {
                  var n = new MessageChannel();
                  (n.port1.onmessage = function(e) {
                    void 0 === e.data
                      ? r('bad response from serviceWorker')
                      : void 0 !== e.data.error
                        ? r(e.data.error)
                        : t(e.data);
                  }),
                    navigator.serviceWorker.controller.postMessage(e, [
                      n.port2
                    ]);
                });
              }
            },
            {
              key: 'download',
              value: (function() {
                var e = l(
                  regeneratorRuntime.mark(function e() {
                    var t,
                      r,
                      n,
                      i,
                      o,
                      s,
                      u,
                      c = this,
                      f =
                        arguments.length > 0 &&
                        void 0 !== arguments[0] &&
                        arguments[0];
                    return regeneratorRuntime.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (t = function(e) {
                                  (c.progress = e), c.emit('progress');
                                }),
                                (this.downloadRequest = {
                                  cancel: function() {
                                    c.sendMessageToSw({
                                      request: 'cancel',
                                      id: c.fileInfo.id
                                    });
                                  }
                                }),
                                (e.prev = 2),
                                (this.state = 'downloading'),
                                (r = {
                                  request: 'init',
                                  id: this.fileInfo.id,
                                  filename: this.fileInfo.name,
                                  type: this.fileInfo.type,
                                  key: this.fileInfo.secretKey,
                                  requiresPassword: this.fileInfo
                                    .requiresPassword,
                                  password: this.fileInfo.password,
                                  url: this.fileInfo.url,
                                  size: this.fileInfo.size,
                                  nonce: this.keychain.nonce,
                                  noSave: f
                                }),
                                (e.next = 7),
                                this.sendMessageToSw(r)
                              );
                            case 7:
                              if ((t([0, this.fileInfo.size]), !f)) {
                                e.next = 16;
                                break;
                              }
                              return (
                                (e.next = 11),
                                fetch('/api/download/' + this.fileInfo.id)
                              );
                            case 11:
                              if (200 === (n = e.sent).status) {
                                e.next = 14;
                                break;
                              }
                              throw new Error(n.status);
                            case 14:
                              e.next = 21;
                              break;
                            case 16:
                              (i =
                                location.protocol +
                                '//' +
                                location.host +
                                '/api/download/' +
                                this.fileInfo.id),
                                ((o = document.createElement('a')).href = i),
                                document.body.appendChild(o),
                                o.click();
                            case 21:
                              s = 0;
                            case 22:
                              if (!(s < this.fileInfo.size)) {
                                e.next = 32;
                                break;
                              }
                              return (
                                (e.next = 25),
                                this.sendMessageToSw({
                                  request: 'progress',
                                  id: this.fileInfo.id
                                })
                              );
                            case 25:
                              return (
                                (u = e.sent),
                                (s = u.progress),
                                t([s, this.fileInfo.size]),
                                (e.next = 30),
                                Object(a.delay)(1e3)
                              );
                            case 30:
                              e.next = 22;
                              break;
                            case 32:
                              (this.downloadRequest = null),
                                (this.msg = 'downloadFinish'),
                                (this.state = 'complete'),
                                (e.next = 43);
                              break;
                            case 37:
                              if (
                                ((e.prev = 37),
                                (e.t0 = e.catch(2)),
                                (this.downloadRequest = null),
                                'cancelled' !== e.t0)
                              ) {
                                e.next = 42;
                                break;
                              }
                              throw new Error(0);
                            case 42:
                              throw e.t0;
                            case 43:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[2, 37]]
                    );
                  })
                );
                return function() {
                  return e.apply(this, arguments);
                };
              })()
            },
            {
              key: 'progressRatio',
              get: function() {
                return this.progress[0] / this.progress[1];
              }
            },
            {
              key: 'progressIndefinite',
              get: function() {
                return 'downloading' !== this.state;
              }
            },
            {
              key: 'sizes',
              get: function() {
                return {
                  partialSize: Object(a.bytes)(this.progress[0]),
                  totalSize: Object(a.bytes)(this.progress[1])
                };
              }
            }
          ]),
          t
        );
      })(),
      d = r('Ip04');
    function y(e) {
      return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
          return (function n(i, o) {
            try {
              var s = t[i](o),
                a = s.value;
            } catch (e) {
              return void r(e);
            }
            if (!s.done)
              return Promise.resolve(a).then(
                function(e) {
                  n('next', e);
                },
                function(e) {
                  n('throw', e);
                }
              );
            e(a);
          })('next');
        });
      };
    }
    t.default = function(e, t) {
      var r = this,
        n = (function() {
          var t = y(
            regeneratorRuntime.mark(function t() {
              var r, n, i, o, a, u, c, f, h, l;
              return regeneratorRuntime.wrap(
                function(t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        (r = e.storage.files.slice()),
                          (n = !1),
                          (i = !0),
                          (o = !1),
                          (a = void 0),
                          (t.prev = 5),
                          (u = r[Symbol.iterator]());
                      case 7:
                        if ((i = (c = u.next()).done)) {
                          t.next = 17;
                          break;
                        }
                        return (
                          (f = c.value),
                          (h = f.dlimit),
                          (l = f.dtotal),
                          (t.next = 13),
                          f.updateDownloadCount()
                        );
                      case 13:
                        f.dtotal === f.dlimit
                          ? (e.storage.remove(f.id), (n = !0))
                          : (h === f.dlimit && l === f.dtotal) || (n = !0);
                      case 14:
                        (i = !0), (t.next = 7);
                        break;
                      case 17:
                        t.next = 23;
                        break;
                      case 19:
                        (t.prev = 19),
                          (t.t0 = t.catch(5)),
                          (o = !0),
                          (a = t.t0);
                      case 23:
                        (t.prev = 23),
                          (t.prev = 24),
                          !i && u.return && u.return();
                      case 26:
                        if (((t.prev = 26), !o)) {
                          t.next = 29;
                          break;
                        }
                        throw a;
                      case 29:
                        return t.finish(26);
                      case 30:
                        return t.finish(23);
                      case 31:
                        n && s();
                      case 32:
                      case 'end':
                        return t.stop();
                    }
                },
                t,
                this,
                [[5, 19, 23, 31], [24, , 26, 30]]
              );
            })
          );
          return function() {
            return t.apply(this, arguments);
          };
        })(),
        i = 0,
        o = !1;
      function s() {
        t.emit('render');
      }
      function u() {
        o &&
          t.emit('DOMTitleChange', Object(a.percent)(e.transfer.progressRatio)),
          s();
      }
      t.on('DOMContentLoaded', function() {
        document.addEventListener('blur', function() {
          return (o = !0);
        }),
          document.addEventListener('focus', function() {
            (o = !1), t.emit('DOMTitleChange', 'Firefox Send');
          }),
          n();
      }),
        t.on('navigate', n),
        t.on('render', function() {
          i = Date.now();
        }),
        t.on(
          'changeLimit',
          (function() {
            var t = y(
              regeneratorRuntime.mark(function t(n) {
                var i = n.file,
                  o = n.value;
                return regeneratorRuntime.wrap(
                  function(t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), i.changeLimit(o);
                        case 2:
                          e.storage.writeFile(i), d.c(i);
                        case 4:
                        case 'end':
                          return t.stop();
                      }
                  },
                  t,
                  r
                );
              })
            );
            return function(e) {
              return t.apply(this, arguments);
            };
          })()
        ),
        t.on(
          'delete',
          (function() {
            var t = y(
              regeneratorRuntime.mark(function t(n) {
                var i = n.file,
                  o = n.location;
                return regeneratorRuntime.wrap(
                  function(t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.prev = 0),
                            d.h({
                              size: i.size,
                              time: i.time,
                              speed: i.speed,
                              type: i.type,
                              ttl: i.expiresAt - Date.now(),
                              location: o
                            }),
                            e.storage.remove(i.id),
                            (t.next = 5),
                            i.del()
                          );
                        case 5:
                          t.next = 10;
                          break;
                        case 7:
                          (t.prev = 7),
                            (t.t0 = t.catch(0)),
                            e.raven.captureException(t.t0);
                        case 10:
                        case 'end':
                          return t.stop();
                      }
                  },
                  t,
                  r,
                  [[0, 7]]
                );
              })
            );
            return function(e) {
              return t.apply(this, arguments);
            };
          })()
        ),
        t.on('cancel', function() {
          e.transfer.cancel();
        }),
        t.on(
          'upload',
          (function() {
            var n = y(
              regeneratorRuntime.mark(function n(i) {
                var o,
                  c,
                  h,
                  l,
                  p,
                  y = i.file,
                  v = i.type;
                return regeneratorRuntime.wrap(
                  function(r) {
                    for (;;)
                      switch ((r.prev = r.next)) {
                        case 0:
                          return (
                            (o = y.size),
                            (c = new f(y)).on('progress', u),
                            c.on('encrypting', s),
                            (e.transfer = c),
                            (e.uploading = !0),
                            s(),
                            (h = Object(a.openLinksInNewTab)()),
                            (r.next = 10),
                            Object(a.delay)(200)
                          );
                        case 10:
                          return (
                            (r.prev = 10),
                            d.j({ size: o, type: v }),
                            (r.next = 14),
                            c.upload()
                          );
                        case 14:
                          if (
                            (((l = r.sent).type = v),
                            (e.storage.totalUploads += 1),
                            d.e(l),
                            e.storage.addFile(l),
                            (p = document.getElementById('cancel-upload')) &&
                              (p.hidden = 'hidden'),
                            !document.querySelector('.page'))
                          ) {
                            r.next = 26;
                            break;
                          }
                          return (r.next = 24), Object(a.delay)(1e3);
                        case 24:
                          return (r.next = 26), Object(a.fadeOut)('.page');
                        case 26:
                          t.emit('pushState', '/share/' + l.id), (r.next = 32);
                          break;
                        case 29:
                          (r.prev = 29),
                            (r.t0 = r.catch(10)),
                            '0' === r.t0.message
                              ? (d.b({ size: o, type: v }), s())
                              : (console.error(r.t0),
                                e.raven.captureException(r.t0),
                                d.l({ size: o, type: v, err: r.t0 }),
                                t.emit('pushState', '/error'));
                        case 32:
                          return (
                            (r.prev = 32),
                            Object(a.openLinksInNewTab)(h, !1),
                            (e.uploading = !1),
                            (e.transfer = null),
                            r.finish(32)
                          );
                        case 37:
                        case 'end':
                          return r.stop();
                      }
                  },
                  n,
                  r,
                  [[10, 29, 32, 37]]
                );
              })
            );
            return function(e) {
              return n.apply(this, arguments);
            };
          })()
        ),
        t.on(
          'password',
          (function() {
            var t = y(
              regeneratorRuntime.mark(function t(n) {
                var i = n.password,
                  o = n.file;
                return regeneratorRuntime.wrap(
                  function(t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.prev = 0),
                            (e.settingPassword = !0),
                            s(),
                            (t.next = 5),
                            o.setPassword(i)
                          );
                        case 5:
                          return (
                            e.storage.writeFile(o),
                            d.a({ size: o.size }),
                            (t.next = 9),
                            Object(a.delay)(1e3)
                          );
                        case 9:
                          t.next = 15;
                          break;
                        case 11:
                          (t.prev = 11),
                            (t.t0 = t.catch(0)),
                            console.error(t.t0),
                            (e.passwordSetError = t.t0);
                        case 15:
                          return (
                            (t.prev = 15),
                            (e.settingPassword = !1),
                            t.finish(15)
                          );
                        case 18:
                          s();
                        case 19:
                        case 'end':
                          return t.stop();
                      }
                  },
                  t,
                  r,
                  [[0, 11, 15, 18]]
                );
              })
            );
            return function(e) {
              return t.apply(this, arguments);
            };
          })()
        ),
        t.on(
          'getMetadata',
          y(
            regeneratorRuntime.mark(function n() {
              var i, o;
              return regeneratorRuntime.wrap(
                function(r) {
                  for (;;)
                    switch ((r.prev = r.next)) {
                      case 0:
                        return (
                          (i = e.fileInfo),
                          (o = new p(i)),
                          (r.prev = 2),
                          (r.next = 5),
                          o.getMetadata()
                        );
                      case 5:
                        (e.transfer = o), (r.next = 14);
                        break;
                      case 8:
                        if (
                          ((r.prev = 8),
                          (r.t0 = r.catch(2)),
                          '401' !== r.t0.message)
                        ) {
                          r.next = 14;
                          break;
                        }
                        if (((i.password = null), i.requiresPassword)) {
                          r.next = 14;
                          break;
                        }
                        return r.abrupt('return', t.emit('pushState', '/404'));
                      case 14:
                        s();
                      case 15:
                      case 'end':
                        return r.stop();
                    }
                },
                n,
                r,
                [[2, 8]]
              );
            })
          )
        ),
        t.on(
          'download',
          (function() {
            var n = y(
              regeneratorRuntime.mark(function n(i) {
                var o, c, f, h, l, p, y;
                return regeneratorRuntime.wrap(
                  function(r) {
                    for (;;)
                      switch ((r.prev = r.next)) {
                        case 0:
                          return (
                            e.transfer.on('progress', u),
                            e.transfer.on('decrypting', s),
                            (o = Object(a.openLinksInNewTab)()),
                            (c = i.size),
                            (r.prev = 4),
                            (f = Date.now()),
                            d.i({ size: i.size, ttl: i.ttl }),
                            (h = e.transfer.download()),
                            s(),
                            (r.next = 11),
                            h
                          );
                        case 11:
                          if (
                            ((l = Date.now() - f),
                            (p = c / (l / 1e3)),
                            !document.querySelector('.page'))
                          ) {
                            r.next = 18;
                            break;
                          }
                          return (r.next = 16), Object(a.delay)(1e3);
                        case 16:
                          return (r.next = 18), Object(a.fadeOut)('.page');
                        case 18:
                          (e.storage.totalDownloads += 1),
                            e.transfer.reset(),
                            d.d({ size: c, time: l, speed: p }),
                            t.emit('pushState', '/completed'),
                            (r.next = 27);
                          break;
                        case 24:
                          (r.prev = 24),
                            (r.t0 = r.catch(4)),
                            '0' === r.t0.message
                              ? (e.transfer.reset(), s())
                              : (console.error(r.t0),
                                (e.transfer = null),
                                '/error' ===
                                  (y =
                                    '404' === r.t0.message
                                      ? '/404'
                                      : '/error') &&
                                  (e.raven.captureException(r.t0),
                                  d.k({ size: c, err: r.t0 })),
                                t.emit('pushState', y));
                        case 27:
                          return (
                            (r.prev = 27),
                            Object(a.openLinksInNewTab)(o, !1),
                            r.finish(27)
                          );
                        case 30:
                        case 'end':
                          return r.stop();
                      }
                  },
                  n,
                  r,
                  [[4, 24, 27, 30]]
                );
              })
            );
            return function(e) {
              return n.apply(this, arguments);
            };
          })()
        ),
        t.on('copy', function(e) {
          var t = e.url,
            r = e.location;
          Object(a.copyToClipboard)(t), d.f({ location: r });
        }),
        setInterval(function() {
          '/' === e.route && n();
        }, 12e4),
        setInterval(function() {
          '/' === e.route &&
            e.storage.files.length > 0 &&
            Date.now() - i > 3e4 &&
            s();
        }, 6e4);
    };
  },
  yLpj: function(e, t) {
    var r;
    r = (function() {
      return this;
    })();
    try {
      r = r || Function('return this')() || (0, eval)('this');
    } catch (e) {
      'object' == typeof window && (r = window);
    }
    e.exports = r;
  }
});
//# sourceMappingURL=ios.0963a3b6.js.map
