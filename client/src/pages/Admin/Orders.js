import React, { useEffect } from 'react'
import "./orders.scss"
import { Card, Dropdown, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { OrderUpdateStatus, Ordersforadmin } from '../../redux/slice/adminAuthSlice/AdminSlice'

const Orders = () => {

    const { OrdersData } = useSelector((state) => state.Admin);
    const { OrdersStatusChange } = useSelector((state) => state.Admin);


    const dispatch = useDispatch();

    const handleOrderChange = (orderdata, orderid) => {
        const finaldata = {
            orderStatus: orderdata,
            orderid: orderid
        }

        dispatch(OrderUpdateStatus(finaldata))
    }

    const getOrdersAdmin = () => {
        dispatch(Ordersforadmin())
    }

    useEffect(() => {
        getOrdersAdmin()
    }, [OrdersStatusChange])
    return (
        <>
            <div className="container mb-3">
                <h4>Orders</h4>

                <Row>
                    <div className="col mt-0">
                        <Card className='shadow'>
                            <Table className='align-items-center' responsive="sm">
                                <thead className='thead-dark'>
                                    <tr className='table-dark'>
                                        <th>ID</th>
                                        <th>totalPrice</th>
                                        <th>OrderItems</th>
                                        <th>UserID</th>
                                        <th>&nbsp;&nbsp;&nbsp;Status</th>
                                        <th>action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        OrdersData?.length > 0 ? OrdersData?.map((element, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{element?.totalPrice}</td>
                                                        <td>{element?.orderItems?.length}</td>
                                                        <td>{element.userid}</td>
                                                        <td>
                                                            {
                                                                element.orderstatus == "Processing" ?
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle id='dropdown-basic'>
                                                                            {element.orderstatus}
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item onClick={() => handleOrderChange("Confirmed", element._id)}>Confirm</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                    :
                                                                    element.orderstatus == "Confirmed" ?
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle id='dropdown-basic'>
                                                                                {element.orderstatus}
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu>
                                                                                <Dropdown.Item onClick={() => handleOrderChange("Shipped", element._id)}>Shipped</Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown> :
                                                                        element.orderstatus == "Shipped" ?
                                                                            <Dropdown>
                                                                                <Dropdown.Toggle id='dropdown-basic'>
                                                                                    {element.orderstatus}
                                                                                </Dropdown.Toggle>
                                                                                <Dropdown.Menu>
                                                                                    <Dropdown.Item onClick={() => handleOrderChange("Delivered", element._id)}>Deliverd</Dropdown.Item>
                                                                                </Dropdown.Menu>
                                                                            </Dropdown> : element.orderstatus
                                                            }
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <i className='fa-solid fa-trash' style={{ color: "red```" }}></i>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        }) : "No Orders"
                                    }


                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default Orders