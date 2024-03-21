'use client'

import { useState } from 'react'
import forge from 'node-forge'
const rsa = forge.pki.rsa
const pki = forge.pki

export default function RSAEncPage() {
  const lengths = [1024, 2048, 3072]

  const [keyLength, setKeyLength] = useState(1024)
  const [publicKey, setPublicKey] = useState<forge.pki.rsa.PublicKey | null>()
  const [publicKeyPem, setPublicKeyPem] = useState('')
  const [privateKey, setPrivateKey] =
    useState<forge.pki.rsa.PrivateKey | null>()
  const [privateKeyPem, setPrivateKeyPem] = useState('')
  const [n, setN] = useState<forge.jsbn.BigInteger | null | undefined>()
  const [p, setP] = useState<forge.jsbn.BigInteger | null | undefined>()
  const [q, setQ] = useState<forge.jsbn.BigInteger | null | undefined>()
  const [e, setE] = useState<forge.jsbn.BigInteger | null | undefined>()
  const [d, setD] = useState<forge.jsbn.BigInteger | null | undefined>()

  const [plaintext, setPlaintext] = useState('Hello world - 헬로월드')
  const [ciphertext, setCiphertext] = useState('')
  const [ciphertextHex, setCiphertextHex] = useState('')
  const [recoveredtext, setRecoveredtext] = useState('')

  const keyGen = () => {
    const keypair: forge.pki.rsa.KeyPair = rsa.generateKeyPair({
      bits: keyLength,
      e: 0x10001,
    })
    setPublicKey(keypair.publicKey)
    setPublicKeyPem(pki.publicKeyToPem(keypair.publicKey))
    setPrivateKey(keypair.privateKey)
    setPrivateKeyPem(pki.privateKeyToPem(keypair.privateKey))
    setN(keypair.publicKey.n)
    setE(keypair.publicKey.e)
    setP(keypair.privateKey.p)
    setQ(keypair.privateKey.q)
    setD(keypair.privateKey.d)
  }

  const encryptHandler = () => {
    let bytes = forge.util.encodeUtf8(plaintext)
    if (publicKey) {
      let encrypted = publicKey.encrypt(bytes)
      let encryptedHex = forge.util.bytesToHex(encrypted)
      setCiphertext(encrypted)
      setCiphertextHex(encryptedHex)
    }
  }

  const decryptHandler = () => {
    if (privateKey) {
      let decrypted = privateKey.decrypt(ciphertext)
      setRecoveredtext(forge.util.decodeUtf8(decrypted))
    }
  }

  return <div>RSAEncPage</div>
}
