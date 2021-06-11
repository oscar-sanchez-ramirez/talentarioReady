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

    const { name, fullName, position, plan } = useSelector(state => state.user)
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

    const getPlan = () => {
        let newPlan = '';
        if (plan === 0) {
            newPlan = 'Plan Basico';
        } else if (plan === 2) {
            newPlan = 'Plan por evento';
        } else {
            newPlan = 'Plan por tiempo';
        }

        return newPlan;
    }

     console.log(getPlan())




    return (
        <div className="row">
            <div className="card shadow perfil_input">
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
                                    <label>Apellido Paterno:</label>
                                    <input
                                        type="text"
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
                                    <label>Apellido Materno:</label>
                                    <input
                                        type="text"
                                        name="fullNameM"
                                        autoComplete="off"
                                        className="form-control p-0 mx-2"
                                        value={fullNameM}
                                        onChange={handleInputChange}
                                        disabled={show}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 py-2">
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
                            <button type="submit" className="btn btn_login">Guardar</button>
                        }

                    </form>

                    {
                        show &&
                        <button onClick={handleShow} className="btn btn_login">Editar</button>
                    }
                </div>
            </div>
            <div className="card shadow perfil_input mt-5">
                <div className="card-body">
                    <CompanyData />
                </div>
            </div>
            <div className="card shadow perfil_input mt-5">
                <div className="card-body">
                    <UpdateLocation />
                </div>
            </div>
            <div className="card shadow perfil_input mt-5">
                <div className="card-body">
                    <div className="row">
                        <h2>Validación / <strong>Certificación</strong></h2>
                        <UpdateValidation />
                        <UpdateConstitutiva />
                        <UpdateFiscal />
                        <UpdateDom />
                        <UpdateIne />
                    </div>
                </div>
            </div>
            <div className="card shadow perfil_input my-5 py-4">
                <div className="card-body text-center">
                    <h2 className="mb-4"><label>Plan:</label> {getPlan()}</h2>
                    <Link to="/plan" className="btn btn-azul mx-3">Mejorar plan</Link>
                </div>
            </div>
        </div>
    )
}
