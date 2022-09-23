import axios from 'axios';

// Course Details
const handleCourseDetails = (id, token, setCourseDetail, setIsLoading) => {
    axios.get('http://localhost:8000/api/users/courses/', {
        params: {
            courseid: id
        },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        setCourseDetail(response.data.coursedetail);
        setIsLoading(false);
    }).catch(error => error.response)
}

// View Courses
const handleLoadCourse = (usertype, token, setCourses, setEnrolled, setIsLoading) => {
    if (usertype === 'admin') {
        axios.get('http://localhost:8000/api/users/courses/', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setCourses(response.data.courses);
            setIsLoading(false);
        }).catch(error => error.response)

    } else if (usertype === 'student') {
        axios.get('http://localhost:8000/api/users/courses/', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setCourses(response.data.courses)
            setEnrolled(response.data.enrolled)
            setIsLoading(false);
        }).catch(error => error.response)

    } else if (usertype === 'teacher') {
        axios.get('http://localhost:8000/api/users/instructors/', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setCourses(response.data.assigned)
            setIsLoading(false);
        }).catch(error => error.response)
    }
}

// create Course
const handleCreateCourse = (e, token, setError) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
        code: form.get('code'),
        name: form.get('name'),
    }
    if (data.code.length > 8 || data.code.length < 6) {
        setError(<p className="text-danger">Course code should be between 6 to 8 letters!</p>)
    } else if ((data.code.search('-')) === -1) {
        setError(<p className="text-danger">Course code should have hyphen!</p>)
    } else if (((data.code.search('-')) === 0) || ((data.code.search('-')) === data.code.length)) {
        setError(<p className="text-danger">Hyphens should not be at start or end of code!</p>)
    } else {
        axios.post('http://localhost:8000/api/users/courses/', data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setError(<p className="text-success">{response?.data?.msg}!</p>)
            document.getElementById('course-form').reset();
        }).catch(err => {
            if (err?.response?.data?.code) {
                setError(<p className="text-danger">{err?.response?.data?.code}!</p>)
            } else {
                setError(<p className="text-danger">Unknown error occured!</p>)
            }
        })
    }
}

// Update Course
const handleUpdateCourse = (e, course, token, usertype, setCourses, setEnrolled, setIsLoading) => {
    e.preventDefault();
    axios.patch('http://localhost:8000/api/users/courses/', course, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        document.getElementById('update-form').reset();
        handleLoadCourse(usertype, token, setCourses, setEnrolled, setIsLoading)
        setIsLoading(true);
    }).catch(err => {
        alert('Unknown Error Occured! Please Try Again!')
    })
}

// Delete Course
const handleDeleteCourse = (e, id, token, usertype, setCourses, setEnrolled, setIsLoading) => {
    e.preventDefault();
    axios.delete('http://localhost:8000/api/users/courses/', {
        data: {
            id: id
        },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            handleLoadCourse(usertype, token, setCourses, setEnrolled, setIsLoading)
            setIsLoading(true);
        })
        .catch(error => error.response)
}

// Course Enrollments
const handleEnrollCourse = (e, enroll, id, token, usertype, setCourses, setEnrolled, setIsLoading) => {
    e.preventDefault();
    if (enroll) {
        axios.post('http://localhost:8000/api/users/enrolled/', { courseid: id }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            handleLoadCourse(usertype, token, setCourses, setEnrolled, setIsLoading)
            setIsLoading(true);
        }).catch(error => error.response)
    } else if (!enroll) {
        axios.delete('http://localhost:8000/api/users/enrolled/', {
            data: {
                id: id
            },
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            handleLoadCourse(usertype, token, setCourses, setEnrolled, setIsLoading)
            setIsLoading(true);
        }).catch(error => error.response)
    }
}

// Course Attendance
const handleCourseAttendance = (courseid, token, setAttendance) => {
    axios.get('http://localhost:8000/api/users/attendance/', {
        params: {
            courseid: courseid,
        },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        setAttendance(response.data.attendance)
    })
        .catch(error => error.response)
}

export default handleCourseDetails
export {
    handleLoadCourse, handleCreateCourse, handleUpdateCourse, handleDeleteCourse,
    handleEnrollCourse, handleCourseAttendance
}
