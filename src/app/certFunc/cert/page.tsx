'use client'

import forge from 'node-forge'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

const rsa = forge.pki.rsa
const pki = forge.pki

export default function CertPage() {
  const { data: session } = useSession()
  if (!session || !session.user) redirect('/signIn')

  const userEmail = session?.user.email
  const lengths = [1024, 2048, 3072]

  const [keyLength, setKeyLength] = useState(1024)
  const [publicKey, setPublicKey] = useState<forge.pki.rsa.PublicKey>()
  const [publicKeyPem, setPublicKeyPem] = useState('')
  const [privateKey, setPrivateKey] = useState<forge.pki.rsa.PrivateKey>()
  const [privateKeyPem, setPrivateKeyPem] = useState('')

  const [serial, setSerial] = useState(101)
  const [cn, setCn] = useState(userEmail as string)
  const [country, setCountry] = useState<string>('KR')
  const [state, setState] = useState<string>('Gyeonggi-do')
  const [locality, setLocality] = useState<string>('Goyang-si')
  const [org, setOrg] = useState<string>('Joongbu Univ.')
  const [orgUnit, setOrgUnit] = useState<string>(
    'Dept. of Information Security'
  )
  const [certPem, setCertPem] = useState<string>('')
  const [caCertPem, setCaCertPem] = useState<string>('')
  const [result, setResult] = useState(false)

  const keyGen = () => {
    const keypair = rsa.generateKeyPair({ bits: keyLength, e: 0x10001 })
    const publicKey = keypair.publicKey as forge.pki.rsa.PublicKey
    const privateKey = keypair.privateKey as forge.pki.rsa.PrivateKey
    const publicKeyPem = pki.publicKeyToPem(publicKey)
    const privateKeyPem = pki.privateKeyToPem(privateKey)

    setPublicKey(publicKey)
    setPublicKeyPem(publicKeyPem)
    setPrivateKey(privateKey)
    setPrivateKeyPem(privateKeyPem)
  }

  const genCert = async () => {
    // 서버에 요청하여 서버가 발급하는 인증서를 받아옴
    axios
      .post('/api/cert', {
        serial,
        cn,
        country,
        state,
        locality,
        org,
        orgUnit,
        publicKeyPem,
      })
      .then((res) => {
        let certPem = res.data.certPem
        let caCertPem = res.data.caCertPem
        let cert = forge.pki.certificateFromPem(certPem)
        console.log('Serial number: ' + cert.serialNumber)
        console.log('Public key: \n' + forge.pki.publicKeyToPem(cert.publicKey))
        console.log('Validity (not before): ' + cert.validity.notBefore)
        console.log('Validity (not after): ' + cert.validity.notAfter)
        setCertPem(certPem)
        setCaCertPem(caCertPem)
        localStorage.setItem('certPem', certPem)
        localStorage.setItem('caCertPem', caCertPem)
        localStorage.setItem('privateKeyPem', privateKeyPem)
      })
  }

  const verifyCert = async () => {
    let certPem1 = localStorage.getItem('certPem')
    let caCertPem1 = localStorage.getItem('caCertPem')

    let cert = pki.certificateFromPem(certPem1 as string)
    let caCert = pki.certificateFromPem(caCertPem1 as string)
    let result = caCert.verify(cert)
    setResult(result)
  }

  return (
    <div>
      <div>
        <form className="mx-auto max-w-screen-lg">
          <h1 className="text-3xl mb-4 font-bold">
            X.509 Certificate (인증서 발급 및 활용)
          </h1>

          <div className="mb-4 ">
            <p>
              인증서란 개인의 공개키와 개인의 인증정보에 대해 인증기관이
              서명하여 발급하는 문서이다.
            </p>
            <div className="mb-4 flex flex-row">
              <div className="basis-1/2 mx-2">
                <Image
                  src="/x509.jpg"
                  width={500}
                  height={500}
                  layout="responsive"
                  alt="X.509 certificate"
                />
              </div>
              <div className="basis-1/2 mx-2 my-auto">
                <Image
                  src="/cert.jpg"
                  width={500}
                  height={500}
                  layout="responsive"
                  alt="X.509 certificate"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="mode" className="mb-3 font-bold">
              Select Key Length (default to 1024)
            </label>
            {lengths.map((length) => (
              <div key={length} className="mx-4 ">
                <input
                  name="length"
                  className="p-2 outline-none focus:ring-0"
                  id={length as any}
                  type="radio"
                  onChange={(e) => setKeyLength(length)}
                />
                <label className="p-2" htmlFor={length as any}>
                  {length}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="button"
              onClick={keyGen}
            >
              RSA key generation (RSA 키 생성)
            </button>
          </div>

          <div className="mb-4">
            <label className="mb-3 font-bold">Public Key (공개키)</label>
            <textarea
              name="key"
              className="w-full bg-gray-50 h-32"
              value={publicKeyPem}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="mb-3 font-bold">Private Key (개인키)</label>
            <textarea
              name="key"
              className="w-full bg-gray-50 h-64"
              value={privateKeyPem}
              readOnly
            />
          </div>

          <div className="bg-yellow-100 p-3">
            <div className="flex flex-row mb-2">
              <div className="basis-1/2">
                <label htmlFor="serial" className=" font-bold">
                  Serial Number
                </label>
              </div>
              <div className="basis-1/2">
                <input
                  type="number"
                  name="serial"
                  id="serial"
                  className="w-full bg-gray-50"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value as any)}
                />
              </div>
            </div>
            <div className="flex flex-row mb-2">
              <div className="basis-1/2">
                <label htmlFor="cn" className=" font-bold">
                  Common Name (이름)
                </label>
              </div>
              <div className="basis-1/2">
                <input
                  type="text"
                  name="cn"
                  id="cn"
                  className="w-full bg-gray-50"
                  value={cn}
                  onChange={(e) => setCn(e.target.value as string)}
                />
              </div>
            </div>

            <div className="flex flex-row mb-2">
              <div className="basis-1/2">
                <label htmlFor="country" className=" font-bold">
                  Country (국가)
                </label>
              </div>
              <div className="basis-1/2">
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="w-full bg-gray-50"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row mb-2">
              <div className="basis-1/2">
                <label htmlFor="state" className=" font-bold">
                  State (광역시도)
                </label>
              </div>
              <div className="basis-1/2">
                <input
                  type="text"
                  name="state"
                  id="state"
                  className="w-full bg-gray-50"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row mb-2">
              <div className="basis-1/2">
                <label htmlFor="locality" className=" font-bold">
                  Locality (시군)
                </label>
              </div>
              <div className="basis-1/2">
                <input
                  type="text"
                  name="locality"
                  id="locality"
                  className="w-full bg-gray-50"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row mb-2">
              <div className="basis-1/2">
                <label htmlFor="org" className=" font-bold">
                  Organization (기관)
                </label>
              </div>
              <div className="basis-1/2">
                <input
                  type="text"
                  name="org"
                  id="org"
                  className="w-full bg-gray-50"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row mb-2">
              <div className="basis-1/2">
                <label htmlFor="orgUnit" className="mb-3 font-bold">
                  Organizational Unit (부서)
                </label>
              </div>
              <div className="basis-1/2">
                <input
                  type="text"
                  name="orgUnit"
                  id="orgUnit"
                  className="w-full bg-gray-50"
                  value={orgUnit}
                  onChange={(e) => setOrgUnit(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <button
              className="red-button w-full"
              type="button"
              onClick={genCert}
            >
              Issue certificate (인증서 발급 요청)
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="certPem" className="mb-3 font-bold">
              User Certificate
            </label>
            <textarea
              name="certPem"
              id="certPem"
              className="w-full bg-gray-50 h-64"
              value={certPem}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="certPem" className="mb-3 font-bold">
              CA Certificate
            </label>
            <textarea
              name="certPem"
              id="certPem"
              className="w-full bg-gray-50 h-64"
              value={caCertPem}
              readOnly
            />
          </div>

          <div className="mb-4">
            <button
              className="blue-button w-full"
              type="button"
              onClick={verifyCert}
            >
              Verification (인증서 유효성 검증)
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="verifyCert" className="mb-3 font-bold">
              Result:
            </label>
            <input
              type="text"
              name="verifyCert"
              id="verifyCert"
              className="w-full bg-gray-50"
              value={result ? '유효한 인증서' : '인증서가 유효하지 않음'}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  )
}
