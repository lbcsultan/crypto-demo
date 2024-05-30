'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import forge from 'node-forge'
import { Button } from '@/components/ui/button'
import { getCerts } from '@/lib/user'
import axios from 'axios'
import { computeEncrypt } from '@/lib/computeAES'

export default function EnvelopePage() {
  const { data: session } = useSession()
  if (!session || !session.user) redirect('/signIn')

  const certs = getCerts()

  const sender = session.user.email
  const receiver = session.user.email

  // const [receiver, setReceiver] = useState('')

  const modes = ['ECB', 'CBC']
  const lengths = [128, 192, 256]

  const [mode, setMode] = useState('CBC')
  const [keyLength, setKeyLength] = useState(128)
  const [key, setKey] = useState('')
  const [keyHex, setKeyHex] = useState('')
  const [iv, setIv] = useState('')
  const [ivHex, setIvHex] = useState('')
  const [plaintext, setPlaintext] = useState(
    'Hello world - 헬로월드 - 全国の新たな感染者 - 备孕者可以接种新冠疫苗'
  )
  const [ciphertext, setCiphertext] =
    useState<forge.util.ByteStringBuffer | null>(null)
  const [ciphertextHex, setCiphertextHex] = useState('')
  const [recoveredtext, setRecoveredtext] = useState('')

  const selectReceiver = async () => {
    // 수신자의 인증서를 가져옴. 공개키를 취득.
  }

  const randomKey = () => {
    let key = forge.random.getBytesSync(keyLength / 8)
    let keyHex = forge.util.bytesToHex(key)
    let iv, ivHex
    setKey(key)
    setKeyHex(keyHex)
    if (mode === 'ECB') {
      iv = ''
      ivHex = ''
      setIv(iv)
      setIvHex(ivHex)
    } else if (mode === 'CBC') {
      iv = forge.random.getBytesSync(16)
      ivHex = forge.util.bytesToHex(iv)
      setIv(iv)
      setIvHex(ivHex)
    }
  }

  const encryptHandler = () => {
    let ciphertext1 = computeEncrypt(
      plaintext,
      mode,
      key,
      iv
    ) as forge.util.ByteStringBuffer
    setCiphertext(ciphertext1)
    setCiphertextHex(ciphertext1.toHex())
  }

  const decryptHandler = async () => {
    axios.post('/api/encrypt', { mode, key, iv, ciphertext }).then((res) => {
      setRecoveredtext(res.data.recoveredtext)
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Digital Envelope (전자봉투)</h1>
      <div className="mb-4">
        <p>
          전자봉투란 송신자가 서명하고 세션키로 암호화한 메시지를 특정
          수신자에게 보내는 방법입니다. 수신자는 자신의 개인키로 메시지를
          복호화할 수 있고 송신자의 공개키로 서명을 검증할 수 있습니다.
        </p>
        <p className="mt-4">
          송신자: <br />
          1. 송신자 개인키로 서명 생성 <br />
          2. 세션키로 메시지 암호화 <br />
          3. 수신자 공개키로 세션키 암호화 <br />
        </p>
        <p className="mt-4">
          수신자: <br />
          1. 수신자 개인키로 세션키 복호화 <br />
          2. 세션키로 메시지 복호화 <br />
          3. 송신자 공개키로 서명 검증 <br />
        </p>
      </div>

      <div className="mb-4">
        <p>
          <label htmlFor="sender">송신자</label>
          <input
            type="text"
            id="sender"
            value={sender as string}
            className="w-full bg-gray-50"
            disabled
          />
        </p>
        <p>
          <label htmlFor="receiver">수신자</label>
          <input
            type="text"
            id="receiver"
            value={receiver as string}
            className="w-full bg-gray-50"
            disabled
          />
        </p>
      </div>

      <div className="mb-4">
        <h2 className="mb-2 font-bold">Select Mode (default to CBC)</h2>
        {modes.map((m) => (
          <div key={m} className="mx-4">
            <input
              name="mode"
              className="p-2 outline-none focus:ring-0"
              id={m}
              type="radio"
              onChange={(e) => setMode(m)}
            />
            <label className="p-2" htmlFor={m}>
              {m}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="mb-2 font-bold">Select Key Length (default to 128)</h2>
        {lengths.map((length) => (
          <div key={length} className="mx-4">
            <input
              name="length"
              className="p-2 outline-none focus:ring-0"
              id={length.toString()}
              type="radio"
              onChange={(e) => setKeyLength(length)}
            />
            <label className="p-2" htmlFor={length.toString()}>
              {length}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="mb-2 font-bold">AES key</h2>
        <input
          type="text"
          name="key"
          className="w-full bg-gray-50"
          value={keyHex}
          readOnly
        />
      </div>

      <div className="mb-4">
        <h2 className="mb-2 font-bold">AES iv (default 128)</h2>
        <input
          type="text"
          name="iv"
          className="w-full bg-gray-50"
          value={ivHex}
          readOnly
        />
      </div>

      <div className="mb-4">
        <button
          className="primary-button w-full"
          type="button"
          onClick={randomKey}
        >
          Random key generation (sender, client)
        </button>
      </div>

      <div className="mb-4">
        <h2 className="mb-2 font-bold">Plaintext</h2>
        <textarea
          name="plaintext"
          className="w-full bg-gray-50 h-16"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <button
          className="red-button w-full"
          type="button"
          onClick={encryptHandler}
        >
          Encrypt (sender, client)
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="ciphertext" className="mb-3 font-bold">
          Ciphertext
        </label>
        <textarea
          name="ciphertext"
          id="ciphertext"
          className="w-full bg-gray-50 h-32"
          value={ciphertextHex}
          readOnly
        />
      </div>

      <div className="mb-4">
        <button
          className="blue-button w-full"
          type="button"
          onClick={decryptHandler}
        >
          Decrypt (receiver, server)
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="recoveredtext" className="mb-3 font-bold">
          Recoveredtext
        </label>
        <textarea
          name="recoveredtext"
          id="recoveredtext"
          className="w-full bg-gray-50 h-32"
          value={recoveredtext}
          readOnly
        />
      </div>
    </div>
  )
}
