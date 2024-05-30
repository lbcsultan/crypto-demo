import prisma from '@/lib/prismadb'
import { User } from '@prisma/client'

export default async function UsersPage() {
  const users = (await prisma.user.findMany()) as User[]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        All Registered Users (등록된 사용자)
      </h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span className="font-bold">{user.email}</span> - {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
