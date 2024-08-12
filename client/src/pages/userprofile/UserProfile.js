import React, { useEffect } from 'react'
import "./userprofile.scss";
import { useDispatch, useSelector } from 'react-redux';
import { userorders } from '../../redux/slice/userAuthSlice/userAuthSlice';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { UserLoggedIn } = useSelector((state) => state.User);
    const { userOrderData } = useSelector((state) => state.User);
    // console.log("userOrderData",userOrderData)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getOrdersdata = ()=>{
        dispatch(userorders());
    }

    const handleOrders = ()=>{
        navigate("/userorders")
    }

    useEffect(()=>{
        getOrdersdata()
    },[])

    return (
        <>
            <div className="wrapper mt-5 mb-5">
                <div className="left">
                    <img src={UserLoggedIn[0]?.userprofile} alt="" width="100" />
                    <h4>{UserLoggedIn[0]?.firstname}</h4>
                    <p>UI Developer</p>
                </div>
                <div className="right">
                    <div className="info">
                        <h3>Information</h3>
                        <div className="info_data">
                            <div className="data">
                                <h4>Email</h4>
                                <p>{UserLoggedIn[0]?.email}</p>
                            </div>

                        </div>
                    </div>

                    <div className="projects">
                        <h3>Orders</h3>
                        <div className="projects_data">
                            <div className="data">
                                <h4>Total Orders</h4>
                                <p style={{ fontSize: "20px" }}>{userOrderData?.length}</p>
                            </div>

                            <div className="data">
                                <button className='btn btn-primary' onClick={handleOrders}>see orders</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile