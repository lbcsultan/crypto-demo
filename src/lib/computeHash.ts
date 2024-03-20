import forge from 'node-forge'

const computeHash = (algorithm: string, inputText: string) => {
  let md
  switch (algorithm) {
    case 'md5':
      md = forge.md5.create()
      md.update(inputText)
      return md.digest().toHex()
    case 'sha1':
      md = forge.sha1.create()
      md.update(inputText)
      return md.digest().toHex()
    case 'sha256':
      md = forge.sha256.create()
      md.update(inputText)
      return md.digest().toHex()
    case 'sha384':
      md = forge.sha384.create()
      md.update(inputText)
      return md.digest().toHex()
    case 'sha512':
      md = forge.sha512.create()
      md.update(inputText)
      return md.digest().toHex()
  }
}
export default computeHash
