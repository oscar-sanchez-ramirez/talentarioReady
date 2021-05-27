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
        <div>
            
            <form onSubmit={hanldeSubmitPassword}>
                <input
                    type="password"
                    placeholder="Nuevo contraseña"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputchange}
                    disabled={show}
                />
                <p>La contraseña debe ser mayor a 5 caracteres</p>
                {
                    !show &&
                    <button type="submit">Guardar</button>
                }

            </form>
            {
                show &&
                <button onClick={handleShow} >Editar</button>
            }

        </div>
    )
}
