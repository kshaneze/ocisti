'use client'
import PageTitle from '@/components/PageTitle'
import { Table, message } from 'antd'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoading } from '@/redux/loadersSlice'
import moment from 'moment'
import { Tooltip } from 'antd'

import JobBoxPrijavljeniPoslovi from '@/components/JobBoxPrijavljeniPoslovi'

function Applications() {
  const [application, setApplications] = useState([])
  const { currentUser } = useSelector((state: any) => state.users)
  const dispatch = useDispatch()
  const router = useRouter()

  const fetchApplications = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get(
        `/api/applications?user=${currentUser._id}`
      )
      setApplications(response.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const deleteApplication = async (applicationId: string) => {
    try {
      dispatch(setLoading(true))
      const response = await axios.delete(`/api/applications/${applicationId}`)
      message.success(response.data.message)
      fetchApplications()
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  React.useEffect(() => {
    fetchApplications()
  }, [])

  const columns = [
    {
      title: 'Application ID',
      dataIndex: '_id',
    },
    {
      title: 'Vrsta objekta',
      dataIndex: 'job',
      render: (job: any) =>
        job?.propertyType || 'oglas je istekao ili je izbrisan',
    },
    {
      title: 'Vrijeme posla',
      dataIndex: 'job',
      render: (job: any) => moment(job?.date).format('DD/MM/YYYY u h:mm'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Datum prijave',
      dataIndex: 'createdAt',
      render: (createdAt: any) => moment(createdAt).format('DD/MM/YYYY'),
    },

    {
      title: 'Izbriši Prijavu',
      dataIndex: '_id',
      render: (id: any) => (
        <Tooltip title='Delete'>
          <i
            className='ri-delete-bin-line'
            onClick={() => deleteApplication(id)}
          ></i>
        </Tooltip>
      ),
    },
  ]

  return (
    <div>
      <div className='flex justify-between items-center'>
        <PageTitle title='Prijavljeni poslovi' />
      </div>

      <div className='my-2'>
        <Table
          columns={columns}
          dataSource={application}
          locale={{
            emptyText: (
              <div className='applied-jobs-Container'>
                <img src='/cleaner-no-jobs-applied.png' />
                <p>
                  Nemate<br></br> prijavljenjih<br></br> poslova
                </p>
              </div>
            ),
          }}
        />
      </div>
      <div className='jobsContainer'>
        {application.map((app: any) => (
          <JobBoxPrijavljeniPoslovi
            title={app.job.propertyType}
            town={app.town}
            surface={app.m2}
            date={app.job.date}
            postDate={app.date}
            price={app.job.price}
            address={app.address}
            id={app.job._id}
            key={app._id}
            status={app.status}
          />
        ))}
      </div>
    </div>
  )
}

export default Applications
