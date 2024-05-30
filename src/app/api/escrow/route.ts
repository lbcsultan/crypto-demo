import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, encryptedPrivateKeyPem } = await request.json()

  try {
    const existUser = await prisma.privatekey.findUnique({
      where: { ownerEmail: email },
    })
    if (existUser) {
      const updateCert = await prisma.privatekey.update({
        where: { ownerEmail: email },
        data: { privatekey: encryptedPrivateKeyPem },
      })
      console.log('PrivateKey is updated!')
    } else {
      const newPrivateKey = await prisma.privatekey.create({
        data: {
          ownerEmail: email,
          privatekey: encryptedPrivateKeyPem,
        },
      })
      console.log('New private key is saved!')
    }
  } catch (error) {
    console.log(error)
  }

  return NextResponse.json(
    { message: 'Private key is saved in escrow mode' },
    { status: 200 }
  )
}
