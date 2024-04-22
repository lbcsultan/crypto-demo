import forge from 'node-forge'

const computeFileHash = (algorithm: string, inputFile: File) => {
  const reader = new FileReader()

  reader.onload = () => {
    const inputText = reader.result as string
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
  reader.readAsText(inputFile)
}
export default computeFileHash
