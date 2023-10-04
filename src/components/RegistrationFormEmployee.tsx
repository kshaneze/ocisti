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
        Sing up to hire employee
      </h1>
      <Form layout='vertical' className='flex flex-col' onFinish={onFinish}>
        <Form.Item name='firstname'>
          <input type='text' placeholder='First Name' className='input' />
        </Form.Item>

        <Form.Item name='lastname'>
          <input type='text' placeholder='Last Name' className='input' />
        </Form.Item>

        <Form.Item name='email'>
          <input type='email' placeholder='Email' className='input' />
        </Form.Item>

        <Form.Item name='password'>
          <input type='password' placeholder='Password' className='input' />
        </Form.Item>

        <Form.Item name='region'>
          <Select
            className='select'
            placeholder='Choose your region'
            options={[
              { value: 'Budva', label: 'Budva' },
              { value: 'Podgorica', label: 'Podgorica' },
              { value: 'Kotor', label: 'Kotor' },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Checkbox type='checkbox'>
            Send me emails with tips on how to find employee that fits my needs.{' '}
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox type='checkbox'>
            Yes, I understand and agree to the Očisti Terms of Service ,
            including the User Agreement and Privacy Policy .
          </Checkbox>
        </Form.Item>

        <Button type='primary' htmlType='submit' block>
          Create account
        </Button>

        <span className='text-center my-3'>
          Already have an account? <Link href='/prijava'> Login</Link>
        </span>
      </Form>
    </div>
  )
}

export default RegistrationFormEmployee
