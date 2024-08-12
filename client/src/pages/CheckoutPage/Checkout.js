import moment from 'moment';
import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

const Checkout = () => {
    const { userCartData } = useSelector((state) => state.User);

    const { state } = useLocation();
    const navigate = useNavigate();

     // delivery date
     const dateAfter2days = moment().add(2,'days').format('YYYY-MM-DD');
    
     const finaldata = {
        ...state,
        orderItems:userCartData
     }

     const handleSubmit = (e)=>{
        e.preventDefault();

        navigate("/payment",{state:finaldata})
     }
    return (
        <>
            <div className="container">
                <Card style={{ width: "22rem", border: "2px solid #32a897", marginTop: "5px" }}>
                    <Card.Body>
                        <Card.Title>Shipping Details</Card.Title>
                        <Card.Text>
                            <span style={{ fontWeight: "bold" }}>Address:-</span> {state?.address}
                        </Card.Text>
                        <Card.Text>
                            <span style={{ fontWeight: "bold" }}>City:-</span> {state?.city}
                        </Card.Text>
                        <Card.Text>
                            <span style={{ fontWeight: "bold" }}>State:-</span> {state?.state}
                        </Card.Text>
                        <Card.Text>
                            <span style={{ fontWeight: "bold" }}>Country:-</span> {state?.country}
                        </Card.Text>
                        <Card.Text>
                            <span style={{ fontWeight: "bold" }}>Mobile:-</span> {state?.mobile}
                        </Card.Text>
                        <Card.Text>
                            <span style={{ fontWeight: "bold" }}>Pincode:-</span> {state?.pincode}
                        </Card.Text>
                        <Card.Text>
                            <span style={{ fontWeight: "bold" }}>shipingPrice:-</span> {state?.shippingPrice}
                        </Card.Text>
                        <Card.Text>
                            <span style={{ fontWeight: "bold" }}>TotalPrice:-</span> {state?.totalPrice} ₹
                        </Card.Text>
                    </Card.Body>
                </Card>

                {/* order details */}
                <Card className='card mt-3' style={{ border: "2px solid #32a897" }}>
                    <Card.Title>Your Orders</Card.Title>
                    {
                        userCartData?.map((element, index) => {
                            return (
                                <>
                                    <div className="mt-2 store-item bottom-line pb-3">
                                        <Row>
                                            <Col lg={3}>
                                                <img src={element.productDetails?.productimage} className='image-store' alt="" />
                                            </Col>
                                            <Col lg={9}>
                                                <div className='mt-3 mt-lg-0 d-flex align-items-center justify-content-between'>
                                                    <h4>{element.productDetails?.productname}</h4>
                                                </div>
                                                <div className="list-store d-flex align-items-center justify-content-between">
                                                    <p>discount :- {element.productDetails?.discount}%</p>
                                                </div>
                                                <div className="list-store d-flex align-items-center justify-content-between">
                                                    <p>Price :- {element.productDetails?.price} ₹</p>
                                                </div>
                                                <div className="list-store d-flex align-items-center justify-content-between">
                                                    <p>Delivery Date :- {dateAfter2days}</p>
                                                </div>
                                                <div className="list-store d-flex align-items-center justify-content-between">
                                                    <div className='d-flex'>
                                                        <h5>Total :- {element.productDetails?.price * element?.quantity}</h5>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <hr />
                                    </div>
                                </>
                            )
                        })
                    }



                </Card>
            </div>

            <div className="container mt-3 mb-2">
                <Button onClick={handleSubmit}>Process To Payment</Button>
            </div>
        </>
    )
}

export default Checkout