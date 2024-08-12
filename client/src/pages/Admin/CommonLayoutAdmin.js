import React from 'react'
import AdminSidebar from '../../components/AdminCommonlayout/AdminSidebar'

const CommonLayoutAdmin = ({children}) => {
  return (
    <>
    <AdminSidebar children={children} />
    </>
  )
}

export default CommonLayoutAdmin