import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { firebase } from '../../firebase/firebase-config'
import Swal from 'sweetalert2';

export const UpdatePassowd = () => {

    const [show, setShow] = useState(true);
    const [formValues, handleInputchange] = useForm({ password: '' });
    const { password } = formValues;


    const handleShow = () => {
        setShow(false);
    }

    const hanldeSubmitPassword = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const newPassword = password;

        user.updatePassword(newPassword).then(function () {
            setShow(true);
            Swal.fire({
                icon: 'success',
                title: 'Contraseña actualizado',
                showConfirmButton: true,
                timer: 1500
            })
        }).catch(function (error) {
            setShow(true)
            Swal.fire({
                icon: 'error',
                title: error,
                showConfirmButton: true,
                timer: 1500

            })

        });
    }
   
    return (
        <div className="perfil_input pt-4">
            <div className="hd_input d-flex align-items-center">
                <form onSubmit={hanldeSubmitPassword} className="d-flex align-items-center">
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            name="password"
                            className="form-control p-0 mx-2"
                            autoComplete="off"
                            value={password}
                            onChange={handleInputchange}
                            disabled={show}
                        />
                    </div>                    
                        {
                            !show &&
                            <button type="submit" className="btn btn-edit">Guardar</button>
                        }
                    
                </form>
                
                {
                    show &&
                    <button onClick={handleShow}  className="btn btn-edit">Editar</button>
                }
            </div>
            <p className="fs-6 text mt-3"><small>La contraseña debe ser mayor a 5 caracteres</small></p>
        </div>
    )
}
