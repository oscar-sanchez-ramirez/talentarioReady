import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


import { startLogout } from '../../actions/auth';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const { name, photoURL } = useSelector(state => state.auth)

    const hanleLogout = () => {
        window.location.reload();
        dispatch(startLogout())
    }



    return (
        <div>

            <div className="">
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
            <div>
                <Link
                    to="/"
                    className="link"
                >
                    Ofertar de trabajo
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
                    Profile
                </Link>

            </div>
        </div>
    )
}
