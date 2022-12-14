import React, { useState, useEffect } from 'react'
import { useParams, NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../others/UserAuth';
import { handleAddMarks, handleLoadMarks } from '../others/requests/authrequests/instructorsrequests';

const MarkMarks = () => {
    const { auth } = useContext(AuthContext);
    let { id } = useParams();
    id = parseInt(id, 10);

    const location = useLocation()
    const { course } = location.state

    const [enrolled, setEnrolled] = useState([]);
    const [filterE, setFilterE] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        handleLoadMarks(id, auth.token, setEnrolled, setIsLoading);
    }, [id, auth.token])

    const handleCheck = (studentid, e) => {
        setEnrolled(enrolled.map(t => t.studentid.id === studentid ? { ...t, result: e.target.value } : t))
    }

    return (
        (!isLoading) ?
            <>
                <div className='container-fluid'>
                    {/* <!-- Button trigger modal --> */}

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="Attendance" tabIndex="-1" aria-labelledby="" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalLabel">Course Marks</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Are You Sure You want to Add these Marks?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">No</button>
                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={(e) => handleAddMarks(enrolled, id, auth.token, setEnrolled, setIsLoading)}>Yes</button>
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
                                <button type="button" className="btn btn-primary float-end shadow-none" data-bs-toggle="modal" data-bs-target="#Attendance">Submit Marks</button></div>                    <div className="col-md-6 offset-md-3">
                            </div>
                        </div>
                        <div>
                            <div className=" col-md-11 offset-md-1 mb-2 text-start">
                                <h3>Course: {course.name}</h3>
                            </div>
                            <div className='col-md-6 offset-md-3 mb-3'>
                                <input type="text" name='filter' id="filter" value={filterE || ''} onChange={(e) => setFilterE(e.target.value)} className='col-12 text-center form-control' placeholder="Search Student by First Name" required />
                            </div>
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrolled.filter(t => t.studentid.first_name.toLowerCase().includes(filterE.toLowerCase()) || filterE === '').map(
                                        (student, index) => <tr key={student.id} >
                                            <td>{index}</td>
                                            <td>{student.studentid.first_name + ' ' + student.studentid.last_name}</td>
                                            <td>
                                                <div key={student.studentid.id}>
                                                    <input className="mx-auto rounded" type="number" value={student.result === null ? '' : student.result} maxLength={3} onChange={(e) => handleCheck(student.studentid.id, e)} min='0' max='100' id="marks" aria-label="marks" />
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
            : (<div className='text-center mt-5' > <h1>Loading...</h1> </div>)
    )
}

export default MarkMarks

