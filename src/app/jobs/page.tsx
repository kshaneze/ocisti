'use client'
import PageTitle from '@/components/PageTitle'
import { Button, Table, message } from 'antd'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoading } from '@/redux/loadersSlice'
import moment from 'moment'
import { Tooltip } from 'antd'
import Applications from '@/components/Applications'
import JobBox from '@/components/JobBox'

function Jobs() {
  const [selectedJob = {}, setSelectedJob] = useState({} as any)
  const [showApplications = false, setShowApplications] =
    useState<boolean>(false)
  const [jobs, setJobs] = useState([])
  const { currentUser } = useSelector((state: any) => state.users)
  const dispatch = useDispatch()
  const router = useRouter()

  const fetchJobs = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get(`/api/jobs?user=${currentUser._id}`)
      console.log(response.data.data)
      setJobs(response.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  

  React.useEffect(() => {
    fetchJobs()
  }, [])

  const jobsDisplay = jobs.map((job: any) => (
    <JobBox
      key={job._id}
      title={job.propertyType}
      town={job.town}
      surface={job.m2}
      date={job.date}
      price={job.price}
      address={job.address}
      id={job._id}
      setSelectedJob={setSelectedJob}
      setShowApplications={setShowApplications}
      job={job}
      fetchJobs={fetchJobs}
    />
  ))

  return (
    <div>
      <div className='flex justify-between items-center'>
        <PageTitle title='Objavljeni Poslovi' />
        <Button type='primary' onClick={() => router.push('/jobs/new')}>
          Objavi Novi Oglas
        </Button>
      </div>

      <div className='my-2 jobsContainer'>{jobsDisplay}</div>

      {showApplications && (
        <Applications
          selectedJob={selectedJob}
          setShowApplications={setShowApplications}
          showApplications={showApplications}
        />
      )}
    </div>
  )
}

export default Jobs
