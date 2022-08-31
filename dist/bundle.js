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

      var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };

      var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };

      var _BIP44CoinTypeNode_node;

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getBIP44AddressKeyDeriver = exports.deriveBIP44AddressKey = exports.BIP44CoinTypeNode = exports.BIP_44_COIN_TYPE_DEPTH = void 0;

      const constants_1 = require("./constants");

      const BIP44Node_1 = require("./BIP44Node");

      const utils_1 = require("./utils");

      const SLIP10Node_1 = require("./SLIP10Node");

      exports.BIP_44_COIN_TYPE_DEPTH = 2;

      class BIP44CoinTypeNode {
        constructor(node, coin_type) {
          _BIP44CoinTypeNode_node.set(this, void 0);

          __classPrivateFieldSet(this, _BIP44CoinTypeNode_node, node, "f");

          this.coin_type = coin_type;
          this.path = utils_1.getBIP44CoinTypePathString(coin_type);
          Object.freeze(this);
        }

        static async fromJSON(json, coin_type) {
          validateCoinType(coin_type);
          validateCoinTypeNodeDepth(json.depth);
          const node = await BIP44Node_1.BIP44Node.fromExtendedKey({
            depth: json.depth,
            index: json.index,
            parentFingerprint: json.parentFingerprint,
            chainCode: utils_1.hexStringToBuffer(json.chainCode),
            privateKey: utils_1.nullableHexStringToBuffer(json.privateKey),
            publicKey: utils_1.hexStringToBuffer(json.publicKey)
          });
          return new BIP44CoinTypeNode(node, coin_type);
        }

        static async fromDerivationPath(derivationPath) {
          validateCoinTypeNodeDepth(derivationPath.length - 1);
          const node = await BIP44Node_1.BIP44Node.fromDerivationPath({
            derivationPath
          });
          const coinType = Number.parseInt(derivationPath[exports.BIP_44_COIN_TYPE_DEPTH].split(':')[1].replace(`'`, ''), 10);
          return new BIP44CoinTypeNode(node, coinType);
        }

        static async fromNode(node, coin_type) {
          if (!(node instanceof BIP44Node_1.BIP44Node)) {
            throw new Error('Invalid node: Expected an instance of BIP44Node.');
          }

          validateCoinType(coin_type);
          validateCoinTypeNodeDepth(node.depth);
          return new BIP44CoinTypeNode(node, coin_type);
        }

        get depth() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").depth;
        }

        get privateKeyBuffer() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").privateKeyBuffer;
        }

        get publicKeyBuffer() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").publicKeyBuffer;
        }

        get chainCodeBuffer() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").chainCodeBuffer;
        }

        get privateKey() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").privateKey;
        }

        get publicKey() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").publicKey;
        }

        get compressedPublicKeyBuffer() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").compressedPublicKeyBuffer;
        }

        get chainCode() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").chainCode;
        }

        get address() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").address;
        }

        get parentFingerprint() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").parentFingerprint;
        }

        get fingerprint() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").fingerprint;
        }

        get index() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").index;
        }

        get curve() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").curve;
        }

        get extendedKey() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").extendedKey;
        }

        async deriveBIP44AddressKey({
          account = 0,
          change = 0,
          address_index
        }) {
          return await __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").derive(utils_1.getBIP44CoinTypeToAddressPathTuple({
            account,
            change,
            address_index
          }));
        }

        toJSON() {
          return Object.assign(Object.assign({}, __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").toJSON()), {
            coin_type: this.coin_type,
            path: this.path
          });
        }

      }

      exports.BIP44CoinTypeNode = BIP44CoinTypeNode;
      _BIP44CoinTypeNode_node = new WeakMap();

      function validateCoinTypeNodeDepth(depth) {
        if (depth !== exports.BIP_44_COIN_TYPE_DEPTH) {
          throw new Error(`Invalid depth: Coin type nodes must be of depth ${exports.BIP_44_COIN_TYPE_DEPTH}. Received: "${depth}"`);
        }
      }

      function validateCoinType(coin_type) {
        if (typeof coin_type !== 'number' || !Number.isInteger(coin_type) || coin_type < 0) {
          throw new Error('Invalid coin type: The specified coin type must be a non-negative integer number.');
        }
      }

      async function deriveBIP44AddressKey(parentKeyOrNode, {
        account = 0,
        change = 0,
        address_index
      }) {
        const path = utils_1.getBIP44CoinTypeToAddressPathTuple({
          account,
          change,
          address_index
        });
        const node = await getNode(parentKeyOrNode);
        const childNode = await SLIP10Node_1.deriveChildNode({
          path,
          node
        });
        return new BIP44Node_1.BIP44Node(childNode);
      }

      exports.deriveBIP44AddressKey = deriveBIP44AddressKey;

      async function getBIP44AddressKeyDeriver(node, accountAndChangeIndices) {
        const {
          account = 0,
          change = 0
        } = accountAndChangeIndices || {};
        const actualNode = await getNode(node);
        const accountNode = utils_1.getHardenedBIP32NodeToken(account);
        const changeNode = utils_1.getBIP32NodeToken(change);

        const bip44AddressKeyDeriver = async (address_index, isHardened = false) => {
          const slip10Node = await SLIP10Node_1.deriveChildNode({
            path: [accountNode, changeNode, isHardened ? utils_1.getHardenedBIP32NodeToken(address_index) : utils_1.getUnhardenedBIP32NodeToken(address_index)],
            node: actualNode
          });
          return new BIP44Node_1.BIP44Node(slip10Node);
        };

        bip44AddressKeyDeriver.coin_type = actualNode.coin_type;
        bip44AddressKeyDeriver.path = utils_1.getBIP44ChangePathString(actualNode.path, {
          account,
          change
        });
        Object.freeze(bip44AddressKeyDeriver);
        return bip44AddressKeyDeriver;
      }

      exports.getBIP44AddressKeyDeriver = getBIP44AddressKeyDeriver;

      async function getNode(node) {
        if (node instanceof BIP44CoinTypeNode) {
          validateCoinTypeNodeDepth(node.depth);
          return node;
        }

        if (typeof node === 'string') {
          const bip44Node = await BIP44Node_1.BIP44Node.fromExtendedKey(node);
          const coinTypeNode = await BIP44CoinTypeNode.fromNode(bip44Node, bip44Node.index - constants_1.BIP_32_HARDENED_OFFSET);
          validateCoinTypeNodeDepth(coinTypeNode.depth);
          return coinTypeNode;
        }

        return BIP44CoinTypeNode.fromJSON(node, node.coin_type);
      }
    }, {
      "./BIP44Node": 2,
      "./SLIP10Node": 3,
      "./constants": 4,
      "./utils": 15
    }],
    2: [function (require, module, exports) {
      "use strict";

      var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };

      var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };

      var _BIP44Node_node;

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.validateBIP44Depth = exports.BIP44Node = void 0;

      const constants_1 = require("./constants");

      const utils_1 = require("./utils");

      const SLIP10Node_1 = require("./SLIP10Node");

      const extended_keys_1 = require("./extended-keys");

      class BIP44Node {
        constructor(node) {
          _BIP44Node_node.set(this, void 0);

          __classPrivateFieldSet(this, _BIP44Node_node, node, "f");

          Object.freeze(this);
        }

        static async fromJSON(json) {
          return BIP44Node.fromExtendedKey(json);
        }

        static async fromExtendedKey(options) {
          if (typeof options === 'string') {
            const extendedKey = extended_keys_1.decodeExtendedKey(options);
            const {
              chainCode,
              depth,
              parentFingerprint,
              index
            } = extendedKey;

            if (extendedKey.version === extended_keys_1.PRIVATE_KEY_VERSION) {
              const {
                privateKey
              } = extendedKey;
              return BIP44Node.fromExtendedKey({
                depth,
                parentFingerprint,
                index,
                privateKey,
                chainCode
              });
            }

            const {
              publicKey
            } = extendedKey;
            return BIP44Node.fromExtendedKey({
              depth,
              parentFingerprint,
              index,
              publicKey,
              chainCode
            });
          }

          const {
            privateKey,
            publicKey,
            chainCode,
            depth,
            parentFingerprint,
            index
          } = options;
          validateBIP44Depth(depth);
          const node = await SLIP10Node_1.SLIP10Node.fromExtendedKey({
            privateKey,
            publicKey,
            chainCode,
            depth,
            parentFingerprint,
            index,
            curve: 'secp256k1'
          });
          return new BIP44Node(node);
        }

        static async fromDerivationPath({
          derivationPath
        }) {
          validateBIP44Depth(derivationPath.length - 1);
          validateBIP44DerivationPath(derivationPath, constants_1.MIN_BIP_44_DEPTH);
          const node = await SLIP10Node_1.SLIP10Node.fromDerivationPath({
            derivationPath,
            curve: 'secp256k1'
          });
          return new BIP44Node(node);
        }

        get depth() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").depth;
        }

        get privateKeyBuffer() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").privateKeyBuffer;
        }

        get publicKeyBuffer() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").publicKeyBuffer;
        }

        get chainCodeBuffer() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").chainCodeBuffer;
        }

        get privateKey() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").privateKey;
        }

        get publicKey() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").publicKey;
        }

        get compressedPublicKeyBuffer() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").compressedPublicKeyBuffer;
        }

        get chainCode() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").chainCode;
        }

        get address() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").address;
        }

        get parentFingerprint() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").parentFingerprint;
        }

        get fingerprint() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").fingerprint;
        }

        get index() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").index;
        }

        get extendedKey() {
          const data = {
            depth: this.depth,
            parentFingerprint: this.parentFingerprint,
            index: this.index,
            chainCode: this.chainCodeBuffer
          };

          if (this.privateKeyBuffer) {
            return extended_keys_1.encodeExtendedKey(Object.assign(Object.assign({}, data), {
              version: extended_keys_1.PRIVATE_KEY_VERSION,
              privateKey: this.privateKeyBuffer
            }));
          }

          return extended_keys_1.encodeExtendedKey(Object.assign(Object.assign({}, data), {
            version: extended_keys_1.PUBLIC_KEY_VERSION,
            publicKey: this.publicKeyBuffer
          }));
        }

        get curve() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").curve;
        }

        neuter() {
          const node = __classPrivateFieldGet(this, _BIP44Node_node, "f").neuter();

          return new BIP44Node(node);
        }

        async derive(path) {
          if (this.depth === constants_1.MAX_BIP_44_DEPTH) {
            throw new Error('Illegal operation: This HD tree node is already a leaf node.');
          }

          const newDepth = this.depth + path.length;
          validateBIP44Depth(newDepth);
          validateBIP44DerivationPath(path, this.depth + 1);
          const node = await __classPrivateFieldGet(this, _BIP44Node_node, "f").derive(path);
          return new BIP44Node(node);
        }

        toJSON() {
          return {
            depth: this.depth,
            parentFingerprint: this.parentFingerprint,
            index: this.index,
            privateKey: this.privateKey,
            publicKey: this.publicKey,
            chainCode: this.chainCode
          };
        }

      }

      exports.BIP44Node = BIP44Node;
      _BIP44Node_node = new WeakMap();

      function validateBIP44Depth(depth) {
        SLIP10Node_1.validateBIP32Depth(depth);

        if (depth < constants_1.MIN_BIP_44_DEPTH || depth > constants_1.MAX_BIP_44_DEPTH) {
          throw new Error(`Invalid HD tree path depth: The depth must be a positive integer N such that 0 <= N <= 5. Received: "${depth}"`);
        }
      }

      exports.validateBIP44Depth = validateBIP44Depth;

      function validateBIP44DerivationPath(path, startingDepth) {
        path.forEach((nodeToken, index) => {
          const currentDepth = startingDepth + index;

          switch (currentDepth) {
            case constants_1.MIN_BIP_44_DEPTH:
              if (!constants_1.BIP_39_PATH_REGEX.test(nodeToken)) {
                throw new Error('Invalid derivation path: The "m" / seed node (depth 0) must be a BIP-39 node.');
              }

              break;

            case 1:
              if (nodeToken !== constants_1.BIP44PurposeNodeToken) {
                throw new Error(`Invalid derivation path: The "purpose" node (depth 1) must be the string "${constants_1.BIP44PurposeNodeToken}".`);
              }

              break;

            case 2:
              if (!constants_1.BIP_32_PATH_REGEX.test(nodeToken) || !utils_1.isHardened(nodeToken)) {
                throw new Error('Invalid derivation path: The "coin_type" node (depth 2) must be a hardened BIP-32 node.');
              }

              break;

            case 3:
              if (!constants_1.BIP_32_PATH_REGEX.test(nodeToken) || !utils_1.isHardened(nodeToken)) {
                throw new Error('Invalid derivation path: The "account" node (depth 3) must be a hardened BIP-32 node.');
              }

              break;

            case 4:
              if (!constants_1.BIP_32_PATH_REGEX.test(nodeToken)) {
                throw new Error('Invalid derivation path: The "change" node (depth 4) must be a BIP-32 node.');
              }

              break;

            case constants_1.MAX_BIP_44_DEPTH:
              if (!constants_1.BIP_32_PATH_REGEX.test(nodeToken)) {
                throw new Error('Invalid derivation path: The "address_index" node (depth 5) must be a BIP-32 node.');
              }

              break;

            default:
              throw new Error(`Invalid derivation path: The path exceeds the maximum BIP-44 depth.`);
          }
        });
      }
    }, {
      "./SLIP10Node": 3,
      "./constants": 4,
      "./extended-keys": 13,
      "./utils": 15
    }],
    3: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.deriveChildNode = exports.validateParentFingerprint = exports.validateBIP32Depth = exports.SLIP10Node = void 0;

      const constants_1 = require("./constants");

      const curves_1 = require("./curves");

      const derivation_1 = require("./derivation");

      const bip32_1 = require("./derivers/bip32");

      const utils_1 = require("./utils");

      class SLIP10Node {
        constructor({
          depth,
          parentFingerprint,
          index,
          chainCode,
          privateKey,
          publicKey,
          curve
        }) {
          this.depth = depth;
          this.parentFingerprint = parentFingerprint;
          this.index = index;
          this.chainCodeBuffer = chainCode;
          this.privateKeyBuffer = privateKey;
          this.publicKeyBuffer = publicKey;
          this.curve = curve;
          Object.freeze(this);
        }

        static async fromJSON(json) {
          return SLIP10Node.fromExtendedKey(json);
        }

        static async fromExtendedKey({
          depth,
          parentFingerprint,
          index,
          privateKey,
          publicKey,
          chainCode,
          curve
        }) {
          const chainCodeBuffer = utils_1.getBuffer(chainCode, constants_1.BUFFER_KEY_LENGTH);
          validateCurve(curve);
          validateBIP32Depth(depth);
          utils_1.validateBIP32Index(index);
          validateParentFingerprint(parentFingerprint);

          if (privateKey) {
            const privateKeyBuffer = utils_1.getBuffer(privateKey, constants_1.BUFFER_KEY_LENGTH);
            return new SLIP10Node({
              depth,
              parentFingerprint,
              index,
              chainCode: chainCodeBuffer,
              privateKey: privateKeyBuffer,
              publicKey: await curves_1.getCurveByName(curve).getPublicKey(privateKey),
              curve
            });
          }

          if (publicKey) {
            const publicKeyBuffer = utils_1.getBuffer(publicKey, curves_1.getCurveByName(curve).publicKeyLength);
            return new SLIP10Node({
              depth,
              parentFingerprint,
              index,
              chainCode: chainCodeBuffer,
              publicKey: publicKeyBuffer,
              curve
            });
          }

          throw new Error('Invalid options: Must provide either a private key or a public key.');
        }

        static async fromDerivationPath({
          derivationPath,
          curve
        }) {
          validateCurve(curve);

          if (!derivationPath) {
            throw new Error('Invalid options: Must provide a derivation path.');
          }

          if (derivationPath.length === 0) {
            throw new Error('Invalid derivation path: May not specify an empty derivation path.');
          }

          return await derivation_1.deriveKeyFromPath({
            path: derivationPath,
            depth: derivationPath.length - 1,
            curve
          });
        }

        get chainCode() {
          return this.chainCodeBuffer.toString('hex');
        }

        get privateKey() {
          var _a;

          return (_a = this.privateKeyBuffer) === null || _a === void 0 ? void 0 : _a.toString('hex');
        }

        get publicKey() {
          return this.publicKeyBuffer.toString('hex');
        }

        get compressedPublicKeyBuffer() {
          return curves_1.getCurveByName(this.curve).compressPublicKey(this.publicKeyBuffer);
        }

        get address() {
          if (this.curve !== 'secp256k1') {
            throw new Error('Unable to get address for this node: Only secp256k1 is supported.');
          }

          return `0x${bip32_1.publicKeyToEthAddress(this.publicKeyBuffer).toString('hex')}`;
        }

        get fingerprint() {
          return utils_1.getFingerprint(this.compressedPublicKeyBuffer);
        }

        neuter() {
          return new SLIP10Node({
            depth: this.depth,
            parentFingerprint: this.parentFingerprint,
            index: this.index,
            chainCode: this.chainCodeBuffer,
            publicKey: this.publicKeyBuffer,
            curve: this.curve
          });
        }

        async derive(path) {
          return await deriveChildNode({
            path,
            node: this
          });
        }

        toJSON() {
          return {
            depth: this.depth,
            parentFingerprint: this.parentFingerprint,
            index: this.index,
            curve: this.curve,
            privateKey: this.privateKey,
            publicKey: this.publicKey,
            chainCode: this.chainCode
          };
        }

      }

      exports.SLIP10Node = SLIP10Node;

      function validateCurve(curveName) {
        if (!curveName || typeof curveName !== 'string') {
          throw new Error('Invalid curve: Must specify a curve.');
        }

        if (!Object.keys(curves_1.curves).includes(curveName)) {
          throw new Error(`Invalid curve: Only the following curves are supported: ${Object.keys(curves_1.curves).join(', ')}.`);
        }
      }

      function validateBIP32Depth(depth) {
        if (!utils_1.isValidInteger(depth)) {
          throw new Error(`Invalid HD tree path depth: The depth must be a positive integer. Received: "${depth}".`);
        }
      }

      exports.validateBIP32Depth = validateBIP32Depth;

      function validateParentFingerprint(parentFingerprint) {
        if (!utils_1.isValidInteger(parentFingerprint)) {
          throw new Error(`Invalid parent fingerprint: The fingerprint must be a positive integer. Received: "${parentFingerprint}".`);
        }
      }

      exports.validateParentFingerprint = validateParentFingerprint;

      async function deriveChildNode({
        path,
        node
      }) {
        if (path.length === 0) {
          throw new Error('Invalid HD tree derivation path: Deriving a path of length 0 is not defined.');
        }

        const newDepth = node.depth + path.length;
        validateBIP32Depth(newDepth);
        return await derivation_1.deriveKeyFromPath({
          path,
          node,
          depth: newDepth
        });
      }

      exports.deriveChildNode = deriveChildNode;
    }, {
      "./constants": 4,
      "./curves": 7,
      "./derivation": 9,
      "./derivers/bip32": 10,
      "./utils": 15
    }],
    4: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BIP_32_HARDENED_OFFSET = exports.BIP_39_PATH_REGEX = exports.BIP_32_PATH_REGEX = exports.BIP44PurposeNodeToken = exports.MAX_BIP_44_DEPTH = exports.MIN_BIP_44_DEPTH = exports.HEXADECIMAL_KEY_LENGTH = exports.BUFFER_KEY_LENGTH = exports.BUFFER_EXTENDED_KEY_LENGTH = void 0;
      exports.BUFFER_EXTENDED_KEY_LENGTH = 64;
      exports.BUFFER_KEY_LENGTH = 32;
      exports.HEXADECIMAL_KEY_LENGTH = 64;
      exports.MIN_BIP_44_DEPTH = 0;
      exports.MAX_BIP_44_DEPTH = 5;
      exports.BIP44PurposeNodeToken = `bip32:44'`;
      exports.BIP_32_PATH_REGEX = /^bip32:\d+'?$/u;
      exports.BIP_39_PATH_REGEX = /^bip39:([a-z]+){1}( [a-z]+){11,23}$/u;
      exports.BIP_32_HARDENED_OFFSET = 0x80000000;
    }, {}],
    5: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });

      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });

      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

        __setModuleDefault(result, mod);

        return result;
      };

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.mod = exports.getCurveByName = exports.curves = void 0;

      const secp256k1_1 = require("@noble/secp256k1");

      const secp256k1 = __importStar(require("./secp256k1"));

      const ed25519 = __importStar(require("./ed25519"));

      exports.curves = {
        secp256k1,
        ed25519
      };

      function getCurveByName(curveName) {
        return exports.curves[curveName];
      }

      exports.getCurveByName = getCurveByName;
      exports.mod = secp256k1_1.utils.mod;
    }, {
      "./ed25519": 6,
      "./secp256k1": 8,
      "@noble/secp256k1": 28
    }],
    6: [function (require, module, exports) {
      (function () {
        (function () {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.decompressPublicKey = exports.compressPublicKey = exports.publicAdd = exports.getPublicKey = exports.publicKeyLength = exports.deriveUnhardenedKeys = exports.isValidPrivateKey = exports.secret = exports.name = exports.curve = void 0;

          const ed25519_1 = require("@noble/ed25519");

          var ed25519_2 = require("@noble/ed25519");

          Object.defineProperty(exports, "curve", {
            enumerable: true,
            get: function () {
              return ed25519_2.CURVE;
            }
          });
          exports.name = 'ed25519';
          exports.secret = Buffer.from('ed25519 seed', 'utf8');

          const isValidPrivateKey = _privateKey => true;

          exports.isValidPrivateKey = isValidPrivateKey;
          exports.deriveUnhardenedKeys = false;
          exports.publicKeyLength = 33;

          const getPublicKey = async (privateKey, _compressed) => {
            const publicKey = await ed25519_1.getPublicKey(privateKey);
            return Buffer.concat([Buffer.alloc(1, 0), publicKey]);
          };

          exports.getPublicKey = getPublicKey;

          const publicAdd = (_publicKey, _tweak) => {
            throw new Error('Ed25519 does not support public key derivation.');
          };

          exports.publicAdd = publicAdd;

          const compressPublicKey = publicKey => {
            return publicKey;
          };

          exports.compressPublicKey = compressPublicKey;

          const decompressPublicKey = publicKey => {
            return publicKey;
          };

          exports.decompressPublicKey = decompressPublicKey;
        }).call(this);
      }).call(this, require("buffer").Buffer);
    }, {
      "@noble/ed25519": 16,
      "buffer": 33
    }],
    7: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });

      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });

      var __exportStar = this && this.__exportStar || function (m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
      };

      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

        __setModuleDefault(result, mod);

        return result;
      };

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ed25519 = exports.secp256k1 = void 0;

      __exportStar(require("./curve"), exports);

      exports.secp256k1 = __importStar(require("./secp256k1"));
      exports.ed25519 = __importStar(require("./ed25519"));
    }, {
      "./curve": 5,
      "./ed25519": 6,
      "./secp256k1": 8
    }],
    8: [function (require, module, exports) {
      (function () {
        (function () {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.decompressPublicKey = exports.compressPublicKey = exports.publicAdd = exports.getPublicKey = exports.publicKeyLength = exports.deriveUnhardenedKeys = exports.secret = exports.name = exports.isValidPrivateKey = exports.curve = void 0;

          const secp256k1_1 = require("@noble/secp256k1");

          var secp256k1_2 = require("@noble/secp256k1");

          Object.defineProperty(exports, "curve", {
            enumerable: true,
            get: function () {
              return secp256k1_2.CURVE;
            }
          });
          exports.isValidPrivateKey = secp256k1_1.utils.isValidPrivateKey;
          exports.name = 'secp256k1';
          exports.secret = Buffer.from('Bitcoin seed', 'utf8');
          exports.deriveUnhardenedKeys = true;
          exports.publicKeyLength = 65;

          const getPublicKey = (privateKey, compressed) => Buffer.from(secp256k1_1.getPublicKey(privateKey, compressed));

          exports.getPublicKey = getPublicKey;

          const publicAdd = (publicKey, tweak) => {
            const point = secp256k1_1.Point.fromHex(publicKey);
            const newPoint = point.add(secp256k1_1.Point.fromPrivateKey(tweak));
            newPoint.assertValidity();
            return Buffer.from(newPoint.toRawBytes(false));
          };

          exports.publicAdd = publicAdd;

          const compressPublicKey = publicKey => {
            const point = secp256k1_1.Point.fromHex(publicKey);
            return Buffer.from(point.toRawBytes(true));
          };

          exports.compressPublicKey = compressPublicKey;

          const decompressPublicKey = publicKey => {
            const point = secp256k1_1.Point.fromHex(publicKey);
            return Buffer.from(point.toRawBytes(false));
          };

          exports.decompressPublicKey = decompressPublicKey;
        }).call(this);
      }).call(this, require("buffer").Buffer);
    }, {
      "@noble/secp256k1": 28,
      "buffer": 33
    }],
    9: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.validatePathSegment = exports.deriveKeyFromPath = void 0;

      const constants_1 = require("./constants");

      const derivers_1 = require("./derivers");

      const SLIP10Node_1 = require("./SLIP10Node");

      const BIP44Node_1 = require("./BIP44Node");

      const BIP44CoinTypeNode_1 = require("./BIP44CoinTypeNode");

      const curves_1 = require("./curves");

      async function deriveKeyFromPath(args) {
        const {
          path,
          depth = path.length
        } = args;
        const node = 'node' in args ? args.node : undefined;
        const curve = 'curve' in args ? args.curve : node === null || node === void 0 ? void 0 : node.curve;

        if (node && !(node instanceof SLIP10Node_1.SLIP10Node) && !(node instanceof BIP44Node_1.BIP44Node) && !(node instanceof BIP44CoinTypeNode_1.BIP44CoinTypeNode)) {
          throw new Error('Invalid arguments: Node must be a SLIP-10 node or a BIP-44 node when provided.');
        }

        if (!curve) {
          throw new Error('Invalid arguments: Must specify either a parent node or curve.');
        }

        validatePathSegment(path, Boolean(node === null || node === void 0 ? void 0 : node.privateKey) || Boolean(node === null || node === void 0 ? void 0 : node.publicKey), depth);
        return await path.reduce(async (promise, pathNode) => {
          const derivedNode = await promise;
          const [pathType, pathPart] = pathNode.split(':');

          if (!hasDeriver(pathType)) {
            throw new Error(`Unknown derivation type: "${pathType}"`);
          }

          const deriver = derivers_1.derivers[pathType];
          return await deriver.deriveChildKey({
            path: pathPart,
            node: derivedNode,
            curve: curves_1.getCurveByName(curve)
          });
        }, Promise.resolve(node));
      }

      exports.deriveKeyFromPath = deriveKeyFromPath;

      function hasDeriver(pathType) {
        return pathType in derivers_1.derivers;
      }

      function validatePathSegment(path, hasKey, depth) {
        if (path.length === 0) {
          throw new Error(`Invalid HD path segment: The segment must not be empty.`);
        }

        if (path.length - 1 > constants_1.MAX_BIP_44_DEPTH) {
          throw new Error(`Invalid HD path segment: The segment cannot exceed a 0-indexed depth of 5.`);
        }

        let startsWithBip39 = false;
        path.forEach((node, index) => {
          if (index === 0) {
            startsWithBip39 = constants_1.BIP_39_PATH_REGEX.test(node);

            if (!startsWithBip39 && !constants_1.BIP_32_PATH_REGEX.test(node)) {
              throw getMalformedError();
            }
          } else if (!constants_1.BIP_32_PATH_REGEX.test(node)) {
            throw getMalformedError();
          }
        });

        if (depth === constants_1.MIN_BIP_44_DEPTH && (!startsWithBip39 || path.length !== 1)) {
          throw new Error(`Invalid HD path segment: The segment must consist of a single BIP-39 node for depths of ${constants_1.MIN_BIP_44_DEPTH}. Received: "${path}".`);
        }

        if (!hasKey && !startsWithBip39) {
          throw new Error('Invalid derivation parameters: Must specify parent key if the first node of the path segment is not a BIP-39 node.');
        }

        if (hasKey && startsWithBip39) {
          throw new Error('Invalid derivation parameters: May not specify parent key if the path segment starts with a BIP-39 node.');
        }
      }

      exports.validatePathSegment = validatePathSegment;

      function getMalformedError() {
        throw new Error('Invalid HD path segment: The path segment is malformed.');
      }
    }, {
      "./BIP44CoinTypeNode": 1,
      "./BIP44Node": 2,
      "./SLIP10Node": 3,
      "./constants": 4,
      "./curves": 7,
      "./derivers": 12
    }],
    10: [function (require, module, exports) {
      (function () {
        (function () {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.privateAdd = exports.deriveChildKey = exports.publicKeyToEthAddress = exports.privateKeyToEthAddress = void 0;

          const sha3_1 = require("@noble/hashes/sha3");

          const hmac_1 = require("@noble/hashes/hmac");

          const sha512_1 = require("@noble/hashes/sha512");

          const constants_1 = require("../constants");

          const utils_1 = require("../utils");

          const curves_1 = require("../curves");

          const SLIP10Node_1 = require("../SLIP10Node");

          function privateKeyToEthAddress(key) {
            if (!Buffer.isBuffer(key) || !utils_1.isValidBufferKey(key, constants_1.BUFFER_KEY_LENGTH)) {
              throw new Error('Invalid key: The key must be a 32-byte, non-zero Buffer.');
            }

            const publicKey = curves_1.secp256k1.getPublicKey(key, false);
            return publicKeyToEthAddress(publicKey);
          }

          exports.privateKeyToEthAddress = privateKeyToEthAddress;

          function publicKeyToEthAddress(key) {
            if (!Buffer.isBuffer(key) || !utils_1.isValidBufferKey(key, curves_1.secp256k1.publicKeyLength)) {
              throw new Error('Invalid key: The key must be a 65-byte, non-zero Buffer.');
            }

            return Buffer.from(sha3_1.keccak_256(key.slice(1)).slice(-20));
          }

          exports.publicKeyToEthAddress = publicKeyToEthAddress;

          async function deriveChildKey({
            path,
            node,
            curve = curves_1.secp256k1
          }) {
            const isHardened = path.includes(`'`);

            if (!isHardened && !curve.deriveUnhardenedKeys) {
              throw new Error(`Invalid path: Cannot derive unhardened child keys with ${curve.name}.`);
            }

            if (!node) {
              throw new Error('Invalid parameters: Must specify a node to derive from.');
            }

            if (isHardened && !node.privateKey) {
              throw new Error('Invalid parameters: Cannot derive hardened child keys without a private key.');
            }

            const indexPart = path.split(`'`)[0];
            const childIndex = parseInt(indexPart, 10);

            if (!/^\d+$/u.test(indexPart) || !Number.isInteger(childIndex) || childIndex < 0 || childIndex >= constants_1.BIP_32_HARDENED_OFFSET) {
              throw new Error(`Invalid BIP-32 index: The index must be a non-negative decimal integer less than ${constants_1.BIP_32_HARDENED_OFFSET}.`);
            }

            if (node.privateKeyBuffer) {
              const secretExtension = await deriveSecretExtension({
                privateKey: node.privateKeyBuffer,
                childIndex,
                isHardened,
                curve
              });
              const {
                privateKey,
                chainCode
              } = await generateKey({
                privateKey: node.privateKeyBuffer,
                chainCode: node.chainCodeBuffer,
                secretExtension,
                curve
              });
              return SLIP10Node_1.SLIP10Node.fromExtendedKey({
                privateKey,
                chainCode,
                depth: node.depth + 1,
                parentFingerprint: node.fingerprint,
                index: childIndex + (isHardened ? constants_1.BIP_32_HARDENED_OFFSET : 0),
                curve: curve.name
              });
            }

            const publicExtension = await derivePublicExtension({
              parentPublicKey: node.compressedPublicKeyBuffer,
              childIndex,
              curve
            });
            const {
              publicKey,
              chainCode
            } = generatePublicKey({
              publicKey: node.compressedPublicKeyBuffer,
              chainCode: node.chainCodeBuffer,
              publicExtension,
              curve
            });
            return SLIP10Node_1.SLIP10Node.fromExtendedKey({
              publicKey,
              chainCode,
              depth: node.depth + 1,
              parentFingerprint: node.fingerprint,
              index: childIndex,
              curve: curve.name
            });
          }

          exports.deriveChildKey = deriveChildKey;

          async function deriveSecretExtension({
            privateKey,
            childIndex,
            isHardened,
            curve
          }) {
            if (isHardened) {
              const indexBuffer = Buffer.allocUnsafe(4);
              indexBuffer.writeUInt32BE(childIndex + constants_1.BIP_32_HARDENED_OFFSET, 0);
              const pk = privateKey;
              const zb = Buffer.alloc(1, 0);
              return Buffer.concat([zb, pk, indexBuffer]);
            }

            const indexBuffer = Buffer.allocUnsafe(4);
            indexBuffer.writeUInt32BE(childIndex, 0);
            const parentPublicKey = await curve.getPublicKey(privateKey, true);
            return Buffer.concat([parentPublicKey, indexBuffer]);
          }

          async function derivePublicExtension({
            parentPublicKey,
            childIndex
          }) {
            const indexBuffer = Buffer.alloc(4);
            indexBuffer.writeUInt32BE(childIndex, 0);
            return Buffer.concat([parentPublicKey, indexBuffer]);
          }

          function privateAdd(privateKeyBuffer, tweakBuffer, curve) {
            const privateKey = utils_1.bytesToNumber(privateKeyBuffer);
            const tweak = utils_1.bytesToNumber(tweakBuffer);

            if (tweak >= curve.curve.n) {
              throw new Error('Invalid tweak: Tweak is larger than the curve order.');
            }

            const added = curves_1.mod(privateKey + tweak, curve.curve.n);

            if (!curve.isValidPrivateKey(added)) {
              throw new Error('Invalid private key or tweak: The resulting private key is invalid.');
            }

            return utils_1.hexStringToBuffer(added.toString(16).padStart(64, '0'));
          }

          exports.privateAdd = privateAdd;

          async function generateKey({
            privateKey,
            chainCode,
            secretExtension,
            curve
          }) {
            const entropy = hmac_1.hmac(sha512_1.sha512, chainCode, secretExtension);
            const keyMaterial = Buffer.from(entropy.slice(0, 32));
            const childChainCode = Buffer.from(entropy.slice(32));

            if (curve.name === 'ed25519') {
              const publicKey = await curve.getPublicKey(keyMaterial);
              return {
                privateKey: keyMaterial,
                publicKey,
                chainCode: childChainCode
              };
            }

            const childPrivateKey = privateAdd(privateKey, keyMaterial, curve);
            const publicKey = await curve.getPublicKey(childPrivateKey);
            return {
              privateKey: childPrivateKey,
              publicKey,
              chainCode: childChainCode
            };
          }

          function generatePublicKey({
            publicKey,
            chainCode,
            publicExtension,
            curve
          }) {
            const entropy = hmac_1.hmac(sha512_1.sha512, chainCode, publicExtension);
            const keyMaterial = entropy.slice(0, 32);
            const childChainCode = entropy.slice(32);
            const childPublicKey = curve.publicAdd(publicKey, Buffer.from(keyMaterial));
            return {
              publicKey: Buffer.from(childPublicKey),
              chainCode: Buffer.from(childChainCode)
            };
          }
        }).call(this);
      }).call(this, require("buffer").Buffer);
    }, {
      "../SLIP10Node": 3,
      "../constants": 4,
      "../curves": 7,
      "../utils": 15,
      "@noble/hashes/hmac": 21,
      "@noble/hashes/sha3": 25,
      "@noble/hashes/sha512": 26,
      "buffer": 33
    }],
    11: [function (require, module, exports) {
      (function () {
        (function () {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.createBip39KeyFromSeed = exports.deriveChildKey = exports.bip39MnemonicToMultipath = void 0;

          const bip39_1 = require("@scure/bip39");

          const hmac_1 = require("@noble/hashes/hmac");

          const sha512_1 = require("@noble/hashes/sha512");

          const curves_1 = require("../curves");

          const SLIP10Node_1 = require("../SLIP10Node");

          function bip39MnemonicToMultipath(mnemonic) {
            return `bip39:${mnemonic.toLowerCase().trim()}`;
          }

          exports.bip39MnemonicToMultipath = bip39MnemonicToMultipath;

          async function deriveChildKey({
            path,
            curve
          }) {
            return createBip39KeyFromSeed(Buffer.from(bip39_1.mnemonicToSeedSync(path)), curve);
          }

          exports.deriveChildKey = deriveChildKey;

          async function createBip39KeyFromSeed(seed, curve = curves_1.secp256k1) {
            const key = Buffer.from(hmac_1.hmac(sha512_1.sha512, curve.secret, seed));
            const privateKey = key.slice(0, 32);
            const chainCode = key.slice(32);
            return SLIP10Node_1.SLIP10Node.fromExtendedKey({
              privateKey,
              chainCode,
              depth: 0,
              parentFingerprint: 0,
              index: 0,
              curve: curve.name
            });
          }

          exports.createBip39KeyFromSeed = createBip39KeyFromSeed;
        }).call(this);
      }).call(this, require("buffer").Buffer);
    }, {
      "../SLIP10Node": 3,
      "../curves": 7,
      "@noble/hashes/hmac": 21,
      "@noble/hashes/sha512": 26,
      "@scure/bip39": 30,
      "buffer": 33
    }],
    12: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });

      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });

      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

        __setModuleDefault(result, mod);

        return result;
      };

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.derivers = void 0;

      const bip32 = __importStar(require("./bip32"));

      const bip39 = __importStar(require("./bip39"));

      exports.derivers = {
        bip32,
        bip39
      };
    }, {
      "./bip32": 10,
      "./bip39": 11
    }],
    13: [function (require, module, exports) {
      (function () {
        (function () {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.encodeExtendedKey = exports.decodeExtendedKey = exports.PRIVATE_KEY_VERSION = exports.PUBLIC_KEY_VERSION = void 0;

          const utils_1 = require("./utils");

          const BIP44Node_1 = require("./BIP44Node");

          const secp256k1_1 = require("./curves/secp256k1");

          exports.PUBLIC_KEY_VERSION = 0x0488b21e;
          exports.PRIVATE_KEY_VERSION = 0x0488ade4;

          const decodeExtendedKey = extendedKey => {
            const buffer = utils_1.decodeBase58check(extendedKey);

            if (buffer.length !== 78) {
              throw new Error(`Invalid extended key: Expected a length of 78, got ${buffer.length}.`);
            }

            const version = buffer.readUInt32BE(0);
            const depth = buffer.readUInt8(4);
            BIP44Node_1.validateBIP44Depth(depth);
            const parentFingerprint = buffer.readUInt32BE(5);
            const index = buffer.readUInt32BE(9);
            const chainCode = buffer.slice(13, 45);

            if (!utils_1.isValidBufferKey(chainCode, 32)) {
              throw new Error(`Invalid extended key: Chain code must be a 32-byte non-zero Buffer.`);
            }

            const key = buffer.slice(45, 78);

            if (!utils_1.isValidBufferKey(key, 33)) {
              throw new Error(`Invalid extended key: Key must be a 33-byte non-zero Buffer.`);
            }

            if (version === exports.PUBLIC_KEY_VERSION) {
              if (key.readUInt8(0) !== 0x02 && key.readUInt8(0) !== 0x03) {
                throw new Error(`Invalid extended key: Public key must start with 0x02 or 0x03.`);
              }

              return {
                version,
                depth,
                parentFingerprint,
                index,
                chainCode,
                publicKey: secp256k1_1.decompressPublicKey(key)
              };
            }

            if (version === exports.PRIVATE_KEY_VERSION) {
              if (key.readUInt8(0) !== 0x00) {
                throw new Error(`Invalid extended key: Private key must start with 0x00.`);
              }

              return {
                version,
                depth,
                parentFingerprint,
                index,
                chainCode,
                privateKey: key.slice(1)
              };
            }

            throw new Error(`Invalid extended key: Expected a public (xpub) or private key (xprv) version.`);
          };

          exports.decodeExtendedKey = decodeExtendedKey;

          const encodeExtendedKey = extendedKey => {
            const {
              version,
              depth,
              parentFingerprint,
              index,
              chainCode
            } = extendedKey;
            const buffer = Buffer.alloc(78);
            buffer.writeUInt32BE(version, 0);
            buffer.writeUInt8(depth, 4);
            buffer.writeUInt32BE(parentFingerprint, 5);
            buffer.writeUInt32BE(index, 9);
            chainCode.copy(buffer, 13);

            if (extendedKey.version === exports.PUBLIC_KEY_VERSION) {
              const {
                publicKey
              } = extendedKey;
              const compressedPublicKey = secp256k1_1.compressPublicKey(publicKey);
              compressedPublicKey.copy(buffer, 45);
            }

            if (extendedKey.version === exports.PRIVATE_KEY_VERSION) {
              const {
                privateKey
              } = extendedKey;
              privateKey.copy(buffer, 46);
            }

            return utils_1.encodeBase58check(buffer);
          };

          exports.encodeExtendedKey = encodeExtendedKey;
        }).call(this);
      }).call(this, require("buffer").Buffer);
    }, {
      "./BIP44Node": 2,
      "./curves/secp256k1": 8,
      "./utils": 15,
      "buffer": 33
    }],
    14: [function (require, module, exports) {
      (function () {
        (function () {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.PackageBuffer = exports.BIP44PurposeNodeToken = exports.MAX_BIP_44_DEPTH = exports.MIN_BIP_44_DEPTH = exports.getBIP44AddressKeyDeriver = exports.deriveBIP44AddressKey = exports.BIP_44_COIN_TYPE_DEPTH = exports.BIP44CoinTypeNode = exports.ed25519 = exports.secp256k1 = exports.SLIP10Node = exports.BIP44Node = void 0;

          var BIP44Node_1 = require("./BIP44Node");

          Object.defineProperty(exports, "BIP44Node", {
            enumerable: true,
            get: function () {
              return BIP44Node_1.BIP44Node;
            }
          });

          var SLIP10Node_1 = require("./SLIP10Node");

          Object.defineProperty(exports, "SLIP10Node", {
            enumerable: true,
            get: function () {
              return SLIP10Node_1.SLIP10Node;
            }
          });

          var curves_1 = require("./curves");

          Object.defineProperty(exports, "secp256k1", {
            enumerable: true,
            get: function () {
              return curves_1.secp256k1;
            }
          });
          Object.defineProperty(exports, "ed25519", {
            enumerable: true,
            get: function () {
              return curves_1.ed25519;
            }
          });

          var BIP44CoinTypeNode_1 = require("./BIP44CoinTypeNode");

          Object.defineProperty(exports, "BIP44CoinTypeNode", {
            enumerable: true,
            get: function () {
              return BIP44CoinTypeNode_1.BIP44CoinTypeNode;
            }
          });
          Object.defineProperty(exports, "BIP_44_COIN_TYPE_DEPTH", {
            enumerable: true,
            get: function () {
              return BIP44CoinTypeNode_1.BIP_44_COIN_TYPE_DEPTH;
            }
          });
          Object.defineProperty(exports, "deriveBIP44AddressKey", {
            enumerable: true,
            get: function () {
              return BIP44CoinTypeNode_1.deriveBIP44AddressKey;
            }
          });
          Object.defineProperty(exports, "getBIP44AddressKeyDeriver", {
            enumerable: true,
            get: function () {
              return BIP44CoinTypeNode_1.getBIP44AddressKeyDeriver;
            }
          });

          var constants_1 = require("./constants");

          Object.defineProperty(exports, "MIN_BIP_44_DEPTH", {
            enumerable: true,
            get: function () {
              return constants_1.MIN_BIP_44_DEPTH;
            }
          });
          Object.defineProperty(exports, "MAX_BIP_44_DEPTH", {
            enumerable: true,
            get: function () {
              return constants_1.MAX_BIP_44_DEPTH;
            }
          });
          Object.defineProperty(exports, "BIP44PurposeNodeToken", {
            enumerable: true,
            get: function () {
              return constants_1.BIP44PurposeNodeToken;
            }
          });
          exports.PackageBuffer = Buffer;
        }).call(this);
      }).call(this, require("buffer").Buffer);
    }, {
      "./BIP44CoinTypeNode": 1,
      "./BIP44Node": 2,
      "./SLIP10Node": 3,
      "./constants": 4,
      "./curves": 7,
      "buffer": 33
    }],
    15: [function (require, module, exports) {
      (function () {
        (function () {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.getFingerprint = exports.encodeBase58check = exports.decodeBase58check = exports.getBuffer = exports.bytesToNumber = exports.isValidInteger = exports.isValidBufferKey = exports.nullableHexStringToBuffer = exports.hexStringToBuffer = exports.isValidHexString = exports.stripHexPrefix = exports.isHardened = exports.isValidBIP32Index = exports.validateBIP32Index = exports.getBIP32NodeToken = exports.getUnhardenedBIP32NodeToken = exports.getHardenedBIP32NodeToken = exports.getBIP44CoinTypeToAddressPathTuple = exports.getBIP44ChangePathString = exports.getBIP44CoinTypePathString = void 0;

          const utils_1 = require("@noble/hashes/utils");

          const base_1 = require("@scure/base");

          const sha256_1 = require("@noble/hashes/sha256");

          const ripemd160_1 = require("@noble/hashes/ripemd160");

          const constants_1 = require("./constants");

          function getBIP44CoinTypePathString(coin_type) {
            return `m / ${constants_1.BIP44PurposeNodeToken} / ${getUnhardenedBIP32NodeToken(coin_type)}'`;
          }

          exports.getBIP44CoinTypePathString = getBIP44CoinTypePathString;

          function getBIP44ChangePathString(coinTypePath, indices) {
            return `${coinTypePath} / ${getHardenedBIP32NodeToken(indices.account || 0)} / ${getBIP32NodeToken(indices.change || 0)}`;
          }

          exports.getBIP44ChangePathString = getBIP44ChangePathString;

          function getBIP44CoinTypeToAddressPathTuple({
            account = 0,
            change = 0,
            address_index
          }) {
            return [getHardenedBIP32NodeToken(account), getBIP32NodeToken(change), getBIP32NodeToken(address_index)];
          }

          exports.getBIP44CoinTypeToAddressPathTuple = getBIP44CoinTypeToAddressPathTuple;

          function getHardenedBIP32NodeToken(index) {
            validateBIP32Index(index);
            return `${getUnhardenedBIP32NodeToken(index)}'`;
          }

          exports.getHardenedBIP32NodeToken = getHardenedBIP32NodeToken;

          function getUnhardenedBIP32NodeToken(index) {
            validateBIP32Index(index);
            return `bip32:${index}`;
          }

          exports.getUnhardenedBIP32NodeToken = getUnhardenedBIP32NodeToken;

          function getBIP32NodeToken(index) {
            if (typeof index === 'number') {
              return getUnhardenedBIP32NodeToken(index);
            }

            if (!index || !Number.isInteger(index.index) || typeof index.hardened !== 'boolean') {
              throw new Error('Invalid BIP-32 index: Must be an object containing the index and whether it is hardened.');
            }

            if (index.hardened) {
              return getHardenedBIP32NodeToken(index.index);
            }

            return getUnhardenedBIP32NodeToken(index.index);
          }

          exports.getBIP32NodeToken = getBIP32NodeToken;

          function validateBIP32Index(addressIndex) {
            if (!isValidBIP32Index(addressIndex)) {
              throw new Error(`Invalid BIP-32 index: Must be a non-negative integer.`);
            }
          }

          exports.validateBIP32Index = validateBIP32Index;

          function isValidBIP32Index(index) {
            return isValidInteger(index);
          }

          exports.isValidBIP32Index = isValidBIP32Index;

          function isHardened(bip32Token) {
            return bip32Token.endsWith(`'`);
          }

          exports.isHardened = isHardened;

          function stripHexPrefix(hexString) {
            return hexString.replace(/^0x/iu, '');
          }

          exports.stripHexPrefix = stripHexPrefix;

          function isValidHexString(hexString) {
            return /^(?:0x)?[a-f0-9]+$/iu.test(hexString);
          }

          exports.isValidHexString = isValidHexString;

          function hexStringToBuffer(hexString) {
            if (Buffer.isBuffer(hexString)) {
              return hexString;
            }

            if (typeof hexString !== 'string' || !isValidHexString(hexString)) {
              throw new Error(`Invalid hex string: "${hexString}".`);
            }

            return Buffer.from(stripHexPrefix(hexString), 'hex');
          }

          exports.hexStringToBuffer = hexStringToBuffer;

          function nullableHexStringToBuffer(hexString) {
            if (hexString) {
              return hexStringToBuffer(hexString);
            }

            return undefined;
          }

          exports.nullableHexStringToBuffer = nullableHexStringToBuffer;

          function isValidBufferKey(buffer, expectedLength) {
            if (buffer.length !== expectedLength) {
              return false;
            }

            for (const byte of buffer) {
              if (byte !== 0) {
                return true;
              }
            }

            return false;
          }

          exports.isValidBufferKey = isValidBufferKey;

          function isValidInteger(value) {
            return typeof value === 'number' && Number.isInteger(value) && value >= 0;
          }

          exports.isValidInteger = isValidInteger;

          function bytesToNumber(bytes) {
            return BigInt(`0x${utils_1.bytesToHex(bytes)}`);
          }

          exports.bytesToNumber = bytesToNumber;

          function getBuffer(value, length) {
            if (value instanceof Buffer) {
              validateBuffer(value, length);
              return value;
            }

            if (typeof value === 'string') {
              if (!isValidHexString(value)) {
                throw new Error(`Invalid value: Must be a valid hex string of length: ${length * 2}.`);
              }

              const buffer = hexStringToBuffer(value);
              validateBuffer(buffer, length);
              return buffer;
            }

            throw new Error(`Invalid value: Expected a Buffer or hexadecimal string.`);
          }

          exports.getBuffer = getBuffer;

          function validateBuffer(buffer, length) {
            if (!isValidBufferKey(buffer, length)) {
              throw new Error(`Invalid value: Must be a non-zero ${length}-byte buffer.`);
            }
          }

          const decodeBase58check = value => {
            const base58Check = base_1.base58check(sha256_1.sha256);

            try {
              return Buffer.from(base58Check.decode(value));
            } catch (_a) {
              throw new Error(`Invalid value: Value is not base58-encoded, or the checksum is invalid.`);
            }
          };

          exports.decodeBase58check = decodeBase58check;

          const encodeBase58check = value => {
            const base58Check = base_1.base58check(sha256_1.sha256);
            return base58Check.encode(value);
          };

          exports.encodeBase58check = encodeBase58check;

          const getFingerprint = publicKey => {
            if (!isValidBufferKey(publicKey, 33)) {
              throw new Error(`Invalid public key: The key must be a 33-byte, non-zero Buffer.`);
            }

            return Buffer.from(ripemd160_1.ripemd160(publicKey)).readUInt32BE(0);
          };

          exports.getFingerprint = getFingerprint;
        }).call(this);
      }).call(this, require("buffer").Buffer);
    }, {
      "./constants": 4,
      "@noble/hashes/ripemd160": 23,
      "@noble/hashes/sha256": 24,
      "@noble/hashes/utils": 27,
      "@scure/base": 29,
      "buffer": 33
    }],
    16: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.utils = exports.curve25519 = exports.getSharedSecret = exports.sync = exports.verify = exports.sign = exports.getPublicKey = exports.Signature = exports.Point = exports.RistrettoPoint = exports.ExtendedPoint = exports.CURVE = void 0;

      const nodeCrypto = require("crypto");

      const _0n = BigInt(0);

      const _1n = BigInt(1);

      const _2n = BigInt(2);

      const _255n = BigInt(255);

      const CURVE_ORDER = _2n ** BigInt(252) + BigInt('27742317777372353535851937790883648493');
      const CURVE = Object.freeze({
        a: BigInt(-1),
        d: BigInt('37095705934669439343138083508754565189542113879843219016388785533085940283555'),
        P: _2n ** _255n - BigInt(19),
        l: CURVE_ORDER,
        n: CURVE_ORDER,
        h: BigInt(8),
        Gx: BigInt('15112221349535400772501151409588531511454012693041857206046113283949847762202'),
        Gy: BigInt('46316835694926478169428394003475163141307993866256225615783033603165251855960')
      });
      exports.CURVE = CURVE;

      const MAX_256B = _2n ** BigInt(256);

      const SQRT_M1 = BigInt('19681161376707505956807079304988542015446066515923890162744021073123829784752');
      const SQRT_D = BigInt('6853475219497561581579357271197624642482790079785650197046958215289687604742');
      const SQRT_AD_MINUS_ONE = BigInt('25063068953384623474111414158702152701244531502492656460079210482610430750235');
      const INVSQRT_A_MINUS_D = BigInt('54469307008909316920995813868745141605393597292927456921205312896311721017578');
      const ONE_MINUS_D_SQ = BigInt('1159843021668779879193775521855586647937357759715417654439879720876111806838');
      const D_MINUS_ONE_SQ = BigInt('40440834346308536858101042469323190826248399146238708352240133220865137265952');

      class ExtendedPoint {
        constructor(x, y, z, t) {
          this.x = x;
          this.y = y;
          this.z = z;
          this.t = t;
        }

        static fromAffine(p) {
          if (!(p instanceof Point)) {
            throw new TypeError('ExtendedPoint#fromAffine: expected Point');
          }

          if (p.equals(Point.ZERO)) return ExtendedPoint.ZERO;
          return new ExtendedPoint(p.x, p.y, _1n, mod(p.x * p.y));
        }

        static toAffineBatch(points) {
          const toInv = invertBatch(points.map(p => p.z));
          return points.map((p, i) => p.toAffine(toInv[i]));
        }

        static normalizeZ(points) {
          return this.toAffineBatch(points).map(this.fromAffine);
        }

        equals(other) {
          assertExtPoint(other);
          const {
            x: X1,
            y: Y1,
            z: Z1
          } = this;
          const {
            x: X2,
            y: Y2,
            z: Z2
          } = other;
          const X1Z2 = mod(X1 * Z2);
          const X2Z1 = mod(X2 * Z1);
          const Y1Z2 = mod(Y1 * Z2);
          const Y2Z1 = mod(Y2 * Z1);
          return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
        }

        negate() {
          return new ExtendedPoint(mod(-this.x), this.y, this.z, mod(-this.t));
        }

        double() {
          const {
            x: X1,
            y: Y1,
            z: Z1
          } = this;
          const {
            a
          } = CURVE;
          const A = mod(X1 ** _2n);
          const B = mod(Y1 ** _2n);
          const C = mod(_2n * mod(Z1 ** _2n));
          const D = mod(a * A);
          const E = mod(mod((X1 + Y1) ** _2n) - A - B);
          const G = D + B;
          const F = G - C;
          const H = D - B;
          const X3 = mod(E * F);
          const Y3 = mod(G * H);
          const T3 = mod(E * H);
          const Z3 = mod(F * G);
          return new ExtendedPoint(X3, Y3, Z3, T3);
        }

        add(other) {
          assertExtPoint(other);
          const {
            x: X1,
            y: Y1,
            z: Z1,
            t: T1
          } = this;
          const {
            x: X2,
            y: Y2,
            z: Z2,
            t: T2
          } = other;
          const A = mod((Y1 - X1) * (Y2 + X2));
          const B = mod((Y1 + X1) * (Y2 - X2));
          const F = mod(B - A);
          if (F === _0n) return this.double();
          const C = mod(Z1 * _2n * T2);
          const D = mod(T1 * _2n * Z2);
          const E = D + C;
          const G = B + A;
          const H = D - C;
          const X3 = mod(E * F);
          const Y3 = mod(G * H);
          const T3 = mod(E * H);
          const Z3 = mod(F * G);
          return new ExtendedPoint(X3, Y3, Z3, T3);
        }

        subtract(other) {
          return this.add(other.negate());
        }

        precomputeWindow(W) {
          const windows = 1 + 256 / W;
          const points = [];
          let p = this;
          let base = p;

          for (let window = 0; window < windows; window++) {
            base = p;
            points.push(base);

            for (let i = 1; i < 2 ** (W - 1); i++) {
              base = base.add(p);
              points.push(base);
            }

            p = base.double();
          }

          return points;
        }

        wNAF(n, affinePoint) {
          if (!affinePoint && this.equals(ExtendedPoint.BASE)) affinePoint = Point.BASE;
          const W = affinePoint && affinePoint._WINDOW_SIZE || 1;

          if (256 % W) {
            throw new Error('Point#wNAF: Invalid precomputation window, must be power of 2');
          }

          let precomputes = affinePoint && pointPrecomputes.get(affinePoint);

          if (!precomputes) {
            precomputes = this.precomputeWindow(W);

            if (affinePoint && W !== 1) {
              precomputes = ExtendedPoint.normalizeZ(precomputes);
              pointPrecomputes.set(affinePoint, precomputes);
            }
          }

          let p = ExtendedPoint.ZERO;
          let f = ExtendedPoint.ZERO;
          const windows = 1 + 256 / W;
          const windowSize = 2 ** (W - 1);
          const mask = BigInt(2 ** W - 1);
          const maxNumber = 2 ** W;
          const shiftBy = BigInt(W);

          for (let window = 0; window < windows; window++) {
            const offset = window * windowSize;
            let wbits = Number(n & mask);
            n >>= shiftBy;

            if (wbits > windowSize) {
              wbits -= maxNumber;
              n += _1n;
            }

            if (wbits === 0) {
              let pr = precomputes[offset];
              if (window % 2) pr = pr.negate();
              f = f.add(pr);
            } else {
              let cached = precomputes[offset + Math.abs(wbits) - 1];
              if (wbits < 0) cached = cached.negate();
              p = p.add(cached);
            }
          }

          return ExtendedPoint.normalizeZ([p, f])[0];
        }

        multiply(scalar, affinePoint) {
          return this.wNAF(normalizeScalar(scalar, CURVE.l), affinePoint);
        }

        multiplyUnsafe(scalar) {
          let n = normalizeScalar(scalar, CURVE.l, false);
          const G = ExtendedPoint.BASE;
          const P0 = ExtendedPoint.ZERO;
          if (n === _0n) return P0;
          if (this.equals(P0) || n === _1n) return this;
          if (this.equals(G)) return this.wNAF(n);
          let p = P0;
          let d = this;

          while (n > _0n) {
            if (n & _1n) p = p.add(d);
            d = d.double();
            n >>= _1n;
          }

          return p;
        }

        isSmallOrder() {
          return this.multiplyUnsafe(CURVE.h).equals(ExtendedPoint.ZERO);
        }

        isTorsionFree() {
          return this.multiplyUnsafe(CURVE.l).equals(ExtendedPoint.ZERO);
        }

        toAffine(invZ = invert(this.z)) {
          const {
            x,
            y,
            z
          } = this;
          const ax = mod(x * invZ);
          const ay = mod(y * invZ);
          const zz = mod(z * invZ);
          if (zz !== _1n) throw new Error('invZ was invalid');
          return new Point(ax, ay);
        }

        fromRistrettoBytes() {
          legacyRist();
        }

        toRistrettoBytes() {
          legacyRist();
        }

        fromRistrettoHash() {
          legacyRist();
        }

      }

      exports.ExtendedPoint = ExtendedPoint;
      ExtendedPoint.BASE = new ExtendedPoint(CURVE.Gx, CURVE.Gy, _1n, mod(CURVE.Gx * CURVE.Gy));
      ExtendedPoint.ZERO = new ExtendedPoint(_0n, _1n, _1n, _0n);

      function assertExtPoint(other) {
        if (!(other instanceof ExtendedPoint)) throw new TypeError('ExtendedPoint expected');
      }

      function assertRstPoint(other) {
        if (!(other instanceof RistrettoPoint)) throw new TypeError('RistrettoPoint expected');
      }

      function legacyRist() {
        throw new Error('Legacy method: switch to RistrettoPoint');
      }

      class RistrettoPoint {
        constructor(ep) {
          this.ep = ep;
        }

        static calcElligatorRistrettoMap(r0) {
          const {
            d
          } = CURVE;
          const r = mod(SQRT_M1 * r0 * r0);
          const Ns = mod((r + _1n) * ONE_MINUS_D_SQ);
          let c = BigInt(-1);
          const D = mod((c - d * r) * mod(r + d));
          let {
            isValid: Ns_D_is_sq,
            value: s
          } = uvRatio(Ns, D);
          let s_ = mod(s * r0);
          if (!edIsNegative(s_)) s_ = mod(-s_);
          if (!Ns_D_is_sq) s = s_;
          if (!Ns_D_is_sq) c = r;
          const Nt = mod(c * (r - _1n) * D_MINUS_ONE_SQ - D);
          const s2 = s * s;
          const W0 = mod((s + s) * D);
          const W1 = mod(Nt * SQRT_AD_MINUS_ONE);
          const W2 = mod(_1n - s2);
          const W3 = mod(_1n + s2);
          return new ExtendedPoint(mod(W0 * W3), mod(W2 * W1), mod(W1 * W3), mod(W0 * W2));
        }

        static hashToCurve(hex) {
          hex = ensureBytes(hex, 64);
          const r1 = bytes255ToNumberLE(hex.slice(0, 32));
          const R1 = this.calcElligatorRistrettoMap(r1);
          const r2 = bytes255ToNumberLE(hex.slice(32, 64));
          const R2 = this.calcElligatorRistrettoMap(r2);
          return new RistrettoPoint(R1.add(R2));
        }

        static fromHex(hex) {
          hex = ensureBytes(hex, 32);
          const {
            a,
            d
          } = CURVE;
          const emsg = 'RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint';
          const s = bytes255ToNumberLE(hex);
          if (!equalBytes(numberTo32BytesLE(s), hex) || edIsNegative(s)) throw new Error(emsg);
          const s2 = mod(s * s);
          const u1 = mod(_1n + a * s2);
          const u2 = mod(_1n - a * s2);
          const u1_2 = mod(u1 * u1);
          const u2_2 = mod(u2 * u2);
          const v = mod(a * d * u1_2 - u2_2);
          const {
            isValid,
            value: I
          } = invertSqrt(mod(v * u2_2));
          const Dx = mod(I * u2);
          const Dy = mod(I * Dx * v);
          let x = mod((s + s) * Dx);
          if (edIsNegative(x)) x = mod(-x);
          const y = mod(u1 * Dy);
          const t = mod(x * y);
          if (!isValid || edIsNegative(t) || y === _0n) throw new Error(emsg);
          return new RistrettoPoint(new ExtendedPoint(x, y, _1n, t));
        }

        toRawBytes() {
          let {
            x,
            y,
            z,
            t
          } = this.ep;
          const u1 = mod(mod(z + y) * mod(z - y));
          const u2 = mod(x * y);
          const {
            value: invsqrt
          } = invertSqrt(mod(u1 * u2 ** _2n));
          const D1 = mod(invsqrt * u1);
          const D2 = mod(invsqrt * u2);
          const zInv = mod(D1 * D2 * t);
          let D;

          if (edIsNegative(t * zInv)) {
            let _x = mod(y * SQRT_M1);

            let _y = mod(x * SQRT_M1);

            x = _x;
            y = _y;
            D = mod(D1 * INVSQRT_A_MINUS_D);
          } else {
            D = D2;
          }

          if (edIsNegative(x * zInv)) y = mod(-y);
          let s = mod((z - y) * D);
          if (edIsNegative(s)) s = mod(-s);
          return numberTo32BytesLE(s);
        }

        toHex() {
          return bytesToHex(this.toRawBytes());
        }

        toString() {
          return this.toHex();
        }

        equals(other) {
          assertRstPoint(other);
          const a = this.ep;
          const b = other.ep;
          const one = mod(a.x * b.y) === mod(a.y * b.x);
          const two = mod(a.y * b.y) === mod(a.x * b.x);
          return one || two;
        }

        add(other) {
          assertRstPoint(other);
          return new RistrettoPoint(this.ep.add(other.ep));
        }

        subtract(other) {
          assertRstPoint(other);
          return new RistrettoPoint(this.ep.subtract(other.ep));
        }

        multiply(scalar) {
          return new RistrettoPoint(this.ep.multiply(scalar));
        }

        multiplyUnsafe(scalar) {
          return new RistrettoPoint(this.ep.multiplyUnsafe(scalar));
        }

      }

      exports.RistrettoPoint = RistrettoPoint;
      RistrettoPoint.BASE = new RistrettoPoint(ExtendedPoint.BASE);
      RistrettoPoint.ZERO = new RistrettoPoint(ExtendedPoint.ZERO);
      const pointPrecomputes = new WeakMap();

      class Point {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }

        _setWindowSize(windowSize) {
          this._WINDOW_SIZE = windowSize;
          pointPrecomputes.delete(this);
        }

        static fromHex(hex, strict = true) {
          const {
            d,
            P
          } = CURVE;
          hex = ensureBytes(hex, 32);
          const normed = hex.slice();
          normed[31] = hex[31] & ~0x80;
          const y = bytesToNumberLE(normed);
          if (strict && y >= P) throw new Error('Expected 0 < hex < P');
          if (!strict && y >= MAX_256B) throw new Error('Expected 0 < hex < 2**256');
          const y2 = mod(y * y);
          const u = mod(y2 - _1n);
          const v = mod(d * y2 + _1n);
          let {
            isValid,
            value: x
          } = uvRatio(u, v);
          if (!isValid) throw new Error('Point.fromHex: invalid y coordinate');
          const isXOdd = (x & _1n) === _1n;
          const isLastByteOdd = (hex[31] & 0x80) !== 0;

          if (isLastByteOdd !== isXOdd) {
            x = mod(-x);
          }

          return new Point(x, y);
        }

        static async fromPrivateKey(privateKey) {
          return (await getExtendedPublicKey(privateKey)).point;
        }

        toRawBytes() {
          const bytes = numberTo32BytesLE(this.y);
          bytes[31] |= this.x & _1n ? 0x80 : 0;
          return bytes;
        }

        toHex() {
          return bytesToHex(this.toRawBytes());
        }

        toX25519() {
          const {
            y
          } = this;
          const u = mod((_1n + y) * invert(_1n - y));
          return numberTo32BytesLE(u);
        }

        isTorsionFree() {
          return ExtendedPoint.fromAffine(this).isTorsionFree();
        }

        equals(other) {
          return this.x === other.x && this.y === other.y;
        }

        negate() {
          return new Point(mod(-this.x), this.y);
        }

        add(other) {
          return ExtendedPoint.fromAffine(this).add(ExtendedPoint.fromAffine(other)).toAffine();
        }

        subtract(other) {
          return this.add(other.negate());
        }

        multiply(scalar) {
          return ExtendedPoint.fromAffine(this).multiply(scalar, this).toAffine();
        }

      }

      exports.Point = Point;
      Point.BASE = new Point(CURVE.Gx, CURVE.Gy);
      Point.ZERO = new Point(_0n, _1n);

      class Signature {
        constructor(r, s) {
          this.r = r;
          this.s = s;
          this.assertValidity();
        }

        static fromHex(hex) {
          const bytes = ensureBytes(hex, 64);
          const r = Point.fromHex(bytes.slice(0, 32), false);
          const s = bytesToNumberLE(bytes.slice(32, 64));
          return new Signature(r, s);
        }

        assertValidity() {
          const {
            r,
            s
          } = this;
          if (!(r instanceof Point)) throw new Error('Expected Point instance');
          normalizeScalar(s, CURVE.l, false);
          return this;
        }

        toRawBytes() {
          const u8 = new Uint8Array(64);
          u8.set(this.r.toRawBytes());
          u8.set(numberTo32BytesLE(this.s), 32);
          return u8;
        }

        toHex() {
          return bytesToHex(this.toRawBytes());
        }

      }

      exports.Signature = Signature;

      function concatBytes(...arrays) {
        if (!arrays.every(a => a instanceof Uint8Array)) throw new Error('Expected Uint8Array list');
        if (arrays.length === 1) return arrays[0];
        const length = arrays.reduce((a, arr) => a + arr.length, 0);
        const result = new Uint8Array(length);

        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const arr = arrays[i];
          result.set(arr, pad);
          pad += arr.length;
        }

        return result;
      }

      const hexes = Array.from({
        length: 256
      }, (v, i) => i.toString(16).padStart(2, '0'));

      function bytesToHex(uint8a) {
        if (!(uint8a instanceof Uint8Array)) throw new Error('Uint8Array expected');
        let hex = '';

        for (let i = 0; i < uint8a.length; i++) {
          hex += hexes[uint8a[i]];
        }

        return hex;
      }

      function hexToBytes(hex) {
        if (typeof hex !== 'string') {
          throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
        }

        if (hex.length % 2) throw new Error('hexToBytes: received invalid unpadded hex');
        const array = new Uint8Array(hex.length / 2);

        for (let i = 0; i < array.length; i++) {
          const j = i * 2;
          const hexByte = hex.slice(j, j + 2);
          const byte = Number.parseInt(hexByte, 16);
          if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
          array[i] = byte;
        }

        return array;
      }

      function numberTo32BytesBE(num) {
        const length = 32;
        const hex = num.toString(16).padStart(length * 2, '0');
        return hexToBytes(hex);
      }

      function numberTo32BytesLE(num) {
        return numberTo32BytesBE(num).reverse();
      }

      function edIsNegative(num) {
        return (mod(num) & _1n) === _1n;
      }

      function bytesToNumberLE(uint8a) {
        if (!(uint8a instanceof Uint8Array)) throw new Error('Expected Uint8Array');
        return BigInt('0x' + bytesToHex(Uint8Array.from(uint8a).reverse()));
      }

      function bytes255ToNumberLE(bytes) {
        return mod(bytesToNumberLE(bytes) & _2n ** _255n - _1n);
      }

      function mod(a, b = CURVE.P) {
        const res = a % b;
        return res >= _0n ? res : b + res;
      }

      function invert(number, modulo = CURVE.P) {
        if (number === _0n || modulo <= _0n) {
          throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
        }

        let a = mod(number, modulo);
        let b = modulo;
        let x = _0n,
            y = _1n,
            u = _1n,
            v = _0n;

        while (a !== _0n) {
          const q = b / a;
          const r = b % a;
          const m = x - u * q;
          const n = y - v * q;
          b = a, a = r, x = u, y = v, u = m, v = n;
        }

        const gcd = b;
        if (gcd !== _1n) throw new Error('invert: does not exist');
        return mod(x, modulo);
      }

      function invertBatch(nums, p = CURVE.P) {
        const tmp = new Array(nums.length);
        const lastMultiplied = nums.reduce((acc, num, i) => {
          if (num === _0n) return acc;
          tmp[i] = acc;
          return mod(acc * num, p);
        }, _1n);
        const inverted = invert(lastMultiplied, p);
        nums.reduceRight((acc, num, i) => {
          if (num === _0n) return acc;
          tmp[i] = mod(acc * tmp[i], p);
          return mod(acc * num, p);
        }, inverted);
        return tmp;
      }

      function pow2(x, power) {
        const {
          P
        } = CURVE;
        let res = x;

        while (power-- > _0n) {
          res *= res;
          res %= P;
        }

        return res;
      }

      function pow_2_252_3(x) {
        const {
          P
        } = CURVE;

        const _5n = BigInt(5);

        const _10n = BigInt(10);

        const _20n = BigInt(20);

        const _40n = BigInt(40);

        const _80n = BigInt(80);

        const x2 = x * x % P;
        const b2 = x2 * x % P;
        const b4 = pow2(b2, _2n) * b2 % P;
        const b5 = pow2(b4, _1n) * x % P;
        const b10 = pow2(b5, _5n) * b5 % P;
        const b20 = pow2(b10, _10n) * b10 % P;
        const b40 = pow2(b20, _20n) * b20 % P;
        const b80 = pow2(b40, _40n) * b40 % P;
        const b160 = pow2(b80, _80n) * b80 % P;
        const b240 = pow2(b160, _80n) * b80 % P;
        const b250 = pow2(b240, _10n) * b10 % P;
        const pow_p_5_8 = pow2(b250, _2n) * x % P;
        return {
          pow_p_5_8,
          b2
        };
      }

      function uvRatio(u, v) {
        const v3 = mod(v * v * v);
        const v7 = mod(v3 * v3 * v);
        const pow = pow_2_252_3(u * v7).pow_p_5_8;
        let x = mod(u * v3 * pow);
        const vx2 = mod(v * x * x);
        const root1 = x;
        const root2 = mod(x * SQRT_M1);
        const useRoot1 = vx2 === u;
        const useRoot2 = vx2 === mod(-u);
        const noRoot = vx2 === mod(-u * SQRT_M1);
        if (useRoot1) x = root1;
        if (useRoot2 || noRoot) x = root2;
        if (edIsNegative(x)) x = mod(-x);
        return {
          isValid: useRoot1 || useRoot2,
          value: x
        };
      }

      function invertSqrt(number) {
        return uvRatio(_1n, number);
      }

      function modlLE(hash) {
        return mod(bytesToNumberLE(hash), CURVE.l);
      }

      function equalBytes(b1, b2) {
        if (b1.length !== b2.length) {
          return false;
        }

        for (let i = 0; i < b1.length; i++) {
          if (b1[i] !== b2[i]) {
            return false;
          }
        }

        return true;
      }

      function ensureBytes(hex, expectedLength) {
        const bytes = hex instanceof Uint8Array ? Uint8Array.from(hex) : hexToBytes(hex);
        if (typeof expectedLength === 'number' && bytes.length !== expectedLength) throw new Error(`Expected ${expectedLength} bytes`);
        return bytes;
      }

      function normalizeScalar(num, max, strict = true) {
        if (!max) throw new TypeError('Specify max value');
        if (typeof num === 'number' && Number.isSafeInteger(num)) num = BigInt(num);

        if (typeof num === 'bigint' && num < max) {
          if (strict) {
            if (_0n < num) return num;
          } else {
            if (_0n <= num) return num;
          }
        }

        throw new TypeError('Expected valid scalar: 0 < scalar < max');
      }

      function adjustBytes25519(bytes) {
        bytes[0] &= 248;
        bytes[31] &= 127;
        bytes[31] |= 64;
        return bytes;
      }

      function decodeScalar25519(n) {
        return bytesToNumberLE(adjustBytes25519(ensureBytes(n, 32)));
      }

      function checkPrivateKey(key) {
        key = typeof key === 'bigint' || typeof key === 'number' ? numberTo32BytesBE(normalizeScalar(key, MAX_256B)) : ensureBytes(key);
        if (key.length !== 32) throw new Error(`Expected 32 bytes`);
        return key;
      }

      function getKeyFromHash(hashed) {
        const head = adjustBytes25519(hashed.slice(0, 32));
        const prefix = hashed.slice(32, 64);
        const scalar = modlLE(head);
        const point = Point.BASE.multiply(scalar);
        const pointBytes = point.toRawBytes();
        return {
          head,
          prefix,
          scalar,
          point,
          pointBytes
        };
      }

      let _sha512Sync;

      function sha512s(...m) {
        if (typeof _sha512Sync !== 'function') throw new Error('utils.sha512Sync must be set to use sync methods');
        return _sha512Sync(...m);
      }

      async function getExtendedPublicKey(key) {
        return getKeyFromHash(await exports.utils.sha512(checkPrivateKey(key)));
      }

      function getExtendedPublicKeySync(key) {
        return getKeyFromHash(sha512s(checkPrivateKey(key)));
      }

      async function getPublicKey(privateKey) {
        return (await getExtendedPublicKey(privateKey)).pointBytes;
      }

      exports.getPublicKey = getPublicKey;

      function getPublicKeySync(privateKey) {
        return getExtendedPublicKeySync(privateKey).pointBytes;
      }

      async function sign(message, privateKey) {
        message = ensureBytes(message);
        const {
          prefix,
          scalar,
          pointBytes
        } = await getExtendedPublicKey(privateKey);
        const r = modlLE(await exports.utils.sha512(prefix, message));
        const R = Point.BASE.multiply(r);
        const k = modlLE(await exports.utils.sha512(R.toRawBytes(), pointBytes, message));
        const s = mod(r + k * scalar, CURVE.l);
        return new Signature(R, s).toRawBytes();
      }

      exports.sign = sign;

      function signSync(message, privateKey) {
        message = ensureBytes(message);
        const {
          prefix,
          scalar,
          pointBytes
        } = getExtendedPublicKeySync(privateKey);
        const r = modlLE(sha512s(prefix, message));
        const R = Point.BASE.multiply(r);
        const k = modlLE(sha512s(R.toRawBytes(), pointBytes, message));
        const s = mod(r + k * scalar, CURVE.l);
        return new Signature(R, s).toRawBytes();
      }

      function prepareVerification(sig, message, publicKey) {
        message = ensureBytes(message);
        if (!(publicKey instanceof Point)) publicKey = Point.fromHex(publicKey, false);
        const {
          r,
          s
        } = sig instanceof Signature ? sig.assertValidity() : Signature.fromHex(sig);
        const SB = ExtendedPoint.BASE.multiplyUnsafe(s);
        return {
          r,
          s,
          SB,
          pub: publicKey,
          msg: message
        };
      }

      function finishVerification(publicKey, r, SB, hashed) {
        const k = modlLE(hashed);
        const kA = ExtendedPoint.fromAffine(publicKey).multiplyUnsafe(k);
        const RkA = ExtendedPoint.fromAffine(r).add(kA);
        return RkA.subtract(SB).multiplyUnsafe(CURVE.h).equals(ExtendedPoint.ZERO);
      }

      async function verify(sig, message, publicKey) {
        const {
          r,
          SB,
          msg,
          pub
        } = prepareVerification(sig, message, publicKey);
        const hashed = await exports.utils.sha512(r.toRawBytes(), pub.toRawBytes(), msg);
        return finishVerification(pub, r, SB, hashed);
      }

      exports.verify = verify;

      function verifySync(sig, message, publicKey) {
        const {
          r,
          SB,
          msg,
          pub
        } = prepareVerification(sig, message, publicKey);
        const hashed = sha512s(r.toRawBytes(), pub.toRawBytes(), msg);
        return finishVerification(pub, r, SB, hashed);
      }

      exports.sync = {
        getExtendedPublicKey: getExtendedPublicKeySync,
        getPublicKey: getPublicKeySync,
        sign: signSync,
        verify: verifySync
      };

      async function getSharedSecret(privateKey, publicKey) {
        const {
          head
        } = await getExtendedPublicKey(privateKey);
        const u = Point.fromHex(publicKey).toX25519();
        return exports.curve25519.scalarMult(head, u);
      }

      exports.getSharedSecret = getSharedSecret;

      Point.BASE._setWindowSize(8);

      function cswap(swap, x_2, x_3) {
        const dummy = mod(swap * (x_2 - x_3));
        x_2 = mod(x_2 - dummy);
        x_3 = mod(x_3 + dummy);
        return [x_2, x_3];
      }

      function montgomeryLadder(pointU, scalar) {
        const {
          P
        } = CURVE;
        const u = normalizeScalar(pointU, P);
        const k = normalizeScalar(scalar, P);
        const a24 = BigInt(121665);
        const x_1 = u;
        let x_2 = _1n;
        let z_2 = _0n;
        let x_3 = u;
        let z_3 = _1n;
        let swap = _0n;
        let sw;

        for (let t = BigInt(255 - 1); t >= _0n; t--) {
          const k_t = k >> t & _1n;
          swap ^= k_t;
          sw = cswap(swap, x_2, x_3);
          x_2 = sw[0];
          x_3 = sw[1];
          sw = cswap(swap, z_2, z_3);
          z_2 = sw[0];
          z_3 = sw[1];
          swap = k_t;
          const A = x_2 + z_2;
          const AA = mod(A * A);
          const B = x_2 - z_2;
          const BB = mod(B * B);
          const E = AA - BB;
          const C = x_3 + z_3;
          const D = x_3 - z_3;
          const DA = mod(D * A);
          const CB = mod(C * B);
          x_3 = mod((DA + CB) ** _2n);
          z_3 = mod(x_1 * (DA - CB) ** _2n);
          x_2 = mod(AA * BB);
          z_2 = mod(E * (AA + mod(a24 * E)));
        }

        sw = cswap(swap, x_2, x_3);
        x_2 = sw[0];
        x_3 = sw[1];
        sw = cswap(swap, z_2, z_3);
        z_2 = sw[0];
        z_3 = sw[1];
        const {
          pow_p_5_8,
          b2
        } = pow_2_252_3(z_2);
        const xp2 = mod(pow2(pow_p_5_8, BigInt(3)) * b2);
        return mod(x_2 * xp2);
      }

      function encodeUCoordinate(u) {
        return numberTo32BytesLE(mod(u, CURVE.P));
      }

      function decodeUCoordinate(uEnc) {
        const u = ensureBytes(uEnc, 32);
        u[31] &= 127;
        return bytesToNumberLE(u);
      }

      exports.curve25519 = {
        BASE_POINT_U: '0900000000000000000000000000000000000000000000000000000000000000',

        scalarMult(privateKey, publicKey) {
          const u = decodeUCoordinate(publicKey);
          const p = decodeScalar25519(privateKey);
          const pu = montgomeryLadder(u, p);
          if (pu === _0n) throw new Error('Invalid private or public key received');
          return encodeUCoordinate(pu);
        },

        scalarMultBase(privateKey) {
          return exports.curve25519.scalarMult(privateKey, exports.curve25519.BASE_POINT_U);
        }

      };
      const crypto = {
        node: nodeCrypto,
        web: typeof self === 'object' && 'crypto' in self ? self.crypto : undefined
      };
      exports.utils = {
        TORSION_SUBGROUP: ['0100000000000000000000000000000000000000000000000000000000000000', 'c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a', '0000000000000000000000000000000000000000000000000000000000000080', '26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05', 'ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f', '26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85', '0000000000000000000000000000000000000000000000000000000000000000', 'c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa'],
        bytesToHex,
        hexToBytes,
        concatBytes,
        getExtendedPublicKey,
        mod,
        invert,
        hashToPrivateScalar: hash => {
          hash = ensureBytes(hash);
          if (hash.length < 40 || hash.length > 1024) throw new Error('Expected 40-1024 bytes of private key as per FIPS 186');
          return mod(bytesToNumberLE(hash), CURVE.l - _1n) + _1n;
        },
        randomBytes: (bytesLength = 32) => {
          if (crypto.web) {
            return crypto.web.getRandomValues(new Uint8Array(bytesLength));
          } else if (crypto.node) {
            const {
              randomBytes
            } = crypto.node;
            return new Uint8Array(randomBytes(bytesLength).buffer);
          } else {
            throw new Error("The environment doesn't have randomBytes function");
          }
        },
        randomPrivateKey: () => {
          return exports.utils.randomBytes(32);
        },
        sha512: async (...messages) => {
          const message = concatBytes(...messages);

          if (crypto.web) {
            const buffer = await crypto.web.subtle.digest('SHA-512', message.buffer);
            return new Uint8Array(buffer);
          } else if (crypto.node) {
            return Uint8Array.from(crypto.node.createHash('sha512').update(message).digest());
          } else {
            throw new Error("The environment doesn't have sha512 function");
          }
        },

        precompute(windowSize = 8, point = Point.BASE) {
          const cached = point.equals(Point.BASE) ? point : new Point(point.x, point.y);

          cached._setWindowSize(windowSize);

          cached.multiply(_2n);
          return cached;
        },

        sha512Sync: undefined
      };
      Object.defineProperties(exports.utils, {
        sha512Sync: {
          configurable: false,

          get() {
            return _sha512Sync;
          },

          set(val) {
            if (!_sha512Sync) _sha512Sync = val;
          }

        }
      });
    }, {
      "crypto": 32
    }],
    17: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.output = exports.exists = exports.hash = exports.bytes = exports.bool = exports.number = void 0;

      function number(n) {
        if (!Number.isSafeInteger(n) || n < 0) throw new Error(`Wrong positive integer: ${n}`);
      }

      exports.number = number;

      function bool(b) {
        if (typeof b !== 'boolean') throw new Error(`Expected boolean, not ${b}`);
      }

      exports.bool = bool;

      function bytes(b, ...lengths) {
        if (!(b instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
        if (lengths.length > 0 && !lengths.includes(b.length)) throw new TypeError(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
      }

      exports.bytes = bytes;

      function hash(hash) {
        if (typeof hash !== 'function' || typeof hash.create !== 'function') throw new Error('Hash should be wrapped by utils.wrapConstructor');
        number(hash.outputLen);
        number(hash.blockLen);
      }

      exports.hash = hash;

      function exists(instance, checkFinished = true) {
        if (instance.destroyed) throw new Error('Hash instance has been destroyed');
        if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
      }

      exports.exists = exists;

      function output(out, instance) {
        bytes(out);
        const min = instance.outputLen;

        if (out.length < min) {
          throw new Error(`digestInto() expects output buffer of length at least ${min}`);
        }
      }

      exports.output = output;
      const assert = {
        number,
        bool,
        bytes,
        hash,
        exists,
        output
      };
      exports.default = assert;
    }, {}],
    18: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SHA2 = void 0;

      const _assert_js_1 = require("./_assert.js");

      const utils_js_1 = require("./utils.js");

      function setBigUint64(view, byteOffset, value, isLE) {
        if (typeof view.setBigUint64 === 'function') return view.setBigUint64(byteOffset, value, isLE);

        const _32n = BigInt(32);

        const _u32_max = BigInt(0xffffffff);

        const wh = Number(value >> _32n & _u32_max);
        const wl = Number(value & _u32_max);
        const h = isLE ? 4 : 0;
        const l = isLE ? 0 : 4;
        view.setUint32(byteOffset + h, wh, isLE);
        view.setUint32(byteOffset + l, wl, isLE);
      }

      class SHA2 extends utils_js_1.Hash {
        constructor(blockLen, outputLen, padOffset, isLE) {
          super();
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE;
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.buffer = new Uint8Array(blockLen);
          this.view = (0, utils_js_1.createView)(this.buffer);
        }

        update(data) {
          _assert_js_1.default.exists(this);

          const {
            view,
            buffer,
            blockLen
          } = this;
          data = (0, utils_js_1.toBytes)(data);
          const len = data.length;

          for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);

            if (take === blockLen) {
              const dataView = (0, utils_js_1.createView)(data);

              for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);

              continue;
            }

            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;

            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }

          this.length += data.length;
          this.roundClean();
          return this;
        }

        digestInto(out) {
          _assert_js_1.default.exists(this);

          _assert_js_1.default.output(out, this);

          this.finished = true;
          const {
            buffer,
            view,
            blockLen,
            isLE
          } = this;
          let {
            pos
          } = this;
          buffer[pos++] = 0b10000000;
          this.buffer.subarray(pos).fill(0);

          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }

          for (let i = pos; i < blockLen; i++) buffer[i] = 0;

          setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
          this.process(view, 0);
          const oview = (0, utils_js_1.createView)(out);
          this.get().forEach((v, i) => oview.setUint32(4 * i, v, isLE));
        }

        digest() {
          const {
            buffer,
            outputLen
          } = this;
          this.digestInto(buffer);
          const res = buffer.slice(0, outputLen);
          this.destroy();
          return res;
        }

        _cloneInto(to) {
          to || (to = new this.constructor());
          to.set(...this.get());
          const {
            blockLen,
            buffer,
            length,
            finished,
            destroyed,
            pos
          } = this;
          to.length = length;
          to.pos = pos;
          to.finished = finished;
          to.destroyed = destroyed;
          if (length % blockLen) to.buffer.set(buffer);
          return to;
        }

      }

      exports.SHA2 = SHA2;
    }, {
      "./_assert.js": 17,
      "./utils.js": 27
    }],
    19: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.add = exports.toBig = exports.split = exports.fromBig = void 0;
      const U32_MASK64 = BigInt(2 ** 32 - 1);

      const _32n = BigInt(32);

      function fromBig(n, le = false) {
        if (le) return {
          h: Number(n & U32_MASK64),
          l: Number(n >> _32n & U32_MASK64)
        };
        return {
          h: Number(n >> _32n & U32_MASK64) | 0,
          l: Number(n & U32_MASK64) | 0
        };
      }

      exports.fromBig = fromBig;

      function split(lst, le = false) {
        let Ah = new Uint32Array(lst.length);
        let Al = new Uint32Array(lst.length);

        for (let i = 0; i < lst.length; i++) {
          const {
            h,
            l
          } = fromBig(lst[i], le);
          [Ah[i], Al[i]] = [h, l];
        }

        return [Ah, Al];
      }

      exports.split = split;

      const toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);

      exports.toBig = toBig;

      const shrSH = (h, l, s) => h >>> s;

      const shrSL = (h, l, s) => h << 32 - s | l >>> s;

      const rotrSH = (h, l, s) => h >>> s | l << 32 - s;

      const rotrSL = (h, l, s) => h << 32 - s | l >>> s;

      const rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;

      const rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;

      const rotr32H = (h, l) => l;

      const rotr32L = (h, l) => h;

      const rotlSH = (h, l, s) => h << s | l >>> 32 - s;

      const rotlSL = (h, l, s) => l << s | h >>> 32 - s;

      const rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;

      const rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;

      function add(Ah, Al, Bh, Bl) {
        const l = (Al >>> 0) + (Bl >>> 0);
        return {
          h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
          l: l | 0
        };
      }

      exports.add = add;

      const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);

      const add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;

      const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);

      const add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;

      const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);

      const add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;

      const u64 = {
        fromBig,
        split,
        toBig: exports.toBig,
        shrSH,
        shrSL,
        rotrSH,
        rotrSL,
        rotrBH,
        rotrBL,
        rotr32H,
        rotr32L,
        rotlSH,
        rotlSL,
        rotlBH,
        rotlBL,
        add,
        add3L,
        add3H,
        add4L,
        add4H,
        add5H,
        add5L
      };
      exports.default = u64;
    }, {}],
    20: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.crypto = void 0;
      exports.crypto = {
        node: undefined,
        web: typeof self === 'object' && 'crypto' in self ? self.crypto : undefined
      };
    }, {}],
    21: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.hmac = void 0;

      const _assert_js_1 = require("./_assert.js");

      const utils_js_1 = require("./utils.js");

      class HMAC extends utils_js_1.Hash {
        constructor(hash, _key) {
          super();
          this.finished = false;
          this.destroyed = false;

          _assert_js_1.default.hash(hash);

          const key = (0, utils_js_1.toBytes)(_key);
          this.iHash = hash.create();
          if (!(this.iHash instanceof utils_js_1.Hash)) throw new TypeError('Expected instance of class which extends utils.Hash');
          const blockLen = this.blockLen = this.iHash.blockLen;
          this.outputLen = this.iHash.outputLen;
          const pad = new Uint8Array(blockLen);
          pad.set(key.length > this.iHash.blockLen ? hash.create().update(key).digest() : key);

          for (let i = 0; i < pad.length; i++) pad[i] ^= 0x36;

          this.iHash.update(pad);
          this.oHash = hash.create();

          for (let i = 0; i < pad.length; i++) pad[i] ^= 0x36 ^ 0x5c;

          this.oHash.update(pad);
          pad.fill(0);
        }

        update(buf) {
          _assert_js_1.default.exists(this);

          this.iHash.update(buf);
          return this;
        }

        digestInto(out) {
          _assert_js_1.default.exists(this);

          _assert_js_1.default.bytes(out, this.outputLen);

          this.finished = true;
          this.iHash.digestInto(out);
          this.oHash.update(out);
          this.oHash.digestInto(out);
          this.destroy();
        }

        digest() {
          const out = new Uint8Array(this.oHash.outputLen);
          this.digestInto(out);
          return out;
        }

        _cloneInto(to) {
          to || (to = Object.create(Object.getPrototypeOf(this), {}));
          const {
            oHash,
            iHash,
            finished,
            destroyed,
            blockLen,
            outputLen
          } = this;
          to = to;
          to.finished = finished;
          to.destroyed = destroyed;
          to.blockLen = blockLen;
          to.outputLen = outputLen;
          to.oHash = oHash._cloneInto(to.oHash);
          to.iHash = iHash._cloneInto(to.iHash);
          return to;
        }

        destroy() {
          this.destroyed = true;
          this.oHash.destroy();
          this.iHash.destroy();
        }

      }

      const hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();

      exports.hmac = hmac;

      exports.hmac.create = (hash, key) => new HMAC(hash, key);
    }, {
      "./_assert.js": 17,
      "./utils.js": 27
    }],
    22: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.pbkdf2Async = exports.pbkdf2 = void 0;

      const _assert_js_1 = require("./_assert.js");

      const hmac_js_1 = require("./hmac.js");

      const utils_js_1 = require("./utils.js");

      function pbkdf2Init(hash, _password, _salt, _opts) {
        _assert_js_1.default.hash(hash);

        const opts = (0, utils_js_1.checkOpts)({
          dkLen: 32,
          asyncTick: 10
        }, _opts);
        const {
          c,
          dkLen,
          asyncTick
        } = opts;

        _assert_js_1.default.number(c);

        _assert_js_1.default.number(dkLen);

        _assert_js_1.default.number(asyncTick);

        if (c < 1) throw new Error('PBKDF2: iterations (c) should be >= 1');
        const password = (0, utils_js_1.toBytes)(_password);
        const salt = (0, utils_js_1.toBytes)(_salt);
        const DK = new Uint8Array(dkLen);
        const PRF = hmac_js_1.hmac.create(hash, password);

        const PRFSalt = PRF._cloneInto().update(salt);

        return {
          c,
          dkLen,
          asyncTick,
          DK,
          PRF,
          PRFSalt
        };
      }

      function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
        PRF.destroy();
        PRFSalt.destroy();
        if (prfW) prfW.destroy();
        u.fill(0);
        return DK;
      }

      function pbkdf2(hash, password, salt, opts) {
        const {
          c,
          dkLen,
          DK,
          PRF,
          PRFSalt
        } = pbkdf2Init(hash, password, salt, opts);
        let prfW;
        const arr = new Uint8Array(4);
        const view = (0, utils_js_1.createView)(arr);
        const u = new Uint8Array(PRF.outputLen);

        for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
          const Ti = DK.subarray(pos, pos + PRF.outputLen);
          view.setInt32(0, ti, false);

          (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);

          Ti.set(u.subarray(0, Ti.length));

          for (let ui = 1; ui < c; ui++) {
            PRF._cloneInto(prfW).update(u).digestInto(u);

            for (let i = 0; i < Ti.length; i++) Ti[i] ^= u[i];
          }
        }

        return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
      }

      exports.pbkdf2 = pbkdf2;

      async function pbkdf2Async(hash, password, salt, opts) {
        const {
          c,
          dkLen,
          asyncTick,
          DK,
          PRF,
          PRFSalt
        } = pbkdf2Init(hash, password, salt, opts);
        let prfW;
        const arr = new Uint8Array(4);
        const view = (0, utils_js_1.createView)(arr);
        const u = new Uint8Array(PRF.outputLen);

        for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
          const Ti = DK.subarray(pos, pos + PRF.outputLen);
          view.setInt32(0, ti, false);

          (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);

          Ti.set(u.subarray(0, Ti.length));
          await (0, utils_js_1.asyncLoop)(c - 1, asyncTick, i => {
            PRF._cloneInto(prfW).update(u).digestInto(u);

            for (let i = 0; i < Ti.length; i++) Ti[i] ^= u[i];
          });
        }

        return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
      }

      exports.pbkdf2Async = pbkdf2Async;
    }, {
      "./_assert.js": 17,
      "./hmac.js": 21,
      "./utils.js": 27
    }],
    23: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ripemd160 = exports.RIPEMD160 = void 0;

      const _sha2_js_1 = require("./_sha2.js");

      const utils_js_1 = require("./utils.js");

      const Rho = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]);
      const Id = Uint8Array.from({
        length: 16
      }, (_, i) => i);
      const Pi = Id.map(i => (9 * i + 5) % 16);
      let idxL = [Id];
      let idxR = [Pi];

      for (let i = 0; i < 4; i++) for (let j of [idxL, idxR]) j.push(j[i].map(k => Rho[k]));

      const shifts = [[11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8], [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7], [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9], [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6], [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]].map(i => new Uint8Array(i));
      const shiftsL = idxL.map((idx, i) => idx.map(j => shifts[i][j]));
      const shiftsR = idxR.map((idx, i) => idx.map(j => shifts[i][j]));
      const Kl = new Uint32Array([0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e]);
      const Kr = new Uint32Array([0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000]);

      const rotl = (word, shift) => word << shift | word >>> 32 - shift;

      function f(group, x, y, z) {
        if (group === 0) return x ^ y ^ z;else if (group === 1) return x & y | ~x & z;else if (group === 2) return (x | ~y) ^ z;else if (group === 3) return x & z | y & ~z;else return x ^ (y | ~z);
      }

      const BUF = new Uint32Array(16);

      class RIPEMD160 extends _sha2_js_1.SHA2 {
        constructor() {
          super(64, 20, 8, true);
          this.h0 = 0x67452301 | 0;
          this.h1 = 0xefcdab89 | 0;
          this.h2 = 0x98badcfe | 0;
          this.h3 = 0x10325476 | 0;
          this.h4 = 0xc3d2e1f0 | 0;
        }

        get() {
          const {
            h0,
            h1,
            h2,
            h3,
            h4
          } = this;
          return [h0, h1, h2, h3, h4];
        }

        set(h0, h1, h2, h3, h4) {
          this.h0 = h0 | 0;
          this.h1 = h1 | 0;
          this.h2 = h2 | 0;
          this.h3 = h3 | 0;
          this.h4 = h4 | 0;
        }

        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) BUF[i] = view.getUint32(offset, true);

          let al = this.h0 | 0,
              ar = al,
              bl = this.h1 | 0,
              br = bl,
              cl = this.h2 | 0,
              cr = cl,
              dl = this.h3 | 0,
              dr = dl,
              el = this.h4 | 0,
              er = el;

          for (let group = 0; group < 5; group++) {
            const rGroup = 4 - group;
            const hbl = Kl[group],
                  hbr = Kr[group];
            const rl = idxL[group],
                  rr = idxR[group];
            const sl = shiftsL[group],
                  sr = shiftsR[group];

            for (let i = 0; i < 16; i++) {
              const tl = rotl(al + f(group, bl, cl, dl) + BUF[rl[i]] + hbl, sl[i]) + el | 0;
              al = el, el = dl, dl = rotl(cl, 10) | 0, cl = bl, bl = tl;
            }

            for (let i = 0; i < 16; i++) {
              const tr = rotl(ar + f(rGroup, br, cr, dr) + BUF[rr[i]] + hbr, sr[i]) + er | 0;
              ar = er, er = dr, dr = rotl(cr, 10) | 0, cr = br, br = tr;
            }
          }

          this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
        }

        roundClean() {
          BUF.fill(0);
        }

        destroy() {
          this.destroyed = true;
          this.buffer.fill(0);
          this.set(0, 0, 0, 0, 0);
        }

      }

      exports.RIPEMD160 = RIPEMD160;
      exports.ripemd160 = (0, utils_js_1.wrapConstructor)(() => new RIPEMD160());
    }, {
      "./_sha2.js": 18,
      "./utils.js": 27
    }],
    24: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.sha256 = void 0;

      const _sha2_js_1 = require("./_sha2.js");

      const utils_js_1 = require("./utils.js");

      const Chi = (a, b, c) => a & b ^ ~a & c;

      const Maj = (a, b, c) => a & b ^ a & c ^ b & c;

      const SHA256_K = new Uint32Array([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]);
      const IV = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);
      const SHA256_W = new Uint32Array(64);

      class SHA256 extends _sha2_js_1.SHA2 {
        constructor() {
          super(64, 32, 8, false);
          this.A = IV[0] | 0;
          this.B = IV[1] | 0;
          this.C = IV[2] | 0;
          this.D = IV[3] | 0;
          this.E = IV[4] | 0;
          this.F = IV[5] | 0;
          this.G = IV[6] | 0;
          this.H = IV[7] | 0;
        }

        get() {
          const {
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H
          } = this;
          return [A, B, C, D, E, F, G, H];
        }

        set(A, B, C, D, E, F, G, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H | 0;
        }

        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) SHA256_W[i] = view.getUint32(offset, false);

          for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, utils_js_1.rotr)(W15, 7) ^ (0, utils_js_1.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, utils_js_1.rotr)(W2, 17) ^ (0, utils_js_1.rotr)(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
          }

          let {
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H
          } = this;

          for (let i = 0; i < 64; i++) {
            const sigma1 = (0, utils_js_1.rotr)(E, 6) ^ (0, utils_js_1.rotr)(E, 11) ^ (0, utils_js_1.rotr)(E, 25);
            const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = (0, utils_js_1.rotr)(A, 2) ^ (0, utils_js_1.rotr)(A, 13) ^ (0, utils_js_1.rotr)(A, 22);
            const T2 = sigma0 + Maj(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }

          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G, H);
        }

        roundClean() {
          SHA256_W.fill(0);
        }

        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          this.buffer.fill(0);
        }

      }

      exports.sha256 = (0, utils_js_1.wrapConstructor)(() => new SHA256());
    }, {
      "./_sha2.js": 18,
      "./utils.js": 27
    }],
    25: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.shake256 = exports.shake128 = exports.keccak_512 = exports.keccak_384 = exports.keccak_256 = exports.keccak_224 = exports.sha3_512 = exports.sha3_384 = exports.sha3_256 = exports.sha3_224 = exports.Keccak = exports.keccakP = void 0;

      const _assert_js_1 = require("./_assert.js");

      const _u64_js_1 = require("./_u64.js");

      const utils_js_1 = require("./utils.js");

      const [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];

      const _0n = BigInt(0);

      const _1n = BigInt(1);

      const _2n = BigInt(2);

      const _7n = BigInt(7);

      const _256n = BigInt(256);

      const _0x71n = BigInt(0x71);

      for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
        [x, y] = [y, (2 * x + 3 * y) % 5];
        SHA3_PI.push(2 * (5 * y + x));
        SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
        let t = _0n;

        for (let j = 0; j < 7; j++) {
          R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
          if (R & _2n) t ^= _1n << (_1n << BigInt(j)) - _1n;
        }

        _SHA3_IOTA.push(t);
      }

      const [SHA3_IOTA_H, SHA3_IOTA_L] = _u64_js_1.default.split(_SHA3_IOTA, true);

      const rotlH = (h, l, s) => s > 32 ? _u64_js_1.default.rotlBH(h, l, s) : _u64_js_1.default.rotlSH(h, l, s);

      const rotlL = (h, l, s) => s > 32 ? _u64_js_1.default.rotlBL(h, l, s) : _u64_js_1.default.rotlSL(h, l, s);

      function keccakP(s, rounds = 24) {
        const B = new Uint32Array(5 * 2);

        for (let round = 24 - rounds; round < 24; round++) {
          for (let x = 0; x < 10; x++) B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];

          for (let x = 0; x < 10; x += 2) {
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];

            for (let y = 0; y < 50; y += 10) {
              s[x + y] ^= Th;
              s[x + y + 1] ^= Tl;
            }
          }

          let curH = s[2];
          let curL = s[3];

          for (let t = 0; t < 24; t++) {
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
          }

          for (let y = 0; y < 50; y += 10) {
            for (let x = 0; x < 10; x++) B[x] = s[y + x];

            for (let x = 0; x < 10; x++) s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
          }

          s[0] ^= SHA3_IOTA_H[round];
          s[1] ^= SHA3_IOTA_L[round];
        }

        B.fill(0);
      }

      exports.keccakP = keccakP;

      class Keccak extends utils_js_1.Hash {
        constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
          super();
          this.blockLen = blockLen;
          this.suffix = suffix;
          this.outputLen = outputLen;
          this.enableXOF = enableXOF;
          this.rounds = rounds;
          this.pos = 0;
          this.posOut = 0;
          this.finished = false;
          this.destroyed = false;

          _assert_js_1.default.number(outputLen);

          if (0 >= this.blockLen || this.blockLen >= 200) throw new Error('Sha3 supports only keccak-f1600 function');
          this.state = new Uint8Array(200);
          this.state32 = (0, utils_js_1.u32)(this.state);
        }

        keccak() {
          keccakP(this.state32, this.rounds);
          this.posOut = 0;
          this.pos = 0;
        }

        update(data) {
          _assert_js_1.default.exists(this);

          const {
            blockLen,
            state
          } = this;
          data = (0, utils_js_1.toBytes)(data);
          const len = data.length;

          for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);

            for (let i = 0; i < take; i++) state[this.pos++] ^= data[pos++];

            if (this.pos === blockLen) this.keccak();
          }

          return this;
        }

        finish() {
          if (this.finished) return;
          this.finished = true;
          const {
            state,
            suffix,
            pos,
            blockLen
          } = this;
          state[pos] ^= suffix;
          if ((suffix & 0x80) !== 0 && pos === blockLen - 1) this.keccak();
          state[blockLen - 1] ^= 0x80;
          this.keccak();
        }

        writeInto(out) {
          _assert_js_1.default.exists(this, false);

          _assert_js_1.default.bytes(out);

          this.finish();
          const bufferOut = this.state;
          const {
            blockLen
          } = this;

          for (let pos = 0, len = out.length; pos < len;) {
            if (this.posOut >= blockLen) this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
          }

          return out;
        }

        xofInto(out) {
          if (!this.enableXOF) throw new Error('XOF is not possible for this instance');
          return this.writeInto(out);
        }

        xof(bytes) {
          _assert_js_1.default.number(bytes);

          return this.xofInto(new Uint8Array(bytes));
        }

        digestInto(out) {
          _assert_js_1.default.output(out, this);

          if (this.finished) throw new Error('digest() was already called');
          this.writeInto(out);
          this.destroy();
          return out;
        }

        digest() {
          return this.digestInto(new Uint8Array(this.outputLen));
        }

        destroy() {
          this.destroyed = true;
          this.state.fill(0);
        }

        _cloneInto(to) {
          const {
            blockLen,
            suffix,
            outputLen,
            rounds,
            enableXOF
          } = this;
          to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
          to.state32.set(this.state32);
          to.pos = this.pos;
          to.posOut = this.posOut;
          to.finished = this.finished;
          to.rounds = rounds;
          to.suffix = suffix;
          to.outputLen = outputLen;
          to.enableXOF = enableXOF;
          to.destroyed = this.destroyed;
          return to;
        }

      }

      exports.Keccak = Keccak;

      const gen = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapConstructor)(() => new Keccak(blockLen, suffix, outputLen));

      exports.sha3_224 = gen(0x06, 144, 224 / 8);
      exports.sha3_256 = gen(0x06, 136, 256 / 8);
      exports.sha3_384 = gen(0x06, 104, 384 / 8);
      exports.sha3_512 = gen(0x06, 72, 512 / 8);
      exports.keccak_224 = gen(0x01, 144, 224 / 8);
      exports.keccak_256 = gen(0x01, 136, 256 / 8);
      exports.keccak_384 = gen(0x01, 104, 384 / 8);
      exports.keccak_512 = gen(0x01, 72, 512 / 8);

      const genShake = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapConstructorWithOpts)((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));

      exports.shake128 = genShake(0x1f, 168, 128 / 8);
      exports.shake256 = genShake(0x1f, 136, 256 / 8);
    }, {
      "./_assert.js": 17,
      "./_u64.js": 19,
      "./utils.js": 27
    }],
    26: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.sha384 = exports.sha512_256 = exports.sha512 = exports.SHA512 = void 0;

      const _sha2_js_1 = require("./_sha2.js");

      const _u64_js_1 = require("./_u64.js");

      const utils_js_1 = require("./utils.js");

      const [SHA512_Kh, SHA512_Kl] = _u64_js_1.default.split(['0x428a2f98d728ae22', '0x7137449123ef65cd', '0xb5c0fbcfec4d3b2f', '0xe9b5dba58189dbbc', '0x3956c25bf348b538', '0x59f111f1b605d019', '0x923f82a4af194f9b', '0xab1c5ed5da6d8118', '0xd807aa98a3030242', '0x12835b0145706fbe', '0x243185be4ee4b28c', '0x550c7dc3d5ffb4e2', '0x72be5d74f27b896f', '0x80deb1fe3b1696b1', '0x9bdc06a725c71235', '0xc19bf174cf692694', '0xe49b69c19ef14ad2', '0xefbe4786384f25e3', '0x0fc19dc68b8cd5b5', '0x240ca1cc77ac9c65', '0x2de92c6f592b0275', '0x4a7484aa6ea6e483', '0x5cb0a9dcbd41fbd4', '0x76f988da831153b5', '0x983e5152ee66dfab', '0xa831c66d2db43210', '0xb00327c898fb213f', '0xbf597fc7beef0ee4', '0xc6e00bf33da88fc2', '0xd5a79147930aa725', '0x06ca6351e003826f', '0x142929670a0e6e70', '0x27b70a8546d22ffc', '0x2e1b21385c26c926', '0x4d2c6dfc5ac42aed', '0x53380d139d95b3df', '0x650a73548baf63de', '0x766a0abb3c77b2a8', '0x81c2c92e47edaee6', '0x92722c851482353b', '0xa2bfe8a14cf10364', '0xa81a664bbc423001', '0xc24b8b70d0f89791', '0xc76c51a30654be30', '0xd192e819d6ef5218', '0xd69906245565a910', '0xf40e35855771202a', '0x106aa07032bbd1b8', '0x19a4c116b8d2d0c8', '0x1e376c085141ab53', '0x2748774cdf8eeb99', '0x34b0bcb5e19b48a8', '0x391c0cb3c5c95a63', '0x4ed8aa4ae3418acb', '0x5b9cca4f7763e373', '0x682e6ff3d6b2b8a3', '0x748f82ee5defb2fc', '0x78a5636f43172f60', '0x84c87814a1f0ab72', '0x8cc702081a6439ec', '0x90befffa23631e28', '0xa4506cebde82bde9', '0xbef9a3f7b2c67915', '0xc67178f2e372532b', '0xca273eceea26619c', '0xd186b8c721c0c207', '0xeada7dd6cde0eb1e', '0xf57d4f7fee6ed178', '0x06f067aa72176fba', '0x0a637dc5a2c898a6', '0x113f9804bef90dae', '0x1b710b35131c471b', '0x28db77f523047d84', '0x32caab7b40c72493', '0x3c9ebe0a15c9bebc', '0x431d67c49c100d4c', '0x4cc5d4becb3e42b6', '0x597f299cfc657e2a', '0x5fcb6fab3ad6faec', '0x6c44198c4a475817'].map(n => BigInt(n)));

      const SHA512_W_H = new Uint32Array(80);
      const SHA512_W_L = new Uint32Array(80);

      class SHA512 extends _sha2_js_1.SHA2 {
        constructor() {
          super(128, 64, 16, false);
          this.Ah = 0x6a09e667 | 0;
          this.Al = 0xf3bcc908 | 0;
          this.Bh = 0xbb67ae85 | 0;
          this.Bl = 0x84caa73b | 0;
          this.Ch = 0x3c6ef372 | 0;
          this.Cl = 0xfe94f82b | 0;
          this.Dh = 0xa54ff53a | 0;
          this.Dl = 0x5f1d36f1 | 0;
          this.Eh = 0x510e527f | 0;
          this.El = 0xade682d1 | 0;
          this.Fh = 0x9b05688c | 0;
          this.Fl = 0x2b3e6c1f | 0;
          this.Gh = 0x1f83d9ab | 0;
          this.Gl = 0xfb41bd6b | 0;
          this.Hh = 0x5be0cd19 | 0;
          this.Hl = 0x137e2179 | 0;
        }

        get() {
          const {
            Ah,
            Al,
            Bh,
            Bl,
            Ch,
            Cl,
            Dh,
            Dl,
            Eh,
            El,
            Fh,
            Fl,
            Gh,
            Gl,
            Hh,
            Hl
          } = this;
          return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
        }

        set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
          this.Ah = Ah | 0;
          this.Al = Al | 0;
          this.Bh = Bh | 0;
          this.Bl = Bl | 0;
          this.Ch = Ch | 0;
          this.Cl = Cl | 0;
          this.Dh = Dh | 0;
          this.Dl = Dl | 0;
          this.Eh = Eh | 0;
          this.El = El | 0;
          this.Fh = Fh | 0;
          this.Fl = Fl | 0;
          this.Gh = Gh | 0;
          this.Gl = Gl | 0;
          this.Hh = Hh | 0;
          this.Hl = Hl | 0;
        }

        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) {
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32(offset += 4);
          }

          for (let i = 16; i < 80; i++) {
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;

            const s0h = _u64_js_1.default.rotrSH(W15h, W15l, 1) ^ _u64_js_1.default.rotrSH(W15h, W15l, 8) ^ _u64_js_1.default.shrSH(W15h, W15l, 7);

            const s0l = _u64_js_1.default.rotrSL(W15h, W15l, 1) ^ _u64_js_1.default.rotrSL(W15h, W15l, 8) ^ _u64_js_1.default.shrSL(W15h, W15l, 7);

            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;

            const s1h = _u64_js_1.default.rotrSH(W2h, W2l, 19) ^ _u64_js_1.default.rotrBH(W2h, W2l, 61) ^ _u64_js_1.default.shrSH(W2h, W2l, 6);

            const s1l = _u64_js_1.default.rotrSL(W2h, W2l, 19) ^ _u64_js_1.default.rotrBL(W2h, W2l, 61) ^ _u64_js_1.default.shrSL(W2h, W2l, 6);

            const SUMl = _u64_js_1.default.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);

            const SUMh = _u64_js_1.default.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);

            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
          }

          let {
            Ah,
            Al,
            Bh,
            Bl,
            Ch,
            Cl,
            Dh,
            Dl,
            Eh,
            El,
            Fh,
            Fl,
            Gh,
            Gl,
            Hh,
            Hl
          } = this;

          for (let i = 0; i < 80; i++) {
            const sigma1h = _u64_js_1.default.rotrSH(Eh, El, 14) ^ _u64_js_1.default.rotrSH(Eh, El, 18) ^ _u64_js_1.default.rotrBH(Eh, El, 41);

            const sigma1l = _u64_js_1.default.rotrSL(Eh, El, 14) ^ _u64_js_1.default.rotrSL(Eh, El, 18) ^ _u64_js_1.default.rotrBL(Eh, El, 41);

            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;

            const T1ll = _u64_js_1.default.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);

            const T1h = _u64_js_1.default.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);

            const T1l = T1ll | 0;

            const sigma0h = _u64_js_1.default.rotrSH(Ah, Al, 28) ^ _u64_js_1.default.rotrBH(Ah, Al, 34) ^ _u64_js_1.default.rotrBH(Ah, Al, 39);

            const sigma0l = _u64_js_1.default.rotrSL(Ah, Al, 28) ^ _u64_js_1.default.rotrBL(Ah, Al, 34) ^ _u64_js_1.default.rotrBL(Ah, Al, 39);

            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({
              h: Eh,
              l: El
            } = _u64_js_1.default.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;

            const All = _u64_js_1.default.add3L(T1l, sigma0l, MAJl);

            Ah = _u64_js_1.default.add3H(All, T1h, sigma0h, MAJh);
            Al = All | 0;
          }

          ({
            h: Ah,
            l: Al
          } = _u64_js_1.default.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
          ({
            h: Bh,
            l: Bl
          } = _u64_js_1.default.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
          ({
            h: Ch,
            l: Cl
          } = _u64_js_1.default.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
          ({
            h: Dh,
            l: Dl
          } = _u64_js_1.default.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
          ({
            h: Eh,
            l: El
          } = _u64_js_1.default.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
          ({
            h: Fh,
            l: Fl
          } = _u64_js_1.default.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
          ({
            h: Gh,
            l: Gl
          } = _u64_js_1.default.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
          ({
            h: Hh,
            l: Hl
          } = _u64_js_1.default.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
          this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
        }

        roundClean() {
          SHA512_W_H.fill(0);
          SHA512_W_L.fill(0);
        }

        destroy() {
          this.buffer.fill(0);
          this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }

      }

      exports.SHA512 = SHA512;

      class SHA512_256 extends SHA512 {
        constructor() {
          super();
          this.Ah = 0x22312194 | 0;
          this.Al = 0xfc2bf72c | 0;
          this.Bh = 0x9f555fa3 | 0;
          this.Bl = 0xc84c64c2 | 0;
          this.Ch = 0x2393b86b | 0;
          this.Cl = 0x6f53b151 | 0;
          this.Dh = 0x96387719 | 0;
          this.Dl = 0x5940eabd | 0;
          this.Eh = 0x96283ee2 | 0;
          this.El = 0xa88effe3 | 0;
          this.Fh = 0xbe5e1e25 | 0;
          this.Fl = 0x53863992 | 0;
          this.Gh = 0x2b0199fc | 0;
          this.Gl = 0x2c85b8aa | 0;
          this.Hh = 0x0eb72ddc | 0;
          this.Hl = 0x81c52ca2 | 0;
          this.outputLen = 32;
        }

      }

      class SHA384 extends SHA512 {
        constructor() {
          super();
          this.Ah = 0xcbbb9d5d | 0;
          this.Al = 0xc1059ed8 | 0;
          this.Bh = 0x629a292a | 0;
          this.Bl = 0x367cd507 | 0;
          this.Ch = 0x9159015a | 0;
          this.Cl = 0x3070dd17 | 0;
          this.Dh = 0x152fecd8 | 0;
          this.Dl = 0xf70e5939 | 0;
          this.Eh = 0x67332667 | 0;
          this.El = 0xffc00b31 | 0;
          this.Fh = 0x8eb44a87 | 0;
          this.Fl = 0x68581511 | 0;
          this.Gh = 0xdb0c2e0d | 0;
          this.Gl = 0x64f98fa7 | 0;
          this.Hh = 0x47b5481d | 0;
          this.Hl = 0xbefa4fa4 | 0;
          this.outputLen = 48;
        }

      }

      exports.sha512 = (0, utils_js_1.wrapConstructor)(() => new SHA512());
      exports.sha512_256 = (0, utils_js_1.wrapConstructor)(() => new SHA512_256());
      exports.sha384 = (0, utils_js_1.wrapConstructor)(() => new SHA384());
    }, {
      "./_sha2.js": 18,
      "./_u64.js": 19,
      "./utils.js": 27
    }],
    27: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.randomBytes = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.isLE = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;

      const crypto_1 = require("@noble/hashes/crypto");

      const u8 = arr => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);

      exports.u8 = u8;

      const u32 = arr => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));

      exports.u32 = u32;

      const createView = arr => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);

      exports.createView = createView;

      const rotr = (word, shift) => word << 32 - shift | word >>> shift;

      exports.rotr = rotr;
      exports.isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
      if (!exports.isLE) throw new Error('Non little-endian hardware is not supported');
      const hexes = Array.from({
        length: 256
      }, (v, i) => i.toString(16).padStart(2, '0'));

      function bytesToHex(uint8a) {
        if (!(uint8a instanceof Uint8Array)) throw new Error('Uint8Array expected');
        let hex = '';

        for (let i = 0; i < uint8a.length; i++) {
          hex += hexes[uint8a[i]];
        }

        return hex;
      }

      exports.bytesToHex = bytesToHex;

      function hexToBytes(hex) {
        if (typeof hex !== 'string') {
          throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
        }

        if (hex.length % 2) throw new Error('hexToBytes: received invalid unpadded hex');
        const array = new Uint8Array(hex.length / 2);

        for (let i = 0; i < array.length; i++) {
          const j = i * 2;
          const hexByte = hex.slice(j, j + 2);
          const byte = Number.parseInt(hexByte, 16);
          if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
          array[i] = byte;
        }

        return array;
      }

      exports.hexToBytes = hexToBytes;

      const nextTick = async () => {};

      exports.nextTick = nextTick;

      async function asyncLoop(iters, tick, cb) {
        let ts = Date.now();

        for (let i = 0; i < iters; i++) {
          cb(i);
          const diff = Date.now() - ts;
          if (diff >= 0 && diff < tick) continue;
          await (0, exports.nextTick)();
          ts += diff;
        }
      }

      exports.asyncLoop = asyncLoop;

      function utf8ToBytes(str) {
        if (typeof str !== 'string') {
          throw new TypeError(`utf8ToBytes expected string, got ${typeof str}`);
        }

        return new TextEncoder().encode(str);
      }

      exports.utf8ToBytes = utf8ToBytes;

      function toBytes(data) {
        if (typeof data === 'string') data = utf8ToBytes(data);
        if (!(data instanceof Uint8Array)) throw new TypeError(`Expected input type is Uint8Array (got ${typeof data})`);
        return data;
      }

      exports.toBytes = toBytes;

      function concatBytes(...arrays) {
        if (!arrays.every(a => a instanceof Uint8Array)) throw new Error('Uint8Array list expected');
        if (arrays.length === 1) return arrays[0];
        const length = arrays.reduce((a, arr) => a + arr.length, 0);
        const result = new Uint8Array(length);

        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const arr = arrays[i];
          result.set(arr, pad);
          pad += arr.length;
        }

        return result;
      }

      exports.concatBytes = concatBytes;

      class Hash {
        clone() {
          return this._cloneInto();
        }

      }

      exports.Hash = Hash;

      const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]' && obj.constructor === Object;

      function checkOpts(defaults, opts) {
        if (opts !== undefined && (typeof opts !== 'object' || !isPlainObject(opts))) throw new TypeError('Options should be object or undefined');
        const merged = Object.assign(defaults, opts);
        return merged;
      }

      exports.checkOpts = checkOpts;

      function wrapConstructor(hashConstructor) {
        const hashC = message => hashConstructor().update(toBytes(message)).digest();

        const tmp = hashConstructor();
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;

        hashC.create = () => hashConstructor();

        return hashC;
      }

      exports.wrapConstructor = wrapConstructor;

      function wrapConstructorWithOpts(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();

        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;

        hashC.create = opts => hashCons(opts);

        return hashC;
      }

      exports.wrapConstructorWithOpts = wrapConstructorWithOpts;

      function randomBytes(bytesLength = 32) {
        if (crypto_1.crypto.web) {
          return crypto_1.crypto.web.getRandomValues(new Uint8Array(bytesLength));
        } else if (crypto_1.crypto.node) {
          return new Uint8Array(crypto_1.crypto.node.randomBytes(bytesLength).buffer);
        } else {
          throw new Error("The environment doesn't have randomBytes function");
        }
      }

      exports.randomBytes = randomBytes;
    }, {
      "@noble/hashes/crypto": 20
    }],
    28: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.utils = exports.schnorr = exports.verify = exports.signSync = exports.sign = exports.getSharedSecret = exports.recoverPublicKey = exports.getPublicKey = exports.Signature = exports.Point = exports.CURVE = void 0;

      const nodeCrypto = require("crypto");

      const _0n = BigInt(0);

      const _1n = BigInt(1);

      const _2n = BigInt(2);

      const _3n = BigInt(3);

      const _8n = BigInt(8);

      const POW_2_256 = _2n ** BigInt(256);

      const CURVE = {
        a: _0n,
        b: BigInt(7),
        P: POW_2_256 - _2n ** BigInt(32) - BigInt(977),
        n: POW_2_256 - BigInt('432420386565659656852420866394968145599'),
        h: _1n,
        Gx: BigInt('55066263022277343669578718895168534326250603453777594175500187360389116729240'),
        Gy: BigInt('32670510020758816978083085130507043184471273380659243275938904335757337482424'),
        beta: BigInt('0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee')
      };
      exports.CURVE = CURVE;

      function weistrass(x) {
        const {
          a,
          b
        } = CURVE;
        const x2 = mod(x * x);
        const x3 = mod(x2 * x);
        return mod(x3 + a * x + b);
      }

      const USE_ENDOMORPHISM = CURVE.a === _0n;

      class JacobianPoint {
        constructor(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
        }

        static fromAffine(p) {
          if (!(p instanceof Point)) {
            throw new TypeError('JacobianPoint#fromAffine: expected Point');
          }

          return new JacobianPoint(p.x, p.y, _1n);
        }

        static toAffineBatch(points) {
          const toInv = invertBatch(points.map(p => p.z));
          return points.map((p, i) => p.toAffine(toInv[i]));
        }

        static normalizeZ(points) {
          return JacobianPoint.toAffineBatch(points).map(JacobianPoint.fromAffine);
        }

        equals(other) {
          if (!(other instanceof JacobianPoint)) throw new TypeError('JacobianPoint expected');
          const {
            x: X1,
            y: Y1,
            z: Z1
          } = this;
          const {
            x: X2,
            y: Y2,
            z: Z2
          } = other;
          const Z1Z1 = mod(Z1 ** _2n);
          const Z2Z2 = mod(Z2 ** _2n);
          const U1 = mod(X1 * Z2Z2);
          const U2 = mod(X2 * Z1Z1);
          const S1 = mod(mod(Y1 * Z2) * Z2Z2);
          const S2 = mod(mod(Y2 * Z1) * Z1Z1);
          return U1 === U2 && S1 === S2;
        }

        negate() {
          return new JacobianPoint(this.x, mod(-this.y), this.z);
        }

        double() {
          const {
            x: X1,
            y: Y1,
            z: Z1
          } = this;
          const A = mod(X1 ** _2n);
          const B = mod(Y1 ** _2n);
          const C = mod(B ** _2n);
          const D = mod(_2n * (mod((X1 + B) ** _2n) - A - C));
          const E = mod(_3n * A);
          const F = mod(E ** _2n);
          const X3 = mod(F - _2n * D);
          const Y3 = mod(E * (D - X3) - _8n * C);
          const Z3 = mod(_2n * Y1 * Z1);
          return new JacobianPoint(X3, Y3, Z3);
        }

        add(other) {
          if (!(other instanceof JacobianPoint)) throw new TypeError('JacobianPoint expected');
          const {
            x: X1,
            y: Y1,
            z: Z1
          } = this;
          const {
            x: X2,
            y: Y2,
            z: Z2
          } = other;
          if (X2 === _0n || Y2 === _0n) return this;
          if (X1 === _0n || Y1 === _0n) return other;
          const Z1Z1 = mod(Z1 ** _2n);
          const Z2Z2 = mod(Z2 ** _2n);
          const U1 = mod(X1 * Z2Z2);
          const U2 = mod(X2 * Z1Z1);
          const S1 = mod(mod(Y1 * Z2) * Z2Z2);
          const S2 = mod(mod(Y2 * Z1) * Z1Z1);
          const H = mod(U2 - U1);
          const r = mod(S2 - S1);

          if (H === _0n) {
            if (r === _0n) {
              return this.double();
            } else {
              return JacobianPoint.ZERO;
            }
          }

          const HH = mod(H ** _2n);
          const HHH = mod(H * HH);
          const V = mod(U1 * HH);
          const X3 = mod(r ** _2n - HHH - _2n * V);
          const Y3 = mod(r * (V - X3) - S1 * HHH);
          const Z3 = mod(Z1 * Z2 * H);
          return new JacobianPoint(X3, Y3, Z3);
        }

        subtract(other) {
          return this.add(other.negate());
        }

        multiplyUnsafe(scalar) {
          const P0 = JacobianPoint.ZERO;
          if (typeof scalar === 'bigint' && scalar === _0n) return P0;
          let n = normalizeScalar(scalar);
          if (n === _1n) return this;

          if (!USE_ENDOMORPHISM) {
            let p = P0;
            let d = this;

            while (n > _0n) {
              if (n & _1n) p = p.add(d);
              d = d.double();
              n >>= _1n;
            }

            return p;
          }

          let {
            k1neg,
            k1,
            k2neg,
            k2
          } = splitScalarEndo(n);
          let k1p = P0;
          let k2p = P0;
          let d = this;

          while (k1 > _0n || k2 > _0n) {
            if (k1 & _1n) k1p = k1p.add(d);
            if (k2 & _1n) k2p = k2p.add(d);
            d = d.double();
            k1 >>= _1n;
            k2 >>= _1n;
          }

          if (k1neg) k1p = k1p.negate();
          if (k2neg) k2p = k2p.negate();
          k2p = new JacobianPoint(mod(k2p.x * CURVE.beta), k2p.y, k2p.z);
          return k1p.add(k2p);
        }

        precomputeWindow(W) {
          const windows = USE_ENDOMORPHISM ? 128 / W + 1 : 256 / W + 1;
          const points = [];
          let p = this;
          let base = p;

          for (let window = 0; window < windows; window++) {
            base = p;
            points.push(base);

            for (let i = 1; i < 2 ** (W - 1); i++) {
              base = base.add(p);
              points.push(base);
            }

            p = base.double();
          }

          return points;
        }

        wNAF(n, affinePoint) {
          if (!affinePoint && this.equals(JacobianPoint.BASE)) affinePoint = Point.BASE;
          const W = affinePoint && affinePoint._WINDOW_SIZE || 1;

          if (256 % W) {
            throw new Error('Point#wNAF: Invalid precomputation window, must be power of 2');
          }

          let precomputes = affinePoint && pointPrecomputes.get(affinePoint);

          if (!precomputes) {
            precomputes = this.precomputeWindow(W);

            if (affinePoint && W !== 1) {
              precomputes = JacobianPoint.normalizeZ(precomputes);
              pointPrecomputes.set(affinePoint, precomputes);
            }
          }

          let p = JacobianPoint.ZERO;
          let f = JacobianPoint.ZERO;
          const windows = 1 + (USE_ENDOMORPHISM ? 128 / W : 256 / W);
          const windowSize = 2 ** (W - 1);
          const mask = BigInt(2 ** W - 1);
          const maxNumber = 2 ** W;
          const shiftBy = BigInt(W);

          for (let window = 0; window < windows; window++) {
            const offset = window * windowSize;
            let wbits = Number(n & mask);
            n >>= shiftBy;

            if (wbits > windowSize) {
              wbits -= maxNumber;
              n += _1n;
            }

            if (wbits === 0) {
              let pr = precomputes[offset];
              if (window % 2) pr = pr.negate();
              f = f.add(pr);
            } else {
              let cached = precomputes[offset + Math.abs(wbits) - 1];
              if (wbits < 0) cached = cached.negate();
              p = p.add(cached);
            }
          }

          return {
            p,
            f
          };
        }

        multiply(scalar, affinePoint) {
          let n = normalizeScalar(scalar);
          let point;
          let fake;

          if (USE_ENDOMORPHISM) {
            const {
              k1neg,
              k1,
              k2neg,
              k2
            } = splitScalarEndo(n);
            let {
              p: k1p,
              f: f1p
            } = this.wNAF(k1, affinePoint);
            let {
              p: k2p,
              f: f2p
            } = this.wNAF(k2, affinePoint);
            if (k1neg) k1p = k1p.negate();
            if (k2neg) k2p = k2p.negate();
            k2p = new JacobianPoint(mod(k2p.x * CURVE.beta), k2p.y, k2p.z);
            point = k1p.add(k2p);
            fake = f1p.add(f2p);
          } else {
            const {
              p,
              f
            } = this.wNAF(n, affinePoint);
            point = p;
            fake = f;
          }

          return JacobianPoint.normalizeZ([point, fake])[0];
        }

        toAffine(invZ = invert(this.z)) {
          const {
            x,
            y,
            z
          } = this;
          const iz1 = invZ;
          const iz2 = mod(iz1 * iz1);
          const iz3 = mod(iz2 * iz1);
          const ax = mod(x * iz2);
          const ay = mod(y * iz3);
          const zz = mod(z * iz1);
          if (zz !== _1n) throw new Error('invZ was invalid');
          return new Point(ax, ay);
        }

      }

      JacobianPoint.BASE = new JacobianPoint(CURVE.Gx, CURVE.Gy, _1n);
      JacobianPoint.ZERO = new JacobianPoint(_0n, _1n, _0n);
      const pointPrecomputes = new WeakMap();

      class Point {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }

        _setWindowSize(windowSize) {
          this._WINDOW_SIZE = windowSize;
          pointPrecomputes.delete(this);
        }

        static fromCompressedHex(bytes) {
          const isShort = bytes.length === 32;
          const x = bytesToNumber(isShort ? bytes : bytes.subarray(1));
          if (!isValidFieldElement(x)) throw new Error('Point is not on curve');
          const y2 = weistrass(x);
          let y = sqrtMod(y2);
          const isYOdd = (y & _1n) === _1n;

          if (isShort) {
            if (isYOdd) y = mod(-y);
          } else {
            const isFirstByteOdd = (bytes[0] & 1) === 1;
            if (isFirstByteOdd !== isYOdd) y = mod(-y);
          }

          const point = new Point(x, y);
          point.assertValidity();
          return point;
        }

        static fromUncompressedHex(bytes) {
          const x = bytesToNumber(bytes.subarray(1, 33));
          const y = bytesToNumber(bytes.subarray(33, 65));
          const point = new Point(x, y);
          point.assertValidity();
          return point;
        }

        static fromHex(hex) {
          const bytes = ensureBytes(hex);
          const len = bytes.length;
          const header = bytes[0];

          if (len === 32 || len === 33 && (header === 0x02 || header === 0x03)) {
            return this.fromCompressedHex(bytes);
          }

          if (len === 65 && header === 0x04) return this.fromUncompressedHex(bytes);
          throw new Error(`Point.fromHex: received invalid point. Expected 32-33 compressed bytes or 65 uncompressed bytes, not ${len}`);
        }

        static fromPrivateKey(privateKey) {
          return Point.BASE.multiply(normalizePrivateKey(privateKey));
        }

        static fromSignature(msgHash, signature, recovery) {
          msgHash = ensureBytes(msgHash);
          const h = truncateHash(msgHash);
          const {
            r,
            s
          } = normalizeSignature(signature);

          if (recovery !== 0 && recovery !== 1) {
            throw new Error('Cannot recover signature: invalid recovery bit');
          }

          const prefix = recovery & 1 ? '03' : '02';
          const R = Point.fromHex(prefix + numTo32bStr(r));
          const {
            n
          } = CURVE;
          const rinv = invert(r, n);
          const u1 = mod(-h * rinv, n);
          const u2 = mod(s * rinv, n);
          const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
          if (!Q) throw new Error('Cannot recover signature: point at infinify');
          Q.assertValidity();
          return Q;
        }

        toRawBytes(isCompressed = false) {
          return hexToBytes(this.toHex(isCompressed));
        }

        toHex(isCompressed = false) {
          const x = numTo32bStr(this.x);

          if (isCompressed) {
            const prefix = this.y & _1n ? '03' : '02';
            return `${prefix}${x}`;
          } else {
            return `04${x}${numTo32bStr(this.y)}`;
          }
        }

        toHexX() {
          return this.toHex(true).slice(2);
        }

        toRawX() {
          return this.toRawBytes(true).slice(1);
        }

        assertValidity() {
          const msg = 'Point is not on elliptic curve';
          const {
            x,
            y
          } = this;
          if (!isValidFieldElement(x) || !isValidFieldElement(y)) throw new Error(msg);
          const left = mod(y * y);
          const right = weistrass(x);
          if (mod(left - right) !== _0n) throw new Error(msg);
        }

        equals(other) {
          return this.x === other.x && this.y === other.y;
        }

        negate() {
          return new Point(this.x, mod(-this.y));
        }

        double() {
          return JacobianPoint.fromAffine(this).double().toAffine();
        }

        add(other) {
          return JacobianPoint.fromAffine(this).add(JacobianPoint.fromAffine(other)).toAffine();
        }

        subtract(other) {
          return this.add(other.negate());
        }

        multiply(scalar) {
          return JacobianPoint.fromAffine(this).multiply(scalar, this).toAffine();
        }

        multiplyAndAddUnsafe(Q, a, b) {
          const P = JacobianPoint.fromAffine(this);
          const aP = a === _0n || a === _1n || this !== Point.BASE ? P.multiplyUnsafe(a) : P.multiply(a);
          const bQ = JacobianPoint.fromAffine(Q).multiplyUnsafe(b);
          const sum = aP.add(bQ);
          return sum.equals(JacobianPoint.ZERO) ? undefined : sum.toAffine();
        }

      }

      exports.Point = Point;
      Point.BASE = new Point(CURVE.Gx, CURVE.Gy);
      Point.ZERO = new Point(_0n, _0n);

      function sliceDER(s) {
        return Number.parseInt(s[0], 16) >= 8 ? '00' + s : s;
      }

      function parseDERInt(data) {
        if (data.length < 2 || data[0] !== 0x02) {
          throw new Error(`Invalid signature integer tag: ${bytesToHex(data)}`);
        }

        const len = data[1];
        const res = data.subarray(2, len + 2);

        if (!len || res.length !== len) {
          throw new Error(`Invalid signature integer: wrong length`);
        }

        if (res[0] === 0x00 && res[1] <= 0x7f) {
          throw new Error('Invalid signature integer: trailing length');
        }

        return {
          data: bytesToNumber(res),
          left: data.subarray(len + 2)
        };
      }

      function parseDERSignature(data) {
        if (data.length < 2 || data[0] != 0x30) {
          throw new Error(`Invalid signature tag: ${bytesToHex(data)}`);
        }

        if (data[1] !== data.length - 2) {
          throw new Error('Invalid signature: incorrect length');
        }

        const {
          data: r,
          left: sBytes
        } = parseDERInt(data.subarray(2));
        const {
          data: s,
          left: rBytesLeft
        } = parseDERInt(sBytes);

        if (rBytesLeft.length) {
          throw new Error(`Invalid signature: left bytes after parsing: ${bytesToHex(rBytesLeft)}`);
        }

        return {
          r,
          s
        };
      }

      class Signature {
        constructor(r, s) {
          this.r = r;
          this.s = s;
          this.assertValidity();
        }

        static fromCompact(hex) {
          const arr = isUint8a(hex);
          const name = 'Signature.fromCompact';
          if (typeof hex !== 'string' && !arr) throw new TypeError(`${name}: Expected string or Uint8Array`);
          const str = arr ? bytesToHex(hex) : hex;
          if (str.length !== 128) throw new Error(`${name}: Expected 64-byte hex`);
          return new Signature(hexToNumber(str.slice(0, 64)), hexToNumber(str.slice(64, 128)));
        }

        static fromDER(hex) {
          const arr = isUint8a(hex);
          if (typeof hex !== 'string' && !arr) throw new TypeError(`Signature.fromDER: Expected string or Uint8Array`);
          const {
            r,
            s
          } = parseDERSignature(arr ? hex : hexToBytes(hex));
          return new Signature(r, s);
        }

        static fromHex(hex) {
          return this.fromDER(hex);
        }

        assertValidity() {
          const {
            r,
            s
          } = this;
          if (!isWithinCurveOrder(r)) throw new Error('Invalid Signature: r must be 0 < r < n');
          if (!isWithinCurveOrder(s)) throw new Error('Invalid Signature: s must be 0 < s < n');
        }

        hasHighS() {
          const HALF = CURVE.n >> _1n;
          return this.s > HALF;
        }

        normalizeS() {
          return this.hasHighS() ? new Signature(this.r, CURVE.n - this.s) : this;
        }

        toDERRawBytes(isCompressed = false) {
          return hexToBytes(this.toDERHex(isCompressed));
        }

        toDERHex(isCompressed = false) {
          const sHex = sliceDER(numberToHexUnpadded(this.s));
          if (isCompressed) return sHex;
          const rHex = sliceDER(numberToHexUnpadded(this.r));
          const rLen = numberToHexUnpadded(rHex.length / 2);
          const sLen = numberToHexUnpadded(sHex.length / 2);
          const length = numberToHexUnpadded(rHex.length / 2 + sHex.length / 2 + 4);
          return `30${length}02${rLen}${rHex}02${sLen}${sHex}`;
        }

        toRawBytes() {
          return this.toDERRawBytes();
        }

        toHex() {
          return this.toDERHex();
        }

        toCompactRawBytes() {
          return hexToBytes(this.toCompactHex());
        }

        toCompactHex() {
          return numTo32bStr(this.r) + numTo32bStr(this.s);
        }

      }

      exports.Signature = Signature;

      function concatBytes(...arrays) {
        if (!arrays.every(isUint8a)) throw new Error('Uint8Array list expected');
        if (arrays.length === 1) return arrays[0];
        const length = arrays.reduce((a, arr) => a + arr.length, 0);
        const result = new Uint8Array(length);

        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const arr = arrays[i];
          result.set(arr, pad);
          pad += arr.length;
        }

        return result;
      }

      function isUint8a(bytes) {
        return bytes instanceof Uint8Array;
      }

      const hexes = Array.from({
        length: 256
      }, (v, i) => i.toString(16).padStart(2, '0'));

      function bytesToHex(uint8a) {
        if (!(uint8a instanceof Uint8Array)) throw new Error('Expected Uint8Array');
        let hex = '';

        for (let i = 0; i < uint8a.length; i++) {
          hex += hexes[uint8a[i]];
        }

        return hex;
      }

      function numTo32bStr(num) {
        if (num > POW_2_256) throw new Error('Expected number < 2^256');
        return num.toString(16).padStart(64, '0');
      }

      function numTo32b(num) {
        return hexToBytes(numTo32bStr(num));
      }

      function numberToHexUnpadded(num) {
        const hex = num.toString(16);
        return hex.length & 1 ? `0${hex}` : hex;
      }

      function hexToNumber(hex) {
        if (typeof hex !== 'string') {
          throw new TypeError('hexToNumber: expected string, got ' + typeof hex);
        }

        return BigInt(`0x${hex}`);
      }

      function hexToBytes(hex) {
        if (typeof hex !== 'string') {
          throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
        }

        if (hex.length % 2) throw new Error('hexToBytes: received invalid unpadded hex' + hex.length);
        const array = new Uint8Array(hex.length / 2);

        for (let i = 0; i < array.length; i++) {
          const j = i * 2;
          const hexByte = hex.slice(j, j + 2);
          const byte = Number.parseInt(hexByte, 16);
          if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
          array[i] = byte;
        }

        return array;
      }

      function bytesToNumber(bytes) {
        return hexToNumber(bytesToHex(bytes));
      }

      function ensureBytes(hex) {
        return hex instanceof Uint8Array ? Uint8Array.from(hex) : hexToBytes(hex);
      }

      function normalizeScalar(num) {
        if (typeof num === 'number' && Number.isSafeInteger(num) && num > 0) return BigInt(num);
        if (typeof num === 'bigint' && isWithinCurveOrder(num)) return num;
        throw new TypeError('Expected valid private scalar: 0 < scalar < curve.n');
      }

      function mod(a, b = CURVE.P) {
        const result = a % b;
        return result >= _0n ? result : b + result;
      }

      function pow2(x, power) {
        const {
          P
        } = CURVE;
        let res = x;

        while (power-- > _0n) {
          res *= res;
          res %= P;
        }

        return res;
      }

      function sqrtMod(x) {
        const {
          P
        } = CURVE;

        const _6n = BigInt(6);

        const _11n = BigInt(11);

        const _22n = BigInt(22);

        const _23n = BigInt(23);

        const _44n = BigInt(44);

        const _88n = BigInt(88);

        const b2 = x * x * x % P;
        const b3 = b2 * b2 * x % P;
        const b6 = pow2(b3, _3n) * b3 % P;
        const b9 = pow2(b6, _3n) * b3 % P;
        const b11 = pow2(b9, _2n) * b2 % P;
        const b22 = pow2(b11, _11n) * b11 % P;
        const b44 = pow2(b22, _22n) * b22 % P;
        const b88 = pow2(b44, _44n) * b44 % P;
        const b176 = pow2(b88, _88n) * b88 % P;
        const b220 = pow2(b176, _44n) * b44 % P;
        const b223 = pow2(b220, _3n) * b3 % P;
        const t1 = pow2(b223, _23n) * b22 % P;
        const t2 = pow2(t1, _6n) * b2 % P;
        return pow2(t2, _2n);
      }

      function invert(number, modulo = CURVE.P) {
        if (number === _0n || modulo <= _0n) {
          throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
        }

        let a = mod(number, modulo);
        let b = modulo;
        let x = _0n,
            y = _1n,
            u = _1n,
            v = _0n;

        while (a !== _0n) {
          const q = b / a;
          const r = b % a;
          const m = x - u * q;
          const n = y - v * q;
          b = a, a = r, x = u, y = v, u = m, v = n;
        }

        const gcd = b;
        if (gcd !== _1n) throw new Error('invert: does not exist');
        return mod(x, modulo);
      }

      function invertBatch(nums, p = CURVE.P) {
        const scratch = new Array(nums.length);
        const lastMultiplied = nums.reduce((acc, num, i) => {
          if (num === _0n) return acc;
          scratch[i] = acc;
          return mod(acc * num, p);
        }, _1n);
        const inverted = invert(lastMultiplied, p);
        nums.reduceRight((acc, num, i) => {
          if (num === _0n) return acc;
          scratch[i] = mod(acc * scratch[i], p);
          return mod(acc * num, p);
        }, inverted);
        return scratch;
      }

      const divNearest = (a, b) => (a + b / _2n) / b;

      const POW_2_128 = _2n ** BigInt(128);

      function splitScalarEndo(k) {
        const {
          n
        } = CURVE;
        const a1 = BigInt('0x3086d221a7d46bcde86c90e49284eb15');
        const b1 = -_1n * BigInt('0xe4437ed6010e88286f547fa90abfe4c3');
        const a2 = BigInt('0x114ca50f7a8e2f3f657c1108d9d44cfd8');
        const b2 = a1;
        const c1 = divNearest(b2 * k, n);
        const c2 = divNearest(-b1 * k, n);
        let k1 = mod(k - c1 * a1 - c2 * a2, n);
        let k2 = mod(-c1 * b1 - c2 * b2, n);
        const k1neg = k1 > POW_2_128;
        const k2neg = k2 > POW_2_128;
        if (k1neg) k1 = n - k1;
        if (k2neg) k2 = n - k2;

        if (k1 > POW_2_128 || k2 > POW_2_128) {
          throw new Error('splitScalarEndo: Endomorphism failed, k=' + k);
        }

        return {
          k1neg,
          k1,
          k2neg,
          k2
        };
      }

      function truncateHash(hash) {
        const {
          n
        } = CURVE;
        const byteLength = hash.length;
        const delta = byteLength * 8 - 256;
        let h = bytesToNumber(hash);
        if (delta > 0) h = h >> BigInt(delta);
        if (h >= n) h -= n;
        return h;
      }

      class HmacDrbg {
        constructor() {
          this.v = new Uint8Array(32).fill(1);
          this.k = new Uint8Array(32).fill(0);
          this.counter = 0;
        }

        hmac(...values) {
          return exports.utils.hmacSha256(this.k, ...values);
        }

        hmacSync(...values) {
          if (typeof exports.utils.hmacSha256Sync !== 'function') throw new Error('utils.hmacSha256Sync is undefined, you need to set it');
          const res = exports.utils.hmacSha256Sync(this.k, ...values);
          if (res instanceof Promise) throw new Error('To use sync sign(), ensure utils.hmacSha256 is sync');
          return res;
        }

        incr() {
          if (this.counter >= 1000) {
            throw new Error('Tried 1,000 k values for sign(), all were invalid');
          }

          this.counter += 1;
        }

        async reseed(seed = new Uint8Array()) {
          this.k = await this.hmac(this.v, Uint8Array.from([0x00]), seed);
          this.v = await this.hmac(this.v);
          if (seed.length === 0) return;
          this.k = await this.hmac(this.v, Uint8Array.from([0x01]), seed);
          this.v = await this.hmac(this.v);
        }

        reseedSync(seed = new Uint8Array()) {
          this.k = this.hmacSync(this.v, Uint8Array.from([0x00]), seed);
          this.v = this.hmacSync(this.v);
          if (seed.length === 0) return;
          this.k = this.hmacSync(this.v, Uint8Array.from([0x01]), seed);
          this.v = this.hmacSync(this.v);
        }

        async generate() {
          this.incr();
          this.v = await this.hmac(this.v);
          return this.v;
        }

        generateSync() {
          this.incr();
          this.v = this.hmacSync(this.v);
          return this.v;
        }

      }

      function isWithinCurveOrder(num) {
        return _0n < num && num < CURVE.n;
      }

      function isValidFieldElement(num) {
        return _0n < num && num < CURVE.P;
      }

      function kmdToSig(kBytes, m, d) {
        const k = bytesToNumber(kBytes);
        if (!isWithinCurveOrder(k)) return;
        const {
          n
        } = CURVE;
        const q = Point.BASE.multiply(k);
        const r = mod(q.x, n);
        if (r === _0n) return;
        const s = mod(invert(k, n) * mod(m + d * r, n), n);
        if (s === _0n) return;
        const sig = new Signature(r, s);
        const recovery = (q.x === sig.r ? 0 : 2) | Number(q.y & _1n);
        return {
          sig,
          recovery
        };
      }

      function normalizePrivateKey(key) {
        let num;

        if (typeof key === 'bigint') {
          num = key;
        } else if (typeof key === 'number' && Number.isSafeInteger(key) && key > 0) {
          num = BigInt(key);
        } else if (typeof key === 'string') {
          if (key.length !== 64) throw new Error('Expected 32 bytes of private key');
          num = hexToNumber(key);
        } else if (isUint8a(key)) {
          if (key.length !== 32) throw new Error('Expected 32 bytes of private key');
          num = bytesToNumber(key);
        } else {
          throw new TypeError('Expected valid private key');
        }

        if (!isWithinCurveOrder(num)) throw new Error('Expected private key: 0 < key < n');
        return num;
      }

      function normalizePublicKey(publicKey) {
        if (publicKey instanceof Point) {
          publicKey.assertValidity();
          return publicKey;
        } else {
          return Point.fromHex(publicKey);
        }
      }

      function normalizeSignature(signature) {
        if (signature instanceof Signature) {
          signature.assertValidity();
          return signature;
        }

        try {
          return Signature.fromDER(signature);
        } catch (error) {
          return Signature.fromCompact(signature);
        }
      }

      function getPublicKey(privateKey, isCompressed = false) {
        return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
      }

      exports.getPublicKey = getPublicKey;

      function recoverPublicKey(msgHash, signature, recovery, isCompressed = false) {
        return Point.fromSignature(msgHash, signature, recovery).toRawBytes(isCompressed);
      }

      exports.recoverPublicKey = recoverPublicKey;

      function isPub(item) {
        const arr = isUint8a(item);
        const str = typeof item === 'string';
        const len = (arr || str) && item.length;
        if (arr) return len === 33 || len === 65;
        if (str) return len === 66 || len === 130;
        if (item instanceof Point) return true;
        return false;
      }

      function getSharedSecret(privateA, publicB, isCompressed = false) {
        if (isPub(privateA)) throw new TypeError('getSharedSecret: first arg must be private key');
        if (!isPub(publicB)) throw new TypeError('getSharedSecret: second arg must be public key');
        const b = normalizePublicKey(publicB);
        b.assertValidity();
        return b.multiply(normalizePrivateKey(privateA)).toRawBytes(isCompressed);
      }

      exports.getSharedSecret = getSharedSecret;

      function bits2int(bytes) {
        const slice = bytes.length > 32 ? bytes.slice(0, 32) : bytes;
        return bytesToNumber(slice);
      }

      function bits2octets(bytes) {
        const z1 = bits2int(bytes);
        const z2 = mod(z1, CURVE.n);
        return int2octets(z2 < _0n ? z1 : z2);
      }

      function int2octets(num) {
        if (typeof num !== 'bigint') throw new Error('Expected bigint');
        const hex = numTo32bStr(num);
        return hexToBytes(hex);
      }

      function initSigArgs(msgHash, privateKey, extraEntropy) {
        if (msgHash == null) throw new Error(`sign: expected valid message hash, not "${msgHash}"`);
        const h1 = ensureBytes(msgHash);
        const d = normalizePrivateKey(privateKey);
        const seedArgs = [int2octets(d), bits2octets(h1)];

        if (extraEntropy != null) {
          if (extraEntropy === true) extraEntropy = exports.utils.randomBytes(32);
          const e = ensureBytes(extraEntropy);
          if (e.length !== 32) throw new Error('sign: Expected 32 bytes of extra data');
          seedArgs.push(e);
        }

        const seed = concatBytes(...seedArgs);
        const m = bits2int(h1);
        return {
          seed,
          m,
          d
        };
      }

      function finalizeSig(recSig, opts) {
        let {
          sig,
          recovery
        } = recSig;
        const {
          canonical,
          der,
          recovered
        } = Object.assign({
          canonical: true,
          der: true
        }, opts);

        if (canonical && sig.hasHighS()) {
          sig = sig.normalizeS();
          recovery ^= 1;
        }

        const hashed = der ? sig.toDERRawBytes() : sig.toCompactRawBytes();
        return recovered ? [hashed, recovery] : hashed;
      }

      async function sign(msgHash, privKey, opts = {}) {
        const {
          seed,
          m,
          d
        } = initSigArgs(msgHash, privKey, opts.extraEntropy);
        let sig;
        const drbg = new HmacDrbg();
        await drbg.reseed(seed);

        while (!(sig = kmdToSig(await drbg.generate(), m, d))) await drbg.reseed();

        return finalizeSig(sig, opts);
      }

      exports.sign = sign;

      function signSync(msgHash, privKey, opts = {}) {
        const {
          seed,
          m,
          d
        } = initSigArgs(msgHash, privKey, opts.extraEntropy);
        let sig;
        const drbg = new HmacDrbg();
        drbg.reseedSync(seed);

        while (!(sig = kmdToSig(drbg.generateSync(), m, d))) drbg.reseedSync();

        return finalizeSig(sig, opts);
      }

      exports.signSync = signSync;
      const vopts = {
        strict: true
      };

      function verify(signature, msgHash, publicKey, opts = vopts) {
        let sig;

        try {
          sig = normalizeSignature(signature);
          msgHash = ensureBytes(msgHash);
        } catch (error) {
          return false;
        }

        const {
          r,
          s
        } = sig;
        if (opts.strict && sig.hasHighS()) return false;
        const h = truncateHash(msgHash);
        let P;

        try {
          P = normalizePublicKey(publicKey);
        } catch (error) {
          return false;
        }

        const {
          n
        } = CURVE;
        const sinv = invert(s, n);
        const u1 = mod(h * sinv, n);
        const u2 = mod(r * sinv, n);
        const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2);
        if (!R) return false;
        const v = mod(R.x, n);
        return v === r;
      }

      exports.verify = verify;

      function finalizeSchnorrChallenge(ch) {
        return mod(bytesToNumber(ch), CURVE.n);
      }

      function hasEvenY(point) {
        return (point.y & _1n) === _0n;
      }

      class SchnorrSignature {
        constructor(r, s) {
          this.r = r;
          this.s = s;
          this.assertValidity();
        }

        static fromHex(hex) {
          const bytes = ensureBytes(hex);
          if (bytes.length !== 64) throw new TypeError(`SchnorrSignature.fromHex: expected 64 bytes, not ${bytes.length}`);
          const r = bytesToNumber(bytes.subarray(0, 32));
          const s = bytesToNumber(bytes.subarray(32, 64));
          return new SchnorrSignature(r, s);
        }

        assertValidity() {
          const {
            r,
            s
          } = this;
          if (!isValidFieldElement(r) || !isWithinCurveOrder(s)) throw new Error('Invalid signature');
        }

        toHex() {
          return numTo32bStr(this.r) + numTo32bStr(this.s);
        }

        toRawBytes() {
          return hexToBytes(this.toHex());
        }

      }

      function schnorrGetPublicKey(privateKey) {
        return Point.fromPrivateKey(privateKey).toRawX();
      }

      function initSchnorrSigArgs(message, privateKey, auxRand) {
        if (message == null) throw new TypeError(`sign: Expected valid message, not "${message}"`);
        const m = ensureBytes(message);
        const d0 = normalizePrivateKey(privateKey);
        const rand = ensureBytes(auxRand);
        if (rand.length !== 32) throw new TypeError('sign: Expected 32 bytes of aux randomness');
        const P = Point.fromPrivateKey(d0);
        const px = P.toRawX();
        const d = hasEvenY(P) ? d0 : CURVE.n - d0;
        return {
          m,
          P,
          px,
          d,
          rand
        };
      }

      function initSchnorrNonce(d, t0h) {
        return numTo32b(d ^ bytesToNumber(t0h));
      }

      function finalizeSchnorrNonce(k0h) {
        const k0 = mod(bytesToNumber(k0h), CURVE.n);
        if (k0 === _0n) throw new Error('sign: Creation of signature failed. k is zero');
        const R = Point.fromPrivateKey(k0);
        const rx = R.toRawX();
        const k = hasEvenY(R) ? k0 : CURVE.n - k0;
        return {
          R,
          rx,
          k
        };
      }

      function finalizeSchnorrSig(R, k, e, d) {
        return new SchnorrSignature(R.x, mod(k + e * d, CURVE.n)).toRawBytes();
      }

      async function schnorrSign(message, privateKey, auxRand = exports.utils.randomBytes()) {
        const {
          m,
          px,
          d,
          rand
        } = initSchnorrSigArgs(message, privateKey, auxRand);
        const t = initSchnorrNonce(d, await exports.utils.taggedHash(TAGS.aux, rand));
        const {
          R,
          rx,
          k
        } = finalizeSchnorrNonce(await exports.utils.taggedHash(TAGS.nonce, t, px, m));
        const e = finalizeSchnorrChallenge(await exports.utils.taggedHash(TAGS.challenge, rx, px, m));
        const sig = finalizeSchnorrSig(R, k, e, d);
        const isValid = await schnorrVerify(sig, m, px);
        if (!isValid) throw new Error('sign: Invalid signature produced');
        return sig;
      }

      function schnorrSignSync(message, privateKey, auxRand = exports.utils.randomBytes()) {
        const {
          m,
          px,
          d,
          rand
        } = initSchnorrSigArgs(message, privateKey, auxRand);
        const t = initSchnorrNonce(d, exports.utils.taggedHashSync(TAGS.aux, rand));
        const {
          R,
          rx,
          k
        } = finalizeSchnorrNonce(exports.utils.taggedHashSync(TAGS.nonce, t, px, m));
        const e = finalizeSchnorrChallenge(exports.utils.taggedHashSync(TAGS.challenge, rx, px, m));
        const sig = finalizeSchnorrSig(R, k, e, d);
        const isValid = schnorrVerifySync(sig, m, px);
        if (!isValid) throw new Error('sign: Invalid signature produced');
        return sig;
      }

      function initSchnorrVerify(signature, message, publicKey) {
        const raw = signature instanceof SchnorrSignature;
        const sig = raw ? signature : SchnorrSignature.fromHex(signature);
        if (raw) sig.assertValidity();
        return { ...sig,
          m: ensureBytes(message),
          P: normalizePublicKey(publicKey)
        };
      }

      function finalizeSchnorrVerify(r, P, s, e) {
        const R = Point.BASE.multiplyAndAddUnsafe(P, normalizePrivateKey(s), mod(-e, CURVE.n));
        if (!R || !hasEvenY(R) || R.x !== r) return false;
        return true;
      }

      async function schnorrVerify(signature, message, publicKey) {
        try {
          const {
            r,
            s,
            m,
            P
          } = initSchnorrVerify(signature, message, publicKey);
          const e = finalizeSchnorrChallenge(await exports.utils.taggedHash(TAGS.challenge, numTo32b(r), P.toRawX(), m));
          return finalizeSchnorrVerify(r, P, s, e);
        } catch (error) {
          return false;
        }
      }

      function schnorrVerifySync(signature, message, publicKey) {
        try {
          const {
            r,
            s,
            m,
            P
          } = initSchnorrVerify(signature, message, publicKey);
          const e = finalizeSchnorrChallenge(exports.utils.taggedHashSync(TAGS.challenge, numTo32b(r), P.toRawX(), m));
          return finalizeSchnorrVerify(r, P, s, e);
        } catch (error) {
          return false;
        }
      }

      exports.schnorr = {
        Signature: SchnorrSignature,
        getPublicKey: schnorrGetPublicKey,
        sign: schnorrSign,
        verify: schnorrVerify,
        signSync: schnorrSignSync,
        verifySync: schnorrVerifySync
      };

      Point.BASE._setWindowSize(8);

      const crypto = {
        node: nodeCrypto,
        web: typeof self === 'object' && 'crypto' in self ? self.crypto : undefined
      };
      const TAGS = {
        challenge: 'BIP0340/challenge',
        aux: 'BIP0340/aux',
        nonce: 'BIP0340/nonce'
      };
      const TAGGED_HASH_PREFIXES = {};
      exports.utils = {
        isValidPrivateKey(privateKey) {
          try {
            normalizePrivateKey(privateKey);
            return true;
          } catch (error) {
            return false;
          }
        },

        privateAdd: (privateKey, tweak) => {
          const p = normalizePrivateKey(privateKey);
          const t = normalizePrivateKey(tweak);
          return numTo32b(mod(p + t, CURVE.n));
        },
        privateNegate: privateKey => {
          const p = normalizePrivateKey(privateKey);
          return numTo32b(CURVE.n - p);
        },
        pointAddScalar: (p, tweak, isCompressed) => {
          const P = Point.fromHex(p);
          const t = normalizePrivateKey(tweak);
          const Q = Point.BASE.multiplyAndAddUnsafe(P, t, _1n);
          if (!Q) throw new Error('Tweaked point at infinity');
          return Q.toRawBytes(isCompressed);
        },
        pointMultiply: (p, tweak, isCompressed) => {
          const P = Point.fromHex(p);
          const t = bytesToNumber(ensureBytes(tweak));
          return P.multiply(t).toRawBytes(isCompressed);
        },
        hashToPrivateKey: hash => {
          hash = ensureBytes(hash);
          if (hash.length < 40 || hash.length > 1024) throw new Error('Expected 40-1024 bytes of private key as per FIPS 186');

          const num = mod(bytesToNumber(hash), CURVE.n - _1n) + _1n;

          return numTo32b(num);
        },
        randomBytes: (bytesLength = 32) => {
          if (crypto.web) {
            return crypto.web.getRandomValues(new Uint8Array(bytesLength));
          } else if (crypto.node) {
            const {
              randomBytes
            } = crypto.node;
            return Uint8Array.from(randomBytes(bytesLength));
          } else {
            throw new Error("The environment doesn't have randomBytes function");
          }
        },
        randomPrivateKey: () => {
          return exports.utils.hashToPrivateKey(exports.utils.randomBytes(40));
        },
        bytesToHex,
        hexToBytes,
        concatBytes,
        mod,
        invert,
        sha256: async (...messages) => {
          if (crypto.web) {
            const buffer = await crypto.web.subtle.digest('SHA-256', concatBytes(...messages));
            return new Uint8Array(buffer);
          } else if (crypto.node) {
            const {
              createHash
            } = crypto.node;
            const hash = createHash('sha256');
            messages.forEach(m => hash.update(m));
            return Uint8Array.from(hash.digest());
          } else {
            throw new Error("The environment doesn't have sha256 function");
          }
        },
        hmacSha256: async (key, ...messages) => {
          if (crypto.web) {
            const ckey = await crypto.web.subtle.importKey('raw', key, {
              name: 'HMAC',
              hash: {
                name: 'SHA-256'
              }
            }, false, ['sign']);
            const message = concatBytes(...messages);
            const buffer = await crypto.web.subtle.sign('HMAC', ckey, message);
            return new Uint8Array(buffer);
          } else if (crypto.node) {
            const {
              createHmac
            } = crypto.node;
            const hash = createHmac('sha256', key);
            messages.forEach(m => hash.update(m));
            return Uint8Array.from(hash.digest());
          } else {
            throw new Error("The environment doesn't have hmac-sha256 function");
          }
        },
        sha256Sync: undefined,
        hmacSha256Sync: undefined,
        taggedHash: async (tag, ...messages) => {
          let tagP = TAGGED_HASH_PREFIXES[tag];

          if (tagP === undefined) {
            const tagH = await exports.utils.sha256(Uint8Array.from(tag, c => c.charCodeAt(0)));
            tagP = concatBytes(tagH, tagH);
            TAGGED_HASH_PREFIXES[tag] = tagP;
          }

          return exports.utils.sha256(tagP, ...messages);
        },
        taggedHashSync: (tag, ...messages) => {
          if (typeof exports.utils.sha256Sync !== 'function') throw new Error('utils.sha256Sync is undefined, you need to set it');
          let tagP = TAGGED_HASH_PREFIXES[tag];

          if (tagP === undefined) {
            const tagH = exports.utils.sha256Sync(Uint8Array.from(tag, c => c.charCodeAt(0)));
            tagP = concatBytes(tagH, tagH);
            TAGGED_HASH_PREFIXES[tag] = tagP;
          }

          return exports.utils.sha256Sync(tagP, ...messages);
        },

        precompute(windowSize = 8, point = Point.BASE) {
          const cached = point === Point.BASE ? point : new Point(point.x, point.y);

          cached._setWindowSize(windowSize);

          cached.multiply(_3n);
          return cached;
        }

      };
    }, {
      "crypto": 32
    }],
    29: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.bytes = exports.stringToBytes = exports.str = exports.bytesToString = exports.hex = exports.utf8 = exports.bech32m = exports.bech32 = exports.base58check = exports.base58xmr = exports.base58xrp = exports.base58flickr = exports.base58 = exports.base64url = exports.base64 = exports.base32crockford = exports.base32hex = exports.base32 = exports.base16 = exports.utils = exports.assertNumber = void 0;

      function assertNumber(n) {
        if (!Number.isSafeInteger(n)) throw new Error(`Wrong integer: ${n}`);
      }

      exports.assertNumber = assertNumber;

      function chain(...args) {
        const wrap = (a, b) => c => a(b(c));

        const encode = Array.from(args).reverse().reduce((acc, i) => acc ? wrap(acc, i.encode) : i.encode, undefined);
        const decode = args.reduce((acc, i) => acc ? wrap(acc, i.decode) : i.decode, undefined);
        return {
          encode,
          decode
        };
      }

      function alphabet(alphabet) {
        return {
          encode: digits => {
            if (!Array.isArray(digits) || digits.length && typeof digits[0] !== 'number') throw new Error('alphabet.encode input should be an array of numbers');
            return digits.map(i => {
              assertNumber(i);
              if (i < 0 || i >= alphabet.length) throw new Error(`Digit index outside alphabet: ${i} (alphabet: ${alphabet.length})`);
              return alphabet[i];
            });
          },
          decode: input => {
            if (!Array.isArray(input) || input.length && typeof input[0] !== 'string') throw new Error('alphabet.decode input should be array of strings');
            return input.map(letter => {
              if (typeof letter !== 'string') throw new Error(`alphabet.decode: not string element=${letter}`);
              const index = alphabet.indexOf(letter);
              if (index === -1) throw new Error(`Unknown letter: "${letter}". Allowed: ${alphabet}`);
              return index;
            });
          }
        };
      }

      function join(separator = '') {
        if (typeof separator !== 'string') throw new Error('join separator should be string');
        return {
          encode: from => {
            if (!Array.isArray(from) || from.length && typeof from[0] !== 'string') throw new Error('join.encode input should be array of strings');

            for (let i of from) if (typeof i !== 'string') throw new Error(`join.encode: non-string input=${i}`);

            return from.join(separator);
          },
          decode: to => {
            if (typeof to !== 'string') throw new Error('join.decode input should be string');
            return to.split(separator);
          }
        };
      }

      function padding(bits, chr = '=') {
        assertNumber(bits);
        if (typeof chr !== 'string') throw new Error('padding chr should be string');
        return {
          encode(data) {
            if (!Array.isArray(data) || data.length && typeof data[0] !== 'string') throw new Error('padding.encode input should be array of strings');

            for (let i of data) if (typeof i !== 'string') throw new Error(`padding.encode: non-string input=${i}`);

            while (data.length * bits % 8) data.push(chr);

            return data;
          },

          decode(input) {
            if (!Array.isArray(input) || input.length && typeof input[0] !== 'string') throw new Error('padding.encode input should be array of strings');

            for (let i of input) if (typeof i !== 'string') throw new Error(`padding.decode: non-string input=${i}`);

            let end = input.length;
            if (end * bits % 8) throw new Error('Invalid padding: string should have whole number of bytes');

            for (; end > 0 && input[end - 1] === chr; end--) {
              if (!((end - 1) * bits % 8)) throw new Error('Invalid padding: string has too much padding');
            }

            return input.slice(0, end);
          }

        };
      }

      function normalize(fn) {
        if (typeof fn !== 'function') throw new Error('normalize fn should be function');
        return {
          encode: from => from,
          decode: to => fn(to)
        };
      }

      function convertRadix(data, from, to) {
        if (from < 2) throw new Error(`convertRadix: wrong from=${from}, base cannot be less than 2`);
        if (to < 2) throw new Error(`convertRadix: wrong to=${to}, base cannot be less than 2`);
        if (!Array.isArray(data)) throw new Error('convertRadix: data should be array');
        if (!data.length) return [];
        let pos = 0;
        const res = [];
        const digits = Array.from(data);
        digits.forEach(d => {
          assertNumber(d);
          if (d < 0 || d >= from) throw new Error(`Wrong integer: ${d}`);
        });

        while (true) {
          let carry = 0;
          let done = true;

          for (let i = pos; i < digits.length; i++) {
            const digit = digits[i];
            const digitBase = from * carry + digit;

            if (!Number.isSafeInteger(digitBase) || from * carry / from !== carry || digitBase - digit !== from * carry) {
              throw new Error('convertRadix: carry overflow');
            }

            carry = digitBase % to;
            digits[i] = Math.floor(digitBase / to);
            if (!Number.isSafeInteger(digits[i]) || digits[i] * to + carry !== digitBase) throw new Error('convertRadix: carry overflow');
            if (!done) continue;else if (!digits[i]) pos = i;else done = false;
          }

          res.push(carry);
          if (done) break;
        }

        for (let i = 0; i < data.length - 1 && data[i] === 0; i++) res.push(0);

        return res.reverse();
      }

      const gcd = (a, b) => !b ? a : gcd(b, a % b);

      const radix2carry = (from, to) => from + (to - gcd(from, to));

      function convertRadix2(data, from, to, padding) {
        if (!Array.isArray(data)) throw new Error('convertRadix2: data should be array');
        if (from <= 0 || from > 32) throw new Error(`convertRadix2: wrong from=${from}`);
        if (to <= 0 || to > 32) throw new Error(`convertRadix2: wrong to=${to}`);

        if (radix2carry(from, to) > 32) {
          throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${radix2carry(from, to)}`);
        }

        let carry = 0;
        let pos = 0;
        const mask = 2 ** to - 1;
        const res = [];

        for (const n of data) {
          assertNumber(n);
          if (n >= 2 ** from) throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
          carry = carry << from | n;
          if (pos + from > 32) throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
          pos += from;

          for (; pos >= to; pos -= to) res.push((carry >> pos - to & mask) >>> 0);

          carry &= 2 ** pos - 1;
        }

        carry = carry << to - pos & mask;
        if (!padding && pos >= from) throw new Error('Excess padding');
        if (!padding && carry) throw new Error(`Non-zero padding: ${carry}`);
        if (padding && pos > 0) res.push(carry >>> 0);
        return res;
      }

      function radix(num) {
        assertNumber(num);
        return {
          encode: bytes => {
            if (!(bytes instanceof Uint8Array)) throw new Error('radix.encode input should be Uint8Array');
            return convertRadix(Array.from(bytes), 2 ** 8, num);
          },
          decode: digits => {
            if (!Array.isArray(digits) || digits.length && typeof digits[0] !== 'number') throw new Error('radix.decode input should be array of strings');
            return Uint8Array.from(convertRadix(digits, num, 2 ** 8));
          }
        };
      }

      function radix2(bits, revPadding = false) {
        assertNumber(bits);
        if (bits <= 0 || bits > 32) throw new Error('radix2: bits should be in (0..32]');
        if (radix2carry(8, bits) > 32 || radix2carry(bits, 8) > 32) throw new Error('radix2: carry overflow');
        return {
          encode: bytes => {
            if (!(bytes instanceof Uint8Array)) throw new Error('radix2.encode input should be Uint8Array');
            return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
          },
          decode: digits => {
            if (!Array.isArray(digits) || digits.length && typeof digits[0] !== 'number') throw new Error('radix2.decode input should be array of strings');
            return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
          }
        };
      }

      function unsafeWrapper(fn) {
        if (typeof fn !== 'function') throw new Error('unsafeWrapper fn should be function');
        return function (...args) {
          try {
            return fn.apply(null, args);
          } catch (e) {}
        };
      }

      function checksum(len, fn) {
        assertNumber(len);
        if (typeof fn !== 'function') throw new Error('checksum fn should be function');
        return {
          encode(data) {
            if (!(data instanceof Uint8Array)) throw new Error('checksum.encode: input should be Uint8Array');
            const checksum = fn(data).slice(0, len);
            const res = new Uint8Array(data.length + len);
            res.set(data);
            res.set(checksum, data.length);
            return res;
          },

          decode(data) {
            if (!(data instanceof Uint8Array)) throw new Error('checksum.decode: input should be Uint8Array');
            const payload = data.slice(0, -len);
            const newChecksum = fn(payload).slice(0, len);
            const oldChecksum = data.slice(-len);

            for (let i = 0; i < len; i++) if (newChecksum[i] !== oldChecksum[i]) throw new Error('Invalid checksum');

            return payload;
          }

        };
      }

      exports.utils = {
        alphabet,
        chain,
        checksum,
        radix,
        radix2,
        join,
        padding
      };
      exports.base16 = chain(radix2(4), alphabet('0123456789ABCDEF'), join(''));
      exports.base32 = chain(radix2(5), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), padding(5), join(''));
      exports.base32hex = chain(radix2(5), alphabet('0123456789ABCDEFGHIJKLMNOPQRSTUV'), padding(5), join(''));
      exports.base32crockford = chain(radix2(5), alphabet('0123456789ABCDEFGHJKMNPQRSTVWXYZ'), join(''), normalize(s => s.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1')));
      exports.base64 = chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'), padding(6), join(''));
      exports.base64url = chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'), padding(6), join(''));

      const genBase58 = abc => chain(radix(58), alphabet(abc), join(''));

      exports.base58 = genBase58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
      exports.base58flickr = genBase58('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ');
      exports.base58xrp = genBase58('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz');
      const XMR_BLOCK_LEN = [0, 2, 3, 5, 6, 7, 9, 10, 11];
      exports.base58xmr = {
        encode(data) {
          let res = '';

          for (let i = 0; i < data.length; i += 8) {
            const block = data.subarray(i, i + 8);
            res += exports.base58.encode(block).padStart(XMR_BLOCK_LEN[block.length], '1');
          }

          return res;
        },

        decode(str) {
          let res = [];

          for (let i = 0; i < str.length; i += 11) {
            const slice = str.slice(i, i + 11);
            const blockLen = XMR_BLOCK_LEN.indexOf(slice.length);
            const block = exports.base58.decode(slice);

            for (let j = 0; j < block.length - blockLen; j++) {
              if (block[j] !== 0) throw new Error('base58xmr: wrong padding');
            }

            res = res.concat(Array.from(block.slice(block.length - blockLen)));
          }

          return Uint8Array.from(res);
        }

      };

      const base58check = sha256 => chain(checksum(4, data => sha256(sha256(data))), exports.base58);

      exports.base58check = base58check;
      const BECH_ALPHABET = chain(alphabet('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), join(''));
      const POLYMOD_GENERATORS = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

      function bech32Polymod(pre) {
        const b = pre >> 25;
        let chk = (pre & 0x1ffffff) << 5;

        for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
          if ((b >> i & 1) === 1) chk ^= POLYMOD_GENERATORS[i];
        }

        return chk;
      }

      function bechChecksum(prefix, words, encodingConst = 1) {
        const len = prefix.length;
        let chk = 1;

        for (let i = 0; i < len; i++) {
          const c = prefix.charCodeAt(i);
          if (c < 33 || c > 126) throw new Error(`Invalid prefix (${prefix})`);
          chk = bech32Polymod(chk) ^ c >> 5;
        }

        chk = bech32Polymod(chk);

        for (let i = 0; i < len; i++) chk = bech32Polymod(chk) ^ prefix.charCodeAt(i) & 0x1f;

        for (let v of words) chk = bech32Polymod(chk) ^ v;

        for (let i = 0; i < 6; i++) chk = bech32Polymod(chk);

        chk ^= encodingConst;
        return BECH_ALPHABET.encode(convertRadix2([chk % 2 ** 30], 30, 5, false));
      }

      function genBech32(encoding) {
        const ENCODING_CONST = encoding === 'bech32' ? 1 : 0x2bc830a3;

        const _words = radix2(5);

        const fromWords = _words.decode;
        const toWords = _words.encode;
        const fromWordsUnsafe = unsafeWrapper(fromWords);

        function encode(prefix, words, limit = 90) {
          if (typeof prefix !== 'string') throw new Error(`bech32.encode prefix should be string, not ${typeof prefix}`);
          if (!Array.isArray(words) || words.length && typeof words[0] !== 'number') throw new Error(`bech32.encode words should be array of numbers, not ${typeof words}`);
          const actualLength = prefix.length + 7 + words.length;
          if (limit !== false && actualLength > limit) throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
          prefix = prefix.toLowerCase();
          return `${prefix}1${BECH_ALPHABET.encode(words)}${bechChecksum(prefix, words, ENCODING_CONST)}`;
        }

        function decode(str, limit = 90) {
          if (typeof str !== 'string') throw new Error(`bech32.decode input should be string, not ${typeof str}`);
          if (str.length < 8 || limit !== false && str.length > limit) throw new TypeError(`Wrong string length: ${str.length} (${str}). Expected (8..${limit})`);
          const lowered = str.toLowerCase();
          if (str !== lowered && str !== str.toUpperCase()) throw new Error(`String must be lowercase or uppercase`);
          str = lowered;
          const sepIndex = str.lastIndexOf('1');
          if (sepIndex === 0 || sepIndex === -1) throw new Error(`Letter "1" must be present between prefix and data only`);
          const prefix = str.slice(0, sepIndex);

          const _words = str.slice(sepIndex + 1);

          if (_words.length < 6) throw new Error('Data must be at least 6 characters long');
          const words = BECH_ALPHABET.decode(_words).slice(0, -6);
          const sum = bechChecksum(prefix, words, ENCODING_CONST);
          if (!_words.endsWith(sum)) throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
          return {
            prefix,
            words
          };
        }

        const decodeUnsafe = unsafeWrapper(decode);

        function decodeToBytes(str) {
          const {
            prefix,
            words
          } = decode(str, false);
          return {
            prefix,
            words,
            bytes: fromWords(words)
          };
        }

        return {
          encode,
          decode,
          decodeToBytes,
          decodeUnsafe,
          fromWords,
          fromWordsUnsafe,
          toWords
        };
      }

      exports.bech32 = genBech32('bech32');
      exports.bech32m = genBech32('bech32m');
      exports.utf8 = {
        encode: data => new TextDecoder().decode(data),
        decode: str => new TextEncoder().encode(str)
      };
      exports.hex = chain(radix2(4), alphabet('0123456789abcdef'), join(''), normalize(s => {
        if (typeof s !== 'string' || s.length % 2) throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
        return s.toLowerCase();
      }));
      const CODERS = {
        utf8: exports.utf8,
        hex: exports.hex,
        base16: exports.base16,
        base32: exports.base32,
        base64: exports.base64,
        base64url: exports.base64url,
        base58: exports.base58,
        base58xmr: exports.base58xmr
      };
      const coderTypeError = `Invalid encoding type. Available types: ${Object.keys(CODERS).join(', ')}`;

      const bytesToString = (type, bytes) => {
        if (typeof type !== 'string' || !CODERS.hasOwnProperty(type)) throw new TypeError(coderTypeError);
        if (!(bytes instanceof Uint8Array)) throw new TypeError('bytesToString() expects Uint8Array');
        return CODERS[type].encode(bytes);
      };

      exports.bytesToString = bytesToString;
      exports.str = exports.bytesToString;

      const stringToBytes = (type, str) => {
        if (!CODERS.hasOwnProperty(type)) throw new TypeError(coderTypeError);
        if (typeof str !== 'string') throw new TypeError('stringToBytes() expects string');
        return CODERS[type].decode(str);
      };

      exports.stringToBytes = stringToBytes;
      exports.bytes = exports.stringToBytes;
    }, {}],
    30: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.mnemonicToSeedSync = exports.mnemonicToSeed = exports.validateMnemonic = exports.entropyToMnemonic = exports.mnemonicToEntropy = exports.generateMnemonic = void 0;

      const _assert_1 = require("@noble/hashes/_assert");

      const pbkdf2_1 = require("@noble/hashes/pbkdf2");

      const sha256_1 = require("@noble/hashes/sha256");

      const sha512_1 = require("@noble/hashes/sha512");

      const utils_1 = require("@noble/hashes/utils");

      const base_1 = require("@scure/base");

      const isJapanese = wordlist => wordlist[0] === '\u3042\u3044\u3053\u304f\u3057\u3093';

      function nfkd(str) {
        if (typeof str !== 'string') throw new TypeError(`Invalid mnemonic type: ${typeof str}`);
        return str.normalize('NFKD');
      }

      function normalize(str) {
        const norm = nfkd(str);
        const words = norm.split(' ');
        if (![12, 15, 18, 21, 24].includes(words.length)) throw new Error('Invalid mnemonic');
        return {
          nfkd: norm,
          words
        };
      }

      function assertEntropy(entropy) {
        _assert_1.default.bytes(entropy, 16, 20, 24, 28, 32);
      }

      function generateMnemonic(wordlist, strength = 128) {
        _assert_1.default.number(strength);

        if (strength % 32 !== 0 || strength > 256) throw new TypeError('Invalid entropy');
        return entropyToMnemonic((0, utils_1.randomBytes)(strength / 8), wordlist);
      }

      exports.generateMnemonic = generateMnemonic;

      const calcChecksum = entropy => {
        const bitsLeft = 8 - entropy.length / 4;
        return new Uint8Array([(0, sha256_1.sha256)(entropy)[0] >> bitsLeft << bitsLeft]);
      };

      function getCoder(wordlist) {
        if (!Array.isArray(wordlist) || wordlist.length !== 2 ** 11 || typeof wordlist[0] !== 'string') throw new Error('Worlist: expected array of 2048 strings');
        wordlist.forEach(i => {
          if (typeof i !== 'string') throw new Error(`Wordlist: non-string element: ${i}`);
        });
        return base_1.utils.chain(base_1.utils.checksum(1, calcChecksum), base_1.utils.radix2(11, true), base_1.utils.alphabet(wordlist));
      }

      function mnemonicToEntropy(mnemonic, wordlist) {
        const {
          words
        } = normalize(mnemonic);
        const entropy = getCoder(wordlist).decode(words);
        assertEntropy(entropy);
        return entropy;
      }

      exports.mnemonicToEntropy = mnemonicToEntropy;

      function entropyToMnemonic(entropy, wordlist) {
        assertEntropy(entropy);
        const words = getCoder(wordlist).encode(entropy);
        return words.join(isJapanese(wordlist) ? '\u3000' : ' ');
      }

      exports.entropyToMnemonic = entropyToMnemonic;

      function validateMnemonic(mnemonic, wordlist) {
        try {
          mnemonicToEntropy(mnemonic, wordlist);
        } catch (e) {
          return false;
        }

        return true;
      }

      exports.validateMnemonic = validateMnemonic;

      const salt = passphrase => nfkd(`mnemonic${passphrase}`);

      function mnemonicToSeed(mnemonic, passphrase = '') {
        return (0, pbkdf2_1.pbkdf2Async)(sha512_1.sha512, normalize(mnemonic).nfkd, salt(passphrase), {
          c: 2048,
          dkLen: 64
        });
      }

      exports.mnemonicToSeed = mnemonicToSeed;

      function mnemonicToSeedSync(mnemonic, passphrase = '') {
        return (0, pbkdf2_1.pbkdf2)(sha512_1.sha512, normalize(mnemonic).nfkd, salt(passphrase), {
          c: 2048,
          dkLen: 64
        });
      }

      exports.mnemonicToSeedSync = mnemonicToSeedSync;
    }, {
      "@noble/hashes/_assert": 17,
      "@noble/hashes/pbkdf2": 22,
      "@noble/hashes/sha256": 24,
      "@noble/hashes/sha512": 26,
      "@noble/hashes/utils": 27,
      "@scure/base": 29
    }],
    31: [function (require, module, exports) {
      'use strict';

      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
      var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

      for (var i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }

      revLookup['-'.charCodeAt(0)] = 62;
      revLookup['_'.charCodeAt(0)] = 63;

      function getLens(b64) {
        var len = b64.length;

        if (len % 4 > 0) {
          throw new Error('Invalid string. Length must be a multiple of 4');
        }

        var validLen = b64.indexOf('=');
        if (validLen === -1) validLen = len;
        var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }

      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }

      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }

      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i;

        for (i = 0; i < len; i += 4) {
          tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
          arr[curByte++] = tmp >> 16 & 0xFF;
          arr[curByte++] = tmp >> 8 & 0xFF;
          arr[curByte++] = tmp & 0xFF;
        }

        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
          arr[curByte++] = tmp & 0xFF;
        }

        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 0xFF;
          arr[curByte++] = tmp & 0xFF;
        }

        return arr;
      }

      function tripletToBase64(num) {
        return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
      }

      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];

        for (var i = start; i < end; i += 3) {
          tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
          output.push(tripletToBase64(tmp));
        }

        return output.join('');
      }

      function fromByteArray(uint8) {
        var tmp;
        var len = uint8.length;
        var extraBytes = len % 3;
        var parts = [];
        var maxChunkLength = 16383;

        for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
          parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
        }

        if (extraBytes === 1) {
          tmp = uint8[len - 1];
          parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
        } else if (extraBytes === 2) {
          tmp = (uint8[len - 2] << 8) + uint8[len - 1];
          parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
        }

        return parts.join('');
      }
    }, {}],
    32: [function (require, module, exports) {}, {}],
    33: [function (require, module, exports) {
      (function () {
        (function () {
          'use strict';

          var base64 = require('base64-js');

          var ieee754 = require('ieee754');

          exports.Buffer = Buffer;
          exports.SlowBuffer = SlowBuffer;
          exports.INSPECT_MAX_BYTES = 50;
          var K_MAX_LENGTH = 0x7fffffff;
          exports.kMaxLength = K_MAX_LENGTH;
          Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

          if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('This browser lacks typed array (Uint8Array) support which is required by ' + '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');
          }

          function typedArraySupport() {
            try {
              var arr = new Uint8Array(1);
              arr.__proto__ = {
                __proto__: Uint8Array.prototype,
                foo: function () {
                  return 42;
                }
              };
              return arr.foo() === 42;
            } catch (e) {
              return false;
            }
          }

          Object.defineProperty(Buffer.prototype, 'parent', {
            enumerable: true,
            get: function () {
              if (!Buffer.isBuffer(this)) return undefined;
              return this.buffer;
            }
          });
          Object.defineProperty(Buffer.prototype, 'offset', {
            enumerable: true,
            get: function () {
              if (!Buffer.isBuffer(this)) return undefined;
              return this.byteOffset;
            }
          });

          function createBuffer(length) {
            if (length > K_MAX_LENGTH) {
              throw new RangeError('The value "' + length + '" is invalid for option "size"');
            }

            var buf = new Uint8Array(length);
            buf.__proto__ = Buffer.prototype;
            return buf;
          }

          function Buffer(arg, encodingOrOffset, length) {
            if (typeof arg === 'number') {
              if (typeof encodingOrOffset === 'string') {
                throw new TypeError('The "string" argument must be of type string. Received type number');
              }

              return allocUnsafe(arg);
            }

            return from(arg, encodingOrOffset, length);
          }

          if (typeof Symbol !== 'undefined' && Symbol.species != null && Buffer[Symbol.species] === Buffer) {
            Object.defineProperty(Buffer, Symbol.species, {
              value: null,
              configurable: true,
              enumerable: false,
              writable: false
            });
          }

          Buffer.poolSize = 8192;

          function from(value, encodingOrOffset, length) {
            if (typeof value === 'string') {
              return fromString(value, encodingOrOffset);
            }

            if (ArrayBuffer.isView(value)) {
              return fromArrayLike(value);
            }

            if (value == null) {
              throw TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + typeof value);
            }

            if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
              return fromArrayBuffer(value, encodingOrOffset, length);
            }

            if (typeof value === 'number') {
              throw new TypeError('The "value" argument must not be of type number. Received type number');
            }

            var valueOf = value.valueOf && value.valueOf();

            if (valueOf != null && valueOf !== value) {
              return Buffer.from(valueOf, encodingOrOffset, length);
            }

            var b = fromObject(value);
            if (b) return b;

            if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === 'function') {
              return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length);
            }

            throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + typeof value);
          }

          Buffer.from = function (value, encodingOrOffset, length) {
            return from(value, encodingOrOffset, length);
          };

          Buffer.prototype.__proto__ = Uint8Array.prototype;
          Buffer.__proto__ = Uint8Array;

          function assertSize(size) {
            if (typeof size !== 'number') {
              throw new TypeError('"size" argument must be of type number');
            } else if (size < 0) {
              throw new RangeError('The value "' + size + '" is invalid for option "size"');
            }
          }

          function alloc(size, fill, encoding) {
            assertSize(size);

            if (size <= 0) {
              return createBuffer(size);
            }

            if (fill !== undefined) {
              return typeof encoding === 'string' ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
            }

            return createBuffer(size);
          }

          Buffer.alloc = function (size, fill, encoding) {
            return alloc(size, fill, encoding);
          };

          function allocUnsafe(size) {
            assertSize(size);
            return createBuffer(size < 0 ? 0 : checked(size) | 0);
          }

          Buffer.allocUnsafe = function (size) {
            return allocUnsafe(size);
          };

          Buffer.allocUnsafeSlow = function (size) {
            return allocUnsafe(size);
          };

          function fromString(string, encoding) {
            if (typeof encoding !== 'string' || encoding === '') {
              encoding = 'utf8';
            }

            if (!Buffer.isEncoding(encoding)) {
              throw new TypeError('Unknown encoding: ' + encoding);
            }

            var length = byteLength(string, encoding) | 0;
            var buf = createBuffer(length);
            var actual = buf.write(string, encoding);

            if (actual !== length) {
              buf = buf.slice(0, actual);
            }

            return buf;
          }

          function fromArrayLike(array) {
            var length = array.length < 0 ? 0 : checked(array.length) | 0;
            var buf = createBuffer(length);

            for (var i = 0; i < length; i += 1) {
              buf[i] = array[i] & 255;
            }

            return buf;
          }

          function fromArrayBuffer(array, byteOffset, length) {
            if (byteOffset < 0 || array.byteLength < byteOffset) {
              throw new RangeError('"offset" is outside of buffer bounds');
            }

            if (array.byteLength < byteOffset + (length || 0)) {
              throw new RangeError('"length" is outside of buffer bounds');
            }

            var buf;

            if (byteOffset === undefined && length === undefined) {
              buf = new Uint8Array(array);
            } else if (length === undefined) {
              buf = new Uint8Array(array, byteOffset);
            } else {
              buf = new Uint8Array(array, byteOffset, length);
            }

            buf.__proto__ = Buffer.prototype;
            return buf;
          }

          function fromObject(obj) {
            if (Buffer.isBuffer(obj)) {
              var len = checked(obj.length) | 0;
              var buf = createBuffer(len);

              if (buf.length === 0) {
                return buf;
              }

              obj.copy(buf, 0, 0, len);
              return buf;
            }

            if (obj.length !== undefined) {
              if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
                return createBuffer(0);
              }

              return fromArrayLike(obj);
            }

            if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
              return fromArrayLike(obj.data);
            }
          }

          function checked(length) {
            if (length >= K_MAX_LENGTH) {
              throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
            }

            return length | 0;
          }

          function SlowBuffer(length) {
            if (+length != length) {
              length = 0;
            }

            return Buffer.alloc(+length);
          }

          Buffer.isBuffer = function isBuffer(b) {
            return b != null && b._isBuffer === true && b !== Buffer.prototype;
          };

          Buffer.compare = function compare(a, b) {
            if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
            if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);

            if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
              throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            }

            if (a === b) return 0;
            var x = a.length;
            var y = b.length;

            for (var i = 0, len = Math.min(x, y); i < len; ++i) {
              if (a[i] !== b[i]) {
                x = a[i];
                y = b[i];
                break;
              }
            }

            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
          };

          Buffer.isEncoding = function isEncoding(encoding) {
            switch (String(encoding).toLowerCase()) {
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
                return true;

              default:
                return false;
            }
          };

          Buffer.concat = function concat(list, length) {
            if (!Array.isArray(list)) {
              throw new TypeError('"list" argument must be an Array of Buffers');
            }

            if (list.length === 0) {
              return Buffer.alloc(0);
            }

            var i;

            if (length === undefined) {
              length = 0;

              for (i = 0; i < list.length; ++i) {
                length += list[i].length;
              }
            }

            var buffer = Buffer.allocUnsafe(length);
            var pos = 0;

            for (i = 0; i < list.length; ++i) {
              var buf = list[i];

              if (isInstance(buf, Uint8Array)) {
                buf = Buffer.from(buf);
              }

              if (!Buffer.isBuffer(buf)) {
                throw new TypeError('"list" argument must be an Array of Buffers');
              }

              buf.copy(buffer, pos);
              pos += buf.length;
            }

            return buffer;
          };

          function byteLength(string, encoding) {
            if (Buffer.isBuffer(string)) {
              return string.length;
            }

            if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
              return string.byteLength;
            }

            if (typeof string !== 'string') {
              throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + 'Received type ' + typeof string);
            }

            var len = string.length;
            var mustMatch = arguments.length > 2 && arguments[2] === true;
            if (!mustMatch && len === 0) return 0;
            var loweredCase = false;

            for (;;) {
              switch (encoding) {
                case 'ascii':
                case 'latin1':
                case 'binary':
                  return len;

                case 'utf8':
                case 'utf-8':
                  return utf8ToBytes(string).length;

                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return len * 2;

                case 'hex':
                  return len >>> 1;

                case 'base64':
                  return base64ToBytes(string).length;

                default:
                  if (loweredCase) {
                    return mustMatch ? -1 : utf8ToBytes(string).length;
                  }

                  encoding = ('' + encoding).toLowerCase();
                  loweredCase = true;
              }
            }
          }

          Buffer.byteLength = byteLength;

          function slowToString(encoding, start, end) {
            var loweredCase = false;

            if (start === undefined || start < 0) {
              start = 0;
            }

            if (start > this.length) {
              return '';
            }

            if (end === undefined || end > this.length) {
              end = this.length;
            }

            if (end <= 0) {
              return '';
            }

            end >>>= 0;
            start >>>= 0;

            if (end <= start) {
              return '';
            }

            if (!encoding) encoding = 'utf8';

            while (true) {
              switch (encoding) {
                case 'hex':
                  return hexSlice(this, start, end);

                case 'utf8':
                case 'utf-8':
                  return utf8Slice(this, start, end);

                case 'ascii':
                  return asciiSlice(this, start, end);

                case 'latin1':
                case 'binary':
                  return latin1Slice(this, start, end);

                case 'base64':
                  return base64Slice(this, start, end);

                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return utf16leSlice(this, start, end);

                default:
                  if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                  encoding = (encoding + '').toLowerCase();
                  loweredCase = true;
              }
            }
          }

          Buffer.prototype._isBuffer = true;

          function swap(b, n, m) {
            var i = b[n];
            b[n] = b[m];
            b[m] = i;
          }

          Buffer.prototype.swap16 = function swap16() {
            var len = this.length;

            if (len % 2 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 16-bits');
            }

            for (var i = 0; i < len; i += 2) {
              swap(this, i, i + 1);
            }

            return this;
          };

          Buffer.prototype.swap32 = function swap32() {
            var len = this.length;

            if (len % 4 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 32-bits');
            }

            for (var i = 0; i < len; i += 4) {
              swap(this, i, i + 3);
              swap(this, i + 1, i + 2);
            }

            return this;
          };

          Buffer.prototype.swap64 = function swap64() {
            var len = this.length;

            if (len % 8 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 64-bits');
            }

            for (var i = 0; i < len; i += 8) {
              swap(this, i, i + 7);
              swap(this, i + 1, i + 6);
              swap(this, i + 2, i + 5);
              swap(this, i + 3, i + 4);
            }

            return this;
          };

          Buffer.prototype.toString = function toString() {
            var length = this.length;
            if (length === 0) return '';
            if (arguments.length === 0) return utf8Slice(this, 0, length);
            return slowToString.apply(this, arguments);
          };

          Buffer.prototype.toLocaleString = Buffer.prototype.toString;

          Buffer.prototype.equals = function equals(b) {
            if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
            if (this === b) return true;
            return Buffer.compare(this, b) === 0;
          };

          Buffer.prototype.inspect = function inspect() {
            var str = '';
            var max = exports.INSPECT_MAX_BYTES;
            str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
            if (this.length > max) str += ' ... ';
            return '<Buffer ' + str + '>';
          };

          Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
            if (isInstance(target, Uint8Array)) {
              target = Buffer.from(target, target.offset, target.byteLength);
            }

            if (!Buffer.isBuffer(target)) {
              throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + 'Received type ' + typeof target);
            }

            if (start === undefined) {
              start = 0;
            }

            if (end === undefined) {
              end = target ? target.length : 0;
            }

            if (thisStart === undefined) {
              thisStart = 0;
            }

            if (thisEnd === undefined) {
              thisEnd = this.length;
            }

            if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
              throw new RangeError('out of range index');
            }

            if (thisStart >= thisEnd && start >= end) {
              return 0;
            }

            if (thisStart >= thisEnd) {
              return -1;
            }

            if (start >= end) {
              return 1;
            }

            start >>>= 0;
            end >>>= 0;
            thisStart >>>= 0;
            thisEnd >>>= 0;
            if (this === target) return 0;
            var x = thisEnd - thisStart;
            var y = end - start;
            var len = Math.min(x, y);
            var thisCopy = this.slice(thisStart, thisEnd);
            var targetCopy = target.slice(start, end);

            for (var i = 0; i < len; ++i) {
              if (thisCopy[i] !== targetCopy[i]) {
                x = thisCopy[i];
                y = targetCopy[i];
                break;
              }
            }

            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
          };

          function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
            if (buffer.length === 0) return -1;

            if (typeof byteOffset === 'string') {
              encoding = byteOffset;
              byteOffset = 0;
            } else if (byteOffset > 0x7fffffff) {
              byteOffset = 0x7fffffff;
            } else if (byteOffset < -0x80000000) {
              byteOffset = -0x80000000;
            }

            byteOffset = +byteOffset;

            if (numberIsNaN(byteOffset)) {
              byteOffset = dir ? 0 : buffer.length - 1;
            }

            if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

            if (byteOffset >= buffer.length) {
              if (dir) return -1;else byteOffset = buffer.length - 1;
            } else if (byteOffset < 0) {
              if (dir) byteOffset = 0;else return -1;
            }

            if (typeof val === 'string') {
              val = Buffer.from(val, encoding);
            }

            if (Buffer.isBuffer(val)) {
              if (val.length === 0) {
                return -1;
              }

              return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
            } else if (typeof val === 'number') {
              val = val & 0xFF;

              if (typeof Uint8Array.prototype.indexOf === 'function') {
                if (dir) {
                  return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
                } else {
                  return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
                }
              }

              return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
            }

            throw new TypeError('val must be string, number or Buffer');
          }

          function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
            var indexSize = 1;
            var arrLength = arr.length;
            var valLength = val.length;

            if (encoding !== undefined) {
              encoding = String(encoding).toLowerCase();

              if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
                if (arr.length < 2 || val.length < 2) {
                  return -1;
                }

                indexSize = 2;
                arrLength /= 2;
                valLength /= 2;
                byteOffset /= 2;
              }
            }

            function read(buf, i) {
              if (indexSize === 1) {
                return buf[i];
              } else {
                return buf.readUInt16BE(i * indexSize);
              }
            }

            var i;

            if (dir) {
              var foundIndex = -1;

              for (i = byteOffset; i < arrLength; i++) {
                if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                  if (foundIndex === -1) foundIndex = i;
                  if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
                } else {
                  if (foundIndex !== -1) i -= i - foundIndex;
                  foundIndex = -1;
                }
              }
            } else {
              if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

              for (i = byteOffset; i >= 0; i--) {
                var found = true;

                for (var j = 0; j < valLength; j++) {
                  if (read(arr, i + j) !== read(val, j)) {
                    found = false;
                    break;
                  }
                }

                if (found) return i;
              }
            }

            return -1;
          }

          Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
            return this.indexOf(val, byteOffset, encoding) !== -1;
          };

          Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
          };

          Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
          };

          function hexWrite(buf, string, offset, length) {
            offset = Number(offset) || 0;
            var remaining = buf.length - offset;

            if (!length) {
              length = remaining;
            } else {
              length = Number(length);

              if (length > remaining) {
                length = remaining;
              }
            }

            var strLen = string.length;

            if (length > strLen / 2) {
              length = strLen / 2;
            }

            for (var i = 0; i < length; ++i) {
              var parsed = parseInt(string.substr(i * 2, 2), 16);
              if (numberIsNaN(parsed)) return i;
              buf[offset + i] = parsed;
            }

            return i;
          }

          function utf8Write(buf, string, offset, length) {
            return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
          }

          function asciiWrite(buf, string, offset, length) {
            return blitBuffer(asciiToBytes(string), buf, offset, length);
          }

          function latin1Write(buf, string, offset, length) {
            return asciiWrite(buf, string, offset, length);
          }

          function base64Write(buf, string, offset, length) {
            return blitBuffer(base64ToBytes(string), buf, offset, length);
          }

          function ucs2Write(buf, string, offset, length) {
            return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
          }

          Buffer.prototype.write = function write(string, offset, length, encoding) {
            if (offset === undefined) {
              encoding = 'utf8';
              length = this.length;
              offset = 0;
            } else if (length === undefined && typeof offset === 'string') {
              encoding = offset;
              length = this.length;
              offset = 0;
            } else if (isFinite(offset)) {
              offset = offset >>> 0;

              if (isFinite(length)) {
                length = length >>> 0;
                if (encoding === undefined) encoding = 'utf8';
              } else {
                encoding = length;
                length = undefined;
              }
            } else {
              throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
            }

            var remaining = this.length - offset;
            if (length === undefined || length > remaining) length = remaining;

            if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
              throw new RangeError('Attempt to write outside buffer bounds');
            }

            if (!encoding) encoding = 'utf8';
            var loweredCase = false;

            for (;;) {
              switch (encoding) {
                case 'hex':
                  return hexWrite(this, string, offset, length);

                case 'utf8':
                case 'utf-8':
                  return utf8Write(this, string, offset, length);

                case 'ascii':
                  return asciiWrite(this, string, offset, length);

                case 'latin1':
                case 'binary':
                  return latin1Write(this, string, offset, length);

                case 'base64':
                  return base64Write(this, string, offset, length);

                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return ucs2Write(this, string, offset, length);

                default:
                  if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                  encoding = ('' + encoding).toLowerCase();
                  loweredCase = true;
              }
            }
          };

          Buffer.prototype.toJSON = function toJSON() {
            return {
              type: 'Buffer',
              data: Array.prototype.slice.call(this._arr || this, 0)
            };
          };

          function base64Slice(buf, start, end) {
            if (start === 0 && end === buf.length) {
              return base64.fromByteArray(buf);
            } else {
              return base64.fromByteArray(buf.slice(start, end));
            }
          }

          function utf8Slice(buf, start, end) {
            end = Math.min(buf.length, end);
            var res = [];
            var i = start;

            while (i < end) {
              var firstByte = buf[i];
              var codePoint = null;
              var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

              if (i + bytesPerSequence <= end) {
                var secondByte, thirdByte, fourthByte, tempCodePoint;

                switch (bytesPerSequence) {
                  case 1:
                    if (firstByte < 0x80) {
                      codePoint = firstByte;
                    }

                    break;

                  case 2:
                    secondByte = buf[i + 1];

                    if ((secondByte & 0xC0) === 0x80) {
                      tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

                      if (tempCodePoint > 0x7F) {
                        codePoint = tempCodePoint;
                      }
                    }

                    break;

                  case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];

                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                      tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

                      if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                        codePoint = tempCodePoint;
                      }
                    }

                    break;

                  case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];

                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                      tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

                      if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                        codePoint = tempCodePoint;
                      }
                    }

                }
              }

              if (codePoint === null) {
                codePoint = 0xFFFD;
                bytesPerSequence = 1;
              } else if (codePoint > 0xFFFF) {
                codePoint -= 0x10000;
                res.push(codePoint >>> 10 & 0x3FF | 0xD800);
                codePoint = 0xDC00 | codePoint & 0x3FF;
              }

              res.push(codePoint);
              i += bytesPerSequence;
            }

            return decodeCodePointsArray(res);
          }

          var MAX_ARGUMENTS_LENGTH = 0x1000;

          function decodeCodePointsArray(codePoints) {
            var len = codePoints.length;

            if (len <= MAX_ARGUMENTS_LENGTH) {
              return String.fromCharCode.apply(String, codePoints);
            }

            var res = '';
            var i = 0;

            while (i < len) {
              res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
            }

            return res;
          }

          function asciiSlice(buf, start, end) {
            var ret = '';
            end = Math.min(buf.length, end);

            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i] & 0x7F);
            }

            return ret;
          }

          function latin1Slice(buf, start, end) {
            var ret = '';
            end = Math.min(buf.length, end);

            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i]);
            }

            return ret;
          }

          function hexSlice(buf, start, end) {
            var len = buf.length;
            if (!start || start < 0) start = 0;
            if (!end || end < 0 || end > len) end = len;
            var out = '';

            for (var i = start; i < end; ++i) {
              out += toHex(buf[i]);
            }

            return out;
          }

          function utf16leSlice(buf, start, end) {
            var bytes = buf.slice(start, end);
            var res = '';

            for (var i = 0; i < bytes.length; i += 2) {
              res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
            }

            return res;
          }

          Buffer.prototype.slice = function slice(start, end) {
            var len = this.length;
            start = ~~start;
            end = end === undefined ? len : ~~end;

            if (start < 0) {
              start += len;
              if (start < 0) start = 0;
            } else if (start > len) {
              start = len;
            }

            if (end < 0) {
              end += len;
              if (end < 0) end = 0;
            } else if (end > len) {
              end = len;
            }

            if (end < start) end = start;
            var newBuf = this.subarray(start, end);
            newBuf.__proto__ = Buffer.prototype;
            return newBuf;
          };

          function checkOffset(offset, ext, length) {
            if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
            if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
          }

          Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);
            var val = this[offset];
            var mul = 1;
            var i = 0;

            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul;
            }

            return val;
          };

          Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;

            if (!noAssert) {
              checkOffset(offset, byteLength, this.length);
            }

            var val = this[offset + --byteLength];
            var mul = 1;

            while (byteLength > 0 && (mul *= 0x100)) {
              val += this[offset + --byteLength] * mul;
            }

            return val;
          };

          Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 1, this.length);
            return this[offset];
          };

          Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            return this[offset] | this[offset + 1] << 8;
          };

          Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            return this[offset] << 8 | this[offset + 1];
          };

          Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
          };

          Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
          };

          Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);
            var val = this[offset];
            var mul = 1;
            var i = 0;

            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul;
            }

            mul *= 0x80;
            if (val >= mul) val -= Math.pow(2, 8 * byteLength);
            return val;
          };

          Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);
            var i = byteLength;
            var mul = 1;
            var val = this[offset + --i];

            while (i > 0 && (mul *= 0x100)) {
              val += this[offset + --i] * mul;
            }

            mul *= 0x80;
            if (val >= mul) val -= Math.pow(2, 8 * byteLength);
            return val;
          };

          Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 1, this.length);
            if (!(this[offset] & 0x80)) return this[offset];
            return (0xff - this[offset] + 1) * -1;
          };

          Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset] | this[offset + 1] << 8;
            return val & 0x8000 ? val | 0xFFFF0000 : val;
          };

          Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset + 1] | this[offset] << 8;
            return val & 0x8000 ? val | 0xFFFF0000 : val;
          };

          Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
          };

          Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
          };

          Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, true, 23, 4);
          };

          Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, false, 23, 4);
          };

          Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, true, 52, 8);
          };

          Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, false, 52, 8);
          };

          function checkInt(buf, value, offset, ext, max, min) {
            if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
            if (offset + ext > buf.length) throw new RangeError('Index out of range');
          }

          Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
            value = +value;
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;

            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1;
              checkInt(this, value, offset, byteLength, maxBytes, 0);
            }

            var mul = 1;
            var i = 0;
            this[offset] = value & 0xFF;

            while (++i < byteLength && (mul *= 0x100)) {
              this[offset + i] = value / mul & 0xFF;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
            value = +value;
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;

            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1;
              checkInt(this, value, offset, byteLength, maxBytes, 0);
            }

            var i = byteLength - 1;
            var mul = 1;
            this[offset + i] = value & 0xFF;

            while (--i >= 0 && (mul *= 0x100)) {
              this[offset + i] = value / mul & 0xFF;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
            this[offset] = value & 0xff;
            return offset + 1;
          };

          Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            this[offset] = value & 0xff;
            this[offset + 1] = value >>> 8;
            return offset + 2;
          };

          Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            this[offset] = value >>> 8;
            this[offset + 1] = value & 0xff;
            return offset + 2;
          };

          Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            this[offset + 3] = value >>> 24;
            this[offset + 2] = value >>> 16;
            this[offset + 1] = value >>> 8;
            this[offset] = value & 0xff;
            return offset + 4;
          };

          Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 0xff;
            return offset + 4;
          };

          Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
            value = +value;
            offset = offset >>> 0;

            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1);
              checkInt(this, value, offset, byteLength, limit - 1, -limit);
            }

            var i = 0;
            var mul = 1;
            var sub = 0;
            this[offset] = value & 0xFF;

            while (++i < byteLength && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                sub = 1;
              }

              this[offset + i] = (value / mul >> 0) - sub & 0xFF;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
            value = +value;
            offset = offset >>> 0;

            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1);
              checkInt(this, value, offset, byteLength, limit - 1, -limit);
            }

            var i = byteLength - 1;
            var mul = 1;
            var sub = 0;
            this[offset + i] = value & 0xFF;

            while (--i >= 0 && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                sub = 1;
              }

              this[offset + i] = (value / mul >> 0) - sub & 0xFF;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
            if (value < 0) value = 0xff + value + 1;
            this[offset] = value & 0xff;
            return offset + 1;
          };

          Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
            this[offset] = value & 0xff;
            this[offset + 1] = value >>> 8;
            return offset + 2;
          };

          Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
            this[offset] = value >>> 8;
            this[offset + 1] = value & 0xff;
            return offset + 2;
          };

          Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
            this[offset] = value & 0xff;
            this[offset + 1] = value >>> 8;
            this[offset + 2] = value >>> 16;
            this[offset + 3] = value >>> 24;
            return offset + 4;
          };

          Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
            if (value < 0) value = 0xffffffff + value + 1;
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 0xff;
            return offset + 4;
          };

          function checkIEEE754(buf, value, offset, ext, max, min) {
            if (offset + ext > buf.length) throw new RangeError('Index out of range');
            if (offset < 0) throw new RangeError('Index out of range');
          }

          function writeFloat(buf, value, offset, littleEndian, noAssert) {
            value = +value;
            offset = offset >>> 0;

            if (!noAssert) {
              checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
            }

            ieee754.write(buf, value, offset, littleEndian, 23, 4);
            return offset + 4;
          }

          Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
            return writeFloat(this, value, offset, true, noAssert);
          };

          Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
            return writeFloat(this, value, offset, false, noAssert);
          };

          function writeDouble(buf, value, offset, littleEndian, noAssert) {
            value = +value;
            offset = offset >>> 0;

            if (!noAssert) {
              checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
            }

            ieee754.write(buf, value, offset, littleEndian, 52, 8);
            return offset + 8;
          }

          Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
            return writeDouble(this, value, offset, true, noAssert);
          };

          Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
            return writeDouble(this, value, offset, false, noAssert);
          };

          Buffer.prototype.copy = function copy(target, targetStart, start, end) {
            if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer');
            if (!start) start = 0;
            if (!end && end !== 0) end = this.length;
            if (targetStart >= target.length) targetStart = target.length;
            if (!targetStart) targetStart = 0;
            if (end > 0 && end < start) end = start;
            if (end === start) return 0;
            if (target.length === 0 || this.length === 0) return 0;

            if (targetStart < 0) {
              throw new RangeError('targetStart out of bounds');
            }

            if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
            if (end < 0) throw new RangeError('sourceEnd out of bounds');
            if (end > this.length) end = this.length;

            if (target.length - targetStart < end - start) {
              end = target.length - targetStart + start;
            }

            var len = end - start;

            if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
              this.copyWithin(targetStart, start, end);
            } else if (this === target && start < targetStart && targetStart < end) {
              for (var i = len - 1; i >= 0; --i) {
                target[i + targetStart] = this[i + start];
              }
            } else {
              Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
            }

            return len;
          };

          Buffer.prototype.fill = function fill(val, start, end, encoding) {
            if (typeof val === 'string') {
              if (typeof start === 'string') {
                encoding = start;
                start = 0;
                end = this.length;
              } else if (typeof end === 'string') {
                encoding = end;
                end = this.length;
              }

              if (encoding !== undefined && typeof encoding !== 'string') {
                throw new TypeError('encoding must be a string');
              }

              if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
                throw new TypeError('Unknown encoding: ' + encoding);
              }

              if (val.length === 1) {
                var code = val.charCodeAt(0);

                if (encoding === 'utf8' && code < 128 || encoding === 'latin1') {
                  val = code;
                }
              }
            } else if (typeof val === 'number') {
              val = val & 255;
            }

            if (start < 0 || this.length < start || this.length < end) {
              throw new RangeError('Out of range index');
            }

            if (end <= start) {
              return this;
            }

            start = start >>> 0;
            end = end === undefined ? this.length : end >>> 0;
            if (!val) val = 0;
            var i;

            if (typeof val === 'number') {
              for (i = start; i < end; ++i) {
                this[i] = val;
              }
            } else {
              var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
              var len = bytes.length;

              if (len === 0) {
                throw new TypeError('The value "' + val + '" is invalid for argument "value"');
              }

              for (i = 0; i < end - start; ++i) {
                this[i + start] = bytes[i % len];
              }
            }

            return this;
          };

          var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

          function base64clean(str) {
            str = str.split('=')[0];
            str = str.trim().replace(INVALID_BASE64_RE, '');
            if (str.length < 2) return '';

            while (str.length % 4 !== 0) {
              str = str + '=';
            }

            return str;
          }

          function toHex(n) {
            if (n < 16) return '0' + n.toString(16);
            return n.toString(16);
          }

          function utf8ToBytes(string, units) {
            units = units || Infinity;
            var codePoint;
            var length = string.length;
            var leadSurrogate = null;
            var bytes = [];

            for (var i = 0; i < length; ++i) {
              codePoint = string.charCodeAt(i);

              if (codePoint > 0xD7FF && codePoint < 0xE000) {
                if (!leadSurrogate) {
                  if (codePoint > 0xDBFF) {
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                  } else if (i + 1 === length) {
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                  }

                  leadSurrogate = codePoint;
                  continue;
                }

                if (codePoint < 0xDC00) {
                  if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                  leadSurrogate = codePoint;
                  continue;
                }

                codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
              } else if (leadSurrogate) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              }

              leadSurrogate = null;

              if (codePoint < 0x80) {
                if ((units -= 1) < 0) break;
                bytes.push(codePoint);
              } else if (codePoint < 0x800) {
                if ((units -= 2) < 0) break;
                bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
              } else if (codePoint < 0x10000) {
                if ((units -= 3) < 0) break;
                bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
              } else if (codePoint < 0x110000) {
                if ((units -= 4) < 0) break;
                bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
              } else {
                throw new Error('Invalid code point');
              }
            }

            return bytes;
          }

          function asciiToBytes(str) {
            var byteArray = [];

            for (var i = 0; i < str.length; ++i) {
              byteArray.push(str.charCodeAt(i) & 0xFF);
            }

            return byteArray;
          }

          function utf16leToBytes(str, units) {
            var c, hi, lo;
            var byteArray = [];

            for (var i = 0; i < str.length; ++i) {
              if ((units -= 2) < 0) break;
              c = str.charCodeAt(i);
              hi = c >> 8;
              lo = c % 256;
              byteArray.push(lo);
              byteArray.push(hi);
            }

            return byteArray;
          }

          function base64ToBytes(str) {
            return base64.toByteArray(base64clean(str));
          }

          function blitBuffer(src, dst, offset, length) {
            for (var i = 0; i < length; ++i) {
              if (i + offset >= dst.length || i >= src.length) break;
              dst[i + offset] = src[i];
            }

            return i;
          }

          function isInstance(obj, type) {
            return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
          }

          function numberIsNaN(obj) {
            return obj !== obj;
          }
        }).call(this);
      }).call(this, require("buffer").Buffer);
    }, {
      "base64-js": 31,
      "buffer": 33,
      "ieee754": 34
    }],
    34: [function (require, module, exports) {
      exports.read = function (buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;

        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;

        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }

        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };

      exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);

        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);

          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }

          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }

          if (value * c >= 2) {
            e++;
            c /= 2;
          }

          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }

        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

        e = e << mLen | m;
        eLen += mLen;

        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

        buffer[offset + i - d] |= s * 128;
      };
    }, {}],
    35: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getKey = getKey;
      exports.onRpcRequest = void 0;

      var _keyTree = require("@metamask/key-tree");

      async function getKey() {
        const solanaNode = await wallet.request({
          method: "snap_getBip44Entropy_3"
        });
        const deriveSolanaAddress = await (0, _keyTree.getBIP44AddressKeyDeriver)(solanaNode);
        const addressKey0 = await deriveSolanaAddress(0);
        const addressKey1 = await deriveSolanaAddress(1);
        return addressKey0.address;
      }

      const onRpcRequest = async ({
        origin,
        request
      }) => {
        switch (request.method) {
          case "hello":
            return wallet.request({
              method: "snap_confirm",
              params: [{
                prompt: `Hello, ${origin}!`,
                description: "This custom confirmation is just for display purposes.",
                textAreaContent: "But you can edit the snap source code to make it do something, if you want to!"
              }]
            });

          case "goodbye":
            return wallet.request({
              method: "snap_confirm",
              params: [{
                prompt: `Goodbye, ${origin}!`,
                description: "Let's goooo",
                textAreaContent: "Trying my best!!"
              }]
            });

          case "test":
            return await getKey();

          default:
            throw new Error("Method not found.");
        }
      };

      exports.onRpcRequest = onRpcRequest;
    }, {
      "@metamask/key-tree": 14
    }]
  }, {}, [35])(35);
});