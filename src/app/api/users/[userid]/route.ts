import { validateJWT } from '@/helpers/validateJWT'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { connectDB } from '@/config/dbConfig'
connectDB()

export async function GET(request: NextRequest, { params }: any) {
  try {

    await validateJWT(request)
    const user = await User.findById(params.userid).select('-password')
    // delete user password

    if (!user) {
      throw new Error('No user Found')
    }
    return NextResponse.json({
      message: 'User data fetched seccessfully ',
      data: user,
    })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
