import { NextResponse } from 'next/server'
import forge from 'node-forge'

export async function POST(request: any) {
  const { password, salt, iteration, keyLength } = await request.json()

  const it = parseInt(request.body.iteration)
  const kl = parseInt(request.body.keyLength)

  const derivedKey = forge.util.bytesToHex(
    forge.pkcs5.pbkdf2(password, salt, it, kl)
  )
  return NextResponse.json({ key: derivedKey }, { status: 200 })
}
