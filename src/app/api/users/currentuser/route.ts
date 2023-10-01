import { validateJWT } from '@/helpers/validateJWT'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { connectDB } from '@/config/dbConfig'
connectDB()

export async function GET(request: NextRequest) {
  try {

    const userId = await validateJWT(request)
    const user = await User.findById(userId).select('-password')
    // delete user password

    if (!user) {
      throw new Error('Korisnik nije pronadjen')
    }
    return NextResponse.json({
      message: 'Podaci korisnika uspješno učitani ',
      data: user,
    })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
