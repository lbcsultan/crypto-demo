'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import forge from 'node-forge'
import { Button } from '@/components/ui/button'
import { getCerts } from '@/lib/user'
import axios from 'axios'
import { computeEncrypt } from '@/lib/computeAES'
import { genEnv } from '@/lib/computeEnv'

export default function EnvelopePage() {
  const { data: session } = useSession()
  if (!session || !session.user) redirect('/signIn')

  const certs = getCerts()

  const sender = session.user.email || null
  const receiver = session.user.email || null

  // const [receiver, setReceiver] = useState('')

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

  const genEnvHandler = () => {
    // genEnv(plaintext, sender, receiver)
  }

  const openEnvHandler = async () => {}

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
        <p>
          송신자와 수신자가 같은 경우를 먼저 고려함. 자신이 자신에게 보내는
          전자봉투 모델
        </p>
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
          onClick={genEnvHandler}
        >
          Envelope 생성 (sender)
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
          onClick={openEnvHandler}
        >
          Envelope 열기 (receiver)
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
