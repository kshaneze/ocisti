import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, Tooltip } from 'antd'
import moment from 'moment'

import 'moment/locale/me' // without this line it didn't work
moment.locale('me')

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
  deleteApplication,
  applicationId,
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
  deleteApplication: any
  applicationId: any
}) {
  const router = useRouter()

  let SpecialToDate = moment(date)
  let specialTo = moment(SpecialToDate, 'DD/MM/YYYY')

  const dates = (
    <div>
      {moment().diff(specialTo) > 0 ? (
        <p>Istekao</p>
      ) : (
        <p>{moment(date).calendar()}</p>
      )}
    </div>
  )

  // moment(date).calendar()

  return (
    <div className='jobBox p-5'>
      <div className='propertyType-container container'>
        <p>Vrsta objekta:</p>
        <p className='title'> {title}</p>
      </div>
      <div className='jobStart-container container'>
        <p>Datum prijave:</p>
        <p> {moment(postDate).format('DD-MM-YYYY')}</p>
      </div>
      <div className='job-status container'>
        <p>Status: </p>
        <p>{status} </p>
      </div>
      <div className='applied-date container'>
        <p>Posao počinje:</p>
        <div className='date'>{dates}</div>
      </div>
      <div className='JobBoxPrice'>
        <p className='text-xl'>{price}€ </p>
      </div>

      <div className='container'>
        <Button
          onClick={() => router.push(`/jobinfo/${id}`)}
          type='primary'
          className='btn-small'
        >
          Više informacija
        </Button>
        <Tooltip title='Izbriši prijavu'>
          <i
            className='ri-delete-bin-line'
            onClick={() => deleteApplication(applicationId)}
          ></i>
        </Tooltip>
      </div>
    </div>
  )
}

export default JobBoxPrijavljeniPoslovi
