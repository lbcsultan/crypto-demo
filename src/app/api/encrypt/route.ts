import { computeDecrypt } from '@/lib/computeAES'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
  const { mode, key, iv, ciphertext } = await request.json()
  let recoveredtext = computeDecrypt(ciphertext, mode, key, iv)
  return NextResponse.json({ recoveredtext: recoveredtext }, { status: 200 })
}
