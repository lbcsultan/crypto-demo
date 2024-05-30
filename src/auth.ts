import bcrypt from 'bcryptjs'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'

import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

const prisma = new PrismaClient()

const config: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [Google, GitHub],
  session: {
    strategy: 'jwt',
    // strategy: 'database',
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/signIn',
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === '/protected/middlewareProtectedPage1') return !!auth
      return true
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
