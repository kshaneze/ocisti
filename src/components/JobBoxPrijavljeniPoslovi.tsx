import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, Tooltip } from 'antd'
import moment from 'moment'
function JobBoxPrijavljeniPoslovi({
  title,
  town,
  address,
  surface,
  date,
  price,
  id,
  status,
  postDate,
}: {
  title: any
  town: any
  address: any
  surface: any
  date: any
  price: any
  id: any
  status: any
  postDate: any
}) {
  const router = useRouter()
  return (
    <div className='jobBox p-5'>
      <div className='JobBoxTitle'>
        <p className='title'>Vrsta objekta: {title}</p>
      </div>
      <div className='JobBoxLocation'>
        <p>Datum prijave: {moment(postDate).format('DD-MM-YYYY')}</p>
      </div>
      <div className='JobBoxSurface'>
        <p>Status: {status} </p>
      </div>
      <div className='JobBoxDate'>
        <p>Vrijeme posla:</p>
        <p className='date'>{moment(date).format('DD-MM-YYYY u  HH:mm')}</p>
      </div>
      <div className='JobBoxPrice'>
        <p className='text-xl'>{price}€</p>
      </div>

      <Button
        onClick={() => router.push(`/jobinfo/${id}`)}
        type='primary'
        className='btn-small'
      >
        Više informacija
      </Button>
    </div>
  )
}

export default JobBoxPrijavljeniPoslovi
