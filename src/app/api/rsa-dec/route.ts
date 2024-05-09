import { NextResponse } from 'next/server'
import { rsaDecrypt } from '@/lib/computeRSA'

export async function POST(request: any) {
  const { privateKeyPem, ciphertext } = await request.json()
  let recoveredtext = rsaDecrypt(privateKeyPem, ciphertext)
  return NextResponse.json({ recoveredtext: recoveredtext }, { status: 200 })
}
