'use client'

import React, { useState } from 'react'
import { Button, Form, Radio } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import RegistrationFormEmployer from '@/components/RegistrationFormEmployer'
import RegistrationFormEmployee from '@/components/RegistrationFormEmployee'

function Register() {
  const [radioIsActive, setRadioIsActive] = useState('employee')

  const [employer, setEmployer] = useState<any>(false)
  const [employee, setEmployee] = useState<any>(false)

  const router = useRouter()

  function handleChange(event: any) {
    setRadioIsActive(event.target.value)
  }

  const onFinish = async (values: any) => {
    try {
      if (values.userType === 'employer') {
        setEmployer(true)
      }
      if (values.userType === 'employee') {
        setEmployee(true)
      }
    } catch (error: any) {
    } finally {
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen register-container'>
      {!employee && !employer && <p>Dobrodošli!</p>}
      {!employee && !employer && (
        <Form
          layout='vertical'
          className='flex flex-col gap-5 registracija'
          onFinish={onFinish}
        >
          <Form.Item
            label='Postani poslodavac ili čistač'
            name='userType'
            className='form-label'
          >
            <Radio.Group className='registration flex flex-col'>
              <Radio
                value='employer'
                className='radio my-2'
                style={{
                  backgroundColor:
                    radioIsActive === 'employer' ? '#E2F2F1' : '',
                }}
                onClick={handleChange}
              >
                <img src='/employerIcon.svg'></img>Registrujem se kao
                poslodavac, zapošljavam za projekat
              </Radio>
              <Radio
                value='employee'
                className='radio'
                style={{
                  backgroundColor:
                    radioIsActive === 'employee' ? '#E2F2F1' : '',
                }}
                onClick={handleChange}
              >
                <img src='/employerIcon.svg'></img>Registrujem se kao čistač,
                tražim posao
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Button type='primary' htmlType='submit'>
            Kreiraj nalog
          </Button>
          <span className='text-center my-3'>
            Već imate svoj nalog?<Link href='/prijava'> Prijavi se</Link>
          </span>
        </Form>
      )}

      {employer && <RegistrationFormEmployer />}
      {employee && <RegistrationFormEmployee />}
    </div>
  )
}

export default Register
