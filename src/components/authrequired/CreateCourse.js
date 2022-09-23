import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { handleCreateCourse } from '../others/requests/authrequests/courserequests';

const CreateCourse = (props) => {
    const token = props.token;
    const [error, setError] = useState(<p className="text-light">Please Enter Details!</p>);

    return (
        <>
            <div className='container-fluid d-flex justify-content-center'>
                <div className='rounded text-center'>
                    <h2 className='mt-5 mb-1'>Create New Course</h2>
                    <div className=' mt-3'>{error}</div>
                    <div className="text-dark bg-light rounded">
                        <form id="course-form" className="p-4 vw-40 bg-light rounded text-dark" onSubmit={(e) => handleCreateCourse(e, token, setError)}>
                            <input type="text" name='code' id="code" className='col-12 form-control mt-2 mb-2' autoFocus='1' placeholder="Course code" required />
                            <input type="text" name="name" id="name" className='col-12 form-control mt-2 mb-2' autoFocus='2' placeholder='Course Name' required />
                            <button className="btn btn-dark shadow-none col-12 mb-2 mt-2" autoFocus='3' type='submit'>Save</button>
                            <NavLink className="link-stretched text-decoration-none text-dark" to="/u/courses">View Courses</NavLink>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCourse
