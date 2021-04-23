import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';


import { db } from '../../firebase/firebase-config';
import { useForm } from '../../hooks/useForm';
import { UpdateUser } from '../user/UpdateUser';
import { Sidebar } from './SideBar'

export const ProfileScreen = () => {



    const { uid } = useSelector(state => state.auth);


    const {
        name,
        fullName,
        birthday,
        age,
        sex,
        phone1,
        phone2,
        rfc,
        nationality,
        postalCode,
        city,
    } = useSelector(state => state.user);

    const [formValues, handleInputChange] = useForm(
        {
            nameU: name,
            fullNameU: fullName,
            birthdayU: birthday,
            ageU: age,
            sexU: sex,
            phone1U: phone1,
            phone2U: phone2,
            rfcU: rfc,
            nationalityU: nationality,
            postalCodeU: postalCode,
            cityU: city,

        });


    const {
        nameU,
        fullNameU,
        birthdayU,
        ageU,
        sexU,
        phone1U,
        phone2U,
        rfcU,
        nationalityU,
        postalCodeU,
        cityU,
    } = formValues;


    const [active, setActive] = useState(true);
    const [buttonSave, setButtonSave] = useState(false)
    const [buttonEdit, setButtonEdit] = useState(true)


    const handleActive = () => {
        setActive(false);
        setButtonSave(true);
        setButtonEdit(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        db.ref('users/' + uid).update({
            name: nameU.trim(),
            fullName: fullNameU.trim(),
            birthday: birthdayU,
            age: ageU,
            sex: sexU,
            phone1: phone1U,
            phone2: phone2U,
            rfc: rfcU,
            nationality: nationalityU,
            postalCode: postalCodeU,
            city: cityU,

        }, (error) => {
            if (error) {
                setActive(true);
                setButtonEdit(true);
                setButtonSave(false);
                Swal.fire('Error', error, 'error');
            } else {
                setActive(true);
                setButtonEdit(true);
                setButtonSave(false);
                Swal.fire('Success', 'Data saved successfully!', 'success');
            }
        });
    }




    return (
        <>
            <Sidebar />
            <hr />
            <div>
                <h1>Perfil</h1>
                <Link
                    to="/profile"
                    className="link"
                >
                    Reload Data
                </Link>
                <UpdateUser />
                <hr />
                <h2>Datos personales</h2>
                <form onSubmit={handleSubmit}>
                    <label>Todos tus nombres</label>
                    <input
                        type="text"
                        placeholder="Todos tus nombres"
                        name="nameU"
                        autoComplete="off"
                        value={nameU}
                        onChange={handleInputChange}
                        disabled={active}
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
                        disabled={active}

                    />
                    <br />
                    <label>Fecha de nacimiento</label>
                    <input
                        type="date"
                        name="birthdayU"
                        value={birthdayU}
                        onChange={handleInputChange}
                        disabled={active}

                    />
                    <br />
                    <label>Edad</label>
                    <input
                        type="text"
                        name="ageU"
                        placeholder="Edad"
                        value={ageU}
                        onChange={handleInputChange}
                        disabled={active}

                    />
                    <br />
                    <p>Sexo</p>
                    <label>Hombre</label>
                    <input
                        type="radio"
                        name="sexU"
                        value="1"
                        onChange={handleInputChange}
                        disabled={active}
                        checked={sexU === '1'}
                    />
                    <label>Mujer</label>
                    <input
                        type="radio"
                        name="sexU"
                        value="2"
                        onChange={handleInputChange}
                        disabled={active}
                        checked={sexU === '2'}

                    />
                    <label>Otro</label>
                    <input
                        type="radio"
                        name="sexU"
                        value="3"
                        onChange={handleInputChange}
                        disabled={active}
                        checked={sexU === '3'}

                    />
                    <br />
                    <label>Teléfono Móvil</label>
                    <input
                        type="text"
                        name="phone1U"
                        value={phone1U}
                        onChange={handleInputChange}
                        disabled={active}

                    />
                    <br />
                    <label>Teléfono Fijo</label>
                    <input
                        type="text"
                        name="phone2U"
                        value={phone2U}
                        onChange={handleInputChange}
                        disabled={active}
                    />
                    <br />
                    <label>RFC</label>
                    <input
                        type="text"
                        name="rfcU"
                        value={rfcU}
                        onChange={handleInputChange}
                        disabled={active}
                    />
                    <br />
                    <p>Nacionalidad</p>
                    <label>Mexicano</label>
                    <input
                        type="radio"
                        name="nationalityU"
                        value="1"
                        onChange={handleInputChange}
                        disabled={active}
                        checked={nationalityU === '1'}

                    />
                    <label>Extranjero</label>
                    <input
                        type="radio"
                        name="nationalityU"
                        value="2"
                        onChange={handleInputChange}
                        disabled={active}
                        checked={nationalityU === '2'}
                    />
                    <br />
                    <h2>Ubicación</h2>
                    <label>Ciudad</label>
                    <input
                        type="text"
                        name="cityU"
                        value={cityU}
                        onChange={handleInputChange}
                        disabled={active}
                    />
                    <br />
                    <label>Código Postal</label>
                    <input
                        type="text"
                        name="postalCodeU"
                        value={postalCodeU}
                        onChange={handleInputChange}
                        disabled={active}
                    />

                    {
                        buttonSave &&
                        <button type="submit">Save</button>
                    }
                </form>
                {
                    buttonEdit &&
                    <button onClick={handleActive}>Edit</button>
                }


            </div>
        </>
    )
}
