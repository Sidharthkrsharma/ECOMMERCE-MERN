import React, { useEffect, useState } from 'react'
import "./productdetailsmain.scss"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Addreview, getSingleProducts, productreview, reviewDelete } from '../../redux/slice/productSlice/ProductSlice';
import toast from 'react-hot-toast';
import { AddtoCart } from '../../redux/slice/userAuthSlice/userAuthSlice';


const ProductsDetailsmain = () => {

    const { singleProducts } = useSelector((state) => state.Product);
    const { UserLoggedIn } = useSelector((state) => state.User);
    const { addProductReview } = useSelector((state) => state.Product);

    const { ProductReview } = useSelector((state) => state.Product);
    const { deleteReview } = useSelector((state) => state.Product);
    const { userCartData } = useSelector((state) => state.User);

    const [show, setShow] = useState(false);

    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");

    const [showrating, setShowrating] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id } = useParams();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const getProductsDetails = () => {
        const data = {
            productid: id
        }

        dispatch(getSingleProducts(data))
    }

    // review set
    const handlesetRating = (e) => {
        const { value, label } = e;
        setRating(value);
    }

    // add to cart
    const handleIncrement = (e)=>{
        dispatch(AddtoCart(e))
    }


    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ]


    // checkuservalidforreview
    const handleOpenModel = () => {
        if (UserLoggedIn.length == 0) {
            toast.error("Please Login Before Write Review");
            navigate("/login")
        } else {
            handleShow()
        }
    }

    const handleAddReview = (e) => {
        e.preventDefault();

        if (rating == "") {
            toast.error("rating is required!");
        } else if (description == "") {
            toast.error("description is required!");
        } else {
            const data = {
                username: UserLoggedIn.length > 0 ? UserLoggedIn[0]?.firstname : "",
                rating: rating,
                description: description
            }

            const productreviewaddddata = {
                data,
                productid: singleProducts[0]?._id
            }

            dispatch(Addreview(productreviewaddddata)).then((res) => {
                if (res?.payload) {
                    setDescription("");
                    setRating("")
                    handleClose()
                }
            }).catch((error) => {
                console.log("error", error)
                handleClose()
            })
        }
    }

    // product review delete
    const handleReviewDelete = (id)=>{
        const data = {
            reviewid:id
        }
        dispatch(reviewDelete(data))
    }

    // get product review
    const getproductreviewDetails = () => {
        const data = {
            productid: singleProducts[0]?._id
        }

        dispatch(productreview(data))
    }


    useEffect(() => {
        getProductsDetails()
    }, [id, addProductReview,userCartData])

    useEffect(() => {
        let totalrating = 0;

        ProductReview.map((ele) => {
            totalrating = totalrating + parseInt(ele.rating);
        })

        
        setShowrating(Math.round(totalrating / ProductReview.length))
    }, [ProductReview])


    useEffect(() => {
        getproductreviewDetails()
    }, [singleProducts,deleteReview])


    return (
        <>
            <div className="cart_section">
                <h2 className='text-center'>Product Details</h2>
                <div className="cart_container">
                    <div className="left_cart">
                        <img src={singleProducts[0]?.productimage} alt="" />
                    </div>
                    <div className="right_cart">
                        <h3>{singleProducts[0]?.productname}</h3>
                        {
                            showrating ? <div className="reviewicon">
                                {
                                    Array.from({ length: showrating }).map((ele, ind) => {
                                        return <i class="fa-solid fa-star"></i>
                                    })
                                }

                                <span>&nbsp;{showrating}&nbsp; Rating</span>
                            </div> : "NO Rating"
                        }

                        <p className='mrp'>M.R.P : ₹ {singleProducts[0]?.price}</p>
                        <div className="discount_box">
                            <h4>Discount : <span style={{ color: "#111" }}>{singleProducts[0]?.discount} %</span></h4>
                            <p>Iteams Left : <span style={{ color: "#B12704" }}>{singleProducts[0]?.quantity}</span></p>
                            <h4>FREE DELIVERY : <span style={{ color: "#111", fontWeight: "600" }}>NOV - 10 - 15</span>Details</h4>
                            <p>Fastest delivery : <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                        </div>
                        <p className='description'>About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{singleProducts[0]?.description}</span></p>

                        <div className="addtocart">
                            <Button className='btn mt-3 addcartbtn' variant='dark' onClick={()=>handleIncrement(singleProducts[0]?._id)}>Add to cart</Button>
                        </div>
                    </div>
                </div>

                {/* review code */}
                <div className="container" style={{ width: "100%" }}>
                    <div className='d-flex justify-content-between'>
                        <h3>Customer Review</h3>
                        <Button className='btn btn-primary' onClick={handleOpenModel}>Write A Review</Button>
                    </div>

                    <div className='mt-2 mb-5 d-flex justify-content-between flex-wrap'>
                        {
                            ProductReview?.length > 0 ? ProductReview.map((element, index) => {
                                return (
                                    <>
                                        <Card style={{ width: '20rem' }} className='mb-3'>
                                            <Card.Body>
                                                <Card.Title>{element.username}</Card.Title>
                                                <Card.Text style={{ color: "#f5d742" }}>
                                                    {
                                                        Array.from({ length: element.rating }).map((ele, ind) => {
                                                            return <i class="fa-solid fa-star"></i>
                                                        })
                                                    }

                                                </Card.Text>
                                                <Card.Text >
                                                    {element.description}
                                                </Card.Text>
                                                {
                                                    UserLoggedIn[0]?._id === element?.userid ? <Button variant="none" onClick={()=>handleReviewDelete(element._id)}><i class="fa-solid fa-trash" style={{ color: "red" }}></i></Button> : ""

                                                }
                                            </Card.Body>
                                        </Card>
                                    </>
                                )
                            }) : "No Review"
                        }


                    </div>
                </div>

                {/* model for review */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Write Your Review Here</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form_data">
                            <form action="">
                                <div className="form_input">
                                    <label htmlFor="username">Your Name</label>
                                    <input type="text" value={UserLoggedIn.length > 0 ? UserLoggedIn[0]?.firstname : ""} name="username" id="" disabled />
                                </div>
                                <div className="form_input">
                                    <label htmlFor="username">Give The Rating</label>
                                    <Select options={options} onChange={handlesetRating} />

                                </div>
                                <Form.Group className="mb-3 mt-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" onChange={(e) => setDescription(e.target.value)} name='description' rows={3} />
                                </Form.Group>

                                <button className='btn' onClick={handleAddReview}>Submit</button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default ProductsDetailsmain