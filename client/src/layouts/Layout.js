import React from 'react'
import Headers from './Header/Headers'
import Footer from './Footer/Footer'

const Layout = ({children}) => {
  return (
    <>
        <Headers />
        {children}
        <Footer />
    </>
  )
}

export default Layout