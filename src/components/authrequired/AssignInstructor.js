import React, { useState, useEffect, useContext } from 'react'
import { useParams, NavLink, useLocation } from 'react-router-dom';
import AuthContext from '../others/UserAuth';
import handleLoadInstructors, { handleAssignInstructors } from '../others/requests/authrequests/instructorsrequests';

const AssignInstructor = (props) => {
    let consta = 0;
    let constu = 0;

    const location = useLocation()
    const { course } = location.state


    const { auth } = useContext(AuthContext);
    let { id } = useParams();
    id = parseInt(id, 10)

    const [assigned, setAssigned] = useState([]);
    const [unassigned, setUnassigned] = useState([]);

    const [teacherid, setTeacherid] = useState(null);

    const [filterA, setFilterA] = useState('');
    const [filterU, setFilterU] = useState('');

    const [assign, setAssign] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleLoadInstructors(id, auth.token, setAssigned, setUnassigned, setIsLoading);
    }, [id, auth.token])

    return (
        (!isLoading) ?
            <div className='container-fluid'>
                {/* <!-- Button trigger modal --> */}

                {/* <!-- Modal --> */}
                <div className="modal fade" id="Assign" tabIndex="-1" aria-labelledby="DeleteModal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalLabel">{assign ? 'Assign' : 'Unassign'} Course</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are You Sure You want to {assign ? 'assign' : 'unassign'} this Course?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">No</button>
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={(e) => handleAssignInstructors(assign, id, teacherid, auth.token, setAssigned, setUnassigned, setIsLoading)}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses View */}
                <div className="row">
                    <div className="col-12">
                        <NavLink className='btn btn-light bg-light shadow-none mb-2' to='/u/courses'>Back</NavLink>
                    </div>
                    <div className="col-12 mb-2 text-center">
                        <h3>{course.name}</h3>
                    </div>
                    <div className="col-md-6">
                        <div className='col-md-6 offset-md-3 mb-3'>
                            <input type="text" name='filter' id="filter" value={filterA || ''} onChange={(e) => setFilterA(e.target.value)} className='col-12 text-center form-control' placeholder="Search Teacher by First Name" required />
                        </div>
                        <h4 className="text-light text-center">Assigned Courses</h4>
                        <div className='table-responsive'>
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assigned.filter(t => t.first_name.toLowerCase().includes(filterA.toLowerCase()) || filterA === '').map(
                                        (teacher) => <tr key={teacher.id} >
                                            <td>{consta++}</td>
                                            <td>{teacher.first_name + ' ' + teacher.last_name}</td>
                                            <td>
                                                <button onClick={(e) => { setTeacherid(teacher.id); setAssign(false); }} type="button" className="btn mx-2 btn-primary shadow-none" data-bs-toggle="modal" data-bs-target="#Assign">
                                                    UnAssign
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='col-md-6 offset-md-3 mb-3'>
                            <input type="text" name='filter' id="filter" value={filterU || ''} onChange={(e) => setFilterU(e.target.value)} className='col-12 text-center form-control' placeholder="Search Teacher by First Name" required />
                        </div>
                        <h4 className="text-center">UnAssigned Courses</h4>
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {unassigned.filter(t => t.first_name.toLowerCase().includes(filterU.toLowerCase()) || filterU === '').map(
                                    (teacher) => <tr key={teacher.id} >
                                        <td>{constu++}</td>
                                        <td>{teacher.first_name + ' ' + teacher.last_name}</td>
                                        <td>
                                            <button onClick={(e) => { setTeacherid(teacher.id); setAssign(true); }} type="button" className="btn mx-2 btn-primary shadow-none" data-bs-toggle="modal" data-bs-target="#Assign">
                                                Assign
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            : (<div className='text-center mt-5' > <h1>Loading...</h1> </div>)
    )
}

export default AssignInstructor
