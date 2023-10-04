'use client'
import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import PageTitle from '@/components/PageTitle'
import { Button, Form, message } from 'antd'
import JobPostForm from '@/components/JobPostForm'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setLoading } from '@/redux/loadersSlice'

function EditJob() {
  const [jobData, setJobData] = React.useState<any>(null)
  const router = useRouter()

  const { jobId } = useParams()

  const dispatch = useDispatch()

  const onFinish = async (values: any) => {
    try {
      values._id = jobId
      dispatch(setLoading(true))
      const response = await axios.put(`/api/jobs/${jobId}`, values)
      message.success(response.data.message)
      router.push('/jobs')
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const fetchJob = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get(`/api/jobs/${jobId}`)
      setJobData(response.data.data)
      setJobData((prevValue: any) => {
        return { ...prevValue, date: +prevValue.date }
      })
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  React.useEffect(() => {
    fetchJob()
  }, [])

  return (
    jobData && (
      <div>
        <div className='flex justify-between items-center'>
          <PageTitle title='Prepravi Oglas' />
          <Button type='default' onClick={() => router.back()}>
            Nazad
          </Button>
        </div>

        <Form
          layout='vertical'
          onFinish={onFinish}
          className='form-edit'
          initialValues={jobData}
        >
          <JobPostForm />

          <div className='flex justify-end items-center gap-3 my-3'>
            <Button type='default' onClick={() => router.back()}>
              Prekini
            </Button>
            <Button type='primary' htmlType='submit'>
              Ažuriraj Oglas
            </Button>
          </div>
        </Form>
      </div>
    )
  )
}

export default EditJob
