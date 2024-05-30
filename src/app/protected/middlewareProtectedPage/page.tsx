import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function MiddlewareProtectedPage() {
  const session = await auth()

  if (!session) redirect('/signIn')

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Protected Page with Middleware
      </h1>
      <p>Name: {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
      <p>Image: {session?.user?.image}</p>
      <p>Expires at: {session?.expires}</p>
      <p className="mt-4">JSON: {JSON.stringify(session)}</p>
    </div>
  )
}
