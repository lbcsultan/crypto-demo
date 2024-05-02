import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'

import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import connectMongoDB from '@/lib/mongodb'
import User from '@/models/user'

const config: NextAuthConfig = {
  providers: [Google, GitHub],
  pages: {
    signIn: '/signIn',
  },
  // callbacks: {
  //   authorized({ request, auth }) {
  //     const { pathname } = request.nextUrl
  //     if (pathname === '/middlewareProtectedPage') return !!auth
  //     return true
  //   },
  //   async signIn({
  //     user,
  //     account,
  //   }: {
  //     user: User
  //     account: any
  //   }): Promise<User | undefined> {
  //     const { name, email } = user
  //     const apiUrl = 'http://localhost:3000'

  //     try {
  //       await connectMongoDB()
  //       const userExists = await User.findOne({ email })

  //       if (!userExists) {
  //         const res = await fetch(`${apiUrl}/api/user`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ name, email }),
  //         })
  //         if (res.ok) {
  //           return user
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     return user
  //   },
  // },
}

export const { auth, handlers, signIn, signOut } = NextAuth(config)
