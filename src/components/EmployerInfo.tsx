import { Col, Row } from 'antd'
import React from 'react'

function EmployerInfo({ emploerInfo }: { emploerInfo: any }) {
  return (
    <Row>
      <Col span={12}>
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
    </Row>
  )
}

export default EmployerInfo
