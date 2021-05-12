import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


import { startLogout } from '../../actions/auth';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const { name, photoURL } = useSelector(state => state.auth)
    const { isCompany } = useSelector(state => state.user)



    const hanleLogout = () => {
        window.location.reload();
        dispatch(startLogout())
    }


    return (

        <div className="container">

            <div className="row">
                <div className="col-md-2">

                </div>
                <div className="col-md-8">                    
                    {
                        !isCompany ? (
                            <div className="d-flex justify-content-center py-3">
                                <ul className="nav nav-pills">
                                    <li className="nav-item">
                                        <Link
                                            to="/"
                                            className="nav-link"
                                        >
                                            Ofertar de trabajo
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/favorite"
                                            className="nav-link"
                                        >
                                            Favoritos
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/calendar"
                                            className="nav-link"
                                        >
                                            Calendario
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/profile"
                                            className="nav-link"
                                        >
                                            Perfil
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-center py-3">
                                <ul className="nav nav-pills">
                                    <li className="nav-item">
                                        <Link
                                            to="/"
                                            className="nav-link"
                                        >
                                            Ofertar de trabajo
                                        </Link>
                                    </li>
                                
                                    <li className="nav-item">
                                        <Link
                                            to="/applicant"
                                            className="nav-link"
                                        >
                                            Aplicantes Favoritos
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/calendar"
                                            className="nav-link"
                                        >
                                            Calendario
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/perfil"
                                            className="nav-link"
                                        >
                                            Perfil
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
                <div className="col-md-2">
                    <h3>{name}</h3>
                    <p><img src={photoURL} alt={name} width="50" /></p>
                    <br />
                    <p>
                        <button
                        className="btn "
                        onClick={hanleLogout}
                        >
                            Logout
                        </button>
                    </p>
                </div>
            </div>
        </div>

    )
}
