import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/config/dbConfig'
import { validateJWT } from '@/helpers/validateJWT'
import Application from '@/models/applicationModel'
import { sendEmail } from '@/helpers/sendEmail'
import moment from 'moment'

connectDB()

export async function PUT(request: NextRequest, { params }: any) {
  try {
    validateJWT(request)
    const reqBody = await request.json()
    const application: any = await Application.findByIdAndUpdate(
      params.applicationId,
      reqBody,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user')
      .populate({
        path: 'job',
        populate: {
          path: 'user',
        },
      })

    await sendEmail({
      to: application.user.email,
      subject: `Status Vaše prijave je ažuriran na ${application.status}`,
      html: `<div>
      <p>Za prijavu na posao čišćenje ${application.job.propertyType} ste ${
        application.status
      }</p>
     
      <p>
       Poslodavac: ${application.job.user.firstname}
      </p>
    
      <p>
        Naslov oglasa: ${application.job.propertyType}
      </p>
   
      <p>
        Datum prijave: ${moment(application.createdAt).format('DD/MM/YYYY')}
      </p>
   
      <p>Hvala Vam što koristite Ocisti.me</p>
      </div>`,
    })
    return NextResponse.json({
      message: 'Prijava ažurirana uspješno',
      data: application,
    })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    validateJWT(request)
    const application = await Application.findByIdAndDelete(
      params.applicationId
    )
    return NextResponse.json({
      message: 'Prijava uspješno izbrisana',
      data: application,
    })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
