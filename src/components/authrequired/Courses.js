import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ViewCourseDetails from './ViewCourseDetails';
import { handleCourseAttendance, handleDeleteCourse, handleEnrollCourse, handleLoadCourse, handleUpdateCourse } from '../others/requests/authrequests/courserequests';

const Courses = (props) => {
    const usertype = props.usertype;
    const token = props.token;

    const [view, setView] = useState(false);
    const [enroll, setEnroll] = useState(true);
    const [StudentView, setStudentView] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const [filter, setFilter] = useState('');
    const [filteru, setFilteru] = useState(false);
    const [filtere, setFiltere] = useState(false);

    const [id, setId] = useState(null);

    const [courses, setCourses] = useState(true);
    const [enrolled, setEnrolled] = useState(true);
    const [attendance, setAttendance] = useState(true);

    const [course, setCourse] = useState({
        id: null,
        code: null,
        name: null
    });

    let counte = 1;
    let countu = 1;
    let counta = 1;
    let count = 1;
    let Courses = null;
    let Enrolled = null;
    let Attendance = null;

    useEffect(() => {
        handleLoadCourse(usertype, token, setCourses, setEnrolled, setIsLoading)
    }, [token, usertype, isLoading])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCourse({ ...course, [name]: value })
    }

    const handleClose = () => {
        setView(false);
    }

    const AdminFilter = () => {
        if (filter === '') {
            Courses = courses
        } else {
            Courses = courses.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()) || filter === '')
        }
    }
    const TeacherFilter = () => {
        if (filter === '') {
            Courses = courses
        } else {
            Courses = courses.filter(f => f.courseid.name.toLowerCase().includes(filter.toLowerCase()) || filter === '')
        }
    }

    const StudentFilter = () => {
        Courses = courses.filter(f => f.name.toLowerCase().includes(filteru.toLowerCase()) || filteru === '')
        Enrolled = enrolled.filter(f => f.name.toLowerCase().includes(filtere.toLowerCase()) || filtere === '')
    }

    if (usertype === 'admin') {
        if (!isLoading) {
            AdminFilter()
            Courses = courses.map(
                (course) => <tr key={course.id} >
                    <td>{count++}</td>
                    <td>{course.code}</td>
                    <td>{course.name}</td>
                    <td>{course.instructors.length === 0 ? 'None' : course.instructors[0].first_name}</td>
                    <td>
                        <NavLink to={"/u/courses/" + course.id} state={{ course: course }} className="btn mx-1 btn-success mb-1 shadow-none">
                            Assign
                        </NavLink>
                        <button onClick={() => setId(course.id)} type="button" className="btn mx-1 mb-1 btn-danger shadow-none" data-bs-toggle="modal" data-bs-target="#Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        </button>
                        <button onClick={() => setCourse(course)} type="button" className="btn mx-1 mb-1 btn-primary shadow-none" data-bs-toggle="modal" data-bs-target="#Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </button>
                        <button onClick={() => { setCourse(course); setView(true); }} type="button" className="btn mx-1 mb-1 btn-success shadow-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </button>
                    </td>
                </tr >
            )
            return (
                <div className='container-fluid'>
                    {/* <!-- Button trigger modal --> */}

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="Delete" tabIndex="-1" aria-labelledby="DeleteModal" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalLabel">Delete Course</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Are You Sure You want to Delete this Course?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={(e) => handleDeleteCourse(e, id, token, usertype, setCourses, setEnrolled, setIsLoading)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="Edit" tabIndex="-1" aria-labelledby="EditModal" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel"> Update Course</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form id="update-form" className="bg-dark rounded">
                                        <input name='id' id="id" value={'User ID: ' + course.id || ''} hidden readOnly />
                                        <div className="form-floating">
                                            <input type="text" name='code' id="code" value={course.code || ''} onChange={handleChange} className='bg-dark text-light form-control' autoFocus='1' placeholder="Course Code" required />
                                            <label>Course Code</label>
                                        </div>
                                        <div className="form-floating">
                                            <input type="text" name='name' id="name" value={course.name || ''} onChange={handleChange} className='bg-dark text-light form-control' autoFocus='1' placeholder="Course Name" required />
                                            <label>Course Name</label>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handleUpdateCourse(e, course, token, usertype, setCourses, setEnrolled, setIsLoading)}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courses View */}
                    <div className='row container-fluid'>
                        <div className='row col-md-8'>
                            <div className='col-md-3 mb-2 text-center'>
                                <NavLink className="btn btn-light shadow-none" to="/u/courses/add">
                                    Create New Course
                                </NavLink>
                            </div>
                            <div className='col-md-5 mb-2 offset-md-4'>
                                <input type="text" name='filter' id="filter" value={filter || ''} onChange={(e) => setFilter(e.target.value)} className='col-12 text-center form-control' placeholder="Search Courses by Course Name" required />
                            </div>
                        </div>
                        {view ? <ViewCourseDetails course={course} close={handleClose} /> : null}
                        <div className='table-responsive'>
                            <table className="table text-center table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col"> Course code </th>
                                        <th scope="col"> Course Name </th>
                                        <th scope="col"> Assigned Teacher</th>
                                        <th scope="col"> Actions </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Courses}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >
            )
        }
    } else if (usertype === 'student') {
        if (!isLoading) {
            StudentFilter()
            if (attendance) {
                Attendance = attendance.map(date => <tr key={date.id} >
                    <td>{counta++}</td>
                    <td>{date.courseid.code}</td>
                    <td>{date.courseid.name}</td>
                    <td>{date.date}</td>
                    <td>{date.isabsent ? 'Absent' : 'Present'}</td>
                </tr>)
            }
            Courses = courses.map(
                (course) => <tr key={course.id} >
                    <td>{counte++}</td>
                    <td>{course.code}</td>
                    <td>{course.name}</td>
                    <td>{course.instructors.length === 0 ? 'None' : course.instructors[0].first_name}</td>
                    <td>
                        <button onClick={() => { setId(course.id); setEnroll(true) }} type="button" className="btn mx-2 btn-primary shadow-none" data-bs-toggle="modal" data-bs-target="#Enroll">
                            Enroll
                        </button>
                    </td>
                </tr>
            )
            Enrolled = enrolled.map(
                (course) => <tr key={course.id} >
                    <td>{countu++}</td>
                    <td>{course.code}</td>
                    <td>{course.name}</td>
                    <td>{course.instructors.length === 0 ? 'None' : course.instructors[0].first_name}</td>
                    <td>{course.result}</td>
                    <td>
                        <button onClick={() => { setId(course.id); handleCourseAttendance(course.id) }} type="button" className="btn mx-2 mb-2 btn-primary shadow-none" data-bs-toggle="modal" data-bs-target="#Attendance">
                            Attendance
                        </button>
                        {course.result ?
                            null :
                            <button onClick={() => { setId(course.id); setEnroll(false); }} type="button" className="btn mx-2 btn-primary mb-2 shadow-none" data-bs-toggle="modal" data-bs-target="#Enroll">
                                UnEnroll
                            </button>
                        }
                    </td>
                </tr>
            )

            return (

                <div className='container-fluid'>
                    {/* <!-- Button Toggle --> */}
                    <button className='btn btn-light bg-light shadow-none' onClick={() => setStudentView(!StudentView)}>{StudentView ? 'View UnEnrolled Courses' : 'View Enrolled Courses'}</button>
                    {/* <!-- Modal --> */}
                    <div className="modal modal-lg fade" id="Attendance" tabIndex="-1" aria-labelledby="AttendanceModal" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalLabel">Attendance Sheet</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body table-responsive">
                                    {Attendance ?
                                        <table className="table table-dark table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Course Code</th>
                                                    <th scope="col">Course Name</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Attendance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Attendance}
                                            </tbody>
                                        </table>
                                        : <div className='text-center mt-5' > <h3>Loading...</h3> </div>}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="Enroll" tabIndex="-1" aria-labelledby="DeleteModal" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalLabel">Enroll Course</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Are You Sure You want to Enroll in this Course?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">No</button>
                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={(e) => handleEnrollCourse(e, enroll, id, token, usertype, setCourses, setEnrolled, setIsLoading)}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courses View */}

                    <div className="row">
                        {StudentView ?
                            <div className="col-md-12">
                                <div className='col-md-6 offset-md-3 mb-3'>
                                    <input type="text" name='filter' id="filter" value={filtere || ''} onChange={(e) => setFiltere(e.target.value)} className='col-12 text-center form-control' placeholder="Search Courses by Course Name" required />
                                </div>
                                <h4 className="text-light text-center">Enrolled Courses</h4>
                                <div className='table-responsive'>
                                    <table className="table table-dark table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Code</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Teacher Name</th>
                                                <th scope="col">Result</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Enrolled}
                                        </tbody>
                                    </table>
                                </div>
                            </div> :
                            <div className="col-md-12">
                                <div className='col-md-6 offset-md-3 mb-3'>
                                    <input type="text" name='filter' id="filter" value={filteru || ''} onChange={(e) => setFilteru(e.target.value)} className='col-12 text-center form-control' placeholder="Search Courses by Course Name" required />
                                </div>
                                <h4 className="text-center">UnEnrolled Courses</h4>
                                <div className='table-responsive'>
                                    <table className="table table-dark table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Code</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Teacher Name</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Courses}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            )
        }
    } else if (usertype === 'teacher') {
        if (!isLoading) {
            TeacherFilter()
            Courses = courses.map(
                (course) => <tr key={course.courseid.id} >
                    <td>{count++}</td>
                    <td>{course.courseid.code}</td>
                    <td>{course.courseid.name}</td>
                    <td>
                        <NavLink to={"/u/courses/attendance/" + course.courseid.id} state={{ course: course.courseid }} className="btn mx-2 btn-success shadow-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg> Attendance
                        </NavLink>
                        <NavLink to={"/u/courses/marks/" + course.courseid.id} state={{ course: course.courseid }} className="btn mx-2 btn-success shadow-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg> Marks
                        </NavLink>
                    </td>
                </tr >
            )
            return (
                <div className="col-md-12">
                    <div className='col-md-6 offset-md-3 mb-3'>
                        <input type="text" name='filter' id="filter" value={filter || ''} onChange={(e) => setFilter(e.target.value)} className='col-12 text-center form-control' placeholder="Search Course by Course Name" required />
                    </div>
                    <h4 className="text-light text-center">Assigned Courses</h4>
                    <table className="table text-center table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Courses}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
    return (<div className='text-center mt-5' > <h1>Loading...</h1> </div>)
}

export default Courses
