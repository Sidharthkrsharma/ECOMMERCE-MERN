import React, { useEffect, useState } from 'react'
import "./header.scss"
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { uselogoutfun, userVerify, usercart } from '../../redux/slice/userAuthSlice/userAuthSlice';
import { NavLink, useNavigate } from 'react-router-dom';

const Headers = () => {

    const { UserLoggedIn } = useSelector((state) => state.User);
    const { loginuser } = useSelector((state) => state.User);
    const { AddCart } = useSelector((state) => state.User);
    const { removesingleCart } = useSelector((state) => state.User);
    const { removeCart } = useSelector((state) => state.User);
    const { userCartData } = useSelector((state) => state.User);
    const { DeleteCartData } = useSelector((state) => state.User);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userLoggedIn = () => {
        dispatch(userVerify())
    }

    const handleCartsDetails = ()=>{
        dispatch(usercart());
    }

    const userlogouthandle = ()=>{
        dispatch(uselogoutfun()).then((res)=>{
            handleClose()
            navigate("/")
        }).catch((error)=>{
            handleClose()

            navigate("/")
        })
    }

    useEffect(() => {
        userLoggedIn()
    }, [loginuser])


    useEffect(()=>{
        handleCartsDetails();
    },[AddCart,loginuser,removesingleCart,removeCart,DeleteCartData])
    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <div className="left">
                            <div className="navlogo">
                                <NavLink to="/" className='text-dark text-decoration-none'><img src="https://i.postimg.cc/TP6JjSTt/logo.webp" alt="" /></NavLink>
                            </div>
                        </div>
                        <div className="right">
                            <div className="hamburgur" onClick={handleShow}>
                                <i class="fa-solid fa-bars"></i>
                            </div>
                            <div className="nav_btn">
                                <NavLink to="/products">Products</NavLink>
                            </div>
                            <div id='ex4' className="cartsicon">
                                <NavLink to="/carts" className='text-dark'>
                                    <span className='p1 fa-stack fa-2x has-badge' data-count={UserLoggedIn?.length > 0 ? userCartData?.length:"0"}>
                                        <i class="p1 fa-solid fa-cart-shopping"></i>
                                    </span>
                                </NavLink>
                            </div>

                            <div className="profile">
                                <Dropdown className='text-center'>
                                    <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                        <img src={UserLoggedIn?.length > 0 ? UserLoggedIn[0]?.userprofile : "/logo192.png"} className='profile_img' alt="" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            UserLoggedIn?.length > 0 ?
                                                (
                                                    <>
                                                        <Dropdown.Item >
                                                            <NavLink to="/userprofile" className='text-dark text-decoration-none'>
                                                                <i class="fa-solid fa-user"></i>&nbsp;&nbsp;&nbsp;
                                                                Profile
                                                            </NavLink>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={userlogouthandle}>

                                                            <i class="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;&nbsp;
                                                            Logout

                                                        </Dropdown.Item>
                                                    </>
                                                ) :
                                                (
                                                    <>

                                                        <Dropdown.Item >
                                                            <NavLink to="/login" className='text-dark text-decoration-none'>

                                                                <i class="fa-solid fa-user"></i>&nbsp;&nbsp;&nbsp;
                                                                Login

                                                            </NavLink>
                                                        </Dropdown.Item>
                                                    </>
                                                )
                                        }



                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* sidebar */}
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <img src={UserLoggedIn?.length > 0 ? UserLoggedIn[0]?.userprofile : "/logo192.png"} className='profile_img' style={{ width: "50px" }} alt="" />
                        </Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body style={{ background: "black" }}>
                        <NavLink to="/products" onClick={handleClose}  className='text-light text-decoration-none'>
                            <i class="fa-solid fa-shop"></i>&nbsp;&nbsp;
                            Products</NavLink> <br />
                        {
                            UserLoggedIn?.length > 0 ? (
                                <>
                                    <NavLink to="/userprofile" onClick={handleClose}  className='text-light text-decoration-none'>
                                        <i class="fa-solid fa-user"></i>&nbsp;&nbsp;&nbsp;
                                        Profile
                                    </NavLink>
                                    <div className='text-light' onClick={userlogouthandle} style={{cursor:"pointer"}}>
                                        <i class="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;
                                        Logout
                                    </div>

                                </>
                            ) : (
                                <>
                                    <NavLink to="/login" onClick={handleClose} className='text-light text-decoration-none'>
                                        <i class="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;
                                        Login</NavLink>
                                </>
                            )
                        }

                        <div id='ex4' className="cartsicon">
                            <a href="" className='text-light' onClick={handleClose}>
                                <span className='p1 fa-stack fa-2x has-badge' data-count={0}>
                                    <i class="p1 fa-solid fa-cart-shopping"></i>
                                </span>
                            </a>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </header>
        </>
    )
}

export default Headers