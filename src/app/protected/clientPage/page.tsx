'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function ClientPage() {
  const { data: session } = useSession()

  if (!session || !session.user) redirect('/signIn')

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Protected Client Page</h1>
      <p className="mb-4 bg-slate-300">
        use client <br />
        const session = useSession()
      </p>
      <p>Username: {session?.user.name}</p>
      <p>Email: {session.user?.email}</p>
      <p>{session?.user?.image}</p>
    </div>
  )
}
