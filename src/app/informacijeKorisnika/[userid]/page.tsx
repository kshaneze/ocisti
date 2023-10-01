'use client'
import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/loadersSlice'
import axios from 'axios'
import { message } from 'antd'
import PageTitle from '@/components/PageTitle'
import EmployerInfo from '@/components/EmployerInfo'
import EmployeeInfo from '@/components/EmployeeInfo'

function UserInfo() {
  const [userInfo, setUserInfo] = React.useState<any>(null)
  const { userid } = useParams()
  const dispatch = useDispatch()
  const router = useRouter()

  const fetchUserInfo = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get(`/api/users/${userid}`)
      setUserInfo(response.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  React.useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    userInfo && (
      <div>
        <PageTitle
          title={`Informacije ${
            userInfo.userType === 'employer' ? 'Poslodavca' : 'Čistača'
          }`}
        />

        {userInfo.userType === 'employer' ? (
          <EmployerInfo emploerInfo={userInfo} />
        ) : (
          <EmployeeInfo employeeInfo={userInfo} />
        )}
      </div>
    )
  )
}

export default UserInfo
