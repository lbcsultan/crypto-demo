import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
          href="/rsaFunc"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          공개키암호
        </Link>

        <Link
          href="/certFunc"
          className="text-white text-lg font-bold px-2 hover:text-gray-400"
        >
          인증서
        </Link>
        {session && (
          <Link
            href="/protected"
            className="text-white text-lg font-bold px-2 hover:text-gray-400"
          >
            Protected
          </Link>
        )}
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
            <Button
              variant={'outline'}
              size="lg"
              className="font-bold text-lg"
              type="submit"
            >
              Sign Out
            </Button>
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
            <Button
              variant={'outline'}
              size="lg"
              className="font-bold text-lg"
              type="submit"
            >
              Sign In
            </Button>
          </form>
          {/* <LoginButton>Login</LoginButton> */}
        </>
      )}
    </nav>
  )
}
