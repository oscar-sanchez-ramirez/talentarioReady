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
                <UpdateUser />
                <hr />
                <h2>Datos personales</h2>
                <Link
                    to="/profile"
                    className="link"
                >
                    Reload Data
                </Link>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        name="nameU"
                        autoComplete="off"
                        value={nameU}
                        onChange={handleInputChange}
                        disabled={active}
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="fullNameU"
                        autoComplete="off"
                        value={fullNameU}
                        onChange={handleInputChange}
                        disabled={active}

                    />
                    <br />
                    <input
                        type="date"
                        name="birthdayU"
                        value={birthdayU}
                        onChange={handleInputChange}
                        disabled={active}

                    />
                    <br />
                    <input
                        type="text"
                        name="ageU"
                        value={ageU}
                        onChange={handleInputChange}
                        disabled={active}

                    />
                    <br />
                    <input
                        type="number"
                        name="sexU"
                        value={sexU}
                        onChange={handleInputChange}
                        disabled={active}

                    />
                    <br />
                    <input
                        type="text"
                        name="phone1U"
                        value={phone1U}
                        onChange={handleInputChange}
                        disabled={active}

                    />
                    <br />
                    <input
                        type="text"
                        name="phone2U"
                        value={phone2U}
                        onChange={handleInputChange}
                        disabled={active}
                    />
                    <br />
                    <input
                        type="text"
                        name="rfcU"
                        value={rfcU}
                        onChange={handleInputChange}
                        disabled={active}
                    />
                    <br />
                    <input
                        type="text"
                        name="nationalityU"
                        value={nationalityU}
                        onChange={handleInputChange}
                        disabled={active}
                    />
                    <br />

                    {
                        buttonSave &&
                        <button
                            type="submit"
                        >
                            Save
                        </button>
                    }
                </form>
                {
                    buttonEdit &&
                    <button
                        onClick={handleActive}
                    >
                        Edit
                    </button>
                }


            </div>
        </>
    )
}
