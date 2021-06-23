import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


import { startLogout } from '../../actions/auth';

import logoTalentario from '../../image/logo_talentario.png';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const { name, photoURL } = useSelector(state => state.auth)
    const { isCompany } = useSelector(state => state.user)



    const hanleLogout = () => {
        window.location.reload();
        dispatch(startLogout())
    }


    return (

        <div className="hd_menu">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 text-center menu_logo">
                        <div className="d-flex justify-content-center py-3 ">
                            <img src={logoTalentario} alt="Talentario" className="img-fluid" />
                        </div>
                        
                    </div>
                    <div className="col-lg-8 col-sm-6"> 
                        <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-center py-3">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>  

                            <div className="collapse navbar-collapse" id="navbarNav">         
                                {
                                    !isCompany ? (
                                        <ul className="navbar-nav mx-auto">
                                            <li className="nav-item">
                                                <Link
                                                    to="/"
                                                    className="nav-link"
                                                >
                                                    Ofertas de trabajo
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
                                                    id="perfilU"
                                                    to="/profile"
                                                    className="nav-link"
                                                >
                                                    Perfil
                                                </Link>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="navbar-nav mx-auto">
                                            <li className="nav-item">
                                                <Link
                                                    to="/"
                                                    className="nav-link"
                                                >
                                                    Ofertas de trabajo
                                                </Link>
                                            </li>
                                        
                                            {/* <li className="nav-item">
                                                <Link
                                                    to="/applicant"
                                                    className="nav-link"
                                                >
                                                    Aplicantes Favoritos
                                                </Link>
                                            </li> */}
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
                                    )
                                }
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-2 col-sm-6">
                        <div className="dropdown text-center">
                            <button className="btn btn-profile dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {name} <img src={photoURL} alt={name} width="40" className="img-circle" />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <button
                                    className="btn "
                                    onClick={hanleLogout}
                                    >
                                        Cerrar sesión
                                    </button>
                                </li>
                            </ul>
                        </div>                       
                    </div>
                </div>
            </div>
        </div>

    )
}
