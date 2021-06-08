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
            dispatch( setError('El nombre es requerido') )
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError('El correo electrónico no es valido') )
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch( setError('La contraseña debe tener al menos 6 caracteres y coincidir entre sí') )
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
                                    placeholder="Nombre"
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
                                    placeholder="Correo"
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
                                    placeholder="Contraseña"
                                    name="password"
                                    autoComplete="off"
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
                                    placeholder="Confirmar contraseña"
                                    name="password2"
                                    autoComplete="off"
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
