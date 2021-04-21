import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebase-config';
import { useForm } from '../../hooks/useForm';
import { Sidebar } from './SideBar'

export const ProfileScreen = () => {


    const { uid } = useSelector(state => state.auth);

    const { name, fullName } = useSelector(state => state.user);
    const [formValues, handleInputChange] = useForm({ nameU: name, fullNameU: fullName });
    const { nameU, fullNameU } = formValues;

    const [active, setActive] = useState(true);
    const [buttonSave, setButtonSave] = useState(false)
    const [buttonEdit, setButtonEdit] = useState(true)


    const handleSubmit = (e) => {
        e.preventDefault();
        db.ref('users/' + uid).update({
            name: nameU.trim(),
            fullName: fullNameU.trim(),
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

    const handleActive = () => {
        setActive(false);
        setButtonSave(true);
        setButtonEdit(false);
    }



    return (
        <>
            <Sidebar />

            <hr />
            <div>
                <h1>Profile</h1>
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

                    <input
                        type="text"
                        placeholder="Full Name"
                        name="fullNameU"
                        autoComplete="off"
                        value={fullNameU}
                        onChange={handleInputChange}
                        disabled={active}

                    />
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
