import React from 'react'
import { Form, Button, Select, Checkbox, message } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/loadersSlice'

function RegistrationFormEmployee() {
  const dispatch = useDispatch()

  const onFinish = async (values: any) => {
    try {
      dispatch(setLoading(true))
      const response = await axios.post('/api/users/register', values)
      message.success(response.data.message)
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong')
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className='registrationEmployee-container w-25 '>
      <h1 className='headingTextColor text-center text-3xl'>
        Registruj se i počni sa radom
      </h1>
      <Form layout='vertical' className='flex flex-col' onFinish={onFinish}>
        <Form.Item name='firstname'>
          <input type='text' placeholder='Ime' className='input' />
        </Form.Item>

        <Form.Item name='lastname'>
          <input type='text' placeholder='Prezime' className='input' />
        </Form.Item>

        <Form.Item name='email'>
          <input type='email' placeholder='Email' className='input' />
        </Form.Item>

        <Form.Item name='password'>
          <input type='password' placeholder='Šifra' className='input' />
        </Form.Item>

        <Form.Item name='region'>
          <Select
            className='select'
            placeholder='Izaberi svoj grad'
            options={[
              { value: 'Budva', label: 'Budva' },
              { value: 'Podgorica', label: 'Podgorica' },
              { value: 'Kotor', label: 'Kotor' },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Checkbox type='checkbox'>
            Da, razumem i slažem se sa uslovima korišćenja usluge Očisti,
            uključujući Korisnički ugovor i Politiku privatnosti.
          </Checkbox>
        </Form.Item>

        <Button type='primary' htmlType='submit' block>
          Kreiraj nalog
        </Button>

        <span className='text-center my-3'>
          Već imate svoj nalog? <Link href='/prijava'> Prijavi se!</Link>
        </span>
      </Form>
    </div>
  )
}

export default RegistrationFormEmployee
