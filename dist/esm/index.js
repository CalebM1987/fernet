"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
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
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
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
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
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
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
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
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer3;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer3.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer3.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function Buffer3(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer3.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer3.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    Buffer3.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer3, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
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
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer3.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer3.alloc(+length);
    }
    Buffer3.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer3.prototype;
    };
    Buffer3.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer3.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer3.from(b, b.offset, b.byteLength);
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer3.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer3.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer3.isBuffer(buf))
              buf = Buffer3.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(buffer, buf, pos);
          }
        } else if (!Buffer3.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer3.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer3.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
    Buffer3.prototype.equals = function equals(b) {
      if (!Buffer3.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer3.compare(this, b) === 0;
    };
    Buffer3.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
    }
    Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer3.from(target, target.offset, target.byteLength);
      }
      if (!Buffer3.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
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
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer3.from(val, encoding);
      }
      if (Buffer3.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
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
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer3.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
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
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer3.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer3.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer3.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }
      return len;
    };
    Buffer3.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
      if (name) {
        return `${name} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    }, RangeError);
    E("ERR_INVALID_ARG_TYPE", function(name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
    }, TypeError);
    E("ERR_OUT_OF_RANGE", function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    }, RangeError);
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
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
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
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
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module) {
    var buffer = require_buffer();
    var Buffer3 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer3.from && Buffer3.alloc && Buffer3.allocUnsafe && Buffer3.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer3(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer3.prototype);
    copyProps(Buffer3, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer3(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer3(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer3(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/randomBytes/browser.js
var require_browser = __commonJS({
  "node_modules/randomBytes/browser.js"(exports, module) {
    "use strict";
    var MAX_BYTES = 65536;
    var MAX_UINT32 = 4294967295;
    function oldBrowser() {
      throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11");
    }
    var Buffer3 = require_safe_buffer().Buffer;
    var crypto = global.crypto || global.msCrypto;
    if (crypto && crypto.getRandomValues) {
      module.exports = randomBytes2;
    } else {
      module.exports = oldBrowser;
    }
    function randomBytes2(size, cb) {
      if (size > MAX_UINT32)
        throw new RangeError("requested too many random bytes");
      var bytes = Buffer3.allocUnsafe(size);
      if (size > 0) {
        if (size > MAX_BYTES) {
          for (var generated = 0; generated < size; generated += MAX_BYTES) {
            crypto.getRandomValues(bytes.slice(generated, generated + MAX_BYTES));
          }
        } else {
          crypto.getRandomValues(bytes);
        }
      }
      if (typeof cb === "function") {
        return process.nextTick(function() {
          cb(null, bytes);
        });
      }
      return bytes;
    }
  }
});

// node_modules/crypto-js/core.js
var require_core = __commonJS({
  "node_modules/crypto-js/core.js"(exports, module) {
    (function(e, r) {
      typeof exports == "object" ? module.exports = exports = r() : typeof define == "function" && define.amd ? define([], r) : e.CryptoJS = r();
    })(exports, function() {
      var e = e || function(e2, r) {
        var t = {}, i = t.lib = {}, n = i.Base = function() {
          function e3() {
          }
          return { extend: function(r2) {
            e3.prototype = this;
            var t2 = new e3();
            return r2 && t2.mixIn(r2), t2.hasOwnProperty("init") || (t2.init = function() {
              t2.$super.init.apply(this, arguments);
            }), t2.init.prototype = t2, t2.$super = this, t2;
          }, create: function() {
            var e4 = this.extend();
            return e4.init.apply(e4, arguments), e4;
          }, init: function() {
          }, mixIn: function(e4) {
            for (var r2 in e4)
              e4.hasOwnProperty(r2) && (this[r2] = e4[r2]);
            e4.hasOwnProperty("toString") && (this.toString = e4.toString);
          }, clone: function() {
            return this.init.prototype.extend(this);
          } };
        }(), o = i.WordArray = n.extend({ init: function(e3, t2) {
          e3 = this.words = e3 || [], this.sigBytes = t2 != r ? t2 : 4 * e3.length;
        }, toString: function(e3) {
          return (e3 || s).stringify(this);
        }, concat: function(e3) {
          var r2 = this.words, t2 = e3.words, i2 = this.sigBytes, n2 = e3.sigBytes;
          if (this.clamp(), i2 % 4)
            for (var o2 = 0; n2 > o2; o2++) {
              var c2 = 255 & t2[o2 >>> 2] >>> 24 - 8 * (o2 % 4);
              r2[i2 + o2 >>> 2] |= c2 << 24 - 8 * ((i2 + o2) % 4);
            }
          else if (t2.length > 65535)
            for (var o2 = 0; n2 > o2; o2 += 4)
              r2[i2 + o2 >>> 2] = t2[o2 >>> 2];
          else
            r2.push.apply(r2, t2);
          return this.sigBytes += n2, this;
        }, clamp: function() {
          var r2 = this.words, t2 = this.sigBytes;
          r2[t2 >>> 2] &= 4294967295 << 32 - 8 * (t2 % 4), r2.length = e2.ceil(t2 / 4);
        }, clone: function() {
          var e3 = n.clone.call(this);
          return e3.words = this.words.slice(0), e3;
        }, random: function(r2) {
          for (var t2 = [], i2 = 0; r2 > i2; i2 += 4)
            t2.push(0 | 4294967296 * e2.random());
          return new o.init(t2, r2);
        } }), c = t.enc = {}, s = c.Hex = { stringify: function(e3) {
          for (var r2 = e3.words, t2 = e3.sigBytes, i2 = [], n2 = 0; t2 > n2; n2++) {
            var o2 = 255 & r2[n2 >>> 2] >>> 24 - 8 * (n2 % 4);
            i2.push((o2 >>> 4).toString(16)), i2.push((15 & o2).toString(16));
          }
          return i2.join("");
        }, parse: function(e3) {
          for (var r2 = e3.length, t2 = [], i2 = 0; r2 > i2; i2 += 2)
            t2[i2 >>> 3] |= parseInt(e3.substr(i2, 2), 16) << 24 - 4 * (i2 % 8);
          return new o.init(t2, r2 / 2);
        } }, u = c.Latin1 = { stringify: function(e3) {
          for (var r2 = e3.words, t2 = e3.sigBytes, i2 = [], n2 = 0; t2 > n2; n2++) {
            var o2 = 255 & r2[n2 >>> 2] >>> 24 - 8 * (n2 % 4);
            i2.push(String.fromCharCode(o2));
          }
          return i2.join("");
        }, parse: function(e3) {
          for (var r2 = e3.length, t2 = [], i2 = 0; r2 > i2; i2++)
            t2[i2 >>> 2] |= (255 & e3.charCodeAt(i2)) << 24 - 8 * (i2 % 4);
          return new o.init(t2, r2);
        } }, f = c.Utf8 = { stringify: function(e3) {
          try {
            return decodeURIComponent(escape(u.stringify(e3)));
          } catch (r2) {
            throw Error("Malformed UTF-8 data");
          }
        }, parse: function(e3) {
          return u.parse(unescape(encodeURIComponent(e3)));
        } }, a = i.BufferedBlockAlgorithm = n.extend({ reset: function() {
          this._data = new o.init(), this._nDataBytes = 0;
        }, _append: function(e3) {
          typeof e3 == "string" && (e3 = f.parse(e3)), this._data.concat(e3), this._nDataBytes += e3.sigBytes;
        }, _process: function(r2) {
          var t2 = this._data, i2 = t2.words, n2 = t2.sigBytes, c2 = this.blockSize, s2 = 4 * c2, u2 = n2 / s2;
          u2 = r2 ? e2.ceil(u2) : e2.max((0 | u2) - this._minBufferSize, 0);
          var f2 = u2 * c2, a2 = e2.min(4 * f2, n2);
          if (f2) {
            for (var p2 = 0; f2 > p2; p2 += c2)
              this._doProcessBlock(i2, p2);
            var d = i2.splice(0, f2);
            t2.sigBytes -= a2;
          }
          return new o.init(d, a2);
        }, clone: function() {
          var e3 = n.clone.call(this);
          return e3._data = this._data.clone(), e3;
        }, _minBufferSize: 0 });
        i.Hasher = a.extend({ cfg: n.extend(), init: function(e3) {
          this.cfg = this.cfg.extend(e3), this.reset();
        }, reset: function() {
          a.reset.call(this), this._doReset();
        }, update: function(e3) {
          return this._append(e3), this._process(), this;
        }, finalize: function(e3) {
          e3 && this._append(e3);
          var r2 = this._doFinalize();
          return r2;
        }, blockSize: 16, _createHelper: function(e3) {
          return function(r2, t2) {
            return new e3.init(t2).finalize(r2);
          };
        }, _createHmacHelper: function(e3) {
          return function(r2, t2) {
            return new p.HMAC.init(e3, t2).finalize(r2);
          };
        } });
        var p = t.algo = {};
        return t;
      }(Math);
      return e;
    });
  }
});

// node_modules/crypto-js/enc-base64.js
var require_enc_base64 = __commonJS({
  "node_modules/crypto-js/enc-base64.js"(exports, module) {
    (function(e, r) {
      typeof exports == "object" ? module.exports = exports = r(require_core()) : typeof define == "function" && define.amd ? define(["./core"], r) : r(e.CryptoJS);
    })(exports, function(e) {
      return function() {
        var r = e, t = r.lib, n = t.WordArray, i = r.enc;
        i.Base64 = { stringify: function(e2) {
          var r2 = e2.words, t2 = e2.sigBytes, n2 = this._map;
          e2.clamp();
          for (var i2 = [], o = 0; t2 > o; o += 3)
            for (var s = 255 & r2[o >>> 2] >>> 24 - 8 * (o % 4), c = 255 & r2[o + 1 >>> 2] >>> 24 - 8 * ((o + 1) % 4), a = 255 & r2[o + 2 >>> 2] >>> 24 - 8 * ((o + 2) % 4), f = s << 16 | c << 8 | a, u = 0; 4 > u && t2 > o + 0.75 * u; u++)
              i2.push(n2.charAt(63 & f >>> 6 * (3 - u)));
          var d = n2.charAt(64);
          if (d)
            for (; i2.length % 4; )
              i2.push(d);
          return i2.join("");
        }, parse: function(e2) {
          var r2 = e2.length, t2 = this._map, i2 = t2.charAt(64);
          if (i2) {
            var o = e2.indexOf(i2);
            o != -1 && (r2 = o);
          }
          for (var s = [], c = 0, a = 0; r2 > a; a++)
            if (a % 4) {
              var f = t2.indexOf(e2.charAt(a - 1)) << 2 * (a % 4), u = t2.indexOf(e2.charAt(a)) >>> 6 - 2 * (a % 4);
              s[c >>> 2] |= (f | u) << 24 - 8 * (c % 4), c++;
            }
          return n.create(s, c);
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
      }(), e.enc.Base64;
    });
  }
});

// node_modules/crypto-js/md5.js
var require_md5 = __commonJS({
  "node_modules/crypto-js/md5.js"(exports, module) {
    (function(e, r) {
      typeof exports == "object" ? module.exports = exports = r(require_core()) : typeof define == "function" && define.amd ? define(["./core"], r) : r(e.CryptoJS);
    })(exports, function(e) {
      return function(r) {
        function t(e2, r2, t2, n2, i2, o2, s2) {
          var c2 = e2 + (r2 & t2 | ~r2 & n2) + i2 + s2;
          return (c2 << o2 | c2 >>> 32 - o2) + r2;
        }
        function n(e2, r2, t2, n2, i2, o2, s2) {
          var c2 = e2 + (r2 & n2 | t2 & ~n2) + i2 + s2;
          return (c2 << o2 | c2 >>> 32 - o2) + r2;
        }
        function i(e2, r2, t2, n2, i2, o2, s2) {
          var c2 = e2 + (r2 ^ t2 ^ n2) + i2 + s2;
          return (c2 << o2 | c2 >>> 32 - o2) + r2;
        }
        function o(e2, r2, t2, n2, i2, o2, s2) {
          var c2 = e2 + (t2 ^ (r2 | ~n2)) + i2 + s2;
          return (c2 << o2 | c2 >>> 32 - o2) + r2;
        }
        var s = e, c = s.lib, f = c.WordArray, a = c.Hasher, u = s.algo, p = [];
        (function() {
          for (var e2 = 0; 64 > e2; e2++)
            p[e2] = 0 | 4294967296 * r.abs(r.sin(e2 + 1));
        })();
        var d = u.MD5 = a.extend({ _doReset: function() {
          this._hash = new f.init([1732584193, 4023233417, 2562383102, 271733878]);
        }, _doProcessBlock: function(e2, r2) {
          for (var s2 = 0; 16 > s2; s2++) {
            var c2 = r2 + s2, f2 = e2[c2];
            e2[c2] = 16711935 & (f2 << 8 | f2 >>> 24) | 4278255360 & (f2 << 24 | f2 >>> 8);
          }
          var a2 = this._hash.words, u2 = e2[r2 + 0], d2 = e2[r2 + 1], h = e2[r2 + 2], y = e2[r2 + 3], m = e2[r2 + 4], l = e2[r2 + 5], x = e2[r2 + 6], q = e2[r2 + 7], g = e2[r2 + 8], v = e2[r2 + 9], b = e2[r2 + 10], S = e2[r2 + 11], w = e2[r2 + 12], C = e2[r2 + 13], _ = e2[r2 + 14], A = e2[r2 + 15], B = a2[0], H = a2[1], j = a2[2], J = a2[3];
          B = t(B, H, j, J, u2, 7, p[0]), J = t(J, B, H, j, d2, 12, p[1]), j = t(j, J, B, H, h, 17, p[2]), H = t(H, j, J, B, y, 22, p[3]), B = t(B, H, j, J, m, 7, p[4]), J = t(J, B, H, j, l, 12, p[5]), j = t(j, J, B, H, x, 17, p[6]), H = t(H, j, J, B, q, 22, p[7]), B = t(B, H, j, J, g, 7, p[8]), J = t(J, B, H, j, v, 12, p[9]), j = t(j, J, B, H, b, 17, p[10]), H = t(H, j, J, B, S, 22, p[11]), B = t(B, H, j, J, w, 7, p[12]), J = t(J, B, H, j, C, 12, p[13]), j = t(j, J, B, H, _, 17, p[14]), H = t(H, j, J, B, A, 22, p[15]), B = n(B, H, j, J, d2, 5, p[16]), J = n(J, B, H, j, x, 9, p[17]), j = n(j, J, B, H, S, 14, p[18]), H = n(H, j, J, B, u2, 20, p[19]), B = n(B, H, j, J, l, 5, p[20]), J = n(J, B, H, j, b, 9, p[21]), j = n(j, J, B, H, A, 14, p[22]), H = n(H, j, J, B, m, 20, p[23]), B = n(B, H, j, J, v, 5, p[24]), J = n(J, B, H, j, _, 9, p[25]), j = n(j, J, B, H, y, 14, p[26]), H = n(H, j, J, B, g, 20, p[27]), B = n(B, H, j, J, C, 5, p[28]), J = n(J, B, H, j, h, 9, p[29]), j = n(j, J, B, H, q, 14, p[30]), H = n(H, j, J, B, w, 20, p[31]), B = i(B, H, j, J, l, 4, p[32]), J = i(J, B, H, j, g, 11, p[33]), j = i(j, J, B, H, S, 16, p[34]), H = i(H, j, J, B, _, 23, p[35]), B = i(B, H, j, J, d2, 4, p[36]), J = i(J, B, H, j, m, 11, p[37]), j = i(j, J, B, H, q, 16, p[38]), H = i(H, j, J, B, b, 23, p[39]), B = i(B, H, j, J, C, 4, p[40]), J = i(J, B, H, j, u2, 11, p[41]), j = i(j, J, B, H, y, 16, p[42]), H = i(H, j, J, B, x, 23, p[43]), B = i(B, H, j, J, v, 4, p[44]), J = i(J, B, H, j, w, 11, p[45]), j = i(j, J, B, H, A, 16, p[46]), H = i(H, j, J, B, h, 23, p[47]), B = o(B, H, j, J, u2, 6, p[48]), J = o(J, B, H, j, q, 10, p[49]), j = o(j, J, B, H, _, 15, p[50]), H = o(H, j, J, B, l, 21, p[51]), B = o(B, H, j, J, w, 6, p[52]), J = o(J, B, H, j, y, 10, p[53]), j = o(j, J, B, H, b, 15, p[54]), H = o(H, j, J, B, d2, 21, p[55]), B = o(B, H, j, J, g, 6, p[56]), J = o(J, B, H, j, A, 10, p[57]), j = o(j, J, B, H, x, 15, p[58]), H = o(H, j, J, B, C, 21, p[59]), B = o(B, H, j, J, m, 6, p[60]), J = o(J, B, H, j, S, 10, p[61]), j = o(j, J, B, H, h, 15, p[62]), H = o(H, j, J, B, v, 21, p[63]), a2[0] = 0 | a2[0] + B, a2[1] = 0 | a2[1] + H, a2[2] = 0 | a2[2] + j, a2[3] = 0 | a2[3] + J;
        }, _doFinalize: function() {
          var e2 = this._data, t2 = e2.words, n2 = 8 * this._nDataBytes, i2 = 8 * e2.sigBytes;
          t2[i2 >>> 5] |= 128 << 24 - i2 % 32;
          var o2 = r.floor(n2 / 4294967296), s2 = n2;
          t2[(i2 + 64 >>> 9 << 4) + 15] = 16711935 & (o2 << 8 | o2 >>> 24) | 4278255360 & (o2 << 24 | o2 >>> 8), t2[(i2 + 64 >>> 9 << 4) + 14] = 16711935 & (s2 << 8 | s2 >>> 24) | 4278255360 & (s2 << 24 | s2 >>> 8), e2.sigBytes = 4 * (t2.length + 1), this._process();
          for (var c2 = this._hash, f2 = c2.words, a2 = 0; 4 > a2; a2++) {
            var u2 = f2[a2];
            f2[a2] = 16711935 & (u2 << 8 | u2 >>> 24) | 4278255360 & (u2 << 24 | u2 >>> 8);
          }
          return c2;
        }, clone: function() {
          var e2 = a.clone.call(this);
          return e2._hash = this._hash.clone(), e2;
        } });
        s.MD5 = a._createHelper(d), s.HmacMD5 = a._createHmacHelper(d);
      }(Math), e.MD5;
    });
  }
});

// node_modules/crypto-js/sha1.js
var require_sha1 = __commonJS({
  "node_modules/crypto-js/sha1.js"(exports, module) {
    (function(e, r) {
      typeof exports == "object" ? module.exports = exports = r(require_core()) : typeof define == "function" && define.amd ? define(["./core"], r) : r(e.CryptoJS);
    })(exports, function(e) {
      return function() {
        var r = e, t = r.lib, n = t.WordArray, i = t.Hasher, o = r.algo, s = [], c = o.SHA1 = i.extend({ _doReset: function() {
          this._hash = new n.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        }, _doProcessBlock: function(e2, r2) {
          for (var t2 = this._hash.words, n2 = t2[0], i2 = t2[1], o2 = t2[2], c2 = t2[3], a = t2[4], f = 0; 80 > f; f++) {
            if (16 > f)
              s[f] = 0 | e2[r2 + f];
            else {
              var u = s[f - 3] ^ s[f - 8] ^ s[f - 14] ^ s[f - 16];
              s[f] = u << 1 | u >>> 31;
            }
            var d = (n2 << 5 | n2 >>> 27) + a + s[f];
            d += 20 > f ? (i2 & o2 | ~i2 & c2) + 1518500249 : 40 > f ? (i2 ^ o2 ^ c2) + 1859775393 : 60 > f ? (i2 & o2 | i2 & c2 | o2 & c2) - 1894007588 : (i2 ^ o2 ^ c2) - 899497514, a = c2, c2 = o2, o2 = i2 << 30 | i2 >>> 2, i2 = n2, n2 = d;
          }
          t2[0] = 0 | t2[0] + n2, t2[1] = 0 | t2[1] + i2, t2[2] = 0 | t2[2] + o2, t2[3] = 0 | t2[3] + c2, t2[4] = 0 | t2[4] + a;
        }, _doFinalize: function() {
          var e2 = this._data, r2 = e2.words, t2 = 8 * this._nDataBytes, n2 = 8 * e2.sigBytes;
          return r2[n2 >>> 5] |= 128 << 24 - n2 % 32, r2[(n2 + 64 >>> 9 << 4) + 14] = Math.floor(t2 / 4294967296), r2[(n2 + 64 >>> 9 << 4) + 15] = t2, e2.sigBytes = 4 * r2.length, this._process(), this._hash;
        }, clone: function() {
          var e2 = i.clone.call(this);
          return e2._hash = this._hash.clone(), e2;
        } });
        r.SHA1 = i._createHelper(c), r.HmacSHA1 = i._createHmacHelper(c);
      }(), e.SHA1;
    });
  }
});

// node_modules/crypto-js/hmac.js
var require_hmac = __commonJS({
  "node_modules/crypto-js/hmac.js"(exports, module) {
    (function(e, r) {
      typeof exports == "object" ? module.exports = exports = r(require_core()) : typeof define == "function" && define.amd ? define(["./core"], r) : r(e.CryptoJS);
    })(exports, function(e) {
      (function() {
        var r = e, t = r.lib, i = t.Base, n = r.enc, o = n.Utf8, c = r.algo;
        c.HMAC = i.extend({ init: function(e2, r2) {
          e2 = this._hasher = new e2.init(), typeof r2 == "string" && (r2 = o.parse(r2));
          var t2 = e2.blockSize, i2 = 4 * t2;
          r2.sigBytes > i2 && (r2 = e2.finalize(r2)), r2.clamp();
          for (var n2 = this._oKey = r2.clone(), c2 = this._iKey = r2.clone(), s = n2.words, a = c2.words, f = 0; t2 > f; f++)
            s[f] ^= 1549556828, a[f] ^= 909522486;
          n2.sigBytes = c2.sigBytes = i2, this.reset();
        }, reset: function() {
          var e2 = this._hasher;
          e2.reset(), e2.update(this._iKey);
        }, update: function(e2) {
          return this._hasher.update(e2), this;
        }, finalize: function(e2) {
          var r2 = this._hasher, t2 = r2.finalize(e2);
          r2.reset();
          var i2 = r2.finalize(this._oKey.clone().concat(t2));
          return i2;
        } });
      })();
    });
  }
});

// node_modules/crypto-js/evpkdf.js
var require_evpkdf = __commonJS({
  "node_modules/crypto-js/evpkdf.js"(exports, module) {
    (function(e, r) {
      typeof exports == "object" ? module.exports = exports = r(require_core(), require_sha1(), require_hmac()) : typeof define == "function" && define.amd ? define(["./core", "./sha1", "./hmac"], r) : r(e.CryptoJS);
    })(exports, function(e) {
      return function() {
        var r = e, t = r.lib, n = t.Base, i = t.WordArray, o = r.algo, a = o.MD5, s = o.EvpKDF = n.extend({ cfg: n.extend({ keySize: 4, hasher: a, iterations: 1 }), init: function(e2) {
          this.cfg = this.cfg.extend(e2);
        }, compute: function(e2, r2) {
          for (var t2 = this.cfg, n2 = t2.hasher.create(), o2 = i.create(), a2 = o2.words, s2 = t2.keySize, c = t2.iterations; s2 > a2.length; ) {
            f && n2.update(f);
            var f = n2.update(e2).finalize(r2);
            n2.reset();
            for (var u = 1; c > u; u++)
              f = n2.finalize(f), n2.reset();
            o2.concat(f);
          }
          return o2.sigBytes = 4 * s2, o2;
        } });
        r.EvpKDF = function(e2, r2, t2) {
          return s.create(t2).compute(e2, r2);
        };
      }(), e.EvpKDF;
    });
  }
});

// node_modules/crypto-js/cipher-core.js
var require_cipher_core = __commonJS({
  "node_modules/crypto-js/cipher-core.js"(exports, module) {
    (function(e, r) {
      typeof exports == "object" ? module.exports = exports = r(require_core()) : typeof define == "function" && define.amd ? define(["./core"], r) : r(e.CryptoJS);
    })(exports, function(e) {
      e.lib.Cipher || function(r) {
        var t = e, i = t.lib, n = i.Base, o = i.WordArray, c = i.BufferedBlockAlgorithm, a = t.enc;
        a.Utf8;
        var s = a.Base64, f = t.algo, u = f.EvpKDF, h = i.Cipher = c.extend({ cfg: n.extend(), createEncryptor: function(e2, r2) {
          return this.create(this._ENC_XFORM_MODE, e2, r2);
        }, createDecryptor: function(e2, r2) {
          return this.create(this._DEC_XFORM_MODE, e2, r2);
        }, init: function(e2, r2, t2) {
          this.cfg = this.cfg.extend(t2), this._xformMode = e2, this._key = r2, this.reset();
        }, reset: function() {
          c.reset.call(this), this._doReset();
        }, process: function(e2) {
          return this._append(e2), this._process();
        }, finalize: function(e2) {
          e2 && this._append(e2);
          var r2 = this._doFinalize();
          return r2;
        }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function() {
          function e2(e3) {
            return typeof e3 == "string" ? q : _;
          }
          return function(r2) {
            return { encrypt: function(t2, i2, n2) {
              return e2(i2).encrypt(r2, t2, i2, n2);
            }, decrypt: function(t2, i2, n2) {
              return e2(i2).decrypt(r2, t2, i2, n2);
            } };
          };
        }() });
        i.StreamCipher = h.extend({ _doFinalize: function() {
          var e2 = this._process(true);
          return e2;
        }, blockSize: 1 });
        var d = t.mode = {}, p = i.BlockCipherMode = n.extend({ createEncryptor: function(e2, r2) {
          return this.Encryptor.create(e2, r2);
        }, createDecryptor: function(e2, r2) {
          return this.Decryptor.create(e2, r2);
        }, init: function(e2, r2) {
          this._cipher = e2, this._iv = r2;
        } }), l = d.CBC = function() {
          function e2(e3, t3, i2) {
            var n2 = this._iv;
            if (n2) {
              var o2 = n2;
              this._iv = r;
            } else
              var o2 = this._prevBlock;
            for (var c2 = 0; i2 > c2; c2++)
              e3[t3 + c2] ^= o2[c2];
          }
          var t2 = p.extend();
          return t2.Encryptor = t2.extend({ processBlock: function(r2, t3) {
            var i2 = this._cipher, n2 = i2.blockSize;
            e2.call(this, r2, t3, n2), i2.encryptBlock(r2, t3), this._prevBlock = r2.slice(t3, t3 + n2);
          } }), t2.Decryptor = t2.extend({ processBlock: function(r2, t3) {
            var i2 = this._cipher, n2 = i2.blockSize, o2 = r2.slice(t3, t3 + n2);
            i2.decryptBlock(r2, t3), e2.call(this, r2, t3, n2), this._prevBlock = o2;
          } }), t2;
        }(), y = t.pad = {}, v = y.Pkcs7 = { pad: function(e2, r2) {
          for (var t2 = 4 * r2, i2 = t2 - e2.sigBytes % t2, n2 = i2 << 24 | i2 << 16 | i2 << 8 | i2, c2 = [], a2 = 0; i2 > a2; a2 += 4)
            c2.push(n2);
          var s2 = o.create(c2, i2);
          e2.concat(s2);
        }, unpad: function(e2) {
          var r2 = 255 & e2.words[e2.sigBytes - 1 >>> 2];
          e2.sigBytes -= r2;
        } };
        i.BlockCipher = h.extend({ cfg: h.cfg.extend({ mode: l, padding: v }), reset: function() {
          h.reset.call(this);
          var e2 = this.cfg, r2 = e2.iv, t2 = e2.mode;
          if (this._xformMode == this._ENC_XFORM_MODE)
            var i2 = t2.createEncryptor;
          else {
            var i2 = t2.createDecryptor;
            this._minBufferSize = 1;
          }
          this._mode = i2.call(t2, this, r2 && r2.words);
        }, _doProcessBlock: function(e2, r2) {
          this._mode.processBlock(e2, r2);
        }, _doFinalize: function() {
          var e2 = this.cfg.padding;
          if (this._xformMode == this._ENC_XFORM_MODE) {
            e2.pad(this._data, this.blockSize);
            var r2 = this._process(true);
          } else {
            var r2 = this._process(true);
            e2.unpad(r2);
          }
          return r2;
        }, blockSize: 4 });
        var g = i.CipherParams = n.extend({ init: function(e2) {
          this.mixIn(e2);
        }, toString: function(e2) {
          return (e2 || this.formatter).stringify(this);
        } }), m = t.format = {}, x = m.OpenSSL = { stringify: function(e2) {
          var r2 = e2.ciphertext, t2 = e2.salt;
          if (t2)
            var i2 = o.create([1398893684, 1701076831]).concat(t2).concat(r2);
          else
            var i2 = r2;
          return i2.toString(s);
        }, parse: function(e2) {
          var r2 = s.parse(e2), t2 = r2.words;
          if (t2[0] == 1398893684 && t2[1] == 1701076831) {
            var i2 = o.create(t2.slice(2, 4));
            t2.splice(0, 4), r2.sigBytes -= 16;
          }
          return g.create({ ciphertext: r2, salt: i2 });
        } }, _ = i.SerializableCipher = n.extend({ cfg: n.extend({ format: x }), encrypt: function(e2, r2, t2, i2) {
          i2 = this.cfg.extend(i2);
          var n2 = e2.createEncryptor(t2, i2), o2 = n2.finalize(r2), c2 = n2.cfg;
          return g.create({ ciphertext: o2, key: t2, iv: c2.iv, algorithm: e2, mode: c2.mode, padding: c2.padding, blockSize: e2.blockSize, formatter: i2.format });
        }, decrypt: function(e2, r2, t2, i2) {
          i2 = this.cfg.extend(i2), r2 = this._parse(r2, i2.format);
          var n2 = e2.createDecryptor(t2, i2).finalize(r2.ciphertext);
          return n2;
        }, _parse: function(e2, r2) {
          return typeof e2 == "string" ? r2.parse(e2, this) : e2;
        } }), w = t.kdf = {}, S = w.OpenSSL = { execute: function(e2, r2, t2, i2) {
          i2 || (i2 = o.random(8));
          var n2 = u.create({ keySize: r2 + t2 }).compute(e2, i2), c2 = o.create(n2.words.slice(r2), 4 * t2);
          return n2.sigBytes = 4 * r2, g.create({ key: n2, iv: c2, salt: i2 });
        } }, q = i.PasswordBasedCipher = _.extend({ cfg: _.cfg.extend({ kdf: S }), encrypt: function(e2, r2, t2, i2) {
          i2 = this.cfg.extend(i2);
          var n2 = i2.kdf.execute(t2, e2.keySize, e2.ivSize);
          i2.iv = n2.iv;
          var o2 = _.encrypt.call(this, e2, r2, n2.key, i2);
          return o2.mixIn(n2), o2;
        }, decrypt: function(e2, r2, t2, i2) {
          i2 = this.cfg.extend(i2), r2 = this._parse(r2, i2.format);
          var n2 = i2.kdf.execute(t2, e2.keySize, e2.ivSize, r2.salt);
          i2.iv = n2.iv;
          var o2 = _.decrypt.call(this, e2, r2, n2.key, i2);
          return o2;
        } });
      }();
    });
  }
});

// node_modules/crypto-js/aes.js
var require_aes = __commonJS({
  "node_modules/crypto-js/aes.js"(exports, module) {
    (function(e, r) {
      typeof exports == "object" ? module.exports = exports = r(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core()) : typeof define == "function" && define.amd ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], r) : r(e.CryptoJS);
    })(exports, function(e) {
      return function() {
        var r = e, t = r.lib, i = t.BlockCipher, o = r.algo, n = [], c = [], s = [], a = [], f = [], u = [], h = [], p = [], d = [], l = [];
        (function() {
          for (var e2 = [], r2 = 0; 256 > r2; r2++)
            e2[r2] = 128 > r2 ? r2 << 1 : 283 ^ r2 << 1;
          for (var t2 = 0, i2 = 0, r2 = 0; 256 > r2; r2++) {
            var o2 = i2 ^ i2 << 1 ^ i2 << 2 ^ i2 << 3 ^ i2 << 4;
            o2 = 99 ^ (o2 >>> 8 ^ 255 & o2), n[t2] = o2, c[o2] = t2;
            var y2 = e2[t2], v2 = e2[y2], m = e2[v2], x = 257 * e2[o2] ^ 16843008 * o2;
            s[t2] = x << 24 | x >>> 8, a[t2] = x << 16 | x >>> 16, f[t2] = x << 8 | x >>> 24, u[t2] = x;
            var x = 16843009 * m ^ 65537 * v2 ^ 257 * y2 ^ 16843008 * t2;
            h[o2] = x << 24 | x >>> 8, p[o2] = x << 16 | x >>> 16, d[o2] = x << 8 | x >>> 24, l[o2] = x, t2 ? (t2 = y2 ^ e2[e2[e2[m ^ y2]]], i2 ^= e2[e2[i2]]) : t2 = i2 = 1;
          }
        })();
        var y = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], v = o.AES = i.extend({ _doReset: function() {
          for (var e2 = this._key, r2 = e2.words, t2 = e2.sigBytes / 4, i2 = this._nRounds = t2 + 6, o2 = 4 * (i2 + 1), c2 = this._keySchedule = [], s2 = 0; o2 > s2; s2++)
            if (t2 > s2)
              c2[s2] = r2[s2];
            else {
              var a2 = c2[s2 - 1];
              s2 % t2 ? t2 > 6 && s2 % t2 == 4 && (a2 = n[a2 >>> 24] << 24 | n[255 & a2 >>> 16] << 16 | n[255 & a2 >>> 8] << 8 | n[255 & a2]) : (a2 = a2 << 8 | a2 >>> 24, a2 = n[a2 >>> 24] << 24 | n[255 & a2 >>> 16] << 16 | n[255 & a2 >>> 8] << 8 | n[255 & a2], a2 ^= y[0 | s2 / t2] << 24), c2[s2] = c2[s2 - t2] ^ a2;
            }
          for (var f2 = this._invKeySchedule = [], u2 = 0; o2 > u2; u2++) {
            var s2 = o2 - u2;
            if (u2 % 4)
              var a2 = c2[s2];
            else
              var a2 = c2[s2 - 4];
            f2[u2] = 4 > u2 || 4 >= s2 ? a2 : h[n[a2 >>> 24]] ^ p[n[255 & a2 >>> 16]] ^ d[n[255 & a2 >>> 8]] ^ l[n[255 & a2]];
          }
        }, encryptBlock: function(e2, r2) {
          this._doCryptBlock(e2, r2, this._keySchedule, s, a, f, u, n);
        }, decryptBlock: function(e2, r2) {
          var t2 = e2[r2 + 1];
          e2[r2 + 1] = e2[r2 + 3], e2[r2 + 3] = t2, this._doCryptBlock(e2, r2, this._invKeySchedule, h, p, d, l, c);
          var t2 = e2[r2 + 1];
          e2[r2 + 1] = e2[r2 + 3], e2[r2 + 3] = t2;
        }, _doCryptBlock: function(e2, r2, t2, i2, o2, n2, c2, s2) {
          for (var a2 = this._nRounds, f2 = e2[r2] ^ t2[0], u2 = e2[r2 + 1] ^ t2[1], h2 = e2[r2 + 2] ^ t2[2], p2 = e2[r2 + 3] ^ t2[3], d2 = 4, l2 = 1; a2 > l2; l2++) {
            var y2 = i2[f2 >>> 24] ^ o2[255 & u2 >>> 16] ^ n2[255 & h2 >>> 8] ^ c2[255 & p2] ^ t2[d2++], v2 = i2[u2 >>> 24] ^ o2[255 & h2 >>> 16] ^ n2[255 & p2 >>> 8] ^ c2[255 & f2] ^ t2[d2++], m = i2[h2 >>> 24] ^ o2[255 & p2 >>> 16] ^ n2[255 & f2 >>> 8] ^ c2[255 & u2] ^ t2[d2++], x = i2[p2 >>> 24] ^ o2[255 & f2 >>> 16] ^ n2[255 & u2 >>> 8] ^ c2[255 & h2] ^ t2[d2++];
            f2 = y2, u2 = v2, h2 = m, p2 = x;
          }
          var y2 = (s2[f2 >>> 24] << 24 | s2[255 & u2 >>> 16] << 16 | s2[255 & h2 >>> 8] << 8 | s2[255 & p2]) ^ t2[d2++], v2 = (s2[u2 >>> 24] << 24 | s2[255 & h2 >>> 16] << 16 | s2[255 & p2 >>> 8] << 8 | s2[255 & f2]) ^ t2[d2++], m = (s2[h2 >>> 24] << 24 | s2[255 & p2 >>> 16] << 16 | s2[255 & f2 >>> 8] << 8 | s2[255 & u2]) ^ t2[d2++], x = (s2[p2 >>> 24] << 24 | s2[255 & f2 >>> 16] << 16 | s2[255 & u2 >>> 8] << 8 | s2[255 & h2]) ^ t2[d2++];
          e2[r2] = y2, e2[r2 + 1] = v2, e2[r2 + 2] = m, e2[r2 + 3] = x;
        }, keySize: 8 });
        r.AES = i._createHelper(v);
      }(), e.AES;
    });
  }
});

// node_modules/crypto-js/enc-utf8.js
var require_enc_utf8 = __commonJS({
  "node_modules/crypto-js/enc-utf8.js"(exports, module) {
    (function(e, r) {
      typeof exports == "object" ? module.exports = exports = r(require_core()) : typeof define == "function" && define.amd ? define(["./core"], r) : r(e.CryptoJS);
    })(exports, function(e) {
      return e.enc.Utf8;
    });
  }
});

// node_modules/crypto-js/enc-hex.js
var require_enc_hex = __commonJS({
  "node_modules/crypto-js/enc-hex.js"(exports, module) {
    (function(e, r) {
      typeof exports == "object" ? module.exports = exports = r(require_core()) : typeof define == "function" && define.amd ? define(["./core"], r) : r(e.CryptoJS);
    })(exports, function(e) {
      return e.enc.Hex;
    });
  }
});

// node_modules/crypto-js/sha256.js
var require_sha256 = __commonJS({
  "node_modules/crypto-js/sha256.js"(exports, module) {
    (function(e, r) {
      typeof exports == "object" ? module.exports = exports = r(require_core()) : typeof define == "function" && define.amd ? define(["./core"], r) : r(e.CryptoJS);
    })(exports, function(e) {
      return function(r) {
        var t = e, n = t.lib, i = n.WordArray, o = n.Hasher, s = t.algo, c = [], a = [];
        (function() {
          function e2(e3) {
            for (var t3 = r.sqrt(e3), n3 = 2; t3 >= n3; n3++)
              if (!(e3 % n3))
                return false;
            return true;
          }
          function t2(e3) {
            return 0 | 4294967296 * (e3 - (0 | e3));
          }
          for (var n2 = 2, i2 = 0; 64 > i2; )
            e2(n2) && (8 > i2 && (c[i2] = t2(r.pow(n2, 0.5))), a[i2] = t2(r.pow(n2, 1 / 3)), i2++), n2++;
        })();
        var f = [], u = s.SHA256 = o.extend({ _doReset: function() {
          this._hash = new i.init(c.slice(0));
        }, _doProcessBlock: function(e2, r2) {
          for (var t2 = this._hash.words, n2 = t2[0], i2 = t2[1], o2 = t2[2], s2 = t2[3], c2 = t2[4], u2 = t2[5], d = t2[6], p = t2[7], h = 0; 64 > h; h++) {
            if (16 > h)
              f[h] = 0 | e2[r2 + h];
            else {
              var y = f[h - 15], l = (y << 25 | y >>> 7) ^ (y << 14 | y >>> 18) ^ y >>> 3, m = f[h - 2], x = (m << 15 | m >>> 17) ^ (m << 13 | m >>> 19) ^ m >>> 10;
              f[h] = l + f[h - 7] + x + f[h - 16];
            }
            var q = c2 & u2 ^ ~c2 & d, g = n2 & i2 ^ n2 & o2 ^ i2 & o2, v = (n2 << 30 | n2 >>> 2) ^ (n2 << 19 | n2 >>> 13) ^ (n2 << 10 | n2 >>> 22), _ = (c2 << 26 | c2 >>> 6) ^ (c2 << 21 | c2 >>> 11) ^ (c2 << 7 | c2 >>> 25), b = p + _ + q + a[h] + f[h], S = v + g;
            p = d, d = u2, u2 = c2, c2 = 0 | s2 + b, s2 = o2, o2 = i2, i2 = n2, n2 = 0 | b + S;
          }
          t2[0] = 0 | t2[0] + n2, t2[1] = 0 | t2[1] + i2, t2[2] = 0 | t2[2] + o2, t2[3] = 0 | t2[3] + s2, t2[4] = 0 | t2[4] + c2, t2[5] = 0 | t2[5] + u2, t2[6] = 0 | t2[6] + d, t2[7] = 0 | t2[7] + p;
        }, _doFinalize: function() {
          var e2 = this._data, t2 = e2.words, n2 = 8 * this._nDataBytes, i2 = 8 * e2.sigBytes;
          return t2[i2 >>> 5] |= 128 << 24 - i2 % 32, t2[(i2 + 64 >>> 9 << 4) + 14] = r.floor(n2 / 4294967296), t2[(i2 + 64 >>> 9 << 4) + 15] = n2, e2.sigBytes = 4 * t2.length, this._process(), this._hash;
        }, clone: function() {
          var e2 = o.clone.call(this);
          return e2._hash = this._hash.clone(), e2;
        } });
        t.SHA256 = o._createHelper(u), t.HmacSHA256 = o._createHmacHelper(u);
      }(Math), e.SHA256;
    });
  }
});

// node_modules/crypto-js/hmac-sha256.js
var require_hmac_sha256 = __commonJS({
  "node_modules/crypto-js/hmac-sha256.js"(exports, module) {
    (function(e, r) {
      typeof exports == "object" ? module.exports = exports = r(require_core(), require_sha256(), require_hmac()) : typeof define == "function" && define.amd ? define(["./core", "./sha256", "./hmac"], r) : r(e.CryptoJS);
    })(exports, function(e) {
      return e.HmacSHA256;
    });
  }
});

// src/lib/fernet.ts
var import_buffer = __toESM(require_buffer(), 1);
var import_randomBytes = __toESM(require_browser(), 1);
var import_aes = __toESM(require_aes(), 1);
var import_enc_utf8 = __toESM(require_enc_utf8(), 1);
var import_enc_hex = __toESM(require_enc_hex(), 1);
var import_enc_base64 = __toESM(require_enc_base64(), 1);
var import_hmac_sha256 = __toESM(require_hmac_sha256(), 1);
console.debug("BUFFER IS: ", import_buffer.Buffer);
var defaults = {
  ttl: 0,
  versionHex: "80",
  secret: void 0
};
var URLBase64 = {
  encode(buffer) {
    return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  },
  decode(base64) {
    base64 += Array(5 - base64.length % 4).join("=");
    base64 = base64.replace(/\-/g, "+").replace(/\_/g, "/");
    return new import_buffer.Buffer(base64, "base64");
  },
  validate(base64) {
    return /^[A-Za-z0-9\-_]+$/.test(base64);
  }
};
function lpad(str, padString, length) {
  while (str.length < length)
    str = padString + str;
  return str;
}
function urlsafe(string) {
  return string.replace(/\+/g, "-").replace(/\//g, "_");
}
var parseHex = (hexString) => {
  return parseInt("0x" + hexString);
};
function hexBits(bits) {
  return bits / 8 * 2;
}
function decode64toHex(string) {
  const s = URLBase64.decode(string.replace(/=+$/, ""));
  return new import_buffer.Buffer(s).toString("hex");
}
function ArrayToHex(array) {
  let hex = "";
  for (const _byte in array) {
    hex += lpad(Number(_byte).toString(16), "0", 2);
  }
  return hex;
}
function randomHex(size) {
  return (0, import_randomBytes.default)(128 / 8).toString("hex");
}
function setIV(iv_array) {
  return Array.isArray(iv_array) ? ArrayToHex(iv_array) : randomHex(128 / 8);
}
function timeBytes(time) {
  if (time) {
    time = time / 1e3;
  } else {
    time = Math.round(new Date() / 1e3);
  }
  const hexTime = lpad(time.toString(16), "0", "16");
  return import_enc_hex.default.parse(hexTime);
}
function setSecret(secret64) {
  defaults.secret = new Secret(secret64);
  return defaults.secret;
}
function encryptMessage(message, encryptionKey, iv) {
  const encrypted = import_aes.default.encrypt(message, encryptionKey, { iv });
  return encrypted.ciphertext;
}
function decryptMessage(cipherText, encryptionKey, iv) {
  const encrypted = {
    ciphertext: cipherText,
    key: encryptionKey,
    iv
  };
  const decrypted = import_aes.default.decrypt(encrypted, encryptionKey, { iv });
  return decrypted.toString(import_enc_utf8.default);
}
function createToken(signingKey, time, iv, cipherText) {
  const hmac = createHmac(signingKey, time, iv, cipherText);
  let tokenWords = import_enc_hex.default.parse(defaults.versionHex);
  for (let c of [time, iv, cipherText, hmac]) {
    tokenWords = tokenWords.concat(c);
  }
  return urlsafe(tokenWords.toString(import_enc_base64.default));
}
function createHmac(signingKey, time, iv, cipherText) {
  let hmacWords = import_enc_hex.default.parse(defaults.versionHex);
  for (let c of [time, iv, cipherText]) {
    if (c) {
      hmacWords = hmacWords.concat(c);
    }
  }
  return (0, import_hmac_sha256.default)(hmacWords, signingKey);
}
var Secret = class {
  constructor(secret64) {
    const secret = decode64toHex(secret64);
    if (secret.length !== hexBits(256)) {
      throw new Error("Secret must be 32 url-safe base64-encoded bytes.");
    }
    this.signingKeyHex = secret.slice(0, hexBits(128));
    this.signingKey = import_enc_hex.default.parse(this.signingKeyHex);
    this.encryptionKeyHex = secret.slice(hexBits(128));
    this.encryptionKey = import_enc_hex.default.parse(this.encryptionKeyHex);
  }
};
var Token = class {
  constructor(opts) {
    this.maxClockSkew = 60;
    opts = opts || {};
    this.secret = opts.secret || defaults.secret;
    this.ttl = opts.ttl || defaults.ttl;
    if (opts.ttl === 0)
      this.ttl = 0;
    this.message = opts.message ?? "";
    this.cipherText = opts.cipherText;
    this.token = opts.token ?? "";
    this.version = opts.version || parseHex(defaults.versionHex);
    this.optsIV = opts.iv;
    this.time = opts.time ? timeBytes(new Date(Date.parse(opts.time))) : timeBytes(new Date());
    this.encoded = false;
  }
  toString() {
    return this.encoded ? this.token : this.message;
  }
  encode(message) {
    if (!this.secret)
      throw new Error("Secret not set");
    this.encoded = true;
    this.ivHex = setIV(this.optsIV);
    this.iv = import_enc_hex.default.parse(this.ivHex);
    this.message = message || this.message;
    this.cipherText = encryptMessage(this.message, this.secret.encryptionKey, this.iv);
    this.token = createToken(this.secret.signingKey, this.time, this.iv, this.cipherText);
    return this.token;
  }
  decode(token) {
    if (!this.secret)
      throw new Error("Secret not set");
    this.encoded = false;
    this.token = token || this.token;
    const tokenString = decode64toHex(this.token);
    const versionOffset = hexBits(8);
    const timeOffset = versionOffset + hexBits(64);
    const ivOffset = timeOffset + hexBits(128);
    const hmacOffset = tokenString.length - hexBits(256);
    const timeInt = parseHex(tokenString.slice(versionOffset, timeOffset));
    this.version = parseHex(tokenString.slice(0, versionOffset));
    if (this.version != 128) {
      throw new Error("Invalid version");
    }
    this.time = new Date(timeInt * 1e3);
    const currentTime = new Date();
    const timeDiff = (currentTime - this.time) / 1e3;
    if (this.ttl > 0 && timeDiff > this.ttl) {
      throw new Error("Invalid Token: TTL");
    }
    console.log(this.time, timeInt, this.maxClockSkew);
    if (currentTime / 1e3 + this.maxClockSkew < timeInt) {
      throw new Error("far-future timestamp");
    }
    this.ivHex = tokenString.slice(timeOffset, ivOffset);
    this.iv = import_enc_hex.default.parse(this.ivHex);
    this.cipherTextHex = tokenString.slice(ivOffset, hmacOffset);
    this.cipherText = import_enc_hex.default.parse(this.cipherTextHex);
    this.hmacHex = tokenString.slice(hmacOffset);
    const decodedHmac = createHmac(this.secret.signingKey, timeBytes(this.time), this.iv, this.cipherText);
    const decodedHmacHex = decodedHmac.toString(import_enc_hex.default);
    let accum = 0;
    for (let i = 0; i < 64; i++) {
      accum += decodedHmacHex.charCodeAt(i) ^ this.hmacHex.charCodeAt(i);
    }
    if (accum != 0)
      throw new Error("Invalid Token: HMAC");
    this.message = decryptMessage(this.cipherText, this.secret.encryptionKey, this.iv);
    return this.message;
  }
};
export {
  Secret,
  Token,
  defaults,
  setSecret
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
