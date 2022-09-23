import React, { useContext, useEffect, useState } from 'react'
import handleCourseDetails from '../others/requests/authrequests/courserequests';
import AuthContext from '../others/UserAuth';

const ViewCourseDetails = (props) => {
    const { auth } = useContext(AuthContext);
    const [courseDetail, setCourseDetail] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [view, setView] = useState(false)


    useEffect(() => {
        handleCourseDetails(props.course.id, auth.token, setCourseDetail, setIsLoading);
    }, [auth.token, props.course.id, isLoading])

    if (!isLoading) {
        let count = 1;
        return (
            <div className='col-md-3 mb-2 offset-md-1'>
                <div className="modal modal-lg fade" id="View" tabIndex="-1" aria-labelledby="ViewModal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalLabel">{view ? 'Assigned Teachers' : 'Enrolled Students '}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col"> First Name </th>
                                            <th scope="col"> Last Name </th>
                                            <th scope="col"> Email </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {view ?
                                            courseDetail[0].instructors.map((teacher) => {
                                                return (<tr key={teacher.id}>
                                                    <td>{count++}</td>
                                                    <td>{teacher.first_name}</td>
                                                    <td>{teacher.last_name}</td>
                                                    <td>{teacher.email}</td>
                                                </tr>
                                                )
                                            })
                                            :
                                            courseDetail[0].enrolled.map(student => {
                                                return (
                                                    <tr key={student.id}>
                                                        <td>{count++}</td>
                                                        <td>{student.first_name}</td>
                                                        <td>{student.last_name}</td>
                                                        <td>{student.email}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card text-dark">
                    <div className="card-body"><button type='button' onClick={() => props.close()} className='btn btn-close float-end'></button>
                        <h5 className="card-title col-md-12">{courseDetail[0].name}</h5>
                        <h6 className="card-subtitle mb-2">{courseDetail[0].code}</h6>
                        <p className="card-text"> Assigned Teachers: {courseDetail[0].instructors.length || 0}
                            <button onClick={() => setView(true)} type="button" className="btn mx-4 btn-success shadow-none" data-bs-toggle="modal" data-bs-target="#View">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </button>
                        </p>
                        <p className="card-text"> Enrolled Students : {courseDetail[0].enrolled.length || 0}
                            <button onClick={() => setView(false)} type="button" className="btn mx-4 btn-success shadow-none" data-bs-toggle="modal" data-bs-target="#View">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<div className='col-md-4 text-center mt-4' > <h1>Loading...</h1> </div>)
    }
}

export default ViewCourseDetails
