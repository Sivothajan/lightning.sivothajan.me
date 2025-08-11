var w4 = Object.create;
var Bs = Object.defineProperty;
var _4 = Object.getOwnPropertyDescriptor;
var S4 = Object.getOwnPropertyNames;
var x4 = Object.getPrototypeOf,
  E4 = Object.prototype.hasOwnProperty;
var _ = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  A4 = (e, t) => {
    for (var r in t) Bs(e, r, { get: t[r], enumerable: !0 });
  },
  Gu = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let i of S4(t))
        !E4.call(e, i) &&
          i !== r &&
          Bs(e, i, {
            get: () => t[i],
            enumerable: !(n = _4(t, i)) || n.enumerable,
          });
    return e;
  };
var I4 = (e, t, r) => (
    (r = e != null ? w4(x4(e)) : {}),
    Gu(
      t || !e || !e.__esModule
        ? Bs(r, "default", { value: e, enumerable: !0 })
        : r,
      e,
    )
  ),
  T4 = (e) => Gu(Bs({}, "__esModule", { value: !0 }), e);
var Yu = _((MT, Xu) => {
  Xu.exports = require("crypto").createHash;
});
var Qu = _((OT, Zu) => {
  "use strict";
  var Hs = "qpzry9x8gf2tvdw0s3jn54khce6mua7l",
    Xf = {};
  for (Gi = 0; Gi < Hs.length; Gi++) {
    if (((qs = Hs.charAt(Gi)), Xf[qs] !== void 0))
      throw new TypeError(qs + " is ambiguous");
    Xf[qs] = Gi;
  }
  var qs, Gi;
  function ei(e) {
    var t = e >> 25;
    return (
      ((e & 33554431) << 5) ^
      (-((t >> 0) & 1) & 996825010) ^
      (-((t >> 1) & 1) & 642813549) ^
      (-((t >> 2) & 1) & 513874426) ^
      (-((t >> 3) & 1) & 1027748829) ^
      (-((t >> 4) & 1) & 705979059)
    );
  }
  function $u(e) {
    for (var t = 1, r = 0; r < e.length; ++r) {
      var n = e.charCodeAt(r);
      if (n < 33 || n > 126) return "Invalid prefix (" + e + ")";
      t = ei(t) ^ (n >> 5);
    }
    for (t = ei(t), r = 0; r < e.length; ++r) {
      var i = e.charCodeAt(r);
      t = ei(t) ^ (i & 31);
    }
    return t;
  }
  function P4(e, t, r) {
    if (((r = r || 90), e.length + 7 + t.length > r))
      throw new TypeError("Exceeds length limit");
    e = e.toLowerCase();
    var n = $u(e);
    if (typeof n == "string") throw new Error(n);
    for (var i = e + "1", s = 0; s < t.length; ++s) {
      var o = t[s];
      if (o >> 5 !== 0) throw new Error("Non 5-bit word");
      ((n = ei(n) ^ o), (i += Hs.charAt(o)));
    }
    for (s = 0; s < 6; ++s) n = ei(n);
    for (n ^= 1, s = 0; s < 6; ++s) {
      var f = (n >> ((5 - s) * 5)) & 31;
      i += Hs.charAt(f);
    }
    return i;
  }
  function Ju(e, t) {
    if (((t = t || 90), e.length < 8)) return e + " too short";
    if (e.length > t) return "Exceeds length limit";
    var r = e.toLowerCase(),
      n = e.toUpperCase();
    if (e !== r && e !== n) return "Mixed-case string " + e;
    e = r;
    var i = e.lastIndexOf("1");
    if (i === -1) return "No separator character for " + e;
    if (i === 0) return "Missing prefix for " + e;
    var s = e.slice(0, i),
      o = e.slice(i + 1);
    if (o.length < 6) return "Data too short";
    var f = $u(s);
    if (typeof f == "string") return f;
    for (var u = [], l = 0; l < o.length; ++l) {
      var p = o.charAt(l),
        h = Xf[p];
      if (h === void 0) return "Unknown character " + p;
      ((f = ei(f) ^ h), !(l + 6 >= o.length) && u.push(h));
    }
    return f !== 1 ? "Invalid checksum for " + e : { prefix: s, words: u };
  }
  function M4() {
    var e = Ju.apply(null, arguments);
    if (typeof e == "object") return e;
  }
  function O4(e) {
    var t = Ju.apply(null, arguments);
    if (typeof t == "object") return t;
    throw new Error(t);
  }
  function Ns(e, t, r, n) {
    for (var i = 0, s = 0, o = (1 << r) - 1, f = [], u = 0; u < e.length; ++u)
      for (i = (i << t) | e[u], s += t; s >= r; )
        ((s -= r), f.push((i >> s) & o));
    if (n) s > 0 && f.push((i << (r - s)) & o);
    else {
      if (s >= t) return "Excess padding";
      if ((i << (r - s)) & o) return "Non-zero padding";
    }
    return f;
  }
  function k4(e) {
    var t = Ns(e, 8, 5, !0);
    if (Array.isArray(t)) return t;
  }
  function B4(e) {
    var t = Ns(e, 8, 5, !0);
    if (Array.isArray(t)) return t;
    throw new Error(t);
  }
  function q4(e) {
    var t = Ns(e, 5, 8, !1);
    if (Array.isArray(t)) return t;
  }
  function H4(e) {
    var t = Ns(e, 5, 8, !1);
    if (Array.isArray(t)) return t;
    throw new Error(t);
  }
  Zu.exports = {
    decodeUnsafe: M4,
    decode: O4,
    encode: P4,
    toWordsUnsafe: k4,
    toWords: B4,
    fromWordsUnsafe: q4,
    fromWords: H4,
  };
});
var b0 = _((kT, p0) => {
  var n0 = require("fs"),
    Or = require("path"),
    i0 = require("os"),
    s0 =
      typeof __webpack_require__ == "function"
        ? __non_webpack_require__
        : require,
    N4 = (process.config && process.config.variables) || {},
    R4 = !!process.env.PREBUILDS_ONLY,
    e0 = process.versions.modules,
    Yf = L4() ? "electron" : U4() ? "node-webkit" : "node",
    $f = process.env.npm_config_arch || i0.arch(),
    Jf = process.env.npm_config_platform || i0.platform(),
    o0 = process.env.LIBC || (F4(Jf) ? "musl" : "glibc"),
    Zf =
      process.env.ARM_VERSION || ($f === "arm64" ? "8" : N4.arm_version) || "",
    f0 = (process.versions.uv || "").split(".")[0];
  p0.exports = fr;
  function fr(e) {
    return s0(fr.resolve(e));
  }
  fr.resolve = fr.path = function (e) {
    e = Or.resolve(e || ".");
    try {
      var t = s0(Or.join(e, "package.json"))
        .name.toUpperCase()
        .replace(/-/g, "_");
      process.env[t + "_PREBUILD"] && (e = process.env[t + "_PREBUILD"]);
    } catch {}
    if (!R4) {
      var r = t0(Or.join(e, "build/Release"), r0);
      if (r) return r;
      var n = t0(Or.join(e, "build/Debug"), r0);
      if (n) return n;
    }
    var i = f(e);
    if (i) return i;
    var s = f(Or.dirname(process.execPath));
    if (s) return s;
    var o = [
      "platform=" + Jf,
      "arch=" + $f,
      "runtime=" + Yf,
      "abi=" + e0,
      "uv=" + f0,
      Zf ? "armv=" + Zf : "",
      "libc=" + o0,
      "node=" + process.versions.node,
      process.versions.electron ? "electron=" + process.versions.electron : "",
      typeof __webpack_require__ == "function" ? "webpack=true" : "",
    ]
      .filter(Boolean)
      .join(" ");
    throw new Error(
      "No native build was found for " +
        o +
        `
    loaded from: ` +
        e +
        `
`,
    );
    function f(u) {
      var l = Qf(Or.join(u, "prebuilds")).map(a0),
        p = l.filter(c0(Jf, $f)).sort(u0)[0];
      if (p) {
        var h = Or.join(u, "prebuilds", p.name),
          w = Qf(h).map(d0),
          E = w.filter(h0(Yf, e0)),
          A = E.sort(l0(Yf))[0];
        if (A) return Or.join(h, A.file);
      }
    }
  };
  function Qf(e) {
    try {
      return n0.readdirSync(e);
    } catch {
      return [];
    }
  }
  function t0(e, t) {
    var r = Qf(e).filter(t);
    return r[0] && Or.join(e, r[0]);
  }
  function r0(e) {
    return /\.node$/.test(e);
  }
  function a0(e) {
    var t = e.split("-");
    if (t.length === 2) {
      var r = t[0],
        n = t[1].split("+");
      if (r && n.length && n.every(Boolean))
        return { name: e, platform: r, architectures: n };
    }
  }
  function c0(e, t) {
    return function (r) {
      return r == null || r.platform !== e ? !1 : r.architectures.includes(t);
    };
  }
  function u0(e, t) {
    return e.architectures.length - t.architectures.length;
  }
  function d0(e) {
    var t = e.split("."),
      r = t.pop(),
      n = { file: e, specificity: 0 };
    if (r === "node") {
      for (var i = 0; i < t.length; i++) {
        var s = t[i];
        if (s === "node" || s === "electron" || s === "node-webkit")
          n.runtime = s;
        else if (s === "napi") n.napi = !0;
        else if (s.slice(0, 3) === "abi") n.abi = s.slice(3);
        else if (s.slice(0, 2) === "uv") n.uv = s.slice(2);
        else if (s.slice(0, 4) === "armv") n.armv = s.slice(4);
        else if (s === "glibc" || s === "musl") n.libc = s;
        else continue;
        n.specificity++;
      }
      return n;
    }
  }
  function h0(e, t) {
    return function (r) {
      return !(
        r == null ||
        (r.runtime && r.runtime !== e && !C4(r)) ||
        (r.abi && r.abi !== t && !r.napi) ||
        (r.uv && r.uv !== f0) ||
        (r.armv && r.armv !== Zf) ||
        (r.libc && r.libc !== o0)
      );
    };
  }
  function C4(e) {
    return e.runtime === "node" && e.napi;
  }
  function l0(e) {
    return function (t, r) {
      return t.runtime !== r.runtime
        ? t.runtime === e
          ? -1
          : 1
        : t.abi !== r.abi
          ? t.abi
            ? -1
            : 1
          : t.specificity !== r.specificity
            ? t.specificity > r.specificity
              ? -1
              : 1
            : 0;
    };
  }
  function U4() {
    return !!(process.versions && process.versions.nw);
  }
  function L4() {
    return (process.versions && process.versions.electron) ||
      process.env.ELECTRON_RUN_AS_NODE
      ? !0
      : typeof window < "u" &&
          window.process &&
          window.process.type === "renderer";
  }
  function F4(e) {
    return e === "linux" && n0.existsSync("/etc/alpine-release");
  }
  fr.parseTags = d0;
  fr.matchTags = h0;
  fr.compareTags = l0;
  fr.parseTuple = a0;
  fr.matchTuple = c0;
  fr.compareTuples = u0;
});
var y0 = _((BT, ta) => {
  var ea =
    typeof __webpack_require__ == "function"
      ? __non_webpack_require__
      : require;
  typeof ea.addon == "function"
    ? (ta.exports = ea.addon.bind(ea))
    : (ta.exports = b0());
});
var ra = _((qT, v0) => {
  var J = {
    IMPOSSIBLE_CASE: "Impossible case. Please create issue.",
    TWEAK_ADD:
      "The tweak was out of range or the resulted private key is invalid",
    TWEAK_MUL: "The tweak was out of range or equal to zero",
    CONTEXT_RANDOMIZE_UNKNOW: "Unknow error on context randomization",
    SECKEY_INVALID: "Private Key is invalid",
    PUBKEY_PARSE: "Public Key could not be parsed",
    PUBKEY_SERIALIZE: "Public Key serialization error",
    PUBKEY_COMBINE: "The sum of the public keys is not valid",
    SIG_PARSE: "Signature could not be parsed",
    SIGN: "The nonce generation function failed, or the private key was invalid",
    RECOVER: "Public key could not be recover",
    ECDH: "Scalar was invalid (zero or overflow)",
  };
  function jt(e, t) {
    if (!e) throw new Error(t);
  }
  function Y(e, t, r) {
    if (
      (jt(t instanceof Uint8Array, `Expected ${e} to be an Uint8Array`),
      r !== void 0)
    )
      if (Array.isArray(r)) {
        let n = r.join(", "),
          i = `Expected ${e} to be an Uint8Array with length [${n}]`;
        jt(r.includes(t.length), i);
      } else {
        let n = `Expected ${e} to be an Uint8Array with length ${r}`;
        jt(t.length === r, n);
      }
  }
  function _n(e) {
    jt(ti(e) === "Boolean", "Expected compressed to be a Boolean");
  }
  function Jt(e = (r) => new Uint8Array(r), t) {
    return (typeof e == "function" && (e = e(t)), Y("output", e, t), e);
  }
  function ti(e) {
    return Object.prototype.toString.call(e).slice(8, -1);
  }
  v0.exports = (e) => ({
    contextRandomize(t) {
      switch (
        (jt(
          t === null || t instanceof Uint8Array,
          "Expected seed to be an Uint8Array or null",
        ),
        t !== null && Y("seed", t, 32),
        e.contextRandomize(t))
      ) {
        case 1:
          throw new Error(J.CONTEXT_RANDOMIZE_UNKNOW);
      }
    },
    privateKeyVerify(t) {
      return (Y("private key", t, 32), e.privateKeyVerify(t) === 0);
    },
    privateKeyNegate(t) {
      switch ((Y("private key", t, 32), e.privateKeyNegate(t))) {
        case 0:
          return t;
        case 1:
          throw new Error(J.IMPOSSIBLE_CASE);
      }
    },
    privateKeyTweakAdd(t, r) {
      switch (
        (Y("private key", t, 32), Y("tweak", r, 32), e.privateKeyTweakAdd(t, r))
      ) {
        case 0:
          return t;
        case 1:
          throw new Error(J.TWEAK_ADD);
      }
    },
    privateKeyTweakMul(t, r) {
      switch (
        (Y("private key", t, 32), Y("tweak", r, 32), e.privateKeyTweakMul(t, r))
      ) {
        case 0:
          return t;
        case 1:
          throw new Error(J.TWEAK_MUL);
      }
    },
    publicKeyVerify(t) {
      return (Y("public key", t, [33, 65]), e.publicKeyVerify(t) === 0);
    },
    publicKeyCreate(t, r = !0, n) {
      switch (
        (Y("private key", t, 32),
        _n(r),
        (n = Jt(n, r ? 33 : 65)),
        e.publicKeyCreate(n, t))
      ) {
        case 0:
          return n;
        case 1:
          throw new Error(J.SECKEY_INVALID);
        case 2:
          throw new Error(J.PUBKEY_SERIALIZE);
      }
    },
    publicKeyConvert(t, r = !0, n) {
      switch (
        (Y("public key", t, [33, 65]),
        _n(r),
        (n = Jt(n, r ? 33 : 65)),
        e.publicKeyConvert(n, t))
      ) {
        case 0:
          return n;
        case 1:
          throw new Error(J.PUBKEY_PARSE);
        case 2:
          throw new Error(J.PUBKEY_SERIALIZE);
      }
    },
    publicKeyNegate(t, r = !0, n) {
      switch (
        (Y("public key", t, [33, 65]),
        _n(r),
        (n = Jt(n, r ? 33 : 65)),
        e.publicKeyNegate(n, t))
      ) {
        case 0:
          return n;
        case 1:
          throw new Error(J.PUBKEY_PARSE);
        case 2:
          throw new Error(J.IMPOSSIBLE_CASE);
        case 3:
          throw new Error(J.PUBKEY_SERIALIZE);
      }
    },
    publicKeyCombine(t, r = !0, n) {
      (jt(Array.isArray(t), "Expected public keys to be an Array"),
        jt(
          t.length > 0,
          "Expected public keys array will have more than zero items",
        ));
      for (let i of t) Y("public key", i, [33, 65]);
      switch ((_n(r), (n = Jt(n, r ? 33 : 65)), e.publicKeyCombine(n, t))) {
        case 0:
          return n;
        case 1:
          throw new Error(J.PUBKEY_PARSE);
        case 2:
          throw new Error(J.PUBKEY_COMBINE);
        case 3:
          throw new Error(J.PUBKEY_SERIALIZE);
      }
    },
    publicKeyTweakAdd(t, r, n = !0, i) {
      switch (
        (Y("public key", t, [33, 65]),
        Y("tweak", r, 32),
        _n(n),
        (i = Jt(i, n ? 33 : 65)),
        e.publicKeyTweakAdd(i, t, r))
      ) {
        case 0:
          return i;
        case 1:
          throw new Error(J.PUBKEY_PARSE);
        case 2:
          throw new Error(J.TWEAK_ADD);
      }
    },
    publicKeyTweakMul(t, r, n = !0, i) {
      switch (
        (Y("public key", t, [33, 65]),
        Y("tweak", r, 32),
        _n(n),
        (i = Jt(i, n ? 33 : 65)),
        e.publicKeyTweakMul(i, t, r))
      ) {
        case 0:
          return i;
        case 1:
          throw new Error(J.PUBKEY_PARSE);
        case 2:
          throw new Error(J.TWEAK_MUL);
      }
    },
    signatureNormalize(t) {
      switch ((Y("signature", t, 64), e.signatureNormalize(t))) {
        case 0:
          return t;
        case 1:
          throw new Error(J.SIG_PARSE);
      }
    },
    signatureExport(t, r) {
      (Y("signature", t, 64), (r = Jt(r, 72)));
      let n = { output: r, outputlen: 72 };
      switch (e.signatureExport(n, t)) {
        case 0:
          return r.slice(0, n.outputlen);
        case 1:
          throw new Error(J.SIG_PARSE);
        case 2:
          throw new Error(J.IMPOSSIBLE_CASE);
      }
    },
    signatureImport(t, r) {
      switch ((Y("signature", t), (r = Jt(r, 64)), e.signatureImport(r, t))) {
        case 0:
          return r;
        case 1:
          throw new Error(J.SIG_PARSE);
        case 2:
          throw new Error(J.IMPOSSIBLE_CASE);
      }
    },
    ecdsaSign(t, r, n = {}, i) {
      (Y("message", t, 32),
        Y("private key", r, 32),
        jt(ti(n) === "Object", "Expected options to be an Object"),
        n.data !== void 0 && Y("options.data", n.data),
        n.noncefn !== void 0 &&
          jt(
            ti(n.noncefn) === "Function",
            "Expected options.noncefn to be a Function",
          ),
        (i = Jt(i, 64)));
      let s = { signature: i, recid: null };
      switch (e.ecdsaSign(s, t, r, n.data, n.noncefn)) {
        case 0:
          return s;
        case 1:
          throw new Error(J.SIGN);
        case 2:
          throw new Error(J.IMPOSSIBLE_CASE);
      }
    },
    ecdsaVerify(t, r, n) {
      switch (
        (Y("signature", t, 64),
        Y("message", r, 32),
        Y("public key", n, [33, 65]),
        e.ecdsaVerify(t, r, n))
      ) {
        case 0:
          return !0;
        case 3:
          return !1;
        case 1:
          throw new Error(J.SIG_PARSE);
        case 2:
          throw new Error(J.PUBKEY_PARSE);
      }
    },
    ecdsaRecover(t, r, n, i = !0, s) {
      switch (
        (Y("signature", t, 64),
        jt(
          ti(r) === "Number" && r >= 0 && r <= 3,
          "Expected recovery id to be a Number within interval [0, 3]",
        ),
        Y("message", n, 32),
        _n(i),
        (s = Jt(s, i ? 33 : 65)),
        e.ecdsaRecover(s, t, r, n))
      ) {
        case 0:
          return s;
        case 1:
          throw new Error(J.SIG_PARSE);
        case 2:
          throw new Error(J.RECOVER);
        case 3:
          throw new Error(J.IMPOSSIBLE_CASE);
      }
    },
    ecdh(t, r, n = {}, i) {
      switch (
        (Y("public key", t, [33, 65]),
        Y("private key", r, 32),
        jt(ti(n) === "Object", "Expected options to be an Object"),
        n.data !== void 0 && Y("options.data", n.data),
        n.hashfn !== void 0
          ? (jt(
              ti(n.hashfn) === "Function",
              "Expected options.hashfn to be a Function",
            ),
            n.xbuf !== void 0 && Y("options.xbuf", n.xbuf, 32),
            n.ybuf !== void 0 && Y("options.ybuf", n.ybuf, 32),
            Y("output", i))
          : (i = Jt(i, 32)),
        e.ecdh(i, t, r, n.data, n.hashfn, n.xbuf, n.ybuf))
      ) {
        case 0:
          return i;
        case 1:
          throw new Error(J.PUBKEY_PARSE);
        case 2:
          throw new Error(J.ECDH);
      }
    },
  });
});
var m0 = _((HT, g0) => {
  var K4 = y0()(__dirname);
  g0.exports = ra()(new K4.Secp256k1());
});
var w0 = _((NT, j4) => {
  j4.exports = {
    name: "elliptic",
    version: "6.6.1",
    description: "EC cryptography",
    main: "lib/elliptic.js",
    files: ["lib"],
    scripts: {
      lint: "eslint lib test",
      "lint:fix": "npm run lint -- --fix",
      unit: "istanbul test _mocha --reporter=spec test/index.js",
      test: "npm run lint && npm run unit",
      version: "grunt dist && git add dist/",
    },
    repository: { type: "git", url: "git@github.com:indutny/elliptic" },
    keywords: ["EC", "Elliptic", "curve", "Cryptography"],
    author: "Fedor Indutny <fedor@indutny.com>",
    license: "MIT",
    bugs: { url: "https://github.com/indutny/elliptic/issues" },
    homepage: "https://github.com/indutny/elliptic",
    devDependencies: {
      brfs: "^2.0.2",
      coveralls: "^3.1.0",
      eslint: "^7.6.0",
      grunt: "^1.2.1",
      "grunt-browserify": "^5.3.0",
      "grunt-cli": "^1.3.2",
      "grunt-contrib-connect": "^3.0.0",
      "grunt-contrib-copy": "^1.0.0",
      "grunt-contrib-uglify": "^5.0.0",
      "grunt-mocha-istanbul": "^5.0.2",
      "grunt-saucelabs": "^9.0.1",
      istanbul: "^0.4.5",
      mocha: "^8.0.1",
    },
    dependencies: {
      "bn.js": "^4.11.9",
      brorand: "^1.1.0",
      "hash.js": "^1.0.0",
      "hmac-drbg": "^1.0.1",
      inherits: "^2.0.4",
      "minimalistic-assert": "^1.0.1",
      "minimalistic-crypto-utils": "^1.0.1",
    },
  };
});
var Zt = _((_0, na) => {
  (function (e, t) {
    "use strict";
    function r(S, a) {
      if (!S) throw new Error(a || "Assertion failed");
    }
    function n(S, a) {
      S.super_ = a;
      var d = function () {};
      ((d.prototype = a.prototype),
        (S.prototype = new d()),
        (S.prototype.constructor = S));
    }
    function i(S, a, d) {
      if (i.isBN(S)) return S;
      ((this.negative = 0),
        (this.words = null),
        (this.length = 0),
        (this.red = null),
        S !== null &&
          ((a === "le" || a === "be") && ((d = a), (a = 10)),
          this._init(S || 0, a || 10, d || "be")));
    }
    (typeof e == "object" ? (e.exports = i) : (t.BN = i),
      (i.BN = i),
      (i.wordSize = 26));
    var s;
    try {
      typeof window < "u" && typeof window.Buffer < "u"
        ? (s = window.Buffer)
        : (s = require("buffer").Buffer);
    } catch {}
    ((i.isBN = function (a) {
      return a instanceof i
        ? !0
        : a !== null &&
            typeof a == "object" &&
            a.constructor.wordSize === i.wordSize &&
            Array.isArray(a.words);
    }),
      (i.max = function (a, d) {
        return a.cmp(d) > 0 ? a : d;
      }),
      (i.min = function (a, d) {
        return a.cmp(d) < 0 ? a : d;
      }),
      (i.prototype._init = function (a, d, b) {
        if (typeof a == "number") return this._initNumber(a, d, b);
        if (typeof a == "object") return this._initArray(a, d, b);
        (d === "hex" && (d = 16),
          r(d === (d | 0) && d >= 2 && d <= 36),
          (a = a.toString().replace(/\s+/g, "")));
        var y = 0;
        (a[0] === "-" && (y++, (this.negative = 1)),
          y < a.length &&
            (d === 16
              ? this._parseHex(a, y, b)
              : (this._parseBase(a, d, y),
                b === "le" && this._initArray(this.toArray(), d, b))));
      }),
      (i.prototype._initNumber = function (a, d, b) {
        (a < 0 && ((this.negative = 1), (a = -a)),
          a < 67108864
            ? ((this.words = [a & 67108863]), (this.length = 1))
            : a < 4503599627370496
              ? ((this.words = [a & 67108863, (a / 67108864) & 67108863]),
                (this.length = 2))
              : (r(a < 9007199254740992),
                (this.words = [a & 67108863, (a / 67108864) & 67108863, 1]),
                (this.length = 3)),
          b === "le" && this._initArray(this.toArray(), d, b));
      }),
      (i.prototype._initArray = function (a, d, b) {
        if ((r(typeof a.length == "number"), a.length <= 0))
          return ((this.words = [0]), (this.length = 1), this);
        ((this.length = Math.ceil(a.length / 3)),
          (this.words = new Array(this.length)));
        for (var y = 0; y < this.length; y++) this.words[y] = 0;
        var g,
          x,
          I = 0;
        if (b === "be")
          for (y = a.length - 1, g = 0; y >= 0; y -= 3)
            ((x = a[y] | (a[y - 1] << 8) | (a[y - 2] << 16)),
              (this.words[g] |= (x << I) & 67108863),
              (this.words[g + 1] = (x >>> (26 - I)) & 67108863),
              (I += 24),
              I >= 26 && ((I -= 26), g++));
        else if (b === "le")
          for (y = 0, g = 0; y < a.length; y += 3)
            ((x = a[y] | (a[y + 1] << 8) | (a[y + 2] << 16)),
              (this.words[g] |= (x << I) & 67108863),
              (this.words[g + 1] = (x >>> (26 - I)) & 67108863),
              (I += 24),
              I >= 26 && ((I -= 26), g++));
        return this.strip();
      }));
    function o(S, a) {
      var d = S.charCodeAt(a);
      return d >= 65 && d <= 70
        ? d - 55
        : d >= 97 && d <= 102
          ? d - 87
          : (d - 48) & 15;
    }
    function f(S, a, d) {
      var b = o(S, d);
      return (d - 1 >= a && (b |= o(S, d - 1) << 4), b);
    }
    i.prototype._parseHex = function (a, d, b) {
      ((this.length = Math.ceil((a.length - d) / 6)),
        (this.words = new Array(this.length)));
      for (var y = 0; y < this.length; y++) this.words[y] = 0;
      var g = 0,
        x = 0,
        I;
      if (b === "be")
        for (y = a.length - 1; y >= d; y -= 2)
          ((I = f(a, d, y) << g),
            (this.words[x] |= I & 67108863),
            g >= 18
              ? ((g -= 18), (x += 1), (this.words[x] |= I >>> 26))
              : (g += 8));
      else {
        var v = a.length - d;
        for (y = v % 2 === 0 ? d + 1 : d; y < a.length; y += 2)
          ((I = f(a, d, y) << g),
            (this.words[x] |= I & 67108863),
            g >= 18
              ? ((g -= 18), (x += 1), (this.words[x] |= I >>> 26))
              : (g += 8));
      }
      this.strip();
    };
    function u(S, a, d, b) {
      for (var y = 0, g = Math.min(S.length, d), x = a; x < g; x++) {
        var I = S.charCodeAt(x) - 48;
        ((y *= b),
          I >= 49
            ? (y += I - 49 + 10)
            : I >= 17
              ? (y += I - 17 + 10)
              : (y += I));
      }
      return y;
    }
    ((i.prototype._parseBase = function (a, d, b) {
      ((this.words = [0]), (this.length = 1));
      for (var y = 0, g = 1; g <= 67108863; g *= d) y++;
      (y--, (g = (g / d) | 0));
      for (
        var x = a.length - b,
          I = x % y,
          v = Math.min(x, x - I) + b,
          c = 0,
          m = b;
        m < v;
        m += y
      )
        ((c = u(a, m, m + y, d)),
          this.imuln(g),
          this.words[0] + c < 67108864 ? (this.words[0] += c) : this._iaddn(c));
      if (I !== 0) {
        var N = 1;
        for (c = u(a, m, a.length, d), m = 0; m < I; m++) N *= d;
        (this.imuln(N),
          this.words[0] + c < 67108864 ? (this.words[0] += c) : this._iaddn(c));
      }
      this.strip();
    }),
      (i.prototype.copy = function (a) {
        a.words = new Array(this.length);
        for (var d = 0; d < this.length; d++) a.words[d] = this.words[d];
        ((a.length = this.length),
          (a.negative = this.negative),
          (a.red = this.red));
      }),
      (i.prototype.clone = function () {
        var a = new i(null);
        return (this.copy(a), a);
      }),
      (i.prototype._expand = function (a) {
        for (; this.length < a; ) this.words[this.length++] = 0;
        return this;
      }),
      (i.prototype.strip = function () {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }),
      (i.prototype._normSign = function () {
        return (
          this.length === 1 && this.words[0] === 0 && (this.negative = 0),
          this
        );
      }),
      (i.prototype.inspect = function () {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }));
    var l = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000",
      ],
      p = [
        0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      ],
      h = [
        0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
        16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
        11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
        5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
        20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
        60466176,
      ];
    ((i.prototype.toString = function (a, d) {
      ((a = a || 10), (d = d | 0 || 1));
      var b;
      if (a === 16 || a === "hex") {
        b = "";
        for (var y = 0, g = 0, x = 0; x < this.length; x++) {
          var I = this.words[x],
            v = (((I << y) | g) & 16777215).toString(16);
          ((g = (I >>> (24 - y)) & 16777215),
            (y += 2),
            y >= 26 && ((y -= 26), x--),
            g !== 0 || x !== this.length - 1
              ? (b = l[6 - v.length] + v + b)
              : (b = v + b));
        }
        for (g !== 0 && (b = g.toString(16) + b); b.length % d !== 0; )
          b = "0" + b;
        return (this.negative !== 0 && (b = "-" + b), b);
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var c = p[a],
          m = h[a];
        b = "";
        var N = this.clone();
        for (N.negative = 0; !N.isZero(); ) {
          var R = N.modn(m).toString(a);
          ((N = N.idivn(m)),
            N.isZero() ? (b = R + b) : (b = l[c - R.length] + R + b));
        }
        for (this.isZero() && (b = "0" + b); b.length % d !== 0; ) b = "0" + b;
        return (this.negative !== 0 && (b = "-" + b), b);
      }
      r(!1, "Base should be between 2 and 36");
    }),
      (i.prototype.toNumber = function () {
        var a = this.words[0];
        return (
          this.length === 2
            ? (a += this.words[1] * 67108864)
            : this.length === 3 && this.words[2] === 1
              ? (a += 4503599627370496 + this.words[1] * 67108864)
              : this.length > 2 &&
                r(!1, "Number can only safely store up to 53 bits"),
          this.negative !== 0 ? -a : a
        );
      }),
      (i.prototype.toJSON = function () {
        return this.toString(16);
      }),
      (i.prototype.toBuffer = function (a, d) {
        return (r(typeof s < "u"), this.toArrayLike(s, a, d));
      }),
      (i.prototype.toArray = function (a, d) {
        return this.toArrayLike(Array, a, d);
      }),
      (i.prototype.toArrayLike = function (a, d, b) {
        var y = this.byteLength(),
          g = b || Math.max(1, y);
        (r(y <= g, "byte array longer than desired length"),
          r(g > 0, "Requested array length <= 0"),
          this.strip());
        var x = d === "le",
          I = new a(g),
          v,
          c,
          m = this.clone();
        if (x) {
          for (c = 0; !m.isZero(); c++)
            ((v = m.andln(255)), m.iushrn(8), (I[c] = v));
          for (; c < g; c++) I[c] = 0;
        } else {
          for (c = 0; c < g - y; c++) I[c] = 0;
          for (c = 0; !m.isZero(); c++)
            ((v = m.andln(255)), m.iushrn(8), (I[g - c - 1] = v));
        }
        return I;
      }),
      Math.clz32
        ? (i.prototype._countBits = function (a) {
            return 32 - Math.clz32(a);
          })
        : (i.prototype._countBits = function (a) {
            var d = a,
              b = 0;
            return (
              d >= 4096 && ((b += 13), (d >>>= 13)),
              d >= 64 && ((b += 7), (d >>>= 7)),
              d >= 8 && ((b += 4), (d >>>= 4)),
              d >= 2 && ((b += 2), (d >>>= 2)),
              b + d
            );
          }),
      (i.prototype._zeroBits = function (a) {
        if (a === 0) return 26;
        var d = a,
          b = 0;
        return (
          (d & 8191) === 0 && ((b += 13), (d >>>= 13)),
          (d & 127) === 0 && ((b += 7), (d >>>= 7)),
          (d & 15) === 0 && ((b += 4), (d >>>= 4)),
          (d & 3) === 0 && ((b += 2), (d >>>= 2)),
          (d & 1) === 0 && b++,
          b
        );
      }),
      (i.prototype.bitLength = function () {
        var a = this.words[this.length - 1],
          d = this._countBits(a);
        return (this.length - 1) * 26 + d;
      }));
    function w(S) {
      for (var a = new Array(S.bitLength()), d = 0; d < a.length; d++) {
        var b = (d / 26) | 0,
          y = d % 26;
        a[d] = (S.words[b] & (1 << y)) >>> y;
      }
      return a;
    }
    ((i.prototype.zeroBits = function () {
      if (this.isZero()) return 0;
      for (var a = 0, d = 0; d < this.length; d++) {
        var b = this._zeroBits(this.words[d]);
        if (((a += b), b !== 26)) break;
      }
      return a;
    }),
      (i.prototype.byteLength = function () {
        return Math.ceil(this.bitLength() / 8);
      }),
      (i.prototype.toTwos = function (a) {
        return this.negative !== 0
          ? this.abs().inotn(a).iaddn(1)
          : this.clone();
      }),
      (i.prototype.fromTwos = function (a) {
        return this.testn(a - 1) ? this.notn(a).iaddn(1).ineg() : this.clone();
      }),
      (i.prototype.isNeg = function () {
        return this.negative !== 0;
      }),
      (i.prototype.neg = function () {
        return this.clone().ineg();
      }),
      (i.prototype.ineg = function () {
        return (this.isZero() || (this.negative ^= 1), this);
      }),
      (i.prototype.iuor = function (a) {
        for (; this.length < a.length; ) this.words[this.length++] = 0;
        for (var d = 0; d < a.length; d++)
          this.words[d] = this.words[d] | a.words[d];
        return this.strip();
      }),
      (i.prototype.ior = function (a) {
        return (r((this.negative | a.negative) === 0), this.iuor(a));
      }),
      (i.prototype.or = function (a) {
        return this.length > a.length
          ? this.clone().ior(a)
          : a.clone().ior(this);
      }),
      (i.prototype.uor = function (a) {
        return this.length > a.length
          ? this.clone().iuor(a)
          : a.clone().iuor(this);
      }),
      (i.prototype.iuand = function (a) {
        var d;
        this.length > a.length ? (d = a) : (d = this);
        for (var b = 0; b < d.length; b++)
          this.words[b] = this.words[b] & a.words[b];
        return ((this.length = d.length), this.strip());
      }),
      (i.prototype.iand = function (a) {
        return (r((this.negative | a.negative) === 0), this.iuand(a));
      }),
      (i.prototype.and = function (a) {
        return this.length > a.length
          ? this.clone().iand(a)
          : a.clone().iand(this);
      }),
      (i.prototype.uand = function (a) {
        return this.length > a.length
          ? this.clone().iuand(a)
          : a.clone().iuand(this);
      }),
      (i.prototype.iuxor = function (a) {
        var d, b;
        this.length > a.length ? ((d = this), (b = a)) : ((d = a), (b = this));
        for (var y = 0; y < b.length; y++)
          this.words[y] = d.words[y] ^ b.words[y];
        if (this !== d) for (; y < d.length; y++) this.words[y] = d.words[y];
        return ((this.length = d.length), this.strip());
      }),
      (i.prototype.ixor = function (a) {
        return (r((this.negative | a.negative) === 0), this.iuxor(a));
      }),
      (i.prototype.xor = function (a) {
        return this.length > a.length
          ? this.clone().ixor(a)
          : a.clone().ixor(this);
      }),
      (i.prototype.uxor = function (a) {
        return this.length > a.length
          ? this.clone().iuxor(a)
          : a.clone().iuxor(this);
      }),
      (i.prototype.inotn = function (a) {
        r(typeof a == "number" && a >= 0);
        var d = Math.ceil(a / 26) | 0,
          b = a % 26;
        (this._expand(d), b > 0 && d--);
        for (var y = 0; y < d; y++) this.words[y] = ~this.words[y] & 67108863;
        return (
          b > 0 && (this.words[y] = ~this.words[y] & (67108863 >> (26 - b))),
          this.strip()
        );
      }),
      (i.prototype.notn = function (a) {
        return this.clone().inotn(a);
      }),
      (i.prototype.setn = function (a, d) {
        r(typeof a == "number" && a >= 0);
        var b = (a / 26) | 0,
          y = a % 26;
        return (
          this._expand(b + 1),
          d
            ? (this.words[b] = this.words[b] | (1 << y))
            : (this.words[b] = this.words[b] & ~(1 << y)),
          this.strip()
        );
      }),
      (i.prototype.iadd = function (a) {
        var d;
        if (this.negative !== 0 && a.negative === 0)
          return (
            (this.negative = 0),
            (d = this.isub(a)),
            (this.negative ^= 1),
            this._normSign()
          );
        if (this.negative === 0 && a.negative !== 0)
          return (
            (a.negative = 0),
            (d = this.isub(a)),
            (a.negative = 1),
            d._normSign()
          );
        var b, y;
        this.length > a.length ? ((b = this), (y = a)) : ((b = a), (y = this));
        for (var g = 0, x = 0; x < y.length; x++)
          ((d = (b.words[x] | 0) + (y.words[x] | 0) + g),
            (this.words[x] = d & 67108863),
            (g = d >>> 26));
        for (; g !== 0 && x < b.length; x++)
          ((d = (b.words[x] | 0) + g),
            (this.words[x] = d & 67108863),
            (g = d >>> 26));
        if (((this.length = b.length), g !== 0))
          ((this.words[this.length] = g), this.length++);
        else if (b !== this)
          for (; x < b.length; x++) this.words[x] = b.words[x];
        return this;
      }),
      (i.prototype.add = function (a) {
        var d;
        return a.negative !== 0 && this.negative === 0
          ? ((a.negative = 0), (d = this.sub(a)), (a.negative ^= 1), d)
          : a.negative === 0 && this.negative !== 0
            ? ((this.negative = 0), (d = a.sub(this)), (this.negative = 1), d)
            : this.length > a.length
              ? this.clone().iadd(a)
              : a.clone().iadd(this);
      }),
      (i.prototype.isub = function (a) {
        if (a.negative !== 0) {
          a.negative = 0;
          var d = this.iadd(a);
          return ((a.negative = 1), d._normSign());
        } else if (this.negative !== 0)
          return (
            (this.negative = 0),
            this.iadd(a),
            (this.negative = 1),
            this._normSign()
          );
        var b = this.cmp(a);
        if (b === 0)
          return (
            (this.negative = 0),
            (this.length = 1),
            (this.words[0] = 0),
            this
          );
        var y, g;
        b > 0 ? ((y = this), (g = a)) : ((y = a), (g = this));
        for (var x = 0, I = 0; I < g.length; I++)
          ((d = (y.words[I] | 0) - (g.words[I] | 0) + x),
            (x = d >> 26),
            (this.words[I] = d & 67108863));
        for (; x !== 0 && I < y.length; I++)
          ((d = (y.words[I] | 0) + x),
            (x = d >> 26),
            (this.words[I] = d & 67108863));
        if (x === 0 && I < y.length && y !== this)
          for (; I < y.length; I++) this.words[I] = y.words[I];
        return (
          (this.length = Math.max(this.length, I)),
          y !== this && (this.negative = 1),
          this.strip()
        );
      }),
      (i.prototype.sub = function (a) {
        return this.clone().isub(a);
      }));
    function E(S, a, d) {
      d.negative = a.negative ^ S.negative;
      var b = (S.length + a.length) | 0;
      ((d.length = b), (b = (b - 1) | 0));
      var y = S.words[0] | 0,
        g = a.words[0] | 0,
        x = y * g,
        I = x & 67108863,
        v = (x / 67108864) | 0;
      d.words[0] = I;
      for (var c = 1; c < b; c++) {
        for (
          var m = v >>> 26,
            N = v & 67108863,
            R = Math.min(c, a.length - 1),
            C = Math.max(0, c - S.length + 1);
          C <= R;
          C++
        ) {
          var D = (c - C) | 0;
          ((y = S.words[D] | 0),
            (g = a.words[C] | 0),
            (x = y * g + N),
            (m += (x / 67108864) | 0),
            (N = x & 67108863));
        }
        ((d.words[c] = N | 0), (v = m | 0));
      }
      return (v !== 0 ? (d.words[c] = v | 0) : d.length--, d.strip());
    }
    var A = function (a, d, b) {
      var y = a.words,
        g = d.words,
        x = b.words,
        I = 0,
        v,
        c,
        m,
        N = y[0] | 0,
        R = N & 8191,
        C = N >>> 13,
        D = y[1] | 0,
        Q = D & 8191,
        se = D >>> 13,
        Gr = y[2] | 0,
        oe = Gr & 8191,
        be = Gr >>> 13,
        Ou = y[3] | 0,
        Se = Ou & 8191,
        xe = Ou >>> 13,
        ku = y[4] | 0,
        Ee = ku & 8191,
        Ae = ku >>> 13,
        Bu = y[5] | 0,
        Ie = Bu & 8191,
        Te = Bu >>> 13,
        qu = y[6] | 0,
        Pe = qu & 8191,
        Me = qu >>> 13,
        Hu = y[7] | 0,
        Oe = Hu & 8191,
        ke = Hu >>> 13,
        Nu = y[8] | 0,
        Be = Nu & 8191,
        qe = Nu >>> 13,
        Ru = y[9] | 0,
        He = Ru & 8191,
        Ne = Ru >>> 13,
        Cu = g[0] | 0,
        Re = Cu & 8191,
        Ce = Cu >>> 13,
        Uu = g[1] | 0,
        Ue = Uu & 8191,
        Le = Uu >>> 13,
        Lu = g[2] | 0,
        Fe = Lu & 8191,
        Ke = Lu >>> 13,
        Fu = g[3] | 0,
        je = Fu & 8191,
        De = Fu >>> 13,
        Ku = g[4] | 0,
        Ve = Ku & 8191,
        We = Ku >>> 13,
        ju = g[5] | 0,
        ze = ju & 8191,
        Ge = ju >>> 13,
        Du = g[6] | 0,
        Xe = Du & 8191,
        Ye = Du >>> 13,
        Vu = g[7] | 0,
        $e = Vu & 8191,
        Je = Vu >>> 13,
        Wu = g[8] | 0,
        Ze = Wu & 8191,
        Qe = Wu >>> 13,
        zu = g[9] | 0,
        et = zu & 8191,
        tt = zu >>> 13;
      ((b.negative = a.negative ^ d.negative),
        (b.length = 19),
        (v = Math.imul(R, Re)),
        (c = Math.imul(R, Ce)),
        (c = (c + Math.imul(C, Re)) | 0),
        (m = Math.imul(C, Ce)));
      var Mf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Mf >>> 26)) | 0),
        (Mf &= 67108863),
        (v = Math.imul(Q, Re)),
        (c = Math.imul(Q, Ce)),
        (c = (c + Math.imul(se, Re)) | 0),
        (m = Math.imul(se, Ce)),
        (v = (v + Math.imul(R, Ue)) | 0),
        (c = (c + Math.imul(R, Le)) | 0),
        (c = (c + Math.imul(C, Ue)) | 0),
        (m = (m + Math.imul(C, Le)) | 0));
      var Of = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Of >>> 26)) | 0),
        (Of &= 67108863),
        (v = Math.imul(oe, Re)),
        (c = Math.imul(oe, Ce)),
        (c = (c + Math.imul(be, Re)) | 0),
        (m = Math.imul(be, Ce)),
        (v = (v + Math.imul(Q, Ue)) | 0),
        (c = (c + Math.imul(Q, Le)) | 0),
        (c = (c + Math.imul(se, Ue)) | 0),
        (m = (m + Math.imul(se, Le)) | 0),
        (v = (v + Math.imul(R, Fe)) | 0),
        (c = (c + Math.imul(R, Ke)) | 0),
        (c = (c + Math.imul(C, Fe)) | 0),
        (m = (m + Math.imul(C, Ke)) | 0));
      var kf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (kf >>> 26)) | 0),
        (kf &= 67108863),
        (v = Math.imul(Se, Re)),
        (c = Math.imul(Se, Ce)),
        (c = (c + Math.imul(xe, Re)) | 0),
        (m = Math.imul(xe, Ce)),
        (v = (v + Math.imul(oe, Ue)) | 0),
        (c = (c + Math.imul(oe, Le)) | 0),
        (c = (c + Math.imul(be, Ue)) | 0),
        (m = (m + Math.imul(be, Le)) | 0),
        (v = (v + Math.imul(Q, Fe)) | 0),
        (c = (c + Math.imul(Q, Ke)) | 0),
        (c = (c + Math.imul(se, Fe)) | 0),
        (m = (m + Math.imul(se, Ke)) | 0),
        (v = (v + Math.imul(R, je)) | 0),
        (c = (c + Math.imul(R, De)) | 0),
        (c = (c + Math.imul(C, je)) | 0),
        (m = (m + Math.imul(C, De)) | 0));
      var Bf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Bf >>> 26)) | 0),
        (Bf &= 67108863),
        (v = Math.imul(Ee, Re)),
        (c = Math.imul(Ee, Ce)),
        (c = (c + Math.imul(Ae, Re)) | 0),
        (m = Math.imul(Ae, Ce)),
        (v = (v + Math.imul(Se, Ue)) | 0),
        (c = (c + Math.imul(Se, Le)) | 0),
        (c = (c + Math.imul(xe, Ue)) | 0),
        (m = (m + Math.imul(xe, Le)) | 0),
        (v = (v + Math.imul(oe, Fe)) | 0),
        (c = (c + Math.imul(oe, Ke)) | 0),
        (c = (c + Math.imul(be, Fe)) | 0),
        (m = (m + Math.imul(be, Ke)) | 0),
        (v = (v + Math.imul(Q, je)) | 0),
        (c = (c + Math.imul(Q, De)) | 0),
        (c = (c + Math.imul(se, je)) | 0),
        (m = (m + Math.imul(se, De)) | 0),
        (v = (v + Math.imul(R, Ve)) | 0),
        (c = (c + Math.imul(R, We)) | 0),
        (c = (c + Math.imul(C, Ve)) | 0),
        (m = (m + Math.imul(C, We)) | 0));
      var qf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (qf >>> 26)) | 0),
        (qf &= 67108863),
        (v = Math.imul(Ie, Re)),
        (c = Math.imul(Ie, Ce)),
        (c = (c + Math.imul(Te, Re)) | 0),
        (m = Math.imul(Te, Ce)),
        (v = (v + Math.imul(Ee, Ue)) | 0),
        (c = (c + Math.imul(Ee, Le)) | 0),
        (c = (c + Math.imul(Ae, Ue)) | 0),
        (m = (m + Math.imul(Ae, Le)) | 0),
        (v = (v + Math.imul(Se, Fe)) | 0),
        (c = (c + Math.imul(Se, Ke)) | 0),
        (c = (c + Math.imul(xe, Fe)) | 0),
        (m = (m + Math.imul(xe, Ke)) | 0),
        (v = (v + Math.imul(oe, je)) | 0),
        (c = (c + Math.imul(oe, De)) | 0),
        (c = (c + Math.imul(be, je)) | 0),
        (m = (m + Math.imul(be, De)) | 0),
        (v = (v + Math.imul(Q, Ve)) | 0),
        (c = (c + Math.imul(Q, We)) | 0),
        (c = (c + Math.imul(se, Ve)) | 0),
        (m = (m + Math.imul(se, We)) | 0),
        (v = (v + Math.imul(R, ze)) | 0),
        (c = (c + Math.imul(R, Ge)) | 0),
        (c = (c + Math.imul(C, ze)) | 0),
        (m = (m + Math.imul(C, Ge)) | 0));
      var Hf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Hf >>> 26)) | 0),
        (Hf &= 67108863),
        (v = Math.imul(Pe, Re)),
        (c = Math.imul(Pe, Ce)),
        (c = (c + Math.imul(Me, Re)) | 0),
        (m = Math.imul(Me, Ce)),
        (v = (v + Math.imul(Ie, Ue)) | 0),
        (c = (c + Math.imul(Ie, Le)) | 0),
        (c = (c + Math.imul(Te, Ue)) | 0),
        (m = (m + Math.imul(Te, Le)) | 0),
        (v = (v + Math.imul(Ee, Fe)) | 0),
        (c = (c + Math.imul(Ee, Ke)) | 0),
        (c = (c + Math.imul(Ae, Fe)) | 0),
        (m = (m + Math.imul(Ae, Ke)) | 0),
        (v = (v + Math.imul(Se, je)) | 0),
        (c = (c + Math.imul(Se, De)) | 0),
        (c = (c + Math.imul(xe, je)) | 0),
        (m = (m + Math.imul(xe, De)) | 0),
        (v = (v + Math.imul(oe, Ve)) | 0),
        (c = (c + Math.imul(oe, We)) | 0),
        (c = (c + Math.imul(be, Ve)) | 0),
        (m = (m + Math.imul(be, We)) | 0),
        (v = (v + Math.imul(Q, ze)) | 0),
        (c = (c + Math.imul(Q, Ge)) | 0),
        (c = (c + Math.imul(se, ze)) | 0),
        (m = (m + Math.imul(se, Ge)) | 0),
        (v = (v + Math.imul(R, Xe)) | 0),
        (c = (c + Math.imul(R, Ye)) | 0),
        (c = (c + Math.imul(C, Xe)) | 0),
        (m = (m + Math.imul(C, Ye)) | 0));
      var Nf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Nf >>> 26)) | 0),
        (Nf &= 67108863),
        (v = Math.imul(Oe, Re)),
        (c = Math.imul(Oe, Ce)),
        (c = (c + Math.imul(ke, Re)) | 0),
        (m = Math.imul(ke, Ce)),
        (v = (v + Math.imul(Pe, Ue)) | 0),
        (c = (c + Math.imul(Pe, Le)) | 0),
        (c = (c + Math.imul(Me, Ue)) | 0),
        (m = (m + Math.imul(Me, Le)) | 0),
        (v = (v + Math.imul(Ie, Fe)) | 0),
        (c = (c + Math.imul(Ie, Ke)) | 0),
        (c = (c + Math.imul(Te, Fe)) | 0),
        (m = (m + Math.imul(Te, Ke)) | 0),
        (v = (v + Math.imul(Ee, je)) | 0),
        (c = (c + Math.imul(Ee, De)) | 0),
        (c = (c + Math.imul(Ae, je)) | 0),
        (m = (m + Math.imul(Ae, De)) | 0),
        (v = (v + Math.imul(Se, Ve)) | 0),
        (c = (c + Math.imul(Se, We)) | 0),
        (c = (c + Math.imul(xe, Ve)) | 0),
        (m = (m + Math.imul(xe, We)) | 0),
        (v = (v + Math.imul(oe, ze)) | 0),
        (c = (c + Math.imul(oe, Ge)) | 0),
        (c = (c + Math.imul(be, ze)) | 0),
        (m = (m + Math.imul(be, Ge)) | 0),
        (v = (v + Math.imul(Q, Xe)) | 0),
        (c = (c + Math.imul(Q, Ye)) | 0),
        (c = (c + Math.imul(se, Xe)) | 0),
        (m = (m + Math.imul(se, Ye)) | 0),
        (v = (v + Math.imul(R, $e)) | 0),
        (c = (c + Math.imul(R, Je)) | 0),
        (c = (c + Math.imul(C, $e)) | 0),
        (m = (m + Math.imul(C, Je)) | 0));
      var Rf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Rf >>> 26)) | 0),
        (Rf &= 67108863),
        (v = Math.imul(Be, Re)),
        (c = Math.imul(Be, Ce)),
        (c = (c + Math.imul(qe, Re)) | 0),
        (m = Math.imul(qe, Ce)),
        (v = (v + Math.imul(Oe, Ue)) | 0),
        (c = (c + Math.imul(Oe, Le)) | 0),
        (c = (c + Math.imul(ke, Ue)) | 0),
        (m = (m + Math.imul(ke, Le)) | 0),
        (v = (v + Math.imul(Pe, Fe)) | 0),
        (c = (c + Math.imul(Pe, Ke)) | 0),
        (c = (c + Math.imul(Me, Fe)) | 0),
        (m = (m + Math.imul(Me, Ke)) | 0),
        (v = (v + Math.imul(Ie, je)) | 0),
        (c = (c + Math.imul(Ie, De)) | 0),
        (c = (c + Math.imul(Te, je)) | 0),
        (m = (m + Math.imul(Te, De)) | 0),
        (v = (v + Math.imul(Ee, Ve)) | 0),
        (c = (c + Math.imul(Ee, We)) | 0),
        (c = (c + Math.imul(Ae, Ve)) | 0),
        (m = (m + Math.imul(Ae, We)) | 0),
        (v = (v + Math.imul(Se, ze)) | 0),
        (c = (c + Math.imul(Se, Ge)) | 0),
        (c = (c + Math.imul(xe, ze)) | 0),
        (m = (m + Math.imul(xe, Ge)) | 0),
        (v = (v + Math.imul(oe, Xe)) | 0),
        (c = (c + Math.imul(oe, Ye)) | 0),
        (c = (c + Math.imul(be, Xe)) | 0),
        (m = (m + Math.imul(be, Ye)) | 0),
        (v = (v + Math.imul(Q, $e)) | 0),
        (c = (c + Math.imul(Q, Je)) | 0),
        (c = (c + Math.imul(se, $e)) | 0),
        (m = (m + Math.imul(se, Je)) | 0),
        (v = (v + Math.imul(R, Ze)) | 0),
        (c = (c + Math.imul(R, Qe)) | 0),
        (c = (c + Math.imul(C, Ze)) | 0),
        (m = (m + Math.imul(C, Qe)) | 0));
      var Cf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Cf >>> 26)) | 0),
        (Cf &= 67108863),
        (v = Math.imul(He, Re)),
        (c = Math.imul(He, Ce)),
        (c = (c + Math.imul(Ne, Re)) | 0),
        (m = Math.imul(Ne, Ce)),
        (v = (v + Math.imul(Be, Ue)) | 0),
        (c = (c + Math.imul(Be, Le)) | 0),
        (c = (c + Math.imul(qe, Ue)) | 0),
        (m = (m + Math.imul(qe, Le)) | 0),
        (v = (v + Math.imul(Oe, Fe)) | 0),
        (c = (c + Math.imul(Oe, Ke)) | 0),
        (c = (c + Math.imul(ke, Fe)) | 0),
        (m = (m + Math.imul(ke, Ke)) | 0),
        (v = (v + Math.imul(Pe, je)) | 0),
        (c = (c + Math.imul(Pe, De)) | 0),
        (c = (c + Math.imul(Me, je)) | 0),
        (m = (m + Math.imul(Me, De)) | 0),
        (v = (v + Math.imul(Ie, Ve)) | 0),
        (c = (c + Math.imul(Ie, We)) | 0),
        (c = (c + Math.imul(Te, Ve)) | 0),
        (m = (m + Math.imul(Te, We)) | 0),
        (v = (v + Math.imul(Ee, ze)) | 0),
        (c = (c + Math.imul(Ee, Ge)) | 0),
        (c = (c + Math.imul(Ae, ze)) | 0),
        (m = (m + Math.imul(Ae, Ge)) | 0),
        (v = (v + Math.imul(Se, Xe)) | 0),
        (c = (c + Math.imul(Se, Ye)) | 0),
        (c = (c + Math.imul(xe, Xe)) | 0),
        (m = (m + Math.imul(xe, Ye)) | 0),
        (v = (v + Math.imul(oe, $e)) | 0),
        (c = (c + Math.imul(oe, Je)) | 0),
        (c = (c + Math.imul(be, $e)) | 0),
        (m = (m + Math.imul(be, Je)) | 0),
        (v = (v + Math.imul(Q, Ze)) | 0),
        (c = (c + Math.imul(Q, Qe)) | 0),
        (c = (c + Math.imul(se, Ze)) | 0),
        (m = (m + Math.imul(se, Qe)) | 0),
        (v = (v + Math.imul(R, et)) | 0),
        (c = (c + Math.imul(R, tt)) | 0),
        (c = (c + Math.imul(C, et)) | 0),
        (m = (m + Math.imul(C, tt)) | 0));
      var Uf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Uf >>> 26)) | 0),
        (Uf &= 67108863),
        (v = Math.imul(He, Ue)),
        (c = Math.imul(He, Le)),
        (c = (c + Math.imul(Ne, Ue)) | 0),
        (m = Math.imul(Ne, Le)),
        (v = (v + Math.imul(Be, Fe)) | 0),
        (c = (c + Math.imul(Be, Ke)) | 0),
        (c = (c + Math.imul(qe, Fe)) | 0),
        (m = (m + Math.imul(qe, Ke)) | 0),
        (v = (v + Math.imul(Oe, je)) | 0),
        (c = (c + Math.imul(Oe, De)) | 0),
        (c = (c + Math.imul(ke, je)) | 0),
        (m = (m + Math.imul(ke, De)) | 0),
        (v = (v + Math.imul(Pe, Ve)) | 0),
        (c = (c + Math.imul(Pe, We)) | 0),
        (c = (c + Math.imul(Me, Ve)) | 0),
        (m = (m + Math.imul(Me, We)) | 0),
        (v = (v + Math.imul(Ie, ze)) | 0),
        (c = (c + Math.imul(Ie, Ge)) | 0),
        (c = (c + Math.imul(Te, ze)) | 0),
        (m = (m + Math.imul(Te, Ge)) | 0),
        (v = (v + Math.imul(Ee, Xe)) | 0),
        (c = (c + Math.imul(Ee, Ye)) | 0),
        (c = (c + Math.imul(Ae, Xe)) | 0),
        (m = (m + Math.imul(Ae, Ye)) | 0),
        (v = (v + Math.imul(Se, $e)) | 0),
        (c = (c + Math.imul(Se, Je)) | 0),
        (c = (c + Math.imul(xe, $e)) | 0),
        (m = (m + Math.imul(xe, Je)) | 0),
        (v = (v + Math.imul(oe, Ze)) | 0),
        (c = (c + Math.imul(oe, Qe)) | 0),
        (c = (c + Math.imul(be, Ze)) | 0),
        (m = (m + Math.imul(be, Qe)) | 0),
        (v = (v + Math.imul(Q, et)) | 0),
        (c = (c + Math.imul(Q, tt)) | 0),
        (c = (c + Math.imul(se, et)) | 0),
        (m = (m + Math.imul(se, tt)) | 0));
      var Lf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Lf >>> 26)) | 0),
        (Lf &= 67108863),
        (v = Math.imul(He, Fe)),
        (c = Math.imul(He, Ke)),
        (c = (c + Math.imul(Ne, Fe)) | 0),
        (m = Math.imul(Ne, Ke)),
        (v = (v + Math.imul(Be, je)) | 0),
        (c = (c + Math.imul(Be, De)) | 0),
        (c = (c + Math.imul(qe, je)) | 0),
        (m = (m + Math.imul(qe, De)) | 0),
        (v = (v + Math.imul(Oe, Ve)) | 0),
        (c = (c + Math.imul(Oe, We)) | 0),
        (c = (c + Math.imul(ke, Ve)) | 0),
        (m = (m + Math.imul(ke, We)) | 0),
        (v = (v + Math.imul(Pe, ze)) | 0),
        (c = (c + Math.imul(Pe, Ge)) | 0),
        (c = (c + Math.imul(Me, ze)) | 0),
        (m = (m + Math.imul(Me, Ge)) | 0),
        (v = (v + Math.imul(Ie, Xe)) | 0),
        (c = (c + Math.imul(Ie, Ye)) | 0),
        (c = (c + Math.imul(Te, Xe)) | 0),
        (m = (m + Math.imul(Te, Ye)) | 0),
        (v = (v + Math.imul(Ee, $e)) | 0),
        (c = (c + Math.imul(Ee, Je)) | 0),
        (c = (c + Math.imul(Ae, $e)) | 0),
        (m = (m + Math.imul(Ae, Je)) | 0),
        (v = (v + Math.imul(Se, Ze)) | 0),
        (c = (c + Math.imul(Se, Qe)) | 0),
        (c = (c + Math.imul(xe, Ze)) | 0),
        (m = (m + Math.imul(xe, Qe)) | 0),
        (v = (v + Math.imul(oe, et)) | 0),
        (c = (c + Math.imul(oe, tt)) | 0),
        (c = (c + Math.imul(be, et)) | 0),
        (m = (m + Math.imul(be, tt)) | 0));
      var Ff = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Ff >>> 26)) | 0),
        (Ff &= 67108863),
        (v = Math.imul(He, je)),
        (c = Math.imul(He, De)),
        (c = (c + Math.imul(Ne, je)) | 0),
        (m = Math.imul(Ne, De)),
        (v = (v + Math.imul(Be, Ve)) | 0),
        (c = (c + Math.imul(Be, We)) | 0),
        (c = (c + Math.imul(qe, Ve)) | 0),
        (m = (m + Math.imul(qe, We)) | 0),
        (v = (v + Math.imul(Oe, ze)) | 0),
        (c = (c + Math.imul(Oe, Ge)) | 0),
        (c = (c + Math.imul(ke, ze)) | 0),
        (m = (m + Math.imul(ke, Ge)) | 0),
        (v = (v + Math.imul(Pe, Xe)) | 0),
        (c = (c + Math.imul(Pe, Ye)) | 0),
        (c = (c + Math.imul(Me, Xe)) | 0),
        (m = (m + Math.imul(Me, Ye)) | 0),
        (v = (v + Math.imul(Ie, $e)) | 0),
        (c = (c + Math.imul(Ie, Je)) | 0),
        (c = (c + Math.imul(Te, $e)) | 0),
        (m = (m + Math.imul(Te, Je)) | 0),
        (v = (v + Math.imul(Ee, Ze)) | 0),
        (c = (c + Math.imul(Ee, Qe)) | 0),
        (c = (c + Math.imul(Ae, Ze)) | 0),
        (m = (m + Math.imul(Ae, Qe)) | 0),
        (v = (v + Math.imul(Se, et)) | 0),
        (c = (c + Math.imul(Se, tt)) | 0),
        (c = (c + Math.imul(xe, et)) | 0),
        (m = (m + Math.imul(xe, tt)) | 0));
      var Kf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Kf >>> 26)) | 0),
        (Kf &= 67108863),
        (v = Math.imul(He, Ve)),
        (c = Math.imul(He, We)),
        (c = (c + Math.imul(Ne, Ve)) | 0),
        (m = Math.imul(Ne, We)),
        (v = (v + Math.imul(Be, ze)) | 0),
        (c = (c + Math.imul(Be, Ge)) | 0),
        (c = (c + Math.imul(qe, ze)) | 0),
        (m = (m + Math.imul(qe, Ge)) | 0),
        (v = (v + Math.imul(Oe, Xe)) | 0),
        (c = (c + Math.imul(Oe, Ye)) | 0),
        (c = (c + Math.imul(ke, Xe)) | 0),
        (m = (m + Math.imul(ke, Ye)) | 0),
        (v = (v + Math.imul(Pe, $e)) | 0),
        (c = (c + Math.imul(Pe, Je)) | 0),
        (c = (c + Math.imul(Me, $e)) | 0),
        (m = (m + Math.imul(Me, Je)) | 0),
        (v = (v + Math.imul(Ie, Ze)) | 0),
        (c = (c + Math.imul(Ie, Qe)) | 0),
        (c = (c + Math.imul(Te, Ze)) | 0),
        (m = (m + Math.imul(Te, Qe)) | 0),
        (v = (v + Math.imul(Ee, et)) | 0),
        (c = (c + Math.imul(Ee, tt)) | 0),
        (c = (c + Math.imul(Ae, et)) | 0),
        (m = (m + Math.imul(Ae, tt)) | 0));
      var jf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (jf >>> 26)) | 0),
        (jf &= 67108863),
        (v = Math.imul(He, ze)),
        (c = Math.imul(He, Ge)),
        (c = (c + Math.imul(Ne, ze)) | 0),
        (m = Math.imul(Ne, Ge)),
        (v = (v + Math.imul(Be, Xe)) | 0),
        (c = (c + Math.imul(Be, Ye)) | 0),
        (c = (c + Math.imul(qe, Xe)) | 0),
        (m = (m + Math.imul(qe, Ye)) | 0),
        (v = (v + Math.imul(Oe, $e)) | 0),
        (c = (c + Math.imul(Oe, Je)) | 0),
        (c = (c + Math.imul(ke, $e)) | 0),
        (m = (m + Math.imul(ke, Je)) | 0),
        (v = (v + Math.imul(Pe, Ze)) | 0),
        (c = (c + Math.imul(Pe, Qe)) | 0),
        (c = (c + Math.imul(Me, Ze)) | 0),
        (m = (m + Math.imul(Me, Qe)) | 0),
        (v = (v + Math.imul(Ie, et)) | 0),
        (c = (c + Math.imul(Ie, tt)) | 0),
        (c = (c + Math.imul(Te, et)) | 0),
        (m = (m + Math.imul(Te, tt)) | 0));
      var Df = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Df >>> 26)) | 0),
        (Df &= 67108863),
        (v = Math.imul(He, Xe)),
        (c = Math.imul(He, Ye)),
        (c = (c + Math.imul(Ne, Xe)) | 0),
        (m = Math.imul(Ne, Ye)),
        (v = (v + Math.imul(Be, $e)) | 0),
        (c = (c + Math.imul(Be, Je)) | 0),
        (c = (c + Math.imul(qe, $e)) | 0),
        (m = (m + Math.imul(qe, Je)) | 0),
        (v = (v + Math.imul(Oe, Ze)) | 0),
        (c = (c + Math.imul(Oe, Qe)) | 0),
        (c = (c + Math.imul(ke, Ze)) | 0),
        (m = (m + Math.imul(ke, Qe)) | 0),
        (v = (v + Math.imul(Pe, et)) | 0),
        (c = (c + Math.imul(Pe, tt)) | 0),
        (c = (c + Math.imul(Me, et)) | 0),
        (m = (m + Math.imul(Me, tt)) | 0));
      var Vf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Vf >>> 26)) | 0),
        (Vf &= 67108863),
        (v = Math.imul(He, $e)),
        (c = Math.imul(He, Je)),
        (c = (c + Math.imul(Ne, $e)) | 0),
        (m = Math.imul(Ne, Je)),
        (v = (v + Math.imul(Be, Ze)) | 0),
        (c = (c + Math.imul(Be, Qe)) | 0),
        (c = (c + Math.imul(qe, Ze)) | 0),
        (m = (m + Math.imul(qe, Qe)) | 0),
        (v = (v + Math.imul(Oe, et)) | 0),
        (c = (c + Math.imul(Oe, tt)) | 0),
        (c = (c + Math.imul(ke, et)) | 0),
        (m = (m + Math.imul(ke, tt)) | 0));
      var Wf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (Wf >>> 26)) | 0),
        (Wf &= 67108863),
        (v = Math.imul(He, Ze)),
        (c = Math.imul(He, Qe)),
        (c = (c + Math.imul(Ne, Ze)) | 0),
        (m = Math.imul(Ne, Qe)),
        (v = (v + Math.imul(Be, et)) | 0),
        (c = (c + Math.imul(Be, tt)) | 0),
        (c = (c + Math.imul(qe, et)) | 0),
        (m = (m + Math.imul(qe, tt)) | 0));
      var zf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      ((I = (((m + (c >>> 13)) | 0) + (zf >>> 26)) | 0),
        (zf &= 67108863),
        (v = Math.imul(He, et)),
        (c = Math.imul(He, tt)),
        (c = (c + Math.imul(Ne, et)) | 0),
        (m = Math.imul(Ne, tt)));
      var Gf = (((I + v) | 0) + ((c & 8191) << 13)) | 0;
      return (
        (I = (((m + (c >>> 13)) | 0) + (Gf >>> 26)) | 0),
        (Gf &= 67108863),
        (x[0] = Mf),
        (x[1] = Of),
        (x[2] = kf),
        (x[3] = Bf),
        (x[4] = qf),
        (x[5] = Hf),
        (x[6] = Nf),
        (x[7] = Rf),
        (x[8] = Cf),
        (x[9] = Uf),
        (x[10] = Lf),
        (x[11] = Ff),
        (x[12] = Kf),
        (x[13] = jf),
        (x[14] = Df),
        (x[15] = Vf),
        (x[16] = Wf),
        (x[17] = zf),
        (x[18] = Gf),
        I !== 0 && ((x[19] = I), b.length++),
        b
      );
    };
    Math.imul || (A = E);
    function T(S, a, d) {
      ((d.negative = a.negative ^ S.negative),
        (d.length = S.length + a.length));
      for (var b = 0, y = 0, g = 0; g < d.length - 1; g++) {
        var x = y;
        y = 0;
        for (
          var I = b & 67108863,
            v = Math.min(g, a.length - 1),
            c = Math.max(0, g - S.length + 1);
          c <= v;
          c++
        ) {
          var m = g - c,
            N = S.words[m] | 0,
            R = a.words[c] | 0,
            C = N * R,
            D = C & 67108863;
          ((x = (x + ((C / 67108864) | 0)) | 0),
            (D = (D + I) | 0),
            (I = D & 67108863),
            (x = (x + (D >>> 26)) | 0),
            (y += x >>> 26),
            (x &= 67108863));
        }
        ((d.words[g] = I), (b = x), (x = y));
      }
      return (b !== 0 ? (d.words[g] = b) : d.length--, d.strip());
    }
    function O(S, a, d) {
      var b = new k();
      return b.mulp(S, a, d);
    }
    i.prototype.mulTo = function (a, d) {
      var b,
        y = this.length + a.length;
      return (
        this.length === 10 && a.length === 10
          ? (b = A(this, a, d))
          : y < 63
            ? (b = E(this, a, d))
            : y < 1024
              ? (b = T(this, a, d))
              : (b = O(this, a, d)),
        b
      );
    };
    function k(S, a) {
      ((this.x = S), (this.y = a));
    }
    ((k.prototype.makeRBT = function (a) {
      for (
        var d = new Array(a), b = i.prototype._countBits(a) - 1, y = 0;
        y < a;
        y++
      )
        d[y] = this.revBin(y, b, a);
      return d;
    }),
      (k.prototype.revBin = function (a, d, b) {
        if (a === 0 || a === b - 1) return a;
        for (var y = 0, g = 0; g < d; g++)
          ((y |= (a & 1) << (d - g - 1)), (a >>= 1));
        return y;
      }),
      (k.prototype.permute = function (a, d, b, y, g, x) {
        for (var I = 0; I < x; I++) ((y[I] = d[a[I]]), (g[I] = b[a[I]]));
      }),
      (k.prototype.transform = function (a, d, b, y, g, x) {
        this.permute(x, a, d, b, y, g);
        for (var I = 1; I < g; I <<= 1)
          for (
            var v = I << 1,
              c = Math.cos((2 * Math.PI) / v),
              m = Math.sin((2 * Math.PI) / v),
              N = 0;
            N < g;
            N += v
          )
            for (var R = c, C = m, D = 0; D < I; D++) {
              var Q = b[N + D],
                se = y[N + D],
                Gr = b[N + D + I],
                oe = y[N + D + I],
                be = R * Gr - C * oe;
              ((oe = R * oe + C * Gr),
                (Gr = be),
                (b[N + D] = Q + Gr),
                (y[N + D] = se + oe),
                (b[N + D + I] = Q - Gr),
                (y[N + D + I] = se - oe),
                D !== v &&
                  ((be = c * R - m * C), (C = c * C + m * R), (R = be)));
            }
      }),
      (k.prototype.guessLen13b = function (a, d) {
        var b = Math.max(d, a) | 1,
          y = b & 1,
          g = 0;
        for (b = (b / 2) | 0; b; b = b >>> 1) g++;
        return 1 << (g + 1 + y);
      }),
      (k.prototype.conjugate = function (a, d, b) {
        if (!(b <= 1))
          for (var y = 0; y < b / 2; y++) {
            var g = a[y];
            ((a[y] = a[b - y - 1]),
              (a[b - y - 1] = g),
              (g = d[y]),
              (d[y] = -d[b - y - 1]),
              (d[b - y - 1] = -g));
          }
      }),
      (k.prototype.normalize13b = function (a, d) {
        for (var b = 0, y = 0; y < d / 2; y++) {
          var g =
            Math.round(a[2 * y + 1] / d) * 8192 + Math.round(a[2 * y] / d) + b;
          ((a[y] = g & 67108863),
            g < 67108864 ? (b = 0) : (b = (g / 67108864) | 0));
        }
        return a;
      }),
      (k.prototype.convert13b = function (a, d, b, y) {
        for (var g = 0, x = 0; x < d; x++)
          ((g = g + (a[x] | 0)),
            (b[2 * x] = g & 8191),
            (g = g >>> 13),
            (b[2 * x + 1] = g & 8191),
            (g = g >>> 13));
        for (x = 2 * d; x < y; ++x) b[x] = 0;
        (r(g === 0), r((g & -8192) === 0));
      }),
      (k.prototype.stub = function (a) {
        for (var d = new Array(a), b = 0; b < a; b++) d[b] = 0;
        return d;
      }),
      (k.prototype.mulp = function (a, d, b) {
        var y = 2 * this.guessLen13b(a.length, d.length),
          g = this.makeRBT(y),
          x = this.stub(y),
          I = new Array(y),
          v = new Array(y),
          c = new Array(y),
          m = new Array(y),
          N = new Array(y),
          R = new Array(y),
          C = b.words;
        ((C.length = y),
          this.convert13b(a.words, a.length, I, y),
          this.convert13b(d.words, d.length, m, y),
          this.transform(I, x, v, c, y, g),
          this.transform(m, x, N, R, y, g));
        for (var D = 0; D < y; D++) {
          var Q = v[D] * N[D] - c[D] * R[D];
          ((c[D] = v[D] * R[D] + c[D] * N[D]), (v[D] = Q));
        }
        return (
          this.conjugate(v, c, y),
          this.transform(v, c, C, x, y, g),
          this.conjugate(C, x, y),
          this.normalize13b(C, y),
          (b.negative = a.negative ^ d.negative),
          (b.length = a.length + d.length),
          b.strip()
        );
      }),
      (i.prototype.mul = function (a) {
        var d = new i(null);
        return (
          (d.words = new Array(this.length + a.length)),
          this.mulTo(a, d)
        );
      }),
      (i.prototype.mulf = function (a) {
        var d = new i(null);
        return ((d.words = new Array(this.length + a.length)), O(this, a, d));
      }),
      (i.prototype.imul = function (a) {
        return this.clone().mulTo(a, this);
      }),
      (i.prototype.imuln = function (a) {
        (r(typeof a == "number"), r(a < 67108864));
        for (var d = 0, b = 0; b < this.length; b++) {
          var y = (this.words[b] | 0) * a,
            g = (y & 67108863) + (d & 67108863);
          ((d >>= 26),
            (d += (y / 67108864) | 0),
            (d += g >>> 26),
            (this.words[b] = g & 67108863));
        }
        return (
          d !== 0 && ((this.words[b] = d), this.length++),
          (this.length = a === 0 ? 1 : this.length),
          this
        );
      }),
      (i.prototype.muln = function (a) {
        return this.clone().imuln(a);
      }),
      (i.prototype.sqr = function () {
        return this.mul(this);
      }),
      (i.prototype.isqr = function () {
        return this.imul(this.clone());
      }),
      (i.prototype.pow = function (a) {
        var d = w(a);
        if (d.length === 0) return new i(1);
        for (var b = this, y = 0; y < d.length && d[y] === 0; y++, b = b.sqr());
        if (++y < d.length)
          for (var g = b.sqr(); y < d.length; y++, g = g.sqr())
            d[y] !== 0 && (b = b.mul(g));
        return b;
      }),
      (i.prototype.iushln = function (a) {
        r(typeof a == "number" && a >= 0);
        var d = a % 26,
          b = (a - d) / 26,
          y = (67108863 >>> (26 - d)) << (26 - d),
          g;
        if (d !== 0) {
          var x = 0;
          for (g = 0; g < this.length; g++) {
            var I = this.words[g] & y,
              v = ((this.words[g] | 0) - I) << d;
            ((this.words[g] = v | x), (x = I >>> (26 - d)));
          }
          x && ((this.words[g] = x), this.length++);
        }
        if (b !== 0) {
          for (g = this.length - 1; g >= 0; g--)
            this.words[g + b] = this.words[g];
          for (g = 0; g < b; g++) this.words[g] = 0;
          this.length += b;
        }
        return this.strip();
      }),
      (i.prototype.ishln = function (a) {
        return (r(this.negative === 0), this.iushln(a));
      }),
      (i.prototype.iushrn = function (a, d, b) {
        r(typeof a == "number" && a >= 0);
        var y;
        d ? (y = (d - (d % 26)) / 26) : (y = 0);
        var g = a % 26,
          x = Math.min((a - g) / 26, this.length),
          I = 67108863 ^ ((67108863 >>> g) << g),
          v = b;
        if (((y -= x), (y = Math.max(0, y)), v)) {
          for (var c = 0; c < x; c++) v.words[c] = this.words[c];
          v.length = x;
        }
        if (x !== 0)
          if (this.length > x)
            for (this.length -= x, c = 0; c < this.length; c++)
              this.words[c] = this.words[c + x];
          else ((this.words[0] = 0), (this.length = 1));
        var m = 0;
        for (c = this.length - 1; c >= 0 && (m !== 0 || c >= y); c--) {
          var N = this.words[c] | 0;
          ((this.words[c] = (m << (26 - g)) | (N >>> g)), (m = N & I));
        }
        return (
          v && m !== 0 && (v.words[v.length++] = m),
          this.length === 0 && ((this.words[0] = 0), (this.length = 1)),
          this.strip()
        );
      }),
      (i.prototype.ishrn = function (a, d, b) {
        return (r(this.negative === 0), this.iushrn(a, d, b));
      }),
      (i.prototype.shln = function (a) {
        return this.clone().ishln(a);
      }),
      (i.prototype.ushln = function (a) {
        return this.clone().iushln(a);
      }),
      (i.prototype.shrn = function (a) {
        return this.clone().ishrn(a);
      }),
      (i.prototype.ushrn = function (a) {
        return this.clone().iushrn(a);
      }),
      (i.prototype.testn = function (a) {
        r(typeof a == "number" && a >= 0);
        var d = a % 26,
          b = (a - d) / 26,
          y = 1 << d;
        if (this.length <= b) return !1;
        var g = this.words[b];
        return !!(g & y);
      }),
      (i.prototype.imaskn = function (a) {
        r(typeof a == "number" && a >= 0);
        var d = a % 26,
          b = (a - d) / 26;
        if (
          (r(this.negative === 0, "imaskn works only with positive numbers"),
          this.length <= b)
        )
          return this;
        if (
          (d !== 0 && b++, (this.length = Math.min(b, this.length)), d !== 0)
        ) {
          var y = 67108863 ^ ((67108863 >>> d) << d);
          this.words[this.length - 1] &= y;
        }
        return this.strip();
      }),
      (i.prototype.maskn = function (a) {
        return this.clone().imaskn(a);
      }),
      (i.prototype.iaddn = function (a) {
        return (
          r(typeof a == "number"),
          r(a < 67108864),
          a < 0
            ? this.isubn(-a)
            : this.negative !== 0
              ? this.length === 1 && (this.words[0] | 0) < a
                ? ((this.words[0] = a - (this.words[0] | 0)),
                  (this.negative = 0),
                  this)
                : ((this.negative = 0),
                  this.isubn(a),
                  (this.negative = 1),
                  this)
              : this._iaddn(a)
        );
      }),
      (i.prototype._iaddn = function (a) {
        this.words[0] += a;
        for (var d = 0; d < this.length && this.words[d] >= 67108864; d++)
          ((this.words[d] -= 67108864),
            d === this.length - 1
              ? (this.words[d + 1] = 1)
              : this.words[d + 1]++);
        return ((this.length = Math.max(this.length, d + 1)), this);
      }),
      (i.prototype.isubn = function (a) {
        if ((r(typeof a == "number"), r(a < 67108864), a < 0))
          return this.iaddn(-a);
        if (this.negative !== 0)
          return (
            (this.negative = 0),
            this.iaddn(a),
            (this.negative = 1),
            this
          );
        if (((this.words[0] -= a), this.length === 1 && this.words[0] < 0))
          ((this.words[0] = -this.words[0]), (this.negative = 1));
        else
          for (var d = 0; d < this.length && this.words[d] < 0; d++)
            ((this.words[d] += 67108864), (this.words[d + 1] -= 1));
        return this.strip();
      }),
      (i.prototype.addn = function (a) {
        return this.clone().iaddn(a);
      }),
      (i.prototype.subn = function (a) {
        return this.clone().isubn(a);
      }),
      (i.prototype.iabs = function () {
        return ((this.negative = 0), this);
      }),
      (i.prototype.abs = function () {
        return this.clone().iabs();
      }),
      (i.prototype._ishlnsubmul = function (a, d, b) {
        var y = a.length + b,
          g;
        this._expand(y);
        var x,
          I = 0;
        for (g = 0; g < a.length; g++) {
          x = (this.words[g + b] | 0) + I;
          var v = (a.words[g] | 0) * d;
          ((x -= v & 67108863),
            (I = (x >> 26) - ((v / 67108864) | 0)),
            (this.words[g + b] = x & 67108863));
        }
        for (; g < this.length - b; g++)
          ((x = (this.words[g + b] | 0) + I),
            (I = x >> 26),
            (this.words[g + b] = x & 67108863));
        if (I === 0) return this.strip();
        for (r(I === -1), I = 0, g = 0; g < this.length; g++)
          ((x = -(this.words[g] | 0) + I),
            (I = x >> 26),
            (this.words[g] = x & 67108863));
        return ((this.negative = 1), this.strip());
      }),
      (i.prototype._wordDiv = function (a, d) {
        var b = this.length - a.length,
          y = this.clone(),
          g = a,
          x = g.words[g.length - 1] | 0,
          I = this._countBits(x);
        ((b = 26 - I),
          b !== 0 &&
            ((g = g.ushln(b)), y.iushln(b), (x = g.words[g.length - 1] | 0)));
        var v = y.length - g.length,
          c;
        if (d !== "mod") {
          ((c = new i(null)),
            (c.length = v + 1),
            (c.words = new Array(c.length)));
          for (var m = 0; m < c.length; m++) c.words[m] = 0;
        }
        var N = y.clone()._ishlnsubmul(g, 1, v);
        N.negative === 0 && ((y = N), c && (c.words[v] = 1));
        for (var R = v - 1; R >= 0; R--) {
          var C =
            (y.words[g.length + R] | 0) * 67108864 +
            (y.words[g.length + R - 1] | 0);
          for (
            C = Math.min((C / x) | 0, 67108863), y._ishlnsubmul(g, C, R);
            y.negative !== 0;

          )
            (C--,
              (y.negative = 0),
              y._ishlnsubmul(g, 1, R),
              y.isZero() || (y.negative ^= 1));
          c && (c.words[R] = C);
        }
        return (
          c && c.strip(),
          y.strip(),
          d !== "div" && b !== 0 && y.iushrn(b),
          { div: c || null, mod: y }
        );
      }),
      (i.prototype.divmod = function (a, d, b) {
        if ((r(!a.isZero()), this.isZero()))
          return { div: new i(0), mod: new i(0) };
        var y, g, x;
        return this.negative !== 0 && a.negative === 0
          ? ((x = this.neg().divmod(a, d)),
            d !== "mod" && (y = x.div.neg()),
            d !== "div" &&
              ((g = x.mod.neg()), b && g.negative !== 0 && g.iadd(a)),
            { div: y, mod: g })
          : this.negative === 0 && a.negative !== 0
            ? ((x = this.divmod(a.neg(), d)),
              d !== "mod" && (y = x.div.neg()),
              { div: y, mod: x.mod })
            : (this.negative & a.negative) !== 0
              ? ((x = this.neg().divmod(a.neg(), d)),
                d !== "div" &&
                  ((g = x.mod.neg()), b && g.negative !== 0 && g.isub(a)),
                { div: x.div, mod: g })
              : a.length > this.length || this.cmp(a) < 0
                ? { div: new i(0), mod: this }
                : a.length === 1
                  ? d === "div"
                    ? { div: this.divn(a.words[0]), mod: null }
                    : d === "mod"
                      ? { div: null, mod: new i(this.modn(a.words[0])) }
                      : {
                          div: this.divn(a.words[0]),
                          mod: new i(this.modn(a.words[0])),
                        }
                  : this._wordDiv(a, d);
      }),
      (i.prototype.div = function (a) {
        return this.divmod(a, "div", !1).div;
      }),
      (i.prototype.mod = function (a) {
        return this.divmod(a, "mod", !1).mod;
      }),
      (i.prototype.umod = function (a) {
        return this.divmod(a, "mod", !0).mod;
      }),
      (i.prototype.divRound = function (a) {
        var d = this.divmod(a);
        if (d.mod.isZero()) return d.div;
        var b = d.div.negative !== 0 ? d.mod.isub(a) : d.mod,
          y = a.ushrn(1),
          g = a.andln(1),
          x = b.cmp(y);
        return x < 0 || (g === 1 && x === 0)
          ? d.div
          : d.div.negative !== 0
            ? d.div.isubn(1)
            : d.div.iaddn(1);
      }),
      (i.prototype.modn = function (a) {
        r(a <= 67108863);
        for (var d = (1 << 26) % a, b = 0, y = this.length - 1; y >= 0; y--)
          b = (d * b + (this.words[y] | 0)) % a;
        return b;
      }),
      (i.prototype.idivn = function (a) {
        r(a <= 67108863);
        for (var d = 0, b = this.length - 1; b >= 0; b--) {
          var y = (this.words[b] | 0) + d * 67108864;
          ((this.words[b] = (y / a) | 0), (d = y % a));
        }
        return this.strip();
      }),
      (i.prototype.divn = function (a) {
        return this.clone().idivn(a);
      }),
      (i.prototype.egcd = function (a) {
        (r(a.negative === 0), r(!a.isZero()));
        var d = this,
          b = a.clone();
        d.negative !== 0 ? (d = d.umod(a)) : (d = d.clone());
        for (
          var y = new i(1), g = new i(0), x = new i(0), I = new i(1), v = 0;
          d.isEven() && b.isEven();

        )
          (d.iushrn(1), b.iushrn(1), ++v);
        for (var c = b.clone(), m = d.clone(); !d.isZero(); ) {
          for (
            var N = 0, R = 1;
            (d.words[0] & R) === 0 && N < 26;
            ++N, R <<= 1
          );
          if (N > 0)
            for (d.iushrn(N); N-- > 0; )
              ((y.isOdd() || g.isOdd()) && (y.iadd(c), g.isub(m)),
                y.iushrn(1),
                g.iushrn(1));
          for (
            var C = 0, D = 1;
            (b.words[0] & D) === 0 && C < 26;
            ++C, D <<= 1
          );
          if (C > 0)
            for (b.iushrn(C); C-- > 0; )
              ((x.isOdd() || I.isOdd()) && (x.iadd(c), I.isub(m)),
                x.iushrn(1),
                I.iushrn(1));
          d.cmp(b) >= 0
            ? (d.isub(b), y.isub(x), g.isub(I))
            : (b.isub(d), x.isub(y), I.isub(g));
        }
        return { a: x, b: I, gcd: b.iushln(v) };
      }),
      (i.prototype._invmp = function (a) {
        (r(a.negative === 0), r(!a.isZero()));
        var d = this,
          b = a.clone();
        d.negative !== 0 ? (d = d.umod(a)) : (d = d.clone());
        for (
          var y = new i(1), g = new i(0), x = b.clone();
          d.cmpn(1) > 0 && b.cmpn(1) > 0;

        ) {
          for (
            var I = 0, v = 1;
            (d.words[0] & v) === 0 && I < 26;
            ++I, v <<= 1
          );
          if (I > 0)
            for (d.iushrn(I); I-- > 0; ) (y.isOdd() && y.iadd(x), y.iushrn(1));
          for (
            var c = 0, m = 1;
            (b.words[0] & m) === 0 && c < 26;
            ++c, m <<= 1
          );
          if (c > 0)
            for (b.iushrn(c); c-- > 0; ) (g.isOdd() && g.iadd(x), g.iushrn(1));
          d.cmp(b) >= 0 ? (d.isub(b), y.isub(g)) : (b.isub(d), g.isub(y));
        }
        var N;
        return (
          d.cmpn(1) === 0 ? (N = y) : (N = g),
          N.cmpn(0) < 0 && N.iadd(a),
          N
        );
      }),
      (i.prototype.gcd = function (a) {
        if (this.isZero()) return a.abs();
        if (a.isZero()) return this.abs();
        var d = this.clone(),
          b = a.clone();
        ((d.negative = 0), (b.negative = 0));
        for (var y = 0; d.isEven() && b.isEven(); y++)
          (d.iushrn(1), b.iushrn(1));
        do {
          for (; d.isEven(); ) d.iushrn(1);
          for (; b.isEven(); ) b.iushrn(1);
          var g = d.cmp(b);
          if (g < 0) {
            var x = d;
            ((d = b), (b = x));
          } else if (g === 0 || b.cmpn(1) === 0) break;
          d.isub(b);
        } while (!0);
        return b.iushln(y);
      }),
      (i.prototype.invm = function (a) {
        return this.egcd(a).a.umod(a);
      }),
      (i.prototype.isEven = function () {
        return (this.words[0] & 1) === 0;
      }),
      (i.prototype.isOdd = function () {
        return (this.words[0] & 1) === 1;
      }),
      (i.prototype.andln = function (a) {
        return this.words[0] & a;
      }),
      (i.prototype.bincn = function (a) {
        r(typeof a == "number");
        var d = a % 26,
          b = (a - d) / 26,
          y = 1 << d;
        if (this.length <= b)
          return (this._expand(b + 1), (this.words[b] |= y), this);
        for (var g = y, x = b; g !== 0 && x < this.length; x++) {
          var I = this.words[x] | 0;
          ((I += g), (g = I >>> 26), (I &= 67108863), (this.words[x] = I));
        }
        return (g !== 0 && ((this.words[x] = g), this.length++), this);
      }),
      (i.prototype.isZero = function () {
        return this.length === 1 && this.words[0] === 0;
      }),
      (i.prototype.cmpn = function (a) {
        var d = a < 0;
        if (this.negative !== 0 && !d) return -1;
        if (this.negative === 0 && d) return 1;
        this.strip();
        var b;
        if (this.length > 1) b = 1;
        else {
          (d && (a = -a), r(a <= 67108863, "Number is too big"));
          var y = this.words[0] | 0;
          b = y === a ? 0 : y < a ? -1 : 1;
        }
        return this.negative !== 0 ? -b | 0 : b;
      }),
      (i.prototype.cmp = function (a) {
        if (this.negative !== 0 && a.negative === 0) return -1;
        if (this.negative === 0 && a.negative !== 0) return 1;
        var d = this.ucmp(a);
        return this.negative !== 0 ? -d | 0 : d;
      }),
      (i.prototype.ucmp = function (a) {
        if (this.length > a.length) return 1;
        if (this.length < a.length) return -1;
        for (var d = 0, b = this.length - 1; b >= 0; b--) {
          var y = this.words[b] | 0,
            g = a.words[b] | 0;
          if (y !== g) {
            y < g ? (d = -1) : y > g && (d = 1);
            break;
          }
        }
        return d;
      }),
      (i.prototype.gtn = function (a) {
        return this.cmpn(a) === 1;
      }),
      (i.prototype.gt = function (a) {
        return this.cmp(a) === 1;
      }),
      (i.prototype.gten = function (a) {
        return this.cmpn(a) >= 0;
      }),
      (i.prototype.gte = function (a) {
        return this.cmp(a) >= 0;
      }),
      (i.prototype.ltn = function (a) {
        return this.cmpn(a) === -1;
      }),
      (i.prototype.lt = function (a) {
        return this.cmp(a) === -1;
      }),
      (i.prototype.lten = function (a) {
        return this.cmpn(a) <= 0;
      }),
      (i.prototype.lte = function (a) {
        return this.cmp(a) <= 0;
      }),
      (i.prototype.eqn = function (a) {
        return this.cmpn(a) === 0;
      }),
      (i.prototype.eq = function (a) {
        return this.cmp(a) === 0;
      }),
      (i.red = function (a) {
        return new K(a);
      }),
      (i.prototype.toRed = function (a) {
        return (
          r(!this.red, "Already a number in reduction context"),
          r(this.negative === 0, "red works only with positives"),
          a.convertTo(this)._forceRed(a)
        );
      }),
      (i.prototype.fromRed = function () {
        return (
          r(this.red, "fromRed works only with numbers in reduction context"),
          this.red.convertFrom(this)
        );
      }),
      (i.prototype._forceRed = function (a) {
        return ((this.red = a), this);
      }),
      (i.prototype.forceRed = function (a) {
        return (
          r(!this.red, "Already a number in reduction context"),
          this._forceRed(a)
        );
      }),
      (i.prototype.redAdd = function (a) {
        return (
          r(this.red, "redAdd works only with red numbers"),
          this.red.add(this, a)
        );
      }),
      (i.prototype.redIAdd = function (a) {
        return (
          r(this.red, "redIAdd works only with red numbers"),
          this.red.iadd(this, a)
        );
      }),
      (i.prototype.redSub = function (a) {
        return (
          r(this.red, "redSub works only with red numbers"),
          this.red.sub(this, a)
        );
      }),
      (i.prototype.redISub = function (a) {
        return (
          r(this.red, "redISub works only with red numbers"),
          this.red.isub(this, a)
        );
      }),
      (i.prototype.redShl = function (a) {
        return (
          r(this.red, "redShl works only with red numbers"),
          this.red.shl(this, a)
        );
      }),
      (i.prototype.redMul = function (a) {
        return (
          r(this.red, "redMul works only with red numbers"),
          this.red._verify2(this, a),
          this.red.mul(this, a)
        );
      }),
      (i.prototype.redIMul = function (a) {
        return (
          r(this.red, "redMul works only with red numbers"),
          this.red._verify2(this, a),
          this.red.imul(this, a)
        );
      }),
      (i.prototype.redSqr = function () {
        return (
          r(this.red, "redSqr works only with red numbers"),
          this.red._verify1(this),
          this.red.sqr(this)
        );
      }),
      (i.prototype.redISqr = function () {
        return (
          r(this.red, "redISqr works only with red numbers"),
          this.red._verify1(this),
          this.red.isqr(this)
        );
      }),
      (i.prototype.redSqrt = function () {
        return (
          r(this.red, "redSqrt works only with red numbers"),
          this.red._verify1(this),
          this.red.sqrt(this)
        );
      }),
      (i.prototype.redInvm = function () {
        return (
          r(this.red, "redInvm works only with red numbers"),
          this.red._verify1(this),
          this.red.invm(this)
        );
      }),
      (i.prototype.redNeg = function () {
        return (
          r(this.red, "redNeg works only with red numbers"),
          this.red._verify1(this),
          this.red.neg(this)
        );
      }),
      (i.prototype.redPow = function (a) {
        return (
          r(this.red && !a.red, "redPow(normalNum)"),
          this.red._verify1(this),
          this.red.pow(this, a)
        );
      }));
    var H = { k256: null, p224: null, p192: null, p25519: null };
    function P(S, a) {
      ((this.name = S),
        (this.p = new i(a, 16)),
        (this.n = this.p.bitLength()),
        (this.k = new i(1).iushln(this.n).isub(this.p)),
        (this.tmp = this._tmp()));
    }
    ((P.prototype._tmp = function () {
      var a = new i(null);
      return ((a.words = new Array(Math.ceil(this.n / 13))), a);
    }),
      (P.prototype.ireduce = function (a) {
        var d = a,
          b;
        do
          (this.split(d, this.tmp),
            (d = this.imulK(d)),
            (d = d.iadd(this.tmp)),
            (b = d.bitLength()));
        while (b > this.n);
        var y = b < this.n ? -1 : d.ucmp(this.p);
        return (
          y === 0
            ? ((d.words[0] = 0), (d.length = 1))
            : y > 0
              ? d.isub(this.p)
              : d.strip !== void 0
                ? d.strip()
                : d._strip(),
          d
        );
      }),
      (P.prototype.split = function (a, d) {
        a.iushrn(this.n, 0, d);
      }),
      (P.prototype.imulK = function (a) {
        return a.imul(this.k);
      }));
    function M() {
      P.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      );
    }
    (n(M, P),
      (M.prototype.split = function (a, d) {
        for (var b = 4194303, y = Math.min(a.length, 9), g = 0; g < y; g++)
          d.words[g] = a.words[g];
        if (((d.length = y), a.length <= 9)) {
          ((a.words[0] = 0), (a.length = 1));
          return;
        }
        var x = a.words[9];
        for (d.words[d.length++] = x & b, g = 10; g < a.length; g++) {
          var I = a.words[g] | 0;
          ((a.words[g - 10] = ((I & b) << 4) | (x >>> 22)), (x = I));
        }
        ((x >>>= 22),
          (a.words[g - 10] = x),
          x === 0 && a.length > 10 ? (a.length -= 10) : (a.length -= 9));
      }),
      (M.prototype.imulK = function (a) {
        ((a.words[a.length] = 0), (a.words[a.length + 1] = 0), (a.length += 2));
        for (var d = 0, b = 0; b < a.length; b++) {
          var y = a.words[b] | 0;
          ((d += y * 977),
            (a.words[b] = d & 67108863),
            (d = y * 64 + ((d / 67108864) | 0)));
        }
        return (
          a.words[a.length - 1] === 0 &&
            (a.length--, a.words[a.length - 1] === 0 && a.length--),
          a
        );
      }));
    function B() {
      P.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      );
    }
    n(B, P);
    function F() {
      P.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      );
    }
    n(F, P);
    function z() {
      P.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      );
    }
    (n(z, P),
      (z.prototype.imulK = function (a) {
        for (var d = 0, b = 0; b < a.length; b++) {
          var y = (a.words[b] | 0) * 19 + d,
            g = y & 67108863;
          ((y >>>= 26), (a.words[b] = g), (d = y));
        }
        return (d !== 0 && (a.words[a.length++] = d), a);
      }),
      (i._prime = function (a) {
        if (H[a]) return H[a];
        var d;
        if (a === "k256") d = new M();
        else if (a === "p224") d = new B();
        else if (a === "p192") d = new F();
        else if (a === "p25519") d = new z();
        else throw new Error("Unknown prime " + a);
        return ((H[a] = d), d);
      }));
    function K(S) {
      if (typeof S == "string") {
        var a = i._prime(S);
        ((this.m = a.p), (this.prime = a));
      } else
        (r(S.gtn(1), "modulus must be greater than 1"),
          (this.m = S),
          (this.prime = null));
    }
    ((K.prototype._verify1 = function (a) {
      (r(a.negative === 0, "red works only with positives"),
        r(a.red, "red works only with red numbers"));
    }),
      (K.prototype._verify2 = function (a, d) {
        (r((a.negative | d.negative) === 0, "red works only with positives"),
          r(a.red && a.red === d.red, "red works only with red numbers"));
      }),
      (K.prototype.imod = function (a) {
        return this.prime
          ? this.prime.ireduce(a)._forceRed(this)
          : a.umod(this.m)._forceRed(this);
      }),
      (K.prototype.neg = function (a) {
        return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
      }),
      (K.prototype.add = function (a, d) {
        this._verify2(a, d);
        var b = a.add(d);
        return (b.cmp(this.m) >= 0 && b.isub(this.m), b._forceRed(this));
      }),
      (K.prototype.iadd = function (a, d) {
        this._verify2(a, d);
        var b = a.iadd(d);
        return (b.cmp(this.m) >= 0 && b.isub(this.m), b);
      }),
      (K.prototype.sub = function (a, d) {
        this._verify2(a, d);
        var b = a.sub(d);
        return (b.cmpn(0) < 0 && b.iadd(this.m), b._forceRed(this));
      }),
      (K.prototype.isub = function (a, d) {
        this._verify2(a, d);
        var b = a.isub(d);
        return (b.cmpn(0) < 0 && b.iadd(this.m), b);
      }),
      (K.prototype.shl = function (a, d) {
        return (this._verify1(a), this.imod(a.ushln(d)));
      }),
      (K.prototype.imul = function (a, d) {
        return (this._verify2(a, d), this.imod(a.imul(d)));
      }),
      (K.prototype.mul = function (a, d) {
        return (this._verify2(a, d), this.imod(a.mul(d)));
      }),
      (K.prototype.isqr = function (a) {
        return this.imul(a, a.clone());
      }),
      (K.prototype.sqr = function (a) {
        return this.mul(a, a);
      }),
      (K.prototype.sqrt = function (a) {
        if (a.isZero()) return a.clone();
        var d = this.m.andln(3);
        if ((r(d % 2 === 1), d === 3)) {
          var b = this.m.add(new i(1)).iushrn(2);
          return this.pow(a, b);
        }
        for (var y = this.m.subn(1), g = 0; !y.isZero() && y.andln(1) === 0; )
          (g++, y.iushrn(1));
        r(!y.isZero());
        var x = new i(1).toRed(this),
          I = x.redNeg(),
          v = this.m.subn(1).iushrn(1),
          c = this.m.bitLength();
        for (c = new i(2 * c * c).toRed(this); this.pow(c, v).cmp(I) !== 0; )
          c.redIAdd(I);
        for (
          var m = this.pow(c, y),
            N = this.pow(a, y.addn(1).iushrn(1)),
            R = this.pow(a, y),
            C = g;
          R.cmp(x) !== 0;

        ) {
          for (var D = R, Q = 0; D.cmp(x) !== 0; Q++) D = D.redSqr();
          r(Q < C);
          var se = this.pow(m, new i(1).iushln(C - Q - 1));
          ((N = N.redMul(se)), (m = se.redSqr()), (R = R.redMul(m)), (C = Q));
        }
        return N;
      }),
      (K.prototype.invm = function (a) {
        var d = a._invmp(this.m);
        return d.negative !== 0
          ? ((d.negative = 0), this.imod(d).redNeg())
          : this.imod(d);
      }),
      (K.prototype.pow = function (a, d) {
        if (d.isZero()) return new i(1).toRed(this);
        if (d.cmpn(1) === 0) return a.clone();
        var b = 4,
          y = new Array(1 << b);
        ((y[0] = new i(1).toRed(this)), (y[1] = a));
        for (var g = 2; g < y.length; g++) y[g] = this.mul(y[g - 1], a);
        var x = y[0],
          I = 0,
          v = 0,
          c = d.bitLength() % 26;
        for (c === 0 && (c = 26), g = d.length - 1; g >= 0; g--) {
          for (var m = d.words[g], N = c - 1; N >= 0; N--) {
            var R = (m >> N) & 1;
            if ((x !== y[0] && (x = this.sqr(x)), R === 0 && I === 0)) {
              v = 0;
              continue;
            }
            ((I <<= 1),
              (I |= R),
              v++,
              !(v !== b && (g !== 0 || N !== 0)) &&
                ((x = this.mul(x, y[I])), (v = 0), (I = 0)));
          }
          c = 26;
        }
        return x;
      }),
      (K.prototype.convertTo = function (a) {
        var d = a.umod(this.m);
        return d === a ? d.clone() : d;
      }),
      (K.prototype.convertFrom = function (a) {
        var d = a.clone();
        return ((d.red = null), d);
      }),
      (i.mont = function (a) {
        return new Z(a);
      }));
    function Z(S) {
      (K.call(this, S),
        (this.shift = this.m.bitLength()),
        this.shift % 26 !== 0 && (this.shift += 26 - (this.shift % 26)),
        (this.r = new i(1).iushln(this.shift)),
        (this.r2 = this.imod(this.r.sqr())),
        (this.rinv = this.r._invmp(this.m)),
        (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
        (this.minv = this.minv.umod(this.r)),
        (this.minv = this.r.sub(this.minv)));
    }
    (n(Z, K),
      (Z.prototype.convertTo = function (a) {
        return this.imod(a.ushln(this.shift));
      }),
      (Z.prototype.convertFrom = function (a) {
        var d = this.imod(a.mul(this.rinv));
        return ((d.red = null), d);
      }),
      (Z.prototype.imul = function (a, d) {
        if (a.isZero() || d.isZero())
          return ((a.words[0] = 0), (a.length = 1), a);
        var b = a.imul(d),
          y = b.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
          g = b.isub(y).iushrn(this.shift),
          x = g;
        return (
          g.cmp(this.m) >= 0
            ? (x = g.isub(this.m))
            : g.cmpn(0) < 0 && (x = g.iadd(this.m)),
          x._forceRed(this)
        );
      }),
      (Z.prototype.mul = function (a, d) {
        if (a.isZero() || d.isZero()) return new i(0)._forceRed(this);
        var b = a.mul(d),
          y = b.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
          g = b.isub(y).iushrn(this.shift),
          x = g;
        return (
          g.cmp(this.m) >= 0
            ? (x = g.isub(this.m))
            : g.cmpn(0) < 0 && (x = g.iadd(this.m)),
          x._forceRed(this)
        );
      }),
      (Z.prototype.invm = function (a) {
        var d = this.imod(a._invmp(this.m).mul(this.r2));
        return d._forceRed(this);
      }));
  })(typeof na > "u" || na, _0);
});
var Xr = _((RT, x0) => {
  x0.exports = S0;
  function S0(e, t) {
    if (!e) throw new Error(t || "Assertion failed");
  }
  S0.equal = function (t, r, n) {
    if (t != r) throw new Error(n || "Assertion failed: " + t + " != " + r);
  };
});
var ia = _((I0) => {
  "use strict";
  var Rs = I0;
  function D4(e, t) {
    if (Array.isArray(e)) return e.slice();
    if (!e) return [];
    var r = [];
    if (typeof e != "string") {
      for (var n = 0; n < e.length; n++) r[n] = e[n] | 0;
      return r;
    }
    if (t === "hex") {
      ((e = e.replace(/[^a-z0-9]+/gi, "")),
        e.length % 2 !== 0 && (e = "0" + e));
      for (var n = 0; n < e.length; n += 2)
        r.push(parseInt(e[n] + e[n + 1], 16));
    } else
      for (var n = 0; n < e.length; n++) {
        var i = e.charCodeAt(n),
          s = i >> 8,
          o = i & 255;
        s ? r.push(s, o) : r.push(o);
      }
    return r;
  }
  Rs.toArray = D4;
  function E0(e) {
    return e.length === 1 ? "0" + e : e;
  }
  Rs.zero2 = E0;
  function A0(e) {
    for (var t = "", r = 0; r < e.length; r++) t += E0(e[r].toString(16));
    return t;
  }
  Rs.toHex = A0;
  Rs.encode = function (t, r) {
    return r === "hex" ? A0(t) : t;
  };
});
var Lt = _((T0) => {
  "use strict";
  var Qt = T0,
    V4 = Zt(),
    W4 = Xr(),
    Cs = ia();
  Qt.assert = W4;
  Qt.toArray = Cs.toArray;
  Qt.zero2 = Cs.zero2;
  Qt.toHex = Cs.toHex;
  Qt.encode = Cs.encode;
  function z4(e, t, r) {
    var n = new Array(Math.max(e.bitLength(), r) + 1),
      i;
    for (i = 0; i < n.length; i += 1) n[i] = 0;
    var s = 1 << (t + 1),
      o = e.clone();
    for (i = 0; i < n.length; i++) {
      var f,
        u = o.andln(s - 1);
      (o.isOdd()
        ? (u > (s >> 1) - 1 ? (f = (s >> 1) - u) : (f = u), o.isubn(f))
        : (f = 0),
        (n[i] = f),
        o.iushrn(1));
    }
    return n;
  }
  Qt.getNAF = z4;
  function G4(e, t) {
    var r = [[], []];
    ((e = e.clone()), (t = t.clone()));
    for (var n = 0, i = 0, s; e.cmpn(-n) > 0 || t.cmpn(-i) > 0; ) {
      var o = (e.andln(3) + n) & 3,
        f = (t.andln(3) + i) & 3;
      (o === 3 && (o = -1), f === 3 && (f = -1));
      var u;
      ((o & 1) === 0
        ? (u = 0)
        : ((s = (e.andln(7) + n) & 7),
          (s === 3 || s === 5) && f === 2 ? (u = -o) : (u = o)),
        r[0].push(u));
      var l;
      ((f & 1) === 0
        ? (l = 0)
        : ((s = (t.andln(7) + i) & 7),
          (s === 3 || s === 5) && o === 2 ? (l = -f) : (l = f)),
        r[1].push(l),
        2 * n === u + 1 && (n = 1 - n),
        2 * i === l + 1 && (i = 1 - i),
        e.iushrn(1),
        t.iushrn(1));
    }
    return r;
  }
  Qt.getJSF = G4;
  function X4(e, t, r) {
    var n = "_" + t;
    e.prototype[t] = function () {
      return this[n] !== void 0 ? this[n] : (this[n] = r.call(this));
    };
  }
  Qt.cachedProperty = X4;
  function Y4(e) {
    return typeof e == "string" ? Qt.toArray(e, "hex") : e;
  }
  Qt.parseBytes = Y4;
  function $4(e) {
    return new V4(e, "hex", "le");
  }
  Qt.intFromLE = $4;
});
var aa = _((LT, fa) => {
  var sa;
  fa.exports = function (t) {
    return (sa || (sa = new Yr(null)), sa.generate(t));
  };
  function Yr(e) {
    this.rand = e;
  }
  fa.exports.Rand = Yr;
  Yr.prototype.generate = function (t) {
    return this._rand(t);
  };
  Yr.prototype._rand = function (t) {
    if (this.rand.getBytes) return this.rand.getBytes(t);
    for (var r = new Uint8Array(t), n = 0; n < r.length; n++)
      r[n] = this.rand.getByte();
    return r;
  };
  if (typeof self == "object")
    self.crypto && self.crypto.getRandomValues
      ? (Yr.prototype._rand = function (t) {
          var r = new Uint8Array(t);
          return (self.crypto.getRandomValues(r), r);
        })
      : self.msCrypto && self.msCrypto.getRandomValues
        ? (Yr.prototype._rand = function (t) {
            var r = new Uint8Array(t);
            return (self.msCrypto.getRandomValues(r), r);
          })
        : typeof window == "object" &&
          (Yr.prototype._rand = function () {
            throw new Error("Not implemented yet");
          });
  else
    try {
      if (((oa = require("crypto")), typeof oa.randomBytes != "function"))
        throw new Error("Not supported");
      Yr.prototype._rand = function (t) {
        return oa.randomBytes(t);
      };
    } catch {}
  var oa;
});
var Yi = _((FT, P0) => {
  "use strict";
  var Sn = Zt(),
    Xi = Lt(),
    Us = Xi.getNAF,
    J4 = Xi.getJSF,
    Ls = Xi.assert;
  function $r(e, t) {
    ((this.type = e),
      (this.p = new Sn(t.p, 16)),
      (this.red = t.prime ? Sn.red(t.prime) : Sn.mont(this.p)),
      (this.zero = new Sn(0).toRed(this.red)),
      (this.one = new Sn(1).toRed(this.red)),
      (this.two = new Sn(2).toRed(this.red)),
      (this.n = t.n && new Sn(t.n, 16)),
      (this.g = t.g && this.pointFromJSON(t.g, t.gRed)),
      (this._wnafT1 = new Array(4)),
      (this._wnafT2 = new Array(4)),
      (this._wnafT3 = new Array(4)),
      (this._wnafT4 = new Array(4)),
      (this._bitLength = this.n ? this.n.bitLength() : 0));
    var r = this.n && this.p.div(this.n);
    !r || r.cmpn(100) > 0
      ? (this.redN = null)
      : ((this._maxwellTrick = !0), (this.redN = this.n.toRed(this.red)));
  }
  P0.exports = $r;
  $r.prototype.point = function () {
    throw new Error("Not implemented");
  };
  $r.prototype.validate = function () {
    throw new Error("Not implemented");
  };
  $r.prototype._fixedNafMul = function (t, r) {
    Ls(t.precomputed);
    var n = t._getDoubles(),
      i = Us(r, 1, this._bitLength),
      s = (1 << (n.step + 1)) - (n.step % 2 === 0 ? 2 : 1);
    s /= 3;
    var o = [],
      f,
      u;
    for (f = 0; f < i.length; f += n.step) {
      u = 0;
      for (var l = f + n.step - 1; l >= f; l--) u = (u << 1) + i[l];
      o.push(u);
    }
    for (
      var p = this.jpoint(null, null, null),
        h = this.jpoint(null, null, null),
        w = s;
      w > 0;
      w--
    ) {
      for (f = 0; f < o.length; f++)
        ((u = o[f]),
          u === w
            ? (h = h.mixedAdd(n.points[f]))
            : u === -w && (h = h.mixedAdd(n.points[f].neg())));
      p = p.add(h);
    }
    return p.toP();
  };
  $r.prototype._wnafMul = function (t, r) {
    var n = 4,
      i = t._getNAFPoints(n);
    n = i.wnd;
    for (
      var s = i.points,
        o = Us(r, n, this._bitLength),
        f = this.jpoint(null, null, null),
        u = o.length - 1;
      u >= 0;
      u--
    ) {
      for (var l = 0; u >= 0 && o[u] === 0; u--) l++;
      if ((u >= 0 && l++, (f = f.dblp(l)), u < 0)) break;
      var p = o[u];
      (Ls(p !== 0),
        t.type === "affine"
          ? p > 0
            ? (f = f.mixedAdd(s[(p - 1) >> 1]))
            : (f = f.mixedAdd(s[(-p - 1) >> 1].neg()))
          : p > 0
            ? (f = f.add(s[(p - 1) >> 1]))
            : (f = f.add(s[(-p - 1) >> 1].neg())));
    }
    return t.type === "affine" ? f.toP() : f;
  };
  $r.prototype._wnafMulAdd = function (t, r, n, i, s) {
    var o = this._wnafT1,
      f = this._wnafT2,
      u = this._wnafT3,
      l = 0,
      p,
      h,
      w;
    for (p = 0; p < i; p++) {
      w = r[p];
      var E = w._getNAFPoints(t);
      ((o[p] = E.wnd), (f[p] = E.points));
    }
    for (p = i - 1; p >= 1; p -= 2) {
      var A = p - 1,
        T = p;
      if (o[A] !== 1 || o[T] !== 1) {
        ((u[A] = Us(n[A], o[A], this._bitLength)),
          (u[T] = Us(n[T], o[T], this._bitLength)),
          (l = Math.max(u[A].length, l)),
          (l = Math.max(u[T].length, l)));
        continue;
      }
      var O = [r[A], null, null, r[T]];
      r[A].y.cmp(r[T].y) === 0
        ? ((O[1] = r[A].add(r[T])), (O[2] = r[A].toJ().mixedAdd(r[T].neg())))
        : r[A].y.cmp(r[T].y.redNeg()) === 0
          ? ((O[1] = r[A].toJ().mixedAdd(r[T])), (O[2] = r[A].add(r[T].neg())))
          : ((O[1] = r[A].toJ().mixedAdd(r[T])),
            (O[2] = r[A].toJ().mixedAdd(r[T].neg())));
      var k = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
        H = J4(n[A], n[T]);
      for (
        l = Math.max(H[0].length, l),
          u[A] = new Array(l),
          u[T] = new Array(l),
          h = 0;
        h < l;
        h++
      ) {
        var P = H[0][h] | 0,
          M = H[1][h] | 0;
        ((u[A][h] = k[(P + 1) * 3 + (M + 1)]), (u[T][h] = 0), (f[A] = O));
      }
    }
    var B = this.jpoint(null, null, null),
      F = this._wnafT4;
    for (p = l; p >= 0; p--) {
      for (var z = 0; p >= 0; ) {
        var K = !0;
        for (h = 0; h < i; h++) ((F[h] = u[h][p] | 0), F[h] !== 0 && (K = !1));
        if (!K) break;
        (z++, p--);
      }
      if ((p >= 0 && z++, (B = B.dblp(z)), p < 0)) break;
      for (h = 0; h < i; h++) {
        var Z = F[h];
        Z !== 0 &&
          (Z > 0
            ? (w = f[h][(Z - 1) >> 1])
            : Z < 0 && (w = f[h][(-Z - 1) >> 1].neg()),
          w.type === "affine" ? (B = B.mixedAdd(w)) : (B = B.add(w)));
      }
    }
    for (p = 0; p < i; p++) f[p] = null;
    return s ? B : B.toP();
  };
  function Dt(e, t) {
    ((this.curve = e), (this.type = t), (this.precomputed = null));
  }
  $r.BasePoint = Dt;
  Dt.prototype.eq = function () {
    throw new Error("Not implemented");
  };
  Dt.prototype.validate = function () {
    return this.curve.validate(this);
  };
  $r.prototype.decodePoint = function (t, r) {
    t = Xi.toArray(t, r);
    var n = this.p.byteLength();
    if ((t[0] === 4 || t[0] === 6 || t[0] === 7) && t.length - 1 === 2 * n) {
      t[0] === 6
        ? Ls(t[t.length - 1] % 2 === 0)
        : t[0] === 7 && Ls(t[t.length - 1] % 2 === 1);
      var i = this.point(t.slice(1, 1 + n), t.slice(1 + n, 1 + 2 * n));
      return i;
    } else if ((t[0] === 2 || t[0] === 3) && t.length - 1 === n)
      return this.pointFromX(t.slice(1, 1 + n), t[0] === 3);
    throw new Error("Unknown point format");
  };
  Dt.prototype.encodeCompressed = function (t) {
    return this.encode(t, !0);
  };
  Dt.prototype._encode = function (t) {
    var r = this.curve.p.byteLength(),
      n = this.getX().toArray("be", r);
    return t
      ? [this.getY().isEven() ? 2 : 3].concat(n)
      : [4].concat(n, this.getY().toArray("be", r));
  };
  Dt.prototype.encode = function (t, r) {
    return Xi.encode(this._encode(r), t);
  };
  Dt.prototype.precompute = function (t) {
    if (this.precomputed) return this;
    var r = { doubles: null, naf: null, beta: null };
    return (
      (r.naf = this._getNAFPoints(8)),
      (r.doubles = this._getDoubles(4, t)),
      (r.beta = this._getBeta()),
      (this.precomputed = r),
      this
    );
  };
  Dt.prototype._hasDoubles = function (t) {
    if (!this.precomputed) return !1;
    var r = this.precomputed.doubles;
    return r ? r.points.length >= Math.ceil((t.bitLength() + 1) / r.step) : !1;
  };
  Dt.prototype._getDoubles = function (t, r) {
    if (this.precomputed && this.precomputed.doubles)
      return this.precomputed.doubles;
    for (var n = [this], i = this, s = 0; s < r; s += t) {
      for (var o = 0; o < t; o++) i = i.dbl();
      n.push(i);
    }
    return { step: t, points: n };
  };
  Dt.prototype._getNAFPoints = function (t) {
    if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
    for (
      var r = [this], n = (1 << t) - 1, i = n === 1 ? null : this.dbl(), s = 1;
      s < n;
      s++
    )
      r[s] = r[s - 1].add(i);
    return { wnd: t, points: r };
  };
  Dt.prototype._getBeta = function () {
    return null;
  };
  Dt.prototype.dblp = function (t) {
    for (var r = this, n = 0; n < t; n++) r = r.dbl();
    return r;
  };
});
var M0 = _((KT, ca) => {
  typeof Object.create == "function"
    ? (ca.exports = function (t, r) {
        r &&
          ((t.super_ = r),
          (t.prototype = Object.create(r.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })));
      })
    : (ca.exports = function (t, r) {
        if (r) {
          t.super_ = r;
          var n = function () {};
          ((n.prototype = r.prototype),
            (t.prototype = new n()),
            (t.prototype.constructor = t));
        }
      });
});
var $i = _((jT, da) => {
  try {
    if (((ua = require("util")), typeof ua.inherits != "function")) throw "";
    da.exports = ua.inherits;
  } catch {
    da.exports = M0();
  }
  var ua;
});
var k0 = _((DT, O0) => {
  "use strict";
  var Z4 = Lt(),
    me = Zt(),
    ha = $i(),
    ri = Yi(),
    Q4 = Z4.assert;
  function Vt(e) {
    (ri.call(this, "short", e),
      (this.a = new me(e.a, 16).toRed(this.red)),
      (this.b = new me(e.b, 16).toRed(this.red)),
      (this.tinv = this.two.redInvm()),
      (this.zeroA = this.a.fromRed().cmpn(0) === 0),
      (this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0),
      (this.endo = this._getEndomorphism(e)),
      (this._endoWnafT1 = new Array(4)),
      (this._endoWnafT2 = new Array(4)));
  }
  ha(Vt, ri);
  O0.exports = Vt;
  Vt.prototype._getEndomorphism = function (t) {
    if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
      var r, n;
      if (t.beta) r = new me(t.beta, 16).toRed(this.red);
      else {
        var i = this._getEndoRoots(this.p);
        ((r = i[0].cmp(i[1]) < 0 ? i[0] : i[1]), (r = r.toRed(this.red)));
      }
      if (t.lambda) n = new me(t.lambda, 16);
      else {
        var s = this._getEndoRoots(this.n);
        this.g.mul(s[0]).x.cmp(this.g.x.redMul(r)) === 0
          ? (n = s[0])
          : ((n = s[1]), Q4(this.g.mul(n).x.cmp(this.g.x.redMul(r)) === 0));
      }
      var o;
      return (
        t.basis
          ? (o = t.basis.map(function (f) {
              return { a: new me(f.a, 16), b: new me(f.b, 16) };
            }))
          : (o = this._getEndoBasis(n)),
        { beta: r, lambda: n, basis: o }
      );
    }
  };
  Vt.prototype._getEndoRoots = function (t) {
    var r = t === this.p ? this.red : me.mont(t),
      n = new me(2).toRed(r).redInvm(),
      i = n.redNeg(),
      s = new me(3).toRed(r).redNeg().redSqrt().redMul(n),
      o = i.redAdd(s).fromRed(),
      f = i.redSub(s).fromRed();
    return [o, f];
  };
  Vt.prototype._getEndoBasis = function (t) {
    for (
      var r = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
        n = t,
        i = this.n.clone(),
        s = new me(1),
        o = new me(0),
        f = new me(0),
        u = new me(1),
        l,
        p,
        h,
        w,
        E,
        A,
        T,
        O = 0,
        k,
        H;
      n.cmpn(0) !== 0;

    ) {
      var P = i.div(n);
      ((k = i.sub(P.mul(n))), (H = f.sub(P.mul(s))));
      var M = u.sub(P.mul(o));
      if (!h && k.cmp(r) < 0) ((l = T.neg()), (p = s), (h = k.neg()), (w = H));
      else if (h && ++O === 2) break;
      ((T = k), (i = n), (n = k), (f = s), (s = H), (u = o), (o = M));
    }
    ((E = k.neg()), (A = H));
    var B = h.sqr().add(w.sqr()),
      F = E.sqr().add(A.sqr());
    return (
      F.cmp(B) >= 0 && ((E = l), (A = p)),
      h.negative && ((h = h.neg()), (w = w.neg())),
      E.negative && ((E = E.neg()), (A = A.neg())),
      [
        { a: h, b: w },
        { a: E, b: A },
      ]
    );
  };
  Vt.prototype._endoSplit = function (t) {
    var r = this.endo.basis,
      n = r[0],
      i = r[1],
      s = i.b.mul(t).divRound(this.n),
      o = n.b.neg().mul(t).divRound(this.n),
      f = s.mul(n.a),
      u = o.mul(i.a),
      l = s.mul(n.b),
      p = o.mul(i.b),
      h = t.sub(f).sub(u),
      w = l.add(p).neg();
    return { k1: h, k2: w };
  };
  Vt.prototype.pointFromX = function (t, r) {
    ((t = new me(t, 16)), t.red || (t = t.toRed(this.red)));
    var n = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b),
      i = n.redSqrt();
    if (i.redSqr().redSub(n).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var s = i.fromRed().isOdd();
    return (((r && !s) || (!r && s)) && (i = i.redNeg()), this.point(t, i));
  };
  Vt.prototype.validate = function (t) {
    if (t.inf) return !0;
    var r = t.x,
      n = t.y,
      i = this.a.redMul(r),
      s = r.redSqr().redMul(r).redIAdd(i).redIAdd(this.b);
    return n.redSqr().redISub(s).cmpn(0) === 0;
  };
  Vt.prototype._endoWnafMulAdd = function (t, r, n) {
    for (
      var i = this._endoWnafT1, s = this._endoWnafT2, o = 0;
      o < t.length;
      o++
    ) {
      var f = this._endoSplit(r[o]),
        u = t[o],
        l = u._getBeta();
      (f.k1.negative && (f.k1.ineg(), (u = u.neg(!0))),
        f.k2.negative && (f.k2.ineg(), (l = l.neg(!0))),
        (i[o * 2] = u),
        (i[o * 2 + 1] = l),
        (s[o * 2] = f.k1),
        (s[o * 2 + 1] = f.k2));
    }
    for (var p = this._wnafMulAdd(1, i, s, o * 2, n), h = 0; h < o * 2; h++)
      ((i[h] = null), (s[h] = null));
    return p;
  };
  function at(e, t, r, n) {
    (ri.BasePoint.call(this, e, "affine"),
      t === null && r === null
        ? ((this.x = null), (this.y = null), (this.inf = !0))
        : ((this.x = new me(t, 16)),
          (this.y = new me(r, 16)),
          n &&
            (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)),
          this.x.red || (this.x = this.x.toRed(this.curve.red)),
          this.y.red || (this.y = this.y.toRed(this.curve.red)),
          (this.inf = !1)));
  }
  ha(at, ri.BasePoint);
  Vt.prototype.point = function (t, r, n) {
    return new at(this, t, r, n);
  };
  Vt.prototype.pointFromJSON = function (t, r) {
    return at.fromJSON(this, t, r);
  };
  at.prototype._getBeta = function () {
    if (this.curve.endo) {
      var t = this.precomputed;
      if (t && t.beta) return t.beta;
      var r = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
      if (t) {
        var n = this.curve,
          i = function (s) {
            return n.point(s.x.redMul(n.endo.beta), s.y);
          };
        ((t.beta = r),
          (r.precomputed = {
            beta: null,
            naf: t.naf && { wnd: t.naf.wnd, points: t.naf.points.map(i) },
            doubles: t.doubles && {
              step: t.doubles.step,
              points: t.doubles.points.map(i),
            },
          }));
      }
      return r;
    }
  };
  at.prototype.toJSON = function () {
    return this.precomputed
      ? [
          this.x,
          this.y,
          this.precomputed && {
            doubles: this.precomputed.doubles && {
              step: this.precomputed.doubles.step,
              points: this.precomputed.doubles.points.slice(1),
            },
            naf: this.precomputed.naf && {
              wnd: this.precomputed.naf.wnd,
              points: this.precomputed.naf.points.slice(1),
            },
          },
        ]
      : [this.x, this.y];
  };
  at.fromJSON = function (t, r, n) {
    typeof r == "string" && (r = JSON.parse(r));
    var i = t.point(r[0], r[1], n);
    if (!r[2]) return i;
    function s(f) {
      return t.point(f[0], f[1], n);
    }
    var o = r[2];
    return (
      (i.precomputed = {
        beta: null,
        doubles: o.doubles && {
          step: o.doubles.step,
          points: [i].concat(o.doubles.points.map(s)),
        },
        naf: o.naf && {
          wnd: o.naf.wnd,
          points: [i].concat(o.naf.points.map(s)),
        },
      }),
      i
    );
  };
  at.prototype.inspect = function () {
    return this.isInfinity()
      ? "<EC Point Infinity>"
      : "<EC Point x: " +
          this.x.fromRed().toString(16, 2) +
          " y: " +
          this.y.fromRed().toString(16, 2) +
          ">";
  };
  at.prototype.isInfinity = function () {
    return this.inf;
  };
  at.prototype.add = function (t) {
    if (this.inf) return t;
    if (t.inf) return this;
    if (this.eq(t)) return this.dbl();
    if (this.neg().eq(t)) return this.curve.point(null, null);
    if (this.x.cmp(t.x) === 0) return this.curve.point(null, null);
    var r = this.y.redSub(t.y);
    r.cmpn(0) !== 0 && (r = r.redMul(this.x.redSub(t.x).redInvm()));
    var n = r.redSqr().redISub(this.x).redISub(t.x),
      i = r.redMul(this.x.redSub(n)).redISub(this.y);
    return this.curve.point(n, i);
  };
  at.prototype.dbl = function () {
    if (this.inf) return this;
    var t = this.y.redAdd(this.y);
    if (t.cmpn(0) === 0) return this.curve.point(null, null);
    var r = this.curve.a,
      n = this.x.redSqr(),
      i = t.redInvm(),
      s = n.redAdd(n).redIAdd(n).redIAdd(r).redMul(i),
      o = s.redSqr().redISub(this.x.redAdd(this.x)),
      f = s.redMul(this.x.redSub(o)).redISub(this.y);
    return this.curve.point(o, f);
  };
  at.prototype.getX = function () {
    return this.x.fromRed();
  };
  at.prototype.getY = function () {
    return this.y.fromRed();
  };
  at.prototype.mul = function (t) {
    return (
      (t = new me(t, 16)),
      this.isInfinity()
        ? this
        : this._hasDoubles(t)
          ? this.curve._fixedNafMul(this, t)
          : this.curve.endo
            ? this.curve._endoWnafMulAdd([this], [t])
            : this.curve._wnafMul(this, t)
    );
  };
  at.prototype.mulAdd = function (t, r, n) {
    var i = [this, r],
      s = [t, n];
    return this.curve.endo
      ? this.curve._endoWnafMulAdd(i, s)
      : this.curve._wnafMulAdd(1, i, s, 2);
  };
  at.prototype.jmulAdd = function (t, r, n) {
    var i = [this, r],
      s = [t, n];
    return this.curve.endo
      ? this.curve._endoWnafMulAdd(i, s, !0)
      : this.curve._wnafMulAdd(1, i, s, 2, !0);
  };
  at.prototype.eq = function (t) {
    return (
      this === t ||
      (this.inf === t.inf &&
        (this.inf || (this.x.cmp(t.x) === 0 && this.y.cmp(t.y) === 0)))
    );
  };
  at.prototype.neg = function (t) {
    if (this.inf) return this;
    var r = this.curve.point(this.x, this.y.redNeg());
    if (t && this.precomputed) {
      var n = this.precomputed,
        i = function (s) {
          return s.neg();
        };
      r.precomputed = {
        naf: n.naf && { wnd: n.naf.wnd, points: n.naf.points.map(i) },
        doubles: n.doubles && {
          step: n.doubles.step,
          points: n.doubles.points.map(i),
        },
      };
    }
    return r;
  };
  at.prototype.toJ = function () {
    if (this.inf) return this.curve.jpoint(null, null, null);
    var t = this.curve.jpoint(this.x, this.y, this.curve.one);
    return t;
  };
  function lt(e, t, r, n) {
    (ri.BasePoint.call(this, e, "jacobian"),
      t === null && r === null && n === null
        ? ((this.x = this.curve.one),
          (this.y = this.curve.one),
          (this.z = new me(0)))
        : ((this.x = new me(t, 16)),
          (this.y = new me(r, 16)),
          (this.z = new me(n, 16))),
      this.x.red || (this.x = this.x.toRed(this.curve.red)),
      this.y.red || (this.y = this.y.toRed(this.curve.red)),
      this.z.red || (this.z = this.z.toRed(this.curve.red)),
      (this.zOne = this.z === this.curve.one));
  }
  ha(lt, ri.BasePoint);
  Vt.prototype.jpoint = function (t, r, n) {
    return new lt(this, t, r, n);
  };
  lt.prototype.toP = function () {
    if (this.isInfinity()) return this.curve.point(null, null);
    var t = this.z.redInvm(),
      r = t.redSqr(),
      n = this.x.redMul(r),
      i = this.y.redMul(r).redMul(t);
    return this.curve.point(n, i);
  };
  lt.prototype.neg = function () {
    return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
  };
  lt.prototype.add = function (t) {
    if (this.isInfinity()) return t;
    if (t.isInfinity()) return this;
    var r = t.z.redSqr(),
      n = this.z.redSqr(),
      i = this.x.redMul(r),
      s = t.x.redMul(n),
      o = this.y.redMul(r.redMul(t.z)),
      f = t.y.redMul(n.redMul(this.z)),
      u = i.redSub(s),
      l = o.redSub(f);
    if (u.cmpn(0) === 0)
      return l.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
    var p = u.redSqr(),
      h = p.redMul(u),
      w = i.redMul(p),
      E = l.redSqr().redIAdd(h).redISub(w).redISub(w),
      A = l.redMul(w.redISub(E)).redISub(o.redMul(h)),
      T = this.z.redMul(t.z).redMul(u);
    return this.curve.jpoint(E, A, T);
  };
  lt.prototype.mixedAdd = function (t) {
    if (this.isInfinity()) return t.toJ();
    if (t.isInfinity()) return this;
    var r = this.z.redSqr(),
      n = this.x,
      i = t.x.redMul(r),
      s = this.y,
      o = t.y.redMul(r).redMul(this.z),
      f = n.redSub(i),
      u = s.redSub(o);
    if (f.cmpn(0) === 0)
      return u.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
    var l = f.redSqr(),
      p = l.redMul(f),
      h = n.redMul(l),
      w = u.redSqr().redIAdd(p).redISub(h).redISub(h),
      E = u.redMul(h.redISub(w)).redISub(s.redMul(p)),
      A = this.z.redMul(f);
    return this.curve.jpoint(w, E, A);
  };
  lt.prototype.dblp = function (t) {
    if (t === 0) return this;
    if (this.isInfinity()) return this;
    if (!t) return this.dbl();
    var r;
    if (this.curve.zeroA || this.curve.threeA) {
      var n = this;
      for (r = 0; r < t; r++) n = n.dbl();
      return n;
    }
    var i = this.curve.a,
      s = this.curve.tinv,
      o = this.x,
      f = this.y,
      u = this.z,
      l = u.redSqr().redSqr(),
      p = f.redAdd(f);
    for (r = 0; r < t; r++) {
      var h = o.redSqr(),
        w = p.redSqr(),
        E = w.redSqr(),
        A = h.redAdd(h).redIAdd(h).redIAdd(i.redMul(l)),
        T = o.redMul(w),
        O = A.redSqr().redISub(T.redAdd(T)),
        k = T.redISub(O),
        H = A.redMul(k);
      H = H.redIAdd(H).redISub(E);
      var P = p.redMul(u);
      (r + 1 < t && (l = l.redMul(E)), (o = O), (u = P), (p = H));
    }
    return this.curve.jpoint(o, p.redMul(s), u);
  };
  lt.prototype.dbl = function () {
    return this.isInfinity()
      ? this
      : this.curve.zeroA
        ? this._zeroDbl()
        : this.curve.threeA
          ? this._threeDbl()
          : this._dbl();
  };
  lt.prototype._zeroDbl = function () {
    var t, r, n;
    if (this.zOne) {
      var i = this.x.redSqr(),
        s = this.y.redSqr(),
        o = s.redSqr(),
        f = this.x.redAdd(s).redSqr().redISub(i).redISub(o);
      f = f.redIAdd(f);
      var u = i.redAdd(i).redIAdd(i),
        l = u.redSqr().redISub(f).redISub(f),
        p = o.redIAdd(o);
      ((p = p.redIAdd(p)),
        (p = p.redIAdd(p)),
        (t = l),
        (r = u.redMul(f.redISub(l)).redISub(p)),
        (n = this.y.redAdd(this.y)));
    } else {
      var h = this.x.redSqr(),
        w = this.y.redSqr(),
        E = w.redSqr(),
        A = this.x.redAdd(w).redSqr().redISub(h).redISub(E);
      A = A.redIAdd(A);
      var T = h.redAdd(h).redIAdd(h),
        O = T.redSqr(),
        k = E.redIAdd(E);
      ((k = k.redIAdd(k)),
        (k = k.redIAdd(k)),
        (t = O.redISub(A).redISub(A)),
        (r = T.redMul(A.redISub(t)).redISub(k)),
        (n = this.y.redMul(this.z)),
        (n = n.redIAdd(n)));
    }
    return this.curve.jpoint(t, r, n);
  };
  lt.prototype._threeDbl = function () {
    var t, r, n;
    if (this.zOne) {
      var i = this.x.redSqr(),
        s = this.y.redSqr(),
        o = s.redSqr(),
        f = this.x.redAdd(s).redSqr().redISub(i).redISub(o);
      f = f.redIAdd(f);
      var u = i.redAdd(i).redIAdd(i).redIAdd(this.curve.a),
        l = u.redSqr().redISub(f).redISub(f);
      t = l;
      var p = o.redIAdd(o);
      ((p = p.redIAdd(p)),
        (p = p.redIAdd(p)),
        (r = u.redMul(f.redISub(l)).redISub(p)),
        (n = this.y.redAdd(this.y)));
    } else {
      var h = this.z.redSqr(),
        w = this.y.redSqr(),
        E = this.x.redMul(w),
        A = this.x.redSub(h).redMul(this.x.redAdd(h));
      A = A.redAdd(A).redIAdd(A);
      var T = E.redIAdd(E);
      T = T.redIAdd(T);
      var O = T.redAdd(T);
      ((t = A.redSqr().redISub(O)),
        (n = this.y.redAdd(this.z).redSqr().redISub(w).redISub(h)));
      var k = w.redSqr();
      ((k = k.redIAdd(k)),
        (k = k.redIAdd(k)),
        (k = k.redIAdd(k)),
        (r = A.redMul(T.redISub(t)).redISub(k)));
    }
    return this.curve.jpoint(t, r, n);
  };
  lt.prototype._dbl = function () {
    var t = this.curve.a,
      r = this.x,
      n = this.y,
      i = this.z,
      s = i.redSqr().redSqr(),
      o = r.redSqr(),
      f = n.redSqr(),
      u = o.redAdd(o).redIAdd(o).redIAdd(t.redMul(s)),
      l = r.redAdd(r);
    l = l.redIAdd(l);
    var p = l.redMul(f),
      h = u.redSqr().redISub(p.redAdd(p)),
      w = p.redISub(h),
      E = f.redSqr();
    ((E = E.redIAdd(E)), (E = E.redIAdd(E)), (E = E.redIAdd(E)));
    var A = u.redMul(w).redISub(E),
      T = n.redAdd(n).redMul(i);
    return this.curve.jpoint(h, A, T);
  };
  lt.prototype.trpl = function () {
    if (!this.curve.zeroA) return this.dbl().add(this);
    var t = this.x.redSqr(),
      r = this.y.redSqr(),
      n = this.z.redSqr(),
      i = r.redSqr(),
      s = t.redAdd(t).redIAdd(t),
      o = s.redSqr(),
      f = this.x.redAdd(r).redSqr().redISub(t).redISub(i);
    ((f = f.redIAdd(f)), (f = f.redAdd(f).redIAdd(f)), (f = f.redISub(o)));
    var u = f.redSqr(),
      l = i.redIAdd(i);
    ((l = l.redIAdd(l)), (l = l.redIAdd(l)), (l = l.redIAdd(l)));
    var p = s.redIAdd(f).redSqr().redISub(o).redISub(u).redISub(l),
      h = r.redMul(p);
    ((h = h.redIAdd(h)), (h = h.redIAdd(h)));
    var w = this.x.redMul(u).redISub(h);
    ((w = w.redIAdd(w)), (w = w.redIAdd(w)));
    var E = this.y.redMul(p.redMul(l.redISub(p)).redISub(f.redMul(u)));
    ((E = E.redIAdd(E)), (E = E.redIAdd(E)), (E = E.redIAdd(E)));
    var A = this.z.redAdd(f).redSqr().redISub(n).redISub(u);
    return this.curve.jpoint(w, E, A);
  };
  lt.prototype.mul = function (t, r) {
    return ((t = new me(t, r)), this.curve._wnafMul(this, t));
  };
  lt.prototype.eq = function (t) {
    if (t.type === "affine") return this.eq(t.toJ());
    if (this === t) return !0;
    var r = this.z.redSqr(),
      n = t.z.redSqr();
    if (this.x.redMul(n).redISub(t.x.redMul(r)).cmpn(0) !== 0) return !1;
    var i = r.redMul(this.z),
      s = n.redMul(t.z);
    return this.y.redMul(s).redISub(t.y.redMul(i)).cmpn(0) === 0;
  };
  lt.prototype.eqXToP = function (t) {
    var r = this.z.redSqr(),
      n = t.toRed(this.curve.red).redMul(r);
    if (this.x.cmp(n) === 0) return !0;
    for (var i = t.clone(), s = this.curve.redN.redMul(r); ; ) {
      if ((i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0)) return !1;
      if ((n.redIAdd(s), this.x.cmp(n) === 0)) return !0;
    }
  };
  lt.prototype.inspect = function () {
    return this.isInfinity()
      ? "<EC JPoint Infinity>"
      : "<EC JPoint x: " +
          this.x.toString(16, 2) +
          " y: " +
          this.y.toString(16, 2) +
          " z: " +
          this.z.toString(16, 2) +
          ">";
  };
  lt.prototype.isInfinity = function () {
    return this.z.cmpn(0) === 0;
  };
});
var H0 = _((VT, q0) => {
  "use strict";
  var ni = Zt(),
    B0 = $i(),
    Fs = Yi(),
    ey = Lt();
  function ii(e) {
    (Fs.call(this, "mont", e),
      (this.a = new ni(e.a, 16).toRed(this.red)),
      (this.b = new ni(e.b, 16).toRed(this.red)),
      (this.i4 = new ni(4).toRed(this.red).redInvm()),
      (this.two = new ni(2).toRed(this.red)),
      (this.a24 = this.i4.redMul(this.a.redAdd(this.two))));
  }
  B0(ii, Fs);
  q0.exports = ii;
  ii.prototype.validate = function (t) {
    var r = t.normalize().x,
      n = r.redSqr(),
      i = n.redMul(r).redAdd(n.redMul(this.a)).redAdd(r),
      s = i.redSqrt();
    return s.redSqr().cmp(i) === 0;
  };
  function ct(e, t, r) {
    (Fs.BasePoint.call(this, e, "projective"),
      t === null && r === null
        ? ((this.x = this.curve.one), (this.z = this.curve.zero))
        : ((this.x = new ni(t, 16)),
          (this.z = new ni(r, 16)),
          this.x.red || (this.x = this.x.toRed(this.curve.red)),
          this.z.red || (this.z = this.z.toRed(this.curve.red))));
  }
  B0(ct, Fs.BasePoint);
  ii.prototype.decodePoint = function (t, r) {
    return this.point(ey.toArray(t, r), 1);
  };
  ii.prototype.point = function (t, r) {
    return new ct(this, t, r);
  };
  ii.prototype.pointFromJSON = function (t) {
    return ct.fromJSON(this, t);
  };
  ct.prototype.precompute = function () {};
  ct.prototype._encode = function () {
    return this.getX().toArray("be", this.curve.p.byteLength());
  };
  ct.fromJSON = function (t, r) {
    return new ct(t, r[0], r[1] || t.one);
  };
  ct.prototype.inspect = function () {
    return this.isInfinity()
      ? "<EC Point Infinity>"
      : "<EC Point x: " +
          this.x.fromRed().toString(16, 2) +
          " z: " +
          this.z.fromRed().toString(16, 2) +
          ">";
  };
  ct.prototype.isInfinity = function () {
    return this.z.cmpn(0) === 0;
  };
  ct.prototype.dbl = function () {
    var t = this.x.redAdd(this.z),
      r = t.redSqr(),
      n = this.x.redSub(this.z),
      i = n.redSqr(),
      s = r.redSub(i),
      o = r.redMul(i),
      f = s.redMul(i.redAdd(this.curve.a24.redMul(s)));
    return this.curve.point(o, f);
  };
  ct.prototype.add = function () {
    throw new Error("Not supported on Montgomery curve");
  };
  ct.prototype.diffAdd = function (t, r) {
    var n = this.x.redAdd(this.z),
      i = this.x.redSub(this.z),
      s = t.x.redAdd(t.z),
      o = t.x.redSub(t.z),
      f = o.redMul(n),
      u = s.redMul(i),
      l = r.z.redMul(f.redAdd(u).redSqr()),
      p = r.x.redMul(f.redISub(u).redSqr());
    return this.curve.point(l, p);
  };
  ct.prototype.mul = function (t) {
    for (
      var r = t.clone(),
        n = this,
        i = this.curve.point(null, null),
        s = this,
        o = [];
      r.cmpn(0) !== 0;
      r.iushrn(1)
    )
      o.push(r.andln(1));
    for (var f = o.length - 1; f >= 0; f--)
      o[f] === 0
        ? ((n = n.diffAdd(i, s)), (i = i.dbl()))
        : ((i = n.diffAdd(i, s)), (n = n.dbl()));
    return i;
  };
  ct.prototype.mulAdd = function () {
    throw new Error("Not supported on Montgomery curve");
  };
  ct.prototype.jumlAdd = function () {
    throw new Error("Not supported on Montgomery curve");
  };
  ct.prototype.eq = function (t) {
    return this.getX().cmp(t.getX()) === 0;
  };
  ct.prototype.normalize = function () {
    return (
      (this.x = this.x.redMul(this.z.redInvm())),
      (this.z = this.curve.one),
      this
    );
  };
  ct.prototype.getX = function () {
    return (this.normalize(), this.x.fromRed());
  };
});
var C0 = _((WT, R0) => {
  "use strict";
  var ty = Lt(),
    kr = Zt(),
    N0 = $i(),
    Ks = Yi(),
    ry = ty.assert;
  function ar(e) {
    ((this.twisted = (e.a | 0) !== 1),
      (this.mOneA = this.twisted && (e.a | 0) === -1),
      (this.extended = this.mOneA),
      Ks.call(this, "edwards", e),
      (this.a = new kr(e.a, 16).umod(this.red.m)),
      (this.a = this.a.toRed(this.red)),
      (this.c = new kr(e.c, 16).toRed(this.red)),
      (this.c2 = this.c.redSqr()),
      (this.d = new kr(e.d, 16).toRed(this.red)),
      (this.dd = this.d.redAdd(this.d)),
      ry(!this.twisted || this.c.fromRed().cmpn(1) === 0),
      (this.oneC = (e.c | 0) === 1));
  }
  N0(ar, Ks);
  R0.exports = ar;
  ar.prototype._mulA = function (t) {
    return this.mOneA ? t.redNeg() : this.a.redMul(t);
  };
  ar.prototype._mulC = function (t) {
    return this.oneC ? t : this.c.redMul(t);
  };
  ar.prototype.jpoint = function (t, r, n, i) {
    return this.point(t, r, n, i);
  };
  ar.prototype.pointFromX = function (t, r) {
    ((t = new kr(t, 16)), t.red || (t = t.toRed(this.red)));
    var n = t.redSqr(),
      i = this.c2.redSub(this.a.redMul(n)),
      s = this.one.redSub(this.c2.redMul(this.d).redMul(n)),
      o = i.redMul(s.redInvm()),
      f = o.redSqrt();
    if (f.redSqr().redSub(o).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var u = f.fromRed().isOdd();
    return (((r && !u) || (!r && u)) && (f = f.redNeg()), this.point(t, f));
  };
  ar.prototype.pointFromY = function (t, r) {
    ((t = new kr(t, 16)), t.red || (t = t.toRed(this.red)));
    var n = t.redSqr(),
      i = n.redSub(this.c2),
      s = n.redMul(this.d).redMul(this.c2).redSub(this.a),
      o = i.redMul(s.redInvm());
    if (o.cmp(this.zero) === 0) {
      if (r) throw new Error("invalid point");
      return this.point(this.zero, t);
    }
    var f = o.redSqrt();
    if (f.redSqr().redSub(o).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    return (f.fromRed().isOdd() !== r && (f = f.redNeg()), this.point(f, t));
  };
  ar.prototype.validate = function (t) {
    if (t.isInfinity()) return !0;
    t.normalize();
    var r = t.x.redSqr(),
      n = t.y.redSqr(),
      i = r.redMul(this.a).redAdd(n),
      s = this.c2.redMul(this.one.redAdd(this.d.redMul(r).redMul(n)));
    return i.cmp(s) === 0;
  };
  function fe(e, t, r, n, i) {
    (Ks.BasePoint.call(this, e, "projective"),
      t === null && r === null && n === null
        ? ((this.x = this.curve.zero),
          (this.y = this.curve.one),
          (this.z = this.curve.one),
          (this.t = this.curve.zero),
          (this.zOne = !0))
        : ((this.x = new kr(t, 16)),
          (this.y = new kr(r, 16)),
          (this.z = n ? new kr(n, 16) : this.curve.one),
          (this.t = i && new kr(i, 16)),
          this.x.red || (this.x = this.x.toRed(this.curve.red)),
          this.y.red || (this.y = this.y.toRed(this.curve.red)),
          this.z.red || (this.z = this.z.toRed(this.curve.red)),
          this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)),
          (this.zOne = this.z === this.curve.one),
          this.curve.extended &&
            !this.t &&
            ((this.t = this.x.redMul(this.y)),
            this.zOne || (this.t = this.t.redMul(this.z.redInvm())))));
  }
  N0(fe, Ks.BasePoint);
  ar.prototype.pointFromJSON = function (t) {
    return fe.fromJSON(this, t);
  };
  ar.prototype.point = function (t, r, n, i) {
    return new fe(this, t, r, n, i);
  };
  fe.fromJSON = function (t, r) {
    return new fe(t, r[0], r[1], r[2]);
  };
  fe.prototype.inspect = function () {
    return this.isInfinity()
      ? "<EC Point Infinity>"
      : "<EC Point x: " +
          this.x.fromRed().toString(16, 2) +
          " y: " +
          this.y.fromRed().toString(16, 2) +
          " z: " +
          this.z.fromRed().toString(16, 2) +
          ">";
  };
  fe.prototype.isInfinity = function () {
    return (
      this.x.cmpn(0) === 0 &&
      (this.y.cmp(this.z) === 0 ||
        (this.zOne && this.y.cmp(this.curve.c) === 0))
    );
  };
  fe.prototype._extDbl = function () {
    var t = this.x.redSqr(),
      r = this.y.redSqr(),
      n = this.z.redSqr();
    n = n.redIAdd(n);
    var i = this.curve._mulA(t),
      s = this.x.redAdd(this.y).redSqr().redISub(t).redISub(r),
      o = i.redAdd(r),
      f = o.redSub(n),
      u = i.redSub(r),
      l = s.redMul(f),
      p = o.redMul(u),
      h = s.redMul(u),
      w = f.redMul(o);
    return this.curve.point(l, p, w, h);
  };
  fe.prototype._projDbl = function () {
    var t = this.x.redAdd(this.y).redSqr(),
      r = this.x.redSqr(),
      n = this.y.redSqr(),
      i,
      s,
      o,
      f,
      u,
      l;
    if (this.curve.twisted) {
      f = this.curve._mulA(r);
      var p = f.redAdd(n);
      this.zOne
        ? ((i = t.redSub(r).redSub(n).redMul(p.redSub(this.curve.two))),
          (s = p.redMul(f.redSub(n))),
          (o = p.redSqr().redSub(p).redSub(p)))
        : ((u = this.z.redSqr()),
          (l = p.redSub(u).redISub(u)),
          (i = t.redSub(r).redISub(n).redMul(l)),
          (s = p.redMul(f.redSub(n))),
          (o = p.redMul(l)));
    } else
      ((f = r.redAdd(n)),
        (u = this.curve._mulC(this.z).redSqr()),
        (l = f.redSub(u).redSub(u)),
        (i = this.curve._mulC(t.redISub(f)).redMul(l)),
        (s = this.curve._mulC(f).redMul(r.redISub(n))),
        (o = f.redMul(l)));
    return this.curve.point(i, s, o);
  };
  fe.prototype.dbl = function () {
    return this.isInfinity()
      ? this
      : this.curve.extended
        ? this._extDbl()
        : this._projDbl();
  };
  fe.prototype._extAdd = function (t) {
    var r = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
      n = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
      i = this.t.redMul(this.curve.dd).redMul(t.t),
      s = this.z.redMul(t.z.redAdd(t.z)),
      o = n.redSub(r),
      f = s.redSub(i),
      u = s.redAdd(i),
      l = n.redAdd(r),
      p = o.redMul(f),
      h = u.redMul(l),
      w = o.redMul(l),
      E = f.redMul(u);
    return this.curve.point(p, h, E, w);
  };
  fe.prototype._projAdd = function (t) {
    var r = this.z.redMul(t.z),
      n = r.redSqr(),
      i = this.x.redMul(t.x),
      s = this.y.redMul(t.y),
      o = this.curve.d.redMul(i).redMul(s),
      f = n.redSub(o),
      u = n.redAdd(o),
      l = this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(i).redISub(s),
      p = r.redMul(f).redMul(l),
      h,
      w;
    return (
      this.curve.twisted
        ? ((h = r.redMul(u).redMul(s.redSub(this.curve._mulA(i)))),
          (w = f.redMul(u)))
        : ((h = r.redMul(u).redMul(s.redSub(i))),
          (w = this.curve._mulC(f).redMul(u))),
      this.curve.point(p, h, w)
    );
  };
  fe.prototype.add = function (t) {
    return this.isInfinity()
      ? t
      : t.isInfinity()
        ? this
        : this.curve.extended
          ? this._extAdd(t)
          : this._projAdd(t);
  };
  fe.prototype.mul = function (t) {
    return this._hasDoubles(t)
      ? this.curve._fixedNafMul(this, t)
      : this.curve._wnafMul(this, t);
  };
  fe.prototype.mulAdd = function (t, r, n) {
    return this.curve._wnafMulAdd(1, [this, r], [t, n], 2, !1);
  };
  fe.prototype.jmulAdd = function (t, r, n) {
    return this.curve._wnafMulAdd(1, [this, r], [t, n], 2, !0);
  };
  fe.prototype.normalize = function () {
    if (this.zOne) return this;
    var t = this.z.redInvm();
    return (
      (this.x = this.x.redMul(t)),
      (this.y = this.y.redMul(t)),
      this.t && (this.t = this.t.redMul(t)),
      (this.z = this.curve.one),
      (this.zOne = !0),
      this
    );
  };
  fe.prototype.neg = function () {
    return this.curve.point(
      this.x.redNeg(),
      this.y,
      this.z,
      this.t && this.t.redNeg(),
    );
  };
  fe.prototype.getX = function () {
    return (this.normalize(), this.x.fromRed());
  };
  fe.prototype.getY = function () {
    return (this.normalize(), this.y.fromRed());
  };
  fe.prototype.eq = function (t) {
    return (
      this === t ||
      (this.getX().cmp(t.getX()) === 0 && this.getY().cmp(t.getY()) === 0)
    );
  };
  fe.prototype.eqXToP = function (t) {
    var r = t.toRed(this.curve.red).redMul(this.z);
    if (this.x.cmp(r) === 0) return !0;
    for (var n = t.clone(), i = this.curve.redN.redMul(this.z); ; ) {
      if ((n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0)) return !1;
      if ((r.redIAdd(i), this.x.cmp(r) === 0)) return !0;
    }
  };
  fe.prototype.toP = fe.prototype.normalize;
  fe.prototype.mixedAdd = fe.prototype.add;
});
var la = _((U0) => {
  "use strict";
  var js = U0;
  js.base = Yi();
  js.short = k0();
  js.mont = H0();
  js.edwards = C0();
});
var er = _((ne) => {
  "use strict";
  var ny = Xr(),
    iy = $i();
  ne.inherits = iy;
  function sy(e, t) {
    return (e.charCodeAt(t) & 64512) !== 55296 || t < 0 || t + 1 >= e.length
      ? !1
      : (e.charCodeAt(t + 1) & 64512) === 56320;
  }
  function oy(e, t) {
    if (Array.isArray(e)) return e.slice();
    if (!e) return [];
    var r = [];
    if (typeof e == "string")
      if (t) {
        if (t === "hex")
          for (
            e = e.replace(/[^a-z0-9]+/gi, ""),
              e.length % 2 !== 0 && (e = "0" + e),
              i = 0;
            i < e.length;
            i += 2
          )
            r.push(parseInt(e[i] + e[i + 1], 16));
      } else
        for (var n = 0, i = 0; i < e.length; i++) {
          var s = e.charCodeAt(i);
          s < 128
            ? (r[n++] = s)
            : s < 2048
              ? ((r[n++] = (s >> 6) | 192), (r[n++] = (s & 63) | 128))
              : sy(e, i)
                ? ((s =
                    65536 + ((s & 1023) << 10) + (e.charCodeAt(++i) & 1023)),
                  (r[n++] = (s >> 18) | 240),
                  (r[n++] = ((s >> 12) & 63) | 128),
                  (r[n++] = ((s >> 6) & 63) | 128),
                  (r[n++] = (s & 63) | 128))
                : ((r[n++] = (s >> 12) | 224),
                  (r[n++] = ((s >> 6) & 63) | 128),
                  (r[n++] = (s & 63) | 128));
        }
    else for (i = 0; i < e.length; i++) r[i] = e[i] | 0;
    return r;
  }
  ne.toArray = oy;
  function fy(e) {
    for (var t = "", r = 0; r < e.length; r++) t += F0(e[r].toString(16));
    return t;
  }
  ne.toHex = fy;
  function L0(e) {
    var t =
      (e >>> 24) |
      ((e >>> 8) & 65280) |
      ((e << 8) & 16711680) |
      ((e & 255) << 24);
    return t >>> 0;
  }
  ne.htonl = L0;
  function ay(e, t) {
    for (var r = "", n = 0; n < e.length; n++) {
      var i = e[n];
      (t === "little" && (i = L0(i)), (r += K0(i.toString(16))));
    }
    return r;
  }
  ne.toHex32 = ay;
  function F0(e) {
    return e.length === 1 ? "0" + e : e;
  }
  ne.zero2 = F0;
  function K0(e) {
    return e.length === 7
      ? "0" + e
      : e.length === 6
        ? "00" + e
        : e.length === 5
          ? "000" + e
          : e.length === 4
            ? "0000" + e
            : e.length === 3
              ? "00000" + e
              : e.length === 2
                ? "000000" + e
                : e.length === 1
                  ? "0000000" + e
                  : e;
  }
  ne.zero8 = K0;
  function cy(e, t, r, n) {
    var i = r - t;
    ny(i % 4 === 0);
    for (var s = new Array(i / 4), o = 0, f = t; o < s.length; o++, f += 4) {
      var u;
      (n === "big"
        ? (u = (e[f] << 24) | (e[f + 1] << 16) | (e[f + 2] << 8) | e[f + 3])
        : (u = (e[f + 3] << 24) | (e[f + 2] << 16) | (e[f + 1] << 8) | e[f]),
        (s[o] = u >>> 0));
    }
    return s;
  }
  ne.join32 = cy;
  function uy(e, t) {
    for (
      var r = new Array(e.length * 4), n = 0, i = 0;
      n < e.length;
      n++, i += 4
    ) {
      var s = e[n];
      t === "big"
        ? ((r[i] = s >>> 24),
          (r[i + 1] = (s >>> 16) & 255),
          (r[i + 2] = (s >>> 8) & 255),
          (r[i + 3] = s & 255))
        : ((r[i + 3] = s >>> 24),
          (r[i + 2] = (s >>> 16) & 255),
          (r[i + 1] = (s >>> 8) & 255),
          (r[i] = s & 255));
    }
    return r;
  }
  ne.split32 = uy;
  function dy(e, t) {
    return (e >>> t) | (e << (32 - t));
  }
  ne.rotr32 = dy;
  function hy(e, t) {
    return (e << t) | (e >>> (32 - t));
  }
  ne.rotl32 = hy;
  function ly(e, t) {
    return (e + t) >>> 0;
  }
  ne.sum32 = ly;
  function py(e, t, r) {
    return (e + t + r) >>> 0;
  }
  ne.sum32_3 = py;
  function by(e, t, r, n) {
    return (e + t + r + n) >>> 0;
  }
  ne.sum32_4 = by;
  function yy(e, t, r, n, i) {
    return (e + t + r + n + i) >>> 0;
  }
  ne.sum32_5 = yy;
  function vy(e, t, r, n) {
    var i = e[t],
      s = e[t + 1],
      o = (n + s) >>> 0,
      f = (o < n ? 1 : 0) + r + i;
    ((e[t] = f >>> 0), (e[t + 1] = o));
  }
  ne.sum64 = vy;
  function gy(e, t, r, n) {
    var i = (t + n) >>> 0,
      s = (i < t ? 1 : 0) + e + r;
    return s >>> 0;
  }
  ne.sum64_hi = gy;
  function my(e, t, r, n) {
    var i = t + n;
    return i >>> 0;
  }
  ne.sum64_lo = my;
  function wy(e, t, r, n, i, s, o, f) {
    var u = 0,
      l = t;
    ((l = (l + n) >>> 0),
      (u += l < t ? 1 : 0),
      (l = (l + s) >>> 0),
      (u += l < s ? 1 : 0),
      (l = (l + f) >>> 0),
      (u += l < f ? 1 : 0));
    var p = e + r + i + o + u;
    return p >>> 0;
  }
  ne.sum64_4_hi = wy;
  function _y(e, t, r, n, i, s, o, f) {
    var u = t + n + s + f;
    return u >>> 0;
  }
  ne.sum64_4_lo = _y;
  function Sy(e, t, r, n, i, s, o, f, u, l) {
    var p = 0,
      h = t;
    ((h = (h + n) >>> 0),
      (p += h < t ? 1 : 0),
      (h = (h + s) >>> 0),
      (p += h < s ? 1 : 0),
      (h = (h + f) >>> 0),
      (p += h < f ? 1 : 0),
      (h = (h + l) >>> 0),
      (p += h < l ? 1 : 0));
    var w = e + r + i + o + u + p;
    return w >>> 0;
  }
  ne.sum64_5_hi = Sy;
  function xy(e, t, r, n, i, s, o, f, u, l) {
    var p = t + n + s + f + l;
    return p >>> 0;
  }
  ne.sum64_5_lo = xy;
  function Ey(e, t, r) {
    var n = (t << (32 - r)) | (e >>> r);
    return n >>> 0;
  }
  ne.rotr64_hi = Ey;
  function Ay(e, t, r) {
    var n = (e << (32 - r)) | (t >>> r);
    return n >>> 0;
  }
  ne.rotr64_lo = Ay;
  function Iy(e, t, r) {
    return e >>> r;
  }
  ne.shr64_hi = Iy;
  function Ty(e, t, r) {
    var n = (e << (32 - r)) | (t >>> r);
    return n >>> 0;
  }
  ne.shr64_lo = Ty;
});
var si = _((D0) => {
  "use strict";
  var j0 = er(),
    Py = Xr();
  function Ds() {
    ((this.pending = null),
      (this.pendingTotal = 0),
      (this.blockSize = this.constructor.blockSize),
      (this.outSize = this.constructor.outSize),
      (this.hmacStrength = this.constructor.hmacStrength),
      (this.padLength = this.constructor.padLength / 8),
      (this.endian = "big"),
      (this._delta8 = this.blockSize / 8),
      (this._delta32 = this.blockSize / 32));
  }
  D0.BlockHash = Ds;
  Ds.prototype.update = function (t, r) {
    if (
      ((t = j0.toArray(t, r)),
      this.pending
        ? (this.pending = this.pending.concat(t))
        : (this.pending = t),
      (this.pendingTotal += t.length),
      this.pending.length >= this._delta8)
    ) {
      t = this.pending;
      var n = t.length % this._delta8;
      ((this.pending = t.slice(t.length - n, t.length)),
        this.pending.length === 0 && (this.pending = null),
        (t = j0.join32(t, 0, t.length - n, this.endian)));
      for (var i = 0; i < t.length; i += this._delta32)
        this._update(t, i, i + this._delta32);
    }
    return this;
  };
  Ds.prototype.digest = function (t) {
    return (
      this.update(this._pad()),
      Py(this.pending === null),
      this._digest(t)
    );
  };
  Ds.prototype._pad = function () {
    var t = this.pendingTotal,
      r = this._delta8,
      n = r - ((t + this.padLength) % r),
      i = new Array(n + this.padLength);
    i[0] = 128;
    for (var s = 1; s < n; s++) i[s] = 0;
    if (((t <<= 3), this.endian === "big")) {
      for (var o = 8; o < this.padLength; o++) i[s++] = 0;
      ((i[s++] = 0),
        (i[s++] = 0),
        (i[s++] = 0),
        (i[s++] = 0),
        (i[s++] = (t >>> 24) & 255),
        (i[s++] = (t >>> 16) & 255),
        (i[s++] = (t >>> 8) & 255),
        (i[s++] = t & 255));
    } else
      for (
        i[s++] = t & 255,
          i[s++] = (t >>> 8) & 255,
          i[s++] = (t >>> 16) & 255,
          i[s++] = (t >>> 24) & 255,
          i[s++] = 0,
          i[s++] = 0,
          i[s++] = 0,
          i[s++] = 0,
          o = 8;
        o < this.padLength;
        o++
      )
        i[s++] = 0;
    return i;
  };
});
var pa = _((Br) => {
  "use strict";
  var My = er(),
    cr = My.rotr32;
  function Oy(e, t, r, n) {
    if (e === 0) return V0(t, r, n);
    if (e === 1 || e === 3) return z0(t, r, n);
    if (e === 2) return W0(t, r, n);
  }
  Br.ft_1 = Oy;
  function V0(e, t, r) {
    return (e & t) ^ (~e & r);
  }
  Br.ch32 = V0;
  function W0(e, t, r) {
    return (e & t) ^ (e & r) ^ (t & r);
  }
  Br.maj32 = W0;
  function z0(e, t, r) {
    return e ^ t ^ r;
  }
  Br.p32 = z0;
  function ky(e) {
    return cr(e, 2) ^ cr(e, 13) ^ cr(e, 22);
  }
  Br.s0_256 = ky;
  function By(e) {
    return cr(e, 6) ^ cr(e, 11) ^ cr(e, 25);
  }
  Br.s1_256 = By;
  function qy(e) {
    return cr(e, 7) ^ cr(e, 18) ^ (e >>> 3);
  }
  Br.g0_256 = qy;
  function Hy(e) {
    return cr(e, 17) ^ cr(e, 19) ^ (e >>> 10);
  }
  Br.g1_256 = Hy;
});
var Y0 = _(($T, X0) => {
  "use strict";
  var oi = er(),
    Ny = si(),
    Ry = pa(),
    ba = oi.rotl32,
    Ji = oi.sum32,
    Cy = oi.sum32_5,
    Uy = Ry.ft_1,
    G0 = Ny.BlockHash,
    Ly = [1518500249, 1859775393, 2400959708, 3395469782];
  function ur() {
    if (!(this instanceof ur)) return new ur();
    (G0.call(this),
      (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
      (this.W = new Array(80)));
  }
  oi.inherits(ur, G0);
  X0.exports = ur;
  ur.blockSize = 512;
  ur.outSize = 160;
  ur.hmacStrength = 80;
  ur.padLength = 64;
  ur.prototype._update = function (t, r) {
    for (var n = this.W, i = 0; i < 16; i++) n[i] = t[r + i];
    for (; i < n.length; i++)
      n[i] = ba(n[i - 3] ^ n[i - 8] ^ n[i - 14] ^ n[i - 16], 1);
    var s = this.h[0],
      o = this.h[1],
      f = this.h[2],
      u = this.h[3],
      l = this.h[4];
    for (i = 0; i < n.length; i++) {
      var p = ~~(i / 20),
        h = Cy(ba(s, 5), Uy(p, o, f, u), l, n[i], Ly[p]);
      ((l = u), (u = f), (f = ba(o, 30)), (o = s), (s = h));
    }
    ((this.h[0] = Ji(this.h[0], s)),
      (this.h[1] = Ji(this.h[1], o)),
      (this.h[2] = Ji(this.h[2], f)),
      (this.h[3] = Ji(this.h[3], u)),
      (this.h[4] = Ji(this.h[4], l)));
  };
  ur.prototype._digest = function (t) {
    return t === "hex" ? oi.toHex32(this.h, "big") : oi.split32(this.h, "big");
  };
});
var ya = _((JT, J0) => {
  "use strict";
  var fi = er(),
    Fy = si(),
    ai = pa(),
    Ky = Xr(),
    tr = fi.sum32,
    jy = fi.sum32_4,
    Dy = fi.sum32_5,
    Vy = ai.ch32,
    Wy = ai.maj32,
    zy = ai.s0_256,
    Gy = ai.s1_256,
    Xy = ai.g0_256,
    Yy = ai.g1_256,
    $0 = Fy.BlockHash,
    $y = [
      1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
      2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
      1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
      264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
      2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
      113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
      1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
      3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
      430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
      1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
      2428436474, 2756734187, 3204031479, 3329325298,
    ];
  function dr() {
    if (!(this instanceof dr)) return new dr();
    ($0.call(this),
      (this.h = [
        1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
        528734635, 1541459225,
      ]),
      (this.k = $y),
      (this.W = new Array(64)));
  }
  fi.inherits(dr, $0);
  J0.exports = dr;
  dr.blockSize = 512;
  dr.outSize = 256;
  dr.hmacStrength = 192;
  dr.padLength = 64;
  dr.prototype._update = function (t, r) {
    for (var n = this.W, i = 0; i < 16; i++) n[i] = t[r + i];
    for (; i < n.length; i++)
      n[i] = jy(Yy(n[i - 2]), n[i - 7], Xy(n[i - 15]), n[i - 16]);
    var s = this.h[0],
      o = this.h[1],
      f = this.h[2],
      u = this.h[3],
      l = this.h[4],
      p = this.h[5],
      h = this.h[6],
      w = this.h[7];
    for (Ky(this.k.length === n.length), i = 0; i < n.length; i++) {
      var E = Dy(w, Gy(l), Vy(l, p, h), this.k[i], n[i]),
        A = tr(zy(s), Wy(s, o, f));
      ((w = h),
        (h = p),
        (p = l),
        (l = tr(u, E)),
        (u = f),
        (f = o),
        (o = s),
        (s = tr(E, A)));
    }
    ((this.h[0] = tr(this.h[0], s)),
      (this.h[1] = tr(this.h[1], o)),
      (this.h[2] = tr(this.h[2], f)),
      (this.h[3] = tr(this.h[3], u)),
      (this.h[4] = tr(this.h[4], l)),
      (this.h[5] = tr(this.h[5], p)),
      (this.h[6] = tr(this.h[6], h)),
      (this.h[7] = tr(this.h[7], w)));
  };
  dr.prototype._digest = function (t) {
    return t === "hex" ? fi.toHex32(this.h, "big") : fi.split32(this.h, "big");
  };
});
var ed = _((ZT, Q0) => {
  "use strict";
  var va = er(),
    Z0 = ya();
  function qr() {
    if (!(this instanceof qr)) return new qr();
    (Z0.call(this),
      (this.h = [
        3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025,
        1694076839, 3204075428,
      ]));
  }
  va.inherits(qr, Z0);
  Q0.exports = qr;
  qr.blockSize = 512;
  qr.outSize = 224;
  qr.hmacStrength = 192;
  qr.padLength = 64;
  qr.prototype._digest = function (t) {
    return t === "hex"
      ? va.toHex32(this.h.slice(0, 7), "big")
      : va.split32(this.h.slice(0, 7), "big");
  };
});
var wa = _((QT, id) => {
  "use strict";
  var qt = er(),
    Jy = si(),
    Zy = Xr(),
    hr = qt.rotr64_hi,
    lr = qt.rotr64_lo,
    td = qt.shr64_hi,
    rd = qt.shr64_lo,
    Jr = qt.sum64,
    ga = qt.sum64_hi,
    ma = qt.sum64_lo,
    Qy = qt.sum64_4_hi,
    ev = qt.sum64_4_lo,
    tv = qt.sum64_5_hi,
    rv = qt.sum64_5_lo,
    nd = Jy.BlockHash,
    nv = [
      1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
      3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
      2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
      310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
      1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
      3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
      264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
      1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
      2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
      3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
      113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
      773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
      1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
      2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
      3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
      3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
      430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
      883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
      1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
      2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
      2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
      3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
      3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
      174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
      685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
      1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
      1607167915, 987167468, 1816402316, 1246189591,
    ];
  function rr() {
    if (!(this instanceof rr)) return new rr();
    (nd.call(this),
      (this.h = [
        1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723,
        2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199,
        528734635, 4215389547, 1541459225, 327033209,
      ]),
      (this.k = nv),
      (this.W = new Array(160)));
  }
  qt.inherits(rr, nd);
  id.exports = rr;
  rr.blockSize = 1024;
  rr.outSize = 512;
  rr.hmacStrength = 192;
  rr.padLength = 128;
  rr.prototype._prepareBlock = function (t, r) {
    for (var n = this.W, i = 0; i < 32; i++) n[i] = t[r + i];
    for (; i < n.length; i += 2) {
      var s = pv(n[i - 4], n[i - 3]),
        o = bv(n[i - 4], n[i - 3]),
        f = n[i - 14],
        u = n[i - 13],
        l = hv(n[i - 30], n[i - 29]),
        p = lv(n[i - 30], n[i - 29]),
        h = n[i - 32],
        w = n[i - 31];
      ((n[i] = Qy(s, o, f, u, l, p, h, w)),
        (n[i + 1] = ev(s, o, f, u, l, p, h, w)));
    }
  };
  rr.prototype._update = function (t, r) {
    this._prepareBlock(t, r);
    var n = this.W,
      i = this.h[0],
      s = this.h[1],
      o = this.h[2],
      f = this.h[3],
      u = this.h[4],
      l = this.h[5],
      p = this.h[6],
      h = this.h[7],
      w = this.h[8],
      E = this.h[9],
      A = this.h[10],
      T = this.h[11],
      O = this.h[12],
      k = this.h[13],
      H = this.h[14],
      P = this.h[15];
    Zy(this.k.length === n.length);
    for (var M = 0; M < n.length; M += 2) {
      var B = H,
        F = P,
        z = uv(w, E),
        K = dv(w, E),
        Z = iv(w, E, A, T, O, k),
        S = sv(w, E, A, T, O, k),
        a = this.k[M],
        d = this.k[M + 1],
        b = n[M],
        y = n[M + 1],
        g = tv(B, F, z, K, Z, S, a, d, b, y),
        x = rv(B, F, z, K, Z, S, a, d, b, y);
      ((B = av(i, s)),
        (F = cv(i, s)),
        (z = ov(i, s, o, f, u, l)),
        (K = fv(i, s, o, f, u, l)));
      var I = ga(B, F, z, K),
        v = ma(B, F, z, K);
      ((H = O),
        (P = k),
        (O = A),
        (k = T),
        (A = w),
        (T = E),
        (w = ga(p, h, g, x)),
        (E = ma(h, h, g, x)),
        (p = u),
        (h = l),
        (u = o),
        (l = f),
        (o = i),
        (f = s),
        (i = ga(g, x, I, v)),
        (s = ma(g, x, I, v)));
    }
    (Jr(this.h, 0, i, s),
      Jr(this.h, 2, o, f),
      Jr(this.h, 4, u, l),
      Jr(this.h, 6, p, h),
      Jr(this.h, 8, w, E),
      Jr(this.h, 10, A, T),
      Jr(this.h, 12, O, k),
      Jr(this.h, 14, H, P));
  };
  rr.prototype._digest = function (t) {
    return t === "hex" ? qt.toHex32(this.h, "big") : qt.split32(this.h, "big");
  };
  function iv(e, t, r, n, i) {
    var s = (e & r) ^ (~e & i);
    return (s < 0 && (s += 4294967296), s);
  }
  function sv(e, t, r, n, i, s) {
    var o = (t & n) ^ (~t & s);
    return (o < 0 && (o += 4294967296), o);
  }
  function ov(e, t, r, n, i) {
    var s = (e & r) ^ (e & i) ^ (r & i);
    return (s < 0 && (s += 4294967296), s);
  }
  function fv(e, t, r, n, i, s) {
    var o = (t & n) ^ (t & s) ^ (n & s);
    return (o < 0 && (o += 4294967296), o);
  }
  function av(e, t) {
    var r = hr(e, t, 28),
      n = hr(t, e, 2),
      i = hr(t, e, 7),
      s = r ^ n ^ i;
    return (s < 0 && (s += 4294967296), s);
  }
  function cv(e, t) {
    var r = lr(e, t, 28),
      n = lr(t, e, 2),
      i = lr(t, e, 7),
      s = r ^ n ^ i;
    return (s < 0 && (s += 4294967296), s);
  }
  function uv(e, t) {
    var r = hr(e, t, 14),
      n = hr(e, t, 18),
      i = hr(t, e, 9),
      s = r ^ n ^ i;
    return (s < 0 && (s += 4294967296), s);
  }
  function dv(e, t) {
    var r = lr(e, t, 14),
      n = lr(e, t, 18),
      i = lr(t, e, 9),
      s = r ^ n ^ i;
    return (s < 0 && (s += 4294967296), s);
  }
  function hv(e, t) {
    var r = hr(e, t, 1),
      n = hr(e, t, 8),
      i = td(e, t, 7),
      s = r ^ n ^ i;
    return (s < 0 && (s += 4294967296), s);
  }
  function lv(e, t) {
    var r = lr(e, t, 1),
      n = lr(e, t, 8),
      i = rd(e, t, 7),
      s = r ^ n ^ i;
    return (s < 0 && (s += 4294967296), s);
  }
  function pv(e, t) {
    var r = hr(e, t, 19),
      n = hr(t, e, 29),
      i = td(e, t, 6),
      s = r ^ n ^ i;
    return (s < 0 && (s += 4294967296), s);
  }
  function bv(e, t) {
    var r = lr(e, t, 19),
      n = lr(t, e, 29),
      i = rd(e, t, 6),
      s = r ^ n ^ i;
    return (s < 0 && (s += 4294967296), s);
  }
});
var fd = _((eP, od) => {
  "use strict";
  var _a = er(),
    sd = wa();
  function Hr() {
    if (!(this instanceof Hr)) return new Hr();
    (sd.call(this),
      (this.h = [
        3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999,
        355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025,
        3675008525, 1694076839, 1203062813, 3204075428,
      ]));
  }
  _a.inherits(Hr, sd);
  od.exports = Hr;
  Hr.blockSize = 1024;
  Hr.outSize = 384;
  Hr.hmacStrength = 192;
  Hr.padLength = 128;
  Hr.prototype._digest = function (t) {
    return t === "hex"
      ? _a.toHex32(this.h.slice(0, 12), "big")
      : _a.split32(this.h.slice(0, 12), "big");
  };
});
var ad = _((ci) => {
  "use strict";
  ci.sha1 = Y0();
  ci.sha224 = ed();
  ci.sha256 = ya();
  ci.sha384 = fd();
  ci.sha512 = wa();
});
var pd = _((ld) => {
  "use strict";
  var xn = er(),
    yv = si(),
    Vs = xn.rotl32,
    cd = xn.sum32,
    Zi = xn.sum32_3,
    ud = xn.sum32_4,
    hd = yv.BlockHash;
  function pr() {
    if (!(this instanceof pr)) return new pr();
    (hd.call(this),
      (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
      (this.endian = "little"));
  }
  xn.inherits(pr, hd);
  ld.ripemd160 = pr;
  pr.blockSize = 512;
  pr.outSize = 160;
  pr.hmacStrength = 192;
  pr.padLength = 64;
  pr.prototype._update = function (t, r) {
    for (
      var n = this.h[0],
        i = this.h[1],
        s = this.h[2],
        o = this.h[3],
        f = this.h[4],
        u = n,
        l = i,
        p = s,
        h = o,
        w = f,
        E = 0;
      E < 80;
      E++
    ) {
      var A = cd(Vs(ud(n, dd(E, i, s, o), t[mv[E] + r], vv(E)), _v[E]), f);
      ((n = f),
        (f = o),
        (o = Vs(s, 10)),
        (s = i),
        (i = A),
        (A = cd(Vs(ud(u, dd(79 - E, l, p, h), t[wv[E] + r], gv(E)), Sv[E]), w)),
        (u = w),
        (w = h),
        (h = Vs(p, 10)),
        (p = l),
        (l = A));
    }
    ((A = Zi(this.h[1], s, h)),
      (this.h[1] = Zi(this.h[2], o, w)),
      (this.h[2] = Zi(this.h[3], f, u)),
      (this.h[3] = Zi(this.h[4], n, l)),
      (this.h[4] = Zi(this.h[0], i, p)),
      (this.h[0] = A));
  };
  pr.prototype._digest = function (t) {
    return t === "hex"
      ? xn.toHex32(this.h, "little")
      : xn.split32(this.h, "little");
  };
  function dd(e, t, r, n) {
    return e <= 15
      ? t ^ r ^ n
      : e <= 31
        ? (t & r) | (~t & n)
        : e <= 47
          ? (t | ~r) ^ n
          : e <= 63
            ? (t & n) | (r & ~n)
            : t ^ (r | ~n);
  }
  function vv(e) {
    return e <= 15
      ? 0
      : e <= 31
        ? 1518500249
        : e <= 47
          ? 1859775393
          : e <= 63
            ? 2400959708
            : 2840853838;
  }
  function gv(e) {
    return e <= 15
      ? 1352829926
      : e <= 31
        ? 1548603684
        : e <= 47
          ? 1836072691
          : e <= 63
            ? 2053994217
            : 0;
  }
  var mv = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6,
      15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6,
      13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0,
      5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
    ],
    wv = [
      5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13,
      5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2,
      10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12,
      15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
    ],
    _v = [
      11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11,
      9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8,
      13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5,
      12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
    ],
    Sv = [
      8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12,
      8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13,
      5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15,
      8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
    ];
});
var yd = _((nP, bd) => {
  "use strict";
  var xv = er(),
    Ev = Xr();
  function ui(e, t, r) {
    if (!(this instanceof ui)) return new ui(e, t, r);
    ((this.Hash = e),
      (this.blockSize = e.blockSize / 8),
      (this.outSize = e.outSize / 8),
      (this.inner = null),
      (this.outer = null),
      this._init(xv.toArray(t, r)));
  }
  bd.exports = ui;
  ui.prototype._init = function (t) {
    (t.length > this.blockSize && (t = new this.Hash().update(t).digest()),
      Ev(t.length <= this.blockSize));
    for (var r = t.length; r < this.blockSize; r++) t.push(0);
    for (r = 0; r < t.length; r++) t[r] ^= 54;
    for (this.inner = new this.Hash().update(t), r = 0; r < t.length; r++)
      t[r] ^= 106;
    this.outer = new this.Hash().update(t);
  };
  ui.prototype.update = function (t, r) {
    return (this.inner.update(t, r), this);
  };
  ui.prototype.digest = function (t) {
    return (this.outer.update(this.inner.digest()), this.outer.digest(t));
  };
});
var Ws = _((vd) => {
  var pt = vd;
  pt.utils = er();
  pt.common = si();
  pt.sha = ad();
  pt.ripemd = pd();
  pt.hmac = yd();
  pt.sha1 = pt.sha.sha1;
  pt.sha256 = pt.sha.sha256;
  pt.sha224 = pt.sha.sha224;
  pt.sha384 = pt.sha.sha384;
  pt.sha512 = pt.sha.sha512;
  pt.ripemd160 = pt.ripemd.ripemd160;
});
var md = _((sP, gd) => {
  gd.exports = {
    doubles: {
      step: 4,
      points: [
        [
          "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
          "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821",
        ],
        [
          "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
          "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf",
        ],
        [
          "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
          "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695",
        ],
        [
          "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
          "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9",
        ],
        [
          "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
          "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36",
        ],
        [
          "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
          "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f",
        ],
        [
          "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
          "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999",
        ],
        [
          "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
          "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09",
        ],
        [
          "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
          "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d",
        ],
        [
          "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
          "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088",
        ],
        [
          "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
          "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d",
        ],
        [
          "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
          "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8",
        ],
        [
          "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
          "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a",
        ],
        [
          "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
          "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453",
        ],
        [
          "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
          "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160",
        ],
        [
          "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
          "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0",
        ],
        [
          "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
          "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6",
        ],
        [
          "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
          "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589",
        ],
        [
          "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
          "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17",
        ],
        [
          "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
          "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda",
        ],
        [
          "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
          "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd",
        ],
        [
          "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
          "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2",
        ],
        [
          "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
          "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6",
        ],
        [
          "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
          "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f",
        ],
        [
          "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
          "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01",
        ],
        [
          "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
          "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3",
        ],
        [
          "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
          "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f",
        ],
        [
          "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
          "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7",
        ],
        [
          "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
          "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78",
        ],
        [
          "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
          "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1",
        ],
        [
          "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
          "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150",
        ],
        [
          "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
          "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82",
        ],
        [
          "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
          "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc",
        ],
        [
          "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
          "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b",
        ],
        [
          "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
          "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51",
        ],
        [
          "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
          "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45",
        ],
        [
          "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
          "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120",
        ],
        [
          "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
          "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84",
        ],
        [
          "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
          "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d",
        ],
        [
          "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
          "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d",
        ],
        [
          "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
          "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8",
        ],
        [
          "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
          "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8",
        ],
        [
          "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
          "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac",
        ],
        [
          "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
          "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f",
        ],
        [
          "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
          "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962",
        ],
        [
          "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
          "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907",
        ],
        [
          "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
          "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec",
        ],
        [
          "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
          "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d",
        ],
        [
          "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
          "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414",
        ],
        [
          "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
          "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd",
        ],
        [
          "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
          "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0",
        ],
        [
          "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
          "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811",
        ],
        [
          "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
          "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1",
        ],
        [
          "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
          "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c",
        ],
        [
          "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
          "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73",
        ],
        [
          "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
          "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd",
        ],
        [
          "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
          "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405",
        ],
        [
          "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
          "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589",
        ],
        [
          "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
          "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e",
        ],
        [
          "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
          "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27",
        ],
        [
          "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
          "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1",
        ],
        [
          "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
          "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482",
        ],
        [
          "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
          "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945",
        ],
        [
          "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
          "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573",
        ],
        [
          "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
          "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82",
        ],
      ],
    },
    naf: {
      wnd: 7,
      points: [
        [
          "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
          "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672",
        ],
        [
          "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
          "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6",
        ],
        [
          "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
          "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da",
        ],
        [
          "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
          "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37",
        ],
        [
          "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
          "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b",
        ],
        [
          "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
          "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81",
        ],
        [
          "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
          "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58",
        ],
        [
          "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
          "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77",
        ],
        [
          "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
          "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a",
        ],
        [
          "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
          "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c",
        ],
        [
          "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
          "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67",
        ],
        [
          "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
          "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402",
        ],
        [
          "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
          "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55",
        ],
        [
          "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
          "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482",
        ],
        [
          "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
          "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82",
        ],
        [
          "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
          "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396",
        ],
        [
          "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
          "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49",
        ],
        [
          "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
          "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf",
        ],
        [
          "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
          "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a",
        ],
        [
          "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
          "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7",
        ],
        [
          "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
          "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933",
        ],
        [
          "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
          "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a",
        ],
        [
          "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
          "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6",
        ],
        [
          "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
          "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37",
        ],
        [
          "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
          "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e",
        ],
        [
          "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
          "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6",
        ],
        [
          "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
          "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476",
        ],
        [
          "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
          "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40",
        ],
        [
          "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
          "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61",
        ],
        [
          "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
          "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683",
        ],
        [
          "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
          "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5",
        ],
        [
          "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
          "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b",
        ],
        [
          "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
          "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417",
        ],
        [
          "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
          "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868",
        ],
        [
          "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
          "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a",
        ],
        [
          "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
          "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6",
        ],
        [
          "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
          "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996",
        ],
        [
          "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
          "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e",
        ],
        [
          "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
          "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d",
        ],
        [
          "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
          "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2",
        ],
        [
          "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
          "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e",
        ],
        [
          "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
          "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437",
        ],
        [
          "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
          "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311",
        ],
        [
          "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
          "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4",
        ],
        [
          "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
          "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575",
        ],
        [
          "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
          "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d",
        ],
        [
          "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
          "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d",
        ],
        [
          "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
          "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629",
        ],
        [
          "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
          "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06",
        ],
        [
          "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
          "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374",
        ],
        [
          "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
          "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee",
        ],
        [
          "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
          "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1",
        ],
        [
          "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
          "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b",
        ],
        [
          "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
          "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661",
        ],
        [
          "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
          "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6",
        ],
        [
          "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
          "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e",
        ],
        [
          "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
          "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d",
        ],
        [
          "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
          "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc",
        ],
        [
          "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
          "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4",
        ],
        [
          "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
          "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c",
        ],
        [
          "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
          "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b",
        ],
        [
          "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
          "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913",
        ],
        [
          "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
          "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154",
        ],
        [
          "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
          "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865",
        ],
        [
          "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
          "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc",
        ],
        [
          "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
          "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224",
        ],
        [
          "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
          "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e",
        ],
        [
          "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
          "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6",
        ],
        [
          "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
          "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511",
        ],
        [
          "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
          "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b",
        ],
        [
          "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
          "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2",
        ],
        [
          "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
          "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c",
        ],
        [
          "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
          "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3",
        ],
        [
          "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
          "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d",
        ],
        [
          "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
          "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700",
        ],
        [
          "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
          "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4",
        ],
        [
          "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
          "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196",
        ],
        [
          "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
          "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4",
        ],
        [
          "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
          "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257",
        ],
        [
          "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
          "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13",
        ],
        [
          "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
          "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096",
        ],
        [
          "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
          "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38",
        ],
        [
          "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
          "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f",
        ],
        [
          "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
          "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448",
        ],
        [
          "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
          "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a",
        ],
        [
          "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
          "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4",
        ],
        [
          "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
          "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437",
        ],
        [
          "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
          "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7",
        ],
        [
          "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
          "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d",
        ],
        [
          "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
          "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a",
        ],
        [
          "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
          "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54",
        ],
        [
          "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
          "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77",
        ],
        [
          "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
          "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517",
        ],
        [
          "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
          "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10",
        ],
        [
          "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
          "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125",
        ],
        [
          "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
          "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e",
        ],
        [
          "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
          "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1",
        ],
        [
          "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
          "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2",
        ],
        [
          "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
          "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423",
        ],
        [
          "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
          "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8",
        ],
        [
          "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
          "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758",
        ],
        [
          "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
          "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375",
        ],
        [
          "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
          "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d",
        ],
        [
          "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
          "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec",
        ],
        [
          "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
          "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0",
        ],
        [
          "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
          "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c",
        ],
        [
          "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
          "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4",
        ],
        [
          "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
          "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f",
        ],
        [
          "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
          "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649",
        ],
        [
          "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
          "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826",
        ],
        [
          "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
          "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5",
        ],
        [
          "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
          "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87",
        ],
        [
          "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
          "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b",
        ],
        [
          "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
          "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc",
        ],
        [
          "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
          "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c",
        ],
        [
          "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
          "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f",
        ],
        [
          "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
          "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a",
        ],
        [
          "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
          "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46",
        ],
        [
          "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
          "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f",
        ],
        [
          "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
          "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03",
        ],
        [
          "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
          "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08",
        ],
        [
          "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
          "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8",
        ],
        [
          "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
          "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373",
        ],
        [
          "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
          "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3",
        ],
        [
          "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
          "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8",
        ],
        [
          "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
          "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1",
        ],
        [
          "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
          "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9",
        ],
      ],
    },
  };
});
var zs = _((Sd) => {
  "use strict";
  var xa = Sd,
    Zr = Ws(),
    Sa = la(),
    Av = Lt(),
    wd = Av.assert;
  function _d(e) {
    (e.type === "short"
      ? (this.curve = new Sa.short(e))
      : e.type === "edwards"
        ? (this.curve = new Sa.edwards(e))
        : (this.curve = new Sa.mont(e)),
      (this.g = this.curve.g),
      (this.n = this.curve.n),
      (this.hash = e.hash),
      wd(this.g.validate(), "Invalid curve"),
      wd(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O"));
  }
  xa.PresetCurve = _d;
  function Qr(e, t) {
    Object.defineProperty(xa, e, {
      configurable: !0,
      enumerable: !0,
      get: function () {
        var r = new _d(t);
        return (
          Object.defineProperty(xa, e, {
            configurable: !0,
            enumerable: !0,
            value: r,
          }),
          r
        );
      },
    });
  }
  Qr("p192", {
    type: "short",
    prime: "p192",
    p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
    b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
    n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
    hash: Zr.sha256,
    gRed: !1,
    g: [
      "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
      "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811",
    ],
  });
  Qr("p224", {
    type: "short",
    prime: "p224",
    p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
    b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
    n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
    hash: Zr.sha256,
    gRed: !1,
    g: [
      "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
      "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34",
    ],
  });
  Qr("p256", {
    type: "short",
    prime: null,
    p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
    a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
    b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
    n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
    hash: Zr.sha256,
    gRed: !1,
    g: [
      "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
      "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5",
    ],
  });
  Qr("p384", {
    type: "short",
    prime: null,
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
    a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
    b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
    n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
    hash: Zr.sha384,
    gRed: !1,
    g: [
      "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
      "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f",
    ],
  });
  Qr("p521", {
    type: "short",
    prime: null,
    p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
    a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
    b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
    n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
    hash: Zr.sha512,
    gRed: !1,
    g: [
      "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
      "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650",
    ],
  });
  Qr("curve25519", {
    type: "mont",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "76d06",
    b: "1",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: Zr.sha256,
    gRed: !1,
    g: ["9"],
  });
  Qr("ed25519", {
    type: "edwards",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "-1",
    c: "1",
    d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: Zr.sha256,
    gRed: !1,
    g: [
      "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
      "6666666666666666666666666666666666666666666666666666666666666658",
    ],
  });
  var Ea;
  try {
    Ea = md();
  } catch {
    Ea = void 0;
  }
  Qr("secp256k1", {
    type: "short",
    prime: "k256",
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
    a: "0",
    b: "7",
    n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
    h: "1",
    hash: Zr.sha256,
    beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
    lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
    basis: [
      {
        a: "3086d221a7d46bcde86c90e49284eb15",
        b: "-e4437ed6010e88286f547fa90abfe4c3",
      },
      {
        a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
        b: "3086d221a7d46bcde86c90e49284eb15",
      },
    ],
    gRed: !1,
    g: [
      "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
      "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      Ea,
    ],
  });
});
var Ad = _((fP, Ed) => {
  "use strict";
  var Iv = Ws(),
    En = ia(),
    xd = Xr();
  function en(e) {
    if (!(this instanceof en)) return new en(e);
    ((this.hash = e.hash),
      (this.predResist = !!e.predResist),
      (this.outLen = this.hash.outSize),
      (this.minEntropy = e.minEntropy || this.hash.hmacStrength),
      (this._reseed = null),
      (this.reseedInterval = null),
      (this.K = null),
      (this.V = null));
    var t = En.toArray(e.entropy, e.entropyEnc || "hex"),
      r = En.toArray(e.nonce, e.nonceEnc || "hex"),
      n = En.toArray(e.pers, e.persEnc || "hex");
    (xd(
      t.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits",
    ),
      this._init(t, r, n));
  }
  Ed.exports = en;
  en.prototype._init = function (t, r, n) {
    var i = t.concat(r).concat(n);
    ((this.K = new Array(this.outLen / 8)),
      (this.V = new Array(this.outLen / 8)));
    for (var s = 0; s < this.V.length; s++) ((this.K[s] = 0), (this.V[s] = 1));
    (this._update(i),
      (this._reseed = 1),
      (this.reseedInterval = 281474976710656));
  };
  en.prototype._hmac = function () {
    return new Iv.hmac(this.hash, this.K);
  };
  en.prototype._update = function (t) {
    var r = this._hmac().update(this.V).update([0]);
    (t && (r = r.update(t)),
      (this.K = r.digest()),
      (this.V = this._hmac().update(this.V).digest()),
      t &&
        ((this.K = this._hmac().update(this.V).update([1]).update(t).digest()),
        (this.V = this._hmac().update(this.V).digest())));
  };
  en.prototype.reseed = function (t, r, n, i) {
    (typeof r != "string" && ((i = n), (n = r), (r = null)),
      (t = En.toArray(t, r)),
      (n = En.toArray(n, i)),
      xd(
        t.length >= this.minEntropy / 8,
        "Not enough entropy. Minimum is: " + this.minEntropy + " bits",
      ),
      this._update(t.concat(n || [])),
      (this._reseed = 1));
  };
  en.prototype.generate = function (t, r, n, i) {
    if (this._reseed > this.reseedInterval)
      throw new Error("Reseed is required");
    (typeof r != "string" && ((i = n), (n = r), (r = null)),
      n && ((n = En.toArray(n, i || "hex")), this._update(n)));
    for (var s = []; s.length < t; )
      ((this.V = this._hmac().update(this.V).digest()), (s = s.concat(this.V)));
    var o = s.slice(0, t);
    return (this._update(n), this._reseed++, En.encode(o, r));
  };
});
var Td = _((aP, Id) => {
  "use strict";
  var Tv = Zt(),
    Pv = Lt(),
    Aa = Pv.assert;
  function wt(e, t) {
    ((this.ec = e),
      (this.priv = null),
      (this.pub = null),
      t.priv && this._importPrivate(t.priv, t.privEnc),
      t.pub && this._importPublic(t.pub, t.pubEnc));
  }
  Id.exports = wt;
  wt.fromPublic = function (t, r, n) {
    return r instanceof wt ? r : new wt(t, { pub: r, pubEnc: n });
  };
  wt.fromPrivate = function (t, r, n) {
    return r instanceof wt ? r : new wt(t, { priv: r, privEnc: n });
  };
  wt.prototype.validate = function () {
    var t = this.getPublic();
    return t.isInfinity()
      ? { result: !1, reason: "Invalid public key" }
      : t.validate()
        ? t.mul(this.ec.curve.n).isInfinity()
          ? { result: !0, reason: null }
          : { result: !1, reason: "Public key * N != O" }
        : { result: !1, reason: "Public key is not a point" };
  };
  wt.prototype.getPublic = function (t, r) {
    return (
      typeof t == "string" && ((r = t), (t = null)),
      this.pub || (this.pub = this.ec.g.mul(this.priv)),
      r ? this.pub.encode(r, t) : this.pub
    );
  };
  wt.prototype.getPrivate = function (t) {
    return t === "hex" ? this.priv.toString(16, 2) : this.priv;
  };
  wt.prototype._importPrivate = function (t, r) {
    ((this.priv = new Tv(t, r || 16)),
      (this.priv = this.priv.umod(this.ec.curve.n)));
  };
  wt.prototype._importPublic = function (t, r) {
    if (t.x || t.y) {
      (this.ec.curve.type === "mont"
        ? Aa(t.x, "Need x coordinate")
        : (this.ec.curve.type === "short" ||
            this.ec.curve.type === "edwards") &&
          Aa(t.x && t.y, "Need both x and y coordinate"),
        (this.pub = this.ec.curve.point(t.x, t.y)));
      return;
    }
    this.pub = this.ec.curve.decodePoint(t, r);
  };
  wt.prototype.derive = function (t) {
    return (
      t.validate() || Aa(t.validate(), "public point not validated"),
      t.mul(this.priv).getX()
    );
  };
  wt.prototype.sign = function (t, r, n) {
    return this.ec.sign(t, this, r, n);
  };
  wt.prototype.verify = function (t, r, n) {
    return this.ec.verify(t, r, this, void 0, n);
  };
  wt.prototype.inspect = function () {
    return (
      "<Key priv: " +
      (this.priv && this.priv.toString(16, 2)) +
      " pub: " +
      (this.pub && this.pub.inspect()) +
      " >"
    );
  };
});
var Od = _((cP, Md) => {
  "use strict";
  var Gs = Zt(),
    Pa = Lt(),
    Mv = Pa.assert;
  function Xs(e, t) {
    if (e instanceof Xs) return e;
    this._importDER(e, t) ||
      (Mv(e.r && e.s, "Signature without r or s"),
      (this.r = new Gs(e.r, 16)),
      (this.s = new Gs(e.s, 16)),
      e.recoveryParam === void 0
        ? (this.recoveryParam = null)
        : (this.recoveryParam = e.recoveryParam));
  }
  Md.exports = Xs;
  function Ov() {
    this.place = 0;
  }
  function Ia(e, t) {
    var r = e[t.place++];
    if (!(r & 128)) return r;
    var n = r & 15;
    if (n === 0 || n > 4 || e[t.place] === 0) return !1;
    for (var i = 0, s = 0, o = t.place; s < n; s++, o++)
      ((i <<= 8), (i |= e[o]), (i >>>= 0));
    return i <= 127 ? !1 : ((t.place = o), i);
  }
  function Pd(e) {
    for (var t = 0, r = e.length - 1; !e[t] && !(e[t + 1] & 128) && t < r; )
      t++;
    return t === 0 ? e : e.slice(t);
  }
  Xs.prototype._importDER = function (t, r) {
    t = Pa.toArray(t, r);
    var n = new Ov();
    if (t[n.place++] !== 48) return !1;
    var i = Ia(t, n);
    if (i === !1 || i + n.place !== t.length || t[n.place++] !== 2) return !1;
    var s = Ia(t, n);
    if (s === !1 || (t[n.place] & 128) !== 0) return !1;
    var o = t.slice(n.place, s + n.place);
    if (((n.place += s), t[n.place++] !== 2)) return !1;
    var f = Ia(t, n);
    if (f === !1 || t.length !== f + n.place || (t[n.place] & 128) !== 0)
      return !1;
    var u = t.slice(n.place, f + n.place);
    if (o[0] === 0)
      if (o[1] & 128) o = o.slice(1);
      else return !1;
    if (u[0] === 0)
      if (u[1] & 128) u = u.slice(1);
      else return !1;
    return (
      (this.r = new Gs(o)),
      (this.s = new Gs(u)),
      (this.recoveryParam = null),
      !0
    );
  };
  function Ta(e, t) {
    if (t < 128) {
      e.push(t);
      return;
    }
    var r = 1 + ((Math.log(t) / Math.LN2) >>> 3);
    for (e.push(r | 128); --r; ) e.push((t >>> (r << 3)) & 255);
    e.push(t);
  }
  Xs.prototype.toDER = function (t) {
    var r = this.r.toArray(),
      n = this.s.toArray();
    for (
      r[0] & 128 && (r = [0].concat(r)),
        n[0] & 128 && (n = [0].concat(n)),
        r = Pd(r),
        n = Pd(n);
      !n[0] && !(n[1] & 128);

    )
      n = n.slice(1);
    var i = [2];
    (Ta(i, r.length), (i = i.concat(r)), i.push(2), Ta(i, n.length));
    var s = i.concat(n),
      o = [48];
    return (Ta(o, s.length), (o = o.concat(s)), Pa.encode(o, t));
  };
});
var qd = _((uP, Bd) => {
  "use strict";
  var nr = Zt(),
    kd = Ad(),
    kv = Lt(),
    Ma = zs(),
    Bv = aa(),
    An = kv.assert,
    Oa = Td(),
    Ys = Od();
  function Wt(e) {
    if (!(this instanceof Wt)) return new Wt(e);
    (typeof e == "string" &&
      (An(Object.prototype.hasOwnProperty.call(Ma, e), "Unknown curve " + e),
      (e = Ma[e])),
      e instanceof Ma.PresetCurve && (e = { curve: e }),
      (this.curve = e.curve.curve),
      (this.n = this.curve.n),
      (this.nh = this.n.ushrn(1)),
      (this.g = this.curve.g),
      (this.g = e.curve.g),
      this.g.precompute(e.curve.n.bitLength() + 1),
      (this.hash = e.hash || e.curve.hash));
  }
  Bd.exports = Wt;
  Wt.prototype.keyPair = function (t) {
    return new Oa(this, t);
  };
  Wt.prototype.keyFromPrivate = function (t, r) {
    return Oa.fromPrivate(this, t, r);
  };
  Wt.prototype.keyFromPublic = function (t, r) {
    return Oa.fromPublic(this, t, r);
  };
  Wt.prototype.genKeyPair = function (t) {
    t || (t = {});
    for (
      var r = new kd({
          hash: this.hash,
          pers: t.pers,
          persEnc: t.persEnc || "utf8",
          entropy: t.entropy || Bv(this.hash.hmacStrength),
          entropyEnc: (t.entropy && t.entropyEnc) || "utf8",
          nonce: this.n.toArray(),
        }),
        n = this.n.byteLength(),
        i = this.n.sub(new nr(2));
      ;

    ) {
      var s = new nr(r.generate(n));
      if (!(s.cmp(i) > 0)) return (s.iaddn(1), this.keyFromPrivate(s));
    }
  };
  Wt.prototype._truncateToN = function (t, r, n) {
    var i;
    if (nr.isBN(t) || typeof t == "number")
      ((t = new nr(t, 16)), (i = t.byteLength()));
    else if (typeof t == "object") ((i = t.length), (t = new nr(t, 16)));
    else {
      var s = t.toString();
      ((i = (s.length + 1) >>> 1), (t = new nr(s, 16)));
    }
    typeof n != "number" && (n = i * 8);
    var o = n - this.n.bitLength();
    return (
      o > 0 && (t = t.ushrn(o)),
      !r && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
    );
  };
  Wt.prototype.sign = function (t, r, n, i) {
    if (
      (typeof n == "object" && ((i = n), (n = null)),
      i || (i = {}),
      typeof t != "string" && typeof t != "number" && !nr.isBN(t))
    ) {
      (An(
        typeof t == "object" && t && typeof t.length == "number",
        "Expected message to be an array-like, a hex string, or a BN instance",
      ),
        An(t.length >>> 0 === t.length));
      for (var s = 0; s < t.length; s++) An((t[s] & 255) === t[s]);
    }
    ((r = this.keyFromPrivate(r, n)),
      (t = this._truncateToN(t, !1, i.msgBitLength)),
      An(!t.isNeg(), "Can not sign a negative message"));
    var o = this.n.byteLength(),
      f = r.getPrivate().toArray("be", o),
      u = t.toArray("be", o);
    An(new nr(u).eq(t), "Can not sign message");
    for (
      var l = new kd({
          hash: this.hash,
          entropy: f,
          nonce: u,
          pers: i.pers,
          persEnc: i.persEnc || "utf8",
        }),
        p = this.n.sub(new nr(1)),
        h = 0;
      ;
      h++
    ) {
      var w = i.k ? i.k(h) : new nr(l.generate(this.n.byteLength()));
      if (
        ((w = this._truncateToN(w, !0)), !(w.cmpn(1) <= 0 || w.cmp(p) >= 0))
      ) {
        var E = this.g.mul(w);
        if (!E.isInfinity()) {
          var A = E.getX(),
            T = A.umod(this.n);
          if (T.cmpn(0) !== 0) {
            var O = w.invm(this.n).mul(T.mul(r.getPrivate()).iadd(t));
            if (((O = O.umod(this.n)), O.cmpn(0) !== 0)) {
              var k = (E.getY().isOdd() ? 1 : 0) | (A.cmp(T) !== 0 ? 2 : 0);
              return (
                i.canonical &&
                  O.cmp(this.nh) > 0 &&
                  ((O = this.n.sub(O)), (k ^= 1)),
                new Ys({ r: T, s: O, recoveryParam: k })
              );
            }
          }
        }
      }
    }
  };
  Wt.prototype.verify = function (t, r, n, i, s) {
    (s || (s = {}),
      (t = this._truncateToN(t, !1, s.msgBitLength)),
      (n = this.keyFromPublic(n, i)),
      (r = new Ys(r, "hex")));
    var o = r.r,
      f = r.s;
    if (
      o.cmpn(1) < 0 ||
      o.cmp(this.n) >= 0 ||
      f.cmpn(1) < 0 ||
      f.cmp(this.n) >= 0
    )
      return !1;
    var u = f.invm(this.n),
      l = u.mul(t).umod(this.n),
      p = u.mul(o).umod(this.n),
      h;
    return this.curve._maxwellTrick
      ? ((h = this.g.jmulAdd(l, n.getPublic(), p)),
        h.isInfinity() ? !1 : h.eqXToP(o))
      : ((h = this.g.mulAdd(l, n.getPublic(), p)),
        h.isInfinity() ? !1 : h.getX().umod(this.n).cmp(o) === 0);
  };
  Wt.prototype.recoverPubKey = function (e, t, r, n) {
    (An((3 & r) === r, "The recovery param is more than two bits"),
      (t = new Ys(t, n)));
    var i = this.n,
      s = new nr(e),
      o = t.r,
      f = t.s,
      u = r & 1,
      l = r >> 1;
    if (o.cmp(this.curve.p.umod(this.curve.n)) >= 0 && l)
      throw new Error("Unable to find sencond key candinate");
    l
      ? (o = this.curve.pointFromX(o.add(this.curve.n), u))
      : (o = this.curve.pointFromX(o, u));
    var p = t.r.invm(i),
      h = i.sub(s).mul(p).umod(i),
      w = f.mul(p).umod(i);
    return this.g.mulAdd(h, o, w);
  };
  Wt.prototype.getKeyRecoveryParam = function (e, t, r, n) {
    if (((t = new Ys(t, n)), t.recoveryParam !== null)) return t.recoveryParam;
    for (var i = 0; i < 4; i++) {
      var s;
      try {
        s = this.recoverPubKey(e, t, i);
      } catch {
        continue;
      }
      if (s.eq(r)) return i;
    }
    throw new Error("Unable to find valid recovery factor");
  };
});
var Cd = _((dP, Rd) => {
  "use strict";
  var Qi = Lt(),
    Nd = Qi.assert,
    Hd = Qi.parseBytes,
    di = Qi.cachedProperty;
  function ut(e, t) {
    ((this.eddsa = e),
      (this._secret = Hd(t.secret)),
      e.isPoint(t.pub) ? (this._pub = t.pub) : (this._pubBytes = Hd(t.pub)));
  }
  ut.fromPublic = function (t, r) {
    return r instanceof ut ? r : new ut(t, { pub: r });
  };
  ut.fromSecret = function (t, r) {
    return r instanceof ut ? r : new ut(t, { secret: r });
  };
  ut.prototype.secret = function () {
    return this._secret;
  };
  di(ut, "pubBytes", function () {
    return this.eddsa.encodePoint(this.pub());
  });
  di(ut, "pub", function () {
    return this._pubBytes
      ? this.eddsa.decodePoint(this._pubBytes)
      : this.eddsa.g.mul(this.priv());
  });
  di(ut, "privBytes", function () {
    var t = this.eddsa,
      r = this.hash(),
      n = t.encodingLength - 1,
      i = r.slice(0, t.encodingLength);
    return ((i[0] &= 248), (i[n] &= 127), (i[n] |= 64), i);
  });
  di(ut, "priv", function () {
    return this.eddsa.decodeInt(this.privBytes());
  });
  di(ut, "hash", function () {
    return this.eddsa.hash().update(this.secret()).digest();
  });
  di(ut, "messagePrefix", function () {
    return this.hash().slice(this.eddsa.encodingLength);
  });
  ut.prototype.sign = function (t) {
    return (
      Nd(this._secret, "KeyPair can only verify"),
      this.eddsa.sign(t, this)
    );
  };
  ut.prototype.verify = function (t, r) {
    return this.eddsa.verify(t, r, this);
  };
  ut.prototype.getSecret = function (t) {
    return (
      Nd(this._secret, "KeyPair is public only"),
      Qi.encode(this.secret(), t)
    );
  };
  ut.prototype.getPublic = function (t) {
    return Qi.encode(this.pubBytes(), t);
  };
  Rd.exports = ut;
});
var Fd = _((hP, Ld) => {
  "use strict";
  var qv = Zt(),
    $s = Lt(),
    Ud = $s.assert,
    Js = $s.cachedProperty,
    Hv = $s.parseBytes;
  function In(e, t) {
    ((this.eddsa = e),
      typeof t != "object" && (t = Hv(t)),
      Array.isArray(t) &&
        (Ud(t.length === e.encodingLength * 2, "Signature has invalid size"),
        (t = {
          R: t.slice(0, e.encodingLength),
          S: t.slice(e.encodingLength),
        })),
      Ud(t.R && t.S, "Signature without R or S"),
      e.isPoint(t.R) && (this._R = t.R),
      t.S instanceof qv && (this._S = t.S),
      (this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded),
      (this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded));
  }
  Js(In, "S", function () {
    return this.eddsa.decodeInt(this.Sencoded());
  });
  Js(In, "R", function () {
    return this.eddsa.decodePoint(this.Rencoded());
  });
  Js(In, "Rencoded", function () {
    return this.eddsa.encodePoint(this.R());
  });
  Js(In, "Sencoded", function () {
    return this.eddsa.encodeInt(this.S());
  });
  In.prototype.toBytes = function () {
    return this.Rencoded().concat(this.Sencoded());
  };
  In.prototype.toHex = function () {
    return $s.encode(this.toBytes(), "hex").toUpperCase();
  };
  Ld.exports = In;
});
var Wd = _((lP, Vd) => {
  "use strict";
  var Nv = Ws(),
    Rv = zs(),
    hi = Lt(),
    Cv = hi.assert,
    jd = hi.parseBytes,
    Dd = Cd(),
    Kd = Fd();
  function Ht(e) {
    if (
      (Cv(e === "ed25519", "only tested with ed25519 so far"),
      !(this instanceof Ht))
    )
      return new Ht(e);
    ((e = Rv[e].curve),
      (this.curve = e),
      (this.g = e.g),
      this.g.precompute(e.n.bitLength() + 1),
      (this.pointClass = e.point().constructor),
      (this.encodingLength = Math.ceil(e.n.bitLength() / 8)),
      (this.hash = Nv.sha512));
  }
  Vd.exports = Ht;
  Ht.prototype.sign = function (t, r) {
    t = jd(t);
    var n = this.keyFromSecret(r),
      i = this.hashInt(n.messagePrefix(), t),
      s = this.g.mul(i),
      o = this.encodePoint(s),
      f = this.hashInt(o, n.pubBytes(), t).mul(n.priv()),
      u = i.add(f).umod(this.curve.n);
    return this.makeSignature({ R: s, S: u, Rencoded: o });
  };
  Ht.prototype.verify = function (t, r, n) {
    if (
      ((t = jd(t)),
      (r = this.makeSignature(r)),
      r.S().gte(r.eddsa.curve.n) || r.S().isNeg())
    )
      return !1;
    var i = this.keyFromPublic(n),
      s = this.hashInt(r.Rencoded(), i.pubBytes(), t),
      o = this.g.mul(r.S()),
      f = r.R().add(i.pub().mul(s));
    return f.eq(o);
  };
  Ht.prototype.hashInt = function () {
    for (var t = this.hash(), r = 0; r < arguments.length; r++)
      t.update(arguments[r]);
    return hi.intFromLE(t.digest()).umod(this.curve.n);
  };
  Ht.prototype.keyFromPublic = function (t) {
    return Dd.fromPublic(this, t);
  };
  Ht.prototype.keyFromSecret = function (t) {
    return Dd.fromSecret(this, t);
  };
  Ht.prototype.makeSignature = function (t) {
    return t instanceof Kd ? t : new Kd(this, t);
  };
  Ht.prototype.encodePoint = function (t) {
    var r = t.getY().toArray("le", this.encodingLength);
    return ((r[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0), r);
  };
  Ht.prototype.decodePoint = function (t) {
    t = hi.parseBytes(t);
    var r = t.length - 1,
      n = t.slice(0, r).concat(t[r] & -129),
      i = (t[r] & 128) !== 0,
      s = hi.intFromLE(n);
    return this.curve.pointFromY(s, i);
  };
  Ht.prototype.encodeInt = function (t) {
    return t.toArray("le", this.encodingLength);
  };
  Ht.prototype.decodeInt = function (t) {
    return hi.intFromLE(t);
  };
  Ht.prototype.isPoint = function (t) {
    return t instanceof this.pointClass;
  };
});
var Gd = _((zd) => {
  "use strict";
  var Tn = zd;
  Tn.version = w0().version;
  Tn.utils = Lt();
  Tn.rand = aa();
  Tn.curve = la();
  Tn.curves = zs();
  Tn.ec = qd();
  Tn.eddsa = Wd();
});
var Yd = _((bP, Xd) => {
  var Uv = Gd().ec,
    br = new Uv("secp256k1"),
    X = br.curve,
    ie = X.n.constructor;
  function Lv(e, t) {
    let r = new ie(t);
    if (r.cmp(X.p) >= 0) return null;
    r = r.toRed(X.red);
    let n = r.redSqr().redIMul(r).redIAdd(X.b).redSqrt();
    (e === 3) !== n.isOdd() && (n = n.redNeg());
    let i = r.redSqr().redIMul(r);
    return n.redSqr().redISub(i.redIAdd(X.b)).isZero()
      ? br.keyPair({ pub: { x: r, y: n } })
      : null;
  }
  function Fv(e, t, r) {
    let n = new ie(t),
      i = new ie(r);
    if (
      n.cmp(X.p) >= 0 ||
      i.cmp(X.p) >= 0 ||
      ((n = n.toRed(X.red)),
      (i = i.toRed(X.red)),
      (e === 6 || e === 7) && i.isOdd() !== (e === 7))
    )
      return null;
    let s = n.redSqr().redIMul(n);
    return i.redSqr().redISub(s.redIAdd(X.b)).isZero()
      ? br.keyPair({ pub: { x: n, y: i } })
      : null;
  }
  function tn(e) {
    let t = e[0];
    switch (t) {
      case 2:
      case 3:
        return e.length !== 33 ? null : Lv(t, e.subarray(1, 33));
      case 4:
      case 6:
      case 7:
        return e.length !== 65
          ? null
          : Fv(t, e.subarray(1, 33), e.subarray(33, 65));
      default:
        return null;
    }
  }
  function Pn(e, t) {
    let r = t.encode(null, e.length === 33);
    for (let n = 0; n < e.length; ++n) e[n] = r[n];
  }
  Xd.exports = {
    contextRandomize() {
      return 0;
    },
    privateKeyVerify(e) {
      let t = new ie(e);
      return t.cmp(X.n) < 0 && !t.isZero() ? 0 : 1;
    },
    privateKeyNegate(e) {
      let t = new ie(e),
        r = X.n.sub(t).umod(X.n).toArrayLike(Uint8Array, "be", 32);
      return (e.set(r), 0);
    },
    privateKeyTweakAdd(e, t) {
      let r = new ie(t);
      if (
        r.cmp(X.n) >= 0 ||
        (r.iadd(new ie(e)), r.cmp(X.n) >= 0 && r.isub(X.n), r.isZero())
      )
        return 1;
      let n = r.toArrayLike(Uint8Array, "be", 32);
      return (e.set(n), 0);
    },
    privateKeyTweakMul(e, t) {
      let r = new ie(t);
      if (r.cmp(X.n) >= 0 || r.isZero()) return 1;
      (r.imul(new ie(e)), r.cmp(X.n) >= 0 && (r = r.umod(X.n)));
      let n = r.toArrayLike(Uint8Array, "be", 32);
      return (e.set(n), 0);
    },
    publicKeyVerify(e) {
      return tn(e) === null ? 1 : 0;
    },
    publicKeyCreate(e, t) {
      let r = new ie(t);
      if (r.cmp(X.n) >= 0 || r.isZero()) return 1;
      let n = br.keyFromPrivate(t).getPublic();
      return (Pn(e, n), 0);
    },
    publicKeyConvert(e, t) {
      let r = tn(t);
      if (r === null) return 1;
      let n = r.getPublic();
      return (Pn(e, n), 0);
    },
    publicKeyNegate(e, t) {
      let r = tn(t);
      if (r === null) return 1;
      let n = r.getPublic();
      return ((n.y = n.y.redNeg()), Pn(e, n), 0);
    },
    publicKeyCombine(e, t) {
      let r = new Array(t.length);
      for (let i = 0; i < t.length; ++i)
        if (((r[i] = tn(t[i])), r[i] === null)) return 1;
      let n = r[0].getPublic();
      for (let i = 1; i < r.length; ++i) n = n.add(r[i].pub);
      return n.isInfinity() ? 2 : (Pn(e, n), 0);
    },
    publicKeyTweakAdd(e, t, r) {
      let n = tn(t);
      if (n === null) return 1;
      if (((r = new ie(r)), r.cmp(X.n) >= 0)) return 2;
      let i = n.getPublic().add(X.g.mul(r));
      return i.isInfinity() ? 2 : (Pn(e, i), 0);
    },
    publicKeyTweakMul(e, t, r) {
      let n = tn(t);
      if (n === null) return 1;
      if (((r = new ie(r)), r.cmp(X.n) >= 0 || r.isZero())) return 2;
      let i = n.getPublic().mul(r);
      return (Pn(e, i), 0);
    },
    signatureNormalize(e) {
      let t = new ie(e.subarray(0, 32)),
        r = new ie(e.subarray(32, 64));
      return t.cmp(X.n) >= 0 || r.cmp(X.n) >= 0
        ? 1
        : (r.cmp(br.nh) === 1 &&
            e.set(X.n.sub(r).toArrayLike(Uint8Array, "be", 32), 32),
          0);
    },
    signatureExport(e, t) {
      let r = t.subarray(0, 32),
        n = t.subarray(32, 64);
      if (new ie(r).cmp(X.n) >= 0 || new ie(n).cmp(X.n) >= 0) return 1;
      let { output: i } = e,
        s = i.subarray(4, 37);
      ((s[0] = 0), s.set(r, 1));
      let o = 33,
        f = 0;
      for (; o > 1 && s[f] === 0 && !(s[f + 1] & 128); --o, ++f);
      if (
        ((s = s.subarray(f)),
        s[0] & 128 || (o > 1 && s[0] === 0 && !(s[1] & 128)))
      )
        return 1;
      let u = i.subarray(39, 72);
      ((u[0] = 0), u.set(n, 1));
      let l = 33,
        p = 0;
      for (; l > 1 && u[p] === 0 && !(u[p + 1] & 128); --l, ++p);
      return (
        (u = u.subarray(p)),
        u[0] & 128 || (l > 1 && u[0] === 0 && !(u[1] & 128))
          ? 1
          : ((e.outputlen = 6 + o + l),
            (i[0] = 48),
            (i[1] = e.outputlen - 2),
            (i[2] = 2),
            (i[3] = s.length),
            i.set(s, 4),
            (i[4 + o] = 2),
            (i[5 + o] = u.length),
            i.set(u, 6 + o),
            0)
      );
    },
    signatureImport(e, t) {
      if (
        t.length < 8 ||
        t.length > 72 ||
        t[0] !== 48 ||
        t[1] !== t.length - 2 ||
        t[2] !== 2
      )
        return 1;
      let r = t[3];
      if (r === 0 || 5 + r >= t.length || t[4 + r] !== 2) return 1;
      let n = t[5 + r];
      if (
        n === 0 ||
        6 + r + n !== t.length ||
        t[4] & 128 ||
        (r > 1 && t[4] === 0 && !(t[5] & 128)) ||
        t[r + 6] & 128 ||
        (n > 1 && t[r + 6] === 0 && !(t[r + 7] & 128))
      )
        return 1;
      let i = t.subarray(4, 4 + r);
      if ((i.length === 33 && i[0] === 0 && (i = i.subarray(1)), i.length > 32))
        return 1;
      let s = t.subarray(6 + r);
      if ((s.length === 33 && s[0] === 0 && (s = s.slice(1)), s.length > 32))
        throw new Error("S length is too long");
      let o = new ie(i);
      o.cmp(X.n) >= 0 && (o = new ie(0));
      let f = new ie(t.subarray(6 + r));
      return (
        f.cmp(X.n) >= 0 && (f = new ie(0)),
        e.set(o.toArrayLike(Uint8Array, "be", 32), 0),
        e.set(f.toArrayLike(Uint8Array, "be", 32), 32),
        0
      );
    },
    ecdsaSign(e, t, r, n, i) {
      if (i) {
        let f = i;
        i = (u) => {
          let l = f(t, r, null, n, u);
          if (!(l instanceof Uint8Array && l.length === 32))
            throw new Error("This is the way");
          return new ie(l);
        };
      }
      let s = new ie(r);
      if (s.cmp(X.n) >= 0 || s.isZero()) return 1;
      let o;
      try {
        o = br.sign(t, r, { canonical: !0, k: i, pers: n });
      } catch {
        return 1;
      }
      return (
        e.signature.set(o.r.toArrayLike(Uint8Array, "be", 32), 0),
        e.signature.set(o.s.toArrayLike(Uint8Array, "be", 32), 32),
        (e.recid = o.recoveryParam),
        0
      );
    },
    ecdsaVerify(e, t, r) {
      let n = { r: e.subarray(0, 32), s: e.subarray(32, 64) },
        i = new ie(n.r),
        s = new ie(n.s);
      if (i.cmp(X.n) >= 0 || s.cmp(X.n) >= 0) return 1;
      if (s.cmp(br.nh) === 1 || i.isZero() || s.isZero()) return 3;
      let o = tn(r);
      if (o === null) return 2;
      let f = o.getPublic();
      return br.verify(t, n, f) ? 0 : 3;
    },
    ecdsaRecover(e, t, r, n) {
      let i = { r: t.slice(0, 32), s: t.slice(32, 64) },
        s = new ie(i.r),
        o = new ie(i.s);
      if (s.cmp(X.n) >= 0 || o.cmp(X.n) >= 0) return 1;
      if (s.isZero() || o.isZero()) return 2;
      let f;
      try {
        f = br.recoverPubKey(n, i, r);
      } catch {
        return 2;
      }
      return (Pn(e, f), 0);
    },
    ecdh(e, t, r, n, i, s, o) {
      let f = tn(t);
      if (f === null) return 1;
      let u = new ie(r);
      if (u.cmp(X.n) >= 0 || u.isZero()) return 2;
      let l = f.getPublic().mul(u);
      if (i === void 0) {
        let p = l.encode(null, !0),
          h = br.hash().update(p).digest();
        for (let w = 0; w < 32; ++w) e[w] = h[w];
      } else {
        s || (s = new Uint8Array(32));
        let p = l.getX().toArray("be", 32);
        for (let A = 0; A < 32; ++A) s[A] = p[A];
        o || (o = new Uint8Array(32));
        let h = l.getY().toArray("be", 32);
        for (let A = 0; A < 32; ++A) o[A] = h[A];
        let w = i(s, o, n);
        if (!(w instanceof Uint8Array && w.length === e.length)) return 2;
        e.set(w);
      }
      return 0;
    },
  };
});
var Jd = _((yP, $d) => {
  $d.exports = ra()(Yd());
});
var Zd = _((vP, ka) => {
  try {
    ka.exports = m0();
  } catch {
    ka.exports = Jd();
  }
});
var qa = _((Ba, eh) => {
  var Zs = require("buffer"),
    yr = Zs.Buffer;
  function Qd(e, t) {
    for (var r in e) t[r] = e[r];
  }
  yr.from && yr.alloc && yr.allocUnsafe && yr.allocUnsafeSlow
    ? (eh.exports = Zs)
    : (Qd(Zs, Ba), (Ba.Buffer = Mn));
  function Mn(e, t, r) {
    return yr(e, t, r);
  }
  Mn.prototype = Object.create(yr.prototype);
  Qd(yr, Mn);
  Mn.from = function (e, t, r) {
    if (typeof e == "number")
      throw new TypeError("Argument must not be a number");
    return yr(e, t, r);
  };
  Mn.alloc = function (e, t, r) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    var n = yr(e);
    return (
      t !== void 0
        ? typeof r == "string"
          ? n.fill(t, r)
          : n.fill(t)
        : n.fill(0),
      n
    );
  };
  Mn.allocUnsafe = function (e) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    return yr(e);
  };
  Mn.allocUnsafeSlow = function (e) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    return Zs.SlowBuffer(e);
  };
});
var zt = _((rn) => {
  "use strict";
  Object.defineProperty(rn, "__esModule", { value: !0 });
  rn.testnet = rn.regtest = rn.bitcoin = void 0;
  rn.bitcoin = {
    messagePrefix: `Bitcoin Signed Message:
`,
    bech32: "bc",
    bip32: { public: 76067358, private: 76066276 },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128,
  };
  rn.regtest = {
    messagePrefix: `Bitcoin Signed Message:
`,
    bech32: "bcrt",
    bip32: { public: 70617039, private: 70615956 },
    pubKeyHash: 111,
    scriptHash: 196,
    wif: 239,
  };
  rn.testnet = {
    messagePrefix: `Bitcoin Signed Message:
`,
    bech32: "tb",
    bip32: { public: 70617039, private: 70615956 },
    pubKeyHash: 111,
    scriptHash: 196,
    wif: 239,
  };
});
var Ha = _((nn) => {
  "use strict";
  Object.defineProperty(nn, "__esModule", { value: !0 });
  nn.encode = nn.decode = nn.check = void 0;
  function Kv(e) {
    if (
      e.length < 8 ||
      e.length > 72 ||
      e[0] !== 48 ||
      e[1] !== e.length - 2 ||
      e[2] !== 2
    )
      return !1;
    let t = e[3];
    if (t === 0 || 5 + t >= e.length || e[4 + t] !== 2) return !1;
    let r = e[5 + t];
    return !(
      r === 0 ||
      6 + t + r !== e.length ||
      e[4] & 128 ||
      (t > 1 && e[4] === 0 && !(e[5] & 128)) ||
      e[t + 6] & 128 ||
      (r > 1 && e[t + 6] === 0 && !(e[t + 7] & 128))
    );
  }
  nn.check = Kv;
  function jv(e) {
    if (e.length < 8) throw new Error("DER sequence length is too short");
    if (e.length > 72) throw new Error("DER sequence length is too long");
    if (e[0] !== 48) throw new Error("Expected DER sequence");
    if (e[1] !== e.length - 2)
      throw new Error("DER sequence length is invalid");
    if (e[2] !== 2) throw new Error("Expected DER integer");
    let t = e[3];
    if (t === 0) throw new Error("R length is zero");
    if (5 + t >= e.length) throw new Error("R length is too long");
    if (e[4 + t] !== 2) throw new Error("Expected DER integer (2)");
    let r = e[5 + t];
    if (r === 0) throw new Error("S length is zero");
    if (6 + t + r !== e.length) throw new Error("S length is invalid");
    if (e[4] & 128) throw new Error("R value is negative");
    if (t > 1 && e[4] === 0 && !(e[5] & 128))
      throw new Error("R value excessively padded");
    if (e[t + 6] & 128) throw new Error("S value is negative");
    if (r > 1 && e[t + 6] === 0 && !(e[t + 7] & 128))
      throw new Error("S value excessively padded");
    return { r: e.slice(4, 4 + t), s: e.slice(6 + t) };
  }
  nn.decode = jv;
  function Dv(e, t) {
    let r = e.length,
      n = t.length;
    if (r === 0) throw new Error("R length is zero");
    if (n === 0) throw new Error("S length is zero");
    if (r > 33) throw new Error("R length is too long");
    if (n > 33) throw new Error("S length is too long");
    if (e[0] & 128) throw new Error("R value is negative");
    if (t[0] & 128) throw new Error("S value is negative");
    if (r > 1 && e[0] === 0 && !(e[1] & 128))
      throw new Error("R value excessively padded");
    if (n > 1 && t[0] === 0 && !(t[1] & 128))
      throw new Error("S value excessively padded");
    let i = Buffer.allocUnsafe(6 + r + n);
    return (
      (i[0] = 48),
      (i[1] = i.length - 2),
      (i[2] = 2),
      (i[3] = e.length),
      e.copy(i, 4),
      (i[4 + r] = 2),
      (i[5 + r] = t.length),
      t.copy(i, 6 + r),
      i
    );
  }
  nn.encode = Dv;
});
var Qs = _((li) => {
  "use strict";
  Object.defineProperty(li, "__esModule", { value: !0 });
  li.REVERSE_OPS = li.OPS = void 0;
  var Na = {
    OP_FALSE: 0,
    OP_0: 0,
    OP_PUSHDATA1: 76,
    OP_PUSHDATA2: 77,
    OP_PUSHDATA4: 78,
    OP_1NEGATE: 79,
    OP_RESERVED: 80,
    OP_TRUE: 81,
    OP_1: 81,
    OP_2: 82,
    OP_3: 83,
    OP_4: 84,
    OP_5: 85,
    OP_6: 86,
    OP_7: 87,
    OP_8: 88,
    OP_9: 89,
    OP_10: 90,
    OP_11: 91,
    OP_12: 92,
    OP_13: 93,
    OP_14: 94,
    OP_15: 95,
    OP_16: 96,
    OP_NOP: 97,
    OP_VER: 98,
    OP_IF: 99,
    OP_NOTIF: 100,
    OP_VERIF: 101,
    OP_VERNOTIF: 102,
    OP_ELSE: 103,
    OP_ENDIF: 104,
    OP_VERIFY: 105,
    OP_RETURN: 106,
    OP_TOALTSTACK: 107,
    OP_FROMALTSTACK: 108,
    OP_2DROP: 109,
    OP_2DUP: 110,
    OP_3DUP: 111,
    OP_2OVER: 112,
    OP_2ROT: 113,
    OP_2SWAP: 114,
    OP_IFDUP: 115,
    OP_DEPTH: 116,
    OP_DROP: 117,
    OP_DUP: 118,
    OP_NIP: 119,
    OP_OVER: 120,
    OP_PICK: 121,
    OP_ROLL: 122,
    OP_ROT: 123,
    OP_SWAP: 124,
    OP_TUCK: 125,
    OP_CAT: 126,
    OP_SUBSTR: 127,
    OP_LEFT: 128,
    OP_RIGHT: 129,
    OP_SIZE: 130,
    OP_INVERT: 131,
    OP_AND: 132,
    OP_OR: 133,
    OP_XOR: 134,
    OP_EQUAL: 135,
    OP_EQUALVERIFY: 136,
    OP_RESERVED1: 137,
    OP_RESERVED2: 138,
    OP_1ADD: 139,
    OP_1SUB: 140,
    OP_2MUL: 141,
    OP_2DIV: 142,
    OP_NEGATE: 143,
    OP_ABS: 144,
    OP_NOT: 145,
    OP_0NOTEQUAL: 146,
    OP_ADD: 147,
    OP_SUB: 148,
    OP_MUL: 149,
    OP_DIV: 150,
    OP_MOD: 151,
    OP_LSHIFT: 152,
    OP_RSHIFT: 153,
    OP_BOOLAND: 154,
    OP_BOOLOR: 155,
    OP_NUMEQUAL: 156,
    OP_NUMEQUALVERIFY: 157,
    OP_NUMNOTEQUAL: 158,
    OP_LESSTHAN: 159,
    OP_GREATERTHAN: 160,
    OP_LESSTHANOREQUAL: 161,
    OP_GREATERTHANOREQUAL: 162,
    OP_MIN: 163,
    OP_MAX: 164,
    OP_WITHIN: 165,
    OP_RIPEMD160: 166,
    OP_SHA1: 167,
    OP_SHA256: 168,
    OP_HASH160: 169,
    OP_HASH256: 170,
    OP_CODESEPARATOR: 171,
    OP_CHECKSIG: 172,
    OP_CHECKSIGVERIFY: 173,
    OP_CHECKMULTISIG: 174,
    OP_CHECKMULTISIGVERIFY: 175,
    OP_NOP1: 176,
    OP_NOP2: 177,
    OP_CHECKLOCKTIMEVERIFY: 177,
    OP_NOP3: 178,
    OP_CHECKSEQUENCEVERIFY: 178,
    OP_NOP4: 179,
    OP_NOP5: 180,
    OP_NOP6: 181,
    OP_NOP7: 182,
    OP_NOP8: 183,
    OP_NOP9: 184,
    OP_NOP10: 185,
    OP_CHECKSIGADD: 186,
    OP_PUBKEYHASH: 253,
    OP_PUBKEY: 254,
    OP_INVALIDOPCODE: 255,
  };
  li.OPS = Na;
  var th = {};
  li.REVERSE_OPS = th;
  for (let e of Object.keys(Na)) {
    let t = Na[e];
    th[t] = e;
  }
});
var nh = _((on) => {
  "use strict";
  Object.defineProperty(on, "__esModule", { value: !0 });
  on.decode = on.encode = on.encodingLength = void 0;
  var sn = Qs();
  function rh(e) {
    return e < sn.OPS.OP_PUSHDATA1 ? 1 : e <= 255 ? 2 : e <= 65535 ? 3 : 5;
  }
  on.encodingLength = rh;
  function Vv(e, t, r) {
    let n = rh(t);
    return (
      n === 1
        ? e.writeUInt8(t, r)
        : n === 2
          ? (e.writeUInt8(sn.OPS.OP_PUSHDATA1, r), e.writeUInt8(t, r + 1))
          : n === 3
            ? (e.writeUInt8(sn.OPS.OP_PUSHDATA2, r), e.writeUInt16LE(t, r + 1))
            : (e.writeUInt8(sn.OPS.OP_PUSHDATA4, r), e.writeUInt32LE(t, r + 1)),
      n
    );
  }
  on.encode = Vv;
  function Wv(e, t) {
    let r = e.readUInt8(t),
      n,
      i;
    if (r < sn.OPS.OP_PUSHDATA1) ((n = r), (i = 1));
    else if (r === sn.OPS.OP_PUSHDATA1) {
      if (t + 2 > e.length) return null;
      ((n = e.readUInt8(t + 1)), (i = 2));
    } else if (r === sn.OPS.OP_PUSHDATA2) {
      if (t + 3 > e.length) return null;
      ((n = e.readUInt16LE(t + 1)), (i = 3));
    } else {
      if (t + 5 > e.length) return null;
      if (r !== sn.OPS.OP_PUSHDATA4) throw new Error("Unexpected opcode");
      ((n = e.readUInt32LE(t + 1)), (i = 5));
    }
    return { opcode: r, number: n, size: i };
  }
  on.decode = Wv;
});
var ih = _((pi) => {
  "use strict";
  Object.defineProperty(pi, "__esModule", { value: !0 });
  pi.encode = pi.decode = void 0;
  function zv(e, t, r) {
    ((t = t || 4), (r = r === void 0 ? !0 : r));
    let n = e.length;
    if (n === 0) return 0;
    if (n > t) throw new TypeError("Script number overflow");
    if (r && (e[n - 1] & 127) === 0 && (n <= 1 || (e[n - 2] & 128) === 0))
      throw new Error("Non-minimally encoded script number");
    if (n === 5) {
      let s = e.readUInt32LE(0),
        o = e.readUInt8(4);
      return o & 128 ? -((o & -129) * 4294967296 + s) : o * 4294967296 + s;
    }
    let i = 0;
    for (let s = 0; s < n; ++s) i |= e[s] << (8 * s);
    return e[n - 1] & 128 ? -(i & ~(128 << (8 * (n - 1)))) : i;
  }
  pi.decode = zv;
  function Gv(e) {
    return e > 2147483647
      ? 5
      : e > 8388607
        ? 4
        : e > 32767
          ? 3
          : e > 127
            ? 2
            : e > 0
              ? 1
              : 0;
  }
  function Xv(e) {
    let t = Math.abs(e),
      r = Gv(t),
      n = Buffer.allocUnsafe(r),
      i = e < 0;
    for (let s = 0; s < r; ++s) (n.writeUInt8(t & 255, s), (t >>= 8));
    return (
      n[r - 1] & 128
        ? n.writeUInt8(i ? 128 : 0, r - 1)
        : i && (n[r - 1] |= 128),
      n
    );
  }
  pi.encode = Xv;
});
var eo = _((xP, sh) => {
  var es = {
    Array: function (e) {
      return e != null && e.constructor === Array;
    },
    Boolean: function (e) {
      return typeof e == "boolean";
    },
    Function: function (e) {
      return typeof e == "function";
    },
    Nil: function (e) {
      return e == null;
    },
    Number: function (e) {
      return typeof e == "number";
    },
    Object: function (e) {
      return typeof e == "object";
    },
    String: function (e) {
      return typeof e == "string";
    },
    "": function () {
      return !0;
    },
  };
  es.Null = es.Nil;
  for (Ra in es)
    es[Ra].toJSON = function (e) {
      return e;
    }.bind(null, Ra);
  var Ra;
  sh.exports = es;
});
var La = _((EP, ah) => {
  var On = eo();
  function oh(e) {
    return e.name || e.toString().match(/function (.*?)\s*\(/)[1];
  }
  function Ca(e) {
    return On.Nil(e) ? "" : oh(e.constructor);
  }
  function Yv(e) {
    return On.Function(e)
      ? ""
      : On.String(e)
        ? JSON.stringify(e)
        : e && On.Object(e)
          ? ""
          : e;
  }
  function Ua(e, t) {
    Error.captureStackTrace && Error.captureStackTrace(e, t);
  }
  function to(e) {
    return On.Function(e)
      ? e.toJSON
        ? e.toJSON()
        : oh(e)
      : On.Array(e)
        ? "Array"
        : e && On.Object(e)
          ? "Object"
          : e !== void 0
            ? e
            : "";
  }
  function fh(e, t, r) {
    var n = Yv(t);
    return (
      "Expected " +
      to(e) +
      ", got" +
      (r !== "" ? " " + r : "") +
      (n !== "" ? " " + n : "")
    );
  }
  function Nr(e, t, r) {
    ((r = r || Ca(t)),
      (this.message = fh(e, t, r)),
      Ua(this, Nr),
      (this.__type = e),
      (this.__value = t),
      (this.__valueTypeName = r));
  }
  Nr.prototype = Object.create(Error.prototype);
  Nr.prototype.constructor = Nr;
  function $v(e, t, r, n, i) {
    var s = '" of type ';
    return (
      t === "key" && (s = '" with key type '),
      fh('property "' + to(r) + s + to(e), n, i)
    );
  }
  function bi(e, t, r, n, i) {
    (e
      ? ((i = i || Ca(n)), (this.message = $v(e, r, t, n, i)))
      : (this.message = 'Unexpected property "' + t + '"'),
      Ua(this, Nr),
      (this.__label = r),
      (this.__property = t),
      (this.__type = e),
      (this.__value = n),
      (this.__valueTypeName = i));
  }
  bi.prototype = Object.create(Error.prototype);
  bi.prototype.constructor = Nr;
  function Jv(e, t) {
    return new Nr(e, {}, t);
  }
  function Zv(e, t, r) {
    return (
      e instanceof bi
        ? ((t = t + "." + e.__property),
          (e = new bi(e.__type, t, e.__label, e.__value, e.__valueTypeName)))
        : e instanceof Nr &&
          (e = new bi(e.__type, t, r, e.__value, e.__valueTypeName)),
      Ua(e),
      e
    );
  }
  ah.exports = {
    TfTypeError: Nr,
    TfPropertyTypeError: bi,
    tfCustomError: Jv,
    tfSubError: Zv,
    tfJSON: to,
    getValueTypeName: Ca,
  };
});
var hh = _((AP, dh) => {
  var Da = eo(),
    Qv = La();
  function ch(e) {
    return Buffer.isBuffer(e);
  }
  function uh(e) {
    return typeof e == "string" && /^([0-9a-f]{2})+$/i.test(e);
  }
  function ro(e, t) {
    var r = e.toJSON();
    function n(i) {
      if (!e(i)) return !1;
      if (i.length === t) return !0;
      throw Qv.tfCustomError(
        r + "(Length: " + t + ")",
        r + "(Length: " + i.length + ")",
      );
    }
    return (
      (n.toJSON = function () {
        return r;
      }),
      n
    );
  }
  var eg = ro.bind(null, Da.Array),
    tg = ro.bind(null, ch),
    rg = ro.bind(null, uh),
    ng = ro.bind(null, Da.String);
  function ig(e, t, r) {
    r = r || Da.Number;
    function n(i, s) {
      return r(i, s) && i > e && i < t;
    }
    return (
      (n.toJSON = function () {
        return `${r.toJSON()} between [${e}, ${t}]`;
      }),
      n
    );
  }
  var Ka = Math.pow(2, 53) - 1;
  function sg(e) {
    return typeof e == "number" && isFinite(e);
  }
  function og(e) {
    return (e << 24) >> 24 === e;
  }
  function fg(e) {
    return (e << 16) >> 16 === e;
  }
  function ag(e) {
    return (e | 0) === e;
  }
  function cg(e) {
    return typeof e == "number" && e >= -Ka && e <= Ka && Math.floor(e) === e;
  }
  function ug(e) {
    return (e & 255) === e;
  }
  function dg(e) {
    return (e & 65535) === e;
  }
  function hg(e) {
    return e >>> 0 === e;
  }
  function lg(e) {
    return typeof e == "number" && e >= 0 && e <= Ka && Math.floor(e) === e;
  }
  var ja = {
    ArrayN: eg,
    Buffer: ch,
    BufferN: tg,
    Finite: sg,
    Hex: uh,
    HexN: rg,
    Int8: og,
    Int16: fg,
    Int32: ag,
    Int53: cg,
    Range: ig,
    StringN: ng,
    UInt8: ug,
    UInt16: dg,
    UInt32: hg,
    UInt53: lg,
  };
  for (Fa in ja)
    ja[Fa].toJSON = function (e) {
      return e;
    }.bind(null, Fa);
  var Fa;
  dh.exports = ja;
});
var vh = _((IP, yh) => {
  var rs = La(),
    bt = eo(),
    Rr = rs.tfJSON,
    ph = rs.TfTypeError,
    bh = rs.TfPropertyTypeError,
    ts = rs.tfSubError,
    pg = rs.getValueTypeName,
    Cr = {
      arrayOf: function (t, r) {
        ((t = vr(t)), (r = r || {}));
        function n(i, s) {
          return !bt.Array(i) ||
            bt.Nil(i) ||
            (r.minLength !== void 0 && i.length < r.minLength) ||
            (r.maxLength !== void 0 && i.length > r.maxLength) ||
            (r.length !== void 0 && i.length !== r.length)
            ? !1
            : i.every(function (o, f) {
                try {
                  return Tt(t, o, s);
                } catch (u) {
                  throw ts(u, f);
                }
              });
        }
        return (
          (n.toJSON = function () {
            var i = "[" + Rr(t) + "]";
            return (
              r.length !== void 0
                ? (i += "{" + r.length + "}")
                : (r.minLength !== void 0 || r.maxLength !== void 0) &&
                  (i +=
                    "{" +
                    (r.minLength === void 0 ? 0 : r.minLength) +
                    "," +
                    (r.maxLength === void 0 ? 1 / 0 : r.maxLength) +
                    "}"),
              i
            );
          }),
          n
        );
      },
      maybe: function e(t) {
        t = vr(t);
        function r(n, i) {
          return bt.Nil(n) || t(n, i, e);
        }
        return (
          (r.toJSON = function () {
            return "?" + Rr(t);
          }),
          r
        );
      },
      map: function (t, r) {
        ((t = vr(t)), r && (r = vr(r)));
        function n(i, s) {
          if (!bt.Object(i) || bt.Nil(i)) return !1;
          for (var o in i) {
            try {
              r && Tt(r, o, s);
            } catch (u) {
              throw ts(u, o, "key");
            }
            try {
              var f = i[o];
              Tt(t, f, s);
            } catch (u) {
              throw ts(u, o);
            }
          }
          return !0;
        }
        return (
          r
            ? (n.toJSON = function () {
                return "{" + Rr(r) + ": " + Rr(t) + "}";
              })
            : (n.toJSON = function () {
                return "{" + Rr(t) + "}";
              }),
          n
        );
      },
      object: function (t) {
        var r = {};
        for (var n in t) r[n] = vr(t[n]);
        function i(s, o) {
          if (!bt.Object(s) || bt.Nil(s)) return !1;
          var f;
          try {
            for (f in r) {
              var u = r[f],
                l = s[f];
              Tt(u, l, o);
            }
          } catch (p) {
            throw ts(p, f);
          }
          if (o) {
            for (f in s) if (!r[f]) throw new bh(void 0, f);
          }
          return !0;
        }
        return (
          (i.toJSON = function () {
            return Rr(r);
          }),
          i
        );
      },
      anyOf: function () {
        var t = [].slice.call(arguments).map(vr);
        function r(n, i) {
          return t.some(function (s) {
            try {
              return Tt(s, n, i);
            } catch {
              return !1;
            }
          });
        }
        return (
          (r.toJSON = function () {
            return t.map(Rr).join("|");
          }),
          r
        );
      },
      allOf: function () {
        var t = [].slice.call(arguments).map(vr);
        function r(n, i) {
          return t.every(function (s) {
            try {
              return Tt(s, n, i);
            } catch {
              return !1;
            }
          });
        }
        return (
          (r.toJSON = function () {
            return t.map(Rr).join(" & ");
          }),
          r
        );
      },
      quacksLike: function (t) {
        function r(n) {
          return t === pg(n);
        }
        return (
          (r.toJSON = function () {
            return t;
          }),
          r
        );
      },
      tuple: function () {
        var t = [].slice.call(arguments).map(vr);
        function r(n, i) {
          return bt.Nil(n) || bt.Nil(n.length) || (i && n.length !== t.length)
            ? !1
            : t.every(function (s, o) {
                try {
                  return Tt(s, n[o], i);
                } catch (f) {
                  throw ts(f, o);
                }
              });
        }
        return (
          (r.toJSON = function () {
            return "(" + t.map(Rr).join(", ") + ")";
          }),
          r
        );
      },
      value: function (t) {
        function r(n) {
          return n === t;
        }
        return (
          (r.toJSON = function () {
            return t;
          }),
          r
        );
      },
    };
  Cr.oneOf = Cr.anyOf;
  function vr(e) {
    if (bt.String(e))
      return e[0] === "?" ? Cr.maybe(e.slice(1)) : bt[e] || Cr.quacksLike(e);
    if (e && bt.Object(e)) {
      if (bt.Array(e)) {
        if (e.length !== 1)
          throw new TypeError(
            "Expected compile() parameter of type Array of length 1",
          );
        return Cr.arrayOf(e[0]);
      }
      return Cr.object(e);
    } else if (bt.Function(e)) return e;
    return Cr.value(e);
  }
  function Tt(e, t, r, n) {
    if (bt.Function(e)) {
      if (e(t, r)) return !0;
      throw new ph(n || e, t);
    }
    return Tt(vr(e), t, r);
  }
  for (Ur in bt) Tt[Ur] = bt[Ur];
  var Ur;
  for (Ur in Cr) Tt[Ur] = Cr[Ur];
  var lh = hh();
  for (Ur in lh) Tt[Ur] = lh[Ur];
  Tt.compile = vr;
  Tt.TfTypeError = ph;
  Tt.TfPropertyTypeError = bh;
  yh.exports = Tt;
});
var yt = _((q) => {
  "use strict";
  Object.defineProperty(q, "__esModule", { value: !0 });
  q.oneOf =
    q.Null =
    q.BufferN =
    q.Function =
    q.UInt32 =
    q.UInt8 =
    q.tuple =
    q.maybe =
    q.Hex =
    q.Buffer =
    q.String =
    q.Boolean =
    q.Array =
    q.Number =
    q.Hash256bit =
    q.Hash160bit =
    q.Buffer256bit =
    q.isTaptree =
    q.isTapleaf =
    q.TAPLEAF_VERSION_MASK =
    q.Satoshi =
    q.isPoint =
    q.stacksEqual =
    q.typeforce =
      void 0;
  var no = require("buffer");
  q.typeforce = vh();
  var gh = no.Buffer.alloc(32, 0),
    mh = no.Buffer.from(
      "fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f",
      "hex",
    );
  function bg(e, t) {
    return e.length !== t.length ? !1 : e.every((r, n) => r.equals(t[n]));
  }
  q.stacksEqual = bg;
  function yg(e) {
    if (!no.Buffer.isBuffer(e) || e.length < 33) return !1;
    let t = e[0],
      r = e.slice(1, 33);
    if (r.compare(gh) === 0 || r.compare(mh) >= 0) return !1;
    if ((t === 2 || t === 3) && e.length === 33) return !0;
    let n = e.slice(33);
    return n.compare(gh) === 0 || n.compare(mh) >= 0
      ? !1
      : t === 4 && e.length === 65;
  }
  q.isPoint = yg;
  var vg = 21 * 1e14;
  function gg(e) {
    return q.typeforce.UInt53(e) && e <= vg;
  }
  q.Satoshi = gg;
  q.TAPLEAF_VERSION_MASK = 254;
  function wh(e) {
    return !e || !("output" in e) || !no.Buffer.isBuffer(e.output)
      ? !1
      : e.version !== void 0
        ? (e.version & q.TAPLEAF_VERSION_MASK) === e.version
        : !0;
  }
  q.isTapleaf = wh;
  function _h(e) {
    return (0, q.Array)(e)
      ? e.length !== 2
        ? !1
        : e.every((t) => _h(t))
      : wh(e);
  }
  q.isTaptree = _h;
  q.Buffer256bit = q.typeforce.BufferN(32);
  q.Hash160bit = q.typeforce.BufferN(20);
  q.Hash256bit = q.typeforce.BufferN(32);
  q.Number = q.typeforce.Number;
  q.Array = q.typeforce.Array;
  q.Boolean = q.typeforce.Boolean;
  q.String = q.typeforce.String;
  q.Buffer = q.typeforce.Buffer;
  q.Hex = q.typeforce.Hex;
  q.maybe = q.typeforce.maybe;
  q.tuple = q.typeforce.tuple;
  q.UInt8 = q.typeforce.UInt8;
  q.UInt32 = q.typeforce.UInt32;
  q.Function = q.typeforce.Function;
  q.BufferN = q.typeforce.BufferN;
  q.Null = q.typeforce.Null;
  q.oneOf = q.typeforce.oneOf;
});
var Th = _((yi) => {
  "use strict";
  Object.defineProperty(yi, "__esModule", { value: !0 });
  yi.encode = yi.decode = void 0;
  var Ah = Ha(),
    Ih = _t(),
    Va = yt(),
    { typeforce: mg } = Va,
    Sh = Buffer.alloc(1, 0);
  function xh(e) {
    let t = 0;
    for (; e[t] === 0; ) ++t;
    return t === e.length
      ? Sh
      : ((e = e.slice(t)),
        e[0] & 128 ? Buffer.concat([Sh, e], 1 + e.length) : e);
  }
  function Eh(e) {
    e[0] === 0 && (e = e.slice(1));
    let t = Buffer.alloc(32, 0),
      r = Math.max(0, 32 - e.length);
    return (e.copy(t, r), t);
  }
  function wg(e) {
    let t = e.readUInt8(e.length - 1);
    if (!(0, Ih.isDefinedHashType)(t)) throw new Error("Invalid hashType " + t);
    let r = Ah.decode(e.slice(0, -1)),
      n = Eh(r.r),
      i = Eh(r.s);
    return { signature: Buffer.concat([n, i], 64), hashType: t };
  }
  yi.decode = wg;
  function _g(e, t) {
    if (
      (mg(
        { signature: Va.BufferN(64), hashType: Va.UInt8 },
        { signature: e, hashType: t },
      ),
      !(0, Ih.isDefinedHashType)(t))
    )
      throw new Error("Invalid hashType " + t);
    let r = Buffer.allocUnsafe(1);
    r.writeUInt8(t, 0);
    let n = xh(e.slice(0, 32)),
      i = xh(e.slice(32, 64));
    return Buffer.concat([Ah.encode(n, i), r]);
  }
  yi.encode = _g;
});
var _t = _((re) => {
  "use strict";
  Object.defineProperty(re, "__esModule", { value: !0 });
  re.signature =
    re.number =
    re.isCanonicalScriptSignature =
    re.isDefinedHashType =
    re.isCanonicalPubKey =
    re.toStack =
    re.fromASM =
    re.toASM =
    re.decompile =
    re.compile =
    re.countNonPushOnlyOPs =
    re.isPushOnly =
    re.OPS =
      void 0;
  var Sg = Ha(),
    Nt = Qs();
  Object.defineProperty(re, "OPS", {
    enumerable: !0,
    get: function () {
      return Nt.OPS;
    },
  });
  var Wa = nh(),
    Ph = ih(),
    xg = Th(),
    gr = yt(),
    { typeforce: ns } = gr,
    Mh = Nt.OPS.OP_RESERVED;
  function Eg(e) {
    return (
      gr.Number(e) &&
      (e === Nt.OPS.OP_0 ||
        (e >= Nt.OPS.OP_1 && e <= Nt.OPS.OP_16) ||
        e === Nt.OPS.OP_1NEGATE)
    );
  }
  function Oh(e) {
    return gr.Buffer(e) || Eg(e);
  }
  function kh(e) {
    return gr.Array(e) && e.every(Oh);
  }
  re.isPushOnly = kh;
  function Ag(e) {
    return e.length - e.filter(Oh).length;
  }
  re.countNonPushOnlyOPs = Ag;
  function io(e) {
    if (e.length === 0) return Nt.OPS.OP_0;
    if (e.length === 1) {
      if (e[0] >= 1 && e[0] <= 16) return Mh + e[0];
      if (e[0] === 129) return Nt.OPS.OP_1NEGATE;
    }
  }
  function Bh(e) {
    return Buffer.isBuffer(e);
  }
  function Ig(e) {
    return gr.Array(e);
  }
  function so(e) {
    return Buffer.isBuffer(e);
  }
  function qh(e) {
    if (Bh(e)) return e;
    ns(gr.Array, e);
    let t = e.reduce(
        (i, s) =>
          so(s)
            ? s.length === 1 && io(s) !== void 0
              ? i + 1
              : i + Wa.encodingLength(s.length) + s.length
            : i + 1,
        0,
      ),
      r = Buffer.allocUnsafe(t),
      n = 0;
    if (
      (e.forEach((i) => {
        if (so(i)) {
          let s = io(i);
          if (s !== void 0) {
            (r.writeUInt8(s, n), (n += 1));
            return;
          }
          ((n += Wa.encode(r, i.length, n)), i.copy(r, n), (n += i.length));
        } else (r.writeUInt8(i, n), (n += 1));
      }),
      n !== r.length)
    )
      throw new Error("Could not decode chunks");
    return r;
  }
  re.compile = qh;
  function za(e) {
    if (Ig(e)) return e;
    ns(gr.Buffer, e);
    let t = [],
      r = 0;
    for (; r < e.length; ) {
      let n = e[r];
      if (n > Nt.OPS.OP_0 && n <= Nt.OPS.OP_PUSHDATA4) {
        let i = Wa.decode(e, r);
        if (i === null || ((r += i.size), r + i.number > e.length)) return null;
        let s = e.slice(r, r + i.number);
        r += i.number;
        let o = io(s);
        o !== void 0 ? t.push(o) : t.push(s);
      } else (t.push(n), (r += 1));
    }
    return t;
  }
  re.decompile = za;
  function Tg(e) {
    if ((Bh(e) && (e = za(e)), !e))
      throw new Error("Could not convert invalid chunks to ASM");
    return e
      .map((t) => {
        if (so(t)) {
          let r = io(t);
          if (r === void 0) return t.toString("hex");
          t = r;
        }
        return Nt.REVERSE_OPS[t];
      })
      .join(" ");
  }
  re.toASM = Tg;
  function Pg(e) {
    return (
      ns(gr.String, e),
      qh(
        e
          .split(" ")
          .map((t) =>
            Nt.OPS[t] !== void 0
              ? Nt.OPS[t]
              : (ns(gr.Hex, t), Buffer.from(t, "hex")),
          ),
      )
    );
  }
  re.fromASM = Pg;
  function Mg(e) {
    return (
      (e = za(e)),
      ns(kh, e),
      e.map((t) =>
        so(t)
          ? t
          : t === Nt.OPS.OP_0
            ? Buffer.allocUnsafe(0)
            : Ph.encode(t - Mh),
      )
    );
  }
  re.toStack = Mg;
  function Og(e) {
    return gr.isPoint(e);
  }
  re.isCanonicalPubKey = Og;
  function Hh(e) {
    let t = e & -129;
    return t > 0 && t < 4;
  }
  re.isDefinedHashType = Hh;
  function kg(e) {
    return !Buffer.isBuffer(e) || !Hh(e[e.length - 1])
      ? !1
      : Sg.check(e.slice(0, -1));
  }
  re.isCanonicalScriptSignature = kg;
  re.number = Ph;
  re.signature = xg;
});
var Lr = _((vi) => {
  "use strict";
  Object.defineProperty(vi, "__esModule", { value: !0 });
  vi.value = vi.prop = void 0;
  function Bg(e, t, r) {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !0,
      get() {
        let n = r.call(this);
        return ((this[t] = n), n);
      },
      set(n) {
        Object.defineProperty(this, t, {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0,
        });
      },
    });
  }
  vi.prop = Bg;
  function qg(e) {
    let t;
    return () => (t !== void 0 || (t = e()), t);
  }
  vi.value = qg;
});
var Ch = _((fo) => {
  "use strict";
  Object.defineProperty(fo, "__esModule", { value: !0 });
  fo.p2data = void 0;
  var Hg = zt(),
    oo = _t(),
    mr = yt(),
    Nh = Lr(),
    Rh = oo.OPS;
  function Ng(e, t) {
    if (!e.data && !e.output) throw new TypeError("Not enough data");
    ((t = Object.assign({ validate: !0 }, t || {})),
      (0, mr.typeforce)(
        {
          network: mr.typeforce.maybe(mr.typeforce.Object),
          output: mr.typeforce.maybe(mr.typeforce.Buffer),
          data: mr.typeforce.maybe(mr.typeforce.arrayOf(mr.typeforce.Buffer)),
        },
        e,
      ));
    let n = { name: "embed", network: e.network || Hg.bitcoin };
    if (
      (Nh.prop(n, "output", () => {
        if (e.data) return oo.compile([Rh.OP_RETURN].concat(e.data));
      }),
      Nh.prop(n, "data", () => {
        if (e.output) return oo.decompile(e.output).slice(1);
      }),
      t.validate && e.output)
    ) {
      let i = oo.decompile(e.output);
      if (i[0] !== Rh.OP_RETURN) throw new TypeError("Output is invalid");
      if (!i.slice(1).every(mr.typeforce.Buffer))
        throw new TypeError("Output is invalid");
      if (e.data && !(0, mr.stacksEqual)(e.data, n.data))
        throw new TypeError("Data mismatch");
    }
    return Object.assign(n, e);
  }
  fo.p2data = Ng;
});
var Uh = _((co) => {
  "use strict";
  Object.defineProperty(co, "__esModule", { value: !0 });
  co.p2ms = void 0;
  var Rg = zt(),
    gi = _t(),
    _e = yt(),
    fn = Lr(),
    mi = gi.OPS,
    ao = mi.OP_RESERVED;
  function Cg(e, t) {
    if (
      !e.input &&
      !e.output &&
      !(e.pubkeys && e.m !== void 0) &&
      !e.signatures
    )
      throw new TypeError("Not enough data");
    t = Object.assign({ validate: !0 }, t || {});
    function r(u) {
      return (
        gi.isCanonicalScriptSignature(u) ||
        (t.allowIncomplete && u === mi.OP_0) !== void 0
      );
    }
    (0, _e.typeforce)(
      {
        network: _e.typeforce.maybe(_e.typeforce.Object),
        m: _e.typeforce.maybe(_e.typeforce.Number),
        n: _e.typeforce.maybe(_e.typeforce.Number),
        output: _e.typeforce.maybe(_e.typeforce.Buffer),
        pubkeys: _e.typeforce.maybe(_e.typeforce.arrayOf(_e.isPoint)),
        signatures: _e.typeforce.maybe(_e.typeforce.arrayOf(r)),
        input: _e.typeforce.maybe(_e.typeforce.Buffer),
      },
      e,
    );
    let i = { network: e.network || Rg.bitcoin },
      s = [],
      o = !1;
    function f(u) {
      o ||
        ((o = !0),
        (s = gi.decompile(u)),
        (i.m = s[0] - ao),
        (i.n = s[s.length - 2] - ao),
        (i.pubkeys = s.slice(1, -2)));
    }
    if (
      (fn.prop(i, "output", () => {
        if (e.m && i.n && e.pubkeys)
          return gi.compile(
            [].concat(ao + e.m, e.pubkeys, ao + i.n, mi.OP_CHECKMULTISIG),
          );
      }),
      fn.prop(i, "m", () => {
        if (i.output) return (f(i.output), i.m);
      }),
      fn.prop(i, "n", () => {
        if (i.pubkeys) return i.pubkeys.length;
      }),
      fn.prop(i, "pubkeys", () => {
        if (e.output) return (f(e.output), i.pubkeys);
      }),
      fn.prop(i, "signatures", () => {
        if (e.input) return gi.decompile(e.input).slice(1);
      }),
      fn.prop(i, "input", () => {
        if (e.signatures) return gi.compile([mi.OP_0].concat(e.signatures));
      }),
      fn.prop(i, "witness", () => {
        if (i.input) return [];
      }),
      fn.prop(i, "name", () => {
        if (!(!i.m || !i.n)) return `p2ms(${i.m} of ${i.n})`;
      }),
      t.validate)
    ) {
      if (e.output) {
        if ((f(e.output), !_e.typeforce.Number(s[0])))
          throw new TypeError("Output is invalid");
        if (!_e.typeforce.Number(s[s.length - 2]))
          throw new TypeError("Output is invalid");
        if (s[s.length - 1] !== mi.OP_CHECKMULTISIG)
          throw new TypeError("Output is invalid");
        if (i.m <= 0 || i.n > 16 || i.m > i.n || i.n !== s.length - 3)
          throw new TypeError("Output is invalid");
        if (!i.pubkeys.every((u) => (0, _e.isPoint)(u)))
          throw new TypeError("Output is invalid");
        if (e.m !== void 0 && e.m !== i.m) throw new TypeError("m mismatch");
        if (e.n !== void 0 && e.n !== i.n) throw new TypeError("n mismatch");
        if (e.pubkeys && !(0, _e.stacksEqual)(e.pubkeys, i.pubkeys))
          throw new TypeError("Pubkeys mismatch");
      }
      if (e.pubkeys) {
        if (e.n !== void 0 && e.n !== e.pubkeys.length)
          throw new TypeError("Pubkey count mismatch");
        if (((i.n = e.pubkeys.length), i.n < i.m))
          throw new TypeError("Pubkey count cannot be less than m");
      }
      if (e.signatures) {
        if (e.signatures.length < i.m)
          throw new TypeError("Not enough signatures provided");
        if (e.signatures.length > i.m)
          throw new TypeError("Too many signatures provided");
      }
      if (e.input) {
        if (e.input[0] !== mi.OP_0) throw new TypeError("Input is invalid");
        if (i.signatures.length === 0 || !i.signatures.every(r))
          throw new TypeError("Input has invalid signature(s)");
        if (e.signatures && !(0, _e.stacksEqual)(e.signatures, i.signatures))
          throw new TypeError("Signature mismatch");
        if (e.m !== void 0 && e.m !== e.signatures.length)
          throw new TypeError("Signature count mismatch");
      }
    }
    return Object.assign(i, e);
  }
  co.p2ms = Cg;
});
var Fh = _((uo) => {
  "use strict";
  Object.defineProperty(uo, "__esModule", { value: !0 });
  uo.p2pk = void 0;
  var Ug = zt(),
    _i = _t(),
    ir = yt(),
    wi = Lr(),
    Lh = _i.OPS;
  function Lg(e, t) {
    if (!e.input && !e.output && !e.pubkey && !e.input && !e.signature)
      throw new TypeError("Not enough data");
    ((t = Object.assign({ validate: !0 }, t || {})),
      (0, ir.typeforce)(
        {
          network: ir.typeforce.maybe(ir.typeforce.Object),
          output: ir.typeforce.maybe(ir.typeforce.Buffer),
          pubkey: ir.typeforce.maybe(ir.isPoint),
          signature: ir.typeforce.maybe(_i.isCanonicalScriptSignature),
          input: ir.typeforce.maybe(ir.typeforce.Buffer),
        },
        e,
      ));
    let r = wi.value(() => _i.decompile(e.input)),
      i = { name: "p2pk", network: e.network || Ug.bitcoin };
    if (
      (wi.prop(i, "output", () => {
        if (e.pubkey) return _i.compile([e.pubkey, Lh.OP_CHECKSIG]);
      }),
      wi.prop(i, "pubkey", () => {
        if (e.output) return e.output.slice(1, -1);
      }),
      wi.prop(i, "signature", () => {
        if (e.input) return r()[0];
      }),
      wi.prop(i, "input", () => {
        if (e.signature) return _i.compile([e.signature]);
      }),
      wi.prop(i, "witness", () => {
        if (i.input) return [];
      }),
      t.validate)
    ) {
      if (e.output) {
        if (e.output[e.output.length - 1] !== Lh.OP_CHECKSIG)
          throw new TypeError("Output is invalid");
        if (!(0, ir.isPoint)(i.pubkey))
          throw new TypeError("Output pubkey is invalid");
        if (e.pubkey && !e.pubkey.equals(i.pubkey))
          throw new TypeError("Pubkey mismatch");
      }
      if (e.signature && e.input && !e.input.equals(i.input))
        throw new TypeError("Signature mismatch");
      if (e.input) {
        if (r().length !== 1) throw new TypeError("Input is invalid");
        if (!_i.isCanonicalScriptSignature(i.signature))
          throw new TypeError("Input has invalid signature");
      }
    }
    return Object.assign(i, e);
  }
  uo.p2pk = Lg;
});
var Kh = _((ho) => {
  "use strict";
  Object.defineProperty(ho, "__esModule", { value: !0 });
  ho.crypto = void 0;
  var an = require("node:crypto");
  ho.crypto =
    an && typeof an == "object" && "webcrypto" in an
      ? an.webcrypto
      : an && typeof an == "object" && "randomBytes" in an
        ? an
        : void 0;
});
var po = _((L) => {
  "use strict";
  Object.defineProperty(L, "__esModule", { value: !0 });
  L.wrapXOFConstructorWithOpts =
    L.wrapConstructorWithOpts =
    L.wrapConstructor =
    L.Hash =
    L.nextTick =
    L.swap32IfBE =
    L.byteSwapIfBE =
    L.swap8IfBE =
    L.isLE =
      void 0;
  L.isBytes = Dh;
  L.anumber = Ga;
  L.abytes = xi;
  L.ahash = Fg;
  L.aexists = Kg;
  L.aoutput = jg;
  L.u8 = Dg;
  L.u32 = Vg;
  L.clean = Wg;
  L.createView = zg;
  L.rotr = Gg;
  L.rotl = Xg;
  L.byteSwap = Ya;
  L.byteSwap32 = Vh;
  L.bytesToHex = $g;
  L.hexToBytes = Jg;
  L.asyncLoop = Qg;
  L.utf8ToBytes = $a;
  L.bytesToUtf8 = e8;
  L.toBytes = lo;
  L.kdfInputToBytes = t8;
  L.concatBytes = r8;
  L.checkOpts = n8;
  L.createHasher = zh;
  L.createOptHasher = Gh;
  L.createXOFer = Xh;
  L.randomBytes = i8;
  var Si = Kh();
  function Dh(e) {
    return (
      e instanceof Uint8Array ||
      (ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array")
    );
  }
  function Ga(e) {
    if (!Number.isSafeInteger(e) || e < 0)
      throw new Error("positive integer expected, got " + e);
  }
  function xi(e, ...t) {
    if (!Dh(e)) throw new Error("Uint8Array expected");
    if (t.length > 0 && !t.includes(e.length))
      throw new Error(
        "Uint8Array expected of length " + t + ", got length=" + e.length,
      );
  }
  function Fg(e) {
    if (typeof e != "function" || typeof e.create != "function")
      throw new Error("Hash should be wrapped by utils.createHasher");
    (Ga(e.outputLen), Ga(e.blockLen));
  }
  function Kg(e, t = !0) {
    if (e.destroyed) throw new Error("Hash instance has been destroyed");
    if (t && e.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function jg(e, t) {
    xi(e);
    let r = t.outputLen;
    if (e.length < r)
      throw new Error(
        "digestInto() expects output buffer of length at least " + r,
      );
  }
  function Dg(e) {
    return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
  }
  function Vg(e) {
    return new Uint32Array(
      e.buffer,
      e.byteOffset,
      Math.floor(e.byteLength / 4),
    );
  }
  function Wg(...e) {
    for (let t = 0; t < e.length; t++) e[t].fill(0);
  }
  function zg(e) {
    return new DataView(e.buffer, e.byteOffset, e.byteLength);
  }
  function Gg(e, t) {
    return (e << (32 - t)) | (e >>> t);
  }
  function Xg(e, t) {
    return (e << t) | ((e >>> (32 - t)) >>> 0);
  }
  L.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  function Ya(e) {
    return (
      ((e << 24) & 4278190080) |
      ((e << 8) & 16711680) |
      ((e >>> 8) & 65280) |
      ((e >>> 24) & 255)
    );
  }
  L.swap8IfBE = L.isLE ? (e) => e : (e) => Ya(e);
  L.byteSwapIfBE = L.swap8IfBE;
  function Vh(e) {
    for (let t = 0; t < e.length; t++) e[t] = Ya(e[t]);
    return e;
  }
  L.swap32IfBE = L.isLE ? (e) => e : Vh;
  var Wh =
      typeof Uint8Array.from([]).toHex == "function" &&
      typeof Uint8Array.fromHex == "function",
    Yg = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
  function $g(e) {
    if ((xi(e), Wh)) return e.toHex();
    let t = "";
    for (let r = 0; r < e.length; r++) t += Yg[e[r]];
    return t;
  }
  var Fr = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
  function jh(e) {
    if (e >= Fr._0 && e <= Fr._9) return e - Fr._0;
    if (e >= Fr.A && e <= Fr.F) return e - (Fr.A - 10);
    if (e >= Fr.a && e <= Fr.f) return e - (Fr.a - 10);
  }
  function Jg(e) {
    if (typeof e != "string")
      throw new Error("hex string expected, got " + typeof e);
    if (Wh) return Uint8Array.fromHex(e);
    let t = e.length,
      r = t / 2;
    if (t % 2)
      throw new Error("hex string expected, got unpadded hex of length " + t);
    let n = new Uint8Array(r);
    for (let i = 0, s = 0; i < r; i++, s += 2) {
      let o = jh(e.charCodeAt(s)),
        f = jh(e.charCodeAt(s + 1));
      if (o === void 0 || f === void 0) {
        let u = e[s] + e[s + 1];
        throw new Error(
          'hex string expected, got non-hex character "' +
            u +
            '" at index ' +
            s,
        );
      }
      n[i] = o * 16 + f;
    }
    return n;
  }
  var Zg = async () => {};
  L.nextTick = Zg;
  async function Qg(e, t, r) {
    let n = Date.now();
    for (let i = 0; i < e; i++) {
      r(i);
      let s = Date.now() - n;
      (s >= 0 && s < t) || (await (0, L.nextTick)(), (n += s));
    }
  }
  function $a(e) {
    if (typeof e != "string") throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(e));
  }
  function e8(e) {
    return new TextDecoder().decode(e);
  }
  function lo(e) {
    return (typeof e == "string" && (e = $a(e)), xi(e), e);
  }
  function t8(e) {
    return (typeof e == "string" && (e = $a(e)), xi(e), e);
  }
  function r8(...e) {
    let t = 0;
    for (let n = 0; n < e.length; n++) {
      let i = e[n];
      (xi(i), (t += i.length));
    }
    let r = new Uint8Array(t);
    for (let n = 0, i = 0; n < e.length; n++) {
      let s = e[n];
      (r.set(s, i), (i += s.length));
    }
    return r;
  }
  function n8(e, t) {
    if (t !== void 0 && {}.toString.call(t) !== "[object Object]")
      throw new Error("options should be object or undefined");
    return Object.assign(e, t);
  }
  var Xa = class {};
  L.Hash = Xa;
  function zh(e) {
    let t = (n) => e().update(lo(n)).digest(),
      r = e();
    return (
      (t.outputLen = r.outputLen),
      (t.blockLen = r.blockLen),
      (t.create = () => e()),
      t
    );
  }
  function Gh(e) {
    let t = (n, i) => e(i).update(lo(n)).digest(),
      r = e({});
    return (
      (t.outputLen = r.outputLen),
      (t.blockLen = r.blockLen),
      (t.create = (n) => e(n)),
      t
    );
  }
  function Xh(e) {
    let t = (n, i) => e(i).update(lo(n)).digest(),
      r = e({});
    return (
      (t.outputLen = r.outputLen),
      (t.blockLen = r.blockLen),
      (t.create = (n) => e(n)),
      t
    );
  }
  L.wrapConstructor = zh;
  L.wrapConstructorWithOpts = Gh;
  L.wrapXOFConstructorWithOpts = Xh;
  function i8(e = 32) {
    if (Si.crypto && typeof Si.crypto.getRandomValues == "function")
      return Si.crypto.getRandomValues(new Uint8Array(e));
    if (Si.crypto && typeof Si.crypto.randomBytes == "function")
      return Uint8Array.from(Si.crypto.randomBytes(e));
    throw new Error("crypto.getRandomValues must be defined");
  }
});
var Za = _((Pt) => {
  "use strict";
  Object.defineProperty(Pt, "__esModule", { value: !0 });
  Pt.SHA512_IV =
    Pt.SHA384_IV =
    Pt.SHA224_IV =
    Pt.SHA256_IV =
    Pt.HashMD =
      void 0;
  Pt.setBigUint64 = Yh;
  Pt.Chi = s8;
  Pt.Maj = o8;
  var wr = po();
  function Yh(e, t, r, n) {
    if (typeof e.setBigUint64 == "function") return e.setBigUint64(t, r, n);
    let i = BigInt(32),
      s = BigInt(4294967295),
      o = Number((r >> i) & s),
      f = Number(r & s),
      u = n ? 4 : 0,
      l = n ? 0 : 4;
    (e.setUint32(t + u, o, n), e.setUint32(t + l, f, n));
  }
  function s8(e, t, r) {
    return (e & t) ^ (~e & r);
  }
  function o8(e, t, r) {
    return (e & t) ^ (e & r) ^ (t & r);
  }
  var Ja = class extends wr.Hash {
    constructor(t, r, n, i) {
      (super(),
        (this.finished = !1),
        (this.length = 0),
        (this.pos = 0),
        (this.destroyed = !1),
        (this.blockLen = t),
        (this.outputLen = r),
        (this.padOffset = n),
        (this.isLE = i),
        (this.buffer = new Uint8Array(t)),
        (this.view = (0, wr.createView)(this.buffer)));
    }
    update(t) {
      ((0, wr.aexists)(this), (t = (0, wr.toBytes)(t)), (0, wr.abytes)(t));
      let { view: r, buffer: n, blockLen: i } = this,
        s = t.length;
      for (let o = 0; o < s; ) {
        let f = Math.min(i - this.pos, s - o);
        if (f === i) {
          let u = (0, wr.createView)(t);
          for (; i <= s - o; o += i) this.process(u, o);
          continue;
        }
        (n.set(t.subarray(o, o + f), this.pos),
          (this.pos += f),
          (o += f),
          this.pos === i && (this.process(r, 0), (this.pos = 0)));
      }
      return ((this.length += t.length), this.roundClean(), this);
    }
    digestInto(t) {
      ((0, wr.aexists)(this), (0, wr.aoutput)(t, this), (this.finished = !0));
      let { buffer: r, view: n, blockLen: i, isLE: s } = this,
        { pos: o } = this;
      ((r[o++] = 128),
        (0, wr.clean)(this.buffer.subarray(o)),
        this.padOffset > i - o && (this.process(n, 0), (o = 0)));
      for (let h = o; h < i; h++) r[h] = 0;
      (Yh(n, i - 8, BigInt(this.length * 8), s), this.process(n, 0));
      let f = (0, wr.createView)(t),
        u = this.outputLen;
      if (u % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
      let l = u / 4,
        p = this.get();
      if (l > p.length) throw new Error("_sha2: outputLen bigger than state");
      for (let h = 0; h < l; h++) f.setUint32(4 * h, p[h], s);
    }
    digest() {
      let { buffer: t, outputLen: r } = this;
      this.digestInto(t);
      let n = t.slice(0, r);
      return (this.destroy(), n);
    }
    _cloneInto(t) {
      (t || (t = new this.constructor()), t.set(...this.get()));
      let {
        blockLen: r,
        buffer: n,
        length: i,
        finished: s,
        destroyed: o,
        pos: f,
      } = this;
      return (
        (t.destroyed = o),
        (t.finished = s),
        (t.length = i),
        (t.pos = f),
        i % r && t.buffer.set(n),
        t
      );
    }
    clone() {
      return this._cloneInto();
    }
  };
  Pt.HashMD = Ja;
  Pt.SHA256_IV = Uint32Array.from([
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
    528734635, 1541459225,
  ]);
  Pt.SHA224_IV = Uint32Array.from([
    3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025,
    1694076839, 3204075428,
  ]);
  Pt.SHA384_IV = Uint32Array.from([
    3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999,
    355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025,
    3675008525, 1694076839, 1203062813, 3204075428,
  ]);
  Pt.SHA512_IV = Uint32Array.from([
    1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723,
    2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199,
    528734635, 4215389547, 1541459225, 327033209,
  ]);
});
var ec = _((Rt) => {
  "use strict";
  Object.defineProperty(Rt, "__esModule", { value: !0 });
  Rt.ripemd160 = Rt.RIPEMD160 = Rt.md5 = Rt.MD5 = Rt.sha1 = Rt.SHA1 = void 0;
  var kn = Za(),
    vt = po(),
    Ei = Uint32Array.from([
      1732584193, 4023233417, 2562383102, 271733878, 3285377520,
    ]),
    cn = new Uint32Array(80),
    vo = class extends kn.HashMD {
      constructor() {
        (super(64, 20, 8, !1),
          (this.A = Ei[0] | 0),
          (this.B = Ei[1] | 0),
          (this.C = Ei[2] | 0),
          (this.D = Ei[3] | 0),
          (this.E = Ei[4] | 0));
      }
      get() {
        let { A: t, B: r, C: n, D: i, E: s } = this;
        return [t, r, n, i, s];
      }
      set(t, r, n, i, s) {
        ((this.A = t | 0),
          (this.B = r | 0),
          (this.C = n | 0),
          (this.D = i | 0),
          (this.E = s | 0));
      }
      process(t, r) {
        for (let u = 0; u < 16; u++, r += 4) cn[u] = t.getUint32(r, !1);
        for (let u = 16; u < 80; u++)
          cn[u] = (0, vt.rotl)(
            cn[u - 3] ^ cn[u - 8] ^ cn[u - 14] ^ cn[u - 16],
            1,
          );
        let { A: n, B: i, C: s, D: o, E: f } = this;
        for (let u = 0; u < 80; u++) {
          let l, p;
          u < 20
            ? ((l = (0, kn.Chi)(i, s, o)), (p = 1518500249))
            : u < 40
              ? ((l = i ^ s ^ o), (p = 1859775393))
              : u < 60
                ? ((l = (0, kn.Maj)(i, s, o)), (p = 2400959708))
                : ((l = i ^ s ^ o), (p = 3395469782));
          let h = ((0, vt.rotl)(n, 5) + l + f + p + cn[u]) | 0;
          ((f = o), (o = s), (s = (0, vt.rotl)(i, 30)), (i = n), (n = h));
        }
        ((n = (n + this.A) | 0),
          (i = (i + this.B) | 0),
          (s = (s + this.C) | 0),
          (o = (o + this.D) | 0),
          (f = (f + this.E) | 0),
          this.set(n, i, s, o, f));
      }
      roundClean() {
        (0, vt.clean)(cn);
      }
      destroy() {
        (this.set(0, 0, 0, 0, 0), (0, vt.clean)(this.buffer));
      }
    };
  Rt.SHA1 = vo;
  Rt.sha1 = (0, vt.createHasher)(() => new vo());
  var f8 = Math.pow(2, 32),
    a8 = Array.from({ length: 64 }, (e, t) =>
      Math.floor(f8 * Math.abs(Math.sin(t + 1))),
    ),
    bo = Ei.slice(0, 4),
    Qa = new Uint32Array(16),
    go = class extends kn.HashMD {
      constructor() {
        (super(64, 16, 8, !0),
          (this.A = bo[0] | 0),
          (this.B = bo[1] | 0),
          (this.C = bo[2] | 0),
          (this.D = bo[3] | 0));
      }
      get() {
        let { A: t, B: r, C: n, D: i } = this;
        return [t, r, n, i];
      }
      set(t, r, n, i) {
        ((this.A = t | 0),
          (this.B = r | 0),
          (this.C = n | 0),
          (this.D = i | 0));
      }
      process(t, r) {
        for (let f = 0; f < 16; f++, r += 4) Qa[f] = t.getUint32(r, !0);
        let { A: n, B: i, C: s, D: o } = this;
        for (let f = 0; f < 64; f++) {
          let u, l, p;
          (f < 16
            ? ((u = (0, kn.Chi)(i, s, o)), (l = f), (p = [7, 12, 17, 22]))
            : f < 32
              ? ((u = (0, kn.Chi)(o, i, s)),
                (l = (5 * f + 1) % 16),
                (p = [5, 9, 14, 20]))
              : f < 48
                ? ((u = i ^ s ^ o),
                  (l = (3 * f + 5) % 16),
                  (p = [4, 11, 16, 23]))
                : ((u = s ^ (i | ~o)),
                  (l = (7 * f) % 16),
                  (p = [6, 10, 15, 21])),
            (u = u + n + a8[f] + Qa[l]),
            (n = o),
            (o = s),
            (s = i),
            (i = i + (0, vt.rotl)(u, p[f % 4])));
        }
        ((n = (n + this.A) | 0),
          (i = (i + this.B) | 0),
          (s = (s + this.C) | 0),
          (o = (o + this.D) | 0),
          this.set(n, i, s, o));
      }
      roundClean() {
        (0, vt.clean)(Qa);
      }
      destroy() {
        (this.set(0, 0, 0, 0), (0, vt.clean)(this.buffer));
      }
    };
  Rt.MD5 = go;
  Rt.md5 = (0, vt.createHasher)(() => new go());
  var c8 = Uint8Array.from([
      7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
    ]),
    Jh = Uint8Array.from(new Array(16).fill(0).map((e, t) => t)),
    u8 = Jh.map((e) => (9 * e + 5) % 16),
    Zh = (() => {
      let r = [[Jh], [u8]];
      for (let n = 0; n < 4; n++)
        for (let i of r) i.push(i[n].map((s) => c8[s]));
      return r;
    })(),
    Qh = Zh[0],
    el = Zh[1],
    tl = [
      [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
      [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
      [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
      [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
      [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5],
    ].map((e) => Uint8Array.from(e)),
    d8 = Qh.map((e, t) => e.map((r) => tl[t][r])),
    h8 = el.map((e, t) => e.map((r) => tl[t][r])),
    l8 = Uint32Array.from([0, 1518500249, 1859775393, 2400959708, 2840853838]),
    p8 = Uint32Array.from([1352829926, 1548603684, 1836072691, 2053994217, 0]);
  function $h(e, t, r, n) {
    return e === 0
      ? t ^ r ^ n
      : e === 1
        ? (t & r) | (~t & n)
        : e === 2
          ? (t | ~r) ^ n
          : e === 3
            ? (t & n) | (r & ~n)
            : t ^ (r | ~n);
  }
  var yo = new Uint32Array(16),
    mo = class extends kn.HashMD {
      constructor() {
        (super(64, 20, 8, !0),
          (this.h0 = 1732584193),
          (this.h1 = -271733879),
          (this.h2 = -1732584194),
          (this.h3 = 271733878),
          (this.h4 = -1009589776));
      }
      get() {
        let { h0: t, h1: r, h2: n, h3: i, h4: s } = this;
        return [t, r, n, i, s];
      }
      set(t, r, n, i, s) {
        ((this.h0 = t | 0),
          (this.h1 = r | 0),
          (this.h2 = n | 0),
          (this.h3 = i | 0),
          (this.h4 = s | 0));
      }
      process(t, r) {
        for (let E = 0; E < 16; E++, r += 4) yo[E] = t.getUint32(r, !0);
        let n = this.h0 | 0,
          i = n,
          s = this.h1 | 0,
          o = s,
          f = this.h2 | 0,
          u = f,
          l = this.h3 | 0,
          p = l,
          h = this.h4 | 0,
          w = h;
        for (let E = 0; E < 5; E++) {
          let A = 4 - E,
            T = l8[E],
            O = p8[E],
            k = Qh[E],
            H = el[E],
            P = d8[E],
            M = h8[E];
          for (let B = 0; B < 16; B++) {
            let F =
              ((0, vt.rotl)(n + $h(E, s, f, l) + yo[k[B]] + T, P[B]) + h) | 0;
            ((n = h), (h = l), (l = (0, vt.rotl)(f, 10) | 0), (f = s), (s = F));
          }
          for (let B = 0; B < 16; B++) {
            let F =
              ((0, vt.rotl)(i + $h(A, o, u, p) + yo[H[B]] + O, M[B]) + w) | 0;
            ((i = w), (w = p), (p = (0, vt.rotl)(u, 10) | 0), (u = o), (o = F));
          }
        }
        this.set(
          (this.h1 + f + p) | 0,
          (this.h2 + l + w) | 0,
          (this.h3 + h + i) | 0,
          (this.h4 + n + o) | 0,
          (this.h0 + s + u) | 0,
        );
      }
      roundClean() {
        (0, vt.clean)(yo);
      }
      destroy() {
        ((this.destroyed = !0),
          (0, vt.clean)(this.buffer),
          this.set(0, 0, 0, 0, 0));
      }
    };
  Rt.RIPEMD160 = mo;
  Rt.ripemd160 = (0, vt.createHasher)(() => new mo());
});
var nl = _((Ai) => {
  "use strict";
  Object.defineProperty(Ai, "__esModule", { value: !0 });
  Ai.ripemd160 = Ai.RIPEMD160 = void 0;
  var rl = ec();
  Ai.RIPEMD160 = rl.RIPEMD160;
  Ai.ripemd160 = rl.ripemd160;
});
var sl = _((Ii) => {
  "use strict";
  Object.defineProperty(Ii, "__esModule", { value: !0 });
  Ii.sha1 = Ii.SHA1 = void 0;
  var il = ec();
  Ii.SHA1 = il.SHA1;
  Ii.sha1 = il.sha1;
});
var Tl = _((j) => {
  "use strict";
  Object.defineProperty(j, "__esModule", { value: !0 });
  j.toBig =
    j.shrSL =
    j.shrSH =
    j.rotrSL =
    j.rotrSH =
    j.rotrBL =
    j.rotrBH =
    j.rotr32L =
    j.rotr32H =
    j.rotlSL =
    j.rotlSH =
    j.rotlBL =
    j.rotlBH =
    j.add5L =
    j.add5H =
    j.add4L =
    j.add4H =
    j.add3L =
    j.add3H =
      void 0;
  j.add = wl;
  j.fromBig = rc;
  j.split = ol;
  var wo = BigInt(2 ** 32 - 1),
    tc = BigInt(32);
  function rc(e, t = !1) {
    return t
      ? { h: Number(e & wo), l: Number((e >> tc) & wo) }
      : { h: Number((e >> tc) & wo) | 0, l: Number(e & wo) | 0 };
  }
  function ol(e, t = !1) {
    let r = e.length,
      n = new Uint32Array(r),
      i = new Uint32Array(r);
    for (let s = 0; s < r; s++) {
      let { h: o, l: f } = rc(e[s], t);
      [n[s], i[s]] = [o, f];
    }
    return [n, i];
  }
  var fl = (e, t) => (BigInt(e >>> 0) << tc) | BigInt(t >>> 0);
  j.toBig = fl;
  var al = (e, t, r) => e >>> r;
  j.shrSH = al;
  var cl = (e, t, r) => (e << (32 - r)) | (t >>> r);
  j.shrSL = cl;
  var ul = (e, t, r) => (e >>> r) | (t << (32 - r));
  j.rotrSH = ul;
  var dl = (e, t, r) => (e << (32 - r)) | (t >>> r);
  j.rotrSL = dl;
  var hl = (e, t, r) => (e << (64 - r)) | (t >>> (r - 32));
  j.rotrBH = hl;
  var ll = (e, t, r) => (e >>> (r - 32)) | (t << (64 - r));
  j.rotrBL = ll;
  var pl = (e, t) => t;
  j.rotr32H = pl;
  var bl = (e, t) => e;
  j.rotr32L = bl;
  var yl = (e, t, r) => (e << r) | (t >>> (32 - r));
  j.rotlSH = yl;
  var vl = (e, t, r) => (t << r) | (e >>> (32 - r));
  j.rotlSL = vl;
  var gl = (e, t, r) => (t << (r - 32)) | (e >>> (64 - r));
  j.rotlBH = gl;
  var ml = (e, t, r) => (e << (r - 32)) | (t >>> (64 - r));
  j.rotlBL = ml;
  function wl(e, t, r, n) {
    let i = (t >>> 0) + (n >>> 0);
    return { h: (e + r + ((i / 2 ** 32) | 0)) | 0, l: i | 0 };
  }
  var _l = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0);
  j.add3L = _l;
  var Sl = (e, t, r, n) => (t + r + n + ((e / 2 ** 32) | 0)) | 0;
  j.add3H = Sl;
  var xl = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0);
  j.add4L = xl;
  var El = (e, t, r, n, i) => (t + r + n + i + ((e / 2 ** 32) | 0)) | 0;
  j.add4H = El;
  var Al = (e, t, r, n, i) =>
    (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0);
  j.add5L = Al;
  var Il = (e, t, r, n, i, s) => (t + r + n + i + s + ((e / 2 ** 32) | 0)) | 0;
  j.add5H = Il;
  var b8 = {
    fromBig: rc,
    split: ol,
    toBig: fl,
    shrSH: al,
    shrSL: cl,
    rotrSH: ul,
    rotrSL: dl,
    rotrBH: hl,
    rotrBL: ll,
    rotr32H: pl,
    rotr32L: bl,
    rotlSH: yl,
    rotlSL: vl,
    rotlBH: gl,
    rotlBL: ml,
    add: wl,
    add3L: _l,
    add3H: Sl,
    add4L: xl,
    add4H: El,
    add5H: Il,
    add5L: Al,
  };
  j.default = b8;
});
var Ml = _((ae) => {
  "use strict";
  Object.defineProperty(ae, "__esModule", { value: !0 });
  ae.sha512_224 =
    ae.sha512_256 =
    ae.sha384 =
    ae.sha512 =
    ae.sha224 =
    ae.sha256 =
    ae.SHA512_256 =
    ae.SHA512_224 =
    ae.SHA384 =
    ae.SHA512 =
    ae.SHA224 =
    ae.SHA256 =
      void 0;
  var U = Za(),
    W = Tl(),
    rt = po(),
    y8 = Uint32Array.from([
      1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
      2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
      1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
      264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
      2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
      113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
      1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
      3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
      430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
      1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
      2428436474, 2756734187, 3204031479, 3329325298,
    ]),
    un = new Uint32Array(64),
    is = class extends U.HashMD {
      constructor(t = 32) {
        (super(64, t, 8, !1),
          (this.A = U.SHA256_IV[0] | 0),
          (this.B = U.SHA256_IV[1] | 0),
          (this.C = U.SHA256_IV[2] | 0),
          (this.D = U.SHA256_IV[3] | 0),
          (this.E = U.SHA256_IV[4] | 0),
          (this.F = U.SHA256_IV[5] | 0),
          (this.G = U.SHA256_IV[6] | 0),
          (this.H = U.SHA256_IV[7] | 0));
      }
      get() {
        let { A: t, B: r, C: n, D: i, E: s, F: o, G: f, H: u } = this;
        return [t, r, n, i, s, o, f, u];
      }
      set(t, r, n, i, s, o, f, u) {
        ((this.A = t | 0),
          (this.B = r | 0),
          (this.C = n | 0),
          (this.D = i | 0),
          (this.E = s | 0),
          (this.F = o | 0),
          (this.G = f | 0),
          (this.H = u | 0));
      }
      process(t, r) {
        for (let h = 0; h < 16; h++, r += 4) un[h] = t.getUint32(r, !1);
        for (let h = 16; h < 64; h++) {
          let w = un[h - 15],
            E = un[h - 2],
            A = (0, rt.rotr)(w, 7) ^ (0, rt.rotr)(w, 18) ^ (w >>> 3),
            T = (0, rt.rotr)(E, 17) ^ (0, rt.rotr)(E, 19) ^ (E >>> 10);
          un[h] = (T + un[h - 7] + A + un[h - 16]) | 0;
        }
        let { A: n, B: i, C: s, D: o, E: f, F: u, G: l, H: p } = this;
        for (let h = 0; h < 64; h++) {
          let w =
              (0, rt.rotr)(f, 6) ^ (0, rt.rotr)(f, 11) ^ (0, rt.rotr)(f, 25),
            E = (p + w + (0, U.Chi)(f, u, l) + y8[h] + un[h]) | 0,
            T =
              (((0, rt.rotr)(n, 2) ^
                (0, rt.rotr)(n, 13) ^
                (0, rt.rotr)(n, 22)) +
                (0, U.Maj)(n, i, s)) |
              0;
          ((p = l),
            (l = u),
            (u = f),
            (f = (o + E) | 0),
            (o = s),
            (s = i),
            (i = n),
            (n = (E + T) | 0));
        }
        ((n = (n + this.A) | 0),
          (i = (i + this.B) | 0),
          (s = (s + this.C) | 0),
          (o = (o + this.D) | 0),
          (f = (f + this.E) | 0),
          (u = (u + this.F) | 0),
          (l = (l + this.G) | 0),
          (p = (p + this.H) | 0),
          this.set(n, i, s, o, f, u, l, p));
      }
      roundClean() {
        (0, rt.clean)(un);
      }
      destroy() {
        (this.set(0, 0, 0, 0, 0, 0, 0, 0), (0, rt.clean)(this.buffer));
      }
    };
  ae.SHA256 = is;
  var _o = class extends is {
    constructor() {
      (super(28),
        (this.A = U.SHA224_IV[0] | 0),
        (this.B = U.SHA224_IV[1] | 0),
        (this.C = U.SHA224_IV[2] | 0),
        (this.D = U.SHA224_IV[3] | 0),
        (this.E = U.SHA224_IV[4] | 0),
        (this.F = U.SHA224_IV[5] | 0),
        (this.G = U.SHA224_IV[6] | 0),
        (this.H = U.SHA224_IV[7] | 0));
    }
  };
  ae.SHA224 = _o;
  var Pl = W.split(
      [
        "0x428a2f98d728ae22",
        "0x7137449123ef65cd",
        "0xb5c0fbcfec4d3b2f",
        "0xe9b5dba58189dbbc",
        "0x3956c25bf348b538",
        "0x59f111f1b605d019",
        "0x923f82a4af194f9b",
        "0xab1c5ed5da6d8118",
        "0xd807aa98a3030242",
        "0x12835b0145706fbe",
        "0x243185be4ee4b28c",
        "0x550c7dc3d5ffb4e2",
        "0x72be5d74f27b896f",
        "0x80deb1fe3b1696b1",
        "0x9bdc06a725c71235",
        "0xc19bf174cf692694",
        "0xe49b69c19ef14ad2",
        "0xefbe4786384f25e3",
        "0x0fc19dc68b8cd5b5",
        "0x240ca1cc77ac9c65",
        "0x2de92c6f592b0275",
        "0x4a7484aa6ea6e483",
        "0x5cb0a9dcbd41fbd4",
        "0x76f988da831153b5",
        "0x983e5152ee66dfab",
        "0xa831c66d2db43210",
        "0xb00327c898fb213f",
        "0xbf597fc7beef0ee4",
        "0xc6e00bf33da88fc2",
        "0xd5a79147930aa725",
        "0x06ca6351e003826f",
        "0x142929670a0e6e70",
        "0x27b70a8546d22ffc",
        "0x2e1b21385c26c926",
        "0x4d2c6dfc5ac42aed",
        "0x53380d139d95b3df",
        "0x650a73548baf63de",
        "0x766a0abb3c77b2a8",
        "0x81c2c92e47edaee6",
        "0x92722c851482353b",
        "0xa2bfe8a14cf10364",
        "0xa81a664bbc423001",
        "0xc24b8b70d0f89791",
        "0xc76c51a30654be30",
        "0xd192e819d6ef5218",
        "0xd69906245565a910",
        "0xf40e35855771202a",
        "0x106aa07032bbd1b8",
        "0x19a4c116b8d2d0c8",
        "0x1e376c085141ab53",
        "0x2748774cdf8eeb99",
        "0x34b0bcb5e19b48a8",
        "0x391c0cb3c5c95a63",
        "0x4ed8aa4ae3418acb",
        "0x5b9cca4f7763e373",
        "0x682e6ff3d6b2b8a3",
        "0x748f82ee5defb2fc",
        "0x78a5636f43172f60",
        "0x84c87814a1f0ab72",
        "0x8cc702081a6439ec",
        "0x90befffa23631e28",
        "0xa4506cebde82bde9",
        "0xbef9a3f7b2c67915",
        "0xc67178f2e372532b",
        "0xca273eceea26619c",
        "0xd186b8c721c0c207",
        "0xeada7dd6cde0eb1e",
        "0xf57d4f7fee6ed178",
        "0x06f067aa72176fba",
        "0x0a637dc5a2c898a6",
        "0x113f9804bef90dae",
        "0x1b710b35131c471b",
        "0x28db77f523047d84",
        "0x32caab7b40c72493",
        "0x3c9ebe0a15c9bebc",
        "0x431d67c49c100d4c",
        "0x4cc5d4becb3e42b6",
        "0x597f299cfc657e2a",
        "0x5fcb6fab3ad6faec",
        "0x6c44198c4a475817",
      ].map((e) => BigInt(e)),
    ),
    v8 = Pl[0],
    g8 = Pl[1],
    dn = new Uint32Array(80),
    hn = new Uint32Array(80),
    Bn = class extends U.HashMD {
      constructor(t = 64) {
        (super(128, t, 16, !1),
          (this.Ah = U.SHA512_IV[0] | 0),
          (this.Al = U.SHA512_IV[1] | 0),
          (this.Bh = U.SHA512_IV[2] | 0),
          (this.Bl = U.SHA512_IV[3] | 0),
          (this.Ch = U.SHA512_IV[4] | 0),
          (this.Cl = U.SHA512_IV[5] | 0),
          (this.Dh = U.SHA512_IV[6] | 0),
          (this.Dl = U.SHA512_IV[7] | 0),
          (this.Eh = U.SHA512_IV[8] | 0),
          (this.El = U.SHA512_IV[9] | 0),
          (this.Fh = U.SHA512_IV[10] | 0),
          (this.Fl = U.SHA512_IV[11] | 0),
          (this.Gh = U.SHA512_IV[12] | 0),
          (this.Gl = U.SHA512_IV[13] | 0),
          (this.Hh = U.SHA512_IV[14] | 0),
          (this.Hl = U.SHA512_IV[15] | 0));
      }
      get() {
        let {
          Ah: t,
          Al: r,
          Bh: n,
          Bl: i,
          Ch: s,
          Cl: o,
          Dh: f,
          Dl: u,
          Eh: l,
          El: p,
          Fh: h,
          Fl: w,
          Gh: E,
          Gl: A,
          Hh: T,
          Hl: O,
        } = this;
        return [t, r, n, i, s, o, f, u, l, p, h, w, E, A, T, O];
      }
      set(t, r, n, i, s, o, f, u, l, p, h, w, E, A, T, O) {
        ((this.Ah = t | 0),
          (this.Al = r | 0),
          (this.Bh = n | 0),
          (this.Bl = i | 0),
          (this.Ch = s | 0),
          (this.Cl = o | 0),
          (this.Dh = f | 0),
          (this.Dl = u | 0),
          (this.Eh = l | 0),
          (this.El = p | 0),
          (this.Fh = h | 0),
          (this.Fl = w | 0),
          (this.Gh = E | 0),
          (this.Gl = A | 0),
          (this.Hh = T | 0),
          (this.Hl = O | 0));
      }
      process(t, r) {
        for (let P = 0; P < 16; P++, r += 4)
          ((dn[P] = t.getUint32(r)), (hn[P] = t.getUint32((r += 4))));
        for (let P = 16; P < 80; P++) {
          let M = dn[P - 15] | 0,
            B = hn[P - 15] | 0,
            F = W.rotrSH(M, B, 1) ^ W.rotrSH(M, B, 8) ^ W.shrSH(M, B, 7),
            z = W.rotrSL(M, B, 1) ^ W.rotrSL(M, B, 8) ^ W.shrSL(M, B, 7),
            K = dn[P - 2] | 0,
            Z = hn[P - 2] | 0,
            S = W.rotrSH(K, Z, 19) ^ W.rotrBH(K, Z, 61) ^ W.shrSH(K, Z, 6),
            a = W.rotrSL(K, Z, 19) ^ W.rotrBL(K, Z, 61) ^ W.shrSL(K, Z, 6),
            d = W.add4L(z, a, hn[P - 7], hn[P - 16]),
            b = W.add4H(d, F, S, dn[P - 7], dn[P - 16]);
          ((dn[P] = b | 0), (hn[P] = d | 0));
        }
        let {
          Ah: n,
          Al: i,
          Bh: s,
          Bl: o,
          Ch: f,
          Cl: u,
          Dh: l,
          Dl: p,
          Eh: h,
          El: w,
          Fh: E,
          Fl: A,
          Gh: T,
          Gl: O,
          Hh: k,
          Hl: H,
        } = this;
        for (let P = 0; P < 80; P++) {
          let M = W.rotrSH(h, w, 14) ^ W.rotrSH(h, w, 18) ^ W.rotrBH(h, w, 41),
            B = W.rotrSL(h, w, 14) ^ W.rotrSL(h, w, 18) ^ W.rotrBL(h, w, 41),
            F = (h & E) ^ (~h & T),
            z = (w & A) ^ (~w & O),
            K = W.add5L(H, B, z, g8[P], hn[P]),
            Z = W.add5H(K, k, M, F, v8[P], dn[P]),
            S = K | 0,
            a = W.rotrSH(n, i, 28) ^ W.rotrBH(n, i, 34) ^ W.rotrBH(n, i, 39),
            d = W.rotrSL(n, i, 28) ^ W.rotrBL(n, i, 34) ^ W.rotrBL(n, i, 39),
            b = (n & s) ^ (n & f) ^ (s & f),
            y = (i & o) ^ (i & u) ^ (o & u);
          ((k = T | 0),
            (H = O | 0),
            (T = E | 0),
            (O = A | 0),
            (E = h | 0),
            (A = w | 0),
            ({ h, l: w } = W.add(l | 0, p | 0, Z | 0, S | 0)),
            (l = f | 0),
            (p = u | 0),
            (f = s | 0),
            (u = o | 0),
            (s = n | 0),
            (o = i | 0));
          let g = W.add3L(S, d, y);
          ((n = W.add3H(g, Z, a, b)), (i = g | 0));
        }
        (({ h: n, l: i } = W.add(this.Ah | 0, this.Al | 0, n | 0, i | 0)),
          ({ h: s, l: o } = W.add(this.Bh | 0, this.Bl | 0, s | 0, o | 0)),
          ({ h: f, l: u } = W.add(this.Ch | 0, this.Cl | 0, f | 0, u | 0)),
          ({ h: l, l: p } = W.add(this.Dh | 0, this.Dl | 0, l | 0, p | 0)),
          ({ h, l: w } = W.add(this.Eh | 0, this.El | 0, h | 0, w | 0)),
          ({ h: E, l: A } = W.add(this.Fh | 0, this.Fl | 0, E | 0, A | 0)),
          ({ h: T, l: O } = W.add(this.Gh | 0, this.Gl | 0, T | 0, O | 0)),
          ({ h: k, l: H } = W.add(this.Hh | 0, this.Hl | 0, k | 0, H | 0)),
          this.set(n, i, s, o, f, u, l, p, h, w, E, A, T, O, k, H));
      }
      roundClean() {
        (0, rt.clean)(dn, hn);
      }
      destroy() {
        ((0, rt.clean)(this.buffer),
          this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
      }
    };
  ae.SHA512 = Bn;
  var So = class extends Bn {
    constructor() {
      (super(48),
        (this.Ah = U.SHA384_IV[0] | 0),
        (this.Al = U.SHA384_IV[1] | 0),
        (this.Bh = U.SHA384_IV[2] | 0),
        (this.Bl = U.SHA384_IV[3] | 0),
        (this.Ch = U.SHA384_IV[4] | 0),
        (this.Cl = U.SHA384_IV[5] | 0),
        (this.Dh = U.SHA384_IV[6] | 0),
        (this.Dl = U.SHA384_IV[7] | 0),
        (this.Eh = U.SHA384_IV[8] | 0),
        (this.El = U.SHA384_IV[9] | 0),
        (this.Fh = U.SHA384_IV[10] | 0),
        (this.Fl = U.SHA384_IV[11] | 0),
        (this.Gh = U.SHA384_IV[12] | 0),
        (this.Gl = U.SHA384_IV[13] | 0),
        (this.Hh = U.SHA384_IV[14] | 0),
        (this.Hl = U.SHA384_IV[15] | 0));
    }
  };
  ae.SHA384 = So;
  var St = Uint32Array.from([
      2352822216, 424955298, 1944164710, 2312950998, 502970286, 855612546,
      1738396948, 1479516111, 258812777, 2077511080, 2011393907, 79989058,
      1067287976, 1780299464, 286451373, 2446758561,
    ]),
    xt = Uint32Array.from([
      573645204, 4230739756, 2673172387, 3360449730, 596883563, 1867755857,
      2520282905, 1497426621, 2519219938, 2827943907, 3193839141, 1401305490,
      721525244, 746961066, 246885852, 2177182882,
    ]),
    xo = class extends Bn {
      constructor() {
        (super(28),
          (this.Ah = St[0] | 0),
          (this.Al = St[1] | 0),
          (this.Bh = St[2] | 0),
          (this.Bl = St[3] | 0),
          (this.Ch = St[4] | 0),
          (this.Cl = St[5] | 0),
          (this.Dh = St[6] | 0),
          (this.Dl = St[7] | 0),
          (this.Eh = St[8] | 0),
          (this.El = St[9] | 0),
          (this.Fh = St[10] | 0),
          (this.Fl = St[11] | 0),
          (this.Gh = St[12] | 0),
          (this.Gl = St[13] | 0),
          (this.Hh = St[14] | 0),
          (this.Hl = St[15] | 0));
      }
    };
  ae.SHA512_224 = xo;
  var Eo = class extends Bn {
    constructor() {
      (super(32),
        (this.Ah = xt[0] | 0),
        (this.Al = xt[1] | 0),
        (this.Bh = xt[2] | 0),
        (this.Bl = xt[3] | 0),
        (this.Ch = xt[4] | 0),
        (this.Cl = xt[5] | 0),
        (this.Dh = xt[6] | 0),
        (this.Dl = xt[7] | 0),
        (this.Eh = xt[8] | 0),
        (this.El = xt[9] | 0),
        (this.Fh = xt[10] | 0),
        (this.Fl = xt[11] | 0),
        (this.Gh = xt[12] | 0),
        (this.Gl = xt[13] | 0),
        (this.Hh = xt[14] | 0),
        (this.Hl = xt[15] | 0));
    }
  };
  ae.SHA512_256 = Eo;
  ae.sha256 = (0, rt.createHasher)(() => new is());
  ae.sha224 = (0, rt.createHasher)(() => new _o());
  ae.sha512 = (0, rt.createHasher)(() => new Bn());
  ae.sha384 = (0, rt.createHasher)(() => new So());
  ae.sha512_256 = (0, rt.createHasher)(() => new Eo());
  ae.sha512_224 = (0, rt.createHasher)(() => new xo());
});
var nc = _((_r) => {
  "use strict";
  Object.defineProperty(_r, "__esModule", { value: !0 });
  _r.sha224 = _r.SHA224 = _r.sha256 = _r.SHA256 = void 0;
  var Ao = Ml();
  _r.SHA256 = Ao.SHA256;
  _r.sha256 = Ao.sha256;
  _r.SHA224 = Ao.SHA224;
  _r.sha224 = Ao.sha224;
});
var Sr = _((st) => {
  "use strict";
  Object.defineProperty(st, "__esModule", { value: !0 });
  st.taggedHash =
    st.TAGGED_HASH_PREFIXES =
    st.TAGS =
    st.hash256 =
    st.hash160 =
    st.sha256 =
    st.sha1 =
    st.ripemd160 =
      void 0;
  var Ol = nl(),
    m8 = sl(),
    Io = nc();
  function w8(e) {
    return Buffer.from((0, Ol.ripemd160)(Uint8Array.from(e)));
  }
  st.ripemd160 = w8;
  function _8(e) {
    return Buffer.from((0, m8.sha1)(Uint8Array.from(e)));
  }
  st.sha1 = _8;
  function kl(e) {
    return Buffer.from((0, Io.sha256)(Uint8Array.from(e)));
  }
  st.sha256 = kl;
  function S8(e) {
    return Buffer.from((0, Ol.ripemd160)((0, Io.sha256)(Uint8Array.from(e))));
  }
  st.hash160 = S8;
  function x8(e) {
    return Buffer.from((0, Io.sha256)((0, Io.sha256)(Uint8Array.from(e))));
  }
  st.hash256 = x8;
  st.TAGS = [
    "BIP0340/challenge",
    "BIP0340/aux",
    "BIP0340/nonce",
    "TapLeaf",
    "TapBranch",
    "TapSighash",
    "TapTweak",
    "KeyAgg list",
    "KeyAgg coefficient",
  ];
  st.TAGGED_HASH_PREFIXES = {
    "BIP0340/challenge": Buffer.from([
      123, 181, 45, 122, 159, 239, 88, 50, 62, 177, 191, 122, 64, 125, 179, 130,
      210, 243, 242, 216, 27, 177, 34, 79, 73, 254, 81, 143, 109, 72, 211, 124,
      123, 181, 45, 122, 159, 239, 88, 50, 62, 177, 191, 122, 64, 125, 179, 130,
      210, 243, 242, 216, 27, 177, 34, 79, 73, 254, 81, 143, 109, 72, 211, 124,
    ]),
    "BIP0340/aux": Buffer.from([
      241, 239, 78, 94, 192, 99, 202, 218, 109, 148, 202, 250, 157, 152, 126,
      160, 105, 38, 88, 57, 236, 193, 31, 151, 45, 119, 165, 46, 216, 193, 204,
      144, 241, 239, 78, 94, 192, 99, 202, 218, 109, 148, 202, 250, 157, 152,
      126, 160, 105, 38, 88, 57, 236, 193, 31, 151, 45, 119, 165, 46, 216, 193,
      204, 144,
    ]),
    "BIP0340/nonce": Buffer.from([
      7, 73, 119, 52, 167, 155, 203, 53, 91, 155, 140, 125, 3, 79, 18, 28, 244,
      52, 215, 62, 247, 45, 218, 25, 135, 0, 97, 251, 82, 191, 235, 47, 7, 73,
      119, 52, 167, 155, 203, 53, 91, 155, 140, 125, 3, 79, 18, 28, 244, 52,
      215, 62, 247, 45, 218, 25, 135, 0, 97, 251, 82, 191, 235, 47,
    ]),
    TapLeaf: Buffer.from([
      174, 234, 143, 220, 66, 8, 152, 49, 5, 115, 75, 88, 8, 29, 30, 38, 56,
      211, 95, 28, 181, 64, 8, 212, 211, 87, 202, 3, 190, 120, 233, 238, 174,
      234, 143, 220, 66, 8, 152, 49, 5, 115, 75, 88, 8, 29, 30, 38, 56, 211, 95,
      28, 181, 64, 8, 212, 211, 87, 202, 3, 190, 120, 233, 238,
    ]),
    TapBranch: Buffer.from([
      25, 65, 161, 242, 229, 110, 185, 95, 162, 169, 241, 148, 190, 92, 1, 247,
      33, 111, 51, 237, 130, 176, 145, 70, 52, 144, 208, 91, 245, 22, 160, 21,
      25, 65, 161, 242, 229, 110, 185, 95, 162, 169, 241, 148, 190, 92, 1, 247,
      33, 111, 51, 237, 130, 176, 145, 70, 52, 144, 208, 91, 245, 22, 160, 21,
    ]),
    TapSighash: Buffer.from([
      244, 10, 72, 223, 75, 42, 112, 200, 180, 146, 75, 242, 101, 70, 97, 237,
      61, 149, 253, 102, 163, 19, 235, 135, 35, 117, 151, 198, 40, 228, 160, 49,
      244, 10, 72, 223, 75, 42, 112, 200, 180, 146, 75, 242, 101, 70, 97, 237,
      61, 149, 253, 102, 163, 19, 235, 135, 35, 117, 151, 198, 40, 228, 160, 49,
    ]),
    TapTweak: Buffer.from([
      232, 15, 225, 99, 156, 156, 160, 80, 227, 175, 27, 57, 193, 67, 198, 62,
      66, 156, 188, 235, 21, 217, 64, 251, 181, 197, 161, 244, 175, 87, 197,
      233, 232, 15, 225, 99, 156, 156, 160, 80, 227, 175, 27, 57, 193, 67, 198,
      62, 66, 156, 188, 235, 21, 217, 64, 251, 181, 197, 161, 244, 175, 87, 197,
      233,
    ]),
    "KeyAgg list": Buffer.from([
      72, 28, 151, 28, 60, 11, 70, 215, 240, 178, 117, 174, 89, 141, 78, 44,
      126, 215, 49, 156, 89, 74, 92, 110, 199, 158, 160, 212, 153, 2, 148, 240,
      72, 28, 151, 28, 60, 11, 70, 215, 240, 178, 117, 174, 89, 141, 78, 44,
      126, 215, 49, 156, 89, 74, 92, 110, 199, 158, 160, 212, 153, 2, 148, 240,
    ]),
    "KeyAgg coefficient": Buffer.from([
      191, 201, 4, 3, 77, 28, 136, 232, 200, 14, 34, 229, 61, 36, 86, 109, 100,
      130, 78, 214, 66, 114, 129, 192, 145, 0, 249, 77, 205, 82, 201, 129, 191,
      201, 4, 3, 77, 28, 136, 232, 200, 14, 34, 229, 61, 36, 86, 109, 100, 130,
      78, 214, 66, 114, 129, 192, 145, 0, 249, 77, 205, 82, 201, 129,
    ]),
  };
  function E8(e, t) {
    return kl(Buffer.concat([st.TAGGED_HASH_PREFIXES[e], t]));
  }
  st.taggedHash = E8;
});
var ql = _((VP, Bl) => {
  "use strict";
  function A8(e) {
    if (e.length >= 255) throw new TypeError("Alphabet too long");
    for (var t = new Uint8Array(256), r = 0; r < t.length; r++) t[r] = 255;
    for (var n = 0; n < e.length; n++) {
      var i = e.charAt(n),
        s = i.charCodeAt(0);
      if (t[s] !== 255) throw new TypeError(i + " is ambiguous");
      t[s] = n;
    }
    var o = e.length,
      f = e.charAt(0),
      u = Math.log(o) / Math.log(256),
      l = Math.log(256) / Math.log(o);
    function p(E) {
      if (
        (E instanceof Uint8Array ||
          (ArrayBuffer.isView(E)
            ? (E = new Uint8Array(E.buffer, E.byteOffset, E.byteLength))
            : Array.isArray(E) && (E = Uint8Array.from(E))),
        !(E instanceof Uint8Array))
      )
        throw new TypeError("Expected Uint8Array");
      if (E.length === 0) return "";
      for (var A = 0, T = 0, O = 0, k = E.length; O !== k && E[O] === 0; )
        (O++, A++);
      for (var H = ((k - O) * l + 1) >>> 0, P = new Uint8Array(H); O !== k; ) {
        for (
          var M = E[O], B = 0, F = H - 1;
          (M !== 0 || B < T) && F !== -1;
          F--, B++
        )
          ((M += (256 * P[F]) >>> 0),
            (P[F] = M % o >>> 0),
            (M = (M / o) >>> 0));
        if (M !== 0) throw new Error("Non-zero carry");
        ((T = B), O++);
      }
      for (var z = H - T; z !== H && P[z] === 0; ) z++;
      for (var K = f.repeat(A); z < H; ++z) K += e.charAt(P[z]);
      return K;
    }
    function h(E) {
      if (typeof E != "string") throw new TypeError("Expected String");
      if (E.length === 0) return new Uint8Array();
      for (var A = 0, T = 0, O = 0; E[A] === f; ) (T++, A++);
      for (
        var k = ((E.length - A) * u + 1) >>> 0, H = new Uint8Array(k);
        E[A];

      ) {
        var P = E.charCodeAt(A);
        if (P > 255) return;
        var M = t[P];
        if (M === 255) return;
        for (var B = 0, F = k - 1; (M !== 0 || B < O) && F !== -1; F--, B++)
          ((M += (o * H[F]) >>> 0),
            (H[F] = M % 256 >>> 0),
            (M = (M / 256) >>> 0));
        if (M !== 0) throw new Error("Non-zero carry");
        ((O = B), A++);
      }
      for (var z = k - O; z !== k && H[z] === 0; ) z++;
      for (var K = new Uint8Array(T + (k - z)), Z = T; z !== k; )
        K[Z++] = H[z++];
      return K;
    }
    function w(E) {
      var A = h(E);
      if (A) return A;
      throw new Error("Non-base" + o + " character");
    }
    return { encode: p, decodeUnsafe: h, decode: w };
  }
  Bl.exports = A8;
});
var Nl = _((WP, Hl) => {
  var I8 = ql(),
    T8 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  Hl.exports = I8(T8);
});
var Cl = _((zP, Rl) => {
  "use strict";
  var ic = Nl();
  Rl.exports = function (e) {
    function t(s) {
      var o = Uint8Array.from(s),
        f = e(o),
        u = o.length + 4,
        l = new Uint8Array(u);
      return (l.set(o, 0), l.set(f.subarray(0, 4), o.length), ic.encode(l, u));
    }
    function r(s) {
      var o = s.slice(0, -4),
        f = s.slice(-4),
        u = e(o);
      if (!((f[0] ^ u[0]) | (f[1] ^ u[1]) | (f[2] ^ u[2]) | (f[3] ^ u[3])))
        return o;
    }
    function n(s) {
      var o = ic.decodeUnsafe(s);
      if (o) return r(o);
    }
    function i(s) {
      var o = ic.decode(s),
        f = r(o, e);
      if (!f) throw new Error("Invalid checksum");
      return f;
    }
    return { encode: t, decode: i, decodeUnsafe: n };
  };
});
var To = _((GP, Ll) => {
  "use strict";
  var { sha256: Ul } = nc(),
    P8 = Cl();
  function M8(e) {
    return Ul(Ul(e));
  }
  Ll.exports = P8(M8);
});
var Kl = _((Po) => {
  "use strict";
  Object.defineProperty(Po, "__esModule", { value: !0 });
  Po.p2pkh = void 0;
  var sc = Sr(),
    O8 = zt(),
    Ti = _t(),
    Mt = yt(),
    Kr = Lr(),
    Fl = To(),
    ln = Ti.OPS;
  function k8(e, t) {
    if (!e.address && !e.hash && !e.output && !e.pubkey && !e.input)
      throw new TypeError("Not enough data");
    ((t = Object.assign({ validate: !0 }, t || {})),
      (0, Mt.typeforce)(
        {
          network: Mt.typeforce.maybe(Mt.typeforce.Object),
          address: Mt.typeforce.maybe(Mt.typeforce.String),
          hash: Mt.typeforce.maybe(Mt.typeforce.BufferN(20)),
          output: Mt.typeforce.maybe(Mt.typeforce.BufferN(25)),
          pubkey: Mt.typeforce.maybe(Mt.isPoint),
          signature: Mt.typeforce.maybe(Ti.isCanonicalScriptSignature),
          input: Mt.typeforce.maybe(Mt.typeforce.Buffer),
        },
        e,
      ));
    let r = Kr.value(() => {
        let o = Buffer.from(Fl.decode(e.address)),
          f = o.readUInt8(0),
          u = o.slice(1);
        return { version: f, hash: u };
      }),
      n = Kr.value(() => Ti.decompile(e.input)),
      i = e.network || O8.bitcoin,
      s = { name: "p2pkh", network: i };
    if (
      (Kr.prop(s, "address", () => {
        if (!s.hash) return;
        let o = Buffer.allocUnsafe(21);
        return (o.writeUInt8(i.pubKeyHash, 0), s.hash.copy(o, 1), Fl.encode(o));
      }),
      Kr.prop(s, "hash", () => {
        if (e.output) return e.output.slice(3, 23);
        if (e.address) return r().hash;
        if (e.pubkey || s.pubkey) return sc.hash160(e.pubkey || s.pubkey);
      }),
      Kr.prop(s, "output", () => {
        if (s.hash)
          return Ti.compile([
            ln.OP_DUP,
            ln.OP_HASH160,
            s.hash,
            ln.OP_EQUALVERIFY,
            ln.OP_CHECKSIG,
          ]);
      }),
      Kr.prop(s, "pubkey", () => {
        if (e.input) return n()[1];
      }),
      Kr.prop(s, "signature", () => {
        if (e.input) return n()[0];
      }),
      Kr.prop(s, "input", () => {
        if (e.pubkey && e.signature) return Ti.compile([e.signature, e.pubkey]);
      }),
      Kr.prop(s, "witness", () => {
        if (s.input) return [];
      }),
      t.validate)
    ) {
      let o = Buffer.from([]);
      if (e.address) {
        if (r().version !== i.pubKeyHash)
          throw new TypeError("Invalid version or Network mismatch");
        if (r().hash.length !== 20) throw new TypeError("Invalid address");
        o = r().hash;
      }
      if (e.hash) {
        if (o.length > 0 && !o.equals(e.hash))
          throw new TypeError("Hash mismatch");
        o = e.hash;
      }
      if (e.output) {
        if (
          e.output.length !== 25 ||
          e.output[0] !== ln.OP_DUP ||
          e.output[1] !== ln.OP_HASH160 ||
          e.output[2] !== 20 ||
          e.output[23] !== ln.OP_EQUALVERIFY ||
          e.output[24] !== ln.OP_CHECKSIG
        )
          throw new TypeError("Output is invalid");
        let f = e.output.slice(3, 23);
        if (o.length > 0 && !o.equals(f)) throw new TypeError("Hash mismatch");
        o = f;
      }
      if (e.pubkey) {
        let f = sc.hash160(e.pubkey);
        if (o.length > 0 && !o.equals(f)) throw new TypeError("Hash mismatch");
        o = f;
      }
      if (e.input) {
        let f = n();
        if (f.length !== 2) throw new TypeError("Input is invalid");
        if (!Ti.isCanonicalScriptSignature(f[0]))
          throw new TypeError("Input has invalid signature");
        if (!(0, Mt.isPoint)(f[1]))
          throw new TypeError("Input has invalid pubkey");
        if (e.signature && !e.signature.equals(f[0]))
          throw new TypeError("Signature mismatch");
        if (e.pubkey && !e.pubkey.equals(f[1]))
          throw new TypeError("Pubkey mismatch");
        let u = sc.hash160(f[1]);
        if (o.length > 0 && !o.equals(u)) throw new TypeError("Hash mismatch");
      }
    }
    return Object.assign(s, e);
  }
  Po.p2pkh = k8;
});
var Vl = _((Mo) => {
  "use strict";
  Object.defineProperty(Mo, "__esModule", { value: !0 });
  Mo.p2sh = void 0;
  var jl = Sr(),
    B8 = zt(),
    Er = _t(),
    he = yt(),
    xr = Lr(),
    Dl = To(),
    ss = Er.OPS;
  function q8(e, t) {
    if (!e.address && !e.hash && !e.output && !e.redeem && !e.input)
      throw new TypeError("Not enough data");
    ((t = Object.assign({ validate: !0 }, t || {})),
      (0, he.typeforce)(
        {
          network: he.typeforce.maybe(he.typeforce.Object),
          address: he.typeforce.maybe(he.typeforce.String),
          hash: he.typeforce.maybe(he.typeforce.BufferN(20)),
          output: he.typeforce.maybe(he.typeforce.BufferN(23)),
          redeem: he.typeforce.maybe({
            network: he.typeforce.maybe(he.typeforce.Object),
            output: he.typeforce.maybe(he.typeforce.Buffer),
            input: he.typeforce.maybe(he.typeforce.Buffer),
            witness: he.typeforce.maybe(
              he.typeforce.arrayOf(he.typeforce.Buffer),
            ),
          }),
          input: he.typeforce.maybe(he.typeforce.Buffer),
          witness: he.typeforce.maybe(
            he.typeforce.arrayOf(he.typeforce.Buffer),
          ),
        },
        e,
      ));
    let r = e.network;
    r || (r = (e.redeem && e.redeem.network) || B8.bitcoin);
    let n = { network: r },
      i = xr.value(() => {
        let f = Buffer.from(Dl.decode(e.address)),
          u = f.readUInt8(0),
          l = f.slice(1);
        return { version: u, hash: l };
      }),
      s = xr.value(() => Er.decompile(e.input)),
      o = xr.value(() => {
        let f = s(),
          u = f[f.length - 1];
        return {
          network: r,
          output: u === ss.OP_FALSE ? Buffer.from([]) : u,
          input: Er.compile(f.slice(0, -1)),
          witness: e.witness || [],
        };
      });
    if (
      (xr.prop(n, "address", () => {
        if (!n.hash) return;
        let f = Buffer.allocUnsafe(21);
        return (
          f.writeUInt8(n.network.scriptHash, 0),
          n.hash.copy(f, 1),
          Dl.encode(f)
        );
      }),
      xr.prop(n, "hash", () => {
        if (e.output) return e.output.slice(2, 22);
        if (e.address) return i().hash;
        if (n.redeem && n.redeem.output) return jl.hash160(n.redeem.output);
      }),
      xr.prop(n, "output", () => {
        if (n.hash) return Er.compile([ss.OP_HASH160, n.hash, ss.OP_EQUAL]);
      }),
      xr.prop(n, "redeem", () => {
        if (e.input) return o();
      }),
      xr.prop(n, "input", () => {
        if (!(!e.redeem || !e.redeem.input || !e.redeem.output))
          return Er.compile(
            [].concat(Er.decompile(e.redeem.input), e.redeem.output),
          );
      }),
      xr.prop(n, "witness", () => {
        if (n.redeem && n.redeem.witness) return n.redeem.witness;
        if (n.input) return [];
      }),
      xr.prop(n, "name", () => {
        let f = ["p2sh"];
        return (
          n.redeem !== void 0 &&
            n.redeem.name !== void 0 &&
            f.push(n.redeem.name),
          f.join("-")
        );
      }),
      t.validate)
    ) {
      let f = Buffer.from([]);
      if (e.address) {
        if (i().version !== r.scriptHash)
          throw new TypeError("Invalid version or Network mismatch");
        if (i().hash.length !== 20) throw new TypeError("Invalid address");
        f = i().hash;
      }
      if (e.hash) {
        if (f.length > 0 && !f.equals(e.hash))
          throw new TypeError("Hash mismatch");
        f = e.hash;
      }
      if (e.output) {
        if (
          e.output.length !== 23 ||
          e.output[0] !== ss.OP_HASH160 ||
          e.output[1] !== 20 ||
          e.output[22] !== ss.OP_EQUAL
        )
          throw new TypeError("Output is invalid");
        let l = e.output.slice(2, 22);
        if (f.length > 0 && !f.equals(l)) throw new TypeError("Hash mismatch");
        f = l;
      }
      let u = (l) => {
        if (l.output) {
          let p = Er.decompile(l.output);
          if (!p || p.length < 1)
            throw new TypeError("Redeem.output too short");
          if (l.output.byteLength > 520)
            throw new TypeError(
              "Redeem.output unspendable if larger than 520 bytes",
            );
          if (Er.countNonPushOnlyOPs(p) > 201)
            throw new TypeError(
              "Redeem.output unspendable with more than 201 non-push ops",
            );
          let h = jl.hash160(l.output);
          if (f.length > 0 && !f.equals(h))
            throw new TypeError("Hash mismatch");
          f = h;
        }
        if (l.input) {
          let p = l.input.length > 0,
            h = l.witness && l.witness.length > 0;
          if (!p && !h) throw new TypeError("Empty input");
          if (p && h) throw new TypeError("Input and witness provided");
          if (p) {
            let w = Er.decompile(l.input);
            if (!Er.isPushOnly(w))
              throw new TypeError("Non push-only scriptSig");
          }
        }
      };
      if (e.input) {
        let l = s();
        if (!l || l.length < 1) throw new TypeError("Input too short");
        if (!Buffer.isBuffer(o().output))
          throw new TypeError("Input is invalid");
        u(o());
      }
      if (e.redeem) {
        if (e.redeem.network && e.redeem.network !== r)
          throw new TypeError("Network mismatch");
        if (e.input) {
          let l = o();
          if (e.redeem.output && !e.redeem.output.equals(l.output))
            throw new TypeError("Redeem.output mismatch");
          if (e.redeem.input && !e.redeem.input.equals(l.input))
            throw new TypeError("Redeem.input mismatch");
        }
        u(e.redeem);
      }
      if (
        e.witness &&
        e.redeem &&
        e.redeem.witness &&
        !(0, he.stacksEqual)(e.redeem.witness, e.witness)
      )
        throw new TypeError("Witness and redeem.witness mismatch");
    }
    return Object.assign(n, e);
  }
  Mo.p2sh = q8;
});
var os = _((Mi) => {
  "use strict";
  Object.defineProperty(Mi, "__esModule", { value: !0 });
  Mi.bech32m = Mi.bech32 = void 0;
  var Oo = "qpzry9x8gf2tvdw0s3jn54khce6mua7l",
    zl = {};
  for (let e = 0; e < Oo.length; e++) {
    let t = Oo.charAt(e);
    zl[t] = e;
  }
  function Pi(e) {
    let t = e >> 25;
    return (
      ((e & 33554431) << 5) ^
      (-((t >> 0) & 1) & 996825010) ^
      (-((t >> 1) & 1) & 642813549) ^
      (-((t >> 2) & 1) & 513874426) ^
      (-((t >> 3) & 1) & 1027748829) ^
      (-((t >> 4) & 1) & 705979059)
    );
  }
  function Wl(e) {
    let t = 1;
    for (let r = 0; r < e.length; ++r) {
      let n = e.charCodeAt(r);
      if (n < 33 || n > 126) return "Invalid prefix (" + e + ")";
      t = Pi(t) ^ (n >> 5);
    }
    t = Pi(t);
    for (let r = 0; r < e.length; ++r) {
      let n = e.charCodeAt(r);
      t = Pi(t) ^ (n & 31);
    }
    return t;
  }
  function oc(e, t, r, n) {
    let i = 0,
      s = 0,
      o = (1 << r) - 1,
      f = [];
    for (let u = 0; u < e.length; ++u)
      for (i = (i << t) | e[u], s += t; s >= r; )
        ((s -= r), f.push((i >> s) & o));
    if (n) s > 0 && f.push((i << (r - s)) & o);
    else {
      if (s >= t) return "Excess padding";
      if ((i << (r - s)) & o) return "Non-zero padding";
    }
    return f;
  }
  function H8(e) {
    return oc(e, 8, 5, !0);
  }
  function N8(e) {
    let t = oc(e, 5, 8, !1);
    if (Array.isArray(t)) return t;
  }
  function R8(e) {
    let t = oc(e, 5, 8, !1);
    if (Array.isArray(t)) return t;
    throw new Error(t);
  }
  function Gl(e) {
    let t;
    e === "bech32" ? (t = 1) : (t = 734539939);
    function r(o, f, u) {
      if (((u = u || 90), o.length + 7 + f.length > u))
        throw new TypeError("Exceeds length limit");
      o = o.toLowerCase();
      let l = Wl(o);
      if (typeof l == "string") throw new Error(l);
      let p = o + "1";
      for (let h = 0; h < f.length; ++h) {
        let w = f[h];
        if (w >> 5 !== 0) throw new Error("Non 5-bit word");
        ((l = Pi(l) ^ w), (p += Oo.charAt(w)));
      }
      for (let h = 0; h < 6; ++h) l = Pi(l);
      l ^= t;
      for (let h = 0; h < 6; ++h) {
        let w = (l >> ((5 - h) * 5)) & 31;
        p += Oo.charAt(w);
      }
      return p;
    }
    function n(o, f) {
      if (((f = f || 90), o.length < 8)) return o + " too short";
      if (o.length > f) return "Exceeds length limit";
      let u = o.toLowerCase(),
        l = o.toUpperCase();
      if (o !== u && o !== l) return "Mixed-case string " + o;
      o = u;
      let p = o.lastIndexOf("1");
      if (p === -1) return "No separator character for " + o;
      if (p === 0) return "Missing prefix for " + o;
      let h = o.slice(0, p),
        w = o.slice(p + 1);
      if (w.length < 6) return "Data too short";
      let E = Wl(h);
      if (typeof E == "string") return E;
      let A = [];
      for (let T = 0; T < w.length; ++T) {
        let O = w.charAt(T),
          k = zl[O];
        if (k === void 0) return "Unknown character " + O;
        ((E = Pi(E) ^ k), !(T + 6 >= w.length) && A.push(k));
      }
      return E !== t ? "Invalid checksum for " + o : { prefix: h, words: A };
    }
    function i(o, f) {
      let u = n(o, f);
      if (typeof u == "object") return u;
    }
    function s(o, f) {
      let u = n(o, f);
      if (typeof u == "object") return u;
      throw new Error(u);
    }
    return {
      decodeUnsafe: i,
      decode: s,
      encode: r,
      toWords: H8,
      fromWordsUnsafe: N8,
      fromWords: R8,
    };
  }
  Mi.bech32 = Gl("bech32");
  Mi.bech32m = Gl("bech32m");
});
var Yl = _((qo) => {
  "use strict";
  Object.defineProperty(qo, "__esModule", { value: !0 });
  qo.p2wpkh = void 0;
  var fc = Sr(),
    C8 = zt(),
    Bo = _t(),
    ot = yt(),
    pn = Lr(),
    ko = os(),
    Xl = Bo.OPS,
    U8 = Buffer.alloc(0);
  function L8(e, t) {
    if (!e.address && !e.hash && !e.output && !e.pubkey && !e.witness)
      throw new TypeError("Not enough data");
    ((t = Object.assign({ validate: !0 }, t || {})),
      (0, ot.typeforce)(
        {
          address: ot.typeforce.maybe(ot.typeforce.String),
          hash: ot.typeforce.maybe(ot.typeforce.BufferN(20)),
          input: ot.typeforce.maybe(ot.typeforce.BufferN(0)),
          network: ot.typeforce.maybe(ot.typeforce.Object),
          output: ot.typeforce.maybe(ot.typeforce.BufferN(22)),
          pubkey: ot.typeforce.maybe(ot.isPoint),
          signature: ot.typeforce.maybe(Bo.isCanonicalScriptSignature),
          witness: ot.typeforce.maybe(
            ot.typeforce.arrayOf(ot.typeforce.Buffer),
          ),
        },
        e,
      ));
    let r = pn.value(() => {
        let s = ko.bech32.decode(e.address),
          o = s.words.shift(),
          f = ko.bech32.fromWords(s.words);
        return { version: o, prefix: s.prefix, data: Buffer.from(f) };
      }),
      n = e.network || C8.bitcoin,
      i = { name: "p2wpkh", network: n };
    if (
      (pn.prop(i, "address", () => {
        if (!i.hash) return;
        let s = ko.bech32.toWords(i.hash);
        return (s.unshift(0), ko.bech32.encode(n.bech32, s));
      }),
      pn.prop(i, "hash", () => {
        if (e.output) return e.output.slice(2, 22);
        if (e.address) return r().data;
        if (e.pubkey || i.pubkey) return fc.hash160(e.pubkey || i.pubkey);
      }),
      pn.prop(i, "output", () => {
        if (i.hash) return Bo.compile([Xl.OP_0, i.hash]);
      }),
      pn.prop(i, "pubkey", () => {
        if (e.pubkey) return e.pubkey;
        if (e.witness) return e.witness[1];
      }),
      pn.prop(i, "signature", () => {
        if (e.witness) return e.witness[0];
      }),
      pn.prop(i, "input", () => {
        if (i.witness) return U8;
      }),
      pn.prop(i, "witness", () => {
        if (e.pubkey && e.signature) return [e.signature, e.pubkey];
      }),
      t.validate)
    ) {
      let s = Buffer.from([]);
      if (e.address) {
        if (n && n.bech32 !== r().prefix)
          throw new TypeError("Invalid prefix or Network mismatch");
        if (r().version !== 0) throw new TypeError("Invalid address version");
        if (r().data.length !== 20) throw new TypeError("Invalid address data");
        s = r().data;
      }
      if (e.hash) {
        if (s.length > 0 && !s.equals(e.hash))
          throw new TypeError("Hash mismatch");
        s = e.hash;
      }
      if (e.output) {
        if (
          e.output.length !== 22 ||
          e.output[0] !== Xl.OP_0 ||
          e.output[1] !== 20
        )
          throw new TypeError("Output is invalid");
        if (s.length > 0 && !s.equals(e.output.slice(2)))
          throw new TypeError("Hash mismatch");
        s = e.output.slice(2);
      }
      if (e.pubkey) {
        let o = fc.hash160(e.pubkey);
        if (s.length > 0 && !s.equals(o)) throw new TypeError("Hash mismatch");
        if (((s = o), !(0, ot.isPoint)(e.pubkey) || e.pubkey.length !== 33))
          throw new TypeError("Invalid pubkey for p2wpkh");
      }
      if (e.witness) {
        if (e.witness.length !== 2) throw new TypeError("Witness is invalid");
        if (!Bo.isCanonicalScriptSignature(e.witness[0]))
          throw new TypeError("Witness has invalid signature");
        if (!(0, ot.isPoint)(e.witness[1]) || e.witness[1].length !== 33)
          throw new TypeError("Witness has invalid pubkey");
        if (e.signature && !e.signature.equals(e.witness[0]))
          throw new TypeError("Signature mismatch");
        if (e.pubkey && !e.pubkey.equals(e.witness[1]))
          throw new TypeError("Pubkey mismatch");
        let o = fc.hash160(e.witness[1]);
        if (s.length > 0 && !s.equals(o)) throw new TypeError("Hash mismatch");
      }
    }
    return Object.assign(i, e);
  }
  qo.p2wpkh = L8;
});
var Zl = _((Ro) => {
  "use strict";
  Object.defineProperty(Ro, "__esModule", { value: !0 });
  Ro.p2wsh = void 0;
  var $l = Sr(),
    F8 = zt(),
    Dr = _t(),
    ce = yt(),
    jr = Lr(),
    Ho = os(),
    Jl = Dr.OPS,
    ac = Buffer.alloc(0);
  function No(e) {
    return !!(
      Buffer.isBuffer(e) &&
      e.length === 65 &&
      e[0] === 4 &&
      (0, ce.isPoint)(e)
    );
  }
  function K8(e, t) {
    if (!e.address && !e.hash && !e.output && !e.redeem && !e.witness)
      throw new TypeError("Not enough data");
    ((t = Object.assign({ validate: !0 }, t || {})),
      (0, ce.typeforce)(
        {
          network: ce.typeforce.maybe(ce.typeforce.Object),
          address: ce.typeforce.maybe(ce.typeforce.String),
          hash: ce.typeforce.maybe(ce.typeforce.BufferN(32)),
          output: ce.typeforce.maybe(ce.typeforce.BufferN(34)),
          redeem: ce.typeforce.maybe({
            input: ce.typeforce.maybe(ce.typeforce.Buffer),
            network: ce.typeforce.maybe(ce.typeforce.Object),
            output: ce.typeforce.maybe(ce.typeforce.Buffer),
            witness: ce.typeforce.maybe(
              ce.typeforce.arrayOf(ce.typeforce.Buffer),
            ),
          }),
          input: ce.typeforce.maybe(ce.typeforce.BufferN(0)),
          witness: ce.typeforce.maybe(
            ce.typeforce.arrayOf(ce.typeforce.Buffer),
          ),
        },
        e,
      ));
    let r = jr.value(() => {
        let o = Ho.bech32.decode(e.address),
          f = o.words.shift(),
          u = Ho.bech32.fromWords(o.words);
        return { version: f, prefix: o.prefix, data: Buffer.from(u) };
      }),
      n = jr.value(() => Dr.decompile(e.redeem.input)),
      i = e.network;
    i || (i = (e.redeem && e.redeem.network) || F8.bitcoin);
    let s = { network: i };
    if (
      (jr.prop(s, "address", () => {
        if (!s.hash) return;
        let o = Ho.bech32.toWords(s.hash);
        return (o.unshift(0), Ho.bech32.encode(i.bech32, o));
      }),
      jr.prop(s, "hash", () => {
        if (e.output) return e.output.slice(2);
        if (e.address) return r().data;
        if (s.redeem && s.redeem.output) return $l.sha256(s.redeem.output);
      }),
      jr.prop(s, "output", () => {
        if (s.hash) return Dr.compile([Jl.OP_0, s.hash]);
      }),
      jr.prop(s, "redeem", () => {
        if (e.witness)
          return {
            output: e.witness[e.witness.length - 1],
            input: ac,
            witness: e.witness.slice(0, -1),
          };
      }),
      jr.prop(s, "input", () => {
        if (s.witness) return ac;
      }),
      jr.prop(s, "witness", () => {
        if (
          e.redeem &&
          e.redeem.input &&
          e.redeem.input.length > 0 &&
          e.redeem.output &&
          e.redeem.output.length > 0
        ) {
          let o = Dr.toStack(n());
          return (
            (s.redeem = Object.assign({ witness: o }, e.redeem)),
            (s.redeem.input = ac),
            [].concat(o, e.redeem.output)
          );
        }
        if (e.redeem && e.redeem.output && e.redeem.witness)
          return [].concat(e.redeem.witness, e.redeem.output);
      }),
      jr.prop(s, "name", () => {
        let o = ["p2wsh"];
        return (
          s.redeem !== void 0 &&
            s.redeem.name !== void 0 &&
            o.push(s.redeem.name),
          o.join("-")
        );
      }),
      t.validate)
    ) {
      let o = Buffer.from([]);
      if (e.address) {
        if (r().prefix !== i.bech32)
          throw new TypeError("Invalid prefix or Network mismatch");
        if (r().version !== 0) throw new TypeError("Invalid address version");
        if (r().data.length !== 32) throw new TypeError("Invalid address data");
        o = r().data;
      }
      if (e.hash) {
        if (o.length > 0 && !o.equals(e.hash))
          throw new TypeError("Hash mismatch");
        o = e.hash;
      }
      if (e.output) {
        if (
          e.output.length !== 34 ||
          e.output[0] !== Jl.OP_0 ||
          e.output[1] !== 32
        )
          throw new TypeError("Output is invalid");
        let f = e.output.slice(2);
        if (o.length > 0 && !o.equals(f)) throw new TypeError("Hash mismatch");
        o = f;
      }
      if (e.redeem) {
        if (e.redeem.network && e.redeem.network !== i)
          throw new TypeError("Network mismatch");
        if (
          e.redeem.input &&
          e.redeem.input.length > 0 &&
          e.redeem.witness &&
          e.redeem.witness.length > 0
        )
          throw new TypeError("Ambiguous witness source");
        if (e.redeem.output) {
          let f = Dr.decompile(e.redeem.output);
          if (!f || f.length < 1)
            throw new TypeError("Redeem.output is invalid");
          if (e.redeem.output.byteLength > 3600)
            throw new TypeError(
              "Redeem.output unspendable if larger than 3600 bytes",
            );
          if (Dr.countNonPushOnlyOPs(f) > 201)
            throw new TypeError(
              "Redeem.output unspendable with more than 201 non-push ops",
            );
          let u = $l.sha256(e.redeem.output);
          if (o.length > 0 && !o.equals(u))
            throw new TypeError("Hash mismatch");
          o = u;
        }
        if (e.redeem.input && !Dr.isPushOnly(n()))
          throw new TypeError("Non push-only scriptSig");
        if (
          e.witness &&
          e.redeem.witness &&
          !(0, ce.stacksEqual)(e.witness, e.redeem.witness)
        )
          throw new TypeError("Witness and redeem.witness mismatch");
        if (
          (e.redeem.input && n().some(No)) ||
          (e.redeem.output && (Dr.decompile(e.redeem.output) || []).some(No))
        )
          throw new TypeError(
            "redeem.input or redeem.output contains uncompressed pubkey",
          );
      }
      if (e.witness && e.witness.length > 0) {
        let f = e.witness[e.witness.length - 1];
        if (e.redeem && e.redeem.output && !e.redeem.output.equals(f))
          throw new TypeError("Witness and redeem.output mismatch");
        if (e.witness.some(No) || (Dr.decompile(f) || []).some(No))
          throw new TypeError("Witness contains uncompressed pubkey");
      }
    }
    return Object.assign(s, e);
  }
  Ro.p2wsh = K8;
});
var Co = _((Oi) => {
  "use strict";
  Object.defineProperty(Oi, "__esModule", { value: !0 });
  Oi.getEccLib = Oi.initEccLib = void 0;
  var fs = {};
  function j8(e, t) {
    e
      ? e !== fs.eccLib &&
        (t?.DANGER_DO_NOT_VERIFY_ECCLIB || V8(e), (fs.eccLib = e))
      : (fs.eccLib = e);
  }
  Oi.initEccLib = j8;
  function D8() {
    if (!fs.eccLib)
      throw new Error(
        "No ECC Library provided. You must call initEccLib() with a valid TinySecp256k1Interface instance",
      );
    return fs.eccLib;
  }
  Oi.getEccLib = D8;
  var Vr = (e) => Buffer.from(e, "hex");
  function V8(e) {
    (Gt(typeof e.isXOnlyPoint == "function"),
      Gt(
        e.isXOnlyPoint(
          Vr(
            "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
          ),
        ),
      ),
      Gt(
        e.isXOnlyPoint(
          Vr(
            "fffffffffffffffffffffffffffffffffffffffffffffffffffffffeeffffc2e",
          ),
        ),
      ),
      Gt(
        e.isXOnlyPoint(
          Vr(
            "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
          ),
        ),
      ),
      Gt(
        e.isXOnlyPoint(
          Vr(
            "0000000000000000000000000000000000000000000000000000000000000001",
          ),
        ),
      ),
      Gt(
        !e.isXOnlyPoint(
          Vr(
            "0000000000000000000000000000000000000000000000000000000000000000",
          ),
        ),
      ),
      Gt(
        !e.isXOnlyPoint(
          Vr(
            "fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f",
          ),
        ),
      ),
      Gt(typeof e.xOnlyPointAddTweak == "function"),
      W8.forEach((t) => {
        let r = e.xOnlyPointAddTweak(Vr(t.pubkey), Vr(t.tweak));
        t.result === null
          ? Gt(r === null)
          : (Gt(r !== null),
            Gt(r.parity === t.parity),
            Gt(Buffer.from(r.xOnlyPubkey).equals(Vr(t.result))));
      }));
  }
  function Gt(e) {
    if (!e) throw new Error("ecc library invalid");
  }
  var W8 = [
    {
      pubkey:
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
      tweak: "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140",
      parity: -1,
      result: null,
    },
    {
      pubkey:
        "1617d38ed8d8657da4d4761e8057bc396ea9e4b9d29776d4be096016dbd2509b",
      tweak: "a8397a935f0dfceba6ba9618f6451ef4d80637abf4e6af2669fbc9de6a8fd2ac",
      parity: 1,
      result:
        "e478f99dab91052ab39a33ea35fd5e6e4933f4d28023cd597c9a1f6760346adf",
    },
    {
      pubkey:
        "2c0b7cf95324a07d05398b240174dc0c2be444d96b159aa6c7f7b1e668680991",
      tweak: "823c3cd2142744b075a87eade7e1b8678ba308d566226a0056ca2b7a76f86b47",
      parity: 0,
      result:
        "9534f8dc8c6deda2dc007655981c78b49c5d96c778fbf363462a11ec9dfd948c",
    },
  ];
});
var tp = _((eM, ep) => {
  "use strict";
  var cc = qa().Buffer,
    z8 = 9007199254740991;
  function uc(e) {
    if (e < 0 || e > z8 || e % 1 !== 0)
      throw new RangeError("value out of range");
  }
  function as(e, t, r) {
    if ((uc(e), t || (t = cc.allocUnsafe(Ql(e))), !cc.isBuffer(t)))
      throw new TypeError("buffer must be a Buffer instance");
    return (
      r || (r = 0),
      e < 253
        ? (t.writeUInt8(e, r), (as.bytes = 1))
        : e <= 65535
          ? (t.writeUInt8(253, r), t.writeUInt16LE(e, r + 1), (as.bytes = 3))
          : e <= 4294967295
            ? (t.writeUInt8(254, r), t.writeUInt32LE(e, r + 1), (as.bytes = 5))
            : (t.writeUInt8(255, r),
              t.writeUInt32LE(e >>> 0, r + 1),
              t.writeUInt32LE((e / 4294967296) | 0, r + 5),
              (as.bytes = 9)),
      t
    );
  }
  function cs(e, t) {
    if (!cc.isBuffer(e))
      throw new TypeError("buffer must be a Buffer instance");
    t || (t = 0);
    var r = e.readUInt8(t);
    if (r < 253) return ((cs.bytes = 1), r);
    if (r === 253) return ((cs.bytes = 3), e.readUInt16LE(t + 1));
    if (r === 254) return ((cs.bytes = 5), e.readUInt32LE(t + 1));
    cs.bytes = 9;
    var n = e.readUInt32LE(t + 1),
      i = e.readUInt32LE(t + 5),
      s = i * 4294967296 + n;
    return (uc(s), s);
  }
  function Ql(e) {
    return (uc(e), e < 253 ? 1 : e <= 65535 ? 3 : e <= 4294967295 ? 5 : 9);
  }
  ep.exports = { encode: as, decode: cs, encodingLength: Ql };
});
var ds = _((Et) => {
  "use strict";
  Object.defineProperty(Et, "__esModule", { value: !0 });
  Et.BufferReader =
    Et.BufferWriter =
    Et.cloneBuffer =
    Et.reverseBuffer =
    Et.writeUInt64LE =
    Et.readUInt64LE =
    Et.varuint =
      void 0;
  var qn = yt(),
    { typeforce: rp } = qn,
    us = tp();
  Et.varuint = us;
  function np(e, t) {
    if (typeof e != "number")
      throw new Error("cannot write a non-number as a number");
    if (e < 0)
      throw new Error(
        "specified a negative value for writing an unsigned value",
      );
    if (e > t) throw new Error("RangeError: value out of range");
    if (Math.floor(e) !== e)
      throw new Error("value has a fractional component");
  }
  function ip(e, t) {
    let r = e.readUInt32LE(t),
      n = e.readUInt32LE(t + 4);
    return ((n *= 4294967296), np(n + r, 9007199254740991), n + r);
  }
  Et.readUInt64LE = ip;
  function sp(e, t, r) {
    return (
      np(t, 9007199254740991),
      e.writeInt32LE(t & -1, r),
      e.writeUInt32LE(Math.floor(t / 4294967296), r + 4),
      r + 8
    );
  }
  Et.writeUInt64LE = sp;
  function G8(e) {
    if (e.length < 1) return e;
    let t = e.length - 1,
      r = 0;
    for (let n = 0; n < e.length / 2; n++)
      ((r = e[n]), (e[n] = e[t]), (e[t] = r), t--);
    return e;
  }
  Et.reverseBuffer = G8;
  function X8(e) {
    let t = Buffer.allocUnsafe(e.length);
    return (e.copy(t), t);
  }
  Et.cloneBuffer = X8;
  var dc = class e {
    static withCapacity(t) {
      return new e(Buffer.alloc(t));
    }
    constructor(t, r = 0) {
      ((this.buffer = t),
        (this.offset = r),
        rp(qn.tuple(qn.Buffer, qn.UInt32), [t, r]));
    }
    writeUInt8(t) {
      this.offset = this.buffer.writeUInt8(t, this.offset);
    }
    writeInt32(t) {
      this.offset = this.buffer.writeInt32LE(t, this.offset);
    }
    writeUInt32(t) {
      this.offset = this.buffer.writeUInt32LE(t, this.offset);
    }
    writeUInt64(t) {
      this.offset = sp(this.buffer, t, this.offset);
    }
    writeVarInt(t) {
      (us.encode(t, this.buffer, this.offset),
        (this.offset += us.encode.bytes));
    }
    writeSlice(t) {
      if (this.buffer.length < this.offset + t.length)
        throw new Error("Cannot write slice out of bounds");
      this.offset += t.copy(this.buffer, this.offset);
    }
    writeVarSlice(t) {
      (this.writeVarInt(t.length), this.writeSlice(t));
    }
    writeVector(t) {
      (this.writeVarInt(t.length), t.forEach((r) => this.writeVarSlice(r)));
    }
    end() {
      if (this.buffer.length === this.offset) return this.buffer;
      throw new Error(
        `buffer size ${this.buffer.length}, offset ${this.offset}`,
      );
    }
  };
  Et.BufferWriter = dc;
  var hc = class {
    constructor(t, r = 0) {
      ((this.buffer = t),
        (this.offset = r),
        rp(qn.tuple(qn.Buffer, qn.UInt32), [t, r]));
    }
    readUInt8() {
      let t = this.buffer.readUInt8(this.offset);
      return (this.offset++, t);
    }
    readInt32() {
      let t = this.buffer.readInt32LE(this.offset);
      return ((this.offset += 4), t);
    }
    readUInt32() {
      let t = this.buffer.readUInt32LE(this.offset);
      return ((this.offset += 4), t);
    }
    readUInt64() {
      let t = ip(this.buffer, this.offset);
      return ((this.offset += 8), t);
    }
    readVarInt() {
      let t = us.decode(this.buffer, this.offset);
      return ((this.offset += us.decode.bytes), t);
    }
    readSlice(t) {
      if (this.buffer.length < this.offset + t)
        throw new Error("Cannot read slice out of bounds");
      let r = this.buffer.slice(this.offset, this.offset + t);
      return ((this.offset += t), r);
    }
    readVarSlice() {
      return this.readSlice(this.readVarInt());
    }
    readVector() {
      let t = this.readVarInt(),
        r = [];
      for (let n = 0; n < t; n++) r.push(this.readVarSlice());
      return r;
    }
  };
  Et.BufferReader = hc;
});
var Uo = _((ft) => {
  "use strict";
  Object.defineProperty(ft, "__esModule", { value: !0 });
  ft.tweakKey =
    ft.tapTweakHash =
    ft.tapleafHash =
    ft.findScriptPath =
    ft.toHashTree =
    ft.rootHashFromPath =
    ft.MAX_TAPTREE_DEPTH =
    ft.LEAF_VERSION_TAPSCRIPT =
      void 0;
  var bn = require("buffer"),
    Y8 = Co(),
    yc = Sr(),
    op = ds(),
    $8 = yt();
  ft.LEAF_VERSION_TAPSCRIPT = 192;
  ft.MAX_TAPTREE_DEPTH = 128;
  var J8 = (e) => "left" in e && "right" in e;
  function Z8(e, t) {
    if (e.length < 33)
      throw new TypeError(
        `The control-block length is too small. Got ${e.length}, expected min 33.`,
      );
    let r = (e.length - 33) / 32,
      n = t;
    for (let i = 0; i < r; i++) {
      let s = e.slice(33 + 32 * i, 65 + 32 * i);
      n.compare(s) < 0 ? (n = bc(n, s)) : (n = bc(s, n));
    }
    return n;
  }
  ft.rootHashFromPath = Z8;
  function lc(e) {
    if ((0, $8.isTapleaf)(e)) return { hash: fp(e) };
    let t = [lc(e[0]), lc(e[1])];
    t.sort((i, s) => i.hash.compare(s.hash));
    let [r, n] = t;
    return { hash: bc(r.hash, n.hash), left: r, right: n };
  }
  ft.toHashTree = lc;
  function pc(e, t) {
    if (J8(e)) {
      let r = pc(e.left, t);
      if (r !== void 0) return [...r, e.right.hash];
      let n = pc(e.right, t);
      if (n !== void 0) return [...n, e.left.hash];
    } else if (e.hash.equals(t)) return [];
  }
  ft.findScriptPath = pc;
  function fp(e) {
    let t = e.version || ft.LEAF_VERSION_TAPSCRIPT;
    return yc.taggedHash(
      "TapLeaf",
      bn.Buffer.concat([bn.Buffer.from([t]), e5(e.output)]),
    );
  }
  ft.tapleafHash = fp;
  function ap(e, t) {
    return yc.taggedHash("TapTweak", bn.Buffer.concat(t ? [e, t] : [e]));
  }
  ft.tapTweakHash = ap;
  function Q8(e, t) {
    if (!bn.Buffer.isBuffer(e) || e.length !== 32 || (t && t.length !== 32))
      return null;
    let r = ap(e, t),
      n = (0, Y8.getEccLib)().xOnlyPointAddTweak(e, r);
    return !n || n.xOnlyPubkey === null
      ? null
      : { parity: n.parity, x: bn.Buffer.from(n.xOnlyPubkey) };
  }
  ft.tweakKey = Q8;
  function bc(e, t) {
    return yc.taggedHash("TapBranch", bn.Buffer.concat([e, t]));
  }
  function e5(e) {
    let t = op.varuint.encodingLength(e.length),
      r = bn.Buffer.allocUnsafe(t);
    return (op.varuint.encode(e.length, r), bn.Buffer.concat([r, e]));
  }
});
var lp = _((Lo) => {
  "use strict";
  Object.defineProperty(Lo, "__esModule", { value: !0 });
  Lo.p2tr = void 0;
  var vc = require("buffer"),
    t5 = zt(),
    gc = _t(),
    G = yt(),
    cp = Co(),
    Ct = Uo(),
    Xt = Lr(),
    up = os(),
    r5 = Fo(),
    dp = gc.OPS,
    hp = 1,
    n5 = 80;
  function i5(e, t) {
    if (
      !e.address &&
      !e.output &&
      !e.pubkey &&
      !e.internalPubkey &&
      !(e.witness && e.witness.length > 1)
    )
      throw new TypeError("Not enough data");
    ((t = Object.assign({ validate: !0 }, t || {})),
      (0, G.typeforce)(
        {
          address: G.typeforce.maybe(G.typeforce.String),
          input: G.typeforce.maybe(G.typeforce.BufferN(0)),
          network: G.typeforce.maybe(G.typeforce.Object),
          output: G.typeforce.maybe(G.typeforce.BufferN(34)),
          internalPubkey: G.typeforce.maybe(G.typeforce.BufferN(32)),
          hash: G.typeforce.maybe(G.typeforce.BufferN(32)),
          pubkey: G.typeforce.maybe(G.typeforce.BufferN(32)),
          signature: G.typeforce.maybe(
            G.typeforce.anyOf(G.typeforce.BufferN(64), G.typeforce.BufferN(65)),
          ),
          witness: G.typeforce.maybe(G.typeforce.arrayOf(G.typeforce.Buffer)),
          scriptTree: G.typeforce.maybe(G.isTaptree),
          redeem: G.typeforce.maybe({
            output: G.typeforce.maybe(G.typeforce.Buffer),
            redeemVersion: G.typeforce.maybe(G.typeforce.Number),
            witness: G.typeforce.maybe(G.typeforce.arrayOf(G.typeforce.Buffer)),
          }),
          redeemVersion: G.typeforce.maybe(G.typeforce.Number),
        },
        e,
      ));
    let r = Xt.value(() => (0, r5.fromBech32)(e.address)),
      n = Xt.value(() => {
        if (!(!e.witness || !e.witness.length))
          return e.witness.length >= 2 &&
            e.witness[e.witness.length - 1][0] === n5
            ? e.witness.slice(0, -1)
            : e.witness.slice();
      }),
      i = Xt.value(() => {
        if (e.scriptTree) return (0, Ct.toHashTree)(e.scriptTree);
        if (e.hash) return { hash: e.hash };
      }),
      s = e.network || t5.bitcoin,
      o = { name: "p2tr", network: s };
    if (
      (Xt.prop(o, "address", () => {
        if (!o.pubkey) return;
        let f = up.bech32m.toWords(o.pubkey);
        return (f.unshift(hp), up.bech32m.encode(s.bech32, f));
      }),
      Xt.prop(o, "hash", () => {
        let f = i();
        if (f) return f.hash;
        let u = n();
        if (u && u.length > 1) {
          let l = u[u.length - 1],
            p = l[0] & G.TAPLEAF_VERSION_MASK,
            h = u[u.length - 2],
            w = (0, Ct.tapleafHash)({ output: h, version: p });
          return (0, Ct.rootHashFromPath)(l, w);
        }
        return null;
      }),
      Xt.prop(o, "output", () => {
        if (o.pubkey) return gc.compile([dp.OP_1, o.pubkey]);
      }),
      Xt.prop(o, "redeemVersion", () =>
        e.redeemVersion
          ? e.redeemVersion
          : e.redeem &&
              e.redeem.redeemVersion !== void 0 &&
              e.redeem.redeemVersion !== null
            ? e.redeem.redeemVersion
            : Ct.LEAF_VERSION_TAPSCRIPT,
      ),
      Xt.prop(o, "redeem", () => {
        let f = n();
        if (!(!f || f.length < 2))
          return {
            output: f[f.length - 2],
            witness: f.slice(0, -2),
            redeemVersion: f[f.length - 1][0] & G.TAPLEAF_VERSION_MASK,
          };
      }),
      Xt.prop(o, "pubkey", () => {
        if (e.pubkey) return e.pubkey;
        if (e.output) return e.output.slice(2);
        if (e.address) return r().data;
        if (o.internalPubkey) {
          let f = (0, Ct.tweakKey)(o.internalPubkey, o.hash);
          if (f) return f.x;
        }
      }),
      Xt.prop(o, "internalPubkey", () => {
        if (e.internalPubkey) return e.internalPubkey;
        let f = n();
        if (f && f.length > 1) return f[f.length - 1].slice(1, 33);
      }),
      Xt.prop(o, "signature", () => {
        if (e.signature) return e.signature;
        let f = n();
        if (!(!f || f.length !== 1)) return f[0];
      }),
      Xt.prop(o, "witness", () => {
        if (e.witness) return e.witness;
        let f = i();
        if (f && e.redeem && e.redeem.output && e.internalPubkey) {
          let u = (0, Ct.tapleafHash)({
              output: e.redeem.output,
              version: o.redeemVersion,
            }),
            l = (0, Ct.findScriptPath)(f, u);
          if (!l) return;
          let p = (0, Ct.tweakKey)(e.internalPubkey, f.hash);
          if (!p) return;
          let h = vc.Buffer.concat(
            [
              vc.Buffer.from([o.redeemVersion | p.parity]),
              e.internalPubkey,
            ].concat(l),
          );
          return [e.redeem.output, h];
        }
        if (e.signature) return [e.signature];
      }),
      t.validate)
    ) {
      let f = vc.Buffer.from([]);
      if (e.address) {
        if (s && s.bech32 !== r().prefix)
          throw new TypeError("Invalid prefix or Network mismatch");
        if (r().version !== hp) throw new TypeError("Invalid address version");
        if (r().data.length !== 32) throw new TypeError("Invalid address data");
        f = r().data;
      }
      if (e.pubkey) {
        if (f.length > 0 && !f.equals(e.pubkey))
          throw new TypeError("Pubkey mismatch");
        f = e.pubkey;
      }
      if (e.output) {
        if (
          e.output.length !== 34 ||
          e.output[0] !== dp.OP_1 ||
          e.output[1] !== 32
        )
          throw new TypeError("Output is invalid");
        if (f.length > 0 && !f.equals(e.output.slice(2)))
          throw new TypeError("Pubkey mismatch");
        f = e.output.slice(2);
      }
      if (e.internalPubkey) {
        let p = (0, Ct.tweakKey)(e.internalPubkey, o.hash);
        if (f.length > 0 && !f.equals(p.x))
          throw new TypeError("Pubkey mismatch");
        f = p.x;
      }
      if (f && f.length && !(0, cp.getEccLib)().isXOnlyPoint(f))
        throw new TypeError("Invalid pubkey for p2tr");
      let u = i();
      if (e.hash && u && !e.hash.equals(u.hash))
        throw new TypeError("Hash mismatch");
      if (e.redeem && e.redeem.output && u) {
        let p = (0, Ct.tapleafHash)({
          output: e.redeem.output,
          version: o.redeemVersion,
        });
        if (!(0, Ct.findScriptPath)(u, p))
          throw new TypeError("Redeem script not in tree");
      }
      let l = n();
      if (e.redeem && o.redeem) {
        if (
          e.redeem.redeemVersion &&
          e.redeem.redeemVersion !== o.redeem.redeemVersion
        )
          throw new TypeError("Redeem.redeemVersion and witness mismatch");
        if (e.redeem.output) {
          if (gc.decompile(e.redeem.output).length === 0)
            throw new TypeError("Redeem.output is invalid");
          if (o.redeem.output && !e.redeem.output.equals(o.redeem.output))
            throw new TypeError("Redeem.output and witness mismatch");
        }
        if (
          e.redeem.witness &&
          o.redeem.witness &&
          !(0, G.stacksEqual)(e.redeem.witness, o.redeem.witness)
        )
          throw new TypeError("Redeem.witness and witness mismatch");
      }
      if (l && l.length)
        if (l.length === 1) {
          if (e.signature && !e.signature.equals(l[0]))
            throw new TypeError("Signature mismatch");
        } else {
          let p = l[l.length - 1];
          if (p.length < 33)
            throw new TypeError(
              `The control-block length is too small. Got ${p.length}, expected min 33.`,
            );
          if ((p.length - 33) % 32 !== 0)
            throw new TypeError(
              `The control-block length of ${p.length} is incorrect!`,
            );
          let h = (p.length - 33) / 32;
          if (h > 128)
            throw new TypeError(
              `The script path is too long. Got ${h}, expected max 128.`,
            );
          let w = p.slice(1, 33);
          if (e.internalPubkey && !e.internalPubkey.equals(w))
            throw new TypeError("Internal pubkey mismatch");
          if (!(0, cp.getEccLib)().isXOnlyPoint(w))
            throw new TypeError("Invalid internalPubkey for p2tr witness");
          let E = p[0] & G.TAPLEAF_VERSION_MASK,
            A = l[l.length - 2],
            T = (0, Ct.tapleafHash)({ output: A, version: E }),
            O = (0, Ct.rootHashFromPath)(p, T),
            k = (0, Ct.tweakKey)(w, O);
          if (!k) throw new TypeError("Invalid outputKey for p2tr witness");
          if (f.length && !f.equals(k.x))
            throw new TypeError("Pubkey mismatch for p2tr witness");
          if (k.parity !== (p[0] & 1)) throw new Error("Incorrect parity");
        }
    }
    return Object.assign(o, e);
  }
  Lo.p2tr = i5;
});
var ki = _((dt) => {
  "use strict";
  Object.defineProperty(dt, "__esModule", { value: !0 });
  dt.p2tr =
    dt.p2wsh =
    dt.p2wpkh =
    dt.p2sh =
    dt.p2pkh =
    dt.p2pk =
    dt.p2ms =
    dt.embed =
      void 0;
  var s5 = Ch();
  Object.defineProperty(dt, "embed", {
    enumerable: !0,
    get: function () {
      return s5.p2data;
    },
  });
  var o5 = Uh();
  Object.defineProperty(dt, "p2ms", {
    enumerable: !0,
    get: function () {
      return o5.p2ms;
    },
  });
  var f5 = Fh();
  Object.defineProperty(dt, "p2pk", {
    enumerable: !0,
    get: function () {
      return f5.p2pk;
    },
  });
  var a5 = Kl();
  Object.defineProperty(dt, "p2pkh", {
    enumerable: !0,
    get: function () {
      return a5.p2pkh;
    },
  });
  var c5 = Vl();
  Object.defineProperty(dt, "p2sh", {
    enumerable: !0,
    get: function () {
      return c5.p2sh;
    },
  });
  var u5 = Yl();
  Object.defineProperty(dt, "p2wpkh", {
    enumerable: !0,
    get: function () {
      return u5.p2wpkh;
    },
  });
  var d5 = Zl();
  Object.defineProperty(dt, "p2wsh", {
    enumerable: !0,
    get: function () {
      return d5.p2wsh;
    },
  });
  var h5 = lp();
  Object.defineProperty(dt, "p2tr", {
    enumerable: !0,
    get: function () {
      return h5.p2tr;
    },
  });
});
var Fo = _((Ut) => {
  "use strict";
  Object.defineProperty(Ut, "__esModule", { value: !0 });
  Ut.toOutputScript =
    Ut.fromOutputScript =
    Ut.toBech32 =
    Ut.toBase58Check =
    Ut.fromBech32 =
    Ut.fromBase58Check =
      void 0;
  var pp = zt(),
    Ar = ki(),
    bp = _t(),
    Ko = yt(),
    Bi = os(),
    yp = To(),
    vp = 40,
    gp = 2,
    mp = 16,
    wp = 2,
    _p = 80,
    Sp =
      "WARNING: Sending to a future segwit version address can lead to loss of funds. End users MUST be warned carefully in the GUI and asked if they wish to proceed with caution. Wallets should verify the segwit version from the output of fromBech32, then decide when it is safe to use which version of segwit.";
  function l5(e, t) {
    let r = e.slice(2);
    if (r.length < gp || r.length > vp)
      throw new TypeError("Invalid program length for segwit address");
    let n = e[0] - _p;
    if (n < wp || n > mp)
      throw new TypeError("Invalid version for segwit address");
    if (e[1] !== r.length)
      throw new TypeError("Invalid script for segwit address");
    return (console.warn(Sp), Ap(r, n, t.bech32));
  }
  function xp(e) {
    let t = Buffer.from(yp.decode(e));
    if (t.length < 21) throw new TypeError(e + " is too short");
    if (t.length > 21) throw new TypeError(e + " is too long");
    let r = t.readUInt8(0),
      n = t.slice(1);
    return { version: r, hash: n };
  }
  Ut.fromBase58Check = xp;
  function Ep(e) {
    let t, r;
    try {
      t = Bi.bech32.decode(e);
    } catch {}
    if (t) {
      if (((r = t.words[0]), r !== 0))
        throw new TypeError(e + " uses wrong encoding");
    } else if (((t = Bi.bech32m.decode(e)), (r = t.words[0]), r === 0))
      throw new TypeError(e + " uses wrong encoding");
    let n = Bi.bech32.fromWords(t.words.slice(1));
    return { version: r, prefix: t.prefix, data: Buffer.from(n) };
  }
  Ut.fromBech32 = Ep;
  function p5(e, t) {
    (0, Ko.typeforce)((0, Ko.tuple)(Ko.Hash160bit, Ko.UInt8), arguments);
    let r = Buffer.allocUnsafe(21);
    return (r.writeUInt8(t, 0), e.copy(r, 1), yp.encode(r));
  }
  Ut.toBase58Check = p5;
  function Ap(e, t, r) {
    let n = Bi.bech32.toWords(e);
    return (
      n.unshift(t),
      t === 0 ? Bi.bech32.encode(r, n) : Bi.bech32m.encode(r, n)
    );
  }
  Ut.toBech32 = Ap;
  function b5(e, t) {
    t = t || pp.bitcoin;
    try {
      return Ar.p2pkh({ output: e, network: t }).address;
    } catch {}
    try {
      return Ar.p2sh({ output: e, network: t }).address;
    } catch {}
    try {
      return Ar.p2wpkh({ output: e, network: t }).address;
    } catch {}
    try {
      return Ar.p2wsh({ output: e, network: t }).address;
    } catch {}
    try {
      return Ar.p2tr({ output: e, network: t }).address;
    } catch {}
    try {
      return l5(e, t);
    } catch {}
    throw new Error(bp.toASM(e) + " has no matching Address");
  }
  Ut.fromOutputScript = b5;
  function y5(e, t) {
    t = t || pp.bitcoin;
    let r, n;
    try {
      r = xp(e);
    } catch {}
    if (r) {
      if (r.version === t.pubKeyHash) return Ar.p2pkh({ hash: r.hash }).output;
      if (r.version === t.scriptHash) return Ar.p2sh({ hash: r.hash }).output;
    } else {
      try {
        n = Ep(e);
      } catch {}
      if (n) {
        if (n.prefix !== t.bech32)
          throw new Error(e + " has an invalid prefix");
        if (n.version === 0) {
          if (n.data.length === 20) return Ar.p2wpkh({ hash: n.data }).output;
          if (n.data.length === 32) return Ar.p2wsh({ hash: n.data }).output;
        } else if (n.version === 1) {
          if (n.data.length === 32) return Ar.p2tr({ pubkey: n.data }).output;
        } else if (
          n.version >= wp &&
          n.version <= mp &&
          n.data.length >= gp &&
          n.data.length <= vp
        )
          return (console.warn(Sp), bp.compile([n.version + _p, n.data]));
      }
    }
    throw new Error(e + " has no matching Script");
  }
  Ut.toOutputScript = y5;
});
var Ip = _((jo) => {
  "use strict";
  Object.defineProperty(jo, "__esModule", { value: !0 });
  jo.fastMerkleRoot = void 0;
  function v5(e, t) {
    if (!Array.isArray(e)) throw TypeError("Expected values Array");
    if (typeof t != "function") throw TypeError("Expected digest Function");
    let r = e.length,
      n = e.concat();
    for (; r > 1; ) {
      let i = 0;
      for (let s = 0; s < r; s += 2, ++i) {
        let o = n[s],
          f = s + 1 === r ? o : n[s + 1],
          u = Buffer.concat([o, f]);
        n[i] = t(u);
      }
      r = i;
    }
    return n[0];
  }
  jo.fastMerkleRoot = v5;
});
var qi = _((Do) => {
  "use strict";
  Object.defineProperty(Do, "__esModule", { value: !0 });
  Do.Transaction = void 0;
  var nt = ds(),
    Ot = Sr(),
    Tp = _t(),
    g5 = _t(),
    $ = yt(),
    { typeforce: Ir } = $;
  function Tr(e) {
    let t = e.length;
    return nt.varuint.encodingLength(t) + t;
  }
  function m5(e) {
    let t = e.length;
    return nt.varuint.encodingLength(t) + e.reduce((r, n) => r + Tr(n), 0);
  }
  var yn = Buffer.allocUnsafe(0),
    mc = [],
    wc = Buffer.from(
      "0000000000000000000000000000000000000000000000000000000000000000",
      "hex",
    ),
    Pp = Buffer.from(
      "0000000000000000000000000000000000000000000000000000000000000001",
      "hex",
    ),
    w5 = Buffer.from("ffffffffffffffff", "hex"),
    _5 = { script: yn, valueBuffer: w5 };
  function S5(e) {
    return e.value !== void 0;
  }
  var Ft = class e {
    constructor() {
      ((this.version = 1),
        (this.locktime = 0),
        (this.ins = []),
        (this.outs = []));
    }
    static fromBuffer(t, r) {
      let n = new nt.BufferReader(t),
        i = new e();
      i.version = n.readInt32();
      let s = n.readUInt8(),
        o = n.readUInt8(),
        f = !1;
      s === e.ADVANCED_TRANSACTION_MARKER && o === e.ADVANCED_TRANSACTION_FLAG
        ? (f = !0)
        : (n.offset -= 2);
      let u = n.readVarInt();
      for (let p = 0; p < u; ++p)
        i.ins.push({
          hash: n.readSlice(32),
          index: n.readUInt32(),
          script: n.readVarSlice(),
          sequence: n.readUInt32(),
          witness: mc,
        });
      let l = n.readVarInt();
      for (let p = 0; p < l; ++p)
        i.outs.push({ value: n.readUInt64(), script: n.readVarSlice() });
      if (f) {
        for (let p = 0; p < u; ++p) i.ins[p].witness = n.readVector();
        if (!i.hasWitnesses())
          throw new Error("Transaction has superfluous witness data");
      }
      if (((i.locktime = n.readUInt32()), r)) return i;
      if (n.offset !== t.length)
        throw new Error("Transaction has unexpected data");
      return i;
    }
    static fromHex(t) {
      return e.fromBuffer(Buffer.from(t, "hex"), !1);
    }
    static isCoinbaseHash(t) {
      Ir($.Hash256bit, t);
      for (let r = 0; r < 32; ++r) if (t[r] !== 0) return !1;
      return !0;
    }
    isCoinbase() {
      return this.ins.length === 1 && e.isCoinbaseHash(this.ins[0].hash);
    }
    addInput(t, r, n, i) {
      return (
        Ir(
          $.tuple($.Hash256bit, $.UInt32, $.maybe($.UInt32), $.maybe($.Buffer)),
          arguments,
        ),
        $.Null(n) && (n = e.DEFAULT_SEQUENCE),
        this.ins.push({
          hash: t,
          index: r,
          script: i || yn,
          sequence: n,
          witness: mc,
        }) - 1
      );
    }
    addOutput(t, r) {
      return (
        Ir($.tuple($.Buffer, $.Satoshi), arguments),
        this.outs.push({ script: t, value: r }) - 1
      );
    }
    hasWitnesses() {
      return this.ins.some((t) => t.witness.length !== 0);
    }
    stripWitnesses() {
      this.ins.forEach((t) => {
        t.witness = mc;
      });
    }
    weight() {
      let t = this.byteLength(!1),
        r = this.byteLength(!0);
      return t * 3 + r;
    }
    virtualSize() {
      return Math.ceil(this.weight() / 4);
    }
    byteLength(t = !0) {
      let r = t && this.hasWitnesses();
      return (
        (r ? 10 : 8) +
        nt.varuint.encodingLength(this.ins.length) +
        nt.varuint.encodingLength(this.outs.length) +
        this.ins.reduce((n, i) => n + 40 + Tr(i.script), 0) +
        this.outs.reduce((n, i) => n + 8 + Tr(i.script), 0) +
        (r ? this.ins.reduce((n, i) => n + m5(i.witness), 0) : 0)
      );
    }
    clone() {
      let t = new e();
      return (
        (t.version = this.version),
        (t.locktime = this.locktime),
        (t.ins = this.ins.map((r) => ({
          hash: r.hash,
          index: r.index,
          script: r.script,
          sequence: r.sequence,
          witness: r.witness,
        }))),
        (t.outs = this.outs.map((r) => ({ script: r.script, value: r.value }))),
        t
      );
    }
    hashForSignature(t, r, n) {
      if (
        (Ir($.tuple($.UInt32, $.Buffer, $.Number), arguments),
        t >= this.ins.length)
      )
        return Pp;
      let i = Tp.compile(
          Tp.decompile(r).filter((f) => f !== g5.OPS.OP_CODESEPARATOR),
        ),
        s = this.clone();
      if ((n & 31) === e.SIGHASH_NONE)
        ((s.outs = []),
          s.ins.forEach((f, u) => {
            u !== t && (f.sequence = 0);
          }));
      else if ((n & 31) === e.SIGHASH_SINGLE) {
        if (t >= this.outs.length) return Pp;
        s.outs.length = t + 1;
        for (let f = 0; f < t; f++) s.outs[f] = _5;
        s.ins.forEach((f, u) => {
          u !== t && (f.sequence = 0);
        });
      }
      n & e.SIGHASH_ANYONECANPAY
        ? ((s.ins = [s.ins[t]]), (s.ins[0].script = i))
        : (s.ins.forEach((f) => {
            f.script = yn;
          }),
          (s.ins[t].script = i));
      let o = Buffer.allocUnsafe(s.byteLength(!1) + 4);
      return (
        o.writeInt32LE(n, o.length - 4),
        s.__toBuffer(o, 0, !1),
        Ot.hash256(o)
      );
    }
    hashForWitnessV1(t, r, n, i, s, o) {
      if (
        (Ir(
          $.tuple(
            $.UInt32,
            Ir.arrayOf($.Buffer),
            Ir.arrayOf($.Satoshi),
            $.UInt32,
          ),
          arguments,
        ),
        n.length !== this.ins.length || r.length !== this.ins.length)
      )
        throw new Error("Must supply prevout script and value for all inputs");
      let f =
          i === e.SIGHASH_DEFAULT ? e.SIGHASH_ALL : i & e.SIGHASH_OUTPUT_MASK,
        l = (i & e.SIGHASH_INPUT_MASK) === e.SIGHASH_ANYONECANPAY,
        p = f === e.SIGHASH_NONE,
        h = f === e.SIGHASH_SINGLE,
        w = yn,
        E = yn,
        A = yn,
        T = yn,
        O = yn;
      if (!l) {
        let M = nt.BufferWriter.withCapacity(36 * this.ins.length);
        (this.ins.forEach((B) => {
          (M.writeSlice(B.hash), M.writeUInt32(B.index));
        }),
          (w = Ot.sha256(M.end())),
          (M = nt.BufferWriter.withCapacity(8 * this.ins.length)),
          n.forEach((B) => M.writeUInt64(B)),
          (E = Ot.sha256(M.end())),
          (M = nt.BufferWriter.withCapacity(r.map(Tr).reduce((B, F) => B + F))),
          r.forEach((B) => M.writeVarSlice(B)),
          (A = Ot.sha256(M.end())),
          (M = nt.BufferWriter.withCapacity(4 * this.ins.length)),
          this.ins.forEach((B) => M.writeUInt32(B.sequence)),
          (T = Ot.sha256(M.end())));
      }
      if (p || h) {
        if (h && t < this.outs.length) {
          let M = this.outs[t],
            B = nt.BufferWriter.withCapacity(8 + Tr(M.script));
          (B.writeUInt64(M.value),
            B.writeVarSlice(M.script),
            (O = Ot.sha256(B.end())));
        }
      } else {
        let M = this.outs.map((F) => 8 + Tr(F.script)).reduce((F, z) => F + z),
          B = nt.BufferWriter.withCapacity(M);
        (this.outs.forEach((F) => {
          (B.writeUInt64(F.value), B.writeVarSlice(F.script));
        }),
          (O = Ot.sha256(B.end())));
      }
      let k = (s ? 2 : 0) + (o ? 1 : 0),
        H = 174 - (l ? 49 : 0) - (p ? 32 : 0) + (o ? 32 : 0) + (s ? 37 : 0),
        P = nt.BufferWriter.withCapacity(H);
      if (
        (P.writeUInt8(i),
        P.writeInt32(this.version),
        P.writeUInt32(this.locktime),
        P.writeSlice(w),
        P.writeSlice(E),
        P.writeSlice(A),
        P.writeSlice(T),
        p || h || P.writeSlice(O),
        P.writeUInt8(k),
        l)
      ) {
        let M = this.ins[t];
        (P.writeSlice(M.hash),
          P.writeUInt32(M.index),
          P.writeUInt64(n[t]),
          P.writeVarSlice(r[t]),
          P.writeUInt32(M.sequence));
      } else P.writeUInt32(t);
      if (o) {
        let M = nt.BufferWriter.withCapacity(Tr(o));
        (M.writeVarSlice(o), P.writeSlice(Ot.sha256(M.end())));
      }
      return (
        h && P.writeSlice(O),
        s && (P.writeSlice(s), P.writeUInt8(0), P.writeUInt32(4294967295)),
        Ot.taggedHash("TapSighash", Buffer.concat([Buffer.from([0]), P.end()]))
      );
    }
    hashForWitnessV0(t, r, n, i) {
      Ir($.tuple($.UInt32, $.Buffer, $.Satoshi, $.UInt32), arguments);
      let s = Buffer.from([]),
        o,
        f = wc,
        u = wc,
        l = wc;
      if (
        (i & e.SIGHASH_ANYONECANPAY ||
          ((s = Buffer.allocUnsafe(36 * this.ins.length)),
          (o = new nt.BufferWriter(s, 0)),
          this.ins.forEach((h) => {
            (o.writeSlice(h.hash), o.writeUInt32(h.index));
          }),
          (u = Ot.hash256(s))),
        !(i & e.SIGHASH_ANYONECANPAY) &&
          (i & 31) !== e.SIGHASH_SINGLE &&
          (i & 31) !== e.SIGHASH_NONE &&
          ((s = Buffer.allocUnsafe(4 * this.ins.length)),
          (o = new nt.BufferWriter(s, 0)),
          this.ins.forEach((h) => {
            o.writeUInt32(h.sequence);
          }),
          (l = Ot.hash256(s))),
        (i & 31) !== e.SIGHASH_SINGLE && (i & 31) !== e.SIGHASH_NONE)
      ) {
        let h = this.outs.reduce((w, E) => w + 8 + Tr(E.script), 0);
        ((s = Buffer.allocUnsafe(h)),
          (o = new nt.BufferWriter(s, 0)),
          this.outs.forEach((w) => {
            (o.writeUInt64(w.value), o.writeVarSlice(w.script));
          }),
          (f = Ot.hash256(s)));
      } else if ((i & 31) === e.SIGHASH_SINGLE && t < this.outs.length) {
        let h = this.outs[t];
        ((s = Buffer.allocUnsafe(8 + Tr(h.script))),
          (o = new nt.BufferWriter(s, 0)),
          o.writeUInt64(h.value),
          o.writeVarSlice(h.script),
          (f = Ot.hash256(s)));
      }
      ((s = Buffer.allocUnsafe(156 + Tr(r))), (o = new nt.BufferWriter(s, 0)));
      let p = this.ins[t];
      return (
        o.writeInt32(this.version),
        o.writeSlice(u),
        o.writeSlice(l),
        o.writeSlice(p.hash),
        o.writeUInt32(p.index),
        o.writeVarSlice(r),
        o.writeUInt64(n),
        o.writeUInt32(p.sequence),
        o.writeSlice(f),
        o.writeUInt32(this.locktime),
        o.writeUInt32(i),
        Ot.hash256(s)
      );
    }
    getHash(t) {
      return t && this.isCoinbase()
        ? Buffer.alloc(32, 0)
        : Ot.hash256(this.__toBuffer(void 0, void 0, t));
    }
    getId() {
      return (0, nt.reverseBuffer)(this.getHash(!1)).toString("hex");
    }
    toBuffer(t, r) {
      return this.__toBuffer(t, r, !0);
    }
    toHex() {
      return this.toBuffer(void 0, void 0).toString("hex");
    }
    setInputScript(t, r) {
      (Ir($.tuple($.Number, $.Buffer), arguments), (this.ins[t].script = r));
    }
    setWitness(t, r) {
      (Ir($.tuple($.Number, [$.Buffer]), arguments), (this.ins[t].witness = r));
    }
    __toBuffer(t, r, n = !1) {
      t || (t = Buffer.allocUnsafe(this.byteLength(n)));
      let i = new nt.BufferWriter(t, r || 0);
      i.writeInt32(this.version);
      let s = n && this.hasWitnesses();
      return (
        s &&
          (i.writeUInt8(e.ADVANCED_TRANSACTION_MARKER),
          i.writeUInt8(e.ADVANCED_TRANSACTION_FLAG)),
        i.writeVarInt(this.ins.length),
        this.ins.forEach((o) => {
          (i.writeSlice(o.hash),
            i.writeUInt32(o.index),
            i.writeVarSlice(o.script),
            i.writeUInt32(o.sequence));
        }),
        i.writeVarInt(this.outs.length),
        this.outs.forEach((o) => {
          (S5(o) ? i.writeUInt64(o.value) : i.writeSlice(o.valueBuffer),
            i.writeVarSlice(o.script));
        }),
        s &&
          this.ins.forEach((o) => {
            i.writeVector(o.witness);
          }),
        i.writeUInt32(this.locktime),
        r !== void 0 ? t.slice(r, i.offset) : t
      );
    }
  };
  Do.Transaction = Ft;
  Ft.DEFAULT_SEQUENCE = 4294967295;
  Ft.SIGHASH_DEFAULT = 0;
  Ft.SIGHASH_ALL = 1;
  Ft.SIGHASH_NONE = 2;
  Ft.SIGHASH_SINGLE = 3;
  Ft.SIGHASH_ANYONECANPAY = 128;
  Ft.SIGHASH_OUTPUT_MASK = 3;
  Ft.SIGHASH_INPUT_MASK = 128;
  Ft.ADVANCED_TRANSACTION_MARKER = 0;
  Ft.ADVANCED_TRANSACTION_FLAG = 1;
});
var Bp = _((Vo) => {
  "use strict";
  Object.defineProperty(Vo, "__esModule", { value: !0 });
  Vo.Block = void 0;
  var Hn = ds(),
    _c = Sr(),
    x5 = Ip(),
    E5 = qi(),
    kp = yt(),
    { typeforce: A5 } = kp,
    Sc = new TypeError("Cannot compute merkle root for zero transactions"),
    Mp = new TypeError("Cannot compute witness commit for non-segwit block"),
    xc = class e {
      constructor() {
        ((this.version = 1),
          (this.prevHash = void 0),
          (this.merkleRoot = void 0),
          (this.timestamp = 0),
          (this.witnessCommit = void 0),
          (this.bits = 0),
          (this.nonce = 0),
          (this.transactions = void 0));
      }
      static fromBuffer(t) {
        if (t.length < 80) throw new Error("Buffer too small (< 80 bytes)");
        let r = new Hn.BufferReader(t),
          n = new e();
        if (
          ((n.version = r.readInt32()),
          (n.prevHash = r.readSlice(32)),
          (n.merkleRoot = r.readSlice(32)),
          (n.timestamp = r.readUInt32()),
          (n.bits = r.readUInt32()),
          (n.nonce = r.readUInt32()),
          t.length === 80)
        )
          return n;
        let i = () => {
            let f = E5.Transaction.fromBuffer(r.buffer.slice(r.offset), !0);
            return ((r.offset += f.byteLength()), f);
          },
          s = r.readVarInt();
        n.transactions = [];
        for (let f = 0; f < s; ++f) {
          let u = i();
          n.transactions.push(u);
        }
        let o = n.getWitnessCommit();
        return (o && (n.witnessCommit = o), n);
      }
      static fromHex(t) {
        return e.fromBuffer(Buffer.from(t, "hex"));
      }
      static calculateTarget(t) {
        let r = ((t & 4278190080) >> 24) - 3,
          n = t & 8388607,
          i = Buffer.alloc(32, 0);
        return (i.writeUIntBE(n, 29 - r, 3), i);
      }
      static calculateMerkleRoot(t, r) {
        if ((A5([{ getHash: kp.Function }], t), t.length === 0)) throw Sc;
        if (r && !Op(t)) throw Mp;
        let n = t.map((s) => s.getHash(r)),
          i = (0, x5.fastMerkleRoot)(n, _c.hash256);
        return r ? _c.hash256(Buffer.concat([i, t[0].ins[0].witness[0]])) : i;
      }
      getWitnessCommit() {
        if (!Op(this.transactions)) return null;
        let t = this.transactions[0].outs
          .filter((n) =>
            n.script.slice(0, 6).equals(Buffer.from("6a24aa21a9ed", "hex")),
          )
          .map((n) => n.script.slice(6, 38));
        if (t.length === 0) return null;
        let r = t[t.length - 1];
        return r instanceof Buffer && r.length === 32 ? r : null;
      }
      hasWitnessCommit() {
        return (
          (this.witnessCommit instanceof Buffer &&
            this.witnessCommit.length === 32) ||
          this.getWitnessCommit() !== null
        );
      }
      hasWitness() {
        return I5(this.transactions);
      }
      weight() {
        let t = this.byteLength(!1, !1),
          r = this.byteLength(!1, !0);
        return t * 3 + r;
      }
      byteLength(t, r = !0) {
        return t || !this.transactions
          ? 80
          : 80 +
              Hn.varuint.encodingLength(this.transactions.length) +
              this.transactions.reduce((n, i) => n + i.byteLength(r), 0);
      }
      getHash() {
        return _c.hash256(this.toBuffer(!0));
      }
      getId() {
        return (0, Hn.reverseBuffer)(this.getHash()).toString("hex");
      }
      getUTCDate() {
        let t = new Date(0);
        return (t.setUTCSeconds(this.timestamp), t);
      }
      toBuffer(t) {
        let r = Buffer.allocUnsafe(this.byteLength(t)),
          n = new Hn.BufferWriter(r);
        return (
          n.writeInt32(this.version),
          n.writeSlice(this.prevHash),
          n.writeSlice(this.merkleRoot),
          n.writeUInt32(this.timestamp),
          n.writeUInt32(this.bits),
          n.writeUInt32(this.nonce),
          t ||
            !this.transactions ||
            (Hn.varuint.encode(this.transactions.length, r, n.offset),
            (n.offset += Hn.varuint.encode.bytes),
            this.transactions.forEach((i) => {
              let s = i.byteLength();
              (i.toBuffer(r, n.offset), (n.offset += s));
            })),
          r
        );
      }
      toHex(t) {
        return this.toBuffer(t).toString("hex");
      }
      checkTxRoots() {
        let t = this.hasWitnessCommit();
        return !t && this.hasWitness()
          ? !1
          : this.__checkMerkleRoot() && (t ? this.__checkWitnessCommit() : !0);
      }
      checkProofOfWork() {
        let t = (0, Hn.reverseBuffer)(this.getHash()),
          r = e.calculateTarget(this.bits);
        return t.compare(r) <= 0;
      }
      __checkMerkleRoot() {
        if (!this.transactions) throw Sc;
        let t = e.calculateMerkleRoot(this.transactions);
        return this.merkleRoot.compare(t) === 0;
      }
      __checkWitnessCommit() {
        if (!this.transactions) throw Sc;
        if (!this.hasWitnessCommit()) throw Mp;
        let t = e.calculateMerkleRoot(this.transactions, !0);
        return this.witnessCommit.compare(t) === 0;
      }
    };
  Vo.Block = xc;
  function Op(e) {
    return (
      e instanceof Array &&
      e[0] &&
      e[0].ins &&
      e[0].ins instanceof Array &&
      e[0].ins[0] &&
      e[0].ins[0].witness &&
      e[0].ins[0].witness instanceof Array &&
      e[0].ins[0].witness.length > 0
    );
  }
  function I5(e) {
    return (
      e instanceof Array &&
      e.some(
        (t) =>
          typeof t == "object" &&
          t.ins instanceof Array &&
          t.ins.some(
            (r) =>
              typeof r == "object" &&
              r.witness instanceof Array &&
              r.witness.length > 0,
          ),
      )
    );
  }
});
var ht = _((sr) => {
  "use strict";
  Object.defineProperty(sr, "__esModule", { value: !0 });
  var T5;
  (function (e) {
    ((e[(e.UNSIGNED_TX = 0)] = "UNSIGNED_TX"),
      (e[(e.GLOBAL_XPUB = 1)] = "GLOBAL_XPUB"));
  })((T5 = sr.GlobalTypes || (sr.GlobalTypes = {})));
  sr.GLOBAL_TYPE_NAMES = ["unsignedTx", "globalXpub"];
  var P5;
  (function (e) {
    ((e[(e.NON_WITNESS_UTXO = 0)] = "NON_WITNESS_UTXO"),
      (e[(e.WITNESS_UTXO = 1)] = "WITNESS_UTXO"),
      (e[(e.PARTIAL_SIG = 2)] = "PARTIAL_SIG"),
      (e[(e.SIGHASH_TYPE = 3)] = "SIGHASH_TYPE"),
      (e[(e.REDEEM_SCRIPT = 4)] = "REDEEM_SCRIPT"),
      (e[(e.WITNESS_SCRIPT = 5)] = "WITNESS_SCRIPT"),
      (e[(e.BIP32_DERIVATION = 6)] = "BIP32_DERIVATION"),
      (e[(e.FINAL_SCRIPTSIG = 7)] = "FINAL_SCRIPTSIG"),
      (e[(e.FINAL_SCRIPTWITNESS = 8)] = "FINAL_SCRIPTWITNESS"),
      (e[(e.POR_COMMITMENT = 9)] = "POR_COMMITMENT"),
      (e[(e.TAP_KEY_SIG = 19)] = "TAP_KEY_SIG"),
      (e[(e.TAP_SCRIPT_SIG = 20)] = "TAP_SCRIPT_SIG"),
      (e[(e.TAP_LEAF_SCRIPT = 21)] = "TAP_LEAF_SCRIPT"),
      (e[(e.TAP_BIP32_DERIVATION = 22)] = "TAP_BIP32_DERIVATION"),
      (e[(e.TAP_INTERNAL_KEY = 23)] = "TAP_INTERNAL_KEY"),
      (e[(e.TAP_MERKLE_ROOT = 24)] = "TAP_MERKLE_ROOT"));
  })((P5 = sr.InputTypes || (sr.InputTypes = {})));
  sr.INPUT_TYPE_NAMES = [
    "nonWitnessUtxo",
    "witnessUtxo",
    "partialSig",
    "sighashType",
    "redeemScript",
    "witnessScript",
    "bip32Derivation",
    "finalScriptSig",
    "finalScriptWitness",
    "porCommitment",
    "tapKeySig",
    "tapScriptSig",
    "tapLeafScript",
    "tapBip32Derivation",
    "tapInternalKey",
    "tapMerkleRoot",
  ];
  var M5;
  (function (e) {
    ((e[(e.REDEEM_SCRIPT = 0)] = "REDEEM_SCRIPT"),
      (e[(e.WITNESS_SCRIPT = 1)] = "WITNESS_SCRIPT"),
      (e[(e.BIP32_DERIVATION = 2)] = "BIP32_DERIVATION"),
      (e[(e.TAP_INTERNAL_KEY = 5)] = "TAP_INTERNAL_KEY"),
      (e[(e.TAP_TREE = 6)] = "TAP_TREE"),
      (e[(e.TAP_BIP32_DERIVATION = 7)] = "TAP_BIP32_DERIVATION"));
  })((M5 = sr.OutputTypes || (sr.OutputTypes = {})));
  sr.OUTPUT_TYPE_NAMES = [
    "redeemScript",
    "witnessScript",
    "bip32Derivation",
    "tapInternalKey",
    "tapTree",
    "tapBip32Derivation",
  ];
});
var Hp = _((Nn) => {
  "use strict";
  Object.defineProperty(Nn, "__esModule", { value: !0 });
  var qp = ht(),
    O5 = (e) => [...Array(e).keys()];
  function k5(e) {
    if (e.key[0] !== qp.GlobalTypes.GLOBAL_XPUB)
      throw new Error(
        "Decode Error: could not decode globalXpub with key 0x" +
          e.key.toString("hex"),
      );
    if (e.key.length !== 79 || ![2, 3].includes(e.key[46]))
      throw new Error(
        "Decode Error: globalXpub has invalid extended pubkey in key 0x" +
          e.key.toString("hex"),
      );
    if ((e.value.length / 4) % 1 !== 0)
      throw new Error(
        "Decode Error: Global GLOBAL_XPUB value length should be multiple of 4",
      );
    let t = e.key.slice(1),
      r = {
        masterFingerprint: e.value.slice(0, 4),
        extendedPubkey: t,
        path: "m",
      };
    for (let n of O5(e.value.length / 4 - 1)) {
      let i = e.value.readUInt32LE(n * 4 + 4),
        s = !!(i & 2147483648),
        o = i & 2147483647;
      r.path += "/" + o.toString(10) + (s ? "'" : "");
    }
    return r;
  }
  Nn.decode = k5;
  function B5(e) {
    let t = Buffer.from([qp.GlobalTypes.GLOBAL_XPUB]),
      r = Buffer.concat([t, e.extendedPubkey]),
      n = e.path.split("/"),
      i = Buffer.allocUnsafe(n.length * 4);
    e.masterFingerprint.copy(i, 0);
    let s = 4;
    return (
      n.slice(1).forEach((o) => {
        let f = o.slice(-1) === "'",
          u = 2147483647 & parseInt(f ? o.slice(0, -1) : o, 10);
        (f && (u += 2147483648), i.writeUInt32LE(u, s), (s += 4));
      }),
      { key: r, value: i }
    );
  }
  Nn.encode = B5;
  Nn.expected =
    "{ masterFingerprint: Buffer; extendedPubkey: Buffer; path: string; }";
  function q5(e) {
    let t = e.extendedPubkey,
      r = e.masterFingerprint,
      n = e.path;
    return (
      Buffer.isBuffer(t) &&
      t.length === 78 &&
      [2, 3].indexOf(t[45]) > -1 &&
      Buffer.isBuffer(r) &&
      r.length === 4 &&
      typeof n == "string" &&
      !!n.match(/^m(\/\d+'?)*$/)
    );
  }
  Nn.check = q5;
  function H5(e, t, r) {
    let n = t.extendedPubkey.toString("hex");
    return r.has(n)
      ? !1
      : (r.add(n),
        e.filter((i) => i.extendedPubkey.equals(t.extendedPubkey)).length ===
          0);
  }
  Nn.canAddToArray = H5;
});
var Np = _((Ec) => {
  "use strict";
  Object.defineProperty(Ec, "__esModule", { value: !0 });
  var N5 = ht();
  function R5(e) {
    return {
      key: Buffer.from([N5.GlobalTypes.UNSIGNED_TX]),
      value: e.toBuffer(),
    };
  }
  Ec.encode = R5;
});
var Cp = _((Rn) => {
  "use strict";
  Object.defineProperty(Rn, "__esModule", { value: !0 });
  var Rp = ht();
  function C5(e) {
    if (e.key[0] !== Rp.InputTypes.FINAL_SCRIPTSIG)
      throw new Error(
        "Decode Error: could not decode finalScriptSig with key 0x" +
          e.key.toString("hex"),
      );
    return e.value;
  }
  Rn.decode = C5;
  function U5(e) {
    return { key: Buffer.from([Rp.InputTypes.FINAL_SCRIPTSIG]), value: e };
  }
  Rn.encode = U5;
  Rn.expected = "Buffer";
  function L5(e) {
    return Buffer.isBuffer(e);
  }
  Rn.check = L5;
  function F5(e, t) {
    return !!e && !!t && e.finalScriptSig === void 0;
  }
  Rn.canAdd = F5;
});
var Lp = _((Cn) => {
  "use strict";
  Object.defineProperty(Cn, "__esModule", { value: !0 });
  var Up = ht();
  function K5(e) {
    if (e.key[0] !== Up.InputTypes.FINAL_SCRIPTWITNESS)
      throw new Error(
        "Decode Error: could not decode finalScriptWitness with key 0x" +
          e.key.toString("hex"),
      );
    return e.value;
  }
  Cn.decode = K5;
  function j5(e) {
    return { key: Buffer.from([Up.InputTypes.FINAL_SCRIPTWITNESS]), value: e };
  }
  Cn.encode = j5;
  Cn.expected = "Buffer";
  function D5(e) {
    return Buffer.isBuffer(e);
  }
  Cn.check = D5;
  function V5(e, t) {
    return !!e && !!t && e.finalScriptWitness === void 0;
  }
  Cn.canAdd = V5;
});
var Kp = _((Un) => {
  "use strict";
  Object.defineProperty(Un, "__esModule", { value: !0 });
  var Fp = ht();
  function W5(e) {
    if (e.key[0] !== Fp.InputTypes.NON_WITNESS_UTXO)
      throw new Error(
        "Decode Error: could not decode nonWitnessUtxo with key 0x" +
          e.key.toString("hex"),
      );
    return e.value;
  }
  Un.decode = W5;
  function z5(e) {
    return { key: Buffer.from([Fp.InputTypes.NON_WITNESS_UTXO]), value: e };
  }
  Un.encode = z5;
  Un.expected = "Buffer";
  function G5(e) {
    return Buffer.isBuffer(e);
  }
  Un.check = G5;
  function X5(e, t) {
    return !!e && !!t && e.nonWitnessUtxo === void 0;
  }
  Un.canAdd = X5;
});
var Dp = _((Ln) => {
  "use strict";
  Object.defineProperty(Ln, "__esModule", { value: !0 });
  var jp = ht();
  function Y5(e) {
    if (e.key[0] !== jp.InputTypes.PARTIAL_SIG)
      throw new Error(
        "Decode Error: could not decode partialSig with key 0x" +
          e.key.toString("hex"),
      );
    if (
      !(e.key.length === 34 || e.key.length === 66) ||
      ![2, 3, 4].includes(e.key[1])
    )
      throw new Error(
        "Decode Error: partialSig has invalid pubkey in key 0x" +
          e.key.toString("hex"),
      );
    return { pubkey: e.key.slice(1), signature: e.value };
  }
  Ln.decode = Y5;
  function $5(e) {
    let t = Buffer.from([jp.InputTypes.PARTIAL_SIG]);
    return { key: Buffer.concat([t, e.pubkey]), value: e.signature };
  }
  Ln.encode = $5;
  Ln.expected = "{ pubkey: Buffer; signature: Buffer; }";
  function J5(e) {
    return (
      Buffer.isBuffer(e.pubkey) &&
      Buffer.isBuffer(e.signature) &&
      [33, 65].includes(e.pubkey.length) &&
      [2, 3, 4].includes(e.pubkey[0]) &&
      Z5(e.signature)
    );
  }
  Ln.check = J5;
  function Z5(e) {
    if (
      !Buffer.isBuffer(e) ||
      e.length < 9 ||
      e[0] !== 48 ||
      e.length !== e[1] + 3 ||
      e[2] !== 2
    )
      return !1;
    let t = e[3];
    if (t > 33 || t < 1 || e[3 + t + 1] !== 2) return !1;
    let r = e[3 + t + 2];
    return !(r > 33 || r < 1 || e.length !== 3 + t + 2 + r + 2);
  }
  function Q5(e, t, r) {
    let n = t.pubkey.toString("hex");
    return r.has(n)
      ? !1
      : (r.add(n), e.filter((i) => i.pubkey.equals(t.pubkey)).length === 0);
  }
  Ln.canAddToArray = Q5;
});
var Wp = _((Fn) => {
  "use strict";
  Object.defineProperty(Fn, "__esModule", { value: !0 });
  var Vp = ht();
  function em(e) {
    if (e.key[0] !== Vp.InputTypes.POR_COMMITMENT)
      throw new Error(
        "Decode Error: could not decode porCommitment with key 0x" +
          e.key.toString("hex"),
      );
    return e.value.toString("utf8");
  }
  Fn.decode = em;
  function tm(e) {
    return {
      key: Buffer.from([Vp.InputTypes.POR_COMMITMENT]),
      value: Buffer.from(e, "utf8"),
    };
  }
  Fn.encode = tm;
  Fn.expected = "string";
  function rm(e) {
    return typeof e == "string";
  }
  Fn.check = rm;
  function nm(e, t) {
    return !!e && !!t && e.porCommitment === void 0;
  }
  Fn.canAdd = nm;
});
var Gp = _((Kn) => {
  "use strict";
  Object.defineProperty(Kn, "__esModule", { value: !0 });
  var zp = ht();
  function im(e) {
    if (e.key[0] !== zp.InputTypes.SIGHASH_TYPE)
      throw new Error(
        "Decode Error: could not decode sighashType with key 0x" +
          e.key.toString("hex"),
      );
    return e.value.readUInt32LE(0);
  }
  Kn.decode = im;
  function sm(e) {
    let t = Buffer.from([zp.InputTypes.SIGHASH_TYPE]),
      r = Buffer.allocUnsafe(4);
    return (r.writeUInt32LE(e, 0), { key: t, value: r });
  }
  Kn.encode = sm;
  Kn.expected = "number";
  function om(e) {
    return typeof e == "number";
  }
  Kn.check = om;
  function fm(e, t) {
    return !!e && !!t && e.sighashType === void 0;
  }
  Kn.canAdd = fm;
});
var $p = _((jn) => {
  "use strict";
  Object.defineProperty(jn, "__esModule", { value: !0 });
  var Xp = ht();
  function am(e) {
    if (e.key[0] !== Xp.InputTypes.TAP_KEY_SIG || e.key.length !== 1)
      throw new Error(
        "Decode Error: could not decode tapKeySig with key 0x" +
          e.key.toString("hex"),
      );
    if (!Yp(e.value))
      throw new Error(
        "Decode Error: tapKeySig not a valid 64-65-byte BIP340 signature",
      );
    return e.value;
  }
  jn.decode = am;
  function cm(e) {
    return { key: Buffer.from([Xp.InputTypes.TAP_KEY_SIG]), value: e };
  }
  jn.encode = cm;
  jn.expected = "Buffer";
  function Yp(e) {
    return Buffer.isBuffer(e) && (e.length === 64 || e.length === 65);
  }
  jn.check = Yp;
  function um(e, t) {
    return !!e && !!t && e.tapKeySig === void 0;
  }
  jn.canAdd = um;
});
var Zp = _((Dn) => {
  "use strict";
  Object.defineProperty(Dn, "__esModule", { value: !0 });
  var Jp = ht();
  function dm(e) {
    if (e.key[0] !== Jp.InputTypes.TAP_LEAF_SCRIPT)
      throw new Error(
        "Decode Error: could not decode tapLeafScript with key 0x" +
          e.key.toString("hex"),
      );
    if ((e.key.length - 2) % 32 !== 0)
      throw new Error(
        "Decode Error: tapLeafScript has invalid control block in key 0x" +
          e.key.toString("hex"),
      );
    let t = e.value[e.value.length - 1];
    if ((e.key[1] & 254) !== t)
      throw new Error(
        "Decode Error: tapLeafScript bad leaf version in key 0x" +
          e.key.toString("hex"),
      );
    let r = e.value.slice(0, -1);
    return { controlBlock: e.key.slice(1), script: r, leafVersion: t };
  }
  Dn.decode = dm;
  function hm(e) {
    let t = Buffer.from([Jp.InputTypes.TAP_LEAF_SCRIPT]),
      r = Buffer.from([e.leafVersion]);
    return {
      key: Buffer.concat([t, e.controlBlock]),
      value: Buffer.concat([e.script, r]),
    };
  }
  Dn.encode = hm;
  Dn.expected =
    "{ controlBlock: Buffer; leafVersion: number, script: Buffer; }";
  function lm(e) {
    return (
      Buffer.isBuffer(e.controlBlock) &&
      (e.controlBlock.length - 1) % 32 === 0 &&
      (e.controlBlock[0] & 254) === e.leafVersion &&
      Buffer.isBuffer(e.script)
    );
  }
  Dn.check = lm;
  function pm(e, t, r) {
    let n = t.controlBlock.toString("hex");
    return r.has(n)
      ? !1
      : (r.add(n),
        e.filter((i) => i.controlBlock.equals(t.controlBlock)).length === 0);
  }
  Dn.canAddToArray = pm;
});
var t1 = _((Vn) => {
  "use strict";
  Object.defineProperty(Vn, "__esModule", { value: !0 });
  var Qp = ht();
  function bm(e) {
    if (e.key[0] !== Qp.InputTypes.TAP_MERKLE_ROOT || e.key.length !== 1)
      throw new Error(
        "Decode Error: could not decode tapMerkleRoot with key 0x" +
          e.key.toString("hex"),
      );
    if (!e1(e.value))
      throw new Error("Decode Error: tapMerkleRoot not a 32-byte hash");
    return e.value;
  }
  Vn.decode = bm;
  function ym(e) {
    return { key: Buffer.from([Qp.InputTypes.TAP_MERKLE_ROOT]), value: e };
  }
  Vn.encode = ym;
  Vn.expected = "Buffer";
  function e1(e) {
    return Buffer.isBuffer(e) && e.length === 32;
  }
  Vn.check = e1;
  function vm(e, t) {
    return !!e && !!t && e.tapMerkleRoot === void 0;
  }
  Vn.canAdd = vm;
});
var n1 = _((Wn) => {
  "use strict";
  Object.defineProperty(Wn, "__esModule", { value: !0 });
  var r1 = ht();
  function gm(e) {
    if (e.key[0] !== r1.InputTypes.TAP_SCRIPT_SIG)
      throw new Error(
        "Decode Error: could not decode tapScriptSig with key 0x" +
          e.key.toString("hex"),
      );
    if (e.key.length !== 65)
      throw new Error(
        "Decode Error: tapScriptSig has invalid key 0x" + e.key.toString("hex"),
      );
    if (e.value.length !== 64 && e.value.length !== 65)
      throw new Error(
        "Decode Error: tapScriptSig has invalid signature in key 0x" +
          e.key.toString("hex"),
      );
    let t = e.key.slice(1, 33),
      r = e.key.slice(33);
    return { pubkey: t, leafHash: r, signature: e.value };
  }
  Wn.decode = gm;
  function mm(e) {
    let t = Buffer.from([r1.InputTypes.TAP_SCRIPT_SIG]);
    return {
      key: Buffer.concat([t, e.pubkey, e.leafHash]),
      value: e.signature,
    };
  }
  Wn.encode = mm;
  Wn.expected = "{ pubkey: Buffer; leafHash: Buffer; signature: Buffer; }";
  function wm(e) {
    return (
      Buffer.isBuffer(e.pubkey) &&
      Buffer.isBuffer(e.leafHash) &&
      Buffer.isBuffer(e.signature) &&
      e.pubkey.length === 32 &&
      e.leafHash.length === 32 &&
      (e.signature.length === 64 || e.signature.length === 65)
    );
  }
  Wn.check = wm;
  function _m(e, t, r) {
    let n = t.pubkey.toString("hex") + t.leafHash.toString("hex");
    return r.has(n)
      ? !1
      : (r.add(n),
        e.filter(
          (i) => i.pubkey.equals(t.pubkey) && i.leafHash.equals(t.leafHash),
        ).length === 0);
  }
  Wn.canAddToArray = _m;
});
var vn = _((ps) => {
  "use strict";
  Object.defineProperty(ps, "__esModule", { value: !0 });
  var Sm = 9007199254740991;
  function Ac(e) {
    if (e < 0 || e > Sm || e % 1 !== 0)
      throw new RangeError("value out of range");
  }
  function hs(e, t, r) {
    if ((Ac(e), t || (t = Buffer.allocUnsafe(i1(e))), !Buffer.isBuffer(t)))
      throw new TypeError("buffer must be a Buffer instance");
    return (
      r || (r = 0),
      e < 253
        ? (t.writeUInt8(e, r), Object.assign(hs, { bytes: 1 }))
        : e <= 65535
          ? (t.writeUInt8(253, r),
            t.writeUInt16LE(e, r + 1),
            Object.assign(hs, { bytes: 3 }))
          : e <= 4294967295
            ? (t.writeUInt8(254, r),
              t.writeUInt32LE(e, r + 1),
              Object.assign(hs, { bytes: 5 }))
            : (t.writeUInt8(255, r),
              t.writeUInt32LE(e >>> 0, r + 1),
              t.writeUInt32LE((e / 4294967296) | 0, r + 5),
              Object.assign(hs, { bytes: 9 })),
      t
    );
  }
  ps.encode = hs;
  function ls(e, t) {
    if (!Buffer.isBuffer(e))
      throw new TypeError("buffer must be a Buffer instance");
    t || (t = 0);
    let r = e.readUInt8(t);
    if (r < 253) return (Object.assign(ls, { bytes: 1 }), r);
    if (r === 253)
      return (Object.assign(ls, { bytes: 3 }), e.readUInt16LE(t + 1));
    if (r === 254)
      return (Object.assign(ls, { bytes: 5 }), e.readUInt32LE(t + 1));
    {
      Object.assign(ls, { bytes: 9 });
      let n = e.readUInt32LE(t + 1),
        s = e.readUInt32LE(t + 5) * 4294967296 + n;
      return (Ac(s), s);
    }
  }
  ps.decode = ls;
  function i1(e) {
    return (Ac(e), e < 253 ? 1 : e <= 65535 ? 3 : e <= 4294967295 ? 5 : 9);
  }
  ps.encodingLength = i1;
});
var zo = _((gn) => {
  "use strict";
  Object.defineProperty(gn, "__esModule", { value: !0 });
  var Wo = vn();
  gn.range = (e) => [...Array(e).keys()];
  function xm(e) {
    if (e.length < 1) return e;
    let t = e.length - 1,
      r = 0;
    for (let n = 0; n < e.length / 2; n++)
      ((r = e[n]), (e[n] = e[t]), (e[t] = r), t--);
    return e;
  }
  gn.reverseBuffer = xm;
  function Em(e) {
    let t = e.map(s1);
    return (t.push(Buffer.from([0])), Buffer.concat(t));
  }
  gn.keyValsToBuffer = Em;
  function s1(e) {
    let t = e.key.length,
      r = e.value.length,
      n = Wo.encodingLength(t),
      i = Wo.encodingLength(r),
      s = Buffer.allocUnsafe(n + t + i + r);
    return (
      Wo.encode(t, s, 0),
      e.key.copy(s, n),
      Wo.encode(r, s, n + t),
      e.value.copy(s, n + t + i),
      s
    );
  }
  gn.keyValToBuffer = s1;
  function o1(e, t) {
    if (typeof e != "number")
      throw new Error("cannot write a non-number as a number");
    if (e < 0)
      throw new Error(
        "specified a negative value for writing an unsigned value",
      );
    if (e > t) throw new Error("RangeError: value out of range");
    if (Math.floor(e) !== e)
      throw new Error("value has a fractional component");
  }
  function Am(e, t) {
    let r = e.readUInt32LE(t),
      n = e.readUInt32LE(t + 4);
    return ((n *= 4294967296), o1(n + r, 9007199254740991), n + r);
  }
  gn.readUInt64LE = Am;
  function Im(e, t, r) {
    return (
      o1(t, 9007199254740991),
      e.writeInt32LE(t & -1, r),
      e.writeUInt32LE(Math.floor(t / 4294967296), r + 4),
      r + 8
    );
  }
  gn.writeUInt64LE = Im;
});
var c1 = _((zn) => {
  "use strict";
  Object.defineProperty(zn, "__esModule", { value: !0 });
  var f1 = ht(),
    a1 = zo(),
    Go = vn();
  function Tm(e) {
    if (e.key[0] !== f1.InputTypes.WITNESS_UTXO)
      throw new Error(
        "Decode Error: could not decode witnessUtxo with key 0x" +
          e.key.toString("hex"),
      );
    let t = a1.readUInt64LE(e.value, 0),
      r = 8,
      n = Go.decode(e.value, r);
    r += Go.encodingLength(n);
    let i = e.value.slice(r);
    if (i.length !== n)
      throw new Error("Decode Error: WITNESS_UTXO script is not proper length");
    return { script: i, value: t };
  }
  zn.decode = Tm;
  function Pm(e) {
    let { script: t, value: r } = e,
      n = Go.encodingLength(t.length),
      i = Buffer.allocUnsafe(8 + n + t.length);
    return (
      a1.writeUInt64LE(i, r, 0),
      Go.encode(t.length, i, 8),
      t.copy(i, 8 + n),
      { key: Buffer.from([f1.InputTypes.WITNESS_UTXO]), value: i }
    );
  }
  zn.encode = Pm;
  zn.expected = "{ script: Buffer; value: number; }";
  function Mm(e) {
    return Buffer.isBuffer(e.script) && typeof e.value == "number";
  }
  zn.check = Mm;
  function Om(e, t) {
    return !!e && !!t && e.witnessUtxo === void 0;
  }
  zn.canAdd = Om;
});
var d1 = _((Gn) => {
  "use strict";
  Object.defineProperty(Gn, "__esModule", { value: !0 });
  var u1 = ht(),
    Ic = vn();
  function km(e) {
    if (e.key[0] !== u1.OutputTypes.TAP_TREE || e.key.length !== 1)
      throw new Error(
        "Decode Error: could not decode tapTree with key 0x" +
          e.key.toString("hex"),
      );
    let t = 0,
      r = [];
    for (; t < e.value.length; ) {
      let n = e.value[t++],
        i = e.value[t++],
        s = Ic.decode(e.value, t);
      ((t += Ic.encodingLength(s)),
        r.push({ depth: n, leafVersion: i, script: e.value.slice(t, t + s) }),
        (t += s));
    }
    return { leaves: r };
  }
  Gn.decode = km;
  function Bm(e) {
    let t = Buffer.from([u1.OutputTypes.TAP_TREE]),
      r = [].concat(
        ...e.leaves.map((n) => [
          Buffer.of(n.depth, n.leafVersion),
          Ic.encode(n.script.length),
          n.script,
        ]),
      );
    return { key: t, value: Buffer.concat(r) };
  }
  Gn.encode = Bm;
  Gn.expected =
    "{ leaves: [{ depth: number; leafVersion: number, script: Buffer; }] }";
  function qm(e) {
    return (
      Array.isArray(e.leaves) &&
      e.leaves.every(
        (t) =>
          t.depth >= 0 &&
          t.depth <= 128 &&
          (t.leafVersion & 254) === t.leafVersion &&
          Buffer.isBuffer(t.script),
      )
    );
  }
  Gn.check = qm;
  function Hm(e, t) {
    return !!e && !!t && e.tapTree === void 0;
  }
  Gn.canAdd = Hm;
});
var Pc = _((Tc) => {
  "use strict";
  Object.defineProperty(Tc, "__esModule", { value: !0 });
  var Nm = (e) => [...Array(e).keys()],
    Rm = (e) =>
      (e.length === 33 && [2, 3].includes(e[0])) ||
      (e.length === 65 && e[0] === 4);
  function Cm(e, t = Rm) {
    function r(f) {
      if (f.key[0] !== e)
        throw new Error(
          "Decode Error: could not decode bip32Derivation with key 0x" +
            f.key.toString("hex"),
        );
      let u = f.key.slice(1);
      if (!t(u))
        throw new Error(
          "Decode Error: bip32Derivation has invalid pubkey in key 0x" +
            f.key.toString("hex"),
        );
      if ((f.value.length / 4) % 1 !== 0)
        throw new Error(
          "Decode Error: Input BIP32_DERIVATION value length should be multiple of 4",
        );
      let l = { masterFingerprint: f.value.slice(0, 4), pubkey: u, path: "m" };
      for (let p of Nm(f.value.length / 4 - 1)) {
        let h = f.value.readUInt32LE(p * 4 + 4),
          w = !!(h & 2147483648),
          E = h & 2147483647;
        l.path += "/" + E.toString(10) + (w ? "'" : "");
      }
      return l;
    }
    function n(f) {
      let u = Buffer.from([e]),
        l = Buffer.concat([u, f.pubkey]),
        p = f.path.split("/"),
        h = Buffer.allocUnsafe(p.length * 4);
      f.masterFingerprint.copy(h, 0);
      let w = 4;
      return (
        p.slice(1).forEach((E) => {
          let A = E.slice(-1) === "'",
            T = 2147483647 & parseInt(A ? E.slice(0, -1) : E, 10);
          (A && (T += 2147483648), h.writeUInt32LE(T, w), (w += 4));
        }),
        { key: l, value: h }
      );
    }
    let i = "{ masterFingerprint: Buffer; pubkey: Buffer; path: string; }";
    function s(f) {
      return (
        Buffer.isBuffer(f.pubkey) &&
        Buffer.isBuffer(f.masterFingerprint) &&
        typeof f.path == "string" &&
        t(f.pubkey) &&
        f.masterFingerprint.length === 4
      );
    }
    function o(f, u, l) {
      let p = u.pubkey.toString("hex");
      return l.has(p)
        ? !1
        : (l.add(p), f.filter((h) => h.pubkey.equals(u.pubkey)).length === 0);
    }
    return { decode: r, encode: n, check: s, expected: i, canAddToArray: o };
  }
  Tc.makeConverter = Cm;
});
var h1 = _((Mc) => {
  "use strict";
  Object.defineProperty(Mc, "__esModule", { value: !0 });
  function Um(e) {
    return t;
    function t(r) {
      let n;
      if (
        e.includes(r.key[0]) &&
        ((n = r.key.slice(1)),
        !(n.length === 33 || n.length === 65) || ![2, 3, 4].includes(n[0]))
      )
        throw new Error(
          "Format Error: invalid pubkey in key 0x" + r.key.toString("hex"),
        );
      return n;
    }
  }
  Mc.makeChecker = Um;
});
var l1 = _((Oc) => {
  "use strict";
  Object.defineProperty(Oc, "__esModule", { value: !0 });
  function Lm(e) {
    function t(o) {
      if (o.key[0] !== e)
        throw new Error(
          "Decode Error: could not decode redeemScript with key 0x" +
            o.key.toString("hex"),
        );
      return o.value;
    }
    function r(o) {
      return { key: Buffer.from([e]), value: o };
    }
    let n = "Buffer";
    function i(o) {
      return Buffer.isBuffer(o);
    }
    function s(o, f) {
      return !!o && !!f && o.redeemScript === void 0;
    }
    return { decode: t, encode: r, check: i, expected: n, canAdd: s };
  }
  Oc.makeConverter = Lm;
});
var p1 = _((kc) => {
  "use strict";
  Object.defineProperty(kc, "__esModule", { value: !0 });
  var Xo = vn(),
    Fm = Pc(),
    Km = (e) => e.length === 32;
  function jm(e) {
    let t = Fm.makeConverter(e, Km);
    function r(o) {
      let f = Xo.decode(o.value),
        u = Xo.encodingLength(f),
        l = t.decode({ key: o.key, value: o.value.slice(u + f * 32) }),
        p = new Array(f);
      for (let h = 0, w = u; h < f; h++, w += 32)
        p[h] = o.value.slice(w, w + 32);
      return Object.assign({}, l, { leafHashes: p });
    }
    function n(o) {
      let f = t.encode(o),
        u = Xo.encodingLength(o.leafHashes.length),
        l = Buffer.allocUnsafe(u);
      Xo.encode(o.leafHashes.length, l);
      let p = Buffer.concat([l, ...o.leafHashes, f.value]);
      return Object.assign({}, f, { value: p });
    }
    let i =
      "{ masterFingerprint: Buffer; pubkey: Buffer; path: string; leafHashes: Buffer[]; }";
    function s(o) {
      return (
        Array.isArray(o.leafHashes) &&
        o.leafHashes.every((f) => Buffer.isBuffer(f) && f.length === 32) &&
        t.check(o)
      );
    }
    return {
      decode: r,
      encode: n,
      check: s,
      expected: i,
      canAddToArray: t.canAddToArray,
    };
  }
  kc.makeConverter = jm;
});
var b1 = _((Bc) => {
  "use strict";
  Object.defineProperty(Bc, "__esModule", { value: !0 });
  function Dm(e) {
    function t(o) {
      if (o.key[0] !== e || o.key.length !== 1)
        throw new Error(
          "Decode Error: could not decode tapInternalKey with key 0x" +
            o.key.toString("hex"),
        );
      if (o.value.length !== 32)
        throw new Error(
          "Decode Error: tapInternalKey not a 32-byte x-only pubkey",
        );
      return o.value;
    }
    function r(o) {
      return { key: Buffer.from([e]), value: o };
    }
    let n = "Buffer";
    function i(o) {
      return Buffer.isBuffer(o) && o.length === 32;
    }
    function s(o, f) {
      return !!o && !!f && o.tapInternalKey === void 0;
    }
    return { decode: t, encode: r, check: i, expected: n, canAdd: s };
  }
  Bc.makeConverter = Dm;
});
var y1 = _((qc) => {
  "use strict";
  Object.defineProperty(qc, "__esModule", { value: !0 });
  function Vm(e) {
    function t(o) {
      if (o.key[0] !== e)
        throw new Error(
          "Decode Error: could not decode witnessScript with key 0x" +
            o.key.toString("hex"),
        );
      return o.value;
    }
    function r(o) {
      return { key: Buffer.from([e]), value: o };
    }
    let n = "Buffer";
    function i(o) {
      return Buffer.isBuffer(o);
    }
    function s(o, f) {
      return !!o && !!f && o.witnessScript === void 0;
    }
    return { decode: t, encode: r, check: i, expected: n, canAdd: s };
  }
  qc.makeConverter = Vm;
});
var Yo = _((bs) => {
  "use strict";
  Object.defineProperty(bs, "__esModule", { value: !0 });
  var Kt = ht(),
    Wm = Hp(),
    zm = Np(),
    Gm = Cp(),
    Xm = Lp(),
    Ym = Kp(),
    $m = Dp(),
    Jm = Wp(),
    Zm = Gp(),
    Qm = $p(),
    e9 = Zp(),
    t9 = t1(),
    r9 = n1(),
    n9 = c1(),
    i9 = d1(),
    v1 = Pc(),
    Hc = h1(),
    g1 = l1(),
    m1 = p1(),
    w1 = b1(),
    _1 = y1(),
    s9 = { unsignedTx: zm, globalXpub: Wm, checkPubkey: Hc.makeChecker([]) };
  bs.globals = s9;
  var o9 = {
    nonWitnessUtxo: Ym,
    partialSig: $m,
    sighashType: Zm,
    finalScriptSig: Gm,
    finalScriptWitness: Xm,
    porCommitment: Jm,
    witnessUtxo: n9,
    bip32Derivation: v1.makeConverter(Kt.InputTypes.BIP32_DERIVATION),
    redeemScript: g1.makeConverter(Kt.InputTypes.REDEEM_SCRIPT),
    witnessScript: _1.makeConverter(Kt.InputTypes.WITNESS_SCRIPT),
    checkPubkey: Hc.makeChecker([
      Kt.InputTypes.PARTIAL_SIG,
      Kt.InputTypes.BIP32_DERIVATION,
    ]),
    tapKeySig: Qm,
    tapScriptSig: r9,
    tapLeafScript: e9,
    tapBip32Derivation: m1.makeConverter(Kt.InputTypes.TAP_BIP32_DERIVATION),
    tapInternalKey: w1.makeConverter(Kt.InputTypes.TAP_INTERNAL_KEY),
    tapMerkleRoot: t9,
  };
  bs.inputs = o9;
  var f9 = {
    bip32Derivation: v1.makeConverter(Kt.OutputTypes.BIP32_DERIVATION),
    redeemScript: g1.makeConverter(Kt.OutputTypes.REDEEM_SCRIPT),
    witnessScript: _1.makeConverter(Kt.OutputTypes.WITNESS_SCRIPT),
    checkPubkey: Hc.makeChecker([Kt.OutputTypes.BIP32_DERIVATION]),
    tapBip32Derivation: m1.makeConverter(Kt.OutputTypes.TAP_BIP32_DERIVATION),
    tapTree: i9,
    tapInternalKey: w1.makeConverter(Kt.OutputTypes.TAP_INTERNAL_KEY),
  };
  bs.outputs = f9;
});
var E1 = _((ys) => {
  "use strict";
  Object.defineProperty(ys, "__esModule", { value: !0 });
  var le = Yo(),
    $o = zo(),
    S1 = vn(),
    V = ht();
  function a9(e, t) {
    let r = 0;
    function n() {
      let O = S1.decode(e, r);
      r += S1.encodingLength(O);
      let k = e.slice(r, r + O);
      return ((r += O), k);
    }
    function i() {
      let O = e.readUInt32BE(r);
      return ((r += 4), O);
    }
    function s() {
      let O = e.readUInt8(r);
      return ((r += 1), O);
    }
    function o() {
      let O = n(),
        k = n();
      return { key: O, value: k };
    }
    function f() {
      if (r >= e.length)
        throw new Error("Format Error: Unexpected End of PSBT");
      let O = e.readUInt8(r) === 0;
      return (O && r++, O);
    }
    if (i() !== 1886610036)
      throw new Error("Format Error: Invalid Magic Number");
    if (s() !== 255)
      throw new Error(
        "Format Error: Magic Number must be followed by 0xff separator",
      );
    let u = [],
      l = {};
    for (; !f(); ) {
      let O = o(),
        k = O.key.toString("hex");
      if (l[k])
        throw new Error(
          "Format Error: Keys must be unique for global keymap: key " + k,
        );
      ((l[k] = 1), u.push(O));
    }
    let p = u.filter((O) => O.key[0] === V.GlobalTypes.UNSIGNED_TX);
    if (p.length !== 1)
      throw new Error("Format Error: Only one UNSIGNED_TX allowed");
    let h = t(p[0].value),
      { inputCount: w, outputCount: E } = h.getInputOutputCounts(),
      A = [],
      T = [];
    for (let O of $o.range(w)) {
      let k = {},
        H = [];
      for (; !f(); ) {
        let P = o(),
          M = P.key.toString("hex");
        if (k[M])
          throw new Error(
            "Format Error: Keys must be unique for each input: input index " +
              O +
              " key " +
              M,
          );
        ((k[M] = 1), H.push(P));
      }
      A.push(H);
    }
    for (let O of $o.range(E)) {
      let k = {},
        H = [];
      for (; !f(); ) {
        let P = o(),
          M = P.key.toString("hex");
        if (k[M])
          throw new Error(
            "Format Error: Keys must be unique for each output: output index " +
              O +
              " key " +
              M,
          );
        ((k[M] = 1), H.push(P));
      }
      T.push(H);
    }
    return x1(h, { globalMapKeyVals: u, inputKeyVals: A, outputKeyVals: T });
  }
  ys.psbtFromBuffer = a9;
  function gt(e, t, r) {
    if (!t.equals(Buffer.from([r])))
      throw new Error(`Format Error: Invalid ${e} key: ${t.toString("hex")}`);
  }
  ys.checkKeyBuffer = gt;
  function x1(e, { globalMapKeyVals: t, inputKeyVals: r, outputKeyVals: n }) {
    let i = { unsignedTx: e },
      s = 0;
    for (let p of t)
      switch (p.key[0]) {
        case V.GlobalTypes.UNSIGNED_TX:
          if ((gt("global", p.key, V.GlobalTypes.UNSIGNED_TX), s > 0))
            throw new Error("Format Error: GlobalMap has multiple UNSIGNED_TX");
          s++;
          break;
        case V.GlobalTypes.GLOBAL_XPUB:
          (i.globalXpub === void 0 && (i.globalXpub = []),
            i.globalXpub.push(le.globals.globalXpub.decode(p)));
          break;
        default:
          (i.unknownKeyVals || (i.unknownKeyVals = []),
            i.unknownKeyVals.push(p));
      }
    let o = r.length,
      f = n.length,
      u = [],
      l = [];
    for (let p of $o.range(o)) {
      let h = {};
      for (let w of r[p])
        switch ((le.inputs.checkPubkey(w), w.key[0])) {
          case V.InputTypes.NON_WITNESS_UTXO:
            if (
              (gt("input", w.key, V.InputTypes.NON_WITNESS_UTXO),
              h.nonWitnessUtxo !== void 0)
            )
              throw new Error(
                "Format Error: Input has multiple NON_WITNESS_UTXO",
              );
            h.nonWitnessUtxo = le.inputs.nonWitnessUtxo.decode(w);
            break;
          case V.InputTypes.WITNESS_UTXO:
            if (
              (gt("input", w.key, V.InputTypes.WITNESS_UTXO),
              h.witnessUtxo !== void 0)
            )
              throw new Error("Format Error: Input has multiple WITNESS_UTXO");
            h.witnessUtxo = le.inputs.witnessUtxo.decode(w);
            break;
          case V.InputTypes.PARTIAL_SIG:
            (h.partialSig === void 0 && (h.partialSig = []),
              h.partialSig.push(le.inputs.partialSig.decode(w)));
            break;
          case V.InputTypes.SIGHASH_TYPE:
            if (
              (gt("input", w.key, V.InputTypes.SIGHASH_TYPE),
              h.sighashType !== void 0)
            )
              throw new Error("Format Error: Input has multiple SIGHASH_TYPE");
            h.sighashType = le.inputs.sighashType.decode(w);
            break;
          case V.InputTypes.REDEEM_SCRIPT:
            if (
              (gt("input", w.key, V.InputTypes.REDEEM_SCRIPT),
              h.redeemScript !== void 0)
            )
              throw new Error("Format Error: Input has multiple REDEEM_SCRIPT");
            h.redeemScript = le.inputs.redeemScript.decode(w);
            break;
          case V.InputTypes.WITNESS_SCRIPT:
            if (
              (gt("input", w.key, V.InputTypes.WITNESS_SCRIPT),
              h.witnessScript !== void 0)
            )
              throw new Error(
                "Format Error: Input has multiple WITNESS_SCRIPT",
              );
            h.witnessScript = le.inputs.witnessScript.decode(w);
            break;
          case V.InputTypes.BIP32_DERIVATION:
            (h.bip32Derivation === void 0 && (h.bip32Derivation = []),
              h.bip32Derivation.push(le.inputs.bip32Derivation.decode(w)));
            break;
          case V.InputTypes.FINAL_SCRIPTSIG:
            (gt("input", w.key, V.InputTypes.FINAL_SCRIPTSIG),
              (h.finalScriptSig = le.inputs.finalScriptSig.decode(w)));
            break;
          case V.InputTypes.FINAL_SCRIPTWITNESS:
            (gt("input", w.key, V.InputTypes.FINAL_SCRIPTWITNESS),
              (h.finalScriptWitness = le.inputs.finalScriptWitness.decode(w)));
            break;
          case V.InputTypes.POR_COMMITMENT:
            (gt("input", w.key, V.InputTypes.POR_COMMITMENT),
              (h.porCommitment = le.inputs.porCommitment.decode(w)));
            break;
          case V.InputTypes.TAP_KEY_SIG:
            (gt("input", w.key, V.InputTypes.TAP_KEY_SIG),
              (h.tapKeySig = le.inputs.tapKeySig.decode(w)));
            break;
          case V.InputTypes.TAP_SCRIPT_SIG:
            (h.tapScriptSig === void 0 && (h.tapScriptSig = []),
              h.tapScriptSig.push(le.inputs.tapScriptSig.decode(w)));
            break;
          case V.InputTypes.TAP_LEAF_SCRIPT:
            (h.tapLeafScript === void 0 && (h.tapLeafScript = []),
              h.tapLeafScript.push(le.inputs.tapLeafScript.decode(w)));
            break;
          case V.InputTypes.TAP_BIP32_DERIVATION:
            (h.tapBip32Derivation === void 0 && (h.tapBip32Derivation = []),
              h.tapBip32Derivation.push(
                le.inputs.tapBip32Derivation.decode(w),
              ));
            break;
          case V.InputTypes.TAP_INTERNAL_KEY:
            (gt("input", w.key, V.InputTypes.TAP_INTERNAL_KEY),
              (h.tapInternalKey = le.inputs.tapInternalKey.decode(w)));
            break;
          case V.InputTypes.TAP_MERKLE_ROOT:
            (gt("input", w.key, V.InputTypes.TAP_MERKLE_ROOT),
              (h.tapMerkleRoot = le.inputs.tapMerkleRoot.decode(w)));
            break;
          default:
            (h.unknownKeyVals || (h.unknownKeyVals = []),
              h.unknownKeyVals.push(w));
        }
      u.push(h);
    }
    for (let p of $o.range(f)) {
      let h = {};
      for (let w of n[p])
        switch ((le.outputs.checkPubkey(w), w.key[0])) {
          case V.OutputTypes.REDEEM_SCRIPT:
            if (
              (gt("output", w.key, V.OutputTypes.REDEEM_SCRIPT),
              h.redeemScript !== void 0)
            )
              throw new Error(
                "Format Error: Output has multiple REDEEM_SCRIPT",
              );
            h.redeemScript = le.outputs.redeemScript.decode(w);
            break;
          case V.OutputTypes.WITNESS_SCRIPT:
            if (
              (gt("output", w.key, V.OutputTypes.WITNESS_SCRIPT),
              h.witnessScript !== void 0)
            )
              throw new Error(
                "Format Error: Output has multiple WITNESS_SCRIPT",
              );
            h.witnessScript = le.outputs.witnessScript.decode(w);
            break;
          case V.OutputTypes.BIP32_DERIVATION:
            (h.bip32Derivation === void 0 && (h.bip32Derivation = []),
              h.bip32Derivation.push(le.outputs.bip32Derivation.decode(w)));
            break;
          case V.OutputTypes.TAP_INTERNAL_KEY:
            (gt("output", w.key, V.OutputTypes.TAP_INTERNAL_KEY),
              (h.tapInternalKey = le.outputs.tapInternalKey.decode(w)));
            break;
          case V.OutputTypes.TAP_TREE:
            (gt("output", w.key, V.OutputTypes.TAP_TREE),
              (h.tapTree = le.outputs.tapTree.decode(w)));
            break;
          case V.OutputTypes.TAP_BIP32_DERIVATION:
            (h.tapBip32Derivation === void 0 && (h.tapBip32Derivation = []),
              h.tapBip32Derivation.push(
                le.outputs.tapBip32Derivation.decode(w),
              ));
            break;
          default:
            (h.unknownKeyVals || (h.unknownKeyVals = []),
              h.unknownKeyVals.push(w));
        }
      l.push(h);
    }
    return { globalMap: i, inputs: u, outputs: l };
  }
  ys.psbtFromKeyVals = x1;
});
var T1 = _((Jo) => {
  "use strict";
  Object.defineProperty(Jo, "__esModule", { value: !0 });
  var Nc = Yo(),
    A1 = zo();
  function c9({ globalMap: e, inputs: t, outputs: r }) {
    let {
        globalKeyVals: n,
        inputKeyVals: i,
        outputKeyVals: s,
      } = I1({ globalMap: e, inputs: t, outputs: r }),
      o = A1.keyValsToBuffer(n),
      f = (h) =>
        h.length === 0 ? [Buffer.from([0])] : h.map(A1.keyValsToBuffer),
      u = f(i),
      l = f(s),
      p = Buffer.allocUnsafe(5);
    return (
      p.writeUIntBE(482972169471, 0, 5),
      Buffer.concat([p, o].concat(u, l))
    );
  }
  Jo.psbtToBuffer = c9;
  var u9 = (e, t) => e.key.compare(t.key);
  function Rc(e, t) {
    let r = new Set(),
      n = Object.entries(e).reduce((s, [o, f]) => {
        if (o === "unknownKeyVals") return s;
        let u = t[o];
        if (u === void 0) return s;
        let l = (Array.isArray(f) ? f : [f]).map(u.encode);
        return (
          l
            .map((h) => h.key.toString("hex"))
            .forEach((h) => {
              if (r.has(h))
                throw new Error("Serialize Error: Duplicate key: " + h);
              r.add(h);
            }),
          s.concat(l)
        );
      }, []),
      i = e.unknownKeyVals
        ? e.unknownKeyVals.filter((s) => !r.has(s.key.toString("hex")))
        : [];
    return n.concat(i).sort(u9);
  }
  function I1({ globalMap: e, inputs: t, outputs: r }) {
    return {
      globalKeyVals: Rc(e, Nc.globals),
      inputKeyVals: t.map((n) => Rc(n, Nc.inputs)),
      outputKeyVals: r.map((n) => Rc(n, Nc.outputs)),
    };
  }
  Jo.psbtToKeyVals = I1;
});
var Cc = _((Zo) => {
  "use strict";
  function P1(e) {
    for (var t in e) Zo.hasOwnProperty(t) || (Zo[t] = e[t]);
  }
  Object.defineProperty(Zo, "__esModule", { value: !0 });
  P1(E1());
  P1(T1());
});
var O1 = _((Fc) => {
  "use strict";
  Object.defineProperty(Fc, "__esModule", { value: !0 });
  var Uc = Cc();
  function d9(e) {
    let t = e[0],
      r = Uc.psbtToKeyVals(t),
      n = e.slice(1);
    if (n.length === 0) throw new Error("Combine: Nothing to combine");
    let i = M1(t);
    if (i === void 0) throw new Error("Combine: Self missing transaction");
    let s = Hi(r.globalKeyVals),
      o = r.inputKeyVals.map(Hi),
      f = r.outputKeyVals.map(Hi);
    for (let u of n) {
      let l = M1(u);
      if (l === void 0 || !l.toBuffer().equals(i.toBuffer()))
        throw new Error(
          "Combine: One of the Psbts does not have the same transaction.",
        );
      let p = Uc.psbtToKeyVals(u);
      (Hi(p.globalKeyVals).forEach(Lc(s, r.globalKeyVals, p.globalKeyVals)),
        p.inputKeyVals
          .map(Hi)
          .forEach((A, T) =>
            A.forEach(Lc(o[T], r.inputKeyVals[T], p.inputKeyVals[T])),
          ),
        p.outputKeyVals
          .map(Hi)
          .forEach((A, T) =>
            A.forEach(Lc(f[T], r.outputKeyVals[T], p.outputKeyVals[T])),
          ));
    }
    return Uc.psbtFromKeyVals(i, {
      globalMapKeyVals: r.globalKeyVals,
      inputKeyVals: r.inputKeyVals,
      outputKeyVals: r.outputKeyVals,
    });
  }
  Fc.combine = d9;
  function Lc(e, t, r) {
    return (n) => {
      if (e.has(n)) return;
      let i = r.filter((s) => s.key.toString("hex") === n)[0];
      (t.push(i), e.add(n));
    };
  }
  function M1(e) {
    return e.globalMap.unsignedTx;
  }
  function Hi(e) {
    let t = new Set();
    return (
      e.forEach((r) => {
        let n = r.key.toString("hex");
        if (t.has(n))
          throw new Error("Combine: KeyValue Map keys should be unique");
        t.add(n);
      }),
      t
    );
  }
});
var jc = _((At) => {
  "use strict";
  Object.defineProperty(At, "__esModule", { value: !0 });
  var h9 = Yo();
  function B1(e, t) {
    let r = e[t];
    if (r === void 0) throw new Error(`No input #${t}`);
    return r;
  }
  At.checkForInput = B1;
  function q1(e, t) {
    let r = e[t];
    if (r === void 0) throw new Error(`No output #${t}`);
    return r;
  }
  At.checkForOutput = q1;
  function l9(e, t, r) {
    if (e.key[0] < r)
      throw new Error(
        "Use the method for your specific key instead of addUnknownKeyVal*",
      );
    if (t && t.filter((n) => n.key.equals(e.key)).length !== 0)
      throw new Error(`Duplicate Key: ${e.key.toString("hex")}`);
  }
  At.checkHasKey = l9;
  function p9(e) {
    let t = 0;
    return (
      Object.keys(e).forEach((r) => {
        Number(isNaN(Number(r))) && t++;
      }),
      t
    );
  }
  At.getEnumLength = p9;
  function b9(e, t) {
    let r = !1;
    if (t.nonWitnessUtxo || t.witnessUtxo) {
      let n = !!t.redeemScript,
        i = !!t.witnessScript,
        s = !n || !!t.finalScriptSig,
        o = !i || !!t.finalScriptWitness,
        f = !!t.finalScriptSig || !!t.finalScriptWitness;
      r = s && o && f;
    }
    if (r === !1)
      throw new Error(`Input #${e} has too much or too little data to clean`);
  }
  At.inputCheckUncleanFinalized = b9;
  function k1(e, t, r, n) {
    throw new Error(
      `Data for ${e} key ${t} is incorrect: Expected ${r} and got ${JSON.stringify(n)}`,
    );
  }
  function Kc(e) {
    return (t, r) => {
      for (let n of Object.keys(t)) {
        let i = t[n],
          {
            canAdd: s,
            canAddToArray: o,
            check: f,
            expected: u,
          } = h9[e + "s"][n] || {},
          l = !!o;
        if (f)
          if (l) {
            if (!Array.isArray(i) || (r[n] && !Array.isArray(r[n])))
              throw new Error(`Key type ${n} must be an array`);
            i.every(f) || k1(e, n, u, i);
            let p = r[n] || [],
              h = new Set();
            if (!i.every((w) => o(p, w, h)))
              throw new Error("Can not add duplicate data to array");
            r[n] = p.concat(i);
          } else {
            if ((f(i) || k1(e, n, u, i), !s(r, i)))
              throw new Error(`Can not add duplicate data to ${e}`);
            r[n] = i;
          }
      }
    };
  }
  At.updateGlobal = Kc("global");
  At.updateInput = Kc("input");
  At.updateOutput = Kc("output");
  function y9(e, t) {
    let r = e.length - 1,
      n = B1(e, r);
    At.updateInput(t, n);
  }
  At.addInputAttributes = y9;
  function v9(e, t) {
    let r = e.length - 1,
      n = q1(e, r);
    At.updateOutput(t, n);
  }
  At.addOutputAttributes = v9;
  function g9(e, t) {
    if (!Buffer.isBuffer(t) || t.length < 4)
      throw new Error("Set Version: Invalid Transaction");
    return (t.writeUInt32LE(e, 0), t);
  }
  At.defaultVersionSetter = g9;
  function m9(e, t) {
    if (!Buffer.isBuffer(t) || t.length < 4)
      throw new Error("Set Locktime: Invalid Transaction");
    return (t.writeUInt32LE(e, t.length - 4), t);
  }
  At.defaultLocktimeSetter = m9;
});
var N1 = _((Wc) => {
  "use strict";
  Object.defineProperty(Wc, "__esModule", { value: !0 });
  var w9 = O1(),
    H1 = Cc(),
    Dc = ht(),
    mt = jc(),
    Vc = class {
      constructor(t) {
        ((this.inputs = []),
          (this.outputs = []),
          (this.globalMap = { unsignedTx: t }));
      }
      static fromBase64(t, r) {
        let n = Buffer.from(t, "base64");
        return this.fromBuffer(n, r);
      }
      static fromHex(t, r) {
        let n = Buffer.from(t, "hex");
        return this.fromBuffer(n, r);
      }
      static fromBuffer(t, r) {
        let n = H1.psbtFromBuffer(t, r),
          i = new this(n.globalMap.unsignedTx);
        return (Object.assign(i, n), i);
      }
      toBase64() {
        return this.toBuffer().toString("base64");
      }
      toHex() {
        return this.toBuffer().toString("hex");
      }
      toBuffer() {
        return H1.psbtToBuffer(this);
      }
      updateGlobal(t) {
        return (mt.updateGlobal(t, this.globalMap), this);
      }
      updateInput(t, r) {
        let n = mt.checkForInput(this.inputs, t);
        return (mt.updateInput(r, n), this);
      }
      updateOutput(t, r) {
        let n = mt.checkForOutput(this.outputs, t);
        return (mt.updateOutput(r, n), this);
      }
      addUnknownKeyValToGlobal(t) {
        return (
          mt.checkHasKey(
            t,
            this.globalMap.unknownKeyVals,
            mt.getEnumLength(Dc.GlobalTypes),
          ),
          this.globalMap.unknownKeyVals || (this.globalMap.unknownKeyVals = []),
          this.globalMap.unknownKeyVals.push(t),
          this
        );
      }
      addUnknownKeyValToInput(t, r) {
        let n = mt.checkForInput(this.inputs, t);
        return (
          mt.checkHasKey(r, n.unknownKeyVals, mt.getEnumLength(Dc.InputTypes)),
          n.unknownKeyVals || (n.unknownKeyVals = []),
          n.unknownKeyVals.push(r),
          this
        );
      }
      addUnknownKeyValToOutput(t, r) {
        let n = mt.checkForOutput(this.outputs, t);
        return (
          mt.checkHasKey(r, n.unknownKeyVals, mt.getEnumLength(Dc.OutputTypes)),
          n.unknownKeyVals || (n.unknownKeyVals = []),
          n.unknownKeyVals.push(r),
          this
        );
      }
      addInput(t) {
        (this.globalMap.unsignedTx.addInput(t),
          this.inputs.push({ unknownKeyVals: [] }));
        let r = t.unknownKeyVals || [],
          n = this.inputs.length - 1;
        if (!Array.isArray(r))
          throw new Error("unknownKeyVals must be an Array");
        return (
          r.forEach((i) => this.addUnknownKeyValToInput(n, i)),
          mt.addInputAttributes(this.inputs, t),
          this
        );
      }
      addOutput(t) {
        (this.globalMap.unsignedTx.addOutput(t),
          this.outputs.push({ unknownKeyVals: [] }));
        let r = t.unknownKeyVals || [],
          n = this.outputs.length - 1;
        if (!Array.isArray(r))
          throw new Error("unknownKeyVals must be an Array");
        return (
          r.forEach((i) => this.addUnknownKeyValToOutput(n, i)),
          mt.addOutputAttributes(this.outputs, t),
          this
        );
      }
      clearFinalizedInput(t) {
        let r = mt.checkForInput(this.inputs, t);
        mt.inputCheckUncleanFinalized(t, r);
        for (let n of Object.keys(r))
          [
            "witnessUtxo",
            "nonWitnessUtxo",
            "finalScriptSig",
            "finalScriptWitness",
            "unknownKeyVals",
          ].includes(n) || delete r[n];
        return this;
      }
      combine(...t) {
        let r = w9.combine([this].concat(t));
        return (Object.assign(this, r), this);
      }
      getTransaction() {
        return this.globalMap.unsignedTx.toBuffer();
      }
    };
  Wc.Psbt = Vc;
});
var ef = _((ue) => {
  "use strict";
  Object.defineProperty(ue, "__esModule", { value: !0 });
  ue.signatureBlocksAction =
    ue.checkInputForSig =
    ue.pubkeyInScript =
    ue.pubkeyPositionInScript =
    ue.witnessStackToScriptWitness =
    ue.isP2TR =
    ue.isP2SHScript =
    ue.isP2WSHScript =
    ue.isP2WPKH =
    ue.isP2PKH =
    ue.isP2PK =
    ue.isP2MS =
      void 0;
  var R1 = vn(),
    vs = _t(),
    Qo = qi(),
    _9 = Sr(),
    Xn = ki();
  function Yn(e) {
    return (t) => {
      try {
        return (e({ output: t }), !0);
      } catch {
        return !1;
      }
    };
  }
  ue.isP2MS = Yn(Xn.p2ms);
  ue.isP2PK = Yn(Xn.p2pk);
  ue.isP2PKH = Yn(Xn.p2pkh);
  ue.isP2WPKH = Yn(Xn.p2wpkh);
  ue.isP2WSHScript = Yn(Xn.p2wsh);
  ue.isP2SHScript = Yn(Xn.p2sh);
  ue.isP2TR = Yn(Xn.p2tr);
  function S9(e) {
    let t = Buffer.allocUnsafe(0);
    function r(o) {
      t = Buffer.concat([t, Buffer.from(o)]);
    }
    function n(o) {
      let f = t.length,
        u = R1.encodingLength(o);
      ((t = Buffer.concat([t, Buffer.allocUnsafe(u)])), R1.encode(o, t, f));
    }
    function i(o) {
      (n(o.length), r(o));
    }
    function s(o) {
      (n(o.length), o.forEach(i));
    }
    return (s(e), t);
  }
  ue.witnessStackToScriptWitness = S9;
  function C1(e, t) {
    let r = (0, _9.hash160)(e),
      n = e.slice(1, 33),
      i = vs.decompile(t);
    if (i === null) throw new Error("Unknown script error");
    return i.findIndex((s) =>
      typeof s == "number" ? !1 : s.equals(e) || s.equals(r) || s.equals(n),
    );
  }
  ue.pubkeyPositionInScript = C1;
  function x9(e, t) {
    return C1(e, t) !== -1;
  }
  ue.pubkeyInScript = x9;
  function E9(e, t) {
    return A9(e).some((n) => U1(n, vs.signature.decode, t));
  }
  ue.checkInputForSig = E9;
  function U1(e, t, r) {
    let { hashType: n } = t(e),
      i = [];
    switch (
      (n & Qo.Transaction.SIGHASH_ANYONECANPAY && i.push("addInput"), n & 31)
    ) {
      case Qo.Transaction.SIGHASH_ALL:
        break;
      case Qo.Transaction.SIGHASH_SINGLE:
      case Qo.Transaction.SIGHASH_NONE:
        (i.push("addOutput"), i.push("setInputSequence"));
        break;
    }
    return i.indexOf(r) === -1;
  }
  ue.signatureBlocksAction = U1;
  function A9(e) {
    let t = [];
    if ((e.partialSig || []).length === 0) {
      if (!e.finalScriptSig && !e.finalScriptWitness) return [];
      t = I9(e);
    } else t = e.partialSig;
    return t.map((r) => r.signature);
  }
  function I9(e) {
    let t = e.finalScriptSig ? vs.decompile(e.finalScriptSig) || [] : [],
      r = e.finalScriptWitness ? vs.decompile(e.finalScriptWitness) || [] : [];
    return t
      .concat(r)
      .filter((n) => Buffer.isBuffer(n) && vs.isCanonicalScriptSignature(n))
      .map((n) => ({ signature: n }));
  }
});
var F1 = _((ye) => {
  "use strict";
  Object.defineProperty(ye, "__esModule", { value: !0 });
  ye.checkTaprootInputForSigs =
    ye.tapTreeFromList =
    ye.tapTreeToList =
    ye.tweakInternalPubKey =
    ye.checkTaprootOutputFields =
    ye.checkTaprootInputFields =
    ye.isTaprootOutput =
    ye.isTaprootInput =
    ye.serializeTaprootSignature =
    ye.tapScriptFinalizer =
    ye.toXOnly =
      void 0;
  var Yc = yt(),
    T9 = qi(),
    nf = ef(),
    mn = Uo(),
    P9 = ki(),
    M9 = ef(),
    O9 = (e) => (e.length === 32 ? e : e.slice(1, 33));
  ye.toXOnly = O9;
  function k9(e, t, r) {
    let n = Y9(t, e, r);
    try {
      let s = G9(t, n).concat(n.script).concat(n.controlBlock);
      return { finalScriptWitness: (0, nf.witnessStackToScriptWitness)(s) };
    } catch (i) {
      throw new Error(`Can not finalize taproot input #${e}: ${i}`);
    }
  }
  ye.tapScriptFinalizer = k9;
  function B9(e, t) {
    let r = t ? Buffer.from([t]) : Buffer.from([]);
    return Buffer.concat([e, r]);
  }
  ye.serializeTaprootSignature = B9;
  function tf(e) {
    return (
      e &&
      !!(
        e.tapInternalKey ||
        e.tapMerkleRoot ||
        (e.tapLeafScript && e.tapLeafScript.length) ||
        (e.tapBip32Derivation && e.tapBip32Derivation.length) ||
        (e.witnessUtxo && (0, nf.isP2TR)(e.witnessUtxo.script))
      )
    );
  }
  ye.isTaprootInput = tf;
  function rf(e, t) {
    return (
      e &&
      !!(
        e.tapInternalKey ||
        e.tapTree ||
        (e.tapBip32Derivation && e.tapBip32Derivation.length) ||
        (t && (0, nf.isP2TR)(t))
      )
    );
  }
  ye.isTaprootOutput = rf;
  function q9(e, t, r) {
    (V9(e, t, r), z9(e, t, r));
  }
  ye.checkTaprootInputFields = q9;
  function H9(e, t, r) {
    (W9(e, t, r), N9(e, t));
  }
  ye.checkTaprootOutputFields = H9;
  function N9(e, t) {
    if (!t.tapTree && !t.tapInternalKey) return;
    let r = t.tapInternalKey || e.tapInternalKey,
      n = t.tapTree || e.tapTree;
    if (r) {
      let { script: i } = e,
        s = R9(r, n);
      if (i && !i.equals(s))
        throw new Error("Error adding output. Script or address missmatch.");
    }
  }
  function R9(e, t) {
    let r = t && L1(t.leaves),
      { output: n } = (0, P9.p2tr)({ internalPubkey: e, scriptTree: r });
    return n;
  }
  function C9(e, t) {
    let r = t.tapInternalKey,
      n = r && (0, mn.tweakKey)(r, t.tapMerkleRoot);
    if (!n)
      throw new Error(
        `Cannot tweak tap internal key for input #${e}. Public key: ${r && r.toString("hex")}`,
      );
    return n.x;
  }
  ye.tweakInternalPubKey = C9;
  function U9(e) {
    if (!(0, Yc.isTaptree)(e))
      throw new Error(
        "Cannot convert taptree to tapleaf list. Expecting a tapree structure.",
      );
    return Gc(e);
  }
  ye.tapTreeToList = U9;
  function L1(e = []) {
    return e.length === 1 && e[0].depth === 0
      ? { output: e[0].script, version: e[0].leafVersion }
      : D9(e);
  }
  ye.tapTreeFromList = L1;
  function L9(e, t) {
    return K9(e).some((n) => (0, M9.signatureBlocksAction)(n, F9, t));
  }
  ye.checkTaprootInputForSigs = L9;
  function F9(e) {
    return {
      signature: e.slice(0, 64),
      hashType: e.slice(64)[0] || T9.Transaction.SIGHASH_DEFAULT,
    };
  }
  function K9(e) {
    let t = [];
    if (
      (e.tapKeySig && t.push(e.tapKeySig),
      e.tapScriptSig && t.push(...e.tapScriptSig.map((r) => r.signature)),
      !t.length)
    ) {
      let r = j9(e.finalScriptWitness);
      r && t.push(r);
    }
    return t;
  }
  function j9(e) {
    if (!e) return;
    let t = e.slice(2);
    if (t.length === 64 || t.length === 65) return t;
  }
  function Gc(e, t = [], r = 0) {
    if (r > mn.MAX_TAPTREE_DEPTH)
      throw new Error("Max taptree depth exceeded.");
    return e
      ? (0, Yc.isTapleaf)(e)
        ? (t.push({
            depth: r,
            leafVersion: e.version || mn.LEAF_VERSION_TAPSCRIPT,
            script: e.output,
          }),
          t)
        : (e[0] && Gc(e[0], t, r + 1), e[1] && Gc(e[1], t, r + 1), t)
      : [];
  }
  function D9(e) {
    let t;
    for (let r of e)
      if (((t = Xc(r, t)), !t))
        throw new Error("No room left to insert tapleaf in tree");
    return t;
  }
  function Xc(e, t, r = 0) {
    if (r > mn.MAX_TAPTREE_DEPTH)
      throw new Error("Max taptree depth exceeded.");
    if (e.depth === r)
      return t ? void 0 : { output: e.script, version: e.leafVersion };
    if ((0, Yc.isTapleaf)(t)) return;
    let n = Xc(e, t && t[0], r + 1);
    if (n) return [n, t && t[1]];
    let i = Xc(e, t && t[1], r + 1);
    if (i) return [t && t[0], i];
  }
  function V9(e, t, r) {
    let n = tf(e) && Ni(t),
      i = Ni(e) && tf(t),
      s = e === t && tf(t) && Ni(t);
    if (n || i || s)
      throw new Error(
        `Invalid arguments for Psbt.${r}. Cannot use both taproot and non-taproot fields.`,
      );
  }
  function W9(e, t, r) {
    let n = rf(e) && Ni(t),
      i = Ni(e) && rf(t),
      s = e === t && rf(t) && Ni(t);
    if (n || i || s)
      throw new Error(
        `Invalid arguments for Psbt.${r}. Cannot use both taproot and non-taproot fields.`,
      );
  }
  function z9(e, t, r) {
    if (t.tapMerkleRoot) {
      let n = (t.tapLeafScript || []).every((s) => zc(s, t.tapMerkleRoot)),
        i = (e.tapLeafScript || []).every((s) => zc(s, t.tapMerkleRoot));
      if (!n || !i)
        throw new Error(
          `Invalid arguments for Psbt.${r}. Tapleaf not part of taptree.`,
        );
    } else if (
      e.tapMerkleRoot &&
      !(t.tapLeafScript || []).every((i) => zc(i, e.tapMerkleRoot))
    )
      throw new Error(
        `Invalid arguments for Psbt.${r}. Tapleaf not part of taptree.`,
      );
  }
  function zc(e, t) {
    if (!t) return !0;
    let r = (0, mn.tapleafHash)({ output: e.script, version: e.leafVersion });
    return (0, mn.rootHashFromPath)(e.controlBlock, r).equals(t);
  }
  function G9(e, t) {
    let r = (0, mn.tapleafHash)({ output: t.script, version: t.leafVersion });
    return (e.tapScriptSig || [])
      .filter((n) => n.leafHash.equals(r))
      .map((n) => X9(t.script, n))
      .sort((n, i) => i.positionInScript - n.positionInScript)
      .map((n) => n.signature);
  }
  function X9(e, t) {
    return Object.assign(
      { positionInScript: (0, nf.pubkeyPositionInScript)(t.pubkey, e) },
      t,
    );
  }
  function Y9(e, t, r) {
    if (!e.tapScriptSig || !e.tapScriptSig.length)
      throw new Error(
        `Can not finalize taproot input #${t}. No tapleaf script signature provided.`,
      );
    let n = (e.tapLeafScript || [])
      .sort((i, s) => i.controlBlock.length - s.controlBlock.length)
      .find((i) => $9(i, e.tapScriptSig, r));
    if (!n)
      throw new Error(
        `Can not finalize taproot input #${t}. Signature for tapleaf script not found.`,
      );
    return n;
  }
  function $9(e, t, r) {
    let n = (0, mn.tapleafHash)({ output: e.script, version: e.leafVersion });
    return (
      (!r || r.equals(n)) && t.find((s) => s.leafHash.equals(n)) !== void 0
    );
  }
  function Ni(e) {
    return (
      e &&
      !!(
        e.redeemScript ||
        e.witnessScript ||
        (e.bip32Derivation && e.bip32Derivation.length)
      )
    );
  }
});
var ub = _((df) => {
  "use strict";
  Object.defineProperty(df, "__esModule", { value: !0 });
  df.Psbt = void 0;
  var K1 = N1(),
    j1 = vn(),
    kt = jc(),
    D1 = Fo(),
    of = ds(),
    J9 = zt(),
    Yt = ki(),
    Z9 = Uo(),
    Wr = _t(),
    It = qi(),
    ve = F1(),
    it = ef(),
    Q9 = { network: J9.bitcoin, maximumFeeRate: 5e3 },
    Jc = class e {
      static fromBase64(t, r = {}) {
        let n = Buffer.from(t, "base64");
        return this.fromBuffer(n, r);
      }
      static fromHex(t, r = {}) {
        let n = Buffer.from(t, "hex");
        return this.fromBuffer(n, r);
      }
      static fromBuffer(t, r = {}) {
        let n = K1.Psbt.fromBuffer(t, ew),
          i = new e(r, n);
        return (sw(i.__CACHE.__TX, i.__CACHE), i);
      }
      constructor(t = {}, r = new K1.Psbt(new ff())) {
        ((this.data = r),
          (this.opts = Object.assign({}, Q9, t)),
          (this.__CACHE = {
            __NON_WITNESS_UTXO_TX_CACHE: [],
            __NON_WITNESS_UTXO_BUF_CACHE: [],
            __TX_IN_CACHE: {},
            __TX: this.data.globalMap.unsignedTx.tx,
            __UNSAFE_SIGN_NONSEGWIT: !1,
          }),
          this.data.inputs.length === 0 && this.setVersion(2));
        let n = (i, s, o, f) =>
          Object.defineProperty(i, s, { enumerable: o, writable: f });
        (n(this, "__CACHE", !1, !0), n(this, "opts", !1, !0));
      }
      get inputCount() {
        return this.data.inputs.length;
      }
      get version() {
        return this.__CACHE.__TX.version;
      }
      set version(t) {
        this.setVersion(t);
      }
      get locktime() {
        return this.__CACHE.__TX.locktime;
      }
      set locktime(t) {
        this.setLocktime(t);
      }
      get txInputs() {
        return this.__CACHE.__TX.ins.map((t) => ({
          hash: (0, of.cloneBuffer)(t.hash),
          index: t.index,
          sequence: t.sequence,
        }));
      }
      get txOutputs() {
        return this.__CACHE.__TX.outs.map((t) => {
          let r;
          try {
            r = (0, D1.fromOutputScript)(t.script, this.opts.network);
          } catch {}
          return {
            script: (0, of.cloneBuffer)(t.script),
            value: t.value,
            address: r,
          };
        });
      }
      combine(...t) {
        return (this.data.combine(...t.map((r) => r.data)), this);
      }
      clone() {
        let t = e.fromBuffer(this.data.toBuffer());
        return ((t.opts = JSON.parse(JSON.stringify(this.opts))), t);
      }
      setMaximumFeeRate(t) {
        (sf(t), (this.opts.maximumFeeRate = t));
      }
      setVersion(t) {
        (sf(t), gs(this.data.inputs, "setVersion"));
        let r = this.__CACHE;
        return ((r.__TX.version = t), (r.__EXTRACTED_TX = void 0), this);
      }
      setLocktime(t) {
        (sf(t), gs(this.data.inputs, "setLocktime"));
        let r = this.__CACHE;
        return ((r.__TX.locktime = t), (r.__EXTRACTED_TX = void 0), this);
      }
      setInputSequence(t, r) {
        (sf(r), gs(this.data.inputs, "setInputSequence"));
        let n = this.__CACHE;
        if (n.__TX.ins.length <= t) throw new Error("Input index too high");
        return (
          (n.__TX.ins[t].sequence = r),
          (n.__EXTRACTED_TX = void 0),
          this
        );
      }
      addInputs(t) {
        return (t.forEach((r) => this.addInput(r)), this);
      }
      addInput(t) {
        if (
          arguments.length > 1 ||
          !t ||
          t.hash === void 0 ||
          t.index === void 0
        )
          throw new Error(
            "Invalid arguments for Psbt.addInput. Requires single object with at least [hash] and [index]",
          );
        ((0, ve.checkTaprootInputFields)(t, t, "addInput"),
          gs(this.data.inputs, "addInput"),
          t.witnessScript && af(t.witnessScript));
        let r = this.__CACHE;
        this.data.addInput(t);
        let n = r.__TX.ins[r.__TX.ins.length - 1];
        eb(r, n);
        let i = this.data.inputs.length - 1,
          s = this.data.inputs[i];
        return (
          s.nonWitnessUtxo && Qc(this.__CACHE, s, i),
          (r.__FEE = void 0),
          (r.__FEE_RATE = void 0),
          (r.__EXTRACTED_TX = void 0),
          this
        );
      }
      addOutputs(t) {
        return (t.forEach((r) => this.addOutput(r)), this);
      }
      addOutput(t) {
        if (
          arguments.length > 1 ||
          !t ||
          t.value === void 0 ||
          (t.address === void 0 && t.script === void 0)
        )
          throw new Error(
            "Invalid arguments for Psbt.addOutput. Requires single object with at least [script or address] and [value]",
          );
        gs(this.data.inputs, "addOutput");
        let { address: r } = t;
        if (typeof r == "string") {
          let { network: i } = this.opts,
            s = (0, D1.toOutputScript)(r, i);
          t = Object.assign({}, t, { script: s });
        }
        (0, ve.checkTaprootOutputFields)(t, t, "addOutput");
        let n = this.__CACHE;
        return (
          this.data.addOutput(t),
          (n.__FEE = void 0),
          (n.__FEE_RATE = void 0),
          (n.__EXTRACTED_TX = void 0),
          this
        );
      }
      extractTransaction(t) {
        if (!this.data.inputs.every(Z1)) throw new Error("Not finalized");
        let r = this.__CACHE;
        if ((t || rw(this, r, this.opts), r.__EXTRACTED_TX))
          return r.__EXTRACTED_TX;
        let n = r.__TX.clone();
        return (ob(this.data.inputs, n, r, !0), n);
      }
      getFeeRate() {
        return X1("__FEE_RATE", "fee rate", this.data.inputs, this.__CACHE);
      }
      getFee() {
        return X1("__FEE", "fee", this.data.inputs, this.__CACHE);
      }
      finalizeAllInputs() {
        return (
          (0, kt.checkForInput)(this.data.inputs, 0),
          ms(this.data.inputs.length).forEach((t) => this.finalizeInput(t)),
          this
        );
      }
      finalizeInput(t, r) {
        let n = (0, kt.checkForInput)(this.data.inputs, t);
        return (0, ve.isTaprootInput)(n)
          ? this._finalizeTaprootInput(t, n, void 0, r)
          : this._finalizeInput(t, n, r);
      }
      finalizeTaprootInput(t, r, n = ve.tapScriptFinalizer) {
        let i = (0, kt.checkForInput)(this.data.inputs, t);
        if ((0, ve.isTaprootInput)(i))
          return this._finalizeTaprootInput(t, i, r, n);
        throw new Error(`Cannot finalize input #${t}. Not Taproot.`);
      }
      _finalizeInput(t, r, n = ow) {
        let {
          script: i,
          isP2SH: s,
          isP2WSH: o,
          isSegwit: f,
        } = uw(t, r, this.__CACHE);
        if (!i) throw new Error(`No script found for input #${t}`);
        nw(r);
        let { finalScriptSig: u, finalScriptWitness: l } = n(t, r, i, f, s, o);
        if (
          (u && this.data.updateInput(t, { finalScriptSig: u }),
          l && this.data.updateInput(t, { finalScriptWitness: l }),
          !u && !l)
        )
          throw new Error(`Unknown error finalizing input #${t}`);
        return (this.data.clearFinalizedInput(t), this);
      }
      _finalizeTaprootInput(t, r, n, i = ve.tapScriptFinalizer) {
        if (!r.witnessUtxo)
          throw new Error(
            `Cannot finalize input #${t}. Missing withness utxo.`,
          );
        if (r.tapKeySig) {
          let s = Yt.p2tr({
              output: r.witnessUtxo.script,
              signature: r.tapKeySig,
            }),
            o = (0, it.witnessStackToScriptWitness)(s.witness);
          this.data.updateInput(t, { finalScriptWitness: o });
        } else {
          let { finalScriptWitness: s } = i(t, r, n);
          this.data.updateInput(t, { finalScriptWitness: s });
        }
        return (this.data.clearFinalizedInput(t), this);
      }
      getInputType(t) {
        let r = (0, kt.checkForInput)(this.data.inputs, t),
          n = fb(t, r, this.__CACHE),
          i = uf(
            n,
            t,
            "input",
            r.redeemScript || bw(r.finalScriptSig),
            r.witnessScript || yw(r.finalScriptWitness),
          ),
          s = i.type === "raw" ? "" : i.type + "-",
          o = cb(i.meaningfulScript);
        return s + o;
      }
      inputHasPubkey(t, r) {
        let n = (0, kt.checkForInput)(this.data.inputs, t);
        return lw(r, n, t, this.__CACHE);
      }
      inputHasHDKey(t, r) {
        let n = (0, kt.checkForInput)(this.data.inputs, t),
          i = W1(r);
        return !!n.bip32Derivation && n.bip32Derivation.some(i);
      }
      outputHasPubkey(t, r) {
        let n = (0, kt.checkForOutput)(this.data.outputs, t);
        return pw(r, n, t, this.__CACHE);
      }
      outputHasHDKey(t, r) {
        let n = (0, kt.checkForOutput)(this.data.outputs, t),
          i = W1(r);
        return !!n.bip32Derivation && n.bip32Derivation.some(i);
      }
      validateSignaturesOfAllInputs(t) {
        return (
          (0, kt.checkForInput)(this.data.inputs, 0),
          ms(this.data.inputs.length)
            .map((n) => this.validateSignaturesOfInput(n, t))
            .reduce((n, i) => i === !0 && n, !0)
        );
      }
      validateSignaturesOfInput(t, r, n) {
        let i = this.data.inputs[t];
        return (0, ve.isTaprootInput)(i)
          ? this.validateSignaturesOfTaprootInput(t, r, n)
          : this._validateSignaturesOfInput(t, r, n);
      }
      _validateSignaturesOfInput(t, r, n) {
        let i = this.data.inputs[t],
          s = (i || {}).partialSig;
        if (!i || !s || s.length < 1)
          throw new Error("No signatures to validate");
        if (typeof r != "function")
          throw new Error("Need validator function to validate signatures");
        let o = n ? s.filter((h) => h.pubkey.equals(n)) : s;
        if (o.length < 1) throw new Error("No signatures for this pubkey");
        let f = [],
          u,
          l,
          p;
        for (let h of o) {
          let w = Wr.signature.decode(h.signature),
            { hash: E, script: A } =
              p !== w.hashType
                ? rb(
                    t,
                    Object.assign({}, i, { sighashType: w.hashType }),
                    this.__CACHE,
                    !0,
                  )
                : { hash: u, script: l };
          ((p = w.hashType),
            (u = E),
            (l = A),
            Q1(h.pubkey, A, "verify"),
            f.push(r(h.pubkey, E, w.signature)));
        }
        return f.every((h) => h === !0);
      }
      validateSignaturesOfTaprootInput(t, r, n) {
        let i = this.data.inputs[t],
          s = (i || {}).tapKeySig,
          o = (i || {}).tapScriptSig;
        if (!i && !s && !(o && !o.length))
          throw new Error("No signatures to validate");
        if (typeof r != "function")
          throw new Error("Need validator function to validate signatures");
        n = n && (0, ve.toXOnly)(n);
        let f = n
          ? Zc(t, i, this.data.inputs, n, this.__CACHE)
          : aw(t, i, this.data.inputs, this.__CACHE);
        if (!f.length) throw new Error("No signatures for this pubkey");
        let u = f.find((p) => !p.leafHash),
          l = 0;
        if (s && u) {
          if (!r(u.pubkey, u.hash, $1(s))) return !1;
          l++;
        }
        if (o)
          for (let p of o) {
            let h = f.find((w) => p.pubkey.equals(w.pubkey));
            if (h) {
              if (!r(p.pubkey, h.hash, $1(p.signature))) return !1;
              l++;
            }
          }
        return l > 0;
      }
      signAllInputsHD(t, r = [It.Transaction.SIGHASH_ALL]) {
        if (!t || !t.publicKey || !t.fingerprint)
          throw new Error("Need HDSigner to sign input");
        let n = [];
        for (let i of ms(this.data.inputs.length))
          try {
            (this.signInputHD(i, t, r), n.push(!0));
          } catch {
            n.push(!1);
          }
        if (n.every((i) => i === !1)) throw new Error("No inputs were signed");
        return this;
      }
      signAllInputsHDAsync(t, r = [It.Transaction.SIGHASH_ALL]) {
        return new Promise((n, i) => {
          if (!t || !t.publicKey || !t.fingerprint)
            return i(new Error("Need HDSigner to sign input"));
          let s = [],
            o = [];
          for (let f of ms(this.data.inputs.length))
            o.push(
              this.signInputHDAsync(f, t, r).then(
                () => {
                  s.push(!0);
                },
                () => {
                  s.push(!1);
                },
              ),
            );
          return Promise.all(o).then(() => {
            if (s.every((f) => f === !1))
              return i(new Error("No inputs were signed"));
            n();
          });
        });
      }
      signInputHD(t, r, n = [It.Transaction.SIGHASH_ALL]) {
        if (!r || !r.publicKey || !r.fingerprint)
          throw new Error("Need HDSigner to sign input");
        return (
          J1(t, this.data.inputs, r).forEach((s) => this.signInput(t, s, n)),
          this
        );
      }
      signInputHDAsync(t, r, n = [It.Transaction.SIGHASH_ALL]) {
        return new Promise((i, s) => {
          if (!r || !r.publicKey || !r.fingerprint)
            return s(new Error("Need HDSigner to sign input"));
          let f = J1(t, this.data.inputs, r).map((u) =>
            this.signInputAsync(t, u, n),
          );
          return Promise.all(f)
            .then(() => {
              i();
            })
            .catch(s);
        });
      }
      signAllInputs(t, r) {
        if (!t || !t.publicKey) throw new Error("Need Signer to sign input");
        let n = [];
        for (let i of ms(this.data.inputs.length))
          try {
            (this.signInput(i, t, r), n.push(!0));
          } catch {
            n.push(!1);
          }
        if (n.every((i) => i === !1)) throw new Error("No inputs were signed");
        return this;
      }
      signAllInputsAsync(t, r) {
        return new Promise((n, i) => {
          if (!t || !t.publicKey)
            return i(new Error("Need Signer to sign input"));
          let s = [],
            o = [];
          for (let [f] of this.data.inputs.entries())
            o.push(
              this.signInputAsync(f, t, r).then(
                () => {
                  s.push(!0);
                },
                () => {
                  s.push(!1);
                },
              ),
            );
          return Promise.all(o).then(() => {
            if (s.every((f) => f === !1))
              return i(new Error("No inputs were signed"));
            n();
          });
        });
      }
      signInput(t, r, n) {
        if (!r || !r.publicKey) throw new Error("Need Signer to sign input");
        let i = (0, kt.checkForInput)(this.data.inputs, t);
        return (0, ve.isTaprootInput)(i)
          ? this._signTaprootInput(t, i, r, void 0, n)
          : this._signInput(t, r, n);
      }
      signTaprootInput(t, r, n, i) {
        if (!r || !r.publicKey) throw new Error("Need Signer to sign input");
        let s = (0, kt.checkForInput)(this.data.inputs, t);
        if ((0, ve.isTaprootInput)(s))
          return this._signTaprootInput(t, s, r, n, i);
        throw new Error(`Input #${t} is not of type Taproot.`);
      }
      _signInput(t, r, n = [It.Transaction.SIGHASH_ALL]) {
        let { hash: i, sighashType: s } = Y1(
            this.data.inputs,
            t,
            r.publicKey,
            this.__CACHE,
            n,
          ),
          o = [
            {
              pubkey: r.publicKey,
              signature: Wr.signature.encode(r.sign(i), s),
            },
          ];
        return (this.data.updateInput(t, { partialSig: o }), this);
      }
      _signTaprootInput(t, r, n, i, s = [It.Transaction.SIGHASH_DEFAULT]) {
        let o = this.checkTaprootHashesForSig(t, r, n, i, s),
          f = o
            .filter((l) => !l.leafHash)
            .map((l) =>
              (0, ve.serializeTaprootSignature)(
                n.signSchnorr(l.hash),
                r.sighashType,
              ),
            )[0],
          u = o
            .filter((l) => !!l.leafHash)
            .map((l) => ({
              pubkey: (0, ve.toXOnly)(n.publicKey),
              signature: (0, ve.serializeTaprootSignature)(
                n.signSchnorr(l.hash),
                r.sighashType,
              ),
              leafHash: l.leafHash,
            }));
        return (
          f && this.data.updateInput(t, { tapKeySig: f }),
          u.length && this.data.updateInput(t, { tapScriptSig: u }),
          this
        );
      }
      signInputAsync(t, r, n) {
        return Promise.resolve().then(() => {
          if (!r || !r.publicKey) throw new Error("Need Signer to sign input");
          let i = (0, kt.checkForInput)(this.data.inputs, t);
          return (0, ve.isTaprootInput)(i)
            ? this._signTaprootInputAsync(t, i, r, void 0, n)
            : this._signInputAsync(t, r, n);
        });
      }
      signTaprootInputAsync(t, r, n, i) {
        return Promise.resolve().then(() => {
          if (!r || !r.publicKey) throw new Error("Need Signer to sign input");
          let s = (0, kt.checkForInput)(this.data.inputs, t);
          if ((0, ve.isTaprootInput)(s))
            return this._signTaprootInputAsync(t, s, r, n, i);
          throw new Error(`Input #${t} is not of type Taproot.`);
        });
      }
      _signInputAsync(t, r, n = [It.Transaction.SIGHASH_ALL]) {
        let { hash: i, sighashType: s } = Y1(
          this.data.inputs,
          t,
          r.publicKey,
          this.__CACHE,
          n,
        );
        return Promise.resolve(r.sign(i)).then((o) => {
          let f = [
            { pubkey: r.publicKey, signature: Wr.signature.encode(o, s) },
          ];
          this.data.updateInput(t, { partialSig: f });
        });
      }
      async _signTaprootInputAsync(
        t,
        r,
        n,
        i,
        s = [It.Transaction.SIGHASH_DEFAULT],
      ) {
        let o = this.checkTaprootHashesForSig(t, r, n, i, s),
          f = [],
          u = o.filter((p) => !p.leafHash)[0];
        if (u) {
          let p = Promise.resolve(n.signSchnorr(u.hash)).then((h) => ({
            tapKeySig: (0, ve.serializeTaprootSignature)(h, r.sighashType),
          }));
          f.push(p);
        }
        let l = o.filter((p) => !!p.leafHash);
        if (l.length) {
          let p = l.map((h) =>
            Promise.resolve(n.signSchnorr(h.hash)).then((w) => ({
              tapScriptSig: [
                {
                  pubkey: (0, ve.toXOnly)(n.publicKey),
                  signature: (0, ve.serializeTaprootSignature)(
                    w,
                    r.sighashType,
                  ),
                  leafHash: h.leafHash,
                },
              ],
            })),
          );
          f.push(...p);
        }
        return Promise.all(f).then((p) => {
          p.forEach((h) => this.data.updateInput(t, h));
        });
      }
      checkTaprootHashesForSig(t, r, n, i, s) {
        if (typeof n.signSchnorr != "function")
          throw new Error(`Need Schnorr Signer to sign taproot input #${t}.`);
        let o = Zc(t, r, this.data.inputs, n.publicKey, this.__CACHE, i, s);
        if (!o || !o.length)
          throw new Error(
            `Can not sign for input #${t} with the key ${n.publicKey.toString("hex")}`,
          );
        return o;
      }
      toBuffer() {
        return ($c(this.__CACHE), this.data.toBuffer());
      }
      toHex() {
        return ($c(this.__CACHE), this.data.toHex());
      }
      toBase64() {
        return ($c(this.__CACHE), this.data.toBase64());
      }
      updateGlobal(t) {
        return (this.data.updateGlobal(t), this);
      }
      updateInput(t, r) {
        return (
          r.witnessScript && af(r.witnessScript),
          (0, ve.checkTaprootInputFields)(
            this.data.inputs[t],
            r,
            "updateInput",
          ),
          this.data.updateInput(t, r),
          r.nonWitnessUtxo && Qc(this.__CACHE, this.data.inputs[t], t),
          this
        );
      }
      updateOutput(t, r) {
        let n = this.data.outputs[t];
        return (
          (0, ve.checkTaprootOutputFields)(n, r, "updateOutput"),
          this.data.updateOutput(t, r),
          this
        );
      }
      addUnknownKeyValToGlobal(t) {
        return (this.data.addUnknownKeyValToGlobal(t), this);
      }
      addUnknownKeyValToInput(t, r) {
        return (this.data.addUnknownKeyValToInput(t, r), this);
      }
      addUnknownKeyValToOutput(t, r) {
        return (this.data.addUnknownKeyValToOutput(t, r), this);
      }
      clearFinalizedInput(t) {
        return (this.data.clearFinalizedInput(t), this);
      }
    };
  df.Psbt = Jc;
  var ew = (e) => new ff(e),
    ff = class {
      constructor(t = Buffer.from([2, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {
        ((this.tx = It.Transaction.fromBuffer(t)),
          iw(this.tx),
          Object.defineProperty(this, "tx", { enumerable: !1, writable: !0 }));
      }
      getInputOutputCounts() {
        return {
          inputCount: this.tx.ins.length,
          outputCount: this.tx.outs.length,
        };
      }
      addInput(t) {
        if (
          t.hash === void 0 ||
          t.index === void 0 ||
          (!Buffer.isBuffer(t.hash) && typeof t.hash != "string") ||
          typeof t.index != "number"
        )
          throw new Error("Error adding input.");
        let r =
          typeof t.hash == "string"
            ? (0, of.reverseBuffer)(Buffer.from(t.hash, "hex"))
            : t.hash;
        this.tx.addInput(r, t.index, t.sequence);
      }
      addOutput(t) {
        if (
          t.script === void 0 ||
          t.value === void 0 ||
          !Buffer.isBuffer(t.script) ||
          typeof t.value != "number"
        )
          throw new Error("Error adding output.");
        this.tx.addOutput(t.script, t.value);
      }
      toBuffer() {
        return this.tx.toBuffer();
      }
    };
  function tw(e, t, r) {
    switch (r) {
      case "pubkey":
      case "pubkeyhash":
      case "witnesspubkeyhash":
        return V1(1, e.partialSig);
      case "multisig":
        let n = Yt.p2ms({ output: t });
        return V1(n.m, e.partialSig, n.pubkeys);
      default:
        return !1;
    }
  }
  function $c(e) {
    if (e.__UNSAFE_SIGN_NONSEGWIT !== !1)
      throw new Error("Not BIP174 compliant, can not export");
  }
  function V1(e, t, r) {
    if (!t) return !1;
    let n;
    if (
      (r
        ? (n = r
            .map((i) => {
              let s = vw(i);
              return t.find((o) => o.pubkey.equals(s));
            })
            .filter((i) => !!i))
        : (n = t),
      n.length > e)
    )
      throw new Error("Too many signatures");
    return n.length === e;
  }
  function Z1(e) {
    return !!e.finalScriptSig || !!e.finalScriptWitness;
  }
  function W1(e) {
    return (t) =>
      !(
        !t.masterFingerprint.equals(e.fingerprint) ||
        !e.derivePath(t.path).publicKey.equals(t.pubkey)
      );
  }
  function sf(e) {
    if (typeof e != "number" || e !== Math.floor(e) || e > 4294967295 || e < 0)
      throw new Error("Invalid 32 bit integer");
  }
  function rw(e, t, r) {
    let n = t.__FEE_RATE || e.getFeeRate(),
      i = t.__EXTRACTED_TX.virtualSize(),
      s = n * i;
    if (n >= r.maximumFeeRate)
      throw new Error(
        `Warning: You are paying around ${(s / 1e8).toFixed(8)} in fees, which is ${n} satoshi per byte for a transaction with a VSize of ${i} bytes (segwit counted as 0.25 byte per byte). Use setMaximumFeeRate method to raise your threshold, or pass true to the first arg of extractTransaction.`,
      );
  }
  function gs(e, t) {
    e.forEach((r) => {
      if (
        (0, ve.isTaprootInput)(r)
          ? (0, ve.checkTaprootInputForSigs)(r, t)
          : (0, it.checkInputForSig)(r, t)
      )
        throw new Error("Can not modify transaction, signatures exist.");
    });
  }
  function nw(e) {
    if (!e.sighashType || !e.partialSig) return;
    let { partialSig: t, sighashType: r } = e;
    t.forEach((n) => {
      let { hashType: i } = Wr.signature.decode(n.signature);
      if (r !== i)
        throw new Error("Signature sighash does not match input sighash type");
    });
  }
  function Q1(e, t, r) {
    if (!(0, it.pubkeyInScript)(e, t))
      throw new Error(
        `Can not ${r} for this input with the key ${e.toString("hex")}`,
      );
  }
  function iw(e) {
    if (
      !e.ins.every(
        (r) =>
          r.script &&
          r.script.length === 0 &&
          r.witness &&
          r.witness.length === 0,
      )
    )
      throw new Error("Format Error: Transaction ScriptSigs are not empty");
  }
  function sw(e, t) {
    e.ins.forEach((r) => {
      eb(t, r);
    });
  }
  function eb(e, t) {
    let r =
      (0, of.reverseBuffer)(Buffer.from(t.hash)).toString("hex") +
      ":" +
      t.index;
    if (e.__TX_IN_CACHE[r]) throw new Error("Duplicate input detected.");
    e.__TX_IN_CACHE[r] = 1;
  }
  function tb(e, t) {
    return (r, n, i, s) => {
      let o = e({ redeem: { output: i } }).output;
      if (!n.equals(o))
        throw new Error(
          `${t} for ${s} #${r} doesn't match the scriptPubKey in the prevout`,
        );
    };
  }
  var z1 = tb(Yt.p2sh, "Redeem script"),
    G1 = tb(Yt.p2wsh, "Witness script");
  function X1(e, t, r, n) {
    if (!r.every(Z1))
      throw new Error(`PSBT must be finalized to calculate ${t}`);
    if (e === "__FEE_RATE" && n.__FEE_RATE) return n.__FEE_RATE;
    if (e === "__FEE" && n.__FEE) return n.__FEE;
    let i,
      s = !0;
    if (
      (n.__EXTRACTED_TX
        ? ((i = n.__EXTRACTED_TX), (s = !1))
        : (i = n.__TX.clone()),
      ob(r, i, n, s),
      e === "__FEE_RATE")
    )
      return n.__FEE_RATE;
    if (e === "__FEE") return n.__FEE;
  }
  function ow(e, t, r, n, i, s) {
    let o = cb(r);
    if (!tw(t, r, o)) throw new Error(`Can not finalize input #${e}`);
    return fw(r, o, t.partialSig, n, i, s);
  }
  function fw(e, t, r, n, i, s) {
    let o,
      f,
      u = cw(e, t, r),
      l = s ? Yt.p2wsh({ redeem: u }) : null,
      p = i ? Yt.p2sh({ redeem: l || u }) : null;
    return (
      n
        ? (l
            ? (f = (0, it.witnessStackToScriptWitness)(l.witness))
            : (f = (0, it.witnessStackToScriptWitness)(u.witness)),
          p && (o = p.input))
        : p
          ? (o = p.input)
          : (o = u.input),
      { finalScriptSig: o, finalScriptWitness: f }
    );
  }
  function Y1(e, t, r, n, i) {
    let s = (0, kt.checkForInput)(e, t),
      { hash: o, sighashType: f, script: u } = rb(t, s, n, !1, i);
    return (Q1(r, u, "sign"), { hash: o, sighashType: f });
  }
  function rb(e, t, r, n, i) {
    let s = r.__TX,
      o = t.sighashType || It.Transaction.SIGHASH_ALL;
    ib(o, i);
    let f, u;
    if (t.nonWitnessUtxo) {
      let h = cf(r, t, e),
        w = s.ins[e].hash,
        E = h.getHash();
      if (!w.equals(E))
        throw new Error(
          `Non-witness UTXO hash for input #${e} doesn't match the hash specified in the prevout`,
        );
      let A = s.ins[e].index;
      u = h.outs[A];
    } else if (t.witnessUtxo) u = t.witnessUtxo;
    else throw new Error("Need a Utxo input item for signing");
    let { meaningfulScript: l, type: p } = uf(
      u.script,
      e,
      "input",
      t.redeemScript,
      t.witnessScript,
    );
    if (["p2sh-p2wsh", "p2wsh"].indexOf(p) >= 0)
      f = s.hashForWitnessV0(e, l, u.value, o);
    else if ((0, it.isP2WPKH)(l)) {
      let h = Yt.p2pkh({ hash: l.slice(2) }).output;
      f = s.hashForWitnessV0(e, h, u.value, o);
    } else {
      if (t.nonWitnessUtxo === void 0 && r.__UNSAFE_SIGN_NONSEGWIT === !1)
        throw new Error(
          `Input #${e} has witnessUtxo but non-segwit script: ${l.toString("hex")}`,
        );
      (!n &&
        r.__UNSAFE_SIGN_NONSEGWIT !== !1 &&
        console.warn(`Warning: Signing non-segwit inputs without the full parent transaction means there is a chance that a miner could feed you incorrect information to trick you into paying large fees. This behavior is the same as Psbt's predecessor (TransactionBuilder - now removed) when signing non-segwit scripts. You are not able to export this Psbt with toBuffer|toBase64|toHex since it is not BIP174 compliant.
*********************
PROCEED WITH CAUTION!
*********************`),
        (f = s.hashForSignature(e, l, o)));
    }
    return { script: l, sighashType: o, hash: f };
  }
  function aw(e, t, r, n) {
    let i = [];
    if (t.tapInternalKey) {
      let o = nb(e, t, n);
      o && i.push(o);
    }
    if (t.tapScriptSig) {
      let o = t.tapScriptSig.map((f) => f.pubkey);
      i.push(...o);
    }
    return i.map((o) => Zc(e, t, r, o, n)).flat();
  }
  function nb(e, t, r) {
    let { script: n } = eu(e, t, r);
    return (0, it.isP2TR)(n) ? n.subarray(2, 34) : null;
  }
  function $1(e) {
    return e.length === 64 ? e : e.subarray(0, 64);
  }
  function Zc(e, t, r, n, i, s, o) {
    let f = i.__TX,
      u = t.sighashType || It.Transaction.SIGHASH_DEFAULT;
    ib(u, o);
    let l = r.map((A, T) => eu(T, A, i)),
      p = l.map((A) => A.script),
      h = l.map((A) => A.value),
      w = [];
    if (t.tapInternalKey && !s) {
      let A = nb(e, t, i) || Buffer.from([]);
      if ((0, ve.toXOnly)(n).equals(A)) {
        let T = f.hashForWitnessV1(e, p, h, u);
        w.push({ pubkey: n, hash: T });
      }
    }
    let E = (t.tapLeafScript || [])
      .filter((A) => (0, it.pubkeyInScript)(n, A.script))
      .map((A) => {
        let T = (0, Z9.tapleafHash)({
          output: A.script,
          version: A.leafVersion,
        });
        return Object.assign({ hash: T }, A);
      })
      .filter((A) => !s || s.equals(A.hash))
      .map((A) => {
        let T = f.hashForWitnessV1(e, p, h, u, A.hash);
        return { pubkey: n, hash: T, leafHash: A.hash };
      });
    return w.concat(E);
  }
  function ib(e, t) {
    if (t && t.indexOf(e) < 0) {
      let r = hw(e);
      throw new Error(
        `Sighash type is not allowed. Retry the sign method passing the sighashTypes array of whitelisted types. Sighash type: ${r}`,
      );
    }
  }
  function cw(e, t, r) {
    let n;
    switch (t) {
      case "multisig":
        let i = dw(e, r);
        n = Yt.p2ms({ output: e, signatures: i });
        break;
      case "pubkey":
        n = Yt.p2pk({ output: e, signature: r[0].signature });
        break;
      case "pubkeyhash":
        n = Yt.p2pkh({
          output: e,
          pubkey: r[0].pubkey,
          signature: r[0].signature,
        });
        break;
      case "witnesspubkeyhash":
        n = Yt.p2wpkh({
          output: e,
          pubkey: r[0].pubkey,
          signature: r[0].signature,
        });
        break;
    }
    return n;
  }
  function uw(e, t, r) {
    let n = r.__TX,
      i = { script: null, isSegwit: !1, isP2SH: !1, isP2WSH: !1 };
    if (
      ((i.isP2SH = !!t.redeemScript),
      (i.isP2WSH = !!t.witnessScript),
      t.witnessScript)
    )
      i.script = t.witnessScript;
    else if (t.redeemScript) i.script = t.redeemScript;
    else if (t.nonWitnessUtxo) {
      let s = cf(r, t, e),
        o = n.ins[e].index;
      i.script = s.outs[o].script;
    } else t.witnessUtxo && (i.script = t.witnessUtxo.script);
    return (
      (t.witnessScript || (0, it.isP2WPKH)(i.script)) && (i.isSegwit = !0),
      i
    );
  }
  function J1(e, t, r) {
    let n = (0, kt.checkForInput)(t, e);
    if (!n.bip32Derivation || n.bip32Derivation.length === 0)
      throw new Error("Need bip32Derivation to sign with HD");
    let i = n.bip32Derivation
      .map((o) => {
        if (o.masterFingerprint.equals(r.fingerprint)) return o;
      })
      .filter((o) => !!o);
    if (i.length === 0)
      throw new Error(
        "Need one bip32Derivation masterFingerprint to match the HDSigner fingerprint",
      );
    return i.map((o) => {
      let f = r.derivePath(o.path);
      if (!o.pubkey.equals(f.publicKey))
        throw new Error("pubkey did not match bip32Derivation");
      return f;
    });
  }
  function dw(e, t) {
    return Yt.p2ms({ output: e })
      .pubkeys.map(
        (n) => (t.filter((i) => i.pubkey.equals(n))[0] || {}).signature,
      )
      .filter((n) => !!n);
  }
  function sb(e) {
    let t = 0;
    function r(o) {
      return ((t += o), e.slice(t - o, t));
    }
    function n() {
      let o = j1.decode(e, t);
      return ((t += j1.decode.bytes), o);
    }
    function i() {
      return r(n());
    }
    function s() {
      let o = n(),
        f = [];
      for (let u = 0; u < o; u++) f.push(i());
      return f;
    }
    return s();
  }
  function hw(e) {
    let t =
      e & It.Transaction.SIGHASH_ANYONECANPAY ? "SIGHASH_ANYONECANPAY | " : "";
    switch (e & 31) {
      case It.Transaction.SIGHASH_ALL:
        t += "SIGHASH_ALL";
        break;
      case It.Transaction.SIGHASH_SINGLE:
        t += "SIGHASH_SINGLE";
        break;
      case It.Transaction.SIGHASH_NONE:
        t += "SIGHASH_NONE";
        break;
    }
    return t;
  }
  function Qc(e, t, r) {
    e.__NON_WITNESS_UTXO_BUF_CACHE[r] = t.nonWitnessUtxo;
    let n = It.Transaction.fromBuffer(t.nonWitnessUtxo);
    e.__NON_WITNESS_UTXO_TX_CACHE[r] = n;
    let i = e,
      s = r;
    (delete t.nonWitnessUtxo,
      Object.defineProperty(t, "nonWitnessUtxo", {
        enumerable: !0,
        get() {
          let o = i.__NON_WITNESS_UTXO_BUF_CACHE[s],
            f = i.__NON_WITNESS_UTXO_TX_CACHE[s];
          if (o !== void 0) return o;
          {
            let u = f.toBuffer();
            return ((i.__NON_WITNESS_UTXO_BUF_CACHE[s] = u), u);
          }
        },
        set(o) {
          i.__NON_WITNESS_UTXO_BUF_CACHE[s] = o;
        },
      }));
  }
  function ob(e, t, r, n) {
    let i = 0;
    e.forEach((u, l) => {
      if (
        (n && u.finalScriptSig && (t.ins[l].script = u.finalScriptSig),
        n &&
          u.finalScriptWitness &&
          (t.ins[l].witness = sb(u.finalScriptWitness)),
        u.witnessUtxo)
      )
        i += u.witnessUtxo.value;
      else if (u.nonWitnessUtxo) {
        let p = cf(r, u, l),
          h = t.ins[l].index,
          w = p.outs[h];
        i += w.value;
      }
    });
    let s = t.outs.reduce((u, l) => u + l.value, 0),
      o = i - s;
    if (o < 0) throw new Error("Outputs are spending more than Inputs");
    let f = t.virtualSize();
    ((r.__FEE = o), (r.__EXTRACTED_TX = t), (r.__FEE_RATE = Math.floor(o / f)));
  }
  function cf(e, t, r) {
    let n = e.__NON_WITNESS_UTXO_TX_CACHE;
    return (n[r] || Qc(e, t, r), n[r]);
  }
  function fb(e, t, r) {
    let { script: n } = eu(e, t, r);
    return n;
  }
  function eu(e, t, r) {
    if (t.witnessUtxo !== void 0)
      return { script: t.witnessUtxo.script, value: t.witnessUtxo.value };
    if (t.nonWitnessUtxo !== void 0) {
      let i = cf(r, t, e).outs[r.__TX.ins[e].index];
      return { script: i.script, value: i.value };
    } else throw new Error("Can't find pubkey in input without Utxo data");
  }
  function lw(e, t, r, n) {
    let i = fb(r, t, n),
      { meaningfulScript: s } = uf(
        i,
        r,
        "input",
        t.redeemScript,
        t.witnessScript,
      );
    return (0, it.pubkeyInScript)(e, s);
  }
  function pw(e, t, r, n) {
    let i = n.__TX.outs[r].script,
      { meaningfulScript: s } = uf(
        i,
        r,
        "output",
        t.redeemScript,
        t.witnessScript,
      );
    return (0, it.pubkeyInScript)(e, s);
  }
  function bw(e) {
    if (!e) return;
    let t = Wr.decompile(e);
    if (!t) return;
    let r = t[t.length - 1];
    if (!(!Buffer.isBuffer(r) || ab(r) || gw(r) || !Wr.decompile(r))) return r;
  }
  function yw(e) {
    if (!e) return;
    let t = sb(e),
      r = t[t.length - 1];
    if (!(ab(r) || !Wr.decompile(r))) return r;
  }
  function vw(e) {
    if (e.length === 65) {
      let t = e[64] & 1,
        r = e.slice(0, 33);
      return ((r[0] = 2 | t), r);
    }
    return e.slice();
  }
  function ab(e) {
    return e.length === 33 && Wr.isCanonicalPubKey(e);
  }
  function gw(e) {
    return Wr.isCanonicalScriptSignature(e);
  }
  function uf(e, t, r, n, i) {
    let s = (0, it.isP2SHScript)(e),
      o = s && n && (0, it.isP2WSHScript)(n),
      f = (0, it.isP2WSHScript)(e);
    if (s && n === void 0)
      throw new Error("scriptPubkey is P2SH but redeemScript missing");
    if ((f || o) && i === void 0)
      throw new Error(
        "scriptPubkey or redeemScript is P2WSH but witnessScript missing",
      );
    let u;
    return (
      o
        ? ((u = i), z1(t, e, n, r), G1(t, n, i, r), af(u))
        : f
          ? ((u = i), G1(t, e, i, r), af(u))
          : s
            ? ((u = n), z1(t, e, n, r))
            : (u = e),
      {
        meaningfulScript: u,
        type: o ? "p2sh-p2wsh" : s ? "p2sh" : f ? "p2wsh" : "raw",
      }
    );
  }
  function af(e) {
    if ((0, it.isP2WPKH)(e) || (0, it.isP2SHScript)(e))
      throw new Error("P2WPKH or P2SH can not be contained within P2WSH");
  }
  function cb(e) {
    return (0, it.isP2WPKH)(e)
      ? "witnesspubkeyhash"
      : (0, it.isP2PKH)(e)
        ? "pubkeyhash"
        : (0, it.isP2MS)(e)
          ? "multisig"
          : (0, it.isP2PK)(e)
            ? "pubkey"
            : "nonstandard";
  }
  function ms(e) {
    return [...Array(e).keys()];
  }
});
var db = _((we) => {
  "use strict";
  Object.defineProperty(we, "__esModule", { value: !0 });
  we.initEccLib =
    we.Transaction =
    we.opcodes =
    we.Psbt =
    we.Block =
    we.script =
    we.payments =
    we.networks =
    we.crypto =
    we.address =
      void 0;
  var mw = Fo();
  we.address = mw;
  var ww = Sr();
  we.crypto = ww;
  var _w = zt();
  we.networks = _w;
  var Sw = ki();
  we.payments = Sw;
  var xw = _t();
  we.script = xw;
  var Ew = Bp();
  Object.defineProperty(we, "Block", {
    enumerable: !0,
    get: function () {
      return Ew.Block;
    },
  });
  var Aw = ub();
  Object.defineProperty(we, "Psbt", {
    enumerable: !0,
    get: function () {
      return Aw.Psbt;
    },
  });
  var Iw = Qs();
  Object.defineProperty(we, "opcodes", {
    enumerable: !0,
    get: function () {
      return Iw.OPS;
    },
  });
  var Tw = qi();
  Object.defineProperty(we, "Transaction", {
    enumerable: !0,
    get: function () {
      return Tw.Transaction;
    },
  });
  var Pw = Co();
  Object.defineProperty(we, "initEccLib", {
    enumerable: !0,
    get: function () {
      return Pw.initEccLib;
    },
  });
});
var lb = _((DM, hb) => {
  function Mw() {
    ((this.__data__ = []), (this.size = 0));
  }
  hb.exports = Mw;
});
var tu = _((VM, pb) => {
  function Ow(e, t) {
    return e === t || (e !== e && t !== t);
  }
  pb.exports = Ow;
});
var ws = _((WM, bb) => {
  var kw = tu();
  function Bw(e, t) {
    for (var r = e.length; r--; ) if (kw(e[r][0], t)) return r;
    return -1;
  }
  bb.exports = Bw;
});
var vb = _((zM, yb) => {
  var qw = ws(),
    Hw = Array.prototype,
    Nw = Hw.splice;
  function Rw(e) {
    var t = this.__data__,
      r = qw(t, e);
    if (r < 0) return !1;
    var n = t.length - 1;
    return (r == n ? t.pop() : Nw.call(t, r, 1), --this.size, !0);
  }
  yb.exports = Rw;
});
var mb = _((GM, gb) => {
  var Cw = ws();
  function Uw(e) {
    var t = this.__data__,
      r = Cw(t, e);
    return r < 0 ? void 0 : t[r][1];
  }
  gb.exports = Uw;
});
var _b = _((XM, wb) => {
  var Lw = ws();
  function Fw(e) {
    return Lw(this.__data__, e) > -1;
  }
  wb.exports = Fw;
});
var xb = _((YM, Sb) => {
  var Kw = ws();
  function jw(e, t) {
    var r = this.__data__,
      n = Kw(r, e);
    return (n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this);
  }
  Sb.exports = jw;
});
var _s = _(($M, Eb) => {
  var Dw = lb(),
    Vw = vb(),
    Ww = mb(),
    zw = _b(),
    Gw = xb();
  function Ri(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var n = e[t];
      this.set(n[0], n[1]);
    }
  }
  Ri.prototype.clear = Dw;
  Ri.prototype.delete = Vw;
  Ri.prototype.get = Ww;
  Ri.prototype.has = zw;
  Ri.prototype.set = Gw;
  Eb.exports = Ri;
});
var Ib = _((JM, Ab) => {
  var Xw = _s();
  function Yw() {
    ((this.__data__ = new Xw()), (this.size = 0));
  }
  Ab.exports = Yw;
});
var Pb = _((ZM, Tb) => {
  function $w(e) {
    var t = this.__data__,
      r = t.delete(e);
    return ((this.size = t.size), r);
  }
  Tb.exports = $w;
});
var Ob = _((QM, Mb) => {
  function Jw(e) {
    return this.__data__.get(e);
  }
  Mb.exports = Jw;
});
var Bb = _((eO, kb) => {
  function Zw(e) {
    return this.__data__.has(e);
  }
  kb.exports = Zw;
});
var ru = _((tO, qb) => {
  var Qw =
    typeof global == "object" && global && global.Object === Object && global;
  qb.exports = Qw;
});
var or = _((rO, Hb) => {
  var e7 = ru(),
    t7 = typeof self == "object" && self && self.Object === Object && self,
    r7 = e7 || t7 || Function("return this")();
  Hb.exports = r7;
});
var hf = _((nO, Nb) => {
  var n7 = or(),
    i7 = n7.Symbol;
  Nb.exports = i7;
});
var Lb = _((iO, Ub) => {
  var Rb = hf(),
    Cb = Object.prototype,
    s7 = Cb.hasOwnProperty,
    o7 = Cb.toString,
    Ss = Rb ? Rb.toStringTag : void 0;
  function f7(e) {
    var t = s7.call(e, Ss),
      r = e[Ss];
    try {
      e[Ss] = void 0;
      var n = !0;
    } catch {}
    var i = o7.call(e);
    return (n && (t ? (e[Ss] = r) : delete e[Ss]), i);
  }
  Ub.exports = f7;
});
var Kb = _((sO, Fb) => {
  var a7 = Object.prototype,
    c7 = a7.toString;
  function u7(e) {
    return c7.call(e);
  }
  Fb.exports = u7;
});
var xs = _((oO, Vb) => {
  var jb = hf(),
    d7 = Lb(),
    h7 = Kb(),
    l7 = "[object Null]",
    p7 = "[object Undefined]",
    Db = jb ? jb.toStringTag : void 0;
  function b7(e) {
    return e == null
      ? e === void 0
        ? p7
        : l7
      : Db && Db in Object(e)
        ? d7(e)
        : h7(e);
  }
  Vb.exports = b7;
});
var Ci = _((fO, Wb) => {
  function y7(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  Wb.exports = y7;
});
var nu = _((aO, zb) => {
  var v7 = xs(),
    g7 = Ci(),
    m7 = "[object AsyncFunction]",
    w7 = "[object Function]",
    _7 = "[object GeneratorFunction]",
    S7 = "[object Proxy]";
  function x7(e) {
    if (!g7(e)) return !1;
    var t = v7(e);
    return t == w7 || t == _7 || t == m7 || t == S7;
  }
  zb.exports = x7;
});
var Xb = _((cO, Gb) => {
  var E7 = or(),
    A7 = E7["__core-js_shared__"];
  Gb.exports = A7;
});
var Jb = _((uO, $b) => {
  var iu = Xb(),
    Yb = (function () {
      var e = /[^.]+$/.exec((iu && iu.keys && iu.keys.IE_PROTO) || "");
      return e ? "Symbol(src)_1." + e : "";
    })();
  function I7(e) {
    return !!Yb && Yb in e;
  }
  $b.exports = I7;
});
var su = _((dO, Zb) => {
  var T7 = Function.prototype,
    P7 = T7.toString;
  function M7(e) {
    if (e != null) {
      try {
        return P7.call(e);
      } catch {}
      try {
        return e + "";
      } catch {}
    }
    return "";
  }
  Zb.exports = M7;
});
var e2 = _((hO, Qb) => {
  var O7 = nu(),
    k7 = Jb(),
    B7 = Ci(),
    q7 = su(),
    H7 = /[\\^$.*+?()[\]{}|]/g,
    N7 = /^\[object .+?Constructor\]$/,
    R7 = Function.prototype,
    C7 = Object.prototype,
    U7 = R7.toString,
    L7 = C7.hasOwnProperty,
    F7 = RegExp(
      "^" +
        U7.call(L7)
          .replace(H7, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?",
          ) +
        "$",
    );
  function K7(e) {
    if (!B7(e) || k7(e)) return !1;
    var t = O7(e) ? F7 : N7;
    return t.test(q7(e));
  }
  Qb.exports = K7;
});
var r2 = _((lO, t2) => {
  function j7(e, t) {
    return e?.[t];
  }
  t2.exports = j7;
});
var wn = _((pO, n2) => {
  var D7 = e2(),
    V7 = r2();
  function W7(e, t) {
    var r = V7(e, t);
    return D7(r) ? r : void 0;
  }
  n2.exports = W7;
});
var lf = _((bO, i2) => {
  var z7 = wn(),
    G7 = or(),
    X7 = z7(G7, "Map");
  i2.exports = X7;
});
var Es = _((yO, s2) => {
  var Y7 = wn(),
    $7 = Y7(Object, "create");
  s2.exports = $7;
});
var a2 = _((vO, f2) => {
  var o2 = Es();
  function J7() {
    ((this.__data__ = o2 ? o2(null) : {}), (this.size = 0));
  }
  f2.exports = J7;
});
var u2 = _((gO, c2) => {
  function Z7(e) {
    var t = this.has(e) && delete this.__data__[e];
    return ((this.size -= t ? 1 : 0), t);
  }
  c2.exports = Z7;
});
var h2 = _((mO, d2) => {
  var Q7 = Es(),
    e_ = "__lodash_hash_undefined__",
    t_ = Object.prototype,
    r_ = t_.hasOwnProperty;
  function n_(e) {
    var t = this.__data__;
    if (Q7) {
      var r = t[e];
      return r === e_ ? void 0 : r;
    }
    return r_.call(t, e) ? t[e] : void 0;
  }
  d2.exports = n_;
});
var p2 = _((wO, l2) => {
  var i_ = Es(),
    s_ = Object.prototype,
    o_ = s_.hasOwnProperty;
  function f_(e) {
    var t = this.__data__;
    return i_ ? t[e] !== void 0 : o_.call(t, e);
  }
  l2.exports = f_;
});
var y2 = _((_O, b2) => {
  var a_ = Es(),
    c_ = "__lodash_hash_undefined__";
  function u_(e, t) {
    var r = this.__data__;
    return (
      (this.size += this.has(e) ? 0 : 1),
      (r[e] = a_ && t === void 0 ? c_ : t),
      this
    );
  }
  b2.exports = u_;
});
var g2 = _((SO, v2) => {
  var d_ = a2(),
    h_ = u2(),
    l_ = h2(),
    p_ = p2(),
    b_ = y2();
  function Ui(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var n = e[t];
      this.set(n[0], n[1]);
    }
  }
  Ui.prototype.clear = d_;
  Ui.prototype.delete = h_;
  Ui.prototype.get = l_;
  Ui.prototype.has = p_;
  Ui.prototype.set = b_;
  v2.exports = Ui;
});
var _2 = _((xO, w2) => {
  var m2 = g2(),
    y_ = _s(),
    v_ = lf();
  function g_() {
    ((this.size = 0),
      (this.__data__ = {
        hash: new m2(),
        map: new (v_ || y_)(),
        string: new m2(),
      }));
  }
  w2.exports = g_;
});
var x2 = _((EO, S2) => {
  function m_(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean"
      ? e !== "__proto__"
      : e === null;
  }
  S2.exports = m_;
});
var As = _((AO, E2) => {
  var w_ = x2();
  function __(e, t) {
    var r = e.__data__;
    return w_(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
  }
  E2.exports = __;
});
var I2 = _((IO, A2) => {
  var S_ = As();
  function x_(e) {
    var t = S_(this, e).delete(e);
    return ((this.size -= t ? 1 : 0), t);
  }
  A2.exports = x_;
});
var P2 = _((TO, T2) => {
  var E_ = As();
  function A_(e) {
    return E_(this, e).get(e);
  }
  T2.exports = A_;
});
var O2 = _((PO, M2) => {
  var I_ = As();
  function T_(e) {
    return I_(this, e).has(e);
  }
  M2.exports = T_;
});
var B2 = _((MO, k2) => {
  var P_ = As();
  function M_(e, t) {
    var r = P_(this, e),
      n = r.size;
    return (r.set(e, t), (this.size += r.size == n ? 0 : 1), this);
  }
  k2.exports = M_;
});
var H2 = _((OO, q2) => {
  var O_ = _2(),
    k_ = I2(),
    B_ = P2(),
    q_ = O2(),
    H_ = B2();
  function Li(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var n = e[t];
      this.set(n[0], n[1]);
    }
  }
  Li.prototype.clear = O_;
  Li.prototype.delete = k_;
  Li.prototype.get = B_;
  Li.prototype.has = q_;
  Li.prototype.set = H_;
  q2.exports = Li;
});
var R2 = _((kO, N2) => {
  var N_ = _s(),
    R_ = lf(),
    C_ = H2(),
    U_ = 200;
  function L_(e, t) {
    var r = this.__data__;
    if (r instanceof N_) {
      var n = r.__data__;
      if (!R_ || n.length < U_ - 1)
        return (n.push([e, t]), (this.size = ++r.size), this);
      r = this.__data__ = new C_(n);
    }
    return (r.set(e, t), (this.size = r.size), this);
  }
  N2.exports = L_;
});
var U2 = _((BO, C2) => {
  var F_ = _s(),
    K_ = Ib(),
    j_ = Pb(),
    D_ = Ob(),
    V_ = Bb(),
    W_ = R2();
  function Fi(e) {
    var t = (this.__data__ = new F_(e));
    this.size = t.size;
  }
  Fi.prototype.clear = K_;
  Fi.prototype.delete = j_;
  Fi.prototype.get = D_;
  Fi.prototype.has = V_;
  Fi.prototype.set = W_;
  C2.exports = Fi;
});
var F2 = _((qO, L2) => {
  function z_(e, t) {
    for (
      var r = -1, n = e == null ? 0 : e.length;
      ++r < n && t(e[r], r, e) !== !1;

    );
    return e;
  }
  L2.exports = z_;
});
var j2 = _((HO, K2) => {
  var G_ = wn(),
    X_ = (function () {
      try {
        var e = G_(Object, "defineProperty");
        return (e({}, "", {}), e);
      } catch {}
    })();
  K2.exports = X_;
});
var ou = _((NO, V2) => {
  var D2 = j2();
  function Y_(e, t, r) {
    t == "__proto__" && D2
      ? D2(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
      : (e[t] = r);
  }
  V2.exports = Y_;
});
var fu = _((RO, W2) => {
  var $_ = ou(),
    J_ = tu(),
    Z_ = Object.prototype,
    Q_ = Z_.hasOwnProperty;
  function eS(e, t, r) {
    var n = e[t];
    (!(Q_.call(e, t) && J_(n, r)) || (r === void 0 && !(t in e))) &&
      $_(e, t, r);
  }
  W2.exports = eS;
});
var Is = _((CO, z2) => {
  var tS = fu(),
    rS = ou();
  function nS(e, t, r, n) {
    var i = !r;
    r || (r = {});
    for (var s = -1, o = t.length; ++s < o; ) {
      var f = t[s],
        u = n ? n(r[f], e[f], f, r, e) : void 0;
      (u === void 0 && (u = e[f]), i ? rS(r, f, u) : tS(r, f, u));
    }
    return r;
  }
  z2.exports = nS;
});
var X2 = _((UO, G2) => {
  function iS(e, t) {
    for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
    return n;
  }
  G2.exports = iS;
});
var Ki = _((LO, Y2) => {
  function sS(e) {
    return e != null && typeof e == "object";
  }
  Y2.exports = sS;
});
var J2 = _((FO, $2) => {
  var oS = xs(),
    fS = Ki(),
    aS = "[object Arguments]";
  function cS(e) {
    return fS(e) && oS(e) == aS;
  }
  $2.exports = cS;
});
var t3 = _((KO, e3) => {
  var Z2 = J2(),
    uS = Ki(),
    Q2 = Object.prototype,
    dS = Q2.hasOwnProperty,
    hS = Q2.propertyIsEnumerable,
    lS = Z2(
      (function () {
        return arguments;
      })(),
    )
      ? Z2
      : function (e) {
          return uS(e) && dS.call(e, "callee") && !hS.call(e, "callee");
        };
  e3.exports = lS;
});
var pf = _((jO, r3) => {
  var pS = Array.isArray;
  r3.exports = pS;
});
var i3 = _((DO, n3) => {
  function bS() {
    return !1;
  }
  n3.exports = bS;
});
var au = _((Ts, ji) => {
  var yS = or(),
    vS = i3(),
    f3 = typeof Ts == "object" && Ts && !Ts.nodeType && Ts,
    s3 = f3 && typeof ji == "object" && ji && !ji.nodeType && ji,
    gS = s3 && s3.exports === f3,
    o3 = gS ? yS.Buffer : void 0,
    mS = o3 ? o3.isBuffer : void 0,
    wS = mS || vS;
  ji.exports = wS;
});
var c3 = _((VO, a3) => {
  var _S = 9007199254740991,
    SS = /^(?:0|[1-9]\d*)$/;
  function xS(e, t) {
    var r = typeof e;
    return (
      (t = t ?? _S),
      !!t &&
        (r == "number" || (r != "symbol" && SS.test(e))) &&
        e > -1 &&
        e % 1 == 0 &&
        e < t
    );
  }
  a3.exports = xS;
});
var cu = _((WO, u3) => {
  var ES = 9007199254740991;
  function AS(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ES;
  }
  u3.exports = AS;
});
var h3 = _((zO, d3) => {
  var IS = xs(),
    TS = cu(),
    PS = Ki(),
    MS = "[object Arguments]",
    OS = "[object Array]",
    kS = "[object Boolean]",
    BS = "[object Date]",
    qS = "[object Error]",
    HS = "[object Function]",
    NS = "[object Map]",
    RS = "[object Number]",
    CS = "[object Object]",
    US = "[object RegExp]",
    LS = "[object Set]",
    FS = "[object String]",
    KS = "[object WeakMap]",
    jS = "[object ArrayBuffer]",
    DS = "[object DataView]",
    VS = "[object Float32Array]",
    WS = "[object Float64Array]",
    zS = "[object Int8Array]",
    GS = "[object Int16Array]",
    XS = "[object Int32Array]",
    YS = "[object Uint8Array]",
    $S = "[object Uint8ClampedArray]",
    JS = "[object Uint16Array]",
    ZS = "[object Uint32Array]",
    pe = {};
  pe[VS] =
    pe[WS] =
    pe[zS] =
    pe[GS] =
    pe[XS] =
    pe[YS] =
    pe[$S] =
    pe[JS] =
    pe[ZS] =
      !0;
  pe[MS] =
    pe[OS] =
    pe[jS] =
    pe[kS] =
    pe[DS] =
    pe[BS] =
    pe[qS] =
    pe[HS] =
    pe[NS] =
    pe[RS] =
    pe[CS] =
    pe[US] =
    pe[LS] =
    pe[FS] =
    pe[KS] =
      !1;
  function QS(e) {
    return PS(e) && TS(e.length) && !!pe[IS(e)];
  }
  d3.exports = QS;
});
var bf = _((GO, l3) => {
  function ex(e) {
    return function (t) {
      return e(t);
    };
  }
  l3.exports = ex;
});
var yf = _((Ps, Di) => {
  var tx = ru(),
    p3 = typeof Ps == "object" && Ps && !Ps.nodeType && Ps,
    Ms = p3 && typeof Di == "object" && Di && !Di.nodeType && Di,
    rx = Ms && Ms.exports === p3,
    uu = rx && tx.process,
    nx = (function () {
      try {
        var e = Ms && Ms.require && Ms.require("util").types;
        return e || (uu && uu.binding && uu.binding("util"));
      } catch {}
    })();
  Di.exports = nx;
});
var g3 = _((XO, v3) => {
  var ix = h3(),
    sx = bf(),
    b3 = yf(),
    y3 = b3 && b3.isTypedArray,
    ox = y3 ? sx(y3) : ix;
  v3.exports = ox;
});
var du = _((YO, m3) => {
  var fx = X2(),
    ax = t3(),
    cx = pf(),
    ux = au(),
    dx = c3(),
    hx = g3(),
    lx = Object.prototype,
    px = lx.hasOwnProperty;
  function bx(e, t) {
    var r = cx(e),
      n = !r && ax(e),
      i = !r && !n && ux(e),
      s = !r && !n && !i && hx(e),
      o = r || n || i || s,
      f = o ? fx(e.length, String) : [],
      u = f.length;
    for (var l in e)
      (t || px.call(e, l)) &&
        !(
          o &&
          (l == "length" ||
            (i && (l == "offset" || l == "parent")) ||
            (s && (l == "buffer" || l == "byteLength" || l == "byteOffset")) ||
            dx(l, u))
        ) &&
        f.push(l);
    return f;
  }
  m3.exports = bx;
});
var vf = _(($O, w3) => {
  var yx = Object.prototype;
  function vx(e) {
    var t = e && e.constructor,
      r = (typeof t == "function" && t.prototype) || yx;
    return e === r;
  }
  w3.exports = vx;
});
var hu = _((JO, _3) => {
  function gx(e, t) {
    return function (r) {
      return e(t(r));
    };
  }
  _3.exports = gx;
});
var x3 = _((ZO, S3) => {
  var mx = hu(),
    wx = mx(Object.keys, Object);
  S3.exports = wx;
});
var A3 = _((QO, E3) => {
  var _x = vf(),
    Sx = x3(),
    xx = Object.prototype,
    Ex = xx.hasOwnProperty;
  function Ax(e) {
    if (!_x(e)) return Sx(e);
    var t = [];
    for (var r in Object(e)) Ex.call(e, r) && r != "constructor" && t.push(r);
    return t;
  }
  E3.exports = Ax;
});
var lu = _((ek, I3) => {
  var Ix = nu(),
    Tx = cu();
  function Px(e) {
    return e != null && Tx(e.length) && !Ix(e);
  }
  I3.exports = Px;
});
var gf = _((tk, T3) => {
  var Mx = du(),
    Ox = A3(),
    kx = lu();
  function Bx(e) {
    return kx(e) ? Mx(e) : Ox(e);
  }
  T3.exports = Bx;
});
var M3 = _((rk, P3) => {
  var qx = Is(),
    Hx = gf();
  function Nx(e, t) {
    return e && qx(t, Hx(t), e);
  }
  P3.exports = Nx;
});
var k3 = _((nk, O3) => {
  function Rx(e) {
    var t = [];
    if (e != null) for (var r in Object(e)) t.push(r);
    return t;
  }
  O3.exports = Rx;
});
var q3 = _((ik, B3) => {
  var Cx = Ci(),
    Ux = vf(),
    Lx = k3(),
    Fx = Object.prototype,
    Kx = Fx.hasOwnProperty;
  function jx(e) {
    if (!Cx(e)) return Lx(e);
    var t = Ux(e),
      r = [];
    for (var n in e) (n == "constructor" && (t || !Kx.call(e, n))) || r.push(n);
    return r;
  }
  B3.exports = jx;
});
var mf = _((sk, H3) => {
  var Dx = du(),
    Vx = q3(),
    Wx = lu();
  function zx(e) {
    return Wx(e) ? Dx(e, !0) : Vx(e);
  }
  H3.exports = zx;
});
var R3 = _((ok, N3) => {
  var Gx = Is(),
    Xx = mf();
  function Yx(e, t) {
    return e && Gx(t, Xx(t), e);
  }
  N3.exports = Yx;
});
var K3 = _((Os, Vi) => {
  var $x = or(),
    F3 = typeof Os == "object" && Os && !Os.nodeType && Os,
    C3 = F3 && typeof Vi == "object" && Vi && !Vi.nodeType && Vi,
    Jx = C3 && C3.exports === F3,
    U3 = Jx ? $x.Buffer : void 0,
    L3 = U3 ? U3.allocUnsafe : void 0;
  function Zx(e, t) {
    if (t) return e.slice();
    var r = e.length,
      n = L3 ? L3(r) : new e.constructor(r);
    return (e.copy(n), n);
  }
  Vi.exports = Zx;
});
var D3 = _((fk, j3) => {
  function Qx(e, t) {
    var r = -1,
      n = e.length;
    for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
    return t;
  }
  j3.exports = Qx;
});
var W3 = _((ak, V3) => {
  function eE(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, i = 0, s = []; ++r < n; ) {
      var o = e[r];
      t(o, r, e) && (s[i++] = o);
    }
    return s;
  }
  V3.exports = eE;
});
var pu = _((ck, z3) => {
  function tE() {
    return [];
  }
  z3.exports = tE;
});
var wf = _((uk, X3) => {
  var rE = W3(),
    nE = pu(),
    iE = Object.prototype,
    sE = iE.propertyIsEnumerable,
    G3 = Object.getOwnPropertySymbols,
    oE = G3
      ? function (e) {
          return e == null
            ? []
            : ((e = Object(e)),
              rE(G3(e), function (t) {
                return sE.call(e, t);
              }));
        }
      : nE;
  X3.exports = oE;
});
var $3 = _((dk, Y3) => {
  var fE = Is(),
    aE = wf();
  function cE(e, t) {
    return fE(e, aE(e), t);
  }
  Y3.exports = cE;
});
var bu = _((hk, J3) => {
  function uE(e, t) {
    for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
    return e;
  }
  J3.exports = uE;
});
var yu = _((lk, Z3) => {
  var dE = hu(),
    hE = dE(Object.getPrototypeOf, Object);
  Z3.exports = hE;
});
var vu = _((pk, Q3) => {
  var lE = bu(),
    pE = yu(),
    bE = wf(),
    yE = pu(),
    vE = Object.getOwnPropertySymbols,
    gE = vE
      ? function (e) {
          for (var t = []; e; ) (lE(t, bE(e)), (e = pE(e)));
          return t;
        }
      : yE;
  Q3.exports = gE;
});
var t6 = _((bk, e6) => {
  var mE = Is(),
    wE = vu();
  function _E(e, t) {
    return mE(e, wE(e), t);
  }
  e6.exports = _E;
});
var gu = _((yk, r6) => {
  var SE = bu(),
    xE = pf();
  function EE(e, t, r) {
    var n = t(e);
    return xE(e) ? n : SE(n, r(e));
  }
  r6.exports = EE;
});
var i6 = _((vk, n6) => {
  var AE = gu(),
    IE = wf(),
    TE = gf();
  function PE(e) {
    return AE(e, TE, IE);
  }
  n6.exports = PE;
});
var o6 = _((gk, s6) => {
  var ME = gu(),
    OE = vu(),
    kE = mf();
  function BE(e) {
    return ME(e, kE, OE);
  }
  s6.exports = BE;
});
var a6 = _((mk, f6) => {
  var qE = wn(),
    HE = or(),
    NE = qE(HE, "DataView");
  f6.exports = NE;
});
var u6 = _((wk, c6) => {
  var RE = wn(),
    CE = or(),
    UE = RE(CE, "Promise");
  c6.exports = UE;
});
var h6 = _((_k, d6) => {
  var LE = wn(),
    FE = or(),
    KE = LE(FE, "Set");
  d6.exports = KE;
});
var p6 = _((Sk, l6) => {
  var jE = wn(),
    DE = or(),
    VE = jE(DE, "WeakMap");
  l6.exports = VE;
});
var _f = _((xk, _6) => {
  var mu = a6(),
    wu = lf(),
    _u = u6(),
    Su = h6(),
    xu = p6(),
    w6 = xs(),
    Wi = su(),
    b6 = "[object Map]",
    WE = "[object Object]",
    y6 = "[object Promise]",
    v6 = "[object Set]",
    g6 = "[object WeakMap]",
    m6 = "[object DataView]",
    zE = Wi(mu),
    GE = Wi(wu),
    XE = Wi(_u),
    YE = Wi(Su),
    $E = Wi(xu),
    $n = w6;
  ((mu && $n(new mu(new ArrayBuffer(1))) != m6) ||
    (wu && $n(new wu()) != b6) ||
    (_u && $n(_u.resolve()) != y6) ||
    (Su && $n(new Su()) != v6) ||
    (xu && $n(new xu()) != g6)) &&
    ($n = function (e) {
      var t = w6(e),
        r = t == WE ? e.constructor : void 0,
        n = r ? Wi(r) : "";
      if (n)
        switch (n) {
          case zE:
            return m6;
          case GE:
            return b6;
          case XE:
            return y6;
          case YE:
            return v6;
          case $E:
            return g6;
        }
      return t;
    });
  _6.exports = $n;
});
var x6 = _((Ek, S6) => {
  var JE = Object.prototype,
    ZE = JE.hasOwnProperty;
  function QE(e) {
    var t = e.length,
      r = new e.constructor(t);
    return (
      t &&
        typeof e[0] == "string" &&
        ZE.call(e, "index") &&
        ((r.index = e.index), (r.input = e.input)),
      r
    );
  }
  S6.exports = QE;
});
var A6 = _((Ak, E6) => {
  var eA = or(),
    tA = eA.Uint8Array;
  E6.exports = tA;
});
var Sf = _((Ik, T6) => {
  var I6 = A6();
  function rA(e) {
    var t = new e.constructor(e.byteLength);
    return (new I6(t).set(new I6(e)), t);
  }
  T6.exports = rA;
});
var M6 = _((Tk, P6) => {
  var nA = Sf();
  function iA(e, t) {
    var r = t ? nA(e.buffer) : e.buffer;
    return new e.constructor(r, e.byteOffset, e.byteLength);
  }
  P6.exports = iA;
});
var k6 = _((Pk, O6) => {
  var sA = /\w*$/;
  function oA(e) {
    var t = new e.constructor(e.source, sA.exec(e));
    return ((t.lastIndex = e.lastIndex), t);
  }
  O6.exports = oA;
});
var R6 = _((Mk, N6) => {
  var B6 = hf(),
    q6 = B6 ? B6.prototype : void 0,
    H6 = q6 ? q6.valueOf : void 0;
  function fA(e) {
    return H6 ? Object(H6.call(e)) : {};
  }
  N6.exports = fA;
});
var U6 = _((Ok, C6) => {
  var aA = Sf();
  function cA(e, t) {
    var r = t ? aA(e.buffer) : e.buffer;
    return new e.constructor(r, e.byteOffset, e.length);
  }
  C6.exports = cA;
});
var F6 = _((kk, L6) => {
  var uA = Sf(),
    dA = M6(),
    hA = k6(),
    lA = R6(),
    pA = U6(),
    bA = "[object Boolean]",
    yA = "[object Date]",
    vA = "[object Map]",
    gA = "[object Number]",
    mA = "[object RegExp]",
    wA = "[object Set]",
    _A = "[object String]",
    SA = "[object Symbol]",
    xA = "[object ArrayBuffer]",
    EA = "[object DataView]",
    AA = "[object Float32Array]",
    IA = "[object Float64Array]",
    TA = "[object Int8Array]",
    PA = "[object Int16Array]",
    MA = "[object Int32Array]",
    OA = "[object Uint8Array]",
    kA = "[object Uint8ClampedArray]",
    BA = "[object Uint16Array]",
    qA = "[object Uint32Array]";
  function HA(e, t, r) {
    var n = e.constructor;
    switch (t) {
      case xA:
        return uA(e);
      case bA:
      case yA:
        return new n(+e);
      case EA:
        return dA(e, r);
      case AA:
      case IA:
      case TA:
      case PA:
      case MA:
      case OA:
      case kA:
      case BA:
      case qA:
        return pA(e, r);
      case vA:
        return new n();
      case gA:
      case _A:
        return new n(e);
      case mA:
        return hA(e);
      case wA:
        return new n();
      case SA:
        return lA(e);
    }
  }
  L6.exports = HA;
});
var D6 = _((Bk, j6) => {
  var NA = Ci(),
    K6 = Object.create,
    RA = (function () {
      function e() {}
      return function (t) {
        if (!NA(t)) return {};
        if (K6) return K6(t);
        e.prototype = t;
        var r = new e();
        return ((e.prototype = void 0), r);
      };
    })();
  j6.exports = RA;
});
var W6 = _((qk, V6) => {
  var CA = D6(),
    UA = yu(),
    LA = vf();
  function FA(e) {
    return typeof e.constructor == "function" && !LA(e) ? CA(UA(e)) : {};
  }
  V6.exports = FA;
});
var G6 = _((Hk, z6) => {
  var KA = _f(),
    jA = Ki(),
    DA = "[object Map]";
  function VA(e) {
    return jA(e) && KA(e) == DA;
  }
  z6.exports = VA;
});
var J6 = _((Nk, $6) => {
  var WA = G6(),
    zA = bf(),
    X6 = yf(),
    Y6 = X6 && X6.isMap,
    GA = Y6 ? zA(Y6) : WA;
  $6.exports = GA;
});
var Q6 = _((Rk, Z6) => {
  var XA = _f(),
    YA = Ki(),
    $A = "[object Set]";
  function JA(e) {
    return YA(e) && XA(e) == $A;
  }
  Z6.exports = JA;
});
var n4 = _((Ck, r4) => {
  var ZA = Q6(),
    QA = bf(),
    e4 = yf(),
    t4 = e4 && e4.isSet,
    eI = t4 ? QA(t4) : ZA;
  r4.exports = eI;
});
var a4 = _((Uk, f4) => {
  var tI = U2(),
    rI = F2(),
    nI = fu(),
    iI = M3(),
    sI = R3(),
    oI = K3(),
    fI = D3(),
    aI = $3(),
    cI = t6(),
    uI = i6(),
    dI = o6(),
    hI = _f(),
    lI = x6(),
    pI = F6(),
    bI = W6(),
    yI = pf(),
    vI = au(),
    gI = J6(),
    mI = Ci(),
    wI = n4(),
    _I = gf(),
    SI = mf(),
    xI = 1,
    EI = 2,
    AI = 4,
    i4 = "[object Arguments]",
    II = "[object Array]",
    TI = "[object Boolean]",
    PI = "[object Date]",
    MI = "[object Error]",
    s4 = "[object Function]",
    OI = "[object GeneratorFunction]",
    kI = "[object Map]",
    BI = "[object Number]",
    o4 = "[object Object]",
    qI = "[object RegExp]",
    HI = "[object Set]",
    NI = "[object String]",
    RI = "[object Symbol]",
    CI = "[object WeakMap]",
    UI = "[object ArrayBuffer]",
    LI = "[object DataView]",
    FI = "[object Float32Array]",
    KI = "[object Float64Array]",
    jI = "[object Int8Array]",
    DI = "[object Int16Array]",
    VI = "[object Int32Array]",
    WI = "[object Uint8Array]",
    zI = "[object Uint8ClampedArray]",
    GI = "[object Uint16Array]",
    XI = "[object Uint32Array]",
    de = {};
  de[i4] =
    de[II] =
    de[UI] =
    de[LI] =
    de[TI] =
    de[PI] =
    de[FI] =
    de[KI] =
    de[jI] =
    de[DI] =
    de[VI] =
    de[kI] =
    de[BI] =
    de[o4] =
    de[qI] =
    de[HI] =
    de[NI] =
    de[RI] =
    de[WI] =
    de[zI] =
    de[GI] =
    de[XI] =
      !0;
  de[MI] = de[s4] = de[CI] = !1;
  function xf(e, t, r, n, i, s) {
    var o,
      f = t & xI,
      u = t & EI,
      l = t & AI;
    if ((r && (o = i ? r(e, n, i, s) : r(e)), o !== void 0)) return o;
    if (!mI(e)) return e;
    var p = yI(e);
    if (p) {
      if (((o = lI(e)), !f)) return fI(e, o);
    } else {
      var h = hI(e),
        w = h == s4 || h == OI;
      if (vI(e)) return oI(e, f);
      if (h == o4 || h == i4 || (w && !i)) {
        if (((o = u || w ? {} : bI(e)), !f))
          return u ? cI(e, sI(o, e)) : aI(e, iI(o, e));
      } else {
        if (!de[h]) return i ? e : {};
        o = pI(e, h, f);
      }
    }
    s || (s = new tI());
    var E = s.get(e);
    if (E) return E;
    (s.set(e, o),
      wI(e)
        ? e.forEach(function (O) {
            o.add(xf(O, t, r, O, e, s));
          })
        : gI(e) &&
          e.forEach(function (O, k) {
            o.set(k, xf(O, t, r, k, e, s));
          }));
    var A = l ? (u ? dI : uI) : u ? SI : _I,
      T = p ? void 0 : A(e);
    return (
      rI(T || e, function (O, k) {
        (T && ((k = O), (O = e[k])), nI(o, k, xf(O, t, r, k, e, s)));
      }),
      o
    );
  }
  f4.exports = xf;
});
var u4 = _((Lk, c4) => {
  var YI = a4(),
    $I = 1,
    JI = 4;
  function ZI(e) {
    return YI(e, $I | JI);
  }
  c4.exports = ZI;
});
var g4 = _((Fk, v4) => {
  "use strict";
  var QI = Yu(),
    $t = Qu(),
    zi = Zd(),
    te = qa().Buffer,
    ge = Zt(),
    ks = db().address,
    b4 = u4(),
    Ef = {
      bech32: "bc",
      pubKeyHash: 0,
      scriptHash: 5,
      validWitnessVersions: [0, 1],
    },
    d4 = {
      bech32: "tb",
      pubKeyHash: 111,
      scriptHash: 196,
      validWitnessVersions: [0, 1],
    },
    h4 = {
      bech32: "bcrt",
      pubKeyHash: 111,
      scriptHash: 196,
      validWitnessVersions: [0, 1],
    },
    l4 = {
      bech32: "sb",
      pubKeyHash: 63,
      scriptHash: 123,
      validWitnessVersions: [0, 1],
    },
    eT = 3600,
    tT = 9,
    rT = "",
    nT = {
      word_length: 4,
      var_onion_optin: { required: !1, supported: !0 },
      payment_secret: { required: !1, supported: !0 },
    },
    Jn = [
      "option_data_loss_protect",
      "initial_routing_sync",
      "option_upfront_shutdown_script",
      "gossip_queries",
      "var_onion_optin",
      "gossip_queries_ex",
      "option_static_remotekey",
      "payment_secret",
      "basic_mpp",
      "option_support_large_channel",
    ],
    iT = {
      m: new ge(1e3, 10),
      u: new ge(1e6, 10),
      n: new ge(1e9, 10),
      p: new ge(1e12, 10),
    },
    sT = new ge("2100000000000000000", 10),
    Eu = new ge(1e11, 10),
    oT = new ge(1e8, 10),
    fT = new ge(1e5, 10),
    aT = new ge(100, 10),
    cT = new ge(10, 10),
    Au = {
      payment_hash: 1,
      payment_secret: 16,
      description: 13,
      payee_node_key: 19,
      purpose_commit_hash: 23,
      expire_time: 6,
      min_final_cltv_expiry: 24,
      fallback_address: 9,
      routing_info: 3,
      feature_bits: 5,
    },
    ee = {};
  for (let e = 0, t = Object.keys(Au); e < t.length; e++) {
    let r = t[e],
      n = Au[t[e]].toString();
    ee[n] = r;
  }
  var p4 = {
      payment_hash: Qn,
      payment_secret: Qn,
      description: pT,
      payee_node_key: Qn,
      purpose_commit_hash: _T,
      expire_time: Zn,
      min_final_cltv_expiry: Zn,
      fallback_address: yT,
      routing_info: wT,
      feature_bits: mT,
    },
    uT = {
      1: (e) => zr(e, !0).toString("hex"),
      16: (e) => zr(e, !0).toString("hex"),
      13: (e) => zr(e, !0).toString("utf8"),
      19: (e) => zr(e, !0).toString("hex"),
      23: (e) => zr(e, !0).toString("hex"),
      6: If,
      24: If,
      9: bT,
      3: vT,
      5: gT,
    },
    Af = "unknownTag";
  function dT(e) {
    return ((e.words = $t.decode(e.words, Number.MAX_SAFE_INTEGER).words), e);
  }
  function hT(e) {
    return (t) => ({
      tagCode: parseInt(e),
      words: $t.encode("unknown", t, Number.MAX_SAFE_INTEGER),
    });
  }
  function If(e) {
    return e.reverse().reduce((t, r, n) => t + r * Math.pow(32, n), 0);
  }
  function Zn(e, t) {
    let r = [];
    if ((t === void 0 && (t = 5), (e = Math.floor(e)), e === 0)) return [0];
    for (; e > 0; )
      (r.push(e & (Math.pow(2, t) - 1)), (e = Math.floor(e / Math.pow(2, t))));
    return r.reverse();
  }
  function Pf(e) {
    return QI("sha256").update(e).digest();
  }
  function Tu(e, t, r) {
    let n = 0,
      i = 0,
      s = (1 << r) - 1,
      o = [];
    for (let f = 0; f < e.length; ++f)
      for (n = (n << t) | e[f], i += t; i >= r; )
        ((i -= r), o.push((n >> i) & s));
    return (i > 0 && o.push((n << (r - i)) & s), o);
  }
  function zr(e, t) {
    let r = te.from(Tu(e, 5, 8, !0));
    return (t && (e.length * 5) % 8 !== 0 && (r = r.slice(0, -1)), r);
  }
  function Mr(e) {
    return e !== void 0 &&
      (typeof e == "string" || e instanceof String) &&
      e.match(/^([a-zA-Z0-9]{2})*$/)
      ? te.from(e, "hex")
      : e;
  }
  function lT(e) {
    return te.from(e, "utf8");
  }
  function Qn(e) {
    let t = Mr(e);
    return $t.toWords(t);
  }
  function pT(e) {
    let t = lT(e);
    return $t.toWords(t);
  }
  function bT(e, t) {
    let r = e[0];
    e = e.slice(1);
    let n = zr(e, !0),
      i = null;
    switch (r) {
      case 17:
        i = ks.toBase58Check(n, t.pubKeyHash);
        break;
      case 18:
        i = ks.toBase58Check(n, t.scriptHash);
        break;
      case 0:
      case 1:
        i = ks.toBech32(n, r, t.bech32);
        break;
    }
    return { code: r, address: i, addressHash: n.toString("hex") };
  }
  function yT(e, t) {
    return [e.code].concat(Qn(e.addressHash));
  }
  function vT(e) {
    let t = [],
      r,
      n,
      i,
      s,
      o,
      f = zr(e, !0);
    for (; f.length > 0; )
      ((r = f.slice(0, 33).toString("hex")),
        (n = f.slice(33, 41).toString("hex")),
        (i = parseInt(f.slice(41, 45).toString("hex"), 16)),
        (s = parseInt(f.slice(45, 49).toString("hex"), 16)),
        (o = parseInt(f.slice(49, 51).toString("hex"), 16)),
        (f = f.slice(51)),
        t.push({
          pubkey: r,
          short_channel_id: n,
          fee_base_msat: i,
          fee_proportional_millionths: s,
          cltv_expiry_delta: o,
        }));
    return t;
  }
  function gT(e) {
    let t = e
      .slice()
      .reverse()
      .map((n) => [!!(n & 1), !!(n & 2), !!(n & 4), !!(n & 8), !!(n & 16)])
      .reduce((n, i) => n.concat(i), []);
    for (; t.length < Jn.length * 2; ) t.push(!1);
    let r = { word_length: e.length };
    if (
      (Jn.forEach((n, i) => {
        r[n] = { required: t[i * 2], supported: t[i * 2 + 1] };
      }),
      t.length > Jn.length * 2)
    ) {
      let n = t.slice(Jn.length * 2);
      r.extra_bits = {
        start_bit: Jn.length * 2,
        bits: n,
        has_required: n.reduce(
          (i, s, o) => (o % 2 !== 0 ? i || !1 : i || s),
          !1,
        ),
      };
    } else
      r.extra_bits = { start_bit: Jn.length * 2, bits: [], has_required: !1 };
    return r;
  }
  function mT(e) {
    let t = e.word_length,
      r = [];
    for (
      Jn.forEach((n) => {
        (r.push(!!(e[n] || {}).required), r.push(!!(e[n] || {}).supported));
      });
      r[r.length - 1] === !1;

    )
      r.pop();
    for (; r.length % 5 !== 0; ) r.push(!1);
    if (
      e.extra_bits &&
      Array.isArray(e.extra_bits.bits) &&
      e.extra_bits.bits.length > 0
    ) {
      for (; r.length < e.extra_bits.start_bit; ) r.push(!1);
      r = r.concat(e.extra_bits.bits);
    }
    if (t !== void 0 && r.length / 5 > t)
      throw new Error("word_length is too small to contain all featureBits");
    return (
      t === void 0 && (t = Math.ceil(r.length / 5)),
      new Array(t)
        .fill(0)
        .map(
          (n, i) =>
            (r[i * 5 + 4] << 4) |
            (r[i * 5 + 3] << 3) |
            (r[i * 5 + 2] << 2) |
            (r[i * 5 + 1] << 1) |
            (r[i * 5] << 0),
        )
        .reverse()
    );
  }
  function wT(e) {
    let t = te.from([]);
    return (
      e.forEach((r) => {
        ((t = te.concat([t, Mr(r.pubkey)])),
          (t = te.concat([t, Mr(r.short_channel_id)])),
          (t = te.concat([
            t,
            te.from([0, 0, 0].concat(Zn(r.fee_base_msat, 8)).slice(-4)),
          ])),
          (t = te.concat([
            t,
            te.from(
              [0, 0, 0].concat(Zn(r.fee_proportional_millionths, 8)).slice(-4),
            ),
          ])),
          (t = te.concat([
            t,
            te.from([0].concat(Zn(r.cltv_expiry_delta, 8)).slice(-2)),
          ])));
      }),
      Qn(t)
    );
  }
  function _T(e) {
    let t;
    if (e !== void 0 && (typeof e == "string" || e instanceof String))
      e.match(/^([a-zA-Z0-9]{2})*$/)
        ? (t = te.from(e, "hex"))
        : (t = Pf(te.from(e, "utf8")));
    else
      throw new Error(
        "purpose or purpose commit must be a string or hex string",
      );
    return $t.toWords(t);
  }
  function Pr(e, t) {
    let r = e.filter((i) => i.tagName === t);
    return r.length > 0 ? r[0].data : null;
  }
  function Bt(e, t) {
    return Pr(e, t) !== null;
  }
  function Pu(e, t) {
    let r = {};
    if (
      (Object.keys(e)
        .sort()
        .forEach((n) => {
          r[n] = e[n];
        }),
      t === !0)
    ) {
      let n = "__tagsObject_cache";
      Object.defineProperty(r, "tagsObject", {
        get() {
          return (
            this[n] || Object.defineProperty(this, n, { value: AT(this.tags) }),
            this[n]
          );
        },
      });
    }
    return r;
  }
  function Iu(e) {
    if (!e.toString().match(/^\d+$/))
      throw new Error("satoshis must be an integer");
    let t = new ge(e, 10);
    return Tf(t.mul(new ge(1e3, 10)));
  }
  function Tf(e) {
    if (!e.toString().match(/^\d+$/))
      throw new Error("millisatoshis must be an integer");
    let t = new ge(e, 10),
      r = t.toString(10),
      n = r.length,
      i,
      s;
    return (
      n > 11 && /0{11}$/.test(r)
        ? ((i = ""), (s = t.div(Eu).toString(10)))
        : n > 8 && /0{8}$/.test(r)
          ? ((i = "m"), (s = t.div(oT).toString(10)))
          : n > 5 && /0{5}$/.test(r)
            ? ((i = "u"), (s = t.div(fT).toString(10)))
            : n > 2 && /0{2}$/.test(r)
              ? ((i = "n"), (s = t.div(aT).toString(10)))
              : ((i = "p"), (s = t.mul(cT).toString(10))),
      s + i
    );
  }
  function y4(e, t) {
    let r = Mu(e, !1);
    if (!r.mod(new ge(1e3, 10)).eq(new ge(0, 10)))
      throw new Error("Amount is outside of valid range");
    let n = r.div(new ge(1e3, 10));
    return t ? n.toString() : n;
  }
  function Mu(e, t) {
    let r, n;
    if (e.slice(-1).match(/^[munp]$/))
      ((r = e.slice(-1)), (n = e.slice(0, -1)));
    else {
      if (e.slice(-1).match(/^[^munp0-9]$/))
        throw new Error("Not a valid multiplier for the amount");
      n = e;
    }
    if (!n.match(/^\d+$/)) throw new Error("Not a valid human readable amount");
    let i = new ge(n, 10),
      s = r ? i.mul(Eu).div(iT[r]) : i.mul(Eu);
    if ((r === "p" && !i.mod(new ge(10, 10)).eq(new ge(0, 10))) || s.gt(sT))
      throw new Error("Amount is outside of valid range");
    return t ? s.toString() : s;
  }
  function ST(e, t) {
    let r = b4(e),
      n = Mr(t);
    if (r.complete && r.paymentRequest) return r;
    if (n === void 0 || n.length !== 32 || !zi.privateKeyVerify(n))
      throw new Error(
        "privateKey must be a 32 byte Buffer and valid private key",
      );
    let i, s;
    if (
      (Bt(r.tags, ee[19]) && (s = Mr(Pr(r.tags, ee[19]))),
      r.payeeNodeKey && (i = Mr(r.payeeNodeKey)),
      i && s && !s.equals(i))
    )
      throw new Error(
        "payee node key tag and payeeNodeKey attribute must match",
      );
    i = s || i;
    let o = te.from(zi.publicKeyCreate(n));
    if (i && !o.equals(i))
      throw new Error(
        "The private key given is not the private key of the node public key given",
      );
    let f = $t.decode(r.wordsTemp, Number.MAX_SAFE_INTEGER).words,
      u = te.concat([te.from(r.prefix, "utf8"), zr(f)]),
      l = Pf(u),
      p = zi.ecdsaSign(l, n);
    p.signature = te.from(p.signature);
    let h = Qn(p.signature.toString("hex") + "0" + p.recid);
    return (
      (r.payeeNodeKey = o.toString("hex")),
      (r.signature = p.signature.toString("hex")),
      (r.recoveryFlag = p.recid),
      (r.wordsTemp = $t.encode("temp", f.concat(h), Number.MAX_SAFE_INTEGER)),
      (r.complete = !0),
      (r.paymentRequest = $t.encode(
        r.prefix,
        f.concat(h),
        Number.MAX_SAFE_INTEGER,
      )),
      Pu(r)
    );
  }
  function xT(e, t) {
    let r = b4(e);
    t === void 0 && (t = !0);
    let n = !(r.signature === void 0 || r.recoveryFlag === void 0),
      i;
    if (r.network === void 0 && !n) ((r.network = Ef), (i = Ef));
    else {
      if (r.network === void 0 && n)
        throw new Error(
          "Need network for proper payment request reconstruction",
        );
      if (
        !r.network.bech32 ||
        r.network.pubKeyHash === void 0 ||
        r.network.scriptHash === void 0 ||
        !Array.isArray(r.network.validWitnessVersions)
      )
        throw new Error("Invalid network");
      i = r.network;
    }
    if (r.timestamp === void 0 && !n)
      r.timestamp = Math.floor(new Date().getTime() / 1e3);
    else if (r.timestamp === void 0 && n)
      throw new Error(
        "Need timestamp for proper payment request reconstruction",
      );
    if (r.tags === void 0) throw new Error("Payment Requests need tags array");
    if (!Bt(r.tags, ee[1]))
      throw new Error("Lightning Payment Request needs a payment hash");
    if (Bt(r.tags, ee[16]))
      if (Bt(r.tags, ee[5])) {
        let P = Pr(r.tags, ee[5]);
        if (
          !P.payment_secret ||
          (!P.payment_secret.supported && !P.payment_secret.required)
        )
          throw new Error(
            "Payment request requires feature bits with at least payment secret support flagged if payment secret is included",
          );
      } else if (t) r.tags.push({ tagName: ee[5], data: nT });
      else
        throw new Error(
          "Payment request requires feature bits with at least payment secret support flagged if payment secret is included",
        );
    if (!Bt(r.tags, ee[13]) && !Bt(r.tags, ee[23]))
      if (t) r.tags.push({ tagName: ee[13], data: rT });
      else
        throw new Error(
          "Payment request requires description or purpose commit hash",
        );
    if (Bt(r.tags, ee[13]) && te.from(Pr(r.tags, ee[13]), "utf8").length > 639)
      throw new Error("Description is too long: Max length 639 bytes");
    (!Bt(r.tags, ee[6]) && !n && t && r.tags.push({ tagName: ee[6], data: eT }),
      !Bt(r.tags, ee[24]) &&
        !n &&
        t &&
        r.tags.push({ tagName: ee[24], data: tT }));
    let s, o;
    if (
      (Bt(r.tags, ee[19]) && (o = Mr(Pr(r.tags, ee[19]))),
      r.payeeNodeKey && (s = Mr(r.payeeNodeKey)),
      s && o && !o.equals(s))
    )
      throw new Error("payeeNodeKey and tag payee node key do not match");
    ((s = s || o), s && (r.payeeNodeKey = s.toString("hex")));
    let f, u, l;
    if (Bt(r.tags, ee[9])) {
      let P = Pr(r.tags, ee[9]);
      if (
        ((l = P.address),
        (u = P.addressHash),
        (f = P.code),
        u === void 0 || f === void 0)
      ) {
        let M, B;
        try {
          ((M = ks.fromBech32(l)), (u = M.data), (f = M.version));
        } catch {
          try {
            ((B = ks.fromBase58Check(l)),
              B.version === i.pubKeyHash
                ? (f = 17)
                : B.version === i.scriptHash && (f = 18),
              (u = B.hash));
          } catch {
            throw new Error("Fallback address type is unknown");
          }
        }
        if (M && !(M.version in i.validWitnessVersions))
          throw new Error("Fallback address witness version is unknown");
        if (M && M.prefix !== i.bech32)
          throw new Error(
            "Fallback address network type does not match payment request network type",
          );
        if (B && B.version !== i.pubKeyHash && B.version !== i.scriptHash)
          throw new Error(
            "Fallback address version (base58) is unknown or the network type is incorrect",
          );
        ((P.addressHash = u.toString("hex")), (P.code = f));
      }
    }
    Bt(r.tags, ee[3]) &&
      Pr(r.tags, ee[3]).forEach((M) => {
        if (
          M.pubkey === void 0 ||
          M.short_channel_id === void 0 ||
          M.fee_base_msat === void 0 ||
          M.fee_proportional_millionths === void 0 ||
          M.cltv_expiry_delta === void 0
        )
          throw new Error("Routing info is incomplete");
        if (!zi.publicKeyVerify(Mr(M.pubkey)))
          throw new Error("Routing info pubkey is not a valid pubkey");
        let B = Mr(M.short_channel_id);
        if (!(B instanceof te) || B.length !== 8)
          throw new Error("Routing info short channel id must be 8 bytes");
        if (
          typeof M.fee_base_msat != "number" ||
          Math.floor(M.fee_base_msat) !== M.fee_base_msat
        )
          throw new Error("Routing info fee base msat is not an integer");
        if (
          typeof M.fee_proportional_millionths != "number" ||
          Math.floor(M.fee_proportional_millionths) !==
            M.fee_proportional_millionths
        )
          throw new Error(
            "Routing info fee proportional millionths is not an integer",
          );
        if (
          typeof M.cltv_expiry_delta != "number" ||
          Math.floor(M.cltv_expiry_delta) !== M.cltv_expiry_delta
        )
          throw new Error("Routing info cltv expiry delta is not an integer");
      });
    let p = "ln";
    p += i.bech32;
    let h;
    if (r.millisatoshis && r.satoshis) {
      if (
        ((h = Tf(new ge(r.millisatoshis, 10))),
        Iu(new ge(r.satoshis, 10)) !== h)
      )
        throw new Error("satoshis and millisatoshis do not match");
    } else
      r.millisatoshis
        ? (h = Tf(new ge(r.millisatoshis, 10)))
        : r.satoshis
          ? (h = Iu(new ge(r.satoshis, 10)))
          : (h = "");
    p += h;
    let w = Zn(r.timestamp);
    for (; w.length < 7; ) w.unshift(0);
    let E = r.tags,
      A = [];
    E.forEach((P) => {
      let M = Object.keys(p4);
      if ((n && M.push(Af), M.indexOf(P.tagName) === -1))
        throw new Error("Unknown tag key: " + P.tagName);
      let B;
      if (P.tagName !== Af) {
        A.push(Au[P.tagName]);
        let F = p4[P.tagName];
        B = F(P.data);
      } else {
        let F = dT(P.data);
        (A.push(F.tagCode), (B = F.words));
      }
      ((A = A.concat([0].concat(Zn(B.length)).slice(-2))), (A = A.concat(B)));
    });
    let T = w.concat(A),
      O = te.concat([te.from(p, "utf8"), te.from(Tu(T, 5, 8))]),
      k = Pf(O),
      H;
    if (n)
      if (s) {
        let P = te.from(
          zi.ecdsaRecover(te.from(r.signature, "hex"), r.recoveryFlag, k, !0),
        );
        if (s && !s.equals(P))
          throw new Error(
            "Signature, message, and recoveryID did not produce the same pubkey as payeeNodeKey",
          );
        H = Qn(r.signature + "0" + r.recoveryFlag);
      } else
        throw new Error(
          "Reconstruction with signature and recoveryID requires payeeNodeKey to verify correctness of input data.",
        );
    return (
      H && (T = T.concat(H)),
      Bt(r.tags, ee[6]) &&
        ((r.timeExpireDate = r.timestamp + Pr(r.tags, ee[6])),
        (r.timeExpireDateString = new Date(
          r.timeExpireDate * 1e3,
        ).toISOString())),
      (r.timestampString = new Date(r.timestamp * 1e3).toISOString()),
      (r.complete = !!H),
      (r.paymentRequest = r.complete
        ? $t.encode(p, T, Number.MAX_SAFE_INTEGER)
        : ""),
      (r.prefix = p),
      (r.wordsTemp = $t.encode("temp", T, Number.MAX_SAFE_INTEGER)),
      Pu(r)
    );
  }
  function ET(e, t) {
    if (typeof e != "string")
      throw new Error("Lightning Payment Request must be string");
    if (e.slice(0, 2).toLowerCase() !== "ln")
      throw new Error("Not a proper lightning payment request");
    let r = $t.decode(e, Number.MAX_SAFE_INTEGER);
    e = e.toLowerCase();
    let n = r.prefix,
      i = r.words,
      s = i.slice(-104),
      o = i.slice(0, -104);
    i = i.slice(0, -104);
    let f = zr(s, !0),
      u = f.slice(-1)[0];
    if (((f = f.slice(0, -1)), !(u in [0, 1, 2, 3]) || f.length !== 64))
      throw new Error("Signature is missing or incorrect");
    let l = n.match(/^ln(\S+?)(\d*)([a-zA-Z]?)$/);
    if ((l && !l[2] && (l = n.match(/^ln(\S+)$/)), !l))
      throw new Error("Not a proper lightning payment request");
    let p = l[1],
      h;
    if (t) {
      if (
        t.bech32 === void 0 ||
        t.pubKeyHash === void 0 ||
        t.scriptHash === void 0 ||
        !Array.isArray(t.validWitnessVersions)
      )
        throw new Error("Invalid network");
      h = t;
    } else
      switch (p) {
        case Ef.bech32:
          h = Ef;
          break;
        case d4.bech32:
          h = d4;
          break;
        case h4.bech32:
          h = h4;
          break;
        case l4.bech32:
          h = l4;
          break;
      }
    if (!h || h.bech32 !== p) throw new Error("Unknown coin bech32 prefix");
    let w = l[2],
      E,
      A,
      T;
    if (w) {
      let b = l[3];
      try {
        E = parseInt(y4(w + b, !0));
      } catch {
        ((E = null), (T = !0));
      }
      A = Mu(w + b, !0);
    } else ((E = null), (A = null));
    let O = If(i.slice(0, 7)),
      k = new Date(O * 1e3).toISOString();
    i = i.slice(7);
    let H = [],
      P,
      M,
      B,
      F;
    for (; i.length > 0; ) {
      let b = i[0].toString();
      ((P = ee[b] || Af),
        (M = uT[b] || hT(b)),
        (i = i.slice(1)),
        (B = If(i.slice(0, 2))),
        (i = i.slice(2)),
        (F = i.slice(0, B)),
        (i = i.slice(B)),
        H.push({ tagName: P, data: M(F, h) }));
    }
    let z, K;
    Bt(H, ee[6]) &&
      ((z = O + Pr(H, ee[6])), (K = new Date(z * 1e3).toISOString()));
    let Z = te.concat([te.from(n, "utf8"), te.from(Tu(o, 5, 8))]),
      S = Pf(Z),
      a = te.from(zi.ecdsaRecover(f, u, S, !0));
    if (Bt(H, ee[19]) && Pr(H, ee[19]) !== a.toString("hex"))
      throw new Error(
        "Lightning Payment Request signature pubkey does not match payee pubkey",
      );
    let d = {
      paymentRequest: e,
      complete: !0,
      prefix: n,
      wordsTemp: $t.encode("temp", o.concat(s), Number.MAX_SAFE_INTEGER),
      network: h,
      satoshis: E,
      millisatoshis: A,
      timestamp: O,
      timestampString: k,
      payeeNodeKey: a.toString("hex"),
      signature: f.toString("hex"),
      recoveryFlag: u,
      tags: H,
    };
    return (
      T && delete d.satoshis,
      z &&
        (d = Object.assign(d, { timeExpireDate: z, timeExpireDateString: K })),
      Pu(d, !0)
    );
  }
  function AT(e) {
    let t = {};
    return (
      e.forEach((r) => {
        r.tagName === Af
          ? (t.unknownTags || (t.unknownTags = []), t.unknownTags.push(r.data))
          : (t[r.tagName] = r.data);
      }),
      t
    );
  }
  v4.exports = {
    encode: xT,
    decode: ET,
    sign: ST,
    satToHrp: Iu,
    millisatToHrp: Tf,
    hrpToSat: y4,
    hrpToMillisat: Mu,
  };
});
var TT = {};
A4(TT, { default: () => IT });
module.exports = T4(TT);
var m4 = I4(g4(), 1),
  IT = m4.decode;
/*! Bundled license information:

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
