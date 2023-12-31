import { connectDB } from '@/config/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
connectDB()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    // check if user exists
    const user = await User.findOne({ email: reqBody.email })
    if (!user) {
      throw new Error('Korisnik ne postoji')
    }

    //compare passwords
    const validPassword = await bcrypt.compare(reqBody.password, user.password)
    if (!validPassword) {
      throw new Error('Netačna lozinka')
    }

    // create token
    const dataToBeSigned = {
      userId: user._id,
      email: user.email,
    }

    const token = jwt.sign(dataToBeSigned, process.env.jwt_secret!, {
      expiresIn: '1d',
    })

    const response = NextResponse.json(
      { message: 'Prijava uspješna' },
      { status: 200 }
    )

    // set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
