import { firebase } from '../../firebase/firebase-config'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import Swal from 'sweetalert2';


export const UpdateUser = () => {

    const dispatch = useDispatch();


    const { name, email, photoURL } = useSelector(state => state.auth)
    const [formValues, handleInputchange] = useForm({ nameU: name });
    const { nameU } = formValues;

    const [active, setActive] = useState(true);
    const [button, setbutton] = useState(false);
    const [buttonU, setUbutton] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().onAuthStateChanged((user) => {

            user.updateProfile({
                displayName: nameU
            }).then(function () {
                dispatch(login(user.uid, user.displayName, user.photoURL, user.email));
                setUbutton(true);
                setbutton(false);
                setActive(true);
                Swal.fire('Success', 'Data saved successfully!', 'success');

            }).catch(function (error) {
                setUbutton(true);
                setbutton(false);
                setActive(true);
                Swal.fire('Error', error, 'error');
            });
        });

    }


    const handleActive = () => {
        setActive(false);
        setbutton(true);
        setUbutton(false);
    };

    return (
        <>
            <h2>Mi cuenta</h2>
            <img src={photoURL} width={100} alt={name} />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nameU"
                    value={nameU}
                    onChange={handleInputchange}
                    disabled={active}
                />
                <br />
                {
                    button &&
                    <button type="submit">Guardar</button>
                }
            </form>
            {
                buttonU &&
                <button onClick={handleActive}>Editar</button>
            }
            <p>{email}</p>
            <p>El email no es editable</p>
        </>
    )
}
