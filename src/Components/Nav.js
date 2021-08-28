import React from 'react'
import { Link } from 'react-router-dom'
function Nav() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to='/'>
                        <span className="navbar-brand">
                            Moovy
                        </span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/'>
                                    <span className="nav-link active">
                                        Home
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/about'>
                                    <span className="nav-link active">
                                        About
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/movies'>
                                    <span className="nav-link active">
                                        Movies
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav
