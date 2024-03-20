import computePbkdf2 from '@/lib/computePbkdf2'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const { password, salt, iteration, keyLength } = await request.json()
  const derivedKey = computePbkdf2(password, salt, iteration, keyLength)
  return NextResponse.json({ key: derivedKey }, { status: 200 })
}
