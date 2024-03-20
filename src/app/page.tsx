import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Forge Crypto Demo</h1>

      <div className="bg-red-200 px-4 py-2 rounded-md mb-4 w-max">
        <Link href="https://www.npmjs.com/package/node-forge">
          node-forge package
        </Link>
      </div>

      <div className="mb-4 text-blue-800 bg-yellow-200 px-4 py-2 w-max">
        <Link href="https://forge-crypto.netlify.app/">
          Frontend Forge Demo
        </Link>
      </div>
      <div className="mb-4 text-blue-800 bg-yellow-200 px-4 py-2 w-max">
        <Link href="https://forge-demo.vercel.app/">
          Nextjs Fullstack Forge Demo
        </Link>
      </div>
    </div>
  )
}
