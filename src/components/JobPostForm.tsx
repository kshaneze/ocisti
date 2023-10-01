'use client'
import React from 'react'
import { Col, Form, Row, DatePicker } from 'antd'

function JobPostForm() {
  const { RangePicker } = DatePicker

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Form.Item name='propertyType' label='Vrsta objekta'>
          <select placeholder='Vrsta objetka'>
            <option value='Kuca'>Kuca</option>
            <option value='Stan'>Stan</option>
            <option value='Apartman'>Apartman</option>
            <option value='Kancelarija'>Kancelarija</option>
            <option value='Garaža'>Garaža</option>
            <option value='Soba'>Soba</option>
            <option value='Lokal'>Lokal</option>
          </select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item name='cleaningType' label='Vrsta čišćenja'>
          <select>
            <option value='Standardno'>Standardno</option>
            <option value='Generalno'>Generalno</option>
            <option value='Odrzavanje'>Odrzavanje</option>
          </select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label='Površina objekta'
          rules={[
            {
              required: true,
              message: 'Molimo Vas da ukucate povrsinu objekta',
            },
          ]}
          name='m2'
        >
          <input type='number' placeholder='m2' />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label='Grad'
          rules={[{ required: true, message: 'Molimo Vas da ukucate grad' }]}
          name='town'
        >
          <input placeholder='Budva' />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label='Adresa'
          rules={[{ required: true, message: 'Molimo Vas da ukucate adresu' }]}
          name='address'
        >
          <input placeholder='Gospostina 22' />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label='Datum i vrijeme' name='date'>
          <DatePicker showTime />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          label='Dodatan opis'
          rules={[
            { required: true, message: 'Please enter a job description' },
          ]}
          name='description'
        >
          <textarea />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item name='price' label='Cijena'>
          <input type='number' placeholder='45€' />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default JobPostForm
