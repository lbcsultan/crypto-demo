import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'

import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import prisma from '@/lib/prismadb'

const config: NextAuthConfig = {
  // adapter: PrismaAdapter(prisma),
  providers: [Google, GitHub],
  pages: {
    signIn: '/signIn',
  },
}

export const { auth, handlers, signIn, signOut } = NextAuth(config)
