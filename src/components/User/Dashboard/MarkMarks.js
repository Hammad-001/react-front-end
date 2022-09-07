import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../UserAuth';

const MarkMarks = () => {
    const { auth } = useContext(AuthContext);
    let { id } = useParams();
    id = parseInt(id, 10);

    const [enrolled, setEnrolled] = useState([]);
    const [filterE, setFilterE] = useState('');

    const handleLoad = useCallback(async () => {
        await axios.get('http://localhost:8000/api/users/courses/', {
            params: {
                courseid: id
            },
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        })
            .then(response => {
                setEnrolled(response.data.enrolled)
                // setEnrolled(response.data.enrolled.map(t => ({ ...t, result: 0 })))
            })
            .catch(error => error.response)
    }, [auth.token, id])

    useEffect(() => {
        handleLoad();
    }, [handleLoad])

    const handleMarks = async () => {
        let marks = []
        for (let i = 0; i < enrolled.length; i++) {
            marks.push({
                courseid: id,
                id: enrolled[i].id,
                year: enrolled[i].year,
                studentid: enrolled[i].studentid.id,
                result: parseInt(enrolled[i].result)
            })
        }
        axios.patch('http://localhost:8000/api/users/enrolled/',
            marks,
            {
                headers: { 'Authorization': 'Bearer ' + auth.token }
            }
        )
            .then(response => {
                alert(response.data.msg);
                handleLoad();
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data)
                } else {
                    alert('Unknows Error Occured!')
                }
            }
            )
    }

    const handle = (marks) => {
        if (marks > 100 || marks < 0) {
            return true;
        } return false;
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
                                    <h5 className="modal-title" id="modalLabel">Course Marks</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Are You Sure You want to Add these Marks?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">No</button>
                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={(e) => handleMarks()}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courses View */}

                    <div className="row">
                        <div className="row col-md-12 mb-3">
                            <div className="col-md-2">
                                <NavLink className='btn btn-light bg-light shadow-none' to='/dashboard/courses'>Back</NavLink>
                            </div>
                            <div className="col-md-2 offset-md-8">
                                <button type="button" className="btn btn-primary float-end shadow-none" data-bs-toggle="modal" data-bs-target="#Attendance">Submit Marks</button></div>                    <div className="col-md-6 offset-md-3">
                            </div>
                        </div>
                        <div>
                            <div className='col-md-6 offset-md-3 mb-3'>
                                <input type="text" name='filter' id="filter" value={filterE || ''} onChange={(e) => setFilterE(e.target.value)} className='col-12 text-center form-control' placeholder="Search Student by First Name" required />
                            </div>
                            <h4 className="text-light text-center">Enrolled Students</h4>
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
                                                    <input className="mx-auto rounded" type="number" value={student.result === null ? undefined : student.result} maxLength={3} onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key) || handle(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }} onChange={(
                                                        event) => student.result = event.target.value
                                                    }
                                                        min='0' max='100' id="marks" aria-label="marks" />
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

