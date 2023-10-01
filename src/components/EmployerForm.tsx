'use client'
import React from 'react'
import { Row, Col, Form } from 'antd'

function EmployerForm() {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item label='Ime i prezime' name='firstname'>
            <input type='text'></input>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label='E-mail' name='email'>
            <input type='email'></input>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label='Telefon' name='phone'>
            <input type='text'></input>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Grad' name='region'>
            <input type='text'></input>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label='About' name='about'>
            <textarea />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default EmployerForm
