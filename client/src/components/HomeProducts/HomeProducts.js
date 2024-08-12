import React from 'react'
import "./HomeProducts.scss"
import { NavLink } from "react-router-dom"

const HomeProducts = ({ ProductsData, LatestProducts }) => {
    return (
        <>
            <section id='sellers'>
                {/* Product */}
                <div className="seller containers">
                    <h2>Products</h2>
                    <div className="best-seller">
                        {
                            ProductsData?.length > 0 ?
                                ProductsData.slice(0, 4).map((element, index) => {
                                    return (
                                        <>
                                            <div className="best-p1">
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
                                }) : "No Products Available"
                        }


                    </div>
                </div>

                {/* new arrival */}
                <div className="seller containers">
                    <h2>New Arrivals</h2>
                    <div className="best-seller">
                        {
                            LatestProducts?.length > 0 ?
                                LatestProducts?.slice(0, 4)?.map((element, index) => {
                                    return (
                                        <>
                                            <div className="best-p1">
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
                                }) : "No Products Available"
                        }


                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeProducts