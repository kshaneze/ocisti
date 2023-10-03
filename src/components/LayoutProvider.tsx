'use client'
import { ConfigProvider, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setLoading } from '@/redux/loadersSlice'
import { setCurrentUser } from '@/redux/usersSlice'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'

import Loader from './Loader'
import Header from './Header'
import HeaderMobile from './HeaderMobile'

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.users)
  const { loading } = useSelector((state: any) => state.loaders)

  const router = useRouter()
  const dispatch = useDispatch()

  const [menuItems, setMenuItems] = useState([
    {
      name: 'Poslovi',
      path: '/poslovi',
      icon: '/Home.svg',
    },
    {
      name: 'Profil',
      path: '/profil',
      icon: '/Profile.svg',
    },
    {
      name: 'Prijavljeni poslovi',
      path: '/prijavljeni-poslovi',
      icon: '/Add.svg',
    },
    // {
    //   name: 'Podešavanja',
    //   path: '/podesavanja',
    //   icon: '/Settings.svg',
    // },

    // {
    //   name: 'Sačuvani Poslovi',
    //   path: '/sacuvani-poslovi',
    //   icon: '/Saved.svg',
    // },
  ])

  const getCurrentUser = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get('/api/users/currentuser')
      const isEmployer = response.data.data.userType === 'employer'

      if (isEmployer) {
        const tempMenuItems: any = menuItems
        tempMenuItems[2].name = 'Objavljeni Poslovi'
        tempMenuItems[2].path = '/jobs'
        setMenuItems(tempMenuItems)
      }

      dispatch(setCurrentUser(response.data.data))
    } catch (error: any) {
      message.error(error.response.data.message || 'something went wrong')
      // message.error('Please clear your cookies and try again')
    } finally {
      dispatch(setLoading(false))
    }
  }

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    if (
      pathname !== '/prijava' &&
      pathname !== '/registracija' &&
      pathname !== '/' &&
      !currentUser
    ) {
      getCurrentUser()
    }
  }, [pathname, currentUser])

  const onLogout = async () => {
    try {
      dispatch(setLoading(true))
      await axios.post('/api/users/logout')
      message.success('Uspješno ste se odjavili sa Vašeg profila')
      dispatch(setCurrentUser(null))
      router.push('/prijava')
    } catch (error: any) {
      message.error(error.response.data.message || 'something went wrong')
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <html lang='en'>
      <head>
        <link
          href='https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css'
          rel='stylesheet'
        />
      </head>
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#9BCCCE',
            },
          }}
        >
          {loading && <Loader />}
          {/* if route is login or register, dont show layout */}
          {pathname === '/prijava' ||
          pathname === '/registracija' ||
          pathname === '/' ? (
            <div>
              <Header />
              {children}
            </div>
          ) : (
            currentUser && (
              <>
                <HeaderMobile />
                <div className='layout-parent'>
                  <div className='sidebar'>
                    <div className='logo'>
                      {isSidebarExpanded && <img src='/logo.svg'></img>}
                      {!isSidebarExpanded && (
                        <i
                          className='ri-menu-2-line'
                          onClick={() => setIsSidebarExpanded(true)}
                        ></i>
                      )}
                      {isSidebarExpanded && (
                        <i
                          className='ri-close-line'
                          onClick={() => setIsSidebarExpanded(false)}
                        ></i>
                      )}
                    </div>

                    <div className='menu-items'>
                      {menuItems.map((item, index) => {
                        const isActive = pathname === item.path
                        return (
                          <div
                            className={`menu-item ${
                              isActive ? 'active-menu-item' : ''
                            }`}
                            style={{
                              justifyContent: isSidebarExpanded
                                ? 'flex-start'
                                : 'center',
                            }}
                            key={index}
                            onClick={() => router.push(item.path)}
                          >
                            <img src={item.icon}></img>

                            <span>{isSidebarExpanded && item.name}</span>
                          </div>
                        )
                      })}
                    </div>

                    <div className='user-info'>
                      {isSidebarExpanded && (
                        <div className='flex flex-col'>
                          <span>{currentUser?.firstname}</span>
                          <span>{currentUser?.email}</span>
                        </div>
                      )}
                      <i
                        className='ri-logout-box-r-line'
                        onClick={onLogout}
                      ></i>
                    </div>
                  </div>
                  <div className='body'>{children}</div>
                </div>

                <div className='mobile-menu'>
                  <div className='menu-items'>
                    {menuItems.map((item, index) => {
                      const isActive = pathname === item.path
                      return (
                        <div
                          className={`menu-item ${
                            isActive ? 'active-menu-item' : ''
                          }`}
                          style={{
                            justifyContent: isSidebarExpanded
                              ? 'flex-start'
                              : 'center',
                          }}
                          key={index}
                          onClick={() => router.push(item.path)}
                        >
                          <img src={item.icon}></img>

                          <span>{isSidebarExpanded && item.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )
          )}
        </ConfigProvider>
      </body>
    </html>
  )
}

export default LayoutProvider
