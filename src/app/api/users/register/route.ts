import { connectDB } from '@/config/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'

connectDB()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    // check if user already exists
    const user = await User.findOne({ email: reqBody.email })
    if (user) {
      throw new Error('Korisnik već postoji')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(reqBody.password, salt)
    reqBody.password = hashedPassword

    // create user
    await User.create(reqBody)
    return NextResponse.json(
      { message: 'Korisnik uspješno kreiran', success: true },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
