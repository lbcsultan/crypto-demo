import Link from 'next/link'

export default function ProtectedPage() {
  return (
    <div className="flex flex-col gap-2">
      <Link
        href="/protected/serverPage"
        className="bg-slate-300 text-lg font-bold m-4 p-4"
      >
        Protected Server Page
      </Link>
      <Link
        href="/protected/clientPage"
        className="bg-slate-300 text-lg font-bold m-4 p-4"
      >
        Protected Client Page
      </Link>
      <Link
        href="/protected/middlewareProtectedPage"
        className="bg-slate-300 text-lg font-bold m-4 p-4"
      >
        Protected page with Middleware
      </Link>
    </div>
  )
}
