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

    const [formValues, handleInputChange] = useForm(
        {
            nameU: name,
            fullNameU: fullName,
            positionU: position,
            
        });

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
        <div className="card-body">
            <p className="text-end mb-2">
                <Link
                    id="reload"
                    to="/perfil"
                    className="btn btn-edit"
                >
                <span className="ico-recargar"></span> Recargar datos
                </Link>
            </p>
            
            <h2>Datos del <strong>representante</strong></h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-4 py-2">
                        <div className="input-group">
                            <label>Nombre(s):</label>
                            <input
                                type="text"
                                placeholder="Todos tus nombres"
                                name="nameU"
                                autoComplete="off"
                                className="form-control p-0 mx-2"
                                value={nameU}
                                onChange={handleInputChange}
                                disabled={show}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 py-2">
                        <div className="input-group">
                            <label>Apellidos:</label>
                            <input
                                type="text"
                                placeholder="Apellido Paterno, Apellido Materno"
                                name="fullNameU"
                                autoComplete="off"
                                className="form-control p-0 mx-2"
                                value={fullNameU}
                                onChange={handleInputChange}
                                disabled={show}

                            />
                        </div>
                    </div>
                    <div className="col-lg-4 py-2">
                        <div className="input-group">
                            <label>Posición en la empresa:</label>
                            <input
                                type="text"
                                placeholder="Posición en la empresa"
                                name="positionU"
                                autoComplete="off"
                                className="form-control p-0 mx-2"
                                value={positionU}
                                onChange={handleInputChange}
                                disabled={show}
                            />
                        </div>
                    </div>
                </div>                
                {
                    !show &&
                    <button type="submit" className="btn btn_login mt-3">Guardar</button>
                }

            </form>

            {
                show &&
                <button onClick={handleShow} className="btn btn_login mt-3">Editar</button>
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
