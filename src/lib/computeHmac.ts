import forge from 'node-forge'

const computeHmac = (algorithm: string, inputText: string, secret: string) => {
  let hmac = forge.hmac.create()
  hmac.start(algorithm, secret)
  hmac.update(inputText)
  return hmac.digest().toHex()
}
export default computeHmac
