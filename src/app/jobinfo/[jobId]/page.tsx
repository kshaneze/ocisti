'use client'
import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PageTitle from '@/components/PageTitle'
import { Button, Form, message, Row, Col } from 'antd'
import JobPostForm from '@/components/JobPostForm'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoading } from '@/redux/loadersSlice'
import moment from 'moment'
// import Divider from '@/components/Divider'

function JobInfo() {
  const { currentUser } = useSelector((state: any) => state.users)
  const [jobData, setJobData] = React.useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])

  const router = useRouter()

  const { jobId } = useParams()
  const dispatch = useDispatch()

  const fetchJob = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get(`/api/jobs/${jobId}`)
      setJobData(response.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const fetchApplications = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get(
        `/api/applications?job=${jobId}&user=${currentUser._id}`
      )
      setApplications(response.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  React.useEffect(() => {
    fetchJob()
    fetchApplications()
  }, [])

  const onApply = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.post(`/api/applications`, {
        job: jobData._id,
        user: currentUser._id,
        status: 'Na čekanju',
      })
      message.success(response.data.message)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    jobData && (
      <div>
        <PageTitle title={jobData.title} />

        <Row gutter={[16, 16]} className='gap-3'>
          <Col xl={12} xs={24} span={12} className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <span>Objavio</span>
              <span>{jobData.user?.firstname}</span>
            </div>
            <div className='flex justify-between'>
              <span>Lokacija</span>
              <span>
                {jobData.town}, {jobData.address}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Cijena</span>
              <span>{jobData.price}$</span>
            </div>
            <div className='flex justify-between'>
              <span>Vrsta objekta</span>
              <span>{jobData.propertyType}</span>
            </div>
            <div className='flex justify-between'>
              <span>Vrsta čišćenja</span>
              <span>{jobData.cleaningType}</span>
            </div>
            <div className='flex justify-between'>
              <span>Vrijeme i datum</span>
              <span>{moment(jobData.date).format('DD-MM-YYYY HH:mm:ss')}</span>
            </div>
          </Col>

          <Col span={24} className='flex flex-col gap-2'>
            <h1 className='text-md'>Dodatan Opis</h1>
            <span>{jobData.description}</span>
            {applications.length > 0 && (
              <span className='my-3 info p-3'>
                Već ste se prijavili za ovaj posao. Molimo Vas da sacekate
                odgovor poslodavca.
              </span>
            )}
            <div className='flex justify-end gap-3'>
              <Button type='default' onClick={() => router.back()}>
                Nazad
              </Button>
              <Button
                type='default'
                onClick={() =>
                  router.push(`/informacijeKorisnika/${jobData.user._id}`)
                }
              >
                Informacije poslodavca
              </Button>
              <Button
                type='primary'
                onClick={onApply}
                disabled={
                  currentUser.userType === 'employer' || applications.length > 0
                }
              >
                Prijavite se
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  )
}

export default JobInfo
