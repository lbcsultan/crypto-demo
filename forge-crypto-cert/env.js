var forge = require('node-forge')
var fs = require('fs')
var pki = forge.pki
var userA = 'userA' // 사용자명 설정 (송신자 userA)
var userB = 'userB' // 사용자명 설정 (수신자 userB)

// 전자봉투 생성
// 1. 송신자의 개인키로 메시지에 전자서명 생성
// 2. 메시지와 서명값을 난수 세션키로 암호화
// 3. 난수 세션키를 수신자의 공개키로 암호화

// 전자봉투 열기
// 1. 수신자의 개인키로 복호화하여 난수 세션키 복구
// 2. 난수 세션키로 복호화하여 메시지와 서명값을 복구
// 3. 송신자의 공개키로 전자서명 검증

// 1. 송신자 A가 수신자 B에게 전자봉투 전송
//---------------------------------------

// 1.1 송신자 A의 개인키 읽어옴
var userAPrivateKeyPem = fs.readFileSync('userAPrivateKey.pem', 'utf8')
var userAPrivateKey = pki.privateKeyFromPem(userAPrivateKeyPem)

// 1.2 수신자 B의 인증서 읽어옴
var userBCertPem = fs.readFileSync('userBCert.pem', 'utf8')
var userBCert = pki.certificateFromPem(userBCertPem)
var userBPublicKey = userBCert.publicKey

// 1.3 인증기관의 인증서 읽어옴
var caCertPem = fs.readFileSync('caCert.pem', 'utf8')
var caCert = pki.certificateFromPem(caCertPem)

// 1.4 수신자 B의 인증서 유효성 검증
var verifiedB = caCert.verify(userBCert)
console.log('1.4 수신자 B의 인증서 검증: ' + verifiedB)

// 1.5 송신자 A: 메시지에 대한 전자서명 생성
var message = 'Hello world. 안녕하세요.'
var md = forge.md.sha1.create()
md.update(message, 'utf8')
var signature = userAPrivateKey.sign(md)
var signatureHex = forge.util.bytesToHex(signature)
var messageObject = {
  msg: message,
  sigHex: signatureHex,
}
var messageString = JSON.stringify(messageObject)
console.log('1.5 JSON Message string: \n' + messageString)

// 1.6 송신자 A: 세션키로 메시지+전자서명을 암호화
var keySize = 16 // 16 => AES-128, 24 => AES-192, 32 => AES-256
var ivSize = 16
var key = forge.random.getBytesSync(keySize)
var iv = forge.random.getBytesSync(ivSize)
var keyObject = {
  key: key,
  iv: iv,
}
var keyString = JSON.stringify(keyObject)
console.log('1.6 JSON key string: \n' + keyString)
var someBytes = forge.util.encodeUtf8(messageString)
var cipher = forge.cipher.createCipher('AES-CBC', key)
cipher.start({ iv: iv })
cipher.update(forge.util.createBuffer(someBytes))
cipher.finish()
var encrypted = cipher.output
var encryptedMessageHex = forge.util.bytesToHex(encrypted)
console.log('1.6 encryptedMessageHex: \n' + encryptedMessageHex)

// 1.7 세션키를 수신자 B의 공개키로 암호화
// console.log('RSA-OAEP');
var encryptedSessionKey = userBPublicKey.encrypt(keyString, 'RSA-OAEP')
var encryptedSessionKeyHex = forge.util.bytesToHex(encryptedSessionKey)
console.log('1.7 encryptedSessionKeyHex: \n' + encryptedSessionKeyHex)

// 송신자 A가 수신자 B에게 전송하는 메시지
// <encryptedMessageHex, encryptedSessionKeyHex>

// 2. 수신자 B가 수신한 전자봉투를 처리

// 2.1 수신자 B의 개인키 읽어옴

// 수신자 B가 송신자 A로부터 받은 메시지
// <encryptedMessageHex, encryptedSessionKeyHex>
// --------------------------------
var userBPrivateKeyPem = fs.readFileSync('userBPrivateKey.pem', 'utf8')
var userBPrivateKey = pki.privateKeyFromPem(userBPrivateKeyPem)

// 2.2 송신자 A의 인증서 읽어옴
var userACertPem = fs.readFileSync('userACert.pem', 'utf8')
var userACert = pki.certificateFromPem(userACertPem)

// 2.3 인증기관의 인증서 읽어옴
var caCertPem = fs.readFileSync('caCert.pem', 'utf8')
var caCert = pki.certificateFromPem(caCertPem)

// 2.4 송신자 A의 인증서 유효성 검증
var verifiedA = caCert.verify(userACert)
console.log('2.4 송신자 A의 인증서 검증: ' + verifiedA)

// 2.5 세션키를 복구
var encryptedSessionKey = forge.util.hexToBytes(encryptedSessionKeyHex)
var decryptedKeyString = userBPrivateKey.decrypt(
  encryptedSessionKey,
  'RSA-OAEP'
)
console.log('2.5 Decrypted session key string: \n' + decryptedKeyString)
var keyObject1 = JSON.parse(decryptedKeyString)
var key1 = keyObject1.key
var iv1 = keyObject1.iv

// 2.7 세션키로 메시지 복호화
var encryptedMessage = forge.util.hexToBytes(encryptedMessageHex)
var decipher = forge.cipher.createDecipher('AES-CBC', key1)
decipher.start({ iv: iv1 })
decipher.update(forge.util.createBuffer(encryptedMessage))
var result = decipher.finish() // check 'result' for true/false
var messageString1 = decipher.output
console.log('2.7 result: \n' + messageString1)
var messageObject1 = JSON.parse(messageString1)
var message1 = messageObject1.msg
var signatureHex1 = messageObject1.sigHex
var signature1 = forge.util.hexToBytes(signatureHex1)

// 2.8 전자서명 검증
var userAPublicKey = userACert.publicKey
var md = forge.md.sha1.create()
md.update(message1, 'utf8')
var verified = userAPublicKey.verify(md.digest().bytes(), signature1)
console.log('2.8 서명의 유효성 검증: ' + verified)
