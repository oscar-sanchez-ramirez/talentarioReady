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
                <h3>{name}</h3>
                <img src={photoURL} alt={name} width="50" />
                <br />
                <button
                    className=""
                    onClick={hanleLogout}
                >
                    Logout
                </button>
            </div>
            {
                !isCompany ? (
                    <div>
                        <Link
                            to="/"
                            className="bg-info"
                        >
                            Ofertar de trabajo
                </Link>
                        <br />
                        <Link
                            to="/favorite"
                            className="link"
                        >
                            Favoritos
                </Link>
                        <br />
                        <Link
                            to="/calendar"
                            className="link"
                        >
                            Calendario
                </Link>
                        <br />
                        <Link
                            to="/profile"
                            className="link"
                        >
                            Perfil
                </Link>

                    </div>
                ) : (
                    <div>
                        <Link
                            to="/"
                            className="link"
                        >
                            Ofertar de trabajo
                </Link>
                <br />
                        <Link
                            to="/applicant"
                            className="link"
                        >
                            Aplicantes Favoritos
                </Link>
                        <br />
                        <Link
                            to="/calendar"
                            className="link"
                        >
                            Calendario
                </Link>
                        <br />
                        <Link
                            to="/perfil"
                            className="link"
                        >
                            Perfil
                </Link>

                    </div>
                )
            }

        </div>

    )
}
