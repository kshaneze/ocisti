import nodemailer from 'nodemailer'

export const sendEmail = async ({ to, subject, text, html }: any) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.auth_user,
        pass: process.env.auth_pass,
      },
    })

    await transporter.sendMail({
      from: 'SheyJobs',
      to: to,
      subject,
      text,
      html,
    })
  } catch (error) {
    console.log(error)
    return error
  }
}
