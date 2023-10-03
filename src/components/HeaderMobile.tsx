import React from 'react'
import Link from 'next/link'
import { ConfigProvider, message, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setLoading } from '@/redux/loadersSlice'
import { setCurrentUser } from '@/redux/usersSlice'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function HeaderMobile() {
  const { loading } = useSelector((state: any) => state.loaders)

  const router = useRouter()
  const dispatch = useDispatch()

  const onLogout = async () => {
    try {
      dispatch(setLoading(true))
      await axios.post('/api/users/logout')
      message.success('Uspješno ste se odjavili sa Vašeg profila')
      dispatch(setCurrentUser(null))
      router.push('/prijava')
    } catch (error: any) {
      message.error(error.response.data.message || 'something went wrong')
    } finally {
      dispatch(setLoading(false))
    }
  }
  return (
    <header>
      <div className='header-container header-mobile'>
        <img src='/logo.svg'></img>
        <div className='flex items-center gap-2'>
          {/* <Link href='/prijava' passHref>
            <Button type='primary'>Prijavite se </Button>
          </Link> */}
          <p>Odjavi se</p>
          <i className='ri-logout-box-r-line' onClick={onLogout}></i>
        </div>
      </div>
    </header>
  )
}

export default HeaderMobile
