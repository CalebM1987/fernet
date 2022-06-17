
// import buffer from './buffer'
// const { Buffer } = buffer
// window ? window.buffer = buffer: null
// globalThis ? globalThis.buffer = buffer: null
// window ? window.Buffer = Buffer: null
// globalThis ? globalThis.Buffer = Buffer: null;
/**
 * This an es6 port of the library found here:
 *    https://github.com/csquared/fernet.js
 *
 * This was ported due to issues with the global module scope and caused issues with rollup.js.
 */
// import URLBase64 from "urlsafe-base64"; // having issues finding buffer
import { Buffer } from 'buffer';
// console.debug('BUFFER IS: ', Buffer)
import randomBytes from "randomBytes";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import Hex from "crypto-js/enc-hex";
import Base64 from "crypto-js/enc-base64";
import HmacSHA256 from "crypto-js/hmac-sha256";

const defaults: Partial<FernetOptions> = {
  ttl: 0,
  versionHex: '80',
  secret: undefined
}


const URLBase64 = {
  encode(buffer: Buffer) {
    return buffer.toString('base64')
      .replace(/\+/g, '-') // Convert '+' to '-'
      .replace(/\//g, '_') // Convert '/' to '_'
      .replace(/=+$/, ''); // Remove ending '='
  },

  decode(base64: string) {

    // Add removed at end '='
    base64 += Array(5 - base64.length % 4).join('=');
  
    base64 = base64
      .replace(/\-/g, '+') // Convert '-' to '+'
      .replace(/\_/g, '/'); // Convert '_' to '/'
  
    return new Buffer(base64, 'base64');
  },

  validate(base64: string) {
    return /^[A-Za-z0-9\-_]+$/.test(base64);
  }
}

export type TextKey = string | CryptoJS.lib.WordArray;


/**
 * left pad a string for some hex conversions (changed to function rather than messing with the string prototype)
 *
 * @param {String} str - input string for padding
 * @param {String} padString - pad string to prepend input string
 * @param {Number} length - length of output padded string
 * @return {String} the padded string
 */
function lpad(str: string, padString: string, length: number) {
  while (str.length < length) str = padString + str;
  return str;
}

/**
 * Makes a Base64 string a url-safe base64 slertring
 * @param {String} string - input string to make url-safe
 * @return {String} a url-safe base64 string
 */
function urlsafe(string: string) {
  return string.replace(/\+/g, "-").replace(/\//g, "_"); //.replace(/=+$/, '')
}

/**
 * parse a Hex string to an Int
 * @param {String} hexString - a hexlified string
 * @return {Number} resulting integer from input hex string
 */
const parseHex = (hexString: string) => {
  return parseInt("0x" + hexString);
};

/**
 * turn bits into number of chars in a hex string
 * @param {Number} bits - input bits to convert to hex
 * @return {Number} number of chars in hex string
 */
function hexBits(bits: number) {
  return (bits / 8) * 2;
}

/**
 * convert base64 string to hex string
 * @param {String} string - input base64 string to hex
 * @return {String} a hex string
 */
function decode64toHex(string: string) {
  const s = URLBase64.decode(string.replace(/=+$/, ""));
  return new Buffer(s).toString("hex");
}

/**
 * convert array to hex string
 * @param {Number[]} array - iv array of integers
 * @return {String} a hex string
 */
function ArrayToHex(array: number[]) {
  let hex = "";
  for (const _byte in array) {
    hex += lpad(Number(_byte).toString(16), "0", 2);
  }
  return hex;
}

/**
 * Creates a random hex string
 * @param {Number} size - size of hex string
 * @return {String} a hex string
 */
function randomHex(size: number): string {
  // return crypto.randomBytes(128/8).toString('hex');
  return randomBytes(128 / 8).toString("hex");
}

/**
 * Will safely create an IV Array of integers
 * @param {Number[]} [iv_array=null] - array of numbers for IV array.  If none passed in, a random hex will be created
 * @return {String} a hex string
 */
function setIV(iv_array?: CryptoJS.lib.WordArray): string {
  return Array.isArray(iv_array) ? ArrayToHex(iv_array) : randomHex(128 / 8);
}

/**
 * convert Time object or now into WordArray
 * @param {Date} time - input Date object to convert to WordArray
 * @return {Number[]} a word array
 */
function timeBytes(time: Date | number): CryptoJS.lib.WordArray {
  if (time) {
    //@ts-ignore
    time = time / 1000;
  } else {
    //@ts-ignore
    time = Math.round(new Date() / 1000);
  }
  //@ts-ignore
  const hexTime = lpad(time.toString(16), "0", "16");
  return Hex.parse(hexTime);
}

/**
 * convenience function to create a new instance of a Secret() and sets it as the default for all future tokens
 * @param {String} secret64 - base64 encoded secret string
 * @return {Secret} a Secret
 */
function setSecret(secret64: string) {
  defaults.secret = new Secret(secret64);
  return defaults.secret;
}

/**
 * Encrypts a message using AES
 * @param {String} message - message to encrypt
 * @param {String} encryptionKey - encryption key for AES
 * @param {Number[]} iv - IV array
 * @return {String} encrypted message
 */
function encryptMessage(message: string, encryptionKey: TextKey, iv: CryptoJS.lib.WordArray) {
  const encrypted = AES.encrypt(message, encryptionKey, { iv: iv });
  return encrypted.ciphertext;
}

/**
 * Decrypts an AES Encrypted message
 * @param {String} cipherText - the encrypted message
 * @param {String} encryptionKey - decryption key for AES
 * @param {Number[]} iv - IV array
 * @return {String} decrypted message
 */
function decryptMessage(cipherText: TextKey, encryptionKey: TextKey, iv: CryptoJS.lib.WordArray) {
  const encrypted = {
    ciphertext: cipherText,
    key: encryptionKey,
    iv: iv
  };

  const decrypted = AES.decrypt(encrypted as any, encryptionKey, { iv: iv });
  return decrypted.toString(Utf8);
}

/**
 * creates an encryption token
 * @param {Number[]} signingKey - signing key for encyrption
 * @param {Date} time - time stamp for verification
 * @param {Number[]} iv - IV Array
 * @param {String} cipherText - the cipher text
 * @return {String} the url safe encrypted string
 */
function createToken(signingKey: TextKey, time: CryptoJS.lib.WordArray, iv: CryptoJS.lib.WordArray, cipherText: TextKey) {
  const hmac = createHmac(signingKey, time, iv, cipherText);
  let tokenWords = Hex.parse(defaults.versionHex!);
  for (let c of [time, iv, cipherText, hmac]) {
    tokenWords = tokenWords.concat(c as any);
  }
  return urlsafe(tokenWords.toString(Base64));
}

/**
 * Creates a SHA256 undigested byte string
 * @param {Number[]} signingKey - signing key for encyrption
 * @param {Date} time - time stamp for verification
 * @param {Number[]} iv - IV Array
 * @param {String} cipherText - the cipher text
 * @return {String} an undigested byte string
 */
function createHmac(signingKey: TextKey, time: CryptoJS.lib.WordArray, iv: CryptoJS.lib.WordArray, cipherText: TextKey) {
  let hmacWords = Hex.parse(defaults.versionHex!);
  for (let c of [time, iv, cipherText]) {
    if (c){
      hmacWords = hmacWords.concat(c as any);
    }
  }
  return HmacSHA256(hmacWords, signingKey);
}

/**
 * Instance of a Secret to be used for the token encryption
 */
class Secret {
  public signingKeyHex: string;
  public signingKey: CryptoJS.lib.WordArray;
  public encryptionKeyHex: string;
  public encryptionKey: CryptoJS.lib.WordArray;
  /**
   * Creates a Secret to be used for the token encryption
   * @param {String} secret64 - base64 encoded secret string
   */
  constructor(secret64: string) {
    const secret = decode64toHex(secret64);
    if (secret.length !== hexBits(256)) {
      throw new Error("Secret must be 32 url-safe base64-encoded bytes.");
    }
    this.signingKeyHex = secret.slice(0, hexBits(128));
    this.signingKey = Hex.parse(this.signingKeyHex);
    this.encryptionKeyHex = secret.slice(hexBits(128));
    this.encryptionKey = Hex.parse(this.encryptionKeyHex);
  }
}

export interface FernetOptions {
  /** time to live in seconds, if specfied a token 
   * whose lifespan is longer than TTL will not be decrypted 
   * */
  ttl?: number;
  /** the hex version number */
  versionHex?: string;
  /** the fernet Secret */
  secret?: Secret;
  /** message to encrypt */
  message: string;
  /** cipher text to decrypt */
  cipherText?: CryptoJS.lib.WordArray;
  /** token string */
  token?: string;
  /** version of token */
  version?: number;
  /** the IV array */
  iv?: CryptoJS.lib.WordArray | number[];
  /** date string */
  time: string ;
}

/**
 * Options for token object to perform encryption
 * @typedef TokenOptions
 * @property {Number} [ttl=60] - time to live in seconds
 * @property {Secret} secret - Secret object to use for encryption/decryption
 * @property {String} message - message to encrypt
 * @property {String} cipherText - cipher text to decrypt
 * @property {String} token - a token string
 * @property {String} [version='80'] - version of the token
 * @property {Number[]} iv - IV Array
 */

/**
 * Token object to perform encryption/decryption
 */
class Token {
  public secret?: Secret;
  public ttl?: number;
  public message: string;
  /** cipher text to decrypt */
  public cipherText?: CryptoJS.lib.WordArray;
  public cipherTextHex?: string;
  /** token string */
  public token?: string;
  /** version of token */
  public version?: string | number;
  /** the IV array */
  public optsIV?: CryptoJS.lib.WordArray;
  public maxClockSkew = 60;
  public time: Date | CryptoJS.lib.WordArray;
  public encoded: boolean;
  public iv?: CryptoJS.lib.WordArray;
  public ivHex?: string;
  public hmacHex?: string;

  /**
   * Token object to perform encryption/decryption
   * @param {TokenOptions} opts - options for token initialization
   */
  constructor(opts?: Partial<FernetOptions>) {
    opts = opts || {};
    this.secret = opts.secret || defaults.secret;
    this.ttl = opts.ttl || defaults.ttl;
    if (opts.ttl === 0) this.ttl = 0;
    this.message = opts.message ?? '';
    this.cipherText = opts.cipherText;
    this.token = opts.token ?? '';
    this.version = opts.version || parseHex(defaults.versionHex!);
    this.optsIV = opts.iv as CryptoJS.lib.WordArray;
    this.time = opts.time ? timeBytes(new Date(Date.parse(opts.time))) : timeBytes(new Date());
    this.encoded = false
  }

  /**
   * converts token to string
   * @return {String} to stringified token
   */
  toString() {
    return this.encoded ? this.token : this.message;
  }

  /**
   * Encrypts a message
   * @param {String} message - message to encrypt
   * @return {String} encoded token string
   */
  encode(message?: string) {
    if (!this.secret) throw new Error("Secret not set");
    this.encoded = true;
    this.ivHex = setIV(this.optsIV);
    this.iv = Hex.parse(this.ivHex); //if null will always be a fresh IV
    this.message = message || this.message;
    this.cipherText = encryptMessage(
      this.message,
      this.secret.encryptionKey,
      this.iv
    );
    this.token = createToken(
      this.secret.signingKey,
      this.time as CryptoJS.lib.WordArray,
      this.iv,
      this.cipherText
    );
    return this.token;
  }

  /**
   * Decrypts a token
   * @param {String} token - token to decrypt
   * @return {String} decoded message
   */
  decode(token?: string) {
    if (!this.secret) throw new Error("Secret not set");
    this.encoded = false;
    this.token = token || this.token;
    const tokenString = decode64toHex(this.token!);
    const versionOffset = hexBits(8);
    const timeOffset = versionOffset + hexBits(64);
    const ivOffset = timeOffset + hexBits(128);
    const hmacOffset = tokenString.length - hexBits(256);
    const timeInt = parseHex(tokenString.slice(versionOffset, timeOffset));

    this.version = parseHex(tokenString.slice(0, versionOffset));

    if (this.version != 128) {
      throw new Error("Invalid version");
    }

    this.time = new Date(timeInt * 1000);

    const currentTime = new Date();
    //@ts-ignore
    const timeDiff = (currentTime - this.time) / 1000;

    if (this.ttl! > 0 && timeDiff > this.ttl!) {
      throw new Error("Invalid Token: TTL");
    }

    //@ts-ignore
    if (currentTime / 1000 + this.maxClockSkew < timeInt) {
      throw new Error("far-future timestamp");
    }

    this.ivHex = tokenString.slice(timeOffset, ivOffset);
    this.iv = Hex.parse(this.ivHex);
    this.cipherTextHex = tokenString.slice(ivOffset, hmacOffset);
    this.cipherText = Hex.parse(this.cipherTextHex);
    this.hmacHex = tokenString.slice(hmacOffset);
    const decodedHmac = createHmac(
      this.secret.signingKey,
      timeBytes(this.time),
      this.iv,
      this.cipherText
    );
    const decodedHmacHex = decodedHmac.toString(Hex);

    let accum = 0;
    for (let i = 0; i < 64; i++) {
      accum += decodedHmacHex.charCodeAt(i) ^ this.hmacHex.charCodeAt(i);
    }
    if (accum != 0) throw new Error("Invalid Token: HMAC");

    this.message = decryptMessage(
      this.cipherText,
      this.secret.encryptionKey,
      this.iv
    );
    return this.message;
  }
}

export {
  defaults,
  // buffer,
  Buffer,
  Secret,
  Token,
  setSecret,
  ArrayToHex,
  timeBytes,
  decode64toHex,
  createHmac,
  hexBits,
  urlsafe,
  Base64,
  Hex
};

