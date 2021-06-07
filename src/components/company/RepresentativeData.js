import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebase-config';
import { useForm } from '../../hooks/useForm'
import { CompanyData } from './CompanyData';
import { UpdateConstitutiva } from './UpdateConstitutiva';
import { UpdateDom } from './UpdateDom';
import { UpdateFiscal } from './UpdateFiscal';
import { UpdateLocation } from './UpdateLocation';
import { UpdateValidation } from './UpdateValidation';
import { UpdateIne } from './UpdateIne'

export const RepresentativeData = () => {

    const { name, fullName, position } = useSelector(state => state.user)
    const { uid } = useSelector(state => state.auth)

    const apellidos = fullName && fullName.split('+');

    const ApU = fullName && apellidos[0];
    const AmU = fullName && apellidos[1];

    const [formValues, handleInputChange] = useForm(
        {
            nameU: name,
            fullNameU: ApU,
            fullNameM: AmU,
            positionU: position,

        });

    const { nameU, fullNameU, fullNameM, positionU } = formValues;
    const [show, setShow] = useState(true);

    const handleShow = () => {
        setShow(false)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        db.ref('users/' + uid).update({

            name: nameU,
            fullName: fullNameU + '+' + fullNameM,
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
                <label>Apellido Paterno</label>
                <input
                    type="text"
                    name="fullNameU"
                    autoComplete="off"
                    value={fullNameU}
                    onChange={handleInputChange}
                    disabled={show}

                />
                <br />
                <input
                    type="text"
                    name="fullNameM"
                    autoComplete="off"
                    value={fullNameM}
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

            <CompanyData />
            <UpdateLocation />
            <br />
            <UpdateValidation />
            <UpdateConstitutiva />
            <UpdateFiscal />
            <UpdateDom />
            <UpdateIne />
            <br />
            <br />


        </div>
    )
}
