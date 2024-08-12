import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, getAllProducts } from '../../redux/slice/productSlice/ProductSlice';
import Paginations from '../../components/Pagination/Paginations';

const AdminProductspage = () => {

    const { ProductsData } = useSelector((state) => state.Product);
    const  {DeleteProducts} = useSelector((state) => state.Product);
    // console.log("ProductsDelete", DeleteProducts)


    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const dispatch = useDispatch();

    const productApi = () => {
        const data = {
            selectedcategory: "all",
            page
        }

        dispatch(getAllProducts(data)).then((res) => {

            setPageCount(res.payload.Pagination.pageCount)
        }).catch((err) => {
            console.log("error", err)
        })
    }

    // pagination
    // handle next btn
    const handleNext = () => {
        setPage(() => {
            if (page === pageCount) return page;
            return page + 1;
        })
    }

    // handle prev btn
    const handlePrevios = () => {
        setPage(() => {
            if (page === 1) return page;
            return page - 1;
        })
    }

    // product delete
    const handleDeleteProducts = (id)=>{
        
        const data = {
            productid:id
        }

        dispatch(deleteProduct(data))
    }

    useEffect(() => {
        productApi()
    }, [page,DeleteProducts])
    return (
        <>
            <section id='sellers'>
                <div className="seller containers">
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>Products</h2>

                    </div>
                    <div className="best-seller">
                        {
                            ProductsData?.getAllProducts?.map((element, index) => {
                                return (
                                    <>
                                        <div className="best-p1 mb-5">
                                            <img src={element.productimage} alt="" />
                                            <div className="best-p1-txt">
                                                <div className="name-of-p">
                                                    <p>{element.productname}</p>
                                                </div>
                                                <div className="price">
                                                    ₹  {element.price}
                                                    <Button variant='none' onClick={()=>handleDeleteProducts(element._id)}>
                                                        <i className='fa-solid fa-trash' style={{ color: "red" }}></i>
                                                    </Button>
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                    <Paginations
                        pageCount={pageCount}
                        page={page}
                        handleNext={handleNext}
                        handlePrevios={handlePrevios}
                        setPage={setPage}
                    />
                </div>
            </section>
        </>
    )
}

export default AdminProductspage