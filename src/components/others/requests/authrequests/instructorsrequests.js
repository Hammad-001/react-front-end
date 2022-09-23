import axios from "axios";

// Load Instructors
const handleLoadInstructors = (id, token, setAssigned, setUnassigned, setIsLoading) => {
    axios.get('http://localhost:8000/api/users/instructors/', {
        params: {
            courseid: id,
        },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            setAssigned(response.data.assigned);
            setUnassigned(response.data.unassigned);
            setIsLoading(false);
        })
        .catch(error => error.response)
}

// Assign Instructors
const handleAssignInstructors = (assign, id, teacherid, token, setAssigned, setUnassigned, setIsLoading) => {
    if (assign === true) {
        axios.post('http://localhost:8000/api/users/instructors/', {
            courseid: id,
            teacherid: teacherid
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            handleLoadInstructors(id, token, setAssigned, setUnassigned, setIsLoading);
            setIsLoading(true);
        }).catch(error => alert(error.response.data.errors.non_field_errors[0]))
    } else if (assign === false) {
        axios.delete('http://localhost:8000/api/users/instructors/', {
            data: {
                courseid: id,
                teacherid: teacherid
            },
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            handleLoadInstructors(id, token, setAssigned, setUnassigned, setIsLoading);
            setIsLoading(true);
        }).catch(error => error.response)
    }
}

// Load Marks
const handleLoadMarks = (id, token, setEnrolled, setIsLoading) => {
    axios.get('http://localhost:8000/api/users/courses/', {
        params: {
            courseid: id
        },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        setEnrolled(response.data.enrolled);
        setIsLoading(false);
    }).catch(error => error.response)
}

// Marks Add
const handleAddMarks = (enrolled, id, token, setEnrolled, setIsLoading) => {
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
            headers: { 'Authorization': 'Bearer ' + token }
        }
    )
        .then(response => {
            alert(response.data.msg);
            handleLoadMarks(id, token, setEnrolled, setIsLoading);
        })
        .catch(error => {
            if (error.response) {
                alert(error.response.data?.msg)
            } else {
                alert('Unknows Error Occured!')
            }
        }
        )
}

export default handleLoadInstructors
export { handleAssignInstructors, handleLoadMarks, handleAddMarks }