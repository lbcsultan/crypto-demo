import Link from 'next/link'

export default function EncryptPage() {
  return (
    <div className="mx-auto max-w-screen-lg">
      <h1 className="text-3xl mb-8 font-bold">대칭키암호 응용</h1>

      <div className="px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white rounded-lg mb-4">
        <Link href="/encryptFunc/encrypt">Encrypt (대칭키 암호화)</Link>
      </div>
      <div className="px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white rounded-lg mb-4">
        <Link href="/encryptFunc/encryptPassword">
          Encrypt with Password (패스워드 기반 암호화)
        </Link>
      </div>
      <div className="px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white rounded-lg mb-4">
        <Link href="/encryptFunc/fileEncrypt"> Encrypt File (파일 암호화)</Link>
      </div>
    </div>
  )
}
