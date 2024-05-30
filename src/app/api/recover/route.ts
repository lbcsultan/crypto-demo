import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  try {
    const existUser = await prisma.privatekey.findUnique({
      where: { ownerEmail: email },
    })
    if (existUser) {
      let privateKey = existUser.privatekey
      let message = 'private key is retrieved'
      return NextResponse.json({ privateKey, message }, { status: 200 })
    } else {
      let privateKey = ''
      let message = 'private key cannot be retrieved'
      return NextResponse.json({ privateKey, message }, { status: 200 })
    }
  } catch (error) {
    console.log(error)
  }
}
