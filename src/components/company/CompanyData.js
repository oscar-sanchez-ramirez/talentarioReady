import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebase-config';
import { useForm } from '../../hooks/useForm'

export const CompanyData = () => {

    const { phone1, phone2, socialReason } = useSelector(state => state.user)
    const { uid } = useSelector(state => state.auth)

    const [formValues, handleInputChange] = useForm(
        {
            phone1U: phone1,
            phone2U: phone2,
            socialReasonU: socialReason,
        });

    const { phone1U, phone2U, socialReasonU } = formValues;
    const [show, setShow] = useState(true);

    const handleShow = () => {
        setShow(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        db.ref('users/' + uid).update({

            phone1: phone1U,
            phone2: phone2U,
            socialReason: socialReasonU,

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
            <h2>Datos de la <strong>empresa</strong></h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group">
                            <label>Teléfono Móvil:</label>
                            <input
                                type="text"
                                name="phone1U"
                                autoComplete="off"
                                className="form-control p-0 mx-2"
                                value={phone1U}
                                onChange={handleInputChange}
                                disabled={show}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group">
                            <label>Teléfono Fijo:</label>
                            <input
                                type="text"
                                name="phone2U"
                                autoComplete="off"
                                className="form-control p-0 mx-2"
                                value={phone2U}
                                onChange={handleInputChange}
                                disabled={show}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group">
                            <label>Razón Social:</label>
                            <input
                                type="text"
                                name="socialReasonU"
                                autoComplete="off"
                                className="form-control p-0 mx-2"
                                value={socialReasonU}
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
