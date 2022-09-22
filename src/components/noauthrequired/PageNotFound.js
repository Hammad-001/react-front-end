import React from 'react'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <h3>Page Not Found</h3>
            <div className="flexGrow">
                <Link to="/" className='text-decoration-none'>Visit Our Homepage</Link>
            </div>
        </article>
    )
}

export default PageNotFound
