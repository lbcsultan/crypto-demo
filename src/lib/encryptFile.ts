import forge from 'node-forge'

// 파일을 암호화하는 함수
function encryptFile(file: ArrayBuffer, key: string, iv: string) {
  const cipher = forge.cipher.createCipher('AES-CBC', key)
  cipher.start({ iv })
  cipher.update(forge.util.createBuffer(file))
  cipher.finish()
  const encrypted = cipher.output
  return { encrypted }
}

// 암호화된 파일을 복호화하는 함수
function decryptFile(encrypted: ArrayBuffer, key: string, iv: string) {
  const decipher = forge.cipher.createDecipher('AES-CBC', key)
  decipher.start({ iv })
  decipher.update(forge.util.createBuffer(encrypted))
  decipher.finish()
  return decipher.output
}

export { encryptFile, decryptFile }
