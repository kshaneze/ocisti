'use client'
import React from 'react'
import { Form, Button, Select, Checkbox, message } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/loadersSlice'

function Login() {
  const router = useRouter()
  const dispatch = useDispatch()

  const onFinish = async (values: any) => {
    try {
      dispatch(setLoading(true))
      const response = await axios.post('/api/users/login', values)
      message.success(response.data.message)
      router.push('/profil')
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong')
    } finally {
      dispatch(setLoading(false))
    }
  }
  return (
    <div className='w-100 flex justify-center items-center flex-col h-screen'>
      <h1 className='headingTextColor text-center text-3xl'>Prijavi se</h1>
      <Form
        layout='vertical'
        className='flex flex-col w-25'
        onFinish={onFinish}
      >
        <Form.Item name='email'>
          <input type='email' placeholder='Email' className='input' />
        </Form.Item>

        <Form.Item name='password'>
          <input type='password' placeholder='Password' className='input' />
        </Form.Item>

        <Button type='primary' htmlType='submit' block>
          Prijavi se
        </Button>

        <span className='text-center my-3'>
          Još nisi naš član? <Link href='/registracija'> Registruj se! </Link>
        </span>
      </Form>
    </div>
  )
}

export default Login
