'use client'

import { useState } from 'react'
import forge from 'node-forge'
import Image from 'next/image'
import axios from 'axios'
import { computeEncrypt } from '@/lib/computeAES'
export default function EncryptPage() {
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
    // if (mode === 'ECB') {
    //   let decipher = forge.cipher.createDecipher('AES-ECB', key)
    //   decipher.start()
    //   decipher.update(ciphertext as forge.util.ByteStringBuffer)
    //   decipher.finish()
    //   setRecoveredtext(decipher.output.toString())
    // } else if (mode === 'CBC') {
    //   let decipher = forge.cipher.createDecipher('AES-CBC', key)
    //   decipher.start({ iv: iv })
    //   decipher.update(ciphertext as forge.util.ByteStringBuffer)
    //   decipher.finish()
    //   setRecoveredtext(decipher.output.toString())
    // }
  }

  return (
    <div>
      <form className="mx-auto max-w-screen-lg">
        <h1 className="text-3xl mb-4 font-bold">AES (대칭키 암호화)</h1>

        <div className="mb-4">
          <p>
            대칭키 암호는 암호화 알고리즘과 복호화 알고리즘에서 동일한 키를
            사용하는 알고리즘이다. 송신자는 일반적으로 난수생성함수를 이용하여
            임의로 생성한 키를 사용하여 암호화하며 송신자는 이 키를 수신자에게
            안전하게 전달해야 한다.
          </p>
          <div className="mx-auto px-20">
            <Image
              src="/symmetric.jpg"
              alt="AES"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
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
            Random key generation (난수 키 생성)
          </button>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 font-bold">Plaintext</h2>
          <textarea
            name="plaintext"
            className="w-full bg-gray-50 h-32"
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
            Encrypt (암호화)
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
            Decrypt (복호화)
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
      </form>
    </div>
  )
}
