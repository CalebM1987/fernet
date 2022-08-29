/// <reference types="crypto-js" />
/**
 * This an es6 port of the library found here:
 *    https://github.com/csquared/fernet.js
 *
 * This was ported due to issues with the global module scope and caused issues with rollup.js.
 */
import { Buffer } from 'buffer';
import Hex from "crypto-js/enc-hex";
import Base64 from "crypto-js/enc-base64";
declare const defaults: Partial<FernetOptions>;
declare type TextKey = string | CryptoJS.lib.WordArray;
/**
 * Makes a Base64 string a url-safe base64 slertring
 * @param {String} string - input string to make url-safe
 * @return {String} a url-safe base64 string
 */
declare function urlsafe(string: string): string;
/**
 * turn bits into number of chars in a hex string
 * @param {Number} bits - input bits to convert to hex
 * @return {Number} number of chars in hex string
 */
declare function hexBits(bits: number): number;
/**
 * convert base64 string to hex string
 * @param {String} string - input base64 string to hex
 * @return {String} a hex string
 */
declare function decode64toHex(string: string): string;
/**
 * convert array to hex string
 * @param {Number[]} array - iv array of integers
 * @return {String} a hex string
 */
declare function ArrayToHex(array: number[]): string;
/**
 * convert Time object or now into WordArray
 * @param {Date} time - input Date object to convert to WordArray
 * @return {Number[]} a word array
 */
declare function timeBytes(time: Date | number): CryptoJS.lib.WordArray;
/**
 * convenience function to create a new instance of a Secret() and sets it as the default for all future tokens
 * @param {String} secret64 - base64 encoded secret string
 * @return {Secret} a Secret
 */
declare function setSecret(secret64: string): Secret;
/**
 * Creates a SHA256 undigested byte string
 * @param {Number[]} signingKey - signing key for encyrption
 * @param {Date} time - time stamp for verification
 * @param {Number[]} iv - IV Array
 * @param {String} cipherText - the cipher text
 * @return {String} an undigested byte string
 */
declare function createHmac(signingKey: TextKey, time: CryptoJS.lib.WordArray, iv: CryptoJS.lib.WordArray, cipherText: TextKey): CryptoJS.lib.WordArray;
/**
 * Instance of a Secret to be used for the token encryption
 */
declare class Secret {
    signingKeyHex: string;
    signingKey: CryptoJS.lib.WordArray;
    encryptionKeyHex: string;
    encryptionKey: CryptoJS.lib.WordArray;
    /**
     * Creates a Secret to be used for the token encryption
     * @param {String} secret64 - base64 encoded secret string
     */
    constructor(secret64: string);
}
interface FernetOptions {
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
    time: string;
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
declare class Token {
    secret?: Secret;
    ttl?: number;
    message: string;
    /** cipher text to decrypt */
    cipherText?: CryptoJS.lib.WordArray;
    cipherTextHex?: string;
    /** token string */
    token?: string;
    /** version of token */
    version?: string | number;
    /** the IV array */
    optsIV?: CryptoJS.lib.WordArray;
    maxClockSkew: number;
    time: Date | CryptoJS.lib.WordArray;
    encoded: boolean;
    iv?: CryptoJS.lib.WordArray;
    ivHex?: string;
    hmacHex?: string;
    /**
     * Token object to perform encryption/decryption
     * @param {TokenOptions} opts - options for token initialization
     */
    constructor(opts?: Partial<FernetOptions>);
    /**
     * converts token to string
     * @return {String} to stringified token
     */
    toString(): string | undefined;
    /**
     * Encrypts a message
     * @param {String} message - message to encrypt
     * @return {String} encoded token string
     */
    encode(message?: string): string;
    /**
     * Decrypts a token
     * @param {String} token - token to decrypt
     * @return {String} decoded message
     */
    decode(token?: string): string;
}
export { defaults, Buffer, Secret, Token, TextKey, FernetOptions, setSecret, ArrayToHex, timeBytes, decode64toHex, createHmac, hexBits, urlsafe, Base64, Hex };
