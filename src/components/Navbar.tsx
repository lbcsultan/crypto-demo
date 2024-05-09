import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="flex justify-between items-center bg-black px-8 py-4">
      <Link
        href="/"
        className="text-white text-2xl font-bold hover:text-gray-400"
      >
        Forge Crypto Demo
      </Link>
      <div>
        <Link
          href="/hashFunc"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          해시함수
        </Link>

        <Link
          href="/encryptFunc"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          대칭키암호
        </Link>

        <Link
          href="/rsa"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          공개키암호
        </Link>

        <Link
          href="/cert"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          인증서발급
        </Link>

        <Link
          href="/protected"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          ProtectedPage
        </Link>
      </div>
      {session && session.user ? (
        <div className="flex items-center gap-2">
          <Image
            src={session?.user.image as any}
            width={40}
            height={40}
            alt="avartar"
            className="rounded-full"
          />
          <p className="text-white text-lg font-bold px-2 ">
            {session.user.name}
          </p>
          <form
            action={async () => {
              'use server'
              await signOut()
            }}
          >
            <button
              type="submit"
              className="text-white text-lg bg-gray-500 rounded-md font-bold px-2 hover:text-gray-400"
            >
              Sign Out
            </button>
          </form>
        </div>
      ) : (
        <>
          <form
            action={async () => {
              'use server'
              await signIn()
            }}
          >
            <button
              type="submit"
              className="text-white text-lg font-bold px-2 hover:text-gray-400"
            >
              Sign In
            </button>
          </form>
        </>
      )}
    </nav>
  )
}
