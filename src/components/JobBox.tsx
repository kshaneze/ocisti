import React from 'react'
import { useRouter } from 'next/navigation'
import { Tooltip, message } from 'antd'
import moment from 'moment'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { setLoading } from '@/redux/loadersSlice'

function JobBox({
  title,
  town,
  address,
  surface,
  date,
  price,
  id,
  setSelectedJob,
  setShowApplications,
  job,
  fetchJobs,
}: {
  title: any
  town: any
  address: any
  surface: any
  date: any
  price: any
  id: any
  setSelectedJob: any
  setShowApplications: any
  job: any
  fetchJobs: any
}) {
  const router = useRouter()
  const dispatch = useDispatch()

  const deleteJob = async (jobId: string) => {
    try {
      dispatch(setLoading(true))
      const response = await axios.delete(`/api/jobs/${jobId}`)
      message.success(response.data.message)
      fetchJobs()
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className='jobBox p-5'>
      <div className='JobBoxTitle'>
        <p className='title'>Čišćenje {title}</p>

        <Tooltip title='Delete'>
          <i
            className='ri-delete-bin-line'
            onClick={() => deleteJob(job._id)}
          ></i>
        </Tooltip>

        <Tooltip title='Uredi oglas'>
          <i
            className='ri-pencil-line'
            onClick={() => router.push(`/jobs/edit/${id}`)}
          ></i>
        </Tooltip>
        <Tooltip title='Prijave na posao'>
          <i
            className='ri-file-list-3-line'
            onClick={() => {
              setSelectedJob(job)
              setShowApplications(true)
            }}
          ></i>
        </Tooltip>
      </div>
      <div className='JobBoxLocation'>
        <p>
          {town}, {address}
        </p>
      </div>
      <div className='JobBoxSurface'>
        <p>{surface}m2</p>
      </div>
      <div className='JobBoxDate'>
        <p className='date'>{moment(date).format('DD-MM-YYYY HH:mm:ss')}</p>
      </div>
      <div className='JobBoxPrice'>
        <p className='text-xl'>{price}€</p>
      </div>
    </div>
  )
}

export default JobBox
