import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-black px-8 py-4">
      <Link
        href="/"
        className="text-white text-2xl font-bold hover:text-gray-400"
      >
        Forge Demo
      </Link>
      <div>
        <Link
          href="/hash"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          Hash
        </Link>
        <Link
          href="/hmac"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          HMAC
        </Link>
        <Link
          href="/pbkdf2"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          PBKDF2
        </Link>
        <Link
          href="/passwordHash"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          PasswordHash
        </Link>
        <Link
          href="/aes"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          AES
        </Link>
        <Link
          href="/rsaenc"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          RSAEnc
        </Link>
      </div>
    </nav>
  )
}
