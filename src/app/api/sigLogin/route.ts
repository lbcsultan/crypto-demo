import { rsaVerify } from '@/lib/computeRSA'
import prisma from '@/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import forge from 'node-forge'

export async function POST(request: NextRequest) {
  const { email, currentTime, signature } = await request.json()
  const message = JSON.stringify({ email, currentTime })
  const cert = await prisma.certificate.findUnique({
    where: { ownerEmail: email },
  })
  const certificatePem = cert?.certificate
  const certificate = forge.pki.certificateFromPem(certificatePem as string)
  const publicKey = certificate.publicKey
  const publicKeyPem = forge.pki.publicKeyToPem(publicKey)
  const result = rsaVerify(publicKeyPem, message, signature)
  return NextResponse.json({ result }, { status: 200 })
}
