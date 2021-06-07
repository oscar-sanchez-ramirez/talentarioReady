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
        <div>
            
            <h2>Datos de la <strong>empresa</strong></h2>
            <form onSubmit={handleSubmit}>

                <label>Teléfono Móvil</label>
                <input
                    type="text"
                    name="phone1U"
                    autoComplete="off"
                    value={phone1U}
                    onChange={handleInputChange}
                    disabled={show}
                />
                <br />
                <label>Teléfono Fijo</label>
                <input
                    type="text"
                    name="phone2U"
                    autoComplete="off"
                    value={phone2U}
                    onChange={handleInputChange}
                    disabled={show}
                />
                <br />
                <label>Razón Social</label>
                <input
                    type="text"
                    name="socialReasonU"
                    autoComplete="off"
                    value={socialReasonU}
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
