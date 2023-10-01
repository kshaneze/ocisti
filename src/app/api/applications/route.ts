import { connectDB } from '@/config/dbConfig'
import { validateJWT } from '@/helpers/validateJWT'
import Application from '@/models/applicationModel'
import { NextRequest, NextResponse } from 'next/server'

import { sendEmail } from '@/helpers/sendEmail'

connectDB()

export async function POST(request: NextRequest) {
  try {
    await validateJWT(request)
    const reqBody = await request.json()
    const application: any = await Application.create(reqBody)

    const applicationData: any = await Application.findById(application._id)
      .populate('user')
      .populate({
        path: 'job',
        populate: {
          path: 'user',
        },
      })

    await sendEmail({
      to: applicationData.job?.user.email,
      subject: 'Primljena nova prijava',
      text: `Primili ste novu prijavu od ${applicationData.user.firstname}`,
      html: `<div>
        <p>You have received a new application from ${applicationData.user.firstname}</p>
        <p>Ime podnosioca zahteva je ${applicationData.user.firstname}</p>
        <p>Email podnosioca zahteva je: ${applicationData.user.email}</p>
        <p>Broj telefona podnosioca zahteva je: ${applicationData.user.phone}</p>
        </div>`,
    })

    return NextResponse.json({
      message: 'Uspješno ste se prijavili na oglas za posao',
      data: application,
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    validateJWT(request)
    // fetch query stribg parameters
    const { searchParams } = new URL(request.url)
    const user = searchParams.get('user')
    const job = searchParams.get('job')

    const filtersObject: any = {}

    if (user) {
      filtersObject['user'] = user
    }

    if (job) {
      filtersObject['job'] = job
    }

    const applications = await Application.find(filtersObject)
      .populate('user')
      .populate({
        path: 'job',
        populate: {
          path: 'user',
        },
      })

    return NextResponse.json({
      message: 'Poslovi učitani uspješno',
      data: applications,
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
