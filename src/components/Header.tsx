import { Button } from 'antd'
import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header>
      <div className='header-container'>
        <img src='./logo.svg'></img>
        <div>
          <Link href='/prijava' passHref>
            <Button type='primary'>Prijavite se </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
