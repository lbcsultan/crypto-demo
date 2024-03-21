import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Forge Crypto Demo</h1>

      <Link href="https://github.com/digitalbazaar/forge">
        <h3 className="text-xl mb-2 bg-slate-100">
          <span className="font-bold text-blue-600/100 px-2 py-1 rounded-lg bg-amber-200">
            node-forge
          </span>{' '}
          is a native implementation of TLS (and various other cryptographic
          tools) in JavaScript. The Forge software is a fully native
          implementation of the TLS protocol in JavaScript, a set of
          cryptography utilities, and a set of tools for developing Web Apps
          that utilize many network resources.
        </h3>
      </Link>
      <br />

      <Link href="https://github.com/digitalbazaar/forge">
        <h3 className="text-xl mb-2 bg-slate-100">
          <span className="font-bold text-blue-600/100 px-2 py-1 rounded-lg bg-amber-200">
            bcryptjs
          </span>{' '}
          is an implementation of password hash salting.
        </h3>
      </Link>
      <br />

      <Link href="https://github.com/digitalbazaar/forge">
        <h3 className="text-xl mb-2 bg-slate-100">
          <span className="font-bold text-blue-600/100 px-2 py-1 rounded-lg bg-amber-200">
            jsonwebtoken
          </span>{' '}
          is an implementation of JSON Web Tokens. JSON Web Tokens are an open,
          industry standard RFC 7519 method for representing claims securely
          between two parties.
        </h3>
      </Link>
      <br />
      <div className="bg-red-200 font-bold px-4 py-2 rounded-md mb-4 w-max">
        <Link href="https://forge-crypto.netlify.app/">
          Frontend Forge Demo
        </Link>
      </div>
      <div className="bg-red-200 font-bold px-4 py-2 rounded-md mb-4 w-max">
        <Link href="https://forge-demo.vercel.app/">
          Nextjs Fullstack Forge Demo
        </Link>
      </div>

      <div className="mx-20 my-5 ">
        <Image
          src="/crypto.jpg"
          alt="crypto and encryption"
          layout="responsive"
          width={500}
          height={500}
        />
      </div>
    </div>
  )
}
