'use client'
import React, { useState } from 'react'
import { Row, Col, Form } from 'antd'

import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'

function EmployerForm() {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ])

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    )
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={12} xl={8} span={8}>
          <Form.Item label='Ime i prezime' name='firstname'>
            <input type='text'></input>
          </Form.Item>
        </Col>

        <Col xs={12} xl={8} span={8}>
          <Form.Item label='E-mail' name='email'>
            <input type='email'></input>
          </Form.Item>
        </Col>

        <Col xs={12} xl={8} span={8}>
          <Form.Item label='Telefon' name='phone'>
            <input type='text'></input>
          </Form.Item>
        </Col>
        <Col xs={12} xl={8} span={8}>
          <Form.Item label='Grad' name='region'>
            <input type='text'></input>
          </Form.Item>
        </Col>

        <Col xs={12} xl={8} span={8}>
          <Form.Item label='Slika' name='image'>
            <input type='file'></input>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label='About' name='about'>
            <textarea />
          </Form.Item>
        </Col>
        <>
          {/* <Upload
            action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
            listType='picture-circle'
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt='example' style={{ width: '100%' }} src={previewImage} />
          </Modal> */}
        </>
      </Row>
    </>
  )
}

export default EmployerForm
