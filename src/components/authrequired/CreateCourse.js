import React from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class CreateCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.token,
            error: <p className="text-light">Please Enter Details!</p>
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const data = {
            code: form.get('code'),
            name: form.get('name'),
        }
        if (data.code.length > 8 || data.code.length < 6) {
            this.setState({ error: <p className="text-danger">Course code should be between 6 to 8 letters!</p> })
        }
        else if ((data.code.search('-')) === -1) {
            this.setState({ error: <p className="text-danger">Course code should have hyphen!</p> })
        }
        else if (((data.code.search('-')) === 0) || ((data.code.search('-')) === data.code.length)) {
            this.setState({ error: <p className="text-danger">Hyphens should not be at start or end of code!</p> })
        } else {
            try {
                const response = await axios.post('http://localhost:8000/api/users/courses/', data, {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.token
                    }
                })
                document.getElementById('course-form').reset();
                this.setState({ error: <p className="text-success">{response?.data?.msg}!</p> })
            } catch (err) {
                if (err?.response?.data?.code) {
                    this.setState({ error: <p className="text-danger">{err?.response?.data?.code}!</p> })
                } else {
                    this.setState({ error: <p className="text-danger">Unknown error occured!</p> })
                }
            }
        }
    }

    render() {
        return (
            <>
                <div className='container-fluid d-flex justify-content-center'>
                    <div className='rounded text-center'>
                        <h2 className='mt-5 mb-1'>Create New Course</h2>
                        <div className=' mt-3'>{this.state.error}</div>
                        <div className="text-dark bg-light rounded">
                            <form id="course-form" className="p-4 vw-40 bg-light rounded text-dark" onSubmit={this.handleSubmit}>
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
}

export default CreateCourse
