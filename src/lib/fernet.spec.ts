import { 
  Secret, 
  Token, 
  ArrayToHex, 
  createHmac, 
  timeBytes, 
  Hex, 
  hexBits, 
  urlsafe, 
  decode64toHex,
  Base64
} from './fernet';

//@ts-ignore
import sinon from 'sinon'

const testData = {
  token:
    "gAAAAAAdwJ6wAAECAwQFBgcICQoLDA0ODy021cpGVWKZ_eEwCGM4BLLF_5CV9dOPmrhuVUPgJobwOz7JcbmrR64jVmpU4IwqDA==",
  now: "1985-10-26T01:20:00-07:00",
  iv: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  src: "hello",
  secret: "cw_0x689RpI-jtRR7oE8h_eQsKImvJapLeSbXpwF4e4="
};

const unacceptableClockSkewTestData = {
  token:
    "gAAAAAAdwStRAAECAwQFBgcICQoLDA0OD3HkMATM5lFqGaerZ-fWPAnja1xKYyhd-Y6mSkTOyTGJmw2Xc2a6kBd-iX9b_qXQcw==",
  now: "1985-10-26T01:20:01-07:00",
  secret: "cw_0x689RpI-jtRR7oE8h_eQsKImvJapLeSbXpwF4e4="
};

const secret = new Secret(testData.secret);

describe('fernet.Token.prototype.decode', () => {

  const token = new Token({
    secret,
    token: testData.token
  })
  it('should decode token', () => {
    expect(token.decode()).toEqual('hello');
  });
  it('should cast to string', () => {
    expect(token.toString()).toEqual('hello');
  });
});

describe('version decoding test', ()=> {
  const token = new Token({
    secret,
    token: testData.token,
    version: 1
  })

  it('should recover version', ()=> {
    expect(token.version).toEqual(1)
    token.decode()
    expect(token.version).toEqual(128)
  })
})

describe('time decoding test', ()=> {
  const token = new Token({
    secret,
    token: testData.token,
    version: 1
  })

  it('should recover time', ()=> {
    token.decode()
    const now = new Date(Date.parse(testData.now))
    expect((token.time as Date).toUTCString()).toEqual(now.toUTCString())
  })
})

describe('IV decoding test', ()=> {
  const token = new Token({
    secret: secret,
    token: testData.token
  });
  it('should recover IV', ()=> {
    token.decode();
    const ivHex = ArrayToHex(testData.iv);
    expect(token.ivHex).toEqual(ivHex);
  })
})

describe('HMAC decoding test', ()=> {
  const token = new Token({
    secret: secret,
    token: testData.token
  });
  it('should recover HMAC', ()=> {
    token.decode()
    const computedHmac = createHmac(
      secret.signingKey,
      timeBytes(token.time as Date),
      token.iv!,
      token.cipherText!
    );
    expect(token.hmacHex).toBe(computedHmac.toString(Hex))
  })
})

describe('inherits parent TTL', ()=> {
  const token = new Token({
    secret,
    token: testData.token,
    ttl: 1
  })

  it('should throw invalid token TTL error', ()=> {
    expect(()=> token.decode()).toThrowError('Invalid Token: TTL')
  })

})

describe('throws wrong version error', ()=> {
  const tokenHex = decode64toHex(testData.token);
  const versionOffset = hexBits(8);
  const dirtyToken = "01" + tokenHex.slice(versionOffset);
  const tokenWords = Hex.parse(dirtyToken);
  const token = urlsafe(tokenWords.toString(Base64));
  const t = new Token({ secret: secret });
  it('raises new Error("Invalid version") on wrong version byte', ()=> {
    expect(()=> t.decode(token)).toThrowError("Invalid version");
  })
});

describe('validates HMAC', ()=> {
  const s = testData.token;
  const i = s.length - 5;
  const mutation = String.fromCharCode(s.charCodeAt(i) + 1);
  const dirtyHmacString = s.slice(0, i) + mutation + s.slice(i + 1);
  const token = new Token({
    secret: secret,
    token: dirtyHmacString
  });
  it('raises new Error("Invalid Token: HMAC") on wrong Hmac', ()=>{
    expect(()=> token.decode()).toThrowError('Invalid Token: HMAC')
  })
})

// describe('validates far future timestamp', ()=> {
//   const token = new Token({
//     secret: new Secret(unacceptableClockSkewTestData.secret),
//     token: unacceptableClockSkewTestData.token,
//     ttl: 0
//   });
  
//   const clock = sinon.useFakeTimers(
//     new Date(Date.parse(unacceptableClockSkewTestData.now)).getTime()
//   );

//   it('raises new Error("far-future timestamp") on unacceptable clock skew', ()=> {
//     expect(()=> token.decode()).toThrowError('far-future timestamp')
//   })
//   clock.restore()
// })

/*****************************    ENCODING     **************************************** */
describe('encoding tests', ()=> {
  const token = new Token({
    secret,
    iv: testData.iv,
    time: testData.now
  })

  it('should encode message', ()=> {
    const encoded = token.encode(testData.src)
    console.log('encoded: ', encoded)
    expect(testData.token).toEqual(token.toString())
  })

  const tokenWithMessage = new Token({
    secret,
    iv: testData.iv,
    time: testData.now,
    message: testData.src
  })

  it("token.encode() makes token.toString() return the token", ()=> {
    tokenWithMessage.encode()
    expect(testData.token).toEqual(token.toString())
  })

  it("encode() returns the token as a String", ()=> {
    expect(token.encode(testData.src)).toEqual(testData.token)
  })
})

describe('testing default token arguments', ()=> {
  const token = new Token({
    secret,
    time: testData.now
  })

  it("randomly generates IV if one is not passed in", ()=> {
    const tokenString = token.encode(testData.src)
    expect(tokenString).not.toEqual(testData.token)

    const tokenString2 = token.encode(testData.src)
    expect(tokenString).not.toEqual(tokenString2)
  })

  const tokenWithoutTime = new Token({ secret })
  it('time defaults to Date.now()', ()=> {
    const cipherText = token.encode('foo')
    const recovered = token.decode(cipherText)
    expect(recovered).toEqual('foo')
  })
})


describe('fernet Secret tests', ()=> {
  
  const signingKeyHex = '730ff4c7af3d46923e8ed451ee813c87';
  const encryptionKeyHex = 'f790b0a226bc96a92de49b5e9c05e1ee';

  it('secret.signingKeyHex', ()=> {
    expect(secret.signingKeyHex).toEqual(signingKeyHex)
  })

  it('secret.signingKey', ()=> {
    expect(JSON.stringify(secret.signingKey))
      .toEqual(JSON.stringify(Hex.parse(signingKeyHex)))
  })

  it('secret.encryptionKeyHex', ()=> {
    expect(secret.encryptionKeyHex).toEqual(encryptionKeyHex)
  })

  it('secret.encryptionKey', ()=> {
    expect(JSON.stringify(secret.encryptionKey))
      .toEqual(JSON.stringify(Hex.parse(encryptionKeyHex)))
  })
  
  it('raises "new Error(\'Secret must be 32 url-safe base64-encoded bytes.\')" on wrong secret', ()=> {
    expect(()=> new Secret('not a good secret')).toThrowError('Secret must be 32 url-safe base64-encoded bytes.')
  })
})