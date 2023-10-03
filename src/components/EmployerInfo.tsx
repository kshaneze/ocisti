import { Col, Row, Button } from 'antd'
import React from 'react'
import { useRouter } from 'next/navigation'

function EmployerInfo({ emploerInfo }: { emploerInfo: any }) {
  const router = useRouter()
  return (
    <Row>
      <Col xl={12} xs={24} span={12}>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between'>
            <span>Ime</span>
            <span>{emploerInfo.firstname}</span>
          </div>

          <div className='flex justify-between'>
            <span>Email</span>
            <span>{emploerInfo.email}</span>
          </div>

          <div className='flex justify-between'>
            <span>Telefon</span>
            <span>{emploerInfo.phone}</span>
          </div>

          <div className='flex justify-between'>
            <span>Grad</span>
            <span>{emploerInfo.region}</span>
          </div>
        </div>
      </Col>

      <Col span={24} className='my-3'>
        <h1 className='text-md'>
          <b>O Poslodavcu</b>
        </h1>

        <span>{emploerInfo.about}</span>
      </Col>
      <div className='flex justify-end gap-3'>
        <Button type='default' onClick={() => router.back()}>
          Nazad
        </Button>
      </div>
    </Row>
  )
}

export default EmployerInfo
