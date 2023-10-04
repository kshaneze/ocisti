'use client'
import { Modal } from 'antd'
import React, { useState, useEffect } from 'react'

import PageTitle from '@/components/PageTitle'
import { Table, message, Button, Avatar, Divider, List, Skeleton } from 'antd'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoading } from '@/redux/loadersSlice'
import moment from 'moment'

function Applications({
  showApplications,
  setShowApplications,
  selectedJob,
}: {
  showApplications: boolean
  setShowApplications: (showApplications: boolean) => void
  selectedJob: any
}) {
  const [application, setApplications] = useState([])
  const dispatch = useDispatch()
  const router = useRouter()

  const fetchApplications = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get(
        `/api/applications?job=${selectedJob._id}`
      )
      setApplications(response.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const onStatusUpdate = async (applicationId: string, status: string) => {
    try {
      dispatch(setLoading(true))
      const response = await axios.put(`/api/applications/${applicationId}`, {
        status,
      })

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
      title: 'Applicant',
      dataIndex: 'user',
      render: (user: any) => user.firstname,
    },

    {
      title: 'Email',
      dataIndex: 'user',
      render: (user: any) => user.email,
    },
    {
      title: 'Applied On',
      dataIndex: 'createdAt',
      render: (createdAt: any) => moment(createdAt).format('DD/MM/YYYY'),
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string, record: any) => (
        <select
          value={status}
          onChange={(e) => onStatusUpdate(record._id, e.target.value)}
        >
          <option value='Na čekanju'>Na čekanju</option>
          <option value='Prihvaćeni'>Prihvati radnika</option>
          <option value='Odbijeni'>Odbiji radnika</option>
        </select>
      ),
    },

    {
      title: 'Actions',
      dataIndex: '_id',
      render: (applicationId: string, application: any) => (
        <Button
          onClick={() =>
            router.push(`/informacijeKorisnika/${application.user._id}`)
          }
        >
          View
        </Button>
      ),
    },
  ]

  interface DataType {
    gender: string
    name: {
      title: string
      first: string
      last: string
    }
    email: string
    picture: {
      large: string
      medium: string
      thumbnail: string
    }
    nat: string
  }

  const [loading, setloading] = useState(false)
  const [data, setData] = useState<DataType[]>([])

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setloading(true)
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results])
        setloading(false)
      })
      .catch(() => {
        setloading(false)
      })
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  return (
    <Modal
      title={`Prijave za čišćenje ${selectedJob.propertyType}a`}
      open={showApplications}
      onCancel={() => setShowApplications(false)}
      width={1000}
    >
      <div className='my-2'>
        <Table columns={columns} dataSource={application} />
      </div>

      <div
        id='scrollableDiv'
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href='https://ant.design'>{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </div>
    </Modal>
  )
}

export default Applications
