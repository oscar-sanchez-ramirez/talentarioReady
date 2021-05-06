import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebase-config';
import { useForm } from '../../hooks/useForm'

export const RepresentativeData = () => {

    const { name, fullName, position } = useSelector(state => state.user)
    const { uid } = useSelector(state => state.auth)

    const [formValues, handleInputChange] = useForm({ nameU: name, fullNameU: fullName, positionU: position });
    const { nameU, fullNameU, positionU } = formValues;
    const [show, setShow] = useState(true);

    const handleShow = () => {
        setShow(false)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        db.ref('users/' + uid).update({
            name: nameU,
            fullName: fullNameU,
            position: positionU,

        }, (error) => {
            if (error) {
                setShow(true)
                Swal.fire('Error', error, 'error');
            } else {
                setShow(true)
                Swal.fire('Success', 'Data saved successfully!', 'success');
            }
        });

    }

    useEffect(() => {
        if (formValues.nameU === undefined) {

            document.querySelector('#reload').click();

        }

    }, [formValues])




    return (
        <div>
            <Link
                id="reload"
                to="/perfil"
                className="link"
            >
                Reload Data
                </Link>
            <h5>Datos del representante</h5>
            <form onSubmit={handleSubmit}>
                <label>Todos tus nombres</label>
                <input
                    type="text"
                    placeholder="Todos tus nombres"
                    name="nameU"
                    autoComplete="off"
                    value={nameU}
                    onChange={handleInputChange}
                    disabled={show}
                />
                <br />
                <label>Apellido Paterno, Apellido Materno</label>
                <input
                    type="text"
                    placeholder="Apellido Paterno, Apellido Materno"
                    name="fullNameU"
                    autoComplete="off"
                    value={fullNameU}
                    onChange={handleInputChange}
                    disabled={show}

                />
                <br />
                <label>Posición en la empresa</label>
                <input
                    type="text"
                    placeholder="Posición en la empresa"
                    name="positionU"
                    autoComplete="off"
                    value={positionU}
                    onChange={handleInputChange}
                    disabled={show}
                />
                {
                    !show &&
                    <button type="submit">Guardar</button>
                }

            </form>

            {
                show &&
                <button onClick={handleShow}>Editar</button>
            }

        </div>
    )
}
