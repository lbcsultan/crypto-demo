import Link from 'next/link'

export default function RSAPage() {
  return (
    <div className="mx-auto max-w-screen-lg">
      <h1 className="text-3xl mb-8 font-bold">공개키암호 응용</h1>

      <div className="px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white rounded-lg mb-4">
        <Link href="/rsa/rsa-keygen">RSA Key Generation (RSA 키생성)</Link>
      </div>
      <div className="px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white rounded-lg mb-4">
        <Link href="/rsa/rsa-enc">RSA Encryption (암호화)</Link>
      </div>
      <div className="px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white rounded-lg mb-4">
        <Link href="/rsa/rsa-sig">RSA Signature (전자서명)</Link>
      </div>
      <div className="px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white rounded-lg mb-4">
        <Link href="/rsa/ecdsa">ECDSA Signature (타원곡선 전자서명)</Link>
      </div>
    </div>
  )
}
