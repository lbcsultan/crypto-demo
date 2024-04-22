import Link from 'next/link'

export default function HashPage() {
  return (
    <div className="mx-auto max-w-screen-lg">
      <h1 className="text-3xl mb-8 font-bold">해시함수 응용</h1>

      <div className="px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white rounded-lg mb-4">
        <Link href="/hashFunc/hash">Hash (해시함수)</Link>
      </div>
      <div className="px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white rounded-lg mb-4">
        <Link href="/hashFunc/fileHash">File Hash (파일의 해시값 계산)</Link>
      </div>
      <div className="px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white rounded-lg mb-4">
        <Link href="/hashFunc/hmac">HMAC (메시지인증코드)</Link>
      </div>
      <div className="px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white rounded-lg mb-4">
        <Link href="/hashFunc/pbkdf2">PBKDF2 (패스워드 기반 키생성)</Link>
      </div>
      <div className="px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white rounded-lg mb-4">
        <Link href="/hashFunc/passwordHash">
          Password Hash Salting (패스워드의 안전한 저장)
        </Link>
      </div>
    </div>
  )
}
