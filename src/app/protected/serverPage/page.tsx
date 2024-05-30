import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function ServerPage() {
  const session = await auth()

  if (!session || !session.user) redirect('/signIn')

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Protected Server Page</h1>
      <p className="mb-4 bg-slate-300">const session = await auth()</p>

      <p>Name: {session?.user.name}</p>
      <p>Email: {session.user?.email}</p>
      <p>Image: {session?.user?.image}</p>
      <p>Expires at: {session?.expires}</p>
      <p className="mt-4">JSON: {JSON.stringify(session)}</p>
    </div>
  )
}
