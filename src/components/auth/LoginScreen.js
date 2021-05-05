import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';
import { setError, removeError } from '../../actions/ui';


export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading, msgError } = useSelector(state => state.ui);




    const [formValues, handleInputChange] = useForm({
        email: '',
        password: '',
        empresa: null
    });

    const { email, password, empresa } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if (isFormValid()) {

            dispatch(startLoginEmailPassword(email, password, empresa));
        }
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    const isFormValid = () => {

        if (empresa === null) {
            dispatch(setError('La modalidad es requerida'))
            return false;
        }

        dispatch(removeError());
        return true;
    }


    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}>

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError}
                        </div>
                    )
                }

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <label htmlFor="aplicante">Aplicante</label>
                <input
                    id="aplicante"
                    type="radio"
                    name="empresa"
                    value="false"
                    onChange={handleInputChange}
                />
                <label htmlFor="empresa">Empresa</label>
                <input
                    id="empresa"
                    type="radio"
                    name="empresa"
                    value="true"
                    onChange={handleInputChange}

                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>


                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}
