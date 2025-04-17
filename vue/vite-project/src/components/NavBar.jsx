import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">
                E-commerce
            </Link>
            <div className="col-md-3 text-end">
                <Link className="btn btn-outline-dark me-2" to="/login">
                    Login
                </Link>
                <Link className="btn btn-success" to="/signup">
                    Sign-up
                </Link>
            </div>
        </div>
   </nav>
  )
}

export default NavBar
