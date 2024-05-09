import forge from 'node-forge'

const rsaEncrypt = (publicKeyPem: string, bytes: string) => {
  let publicKey: forge.pki.rsa.PublicKey =
    forge.pki.publicKeyFromPem(publicKeyPem)
  return publicKey.encrypt(bytes, 'RSA-OAEP')
}

const rsaDecrypt = (privateKeyPem: string, ciphertext: string) => {
  let privateKey: forge.pki.rsa.PrivateKey =
    forge.pki.privateKeyFromPem(privateKeyPem)
  return privateKey.decrypt(ciphertext, 'RSA-OAEP')
}

const rsaSign = (privateKeyPem: string, plaintext: string) => {
  let privateKey: forge.pki.rsa.PrivateKey =
    forge.pki.privateKeyFromPem(privateKeyPem)
  let pss = forge.pss.create({
    md: forge.md.sha1.create(),
    mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
    saltLength: 20,
  })
  let md = forge.md.sha256.create()
  md.update(plaintext, 'utf8')
  return privateKey.sign(md, pss)
}

const rsaVerify = (
  publicKeyPem: string,
  plaintext: string,
  signature: string
) => {
  let publicKey: forge.pki.rsa.PublicKey =
    forge.pki.publicKeyFromPem(publicKeyPem)
  let pss = forge.pss.create({
    md: forge.md.sha1.create(),
    mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
    saltLength: 20,
  })
  let md = forge.md.sha256.create()
  md.update(plaintext, 'utf8')
  return publicKey.verify(md.digest().bytes(), signature, pss)
}

export { rsaEncrypt, rsaDecrypt, rsaSign, rsaVerify }
