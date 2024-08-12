import React, { useEffect, useState } from 'react'
import CartsMain from '../../components/cartsMain/CartsMain'
import Loader from "../../components/Loader/Loader"

const Carts = () => {

  const [spin, setSpin] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpin(false)
    }, 3000)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <>
      {
        spin ? <Loader /> : <CartsMain />
      }

    </>
  )
}

export default Carts