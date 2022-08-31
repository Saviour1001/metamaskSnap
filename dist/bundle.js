(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;

    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }

    g.snap = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }

          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }

        return n[i].exports;
      }

      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);

      return o;
    }

    return r;
  }()({
    1: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.onRpcRequest = void 0;

      var _rpc = require("./rpc");

      const onRpcRequest = ({
        origin,
        request
      }) => {
        switch (request.method) {
          case "getPublicExtendedKey":
            return (0, _rpc.getExtendedPublicKey)(wallet);

          default:
            throw new Error("Method not found.");
        }
      };

      exports.onRpcRequest = onRpcRequest;
    }, {
      "./rpc": 3
    }],
    2: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getExtendedPublicKey = getExtendedPublicKey;

      async function getExtendedPublicKey(wallet) {
        const result = await wallet.request({
          method: "snap_confirm",
          params: [{
            prompt: "Access your extended public key?",
            description: "Do you want to allow this app to access your extended public key?"
          }]
        });

        if (result) {
          return "Hello";
        } else {
          throw new Error("User reject to access the key");
        }
      }
    }, {}],
    3: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "getExtendedPublicKey", {
        enumerable: true,
        get: function () {
          return _getExtendedPublicKey.getExtendedPublicKey;
        }
      });

      var _getExtendedPublicKey = require("./getExtendedPublicKey");
    }, {
      "./getExtendedPublicKey": 2
    }]
  }, {}, [1])(1);
});