import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../others/UserAuth';

const MarkAttendance = () => {
    const { auth } = useContext(AuthContext);
    let { id } = useParams();
    id = parseInt(id, 10);

    const location = useLocation()
    const { course } = location.state

    const [enrolled, setEnrolled] = useState([]);
    const [filterE, setFilterE] = useState('');

    const handleLoad = useCallback(async () => {
        await axios.get('http://localhost:8000/api/users/attendance/', {
            params: {
                courseid: id,
            },
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        })
            .then(response => {
                setEnrolled(response.data.enrolled);
            })
            .catch(error => error.response)
    }, [auth.token, id])

    useEffect(() => {
        handleLoad();
    }, [handleLoad])

    const handleAttendance = async () => {
        axios.post('http://localhost:8000/api/users/attendance/',
            { enrolled: enrolled, courseid: id },
            {
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                }
            }
        )
            .then(response => {
                alert(response.data.msg);
                handleLoad();
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.errors[0].non_field_errors[0])
                } else {
                    alert('Unknows Error Occured!')
                }
            }
            )
    }

    const handleCheck = (studentid) => {
        setEnrolled(enrolled.map(t => t.studentid.id === studentid ? { ...t, absent: !t.absent } : t))
    }


    return (
        (enrolled) ?
            <>
                <div className='container-fluid'>
                    {/* <!-- Button trigger modal --> */}

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="Attendance" tabIndex="-1" aria-labelledby="" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalLabel">Course Attendance</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Are You Sure You want to Add this Attendance?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">No</button>
                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={(e) => handleAttendance()}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courses View */}
                    <div className="row">
                        <div className="row col-md-12 mb-3">
                            <div className="col-md-2">
                                <NavLink className='btn btn-light bg-light shadow-none' to='/u/courses'>Back</NavLink>
                            </div>
                            <div className="col-md-2 offset-md-8">
                                <button type="button" className="btn btn-primary float-end shadow-none" data-bs-toggle="modal" data-bs-target="#Attendance">Submit Attendance</button></div>
                            <div className="col-md-6 offset-md-3">
                            </div>
                        </div>
                        <div className='row'>
                            <div className=" col-5 mb-2 text-center">
                                <h3>Course: {course.name}</h3>
                            </div>
                            <div className="col-4 offset-md-3 float-end mb-2 text-center">
                                <h3>Date: {(new Date()).toISOString().slice(0, 10)}</h3>
                            </div>
                        </div>
                        <div>
                            <div className='col-md-6 offset-md-3 mb-3'>
                                <input type="text" name='filter' id="filter" value={filterE || ''} onChange={(e) => setFilterE(e.target.value)} className='col-12 text-center form-control' placeholder="Search Student by First Name" required />
                            </div>
                            <div className='table-responsive'>
                                <table className="table table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Absent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enrolled.filter(t => t.studentid.first_name.toLowerCase().includes(filterE.toLowerCase()) || filterE === '').map(
                                            (student, index) => <tr key={student.id} >
                                                <td>{index + 1}</td>
                                                <td>{student.studentid.first_name + ' ' + student.studentid.last_name}</td>
                                                <td>
                                                    <div key={student.studentid.id}>
                                                        <input className="form-check-input" type="checkbox" value={student.absent} onChange={() => handleCheck(student.studentid.id)} id="absent" aria-label="absent" />
                                                    </div>

                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            : (<div className='text-center mt-5' > <h1>Loading...</h1> </div>)
    )
}

export default MarkAttendance

