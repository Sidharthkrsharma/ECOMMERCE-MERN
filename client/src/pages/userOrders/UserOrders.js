import React, { useEffect } from 'react'
import { Container, Col, Row, Card } from 'react-bootstrap'
import { userorders } from '../../redux/slice/userAuthSlice/userAuthSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserOrders = () => {

    const { userOrderData } = useSelector((state) => state.User);
   

    const dispatch = useDispatch();


    const getOrdersdata = () => {
        dispatch(userorders());
    }

    useEffect(() => {
        getOrdersdata()
    }, [])
    return (
        <>
            <Container className='pt-4 pb-4'>
                <h2>Your Orders</h2>

                <Card>
                    {
                        userOrderData?.length > 0 ? userOrderData?.map((element, index) => {
                            return (
                                <>
                                    <div className="mt-2 store-item bottom-line pb-3">
                                        <h5>OrderId :-{element._id}</h5>
                                        {
                                            element?.orderItems?.map((ele, index) => {
                                                return (
                                                    <>
                                                        <div className='mb-3'>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <img src={ele.productDetails.productimage} className='image-store' alt="" />
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <div className='mt-3 mt-lg-0 d-flex align-items-center justify-content-between'>
                                                                        <h4>{ele.productDetails.productname} </h4>
                                                                    </div>
                                                                    <div className="list-store d-flex align-items-center justify-content-between">
                                                                        <p><span style={{ fontWeight: "bold" }}>discount :- </span>{ele.productDetails.discount} % </p>
                                                                    </div>
                                                                    <div className="list-store d-flex align-items-center justify-content-between">
                                                                        <p> <span style={{ fontWeight: "bold" }}>Price :- </span> {ele.productDetails.price}  ₹</p>
                                                                    </div>
                                                                    <div className="list-store d-flex align-items-center justify-content-between">
                                                                        <p> <span style={{ fontWeight: "bold" }}>Delivery Adress :-  </span>{element.address} </p>
                                                                    </div>
                                                                    <div className="list-store d-flex align-items-center justify-content-between">
                                                                        <p> <span style={{ fontWeight: "bold" }}>OrderStatus:- </span> {element.orderstatus}</p>
                                                                    </div>
                                                                    <div className="list-store d-flex align-items-center justify-content-between">
                                                                        <div className='text-end' style={{ width: "100%" }}>
                                                                            <h5>Total :- {ele?.productDetails?.price * ele?.quantity}</h5>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }


                                        <hr />
                                    </div>
                                </>
                            )
                        }) : "No Orders"
                    }


                </Card>


            </Container>
        </>
    )
}

export default UserOrders