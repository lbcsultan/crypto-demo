import connectMongoDB from '@/lib/mongodb'
import User from '@/models/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { name, email } = await request.json()
  await connectMongoDB()
  await User.create({ name, email })
  return NextResponse.json({ message: 'User registered' }, { status: 201 })
}
