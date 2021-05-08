import { firebase } from '../../firebase/firebase-config'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import Swal from 'sweetalert2';
import { UpdatePassowd } from '../user/UpdatePassowd';


export const UpdateCompany = () => {

    const dispatch = useDispatch();


    const { uid, name, email, photoURL } = useSelector(state => state.auth)
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

    const handleOcultar = () => {
        document.querySelector("#imagenDocu").click();
        setOcultar(true);
    }

    const [imagen, setImagen] = useState(null);
    const [ocultar, setOcultar] = useState(false);

    const handleChangeImage = (e) => {
        if (e.target.files[0]) {
            setImagen(e.target.files[0]);
        }
    }

    const handleSubmitImagen = (e) => {
        e.preventDefault();


        if (imagen) {
            Swal.fire({
                title: 'Uploading...',
                text: 'Please wait...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
            });
            firebase.storage().ref(`${uid}-imgProfile`).put(imagen).then(function (snapshot) {
                snapshot.ref.getDownloadURL().then(function (downloadURL) {

                    firebase.auth().onAuthStateChanged((user) => {

                        user.updateProfile({
                            photoURL: downloadURL,
                        }).then(function () {
                            dispatch(login(user.uid, user.displayName, user.photoURL, user.email));
                            setOcultar(false);
                            Swal.close();
                            Swal.fire({
                                icon: 'success',
                                title: 'Data saved',
                                showConfirmButton: true,
                                timer: 2000,
                                timerProgressBar: true
                            });

                        }).catch(function (error) {
                            setOcultar(false);
                            Swal.fire('Error', error, 'error');
                        });
                    });

                });
            });
        } else {
            Swal.fire('Error', 'File null', 'error');
        }
    }


    return (
        <>
            <h2>Mi cuenta</h2>
            <img src={photoURL} width={100} alt={name} />
            {
                ocultar &&
                <form onSubmit={handleSubmitImagen}>
                    <button type="submit">Guardar</button>
                </form>
            }

            <input
                id="imagenDocu"
                type="file"
                onChange={handleChangeImage}
                style={{ display: 'none' }}
            />

            {
                !ocultar &&
                <button onClick={handleOcultar}>Editar</button>
            }
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

            <UpdatePassowd />


            <p>{email}</p>
            <p>El email no es editable</p>



        </>
    )
}
