import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import { getAllProducts, getCategory } from '../../redux/slice/productSlice/ProductSlice';
import Paginations from '../Pagination/Paginations';
import { NavLink } from 'react-router-dom';

const ProductsPagemain = () => {

    const { ProductsData } = useSelector((state) => state.Product);
    const { CategoryData } = useSelector((state) => state.Product);

    const dispatch = useDispatch();

    const [categorystate, setCategoryState] = useState([]);


    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [selectedcategory, setSelectedCategory] = useState("");

    const productApi = () => {
        const data = {
            selectedcategory: selectedcategory,
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

    useEffect(() => {
        dispatch(getCategory())
    }, [])

    useEffect(() => {
        let arr = [{ value: "all", label: "all" }];

        for (let i = 0; i < CategoryData.length; i++) {
            let setcategoryvalue = { value: CategoryData[i]._id, label: CategoryData[i].categoryname };
            arr.push(setcategoryvalue)
        }

        setCategoryState(arr)

    }, [CategoryData])

    useEffect(() => {
        productApi()
    }, [page, selectedcategory])
    return (
        <>
            <section id='sellers'>
                <div className="seller containers">
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>Products</h2>
                        <div className='category-filter mt-5'>
                            <Select options={categorystate} onChange={(e) => setSelectedCategory(e.value)} placeholder="filter By category" />
                        </div>
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
                                                </div>
                                                <div className="buy-now">
                                                    <button>
                                                        <NavLink to={`/productdetails/${element._id}`}>Buy Now</NavLink>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                </div>
                <Paginations
                    pageCount={pageCount}
                    page={page}
                    handleNext={handleNext}
                    handlePrevios={handlePrevios}
                    setPage={setPage}
                />
            </section>
        </>
    )
}

export default ProductsPagemain