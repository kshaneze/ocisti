'use client'
import EmployeeForm from '@/components/EmployeeForm'
import EmployerForm from '@/components/EmployerForm'
import PageTitle from '@/components/PageTitle'
import { setCurrentUser } from '@/redux/usersSlice'
import { Button, Form, message } from 'antd'
import axios from 'axios'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from '@/redux/loadersSlice'
import { useRouter } from 'next/navigation'

function Profile() {
  const { currentUser } = useSelector((state: any) => state.users)
  const dispatch = useDispatch()

  const router = useRouter()

  const onFinish = async (values: any) => {
    try {
      values._id = currentUser._id
      values.userType = currentUser.userType
      dispatch(setLoading(true))
      const { data } = await axios.put('/api/users', values)
      // Or
      // const  response  = await axios.put('/api/users', values)
      message.success('Profil ažuriran uspješno')

      dispatch(setCurrentUser(data.data))
    } catch (error: any) {
      message.error(error.data.message || 'Something went wrong')
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div>
      <PageTitle title='Profil' />
      <Form
        layout='vertical'
        initialValues={currentUser}
        className='form-profile'
        onFinish={onFinish}
      >
        {currentUser?.userType === 'employer' ? (
          <EmployerForm />
        ) : (
          <EmployeeForm />
        )}

        <div className='flex justify-between my-3'>
          <Button type='default' onClick={() => router.back()}>
            Nazad
          </Button>
          <Button type='primary' htmlType='submit'>
            Sačuvaj
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Profile
