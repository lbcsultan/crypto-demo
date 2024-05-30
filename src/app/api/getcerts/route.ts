import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET() {
  const certs = await prisma.certificate.findMany()
  return NextResponse.json({ certs }, { status: 200 })
}
