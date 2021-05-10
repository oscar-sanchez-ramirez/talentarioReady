import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';
import { setError, removeError } from '../../actions/ui';

import logoTalentario from '../../image/logo_talentario.png';

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
        <div className="body_form">
            <div className="form_login">
                <div className="logo">
                    <p><img src={logoTalentario} alt="Talentario" border="0" className="img_responsive" /></p>
                </div>
                <div className="form_content">              

                    <form onSubmit={handleLogin}>
                        {
                            msgError &&
                            (
                                <div className="auth__alert-error">
                                    { msgError}
                                </div>
                            )
                        }
                        
                        <div className="form-group">
                            <div className="group">
                                <div className="icono_usuario"></div>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    className="form-control"
                                    autoComplete="off"
                                    value={email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="group">
                                <div className="icono_contrasena"></div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    className="form-control"
                                    value={password}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group text-center">
                            <div className="form_modalidad">
                                <label htmlFor="aplicante">Aplicante</label>
                                <input
                                    id="aplicante"
                                    type="radio"
                                    name="empresa"
                                    value="false"                                    
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form_modalidad">
                                <label htmlFor="empresa">Empresa</label>
                                <input
                                    id="empresa"
                                    type="radio"
                                    name="empresa"
                                    value="true"
                                    onChange={handleInputChange}

                                />
                             </div>
                        </div>

                        <div className="form-group text-center">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block btn_login"
                                disabled={loading}
                            >
                                Iniciar sesión
                            </button>
                        </div>

                        <div className="form-group">
                            <div className="auth__social-networks">
                                <p>Iniciar sesión con redes sociales</p>

                                <div
                                    className="google-btn"
                                    onClick={handleGoogleLogin}
                                >
                                    <div className="google-icon-wrapper">
                                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                    </div>
                                    <p className="btn-text">
                                        <b>Iniciar con Google</b>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="form-group text-center">
                            <p>¿No tienes una cuenta? &nbsp;
                            <Link
                                to="/auth/register"
                                className="link"
                            >
                                Regístrate
                            </Link>
                            </p>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}
