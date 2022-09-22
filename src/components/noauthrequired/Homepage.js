import React from 'react'

const Homepage = (props) => {
    return (
        <div className='container-fluid mt-5'>
            <section className="page-section" id="services">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">My LMS App</h2>
                        <h3 className="section-subheading text-muted">Created with React and Django.</h3>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="my-3">Admin</h4>
                            <p className="text-muted">Admin can perform CRUD operations on Users and Courses. He can assign course to Teachers. He can view students enrolled in any Course.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="my-3">Teacher</h4>
                            <p className="text-muted">Teacher can view his assigned courses and students enrolled in them. He can mark attendance and upload their marks.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                <i className="fas fa-lock fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="my-3">Students</h4>
                            <p className="text-muted">Studnets can enroll and unenroll in any course. Once marks uploaded, he cannot unenroll. He can view his course attendance and Marks</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="text-center mt-5">
                    <h2 className="section-heading text-uppercase">About</h2>
                    <h3 className="section-subheading text-muted">First [ React + Django ] Project</h3>
                    <div className="py-2 mb-0">
                        <div className="container">
                            <div className="row text-center align-items-center">
                                <div className="col-md-6 col-sm-6 my-3">
                                    Name: <p>Muhammad Hammad Faisal</p>
                                </div>
                                <div className="col-md-6 col-sm-6 my-3">
                                    Email: <p>hammadfaisal178@gmail.com</p>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <div className="text-center">Copyright &copy; MY LMS App 2022</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage