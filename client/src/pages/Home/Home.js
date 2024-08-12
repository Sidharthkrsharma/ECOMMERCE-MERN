import React, { useEffect, useState } from 'react'
import Homemain from '../../components/Homemain/Homemain'
import HomeProducts from '../../components/HomeProducts/HomeProducts'
import HomeContacts from '../../components/HomeContacts/HomeContacts'
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts, getLatestProducts } from '../../redux/slice/productSlice/ProductSlice'
import Loader from '../../components/Loader/Loader'

const Home = () => {

    const { ProductsData } = useSelector((state) => state.Product);
    const { LatestProducts } = useSelector((state) => state.Product);

    const [spin, setSpin] = useState(true);


    const dispatch = useDispatch();
    const [page, setPage] = useState(1);



    const productApi = () => {
        const data = {
            selectedcategory: "all",
            page
        }

        dispatch(getAllProducts(data)).then((res) => {
            // console.log("res",res)
        }).catch((err) => {
            console.log("error", err)
        });

        dispatch(getLatestProducts());
    }


    useEffect(() => {
        productApi()
    }, [])



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
                spin ? <Loader /> :
                    (
                        <>
                            <Homemain />
                            <HomeProducts ProductsData={ProductsData.getAllProducts} LatestProducts={LatestProducts} />
                            <HomeContacts />
                        </>
                    )

            }

        </>
    )
}

export default Home