import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebase-config';
import { useForm } from '../../hooks/useForm'

export const UpdateLocation = () => {


    const { country, city, postalCode, rfc, proofAdress } = useSelector(state => state.user)
    const { uid } = useSelector(state => state.auth)

    const [formValues, handleInputChange] = useForm(
        {
            countryU: country,
            cityU: city,
            postalCodeU: postalCode,
            rfcU: rfc,
            proofAdressU: proofAdress,
        });

    const { countryU, cityU, postalCodeU, rfcU, proofAdressU } = formValues;
    const [show, setShow] = useState(true);

    const handleShow = () => {
        setShow(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        db.ref('users/' + uid).update({

            country: countryU,
            city: cityU,
            postalCode: postalCodeU,
            rfc: rfcU,
            proofAdress: proofAdressU,

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

    return (
        <>
            <h2>Ubicación</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group py-2">
                            <label>Estado:</label>
                            <select
                                name="countryU"
                                className="form-control p-0 mx-2"
                                value={countryU}
                                onChange={handleInputChange}
                                disabled={show}
                            >
                                <option value="1">AGUASCALIENTES</option>
                                <option value="2">BAJA CALIFORNIA</option>
                                <option value="3">BAJA CALIFORNIA SUR</option>
                                <option value="4">CHIHUAHUA</option>
                                <option value="5">CHIAPAS</option>
                                <option value="6">CAMPECHE</option>
                                <option value="7">CIUDAD DE MEXICO</option>
                                <option value="8">COAHUILA</option>
                                <option value="9">COLIMA</option>
                                <option value="10">DURANGO</option>
                                <option value="11">GUERRERO</option>
                                <option value="12">GUANAJUATO</option>
                                <option value="13">HIDALGO</option>
                                <option value="14">JALISCO</option>
                                <option value="15">MICHOACAN</option>
                                <option value="16">ESTADO DE MEXICO</option>
                                <option value="17">MORELOS</option>
                                <option value="18">NAYARIT</option>
                                <option value="19">NUEVO LEON</option>
                                <option value="20">OAXACA</option>
                                <option value="21">PUEBLA</option>
                                <option value="22">QUINTANA ROO</option>
                                <option value="23">QUERETARO</option>
                                <option value="24">SINALOA</option>
                                <option value="25">SAN LUIS POTOSI</option>
                                <option value="26">SONORA</option>
                                <option value="27">TABASCOO</option>
                                <option value="28">TLAXCALA</option>
                                <option value="29">TAMAULIPAS</option>
                                <option value="30">VERACRUZ</option>
                                <option value="31">YUCATAN</option>
                                <option value="32">ZACATECAS</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group py-2">
                        <label>Ciudad:</label>
                        <input
                            type="text"
                            name="cityU"
                            className="form-control p-0 mx-2"
                            value={cityU}
                            onChange={handleInputChange}
                            disabled={show}
                        />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group py-2">
                            <label>Dirección:</label>
                            <input
                                type="text"
                                name="proofAdressU"
                                className="form-control p-0 mx-2"
                                value={proofAdressU}
                                onChange={handleInputChange}
                                disabled={show}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group py-2">
                            <label>Código Postal:</label>
                            <input
                                type="text"
                                name="postalCodeU"
                                className="form-control p-0 mx-2"
                                value={postalCodeU}
                                onChange={handleInputChange}
                                disabled={show}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group py-2">
                            <label>RFC:</label>
                            <input
                                type="text"
                                name="rfcU"
                                className="form-control p-0 mx-2"
                                value={rfcU}
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

        </>
    )
}
