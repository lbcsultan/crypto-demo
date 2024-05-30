'use client'

import { useState } from 'react'
import forge from 'node-forge'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { RsaPrivateKey } from 'crypto'

export default function EscrowPage() {
  const { data: session } = useSession()
  const email = session?.user?.email

  // 개인키를 패스워드로 암호화하여 서버에 위탁 저장
  const [privateKeyPem, setPrivateKeyPem] = useState('')
  const [password, setPassword] = useState('supersecretpassword...')
  const [message, setMessage] = useState('')

  const escrowPrivateKey = () => {
    const pkp = localStorage.getItem('privateKeyPem')
    const pk = forge.pki.privateKeyFromPem(pkp as string)
    const encryptedPrivateKeyPem = forge.pki.encryptRsaPrivateKey(pk, password)
    axios.post('/api/escrow', { email, encryptedPrivateKeyPem }).then((res) => {
      setMessage(res.data.message)
    })
  }

  const recoverPrivateKey = () => {
    axios.post('/api/recover', { email }).then((res) => {
      const encryptedPrivateKeyPem = res.data.privateKey
      console.log(encryptedPrivateKeyPem)
      const privateKey = forge.pki.decryptRsaPrivateKey(
        encryptedPrivateKeyPem,
        password
      )
      const pkp = forge.pki.privateKeyToPem(privateKey)
      setPrivateKeyPem(pkp)
      localStorage.setItem('privateKeyPem', pkp)
      setMessage(res.data.message)
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Escrow Private Key (개인키 위탁/복구)
      </h1>
      <p className="mb-4">
        개인키는 클라이언트에만 저장되므로 서버에 위탁 저장 필요. 사용자가
        입력하는 패스워드로 암호화된 PEM으로 저장됨.
        <br />
        - 개인키 위탁: 패스워드로 암호화된 PEM을 서버/DB에 저장함
        <br />- 개인키 복구: 필요시 서버/DB에 저장된 것을 브라우저로 읽어옴
      </p>

      <div className="mb-4">
        <h2 className="mb-2 font-bold">Password</h2>
        <input
          type="password"
          className="w-full bg-gray-50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4 flex gap-2">
        <button className="red-button w-full " onClick={escrowPrivateKey}>
          Save Private Key (개인키 위탁)
        </button>

        <button className="blue-button w-full" onClick={recoverPrivateKey}>
          Recover Private Key (개인키 복구)
        </button>
      </div>

      <div className="mb-4 flex gap-2">{message}</div>
    </div>
  )
}
