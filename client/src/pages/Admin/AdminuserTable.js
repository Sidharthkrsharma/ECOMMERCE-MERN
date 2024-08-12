import React from 'react'
import "./tabel.scss"
import { Card, Dropdown, Row, Table } from 'react-bootstrap'
import Paginations from '../../components/Pagination/Paginations'
import { useDispatch, useSelector } from 'react-redux'
import { deleteuser } from '../../redux/slice/userAuthSlice/userAuthSlice'

const AdminuserTable = ({ getAlluserData, page, pageCount, setPage, handlePrevios, handleNext }) => {

    const dispatch = useDispatch();
    const handleDeleteuser = (id)=>{
        const data = {
            userid:id
        }
        dispatch(deleteuser(data))
    }
    return (
        <>
            <div className="container">
                <h4>Users</h4>

                <Row>
                    <div className="col mt-0 mb-3">
                        <Card className='shadow'>
                            <Table className='align-items-center' responsive="sm">
                                <thead className='thead-dark'>
                                    <tr className='table-dark'>
                                        <th>ID</th>
                                        <th>FullName</th>
                                        <th>Email</th>
                                        <th>Profile</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        getAlluserData?.usersdata?.length > 0 ? getAlluserData?.usersdata?.map((element, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{index + 1 + (page - 1) * 4}</td>
                                                        <td>{element.firstname}</td>
                                                        <td>{element.email}</td>
                                                        <td className='img_parent'>
                                                            <img src={element.userprofile} alt="" />
                                                        </td>
                                                        <td>
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                                                    <i className='fa-solid fa-ellipsis-vertical'></i>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item >
                                                                        <div onClick={()=>handleDeleteuser(element._id)}>
                                                                            <i class="fa-solid fa-trash" style={{ color: "red" }}></i>

                                                                            <span>Delete</span>
                                                                        </div>
                                                                    </Dropdown.Item>


                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        }) : "NO User Available"
                                    }


                                </tbody>
                            </Table>
                            <Paginations
                                page={page}
                                pageCount={pageCount}
                                setPage={setPage}
                                handlePrevios={handlePrevios}
                                handleNext={handleNext}
                            />
                        </Card>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default AdminuserTable