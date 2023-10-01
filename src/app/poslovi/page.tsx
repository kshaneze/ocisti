'use client'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { setLoading } from '@/redux/loadersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, message } from 'antd'
import { useRouter } from 'next/navigation'
import JobBoxSviPoslovi from '@/components/JobBoxSviPoslovi'
import Filters from '@/components/Filters'

export default function Home() {
  const [jobs = [], setJobs] = useState([])

  const [filters, setFilters] = React.useState({
    searchText: '',
    location: '',
  })

  const router = useRouter()

  const dispatch = useDispatch()
  const fetchJobs = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get(`/api/jobs`, { params: filters })
      console.log(response.data.data)
      setJobs(response.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} getData={fetchJobs} />
      <div className='jobsContainer'>
        {jobs.map((job: any) => (
          <JobBoxSviPoslovi
            title={job.propertyType}
            town={job.town}
            surface={job.m2}
            date={job.date}
            price={job.price}
            address={job.address}
            id={job._id}
            key={job._id}
          />
        ))}
      </div>
    </div>
  )
}
