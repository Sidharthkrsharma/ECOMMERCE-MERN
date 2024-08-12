import React, { useEffect, useState } from 'react'
import ProductsDetailsmain from '../../components/ProductsDetailsMain/ProductsDetailsmain'
import Loader from '../../components/Loader/Loader';

const ProductsDetailsPage = () => {
  const [spin, setSpin] = useState(true);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setSpin(false)
    }, 3000)
  }, [])
  return (
    <>
      {
        spin ? <Loader /> : <ProductsDetailsmain />
      }

    </>
  )
}

export default ProductsDetailsPage