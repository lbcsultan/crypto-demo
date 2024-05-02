import forge from 'node-forge'

const computeEncrypt = (
  plaintext: string,
  mode: string,
  key: string,
  iv: string
) => {
  if (mode === 'ECB') {
    let cipher = forge.cipher.createCipher('AES-ECB', key)
    cipher.start()
    cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(plaintext)))
    cipher.finish()
    return cipher.output
  } else if (mode === 'CBC') {
    let cipher = forge.cipher.createCipher('AES-CBC', key)
    cipher.start({ iv: iv })
    cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(plaintext)))
    cipher.finish()
    return cipher.output
  }
}

const computeDecrypt = (
  ciphertext: forge.util.ByteStringBuffer,
  mode: string,
  key: string,
  iv: string
) => {
  if (mode === 'ECB') {
    let decipher = forge.cipher.createDecipher('AES-ECB', key)
    decipher.start()
    decipher.update(
      forge.util.createBuffer(ciphertext as forge.util.ByteStringBuffer)
    )
    decipher.finish()
    return decipher.output.toString()
  } else if (mode === 'CBC') {
    let decipher = forge.cipher.createDecipher('AES-CBC', key)
    decipher.start({ iv: iv })
    decipher.update(
      forge.util.createBuffer(ciphertext as forge.util.ByteStringBuffer)
    )
    decipher.finish()
    return decipher.output.toString()
  }
}
export { computeEncrypt, computeDecrypt }
