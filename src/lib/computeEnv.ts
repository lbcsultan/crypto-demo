import forge from 'node-forge'
import { getCertByEmail } from './user'

const genEnv = (plaintext: string, emailS: string, emailR: string) => {
  const privKeyS = localStorage.getItem('privateKey')
  console.log(privKeyS) // 송신자의 개인키
  // const certRPem: string = getCertByEmail(emailR)
  // const certR = forge.pki.certificateFromPem(certRPem)
  // const pubKeyR = certR.publicKey
  // console.log(certR)  // 수신자의 인증서
}

const openEnv = (ciphertext: string, sender: string, receiver: string) => {}

export { genEnv, openEnv }
