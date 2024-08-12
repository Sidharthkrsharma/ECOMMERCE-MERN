import React, { useEffect, useState } from 'react'
import ProductsPagemain from '../../components/ProductsPageMain/ProductsPagemain'
import Loader from '../../components/Loader/Loader';

const ProductsPage = () => {
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
        spin ? <Loader /> : <ProductsPagemain />
      }

    </>
  )
}

export default ProductsPage