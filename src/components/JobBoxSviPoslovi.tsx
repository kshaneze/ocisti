import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, Tooltip } from 'antd'
import moment from 'moment'
function JobBoxSviPoslovi({
  title,
  town,
  address,
  surface,
  date,
  price,
  id,
}: {
  title: any
  town: any
  address: any
  surface: any
  date: any
  price: any
  id: any
}) {
  const router = useRouter()
  return (
    <div className='jobBox p-5'>
      <div className='JobBoxTitle'>
        <p className='title'>Čišćenje {title}</p>
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

export default JobBoxSviPoslovi
