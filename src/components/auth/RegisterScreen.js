import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

import logoTalentario from '../../image/logo_talentario.png';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );
    

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name ,email ,password ,password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if ( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
        }

    }

    const isFormValid = () => {
        
        if ( name.trim().length === 0 ) {
            dispatch( setError('Name is required') )
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError('Email is not valid') )
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch( setError('Password should be at least 6 characters and match each other') )
            return false
        }
        
        dispatch( removeError() );
       return true;
    }

   

    return (
        <div className="body_form">
            <div className="form_login">
                <div className="logo">
                    <p><img src={logoTalentario} alt="Talentario" border="0" className="img-fluid" /></p>
                </div>
                <div className="form_content">
                    <h3 className="auth__title text-center">Nueva cuenta</h3>

                    <form onSubmit={ handleRegister }>

                        {
                            msgError &&
                            (
                                <div className="auth__alert-error">
                                    { msgError }
                                </div>
                            )
                        }

                        <div className="form-group">
                            <div className="group">
                                <div className="icono_usuario"></div>
                                <input 
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    className="form-control"
                                    autoComplete="off"
                                    value={ name }
                                    onChange={ handleInputChange }
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="group">
                                <div className="icono_correo"></div>
                                <input 
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    className="form-control"
                                    autoComplete="off"
                                    value={ email }
                                    onChange={ handleInputChange }
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
                                    value={ password }
                                    onChange={ handleInputChange }
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="group">
                                <div className="icono_contrasena"></div>
                                <input 
                                    type="password"
                                    placeholder="Confirm password"
                                    name="password2"
                                    className="form-control"
                                    value={ password2 }
                                    onChange={ handleInputChange }
                                />
                            </div>
                        </div>

                        <div className="form-group text-center">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block btn_login"
                            >
                                Crear
                            </button>
                        </div>

                    
                        <div className="form-group text-center">
                            <Link 
                                to="/auth/login"
                                className="text-center"
                            >
                                ¿Ya tienes una cuenta?
                            </Link>
                        </div>  

                    </form>
                </div>
            </div>
        </div>
    )
}
