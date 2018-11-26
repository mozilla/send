!(function(a) {
  if ('object' == typeof exports && 'undefined' != typeof module)
    module.exports = a();
  else if ('function' == typeof define && define.amd) define([], a);
  else {
    var b;
    (b =
      'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : this),
      (b.elliptic = a());
  }
})(function() {
  return (function a(b, c, d) {
    function e(g, h) {
      if (!c[g]) {
        if (!b[g]) {
          var i = 'function' == typeof require && require;
          if (!h && i) return i(g, !0);
          if (f) return f(g, !0);
          var j = new Error("Cannot find module '" + g + "'");
          throw ((j.code = 'MODULE_NOT_FOUND'), j);
        }
        var k = (c[g] = { exports: {} });
        b[g][0].call(
          k.exports,
          function(a) {
            var c = b[g][1][a];
            return e(c ? c : a);
          },
          k,
          k.exports,
          a,
          b,
          c,
          d
        );
      }
      return c[g].exports;
    }
    for (
      var f = 'function' == typeof require && require, g = 0;
      g < d.length;
      g++
    )
      e(d[g]);
    return e;
  })(
    {
      1: [
        function(a, b, c) {
          !(function(b, c) {
            'use strict';
            function d(a, b) {
              if (!a) throw new Error(b || 'Assertion failed');
            }
            function e(a, b) {
              a.super_ = b;
              var c = function() {};
              (c.prototype = b.prototype),
                (a.prototype = new c()),
                (a.prototype.constructor = a);
            }
            function f(a, b, c) {
              return f.isBN(a)
                ? a
                : ((this.negative = 0),
                  (this.words = null),
                  (this.length = 0),
                  (this.red = null),
                  void (
                    null !== a &&
                    (('le' !== b && 'be' !== b) || ((c = b), (b = 10)),
                    this._init(a || 0, b || 10, c || 'be'))
                  ));
            }
            function h(a, b, c) {
              for (var d = 0, e = Math.min(a.length, c), f = b; f < e; f++) {
                var g = a.charCodeAt(f) - 48;
                (d <<= 4),
                  (d |=
                    g >= 49 && g <= 54
                      ? g - 49 + 10
                      : g >= 17 && g <= 22
                      ? g - 17 + 10
                      : 15 & g);
              }
              return d;
            }
            function i(a, b, c, d) {
              for (var e = 0, f = Math.min(a.length, c), g = b; g < f; g++) {
                var h = a.charCodeAt(g) - 48;
                (e *= d),
                  (e += h >= 49 ? h - 49 + 10 : h >= 17 ? h - 17 + 10 : h);
              }
              return e;
            }
            function m(a) {
              for (var b = new Array(a.bitLength()), c = 0; c < b.length; c++) {
                var d = (c / 26) | 0,
                  e = c % 26;
                b[c] = (a.words[d] & (1 << e)) >>> e;
              }
              return b;
            }
            function n(a, b, c) {
              c.negative = b.negative ^ a.negative;
              var d = (a.length + b.length) | 0;
              (c.length = d), (d = (d - 1) | 0);
              var e = 0 | a.words[0],
                f = 0 | b.words[0],
                g = e * f,
                h = 67108863 & g,
                i = (g / 67108864) | 0;
              c.words[0] = h;
              for (var j = 1; j < d; j++) {
                for (
                  var k = i >>> 26,
                    l = 67108863 & i,
                    m = Math.min(j, b.length - 1),
                    n = Math.max(0, j - a.length + 1);
                  n <= m;
                  n++
                ) {
                  var o = (j - n) | 0;
                  (e = 0 | a.words[o]),
                    (f = 0 | b.words[n]),
                    (g = e * f + l),
                    (k += (g / 67108864) | 0),
                    (l = 67108863 & g);
                }
                (c.words[j] = 0 | l), (i = 0 | k);
              }
              return 0 !== i ? (c.words[j] = 0 | i) : c.length--, c.strip();
            }
            function p(a, b, c) {
              (c.negative = b.negative ^ a.negative),
                (c.length = a.length + b.length);
              for (var d = 0, e = 0, f = 0; f < c.length - 1; f++) {
                var g = e;
                e = 0;
                for (
                  var h = 67108863 & d,
                    i = Math.min(f, b.length - 1),
                    j = Math.max(0, f - a.length + 1);
                  j <= i;
                  j++
                ) {
                  var k = f - j,
                    l = 0 | a.words[k],
                    m = 0 | b.words[j],
                    n = l * m,
                    o = 67108863 & n;
                  (g = (g + ((n / 67108864) | 0)) | 0),
                    (o = (o + h) | 0),
                    (h = 67108863 & o),
                    (g = (g + (o >>> 26)) | 0),
                    (e += g >>> 26),
                    (g &= 67108863);
                }
                (c.words[f] = h), (d = g), (g = e);
              }
              return 0 !== d ? (c.words[f] = d) : c.length--, c.strip();
            }
            function q(a, b, c) {
              var d = new r();
              return d.mulp(a, b, c);
            }
            function r(a, b) {
              (this.x = a), (this.y = b);
            }
            function t(a, b) {
              (this.name = a),
                (this.p = new f(b, 16)),
                (this.n = this.p.bitLength()),
                (this.k = new f(1).iushln(this.n).isub(this.p)),
                (this.tmp = this._tmp());
            }
            function u() {
              t.call(
                this,
                'k256',
                'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f'
              );
            }
            function v() {
              t.call(
                this,
                'p224',
                'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001'
              );
            }
            function w() {
              t.call(
                this,
                'p192',
                'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff'
              );
            }
            function x() {
              t.call(
                this,
                '25519',
                '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed'
              );
            }
            function y(a) {
              if ('string' == typeof a) {
                var b = f._prime(a);
                (this.m = b.p), (this.prime = b);
              } else
                d(a.gtn(1), 'modulus must be greater than 1'),
                  (this.m = a),
                  (this.prime = null);
            }
            function z(a) {
              y.call(this, a),
                (this.shift = this.m.bitLength()),
                this.shift % 26 !== 0 && (this.shift += 26 - (this.shift % 26)),
                (this.r = new f(1).iushln(this.shift)),
                (this.r2 = this.imod(this.r.sqr())),
                (this.rinv = this.r._invmp(this.m)),
                (this.minv = this.rinv
                  .mul(this.r)
                  .isubn(1)
                  .div(this.m)),
                (this.minv = this.minv.umod(this.r)),
                (this.minv = this.r.sub(this.minv));
            }
            'object' == typeof b ? (b.exports = f) : (c.BN = f),
              (f.BN = f),
              (f.wordSize = 26);
            var g;
            try {
              g = a('buffer').Buffer;
            } catch (a) {}
            (f.isBN = function(b) {
              return (
                b instanceof f ||
                (null !== b &&
                  'object' == typeof b &&
                  b.constructor.wordSize === f.wordSize &&
                  Array.isArray(b.words))
              );
            }),
              (f.max = function(b, c) {
                return b.cmp(c) > 0 ? b : c;
              }),
              (f.min = function(b, c) {
                return b.cmp(c) < 0 ? b : c;
              }),
              (f.prototype._init = function(b, c, e) {
                if ('number' == typeof b) return this._initNumber(b, c, e);
                if ('object' == typeof b) return this._initArray(b, c, e);
                'hex' === c && (c = 16),
                  d(c === (0 | c) && c >= 2 && c <= 36),
                  (b = b.toString().replace(/\s+/g, ''));
                var f = 0;
                '-' === b[0] && f++,
                  16 === c ? this._parseHex(b, f) : this._parseBase(b, c, f),
                  '-' === b[0] && (this.negative = 1),
                  this.strip(),
                  'le' === e && this._initArray(this.toArray(), c, e);
              }),
              (f.prototype._initNumber = function(b, c, e) {
                b < 0 && ((this.negative = 1), (b = -b)),
                  b < 67108864
                    ? ((this.words = [67108863 & b]), (this.length = 1))
                    : b < 4503599627370496
                    ? ((this.words = [67108863 & b, (b / 67108864) & 67108863]),
                      (this.length = 2))
                    : (d(b < 9007199254740992),
                      (this.words = [
                        67108863 & b,
                        (b / 67108864) & 67108863,
                        1
                      ]),
                      (this.length = 3)),
                  'le' === e && this._initArray(this.toArray(), c, e);
              }),
              (f.prototype._initArray = function(b, c, e) {
                if ((d('number' == typeof b.length), b.length <= 0))
                  return (this.words = [0]), (this.length = 1), this;
                (this.length = Math.ceil(b.length / 3)),
                  (this.words = new Array(this.length));
                for (var f = 0; f < this.length; f++) this.words[f] = 0;
                var g,
                  h,
                  i = 0;
                if ('be' === e)
                  for (f = b.length - 1, g = 0; f >= 0; f -= 3)
                    (h = b[f] | (b[f - 1] << 8) | (b[f - 2] << 16)),
                      (this.words[g] |= (h << i) & 67108863),
                      (this.words[g + 1] = (h >>> (26 - i)) & 67108863),
                      (i += 24),
                      i >= 26 && ((i -= 26), g++);
                else if ('le' === e)
                  for (f = 0, g = 0; f < b.length; f += 3)
                    (h = b[f] | (b[f + 1] << 8) | (b[f + 2] << 16)),
                      (this.words[g] |= (h << i) & 67108863),
                      (this.words[g + 1] = (h >>> (26 - i)) & 67108863),
                      (i += 24),
                      i >= 26 && ((i -= 26), g++);
                return this.strip();
              }),
              (f.prototype._parseHex = function(b, c) {
                (this.length = Math.ceil((b.length - c) / 6)),
                  (this.words = new Array(this.length));
                for (var d = 0; d < this.length; d++) this.words[d] = 0;
                var e,
                  f,
                  g = 0;
                for (d = b.length - 6, e = 0; d >= c; d -= 6)
                  (f = h(b, d, d + 6)),
                    (this.words[e] |= (f << g) & 67108863),
                    (this.words[e + 1] |= (f >>> (26 - g)) & 4194303),
                    (g += 24),
                    g >= 26 && ((g -= 26), e++);
                d + 6 !== c &&
                  ((f = h(b, c, d + 6)),
                  (this.words[e] |= (f << g) & 67108863),
                  (this.words[e + 1] |= (f >>> (26 - g)) & 4194303)),
                  this.strip();
              }),
              (f.prototype._parseBase = function(b, c, d) {
                (this.words = [0]), (this.length = 1);
                for (var e = 0, f = 1; f <= 67108863; f *= c) e++;
                e--, (f = (f / c) | 0);
                for (
                  var g = b.length - d,
                    h = g % e,
                    j = Math.min(g, g - h) + d,
                    k = 0,
                    l = d;
                  l < j;
                  l += e
                )
                  (k = i(b, l, l + e, c)),
                    this.imuln(f),
                    this.words[0] + k < 67108864
                      ? (this.words[0] += k)
                      : this._iaddn(k);
                if (0 !== h) {
                  var m = 1;
                  for (k = i(b, l, b.length, c), l = 0; l < h; l++) m *= c;
                  this.imuln(m),
                    this.words[0] + k < 67108864
                      ? (this.words[0] += k)
                      : this._iaddn(k);
                }
              }),
              (f.prototype.copy = function(b) {
                b.words = new Array(this.length);
                for (var c = 0; c < this.length; c++)
                  b.words[c] = this.words[c];
                (b.length = this.length),
                  (b.negative = this.negative),
                  (b.red = this.red);
              }),
              (f.prototype.clone = function() {
                var b = new f(null);
                return this.copy(b), b;
              }),
              (f.prototype._expand = function(b) {
                for (; this.length < b; ) this.words[this.length++] = 0;
                return this;
              }),
              (f.prototype.strip = function() {
                for (; this.length > 1 && 0 === this.words[this.length - 1]; )
                  this.length--;
                return this._normSign();
              }),
              (f.prototype._normSign = function() {
                return (
                  1 === this.length &&
                    0 === this.words[0] &&
                    (this.negative = 0),
                  this
                );
              }),
              (f.prototype.inspect = function() {
                return (
                  (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>'
                );
              });
            var j = [
                '',
                '0',
                '00',
                '000',
                '0000',
                '00000',
                '000000',
                '0000000',
                '00000000',
                '000000000',
                '0000000000',
                '00000000000',
                '000000000000',
                '0000000000000',
                '00000000000000',
                '000000000000000',
                '0000000000000000',
                '00000000000000000',
                '000000000000000000',
                '0000000000000000000',
                '00000000000000000000',
                '000000000000000000000',
                '0000000000000000000000',
                '00000000000000000000000',
                '000000000000000000000000',
                '0000000000000000000000000'
              ],
              k = [
                0,
                0,
                25,
                16,
                12,
                11,
                10,
                9,
                8,
                8,
                7,
                7,
                7,
                7,
                6,
                6,
                6,
                6,
                6,
                6,
                6,
                5,
                5,
                5,
                5,
                5,
                5,
                5,
                5,
                5,
                5,
                5,
                5,
                5,
                5,
                5,
                5
              ],
              l = [
                0,
                0,
                33554432,
                43046721,
                16777216,
                48828125,
                60466176,
                40353607,
                16777216,
                43046721,
                1e7,
                19487171,
                35831808,
                62748517,
                7529536,
                11390625,
                16777216,
                24137569,
                34012224,
                47045881,
                64e6,
                4084101,
                5153632,
                6436343,
                7962624,
                9765625,
                11881376,
                14348907,
                17210368,
                20511149,
                243e5,
                28629151,
                33554432,
                39135393,
                45435424,
                52521875,
                60466176
              ];
            (f.prototype.toString = function(b, c) {
              (b = b || 10), (c = 0 | c || 1);
              var e;
              if (16 === b || 'hex' === b) {
                e = '';
                for (var f = 0, g = 0, h = 0; h < this.length; h++) {
                  var i = this.words[h],
                    m = (16777215 & ((i << f) | g)).toString(16);
                  (g = (i >>> (24 - f)) & 16777215),
                    (e =
                      0 !== g || h !== this.length - 1
                        ? j[6 - m.length] + m + e
                        : m + e),
                    (f += 2),
                    f >= 26 && ((f -= 26), h--);
                }
                for (0 !== g && (e = g.toString(16) + e); e.length % c !== 0; )
                  e = '0' + e;
                return 0 !== this.negative && (e = '-' + e), e;
              }
              if (b === (0 | b) && b >= 2 && b <= 36) {
                var n = k[b],
                  o = l[b];
                e = '';
                var p = this.clone();
                for (p.negative = 0; !p.isZero(); ) {
                  var q = p.modn(o).toString(b);
                  (p = p.idivn(o)),
                    (e = p.isZero() ? q + e : j[n - q.length] + q + e);
                }
                for (this.isZero() && (e = '0' + e); e.length % c !== 0; )
                  e = '0' + e;
                return 0 !== this.negative && (e = '-' + e), e;
              }
              d(!1, 'Base should be between 2 and 36');
            }),
              (f.prototype.toNumber = function() {
                var b = this.words[0];
                return (
                  2 === this.length
                    ? (b += 67108864 * this.words[1])
                    : 3 === this.length && 1 === this.words[2]
                    ? (b += 4503599627370496 + 67108864 * this.words[1])
                    : this.length > 2 &&
                      d(!1, 'Number can only safely store up to 53 bits'),
                  0 !== this.negative ? -b : b
                );
              }),
              (f.prototype.toJSON = function() {
                return this.toString(16);
              }),
              (f.prototype.toBuffer = function(b, c) {
                return d('undefined' != typeof g), this.toArrayLike(g, b, c);
              }),
              (f.prototype.toArray = function(b, c) {
                return this.toArrayLike(Array, b, c);
              }),
              (f.prototype.toArrayLike = function(b, c, e) {
                var f = this.byteLength(),
                  g = e || Math.max(1, f);
                d(f <= g, 'byte array longer than desired length'),
                  d(g > 0, 'Requested array length <= 0'),
                  this.strip();
                var j,
                  k,
                  h = 'le' === c,
                  i = new b(g),
                  l = this.clone();
                if (h) {
                  for (k = 0; !l.isZero(); k++)
                    (j = l.andln(255)), l.iushrn(8), (i[k] = j);
                  for (; k < g; k++) i[k] = 0;
                } else {
                  for (k = 0; k < g - f; k++) i[k] = 0;
                  for (k = 0; !l.isZero(); k++)
                    (j = l.andln(255)), l.iushrn(8), (i[g - k - 1] = j);
                }
                return i;
              }),
              Math.clz32
                ? (f.prototype._countBits = function(b) {
                    return 32 - Math.clz32(b);
                  })
                : (f.prototype._countBits = function(b) {
                    var c = b,
                      d = 0;
                    return (
                      c >= 4096 && ((d += 13), (c >>>= 13)),
                      c >= 64 && ((d += 7), (c >>>= 7)),
                      c >= 8 && ((d += 4), (c >>>= 4)),
                      c >= 2 && ((d += 2), (c >>>= 2)),
                      d + c
                    );
                  }),
              (f.prototype._zeroBits = function(b) {
                if (0 === b) return 26;
                var c = b,
                  d = 0;
                return (
                  0 === (8191 & c) && ((d += 13), (c >>>= 13)),
                  0 === (127 & c) && ((d += 7), (c >>>= 7)),
                  0 === (15 & c) && ((d += 4), (c >>>= 4)),
                  0 === (3 & c) && ((d += 2), (c >>>= 2)),
                  0 === (1 & c) && d++,
                  d
                );
              }),
              (f.prototype.bitLength = function() {
                var b = this.words[this.length - 1],
                  c = this._countBits(b);
                return 26 * (this.length - 1) + c;
              }),
              (f.prototype.zeroBits = function() {
                if (this.isZero()) return 0;
                for (var b = 0, c = 0; c < this.length; c++) {
                  var d = this._zeroBits(this.words[c]);
                  if (((b += d), 26 !== d)) break;
                }
                return b;
              }),
              (f.prototype.byteLength = function() {
                return Math.ceil(this.bitLength() / 8);
              }),
              (f.prototype.toTwos = function(b) {
                return 0 !== this.negative
                  ? this.abs()
                      .inotn(b)
                      .iaddn(1)
                  : this.clone();
              }),
              (f.prototype.fromTwos = function(b) {
                return this.testn(b - 1)
                  ? this.notn(b)
                      .iaddn(1)
                      .ineg()
                  : this.clone();
              }),
              (f.prototype.isNeg = function() {
                return 0 !== this.negative;
              }),
              (f.prototype.neg = function() {
                return this.clone().ineg();
              }),
              (f.prototype.ineg = function() {
                return this.isZero() || (this.negative ^= 1), this;
              }),
              (f.prototype.iuor = function(b) {
                for (; this.length < b.length; ) this.words[this.length++] = 0;
                for (var c = 0; c < b.length; c++)
                  this.words[c] = this.words[c] | b.words[c];
                return this.strip();
              }),
              (f.prototype.ior = function(b) {
                return d(0 === (this.negative | b.negative)), this.iuor(b);
              }),
              (f.prototype.or = function(b) {
                return this.length > b.length
                  ? this.clone().ior(b)
                  : b.clone().ior(this);
              }),
              (f.prototype.uor = function(b) {
                return this.length > b.length
                  ? this.clone().iuor(b)
                  : b.clone().iuor(this);
              }),
              (f.prototype.iuand = function(b) {
                var c;
                c = this.length > b.length ? b : this;
                for (var d = 0; d < c.length; d++)
                  this.words[d] = this.words[d] & b.words[d];
                return (this.length = c.length), this.strip();
              }),
              (f.prototype.iand = function(b) {
                return d(0 === (this.negative | b.negative)), this.iuand(b);
              }),
              (f.prototype.and = function(b) {
                return this.length > b.length
                  ? this.clone().iand(b)
                  : b.clone().iand(this);
              }),
              (f.prototype.uand = function(b) {
                return this.length > b.length
                  ? this.clone().iuand(b)
                  : b.clone().iuand(this);
              }),
              (f.prototype.iuxor = function(b) {
                var c, d;
                this.length > b.length
                  ? ((c = this), (d = b))
                  : ((c = b), (d = this));
                for (var e = 0; e < d.length; e++)
                  this.words[e] = c.words[e] ^ d.words[e];
                if (this !== c)
                  for (; e < c.length; e++) this.words[e] = c.words[e];
                return (this.length = c.length), this.strip();
              }),
              (f.prototype.ixor = function(b) {
                return d(0 === (this.negative | b.negative)), this.iuxor(b);
              }),
              (f.prototype.xor = function(b) {
                return this.length > b.length
                  ? this.clone().ixor(b)
                  : b.clone().ixor(this);
              }),
              (f.prototype.uxor = function(b) {
                return this.length > b.length
                  ? this.clone().iuxor(b)
                  : b.clone().iuxor(this);
              }),
              (f.prototype.inotn = function(b) {
                d('number' == typeof b && b >= 0);
                var c = 0 | Math.ceil(b / 26),
                  e = b % 26;
                this._expand(c), e > 0 && c--;
                for (var f = 0; f < c; f++)
                  this.words[f] = 67108863 & ~this.words[f];
                return (
                  e > 0 &&
                    (this.words[f] = ~this.words[f] & (67108863 >> (26 - e))),
                  this.strip()
                );
              }),
              (f.prototype.notn = function(b) {
                return this.clone().inotn(b);
              }),
              (f.prototype.setn = function(b, c) {
                d('number' == typeof b && b >= 0);
                var e = (b / 26) | 0,
                  f = b % 26;
                return (
                  this._expand(e + 1),
                  c
                    ? (this.words[e] = this.words[e] | (1 << f))
                    : (this.words[e] = this.words[e] & ~(1 << f)),
                  this.strip()
                );
              }),
              (f.prototype.iadd = function(b) {
                var c;
                if (0 !== this.negative && 0 === b.negative)
                  return (
                    (this.negative = 0),
                    (c = this.isub(b)),
                    (this.negative ^= 1),
                    this._normSign()
                  );
                if (0 === this.negative && 0 !== b.negative)
                  return (
                    (b.negative = 0),
                    (c = this.isub(b)),
                    (b.negative = 1),
                    c._normSign()
                  );
                var d, e;
                this.length > b.length
                  ? ((d = this), (e = b))
                  : ((d = b), (e = this));
                for (var f = 0, g = 0; g < e.length; g++)
                  (c = (0 | d.words[g]) + (0 | e.words[g]) + f),
                    (this.words[g] = 67108863 & c),
                    (f = c >>> 26);
                for (; 0 !== f && g < d.length; g++)
                  (c = (0 | d.words[g]) + f),
                    (this.words[g] = 67108863 & c),
                    (f = c >>> 26);
                if (((this.length = d.length), 0 !== f))
                  (this.words[this.length] = f), this.length++;
                else if (d !== this)
                  for (; g < d.length; g++) this.words[g] = d.words[g];
                return this;
              }),
              (f.prototype.add = function(b) {
                var c;
                return 0 !== b.negative && 0 === this.negative
                  ? ((b.negative = 0), (c = this.sub(b)), (b.negative ^= 1), c)
                  : 0 === b.negative && 0 !== this.negative
                  ? ((this.negative = 0),
                    (c = b.sub(this)),
                    (this.negative = 1),
                    c)
                  : this.length > b.length
                  ? this.clone().iadd(b)
                  : b.clone().iadd(this);
              }),
              (f.prototype.isub = function(b) {
                if (0 !== b.negative) {
                  b.negative = 0;
                  var c = this.iadd(b);
                  return (b.negative = 1), c._normSign();
                }
                if (0 !== this.negative)
                  return (
                    (this.negative = 0),
                    this.iadd(b),
                    (this.negative = 1),
                    this._normSign()
                  );
                var d = this.cmp(b);
                if (0 === d)
                  return (
                    (this.negative = 0),
                    (this.length = 1),
                    (this.words[0] = 0),
                    this
                  );
                var e, f;
                d > 0 ? ((e = this), (f = b)) : ((e = b), (f = this));
                for (var g = 0, h = 0; h < f.length; h++)
                  (c = (0 | e.words[h]) - (0 | f.words[h]) + g),
                    (g = c >> 26),
                    (this.words[h] = 67108863 & c);
                for (; 0 !== g && h < e.length; h++)
                  (c = (0 | e.words[h]) + g),
                    (g = c >> 26),
                    (this.words[h] = 67108863 & c);
                if (0 === g && h < e.length && e !== this)
                  for (; h < e.length; h++) this.words[h] = e.words[h];
                return (
                  (this.length = Math.max(this.length, h)),
                  e !== this && (this.negative = 1),
                  this.strip()
                );
              }),
              (f.prototype.sub = function(b) {
                return this.clone().isub(b);
              });
            var o = function(b, c, d) {
              var i,
                j,
                k,
                e = b.words,
                f = c.words,
                g = d.words,
                h = 0,
                l = 0 | e[0],
                m = 8191 & l,
                n = l >>> 13,
                o = 0 | e[1],
                p = 8191 & o,
                q = o >>> 13,
                r = 0 | e[2],
                s = 8191 & r,
                t = r >>> 13,
                u = 0 | e[3],
                v = 8191 & u,
                w = u >>> 13,
                x = 0 | e[4],
                y = 8191 & x,
                z = x >>> 13,
                A = 0 | e[5],
                B = 8191 & A,
                C = A >>> 13,
                D = 0 | e[6],
                E = 8191 & D,
                F = D >>> 13,
                G = 0 | e[7],
                H = 8191 & G,
                I = G >>> 13,
                J = 0 | e[8],
                K = 8191 & J,
                L = J >>> 13,
                M = 0 | e[9],
                N = 8191 & M,
                O = M >>> 13,
                P = 0 | f[0],
                Q = 8191 & P,
                R = P >>> 13,
                S = 0 | f[1],
                T = 8191 & S,
                U = S >>> 13,
                V = 0 | f[2],
                W = 8191 & V,
                X = V >>> 13,
                Y = 0 | f[3],
                Z = 8191 & Y,
                $ = Y >>> 13,
                _ = 0 | f[4],
                aa = 8191 & _,
                ba = _ >>> 13,
                ca = 0 | f[5],
                da = 8191 & ca,
                ea = ca >>> 13,
                fa = 0 | f[6],
                ga = 8191 & fa,
                ha = fa >>> 13,
                ia = 0 | f[7],
                ja = 8191 & ia,
                ka = ia >>> 13,
                la = 0 | f[8],
                ma = 8191 & la,
                na = la >>> 13,
                oa = 0 | f[9],
                pa = 8191 & oa,
                qa = oa >>> 13;
              (d.negative = b.negative ^ c.negative),
                (d.length = 19),
                (i = Math.imul(m, Q)),
                (j = Math.imul(m, R)),
                (j = (j + Math.imul(n, Q)) | 0),
                (k = Math.imul(n, R));
              var ra = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (ra >>> 26)) | 0),
                (ra &= 67108863),
                (i = Math.imul(p, Q)),
                (j = Math.imul(p, R)),
                (j = (j + Math.imul(q, Q)) | 0),
                (k = Math.imul(q, R)),
                (i = (i + Math.imul(m, T)) | 0),
                (j = (j + Math.imul(m, U)) | 0),
                (j = (j + Math.imul(n, T)) | 0),
                (k = (k + Math.imul(n, U)) | 0);
              var sa = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (sa >>> 26)) | 0),
                (sa &= 67108863),
                (i = Math.imul(s, Q)),
                (j = Math.imul(s, R)),
                (j = (j + Math.imul(t, Q)) | 0),
                (k = Math.imul(t, R)),
                (i = (i + Math.imul(p, T)) | 0),
                (j = (j + Math.imul(p, U)) | 0),
                (j = (j + Math.imul(q, T)) | 0),
                (k = (k + Math.imul(q, U)) | 0),
                (i = (i + Math.imul(m, W)) | 0),
                (j = (j + Math.imul(m, X)) | 0),
                (j = (j + Math.imul(n, W)) | 0),
                (k = (k + Math.imul(n, X)) | 0);
              var ta = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (ta >>> 26)) | 0),
                (ta &= 67108863),
                (i = Math.imul(v, Q)),
                (j = Math.imul(v, R)),
                (j = (j + Math.imul(w, Q)) | 0),
                (k = Math.imul(w, R)),
                (i = (i + Math.imul(s, T)) | 0),
                (j = (j + Math.imul(s, U)) | 0),
                (j = (j + Math.imul(t, T)) | 0),
                (k = (k + Math.imul(t, U)) | 0),
                (i = (i + Math.imul(p, W)) | 0),
                (j = (j + Math.imul(p, X)) | 0),
                (j = (j + Math.imul(q, W)) | 0),
                (k = (k + Math.imul(q, X)) | 0),
                (i = (i + Math.imul(m, Z)) | 0),
                (j = (j + Math.imul(m, $)) | 0),
                (j = (j + Math.imul(n, Z)) | 0),
                (k = (k + Math.imul(n, $)) | 0);
              var ua = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (ua >>> 26)) | 0),
                (ua &= 67108863),
                (i = Math.imul(y, Q)),
                (j = Math.imul(y, R)),
                (j = (j + Math.imul(z, Q)) | 0),
                (k = Math.imul(z, R)),
                (i = (i + Math.imul(v, T)) | 0),
                (j = (j + Math.imul(v, U)) | 0),
                (j = (j + Math.imul(w, T)) | 0),
                (k = (k + Math.imul(w, U)) | 0),
                (i = (i + Math.imul(s, W)) | 0),
                (j = (j + Math.imul(s, X)) | 0),
                (j = (j + Math.imul(t, W)) | 0),
                (k = (k + Math.imul(t, X)) | 0),
                (i = (i + Math.imul(p, Z)) | 0),
                (j = (j + Math.imul(p, $)) | 0),
                (j = (j + Math.imul(q, Z)) | 0),
                (k = (k + Math.imul(q, $)) | 0),
                (i = (i + Math.imul(m, aa)) | 0),
                (j = (j + Math.imul(m, ba)) | 0),
                (j = (j + Math.imul(n, aa)) | 0),
                (k = (k + Math.imul(n, ba)) | 0);
              var va = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (va >>> 26)) | 0),
                (va &= 67108863),
                (i = Math.imul(B, Q)),
                (j = Math.imul(B, R)),
                (j = (j + Math.imul(C, Q)) | 0),
                (k = Math.imul(C, R)),
                (i = (i + Math.imul(y, T)) | 0),
                (j = (j + Math.imul(y, U)) | 0),
                (j = (j + Math.imul(z, T)) | 0),
                (k = (k + Math.imul(z, U)) | 0),
                (i = (i + Math.imul(v, W)) | 0),
                (j = (j + Math.imul(v, X)) | 0),
                (j = (j + Math.imul(w, W)) | 0),
                (k = (k + Math.imul(w, X)) | 0),
                (i = (i + Math.imul(s, Z)) | 0),
                (j = (j + Math.imul(s, $)) | 0),
                (j = (j + Math.imul(t, Z)) | 0),
                (k = (k + Math.imul(t, $)) | 0),
                (i = (i + Math.imul(p, aa)) | 0),
                (j = (j + Math.imul(p, ba)) | 0),
                (j = (j + Math.imul(q, aa)) | 0),
                (k = (k + Math.imul(q, ba)) | 0),
                (i = (i + Math.imul(m, da)) | 0),
                (j = (j + Math.imul(m, ea)) | 0),
                (j = (j + Math.imul(n, da)) | 0),
                (k = (k + Math.imul(n, ea)) | 0);
              var wa = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (wa >>> 26)) | 0),
                (wa &= 67108863),
                (i = Math.imul(E, Q)),
                (j = Math.imul(E, R)),
                (j = (j + Math.imul(F, Q)) | 0),
                (k = Math.imul(F, R)),
                (i = (i + Math.imul(B, T)) | 0),
                (j = (j + Math.imul(B, U)) | 0),
                (j = (j + Math.imul(C, T)) | 0),
                (k = (k + Math.imul(C, U)) | 0),
                (i = (i + Math.imul(y, W)) | 0),
                (j = (j + Math.imul(y, X)) | 0),
                (j = (j + Math.imul(z, W)) | 0),
                (k = (k + Math.imul(z, X)) | 0),
                (i = (i + Math.imul(v, Z)) | 0),
                (j = (j + Math.imul(v, $)) | 0),
                (j = (j + Math.imul(w, Z)) | 0),
                (k = (k + Math.imul(w, $)) | 0),
                (i = (i + Math.imul(s, aa)) | 0),
                (j = (j + Math.imul(s, ba)) | 0),
                (j = (j + Math.imul(t, aa)) | 0),
                (k = (k + Math.imul(t, ba)) | 0),
                (i = (i + Math.imul(p, da)) | 0),
                (j = (j + Math.imul(p, ea)) | 0),
                (j = (j + Math.imul(q, da)) | 0),
                (k = (k + Math.imul(q, ea)) | 0),
                (i = (i + Math.imul(m, ga)) | 0),
                (j = (j + Math.imul(m, ha)) | 0),
                (j = (j + Math.imul(n, ga)) | 0),
                (k = (k + Math.imul(n, ha)) | 0);
              var xa = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (xa >>> 26)) | 0),
                (xa &= 67108863),
                (i = Math.imul(H, Q)),
                (j = Math.imul(H, R)),
                (j = (j + Math.imul(I, Q)) | 0),
                (k = Math.imul(I, R)),
                (i = (i + Math.imul(E, T)) | 0),
                (j = (j + Math.imul(E, U)) | 0),
                (j = (j + Math.imul(F, T)) | 0),
                (k = (k + Math.imul(F, U)) | 0),
                (i = (i + Math.imul(B, W)) | 0),
                (j = (j + Math.imul(B, X)) | 0),
                (j = (j + Math.imul(C, W)) | 0),
                (k = (k + Math.imul(C, X)) | 0),
                (i = (i + Math.imul(y, Z)) | 0),
                (j = (j + Math.imul(y, $)) | 0),
                (j = (j + Math.imul(z, Z)) | 0),
                (k = (k + Math.imul(z, $)) | 0),
                (i = (i + Math.imul(v, aa)) | 0),
                (j = (j + Math.imul(v, ba)) | 0),
                (j = (j + Math.imul(w, aa)) | 0),
                (k = (k + Math.imul(w, ba)) | 0),
                (i = (i + Math.imul(s, da)) | 0),
                (j = (j + Math.imul(s, ea)) | 0),
                (j = (j + Math.imul(t, da)) | 0),
                (k = (k + Math.imul(t, ea)) | 0),
                (i = (i + Math.imul(p, ga)) | 0),
                (j = (j + Math.imul(p, ha)) | 0),
                (j = (j + Math.imul(q, ga)) | 0),
                (k = (k + Math.imul(q, ha)) | 0),
                (i = (i + Math.imul(m, ja)) | 0),
                (j = (j + Math.imul(m, ka)) | 0),
                (j = (j + Math.imul(n, ja)) | 0),
                (k = (k + Math.imul(n, ka)) | 0);
              var ya = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (ya >>> 26)) | 0),
                (ya &= 67108863),
                (i = Math.imul(K, Q)),
                (j = Math.imul(K, R)),
                (j = (j + Math.imul(L, Q)) | 0),
                (k = Math.imul(L, R)),
                (i = (i + Math.imul(H, T)) | 0),
                (j = (j + Math.imul(H, U)) | 0),
                (j = (j + Math.imul(I, T)) | 0),
                (k = (k + Math.imul(I, U)) | 0),
                (i = (i + Math.imul(E, W)) | 0),
                (j = (j + Math.imul(E, X)) | 0),
                (j = (j + Math.imul(F, W)) | 0),
                (k = (k + Math.imul(F, X)) | 0),
                (i = (i + Math.imul(B, Z)) | 0),
                (j = (j + Math.imul(B, $)) | 0),
                (j = (j + Math.imul(C, Z)) | 0),
                (k = (k + Math.imul(C, $)) | 0),
                (i = (i + Math.imul(y, aa)) | 0),
                (j = (j + Math.imul(y, ba)) | 0),
                (j = (j + Math.imul(z, aa)) | 0),
                (k = (k + Math.imul(z, ba)) | 0),
                (i = (i + Math.imul(v, da)) | 0),
                (j = (j + Math.imul(v, ea)) | 0),
                (j = (j + Math.imul(w, da)) | 0),
                (k = (k + Math.imul(w, ea)) | 0),
                (i = (i + Math.imul(s, ga)) | 0),
                (j = (j + Math.imul(s, ha)) | 0),
                (j = (j + Math.imul(t, ga)) | 0),
                (k = (k + Math.imul(t, ha)) | 0),
                (i = (i + Math.imul(p, ja)) | 0),
                (j = (j + Math.imul(p, ka)) | 0),
                (j = (j + Math.imul(q, ja)) | 0),
                (k = (k + Math.imul(q, ka)) | 0),
                (i = (i + Math.imul(m, ma)) | 0),
                (j = (j + Math.imul(m, na)) | 0),
                (j = (j + Math.imul(n, ma)) | 0),
                (k = (k + Math.imul(n, na)) | 0);
              var za = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (za >>> 26)) | 0),
                (za &= 67108863),
                (i = Math.imul(N, Q)),
                (j = Math.imul(N, R)),
                (j = (j + Math.imul(O, Q)) | 0),
                (k = Math.imul(O, R)),
                (i = (i + Math.imul(K, T)) | 0),
                (j = (j + Math.imul(K, U)) | 0),
                (j = (j + Math.imul(L, T)) | 0),
                (k = (k + Math.imul(L, U)) | 0),
                (i = (i + Math.imul(H, W)) | 0),
                (j = (j + Math.imul(H, X)) | 0),
                (j = (j + Math.imul(I, W)) | 0),
                (k = (k + Math.imul(I, X)) | 0),
                (i = (i + Math.imul(E, Z)) | 0),
                (j = (j + Math.imul(E, $)) | 0),
                (j = (j + Math.imul(F, Z)) | 0),
                (k = (k + Math.imul(F, $)) | 0),
                (i = (i + Math.imul(B, aa)) | 0),
                (j = (j + Math.imul(B, ba)) | 0),
                (j = (j + Math.imul(C, aa)) | 0),
                (k = (k + Math.imul(C, ba)) | 0),
                (i = (i + Math.imul(y, da)) | 0),
                (j = (j + Math.imul(y, ea)) | 0),
                (j = (j + Math.imul(z, da)) | 0),
                (k = (k + Math.imul(z, ea)) | 0),
                (i = (i + Math.imul(v, ga)) | 0),
                (j = (j + Math.imul(v, ha)) | 0),
                (j = (j + Math.imul(w, ga)) | 0),
                (k = (k + Math.imul(w, ha)) | 0),
                (i = (i + Math.imul(s, ja)) | 0),
                (j = (j + Math.imul(s, ka)) | 0),
                (j = (j + Math.imul(t, ja)) | 0),
                (k = (k + Math.imul(t, ka)) | 0),
                (i = (i + Math.imul(p, ma)) | 0),
                (j = (j + Math.imul(p, na)) | 0),
                (j = (j + Math.imul(q, ma)) | 0),
                (k = (k + Math.imul(q, na)) | 0),
                (i = (i + Math.imul(m, pa)) | 0),
                (j = (j + Math.imul(m, qa)) | 0),
                (j = (j + Math.imul(n, pa)) | 0),
                (k = (k + Math.imul(n, qa)) | 0);
              var Aa = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (Aa >>> 26)) | 0),
                (Aa &= 67108863),
                (i = Math.imul(N, T)),
                (j = Math.imul(N, U)),
                (j = (j + Math.imul(O, T)) | 0),
                (k = Math.imul(O, U)),
                (i = (i + Math.imul(K, W)) | 0),
                (j = (j + Math.imul(K, X)) | 0),
                (j = (j + Math.imul(L, W)) | 0),
                (k = (k + Math.imul(L, X)) | 0),
                (i = (i + Math.imul(H, Z)) | 0),
                (j = (j + Math.imul(H, $)) | 0),
                (j = (j + Math.imul(I, Z)) | 0),
                (k = (k + Math.imul(I, $)) | 0),
                (i = (i + Math.imul(E, aa)) | 0),
                (j = (j + Math.imul(E, ba)) | 0),
                (j = (j + Math.imul(F, aa)) | 0),
                (k = (k + Math.imul(F, ba)) | 0),
                (i = (i + Math.imul(B, da)) | 0),
                (j = (j + Math.imul(B, ea)) | 0),
                (j = (j + Math.imul(C, da)) | 0),
                (k = (k + Math.imul(C, ea)) | 0),
                (i = (i + Math.imul(y, ga)) | 0),
                (j = (j + Math.imul(y, ha)) | 0),
                (j = (j + Math.imul(z, ga)) | 0),
                (k = (k + Math.imul(z, ha)) | 0),
                (i = (i + Math.imul(v, ja)) | 0),
                (j = (j + Math.imul(v, ka)) | 0),
                (j = (j + Math.imul(w, ja)) | 0),
                (k = (k + Math.imul(w, ka)) | 0),
                (i = (i + Math.imul(s, ma)) | 0),
                (j = (j + Math.imul(s, na)) | 0),
                (j = (j + Math.imul(t, ma)) | 0),
                (k = (k + Math.imul(t, na)) | 0),
                (i = (i + Math.imul(p, pa)) | 0),
                (j = (j + Math.imul(p, qa)) | 0),
                (j = (j + Math.imul(q, pa)) | 0),
                (k = (k + Math.imul(q, qa)) | 0);
              var Ba = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (Ba >>> 26)) | 0),
                (Ba &= 67108863),
                (i = Math.imul(N, W)),
                (j = Math.imul(N, X)),
                (j = (j + Math.imul(O, W)) | 0),
                (k = Math.imul(O, X)),
                (i = (i + Math.imul(K, Z)) | 0),
                (j = (j + Math.imul(K, $)) | 0),
                (j = (j + Math.imul(L, Z)) | 0),
                (k = (k + Math.imul(L, $)) | 0),
                (i = (i + Math.imul(H, aa)) | 0),
                (j = (j + Math.imul(H, ba)) | 0),
                (j = (j + Math.imul(I, aa)) | 0),
                (k = (k + Math.imul(I, ba)) | 0),
                (i = (i + Math.imul(E, da)) | 0),
                (j = (j + Math.imul(E, ea)) | 0),
                (j = (j + Math.imul(F, da)) | 0),
                (k = (k + Math.imul(F, ea)) | 0),
                (i = (i + Math.imul(B, ga)) | 0),
                (j = (j + Math.imul(B, ha)) | 0),
                (j = (j + Math.imul(C, ga)) | 0),
                (k = (k + Math.imul(C, ha)) | 0),
                (i = (i + Math.imul(y, ja)) | 0),
                (j = (j + Math.imul(y, ka)) | 0),
                (j = (j + Math.imul(z, ja)) | 0),
                (k = (k + Math.imul(z, ka)) | 0),
                (i = (i + Math.imul(v, ma)) | 0),
                (j = (j + Math.imul(v, na)) | 0),
                (j = (j + Math.imul(w, ma)) | 0),
                (k = (k + Math.imul(w, na)) | 0),
                (i = (i + Math.imul(s, pa)) | 0),
                (j = (j + Math.imul(s, qa)) | 0),
                (j = (j + Math.imul(t, pa)) | 0),
                (k = (k + Math.imul(t, qa)) | 0);
              var Ca = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (Ca >>> 26)) | 0),
                (Ca &= 67108863),
                (i = Math.imul(N, Z)),
                (j = Math.imul(N, $)),
                (j = (j + Math.imul(O, Z)) | 0),
                (k = Math.imul(O, $)),
                (i = (i + Math.imul(K, aa)) | 0),
                (j = (j + Math.imul(K, ba)) | 0),
                (j = (j + Math.imul(L, aa)) | 0),
                (k = (k + Math.imul(L, ba)) | 0),
                (i = (i + Math.imul(H, da)) | 0),
                (j = (j + Math.imul(H, ea)) | 0),
                (j = (j + Math.imul(I, da)) | 0),
                (k = (k + Math.imul(I, ea)) | 0),
                (i = (i + Math.imul(E, ga)) | 0),
                (j = (j + Math.imul(E, ha)) | 0),
                (j = (j + Math.imul(F, ga)) | 0),
                (k = (k + Math.imul(F, ha)) | 0),
                (i = (i + Math.imul(B, ja)) | 0),
                (j = (j + Math.imul(B, ka)) | 0),
                (j = (j + Math.imul(C, ja)) | 0),
                (k = (k + Math.imul(C, ka)) | 0),
                (i = (i + Math.imul(y, ma)) | 0),
                (j = (j + Math.imul(y, na)) | 0),
                (j = (j + Math.imul(z, ma)) | 0),
                (k = (k + Math.imul(z, na)) | 0),
                (i = (i + Math.imul(v, pa)) | 0),
                (j = (j + Math.imul(v, qa)) | 0),
                (j = (j + Math.imul(w, pa)) | 0),
                (k = (k + Math.imul(w, qa)) | 0);
              var Da = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (Da >>> 26)) | 0),
                (Da &= 67108863),
                (i = Math.imul(N, aa)),
                (j = Math.imul(N, ba)),
                (j = (j + Math.imul(O, aa)) | 0),
                (k = Math.imul(O, ba)),
                (i = (i + Math.imul(K, da)) | 0),
                (j = (j + Math.imul(K, ea)) | 0),
                (j = (j + Math.imul(L, da)) | 0),
                (k = (k + Math.imul(L, ea)) | 0),
                (i = (i + Math.imul(H, ga)) | 0),
                (j = (j + Math.imul(H, ha)) | 0),
                (j = (j + Math.imul(I, ga)) | 0),
                (k = (k + Math.imul(I, ha)) | 0),
                (i = (i + Math.imul(E, ja)) | 0),
                (j = (j + Math.imul(E, ka)) | 0),
                (j = (j + Math.imul(F, ja)) | 0),
                (k = (k + Math.imul(F, ka)) | 0),
                (i = (i + Math.imul(B, ma)) | 0),
                (j = (j + Math.imul(B, na)) | 0),
                (j = (j + Math.imul(C, ma)) | 0),
                (k = (k + Math.imul(C, na)) | 0),
                (i = (i + Math.imul(y, pa)) | 0),
                (j = (j + Math.imul(y, qa)) | 0),
                (j = (j + Math.imul(z, pa)) | 0),
                (k = (k + Math.imul(z, qa)) | 0);
              var Ea = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (Ea >>> 26)) | 0),
                (Ea &= 67108863),
                (i = Math.imul(N, da)),
                (j = Math.imul(N, ea)),
                (j = (j + Math.imul(O, da)) | 0),
                (k = Math.imul(O, ea)),
                (i = (i + Math.imul(K, ga)) | 0),
                (j = (j + Math.imul(K, ha)) | 0),
                (j = (j + Math.imul(L, ga)) | 0),
                (k = (k + Math.imul(L, ha)) | 0),
                (i = (i + Math.imul(H, ja)) | 0),
                (j = (j + Math.imul(H, ka)) | 0),
                (j = (j + Math.imul(I, ja)) | 0),
                (k = (k + Math.imul(I, ka)) | 0),
                (i = (i + Math.imul(E, ma)) | 0),
                (j = (j + Math.imul(E, na)) | 0),
                (j = (j + Math.imul(F, ma)) | 0),
                (k = (k + Math.imul(F, na)) | 0),
                (i = (i + Math.imul(B, pa)) | 0),
                (j = (j + Math.imul(B, qa)) | 0),
                (j = (j + Math.imul(C, pa)) | 0),
                (k = (k + Math.imul(C, qa)) | 0);
              var Fa = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (Fa >>> 26)) | 0),
                (Fa &= 67108863),
                (i = Math.imul(N, ga)),
                (j = Math.imul(N, ha)),
                (j = (j + Math.imul(O, ga)) | 0),
                (k = Math.imul(O, ha)),
                (i = (i + Math.imul(K, ja)) | 0),
                (j = (j + Math.imul(K, ka)) | 0),
                (j = (j + Math.imul(L, ja)) | 0),
                (k = (k + Math.imul(L, ka)) | 0),
                (i = (i + Math.imul(H, ma)) | 0),
                (j = (j + Math.imul(H, na)) | 0),
                (j = (j + Math.imul(I, ma)) | 0),
                (k = (k + Math.imul(I, na)) | 0),
                (i = (i + Math.imul(E, pa)) | 0),
                (j = (j + Math.imul(E, qa)) | 0),
                (j = (j + Math.imul(F, pa)) | 0),
                (k = (k + Math.imul(F, qa)) | 0);
              var Ga = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (Ga >>> 26)) | 0),
                (Ga &= 67108863),
                (i = Math.imul(N, ja)),
                (j = Math.imul(N, ka)),
                (j = (j + Math.imul(O, ja)) | 0),
                (k = Math.imul(O, ka)),
                (i = (i + Math.imul(K, ma)) | 0),
                (j = (j + Math.imul(K, na)) | 0),
                (j = (j + Math.imul(L, ma)) | 0),
                (k = (k + Math.imul(L, na)) | 0),
                (i = (i + Math.imul(H, pa)) | 0),
                (j = (j + Math.imul(H, qa)) | 0),
                (j = (j + Math.imul(I, pa)) | 0),
                (k = (k + Math.imul(I, qa)) | 0);
              var Ha = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (Ha >>> 26)) | 0),
                (Ha &= 67108863),
                (i = Math.imul(N, ma)),
                (j = Math.imul(N, na)),
                (j = (j + Math.imul(O, ma)) | 0),
                (k = Math.imul(O, na)),
                (i = (i + Math.imul(K, pa)) | 0),
                (j = (j + Math.imul(K, qa)) | 0),
                (j = (j + Math.imul(L, pa)) | 0),
                (k = (k + Math.imul(L, qa)) | 0);
              var Ia = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              (h = (((k + (j >>> 13)) | 0) + (Ia >>> 26)) | 0),
                (Ia &= 67108863),
                (i = Math.imul(N, pa)),
                (j = Math.imul(N, qa)),
                (j = (j + Math.imul(O, pa)) | 0),
                (k = Math.imul(O, qa));
              var Ja = (((h + i) | 0) + ((8191 & j) << 13)) | 0;
              return (
                (h = (((k + (j >>> 13)) | 0) + (Ja >>> 26)) | 0),
                (Ja &= 67108863),
                (g[0] = ra),
                (g[1] = sa),
                (g[2] = ta),
                (g[3] = ua),
                (g[4] = va),
                (g[5] = wa),
                (g[6] = xa),
                (g[7] = ya),
                (g[8] = za),
                (g[9] = Aa),
                (g[10] = Ba),
                (g[11] = Ca),
                (g[12] = Da),
                (g[13] = Ea),
                (g[14] = Fa),
                (g[15] = Ga),
                (g[16] = Ha),
                (g[17] = Ia),
                (g[18] = Ja),
                0 !== h && ((g[19] = h), d.length++),
                d
              );
            };
            Math.imul || (o = n),
              (f.prototype.mulTo = function(b, c) {
                var d,
                  e = this.length + b.length;
                return (d =
                  10 === this.length && 10 === b.length
                    ? o(this, b, c)
                    : e < 63
                    ? n(this, b, c)
                    : e < 1024
                    ? p(this, b, c)
                    : q(this, b, c));
              }),
              (r.prototype.makeRBT = function(b) {
                for (
                  var c = new Array(b),
                    d = f.prototype._countBits(b) - 1,
                    e = 0;
                  e < b;
                  e++
                )
                  c[e] = this.revBin(e, d, b);
                return c;
              }),
              (r.prototype.revBin = function(b, c, d) {
                if (0 === b || b === d - 1) return b;
                for (var e = 0, f = 0; f < c; f++)
                  (e |= (1 & b) << (c - f - 1)), (b >>= 1);
                return e;
              }),
              (r.prototype.permute = function(b, c, d, e, f, g) {
                for (var h = 0; h < g; h++) (e[h] = c[b[h]]), (f[h] = d[b[h]]);
              }),
              (r.prototype.transform = function(b, c, d, e, f, g) {
                this.permute(g, b, c, d, e, f);
                for (var h = 1; h < f; h <<= 1)
                  for (
                    var i = h << 1,
                      j = Math.cos((2 * Math.PI) / i),
                      k = Math.sin((2 * Math.PI) / i),
                      l = 0;
                    l < f;
                    l += i
                  )
                    for (var m = j, n = k, o = 0; o < h; o++) {
                      var p = d[l + o],
                        q = e[l + o],
                        r = d[l + o + h],
                        s = e[l + o + h],
                        t = m * r - n * s;
                      (s = m * s + n * r),
                        (r = t),
                        (d[l + o] = p + r),
                        (e[l + o] = q + s),
                        (d[l + o + h] = p - r),
                        (e[l + o + h] = q - s),
                        o !== i &&
                          ((t = j * m - k * n), (n = j * n + k * m), (m = t));
                    }
              }),
              (r.prototype.guessLen13b = function(b, c) {
                var d = 1 | Math.max(c, b),
                  e = 1 & d,
                  f = 0;
                for (d = (d / 2) | 0; d; d >>>= 1) f++;
                return 1 << (f + 1 + e);
              }),
              (r.prototype.conjugate = function(b, c, d) {
                if (!(d <= 1))
                  for (var e = 0; e < d / 2; e++) {
                    var f = b[e];
                    (b[e] = b[d - e - 1]),
                      (b[d - e - 1] = f),
                      (f = c[e]),
                      (c[e] = -c[d - e - 1]),
                      (c[d - e - 1] = -f);
                  }
              }),
              (r.prototype.normalize13b = function(b, c) {
                for (var d = 0, e = 0; e < c / 2; e++) {
                  var f =
                    8192 * Math.round(b[2 * e + 1] / c) +
                    Math.round(b[2 * e] / c) +
                    d;
                  (b[e] = 67108863 & f),
                    (d = f < 67108864 ? 0 : (f / 67108864) | 0);
                }
                return b;
              }),
              (r.prototype.convert13b = function(b, c, e, f) {
                for (var g = 0, h = 0; h < c; h++)
                  (g += 0 | b[h]),
                    (e[2 * h] = 8191 & g),
                    (g >>>= 13),
                    (e[2 * h + 1] = 8191 & g),
                    (g >>>= 13);
                for (h = 2 * c; h < f; ++h) e[h] = 0;
                d(0 === g), d(0 === (g & -8192));
              }),
              (r.prototype.stub = function(b) {
                for (var c = new Array(b), d = 0; d < b; d++) c[d] = 0;
                return c;
              }),
              (r.prototype.mulp = function(b, c, d) {
                var e = 2 * this.guessLen13b(b.length, c.length),
                  f = this.makeRBT(e),
                  g = this.stub(e),
                  h = new Array(e),
                  i = new Array(e),
                  j = new Array(e),
                  k = new Array(e),
                  l = new Array(e),
                  m = new Array(e),
                  n = d.words;
                (n.length = e),
                  this.convert13b(b.words, b.length, h, e),
                  this.convert13b(c.words, c.length, k, e),
                  this.transform(h, g, i, j, e, f),
                  this.transform(k, g, l, m, e, f);
                for (var o = 0; o < e; o++) {
                  var p = i[o] * l[o] - j[o] * m[o];
                  (j[o] = i[o] * m[o] + j[o] * l[o]), (i[o] = p);
                }
                return (
                  this.conjugate(i, j, e),
                  this.transform(i, j, n, g, e, f),
                  this.conjugate(n, g, e),
                  this.normalize13b(n, e),
                  (d.negative = b.negative ^ c.negative),
                  (d.length = b.length + c.length),
                  d.strip()
                );
              }),
              (f.prototype.mul = function(b) {
                var c = new f(null);
                return (
                  (c.words = new Array(this.length + b.length)),
                  this.mulTo(b, c)
                );
              }),
              (f.prototype.mulf = function(b) {
                var c = new f(null);
                return (
                  (c.words = new Array(this.length + b.length)), q(this, b, c)
                );
              }),
              (f.prototype.imul = function(b) {
                return this.clone().mulTo(b, this);
              }),
              (f.prototype.imuln = function(b) {
                d('number' == typeof b), d(b < 67108864);
                for (var c = 0, e = 0; e < this.length; e++) {
                  var f = (0 | this.words[e]) * b,
                    g = (67108863 & f) + (67108863 & c);
                  (c >>= 26),
                    (c += (f / 67108864) | 0),
                    (c += g >>> 26),
                    (this.words[e] = 67108863 & g);
                }
                return 0 !== c && ((this.words[e] = c), this.length++), this;
              }),
              (f.prototype.muln = function(b) {
                return this.clone().imuln(b);
              }),
              (f.prototype.sqr = function() {
                return this.mul(this);
              }),
              (f.prototype.isqr = function() {
                return this.imul(this.clone());
              }),
              (f.prototype.pow = function(b) {
                var c = m(b);
                if (0 === c.length) return new f(1);
                for (
                  var d = this, e = 0;
                  e < c.length && 0 === c[e];
                  e++, d = d.sqr()
                );
                if (++e < c.length)
                  for (var g = d.sqr(); e < c.length; e++, g = g.sqr())
                    0 !== c[e] && (d = d.mul(g));
                return d;
              }),
              (f.prototype.iushln = function(b) {
                d('number' == typeof b && b >= 0);
                var g,
                  c = b % 26,
                  e = (b - c) / 26,
                  f = (67108863 >>> (26 - c)) << (26 - c);
                if (0 !== c) {
                  var h = 0;
                  for (g = 0; g < this.length; g++) {
                    var i = this.words[g] & f,
                      j = ((0 | this.words[g]) - i) << c;
                    (this.words[g] = j | h), (h = i >>> (26 - c));
                  }
                  h && ((this.words[g] = h), this.length++);
                }
                if (0 !== e) {
                  for (g = this.length - 1; g >= 0; g--)
                    this.words[g + e] = this.words[g];
                  for (g = 0; g < e; g++) this.words[g] = 0;
                  this.length += e;
                }
                return this.strip();
              }),
              (f.prototype.ishln = function(b) {
                return d(0 === this.negative), this.iushln(b);
              }),
              (f.prototype.iushrn = function(b, c, e) {
                d('number' == typeof b && b >= 0);
                var f;
                f = c ? (c - (c % 26)) / 26 : 0;
                var g = b % 26,
                  h = Math.min((b - g) / 26, this.length),
                  i = 67108863 ^ ((67108863 >>> g) << g),
                  j = e;
                if (((f -= h), (f = Math.max(0, f)), j)) {
                  for (var k = 0; k < h; k++) j.words[k] = this.words[k];
                  j.length = h;
                }
                if (0 === h);
                else if (this.length > h)
                  for (this.length -= h, k = 0; k < this.length; k++)
                    this.words[k] = this.words[k + h];
                else (this.words[0] = 0), (this.length = 1);
                var l = 0;
                for (k = this.length - 1; k >= 0 && (0 !== l || k >= f); k--) {
                  var m = 0 | this.words[k];
                  (this.words[k] = (l << (26 - g)) | (m >>> g)), (l = m & i);
                }
                return (
                  j && 0 !== l && (j.words[j.length++] = l),
                  0 === this.length && ((this.words[0] = 0), (this.length = 1)),
                  this.strip()
                );
              }),
              (f.prototype.ishrn = function(b, c, e) {
                return d(0 === this.negative), this.iushrn(b, c, e);
              }),
              (f.prototype.shln = function(b) {
                return this.clone().ishln(b);
              }),
              (f.prototype.ushln = function(b) {
                return this.clone().iushln(b);
              }),
              (f.prototype.shrn = function(b) {
                return this.clone().ishrn(b);
              }),
              (f.prototype.ushrn = function(b) {
                return this.clone().iushrn(b);
              }),
              (f.prototype.testn = function(b) {
                d('number' == typeof b && b >= 0);
                var c = b % 26,
                  e = (b - c) / 26,
                  f = 1 << c;
                if (this.length <= e) return !1;
                var g = this.words[e];
                return !!(g & f);
              }),
              (f.prototype.imaskn = function(b) {
                d('number' == typeof b && b >= 0);
                var c = b % 26,
                  e = (b - c) / 26;
                if (
                  (d(
                    0 === this.negative,
                    'imaskn works only with positive numbers'
                  ),
                  this.length <= e)
                )
                  return this;
                if (
                  (0 !== c && e++,
                  (this.length = Math.min(e, this.length)),
                  0 !== c)
                ) {
                  var f = 67108863 ^ ((67108863 >>> c) << c);
                  this.words[this.length - 1] &= f;
                }
                return this.strip();
              }),
              (f.prototype.maskn = function(b) {
                return this.clone().imaskn(b);
              }),
              (f.prototype.iaddn = function(b) {
                return (
                  d('number' == typeof b),
                  d(b < 67108864),
                  b < 0
                    ? this.isubn(-b)
                    : 0 !== this.negative
                    ? 1 === this.length && (0 | this.words[0]) < b
                      ? ((this.words[0] = b - (0 | this.words[0])),
                        (this.negative = 0),
                        this)
                      : ((this.negative = 0),
                        this.isubn(b),
                        (this.negative = 1),
                        this)
                    : this._iaddn(b)
                );
              }),
              (f.prototype._iaddn = function(b) {
                this.words[0] += b;
                for (
                  var c = 0;
                  c < this.length && this.words[c] >= 67108864;
                  c++
                )
                  (this.words[c] -= 67108864),
                    c === this.length - 1
                      ? (this.words[c + 1] = 1)
                      : this.words[c + 1]++;
                return (this.length = Math.max(this.length, c + 1)), this;
              }),
              (f.prototype.isubn = function(b) {
                if ((d('number' == typeof b), d(b < 67108864), b < 0))
                  return this.iaddn(-b);
                if (0 !== this.negative)
                  return (
                    (this.negative = 0),
                    this.iaddn(b),
                    (this.negative = 1),
                    this
                  );
                if (
                  ((this.words[0] -= b), 1 === this.length && this.words[0] < 0)
                )
                  (this.words[0] = -this.words[0]), (this.negative = 1);
                else
                  for (var c = 0; c < this.length && this.words[c] < 0; c++)
                    (this.words[c] += 67108864), (this.words[c + 1] -= 1);
                return this.strip();
              }),
              (f.prototype.addn = function(b) {
                return this.clone().iaddn(b);
              }),
              (f.prototype.subn = function(b) {
                return this.clone().isubn(b);
              }),
              (f.prototype.iabs = function() {
                return (this.negative = 0), this;
              }),
              (f.prototype.abs = function() {
                return this.clone().iabs();
              }),
              (f.prototype._ishlnsubmul = function(b, c, e) {
                var g,
                  f = b.length + e;
                this._expand(f);
                var h,
                  i = 0;
                for (g = 0; g < b.length; g++) {
                  h = (0 | this.words[g + e]) + i;
                  var j = (0 | b.words[g]) * c;
                  (h -= 67108863 & j),
                    (i = (h >> 26) - ((j / 67108864) | 0)),
                    (this.words[g + e] = 67108863 & h);
                }
                for (; g < this.length - e; g++)
                  (h = (0 | this.words[g + e]) + i),
                    (i = h >> 26),
                    (this.words[g + e] = 67108863 & h);
                if (0 === i) return this.strip();
                for (d(i === -1), i = 0, g = 0; g < this.length; g++)
                  (h = -(0 | this.words[g]) + i),
                    (i = h >> 26),
                    (this.words[g] = 67108863 & h);
                return (this.negative = 1), this.strip();
              }),
              (f.prototype._wordDiv = function(b, c) {
                var d = this.length - b.length,
                  e = this.clone(),
                  g = b,
                  h = 0 | g.words[g.length - 1],
                  i = this._countBits(h);
                (d = 26 - i),
                  0 !== d &&
                    ((g = g.ushln(d)),
                    e.iushln(d),
                    (h = 0 | g.words[g.length - 1]));
                var k,
                  j = e.length - g.length;
                if ('mod' !== c) {
                  (k = new f(null)),
                    (k.length = j + 1),
                    (k.words = new Array(k.length));
                  for (var l = 0; l < k.length; l++) k.words[l] = 0;
                }
                var m = e.clone()._ishlnsubmul(g, 1, j);
                0 === m.negative && ((e = m), k && (k.words[j] = 1));
                for (var n = j - 1; n >= 0; n--) {
                  var o =
                    67108864 * (0 | e.words[g.length + n]) +
                    (0 | e.words[g.length + n - 1]);
                  for (
                    o = Math.min((o / h) | 0, 67108863),
                      e._ishlnsubmul(g, o, n);
                    0 !== e.negative;

                  )
                    o--,
                      (e.negative = 0),
                      e._ishlnsubmul(g, 1, n),
                      e.isZero() || (e.negative ^= 1);
                  k && (k.words[n] = o);
                }
                return (
                  k && k.strip(),
                  e.strip(),
                  'div' !== c && 0 !== d && e.iushrn(d),
                  { div: k || null, mod: e }
                );
              }),
              (f.prototype.divmod = function(b, c, e) {
                if ((d(!b.isZero()), this.isZero()))
                  return { div: new f(0), mod: new f(0) };
                var g, h, i;
                return 0 !== this.negative && 0 === b.negative
                  ? ((i = this.neg().divmod(b, c)),
                    'mod' !== c && (g = i.div.neg()),
                    'div' !== c &&
                      ((h = i.mod.neg()), e && 0 !== h.negative && h.iadd(b)),
                    { div: g, mod: h })
                  : 0 === this.negative && 0 !== b.negative
                  ? ((i = this.divmod(b.neg(), c)),
                    'mod' !== c && (g = i.div.neg()),
                    { div: g, mod: i.mod })
                  : 0 !== (this.negative & b.negative)
                  ? ((i = this.neg().divmod(b.neg(), c)),
                    'div' !== c &&
                      ((h = i.mod.neg()), e && 0 !== h.negative && h.isub(b)),
                    { div: i.div, mod: h })
                  : b.length > this.length || this.cmp(b) < 0
                  ? { div: new f(0), mod: this }
                  : 1 === b.length
                  ? 'div' === c
                    ? { div: this.divn(b.words[0]), mod: null }
                    : 'mod' === c
                    ? { div: null, mod: new f(this.modn(b.words[0])) }
                    : {
                        div: this.divn(b.words[0]),
                        mod: new f(this.modn(b.words[0]))
                      }
                  : this._wordDiv(b, c);
              }),
              (f.prototype.div = function(b) {
                return this.divmod(b, 'div', !1).div;
              }),
              (f.prototype.mod = function(b) {
                return this.divmod(b, 'mod', !1).mod;
              }),
              (f.prototype.umod = function(b) {
                return this.divmod(b, 'mod', !0).mod;
              }),
              (f.prototype.divRound = function(b) {
                var c = this.divmod(b);
                if (c.mod.isZero()) return c.div;
                var d = 0 !== c.div.negative ? c.mod.isub(b) : c.mod,
                  e = b.ushrn(1),
                  f = b.andln(1),
                  g = d.cmp(e);
                return g < 0 || (1 === f && 0 === g)
                  ? c.div
                  : 0 !== c.div.negative
                  ? c.div.isubn(1)
                  : c.div.iaddn(1);
              }),
              (f.prototype.modn = function(b) {
                d(b <= 67108863);
                for (
                  var c = (1 << 26) % b, e = 0, f = this.length - 1;
                  f >= 0;
                  f--
                )
                  e = (c * e + (0 | this.words[f])) % b;
                return e;
              }),
              (f.prototype.idivn = function(b) {
                d(b <= 67108863);
                for (var c = 0, e = this.length - 1; e >= 0; e--) {
                  var f = (0 | this.words[e]) + 67108864 * c;
                  (this.words[e] = (f / b) | 0), (c = f % b);
                }
                return this.strip();
              }),
              (f.prototype.divn = function(b) {
                return this.clone().idivn(b);
              }),
              (f.prototype.egcd = function(b) {
                d(0 === b.negative), d(!b.isZero());
                var c = this,
                  e = b.clone();
                c = 0 !== c.negative ? c.umod(b) : c.clone();
                for (
                  var g = new f(1),
                    h = new f(0),
                    i = new f(0),
                    j = new f(1),
                    k = 0;
                  c.isEven() && e.isEven();

                )
                  c.iushrn(1), e.iushrn(1), ++k;
                for (var l = e.clone(), m = c.clone(); !c.isZero(); ) {
                  for (
                    var n = 0, o = 1;
                    0 === (c.words[0] & o) && n < 26;
                    ++n, o <<= 1
                  );
                  if (n > 0)
                    for (c.iushrn(n); n-- > 0; )
                      (g.isOdd() || h.isOdd()) && (g.iadd(l), h.isub(m)),
                        g.iushrn(1),
                        h.iushrn(1);
                  for (
                    var p = 0, q = 1;
                    0 === (e.words[0] & q) && p < 26;
                    ++p, q <<= 1
                  );
                  if (p > 0)
                    for (e.iushrn(p); p-- > 0; )
                      (i.isOdd() || j.isOdd()) && (i.iadd(l), j.isub(m)),
                        i.iushrn(1),
                        j.iushrn(1);
                  c.cmp(e) >= 0
                    ? (c.isub(e), g.isub(i), h.isub(j))
                    : (e.isub(c), i.isub(g), j.isub(h));
                }
                return { a: i, b: j, gcd: e.iushln(k) };
              }),
              (f.prototype._invmp = function(b) {
                d(0 === b.negative), d(!b.isZero());
                var c = this,
                  e = b.clone();
                c = 0 !== c.negative ? c.umod(b) : c.clone();
                for (
                  var g = new f(1), h = new f(0), i = e.clone();
                  c.cmpn(1) > 0 && e.cmpn(1) > 0;

                ) {
                  for (
                    var j = 0, k = 1;
                    0 === (c.words[0] & k) && j < 26;
                    ++j, k <<= 1
                  );
                  if (j > 0)
                    for (c.iushrn(j); j-- > 0; )
                      g.isOdd() && g.iadd(i), g.iushrn(1);
                  for (
                    var l = 0, m = 1;
                    0 === (e.words[0] & m) && l < 26;
                    ++l, m <<= 1
                  );
                  if (l > 0)
                    for (e.iushrn(l); l-- > 0; )
                      h.isOdd() && h.iadd(i), h.iushrn(1);
                  c.cmp(e) >= 0
                    ? (c.isub(e), g.isub(h))
                    : (e.isub(c), h.isub(g));
                }
                var n;
                return (
                  (n = 0 === c.cmpn(1) ? g : h), n.cmpn(0) < 0 && n.iadd(b), n
                );
              }),
              (f.prototype.gcd = function(b) {
                if (this.isZero()) return b.abs();
                if (b.isZero()) return this.abs();
                var c = this.clone(),
                  d = b.clone();
                (c.negative = 0), (d.negative = 0);
                for (var e = 0; c.isEven() && d.isEven(); e++)
                  c.iushrn(1), d.iushrn(1);
                for (;;) {
                  for (; c.isEven(); ) c.iushrn(1);
                  for (; d.isEven(); ) d.iushrn(1);
                  var f = c.cmp(d);
                  if (f < 0) {
                    var g = c;
                    (c = d), (d = g);
                  } else if (0 === f || 0 === d.cmpn(1)) break;
                  c.isub(d);
                }
                return d.iushln(e);
              }),
              (f.prototype.invm = function(b) {
                return this.egcd(b).a.umod(b);
              }),
              (f.prototype.isEven = function() {
                return 0 === (1 & this.words[0]);
              }),
              (f.prototype.isOdd = function() {
                return 1 === (1 & this.words[0]);
              }),
              (f.prototype.andln = function(b) {
                return this.words[0] & b;
              }),
              (f.prototype.bincn = function(b) {
                d('number' == typeof b);
                var c = b % 26,
                  e = (b - c) / 26,
                  f = 1 << c;
                if (this.length <= e)
                  return this._expand(e + 1), (this.words[e] |= f), this;
                for (var g = f, h = e; 0 !== g && h < this.length; h++) {
                  var i = 0 | this.words[h];
                  (i += g),
                    (g = i >>> 26),
                    (i &= 67108863),
                    (this.words[h] = i);
                }
                return 0 !== g && ((this.words[h] = g), this.length++), this;
              }),
              (f.prototype.isZero = function() {
                return 1 === this.length && 0 === this.words[0];
              }),
              (f.prototype.cmpn = function(b) {
                var c = b < 0;
                if (0 !== this.negative && !c) return -1;
                if (0 === this.negative && c) return 1;
                this.strip();
                var e;
                if (this.length > 1) e = 1;
                else {
                  c && (b = -b), d(b <= 67108863, 'Number is too big');
                  var f = 0 | this.words[0];
                  e = f === b ? 0 : f < b ? -1 : 1;
                }
                return 0 !== this.negative ? 0 | -e : e;
              }),
              (f.prototype.cmp = function(b) {
                if (0 !== this.negative && 0 === b.negative) return -1;
                if (0 === this.negative && 0 !== b.negative) return 1;
                var c = this.ucmp(b);
                return 0 !== this.negative ? 0 | -c : c;
              }),
              (f.prototype.ucmp = function(b) {
                if (this.length > b.length) return 1;
                if (this.length < b.length) return -1;
                for (var c = 0, d = this.length - 1; d >= 0; d--) {
                  var e = 0 | this.words[d],
                    f = 0 | b.words[d];
                  if (e !== f) {
                    e < f ? (c = -1) : e > f && (c = 1);
                    break;
                  }
                }
                return c;
              }),
              (f.prototype.gtn = function(b) {
                return 1 === this.cmpn(b);
              }),
              (f.prototype.gt = function(b) {
                return 1 === this.cmp(b);
              }),
              (f.prototype.gten = function(b) {
                return this.cmpn(b) >= 0;
              }),
              (f.prototype.gte = function(b) {
                return this.cmp(b) >= 0;
              }),
              (f.prototype.ltn = function(b) {
                return this.cmpn(b) === -1;
              }),
              (f.prototype.lt = function(b) {
                return this.cmp(b) === -1;
              }),
              (f.prototype.lten = function(b) {
                return this.cmpn(b) <= 0;
              }),
              (f.prototype.lte = function(b) {
                return this.cmp(b) <= 0;
              }),
              (f.prototype.eqn = function(b) {
                return 0 === this.cmpn(b);
              }),
              (f.prototype.eq = function(b) {
                return 0 === this.cmp(b);
              }),
              (f.red = function(b) {
                return new y(b);
              }),
              (f.prototype.toRed = function(b) {
                return (
                  d(!this.red, 'Already a number in reduction context'),
                  d(0 === this.negative, 'red works only with positives'),
                  b.convertTo(this)._forceRed(b)
                );
              }),
              (f.prototype.fromRed = function() {
                return (
                  d(
                    this.red,
                    'fromRed works only with numbers in reduction context'
                  ),
                  this.red.convertFrom(this)
                );
              }),
              (f.prototype._forceRed = function(b) {
                return (this.red = b), this;
              }),
              (f.prototype.forceRed = function(b) {
                return (
                  d(!this.red, 'Already a number in reduction context'),
                  this._forceRed(b)
                );
              }),
              (f.prototype.redAdd = function(b) {
                return (
                  d(this.red, 'redAdd works only with red numbers'),
                  this.red.add(this, b)
                );
              }),
              (f.prototype.redIAdd = function(b) {
                return (
                  d(this.red, 'redIAdd works only with red numbers'),
                  this.red.iadd(this, b)
                );
              }),
              (f.prototype.redSub = function(b) {
                return (
                  d(this.red, 'redSub works only with red numbers'),
                  this.red.sub(this, b)
                );
              }),
              (f.prototype.redISub = function(b) {
                return (
                  d(this.red, 'redISub works only with red numbers'),
                  this.red.isub(this, b)
                );
              }),
              (f.prototype.redShl = function(b) {
                return (
                  d(this.red, 'redShl works only with red numbers'),
                  this.red.shl(this, b)
                );
              }),
              (f.prototype.redMul = function(b) {
                return (
                  d(this.red, 'redMul works only with red numbers'),
                  this.red._verify2(this, b),
                  this.red.mul(this, b)
                );
              }),
              (f.prototype.redIMul = function(b) {
                return (
                  d(this.red, 'redMul works only with red numbers'),
                  this.red._verify2(this, b),
                  this.red.imul(this, b)
                );
              }),
              (f.prototype.redSqr = function() {
                return (
                  d(this.red, 'redSqr works only with red numbers'),
                  this.red._verify1(this),
                  this.red.sqr(this)
                );
              }),
              (f.prototype.redISqr = function() {
                return (
                  d(this.red, 'redISqr works only with red numbers'),
                  this.red._verify1(this),
                  this.red.isqr(this)
                );
              }),
              (f.prototype.redSqrt = function() {
                return (
                  d(this.red, 'redSqrt works only with red numbers'),
                  this.red._verify1(this),
                  this.red.sqrt(this)
                );
              }),
              (f.prototype.redInvm = function() {
                return (
                  d(this.red, 'redInvm works only with red numbers'),
                  this.red._verify1(this),
                  this.red.invm(this)
                );
              }),
              (f.prototype.redNeg = function() {
                return (
                  d(this.red, 'redNeg works only with red numbers'),
                  this.red._verify1(this),
                  this.red.neg(this)
                );
              }),
              (f.prototype.redPow = function(b) {
                return (
                  d(this.red && !b.red, 'redPow(normalNum)'),
                  this.red._verify1(this),
                  this.red.pow(this, b)
                );
              });
            var s = { k256: null, p224: null, p192: null, p25519: null };
            (t.prototype._tmp = function() {
              var b = new f(null);
              return (b.words = new Array(Math.ceil(this.n / 13))), b;
            }),
              (t.prototype.ireduce = function(b) {
                var d,
                  c = b;
                do
                  this.split(c, this.tmp),
                    (c = this.imulK(c)),
                    (c = c.iadd(this.tmp)),
                    (d = c.bitLength());
                while (d > this.n);
                var e = d < this.n ? -1 : c.ucmp(this.p);
                return (
                  0 === e
                    ? ((c.words[0] = 0), (c.length = 1))
                    : e > 0
                    ? c.isub(this.p)
                    : c.strip(),
                  c
                );
              }),
              (t.prototype.split = function(b, c) {
                b.iushrn(this.n, 0, c);
              }),
              (t.prototype.imulK = function(b) {
                return b.imul(this.k);
              }),
              e(u, t),
              (u.prototype.split = function(b, c) {
                for (
                  var d = 4194303, e = Math.min(b.length, 9), f = 0;
                  f < e;
                  f++
                )
                  c.words[f] = b.words[f];
                if (((c.length = e), b.length <= 9))
                  return (b.words[0] = 0), void (b.length = 1);
                var g = b.words[9];
                for (c.words[c.length++] = g & d, f = 10; f < b.length; f++) {
                  var h = 0 | b.words[f];
                  (b.words[f - 10] = ((h & d) << 4) | (g >>> 22)), (g = h);
                }
                (g >>>= 22),
                  (b.words[f - 10] = g),
                  0 === g && b.length > 10 ? (b.length -= 10) : (b.length -= 9);
              }),
              (u.prototype.imulK = function(b) {
                (b.words[b.length] = 0),
                  (b.words[b.length + 1] = 0),
                  (b.length += 2);
                for (var c = 0, d = 0; d < b.length; d++) {
                  var e = 0 | b.words[d];
                  (c += 977 * e),
                    (b.words[d] = 67108863 & c),
                    (c = 64 * e + ((c / 67108864) | 0));
                }
                return (
                  0 === b.words[b.length - 1] &&
                    (b.length--, 0 === b.words[b.length - 1] && b.length--),
                  b
                );
              }),
              e(v, t),
              e(w, t),
              e(x, t),
              (x.prototype.imulK = function(b) {
                for (var c = 0, d = 0; d < b.length; d++) {
                  var e = 19 * (0 | b.words[d]) + c,
                    f = 67108863 & e;
                  (e >>>= 26), (b.words[d] = f), (c = e);
                }
                return 0 !== c && (b.words[b.length++] = c), b;
              }),
              (f._prime = function a(b) {
                if (s[b]) return s[b];
                var a;
                if ('k256' === b) a = new u();
                else if ('p224' === b) a = new v();
                else if ('p192' === b) a = new w();
                else {
                  if ('p25519' !== b) throw new Error('Unknown prime ' + b);
                  a = new x();
                }
                return (s[b] = a), a;
              }),
              (y.prototype._verify1 = function(b) {
                d(0 === b.negative, 'red works only with positives'),
                  d(b.red, 'red works only with red numbers');
              }),
              (y.prototype._verify2 = function(b, c) {
                d(
                  0 === (b.negative | c.negative),
                  'red works only with positives'
                ),
                  d(
                    b.red && b.red === c.red,
                    'red works only with red numbers'
                  );
              }),
              (y.prototype.imod = function(b) {
                return this.prime
                  ? this.prime.ireduce(b)._forceRed(this)
                  : b.umod(this.m)._forceRed(this);
              }),
              (y.prototype.neg = function(b) {
                return b.isZero() ? b.clone() : this.m.sub(b)._forceRed(this);
              }),
              (y.prototype.add = function(b, c) {
                this._verify2(b, c);
                var d = b.add(c);
                return d.cmp(this.m) >= 0 && d.isub(this.m), d._forceRed(this);
              }),
              (y.prototype.iadd = function(b, c) {
                this._verify2(b, c);
                var d = b.iadd(c);
                return d.cmp(this.m) >= 0 && d.isub(this.m), d;
              }),
              (y.prototype.sub = function(b, c) {
                this._verify2(b, c);
                var d = b.sub(c);
                return d.cmpn(0) < 0 && d.iadd(this.m), d._forceRed(this);
              }),
              (y.prototype.isub = function(b, c) {
                this._verify2(b, c);
                var d = b.isub(c);
                return d.cmpn(0) < 0 && d.iadd(this.m), d;
              }),
              (y.prototype.shl = function(b, c) {
                return this._verify1(b), this.imod(b.ushln(c));
              }),
              (y.prototype.imul = function(b, c) {
                return this._verify2(b, c), this.imod(b.imul(c));
              }),
              (y.prototype.mul = function(b, c) {
                return this._verify2(b, c), this.imod(b.mul(c));
              }),
              (y.prototype.isqr = function(b) {
                return this.imul(b, b.clone());
              }),
              (y.prototype.sqr = function(b) {
                return this.mul(b, b);
              }),
              (y.prototype.sqrt = function(b) {
                if (b.isZero()) return b.clone();
                var c = this.m.andln(3);
                if ((d(c % 2 === 1), 3 === c)) {
                  var e = this.m.add(new f(1)).iushrn(2);
                  return this.pow(b, e);
                }
                for (
                  var g = this.m.subn(1), h = 0;
                  !g.isZero() && 0 === g.andln(1);

                )
                  h++, g.iushrn(1);
                d(!g.isZero());
                var i = new f(1).toRed(this),
                  j = i.redNeg(),
                  k = this.m.subn(1).iushrn(1),
                  l = this.m.bitLength();
                for (
                  l = new f(2 * l * l).toRed(this);
                  0 !== this.pow(l, k).cmp(j);

                )
                  l.redIAdd(j);
                for (
                  var m = this.pow(l, g),
                    n = this.pow(b, g.addn(1).iushrn(1)),
                    o = this.pow(b, g),
                    p = h;
                  0 !== o.cmp(i);

                ) {
                  for (var q = o, r = 0; 0 !== q.cmp(i); r++) q = q.redSqr();
                  d(r < p);
                  var s = this.pow(m, new f(1).iushln(p - r - 1));
                  (n = n.redMul(s)),
                    (m = s.redSqr()),
                    (o = o.redMul(m)),
                    (p = r);
                }
                return n;
              }),
              (y.prototype.invm = function(b) {
                var c = b._invmp(this.m);
                return 0 !== c.negative
                  ? ((c.negative = 0), this.imod(c).redNeg())
                  : this.imod(c);
              }),
              (y.prototype.pow = function(b, c) {
                if (c.isZero()) return new f(1);
                if (0 === c.cmpn(1)) return b.clone();
                var d = 4,
                  e = new Array(1 << d);
                (e[0] = new f(1).toRed(this)), (e[1] = b);
                for (var g = 2; g < e.length; g++) e[g] = this.mul(e[g - 1], b);
                var h = e[0],
                  i = 0,
                  j = 0,
                  k = c.bitLength() % 26;
                for (0 === k && (k = 26), g = c.length - 1; g >= 0; g--) {
                  for (var l = c.words[g], m = k - 1; m >= 0; m--) {
                    var n = (l >> m) & 1;
                    h !== e[0] && (h = this.sqr(h)),
                      0 !== n || 0 !== i
                        ? ((i <<= 1),
                          (i |= n),
                          j++,
                          (j === d || (0 === g && 0 === m)) &&
                            ((h = this.mul(h, e[i])), (j = 0), (i = 0)))
                        : (j = 0);
                  }
                  k = 26;
                }
                return h;
              }),
              (y.prototype.convertTo = function(b) {
                var c = b.umod(this.m);
                return c === b ? c.clone() : c;
              }),
              (y.prototype.convertFrom = function(b) {
                var c = b.clone();
                return (c.red = null), c;
              }),
              (f.mont = function(b) {
                return new z(b);
              }),
              e(z, y),
              (z.prototype.convertTo = function(b) {
                return this.imod(b.ushln(this.shift));
              }),
              (z.prototype.convertFrom = function(b) {
                var c = this.imod(b.mul(this.rinv));
                return (c.red = null), c;
              }),
              (z.prototype.imul = function(b, c) {
                if (b.isZero() || c.isZero())
                  return (b.words[0] = 0), (b.length = 1), b;
                var d = b.imul(c),
                  e = d
                    .maskn(this.shift)
                    .mul(this.minv)
                    .imaskn(this.shift)
                    .mul(this.m),
                  f = d.isub(e).iushrn(this.shift),
                  g = f;
                return (
                  f.cmp(this.m) >= 0
                    ? (g = f.isub(this.m))
                    : f.cmpn(0) < 0 && (g = f.iadd(this.m)),
                  g._forceRed(this)
                );
              }),
              (z.prototype.mul = function(b, c) {
                if (b.isZero() || c.isZero()) return new f(0)._forceRed(this);
                var d = b.mul(c),
                  e = d
                    .maskn(this.shift)
                    .mul(this.minv)
                    .imaskn(this.shift)
                    .mul(this.m),
                  g = d.isub(e).iushrn(this.shift),
                  h = g;
                return (
                  g.cmp(this.m) >= 0
                    ? (h = g.isub(this.m))
                    : g.cmpn(0) < 0 && (h = g.iadd(this.m)),
                  h._forceRed(this)
                );
              }),
              (z.prototype.invm = function(b) {
                var c = this.imod(b._invmp(this.m).mul(this.r2));
                return c._forceRed(this);
              });
          })('undefined' == typeof b || b, this);
        },
        {}
      ],
      2: [
        function(a, b, c) {
          'use strict';
          var d = c;
          (d.version = a('../package.json').version),
            (d.utils = a('./elliptic/utils')),
            (d.rand = a('brorand')),
            (d.hmacDRBG = a('./elliptic/hmac-drbg')),
            (d.curve = a('./elliptic/curve')),
            (d.curves = a('./elliptic/curves')),
            (d.ec = a('./elliptic/ec')),
            (d.eddsa = a('./elliptic/eddsa'));
        },
        {
          '../package.json': 26,
          './elliptic/curve': 5,
          './elliptic/curves': 8,
          './elliptic/ec': 9,
          './elliptic/eddsa': 12,
          './elliptic/hmac-drbg': 15,
          './elliptic/utils': 17,
          brorand: 18
        }
      ],
      3: [
        function(a, b, c) {
          'use strict';
          function j(a, b) {
            (this.type = a),
              (this.p = new d(b.p, 16)),
              (this.red = b.prime ? d.red(b.prime) : d.mont(this.p)),
              (this.zero = new d(0).toRed(this.red)),
              (this.one = new d(1).toRed(this.red)),
              (this.two = new d(2).toRed(this.red)),
              (this.n = b.n && new d(b.n, 16)),
              (this.g = b.g && this.pointFromJSON(b.g, b.gRed)),
              (this._wnafT1 = new Array(4)),
              (this._wnafT2 = new Array(4)),
              (this._wnafT3 = new Array(4)),
              (this._wnafT4 = new Array(4));
            var c = this.n && this.p.div(this.n);
            !c || c.cmpn(100) > 0
              ? (this.redN = null)
              : ((this._maxwellTrick = !0),
                (this.redN = this.n.toRed(this.red)));
          }
          function k(a, b) {
            (this.curve = a), (this.type = b), (this.precomputed = null);
          }
          var d = a('bn.js'),
            e = a('../../elliptic'),
            f = e.utils,
            g = f.getNAF,
            h = f.getJSF,
            i = f.assert;
          (b.exports = j),
            (j.prototype.point = function() {
              throw new Error('Not implemented');
            }),
            (j.prototype.validate = function() {
              throw new Error('Not implemented');
            }),
            (j.prototype._fixedNafMul = function(b, c) {
              i(b.precomputed);
              var d = b._getDoubles(),
                e = g(c, 1),
                f = (1 << (d.step + 1)) - (d.step % 2 === 0 ? 2 : 1);
              f /= 3;
              for (var h = [], j = 0; j < e.length; j += d.step) {
                for (var k = 0, c = j + d.step - 1; c >= j; c--)
                  k = (k << 1) + e[c];
                h.push(k);
              }
              for (
                var l = this.jpoint(null, null, null),
                  m = this.jpoint(null, null, null),
                  n = f;
                n > 0;
                n--
              ) {
                for (var j = 0; j < h.length; j++) {
                  var k = h[j];
                  k === n
                    ? (m = m.mixedAdd(d.points[j]))
                    : k === -n && (m = m.mixedAdd(d.points[j].neg()));
                }
                l = l.add(m);
              }
              return l.toP();
            }),
            (j.prototype._wnafMul = function(b, c) {
              var d = 4,
                e = b._getNAFPoints(d);
              d = e.wnd;
              for (
                var f = e.points,
                  h = g(c, d),
                  j = this.jpoint(null, null, null),
                  k = h.length - 1;
                k >= 0;
                k--
              ) {
                for (var c = 0; k >= 0 && 0 === h[k]; k--) c++;
                if ((k >= 0 && c++, (j = j.dblp(c)), k < 0)) break;
                var l = h[k];
                i(0 !== l),
                  (j =
                    'affine' === b.type
                      ? l > 0
                        ? j.mixedAdd(f[(l - 1) >> 1])
                        : j.mixedAdd(f[(-l - 1) >> 1].neg())
                      : l > 0
                      ? j.add(f[(l - 1) >> 1])
                      : j.add(f[(-l - 1) >> 1].neg()));
              }
              return 'affine' === b.type ? j.toP() : j;
            }),
            (j.prototype._wnafMulAdd = function(b, c, d, e, f) {
              for (
                var i = this._wnafT1,
                  j = this._wnafT2,
                  k = this._wnafT3,
                  l = 0,
                  m = 0;
                m < e;
                m++
              ) {
                var n = c[m],
                  o = n._getNAFPoints(b);
                (i[m] = o.wnd), (j[m] = o.points);
              }
              for (var m = e - 1; m >= 1; m -= 2) {
                var p = m - 1,
                  q = m;
                if (1 === i[p] && 1 === i[q]) {
                  var r = [c[p], null, null, c[q]];
                  0 === c[p].y.cmp(c[q].y)
                    ? ((r[1] = c[p].add(c[q])),
                      (r[2] = c[p].toJ().mixedAdd(c[q].neg())))
                    : 0 === c[p].y.cmp(c[q].y.redNeg())
                    ? ((r[1] = c[p].toJ().mixedAdd(c[q])),
                      (r[2] = c[p].add(c[q].neg())))
                    : ((r[1] = c[p].toJ().mixedAdd(c[q])),
                      (r[2] = c[p].toJ().mixedAdd(c[q].neg())));
                  var s = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
                    t = h(d[p], d[q]);
                  (l = Math.max(t[0].length, l)),
                    (k[p] = new Array(l)),
                    (k[q] = new Array(l));
                  for (var u = 0; u < l; u++) {
                    var v = 0 | t[0][u],
                      w = 0 | t[1][u];
                    (k[p][u] = s[3 * (v + 1) + (w + 1)]),
                      (k[q][u] = 0),
                      (j[p] = r);
                  }
                } else
                  (k[p] = g(d[p], i[p])),
                    (k[q] = g(d[q], i[q])),
                    (l = Math.max(k[p].length, l)),
                    (l = Math.max(k[q].length, l));
              }
              for (
                var x = this.jpoint(null, null, null), y = this._wnafT4, m = l;
                m >= 0;
                m--
              ) {
                for (var z = 0; m >= 0; ) {
                  for (var A = !0, u = 0; u < e; u++)
                    (y[u] = 0 | k[u][m]), 0 !== y[u] && (A = !1);
                  if (!A) break;
                  z++, m--;
                }
                if ((m >= 0 && z++, (x = x.dblp(z)), m < 0)) break;
                for (var u = 0; u < e; u++) {
                  var n,
                    B = y[u];
                  0 !== B &&
                    (B > 0
                      ? (n = j[u][(B - 1) >> 1])
                      : B < 0 && (n = j[u][(-B - 1) >> 1].neg()),
                    (x = 'affine' === n.type ? x.mixedAdd(n) : x.add(n)));
                }
              }
              for (var m = 0; m < e; m++) j[m] = null;
              return f ? x : x.toP();
            }),
            (j.BasePoint = k),
            (k.prototype.eq = function() {
              throw new Error('Not implemented');
            }),
            (k.prototype.validate = function() {
              return this.curve.validate(this);
            }),
            (j.prototype.decodePoint = function(b, c) {
              b = f.toArray(b, c);
              var d = this.p.byteLength();
              if (
                (4 === b[0] || 6 === b[0] || 7 === b[0]) &&
                b.length - 1 === 2 * d
              ) {
                6 === b[0]
                  ? i(b[b.length - 1] % 2 === 0)
                  : 7 === b[0] && i(b[b.length - 1] % 2 === 1);
                var e = this.point(
                  b.slice(1, 1 + d),
                  b.slice(1 + d, 1 + 2 * d)
                );
                return e;
              }
              if ((2 === b[0] || 3 === b[0]) && b.length - 1 === d)
                return this.pointFromX(b.slice(1, 1 + d), 3 === b[0]);
              throw new Error('Unknown point format');
            }),
            (k.prototype.encodeCompressed = function(b) {
              return this.encode(b, !0);
            }),
            (k.prototype._encode = function(b) {
              var c = this.curve.p.byteLength(),
                d = this.getX().toArray('be', c);
              return b
                ? [this.getY().isEven() ? 2 : 3].concat(d)
                : [4].concat(d, this.getY().toArray('be', c));
            }),
            (k.prototype.encode = function(b, c) {
              return f.encode(this._encode(c), b);
            }),
            (k.prototype.precompute = function(b) {
              if (this.precomputed) return this;
              var c = { doubles: null, naf: null, beta: null };
              return (
                (c.naf = this._getNAFPoints(8)),
                (c.doubles = this._getDoubles(4, b)),
                (c.beta = this._getBeta()),
                (this.precomputed = c),
                this
              );
            }),
            (k.prototype._hasDoubles = function(b) {
              if (!this.precomputed) return !1;
              var c = this.precomputed.doubles;
              return (
                !!c &&
                c.points.length >= Math.ceil((b.bitLength() + 1) / c.step)
              );
            }),
            (k.prototype._getDoubles = function(b, c) {
              if (this.precomputed && this.precomputed.doubles)
                return this.precomputed.doubles;
              for (var d = [this], e = this, f = 0; f < c; f += b) {
                for (var g = 0; g < b; g++) e = e.dbl();
                d.push(e);
              }
              return { step: b, points: d };
            }),
            (k.prototype._getNAFPoints = function(b) {
              if (this.precomputed && this.precomputed.naf)
                return this.precomputed.naf;
              for (
                var c = [this],
                  d = (1 << b) - 1,
                  e = 1 === d ? null : this.dbl(),
                  f = 1;
                f < d;
                f++
              )
                c[f] = c[f - 1].add(e);
              return { wnd: b, points: c };
            }),
            (k.prototype._getBeta = function() {
              return null;
            }),
            (k.prototype.dblp = function(b) {
              for (var c = this, d = 0; d < b; d++) c = c.dbl();
              return c;
            });
        },
        { '../../elliptic': 2, 'bn.js': 1 }
      ],
      4: [
        function(a, b, c) {
          'use strict';
          function j(a) {
            (this.twisted = 1 !== (0 | a.a)),
              (this.mOneA = this.twisted && (0 | a.a) === -1),
              (this.extended = this.mOneA),
              h.call(this, 'edwards', a),
              (this.a = new f(a.a, 16).umod(this.red.m)),
              (this.a = this.a.toRed(this.red)),
              (this.c = new f(a.c, 16).toRed(this.red)),
              (this.c2 = this.c.redSqr()),
              (this.d = new f(a.d, 16).toRed(this.red)),
              (this.dd = this.d.redAdd(this.d)),
              i(!this.twisted || 0 === this.c.fromRed().cmpn(1)),
              (this.oneC = 1 === (0 | a.c));
          }
          function k(a, b, c, d, e) {
            h.BasePoint.call(this, a, 'projective'),
              null === b && null === c && null === d
                ? ((this.x = this.curve.zero),
                  (this.y = this.curve.one),
                  (this.z = this.curve.one),
                  (this.t = this.curve.zero),
                  (this.zOne = !0))
                : ((this.x = new f(b, 16)),
                  (this.y = new f(c, 16)),
                  (this.z = d ? new f(d, 16) : this.curve.one),
                  (this.t = e && new f(e, 16)),
                  this.x.red || (this.x = this.x.toRed(this.curve.red)),
                  this.y.red || (this.y = this.y.toRed(this.curve.red)),
                  this.z.red || (this.z = this.z.toRed(this.curve.red)),
                  this.t &&
                    !this.t.red &&
                    (this.t = this.t.toRed(this.curve.red)),
                  (this.zOne = this.z === this.curve.one),
                  this.curve.extended &&
                    !this.t &&
                    ((this.t = this.x.redMul(this.y)),
                    this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
          }
          var d = a('../curve'),
            e = a('../../elliptic'),
            f = a('bn.js'),
            g = a('inherits'),
            h = d.base,
            i = e.utils.assert;
          g(j, h),
            (b.exports = j),
            (j.prototype._mulA = function(b) {
              return this.mOneA ? b.redNeg() : this.a.redMul(b);
            }),
            (j.prototype._mulC = function(b) {
              return this.oneC ? b : this.c.redMul(b);
            }),
            (j.prototype.jpoint = function(b, c, d, e) {
              return this.point(b, c, d, e);
            }),
            (j.prototype.pointFromX = function(b, c) {
              (b = new f(b, 16)), b.red || (b = b.toRed(this.red));
              var d = b.redSqr(),
                e = this.c2.redSub(this.a.redMul(d)),
                g = this.one.redSub(this.c2.redMul(this.d).redMul(d)),
                h = e.redMul(g.redInvm()),
                i = h.redSqrt();
              if (
                0 !==
                i
                  .redSqr()
                  .redSub(h)
                  .cmp(this.zero)
              )
                throw new Error('invalid point');
              var j = i.fromRed().isOdd();
              return (
                ((c && !j) || (!c && j)) && (i = i.redNeg()), this.point(b, i)
              );
            }),
            (j.prototype.pointFromY = function(b, c) {
              (b = new f(b, 16)), b.red || (b = b.toRed(this.red));
              var d = b.redSqr(),
                e = d.redSub(this.one),
                g = d.redMul(this.d).redAdd(this.one),
                h = e.redMul(g.redInvm());
              if (0 === h.cmp(this.zero)) {
                if (c) throw new Error('invalid point');
                return this.point(this.zero, b);
              }
              var i = h.redSqrt();
              if (
                0 !==
                i
                  .redSqr()
                  .redSub(h)
                  .cmp(this.zero)
              )
                throw new Error('invalid point');
              return i.isOdd() !== c && (i = i.redNeg()), this.point(i, b);
            }),
            (j.prototype.validate = function(b) {
              if (b.isInfinity()) return !0;
              b.normalize();
              var c = b.x.redSqr(),
                d = b.y.redSqr(),
                e = c.redMul(this.a).redAdd(d),
                f = this.c2.redMul(this.one.redAdd(this.d.redMul(c).redMul(d)));
              return 0 === e.cmp(f);
            }),
            g(k, h.BasePoint),
            (j.prototype.pointFromJSON = function(b) {
              return k.fromJSON(this, b);
            }),
            (j.prototype.point = function(b, c, d, e) {
              return new k(this, b, c, d, e);
            }),
            (k.fromJSON = function(b, c) {
              return new k(b, c[0], c[1], c[2]);
            }),
            (k.prototype.inspect = function() {
              return this.isInfinity()
                ? '<EC Point Infinity>'
                : '<EC Point x: ' +
                    this.x.fromRed().toString(16, 2) +
                    ' y: ' +
                    this.y.fromRed().toString(16, 2) +
                    ' z: ' +
                    this.z.fromRed().toString(16, 2) +
                    '>';
            }),
            (k.prototype.isInfinity = function() {
              return 0 === this.x.cmpn(0) && 0 === this.y.cmp(this.z);
            }),
            (k.prototype._extDbl = function() {
              var b = this.x.redSqr(),
                c = this.y.redSqr(),
                d = this.z.redSqr();
              d = d.redIAdd(d);
              var e = this.curve._mulA(b),
                f = this.x
                  .redAdd(this.y)
                  .redSqr()
                  .redISub(b)
                  .redISub(c),
                g = e.redAdd(c),
                h = g.redSub(d),
                i = e.redSub(c),
                j = f.redMul(h),
                k = g.redMul(i),
                l = f.redMul(i),
                m = h.redMul(g);
              return this.curve.point(j, k, m, l);
            }),
            (k.prototype._projDbl = function() {
              var e,
                f,
                g,
                b = this.x.redAdd(this.y).redSqr(),
                c = this.x.redSqr(),
                d = this.y.redSqr();
              if (this.curve.twisted) {
                var h = this.curve._mulA(c),
                  i = h.redAdd(d);
                if (this.zOne)
                  (e = b
                    .redSub(c)
                    .redSub(d)
                    .redMul(i.redSub(this.curve.two))),
                    (f = i.redMul(h.redSub(d))),
                    (g = i
                      .redSqr()
                      .redSub(i)
                      .redSub(i));
                else {
                  var j = this.z.redSqr(),
                    k = i.redSub(j).redISub(j);
                  (e = b
                    .redSub(c)
                    .redISub(d)
                    .redMul(k)),
                    (f = i.redMul(h.redSub(d))),
                    (g = i.redMul(k));
                }
              } else {
                var h = c.redAdd(d),
                  j = this.curve._mulC(this.c.redMul(this.z)).redSqr(),
                  k = h.redSub(j).redSub(j);
                (e = this.curve._mulC(b.redISub(h)).redMul(k)),
                  (f = this.curve._mulC(h).redMul(c.redISub(d))),
                  (g = h.redMul(k));
              }
              return this.curve.point(e, f, g);
            }),
            (k.prototype.dbl = function() {
              return this.isInfinity()
                ? this
                : this.curve.extended
                ? this._extDbl()
                : this._projDbl();
            }),
            (k.prototype._extAdd = function(b) {
              var c = this.y.redSub(this.x).redMul(b.y.redSub(b.x)),
                d = this.y.redAdd(this.x).redMul(b.y.redAdd(b.x)),
                e = this.t.redMul(this.curve.dd).redMul(b.t),
                f = this.z.redMul(b.z.redAdd(b.z)),
                g = d.redSub(c),
                h = f.redSub(e),
                i = f.redAdd(e),
                j = d.redAdd(c),
                k = g.redMul(h),
                l = i.redMul(j),
                m = g.redMul(j),
                n = h.redMul(i);
              return this.curve.point(k, l, n, m);
            }),
            (k.prototype._projAdd = function(b) {
              var l,
                m,
                c = this.z.redMul(b.z),
                d = c.redSqr(),
                e = this.x.redMul(b.x),
                f = this.y.redMul(b.y),
                g = this.curve.d.redMul(e).redMul(f),
                h = d.redSub(g),
                i = d.redAdd(g),
                j = this.x
                  .redAdd(this.y)
                  .redMul(b.x.redAdd(b.y))
                  .redISub(e)
                  .redISub(f),
                k = c.redMul(h).redMul(j);
              return (
                this.curve.twisted
                  ? ((l = c.redMul(i).redMul(f.redSub(this.curve._mulA(e)))),
                    (m = h.redMul(i)))
                  : ((l = c.redMul(i).redMul(f.redSub(e))),
                    (m = this.curve._mulC(h).redMul(i))),
                this.curve.point(k, l, m)
              );
            }),
            (k.prototype.add = function(b) {
              return this.isInfinity()
                ? b
                : b.isInfinity()
                ? this
                : this.curve.extended
                ? this._extAdd(b)
                : this._projAdd(b);
            }),
            (k.prototype.mul = function(b) {
              return this._hasDoubles(b)
                ? this.curve._fixedNafMul(this, b)
                : this.curve._wnafMul(this, b);
            }),
            (k.prototype.mulAdd = function(b, c, d) {
              return this.curve._wnafMulAdd(1, [this, c], [b, d], 2, !1);
            }),
            (k.prototype.jmulAdd = function(b, c, d) {
              return this.curve._wnafMulAdd(1, [this, c], [b, d], 2, !0);
            }),
            (k.prototype.normalize = function() {
              if (this.zOne) return this;
              var b = this.z.redInvm();
              return (
                (this.x = this.x.redMul(b)),
                (this.y = this.y.redMul(b)),
                this.t && (this.t = this.t.redMul(b)),
                (this.z = this.curve.one),
                (this.zOne = !0),
                this
              );
            }),
            (k.prototype.neg = function() {
              return this.curve.point(
                this.x.redNeg(),
                this.y,
                this.z,
                this.t && this.t.redNeg()
              );
            }),
            (k.prototype.getX = function() {
              return this.normalize(), this.x.fromRed();
            }),
            (k.prototype.getY = function() {
              return this.normalize(), this.y.fromRed();
            }),
            (k.prototype.eq = function(b) {
              return (
                this === b ||
                (0 === this.getX().cmp(b.getX()) &&
                  0 === this.getY().cmp(b.getY()))
              );
            }),
            (k.prototype.eqXToP = function(b) {
              var c = b.toRed(this.curve.red).redMul(this.z);
              if (0 === this.x.cmp(c)) return !0;
              for (var d = b.clone(), e = this.curve.redN.redMul(this.z); ; ) {
                if ((d.iadd(this.curve.n), d.cmp(this.curve.p) >= 0)) return !1;
                if ((c.redIAdd(e), 0 === this.x.cmp(c))) return !0;
              }
              return !1;
            }),
            (k.prototype.toP = k.prototype.normalize),
            (k.prototype.mixedAdd = k.prototype.add);
        },
        { '../../elliptic': 2, '../curve': 5, 'bn.js': 1, inherits: 25 }
      ],
      5: [
        function(a, b, c) {
          'use strict';
          var d = c;
          (d.base = a('./base')),
            (d.short = a('./short')),
            (d.mont = a('./mont')),
            (d.edwards = a('./edwards'));
        },
        { './base': 3, './edwards': 4, './mont': 6, './short': 7 }
      ],
      6: [
        function(a, b, c) {
          'use strict';
          function j(a) {
            g.call(this, 'mont', a),
              (this.a = new e(a.a, 16).toRed(this.red)),
              (this.b = new e(a.b, 16).toRed(this.red)),
              (this.i4 = new e(4).toRed(this.red).redInvm()),
              (this.two = new e(2).toRed(this.red)),
              (this.a24 = this.i4.redMul(this.a.redAdd(this.two)));
          }
          function k(a, b, c) {
            g.BasePoint.call(this, a, 'projective'),
              null === b && null === c
                ? ((this.x = this.curve.one), (this.z = this.curve.zero))
                : ((this.x = new e(b, 16)),
                  (this.z = new e(c, 16)),
                  this.x.red || (this.x = this.x.toRed(this.curve.red)),
                  this.z.red || (this.z = this.z.toRed(this.curve.red)));
          }
          var d = a('../curve'),
            e = a('bn.js'),
            f = a('inherits'),
            g = d.base,
            h = a('../../elliptic'),
            i = h.utils;
          f(j, g),
            (b.exports = j),
            (j.prototype.validate = function(b) {
              var c = b.normalize().x,
                d = c.redSqr(),
                e = d
                  .redMul(c)
                  .redAdd(d.redMul(this.a))
                  .redAdd(c),
                f = e.redSqrt();
              return 0 === f.redSqr().cmp(e);
            }),
            f(k, g.BasePoint),
            (j.prototype.decodePoint = function(b, c) {
              return this.point(i.toArray(b, c), 1);
            }),
            (j.prototype.point = function(b, c) {
              return new k(this, b, c);
            }),
            (j.prototype.pointFromJSON = function(b) {
              return k.fromJSON(this, b);
            }),
            (k.prototype.precompute = function() {}),
            (k.prototype._encode = function() {
              return this.getX().toArray('be', this.curve.p.byteLength());
            }),
            (k.fromJSON = function(b, c) {
              return new k(b, c[0], c[1] || b.one);
            }),
            (k.prototype.inspect = function() {
              return this.isInfinity()
                ? '<EC Point Infinity>'
                : '<EC Point x: ' +
                    this.x.fromRed().toString(16, 2) +
                    ' z: ' +
                    this.z.fromRed().toString(16, 2) +
                    '>';
            }),
            (k.prototype.isInfinity = function() {
              return 0 === this.z.cmpn(0);
            }),
            (k.prototype.dbl = function() {
              var b = this.x.redAdd(this.z),
                c = b.redSqr(),
                d = this.x.redSub(this.z),
                e = d.redSqr(),
                f = c.redSub(e),
                g = c.redMul(e),
                h = f.redMul(e.redAdd(this.curve.a24.redMul(f)));
              return this.curve.point(g, h);
            }),
            (k.prototype.add = function() {
              throw new Error('Not supported on Montgomery curve');
            }),
            (k.prototype.diffAdd = function(b, c) {
              var d = this.x.redAdd(this.z),
                e = this.x.redSub(this.z),
                f = b.x.redAdd(b.z),
                g = b.x.redSub(b.z),
                h = g.redMul(d),
                i = f.redMul(e),
                j = c.z.redMul(h.redAdd(i).redSqr()),
                k = c.x.redMul(h.redISub(i).redSqr());
              return this.curve.point(j, k);
            }),
            (k.prototype.mul = function(b) {
              for (
                var c = b.clone(),
                  d = this,
                  e = this.curve.point(null, null),
                  f = this,
                  g = [];
                0 !== c.cmpn(0);
                c.iushrn(1)
              )
                g.push(c.andln(1));
              for (var h = g.length - 1; h >= 0; h--)
                0 === g[h]
                  ? ((d = d.diffAdd(e, f)), (e = e.dbl()))
                  : ((e = d.diffAdd(e, f)), (d = d.dbl()));
              return e;
            }),
            (k.prototype.mulAdd = function() {
              throw new Error('Not supported on Montgomery curve');
            }),
            (k.prototype.jumlAdd = function() {
              throw new Error('Not supported on Montgomery curve');
            }),
            (k.prototype.eq = function(b) {
              return 0 === this.getX().cmp(b.getX());
            }),
            (k.prototype.normalize = function() {
              return (
                (this.x = this.x.redMul(this.z.redInvm())),
                (this.z = this.curve.one),
                this
              );
            }),
            (k.prototype.getX = function() {
              return this.normalize(), this.x.fromRed();
            });
        },
        { '../../elliptic': 2, '../curve': 5, 'bn.js': 1, inherits: 25 }
      ],
      7: [
        function(a, b, c) {
          'use strict';
          function j(a) {
            h.call(this, 'short', a),
              (this.a = new f(a.a, 16).toRed(this.red)),
              (this.b = new f(a.b, 16).toRed(this.red)),
              (this.tinv = this.two.redInvm()),
              (this.zeroA = 0 === this.a.fromRed().cmpn(0)),
              (this.threeA =
                0 ===
                this.a
                  .fromRed()
                  .sub(this.p)
                  .cmpn(-3)),
              (this.endo = this._getEndomorphism(a)),
              (this._endoWnafT1 = new Array(4)),
              (this._endoWnafT2 = new Array(4));
          }
          function k(a, b, c, d) {
            h.BasePoint.call(this, a, 'affine'),
              null === b && null === c
                ? ((this.x = null), (this.y = null), (this.inf = !0))
                : ((this.x = new f(b, 16)),
                  (this.y = new f(c, 16)),
                  d &&
                    (this.x.forceRed(this.curve.red),
                    this.y.forceRed(this.curve.red)),
                  this.x.red || (this.x = this.x.toRed(this.curve.red)),
                  this.y.red || (this.y = this.y.toRed(this.curve.red)),
                  (this.inf = !1));
          }
          function l(a, b, c, d) {
            h.BasePoint.call(this, a, 'jacobian'),
              null === b && null === c && null === d
                ? ((this.x = this.curve.one),
                  (this.y = this.curve.one),
                  (this.z = new f(0)))
                : ((this.x = new f(b, 16)),
                  (this.y = new f(c, 16)),
                  (this.z = new f(d, 16))),
              this.x.red || (this.x = this.x.toRed(this.curve.red)),
              this.y.red || (this.y = this.y.toRed(this.curve.red)),
              this.z.red || (this.z = this.z.toRed(this.curve.red)),
              (this.zOne = this.z === this.curve.one);
          }
          var d = a('../curve'),
            e = a('../../elliptic'),
            f = a('bn.js'),
            g = a('inherits'),
            h = d.base,
            i = e.utils.assert;
          g(j, h),
            (b.exports = j),
            (j.prototype._getEndomorphism = function(b) {
              if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
                var c, d;
                if (b.beta) c = new f(b.beta, 16).toRed(this.red);
                else {
                  var e = this._getEndoRoots(this.p);
                  (c = e[0].cmp(e[1]) < 0 ? e[0] : e[1]),
                    (c = c.toRed(this.red));
                }
                if (b.lambda) d = new f(b.lambda, 16);
                else {
                  var g = this._getEndoRoots(this.n);
                  0 === this.g.mul(g[0]).x.cmp(this.g.x.redMul(c))
                    ? (d = g[0])
                    : ((d = g[1]),
                      i(0 === this.g.mul(d).x.cmp(this.g.x.redMul(c))));
                }
                var h;
                return (
                  (h = b.basis
                    ? b.basis.map(function(a) {
                        return { a: new f(a.a, 16), b: new f(a.b, 16) };
                      })
                    : this._getEndoBasis(d)),
                  { beta: c, lambda: d, basis: h }
                );
              }
            }),
            (j.prototype._getEndoRoots = function(b) {
              var c = b === this.p ? this.red : f.mont(b),
                d = new f(2).toRed(c).redInvm(),
                e = d.redNeg(),
                g = new f(3)
                  .toRed(c)
                  .redNeg()
                  .redSqrt()
                  .redMul(d),
                h = e.redAdd(g).fromRed(),
                i = e.redSub(g).fromRed();
              return [h, i];
            }),
            (j.prototype._getEndoBasis = function(b) {
              for (
                var k,
                  l,
                  m,
                  n,
                  o,
                  p,
                  q,
                  s,
                  t,
                  c = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
                  d = b,
                  e = this.n.clone(),
                  g = new f(1),
                  h = new f(0),
                  i = new f(0),
                  j = new f(1),
                  r = 0;
                0 !== d.cmpn(0);

              ) {
                var u = e.div(d);
                (s = e.sub(u.mul(d))), (t = i.sub(u.mul(g)));
                var v = j.sub(u.mul(h));
                if (!m && s.cmp(c) < 0)
                  (k = q.neg()), (l = g), (m = s.neg()), (n = t);
                else if (m && 2 === ++r) break;
                (q = s), (e = d), (d = s), (i = g), (g = t), (j = h), (h = v);
              }
              (o = s.neg()), (p = t);
              var w = m.sqr().add(n.sqr()),
                x = o.sqr().add(p.sqr());
              return (
                x.cmp(w) >= 0 && ((o = k), (p = l)),
                m.negative && ((m = m.neg()), (n = n.neg())),
                o.negative && ((o = o.neg()), (p = p.neg())),
                [{ a: m, b: n }, { a: o, b: p }]
              );
            }),
            (j.prototype._endoSplit = function(b) {
              var c = this.endo.basis,
                d = c[0],
                e = c[1],
                f = e.b.mul(b).divRound(this.n),
                g = d.b
                  .neg()
                  .mul(b)
                  .divRound(this.n),
                h = f.mul(d.a),
                i = g.mul(e.a),
                j = f.mul(d.b),
                k = g.mul(e.b),
                l = b.sub(h).sub(i),
                m = j.add(k).neg();
              return { k1: l, k2: m };
            }),
            (j.prototype.pointFromX = function(b, c) {
              (b = new f(b, 16)), b.red || (b = b.toRed(this.red));
              var d = b
                  .redSqr()
                  .redMul(b)
                  .redIAdd(b.redMul(this.a))
                  .redIAdd(this.b),
                e = d.redSqrt();
              if (
                0 !==
                e
                  .redSqr()
                  .redSub(d)
                  .cmp(this.zero)
              )
                throw new Error('invalid point');
              var g = e.fromRed().isOdd();
              return (
                ((c && !g) || (!c && g)) && (e = e.redNeg()), this.point(b, e)
              );
            }),
            (j.prototype.validate = function(b) {
              if (b.inf) return !0;
              var c = b.x,
                d = b.y,
                e = this.a.redMul(c),
                f = c
                  .redSqr()
                  .redMul(c)
                  .redIAdd(e)
                  .redIAdd(this.b);
              return (
                0 ===
                d
                  .redSqr()
                  .redISub(f)
                  .cmpn(0)
              );
            }),
            (j.prototype._endoWnafMulAdd = function(b, c, d) {
              for (
                var e = this._endoWnafT1, f = this._endoWnafT2, g = 0;
                g < b.length;
                g++
              ) {
                var h = this._endoSplit(c[g]),
                  i = b[g],
                  j = i._getBeta();
                h.k1.negative && (h.k1.ineg(), (i = i.neg(!0))),
                  h.k2.negative && (h.k2.ineg(), (j = j.neg(!0))),
                  (e[2 * g] = i),
                  (e[2 * g + 1] = j),
                  (f[2 * g] = h.k1),
                  (f[2 * g + 1] = h.k2);
              }
              for (
                var k = this._wnafMulAdd(1, e, f, 2 * g, d), l = 0;
                l < 2 * g;
                l++
              )
                (e[l] = null), (f[l] = null);
              return k;
            }),
            g(k, h.BasePoint),
            (j.prototype.point = function(b, c, d) {
              return new k(this, b, c, d);
            }),
            (j.prototype.pointFromJSON = function(b, c) {
              return k.fromJSON(this, b, c);
            }),
            (k.prototype._getBeta = function() {
              if (this.curve.endo) {
                var b = this.precomputed;
                if (b && b.beta) return b.beta;
                var c = this.curve.point(
                  this.x.redMul(this.curve.endo.beta),
                  this.y
                );
                if (b) {
                  var d = this.curve,
                    e = function(a) {
                      return d.point(a.x.redMul(d.endo.beta), a.y);
                    };
                  (b.beta = c),
                    (c.precomputed = {
                      beta: null,
                      naf: b.naf && {
                        wnd: b.naf.wnd,
                        points: b.naf.points.map(e)
                      },
                      doubles: b.doubles && {
                        step: b.doubles.step,
                        points: b.doubles.points.map(e)
                      }
                    });
                }
                return c;
              }
            }),
            (k.prototype.toJSON = function() {
              return this.precomputed
                ? [
                    this.x,
                    this.y,
                    this.precomputed && {
                      doubles: this.precomputed.doubles && {
                        step: this.precomputed.doubles.step,
                        points: this.precomputed.doubles.points.slice(1)
                      },
                      naf: this.precomputed.naf && {
                        wnd: this.precomputed.naf.wnd,
                        points: this.precomputed.naf.points.slice(1)
                      }
                    }
                  ]
                : [this.x, this.y];
            }),
            (k.fromJSON = function(b, c, d) {
              function f(a) {
                return b.point(a[0], a[1], d);
              }
              'string' == typeof c && (c = JSON.parse(c));
              var e = b.point(c[0], c[1], d);
              if (!c[2]) return e;
              var g = c[2];
              return (
                (e.precomputed = {
                  beta: null,
                  doubles: g.doubles && {
                    step: g.doubles.step,
                    points: [e].concat(g.doubles.points.map(f))
                  },
                  naf: g.naf && {
                    wnd: g.naf.wnd,
                    points: [e].concat(g.naf.points.map(f))
                  }
                }),
                e
              );
            }),
            (k.prototype.inspect = function() {
              return this.isInfinity()
                ? '<EC Point Infinity>'
                : '<EC Point x: ' +
                    this.x.fromRed().toString(16, 2) +
                    ' y: ' +
                    this.y.fromRed().toString(16, 2) +
                    '>';
            }),
            (k.prototype.isInfinity = function() {
              return this.inf;
            }),
            (k.prototype.add = function(b) {
              if (this.inf) return b;
              if (b.inf) return this;
              if (this.eq(b)) return this.dbl();
              if (this.neg().eq(b)) return this.curve.point(null, null);
              if (0 === this.x.cmp(b.x)) return this.curve.point(null, null);
              var c = this.y.redSub(b.y);
              0 !== c.cmpn(0) && (c = c.redMul(this.x.redSub(b.x).redInvm()));
              var d = c
                  .redSqr()
                  .redISub(this.x)
                  .redISub(b.x),
                e = c.redMul(this.x.redSub(d)).redISub(this.y);
              return this.curve.point(d, e);
            }),
            (k.prototype.dbl = function() {
              if (this.inf) return this;
              var b = this.y.redAdd(this.y);
              if (0 === b.cmpn(0)) return this.curve.point(null, null);
              var c = this.curve.a,
                d = this.x.redSqr(),
                e = b.redInvm(),
                f = d
                  .redAdd(d)
                  .redIAdd(d)
                  .redIAdd(c)
                  .redMul(e),
                g = f.redSqr().redISub(this.x.redAdd(this.x)),
                h = f.redMul(this.x.redSub(g)).redISub(this.y);
              return this.curve.point(g, h);
            }),
            (k.prototype.getX = function() {
              return this.x.fromRed();
            }),
            (k.prototype.getY = function() {
              return this.y.fromRed();
            }),
            (k.prototype.mul = function(b) {
              return (
                (b = new f(b, 16)),
                this._hasDoubles(b)
                  ? this.curve._fixedNafMul(this, b)
                  : this.curve.endo
                  ? this.curve._endoWnafMulAdd([this], [b])
                  : this.curve._wnafMul(this, b)
              );
            }),
            (k.prototype.mulAdd = function(b, c, d) {
              var e = [this, c],
                f = [b, d];
              return this.curve.endo
                ? this.curve._endoWnafMulAdd(e, f)
                : this.curve._wnafMulAdd(1, e, f, 2);
            }),
            (k.prototype.jmulAdd = function(b, c, d) {
              var e = [this, c],
                f = [b, d];
              return this.curve.endo
                ? this.curve._endoWnafMulAdd(e, f, !0)
                : this.curve._wnafMulAdd(1, e, f, 2, !0);
            }),
            (k.prototype.eq = function(b) {
              return (
                this === b ||
                (this.inf === b.inf &&
                  (this.inf ||
                    (0 === this.x.cmp(b.x) && 0 === this.y.cmp(b.y))))
              );
            }),
            (k.prototype.neg = function(b) {
              if (this.inf) return this;
              var c = this.curve.point(this.x, this.y.redNeg());
              if (b && this.precomputed) {
                var d = this.precomputed,
                  e = function(a) {
                    return a.neg();
                  };
                c.precomputed = {
                  naf: d.naf && { wnd: d.naf.wnd, points: d.naf.points.map(e) },
                  doubles: d.doubles && {
                    step: d.doubles.step,
                    points: d.doubles.points.map(e)
                  }
                };
              }
              return c;
            }),
            (k.prototype.toJ = function() {
              if (this.inf) return this.curve.jpoint(null, null, null);
              var b = this.curve.jpoint(this.x, this.y, this.curve.one);
              return b;
            }),
            g(l, h.BasePoint),
            (j.prototype.jpoint = function(b, c, d) {
              return new l(this, b, c, d);
            }),
            (l.prototype.toP = function() {
              if (this.isInfinity()) return this.curve.point(null, null);
              var b = this.z.redInvm(),
                c = b.redSqr(),
                d = this.x.redMul(c),
                e = this.y.redMul(c).redMul(b);
              return this.curve.point(d, e);
            }),
            (l.prototype.neg = function() {
              return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
            }),
            (l.prototype.add = function(b) {
              if (this.isInfinity()) return b;
              if (b.isInfinity()) return this;
              var c = b.z.redSqr(),
                d = this.z.redSqr(),
                e = this.x.redMul(c),
                f = b.x.redMul(d),
                g = this.y.redMul(c.redMul(b.z)),
                h = b.y.redMul(d.redMul(this.z)),
                i = e.redSub(f),
                j = g.redSub(h);
              if (0 === i.cmpn(0))
                return 0 !== j.cmpn(0)
                  ? this.curve.jpoint(null, null, null)
                  : this.dbl();
              var k = i.redSqr(),
                l = k.redMul(i),
                m = e.redMul(k),
                n = j
                  .redSqr()
                  .redIAdd(l)
                  .redISub(m)
                  .redISub(m),
                o = j.redMul(m.redISub(n)).redISub(g.redMul(l)),
                p = this.z.redMul(b.z).redMul(i);
              return this.curve.jpoint(n, o, p);
            }),
            (l.prototype.mixedAdd = function(b) {
              if (this.isInfinity()) return b.toJ();
              if (b.isInfinity()) return this;
              var c = this.z.redSqr(),
                d = this.x,
                e = b.x.redMul(c),
                f = this.y,
                g = b.y.redMul(c).redMul(this.z),
                h = d.redSub(e),
                i = f.redSub(g);
              if (0 === h.cmpn(0))
                return 0 !== i.cmpn(0)
                  ? this.curve.jpoint(null, null, null)
                  : this.dbl();
              var j = h.redSqr(),
                k = j.redMul(h),
                l = d.redMul(j),
                m = i
                  .redSqr()
                  .redIAdd(k)
                  .redISub(l)
                  .redISub(l),
                n = i.redMul(l.redISub(m)).redISub(f.redMul(k)),
                o = this.z.redMul(h);
              return this.curve.jpoint(m, n, o);
            }),
            (l.prototype.dblp = function(b) {
              if (0 === b) return this;
              if (this.isInfinity()) return this;
              if (!b) return this.dbl();
              if (this.curve.zeroA || this.curve.threeA) {
                for (var c = this, d = 0; d < b; d++) c = c.dbl();
                return c;
              }
              for (
                var e = this.curve.a,
                  f = this.curve.tinv,
                  g = this.x,
                  h = this.y,
                  i = this.z,
                  j = i.redSqr().redSqr(),
                  k = h.redAdd(h),
                  d = 0;
                d < b;
                d++
              ) {
                var l = g.redSqr(),
                  m = k.redSqr(),
                  n = m.redSqr(),
                  o = l
                    .redAdd(l)
                    .redIAdd(l)
                    .redIAdd(e.redMul(j)),
                  p = g.redMul(m),
                  q = o.redSqr().redISub(p.redAdd(p)),
                  r = p.redISub(q),
                  s = o.redMul(r);
                s = s.redIAdd(s).redISub(n);
                var t = k.redMul(i);
                d + 1 < b && (j = j.redMul(n)), (g = q), (i = t), (k = s);
              }
              return this.curve.jpoint(g, k.redMul(f), i);
            }),
            (l.prototype.dbl = function() {
              return this.isInfinity()
                ? this
                : this.curve.zeroA
                ? this._zeroDbl()
                : this.curve.threeA
                ? this._threeDbl()
                : this._dbl();
            }),
            (l.prototype._zeroDbl = function() {
              var b, c, d;
              if (this.zOne) {
                var e = this.x.redSqr(),
                  f = this.y.redSqr(),
                  g = f.redSqr(),
                  h = this.x
                    .redAdd(f)
                    .redSqr()
                    .redISub(e)
                    .redISub(g);
                h = h.redIAdd(h);
                var i = e.redAdd(e).redIAdd(e),
                  j = i
                    .redSqr()
                    .redISub(h)
                    .redISub(h),
                  k = g.redIAdd(g);
                (k = k.redIAdd(k)),
                  (k = k.redIAdd(k)),
                  (b = j),
                  (c = i.redMul(h.redISub(j)).redISub(k)),
                  (d = this.y.redAdd(this.y));
              } else {
                var l = this.x.redSqr(),
                  m = this.y.redSqr(),
                  n = m.redSqr(),
                  o = this.x
                    .redAdd(m)
                    .redSqr()
                    .redISub(l)
                    .redISub(n);
                o = o.redIAdd(o);
                var p = l.redAdd(l).redIAdd(l),
                  q = p.redSqr(),
                  r = n.redIAdd(n);
                (r = r.redIAdd(r)),
                  (r = r.redIAdd(r)),
                  (b = q.redISub(o).redISub(o)),
                  (c = p.redMul(o.redISub(b)).redISub(r)),
                  (d = this.y.redMul(this.z)),
                  (d = d.redIAdd(d));
              }
              return this.curve.jpoint(b, c, d);
            }),
            (l.prototype._threeDbl = function() {
              var b, c, d;
              if (this.zOne) {
                var e = this.x.redSqr(),
                  f = this.y.redSqr(),
                  g = f.redSqr(),
                  h = this.x
                    .redAdd(f)
                    .redSqr()
                    .redISub(e)
                    .redISub(g);
                h = h.redIAdd(h);
                var i = e
                    .redAdd(e)
                    .redIAdd(e)
                    .redIAdd(this.curve.a),
                  j = i
                    .redSqr()
                    .redISub(h)
                    .redISub(h);
                b = j;
                var k = g.redIAdd(g);
                (k = k.redIAdd(k)),
                  (k = k.redIAdd(k)),
                  (c = i.redMul(h.redISub(j)).redISub(k)),
                  (d = this.y.redAdd(this.y));
              } else {
                var l = this.z.redSqr(),
                  m = this.y.redSqr(),
                  n = this.x.redMul(m),
                  o = this.x.redSub(l).redMul(this.x.redAdd(l));
                o = o.redAdd(o).redIAdd(o);
                var p = n.redIAdd(n);
                p = p.redIAdd(p);
                var q = p.redAdd(p);
                (b = o.redSqr().redISub(q)),
                  (d = this.y
                    .redAdd(this.z)
                    .redSqr()
                    .redISub(m)
                    .redISub(l));
                var r = m.redSqr();
                (r = r.redIAdd(r)),
                  (r = r.redIAdd(r)),
                  (r = r.redIAdd(r)),
                  (c = o.redMul(p.redISub(b)).redISub(r));
              }
              return this.curve.jpoint(b, c, d);
            }),
            (l.prototype._dbl = function() {
              var b = this.curve.a,
                c = this.x,
                d = this.y,
                e = this.z,
                f = e.redSqr().redSqr(),
                g = c.redSqr(),
                h = d.redSqr(),
                i = g
                  .redAdd(g)
                  .redIAdd(g)
                  .redIAdd(b.redMul(f)),
                j = c.redAdd(c);
              j = j.redIAdd(j);
              var k = j.redMul(h),
                l = i.redSqr().redISub(k.redAdd(k)),
                m = k.redISub(l),
                n = h.redSqr();
              (n = n.redIAdd(n)), (n = n.redIAdd(n)), (n = n.redIAdd(n));
              var o = i.redMul(m).redISub(n),
                p = d.redAdd(d).redMul(e);
              return this.curve.jpoint(l, o, p);
            }),
            (l.prototype.trpl = function() {
              if (!this.curve.zeroA) return this.dbl().add(this);
              var b = this.x.redSqr(),
                c = this.y.redSqr(),
                d = this.z.redSqr(),
                e = c.redSqr(),
                f = b.redAdd(b).redIAdd(b),
                g = f.redSqr(),
                h = this.x
                  .redAdd(c)
                  .redSqr()
                  .redISub(b)
                  .redISub(e);
              (h = h.redIAdd(h)),
                (h = h.redAdd(h).redIAdd(h)),
                (h = h.redISub(g));
              var i = h.redSqr(),
                j = e.redIAdd(e);
              (j = j.redIAdd(j)), (j = j.redIAdd(j)), (j = j.redIAdd(j));
              var k = f
                  .redIAdd(h)
                  .redSqr()
                  .redISub(g)
                  .redISub(i)
                  .redISub(j),
                l = c.redMul(k);
              (l = l.redIAdd(l)), (l = l.redIAdd(l));
              var m = this.x.redMul(i).redISub(l);
              (m = m.redIAdd(m)), (m = m.redIAdd(m));
              var n = this.y.redMul(
                k.redMul(j.redISub(k)).redISub(h.redMul(i))
              );
              (n = n.redIAdd(n)), (n = n.redIAdd(n)), (n = n.redIAdd(n));
              var o = this.z
                .redAdd(h)
                .redSqr()
                .redISub(d)
                .redISub(i);
              return this.curve.jpoint(m, n, o);
            }),
            (l.prototype.mul = function(b, c) {
              return (b = new f(b, c)), this.curve._wnafMul(this, b);
            }),
            (l.prototype.eq = function(b) {
              if ('affine' === b.type) return this.eq(b.toJ());
              if (this === b) return !0;
              var c = this.z.redSqr(),
                d = b.z.redSqr();
              if (
                0 !==
                this.x
                  .redMul(d)
                  .redISub(b.x.redMul(c))
                  .cmpn(0)
              )
                return !1;
              var e = c.redMul(this.z),
                f = d.redMul(b.z);
              return (
                0 ===
                this.y
                  .redMul(f)
                  .redISub(b.y.redMul(e))
                  .cmpn(0)
              );
            }),
            (l.prototype.eqXToP = function(b) {
              var c = this.z.redSqr(),
                d = b.toRed(this.curve.red).redMul(c);
              if (0 === this.x.cmp(d)) return !0;
              for (var e = b.clone(), f = this.curve.redN.redMul(c); ; ) {
                if ((e.iadd(this.curve.n), e.cmp(this.curve.p) >= 0)) return !1;
                if ((d.redIAdd(f), 0 === this.x.cmp(d))) return !0;
              }
              return !1;
            }),
            (l.prototype.inspect = function() {
              return this.isInfinity()
                ? '<EC JPoint Infinity>'
                : '<EC JPoint x: ' +
                    this.x.toString(16, 2) +
                    ' y: ' +
                    this.y.toString(16, 2) +
                    ' z: ' +
                    this.z.toString(16, 2) +
                    '>';
            }),
            (l.prototype.isInfinity = function() {
              return 0 === this.z.cmpn(0);
            });
        },
        { '../../elliptic': 2, '../curve': 5, 'bn.js': 1, inherits: 25 }
      ],
      8: [
        function(a, b, c) {
          'use strict';
          function h(a) {
            'short' === a.type
              ? (this.curve = new f.curve.short(a))
              : 'edwards' === a.type
              ? (this.curve = new f.curve.edwards(a))
              : (this.curve = new f.curve.mont(a)),
              (this.g = this.curve.g),
              (this.n = this.curve.n),
              (this.hash = a.hash),
              g(this.g.validate(), 'Invalid curve'),
              g(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
          }
          function i(a, b) {
            Object.defineProperty(d, a, {
              configurable: !0,
              enumerable: !0,
              get: function() {
                var c = new h(b);
                return (
                  Object.defineProperty(d, a, {
                    configurable: !0,
                    enumerable: !0,
                    value: c
                  }),
                  c
                );
              }
            });
          }
          var d = c,
            e = a('hash.js'),
            f = a('../elliptic'),
            g = f.utils.assert;
          (d.PresetCurve = h),
            i('p192', {
              type: 'short',
              prime: 'p192',
              p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
              a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
              b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
              n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
              hash: e.sha256,
              gRed: !1,
              g: [
                '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
                '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
              ]
            }),
            i('p224', {
              type: 'short',
              prime: 'p224',
              p:
                'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
              a:
                'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
              b:
                'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
              n:
                'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
              hash: e.sha256,
              gRed: !1,
              g: [
                'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
                'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
              ]
            }),
            i('p256', {
              type: 'short',
              prime: null,
              p:
                'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
              a:
                'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
              b:
                '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
              n:
                'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
              hash: e.sha256,
              gRed: !1,
              g: [
                '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
                '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
              ]
            }),
            i('p384', {
              type: 'short',
              prime: null,
              p:
                'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff',
              a:
                'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc',
              b:
                'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
              n:
                'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
              hash: e.sha384,
              gRed: !1,
              g: [
                'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7',
                '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
              ]
            }),
            i('p521', {
              type: 'short',
              prime: null,
              p:
                '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff',
              a:
                '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc',
              b:
                '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
              n:
                '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
              hash: e.sha512,
              gRed: !1,
              g: [
                '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
                '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650'
              ]
            }),
            i('curve25519', {
              type: 'mont',
              prime: 'p25519',
              p:
                '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
              a: '76d06',
              b: '0',
              n:
                '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
              hash: e.sha256,
              gRed: !1,
              g: ['9']
            }),
            i('ed25519', {
              type: 'edwards',
              prime: 'p25519',
              p:
                '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
              a: '-1',
              c: '1',
              d:
                '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
              n:
                '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
              hash: e.sha256,
              gRed: !1,
              g: [
                '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',
                '6666666666666666666666666666666666666666666666666666666666666658'
              ]
            });
          var j;
          try {
            j = a('./precomputed/secp256k1');
          } catch (a) {
            j = void 0;
          }
          i('secp256k1', {
            type: 'short',
            prime: 'k256',
            p:
              'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
            a: '0',
            b: '7',
            n:
              'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
            h: '1',
            hash: e.sha256,
            beta:
              '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
            lambda:
              '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
            basis: [
              {
                a: '3086d221a7d46bcde86c90e49284eb15',
                b: '-e4437ed6010e88286f547fa90abfe4c3'
              },
              {
                a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
                b: '3086d221a7d46bcde86c90e49284eb15'
              }
            ],
            gRed: !1,
            g: [
              '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
              '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
              j
            ]
          });
        },
        { '../elliptic': 2, './precomputed/secp256k1': 16, 'hash.js': 19 }
      ],
      9: [
        function(a, b, c) {
          'use strict';
          function j(a) {
            return this instanceof j
              ? ('string' == typeof a &&
                  (g(e.curves.hasOwnProperty(a), 'Unknown curve ' + a),
                  (a = e.curves[a])),
                a instanceof e.curves.PresetCurve && (a = { curve: a }),
                (this.curve = a.curve.curve),
                (this.n = this.curve.n),
                (this.nh = this.n.ushrn(1)),
                (this.g = this.curve.g),
                (this.g = a.curve.g),
                this.g.precompute(a.curve.n.bitLength() + 1),
                void (this.hash = a.hash || a.curve.hash))
              : new j(a);
          }
          var d = a('bn.js'),
            e = a('../../elliptic'),
            f = e.utils,
            g = f.assert,
            h = a('./key'),
            i = a('./signature');
          (b.exports = j),
            (j.prototype.keyPair = function(b) {
              return new h(this, b);
            }),
            (j.prototype.keyFromPrivate = function(b, c) {
              return h.fromPrivate(this, b, c);
            }),
            (j.prototype.keyFromPublic = function(b, c) {
              return h.fromPublic(this, b, c);
            }),
            (j.prototype.genKeyPair = function(b) {
              b || (b = {});
              for (
                var c = new e.hmacDRBG({
                    hash: this.hash,
                    pers: b.pers,
                    entropy: b.entropy || e.rand(this.hash.hmacStrength),
                    nonce: this.n.toArray()
                  }),
                  f = this.n.byteLength(),
                  g = this.n.sub(new d(2));
                ;

              ) {
                var h = new d(c.generate(f));
                if (!(h.cmp(g) > 0)) return h.iaddn(1), this.keyFromPrivate(h);
              }
            }),
            (j.prototype._truncateToN = function(b, c) {
              var d = 8 * b.byteLength() - this.n.bitLength();
              return (
                d > 0 && (b = b.ushrn(d)),
                !c && b.cmp(this.n) >= 0 ? b.sub(this.n) : b
              );
            }),
            (j.prototype.sign = function(b, c, f, g) {
              'object' == typeof f && ((g = f), (f = null)),
                g || (g = {}),
                (c = this.keyFromPrivate(c, f)),
                (b = this._truncateToN(new d(b, 16)));
              for (
                var h = this.n.byteLength(),
                  j = c.getPrivate().toArray('be', h),
                  k = b.toArray('be', h),
                  l = new e.hmacDRBG({
                    hash: this.hash,
                    entropy: j,
                    nonce: k,
                    pers: g.pers,
                    persEnc: g.persEnc
                  }),
                  m = this.n.sub(new d(1)),
                  n = 0;
                !0;
                n++
              ) {
                var o = g.k ? g.k(n) : new d(l.generate(this.n.byteLength()));
                if (
                  ((o = this._truncateToN(o, !0)),
                  !(o.cmpn(1) <= 0 || o.cmp(m) >= 0))
                ) {
                  var p = this.g.mul(o);
                  if (!p.isInfinity()) {
                    var q = p.getX(),
                      r = q.umod(this.n);
                    if (0 !== r.cmpn(0)) {
                      var s = o.invm(this.n).mul(r.mul(c.getPrivate()).iadd(b));
                      if (((s = s.umod(this.n)), 0 !== s.cmpn(0))) {
                        var t =
                          (p.getY().isOdd() ? 1 : 0) | (0 !== q.cmp(r) ? 2 : 0);
                        return (
                          g.canonical &&
                            s.cmp(this.nh) > 0 &&
                            ((s = this.n.sub(s)), (t ^= 1)),
                          new i({ r: r, s: s, recoveryParam: t })
                        );
                      }
                    }
                  }
                }
              }
            }),
            (j.prototype.verify = function(b, c, e, f) {
              (b = this._truncateToN(new d(b, 16))),
                (e = this.keyFromPublic(e, f)),
                (c = new i(c, 'hex'));
              var g = c.r,
                h = c.s;
              if (g.cmpn(1) < 0 || g.cmp(this.n) >= 0) return !1;
              if (h.cmpn(1) < 0 || h.cmp(this.n) >= 0) return !1;
              var j = h.invm(this.n),
                k = j.mul(b).umod(this.n),
                l = j.mul(g).umod(this.n);
              if (!this.curve._maxwellTrick) {
                var m = this.g.mulAdd(k, e.getPublic(), l);
                return (
                  !m.isInfinity() &&
                  0 ===
                    m
                      .getX()
                      .umod(this.n)
                      .cmp(g)
                );
              }
              var m = this.g.jmulAdd(k, e.getPublic(), l);
              return !m.isInfinity() && m.eqXToP(g);
            }),
            (j.prototype.recoverPubKey = function(a, b, c, e) {
              g((3 & c) === c, 'The recovery param is more than two bits'),
                (b = new i(b, e));
              var f = this.n,
                h = new d(a),
                j = b.r,
                k = b.s,
                l = 1 & c,
                m = c >> 1;
              if (j.cmp(this.curve.p.umod(this.curve.n)) >= 0 && m)
                throw new Error('Unable to find sencond key candinate');
              j = m
                ? this.curve.pointFromX(j.add(this.curve.n), l)
                : this.curve.pointFromX(j, l);
              var n = b.r.invm(f),
                o = f
                  .sub(h)
                  .mul(n)
                  .umod(f),
                p = k.mul(n).umod(f);
              return this.g.mulAdd(o, j, p);
            }),
            (j.prototype.getKeyRecoveryParam = function(a, b, c, d) {
              if (((b = new i(b, d)), null !== b.recoveryParam))
                return b.recoveryParam;
              for (var e = 0; e < 4; e++) {
                var f;
                try {
                  f = this.recoverPubKey(a, b, e);
                } catch (a) {
                  continue;
                }
                if (f.eq(c)) return e;
              }
              throw new Error('Unable to find valid recovery factor');
            });
        },
        { '../../elliptic': 2, './key': 10, './signature': 11, 'bn.js': 1 }
      ],
      10: [
        function(a, b, c) {
          'use strict';
          function e(a, b) {
            (this.ec = a),
              (this.priv = null),
              (this.pub = null),
              b.priv && this._importPrivate(b.priv, b.privEnc),
              b.pub && this._importPublic(b.pub, b.pubEnc);
          }
          var d = a('bn.js');
          (b.exports = e),
            (e.fromPublic = function(b, c, d) {
              return c instanceof e ? c : new e(b, { pub: c, pubEnc: d });
            }),
            (e.fromPrivate = function(b, c, d) {
              return c instanceof e ? c : new e(b, { priv: c, privEnc: d });
            }),
            (e.prototype.validate = function() {
              var b = this.getPublic();
              return b.isInfinity()
                ? { result: !1, reason: 'Invalid public key' }
                : b.validate()
                ? b.mul(this.ec.curve.n).isInfinity()
                  ? { result: !0, reason: null }
                  : { result: !1, reason: 'Public key * N != O' }
                : { result: !1, reason: 'Public key is not a point' };
            }),
            (e.prototype.getPublic = function(b, c) {
              return (
                'string' == typeof b && ((c = b), (b = null)),
                this.pub || (this.pub = this.ec.g.mul(this.priv)),
                c ? this.pub.encode(c, b) : this.pub
              );
            }),
            (e.prototype.getPrivate = function(b) {
              return 'hex' === b ? this.priv.toString(16, 2) : this.priv;
            }),
            (e.prototype._importPrivate = function(b, c) {
              (this.priv = new d(b, c || 16)),
                (this.priv = this.priv.umod(this.ec.curve.n));
            }),
            (e.prototype._importPublic = function(b, c) {
              return b.x || b.y
                ? void (this.pub = this.ec.curve.point(b.x, b.y))
                : void (this.pub = this.ec.curve.decodePoint(b, c));
            }),
            (e.prototype.derive = function(b) {
              return b.mul(this.priv).getX();
            }),
            (e.prototype.sign = function(b, c, d) {
              return this.ec.sign(b, this, c, d);
            }),
            (e.prototype.verify = function(b, c) {
              return this.ec.verify(b, c, this);
            }),
            (e.prototype.inspect = function() {
              return (
                '<Key priv: ' +
                (this.priv && this.priv.toString(16, 2)) +
                ' pub: ' +
                (this.pub && this.pub.inspect()) +
                ' >'
              );
            });
        },
        { 'bn.js': 1 }
      ],
      11: [
        function(a, b, c) {
          'use strict';
          function h(a, b) {
            return a instanceof h
              ? a
              : void (
                  this._importDER(a, b) ||
                  (g(a.r && a.s, 'Signature without r or s'),
                  (this.r = new d(a.r, 16)),
                  (this.s = new d(a.s, 16)),
                  void 0 === a.recoveryParam
                    ? (this.recoveryParam = null)
                    : (this.recoveryParam = a.recoveryParam))
                );
          }
          function i() {
            this.place = 0;
          }
          function j(a, b) {
            var c = a[b.place++];
            if (!(128 & c)) return c;
            for (var d = 15 & c, e = 0, f = 0, g = b.place; f < d; f++, g++)
              (e <<= 8), (e |= a[g]);
            return (b.place = g), e;
          }
          function k(a) {
            for (
              var b = 0, c = a.length - 1;
              !a[b] && !(128 & a[b + 1]) && b < c;

            )
              b++;
            return 0 === b ? a : a.slice(b);
          }
          function l(a, b) {
            if (b < 128) return void a.push(b);
            var c = 1 + ((Math.log(b) / Math.LN2) >>> 3);
            for (a.push(128 | c); --c; ) a.push((b >>> (c << 3)) & 255);
            a.push(b);
          }
          var d = a('bn.js'),
            e = a('../../elliptic'),
            f = e.utils,
            g = f.assert;
          (b.exports = h),
            (h.prototype._importDER = function(b, c) {
              b = f.toArray(b, c);
              var e = new i();
              if (48 !== b[e.place++]) return !1;
              var g = j(b, e);
              if (g + e.place !== b.length) return !1;
              if (2 !== b[e.place++]) return !1;
              var h = j(b, e),
                k = b.slice(e.place, h + e.place);
              if (((e.place += h), 2 !== b[e.place++])) return !1;
              var l = j(b, e);
              if (b.length !== l + e.place) return !1;
              var m = b.slice(e.place, l + e.place);
              return (
                0 === k[0] && 128 & k[1] && (k = k.slice(1)),
                0 === m[0] && 128 & m[1] && (m = m.slice(1)),
                (this.r = new d(k)),
                (this.s = new d(m)),
                (this.recoveryParam = null),
                !0
              );
            }),
            (h.prototype.toDER = function(b) {
              var c = this.r.toArray(),
                d = this.s.toArray();
              for (
                128 & c[0] && (c = [0].concat(c)),
                  128 & d[0] && (d = [0].concat(d)),
                  c = k(c),
                  d = k(d);
                !(d[0] || 128 & d[1]);

              )
                d = d.slice(1);
              var e = [2];
              l(e, c.length), (e = e.concat(c)), e.push(2), l(e, d.length);
              var g = e.concat(d),
                h = [48];
              return l(h, g.length), (h = h.concat(g)), f.encode(h, b);
            });
        },
        { '../../elliptic': 2, 'bn.js': 1 }
      ],
      12: [
        function(a, b, c) {
          'use strict';
          function k(a) {
            if (
              (g('ed25519' === a, 'only tested with ed25519 so far'),
              !(this instanceof k))
            )
              return new k(a);
            var a = e.curves[a].curve;
            (this.curve = a),
              (this.g = a.g),
              this.g.precompute(a.n.bitLength() + 1),
              (this.pointClass = a.point().constructor),
              (this.encodingLength = Math.ceil(a.n.bitLength() / 8)),
              (this.hash = d.sha512);
          }
          var d = a('hash.js'),
            e = a('../../elliptic'),
            f = e.utils,
            g = f.assert,
            h = f.parseBytes,
            i = a('./key'),
            j = a('./signature');
          (b.exports = k),
            (k.prototype.sign = function(b, c) {
              b = h(b);
              var d = this.keyFromSecret(c),
                e = this.hashInt(d.messagePrefix(), b),
                f = this.g.mul(e),
                g = this.encodePoint(f),
                i = this.hashInt(g, d.pubBytes(), b).mul(d.priv()),
                j = e.add(i).umod(this.curve.n);
              return this.makeSignature({ R: f, S: j, Rencoded: g });
            }),
            (k.prototype.verify = function(b, c, d) {
              (b = h(b)), (c = this.makeSignature(c));
              var e = this.keyFromPublic(d),
                f = this.hashInt(c.Rencoded(), e.pubBytes(), b),
                g = this.g.mul(c.S()),
                i = c.R().add(e.pub().mul(f));
              return i.eq(g);
            }),
            (k.prototype.hashInt = function() {
              for (var b = this.hash(), c = 0; c < arguments.length; c++)
                b.update(arguments[c]);
              return f.intFromLE(b.digest()).umod(this.curve.n);
            }),
            (k.prototype.keyFromPublic = function(b) {
              return i.fromPublic(this, b);
            }),
            (k.prototype.keyFromSecret = function(b) {
              return i.fromSecret(this, b);
            }),
            (k.prototype.makeSignature = function(b) {
              return b instanceof j ? b : new j(this, b);
            }),
            (k.prototype.encodePoint = function(b) {
              var c = b.getY().toArray('le', this.encodingLength);
              return (
                (c[this.encodingLength - 1] |= b.getX().isOdd() ? 128 : 0), c
              );
            }),
            (k.prototype.decodePoint = function(b) {
              b = f.parseBytes(b);
              var c = b.length - 1,
                d = b.slice(0, c).concat(b[c] & -129),
                e = 0 !== (128 & b[c]),
                g = f.intFromLE(d);
              return this.curve.pointFromY(g, e);
            }),
            (k.prototype.encodeInt = function(b) {
              return b.toArray('le', this.encodingLength);
            }),
            (k.prototype.decodeInt = function(b) {
              return f.intFromLE(b);
            }),
            (k.prototype.isPoint = function(b) {
              return b instanceof this.pointClass;
            });
        },
        { '../../elliptic': 2, './key': 13, './signature': 14, 'hash.js': 19 }
      ],
      13: [
        function(a, b, c) {
          'use strict';
          function i(a, b) {
            (this.eddsa = a),
              (this._secret = g(b.secret)),
              a.isPoint(b.pub)
                ? (this._pub = b.pub)
                : (this._pubBytes = g(b.pub));
          }
          var d = a('../../elliptic'),
            e = d.utils,
            f = e.assert,
            g = e.parseBytes,
            h = e.cachedProperty;
          (i.fromPublic = function(b, c) {
            return c instanceof i ? c : new i(b, { pub: c });
          }),
            (i.fromSecret = function(b, c) {
              return c instanceof i ? c : new i(b, { secret: c });
            }),
            (i.prototype.secret = function() {
              return this._secret;
            }),
            h(i, 'pubBytes', function() {
              return this.eddsa.encodePoint(this.pub());
            }),
            h(i, 'pub', function() {
              return this._pubBytes
                ? this.eddsa.decodePoint(this._pubBytes)
                : this.eddsa.g.mul(this.priv());
            }),
            h(i, 'privBytes', function() {
              var b = this.eddsa,
                c = this.hash(),
                d = b.encodingLength - 1,
                e = c.slice(0, b.encodingLength);
              return (e[0] &= 248), (e[d] &= 127), (e[d] |= 64), e;
            }),
            h(i, 'priv', function() {
              return this.eddsa.decodeInt(this.privBytes());
            }),
            h(i, 'hash', function() {
              return this.eddsa
                .hash()
                .update(this.secret())
                .digest();
            }),
            h(i, 'messagePrefix', function() {
              return this.hash().slice(this.eddsa.encodingLength);
            }),
            (i.prototype.sign = function(b) {
              return (
                f(this._secret, 'KeyPair can only verify'),
                this.eddsa.sign(b, this)
              );
            }),
            (i.prototype.verify = function(b, c) {
              return this.eddsa.verify(b, c, this);
            }),
            (i.prototype.getSecret = function(b) {
              return (
                f(this._secret, 'KeyPair is public only'),
                e.encode(this.secret(), b)
              );
            }),
            (i.prototype.getPublic = function(b) {
              return e.encode(this.pubBytes(), b);
            }),
            (b.exports = i);
        },
        { '../../elliptic': 2 }
      ],
      14: [
        function(a, b, c) {
          'use strict';
          function j(a, b) {
            (this.eddsa = a),
              'object' != typeof b && (b = i(b)),
              Array.isArray(b) &&
                (b = {
                  R: b.slice(0, a.encodingLength),
                  S: b.slice(a.encodingLength)
                }),
              g(b.R && b.S, 'Signature without R or S'),
              a.isPoint(b.R) && (this._R = b.R),
              b.S instanceof d && (this._S = b.S),
              (this._Rencoded = Array.isArray(b.R) ? b.R : b.Rencoded),
              (this._Sencoded = Array.isArray(b.S) ? b.S : b.Sencoded);
          }
          var d = a('bn.js'),
            e = a('../../elliptic'),
            f = e.utils,
            g = f.assert,
            h = f.cachedProperty,
            i = f.parseBytes;
          h(j, 'S', function() {
            return this.eddsa.decodeInt(this.Sencoded());
          }),
            h(j, 'R', function() {
              return this.eddsa.decodePoint(this.Rencoded());
            }),
            h(j, 'Rencoded', function() {
              return this.eddsa.encodePoint(this.R());
            }),
            h(j, 'Sencoded', function() {
              return this.eddsa.encodeInt(this.S());
            }),
            (j.prototype.toBytes = function() {
              return this.Rencoded().concat(this.Sencoded());
            }),
            (j.prototype.toHex = function() {
              return f.encode(this.toBytes(), 'hex').toUpperCase();
            }),
            (b.exports = j);
        },
        { '../../elliptic': 2, 'bn.js': 1 }
      ],
      15: [
        function(a, b, c) {
          'use strict';
          function h(a) {
            if (!(this instanceof h)) return new h(a);
            (this.hash = a.hash),
              (this.predResist = !!a.predResist),
              (this.outLen = this.hash.outSize),
              (this.minEntropy = a.minEntropy || this.hash.hmacStrength),
              (this.reseed = null),
              (this.reseedInterval = null),
              (this.K = null),
              (this.V = null);
            var b = f.toArray(a.entropy, a.entropyEnc),
              c = f.toArray(a.nonce, a.nonceEnc),
              d = f.toArray(a.pers, a.persEnc);
            g(
              b.length >= this.minEntropy / 8,
              'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits'
            ),
              this._init(b, c, d);
          }
          var d = a('hash.js'),
            e = a('../elliptic'),
            f = e.utils,
            g = f.assert;
          (b.exports = h),
            (h.prototype._init = function(b, c, d) {
              var e = b.concat(c).concat(d);
              (this.K = new Array(this.outLen / 8)),
                (this.V = new Array(this.outLen / 8));
              for (var f = 0; f < this.V.length; f++)
                (this.K[f] = 0), (this.V[f] = 1);
              this._update(e),
                (this.reseed = 1),
                (this.reseedInterval = 281474976710656);
            }),
            (h.prototype._hmac = function() {
              return new d.hmac(this.hash, this.K);
            }),
            (h.prototype._update = function(b) {
              var c = this._hmac()
                .update(this.V)
                .update([0]);
              b && (c = c.update(b)),
                (this.K = c.digest()),
                (this.V = this._hmac()
                  .update(this.V)
                  .digest()),
                b &&
                  ((this.K = this._hmac()
                    .update(this.V)
                    .update([1])
                    .update(b)
                    .digest()),
                  (this.V = this._hmac()
                    .update(this.V)
                    .digest()));
            }),
            (h.prototype.reseed = function(b, c, d, e) {
              'string' != typeof c && ((e = d), (d = c), (c = null)),
                (b = f.toBuffer(b, c)),
                (d = f.toBuffer(d, e)),
                g(
                  b.length >= this.minEntropy / 8,
                  'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits'
                ),
                this._update(b.concat(d || [])),
                (this.reseed = 1);
            }),
            (h.prototype.generate = function(b, c, d, e) {
              if (this.reseed > this.reseedInterval)
                throw new Error('Reseed is required');
              'string' != typeof c && ((e = d), (d = c), (c = null)),
                d && ((d = f.toArray(d, e)), this._update(d));
              for (var g = []; g.length < b; )
                (this.V = this._hmac()
                  .update(this.V)
                  .digest()),
                  (g = g.concat(this.V));
              var h = g.slice(0, b);
              return this._update(d), this.reseed++, f.encode(h, c);
            });
        },
        { '../elliptic': 2, 'hash.js': 19 }
      ],
      16: [
        function(a, b, c) {
          b.exports = {
            doubles: {
              step: 4,
              points: [
                [
                  'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
                  'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'
                ],
                [
                  '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
                  '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'
                ],
                [
                  '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
                  'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'
                ],
                [
                  '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
                  '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'
                ],
                [
                  '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
                  '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'
                ],
                [
                  '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
                  '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'
                ],
                [
                  'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
                  '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'
                ],
                [
                  '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
                  'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'
                ],
                [
                  'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
                  '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'
                ],
                [
                  'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
                  'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'
                ],
                [
                  'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
                  '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'
                ],
                [
                  '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
                  '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'
                ],
                [
                  '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
                  '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'
                ],
                [
                  '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
                  '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'
                ],
                [
                  '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
                  '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'
                ],
                [
                  '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
                  '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'
                ],
                [
                  '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
                  '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'
                ],
                [
                  '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
                  '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'
                ],
                [
                  '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
                  'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'
                ],
                [
                  'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
                  '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'
                ],
                [
                  'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
                  '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'
                ],
                [
                  '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
                  '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'
                ],
                [
                  '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
                  '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'
                ],
                [
                  'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
                  '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'
                ],
                [
                  '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
                  'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'
                ],
                [
                  'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
                  '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'
                ],
                [
                  'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
                  'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'
                ],
                [
                  'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
                  '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'
                ],
                [
                  'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
                  'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'
                ],
                [
                  'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
                  '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'
                ],
                [
                  '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
                  'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'
                ],
                [
                  '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
                  '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'
                ],
                [
                  'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
                  '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'
                ],
                [
                  '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
                  'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'
                ],
                [
                  'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
                  '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'
                ],
                [
                  'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
                  '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'
                ],
                [
                  'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
                  'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'
                ],
                [
                  '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
                  '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'
                ],
                [
                  '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
                  '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'
                ],
                [
                  '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
                  'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'
                ],
                [
                  '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
                  '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'
                ],
                [
                  'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
                  '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'
                ],
                [
                  '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
                  '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'
                ],
                [
                  '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
                  'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'
                ],
                [
                  '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
                  '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'
                ],
                [
                  'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
                  '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'
                ],
                [
                  '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
                  'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'
                ],
                [
                  'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
                  'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'
                ],
                [
                  'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
                  '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'
                ],
                [
                  '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
                  'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'
                ],
                [
                  '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
                  'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'
                ],
                [
                  'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
                  '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'
                ],
                [
                  'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
                  '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'
                ],
                [
                  'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
                  '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'
                ],
                [
                  '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
                  'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'
                ],
                [
                  '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
                  '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'
                ],
                [
                  'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
                  'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'
                ],
                [
                  '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
                  'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'
                ],
                [
                  '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
                  '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'
                ],
                [
                  '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
                  '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'
                ],
                [
                  'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
                  'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'
                ],
                [
                  '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
                  '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'
                ],
                [
                  '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
                  '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'
                ],
                [
                  'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
                  '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'
                ],
                [
                  'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
                  'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82'
                ]
              ]
            },
            naf: {
              wnd: 7,
              points: [
                [
                  'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
                  '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'
                ],
                [
                  '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
                  'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'
                ],
                [
                  '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
                  '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'
                ],
                [
                  'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
                  'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'
                ],
                [
                  '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
                  'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'
                ],
                [
                  'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
                  'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'
                ],
                [
                  'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
                  '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'
                ],
                [
                  'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
                  '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'
                ],
                [
                  '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
                  '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'
                ],
                [
                  '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
                  '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'
                ],
                [
                  '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
                  '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'
                ],
                [
                  '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
                  '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'
                ],
                [
                  'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
                  'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'
                ],
                [
                  'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
                  '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'
                ],
                [
                  '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
                  'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'
                ],
                [
                  '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
                  'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'
                ],
                [
                  '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
                  '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'
                ],
                [
                  '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
                  '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'
                ],
                [
                  '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
                  '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'
                ],
                [
                  '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
                  'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'
                ],
                [
                  'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
                  'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'
                ],
                [
                  '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
                  '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'
                ],
                [
                  '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
                  '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'
                ],
                [
                  'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
                  'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'
                ],
                [
                  '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
                  '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'
                ],
                [
                  'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
                  'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'
                ],
                [
                  'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
                  'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'
                ],
                [
                  '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
                  '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'
                ],
                [
                  '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
                  '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'
                ],
                [
                  '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
                  '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'
                ],
                [
                  'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
                  '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'
                ],
                [
                  '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
                  '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'
                ],
                [
                  'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
                  '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'
                ],
                [
                  '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
                  'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'
                ],
                [
                  '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
                  'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'
                ],
                [
                  'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
                  'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'
                ],
                [
                  '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
                  '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'
                ],
                [
                  '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
                  'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'
                ],
                [
                  'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
                  'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'
                ],
                [
                  '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
                  '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'
                ],
                [
                  '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
                  'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'
                ],
                [
                  '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
                  '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'
                ],
                [
                  '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
                  'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'
                ],
                [
                  'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
                  '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'
                ],
                [
                  '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
                  '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'
                ],
                [
                  '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
                  'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'
                ],
                [
                  '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
                  'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'
                ],
                [
                  'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
                  'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'
                ],
                [
                  'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
                  'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'
                ],
                [
                  '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
                  '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'
                ],
                [
                  '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
                  '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'
                ],
                [
                  'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
                  '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'
                ],
                [
                  'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
                  'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'
                ],
                [
                  '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
                  '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'
                ],
                [
                  '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
                  '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'
                ],
                [
                  'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
                  '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'
                ],
                [
                  '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
                  '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'
                ],
                [
                  'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
                  'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'
                ],
                [
                  '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
                  'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'
                ],
                [
                  '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
                  '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'
                ],
                [
                  'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
                  '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'
                ],
                [
                  'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
                  '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'
                ],
                [
                  '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
                  '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'
                ],
                [
                  '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
                  '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'
                ],
                [
                  '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
                  'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'
                ],
                [
                  '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
                  'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'
                ],
                [
                  '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
                  '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'
                ],
                [
                  '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
                  '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'
                ],
                [
                  '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
                  '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'
                ],
                [
                  '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
                  'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'
                ],
                [
                  'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
                  'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'
                ],
                [
                  '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
                  'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'
                ],
                [
                  'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
                  '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'
                ],
                [
                  'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
                  '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'
                ],
                [
                  'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
                  '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'
                ],
                [
                  'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
                  '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'
                ],
                [
                  '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
                  'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'
                ],
                [
                  '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
                  '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'
                ],
                [
                  '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
                  'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'
                ],
                [
                  'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
                  'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'
                ],
                [
                  'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
                  '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'
                ],
                [
                  'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
                  'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'
                ],
                [
                  'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
                  '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'
                ],
                [
                  '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
                  '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'
                ],
                [
                  'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
                  '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'
                ],
                [
                  'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
                  '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'
                ],
                [
                  '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
                  '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'
                ],
                [
                  '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
                  'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'
                ],
                [
                  'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
                  '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'
                ],
                [
                  'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
                  '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'
                ],
                [
                  'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
                  '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'
                ],
                [
                  '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
                  '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'
                ],
                [
                  'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
                  'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'
                ],
                [
                  '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
                  'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'
                ],
                [
                  'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
                  'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'
                ],
                [
                  'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
                  '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'
                ],
                [
                  '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
                  'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'
                ],
                [
                  'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
                  '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'
                ],
                [
                  'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
                  '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'
                ],
                [
                  'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
                  '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'
                ],
                [
                  '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
                  'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'
                ],
                [
                  '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
                  'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'
                ],
                [
                  'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
                  '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'
                ],
                [
                  '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
                  'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'
                ],
                [
                  '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
                  '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'
                ],
                [
                  '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
                  'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'
                ],
                [
                  'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
                  'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'
                ],
                [
                  '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
                  'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'
                ],
                [
                  '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
                  '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'
                ],
                [
                  '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
                  'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'
                ],
                [
                  '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
                  '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'
                ],
                [
                  'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
                  'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'
                ],
                [
                  '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
                  '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'
                ],
                [
                  'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
                  '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'
                ],
                [
                  '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
                  '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'
                ],
                [
                  'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
                  'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'
                ],
                [
                  'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
                  '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'
                ],
                [
                  'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
                  'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'
                ],
                [
                  '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
                  'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'
                ],
                [
                  '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
                  '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'
                ],
                [
                  '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
                  'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'
                ],
                [
                  '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
                  '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'
                ],
                [
                  '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
                  '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'
                ],
                [
                  '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
                  'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'
                ],
                [
                  '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
                  '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'
                ],
                [
                  '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
                  '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'
                ],
                [
                  '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
                  '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9'
                ]
              ]
            }
          };
        },
        {}
      ],
      17: [
        function(a, b, c) {
          'use strict';
          function f(a, b) {
            if (Array.isArray(a)) return a.slice();
            if (!a) return [];
            var c = [];
            if ('string' != typeof a) {
              for (var d = 0; d < a.length; d++) c[d] = 0 | a[d];
              return c;
            }
            if (b) {
              if ('hex' === b) {
                (a = a.replace(/[^a-z0-9]+/gi, '')),
                  a.length % 2 !== 0 && (a = '0' + a);
                for (var d = 0; d < a.length; d += 2)
                  c.push(parseInt(a[d] + a[d + 1], 16));
              }
            } else
              for (var d = 0; d < a.length; d++) {
                var e = a.charCodeAt(d),
                  f = e >> 8,
                  g = 255 & e;
                f ? c.push(f, g) : c.push(g);
              }
            return c;
          }
          function g(a) {
            return 1 === a.length ? '0' + a : a;
          }
          function h(a) {
            for (var b = '', c = 0; c < a.length; c++)
              b += g(a[c].toString(16));
            return b;
          }
          function i(a, b) {
            for (
              var c = [], d = 1 << (b + 1), e = a.clone();
              e.cmpn(1) >= 0;

            ) {
              var f;
              if (e.isOdd()) {
                var g = e.andln(d - 1);
                (f = g > (d >> 1) - 1 ? (d >> 1) - g : g), e.isubn(f);
              } else f = 0;
              c.push(f);
              for (
                var h = 0 !== e.cmpn(0) && 0 === e.andln(d - 1) ? b + 1 : 1,
                  i = 1;
                i < h;
                i++
              )
                c.push(0);
              e.iushrn(h);
            }
            return c;
          }
          function j(a, b) {
            var c = [[], []];
            (a = a.clone()), (b = b.clone());
            for (var d = 0, e = 0; a.cmpn(-d) > 0 || b.cmpn(-e) > 0; ) {
              var f = (a.andln(3) + d) & 3,
                g = (b.andln(3) + e) & 3;
              3 === f && (f = -1), 3 === g && (g = -1);
              var h;
              if (0 === (1 & f)) h = 0;
              else {
                var i = (a.andln(7) + d) & 7;
                h = (3 !== i && 5 !== i) || 2 !== g ? f : -f;
              }
              c[0].push(h);
              var j;
              if (0 === (1 & g)) j = 0;
              else {
                var i = (b.andln(7) + e) & 7;
                j = (3 !== i && 5 !== i) || 2 !== f ? g : -g;
              }
              c[1].push(j),
                2 * d === h + 1 && (d = 1 - d),
                2 * e === j + 1 && (e = 1 - e),
                a.iushrn(1),
                b.iushrn(1);
            }
            return c;
          }
          function k(a, b, c) {
            var d = '_' + b;
            a.prototype[b] = function() {
              return void 0 !== this[d] ? this[d] : (this[d] = c.call(this));
            };
          }
          function l(a) {
            return 'string' == typeof a ? d.toArray(a, 'hex') : a;
          }
          function m(a) {
            return new e(a, 'hex', 'le');
          }
          var d = c,
            e = a('bn.js');
          (d.assert = function(b, c) {
            if (!b) throw new Error(c || 'Assertion failed');
          }),
            (d.toArray = f),
            (d.zero2 = g),
            (d.toHex = h),
            (d.encode = function(b, c) {
              return 'hex' === c ? h(b) : b;
            }),
            (d.getNAF = i),
            (d.getJSF = j),
            (d.cachedProperty = k),
            (d.parseBytes = l),
            (d.intFromLE = m);
        },
        { 'bn.js': 1 }
      ],
      18: [
        function(a, b, c) {
          function e(a) {
            this.rand = a;
          }
          var d;
          if (
            ((b.exports = function(b) {
              return d || (d = new e(null)), d.generate(b);
            }),
            (b.exports.Rand = e),
            (e.prototype.generate = function(b) {
              return this._rand(b);
            }),
            'object' == typeof self)
          )
            self.crypto && self.crypto.getRandomValues
              ? (e.prototype._rand = function(b) {
                  var c = new Uint8Array(b);
                  return self.crypto.getRandomValues(c), c;
                })
              : self.msCrypto && self.msCrypto.getRandomValues
              ? (e.prototype._rand = function(b) {
                  var c = new Uint8Array(b);
                  return self.msCrypto.getRandomValues(c), c;
                })
              : (e.prototype._rand = function() {
                  throw new Error('Not implemented yet');
                });
          else
            try {
              var f = a('crypto');
              e.prototype._rand = function(b) {
                return f.randomBytes(b);
              };
            } catch (a) {
              e.prototype._rand = function(b) {
                for (var c = new Uint8Array(b), d = 0; d < c.length; d++)
                  c[d] = this.rand.getByte();
                return c;
              };
            }
        },
        {}
      ],
      19: [
        function(a, b, c) {
          var d = c;
          (d.utils = a('./hash/utils')),
            (d.common = a('./hash/common')),
            (d.sha = a('./hash/sha')),
            (d.ripemd = a('./hash/ripemd')),
            (d.hmac = a('./hash/hmac')),
            (d.sha1 = d.sha.sha1),
            (d.sha256 = d.sha.sha256),
            (d.sha224 = d.sha.sha224),
            (d.sha384 = d.sha.sha384),
            (d.sha512 = d.sha.sha512),
            (d.ripemd160 = d.ripemd.ripemd160);
        },
        {
          './hash/common': 20,
          './hash/hmac': 21,
          './hash/ripemd': 22,
          './hash/sha': 23,
          './hash/utils': 24
        }
      ],
      20: [
        function(a, b, c) {
          function g() {
            (this.pending = null),
              (this.pendingTotal = 0),
              (this.blockSize = this.constructor.blockSize),
              (this.outSize = this.constructor.outSize),
              (this.hmacStrength = this.constructor.hmacStrength),
              (this.padLength = this.constructor.padLength / 8),
              (this.endian = 'big'),
              (this._delta8 = this.blockSize / 8),
              (this._delta32 = this.blockSize / 32);
          }
          var d = a('../hash'),
            e = d.utils,
            f = e.assert;
          (c.BlockHash = g),
            (g.prototype.update = function(b, c) {
              if (
                ((b = e.toArray(b, c)),
                this.pending
                  ? (this.pending = this.pending.concat(b))
                  : (this.pending = b),
                (this.pendingTotal += b.length),
                this.pending.length >= this._delta8)
              ) {
                b = this.pending;
                var d = b.length % this._delta8;
                (this.pending = b.slice(b.length - d, b.length)),
                  0 === this.pending.length && (this.pending = null),
                  (b = e.join32(b, 0, b.length - d, this.endian));
                for (var f = 0; f < b.length; f += this._delta32)
                  this._update(b, f, f + this._delta32);
              }
              return this;
            }),
            (g.prototype.digest = function(b) {
              return (
                this.update(this._pad()),
                f(null === this.pending),
                this._digest(b)
              );
            }),
            (g.prototype._pad = function() {
              var b = this.pendingTotal,
                c = this._delta8,
                d = c - ((b + this.padLength) % c),
                e = new Array(d + this.padLength);
              e[0] = 128;
              for (var f = 1; f < d; f++) e[f] = 0;
              if (((b <<= 3), 'big' === this.endian)) {
                for (var g = 8; g < this.padLength; g++) e[f++] = 0;
                (e[f++] = 0),
                  (e[f++] = 0),
                  (e[f++] = 0),
                  (e[f++] = 0),
                  (e[f++] = (b >>> 24) & 255),
                  (e[f++] = (b >>> 16) & 255),
                  (e[f++] = (b >>> 8) & 255),
                  (e[f++] = 255 & b);
              } else {
                (e[f++] = 255 & b),
                  (e[f++] = (b >>> 8) & 255),
                  (e[f++] = (b >>> 16) & 255),
                  (e[f++] = (b >>> 24) & 255),
                  (e[f++] = 0),
                  (e[f++] = 0),
                  (e[f++] = 0),
                  (e[f++] = 0);
                for (var g = 8; g < this.padLength; g++) e[f++] = 0;
              }
              return e;
            });
        },
        { '../hash': 19 }
      ],
      21: [
        function(a, b, c) {
          function h(a, b, c) {
            return this instanceof h
              ? ((this.Hash = a),
                (this.blockSize = a.blockSize / 8),
                (this.outSize = a.outSize / 8),
                (this.inner = null),
                (this.outer = null),
                void this._init(f.toArray(b, c)))
              : new h(a, b, c);
          }
          var e = a('../hash'),
            f = e.utils,
            g = f.assert;
          (b.exports = h),
            (h.prototype._init = function(b) {
              b.length > this.blockSize &&
                (b = new this.Hash().update(b).digest()),
                g(b.length <= this.blockSize);
              for (var c = b.length; c < this.blockSize; c++) b.push(0);
              for (var c = 0; c < b.length; c++) b[c] ^= 54;
              this.inner = new this.Hash().update(b);
              for (var c = 0; c < b.length; c++) b[c] ^= 106;
              this.outer = new this.Hash().update(b);
            }),
            (h.prototype.update = function(b, c) {
              return this.inner.update(b, c), this;
            }),
            (h.prototype.digest = function(b) {
              return (
                this.outer.update(this.inner.digest()), this.outer.digest(b)
              );
            });
        },
        { '../hash': 19 }
      ],
      22: [
        function(a, b, c) {
          function k() {
            return this instanceof k
              ? (j.call(this),
                (this.h = [
                  1732584193,
                  4023233417,
                  2562383102,
                  271733878,
                  3285377520
                ]),
                void (this.endian = 'little'))
              : new k();
          }
          function l(a, b, c, d) {
            return a <= 15
              ? b ^ c ^ d
              : a <= 31
              ? (b & c) | (~b & d)
              : a <= 47
              ? (b | ~c) ^ d
              : a <= 63
              ? (b & d) | (c & ~d)
              : b ^ (c | ~d);
          }
          function m(a) {
            return a <= 15
              ? 0
              : a <= 31
              ? 1518500249
              : a <= 47
              ? 1859775393
              : a <= 63
              ? 2400959708
              : 2840853838;
          }
          function n(a) {
            return a <= 15
              ? 1352829926
              : a <= 31
              ? 1548603684
              : a <= 47
              ? 1836072691
              : a <= 63
              ? 2053994217
              : 0;
          }
          var d = a('../hash'),
            e = d.utils,
            f = e.rotl32,
            g = e.sum32,
            h = e.sum32_3,
            i = e.sum32_4,
            j = d.common.BlockHash;
          e.inherits(k, j),
            (c.ripemd160 = k),
            (k.blockSize = 512),
            (k.outSize = 160),
            (k.hmacStrength = 192),
            (k.padLength = 64),
            (k.prototype._update = function(b, c) {
              for (
                var d = this.h[0],
                  e = this.h[1],
                  j = this.h[2],
                  k = this.h[3],
                  s = this.h[4],
                  t = d,
                  u = e,
                  v = j,
                  w = k,
                  x = s,
                  y = 0;
                y < 80;
                y++
              ) {
                var z = g(f(i(d, l(y, e, j, k), b[o[y] + c], m(y)), q[y]), s);
                (d = s),
                  (s = k),
                  (k = f(j, 10)),
                  (j = e),
                  (e = z),
                  (z = g(
                    f(i(t, l(79 - y, u, v, w), b[p[y] + c], n(y)), r[y]),
                    x
                  )),
                  (t = x),
                  (x = w),
                  (w = f(v, 10)),
                  (v = u),
                  (u = z);
              }
              (z = h(this.h[1], j, w)),
                (this.h[1] = h(this.h[2], k, x)),
                (this.h[2] = h(this.h[3], s, t)),
                (this.h[3] = h(this.h[4], d, u)),
                (this.h[4] = h(this.h[0], e, v)),
                (this.h[0] = z);
            }),
            (k.prototype._digest = function(b) {
              return 'hex' === b
                ? e.toHex32(this.h, 'little')
                : e.split32(this.h, 'little');
            });
          var o = [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              7,
              4,
              13,
              1,
              10,
              6,
              15,
              3,
              12,
              0,
              9,
              5,
              2,
              14,
              11,
              8,
              3,
              10,
              14,
              4,
              9,
              15,
              8,
              1,
              2,
              7,
              0,
              6,
              13,
              11,
              5,
              12,
              1,
              9,
              11,
              10,
              0,
              8,
              12,
              4,
              13,
              3,
              7,
              15,
              14,
              5,
              6,
              2,
              4,
              0,
              5,
              9,
              7,
              12,
              2,
              10,
              14,
              1,
              3,
              8,
              11,
              6,
              15,
              13
            ],
            p = [
              5,
              14,
              7,
              0,
              9,
              2,
              11,
              4,
              13,
              6,
              15,
              8,
              1,
              10,
              3,
              12,
              6,
              11,
              3,
              7,
              0,
              13,
              5,
              10,
              14,
              15,
              8,
              12,
              4,
              9,
              1,
              2,
              15,
              5,
              1,
              3,
              7,
              14,
              6,
              9,
              11,
              8,
              12,
              2,
              10,
              0,
              4,
              13,
              8,
              6,
              4,
              1,
              3,
              11,
              15,
              0,
              5,
              12,
              2,
              13,
              9,
              7,
              10,
              14,
              12,
              15,
              10,
              4,
              1,
              5,
              8,
              7,
              6,
              2,
              13,
              14,
              0,
              3,
              9,
              11
            ],
            q = [
              11,
              14,
              15,
              12,
              5,
              8,
              7,
              9,
              11,
              13,
              14,
              15,
              6,
              7,
              9,
              8,
              7,
              6,
              8,
              13,
              11,
              9,
              7,
              15,
              7,
              12,
              15,
              9,
              11,
              7,
              13,
              12,
              11,
              13,
              6,
              7,
              14,
              9,
              13,
              15,
              14,
              8,
              13,
              6,
              5,
              12,
              7,
              5,
              11,
              12,
              14,
              15,
              14,
              15,
              9,
              8,
              9,
              14,
              5,
              6,
              8,
              6,
              5,
              12,
              9,
              15,
              5,
              11,
              6,
              8,
              13,
              12,
              5,
              12,
              13,
              14,
              11,
              8,
              5,
              6
            ],
            r = [
              8,
              9,
              9,
              11,
              13,
              15,
              15,
              5,
              7,
              7,
              8,
              11,
              14,
              14,
              12,
              6,
              9,
              13,
              15,
              7,
              12,
              8,
              9,
              11,
              7,
              7,
              12,
              7,
              6,
              15,
              13,
              11,
              9,
              7,
              15,
              11,
              8,
              6,
              6,
              14,
              12,
              13,
              5,
              14,
              13,
              13,
              7,
              5,
              15,
              5,
              8,
              11,
              14,
              14,
              6,
              14,
              6,
              9,
              12,
              9,
              12,
              5,
              15,
              8,
              8,
              5,
              12,
              9,
              12,
              5,
              14,
              6,
              8,
              13,
              6,
              5,
              15,
              13,
              11,
              11
            ];
        },
        { '../hash': 19 }
      ],
      23: [
        function(a, b, c) {
          function A() {
            return this instanceof A
              ? (w.call(this),
                (this.h = [
                  1779033703,
                  3144134277,
                  1013904242,
                  2773480762,
                  1359893119,
                  2600822924,
                  528734635,
                  1541459225
                ]),
                (this.k = x),
                void (this.W = new Array(64)))
              : new A();
          }
          function B() {
            return this instanceof B
              ? (A.call(this),
                void (this.h = [
                  3238371032,
                  914150663,
                  812702999,
                  4144912697,
                  4290775857,
                  1750603025,
                  1694076839,
                  3204075428
                ]))
              : new B();
          }
          function C() {
            return this instanceof C
              ? (w.call(this),
                (this.h = [
                  1779033703,
                  4089235720,
                  3144134277,
                  2227873595,
                  1013904242,
                  4271175723,
                  2773480762,
                  1595750129,
                  1359893119,
                  2917565137,
                  2600822924,
                  725511199,
                  528734635,
                  4215389547,
                  1541459225,
                  327033209
                ]),
                (this.k = y),
                void (this.W = new Array(160)))
              : new C();
          }
          function D() {
            return this instanceof D
              ? (C.call(this),
                void (this.h = [
                  3418070365,
                  3238371032,
                  1654270250,
                  914150663,
                  2438529370,
                  812702999,
                  355462360,
                  4144912697,
                  1731405415,
                  4290775857,
                  2394180231,
                  1750603025,
                  3675008525,
                  1694076839,
                  1203062813,
                  3204075428
                ]))
              : new D();
          }
          function E() {
            return this instanceof E
              ? (w.call(this),
                (this.h = [
                  1732584193,
                  4023233417,
                  2562383102,
                  271733878,
                  3285377520
                ]),
                void (this.W = new Array(80)))
              : new E();
          }
          function F(a, b, c) {
            return (a & b) ^ (~a & c);
          }
          function G(a, b, c) {
            return (a & b) ^ (a & c) ^ (b & c);
          }
          function H(a, b, c) {
            return a ^ b ^ c;
          }
          function I(a) {
            return g(a, 2) ^ g(a, 13) ^ g(a, 22);
          }
          function J(a) {
            return g(a, 6) ^ g(a, 11) ^ g(a, 25);
          }
          function K(a) {
            return g(a, 7) ^ g(a, 18) ^ (a >>> 3);
          }
          function L(a) {
            return g(a, 17) ^ g(a, 19) ^ (a >>> 10);
          }
          function M(a, b, c, d) {
            return 0 === a
              ? F(b, c, d)
              : 1 === a || 3 === a
              ? H(b, c, d)
              : 2 === a
              ? G(b, c, d)
              : void 0;
          }
          function N(a, b, c, d, e, f) {
            var g = (a & c) ^ (~a & e);
            return g < 0 && (g += 4294967296), g;
          }
          function O(a, b, c, d, e, f) {
            var g = (b & d) ^ (~b & f);
            return g < 0 && (g += 4294967296), g;
          }
          function P(a, b, c, d, e, f) {
            var g = (a & c) ^ (a & e) ^ (c & e);
            return g < 0 && (g += 4294967296), g;
          }
          function Q(a, b, c, d, e, f) {
            var g = (b & d) ^ (b & f) ^ (d & f);
            return g < 0 && (g += 4294967296), g;
          }
          function R(a, b) {
            var c = l(a, b, 28),
              d = l(b, a, 2),
              e = l(b, a, 7),
              f = c ^ d ^ e;
            return f < 0 && (f += 4294967296), f;
          }
          function S(a, b) {
            var c = m(a, b, 28),
              d = m(b, a, 2),
              e = m(b, a, 7),
              f = c ^ d ^ e;
            return f < 0 && (f += 4294967296), f;
          }
          function T(a, b) {
            var c = l(a, b, 14),
              d = l(a, b, 18),
              e = l(b, a, 9),
              f = c ^ d ^ e;
            return f < 0 && (f += 4294967296), f;
          }
          function U(a, b) {
            var c = m(a, b, 14),
              d = m(a, b, 18),
              e = m(b, a, 9),
              f = c ^ d ^ e;
            return f < 0 && (f += 4294967296), f;
          }
          function V(a, b) {
            var c = l(a, b, 1),
              d = l(a, b, 8),
              e = n(a, b, 7),
              f = c ^ d ^ e;
            return f < 0 && (f += 4294967296), f;
          }
          function W(a, b) {
            var c = m(a, b, 1),
              d = m(a, b, 8),
              e = o(a, b, 7),
              f = c ^ d ^ e;
            return f < 0 && (f += 4294967296), f;
          }
          function X(a, b) {
            var c = l(a, b, 19),
              d = l(b, a, 29),
              e = n(a, b, 6),
              f = c ^ d ^ e;
            return f < 0 && (f += 4294967296), f;
          }
          function Y(a, b) {
            var c = m(a, b, 19),
              d = m(b, a, 29),
              e = o(a, b, 6),
              f = c ^ d ^ e;
            return f < 0 && (f += 4294967296), f;
          }
          var d = a('../hash'),
            e = d.utils,
            f = e.assert,
            g = e.rotr32,
            h = e.rotl32,
            i = e.sum32,
            j = e.sum32_4,
            k = e.sum32_5,
            l = e.rotr64_hi,
            m = e.rotr64_lo,
            n = e.shr64_hi,
            o = e.shr64_lo,
            p = e.sum64,
            q = e.sum64_hi,
            r = e.sum64_lo,
            s = e.sum64_4_hi,
            t = e.sum64_4_lo,
            u = e.sum64_5_hi,
            v = e.sum64_5_lo,
            w = d.common.BlockHash,
            x = [
              1116352408,
              1899447441,
              3049323471,
              3921009573,
              961987163,
              1508970993,
              2453635748,
              2870763221,
              3624381080,
              310598401,
              607225278,
              1426881987,
              1925078388,
              2162078206,
              2614888103,
              3248222580,
              3835390401,
              4022224774,
              264347078,
              604807628,
              770255983,
              1249150122,
              1555081692,
              1996064986,
              2554220882,
              2821834349,
              2952996808,
              3210313671,
              3336571891,
              3584528711,
              113926993,
              338241895,
              666307205,
              773529912,
              1294757372,
              1396182291,
              1695183700,
              1986661051,
              2177026350,
              2456956037,
              2730485921,
              2820302411,
              3259730800,
              3345764771,
              3516065817,
              3600352804,
              4094571909,
              275423344,
              430227734,
              506948616,
              659060556,
              883997877,
              958139571,
              1322822218,
              1537002063,
              1747873779,
              1955562222,
              2024104815,
              2227730452,
              2361852424,
              2428436474,
              2756734187,
              3204031479,
              3329325298
            ],
            y = [
              1116352408,
              3609767458,
              1899447441,
              602891725,
              3049323471,
              3964484399,
              3921009573,
              2173295548,
              961987163,
              4081628472,
              1508970993,
              3053834265,
              2453635748,
              2937671579,
              2870763221,
              3664609560,
              3624381080,
              2734883394,
              310598401,
              1164996542,
              607225278,
              1323610764,
              1426881987,
              3590304994,
              1925078388,
              4068182383,
              2162078206,
              991336113,
              2614888103,
              633803317,
              3248222580,
              3479774868,
              3835390401,
              2666613458,
              4022224774,
              944711139,
              264347078,
              2341262773,
              604807628,
              2007800933,
              770255983,
              1495990901,
              1249150122,
              1856431235,
              1555081692,
              3175218132,
              1996064986,
              2198950837,
              2554220882,
              3999719339,
              2821834349,
              766784016,
              2952996808,
              2566594879,
              3210313671,
              3203337956,
              3336571891,
              1034457026,
              3584528711,
              2466948901,
              113926993,
              3758326383,
              338241895,
              168717936,
              666307205,
              1188179964,
              773529912,
              1546045734,
              1294757372,
              1522805485,
              1396182291,
              2643833823,
              1695183700,
              2343527390,
              1986661051,
              1014477480,
              2177026350,
              1206759142,
              2456956037,
              344077627,
              2730485921,
              1290863460,
              2820302411,
              3158454273,
              3259730800,
              3505952657,
              3345764771,
              106217008,
              3516065817,
              3606008344,
              3600352804,
              1432725776,
              4094571909,
              1467031594,
              275423344,
              851169720,
              430227734,
              3100823752,
              506948616,
              1363258195,
              659060556,
              3750685593,
              883997877,
              3785050280,
              958139571,
              3318307427,
              1322822218,
              3812723403,
              1537002063,
              2003034995,
              1747873779,
              3602036899,
              1955562222,
              1575990012,
              2024104815,
              1125592928,
              2227730452,
              2716904306,
              2361852424,
              442776044,
              2428436474,
              593698344,
              2756734187,
              3733110249,
              3204031479,
              2999351573,
              3329325298,
              3815920427,
              3391569614,
              3928383900,
              3515267271,
              566280711,
              3940187606,
              3454069534,
              4118630271,
              4000239992,
              116418474,
              1914138554,
              174292421,
              2731055270,
              289380356,
              3203993006,
              460393269,
              320620315,
              685471733,
              587496836,
              852142971,
              1086792851,
              1017036298,
              365543100,
              1126000580,
              2618297676,
              1288033470,
              3409855158,
              1501505948,
              4234509866,
              1607167915,
              987167468,
              1816402316,
              1246189591
            ],
            z = [1518500249, 1859775393, 2400959708, 3395469782];
          e.inherits(A, w),
            (c.sha256 = A),
            (A.blockSize = 512),
            (A.outSize = 256),
            (A.hmacStrength = 192),
            (A.padLength = 64),
            (A.prototype._update = function(b, c) {
              for (var d = this.W, e = 0; e < 16; e++) d[e] = b[c + e];
              for (; e < d.length; e++)
                d[e] = j(L(d[e - 2]), d[e - 7], K(d[e - 15]), d[e - 16]);
              var g = this.h[0],
                h = this.h[1],
                l = this.h[2],
                m = this.h[3],
                n = this.h[4],
                o = this.h[5],
                p = this.h[6],
                q = this.h[7];
              f(this.k.length === d.length);
              for (var e = 0; e < d.length; e++) {
                var r = k(q, J(n), F(n, o, p), this.k[e], d[e]),
                  s = i(I(g), G(g, h, l));
                (q = p),
                  (p = o),
                  (o = n),
                  (n = i(m, r)),
                  (m = l),
                  (l = h),
                  (h = g),
                  (g = i(r, s));
              }
              (this.h[0] = i(this.h[0], g)),
                (this.h[1] = i(this.h[1], h)),
                (this.h[2] = i(this.h[2], l)),
                (this.h[3] = i(this.h[3], m)),
                (this.h[4] = i(this.h[4], n)),
                (this.h[5] = i(this.h[5], o)),
                (this.h[6] = i(this.h[6], p)),
                (this.h[7] = i(this.h[7], q));
            }),
            (A.prototype._digest = function(b) {
              return 'hex' === b
                ? e.toHex32(this.h, 'big')
                : e.split32(this.h, 'big');
            }),
            e.inherits(B, A),
            (c.sha224 = B),
            (B.blockSize = 512),
            (B.outSize = 224),
            (B.hmacStrength = 192),
            (B.padLength = 64),
            (B.prototype._digest = function(b) {
              return 'hex' === b
                ? e.toHex32(this.h.slice(0, 7), 'big')
                : e.split32(this.h.slice(0, 7), 'big');
            }),
            e.inherits(C, w),
            (c.sha512 = C),
            (C.blockSize = 1024),
            (C.outSize = 512),
            (C.hmacStrength = 192),
            (C.padLength = 128),
            (C.prototype._prepareBlock = function(b, c) {
              for (var d = this.W, e = 0; e < 32; e++) d[e] = b[c + e];
              for (; e < d.length; e += 2) {
                var f = X(d[e - 4], d[e - 3]),
                  g = Y(d[e - 4], d[e - 3]),
                  h = d[e - 14],
                  i = d[e - 13],
                  j = V(d[e - 30], d[e - 29]),
                  k = W(d[e - 30], d[e - 29]),
                  l = d[e - 32],
                  m = d[e - 31];
                (d[e] = s(f, g, h, i, j, k, l, m)),
                  (d[e + 1] = t(f, g, h, i, j, k, l, m));
              }
            }),
            (C.prototype._update = function(b, c) {
              this._prepareBlock(b, c);
              var d = this.W,
                e = this.h[0],
                g = this.h[1],
                h = this.h[2],
                i = this.h[3],
                j = this.h[4],
                k = this.h[5],
                l = this.h[6],
                m = this.h[7],
                n = this.h[8],
                o = this.h[9],
                s = this.h[10],
                t = this.h[11],
                w = this.h[12],
                x = this.h[13],
                y = this.h[14],
                z = this.h[15];
              f(this.k.length === d.length);
              for (var A = 0; A < d.length; A += 2) {
                var B = y,
                  C = z,
                  D = T(n, o),
                  E = U(n, o),
                  F = N(n, o, s, t, w, x),
                  G = O(n, o, s, t, w, x),
                  H = this.k[A],
                  I = this.k[A + 1],
                  J = d[A],
                  K = d[A + 1],
                  L = u(B, C, D, E, F, G, H, I, J, K),
                  M = v(B, C, D, E, F, G, H, I, J, K),
                  B = R(e, g),
                  C = S(e, g),
                  D = P(e, g, h, i, j, k),
                  E = Q(e, g, h, i, j, k),
                  V = q(B, C, D, E),
                  W = r(B, C, D, E);
                (y = w),
                  (z = x),
                  (w = s),
                  (x = t),
                  (s = n),
                  (t = o),
                  (n = q(l, m, L, M)),
                  (o = r(m, m, L, M)),
                  (l = j),
                  (m = k),
                  (j = h),
                  (k = i),
                  (h = e),
                  (i = g),
                  (e = q(L, M, V, W)),
                  (g = r(L, M, V, W));
              }
              p(this.h, 0, e, g),
                p(this.h, 2, h, i),
                p(this.h, 4, j, k),
                p(this.h, 6, l, m),
                p(this.h, 8, n, o),
                p(this.h, 10, s, t),
                p(this.h, 12, w, x),
                p(this.h, 14, y, z);
            }),
            (C.prototype._digest = function(b) {
              return 'hex' === b
                ? e.toHex32(this.h, 'big')
                : e.split32(this.h, 'big');
            }),
            e.inherits(D, C),
            (c.sha384 = D),
            (D.blockSize = 1024),
            (D.outSize = 384),
            (D.hmacStrength = 192),
            (D.padLength = 128),
            (D.prototype._digest = function(b) {
              return 'hex' === b
                ? e.toHex32(this.h.slice(0, 12), 'big')
                : e.split32(this.h.slice(0, 12), 'big');
            }),
            e.inherits(E, w),
            (c.sha1 = E),
            (E.blockSize = 512),
            (E.outSize = 160),
            (E.hmacStrength = 80),
            (E.padLength = 64),
            (E.prototype._update = function(b, c) {
              for (var d = this.W, e = 0; e < 16; e++) d[e] = b[c + e];
              for (; e < d.length; e++)
                d[e] = h(d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16], 1);
              for (
                var f = this.h[0],
                  g = this.h[1],
                  j = this.h[2],
                  l = this.h[3],
                  m = this.h[4],
                  e = 0;
                e < d.length;
                e++
              ) {
                var n = ~~(e / 20),
                  o = k(h(f, 5), M(n, g, j, l), m, d[e], z[n]);
                (m = l), (l = j), (j = h(g, 30)), (g = f), (f = o);
              }
              (this.h[0] = i(this.h[0], f)),
                (this.h[1] = i(this.h[1], g)),
                (this.h[2] = i(this.h[2], j)),
                (this.h[3] = i(this.h[3], l)),
                (this.h[4] = i(this.h[4], m));
            }),
            (E.prototype._digest = function(b) {
              return 'hex' === b
                ? e.toHex32(this.h, 'big')
                : e.split32(this.h, 'big');
            });
        },
        { '../hash': 19 }
      ],
      24: [
        function(a, b, c) {
          function f(a, b) {
            if (Array.isArray(a)) return a.slice();
            if (!a) return [];
            var c = [];
            if ('string' == typeof a)
              if (b) {
                if ('hex' === b) {
                  (a = a.replace(/[^a-z0-9]+/gi, '')),
                    a.length % 2 !== 0 && (a = '0' + a);
                  for (var d = 0; d < a.length; d += 2)
                    c.push(parseInt(a[d] + a[d + 1], 16));
                }
              } else
                for (var d = 0; d < a.length; d++) {
                  var e = a.charCodeAt(d),
                    f = e >> 8,
                    g = 255 & e;
                  f ? c.push(f, g) : c.push(g);
                }
            else for (var d = 0; d < a.length; d++) c[d] = 0 | a[d];
            return c;
          }
          function g(a) {
            for (var b = '', c = 0; c < a.length; c++)
              b += j(a[c].toString(16));
            return b;
          }
          function h(a) {
            var b =
              (a >>> 24) |
              ((a >>> 8) & 65280) |
              ((a << 8) & 16711680) |
              ((255 & a) << 24);
            return b >>> 0;
          }
          function i(a, b) {
            for (var c = '', d = 0; d < a.length; d++) {
              var e = a[d];
              'little' === b && (e = h(e)), (c += k(e.toString(16)));
            }
            return c;
          }
          function j(a) {
            return 1 === a.length ? '0' + a : a;
          }
          function k(a) {
            return 7 === a.length
              ? '0' + a
              : 6 === a.length
              ? '00' + a
              : 5 === a.length
              ? '000' + a
              : 4 === a.length
              ? '0000' + a
              : 3 === a.length
              ? '00000' + a
              : 2 === a.length
              ? '000000' + a
              : 1 === a.length
              ? '0000000' + a
              : a;
          }
          function l(a, b, c, d) {
            var e = c - b;
            t(e % 4 === 0);
            for (
              var f = new Array(e / 4), g = 0, h = b;
              g < f.length;
              g++, h += 4
            ) {
              var i;
              (i =
                'big' === d
                  ? (a[h] << 24) | (a[h + 1] << 16) | (a[h + 2] << 8) | a[h + 3]
                  : (a[h + 3] << 24) |
                    (a[h + 2] << 16) |
                    (a[h + 1] << 8) |
                    a[h]),
                (f[g] = i >>> 0);
            }
            return f;
          }
          function m(a, b) {
            for (
              var c = new Array(4 * a.length), d = 0, e = 0;
              d < a.length;
              d++, e += 4
            ) {
              var f = a[d];
              'big' === b
                ? ((c[e] = f >>> 24),
                  (c[e + 1] = (f >>> 16) & 255),
                  (c[e + 2] = (f >>> 8) & 255),
                  (c[e + 3] = 255 & f))
                : ((c[e + 3] = f >>> 24),
                  (c[e + 2] = (f >>> 16) & 255),
                  (c[e + 1] = (f >>> 8) & 255),
                  (c[e] = 255 & f));
            }
            return c;
          }
          function n(a, b) {
            return (a >>> b) | (a << (32 - b));
          }
          function o(a, b) {
            return (a << b) | (a >>> (32 - b));
          }
          function p(a, b) {
            return (a + b) >>> 0;
          }
          function q(a, b, c) {
            return (a + b + c) >>> 0;
          }
          function r(a, b, c, d) {
            return (a + b + c + d) >>> 0;
          }
          function s(a, b, c, d, e) {
            return (a + b + c + d + e) >>> 0;
          }
          function t(a, b) {
            if (!a) throw new Error(b || 'Assertion failed');
          }
          function u(a, b, c, d) {
            var e = a[b],
              f = a[b + 1],
              g = (d + f) >>> 0,
              h = (g < d ? 1 : 0) + c + e;
            (a[b] = h >>> 0), (a[b + 1] = g);
          }
          function v(a, b, c, d) {
            var e = (b + d) >>> 0,
              f = (e < b ? 1 : 0) + a + c;
            return f >>> 0;
          }
          function w(a, b, c, d) {
            var e = b + d;
            return e >>> 0;
          }
          function x(a, b, c, d, e, f, g, h) {
            var i = 0,
              j = b;
            (j = (j + d) >>> 0),
              (i += j < b ? 1 : 0),
              (j = (j + f) >>> 0),
              (i += j < f ? 1 : 0),
              (j = (j + h) >>> 0),
              (i += j < h ? 1 : 0);
            var k = a + c + e + g + i;
            return k >>> 0;
          }
          function y(a, b, c, d, e, f, g, h) {
            var i = b + d + f + h;
            return i >>> 0;
          }
          function z(a, b, c, d, e, f, g, h, i, j) {
            var k = 0,
              l = b;
            (l = (l + d) >>> 0),
              (k += l < b ? 1 : 0),
              (l = (l + f) >>> 0),
              (k += l < f ? 1 : 0),
              (l = (l + h) >>> 0),
              (k += l < h ? 1 : 0),
              (l = (l + j) >>> 0),
              (k += l < j ? 1 : 0);
            var m = a + c + e + g + i + k;
            return m >>> 0;
          }
          function A(a, b, c, d, e, f, g, h, i, j) {
            var k = b + d + f + h + j;
            return k >>> 0;
          }
          function B(a, b, c) {
            var d = (b << (32 - c)) | (a >>> c);
            return d >>> 0;
          }
          function C(a, b, c) {
            var d = (a << (32 - c)) | (b >>> c);
            return d >>> 0;
          }
          function D(a, b, c) {
            return a >>> c;
          }
          function E(a, b, c) {
            var d = (a << (32 - c)) | (b >>> c);
            return d >>> 0;
          }
          var d = c,
            e = a('inherits');
          (d.toArray = f),
            (d.toHex = g),
            (d.htonl = h),
            (d.toHex32 = i),
            (d.zero2 = j),
            (d.zero8 = k),
            (d.join32 = l),
            (d.split32 = m),
            (d.rotr32 = n),
            (d.rotl32 = o),
            (d.sum32 = p),
            (d.sum32_3 = q),
            (d.sum32_4 = r),
            (d.sum32_5 = s),
            (d.assert = t),
            (d.inherits = e),
            (c.sum64 = u),
            (c.sum64_hi = v),
            (c.sum64_lo = w),
            (c.sum64_4_hi = x),
            (c.sum64_4_lo = y),
            (c.sum64_5_hi = z),
            (c.sum64_5_lo = A),
            (c.rotr64_hi = B),
            (c.rotr64_lo = C),
            (c.shr64_hi = D),
            (c.shr64_lo = E);
        },
        { inherits: 25 }
      ],
      25: [
        function(a, b, c) {
          'function' == typeof Object.create
            ? (b.exports = function(b, c) {
                (b.super_ = c),
                  (b.prototype = Object.create(c.prototype, {
                    constructor: {
                      value: b,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                    }
                  }));
              })
            : (b.exports = function(b, c) {
                b.super_ = c;
                var d = function() {};
                (d.prototype = c.prototype),
                  (b.prototype = new d()),
                  (b.prototype.constructor = b);
              });
        },
        {}
      ],
      26: [
        function(a, b, c) {
          b.exports = {
            name: 'elliptic',
            version: '6.3.2',
            description: 'EC cryptography',
            main: 'lib/elliptic.js',
            files: ['lib'],
            scripts: {
              jscs:
                'jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js',
              jshint:
                'jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js',
              lint: 'npm run jscs && npm run jshint',
              unit: 'istanbul test _mocha --reporter=spec test/index.js',
              test: 'npm run lint && npm run unit',
              version: 'grunt dist && git add dist/'
            },
            repository: { type: 'git', url: 'git@github.com:indutny/elliptic' },
            keywords: ['EC', 'Elliptic', 'curve', 'Cryptography'],
            author: 'Fedor Indutny <fedor@indutny.com>',
            license: 'MIT',
            bugs: { url: 'https://github.com/indutny/elliptic/issues' },
            homepage: 'https://github.com/indutny/elliptic',
            devDependencies: {
              brfs: '^1.4.3',
              coveralls: '^2.11.3',
              grunt: '^0.4.5',
              'grunt-browserify': '^5.0.0',
              'grunt-contrib-connect': '^1.0.0',
              'grunt-contrib-copy': '^1.0.0',
              'grunt-contrib-uglify': '^1.0.1',
              'grunt-mocha-istanbul': '^3.0.1',
              'grunt-saucelabs': '^8.6.2',
              istanbul: '^0.4.2',
              jscs: '^2.9.0',
              jshint: '^2.6.0',
              mocha: '^2.1.0'
            },
            dependencies: {
              'bn.js': '^4.4.0',
              brorand: '^1.0.1',
              'hash.js': '^1.0.0',
              inherits: '^2.0.1'
            }
          };
        },
        {}
      ]
    },
    {},
    [2]
  )(2);
});

var liner = (function(e) {
  function r(n) {
    if (t[n]) return t[n].exports;
    var a = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(a.exports, a, a.exports, r), (a.l = !0), a.exports;
  }
  var t = {};
  return (
    (r.m = e),
    (r.c = t),
    (r.d = function(e, t, n) {
      r.o(e, t) ||
        Object.defineProperty(e, t, {
          configurable: !1,
          enumerable: !0,
          get: n
        });
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
    (r.o = function(e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    }),
    (r.p = ''),
    r((r.s = 17))
  );
})([
  function(e, r, t) {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 }),
      function(e) {
        function n(e) {
          for (var r, t = e, n = /[^%](%\d+)/g, a = []; (r = n.exec(t)); )
            a.push({ arg: r[1], index: r.index });
          for (var o = a.length - 1; o >= 0; o--) {
            var i = a[o],
              s = i.arg.substring(1),
              c = i.index + 1;
            t =
              t.substring(0, c) + arguments[+s] + t.substring(c + 1 + s.length);
          }
          return (t = t.replace('%%', '%'));
        }
        function a(e) {
          var r;
          (r = 'string' == typeof e ? { name: e } : e), p.checkAlgorithm(r);
          var t = e;
          return t.hash && (t.hash = a(t.hash)), r;
        }
        function o(e, r) {
          if (!e)
            throw new s("Parameter '" + r + "' is required and cant be empty");
          if ('undefined' != typeof Buffer && Buffer.isBuffer(e))
            return new Uint8Array(e);
          if (ArrayBuffer.isView(e)) {
            var t = e.map(function(e) {
              return e;
            });
            return new Uint8Array(t.buffer);
          }
          if (e instanceof ArrayBuffer) return new Uint8Array(e);
          throw new s(
            "Incoming parameter '" +
              r +
              "' has wrong data type. Must be ArrayBufferView or ArrayBuffer"
          );
        }
        t.d(r, 'WebCryptoError', function() {
          return s;
        }),
          t.d(r, 'AlgorithmError', function() {
            return c;
          }),
          t.d(r, 'CryptoKeyError', function() {
            return u;
          }),
          t.d(r, 'PrepareAlgorithm', function() {
            return a;
          }),
          t.d(r, 'PrepareData', function() {
            return o;
          }),
          t.d(r, 'BaseCrypto', function() {
            return p;
          }),
          t.d(r, 'AlgorithmNames', function() {
            return h;
          }),
          t.d(r, 'Base64Url', function() {
            return y;
          }),
          t.d(r, 'SubtleCrypto', function() {
            return W;
          }),
          t.d(r, 'Aes', function() {
            return m;
          }),
          t.d(r, 'AesAlgorithmError', function() {
            return A;
          }),
          t.d(r, 'AesWrapKey', function() {
            return w;
          }),
          t.d(r, 'AesEncrypt', function() {
            return v;
          }),
          t.d(r, 'AesECB', function() {
            return g;
          }),
          t.d(r, 'AesCBC', function() {
            return C;
          }),
          t.d(r, 'AesCTR', function() {
            return d;
          }),
          t.d(r, 'AesGCM', function() {
            return k;
          }),
          t.d(r, 'AesKW', function() {
            return b;
          }),
          t.d(r, 'RsaKeyGenParamsError', function() {
            return G;
          }),
          t.d(r, 'RsaHashedImportParamsError', function() {
            return M;
          }),
          t.d(r, 'Rsa', function() {
            return B;
          }),
          t.d(r, 'RsaSSA', function() {
            return T;
          }),
          t.d(r, 'RsaPSSParamsError', function() {
            return D;
          }),
          t.d(r, 'RsaPSS', function() {
            return x;
          }),
          t.d(r, 'RsaOAEPParamsError', function() {
            return j;
          }),
          t.d(r, 'RsaOAEP', function() {
            return H;
          }),
          t.d(r, 'EcKeyGenParamsError', function() {
            return U;
          }),
          t.d(r, 'Ec', function() {
            return _;
          }),
          t.d(r, 'EcAlgorithmError', function() {
            return K;
          }),
          t.d(r, 'EcDSA', function() {
            return O;
          }),
          t.d(r, 'EcDH', function() {
            return S;
          }),
          t.d(r, 'ShaAlgorithms', function() {
            return E;
          }),
          t.d(r, 'Sha', function() {
            return P;
          });
        var i = t(8),
          s = (function(e) {
            function r(r) {
              for (var t = [], a = 1; a < arguments.length; a++)
                t[a - 1] = arguments[a];
              var o = e.call(this) || this;
              (o.code = 0), (o.message = n.apply(void 0, [r].concat(t)));
              var i = new Error(o.message);
              return (i.name = o.constructor.name), (o.stack = i.stack), o;
            }
            return (
              Object(i.a)(r, e),
              (r.NOT_SUPPORTED = 'Method is not supported'),
              r
            );
          })(Error),
          c = (function(e) {
            function r() {
              var r = (null !== e && e.apply(this, arguments)) || this;
              return (r.code = 1), r;
            }
            return (
              Object(i.a)(r, e),
              (r.PARAM_REQUIRED =
                "Algorithm hasn't got required paramter '%1'"),
              (r.PARAM_WRONG_TYPE =
                "Algorithm has got wrong type for paramter '%1'. Must be %2"),
              (r.PARAM_WRONG_VALUE =
                "Algorithm has got wrong value for paramter '%1'. Must be %2"),
              (r.WRONG_ALG_NAME =
                "Algorithm has got wrong name '%1'. Must be '%2'"),
              (r.UNSUPPORTED_ALGORITHM = "Algorithm '%1' is not supported"),
              (r.WRONG_USAGE = "Algorithm doesn't support key usage '%1'"),
              r
            );
          })(s),
          u = (function(e) {
            function r() {
              var r = (null !== e && e.apply(this, arguments)) || this;
              return (r.code = 3), r;
            }
            return (
              Object(i.a)(r, e),
              (r.EMPTY_KEY = 'CryptoKey is empty'),
              (r.WRONG_KEY_ALG =
                "CryptoKey has wrong algorithm '%1'. Must be '%2'"),
              (r.WRONG_KEY_TYPE =
                "CryptoKey has wrong type '%1'. Must be '%2'"),
              (r.WRONG_KEY_USAGE =
                "CryptoKey has wrong key usage. Must be '%1'"),
              (r.NOT_EXTRACTABLE = 'CryptoKey is not extractable'),
              (r.WRONG_FORMAT =
                "CryptoKey has '%1' type. It can be used with '%2' format"),
              (r.UNKNOWN_FORMAT =
                "Unknown format in use '%1'. Must be one of 'raw', 'pkcs8', 'spki'  or 'jwk'"),
              (r.ALLOWED_FORMAT = "Wrong format value '%1'. Must be %2"),
              r
            );
          })(s),
          p = (function() {
            function e() {}
            return (
              (e.checkAlgorithm = function(e) {
                if ('object' != typeof e)
                  throw new TypeError(
                    'Wrong algorithm data type. Must be Object'
                  );
                if (!e.name) throw new c(c.PARAM_REQUIRED, 'name');
              }),
              (e.checkAlgorithmParams = function(e) {
                this.checkAlgorithm(e);
              }),
              (e.checkKey = function(e, r, t, n) {
                if (
                  (void 0 === t && (t = null), void 0 === n && (n = null), !e)
                )
                  throw new u(u.EMPTY_KEY);
                var a = e.algorithm;
                if (
                  (this.checkAlgorithm(a),
                  r && a.name.toUpperCase() !== r.toUpperCase())
                )
                  throw new u(u.WRONG_KEY_ALG, a.name, r);
                if (t && (!e.type || e.type.toUpperCase() !== t.toUpperCase()))
                  throw new u(u.WRONG_KEY_TYPE, e.type, t);
                if (
                  n &&
                  !e.usages.some(function(e) {
                    return n.toUpperCase() === e.toUpperCase();
                  })
                )
                  throw new u(u.WRONG_KEY_USAGE, n);
              }),
              (e.checkWrappedKey = function(e) {
                if (!e.extractable) throw new u(u.NOT_EXTRACTABLE);
              }),
              (e.checkKeyUsages = function(e) {
                if (!e || !e.length)
                  throw new s("Parameter 'keyUsages' cannot be empty.");
              }),
              (e.checkFormat = function(e, r) {
                switch (e.toLowerCase()) {
                  case 'raw':
                    if (
                      r &&
                      'secret' !== r.toLowerCase() &&
                      r &&
                      'public' !== r.toLowerCase()
                    )
                      throw new u(u.WRONG_FORMAT, r, 'raw');
                    break;
                  case 'pkcs8':
                    if (r && 'private' !== r.toLowerCase())
                      throw new u(u.WRONG_FORMAT, r, 'pkcs8');
                    break;
                  case 'spki':
                    if (r && 'public' !== r.toLowerCase())
                      throw new u(u.WRONG_FORMAT, r, 'spki');
                    break;
                  case 'jwk':
                    break;
                  default:
                    throw new u(u.UNKNOWN_FORMAT, e);
                }
              }),
              (e.generateKey = function(e, r, t) {
                return new Promise(function(e, r) {
                  throw new s(s.NOT_SUPPORTED);
                });
              }),
              (e.digest = function(e, r) {
                return new Promise(function(e, r) {
                  throw new s(s.NOT_SUPPORTED);
                });
              }),
              (e.sign = function(e, r, t) {
                return new Promise(function(e, r) {
                  throw new s(s.NOT_SUPPORTED);
                });
              }),
              (e.verify = function(e, r, t, n) {
                return new Promise(function(e, r) {
                  throw new s(s.NOT_SUPPORTED);
                });
              }),
              (e.encrypt = function(e, r, t) {
                return new Promise(function(e, r) {
                  throw new s(s.NOT_SUPPORTED);
                });
              }),
              (e.decrypt = function(e, r, t) {
                return new Promise(function(e, r) {
                  throw new s(s.NOT_SUPPORTED);
                });
              }),
              (e.deriveBits = function(e, r, t) {
                return new Promise(function(e, r) {
                  throw new s(s.NOT_SUPPORTED);
                });
              }),
              (e.deriveKey = function(e, r, t, n, a) {
                return new Promise(function(e, r) {
                  throw new s(s.NOT_SUPPORTED);
                });
              }),
              (e.exportKey = function(e, r) {
                return new Promise(function(e, r) {
                  throw new s(s.NOT_SUPPORTED);
                });
              }),
              (e.importKey = function(e, r, t, n, a) {
                return new Promise(function(e, r) {
                  throw new s(s.NOT_SUPPORTED);
                });
              }),
              (e.wrapKey = function(e, r, t, n) {
                return new Promise(function(e, r) {
                  throw new s(s.NOT_SUPPORTED);
                });
              }),
              (e.unwrapKey = function(e, r, t, n, a, o, i) {
                return new Promise(function(e, r) {
                  throw new s(s.NOT_SUPPORTED);
                });
              }),
              e
            );
          })(),
          h = {
            RsaSSA: 'RSASSA-PKCS1-v1_5',
            RsaPSS: 'RSA-PSS',
            RsaOAEP: 'RSA-OAEP',
            AesECB: 'AES-ECB',
            AesCTR: 'AES-CTR',
            AesCMAC: 'AES-CMAC',
            AesGCM: 'AES-GCM',
            AesCBC: 'AES-CBC',
            AesKW: 'AES-KW',
            Sha1: 'SHA-1',
            Sha256: 'SHA-256',
            Sha384: 'SHA-384',
            Sha512: 'SHA-512',
            EcDSA: 'ECDSA',
            EcDH: 'ECDH',
            Hmac: 'HMAC',
            Pbkdf2: 'PBKDF2',
            Hkdf: 'HKDF'
          };
        if ('undefined' == typeof self) {
          var f = e;
          (f.btoa = function(e) {
            return new Buffer(e, 'binary').toString('base64');
          }),
            (f.atob = function(e) {
              return new Buffer(e, 'base64').toString('binary');
            });
        }
        var y = (function() {
            function e() {}
            return (
              (e.encode = function(e) {
                var r = this.buffer2string(e);
                return btoa(r)
                  .replace(/=/g, '')
                  .replace(/\+/g, '-')
                  .replace(/\//g, '_');
              }),
              (e.decode = function(e) {
                for (; e.length % 4; ) e += '=';
                var r = e.replace(/\-/g, '+').replace(/_/g, '/');
                return this.string2buffer(atob(r));
              }),
              (e.buffer2string = function(e) {
                for (var r = '', t = e.length, n = 0; n < t; n++)
                  r += String.fromCharCode(e[n]);
                return r;
              }),
              (e.string2buffer = function(e) {
                for (
                  var r = new Uint8Array(e.length), t = e.length, n = 0;
                  n < t;
                  n++
                )
                  r[n] = e.charCodeAt(n);
                return r;
              }),
              e
            );
          })(),
          l = (function(e) {
            function r() {
              var r = (null !== e && e.apply(this, arguments)) || this;
              return (r.code = 7), r;
            }
            return Object(i.a)(r, e), r;
          })(c),
          m = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkKeyUsages = function(r) {
                var t = this;
                e.checkKeyUsages.call(this, r);
                var n = r.filter(function(e) {
                  return -1 === t.KEY_USAGES.indexOf(e);
                });
                if (n.length) throw new c(c.WRONG_USAGE, n.join(', '));
              }),
              (r.checkAlgorithm = function(e) {
                if (e.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
                  throw new c(c.WRONG_ALG_NAME, e.name, this.ALG_NAME);
              }),
              (r.checkKeyGenParams = function(e) {
                switch (e.length) {
                  case 128:
                  case 192:
                  case 256:
                    break;
                  default:
                    throw new l(
                      l.PARAM_WRONG_VALUE,
                      'length',
                      '128, 192 or 256'
                    );
                }
              }),
              (r.generateKey = function(e, r, t) {
                var n = this;
                return new Promise(function(r, a) {
                  n.checkAlgorithm(e),
                    n.checkKeyGenParams(e),
                    n.checkKeyUsages(t),
                    r(void 0);
                });
              }),
              (r.exportKey = function(e, r) {
                var t = this;
                return new Promise(function(n, a) {
                  t.checkKey(r, t.ALG_NAME),
                    t.checkFormat(e, r.type),
                    n(void 0);
                });
              }),
              (r.importKey = function(e, r, t, n, a) {
                var o = this;
                return new Promise(function(r, n) {
                  if (
                    (o.checkAlgorithm(t),
                    o.checkFormat(e),
                    'raw' !== e.toLowerCase() && 'jwk' !== e.toLowerCase())
                  )
                    throw new u(u.ALLOWED_FORMAT, e, "'jwk' or 'raw'");
                  o.checkKeyUsages(a), r(void 0);
                });
              }),
              (r.ALG_NAME = ''),
              (r.KEY_USAGES = []),
              r
            );
          })(p),
          A = (function(e) {
            function r() {
              var r = (null !== e && e.apply(this, arguments)) || this;
              return (r.code = 8), r;
            }
            return Object(i.a)(r, e), r;
          })(c),
          w = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.wrapKey = function(e, r, t, n) {
                var a = this;
                return new Promise(function(o, i) {
                  a.checkAlgorithmParams(n),
                    a.checkKey(t, a.ALG_NAME, 'secret', 'wrapKey'),
                    a.checkWrappedKey(r),
                    a.checkFormat(e, r.type),
                    o(void 0);
                });
              }),
              (r.unwrapKey = function(e, r, t, n, a, o, i) {
                var s = this;
                return new Promise(function(r, a) {
                  s.checkAlgorithmParams(n),
                    s.checkKey(t, s.ALG_NAME, 'secret', 'unwrapKey'),
                    s.checkFormat(e),
                    r(void 0);
                });
              }),
              r
            );
          })(m),
          v = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.encrypt = function(e, r, t) {
                var n = this;
                return new Promise(function(t, a) {
                  n.checkAlgorithmParams(e),
                    n.checkKey(r, n.ALG_NAME, 'secret', 'encrypt'),
                    t(void 0);
                });
              }),
              (r.decrypt = function(e, r, t) {
                var n = this;
                return new Promise(function(t, a) {
                  n.checkAlgorithmParams(e),
                    n.checkKey(r, n.ALG_NAME, 'secret', 'decrypt'),
                    t(void 0);
                });
              }),
              (r.KEY_USAGES = ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']),
              r
            );
          })(w),
          g = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return Object(i.a)(r, e), (r.ALG_NAME = h.AesECB), r;
          })(v),
          C = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithmParams = function(e) {
                if ((this.checkAlgorithm(e), !e.iv))
                  throw new A(A.PARAM_REQUIRED, 'iv');
                if (!(ArrayBuffer.isView(e.iv) || e.iv instanceof ArrayBuffer))
                  throw new A(
                    A.PARAM_WRONG_TYPE,
                    'iv',
                    'ArrayBufferView or ArrayBuffer'
                  );
                if (16 !== e.iv.byteLength)
                  throw new A(
                    A.PARAM_WRONG_VALUE,
                    'iv',
                    'ArrayBufferView or ArrayBuffer with size 16'
                  );
              }),
              (r.ALG_NAME = h.AesCBC),
              r
            );
          })(v),
          d = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithmParams = function(e) {
                if (
                  (this.checkAlgorithm(e),
                  !e.counter ||
                    !(
                      ArrayBuffer.isView(e.counter) ||
                      e.counter instanceof ArrayBuffer
                    ))
                )
                  throw new A(
                    A.PARAM_WRONG_TYPE,
                    'counter',
                    'ArrayBufferView or ArrayBuffer'
                  );
                if (16 !== e.counter.byteLength)
                  throw new A(
                    A.PARAM_WRONG_VALUE,
                    'counter',
                    'ArrayBufferView or ArrayBuffer with size 16'
                  );
                if (!(e.length > 0 && e.length <= 128))
                  throw new A(A.PARAM_WRONG_VALUE, 'length', 'number [1-128]');
              }),
              (r.ALG_NAME = h.AesCTR),
              r
            );
          })(v),
          k = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithmParams = function(e) {
                if (
                  (this.checkAlgorithm(e),
                  e.additionalData &&
                    !(
                      ArrayBuffer.isView(e.additionalData) ||
                      e.additionalData instanceof ArrayBuffer
                    ))
                )
                  throw new A(
                    A.PARAM_WRONG_TYPE,
                    'additionalData',
                    'ArrayBufferView or ArrayBuffer'
                  );
                if (!e.iv) throw new A(A.PARAM_REQUIRED, 'iv');
                if (!(ArrayBuffer.isView(e.iv) || e.iv instanceof ArrayBuffer))
                  throw new A(
                    A.PARAM_WRONG_TYPE,
                    'iv',
                    'ArrayBufferView or ArrayBuffer'
                  );
                if (e.tagLength) {
                  if (
                    ![32, 64, 96, 104, 112, 120, 128].some(function(r) {
                      return r === e.tagLength;
                    })
                  )
                    throw new A(
                      A.PARAM_WRONG_VALUE,
                      'tagLength',
                      '32, 64, 96, 104, 112, 120 or 128'
                    );
                }
              }),
              (r.ALG_NAME = h.AesGCM),
              r
            );
          })(v),
          b = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithmParams = function(e) {
                this.checkAlgorithm(e);
              }),
              (r.ALG_NAME = h.AesKW),
              (r.KEY_USAGES = ['wrapKey', 'unwrapKey']),
              r
            );
          })(w),
          E = [h.Sha1, h.Sha256, h.Sha384, h.Sha512].join(' | '),
          P = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithm = function(r) {
                var t;
                switch (
                  ((t = 'string' == typeof r ? { name: r } : r),
                  e.checkAlgorithm.call(this, t),
                  t.name.toUpperCase())
                ) {
                  case h.Sha1:
                  case h.Sha256:
                  case h.Sha384:
                  case h.Sha512:
                    break;
                  default:
                    throw new c(c.WRONG_ALG_NAME, t.name, E);
                }
              }),
              (r.digest = function(e, r) {
                var t = this;
                return new Promise(function(r, n) {
                  t.checkAlgorithm(e), r(void 0);
                });
              }),
              r
            );
          })(p),
          U = (function(e) {
            function r() {
              var r = (null !== e && e.apply(this, arguments)) || this;
              return (r.code = 9), r;
            }
            return Object(i.a)(r, e), r;
          })(c),
          _ = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithm = function(e) {
                if (e.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
                  throw new c(c.WRONG_ALG_NAME, e.name, this.ALG_NAME);
              }),
              (r.checkKeyGenParams = function(e) {
                if (!e.namedCurve) throw new U(U.PARAM_REQUIRED, 'namedCurve');
                if ('string' != typeof e.namedCurve)
                  throw new U(U.PARAM_WRONG_TYPE, 'namedCurve', 'string');
                switch (e.namedCurve.toUpperCase()) {
                  case 'P-256':
                  case 'K-256':
                  case 'P-384':
                  case 'P-521':
                    break;
                  default:
                    throw new U(
                      U.PARAM_WRONG_VALUE,
                      'namedCurve',
                      'K-256, P-256, P-384 or P-521'
                    );
                }
              }),
              (r.checkKeyGenUsages = function(e) {
                var r = this;
                e.forEach(function(e) {
                  var t = 0;
                  for (
                    t;
                    t < r.KEY_USAGES.length &&
                    r.KEY_USAGES[t].toLowerCase() !== e.toLowerCase();
                    t++
                  );
                  if (t === r.KEY_USAGES.length)
                    throw new s(
                      "Unsupported key usage '" +
                        e +
                        "'. Should be one of [" +
                        r.KEY_USAGES.join(', ') +
                        ']'
                    );
                });
              }),
              (r.generateKey = function(e, r, t) {
                var n = this;
                return new Promise(function(r, a) {
                  n.checkAlgorithm(e),
                    n.checkKeyGenParams(e),
                    n.checkKeyGenUsages(t),
                    r(void 0);
                });
              }),
              (r.exportKey = function(e, r) {
                var t = this;
                return new Promise(function(n, a) {
                  t.checkKey(r, t.ALG_NAME),
                    (e && 'raw' === e.toLowerCase() && 'public' === r.type) ||
                      t.checkFormat(e, r.type),
                    n(void 0);
                });
              }),
              (r.importKey = function(e, r, t, n, a) {
                var o = this;
                return new Promise(function(r, n) {
                  o.checkKeyGenParams(t),
                    o.checkFormat(e),
                    o.checkKeyGenUsages(a),
                    r(void 0);
                });
              }),
              (r.ALG_NAME = ''),
              (r.KEY_USAGES = []),
              r
            );
          })(p),
          K = (function(e) {
            function r() {
              var r = (null !== e && e.apply(this, arguments)) || this;
              return (r.code = 10), r;
            }
            return Object(i.a)(r, e), r;
          })(c),
          O = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithmParams = function(e) {
                this.checkAlgorithm(e), P.checkAlgorithm(e.hash);
              }),
              (r.sign = function(e, r, t) {
                var n = this;
                return new Promise(function(t, a) {
                  n.checkAlgorithmParams(e),
                    n.checkKey(r, n.ALG_NAME, 'private', 'sign'),
                    t(void 0);
                });
              }),
              (r.verify = function(e, r, t, n) {
                var a = this;
                return new Promise(function(t, n) {
                  a.checkAlgorithmParams(e),
                    a.checkKey(r, a.ALG_NAME, 'public', 'verify'),
                    t(void 0);
                });
              }),
              (r.ALG_NAME = h.EcDSA),
              (r.KEY_USAGES = ['sign', 'verify', 'deriveKey', 'deriveBits']),
              r
            );
          })(_),
          S = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkDeriveParams = function(e) {
                if ((this.checkAlgorithm(e), !e.public))
                  throw new K(K.PARAM_REQUIRED, 'public');
                this.checkKey(e.public, this.ALG_NAME, 'public');
              }),
              (r.deriveBits = function(e, r, t) {
                var n = this;
                return new Promise(function(t, a) {
                  n.checkDeriveParams(e),
                    n.checkKey(r, n.ALG_NAME, 'private', 'deriveBits'),
                    t(void 0);
                });
              }),
              (r.deriveKey = function(e, r, t, n, a) {
                var o = this;
                return new Promise(function(n, a) {
                  switch (
                    (o.checkDeriveParams(e),
                    o.checkKey(r, o.ALG_NAME, 'private', 'deriveKey'),
                    p.checkAlgorithm(t),
                    t.name.toUpperCase())
                  ) {
                    case h.AesCBC:
                      C.checkKeyGenParams(t);
                      break;
                    case h.AesCTR:
                      d.checkKeyGenParams(t);
                      break;
                    case h.AesGCM:
                      k.checkKeyGenParams(t);
                      break;
                    case h.AesKW:
                      b.checkKeyGenParams(t);
                      break;
                    default:
                      throw new K(
                        "Unsupported name '" +
                          t.name +
                          "' for algorithm in param 'derivedKeyType'"
                      );
                  }
                  n(void 0);
                });
              }),
              (r.ALG_NAME = h.EcDH),
              (r.KEY_USAGES = ['deriveKey', 'deriveBits']),
              r
            );
          })(_),
          L = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithm = function(e) {
                if (e.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
                  throw new c(c.WRONG_ALG_NAME, e.name, this.ALG_NAME);
              }),
              (r.checkKeyGenParams = function(e) {
                if ('length' in e && !(e.length > 0 && e.length <= 512))
                  throw new c(
                    c.PARAM_WRONG_VALUE,
                    'length',
                    'more 0 and less than 512'
                  );
              }),
              (r.checkKeyGenUsages = function(e) {
                var r = this;
                this.checkKeyUsages(e),
                  e.forEach(function(e) {
                    var t = 0;
                    for (
                      t;
                      t < r.KEY_USAGES.length &&
                      r.KEY_USAGES[t].toLowerCase() !== e.toLowerCase();
                      t++
                    );
                    if (t === r.KEY_USAGES.length)
                      throw new s(
                        "Unsupported key usage '" +
                          e +
                          "'. Should be one of [" +
                          r.KEY_USAGES.join(', ') +
                          ']'
                      );
                  });
              }),
              (r.generateKey = function(e, r, t) {
                var n = this;
                return new Promise(function(r, a) {
                  n.checkAlgorithm(e),
                    n.checkKeyGenParams(e),
                    n.checkKeyGenUsages(t),
                    r(void 0);
                });
              }),
              (r.exportKey = function(e, r) {
                var t = this;
                return new Promise(function(n, a) {
                  t.checkKey(r, t.ALG_NAME),
                    t.checkFormat(e, r.type),
                    n(void 0);
                });
              }),
              (r.importKey = function(e, r, t, n, a) {
                var o = this;
                return new Promise(function(r, n) {
                  if (
                    (o.checkAlgorithm(t),
                    o.checkFormat(e),
                    'raw' !== e.toLowerCase() && 'jwk' !== e.toLowerCase())
                  )
                    throw new u(u.ALLOWED_FORMAT, e, "'jwk' or 'raw'");
                  o.checkKeyGenUsages(a), r(void 0);
                });
              }),
              (r.sign = function(e, r, t) {
                var n = this;
                return new Promise(function(t, a) {
                  n.checkAlgorithmParams(e),
                    n.checkKey(r, n.ALG_NAME, 'secret', 'sign'),
                    t(void 0);
                });
              }),
              (r.verify = function(e, r, t, n) {
                var a = this;
                return new Promise(function(t, n) {
                  a.checkAlgorithmParams(e),
                    a.checkKey(r, a.ALG_NAME, 'secret', 'verify'),
                    t(void 0);
                });
              }),
              (r.ALG_NAME = h.Hmac),
              (r.KEY_USAGES = ['sign', 'verify']),
              r
            );
          })(p),
          R = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithm = function(e) {
                if (e.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
                  throw new c(c.WRONG_ALG_NAME, e.name, this.ALG_NAME);
              }),
              (r.checkDeriveParams = function(e) {
                if ((this.checkAlgorithm(e), !e.salt))
                  throw new c(c.PARAM_REQUIRED, 'salt');
                if (
                  !(ArrayBuffer.isView(e.salt) || e.salt instanceof ArrayBuffer)
                )
                  throw new c(
                    c.PARAM_WRONG_TYPE,
                    'salt',
                    'ArrayBuffer or ArrayBufferView'
                  );
                if (!e.info) throw new c(c.PARAM_REQUIRED, 'info');
                if (
                  !(ArrayBuffer.isView(e.info) || e.info instanceof ArrayBuffer)
                )
                  throw new c(
                    c.PARAM_WRONG_TYPE,
                    'info',
                    'ArrayBuffer or ArrayBufferView'
                  );
                if (!e.hash) throw new c(c.PARAM_REQUIRED, 'hash');
                var r = a(e.hash);
                P.checkAlgorithm(r);
              }),
              (r.importKey = function(e, r, t, n, a) {
                var o = this;
                return Promise.resolve().then(function() {
                  if (n) throw new s('KDF keys must set extractable=false');
                  if (
                    (o.checkAlgorithm(t),
                    o.checkFormat(e),
                    'raw' !== e.toLowerCase())
                  )
                    throw new u(u.ALLOWED_FORMAT, e, "'raw'");
                  o.checkKeyUsages(a);
                });
              }),
              (r.deriveKey = function(e, r, t, n, a) {
                var o = this;
                return Promise.resolve().then(function() {
                  switch (
                    (o.checkDeriveParams(e),
                    o.checkKey(r, o.ALG_NAME, 'secret', 'deriveKey'),
                    p.checkAlgorithm(t),
                    t.name.toUpperCase())
                  ) {
                    case h.AesCBC:
                      C.checkKeyGenParams(t), C.checkKeyUsages(a);
                      break;
                    case h.AesCTR:
                      d.checkKeyGenParams(t), d.checkKeyUsages(a);
                      break;
                    case h.AesGCM:
                      k.checkKeyGenParams(t), k.checkKeyUsages(a);
                      break;
                    case h.AesKW:
                      b.checkKeyGenParams(t), b.checkKeyUsages(a);
                      break;
                    case h.Hmac:
                      L.checkKeyGenParams(t), L.checkKeyUsages(a);
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, t);
                  }
                });
              }),
              (r.deriveBits = function(e, r, t) {
                var n = this;
                return Promise.resolve().then(function() {
                  if (
                    (n.checkDeriveParams(e),
                    n.checkKey(r, n.ALG_NAME, 'secret', 'deriveBits'),
                    !t || 'number' != typeof t)
                  )
                    throw new s(
                      "Parameter 'length' must be Number and more than 0"
                    );
                });
              }),
              (r.ALG_NAME = h.Hkdf),
              (r.KEY_USAGES = ['deriveKey', 'deriveBits']),
              r
            );
          })(p),
          N = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithm = function(e) {
                if (e.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
                  throw new c(c.WRONG_ALG_NAME, e.name, this.ALG_NAME);
              }),
              (r.checkDeriveParams = function(e) {
                if ((this.checkAlgorithm(e), !e.salt))
                  throw new c(c.PARAM_REQUIRED, 'salt');
                if (
                  !(ArrayBuffer.isView(e.salt) || e.salt instanceof ArrayBuffer)
                )
                  throw new c(
                    c.PARAM_WRONG_TYPE,
                    'salt',
                    'ArrayBuffer or ArrayBufferView'
                  );
                if (!e.iterations) throw new c(c.PARAM_REQUIRED, 'iterations');
                if (!e.hash) throw new c(c.PARAM_REQUIRED, 'hash');
                var r = a(e.hash);
                P.checkAlgorithm(r);
              }),
              (r.importKey = function(e, r, t, n, a) {
                var o = this;
                return Promise.resolve().then(function() {
                  if (n) throw new s('KDF keys must set extractable=false');
                  if (
                    (o.checkAlgorithm(t),
                    o.checkFormat(e),
                    'raw' !== e.toLowerCase())
                  )
                    throw new u(u.ALLOWED_FORMAT, e, "'raw'");
                  o.checkKeyUsages(a);
                });
              }),
              (r.deriveKey = function(e, r, t, n, a) {
                var o = this;
                return Promise.resolve().then(function() {
                  switch (
                    (o.checkDeriveParams(e),
                    o.checkKey(r, o.ALG_NAME, 'secret', 'deriveKey'),
                    p.checkAlgorithm(t),
                    t.name.toUpperCase())
                  ) {
                    case h.AesCBC:
                      C.checkKeyGenParams(t), C.checkKeyUsages(a);
                      break;
                    case h.AesCTR:
                      d.checkKeyGenParams(t), d.checkKeyUsages(a);
                      break;
                    case h.AesGCM:
                      k.checkKeyGenParams(t), k.checkKeyUsages(a);
                      break;
                    case h.AesKW:
                      b.checkKeyGenParams(t), b.checkKeyUsages(a);
                      break;
                    case h.Hmac:
                      L.checkKeyGenParams(t), L.checkKeyUsages(a);
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, t);
                  }
                });
              }),
              (r.deriveBits = function(e, r, t) {
                var n = this;
                return Promise.resolve().then(function() {
                  if (
                    (n.checkDeriveParams(e),
                    n.checkKey(r, n.ALG_NAME, 'secret', 'deriveBits'),
                    !t || 'number' != typeof t)
                  )
                    throw new s(
                      "Parameter 'length' must be Number and more than 0"
                    );
                });
              }),
              (r.ALG_NAME = h.Pbkdf2),
              (r.KEY_USAGES = ['deriveKey', 'deriveBits']),
              r
            );
          })(p),
          G = (function(e) {
            function r() {
              var r = (null !== e && e.apply(this, arguments)) || this;
              return (r.code = 2), r;
            }
            return Object(i.a)(r, e), r;
          })(c),
          M = (function(e) {
            function r() {
              var r = (null !== e && e.apply(this, arguments)) || this;
              return (r.code = 6), r;
            }
            return Object(i.a)(r, e), r;
          })(c),
          B = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithm = function(e) {
                if (e.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
                  throw new c(c.WRONG_ALG_NAME, e.name, this.ALG_NAME);
              }),
              (r.checkImportAlgorithm = function(e) {
                if ((this.checkAlgorithm(e), !e.hash))
                  throw new M(M.PARAM_REQUIRED, 'hash');
                P.checkAlgorithm(e.hash);
              }),
              (r.checkKeyGenParams = function(e) {
                var r = e.modulusLength;
                if (!(r >= 256 && r <= 16384) || r % 8)
                  throw new G(
                    G.PARAM_WRONG_VALUE,
                    'modulusLength',
                    ' a multiple of 8 bits and >= 256 and <= 16384'
                  );
                var t = e.publicExponent;
                if (!t) throw new G(G.PARAM_REQUIRED, 'publicExponent');
                if (!ArrayBuffer.isView(t))
                  throw new G(
                    G.PARAM_WRONG_TYPE,
                    'publicExponent',
                    'ArrayBufferView'
                  );
                if (3 !== t[0] && (1 !== t[0] || 0 !== t[1] || 1 !== t[2]))
                  throw new G(
                    G.PARAM_WRONG_VALUE,
                    'publicExponent',
                    'Uint8Array([3]) | Uint8Array([1, 0, 1])'
                  );
                if (!e.hash) throw new G(G.PARAM_REQUIRED, 'hash', E);
                P.checkAlgorithm(e.hash);
              }),
              (r.checkKeyGenUsages = function(e) {
                var r = this;
                this.checkKeyUsages(e),
                  e.forEach(function(e) {
                    var t = 0;
                    for (
                      t;
                      t < r.KEY_USAGES.length &&
                      r.KEY_USAGES[t].toLowerCase() !== e.toLowerCase();
                      t++
                    );
                    if (t === r.KEY_USAGES.length)
                      throw new s(
                        "Unsupported key usage '" +
                          e +
                          "'. Should be one of [" +
                          r.KEY_USAGES.join(', ') +
                          ']'
                      );
                  });
              }),
              (r.generateKey = function(e, r, t) {
                var n = this;
                return new Promise(function(r, a) {
                  n.checkAlgorithm(e),
                    n.checkKeyGenParams(e),
                    n.checkKeyGenUsages(t),
                    r(void 0);
                });
              }),
              (r.exportKey = function(e, r) {
                var t = this;
                return new Promise(function(n, a) {
                  t.checkKey(r, t.ALG_NAME),
                    t.checkFormat(e, r.type),
                    n(void 0);
                });
              }),
              (r.importKey = function(e, r, t, n, a) {
                var o = this;
                return new Promise(function(r, n) {
                  if (
                    (o.checkImportAlgorithm(t),
                    o.checkFormat(e),
                    'raw' === e.toLowerCase())
                  )
                    throw new u(
                      u.ALLOWED_FORMAT,
                      e,
                      "'JsonWebKey', 'pkcs8' or 'spki'"
                    );
                  o.checkKeyGenUsages(a), r(void 0);
                });
              }),
              (r.ALG_NAME = ''),
              (r.KEY_USAGES = []),
              r
            );
          })(p),
          T = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.sign = function(e, r, t) {
                var n = this;
                return new Promise(function(t, a) {
                  n.checkAlgorithmParams(e),
                    n.checkKey(r, n.ALG_NAME, 'private', 'sign'),
                    t(void 0);
                });
              }),
              (r.verify = function(e, r, t, n) {
                var a = this;
                return new Promise(function(t, n) {
                  a.checkAlgorithmParams(e),
                    a.checkKey(r, a.ALG_NAME, 'public', 'verify'),
                    t(void 0);
                });
              }),
              (r.ALG_NAME = h.RsaSSA),
              (r.KEY_USAGES = ['sign', 'verify']),
              r
            );
          })(B),
          D = (function(e) {
            function r() {
              var r = (null !== e && e.apply(this, arguments)) || this;
              return (r.code = 4), r;
            }
            return Object(i.a)(r, e), r;
          })(c),
          x = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithmParams = function(r) {
                var t = r;
                if ((e.checkAlgorithmParams.call(this, t), !t.saltLength))
                  throw new D(D.PARAM_REQUIRED, 'saltLength');
                if (t.saltLength < 0)
                  throw new D(
                    "Parameter 'saltLength' is outside of numeric range"
                  );
              }),
              (r.ALG_NAME = h.RsaPSS),
              r
            );
          })(T),
          j = (function(e) {
            function r() {
              var r = (null !== e && e.apply(this, arguments)) || this;
              return (r.code = 5), r;
            }
            return Object(i.a)(r, e), r;
          })(c),
          H = (function(e) {
            function r() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              Object(i.a)(r, e),
              (r.checkAlgorithmParams = function(e) {
                if (
                  e.label &&
                  !(
                    ArrayBuffer.isView(e.label) ||
                    e.label instanceof ArrayBuffer
                  )
                )
                  throw new j(
                    j.PARAM_WRONG_TYPE,
                    'label',
                    'ArrayBufferView or ArrayBuffer'
                  );
              }),
              (r.encrypt = function(e, r, t) {
                var n = this;
                return new Promise(function(t, a) {
                  n.checkAlgorithmParams(e),
                    n.checkKey(r, n.ALG_NAME, 'public', 'encrypt'),
                    t(void 0);
                });
              }),
              (r.decrypt = function(e, r, t) {
                var n = this;
                return new Promise(function(t, a) {
                  n.checkAlgorithmParams(e),
                    n.checkKey(r, n.ALG_NAME, 'private', 'decrypt'),
                    t(void 0);
                });
              }),
              (r.wrapKey = function(e, r, t, n) {
                var a = this;
                return new Promise(function(o, i) {
                  a.checkAlgorithmParams(n),
                    a.checkKey(t, a.ALG_NAME, 'public', 'wrapKey'),
                    a.checkWrappedKey(r),
                    a.checkFormat(e, r.type),
                    o(void 0);
                });
              }),
              (r.unwrapKey = function(e, r, t, n, a, o, i) {
                var s = this;
                return new Promise(function(r, a) {
                  s.checkAlgorithmParams(n),
                    s.checkKey(t, s.ALG_NAME, 'private', 'unwrapKey'),
                    s.checkFormat(e),
                    r(void 0);
                });
              }),
              (r.ALG_NAME = h.RsaOAEP),
              (r.KEY_USAGES = ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']),
              r
            );
          })(B),
          W = (function() {
            function e() {}
            return (
              (e.prototype.generateKey = function(e, r, t) {
                return new Promise(function(n, o) {
                  var i = a(e),
                    s = p;
                  switch (i.name.toUpperCase()) {
                    case h.RsaSSA.toUpperCase():
                      s = T;
                      break;
                    case h.RsaOAEP.toUpperCase():
                      s = H;
                      break;
                    case h.RsaPSS.toUpperCase():
                      s = x;
                      break;
                    case h.AesECB.toUpperCase():
                      s = g;
                      break;
                    case h.AesCBC.toUpperCase():
                      s = C;
                      break;
                    case h.AesCTR.toUpperCase():
                      s = d;
                      break;
                    case h.AesGCM.toUpperCase():
                      s = k;
                      break;
                    case h.AesKW.toUpperCase():
                      s = b;
                      break;
                    case h.EcDSA.toUpperCase():
                      s = O;
                      break;
                    case h.EcDH.toUpperCase():
                      s = S;
                      break;
                    case h.Hmac.toUpperCase():
                      s = L;
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, i.name);
                  }
                  s.generateKey(i, r, t).then(n, o);
                });
              }),
              (e.prototype.digest = function(e, r) {
                return new Promise(function(t, n) {
                  var i = a(e),
                    s = o(r, 'data'),
                    u = p;
                  switch (i.name.toUpperCase()) {
                    case h.Sha1.toUpperCase():
                    case h.Sha256.toUpperCase():
                    case h.Sha384.toUpperCase():
                    case h.Sha512.toUpperCase():
                      u = P;
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, i.name);
                  }
                  u.digest(i, s).then(t, n);
                });
              }),
              (e.prototype.sign = function(e, r, t) {
                return new Promise(function(n, i) {
                  var s = a(e),
                    u = o(t, 'data'),
                    f = p;
                  switch (s.name.toUpperCase()) {
                    case h.RsaSSA.toUpperCase():
                      f = T;
                      break;
                    case h.RsaPSS.toUpperCase():
                      f = x;
                      break;
                    case h.EcDSA.toUpperCase():
                      f = O;
                      break;
                    case h.Hmac.toUpperCase():
                      f = L;
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, s.name);
                  }
                  f.sign(s, r, u).then(n, i);
                });
              }),
              (e.prototype.verify = function(e, r, t, n) {
                return new Promise(function(t, i) {
                  var s = a(e),
                    u = o(n, 'signature'),
                    f = o(n, 'data'),
                    y = p;
                  switch (s.name.toUpperCase()) {
                    case h.RsaSSA.toUpperCase():
                      y = T;
                      break;
                    case h.RsaPSS.toUpperCase():
                      y = x;
                      break;
                    case h.EcDSA.toUpperCase():
                      y = O;
                      break;
                    case h.Hmac.toUpperCase():
                      y = L;
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, s.name);
                  }
                  y.verify(s, r, u, f).then(t, i);
                });
              }),
              (e.prototype.encrypt = function(e, r, t) {
                return new Promise(function(n, i) {
                  var s = a(e),
                    u = o(t, 'data'),
                    f = p;
                  switch (s.name.toUpperCase()) {
                    case h.RsaOAEP.toUpperCase():
                      f = H;
                      break;
                    case h.AesECB.toUpperCase():
                      f = g;
                      break;
                    case h.AesCBC.toUpperCase():
                      f = C;
                      break;
                    case h.AesCTR.toUpperCase():
                      f = d;
                      break;
                    case h.AesGCM.toUpperCase():
                      f = k;
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, s.name);
                  }
                  f.encrypt(s, r, u).then(n, i);
                });
              }),
              (e.prototype.decrypt = function(e, r, t) {
                return new Promise(function(n, i) {
                  var s = a(e),
                    u = o(t, 'data'),
                    f = p;
                  switch (s.name.toUpperCase()) {
                    case h.RsaOAEP.toUpperCase():
                      f = H;
                      break;
                    case h.AesECB.toUpperCase():
                      f = g;
                      break;
                    case h.AesCBC.toUpperCase():
                      f = C;
                      break;
                    case h.AesCTR.toUpperCase():
                      f = d;
                      break;
                    case h.AesGCM.toUpperCase():
                      f = k;
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, s.name);
                  }
                  f.decrypt(s, r, u).then(n, i);
                });
              }),
              (e.prototype.deriveBits = function(e, r, t) {
                return new Promise(function(n, o) {
                  var i = a(e),
                    s = p;
                  switch (i.name.toUpperCase()) {
                    case h.EcDH.toUpperCase():
                      s = S;
                      break;
                    case h.Pbkdf2.toUpperCase():
                      s = N;
                      break;
                    case h.Hkdf.toUpperCase():
                      s = R;
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, i.name);
                  }
                  s.deriveBits(i, r, t).then(n, o);
                });
              }),
              (e.prototype.deriveKey = function(e, r, t, n, o) {
                return new Promise(function(i, s) {
                  var u = a(e),
                    f = a(t),
                    y = p;
                  switch (u.name.toUpperCase()) {
                    case h.EcDH.toUpperCase():
                      y = S;
                      break;
                    case h.Pbkdf2.toUpperCase():
                      y = N;
                      break;
                    case h.Hkdf.toUpperCase():
                      y = R;
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, u.name);
                  }
                  y.deriveKey(u, r, f, n, o).then(i, s);
                });
              }),
              (e.prototype.exportKey = function(e, r) {
                return new Promise(function(t, n) {
                  if ((p.checkKey(r), !r.extractable))
                    throw new u(u.NOT_EXTRACTABLE);
                  var a = p;
                  switch (r.algorithm.name.toUpperCase()) {
                    case h.RsaSSA.toUpperCase():
                      a = T;
                      break;
                    case h.RsaPSS.toUpperCase():
                      a = x;
                      break;
                    case h.AesECB.toUpperCase():
                      a = g;
                      break;
                    case h.RsaOAEP.toUpperCase():
                      a = H;
                      break;
                    case h.AesCBC.toUpperCase():
                      a = C;
                      break;
                    case h.AesCTR.toUpperCase():
                      a = d;
                      break;
                    case h.AesGCM.toUpperCase():
                      a = k;
                      break;
                    case h.AesKW.toUpperCase():
                      a = b;
                      break;
                    case h.EcDSA.toUpperCase():
                      a = O;
                      break;
                    case h.EcDH.toUpperCase():
                      a = S;
                      break;
                    case h.Hmac.toUpperCase():
                      a = L;
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, r.algorithm.name);
                  }
                  a.exportKey(e, r).then(t, n);
                });
              }),
              (e.prototype.importKey = function(e, r, t, n, o) {
                return new Promise(function(i, s) {
                  var u = a(t),
                    f = p;
                  switch (u.name.toUpperCase()) {
                    case h.RsaSSA.toUpperCase():
                      f = T;
                      break;
                    case h.RsaPSS.toUpperCase():
                      f = x;
                      break;
                    case h.RsaOAEP.toUpperCase():
                      f = H;
                      break;
                    case h.AesECB.toUpperCase():
                      f = g;
                      break;
                    case h.AesCBC.toUpperCase():
                      f = C;
                      break;
                    case h.AesCTR.toUpperCase():
                      f = d;
                      break;
                    case h.AesGCM.toUpperCase():
                      f = k;
                      break;
                    case h.AesKW.toUpperCase():
                      f = b;
                      break;
                    case h.EcDSA.toUpperCase():
                      f = O;
                      break;
                    case h.EcDH.toUpperCase():
                      f = S;
                      break;
                    case h.Hmac.toUpperCase():
                      f = L;
                      break;
                    case h.Pbkdf2.toUpperCase():
                      f = N;
                      break;
                    case h.Hkdf.toUpperCase():
                      f = R;
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, u.name);
                  }
                  f.importKey(e, r, u, n, o).then(i, s);
                });
              }),
              (e.prototype.wrapKey = function(e, r, t, n) {
                return new Promise(function(o, i) {
                  var s = a(n),
                    u = p;
                  switch (s.name.toUpperCase()) {
                    case h.RsaOAEP.toUpperCase():
                      u = H;
                      break;
                    case h.AesECB.toUpperCase():
                      u = g;
                      break;
                    case h.AesCBC.toUpperCase():
                      u = C;
                      break;
                    case h.AesCTR.toUpperCase():
                      u = d;
                      break;
                    case h.AesGCM.toUpperCase():
                      u = k;
                      break;
                    case h.AesKW.toUpperCase():
                      u = b;
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, s.name);
                  }
                  u.wrapKey(e, r, t, s).then(o, i);
                });
              }),
              (e.prototype.unwrapKey = function(e, r, t, n, i, s, u) {
                return new Promise(function(f, y) {
                  var l = a(n),
                    m = a(i),
                    A = o(r, 'wrappedKey'),
                    w = p;
                  switch (l.name.toUpperCase()) {
                    case h.RsaOAEP.toUpperCase():
                      w = H;
                      break;
                    case h.AesECB.toUpperCase():
                      w = g;
                      break;
                    case h.AesCBC.toUpperCase():
                      w = C;
                      break;
                    case h.AesCTR.toUpperCase():
                      w = d;
                      break;
                    case h.AesGCM.toUpperCase():
                      w = k;
                      break;
                    case h.AesKW.toUpperCase():
                      w = b;
                      break;
                    default:
                      throw new c(c.UNSUPPORTED_ALGORITHM, l.name);
                  }
                  w.unwrapKey(e, A, t, l, m, s, u).then(f, y);
                });
              }),
              e
            );
          })();
      }.call(r, t(7));
  },
  function(e, r, t) {
    'use strict';
    var n =
      (this && this.__extends) ||
      (function() {
        var e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, r) {
              e.__proto__ = r;
            }) ||
          function(e, r) {
            for (var t in r) r.hasOwnProperty(t) && (e[t] = r[t]);
          };
        return function(r, t) {
          function n() {
            this.constructor = r;
          }
          e(r, t),
            (r.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        };
      })();
    Object.defineProperty(r, '__esModule', { value: !0 });
    var a = t(0),
      o = (function(e) {
        function r() {
          var r = (null !== e && e.apply(this, arguments)) || this;
          return (r.code = 10), r;
        }
        return (
          n(r, e),
          (r.MODULE_NOT_FOUND =
            "Module '%1' is not found. Download it from %2"),
          (r.UNSUPPORTED_ALGORITHM = "Unsupported algorithm '%1'"),
          r
        );
      })(a.WebCryptoError);
    r.LinerError = o;
  },
  function(e, r, t) {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = t(10),
      a = t(4),
      o = (function() {
        function e() {
          this.subtle = new n.SubtleCrypto();
        }
        return (
          (e.prototype.getRandomValues = function(e) {
            return a.nativeCrypto.getRandomValues(e);
          }),
          e
        );
      })();
    r.Crypto = o;
  },
  function(e, r, t) {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = (function() {
      function e(e) {
        (this.algorithm = e.algorithm),
          e.type && (this.type = e.type),
          (this.extractable = e.extractable),
          (this.usages = e.usages);
      }
      return e;
    })();
    r.CryptoKey = n;
  },
  function(e, r, t) {
    'use strict';
    function n(e, r) {
      var t = e[r];
      e[r] = function() {
        var n = arguments;
        return new Promise(function(a, o) {
          var i = t.apply(e, n);
          (i.oncomplete = function(e) {
            a(e.target.result);
          }),
            (i.onerror = function(e) {
              o("Error on running '" + r + "' function");
            });
        });
      };
    }
    Object.defineProperty(r, '__esModule', { value: !0 });
    var a,
      o = t(1);
    if ('undefined' == typeof self) {
      var i = t(9);
      a = {
        crypto: {
          subtle: {},
          getRandomValues: function(e) {
            var r = e.buffer,
              t = new Uint8Array(r);
            return (
              i.randomBytes(t.length).forEach(function(e, r) {
                return (t[r] = e);
              }),
              e
            );
          }
        }
      };
    } else a = self;
    (r.nativeCrypto = a.msCrypto || a.crypto || {}), (r.nativeSubtle = null);
    try {
      r.nativeSubtle = r.nativeCrypto.subtle || r.nativeCrypto.webkitSubtle;
    } catch (e) {}
    if (a.msCrypto) {
      if (!a.Promise)
        throw new o.LinerError(
          o.LinerError.MODULE_NOT_FOUND,
          'Promise',
          'https://www.promisejs.org'
        );
      n(r.nativeSubtle, 'generateKey'),
        n(r.nativeSubtle, 'digest'),
        n(r.nativeSubtle, 'sign'),
        n(r.nativeSubtle, 'verify'),
        n(r.nativeSubtle, 'encrypt'),
        n(r.nativeSubtle, 'decrypt'),
        n(r.nativeSubtle, 'importKey'),
        n(r.nativeSubtle, 'exportKey'),
        n(r.nativeSubtle, 'wrapKey'),
        n(r.nativeSubtle, 'unwrapKey'),
        n(r.nativeSubtle, 'deriveKey'),
        n(r.nativeSubtle, 'deriveBits');
    }
    Math.imul ||
      (Math.imul = function(e, r) {
        var t = (e >>> 16) & 65535,
          n = 65535 & e,
          a = (r >>> 16) & 65535,
          o = 65535 & r;
        return (n * o + (((t * o + n * a) << 16) >>> 0)) | 0;
      });
  },
  function(e, r, t) {
    'use strict';
    function n() {
      var e = { name: 'Unknown', version: '0' };
      try {
        var t = self.navigator.userAgent,
          n = void 0;
        (n = /edge\/([\d\.]+)/i.exec(t))
          ? ((e.name = r.Browser.Edge), (e.version = n[1]))
          : /msie/i.test(t)
          ? ((e.name = r.Browser.IE),
            (e.version = /msie ([\d\.]+)/i.exec(t)[1]))
          : /Trident/i.test(t)
          ? ((e.name = r.Browser.IE), (e.version = /rv:([\d\.]+)/i.exec(t)[1]))
          : /chrome/i.test(t)
          ? ((e.name = r.Browser.Chrome),
            (e.version = /chrome\/([\d\.]+)/i.exec(t)[1]))
          : /safari/i.test(t)
          ? ((e.name = r.Browser.Safari),
            (e.version = /version\/([\d\.]+)/i.exec(t)[1]))
          : /firefox/i.test(t) &&
            ((e.name = r.Browser.Firefox),
            (e.version = /firefox\/([\d\.]+)/i.exec(t)[1]));
      } catch (e) {}
      return e;
    }
    function a(e) {
      for (var r = new Uint8Array(e.length), t = 0; t < e.length; t++)
        r[t] = e.charCodeAt(t);
      return r;
    }
    function o(e) {
      for (var r = '', t = 0; t < e.length; t++) r += String.fromCharCode(e[t]);
      return r;
    }
    function i() {
      for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
      var t = new Uint8Array(
          e
            .map(function(e) {
              return e.length;
            })
            .reduce(function(e, r) {
              return e + r;
            })
        ),
        n = 0;
      return (
        e.forEach(function(e, r) {
          for (var a = 0; a < e.length; a++) t[n + a] = e[a];
          n += e.length;
        }),
        t
      );
    }
    function s(e) {
      for (var r = [], t = 1; t < arguments.length; t++)
        r[t - 1] = arguments[t];
      for (var n = arguments[0], a = 1; a < arguments.length; a++) {
        var o = arguments[a];
        for (var i in o) n[i] = o[i];
      }
      return n;
    }
    function c(e) {
      for (var r = [], t = 1; t < arguments.length; t++)
        r[t - 1] = arguments[t];
      'undefined' != typeof self &&
        self.PV_WEBCRYPTO_LINER_LOG &&
        console.warn.apply(console, arguments);
    }
    Object.defineProperty(r, '__esModule', { value: !0 }),
      (r.Browser = {
        IE: 'Internet Explorer',
        Safari: 'Safari',
        Edge: 'Edge',
        Chrome: 'Chrome',
        Firefox: 'Firefox Mozilla',
        Mobile: 'Mobile'
      }),
      (r.BrowserInfo = n),
      (r.string2buffer = a),
      (r.buffer2string = o),
      (r.concat = i),
      (r.assign = s),
      (r.warn = c);
  },
  function(e, r, t) {
    'use strict';
    function n(e) {
      for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
    }
    Object.defineProperty(r, '__esModule', { value: !0 }), n(t(4)), n(t(2));
  },
  function(e, r) {
    var t;
    t = (function() {
      return this;
    })();
    try {
      t = t || Function('return this')() || (0, eval)('this');
    } catch (e) {
      'object' == typeof window && (t = window);
    }
    e.exports = t;
  },
  function(e, r, t) {
    'use strict';
    function n(e, r) {
      function t() {
        this.constructor = e;
      }
      a(e, r),
        (e.prototype =
          null === r
            ? Object.create(r)
            : ((t.prototype = r.prototype), new t()));
    }
    r.a = n; /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
    var a =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(e, r) {
          e.__proto__ = r;
        }) ||
      function(e, r) {
        for (var t in r) r.hasOwnProperty(t) && (e[t] = r[t]);
      };
    Object.assign;
  },
  function(e, r) {
    e.exports = require('crypto');
  },
  function(e, r, t) {
    'use strict';
    function n(e, r) {
      return Promise.resolve().then(function() {
        if (e.key) return e;
        if (e.extractable) {
          return new m.Crypto().subtle.exportKey('jwk', e).then(function(t) {
            var n = o(e);
            return (
              n && (n = w.assign(n, e.algorithm)),
              r.importKey('jwk', t, n, !0, e.usages)
            );
          });
        }
        throw new A.LinerError(
          "'key' is Native CryptoKey. It can't be converted to JS CryptoKey"
        );
      });
    }
    function a(e, r) {
      (w.BrowserInfo().name !== w.Browser.IE &&
        w.BrowserInfo().name !== w.Browser.Edge &&
        w.BrowserInfo().name !== w.Browser.Safari) ||
        !/^rsa/i.test(e.name) ||
        (r.privateKey
          ? (E.push({ hash: e.hash, key: r.privateKey }),
            E.push({ hash: e.hash, key: r.publicKey }))
          : E.push({ hash: e.hash, key: r }));
    }
    function o(e) {
      var r = null;
      return (
        E.some(function(t) {
          return (
            t.key === e &&
            ((r = w.assign({}, e.algorithm, { hash: t.hash })), !0)
          );
        }),
        r
      );
    }
    function i(e, r) {
      var t = [];
      e.privateKey ? (t.push(e.privateKey), t.push(e.publicKey)) : t.push(e),
        t.forEach(function(e) {
          'keyUsage' in e &&
            ((e.usages = e.keyUsage || []),
            e.usages.length ||
              (['verify', 'encrypt', 'wrapKey'].forEach(function(t) {
                r.indexOf(t) > -1 &&
                  ('public' === e.type || 'secret' === e.type) &&
                  e.usages.push(t);
              }),
              [
                'sign',
                'decrypt',
                'unwrapKey',
                'deriveKey',
                'deriveBits'
              ].forEach(function(t) {
                r.indexOf(t) > -1 &&
                  ('private' === e.type || 'secret' === e.type) &&
                  e.usages.push(t);
              })));
        });
    }
    function s(e, r, t) {
      if (r && w.BrowserInfo().name === w.Browser.IE) {
        'extractable' in e && ((e.ext = e.extractable), delete e.extractable);
        var n = null;
        switch (r.name.toUpperCase()) {
          case h.AlgorithmNames.AesECB.toUpperCase():
          case h.AlgorithmNames.AesCBC.toUpperCase():
          case h.AlgorithmNames.AesGCM.toUpperCase():
            n = v.AesCrypto;
            break;
          default:
            throw new A.LinerError(
              A.LinerError.UNSUPPORTED_ALGORITHM,
              r.name.toUpperCase()
            );
        }
        n && !e.alg && (e.alg = n.alg2jwk(r)),
          'key_ops' in e || (e.key_ops = t);
      }
    }
    function c(e) {
      w.BrowserInfo().name === w.Browser.IE &&
        ('ext' in e && ((e.extractable = e.ext), delete e.ext),
        delete e.key_ops,
        delete e.alg);
    }
    function u(e) {
      var r = /AppleWebKit\/(\d+)/.exec(self.navigator.userAgent);
      return (
        e.toUpperCase() === h.AlgorithmNames.RsaOAEP &&
        r &&
        parseInt(r[1], 10) < 604
      );
    }
    var p =
      (this && this.__extends) ||
      (function() {
        var e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, r) {
              e.__proto__ = r;
            }) ||
          function(e, r) {
            for (var t in r) r.hasOwnProperty(t) && (e[t] = r[t]);
          };
        return function(r, t) {
          function n() {
            this.constructor = r;
          }
          e(r, t),
            (r.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        };
      })();
    Object.defineProperty(r, '__esModule', { value: !0 });
    var h = t(0),
      f = t(0),
      y = t(0),
      l = t(4),
      m = t(2),
      A = t(1),
      w = t(5),
      v = t(11),
      g = t(12),
      C = t(13),
      d = t(14),
      k = t(15),
      b = t(16),
      E = [],
      P = (function(e) {
        function r() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          p(r, e),
          (r.prototype.generateKey = function(r, t, n) {
            var o,
              s = this,
              c = arguments;
            return e.prototype.generateKey
              .apply(this, c)
              .then(function(e) {
                if (
                  ((o = y.PrepareAlgorithm(r)),
                  !(
                    (w.BrowserInfo().name === w.Browser.Edge &&
                      o.name.toUpperCase() === h.AlgorithmNames.AesGCM) ||
                    u(o.name)
                  ) && l.nativeSubtle)
                )
                  try {
                    return l.nativeSubtle.generateKey
                      .apply(l.nativeSubtle, c)
                      .catch(function(e) {
                        w.warn(
                          'WebCrypto: native generateKey for ' +
                            o.name +
                            " doesn't work.",
                          (e && e.message) || 'Unknown message'
                        );
                      });
                  } catch (e) {
                    w.warn(
                      'WebCrypto: native generateKey for ' +
                        o.name +
                        " doesn't work.",
                      (e && e.message) || 'Unknown message'
                    );
                  }
              })
              .then(function(e) {
                if (e) {
                  var c = Promise.resolve(e);
                  if (
                    w.BrowserInfo().name === w.Browser.Safari &&
                    (o.name.toUpperCase() ===
                      h.AlgorithmNames.EcDH.toUpperCase() ||
                      o.name.toUpperCase() ===
                        h.AlgorithmNames.EcDSA.toUpperCase())
                  ) {
                    var u = e.publicKey;
                    c = c.then(function() {
                      return s.exportKey('jwk', u).then(function(a) {
                        return s.exportKey('spki', u).then(function(o) {
                          for (
                            var i = h.Base64Url.decode(a.x),
                              c = h.Base64Url.decode(a.y),
                              u = i.length + c.length,
                              p = new Uint8Array(o),
                              f = 0;
                            f < u;
                            f++
                          ) {
                            var y = p[p.length - f - 1],
                              l = void 0;
                            if (
                              ((l =
                                f < c.length
                                  ? c[c.length - f - 1]
                                  : i[i.length + c.length - f - 1]),
                              y !== l)
                            )
                              return (
                                w.warn(
                                  'WebCrypto: EC key has wrong public key JWK. Key pair will be recreated'
                                ),
                                s.generateKey(r, t, n)
                              );
                          }
                          return e;
                        });
                      });
                    });
                  }
                  return c.then(function(e) {
                    return i(e, n), a(o, e), e;
                  });
                }
                var p;
                switch (o.name.toLowerCase()) {
                  case h.AlgorithmNames.AesECB.toLowerCase():
                  case h.AlgorithmNames.AesCBC.toLowerCase():
                  case h.AlgorithmNames.AesGCM.toLowerCase():
                    p = v.AesCrypto;
                    break;
                  case h.AlgorithmNames.EcDSA.toLowerCase():
                  case h.AlgorithmNames.EcDH.toLowerCase():
                    p = C.EcCrypto;
                    break;
                  default:
                    throw new A.LinerError(
                      A.LinerError.UNSUPPORTED_ALGORITHM,
                      o.name.toLowerCase()
                    );
                }
                return p.generateKey(o, t, n);
              });
          }),
          (r.prototype.digest = function(r, t) {
            var n,
              a,
              o = arguments;
            return e.prototype.digest
              .apply(this, o)
              .then(function(e) {
                if (
                  ((n = y.PrepareAlgorithm(r)),
                  (a = y.PrepareData(t, 'data')),
                  l.nativeSubtle)
                )
                  try {
                    return l.nativeSubtle.digest
                      .apply(l.nativeSubtle, o)
                      .catch(function(e) {
                        w.warn(
                          'WebCrypto: native digest for ' +
                            n.name +
                            " doesn't work.",
                          (e && e.message) || 'Unknown message'
                        );
                      });
                  } catch (e) {
                    w.warn(
                      'WebCrypto: native digest for ' +
                        n.name +
                        " doesn't work.",
                      (e && e.message) || 'Unknown message'
                    );
                  }
              })
              .then(function(e) {
                return e || g.ShaCrypto.digest(n, a);
              });
          }),
          (r.prototype.sign = function(r, t, a) {
            var i,
              s,
              c = arguments;
            return e.prototype.sign
              .apply(this, c)
              .then(function(e) {
                (i = y.PrepareAlgorithm(r)), (s = y.PrepareData(a, 'data'));
                var n = o(t);
                if ((n && (c[0] = w.assign(i, n)), l.nativeSubtle))
                  try {
                    return l.nativeSubtle.sign
                      .apply(l.nativeSubtle, c)
                      .catch(function(e) {
                        w.warn(
                          'WebCrypto: native sign for ' +
                            i.name +
                            " doesn't work.",
                          (e && e.message) || 'Unknown message'
                        );
                      });
                  } catch (e) {
                    w.warn(
                      'WebCrypto: native sign for ' + i.name + " doesn't work.",
                      (e && e.message) || 'Unknown message'
                    );
                  }
              })
              .then(function(e) {
                if (e) return e;
                var r;
                switch (i.name.toLowerCase()) {
                  case h.AlgorithmNames.EcDSA.toLowerCase():
                    r = C.EcCrypto;
                    break;
                  case h.AlgorithmNames.Hmac.toLowerCase():
                    r = k.HmacCrypto;
                    break;
                  default:
                    throw new A.LinerError(
                      A.LinerError.UNSUPPORTED_ALGORITHM,
                      i.name.toLowerCase()
                    );
                }
                return n(t, r).then(function(e) {
                  return r.sign(i, e, s);
                });
              });
          }),
          (r.prototype.verify = function(r, t, n, a) {
            var i,
              s,
              c,
              u = arguments;
            return e.prototype.verify
              .apply(this, u)
              .then(function(e) {
                (i = y.PrepareAlgorithm(r)),
                  (s = y.PrepareData(n, 'data')),
                  (c = y.PrepareData(a, 'data'));
                var p = o(t);
                if ((p && (u[0] = w.assign(i, p)), l.nativeSubtle))
                  try {
                    return l.nativeSubtle.verify
                      .apply(l.nativeSubtle, u)
                      .catch(function(e) {
                        w.warn(
                          'WebCrypto: native verify for ' +
                            i.name +
                            " doesn't work.",
                          (e && e.message) || 'Unknown message'
                        );
                      });
                  } catch (e) {
                    w.warn(
                      'WebCrypto: native verify for ' +
                        i.name +
                        " doesn't work.",
                      (e && e.message) || 'Unknown message'
                    );
                  }
              })
              .then(function(e) {
                if ('boolean' == typeof e) return e;
                switch (i.name.toLowerCase()) {
                  case h.AlgorithmNames.EcDSA.toLowerCase():
                    C.EcCrypto;
                    break;
                  default:
                    throw new A.LinerError(
                      A.LinerError.UNSUPPORTED_ALGORITHM,
                      i.name.toLowerCase()
                    );
                }
              });
          }),
          (r.prototype.deriveBits = function(r, t, n) {
            var a,
              o = arguments;
            return e.prototype.deriveBits
              .apply(this, o)
              .then(function(e) {
                if (((a = y.PrepareAlgorithm(r)), l.nativeSubtle))
                  try {
                    return l.nativeSubtle.deriveBits
                      .apply(l.nativeSubtle, o)
                      .catch(function(e) {
                        w.warn(
                          'WebCrypto: native deriveBits for ' +
                            a.name +
                            " doesn't work.",
                          (e && e.message) || 'Unknown message'
                        );
                      });
                  } catch (e) {
                    w.warn(
                      'WebCrypto: native deriveBits for ' +
                        a.name +
                        " doesn't work.",
                      (e && e.message) || 'Unknown message'
                    );
                  }
              })
              .then(function(e) {
                if (e) return e;
                var r;
                switch (a.name.toLowerCase()) {
                  case h.AlgorithmNames.EcDH.toLowerCase():
                    r = C.EcCrypto;
                    break;
                  case h.AlgorithmNames.Pbkdf2.toLowerCase():
                    r = d.Pbkdf2Crypto;
                    break;
                  case h.AlgorithmNames.Hkdf.toLowerCase():
                    r = b.HkdfCrypto;
                    break;
                  default:
                    throw new A.LinerError(
                      A.LinerError.NOT_SUPPORTED,
                      'deriveBits'
                    );
                }
                return r.deriveBits(a, t, n);
              });
          }),
          (r.prototype.deriveKey = function(r, t, n, a, o) {
            var s,
              c,
              u = arguments;
            return e.prototype.deriveKey
              .apply(this, u)
              .then(function(e) {
                if (
                  ((s = y.PrepareAlgorithm(r)),
                  (c = y.PrepareAlgorithm(n)),
                  l.nativeSubtle)
                )
                  try {
                    return l.nativeSubtle.deriveKey
                      .apply(l.nativeSubtle, u)
                      .catch(function(e) {
                        w.warn(
                          'WebCrypto: native deriveKey for ' +
                            s.name +
                            " doesn't work.",
                          (e && e.message) || 'Unknown message'
                        );
                      });
                  } catch (e) {
                    w.warn(
                      'WebCrypto: native deriveKey for ' +
                        s.name +
                        " doesn't work.",
                      (e && e.message) || 'Unknown message'
                    );
                  }
              })
              .then(function(e) {
                if (e) return i(e, o), e;
                var r;
                switch (s.name.toLowerCase()) {
                  case h.AlgorithmNames.EcDH.toLowerCase():
                    r = C.EcCrypto;
                    break;
                  case h.AlgorithmNames.Pbkdf2.toLowerCase():
                    r = d.Pbkdf2Crypto;
                    break;
                  case h.AlgorithmNames.Hkdf.toLowerCase():
                    r = b.HkdfCrypto;
                    break;
                  default:
                    throw new A.LinerError(
                      A.LinerError.NOT_SUPPORTED,
                      'deriveKey'
                    );
                }
                return r.deriveKey(s, t, c, a, o);
              });
          }),
          (r.prototype.encrypt = function(r, t, a) {
            var o,
              i,
              s = arguments;
            return e.prototype.encrypt
              .apply(this, s)
              .then(function(e) {
                if (
                  ((o = y.PrepareAlgorithm(r)),
                  (i = y.PrepareData(a, 'data')),
                  l.nativeSubtle)
                )
                  try {
                    return l.nativeSubtle.encrypt
                      .apply(l.nativeSubtle, s)
                      .catch(function(e) {
                        w.warn(
                          "WebCrypto: native 'encrypt' for " +
                            o.name +
                            " doesn't work.",
                          (e && e.message) || 'Unknown message'
                        );
                      });
                  } catch (e) {
                    w.warn(
                      "WebCrypto: native 'encrypt' for " +
                        o.name +
                        " doesn't work.",
                      (e && e.message) || 'Unknown message'
                    );
                  }
              })
              .then(function(e) {
                if (e) {
                  if (
                    w.BrowserInfo().name === w.Browser.IE &&
                    o.name.toUpperCase() === h.AlgorithmNames.AesGCM &&
                    e.ciphertext
                  ) {
                    var r = new Uint8Array(
                        e.ciphertext.byteLength + e.tag.byteLength
                      ),
                      a = 0;
                    new Uint8Array(e.ciphertext).forEach(function(e) {
                      return (r[a++] = e);
                    }),
                      new Uint8Array(e.tag).forEach(function(e) {
                        return (r[a++] = e);
                      }),
                      (e = r.buffer);
                  }
                  return Promise.resolve(e);
                }
                var s;
                switch (o.name.toLowerCase()) {
                  case h.AlgorithmNames.AesECB.toLowerCase():
                  case h.AlgorithmNames.AesCBC.toLowerCase():
                  case h.AlgorithmNames.AesGCM.toLowerCase():
                    s = v.AesCrypto;
                    break;
                  default:
                    throw new A.LinerError(
                      A.LinerError.NOT_SUPPORTED,
                      'encrypt'
                    );
                }
                return n(t, s).then(function(e) {
                  return s.encrypt(o, e, i);
                });
              });
          }),
          (r.prototype.decrypt = function(r, t, n) {
            var a,
              o,
              i = arguments;
            return e.prototype.decrypt.apply(this, i).then(function(e) {
              (a = y.PrepareAlgorithm(r)), (o = y.PrepareData(n, 'data'));
              var i = o;
              if (
                w.BrowserInfo().name === w.Browser.IE &&
                a.name.toUpperCase() === h.AlgorithmNames.AesGCM
              ) {
                var s = o.byteLength - a.tagLength / 8;
                i = {
                  ciphertext: o.buffer.slice(0, s),
                  tag: o.buffer.slice(s, o.byteLength)
                };
              }
              if (t.key) {
                var c = void 0;
                switch (a.name.toLowerCase()) {
                  case h.AlgorithmNames.AesECB.toLowerCase():
                  case h.AlgorithmNames.AesCBC.toLowerCase():
                  case h.AlgorithmNames.AesGCM.toLowerCase():
                    c = v.AesCrypto;
                    break;
                  default:
                    throw new A.LinerError(
                      A.LinerError.NOT_SUPPORTED,
                      'decrypt'
                    );
                }
                return c.decrypt(a, t, o);
              }
              return l.nativeSubtle.decrypt.call(l.nativeSubtle, a, t, i);
            });
          }),
          (r.prototype.wrapKey = function(r, t, n, a) {
            var o,
              i = arguments;
            return e.prototype.wrapKey
              .apply(this, i)
              .then(function(e) {
                if (((o = y.PrepareAlgorithm(a)), l.nativeSubtle))
                  try {
                    return l.nativeSubtle.wrapKey
                      .apply(l.nativeSubtle, i)
                      .catch(function(e) {
                        w.warn(
                          "WebCrypto: native 'wrapKey' for " +
                            o.name +
                            " doesn't work.",
                          (e && e.message) || 'Unknown message'
                        );
                      });
                  } catch (e) {
                    w.warn(
                      "WebCrypto: native 'wrapKey' for " +
                        o.name +
                        " doesn't work.",
                      (e && e.message) || 'Unknown message'
                    );
                  }
              })
              .then(function(e) {
                if (e) return e;
                var a;
                switch (o.name.toLowerCase()) {
                  case h.AlgorithmNames.AesECB.toLowerCase():
                  case h.AlgorithmNames.AesCBC.toLowerCase():
                  case h.AlgorithmNames.AesGCM.toLowerCase():
                    a = v.AesCrypto;
                    break;
                  default:
                    throw new A.LinerError(
                      A.LinerError.NOT_SUPPORTED,
                      'wrapKey'
                    );
                }
                return a.wrapKey(r, t, n, o);
              });
          }),
          (r.prototype.unwrapKey = function(r, t, n, a, o, s, c) {
            var u,
              p,
              f,
              m = this,
              g = arguments;
            return e.prototype.unwrapKey.apply(this, g).then(function(e) {
              if (
                ((u = y.PrepareAlgorithm(a)),
                (p = y.PrepareAlgorithm(o)),
                (f = y.PrepareData(t, 'wrappedKey')),
                n.key)
              ) {
                var C = void 0;
                switch (u.name.toLowerCase()) {
                  case h.AlgorithmNames.AesECB.toLowerCase():
                  case h.AlgorithmNames.AesCBC.toLowerCase():
                  case h.AlgorithmNames.AesGCM.toLowerCase():
                    C = v.AesCrypto;
                    break;
                  default:
                    throw new A.LinerError(
                      A.LinerError.NOT_SUPPORTED,
                      'unwrapKey'
                    );
                }
                return C.unwrapKey(r, f, n, u, p, s, c);
              }
              return l.nativeSubtle.unwrapKey
                .apply(l.nativeSubtle, g)
                .catch(function(e) {
                  return m.decrypt(u, n, t).then(function(e) {
                    var t;
                    return (
                      (t =
                        'jwk' === r
                          ? JSON.parse(w.buffer2string(new Uint8Array(e)))
                          : e),
                      m.importKey(r, t, p, s, c)
                    );
                  });
                })
                .then(function(e) {
                  if (e) return i(e, c), e;
                })
                .catch(function(e) {
                  throw (console.error(e),
                  new Error('Cannot unwrap key from incoming data'));
                });
            });
          }),
          (r.prototype.exportKey = function(r, t) {
            var n = arguments;
            return e.prototype.exportKey
              .apply(this, n)
              .then(function() {
                if (l.nativeSubtle)
                  try {
                    return l.nativeSubtle.exportKey
                      .apply(l.nativeSubtle, n)
                      .catch(function(e) {
                        w.warn(
                          "WebCrypto: native 'exportKey' for " +
                            t.algorithm.name +
                            " doesn't work.",
                          (e && e.message) || 'Unknown message'
                        );
                      });
                  } catch (e) {
                    w.warn(
                      "WebCrypto: native 'exportKey' for " +
                        t.algorithm.name +
                        " doesn't work.",
                      (e && e.message) || 'Unknown message'
                    );
                  }
              })
              .then(function(e) {
                if (e) {
                  'jwk' === r &&
                    e instanceof ArrayBuffer &&
                    ((e = w.buffer2string(new Uint8Array(e))),
                    (e = JSON.parse(e)));
                  var n = o(t);
                  return (
                    n || (n = w.assign({}, t.algorithm)),
                    s(e, n, t.usages),
                    Promise.resolve(e)
                  );
                }
                if (!t.key)
                  throw new A.LinerError(
                    'Cannot export native CryptoKey from JS implementation'
                  );
                var a;
                switch (t.algorithm.name.toLowerCase()) {
                  case h.AlgorithmNames.AesECB.toLowerCase():
                  case h.AlgorithmNames.AesCBC.toLowerCase():
                  case h.AlgorithmNames.AesGCM.toLowerCase():
                    a = v.AesCrypto;
                    break;
                  case h.AlgorithmNames.EcDH.toLowerCase():
                  case h.AlgorithmNames.EcDSA.toLowerCase():
                    a = C.EcCrypto;
                    break;
                  case h.AlgorithmNames.Hmac.toLowerCase():
                    a = k.HmacCrypto;
                    break;
                  default:
                    throw new A.LinerError(
                      A.LinerError.UNSUPPORTED_ALGORITHM,
                      t.algorithm.name.toLowerCase()
                    );
                }
                return a.exportKey(r, t);
              });
          }),
          (r.prototype.importKey = function(r, t, n, o, s) {
            var p,
              f,
              m = arguments;
            return e.prototype.importKey
              .apply(this, m)
              .then(function(e) {
                (p = y.PrepareAlgorithm(n)), (f = t);
                var a = w.BrowserInfo();
                if (
                  ('jwk' !== r ||
                    ((a.name !== w.Browser.Safari || /^11/.test(a.version)) &&
                      a.name !== w.Browser.IE) ||
                    (w.BrowserInfo().name === w.Browser.IE &&
                      ((t = w.assign({}, t)), c(t)),
                    (m[1] = w.string2buffer(JSON.stringify(t)).buffer)),
                  ArrayBuffer.isView(t) && (f = y.PrepareData(t, 'keyData')),
                  !u(p.name) && l.nativeSubtle)
                )
                  try {
                    return l.nativeSubtle.importKey
                      .apply(l.nativeSubtle, m)
                      .catch(function(e) {
                        w.warn(
                          "WebCrypto: native 'importKey' for " +
                            p.name +
                            " doesn't work.",
                          (e && e.message) || 'Unknown message'
                        );
                      });
                  } catch (e) {
                    w.warn(
                      "WebCrypto: native 'importKey' for " +
                        p.name +
                        " doesn't work.",
                      (e && e.message) || 'Unknown message'
                    );
                  }
              })
              .then(function(e) {
                if (e) return a(p, e), i(e, s), Promise.resolve(e);
                var t;
                switch (p.name.toLowerCase()) {
                  case h.AlgorithmNames.AesECB.toLowerCase():
                  case h.AlgorithmNames.AesCBC.toLowerCase():
                  case h.AlgorithmNames.AesGCM.toLowerCase():
                    t = v.AesCrypto;
                    break;
                  case h.AlgorithmNames.EcDH.toLowerCase():
                  case h.AlgorithmNames.EcDSA.toLowerCase():
                    t = C.EcCrypto;
                    break;
                  case h.AlgorithmNames.Pbkdf2.toLowerCase():
                    t = d.Pbkdf2Crypto;
                    break;
                  case h.AlgorithmNames.Hmac.toLowerCase():
                    t = k.HmacCrypto;
                    break;
                  case h.AlgorithmNames.Hkdf.toLowerCase():
                    t = b.HkdfCrypto;
                    break;
                  default:
                    throw new A.LinerError(
                      A.LinerError.UNSUPPORTED_ALGORITHM,
                      p.name.toLowerCase()
                    );
                }
                return t.importKey(r, f, p, o, s);
              });
          }),
          r
        );
      })(f.SubtleCrypto);
    (r.SubtleCrypto = P),
      Uint8Array.prototype.forEach ||
        (Uint8Array.prototype.forEach = function(e) {
          for (var r = 0; r < this.length; r++) e(this[r], r, this);
        }),
      Uint8Array.prototype.slice ||
        (Uint8Array.prototype.slice = function(e, r) {
          return new Uint8Array(this.buffer.slice(e, r));
        }),
      Uint8Array.prototype.filter ||
        (Uint8Array.prototype.filter = function(e) {
          for (var r = [], t = 0; t < this.length; t++)
            e(this[t], t, this) && r.push(this[t]);
          return new Uint8Array(r);
        });
  },
  function(e, r, t) {
    'use strict';
    var n =
      (this && this.__extends) ||
      (function() {
        var e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, r) {
              e.__proto__ = r;
            }) ||
          function(e, r) {
            for (var t in r) r.hasOwnProperty(t) && (e[t] = r[t]);
          };
        return function(r, t) {
          function n() {
            this.constructor = r;
          }
          e(r, t),
            (r.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        };
      })();
    Object.defineProperty(r, '__esModule', { value: !0 });
    var a = t(0),
      o = t(1),
      i = t(3),
      s = t(5),
      c = t(4),
      u = (function(e) {
        function r() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          n(r, e),
          (r.generateKey = function(e, r, t) {
            var n = this;
            return Promise.resolve().then(function() {
              n.checkModule();
              var a = c.nativeCrypto.getRandomValues(
                  new Uint8Array(e.length / 8)
                ),
                o = new i.CryptoKey({
                  type: 'secret',
                  algorithm: e,
                  extractable: r,
                  usages: t
                });
              return (o.key = a), o;
            });
          }),
          (r.encrypt = function(e, r, t) {
            return Promise.resolve().then(function() {
              var n;
              switch (e.name.toUpperCase()) {
                case a.AlgorithmNames.AesECB:
                  var i = e;
                  n = asmCrypto.AES_ECB.encrypt(t, r.key, !!i.padding);
                  break;
                case a.AlgorithmNames.AesCBC:
                  var s = e;
                  n = asmCrypto.AES_CBC.encrypt(
                    t,
                    r.key,
                    void 0,
                    a.PrepareData(s.iv, 'iv')
                  );
                  break;
                case a.AlgorithmNames.AesGCM:
                  var c = e;
                  c.tagLength = c.tagLength || 128;
                  var u = void 0;
                  c.additionalData &&
                    (u = a.PrepareData(c.additionalData, 'additionalData')),
                    (n = asmCrypto.AES_GCM.encrypt(
                      t,
                      r.key,
                      c.iv,
                      u,
                      c.tagLength / 8
                    ));
                  break;
                default:
                  throw new o.LinerError(
                    a.AlgorithmError.UNSUPPORTED_ALGORITHM,
                    e.name
                  );
              }
              return n.buffer;
            });
          }),
          (r.decrypt = function(e, r, t) {
            return Promise.resolve().then(function() {
              var n;
              switch (e.name.toUpperCase()) {
                case a.AlgorithmNames.AesECB:
                  var i = e;
                  n = asmCrypto.AES_ECB.decrypt(t, r.key, !!i.padding);
                  break;
                case a.AlgorithmNames.AesCBC:
                  var s = e;
                  n = asmCrypto.AES_CBC.decrypt(
                    t,
                    r.key,
                    void 0,
                    a.PrepareData(s.iv, 'iv')
                  );
                  break;
                case a.AlgorithmNames.AesGCM:
                  var c = e;
                  c.tagLength = c.tagLength || 128;
                  var u = void 0;
                  c.additionalData &&
                    (u = a.PrepareData(c.additionalData, 'additionalData')),
                    (n = asmCrypto.AES_GCM.decrypt(
                      t,
                      r.key,
                      c.iv,
                      u,
                      c.tagLength / 8
                    ));
                  break;
                default:
                  throw new o.LinerError(
                    a.AlgorithmError.UNSUPPORTED_ALGORITHM,
                    e.name
                  );
              }
              return n.buffer;
            });
          }),
          (r.wrapKey = function(e, r, t, n) {
            var a;
            return Promise.resolve()
              .then(function() {
                return (a = new p.Crypto()), a.subtle.exportKey(e, r);
              })
              .then(function(e) {
                var r;
                return (
                  (r =
                    e instanceof ArrayBuffer
                      ? new Uint8Array(e)
                      : s.string2buffer(JSON.stringify(e))),
                  a.subtle.encrypt(n, t, r)
                );
              });
          }),
          (r.unwrapKey = function(e, r, t, n, a, o, i) {
            var c;
            return Promise.resolve()
              .then(function() {
                return (c = new p.Crypto()), c.subtle.decrypt(n, t, r);
              })
              .then(function(r) {
                var t;
                return (
                  (t =
                    'jwk' === e.toLowerCase()
                      ? JSON.parse(s.buffer2string(new Uint8Array(r)))
                      : new Uint8Array(r)),
                  c.subtle.importKey(e, t, a, o, i)
                );
              });
          }),
          (r.alg2jwk = function(e) {
            return 'A' + e.length + /-(\w+)/i.exec(e.name.toUpperCase())[1];
          }),
          (r.jwk2alg = function(e) {
            throw new Error('Not implemented');
          }),
          (r.exportKey = function(e, r) {
            var t = this;
            return Promise.resolve().then(function() {
              var n = r.key;
              if ('jwk' === e.toLowerCase()) {
                return {
                  alg: t.alg2jwk(r.algorithm),
                  ext: r.extractable,
                  k: a.Base64Url.encode(n),
                  key_ops: r.usages,
                  kty: 'oct'
                };
              }
              return n.buffer;
            });
          }),
          (r.importKey = function(e, r, t, n, o) {
            return Promise.resolve().then(function() {
              var s;
              if ('jwk' === e.toLowerCase()) {
                var c = r;
                s = a.Base64Url.decode(c.k);
              } else s = new Uint8Array(r);
              var u = new i.CryptoKey({
                type: 'secret',
                algorithm: t,
                extractable: n,
                usages: o
              });
              return (u.key = s), u;
            });
          }),
          (r.checkModule = function() {
            if ('undefined' == typeof asmCrypto)
              throw new o.LinerError(
                o.LinerError.MODULE_NOT_FOUND,
                'asmCrypto',
                'https://github.com/vibornoff/asmcrypto.js'
              );
          }),
          r
        );
      })(a.BaseCrypto);
    r.AesCrypto = u;
    var p = t(2);
  },
  function(e, r, t) {
    'use strict';
    var n =
      (this && this.__extends) ||
      (function() {
        var e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, r) {
              e.__proto__ = r;
            }) ||
          function(e, r) {
            for (var t in r) r.hasOwnProperty(t) && (e[t] = r[t]);
          };
        return function(r, t) {
          function n() {
            this.constructor = r;
          }
          e(r, t),
            (r.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        };
      })();
    Object.defineProperty(r, '__esModule', { value: !0 });
    var a = t(0),
      o = t(1),
      i = (function(e) {
        function r() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          n(r, e),
          (r.digest = function(e, r) {
            return Promise.resolve().then(function() {
              if ('undefined' == typeof asmCrypto)
                throw new o.LinerError(
                  o.LinerError.MODULE_NOT_FOUND,
                  'asmCrypto',
                  'https://github.com/vibornoff/asmcrypto.js'
                );
              switch (e.name.toUpperCase()) {
                case a.AlgorithmNames.Sha1:
                  return asmCrypto.SHA1.bytes(r).buffer;
                case a.AlgorithmNames.Sha256:
                  return asmCrypto.SHA256.bytes(r).buffer;
                case a.AlgorithmNames.Sha512:
                  return asmCrypto.SHA512.bytes(r).buffer;
                default:
                  throw new o.LinerError(
                    "Not supported algorithm '" + e.name + "'"
                  );
              }
            });
          }),
          r
        );
      })(a.BaseCrypto);
    r.ShaCrypto = i;
  },
  function(e, r, t) {
    'use strict';
    function n(e) {
      for (var r = new Uint8Array(e), t = [], n = 0; n < r.length; n++)
        t.push(r[n]);
      return t;
    }
    function a(e, r) {
      e.length % 2 && (e = '0' + e);
      for (var t = new Uint8Array(e.length / 2), n = 0; n < e.length; n++) {
        var a = e.slice(n, ++n + 1);
        t[(n - 1) / 2] = parseInt(a, 16);
      }
      if (r) {
        var o = t.length;
        (o = o > 32 ? (o > 48 ? 66 : 48) : 32),
          t.length < o && (t = p.concat(new Uint8Array(o - t.length), t));
      }
      return t;
    }
    function o(e, r) {
      for (var t = '', n = 0; n < e.length; n++) {
        var a = e[n].toString(16);
        t += a.length % 2 ? '0' + a : a;
      }
      if (r) {
        var o = e.length;
        (o = o > 32 ? (o > 48 ? 66 : 48) : 32),
          t.length / 2 < o &&
            (t = new Array(2 * o - t.length + 1).join('0') + t);
      }
      return t;
    }
    var i =
      (this && this.__extends) ||
      (function() {
        var e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, r) {
              e.__proto__ = r;
            }) ||
          function(e, r) {
            for (var t in r) r.hasOwnProperty(t) && (e[t] = r[t]);
          };
        return function(r, t) {
          function n() {
            this.constructor = r;
          }
          e(r, t),
            (r.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        };
      })();
    Object.defineProperty(r, '__esModule', { value: !0 });
    var s = t(0),
      c = t(1),
      u = t(3),
      p = t(5),
      h = (function(e) {
        function r() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          i(r, e),
          (r.generateKey = function(e, r, t) {
            var n = this;
            return Promise.resolve().then(function() {
              n.checkModule();
              var t = new elliptic.ec(n.getNamedCurve(e.namedCurve)),
                a = new u.CryptoKey({
                  type: 'private',
                  algorithm: e,
                  extractable: r,
                  usages: []
                }),
                o = new u.CryptoKey({
                  type: 'public',
                  algorithm: e,
                  extractable: !0,
                  usages: []
                });
              return (
                (a.key = o.key = t.genKeyPair()),
                e.name === s.AlgorithmNames.EcDSA
                  ? ((a.usages = ['sign']), (o.usages = ['verify']))
                  : e.name === s.AlgorithmNames.EcDH &&
                    ((a.usages = ['deriveKey', 'deriveBits']), (o.usages = [])),
                { privateKey: a, publicKey: o }
              );
            });
          }),
          (r.sign = function(e, r, t) {
            return Promise.resolve()
              .then(function() {
                var r = e;
                return new f.Crypto().subtle.digest(r.hash, t);
              })
              .then(function(e) {
                var t = n(e),
                  i = r.key.sign(t);
                return a(o(i.r.toArray(), !0) + o(i.s.toArray(), !0)).buffer;
              });
          }),
          (r.verify = function(e, r, t, a) {
            var o;
            return Promise.resolve()
              .then(function() {
                var r = e;
                return (
                  (o = {
                    r: t.slice(0, t.byteLength / 2),
                    s: t.slice(t.byteLength / 2)
                  }),
                  new f.Crypto().subtle.digest(r.hash, a)
                );
              })
              .then(function(e) {
                var t = n(e);
                return r.key.verify(t, o);
              });
          }),
          (r.deriveKey = function(e, r, t, n, a) {
            var o = this;
            return Promise.resolve()
              .then(function() {
                return o.deriveBits(e, r, t.length);
              })
              .then(function(e) {
                return new f.Crypto().subtle.importKey(
                  'raw',
                  new Uint8Array(e),
                  t,
                  n,
                  a
                );
              });
          }),
          (r.deriveBits = function(e, r, t) {
            return Promise.resolve().then(function() {
              var n = (Promise.resolve(null),
                r.key.derive(e.public.key.getPublic())),
                a = new Uint8Array(n.toArray()),
                o = a.length;
              return (
                (o = o > 32 ? (o > 48 ? 66 : 48) : 32),
                a.length < o && (a = p.concat(new Uint8Array(o - a.length), a)),
                a.slice(0, t / 8).buffer
              );
            });
          }),
          (r.exportKey = function(e, r) {
            return Promise.resolve().then(function() {
              var t = r.key;
              if ('jwk' === e.toLowerCase()) {
                var n = t.getPublic('hex').slice(2),
                  o = n.slice(0, n.length / 2),
                  i = n.slice(n.length / 2, n.length);
                if ('public' === r.type) {
                  var u = {
                    crv: r.algorithm.namedCurve,
                    ext: r.extractable,
                    x: s.Base64Url.encode(a(o, !0)),
                    y: s.Base64Url.encode(a(i, !0)),
                    key_ops: r.usages,
                    kty: 'EC'
                  };
                  return u;
                }
                var u = {
                  crv: r.algorithm.namedCurve,
                  ext: r.extractable,
                  d: s.Base64Url.encode(a(t.getPrivate('hex'), !0)),
                  x: s.Base64Url.encode(a(o, !0)),
                  y: s.Base64Url.encode(a(i, !0)),
                  key_ops: r.usages,
                  kty: 'EC'
                };
                return u;
              }
              throw new c.LinerError("Format '" + e + "' is not implemented");
            });
          }),
          (r.importKey = function(e, r, t, n, a) {
            var i = this;
            return Promise.resolve().then(function() {
              var h = new u.CryptoKey({
                algorithm: t,
                extractable: n,
                usages: a
              });
              if ('jwk' !== e.toLowerCase())
                throw new c.LinerError("Format '" + e + "' is not implemented");
              var f = i.getNamedCurve(t.namedCurve);
              console.log(f);
              var y = new elliptic.ec(f);
              if (r.d)
                (h.key = y.keyFromPrivate(s.Base64Url.decode(r.d))),
                  (h.type = 'private');
              else {
                var l = p.concat(
                    new Uint8Array([4]),
                    s.Base64Url.decode(r.x),
                    s.Base64Url.decode(r.y)
                  ),
                  m = o(l);
                (h.key = y.keyFromPublic(m, 'hex')), (h.type = 'public');
              }
              return h;
            });
          }),
          (r.checkModule = function() {
            if ('undefined' == typeof elliptic)
              throw new c.LinerError(
                c.LinerError.MODULE_NOT_FOUND,
                'elliptic',
                'https://github.com/indutny/elliptic'
              );
          }),
          (r.getNamedCurve = function(e) {
            var r = e.toUpperCase(),
              t = '';
            if (['P-256', 'P-384', 'P-521'].indexOf(r) > -1)
              t = r.replace('-', '').toLowerCase();
            else {
              if ('K-256' !== r)
                throw new c.LinerError("Unsupported named curve '" + e + "'");
              t = 'secp256k1';
            }
            return t;
          }),
          r
        );
      })(s.BaseCrypto);
    r.EcCrypto = h;
    var f = t(2);
  },
  function(e, r, t) {
    'use strict';
    var n =
      (this && this.__extends) ||
      (function() {
        var e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, r) {
              e.__proto__ = r;
            }) ||
          function(e, r) {
            for (var t in r) r.hasOwnProperty(t) && (e[t] = r[t]);
          };
        return function(r, t) {
          function n() {
            this.constructor = r;
          }
          e(r, t),
            (r.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        };
      })();
    Object.defineProperty(r, '__esModule', { value: !0 });
    var a = t(0),
      o = t(1),
      i = t(3),
      s = (function(e) {
        function r() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          n(r, e),
          (r.importKey = function(e, r, t, n, a) {
            return Promise.resolve().then(function() {
              var e = new Uint8Array(r),
                o = new i.CryptoKey({
                  type: 'secret',
                  algorithm: t,
                  extractable: n,
                  usages: a
                });
              return (o.key = e), o;
            });
          }),
          (r.deriveBits = function(e, r, t) {
            return Promise.resolve().then(function() {
              var n,
                i = new Uint8Array(e.salt),
                s = e.iterations,
                c = t / 8,
                u = 'string' == typeof e.hash ? e.hash : e.hash.name;
              switch (u.toUpperCase()) {
                case a.AlgorithmNames.Sha512.toUpperCase():
                  n = asmCrypto.PBKDF2_HMAC_SHA512.bytes(r.key, i, s, c);
                  break;
                case a.AlgorithmNames.Sha256.toUpperCase():
                  n = asmCrypto.PBKDF2_HMAC_SHA256.bytes(r.key, i, s, c);
                  break;
                case a.AlgorithmNames.Sha1.toUpperCase():
                  n = asmCrypto.PBKDF2_HMAC_SHA1.bytes(r.key, i, s, c);
                  break;
                default:
                  throw new o.LinerError(o.LinerError.UNSUPPORTED_ALGORITHM, u);
              }
              return n.buffer;
            });
          }),
          (r.deriveKey = function(e, r, t, n, i) {
            var s = this;
            return Promise.resolve()
              .then(function() {
                var n = 0;
                switch (t.name.toUpperCase()) {
                  case a.AlgorithmNames.AesCBC.toUpperCase():
                  case a.AlgorithmNames.AesCTR.toUpperCase():
                  case a.AlgorithmNames.AesGCM.toUpperCase():
                  case a.AlgorithmNames.AesKW.toUpperCase():
                    n = t.length;
                    break;
                  case a.AlgorithmNames.Hmac.toUpperCase():
                    n = 512;
                    break;
                  default:
                    throw new o.LinerError(
                      o.LinerError.UNSUPPORTED_ALGORITHM,
                      t.name
                    );
                }
                return s.deriveBits(e, r, n);
              })
              .then(function(e) {
                return new c.Crypto().subtle.importKey(
                  'raw',
                  new Uint8Array(e),
                  t,
                  n,
                  i
                );
              });
          }),
          r
        );
      })(a.BaseCrypto);
    r.Pbkdf2Crypto = s;
    var c = t(2);
  },
  function(e, r, t) {
    'use strict';
    var n =
      (this && this.__extends) ||
      (function() {
        var e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, r) {
              e.__proto__ = r;
            }) ||
          function(e, r) {
            for (var t in r) r.hasOwnProperty(t) && (e[t] = r[t]);
          };
        return function(r, t) {
          function n() {
            this.constructor = r;
          }
          e(r, t),
            (r.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        };
      })();
    Object.defineProperty(r, '__esModule', { value: !0 });
    var a = t(0),
      o = t(3),
      i = (function(e) {
        function r() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          n(r, e),
          (r.importKey = function(e, r, t, n, i) {
            return Promise.resolve().then(function() {
              var s;
              if ('jwk' === e.toLowerCase()) {
                var c = r;
                s = a.Base64Url.decode(c.k);
              } else s = new Uint8Array(r);
              var u = new o.CryptoKey({
                type: 'secret',
                algorithm: t,
                extractable: n,
                usages: i
              });
              return (u.key = s), u;
            });
          }),
          (r.sign = function(e, r, t) {
            return Promise.resolve().then(function() {
              return asmCrypto.HMAC_SHA256.bytes(t, r.key).buffer;
            });
          }),
          (r.exportKey = function(e, r) {
            return Promise.resolve().then(function() {
              var t = r.key;
              if ('jwk' === e.toLowerCase()) {
                return {
                  alg: 'HS256',
                  kty: 'oct',
                  k: a.Base64Url.encode(t),
                  key_ops: r.usages,
                  ext: r.extractable
                };
              }
              return t.buffer;
            });
          }),
          r
        );
      })(a.BaseCrypto);
    r.HmacCrypto = i;
  },
  function(e, r, t) {
    'use strict';
    function n(e, r) {
      return asmCrypto.HMAC_SHA256.bytes(e, r);
    }
    function a(e, r, t) {
      for (
        var n = e.length,
          a = Math.ceil(r / n),
          o = new Uint8Array(n * a + t.length + 1),
          i = 0,
          s = 0,
          c = 0;
        c < a;
        c++
      ) {
        o.set(t, s), (o[s + t.length] = c + 1);
        var u = asmCrypto.HMAC_SHA256.bytes(o.slice(i, s + t.length + 1), e);
        o.set(u, s), (i = s), (s += n);
      }
      return o.slice(0, r);
    }
    function o(e, r, t, o) {
      return a(n(e, t), r, o);
    }
    var i =
      (this && this.__extends) ||
      (function() {
        var e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, r) {
              e.__proto__ = r;
            }) ||
          function(e, r) {
            for (var t in r) r.hasOwnProperty(t) && (e[t] = r[t]);
          };
        return function(r, t) {
          function n() {
            this.constructor = r;
          }
          e(r, t),
            (r.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        };
      })();
    Object.defineProperty(r, '__esModule', { value: !0 });
    var s = t(0),
      c = t(1),
      u = t(3),
      p = (function(e) {
        function r() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          i(r, e),
          (r.importKey = function(e, r, t, n, a) {
            return Promise.resolve().then(function() {
              var e = new Uint8Array(r),
                o = new u.CryptoKey({
                  type: 'secret',
                  algorithm: t,
                  extractable: n,
                  usages: a
                });
              return (o.key = e), o;
            });
          }),
          (r.deriveBits = function(e, r, t) {
            return Promise.resolve().then(function() {
              var n,
                a = new Uint8Array(e.salt),
                i = new Uint8Array(e.info),
                u = t / 8,
                p = 'string' == typeof e.hash ? e.hash : e.hash.name;
              switch (p.toUpperCase()) {
                case s.AlgorithmNames.Sha256.toUpperCase():
                  n = o(r.key, u, a, i);
                  break;
                default:
                  throw new c.LinerError(c.LinerError.UNSUPPORTED_ALGORITHM, p);
              }
              return n.buffer;
            });
          }),
          (r.deriveKey = function(e, r, t, n, a) {
            var o = this;
            return Promise.resolve()
              .then(function() {
                var n = 0;
                switch (t.name.toUpperCase()) {
                  case s.AlgorithmNames.AesCBC.toUpperCase():
                  case s.AlgorithmNames.AesCTR.toUpperCase():
                  case s.AlgorithmNames.AesGCM.toUpperCase():
                  case s.AlgorithmNames.AesKW.toUpperCase():
                    n = t.length;
                    break;
                  case s.AlgorithmNames.Hmac.toUpperCase():
                    n = 512;
                    break;
                  default:
                    throw new c.LinerError(
                      c.LinerError.UNSUPPORTED_ALGORITHM,
                      t.name
                    );
                }
                return o.deriveBits(e, r, n);
              })
              .then(function(e) {
                return new h.Crypto().subtle.importKey(
                  'raw',
                  new Uint8Array(e),
                  t,
                  n,
                  a
                );
              });
          }),
          r
        );
      })(s.BaseCrypto);
    r.HkdfCrypto = p;
    var h = t(2);
  },
  function(e, r, t) {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = t(6),
      a = self;
    n.nativeCrypto && Object.freeze(n.nativeCrypto.getRandomValues),
      delete self.crypto,
      (a.crypto = new n.Crypto()),
      Object.freeze(a.crypto),
      (r.crypto = a.crypto);
  }
]);
/*! asmCrypto v0.22.0, (c) 2018 asmCrypto.js, opensource.org/licenses/MIT */
!(function(t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], e)
    : e((t.asmCrypto = {}));
})(this, function(t) {
  'use strict';
  var e = (function() {
      var t,
        e,
        r = !1;
      function s(r, s) {
        var i = t[(e[r] + e[s]) % 255];
        return (0 !== r && 0 !== s) || (i = 0), i;
      }
      var i, n, a, h;
      function o() {
        function o(r) {
          var s, i, n;
          for (
            i = n = (function(r) {
              var s = t[255 - e[r]];
              return 0 === r && (s = 0), s;
            })(r),
              s = 0;
            s < 4;
            s++
          )
            n ^= i = 255 & ((i << 1) | (i >>> 7));
          return (n ^= 99);
        }
        r ||
          (function() {
            (t = []), (e = []);
            var s,
              i,
              n = 1;
            for (s = 0; s < 255; s++)
              (t[s] = n),
                (i = 128 & n),
                (n <<= 1),
                (n &= 255),
                128 === i && (n ^= 27),
                (n ^= t[s]),
                (e[t[s]] = s);
            (t[255] = t[0]), (e[0] = 0), (r = !0);
          })(),
          (i = []),
          (n = []),
          (a = [[], [], [], []]),
          (h = [[], [], [], []]);
        for (var c = 0; c < 256; c++) {
          var u = o(c);
          (i[c] = u),
            (n[u] = c),
            (a[0][c] = (s(2, u) << 24) | (u << 16) | (u << 8) | s(3, u)),
            (h[0][u] =
              (s(14, c) << 24) | (s(9, c) << 16) | (s(13, c) << 8) | s(11, c));
          for (var f = 1; f < 4; f++)
            (a[f][c] = (a[f - 1][c] >>> 8) | (a[f - 1][c] << 24)),
              (h[f][u] = (h[f - 1][u] >>> 8) | (h[f - 1][u] << 24));
        }
      }
      var c = function(t, e) {
        o();
        var r = new Uint32Array(e);
        r.set(i, 512), r.set(n, 768);
        for (var s = 0; s < 4; s++)
          r.set(a[s], (4096 + 1024 * s) >> 2),
            r.set(h[s], (8192 + 1024 * s) >> 2);
        var c = (function(t, e, r) {
          'use asm';
          var s = 0,
            i = 0,
            n = 0,
            a = 0,
            h = 0,
            o = 0,
            c = 0,
            u = 0,
            f = 0,
            l = 0,
            p = 0,
            w = 0,
            y = 0,
            _ = 0,
            d = 0,
            A = 0,
            v = 0,
            x = 0,
            E = 0,
            g = 0,
            m = 0;
          var b = new t.Uint32Array(r),
            S = new t.Uint8Array(r);
          function C(t, e, r, h, o, c, u, f) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            h = h | 0;
            o = o | 0;
            c = c | 0;
            u = u | 0;
            f = f | 0;
            var l = 0,
              p = 0,
              w = 0,
              y = 0,
              _ = 0,
              d = 0,
              A = 0,
              v = 0;
            (l = r | 0x400), (p = r | 0x800), (w = r | 0xc00);
            (o = o ^ b[(t | 0) >> 2]),
              (c = c ^ b[(t | 4) >> 2]),
              (u = u ^ b[(t | 8) >> 2]),
              (f = f ^ b[(t | 12) >> 2]);
            for (v = 16; (v | 0) <= h << 4; v = (v + 16) | 0) {
              (y =
                b[(r | ((o >> 22) & 1020)) >> 2] ^
                b[(l | ((c >> 14) & 1020)) >> 2] ^
                b[(p | ((u >> 6) & 1020)) >> 2] ^
                b[(w | ((f << 2) & 1020)) >> 2] ^
                b[(t | v | 0) >> 2]),
                (_ =
                  b[(r | ((c >> 22) & 1020)) >> 2] ^
                  b[(l | ((u >> 14) & 1020)) >> 2] ^
                  b[(p | ((f >> 6) & 1020)) >> 2] ^
                  b[(w | ((o << 2) & 1020)) >> 2] ^
                  b[(t | v | 4) >> 2]),
                (d =
                  b[(r | ((u >> 22) & 1020)) >> 2] ^
                  b[(l | ((f >> 14) & 1020)) >> 2] ^
                  b[(p | ((o >> 6) & 1020)) >> 2] ^
                  b[(w | ((c << 2) & 1020)) >> 2] ^
                  b[(t | v | 8) >> 2]),
                (A =
                  b[(r | ((f >> 22) & 1020)) >> 2] ^
                  b[(l | ((o >> 14) & 1020)) >> 2] ^
                  b[(p | ((c >> 6) & 1020)) >> 2] ^
                  b[(w | ((u << 2) & 1020)) >> 2] ^
                  b[(t | v | 12) >> 2]);
              (o = y), (c = _), (u = d), (f = A);
            }
            (s =
              (b[(e | ((o >> 22) & 1020)) >> 2] << 24) ^
              (b[(e | ((c >> 14) & 1020)) >> 2] << 16) ^
              (b[(e | ((u >> 6) & 1020)) >> 2] << 8) ^
              b[(e | ((f << 2) & 1020)) >> 2] ^
              b[(t | v | 0) >> 2]),
              (i =
                (b[(e | ((c >> 22) & 1020)) >> 2] << 24) ^
                (b[(e | ((u >> 14) & 1020)) >> 2] << 16) ^
                (b[(e | ((f >> 6) & 1020)) >> 2] << 8) ^
                b[(e | ((o << 2) & 1020)) >> 2] ^
                b[(t | v | 4) >> 2]),
              (n =
                (b[(e | ((u >> 22) & 1020)) >> 2] << 24) ^
                (b[(e | ((f >> 14) & 1020)) >> 2] << 16) ^
                (b[(e | ((o >> 6) & 1020)) >> 2] << 8) ^
                b[(e | ((c << 2) & 1020)) >> 2] ^
                b[(t | v | 8) >> 2]),
              (a =
                (b[(e | ((f >> 22) & 1020)) >> 2] << 24) ^
                (b[(e | ((o >> 14) & 1020)) >> 2] << 16) ^
                (b[(e | ((c >> 6) & 1020)) >> 2] << 8) ^
                b[(e | ((u << 2) & 1020)) >> 2] ^
                b[(t | v | 12) >> 2]);
          }
          function M(t, e, r, s) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            s = s | 0;
            C(0x0000, 0x0800, 0x1000, m, t, e, r, s);
          }
          function U(t, e, r, s) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            s = s | 0;
            var n = 0;
            C(0x0400, 0x0c00, 0x2000, m, t, s, r, e);
            (n = i), (i = a), (a = n);
          }
          function H(t, e, r, f) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            f = f | 0;
            C(0x0000, 0x0800, 0x1000, m, h ^ t, o ^ e, c ^ r, u ^ f);
            (h = s), (o = i), (c = n), (u = a);
          }
          function T(t, e, r, f) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            f = f | 0;
            var l = 0;
            C(0x0400, 0x0c00, 0x2000, m, t, f, r, e);
            (l = i), (i = a), (a = l);
            (s = s ^ h), (i = i ^ o), (n = n ^ c), (a = a ^ u);
            (h = t), (o = e), (c = r), (u = f);
          }
          function D(t, e, r, f) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            f = f | 0;
            C(0x0000, 0x0800, 0x1000, m, h, o, c, u);
            (h = s = s ^ t), (o = i = i ^ e), (c = n = n ^ r), (u = a = a ^ f);
          }
          function k(t, e, r, f) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            f = f | 0;
            C(0x0000, 0x0800, 0x1000, m, h, o, c, u);
            (s = s ^ t), (i = i ^ e), (n = n ^ r), (a = a ^ f);
            (h = t), (o = e), (c = r), (u = f);
          }
          function G(t, e, r, f) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            f = f | 0;
            C(0x0000, 0x0800, 0x1000, m, h, o, c, u);
            (h = s), (o = i), (c = n), (u = a);
            (s = s ^ t), (i = i ^ e), (n = n ^ r), (a = a ^ f);
          }
          function I(t, e, r, h) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            h = h | 0;
            C(0x0000, 0x0800, 0x1000, m, f, l, p, w);
            w = (~A & w) | (A & (w + 1));
            p = (~d & p) | (d & (p + ((w | 0) == 0)));
            l = (~_ & l) | (_ & (l + ((p | 0) == 0)));
            f = (~y & f) | (y & (f + ((l | 0) == 0)));
            s = s ^ t;
            i = i ^ e;
            n = n ^ r;
            a = a ^ h;
          }
          function Z(t, e, r, s) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            s = s | 0;
            var i = 0,
              n = 0,
              a = 0,
              f = 0,
              l = 0,
              p = 0,
              w = 0,
              y = 0,
              _ = 0,
              d = 0;
            (t = t ^ h), (e = e ^ o), (r = r ^ c), (s = s ^ u);
            (i = v | 0), (n = x | 0), (a = E | 0), (f = g | 0);
            for (; (_ | 0) < 128; _ = (_ + 1) | 0) {
              if (i >>> 31) {
                (l = l ^ t), (p = p ^ e), (w = w ^ r), (y = y ^ s);
              }
              (i = (i << 1) | (n >>> 31)),
                (n = (n << 1) | (a >>> 31)),
                (a = (a << 1) | (f >>> 31)),
                (f = f << 1);
              d = s & 1;
              (s = (s >>> 1) | (r << 31)),
                (r = (r >>> 1) | (e << 31)),
                (e = (e >>> 1) | (t << 31)),
                (t = t >>> 1);
              if (d) t = t ^ 0xe1000000;
            }
            (h = l), (o = p), (c = w), (u = y);
          }
          function P(t) {
            t = t | 0;
            m = t;
          }
          function B(t, e, r, h) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            h = h | 0;
            (s = t), (i = e), (n = r), (a = h);
          }
          function z(t, e, r, s) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            s = s | 0;
            (h = t), (o = e), (c = r), (u = s);
          }
          function O(t, e, r, s) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            s = s | 0;
            (f = t), (l = e), (p = r), (w = s);
          }
          function q(t, e, r, s) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            s = s | 0;
            (y = t), (_ = e), (d = r), (A = s);
          }
          function L(t, e, r, s) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            s = s | 0;
            (w = (~A & w) | (A & s)),
              (p = (~d & p) | (d & r)),
              (l = (~_ & l) | (_ & e)),
              (f = (~y & f) | (y & t));
          }
          function R(t) {
            t = t | 0;
            if (t & 15) return -1;
            (S[t | 0] = s >>> 24),
              (S[t | 1] = (s >>> 16) & 255),
              (S[t | 2] = (s >>> 8) & 255),
              (S[t | 3] = s & 255),
              (S[t | 4] = i >>> 24),
              (S[t | 5] = (i >>> 16) & 255),
              (S[t | 6] = (i >>> 8) & 255),
              (S[t | 7] = i & 255),
              (S[t | 8] = n >>> 24),
              (S[t | 9] = (n >>> 16) & 255),
              (S[t | 10] = (n >>> 8) & 255),
              (S[t | 11] = n & 255),
              (S[t | 12] = a >>> 24),
              (S[t | 13] = (a >>> 16) & 255),
              (S[t | 14] = (a >>> 8) & 255),
              (S[t | 15] = a & 255);
            return 16;
          }
          function K(t) {
            t = t | 0;
            if (t & 15) return -1;
            (S[t | 0] = h >>> 24),
              (S[t | 1] = (h >>> 16) & 255),
              (S[t | 2] = (h >>> 8) & 255),
              (S[t | 3] = h & 255),
              (S[t | 4] = o >>> 24),
              (S[t | 5] = (o >>> 16) & 255),
              (S[t | 6] = (o >>> 8) & 255),
              (S[t | 7] = o & 255),
              (S[t | 8] = c >>> 24),
              (S[t | 9] = (c >>> 16) & 255),
              (S[t | 10] = (c >>> 8) & 255),
              (S[t | 11] = c & 255),
              (S[t | 12] = u >>> 24),
              (S[t | 13] = (u >>> 16) & 255),
              (S[t | 14] = (u >>> 8) & 255),
              (S[t | 15] = u & 255);
            return 16;
          }
          function N() {
            M(0, 0, 0, 0);
            (v = s), (x = i), (E = n), (g = a);
          }
          function F(t, e, r) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            var h = 0;
            if (e & 15) return -1;
            while ((r | 0) >= 16) {
              V[t & 7](
                (S[e | 0] << 24) |
                  (S[e | 1] << 16) |
                  (S[e | 2] << 8) |
                  S[e | 3],
                (S[e | 4] << 24) |
                  (S[e | 5] << 16) |
                  (S[e | 6] << 8) |
                  S[e | 7],
                (S[e | 8] << 24) |
                  (S[e | 9] << 16) |
                  (S[e | 10] << 8) |
                  S[e | 11],
                (S[e | 12] << 24) |
                  (S[e | 13] << 16) |
                  (S[e | 14] << 8) |
                  S[e | 15]
              );
              (S[e | 0] = s >>> 24),
                (S[e | 1] = (s >>> 16) & 255),
                (S[e | 2] = (s >>> 8) & 255),
                (S[e | 3] = s & 255),
                (S[e | 4] = i >>> 24),
                (S[e | 5] = (i >>> 16) & 255),
                (S[e | 6] = (i >>> 8) & 255),
                (S[e | 7] = i & 255),
                (S[e | 8] = n >>> 24),
                (S[e | 9] = (n >>> 16) & 255),
                (S[e | 10] = (n >>> 8) & 255),
                (S[e | 11] = n & 255),
                (S[e | 12] = a >>> 24),
                (S[e | 13] = (a >>> 16) & 255),
                (S[e | 14] = (a >>> 8) & 255),
                (S[e | 15] = a & 255);
              (h = (h + 16) | 0), (e = (e + 16) | 0), (r = (r - 16) | 0);
            }
            return h | 0;
          }
          function j(t, e, r) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            var s = 0;
            if (e & 15) return -1;
            while ((r | 0) >= 16) {
              W[t & 1](
                (S[e | 0] << 24) |
                  (S[e | 1] << 16) |
                  (S[e | 2] << 8) |
                  S[e | 3],
                (S[e | 4] << 24) |
                  (S[e | 5] << 16) |
                  (S[e | 6] << 8) |
                  S[e | 7],
                (S[e | 8] << 24) |
                  (S[e | 9] << 16) |
                  (S[e | 10] << 8) |
                  S[e | 11],
                (S[e | 12] << 24) |
                  (S[e | 13] << 16) |
                  (S[e | 14] << 8) |
                  S[e | 15]
              );
              (s = (s + 16) | 0), (e = (e + 16) | 0), (r = (r - 16) | 0);
            }
            return s | 0;
          }
          var V = [M, U, H, T, D, k, G, I];
          var W = [H, Z];
          return {
            set_rounds: P,
            set_state: B,
            set_iv: z,
            set_nonce: O,
            set_mask: q,
            set_counter: L,
            get_state: R,
            get_iv: K,
            gcm_init: N,
            cipher: F,
            mac: j
          };
        })({ Uint8Array: Uint8Array, Uint32Array: Uint32Array }, t, e);
        return (
          (c.set_key = function(t, e, s, n, a, o, u, f, l) {
            var p = r.subarray(0, 60),
              w = r.subarray(256, 316);
            p.set([e, s, n, a, o, u, f, l]);
            for (var y = t, _ = 1; y < 4 * t + 28; y++) {
              var d = p[y - 1];
              (y % t == 0 || (8 === t && y % t == 4)) &&
                (d =
                  (i[d >>> 24] << 24) ^
                  (i[(d >>> 16) & 255] << 16) ^
                  (i[(d >>> 8) & 255] << 8) ^
                  i[255 & d]),
                y % t == 0 &&
                  ((d = (d << 8) ^ (d >>> 24) ^ (_ << 24)),
                  (_ = (_ << 1) ^ (128 & _ ? 27 : 0))),
                (p[y] = p[y - t] ^ d);
            }
            for (var A = 0; A < y; A += 4)
              for (var v = 0; v < 4; v++)
                (d = p[y - (4 + A) + ((4 - v) % 4)]),
                  (w[A + v] =
                    A < 4 || A >= y - 4
                      ? d
                      : h[0][i[d >>> 24]] ^
                        h[1][i[(d >>> 16) & 255]] ^
                        h[2][i[(d >>> 8) & 255]] ^
                        h[3][i[255 & d]]);
            c.set_rounds(t + 5);
          }),
          c
        );
      };
      return (
        (c.ENC = { ECB: 0, CBC: 2, CFB: 4, OFB: 6, CTR: 7 }),
        (c.DEC = { ECB: 1, CBC: 3, CFB: 5, OFB: 6, CTR: 7 }),
        (c.MAC = { CBC: 0, GCM: 1 }),
        (c.HEAP_DATA = 16384),
        c
      );
    })(),
    r = new Uint8Array(1048576),
    s = e(null, r.buffer);
  function i() {
    var t = Error.apply(this, arguments);
    (this.message = t.message), (this.stack = t.stack);
  }
  function n() {
    var t = Error.apply(this, arguments);
    (this.message = t.message), (this.stack = t.stack);
  }
  function a() {
    var t = Error.apply(this, arguments);
    (this.message = t.message), (this.stack = t.stack);
  }
  function h(t, e) {
    e = !!e;
    for (
      var r = t.length, s = new Uint8Array(e ? 4 * r : r), i = 0, n = 0;
      i < r;
      i++
    ) {
      var a = t.charCodeAt(i);
      if (e && 55296 <= a && a <= 56319) {
        if (++i >= r)
          throw new Error(
            'Malformed string, low surrogate expected at position ' + i
          );
        a = ((55296 ^ a) << 10) | 65536 | (56320 ^ t.charCodeAt(i));
      } else if (!e && a >>> 8)
        throw new Error('Wide characters are not allowed.');
      !e || a <= 127
        ? (s[n++] = a)
        : a <= 2047
        ? ((s[n++] = 192 | (a >> 6)), (s[n++] = 128 | (63 & a)))
        : a <= 65535
        ? ((s[n++] = 224 | (a >> 12)),
          (s[n++] = 128 | ((a >> 6) & 63)),
          (s[n++] = 128 | (63 & a)))
        : ((s[n++] = 240 | (a >> 18)),
          (s[n++] = 128 | ((a >> 12) & 63)),
          (s[n++] = 128 | ((a >> 6) & 63)),
          (s[n++] = 128 | (63 & a)));
    }
    return s.subarray(0, n);
  }
  function o(t) {
    for (var e = '', r = 0; r < t.length; r++) {
      var s = (255 & t[r]).toString(16);
      s.length < 2 && (e += '0'), (e += s);
    }
    return e;
  }
  function c(t) {
    return btoa(
      (function(t, e) {
        e = !!e;
        for (var r = t.length, s = new Array(r), i = 0, n = 0; i < r; i++) {
          var a = t[i];
          if (!e || a < 128) s[n++] = a;
          else if (a >= 192 && a < 224 && i + 1 < r)
            s[n++] = ((31 & a) << 6) | (63 & t[++i]);
          else if (a >= 224 && a < 240 && i + 2 < r)
            s[n++] = ((15 & a) << 12) | ((63 & t[++i]) << 6) | (63 & t[++i]);
          else {
            if (!(a >= 240 && a < 248 && i + 3 < r))
              throw new Error('Malformed UTF8 character at byte offset ' + i);
            var h =
              ((7 & a) << 18) |
              ((63 & t[++i]) << 12) |
              ((63 & t[++i]) << 6) |
              (63 & t[++i]);
            h <= 65535
              ? (s[n++] = h)
              : ((h ^= 65536),
                (s[n++] = 55296 | (h >> 10)),
                (s[n++] = 56320 | (1023 & h)));
          }
        }
        var o = '';
        for (i = 0; i < n; i += 16384)
          o += String.fromCharCode.apply(
            String,
            s.slice(i, i + 16384 <= n ? i + 16384 : n)
          );
        return o;
      })(t)
    );
  }
  function u(t) {
    return 'number' == typeof t;
  }
  function f(t) {
    return 'string' == typeof t;
  }
  function l(t) {
    return t instanceof ArrayBuffer;
  }
  function p(t) {
    return t instanceof Uint8Array;
  }
  function w(t, e, r) {
    var s = e ? e.byteLength : r || 65536;
    if (4095 & s || s <= 0)
      throw new Error(
        'heap size must be a positive integer and a multiple of 4096'
      );
    return (e = e || new t(new ArrayBuffer(s)));
  }
  function y(t, e, r, s, i) {
    var n = t.length - e,
      a = n < i ? n : i;
    return t.set(r.subarray(s, s + a), e), a;
  }
  (i.prototype = Object.create(Error.prototype, {
    name: { value: 'IllegalStateError' }
  })),
    (n.prototype = Object.create(Error.prototype, {
      name: { value: 'IllegalArgumentError' }
    })),
    (a.prototype = Object.create(Error.prototype, {
      name: { value: 'SecurityError' }
    }));
  class _ {
    constructor(t, r, s, i, n) {
      (this.nonce = null),
        (this.counter = 0),
        (this.counterSize = 0),
        (this.heap = w(Uint8Array, i).subarray(e.HEAP_DATA)),
        (this.asm = n || e(null, this.heap.buffer)),
        (this.mode = null),
        (this.key = null),
        this.AES_reset(t, r, s);
    }
    AES_set_key(t) {
      if (void 0 !== t) {
        if (!p(t)) throw new TypeError('unexpected key type');
        var e = t.length;
        if (16 !== e && 24 !== e && 32 !== e) throw new n('illegal key size');
        var r = new DataView(t.buffer, t.byteOffset, t.byteLength);
        this.asm.set_key(
          e >> 2,
          r.getUint32(0),
          r.getUint32(4),
          r.getUint32(8),
          r.getUint32(12),
          e > 16 ? r.getUint32(16) : 0,
          e > 16 ? r.getUint32(20) : 0,
          e > 24 ? r.getUint32(24) : 0,
          e > 24 ? r.getUint32(28) : 0
        ),
          (this.key = t);
      } else if (!this.key) throw new Error('key is required');
    }
    AES_CTR_set_options(t, e, r) {
      if (void 0 !== r) {
        if (r < 8 || r > 48) throw new n('illegal counter size');
        this.counterSize = r;
        var s = Math.pow(2, r) - 1;
        this.asm.set_mask(0, 0, (s / 4294967296) | 0, 0 | s);
      } else (this.counterSize = r = 48), this.asm.set_mask(0, 0, 65535, 4294967295);
      if (void 0 === t) throw new Error('nonce is required');
      if (!p(t)) throw new TypeError('unexpected nonce type');
      var i = t.length;
      if (!i || i > 16) throw new n('illegal nonce size');
      this.nonce = t;
      var a = new DataView(new ArrayBuffer(16));
      if (
        (new Uint8Array(a.buffer).set(t),
        this.asm.set_nonce(
          a.getUint32(0),
          a.getUint32(4),
          a.getUint32(8),
          a.getUint32(12)
        ),
        void 0 !== e)
      ) {
        if (!u(e)) throw new TypeError('unexpected counter type');
        if (e < 0 || e >= Math.pow(2, r)) throw new n('illegal counter value');
        (this.counter = e),
          this.asm.set_counter(0, 0, (e / 4294967296) | 0, 0 | e);
      } else this.counter = 0;
    }
    AES_set_iv(t) {
      if (void 0 !== t) {
        if (!p(t)) throw new TypeError('unexpected iv type');
        if (16 !== t.length) throw new n('illegal iv size');
        var e = new DataView(t.buffer, t.byteOffset, t.byteLength);
        (this.iv = t),
          this.asm.set_iv(
            e.getUint32(0),
            e.getUint32(4),
            e.getUint32(8),
            e.getUint32(12)
          );
      } else (this.iv = null), this.asm.set_iv(0, 0, 0, 0);
    }
    AES_set_padding(t) {
      this.padding = void 0 === t || !!t;
    }
    AES_reset(t, e, r) {
      return (
        (this.result = null),
        (this.pos = 0),
        (this.len = 0),
        this.AES_set_key(t),
        this.AES_set_iv(e),
        this.AES_set_padding(r),
        this
      );
    }
    AES_Encrypt_process(t) {
      if (!p(t)) throw new TypeError("data isn't of expected type");
      for (
        var r = this.asm,
          s = this.heap,
          i = e.ENC[this.mode],
          n = e.HEAP_DATA,
          a = this.pos,
          h = this.len,
          o = 0,
          c = t.length || 0,
          u = 0,
          f = 0,
          l = new Uint8Array((h + c) & -16);
        c > 0;

      )
        (h += f = y(s, a + h, t, o, c)),
          (o += f),
          (c -= f),
          (f = r.cipher(i, n + a, h)) && l.set(s.subarray(a, a + f), u),
          (u += f),
          f < h ? ((a += f), (h -= f)) : ((a = 0), (h = 0));
      return (this.result = l), (this.pos = a), (this.len = h), this;
    }
    AES_Encrypt_finish(t) {
      var r = null,
        s = 0;
      void 0 !== t && (s = (r = this.AES_Encrypt_process(t).result).length);
      var i = this.asm,
        a = this.heap,
        h = e.ENC[this.mode],
        o = e.HEAP_DATA,
        c = this.pos,
        u = this.len,
        f = 16 - (u % 16),
        l = u;
      if (this.hasOwnProperty('padding')) {
        if (this.padding) {
          for (var p = 0; p < f; ++p) a[c + u + p] = f;
          l = u += f;
        } else if (u % 16)
          throw new n('data length must be a multiple of the block size');
      } else u += f;
      var w = new Uint8Array(s + l);
      return (
        s && w.set(r),
        u && i.cipher(h, o + c, u),
        l && w.set(a.subarray(c, c + l), s),
        (this.result = w),
        (this.pos = 0),
        (this.len = 0),
        this
      );
    }
    AES_Decrypt_process(t) {
      if (!p(t)) throw new TypeError("data isn't of expected type");
      var r = this.asm,
        s = this.heap,
        i = e.DEC[this.mode],
        n = e.HEAP_DATA,
        a = this.pos,
        h = this.len,
        o = 0,
        c = t.length || 0,
        u = 0,
        f = (h + c) & -16,
        l = 0,
        w = 0;
      this.padding && (f -= l = h + c - f || 16);
      for (var _ = new Uint8Array(f); c > 0; )
        (h += w = y(s, a + h, t, o, c)),
          (o += w),
          (c -= w),
          (w = r.cipher(i, n + a, h - (c ? 0 : l))) &&
            _.set(s.subarray(a, a + w), u),
          (u += w),
          w < h ? ((a += w), (h -= w)) : ((a = 0), (h = 0));
      return (this.result = _), (this.pos = a), (this.len = h), this;
    }
    AES_Decrypt_finish(t) {
      var r = null,
        s = 0;
      void 0 !== t && (s = (r = this.AES_Decrypt_process(t).result).length);
      var i = this.asm,
        h = this.heap,
        o = e.DEC[this.mode],
        c = e.HEAP_DATA,
        u = this.pos,
        f = this.len,
        l = f;
      if (f > 0) {
        if (f % 16) {
          if (this.hasOwnProperty('padding'))
            throw new n('data length must be a multiple of the block size');
          f += 16 - (f % 16);
        }
        if (
          (i.cipher(o, c + u, f),
          this.hasOwnProperty('padding') && this.padding)
        ) {
          var p = h[u + l - 1];
          if (p < 1 || p > 16 || p > l) throw new a('bad padding');
          for (var w = 0, y = p; y > 1; y--) w |= p ^ h[u + l - y];
          if (w) throw new a('bad padding');
          l -= p;
        }
      }
      var _ = new Uint8Array(s + l);
      return (
        s > 0 && _.set(r),
        l > 0 && _.set(h.subarray(u, u + l), s),
        (this.result = _),
        (this.pos = 0),
        (this.len = 0),
        this
      );
    }
  }
  var d = 68719476704;
  class A extends _ {
    constructor(t, e, r, s, i, n) {
      super(t, void 0, !1, i, n),
        (this.nonce = null),
        (this.adata = null),
        (this.iv = null),
        (this.counter = 1),
        (this.tagSize = 16),
        (this.mode = 'GCM'),
        (this.BLOCK_SIZE = 16),
        this.reset(t, s, e, r);
    }
    reset(t, e, r, s) {
      return this.AES_GCM_reset(t, e, r, s);
    }
    encrypt(t) {
      return this.AES_GCM_encrypt(t);
    }
    decrypt(t) {
      return this.AES_GCM_decrypt(t);
    }
    AES_GCM_Encrypt_process(t) {
      if (!p(t)) throw new TypeError("data isn't of expected type");
      var r = 0,
        s = t.length || 0,
        i = this.asm,
        n = this.heap,
        a = this.counter,
        h = this.pos,
        o = this.len,
        c = 0,
        u = (o + s) & -16,
        f = 0;
      if (((a - 1) << 4) + o + s > d) throw new RangeError('counter overflow');
      for (var l = new Uint8Array(u); s > 0; )
        (o += f = y(n, h + o, t, r, s)),
          (r += f),
          (s -= f),
          (f = i.cipher(e.ENC.CTR, e.HEAP_DATA + h, o)),
          (f = i.mac(e.MAC.GCM, e.HEAP_DATA + h, f)) &&
            l.set(n.subarray(h, h + f), c),
          (a += f >>> 4),
          (c += f),
          f < o ? ((h += f), (o -= f)) : ((h = 0), (o = 0));
      return (
        (this.result = l),
        (this.counter = a),
        (this.pos = h),
        (this.len = o),
        this
      );
    }
    AES_GCM_Encrypt_finish() {
      var t = this.asm,
        r = this.heap,
        s = this.counter,
        i = this.tagSize,
        n = this.adata,
        a = this.pos,
        h = this.len,
        o = new Uint8Array(h + i);
      t.cipher(e.ENC.CTR, e.HEAP_DATA + a, (h + 15) & -16),
        h && o.set(r.subarray(a, a + h));
      for (var c = h; 15 & c; c++) r[a + c] = 0;
      t.mac(e.MAC.GCM, e.HEAP_DATA + a, c);
      var u = null !== n ? n.length : 0,
        f = ((s - 1) << 4) + h;
      return (
        (r[0] = r[1] = r[2] = 0),
        (r[3] = u >>> 29),
        (r[4] = u >>> 21),
        (r[5] = (u >>> 13) & 255),
        (r[6] = (u >>> 5) & 255),
        (r[7] = (u << 3) & 255),
        (r[8] = r[9] = r[10] = 0),
        (r[11] = f >>> 29),
        (r[12] = (f >>> 21) & 255),
        (r[13] = (f >>> 13) & 255),
        (r[14] = (f >>> 5) & 255),
        (r[15] = (f << 3) & 255),
        t.mac(e.MAC.GCM, e.HEAP_DATA, 16),
        t.get_iv(e.HEAP_DATA),
        t.set_counter(0, 0, 0, this.gamma0),
        t.cipher(e.ENC.CTR, e.HEAP_DATA, 16),
        o.set(r.subarray(0, i), h),
        (this.result = o),
        (this.counter = 1),
        (this.pos = 0),
        (this.len = 0),
        this
      );
    }
    AES_GCM_Decrypt_process(t) {
      if (!p(t)) throw new TypeError("data isn't of expected type");
      var r = 0,
        s = t.length || 0,
        i = this.asm,
        n = this.heap,
        a = this.counter,
        h = this.tagSize,
        o = this.pos,
        c = this.len,
        u = 0,
        f = c + s > h ? (c + s - h) & -16 : 0,
        l = c + s - f,
        w = 0;
      if (((a - 1) << 4) + c + s > d) throw new RangeError('counter overflow');
      for (var _ = new Uint8Array(f); s > l; )
        (c += w = y(n, o + c, t, r, s - l)),
          (r += w),
          (s -= w),
          (w = i.mac(e.MAC.GCM, e.HEAP_DATA + o, w)),
          (w = i.cipher(e.DEC.CTR, e.HEAP_DATA + o, w)) &&
            _.set(n.subarray(o, o + w), u),
          (a += w >>> 4),
          (u += w),
          (o = 0),
          (c = 0);
      return (
        s > 0 && (c += y(n, 0, t, r, s)),
        (this.result = _),
        (this.counter = a),
        (this.pos = o),
        (this.len = c),
        this
      );
    }
    AES_GCM_Decrypt_finish() {
      var t = this.asm,
        r = this.heap,
        s = this.tagSize,
        n = this.adata,
        h = this.counter,
        o = this.pos,
        c = this.len,
        u = c - s;
      if (c < s) throw new i('authentication tag not found');
      for (
        var f = new Uint8Array(u),
          l = new Uint8Array(r.subarray(o + u, o + c)),
          p = u;
        15 & p;
        p++
      )
        r[o + p] = 0;
      t.mac(e.MAC.GCM, e.HEAP_DATA + o, p),
        t.cipher(e.DEC.CTR, e.HEAP_DATA + o, p),
        u && f.set(r.subarray(o, o + u));
      var w = null !== n ? n.length : 0,
        y = ((h - 1) << 4) + c - s;
      (r[0] = r[1] = r[2] = 0),
        (r[3] = w >>> 29),
        (r[4] = w >>> 21),
        (r[5] = (w >>> 13) & 255),
        (r[6] = (w >>> 5) & 255),
        (r[7] = (w << 3) & 255),
        (r[8] = r[9] = r[10] = 0),
        (r[11] = y >>> 29),
        (r[12] = (y >>> 21) & 255),
        (r[13] = (y >>> 13) & 255),
        (r[14] = (y >>> 5) & 255),
        (r[15] = (y << 3) & 255),
        t.mac(e.MAC.GCM, e.HEAP_DATA, 16),
        t.get_iv(e.HEAP_DATA),
        t.set_counter(0, 0, 0, this.gamma0),
        t.cipher(e.ENC.CTR, e.HEAP_DATA, 16);
      var _ = 0;
      for (p = 0; p < s; ++p) _ |= l[p] ^ r[p];
      if (_) throw new a('data integrity check failed');
      return (
        (this.result = f),
        (this.counter = 1),
        (this.pos = 0),
        (this.len = 0),
        this
      );
    }
    AES_GCM_decrypt(t) {
      var e = this.AES_GCM_Decrypt_process(t).result,
        r = this.AES_GCM_Decrypt_finish().result,
        s = new Uint8Array(e.length + r.length);
      return (
        e.length && s.set(e),
        r.length && s.set(r, e.length),
        (this.result = s),
        this
      );
    }
    AES_GCM_encrypt(t) {
      var e = this.AES_GCM_Encrypt_process(t).result,
        r = this.AES_GCM_Encrypt_finish().result,
        s = new Uint8Array(e.length + r.length);
      return (
        e.length && s.set(e),
        r.length && s.set(r, e.length),
        (this.result = s),
        this
      );
    }
    AES_GCM_reset(t, r, s, i, a, h) {
      this.AES_reset(t, void 0, !1);
      var o = this.asm,
        c = this.heap;
      if ((o.gcm_init(), void 0 !== (r = r))) {
        if (!u(r)) throw new TypeError('tagSize must be a number');
        if (r < 4 || r > 16) throw new n('illegal tagSize value');
        this.tagSize = r;
      } else this.tagSize = 16;
      if (void 0 === s) throw new Error('nonce is required');
      if (!p(s)) throw new TypeError('unexpected nonce type');
      this.nonce = s;
      var f = s.length || 0,
        l = new Uint8Array(16);
      12 !== f
        ? (this._gcm_mac_process(s),
          (c[0] = c[1] = c[2] = c[3] = c[4] = c[5] = c[6] = c[7] = c[8] = c[9] = c[10] = 0),
          (c[11] = f >>> 29),
          (c[12] = (f >>> 21) & 255),
          (c[13] = (f >>> 13) & 255),
          (c[14] = (f >>> 5) & 255),
          (c[15] = (f << 3) & 255),
          o.mac(e.MAC.GCM, e.HEAP_DATA, 16),
          o.get_iv(e.HEAP_DATA),
          o.set_iv(),
          l.set(c.subarray(0, 16)))
        : (l.set(s), (l[15] = 1));
      var w = new DataView(l.buffer);
      if (
        ((this.gamma0 = w.getUint32(12)),
        o.set_nonce(w.getUint32(0), w.getUint32(4), w.getUint32(8), 0),
        o.set_mask(0, 0, 0, 4294967295),
        void 0 !== i && null !== i)
      ) {
        if (!p(i)) throw new TypeError('unexpected adata type');
        if (i.length > d) throw new n('illegal adata length');
        i.length
          ? ((this.adata = i), this._gcm_mac_process(i))
          : (this.adata = null);
      } else this.adata = null;
      if (void 0 !== a) {
        if (!u(a)) throw new TypeError('counter must be a number');
        if (a < 1 || a > 4294967295)
          throw new RangeError('counter must be a positive 32-bit integer');
        (this.counter = a), o.set_counter(0, 0, 0, (this.gamma0 + a) | 0);
      } else (this.counter = 1), o.set_counter(0, 0, 0, (this.gamma0 + 1) | 0);
      if (void 0 !== h) {
        if (!u(h)) throw new TypeError('iv must be a number');
        (this.iv = h), this.AES_set_iv(h);
      }
      return this;
    }
    _gcm_mac_process(t) {
      for (
        var r = this.heap, s = this.asm, i = 0, n = t.length || 0, a = 0;
        n > 0;

      ) {
        for (i += a = y(r, 0, t, i, n), n -= a; 15 & a; ) r[a++] = 0;
        s.mac(e.MAC.GCM, e.HEAP_DATA, a);
      }
    }
  }
  (A.encrypt = function(t, e, i, n, a) {
    if (void 0 === t) throw new SyntaxError('data required');
    if (void 0 === e) throw new SyntaxError('key required');
    if (void 0 === i) throw new SyntaxError('nonce required');
    return new A(e, i, n, a, r, s).encrypt(t).result;
  }),
    (A.decrypt = function(t, e, i, n, a) {
      if (void 0 === t) throw new SyntaxError('data required');
      if (void 0 === e) throw new SyntaxError('key required');
      if (void 0 === i) throw new SyntaxError('nonce required');
      return new A(e, i, n, a, r, s).decrypt(t).result;
    });
  class v {
    constructor(t) {
      if (!(t = t || {}).hash)
        throw new SyntaxError("option 'hash' is required");
      if (!t.hash.HASH_SIZE)
        throw new SyntaxError(
          "option 'hash' supplied doesn't seem to be a valid hash function"
        );
      return (
        (this.hash = t.hash),
        (this.BLOCK_SIZE = this.hash.BLOCK_SIZE),
        (this.HMAC_SIZE = this.hash.HASH_SIZE),
        (this.key = null),
        (this.verify = null),
        (this.result = null),
        (void 0 === t.password && void 0 === t.verify) || this.reset(t),
        this
      );
    }
    reset(t) {
      var e = (t = t || {}).password;
      if (null === this.key && !f(e) && !e)
        throw new i('no key is associated with the instance');
      (this.result = null),
        this.hash.reset(),
        (e || f(e)) && (this.key = x(this.hash, e));
      for (var r = new Uint8Array(this.key), s = 0; s < r.length; ++s)
        r[s] ^= 54;
      this.hash.process(r);
      var n = t.verify;
      return (
        void 0 !== n ? this._hmac_init_verify(n) : (this.verify = null), this
      );
    }
    process(t) {
      if (null === this.key)
        throw new i('no key is associated with the instance');
      if (null !== this.result)
        throw new i('state must be reset before processing new data');
      return this.hash.process(t), this;
    }
    finish() {
      if (null === this.key)
        throw new i('no key is associated with the instance');
      if (null !== this.result)
        throw new i('state must be reset before processing new data');
      for (
        var t = this.hash.finish().result, e = new Uint8Array(this.key), r = 0;
        r < e.length;
        ++r
      )
        e[r] ^= 92;
      var s = this.verify,
        n = this.hash
          .reset()
          .process(e)
          .process(t)
          .finish().result;
      if (s)
        if (s.length === n.length) {
          var a = 0;
          for (r = 0; r < s.length; r++) a |= s[r] ^ n[r];
          this.result = !a;
        } else this.result = !1;
      else this.result = n;
      return this;
    }
    _hmac_init_verify(t) {
      if (l(t) || p(t)) t = new Uint8Array(t);
      else {
        if (!f(t)) throw new TypeError("verify tag isn't of expected type");
        t = h(t);
      }
      if (t.length !== this.HMAC_SIZE)
        throw new n('illegal verification tag size');
      this.verify = t;
    }
  }
  function x(t, e) {
    if ((l(e) && (e = new Uint8Array(e)), f(e) && (e = h(e)), !p(e)))
      throw new TypeError("password isn't of expected type");
    var r = new Uint8Array(t.BLOCK_SIZE);
    return (
      e.length > t.BLOCK_SIZE
        ? r.set(
            t
              .reset()
              .process(e)
              .finish().result
          )
        : r.set(e),
      r
    );
  }
  var E = 64,
    g = 32;
  function m(t) {
    (t = t || {}),
      (this.heap = w(Uint8Array, t.heap)),
      (this.asm =
        t.asm ||
        (function(t, e, r) {
          'use asm';
          var s = 0,
            i = 0,
            n = 0,
            a = 0,
            h = 0,
            o = 0,
            c = 0,
            u = 0,
            f = 0,
            l = 0,
            p = 0,
            w = 0,
            y = 0,
            _ = 0,
            d = 0,
            A = 0,
            v = 0,
            x = 0,
            E = 0,
            g = 0,
            m = 0,
            b = 0,
            S = 0,
            C = 0,
            M = 0,
            U = 0,
            H = new t.Uint8Array(r);
          function T(t, e, r, f, l, p, w, y, _, d, A, v, x, E, g, m) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            f = f | 0;
            l = l | 0;
            p = p | 0;
            w = w | 0;
            y = y | 0;
            _ = _ | 0;
            d = d | 0;
            A = A | 0;
            v = v | 0;
            x = x | 0;
            E = E | 0;
            g = g | 0;
            m = m | 0;
            var b = 0,
              S = 0,
              C = 0,
              M = 0,
              U = 0,
              H = 0,
              T = 0,
              D = 0;
            b = s;
            S = i;
            C = n;
            M = a;
            U = h;
            H = o;
            T = c;
            D = u;
            D =
              (t +
                D +
                ((U >>> 6) ^
                  (U >>> 11) ^
                  (U >>> 25) ^
                  (U << 26) ^
                  (U << 21) ^
                  (U << 7)) +
                (T ^ (U & (H ^ T))) +
                0x428a2f98) |
              0;
            M = (M + D) | 0;
            D =
              (D +
                ((b & S) ^ (C & (b ^ S))) +
                ((b >>> 2) ^
                  (b >>> 13) ^
                  (b >>> 22) ^
                  (b << 30) ^
                  (b << 19) ^
                  (b << 10))) |
              0;
            T =
              (e +
                T +
                ((M >>> 6) ^
                  (M >>> 11) ^
                  (M >>> 25) ^
                  (M << 26) ^
                  (M << 21) ^
                  (M << 7)) +
                (H ^ (M & (U ^ H))) +
                0x71374491) |
              0;
            C = (C + T) | 0;
            T =
              (T +
                ((D & b) ^ (S & (D ^ b))) +
                ((D >>> 2) ^
                  (D >>> 13) ^
                  (D >>> 22) ^
                  (D << 30) ^
                  (D << 19) ^
                  (D << 10))) |
              0;
            H =
              (r +
                H +
                ((C >>> 6) ^
                  (C >>> 11) ^
                  (C >>> 25) ^
                  (C << 26) ^
                  (C << 21) ^
                  (C << 7)) +
                (U ^ (C & (M ^ U))) +
                0xb5c0fbcf) |
              0;
            S = (S + H) | 0;
            H =
              (H +
                ((T & D) ^ (b & (T ^ D))) +
                ((T >>> 2) ^
                  (T >>> 13) ^
                  (T >>> 22) ^
                  (T << 30) ^
                  (T << 19) ^
                  (T << 10))) |
              0;
            U =
              (f +
                U +
                ((S >>> 6) ^
                  (S >>> 11) ^
                  (S >>> 25) ^
                  (S << 26) ^
                  (S << 21) ^
                  (S << 7)) +
                (M ^ (S & (C ^ M))) +
                0xe9b5dba5) |
              0;
            b = (b + U) | 0;
            U =
              (U +
                ((H & T) ^ (D & (H ^ T))) +
                ((H >>> 2) ^
                  (H >>> 13) ^
                  (H >>> 22) ^
                  (H << 30) ^
                  (H << 19) ^
                  (H << 10))) |
              0;
            M =
              (l +
                M +
                ((b >>> 6) ^
                  (b >>> 11) ^
                  (b >>> 25) ^
                  (b << 26) ^
                  (b << 21) ^
                  (b << 7)) +
                (C ^ (b & (S ^ C))) +
                0x3956c25b) |
              0;
            D = (D + M) | 0;
            M =
              (M +
                ((U & H) ^ (T & (U ^ H))) +
                ((U >>> 2) ^
                  (U >>> 13) ^
                  (U >>> 22) ^
                  (U << 30) ^
                  (U << 19) ^
                  (U << 10))) |
              0;
            C =
              (p +
                C +
                ((D >>> 6) ^
                  (D >>> 11) ^
                  (D >>> 25) ^
                  (D << 26) ^
                  (D << 21) ^
                  (D << 7)) +
                (S ^ (D & (b ^ S))) +
                0x59f111f1) |
              0;
            T = (T + C) | 0;
            C =
              (C +
                ((M & U) ^ (H & (M ^ U))) +
                ((M >>> 2) ^
                  (M >>> 13) ^
                  (M >>> 22) ^
                  (M << 30) ^
                  (M << 19) ^
                  (M << 10))) |
              0;
            S =
              (w +
                S +
                ((T >>> 6) ^
                  (T >>> 11) ^
                  (T >>> 25) ^
                  (T << 26) ^
                  (T << 21) ^
                  (T << 7)) +
                (b ^ (T & (D ^ b))) +
                0x923f82a4) |
              0;
            H = (H + S) | 0;
            S =
              (S +
                ((C & M) ^ (U & (C ^ M))) +
                ((C >>> 2) ^
                  (C >>> 13) ^
                  (C >>> 22) ^
                  (C << 30) ^
                  (C << 19) ^
                  (C << 10))) |
              0;
            b =
              (y +
                b +
                ((H >>> 6) ^
                  (H >>> 11) ^
                  (H >>> 25) ^
                  (H << 26) ^
                  (H << 21) ^
                  (H << 7)) +
                (D ^ (H & (T ^ D))) +
                0xab1c5ed5) |
              0;
            U = (U + b) | 0;
            b =
              (b +
                ((S & C) ^ (M & (S ^ C))) +
                ((S >>> 2) ^
                  (S >>> 13) ^
                  (S >>> 22) ^
                  (S << 30) ^
                  (S << 19) ^
                  (S << 10))) |
              0;
            D =
              (_ +
                D +
                ((U >>> 6) ^
                  (U >>> 11) ^
                  (U >>> 25) ^
                  (U << 26) ^
                  (U << 21) ^
                  (U << 7)) +
                (T ^ (U & (H ^ T))) +
                0xd807aa98) |
              0;
            M = (M + D) | 0;
            D =
              (D +
                ((b & S) ^ (C & (b ^ S))) +
                ((b >>> 2) ^
                  (b >>> 13) ^
                  (b >>> 22) ^
                  (b << 30) ^
                  (b << 19) ^
                  (b << 10))) |
              0;
            T =
              (d +
                T +
                ((M >>> 6) ^
                  (M >>> 11) ^
                  (M >>> 25) ^
                  (M << 26) ^
                  (M << 21) ^
                  (M << 7)) +
                (H ^ (M & (U ^ H))) +
                0x12835b01) |
              0;
            C = (C + T) | 0;
            T =
              (T +
                ((D & b) ^ (S & (D ^ b))) +
                ((D >>> 2) ^
                  (D >>> 13) ^
                  (D >>> 22) ^
                  (D << 30) ^
                  (D << 19) ^
                  (D << 10))) |
              0;
            H =
              (A +
                H +
                ((C >>> 6) ^
                  (C >>> 11) ^
                  (C >>> 25) ^
                  (C << 26) ^
                  (C << 21) ^
                  (C << 7)) +
                (U ^ (C & (M ^ U))) +
                0x243185be) |
              0;
            S = (S + H) | 0;
            H =
              (H +
                ((T & D) ^ (b & (T ^ D))) +
                ((T >>> 2) ^
                  (T >>> 13) ^
                  (T >>> 22) ^
                  (T << 30) ^
                  (T << 19) ^
                  (T << 10))) |
              0;
            U =
              (v +
                U +
                ((S >>> 6) ^
                  (S >>> 11) ^
                  (S >>> 25) ^
                  (S << 26) ^
                  (S << 21) ^
                  (S << 7)) +
                (M ^ (S & (C ^ M))) +
                0x550c7dc3) |
              0;
            b = (b + U) | 0;
            U =
              (U +
                ((H & T) ^ (D & (H ^ T))) +
                ((H >>> 2) ^
                  (H >>> 13) ^
                  (H >>> 22) ^
                  (H << 30) ^
                  (H << 19) ^
                  (H << 10))) |
              0;
            M =
              (x +
                M +
                ((b >>> 6) ^
                  (b >>> 11) ^
                  (b >>> 25) ^
                  (b << 26) ^
                  (b << 21) ^
                  (b << 7)) +
                (C ^ (b & (S ^ C))) +
                0x72be5d74) |
              0;
            D = (D + M) | 0;
            M =
              (M +
                ((U & H) ^ (T & (U ^ H))) +
                ((U >>> 2) ^
                  (U >>> 13) ^
                  (U >>> 22) ^
                  (U << 30) ^
                  (U << 19) ^
                  (U << 10))) |
              0;
            C =
              (E +
                C +
                ((D >>> 6) ^
                  (D >>> 11) ^
                  (D >>> 25) ^
                  (D << 26) ^
                  (D << 21) ^
                  (D << 7)) +
                (S ^ (D & (b ^ S))) +
                0x80deb1fe) |
              0;
            T = (T + C) | 0;
            C =
              (C +
                ((M & U) ^ (H & (M ^ U))) +
                ((M >>> 2) ^
                  (M >>> 13) ^
                  (M >>> 22) ^
                  (M << 30) ^
                  (M << 19) ^
                  (M << 10))) |
              0;
            S =
              (g +
                S +
                ((T >>> 6) ^
                  (T >>> 11) ^
                  (T >>> 25) ^
                  (T << 26) ^
                  (T << 21) ^
                  (T << 7)) +
                (b ^ (T & (D ^ b))) +
                0x9bdc06a7) |
              0;
            H = (H + S) | 0;
            S =
              (S +
                ((C & M) ^ (U & (C ^ M))) +
                ((C >>> 2) ^
                  (C >>> 13) ^
                  (C >>> 22) ^
                  (C << 30) ^
                  (C << 19) ^
                  (C << 10))) |
              0;
            b =
              (m +
                b +
                ((H >>> 6) ^
                  (H >>> 11) ^
                  (H >>> 25) ^
                  (H << 26) ^
                  (H << 21) ^
                  (H << 7)) +
                (D ^ (H & (T ^ D))) +
                0xc19bf174) |
              0;
            U = (U + b) | 0;
            b =
              (b +
                ((S & C) ^ (M & (S ^ C))) +
                ((S >>> 2) ^
                  (S >>> 13) ^
                  (S >>> 22) ^
                  (S << 30) ^
                  (S << 19) ^
                  (S << 10))) |
              0;
            t =
              (((e >>> 7) ^ (e >>> 18) ^ (e >>> 3) ^ (e << 25) ^ (e << 14)) +
                ((g >>> 17) ^ (g >>> 19) ^ (g >>> 10) ^ (g << 15) ^ (g << 13)) +
                t +
                d) |
              0;
            D =
              (t +
                D +
                ((U >>> 6) ^
                  (U >>> 11) ^
                  (U >>> 25) ^
                  (U << 26) ^
                  (U << 21) ^
                  (U << 7)) +
                (T ^ (U & (H ^ T))) +
                0xe49b69c1) |
              0;
            M = (M + D) | 0;
            D =
              (D +
                ((b & S) ^ (C & (b ^ S))) +
                ((b >>> 2) ^
                  (b >>> 13) ^
                  (b >>> 22) ^
                  (b << 30) ^
                  (b << 19) ^
                  (b << 10))) |
              0;
            e =
              (((r >>> 7) ^ (r >>> 18) ^ (r >>> 3) ^ (r << 25) ^ (r << 14)) +
                ((m >>> 17) ^ (m >>> 19) ^ (m >>> 10) ^ (m << 15) ^ (m << 13)) +
                e +
                A) |
              0;
            T =
              (e +
                T +
                ((M >>> 6) ^
                  (M >>> 11) ^
                  (M >>> 25) ^
                  (M << 26) ^
                  (M << 21) ^
                  (M << 7)) +
                (H ^ (M & (U ^ H))) +
                0xefbe4786) |
              0;
            C = (C + T) | 0;
            T =
              (T +
                ((D & b) ^ (S & (D ^ b))) +
                ((D >>> 2) ^
                  (D >>> 13) ^
                  (D >>> 22) ^
                  (D << 30) ^
                  (D << 19) ^
                  (D << 10))) |
              0;
            r =
              (((f >>> 7) ^ (f >>> 18) ^ (f >>> 3) ^ (f << 25) ^ (f << 14)) +
                ((t >>> 17) ^ (t >>> 19) ^ (t >>> 10) ^ (t << 15) ^ (t << 13)) +
                r +
                v) |
              0;
            H =
              (r +
                H +
                ((C >>> 6) ^
                  (C >>> 11) ^
                  (C >>> 25) ^
                  (C << 26) ^
                  (C << 21) ^
                  (C << 7)) +
                (U ^ (C & (M ^ U))) +
                0x0fc19dc6) |
              0;
            S = (S + H) | 0;
            H =
              (H +
                ((T & D) ^ (b & (T ^ D))) +
                ((T >>> 2) ^
                  (T >>> 13) ^
                  (T >>> 22) ^
                  (T << 30) ^
                  (T << 19) ^
                  (T << 10))) |
              0;
            f =
              (((l >>> 7) ^ (l >>> 18) ^ (l >>> 3) ^ (l << 25) ^ (l << 14)) +
                ((e >>> 17) ^ (e >>> 19) ^ (e >>> 10) ^ (e << 15) ^ (e << 13)) +
                f +
                x) |
              0;
            U =
              (f +
                U +
                ((S >>> 6) ^
                  (S >>> 11) ^
                  (S >>> 25) ^
                  (S << 26) ^
                  (S << 21) ^
                  (S << 7)) +
                (M ^ (S & (C ^ M))) +
                0x240ca1cc) |
              0;
            b = (b + U) | 0;
            U =
              (U +
                ((H & T) ^ (D & (H ^ T))) +
                ((H >>> 2) ^
                  (H >>> 13) ^
                  (H >>> 22) ^
                  (H << 30) ^
                  (H << 19) ^
                  (H << 10))) |
              0;
            l =
              (((p >>> 7) ^ (p >>> 18) ^ (p >>> 3) ^ (p << 25) ^ (p << 14)) +
                ((r >>> 17) ^ (r >>> 19) ^ (r >>> 10) ^ (r << 15) ^ (r << 13)) +
                l +
                E) |
              0;
            M =
              (l +
                M +
                ((b >>> 6) ^
                  (b >>> 11) ^
                  (b >>> 25) ^
                  (b << 26) ^
                  (b << 21) ^
                  (b << 7)) +
                (C ^ (b & (S ^ C))) +
                0x2de92c6f) |
              0;
            D = (D + M) | 0;
            M =
              (M +
                ((U & H) ^ (T & (U ^ H))) +
                ((U >>> 2) ^
                  (U >>> 13) ^
                  (U >>> 22) ^
                  (U << 30) ^
                  (U << 19) ^
                  (U << 10))) |
              0;
            p =
              (((w >>> 7) ^ (w >>> 18) ^ (w >>> 3) ^ (w << 25) ^ (w << 14)) +
                ((f >>> 17) ^ (f >>> 19) ^ (f >>> 10) ^ (f << 15) ^ (f << 13)) +
                p +
                g) |
              0;
            C =
              (p +
                C +
                ((D >>> 6) ^
                  (D >>> 11) ^
                  (D >>> 25) ^
                  (D << 26) ^
                  (D << 21) ^
                  (D << 7)) +
                (S ^ (D & (b ^ S))) +
                0x4a7484aa) |
              0;
            T = (T + C) | 0;
            C =
              (C +
                ((M & U) ^ (H & (M ^ U))) +
                ((M >>> 2) ^
                  (M >>> 13) ^
                  (M >>> 22) ^
                  (M << 30) ^
                  (M << 19) ^
                  (M << 10))) |
              0;
            w =
              (((y >>> 7) ^ (y >>> 18) ^ (y >>> 3) ^ (y << 25) ^ (y << 14)) +
                ((l >>> 17) ^ (l >>> 19) ^ (l >>> 10) ^ (l << 15) ^ (l << 13)) +
                w +
                m) |
              0;
            S =
              (w +
                S +
                ((T >>> 6) ^
                  (T >>> 11) ^
                  (T >>> 25) ^
                  (T << 26) ^
                  (T << 21) ^
                  (T << 7)) +
                (b ^ (T & (D ^ b))) +
                0x5cb0a9dc) |
              0;
            H = (H + S) | 0;
            S =
              (S +
                ((C & M) ^ (U & (C ^ M))) +
                ((C >>> 2) ^
                  (C >>> 13) ^
                  (C >>> 22) ^
                  (C << 30) ^
                  (C << 19) ^
                  (C << 10))) |
              0;
            y =
              (((_ >>> 7) ^ (_ >>> 18) ^ (_ >>> 3) ^ (_ << 25) ^ (_ << 14)) +
                ((p >>> 17) ^ (p >>> 19) ^ (p >>> 10) ^ (p << 15) ^ (p << 13)) +
                y +
                t) |
              0;
            b =
              (y +
                b +
                ((H >>> 6) ^
                  (H >>> 11) ^
                  (H >>> 25) ^
                  (H << 26) ^
                  (H << 21) ^
                  (H << 7)) +
                (D ^ (H & (T ^ D))) +
                0x76f988da) |
              0;
            U = (U + b) | 0;
            b =
              (b +
                ((S & C) ^ (M & (S ^ C))) +
                ((S >>> 2) ^
                  (S >>> 13) ^
                  (S >>> 22) ^
                  (S << 30) ^
                  (S << 19) ^
                  (S << 10))) |
              0;
            _ =
              (((d >>> 7) ^ (d >>> 18) ^ (d >>> 3) ^ (d << 25) ^ (d << 14)) +
                ((w >>> 17) ^ (w >>> 19) ^ (w >>> 10) ^ (w << 15) ^ (w << 13)) +
                _ +
                e) |
              0;
            D =
              (_ +
                D +
                ((U >>> 6) ^
                  (U >>> 11) ^
                  (U >>> 25) ^
                  (U << 26) ^
                  (U << 21) ^
                  (U << 7)) +
                (T ^ (U & (H ^ T))) +
                0x983e5152) |
              0;
            M = (M + D) | 0;
            D =
              (D +
                ((b & S) ^ (C & (b ^ S))) +
                ((b >>> 2) ^
                  (b >>> 13) ^
                  (b >>> 22) ^
                  (b << 30) ^
                  (b << 19) ^
                  (b << 10))) |
              0;
            d =
              (((A >>> 7) ^ (A >>> 18) ^ (A >>> 3) ^ (A << 25) ^ (A << 14)) +
                ((y >>> 17) ^ (y >>> 19) ^ (y >>> 10) ^ (y << 15) ^ (y << 13)) +
                d +
                r) |
              0;
            T =
              (d +
                T +
                ((M >>> 6) ^
                  (M >>> 11) ^
                  (M >>> 25) ^
                  (M << 26) ^
                  (M << 21) ^
                  (M << 7)) +
                (H ^ (M & (U ^ H))) +
                0xa831c66d) |
              0;
            C = (C + T) | 0;
            T =
              (T +
                ((D & b) ^ (S & (D ^ b))) +
                ((D >>> 2) ^
                  (D >>> 13) ^
                  (D >>> 22) ^
                  (D << 30) ^
                  (D << 19) ^
                  (D << 10))) |
              0;
            A =
              (((v >>> 7) ^ (v >>> 18) ^ (v >>> 3) ^ (v << 25) ^ (v << 14)) +
                ((_ >>> 17) ^ (_ >>> 19) ^ (_ >>> 10) ^ (_ << 15) ^ (_ << 13)) +
                A +
                f) |
              0;
            H =
              (A +
                H +
                ((C >>> 6) ^
                  (C >>> 11) ^
                  (C >>> 25) ^
                  (C << 26) ^
                  (C << 21) ^
                  (C << 7)) +
                (U ^ (C & (M ^ U))) +
                0xb00327c8) |
              0;
            S = (S + H) | 0;
            H =
              (H +
                ((T & D) ^ (b & (T ^ D))) +
                ((T >>> 2) ^
                  (T >>> 13) ^
                  (T >>> 22) ^
                  (T << 30) ^
                  (T << 19) ^
                  (T << 10))) |
              0;
            v =
              (((x >>> 7) ^ (x >>> 18) ^ (x >>> 3) ^ (x << 25) ^ (x << 14)) +
                ((d >>> 17) ^ (d >>> 19) ^ (d >>> 10) ^ (d << 15) ^ (d << 13)) +
                v +
                l) |
              0;
            U =
              (v +
                U +
                ((S >>> 6) ^
                  (S >>> 11) ^
                  (S >>> 25) ^
                  (S << 26) ^
                  (S << 21) ^
                  (S << 7)) +
                (M ^ (S & (C ^ M))) +
                0xbf597fc7) |
              0;
            b = (b + U) | 0;
            U =
              (U +
                ((H & T) ^ (D & (H ^ T))) +
                ((H >>> 2) ^
                  (H >>> 13) ^
                  (H >>> 22) ^
                  (H << 30) ^
                  (H << 19) ^
                  (H << 10))) |
              0;
            x =
              (((E >>> 7) ^ (E >>> 18) ^ (E >>> 3) ^ (E << 25) ^ (E << 14)) +
                ((A >>> 17) ^ (A >>> 19) ^ (A >>> 10) ^ (A << 15) ^ (A << 13)) +
                x +
                p) |
              0;
            M =
              (x +
                M +
                ((b >>> 6) ^
                  (b >>> 11) ^
                  (b >>> 25) ^
                  (b << 26) ^
                  (b << 21) ^
                  (b << 7)) +
                (C ^ (b & (S ^ C))) +
                0xc6e00bf3) |
              0;
            D = (D + M) | 0;
            M =
              (M +
                ((U & H) ^ (T & (U ^ H))) +
                ((U >>> 2) ^
                  (U >>> 13) ^
                  (U >>> 22) ^
                  (U << 30) ^
                  (U << 19) ^
                  (U << 10))) |
              0;
            E =
              (((g >>> 7) ^ (g >>> 18) ^ (g >>> 3) ^ (g << 25) ^ (g << 14)) +
                ((v >>> 17) ^ (v >>> 19) ^ (v >>> 10) ^ (v << 15) ^ (v << 13)) +
                E +
                w) |
              0;
            C =
              (E +
                C +
                ((D >>> 6) ^
                  (D >>> 11) ^
                  (D >>> 25) ^
                  (D << 26) ^
                  (D << 21) ^
                  (D << 7)) +
                (S ^ (D & (b ^ S))) +
                0xd5a79147) |
              0;
            T = (T + C) | 0;
            C =
              (C +
                ((M & U) ^ (H & (M ^ U))) +
                ((M >>> 2) ^
                  (M >>> 13) ^
                  (M >>> 22) ^
                  (M << 30) ^
                  (M << 19) ^
                  (M << 10))) |
              0;
            g =
              (((m >>> 7) ^ (m >>> 18) ^ (m >>> 3) ^ (m << 25) ^ (m << 14)) +
                ((x >>> 17) ^ (x >>> 19) ^ (x >>> 10) ^ (x << 15) ^ (x << 13)) +
                g +
                y) |
              0;
            S =
              (g +
                S +
                ((T >>> 6) ^
                  (T >>> 11) ^
                  (T >>> 25) ^
                  (T << 26) ^
                  (T << 21) ^
                  (T << 7)) +
                (b ^ (T & (D ^ b))) +
                0x06ca6351) |
              0;
            H = (H + S) | 0;
            S =
              (S +
                ((C & M) ^ (U & (C ^ M))) +
                ((C >>> 2) ^
                  (C >>> 13) ^
                  (C >>> 22) ^
                  (C << 30) ^
                  (C << 19) ^
                  (C << 10))) |
              0;
            m =
              (((t >>> 7) ^ (t >>> 18) ^ (t >>> 3) ^ (t << 25) ^ (t << 14)) +
                ((E >>> 17) ^ (E >>> 19) ^ (E >>> 10) ^ (E << 15) ^ (E << 13)) +
                m +
                _) |
              0;
            b =
              (m +
                b +
                ((H >>> 6) ^
                  (H >>> 11) ^
                  (H >>> 25) ^
                  (H << 26) ^
                  (H << 21) ^
                  (H << 7)) +
                (D ^ (H & (T ^ D))) +
                0x14292967) |
              0;
            U = (U + b) | 0;
            b =
              (b +
                ((S & C) ^ (M & (S ^ C))) +
                ((S >>> 2) ^
                  (S >>> 13) ^
                  (S >>> 22) ^
                  (S << 30) ^
                  (S << 19) ^
                  (S << 10))) |
              0;
            t =
              (((e >>> 7) ^ (e >>> 18) ^ (e >>> 3) ^ (e << 25) ^ (e << 14)) +
                ((g >>> 17) ^ (g >>> 19) ^ (g >>> 10) ^ (g << 15) ^ (g << 13)) +
                t +
                d) |
              0;
            D =
              (t +
                D +
                ((U >>> 6) ^
                  (U >>> 11) ^
                  (U >>> 25) ^
                  (U << 26) ^
                  (U << 21) ^
                  (U << 7)) +
                (T ^ (U & (H ^ T))) +
                0x27b70a85) |
              0;
            M = (M + D) | 0;
            D =
              (D +
                ((b & S) ^ (C & (b ^ S))) +
                ((b >>> 2) ^
                  (b >>> 13) ^
                  (b >>> 22) ^
                  (b << 30) ^
                  (b << 19) ^
                  (b << 10))) |
              0;
            e =
              (((r >>> 7) ^ (r >>> 18) ^ (r >>> 3) ^ (r << 25) ^ (r << 14)) +
                ((m >>> 17) ^ (m >>> 19) ^ (m >>> 10) ^ (m << 15) ^ (m << 13)) +
                e +
                A) |
              0;
            T =
              (e +
                T +
                ((M >>> 6) ^
                  (M >>> 11) ^
                  (M >>> 25) ^
                  (M << 26) ^
                  (M << 21) ^
                  (M << 7)) +
                (H ^ (M & (U ^ H))) +
                0x2e1b2138) |
              0;
            C = (C + T) | 0;
            T =
              (T +
                ((D & b) ^ (S & (D ^ b))) +
                ((D >>> 2) ^
                  (D >>> 13) ^
                  (D >>> 22) ^
                  (D << 30) ^
                  (D << 19) ^
                  (D << 10))) |
              0;
            r =
              (((f >>> 7) ^ (f >>> 18) ^ (f >>> 3) ^ (f << 25) ^ (f << 14)) +
                ((t >>> 17) ^ (t >>> 19) ^ (t >>> 10) ^ (t << 15) ^ (t << 13)) +
                r +
                v) |
              0;
            H =
              (r +
                H +
                ((C >>> 6) ^
                  (C >>> 11) ^
                  (C >>> 25) ^
                  (C << 26) ^
                  (C << 21) ^
                  (C << 7)) +
                (U ^ (C & (M ^ U))) +
                0x4d2c6dfc) |
              0;
            S = (S + H) | 0;
            H =
              (H +
                ((T & D) ^ (b & (T ^ D))) +
                ((T >>> 2) ^
                  (T >>> 13) ^
                  (T >>> 22) ^
                  (T << 30) ^
                  (T << 19) ^
                  (T << 10))) |
              0;
            f =
              (((l >>> 7) ^ (l >>> 18) ^ (l >>> 3) ^ (l << 25) ^ (l << 14)) +
                ((e >>> 17) ^ (e >>> 19) ^ (e >>> 10) ^ (e << 15) ^ (e << 13)) +
                f +
                x) |
              0;
            U =
              (f +
                U +
                ((S >>> 6) ^
                  (S >>> 11) ^
                  (S >>> 25) ^
                  (S << 26) ^
                  (S << 21) ^
                  (S << 7)) +
                (M ^ (S & (C ^ M))) +
                0x53380d13) |
              0;
            b = (b + U) | 0;
            U =
              (U +
                ((H & T) ^ (D & (H ^ T))) +
                ((H >>> 2) ^
                  (H >>> 13) ^
                  (H >>> 22) ^
                  (H << 30) ^
                  (H << 19) ^
                  (H << 10))) |
              0;
            l =
              (((p >>> 7) ^ (p >>> 18) ^ (p >>> 3) ^ (p << 25) ^ (p << 14)) +
                ((r >>> 17) ^ (r >>> 19) ^ (r >>> 10) ^ (r << 15) ^ (r << 13)) +
                l +
                E) |
              0;
            M =
              (l +
                M +
                ((b >>> 6) ^
                  (b >>> 11) ^
                  (b >>> 25) ^
                  (b << 26) ^
                  (b << 21) ^
                  (b << 7)) +
                (C ^ (b & (S ^ C))) +
                0x650a7354) |
              0;
            D = (D + M) | 0;
            M =
              (M +
                ((U & H) ^ (T & (U ^ H))) +
                ((U >>> 2) ^
                  (U >>> 13) ^
                  (U >>> 22) ^
                  (U << 30) ^
                  (U << 19) ^
                  (U << 10))) |
              0;
            p =
              (((w >>> 7) ^ (w >>> 18) ^ (w >>> 3) ^ (w << 25) ^ (w << 14)) +
                ((f >>> 17) ^ (f >>> 19) ^ (f >>> 10) ^ (f << 15) ^ (f << 13)) +
                p +
                g) |
              0;
            C =
              (p +
                C +
                ((D >>> 6) ^
                  (D >>> 11) ^
                  (D >>> 25) ^
                  (D << 26) ^
                  (D << 21) ^
                  (D << 7)) +
                (S ^ (D & (b ^ S))) +
                0x766a0abb) |
              0;
            T = (T + C) | 0;
            C =
              (C +
                ((M & U) ^ (H & (M ^ U))) +
                ((M >>> 2) ^
                  (M >>> 13) ^
                  (M >>> 22) ^
                  (M << 30) ^
                  (M << 19) ^
                  (M << 10))) |
              0;
            w =
              (((y >>> 7) ^ (y >>> 18) ^ (y >>> 3) ^ (y << 25) ^ (y << 14)) +
                ((l >>> 17) ^ (l >>> 19) ^ (l >>> 10) ^ (l << 15) ^ (l << 13)) +
                w +
                m) |
              0;
            S =
              (w +
                S +
                ((T >>> 6) ^
                  (T >>> 11) ^
                  (T >>> 25) ^
                  (T << 26) ^
                  (T << 21) ^
                  (T << 7)) +
                (b ^ (T & (D ^ b))) +
                0x81c2c92e) |
              0;
            H = (H + S) | 0;
            S =
              (S +
                ((C & M) ^ (U & (C ^ M))) +
                ((C >>> 2) ^
                  (C >>> 13) ^
                  (C >>> 22) ^
                  (C << 30) ^
                  (C << 19) ^
                  (C << 10))) |
              0;
            y =
              (((_ >>> 7) ^ (_ >>> 18) ^ (_ >>> 3) ^ (_ << 25) ^ (_ << 14)) +
                ((p >>> 17) ^ (p >>> 19) ^ (p >>> 10) ^ (p << 15) ^ (p << 13)) +
                y +
                t) |
              0;
            b =
              (y +
                b +
                ((H >>> 6) ^
                  (H >>> 11) ^
                  (H >>> 25) ^
                  (H << 26) ^
                  (H << 21) ^
                  (H << 7)) +
                (D ^ (H & (T ^ D))) +
                0x92722c85) |
              0;
            U = (U + b) | 0;
            b =
              (b +
                ((S & C) ^ (M & (S ^ C))) +
                ((S >>> 2) ^
                  (S >>> 13) ^
                  (S >>> 22) ^
                  (S << 30) ^
                  (S << 19) ^
                  (S << 10))) |
              0;
            _ =
              (((d >>> 7) ^ (d >>> 18) ^ (d >>> 3) ^ (d << 25) ^ (d << 14)) +
                ((w >>> 17) ^ (w >>> 19) ^ (w >>> 10) ^ (w << 15) ^ (w << 13)) +
                _ +
                e) |
              0;
            D =
              (_ +
                D +
                ((U >>> 6) ^
                  (U >>> 11) ^
                  (U >>> 25) ^
                  (U << 26) ^
                  (U << 21) ^
                  (U << 7)) +
                (T ^ (U & (H ^ T))) +
                0xa2bfe8a1) |
              0;
            M = (M + D) | 0;
            D =
              (D +
                ((b & S) ^ (C & (b ^ S))) +
                ((b >>> 2) ^
                  (b >>> 13) ^
                  (b >>> 22) ^
                  (b << 30) ^
                  (b << 19) ^
                  (b << 10))) |
              0;
            d =
              (((A >>> 7) ^ (A >>> 18) ^ (A >>> 3) ^ (A << 25) ^ (A << 14)) +
                ((y >>> 17) ^ (y >>> 19) ^ (y >>> 10) ^ (y << 15) ^ (y << 13)) +
                d +
                r) |
              0;
            T =
              (d +
                T +
                ((M >>> 6) ^
                  (M >>> 11) ^
                  (M >>> 25) ^
                  (M << 26) ^
                  (M << 21) ^
                  (M << 7)) +
                (H ^ (M & (U ^ H))) +
                0xa81a664b) |
              0;
            C = (C + T) | 0;
            T =
              (T +
                ((D & b) ^ (S & (D ^ b))) +
                ((D >>> 2) ^
                  (D >>> 13) ^
                  (D >>> 22) ^
                  (D << 30) ^
                  (D << 19) ^
                  (D << 10))) |
              0;
            A =
              (((v >>> 7) ^ (v >>> 18) ^ (v >>> 3) ^ (v << 25) ^ (v << 14)) +
                ((_ >>> 17) ^ (_ >>> 19) ^ (_ >>> 10) ^ (_ << 15) ^ (_ << 13)) +
                A +
                f) |
              0;
            H =
              (A +
                H +
                ((C >>> 6) ^
                  (C >>> 11) ^
                  (C >>> 25) ^
                  (C << 26) ^
                  (C << 21) ^
                  (C << 7)) +
                (U ^ (C & (M ^ U))) +
                0xc24b8b70) |
              0;
            S = (S + H) | 0;
            H =
              (H +
                ((T & D) ^ (b & (T ^ D))) +
                ((T >>> 2) ^
                  (T >>> 13) ^
                  (T >>> 22) ^
                  (T << 30) ^
                  (T << 19) ^
                  (T << 10))) |
              0;
            v =
              (((x >>> 7) ^ (x >>> 18) ^ (x >>> 3) ^ (x << 25) ^ (x << 14)) +
                ((d >>> 17) ^ (d >>> 19) ^ (d >>> 10) ^ (d << 15) ^ (d << 13)) +
                v +
                l) |
              0;
            U =
              (v +
                U +
                ((S >>> 6) ^
                  (S >>> 11) ^
                  (S >>> 25) ^
                  (S << 26) ^
                  (S << 21) ^
                  (S << 7)) +
                (M ^ (S & (C ^ M))) +
                0xc76c51a3) |
              0;
            b = (b + U) | 0;
            U =
              (U +
                ((H & T) ^ (D & (H ^ T))) +
                ((H >>> 2) ^
                  (H >>> 13) ^
                  (H >>> 22) ^
                  (H << 30) ^
                  (H << 19) ^
                  (H << 10))) |
              0;
            x =
              (((E >>> 7) ^ (E >>> 18) ^ (E >>> 3) ^ (E << 25) ^ (E << 14)) +
                ((A >>> 17) ^ (A >>> 19) ^ (A >>> 10) ^ (A << 15) ^ (A << 13)) +
                x +
                p) |
              0;
            M =
              (x +
                M +
                ((b >>> 6) ^
                  (b >>> 11) ^
                  (b >>> 25) ^
                  (b << 26) ^
                  (b << 21) ^
                  (b << 7)) +
                (C ^ (b & (S ^ C))) +
                0xd192e819) |
              0;
            D = (D + M) | 0;
            M =
              (M +
                ((U & H) ^ (T & (U ^ H))) +
                ((U >>> 2) ^
                  (U >>> 13) ^
                  (U >>> 22) ^
                  (U << 30) ^
                  (U << 19) ^
                  (U << 10))) |
              0;
            E =
              (((g >>> 7) ^ (g >>> 18) ^ (g >>> 3) ^ (g << 25) ^ (g << 14)) +
                ((v >>> 17) ^ (v >>> 19) ^ (v >>> 10) ^ (v << 15) ^ (v << 13)) +
                E +
                w) |
              0;
            C =
              (E +
                C +
                ((D >>> 6) ^
                  (D >>> 11) ^
                  (D >>> 25) ^
                  (D << 26) ^
                  (D << 21) ^
                  (D << 7)) +
                (S ^ (D & (b ^ S))) +
                0xd6990624) |
              0;
            T = (T + C) | 0;
            C =
              (C +
                ((M & U) ^ (H & (M ^ U))) +
                ((M >>> 2) ^
                  (M >>> 13) ^
                  (M >>> 22) ^
                  (M << 30) ^
                  (M << 19) ^
                  (M << 10))) |
              0;
            g =
              (((m >>> 7) ^ (m >>> 18) ^ (m >>> 3) ^ (m << 25) ^ (m << 14)) +
                ((x >>> 17) ^ (x >>> 19) ^ (x >>> 10) ^ (x << 15) ^ (x << 13)) +
                g +
                y) |
              0;
            S =
              (g +
                S +
                ((T >>> 6) ^
                  (T >>> 11) ^
                  (T >>> 25) ^
                  (T << 26) ^
                  (T << 21) ^
                  (T << 7)) +
                (b ^ (T & (D ^ b))) +
                0xf40e3585) |
              0;
            H = (H + S) | 0;
            S =
              (S +
                ((C & M) ^ (U & (C ^ M))) +
                ((C >>> 2) ^
                  (C >>> 13) ^
                  (C >>> 22) ^
                  (C << 30) ^
                  (C << 19) ^
                  (C << 10))) |
              0;
            m =
              (((t >>> 7) ^ (t >>> 18) ^ (t >>> 3) ^ (t << 25) ^ (t << 14)) +
                ((E >>> 17) ^ (E >>> 19) ^ (E >>> 10) ^ (E << 15) ^ (E << 13)) +
                m +
                _) |
              0;
            b =
              (m +
                b +
                ((H >>> 6) ^
                  (H >>> 11) ^
                  (H >>> 25) ^
                  (H << 26) ^
                  (H << 21) ^
                  (H << 7)) +
                (D ^ (H & (T ^ D))) +
                0x106aa070) |
              0;
            U = (U + b) | 0;
            b =
              (b +
                ((S & C) ^ (M & (S ^ C))) +
                ((S >>> 2) ^
                  (S >>> 13) ^
                  (S >>> 22) ^
                  (S << 30) ^
                  (S << 19) ^
                  (S << 10))) |
              0;
            t =
              (((e >>> 7) ^ (e >>> 18) ^ (e >>> 3) ^ (e << 25) ^ (e << 14)) +
                ((g >>> 17) ^ (g >>> 19) ^ (g >>> 10) ^ (g << 15) ^ (g << 13)) +
                t +
                d) |
              0;
            D =
              (t +
                D +
                ((U >>> 6) ^
                  (U >>> 11) ^
                  (U >>> 25) ^
                  (U << 26) ^
                  (U << 21) ^
                  (U << 7)) +
                (T ^ (U & (H ^ T))) +
                0x19a4c116) |
              0;
            M = (M + D) | 0;
            D =
              (D +
                ((b & S) ^ (C & (b ^ S))) +
                ((b >>> 2) ^
                  (b >>> 13) ^
                  (b >>> 22) ^
                  (b << 30) ^
                  (b << 19) ^
                  (b << 10))) |
              0;
            e =
              (((r >>> 7) ^ (r >>> 18) ^ (r >>> 3) ^ (r << 25) ^ (r << 14)) +
                ((m >>> 17) ^ (m >>> 19) ^ (m >>> 10) ^ (m << 15) ^ (m << 13)) +
                e +
                A) |
              0;
            T =
              (e +
                T +
                ((M >>> 6) ^
                  (M >>> 11) ^
                  (M >>> 25) ^
                  (M << 26) ^
                  (M << 21) ^
                  (M << 7)) +
                (H ^ (M & (U ^ H))) +
                0x1e376c08) |
              0;
            C = (C + T) | 0;
            T =
              (T +
                ((D & b) ^ (S & (D ^ b))) +
                ((D >>> 2) ^
                  (D >>> 13) ^
                  (D >>> 22) ^
                  (D << 30) ^
                  (D << 19) ^
                  (D << 10))) |
              0;
            r =
              (((f >>> 7) ^ (f >>> 18) ^ (f >>> 3) ^ (f << 25) ^ (f << 14)) +
                ((t >>> 17) ^ (t >>> 19) ^ (t >>> 10) ^ (t << 15) ^ (t << 13)) +
                r +
                v) |
              0;
            H =
              (r +
                H +
                ((C >>> 6) ^
                  (C >>> 11) ^
                  (C >>> 25) ^
                  (C << 26) ^
                  (C << 21) ^
                  (C << 7)) +
                (U ^ (C & (M ^ U))) +
                0x2748774c) |
              0;
            S = (S + H) | 0;
            H =
              (H +
                ((T & D) ^ (b & (T ^ D))) +
                ((T >>> 2) ^
                  (T >>> 13) ^
                  (T >>> 22) ^
                  (T << 30) ^
                  (T << 19) ^
                  (T << 10))) |
              0;
            f =
              (((l >>> 7) ^ (l >>> 18) ^ (l >>> 3) ^ (l << 25) ^ (l << 14)) +
                ((e >>> 17) ^ (e >>> 19) ^ (e >>> 10) ^ (e << 15) ^ (e << 13)) +
                f +
                x) |
              0;
            U =
              (f +
                U +
                ((S >>> 6) ^
                  (S >>> 11) ^
                  (S >>> 25) ^
                  (S << 26) ^
                  (S << 21) ^
                  (S << 7)) +
                (M ^ (S & (C ^ M))) +
                0x34b0bcb5) |
              0;
            b = (b + U) | 0;
            U =
              (U +
                ((H & T) ^ (D & (H ^ T))) +
                ((H >>> 2) ^
                  (H >>> 13) ^
                  (H >>> 22) ^
                  (H << 30) ^
                  (H << 19) ^
                  (H << 10))) |
              0;
            l =
              (((p >>> 7) ^ (p >>> 18) ^ (p >>> 3) ^ (p << 25) ^ (p << 14)) +
                ((r >>> 17) ^ (r >>> 19) ^ (r >>> 10) ^ (r << 15) ^ (r << 13)) +
                l +
                E) |
              0;
            M =
              (l +
                M +
                ((b >>> 6) ^
                  (b >>> 11) ^
                  (b >>> 25) ^
                  (b << 26) ^
                  (b << 21) ^
                  (b << 7)) +
                (C ^ (b & (S ^ C))) +
                0x391c0cb3) |
              0;
            D = (D + M) | 0;
            M =
              (M +
                ((U & H) ^ (T & (U ^ H))) +
                ((U >>> 2) ^
                  (U >>> 13) ^
                  (U >>> 22) ^
                  (U << 30) ^
                  (U << 19) ^
                  (U << 10))) |
              0;
            p =
              (((w >>> 7) ^ (w >>> 18) ^ (w >>> 3) ^ (w << 25) ^ (w << 14)) +
                ((f >>> 17) ^ (f >>> 19) ^ (f >>> 10) ^ (f << 15) ^ (f << 13)) +
                p +
                g) |
              0;
            C =
              (p +
                C +
                ((D >>> 6) ^
                  (D >>> 11) ^
                  (D >>> 25) ^
                  (D << 26) ^
                  (D << 21) ^
                  (D << 7)) +
                (S ^ (D & (b ^ S))) +
                0x4ed8aa4a) |
              0;
            T = (T + C) | 0;
            C =
              (C +
                ((M & U) ^ (H & (M ^ U))) +
                ((M >>> 2) ^
                  (M >>> 13) ^
                  (M >>> 22) ^
                  (M << 30) ^
                  (M << 19) ^
                  (M << 10))) |
              0;
            w =
              (((y >>> 7) ^ (y >>> 18) ^ (y >>> 3) ^ (y << 25) ^ (y << 14)) +
                ((l >>> 17) ^ (l >>> 19) ^ (l >>> 10) ^ (l << 15) ^ (l << 13)) +
                w +
                m) |
              0;
            S =
              (w +
                S +
                ((T >>> 6) ^
                  (T >>> 11) ^
                  (T >>> 25) ^
                  (T << 26) ^
                  (T << 21) ^
                  (T << 7)) +
                (b ^ (T & (D ^ b))) +
                0x5b9cca4f) |
              0;
            H = (H + S) | 0;
            S =
              (S +
                ((C & M) ^ (U & (C ^ M))) +
                ((C >>> 2) ^
                  (C >>> 13) ^
                  (C >>> 22) ^
                  (C << 30) ^
                  (C << 19) ^
                  (C << 10))) |
              0;
            y =
              (((_ >>> 7) ^ (_ >>> 18) ^ (_ >>> 3) ^ (_ << 25) ^ (_ << 14)) +
                ((p >>> 17) ^ (p >>> 19) ^ (p >>> 10) ^ (p << 15) ^ (p << 13)) +
                y +
                t) |
              0;
            b =
              (y +
                b +
                ((H >>> 6) ^
                  (H >>> 11) ^
                  (H >>> 25) ^
                  (H << 26) ^
                  (H << 21) ^
                  (H << 7)) +
                (D ^ (H & (T ^ D))) +
                0x682e6ff3) |
              0;
            U = (U + b) | 0;
            b =
              (b +
                ((S & C) ^ (M & (S ^ C))) +
                ((S >>> 2) ^
                  (S >>> 13) ^
                  (S >>> 22) ^
                  (S << 30) ^
                  (S << 19) ^
                  (S << 10))) |
              0;
            _ =
              (((d >>> 7) ^ (d >>> 18) ^ (d >>> 3) ^ (d << 25) ^ (d << 14)) +
                ((w >>> 17) ^ (w >>> 19) ^ (w >>> 10) ^ (w << 15) ^ (w << 13)) +
                _ +
                e) |
              0;
            D =
              (_ +
                D +
                ((U >>> 6) ^
                  (U >>> 11) ^
                  (U >>> 25) ^
                  (U << 26) ^
                  (U << 21) ^
                  (U << 7)) +
                (T ^ (U & (H ^ T))) +
                0x748f82ee) |
              0;
            M = (M + D) | 0;
            D =
              (D +
                ((b & S) ^ (C & (b ^ S))) +
                ((b >>> 2) ^
                  (b >>> 13) ^
                  (b >>> 22) ^
                  (b << 30) ^
                  (b << 19) ^
                  (b << 10))) |
              0;
            d =
              (((A >>> 7) ^ (A >>> 18) ^ (A >>> 3) ^ (A << 25) ^ (A << 14)) +
                ((y >>> 17) ^ (y >>> 19) ^ (y >>> 10) ^ (y << 15) ^ (y << 13)) +
                d +
                r) |
              0;
            T =
              (d +
                T +
                ((M >>> 6) ^
                  (M >>> 11) ^
                  (M >>> 25) ^
                  (M << 26) ^
                  (M << 21) ^
                  (M << 7)) +
                (H ^ (M & (U ^ H))) +
                0x78a5636f) |
              0;
            C = (C + T) | 0;
            T =
              (T +
                ((D & b) ^ (S & (D ^ b))) +
                ((D >>> 2) ^
                  (D >>> 13) ^
                  (D >>> 22) ^
                  (D << 30) ^
                  (D << 19) ^
                  (D << 10))) |
              0;
            A =
              (((v >>> 7) ^ (v >>> 18) ^ (v >>> 3) ^ (v << 25) ^ (v << 14)) +
                ((_ >>> 17) ^ (_ >>> 19) ^ (_ >>> 10) ^ (_ << 15) ^ (_ << 13)) +
                A +
                f) |
              0;
            H =
              (A +
                H +
                ((C >>> 6) ^
                  (C >>> 11) ^
                  (C >>> 25) ^
                  (C << 26) ^
                  (C << 21) ^
                  (C << 7)) +
                (U ^ (C & (M ^ U))) +
                0x84c87814) |
              0;
            S = (S + H) | 0;
            H =
              (H +
                ((T & D) ^ (b & (T ^ D))) +
                ((T >>> 2) ^
                  (T >>> 13) ^
                  (T >>> 22) ^
                  (T << 30) ^
                  (T << 19) ^
                  (T << 10))) |
              0;
            v =
              (((x >>> 7) ^ (x >>> 18) ^ (x >>> 3) ^ (x << 25) ^ (x << 14)) +
                ((d >>> 17) ^ (d >>> 19) ^ (d >>> 10) ^ (d << 15) ^ (d << 13)) +
                v +
                l) |
              0;
            U =
              (v +
                U +
                ((S >>> 6) ^
                  (S >>> 11) ^
                  (S >>> 25) ^
                  (S << 26) ^
                  (S << 21) ^
                  (S << 7)) +
                (M ^ (S & (C ^ M))) +
                0x8cc70208) |
              0;
            b = (b + U) | 0;
            U =
              (U +
                ((H & T) ^ (D & (H ^ T))) +
                ((H >>> 2) ^
                  (H >>> 13) ^
                  (H >>> 22) ^
                  (H << 30) ^
                  (H << 19) ^
                  (H << 10))) |
              0;
            x =
              (((E >>> 7) ^ (E >>> 18) ^ (E >>> 3) ^ (E << 25) ^ (E << 14)) +
                ((A >>> 17) ^ (A >>> 19) ^ (A >>> 10) ^ (A << 15) ^ (A << 13)) +
                x +
                p) |
              0;
            M =
              (x +
                M +
                ((b >>> 6) ^
                  (b >>> 11) ^
                  (b >>> 25) ^
                  (b << 26) ^
                  (b << 21) ^
                  (b << 7)) +
                (C ^ (b & (S ^ C))) +
                0x90befffa) |
              0;
            D = (D + M) | 0;
            M =
              (M +
                ((U & H) ^ (T & (U ^ H))) +
                ((U >>> 2) ^
                  (U >>> 13) ^
                  (U >>> 22) ^
                  (U << 30) ^
                  (U << 19) ^
                  (U << 10))) |
              0;
            E =
              (((g >>> 7) ^ (g >>> 18) ^ (g >>> 3) ^ (g << 25) ^ (g << 14)) +
                ((v >>> 17) ^ (v >>> 19) ^ (v >>> 10) ^ (v << 15) ^ (v << 13)) +
                E +
                w) |
              0;
            C =
              (E +
                C +
                ((D >>> 6) ^
                  (D >>> 11) ^
                  (D >>> 25) ^
                  (D << 26) ^
                  (D << 21) ^
                  (D << 7)) +
                (S ^ (D & (b ^ S))) +
                0xa4506ceb) |
              0;
            T = (T + C) | 0;
            C =
              (C +
                ((M & U) ^ (H & (M ^ U))) +
                ((M >>> 2) ^
                  (M >>> 13) ^
                  (M >>> 22) ^
                  (M << 30) ^
                  (M << 19) ^
                  (M << 10))) |
              0;
            g =
              (((m >>> 7) ^ (m >>> 18) ^ (m >>> 3) ^ (m << 25) ^ (m << 14)) +
                ((x >>> 17) ^ (x >>> 19) ^ (x >>> 10) ^ (x << 15) ^ (x << 13)) +
                g +
                y) |
              0;
            S =
              (g +
                S +
                ((T >>> 6) ^
                  (T >>> 11) ^
                  (T >>> 25) ^
                  (T << 26) ^
                  (T << 21) ^
                  (T << 7)) +
                (b ^ (T & (D ^ b))) +
                0xbef9a3f7) |
              0;
            H = (H + S) | 0;
            S =
              (S +
                ((C & M) ^ (U & (C ^ M))) +
                ((C >>> 2) ^
                  (C >>> 13) ^
                  (C >>> 22) ^
                  (C << 30) ^
                  (C << 19) ^
                  (C << 10))) |
              0;
            m =
              (((t >>> 7) ^ (t >>> 18) ^ (t >>> 3) ^ (t << 25) ^ (t << 14)) +
                ((E >>> 17) ^ (E >>> 19) ^ (E >>> 10) ^ (E << 15) ^ (E << 13)) +
                m +
                _) |
              0;
            b =
              (m +
                b +
                ((H >>> 6) ^
                  (H >>> 11) ^
                  (H >>> 25) ^
                  (H << 26) ^
                  (H << 21) ^
                  (H << 7)) +
                (D ^ (H & (T ^ D))) +
                0xc67178f2) |
              0;
            U = (U + b) | 0;
            b =
              (b +
                ((S & C) ^ (M & (S ^ C))) +
                ((S >>> 2) ^
                  (S >>> 13) ^
                  (S >>> 22) ^
                  (S << 30) ^
                  (S << 19) ^
                  (S << 10))) |
              0;
            s = (s + b) | 0;
            i = (i + S) | 0;
            n = (n + C) | 0;
            a = (a + M) | 0;
            h = (h + U) | 0;
            o = (o + H) | 0;
            c = (c + T) | 0;
            u = (u + D) | 0;
          }
          function D(t) {
            t = t | 0;
            T(
              (H[t | 0] << 24) | (H[t | 1] << 16) | (H[t | 2] << 8) | H[t | 3],
              (H[t | 4] << 24) | (H[t | 5] << 16) | (H[t | 6] << 8) | H[t | 7],
              (H[t | 8] << 24) |
                (H[t | 9] << 16) |
                (H[t | 10] << 8) |
                H[t | 11],
              (H[t | 12] << 24) |
                (H[t | 13] << 16) |
                (H[t | 14] << 8) |
                H[t | 15],
              (H[t | 16] << 24) |
                (H[t | 17] << 16) |
                (H[t | 18] << 8) |
                H[t | 19],
              (H[t | 20] << 24) |
                (H[t | 21] << 16) |
                (H[t | 22] << 8) |
                H[t | 23],
              (H[t | 24] << 24) |
                (H[t | 25] << 16) |
                (H[t | 26] << 8) |
                H[t | 27],
              (H[t | 28] << 24) |
                (H[t | 29] << 16) |
                (H[t | 30] << 8) |
                H[t | 31],
              (H[t | 32] << 24) |
                (H[t | 33] << 16) |
                (H[t | 34] << 8) |
                H[t | 35],
              (H[t | 36] << 24) |
                (H[t | 37] << 16) |
                (H[t | 38] << 8) |
                H[t | 39],
              (H[t | 40] << 24) |
                (H[t | 41] << 16) |
                (H[t | 42] << 8) |
                H[t | 43],
              (H[t | 44] << 24) |
                (H[t | 45] << 16) |
                (H[t | 46] << 8) |
                H[t | 47],
              (H[t | 48] << 24) |
                (H[t | 49] << 16) |
                (H[t | 50] << 8) |
                H[t | 51],
              (H[t | 52] << 24) |
                (H[t | 53] << 16) |
                (H[t | 54] << 8) |
                H[t | 55],
              (H[t | 56] << 24) |
                (H[t | 57] << 16) |
                (H[t | 58] << 8) |
                H[t | 59],
              (H[t | 60] << 24) |
                (H[t | 61] << 16) |
                (H[t | 62] << 8) |
                H[t | 63]
            );
          }
          function k(t) {
            t = t | 0;
            H[t | 0] = s >>> 24;
            H[t | 1] = (s >>> 16) & 255;
            H[t | 2] = (s >>> 8) & 255;
            H[t | 3] = s & 255;
            H[t | 4] = i >>> 24;
            H[t | 5] = (i >>> 16) & 255;
            H[t | 6] = (i >>> 8) & 255;
            H[t | 7] = i & 255;
            H[t | 8] = n >>> 24;
            H[t | 9] = (n >>> 16) & 255;
            H[t | 10] = (n >>> 8) & 255;
            H[t | 11] = n & 255;
            H[t | 12] = a >>> 24;
            H[t | 13] = (a >>> 16) & 255;
            H[t | 14] = (a >>> 8) & 255;
            H[t | 15] = a & 255;
            H[t | 16] = h >>> 24;
            H[t | 17] = (h >>> 16) & 255;
            H[t | 18] = (h >>> 8) & 255;
            H[t | 19] = h & 255;
            H[t | 20] = o >>> 24;
            H[t | 21] = (o >>> 16) & 255;
            H[t | 22] = (o >>> 8) & 255;
            H[t | 23] = o & 255;
            H[t | 24] = c >>> 24;
            H[t | 25] = (c >>> 16) & 255;
            H[t | 26] = (c >>> 8) & 255;
            H[t | 27] = c & 255;
            H[t | 28] = u >>> 24;
            H[t | 29] = (u >>> 16) & 255;
            H[t | 30] = (u >>> 8) & 255;
            H[t | 31] = u & 255;
          }
          function G() {
            s = 0x6a09e667;
            i = 0xbb67ae85;
            n = 0x3c6ef372;
            a = 0xa54ff53a;
            h = 0x510e527f;
            o = 0x9b05688c;
            c = 0x1f83d9ab;
            u = 0x5be0cd19;
            f = l = 0;
          }
          function I(t, e, r, p, w, y, _, d, A, v) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            p = p | 0;
            w = w | 0;
            y = y | 0;
            _ = _ | 0;
            d = d | 0;
            A = A | 0;
            v = v | 0;
            s = t;
            i = e;
            n = r;
            a = p;
            h = w;
            o = y;
            c = _;
            u = d;
            f = A;
            l = v;
          }
          function Z(t, e) {
            t = t | 0;
            e = e | 0;
            var r = 0;
            if (t & 63) return -1;
            while ((e | 0) >= 64) {
              D(t);
              t = (t + 64) | 0;
              e = (e - 64) | 0;
              r = (r + 64) | 0;
            }
            f = (f + r) | 0;
            if (f >>> 0 < r >>> 0) l = (l + 1) | 0;
            return r | 0;
          }
          function P(t, e, r) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            var s = 0,
              i = 0;
            if (t & 63) return -1;
            if (~r) if (r & 31) return -1;
            if ((e | 0) >= 64) {
              s = Z(t, e) | 0;
              if ((s | 0) == -1) return -1;
              t = (t + s) | 0;
              e = (e - s) | 0;
            }
            s = (s + e) | 0;
            f = (f + e) | 0;
            if (f >>> 0 < e >>> 0) l = (l + 1) | 0;
            H[t | e] = 0x80;
            if ((e | 0) >= 56) {
              for (i = (e + 1) | 0; (i | 0) < 64; i = (i + 1) | 0)
                H[t | i] = 0x00;
              D(t);
              e = 0;
              H[t | 0] = 0;
            }
            for (i = (e + 1) | 0; (i | 0) < 59; i = (i + 1) | 0) H[t | i] = 0;
            H[t | 56] = (l >>> 21) & 255;
            H[t | 57] = (l >>> 13) & 255;
            H[t | 58] = (l >>> 5) & 255;
            H[t | 59] = ((l << 3) & 255) | (f >>> 29);
            H[t | 60] = (f >>> 21) & 255;
            H[t | 61] = (f >>> 13) & 255;
            H[t | 62] = (f >>> 5) & 255;
            H[t | 63] = (f << 3) & 255;
            D(t);
            if (~r) k(r);
            return s | 0;
          }
          function B() {
            s = p;
            i = w;
            n = y;
            a = _;
            h = d;
            o = A;
            c = v;
            u = x;
            f = 64;
            l = 0;
          }
          function z() {
            s = E;
            i = g;
            n = m;
            a = b;
            h = S;
            o = C;
            c = M;
            u = U;
            f = 64;
            l = 0;
          }
          function O(t, e, r, H, D, k, I, Z, P, B, z, O, q, L, R, K) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            H = H | 0;
            D = D | 0;
            k = k | 0;
            I = I | 0;
            Z = Z | 0;
            P = P | 0;
            B = B | 0;
            z = z | 0;
            O = O | 0;
            q = q | 0;
            L = L | 0;
            R = R | 0;
            K = K | 0;
            G();
            T(
              t ^ 0x5c5c5c5c,
              e ^ 0x5c5c5c5c,
              r ^ 0x5c5c5c5c,
              H ^ 0x5c5c5c5c,
              D ^ 0x5c5c5c5c,
              k ^ 0x5c5c5c5c,
              I ^ 0x5c5c5c5c,
              Z ^ 0x5c5c5c5c,
              P ^ 0x5c5c5c5c,
              B ^ 0x5c5c5c5c,
              z ^ 0x5c5c5c5c,
              O ^ 0x5c5c5c5c,
              q ^ 0x5c5c5c5c,
              L ^ 0x5c5c5c5c,
              R ^ 0x5c5c5c5c,
              K ^ 0x5c5c5c5c
            );
            E = s;
            g = i;
            m = n;
            b = a;
            S = h;
            C = o;
            M = c;
            U = u;
            G();
            T(
              t ^ 0x36363636,
              e ^ 0x36363636,
              r ^ 0x36363636,
              H ^ 0x36363636,
              D ^ 0x36363636,
              k ^ 0x36363636,
              I ^ 0x36363636,
              Z ^ 0x36363636,
              P ^ 0x36363636,
              B ^ 0x36363636,
              z ^ 0x36363636,
              O ^ 0x36363636,
              q ^ 0x36363636,
              L ^ 0x36363636,
              R ^ 0x36363636,
              K ^ 0x36363636
            );
            p = s;
            w = i;
            y = n;
            _ = a;
            d = h;
            A = o;
            v = c;
            x = u;
            f = 64;
            l = 0;
          }
          function q(t, e, r) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            var f = 0,
              l = 0,
              p = 0,
              w = 0,
              y = 0,
              _ = 0,
              d = 0,
              A = 0,
              v = 0;
            if (t & 63) return -1;
            if (~r) if (r & 31) return -1;
            v = P(t, e, -1) | 0;
            (f = s),
              (l = i),
              (p = n),
              (w = a),
              (y = h),
              (_ = o),
              (d = c),
              (A = u);
            z();
            T(f, l, p, w, y, _, d, A, 0x80000000, 0, 0, 0, 0, 0, 0, 768);
            if (~r) k(r);
            return v | 0;
          }
          function L(t, e, r, f, l) {
            t = t | 0;
            e = e | 0;
            r = r | 0;
            f = f | 0;
            l = l | 0;
            var p = 0,
              w = 0,
              y = 0,
              _ = 0,
              d = 0,
              A = 0,
              v = 0,
              x = 0,
              E = 0,
              g = 0,
              m = 0,
              b = 0,
              S = 0,
              C = 0,
              M = 0,
              U = 0;
            if (t & 63) return -1;
            if (~l) if (l & 31) return -1;
            H[(t + e) | 0] = r >>> 24;
            H[(t + e + 1) | 0] = (r >>> 16) & 255;
            H[(t + e + 2) | 0] = (r >>> 8) & 255;
            H[(t + e + 3) | 0] = r & 255;
            q(t, (e + 4) | 0, -1) | 0;
            (p = E = s),
              (w = g = i),
              (y = m = n),
              (_ = b = a),
              (d = S = h),
              (A = C = o),
              (v = M = c),
              (x = U = u);
            f = (f - 1) | 0;
            while ((f | 0) > 0) {
              B();
              T(E, g, m, b, S, C, M, U, 0x80000000, 0, 0, 0, 0, 0, 0, 768);
              (E = s),
                (g = i),
                (m = n),
                (b = a),
                (S = h),
                (C = o),
                (M = c),
                (U = u);
              z();
              T(E, g, m, b, S, C, M, U, 0x80000000, 0, 0, 0, 0, 0, 0, 768);
              (E = s),
                (g = i),
                (m = n),
                (b = a),
                (S = h),
                (C = o),
                (M = c),
                (U = u);
              p = p ^ s;
              w = w ^ i;
              y = y ^ n;
              _ = _ ^ a;
              d = d ^ h;
              A = A ^ o;
              v = v ^ c;
              x = x ^ u;
              f = (f - 1) | 0;
            }
            s = p;
            i = w;
            n = y;
            a = _;
            h = d;
            o = A;
            c = v;
            u = x;
            if (~l) k(l);
            return 0;
          }
          return {
            reset: G,
            init: I,
            process: Z,
            finish: P,
            hmac_reset: B,
            hmac_init: O,
            hmac_finish: q,
            pbkdf2_generate_block: L
          };
        })({ Uint8Array: Uint8Array }, null, this.heap.buffer)),
      (this.BLOCK_SIZE = E),
      (this.HASH_SIZE = g),
      this.reset();
  }
  (m.BLOCK_SIZE = E), (m.HASH_SIZE = g), (m.NAME = 'sha256');
  var b = m.prototype;
  (b.reset = function() {
    return (
      (this.result = null),
      (this.pos = 0),
      (this.len = 0),
      this.asm.reset(),
      this
    );
  }),
    (b.process = function(t) {
      if (null !== this.result)
        throw new i('state must be reset before processing new data');
      if ((f(t) && (t = h(t)), l(t) && (t = new Uint8Array(t)), !p(t)))
        throw new TypeError("data isn't of expected type");
      for (
        var e = this.asm,
          r = this.heap,
          s = this.pos,
          n = this.len,
          a = 0,
          o = t.length,
          c = 0;
        o > 0;

      )
        (n += c = y(r, s + n, t, a, o)),
          (a += c),
          (o -= c),
          (s += c = e.process(s, n)),
          (n -= c) || (s = 0);
      return (this.pos = s), (this.len = n), this;
    }),
    (b.finish = function() {
      if (null !== this.result)
        throw new i('state must be reset before processing new data');
      return (
        this.asm.finish(this.pos, this.len, 0),
        (this.result = new Uint8Array(this.HASH_SIZE)),
        this.result.set(this.heap.subarray(0, this.HASH_SIZE)),
        (this.pos = 0),
        (this.len = 0),
        this
      );
    });
  var S = null;
  class C extends v {
    constructor(t) {
      (t = t || {}).hash instanceof m ||
        (t.hash = (null === S && (S = new m({ heapSize: 1048576 })), S)),
        super(t);
    }
    reset(t) {
      (t = t || {}), (this.result = null), this.hash.reset();
      var e = t.password;
      if (void 0 !== e) {
        f(e) && (e = h(e));
        var r = (this.key = x(this.hash, e));
        this.hash
          .reset()
          .asm.hmac_init(
            (r[0] << 24) | (r[1] << 16) | (r[2] << 8) | r[3],
            (r[4] << 24) | (r[5] << 16) | (r[6] << 8) | r[7],
            (r[8] << 24) | (r[9] << 16) | (r[10] << 8) | r[11],
            (r[12] << 24) | (r[13] << 16) | (r[14] << 8) | r[15],
            (r[16] << 24) | (r[17] << 16) | (r[18] << 8) | r[19],
            (r[20] << 24) | (r[21] << 16) | (r[22] << 8) | r[23],
            (r[24] << 24) | (r[25] << 16) | (r[26] << 8) | r[27],
            (r[28] << 24) | (r[29] << 16) | (r[30] << 8) | r[31],
            (r[32] << 24) | (r[33] << 16) | (r[34] << 8) | r[35],
            (r[36] << 24) | (r[37] << 16) | (r[38] << 8) | r[39],
            (r[40] << 24) | (r[41] << 16) | (r[42] << 8) | r[43],
            (r[44] << 24) | (r[45] << 16) | (r[46] << 8) | r[47],
            (r[48] << 24) | (r[49] << 16) | (r[50] << 8) | r[51],
            (r[52] << 24) | (r[53] << 16) | (r[54] << 8) | r[55],
            (r[56] << 24) | (r[57] << 16) | (r[58] << 8) | r[59],
            (r[60] << 24) | (r[61] << 16) | (r[62] << 8) | r[63]
          );
      } else this.hash.asm.hmac_reset();
      var s = t.verify;
      return (
        void 0 !== s ? this._hmac_init_verify(s) : (this.verify = null), this
      );
    }
    finish() {
      if (null === this.key)
        throw new i('no key is associated with the instance');
      if (null !== this.result)
        throw new i('state must be reset before processing new data');
      var t = this.hash,
        e = this.hash.asm,
        r = this.hash.heap;
      e.hmac_finish(t.pos, t.len, 0);
      var s = this.verify,
        n = new Uint8Array(g);
      if ((n.set(r.subarray(0, g)), s))
        if (s.length === n.length) {
          for (var a = 0, h = 0; h < s.length; h++) a |= s[h] ^ n[h];
          this.result = !a;
        } else this.result = !1;
      else this.result = n;
      return this;
    }
  }
  (C.BLOCK_SIZE = m.BLOCK_SIZE), (C.HMAC_SIZE = m.HASH_SIZE);
  var M = null;
  function U() {
    return null === M && (M = new C()), M;
  }
  function H(t, e) {
    if (void 0 === t) throw new SyntaxError('data required');
    if (void 0 === e) throw new SyntaxError('password required');
    return U()
      .reset({ password: e })
      .process(t)
      .finish().result;
  }
  var T = C;
  (T.bytes = H),
    (T.hex = function(t, e) {
      return o(H(t, e));
    }),
    (T.base64 = function(t, e) {
      return c(H(t, e));
    });
  class D {
    constructor(t) {
      if (!(t = t || {}).hmac)
        throw new SyntaxError("option 'hmac' is required");
      if (!t.hmac.HMAC_SIZE)
        throw new SyntaxError(
          "option 'hmac' supplied doesn't seem to be a valid HMAC function"
        );
      (this.hmac = t.hmac),
        (this.count = t.count || 4096),
        (this.length = t.length || this.hmac.HMAC_SIZE),
        (this.result = null);
      var e = t.password;
      return (e || f(e)) && this.reset(t), this;
    }
    reset(t) {
      return (this.result = null), this.hmac.reset(t), this;
    }
    generate(t, e, r) {
      if (null !== this.result)
        throw new i('state must be reset before processing new data');
      if (!t && !f(t)) throw new n("bad 'salt' value");
      (e = e || this.count),
        (r = r || this.length),
        (this.result = new Uint8Array(r));
      for (var s = Math.ceil(r / this.hmac.HMAC_SIZE), a = 1; a <= s; ++a) {
        var h = (a - 1) * this.hmac.HMAC_SIZE,
          o = (a < s ? 0 : r % this.hmac.HMAC_SIZE) || this.hmac.HMAC_SIZE,
          c = new Uint8Array(
            this.hmac
              .reset()
              .process(t)
              .process(
                new Uint8Array([
                  (a >>> 24) & 255,
                  (a >>> 16) & 255,
                  (a >>> 8) & 255,
                  255 & a
                ])
              )
              .finish().result
          );
        this.result.set(c.subarray(0, o), h);
        for (var u = 1; u < e; ++u) {
          c = new Uint8Array(
            this.hmac
              .reset()
              .process(c)
              .finish().result
          );
          for (var l = 0; l < o; ++l) this.result[h + l] ^= c[l];
        }
      }
      return this;
    }
  }
  class k extends D {
    constructor(t) {
      (t = t || {}).hmac instanceof C || (t.hmac = U()), super(t);
    }
    generate(t, e, r) {
      if (null !== this.result)
        throw new i('state must be reset before processing new data');
      if (!t && !f(t)) throw new n("bad 'salt' value");
      (e = e || this.count),
        (r = r || this.length),
        (this.result = new Uint8Array(r));
      for (var s = Math.ceil(r / this.hmac.HMAC_SIZE), a = 1; a <= s; ++a) {
        var h = (a - 1) * this.hmac.HMAC_SIZE,
          o = (a < s ? 0 : r % this.hmac.HMAC_SIZE) || this.hmac.HMAC_SIZE;
        this.hmac.reset().process(t),
          this.hmac.hash.asm.pbkdf2_generate_block(
            this.hmac.hash.pos,
            this.hmac.hash.len,
            a,
            e,
            0
          ),
          this.result.set(this.hmac.hash.heap.subarray(0, o), h);
      }
      return this;
    }
  }
  var G = null;
  function I(t, e, r, s) {
    if (void 0 === t) throw new SyntaxError('password required');
    if (void 0 === e) throw new SyntaxError('salt required');
    return (null === G && (G = new k()), G)
      .reset({ password: t })
      .generate(e, r, s).result;
  }
  var Z = {
    bytes: I,
    hex: function(t, e, r, s) {
      return o(I(t, e, r, s));
    },
    base64: function(t, e, r, s) {
      return c(I(t, e, r, s));
    }
  };
  (t.AES_GCM = A),
    (t.AES_GCM_Encrypt = class extends A {
      constructor(t, e, r, s, i, n) {
        super(t, e, r, s, i, n);
      }
      process(t) {
        return this.AES_GCM_Encrypt_process(t);
      }
      finish() {
        return this.AES_GCM_Encrypt_finish();
      }
    }),
    (t.AES_GCM_Decrypt = class extends A {
      constructor(t, e, r, s, i, n) {
        super(t, e, r, s, i, n);
      }
      process(t) {
        return this.AES_GCM_Decrypt_process(t);
      }
      finish() {
        return this.AES_GCM_Decrypt_finish();
      }
    }),
    (t.HMAC_SHA256 = T),
    (t.PBKDF2_HMAC_SHA256 = Z),
    Object.defineProperty(t, '__esModule', { value: !0 });
});
