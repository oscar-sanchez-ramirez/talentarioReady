import { firebase } from '../../firebase/firebase-config'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import Swal from 'sweetalert2';


export const UpdateUser = () => {

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
        <div className="col-md-8 d-flex">
            <div className="col-md-2">
                <div className="bd-img_perfil img_perfil mx-auto">
                    <img src={photoURL} width={"100%"} alt={name} className="img-fluid" />
                </div>
                <div className="btn_editar_img text-center">
                {
                    ocultar &&
                    <form onSubmit={handleSubmitImagen}>
                        <button type="submit" className="btn btn-edit">Guardar</button>
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
                        <button onClick={handleOcultar} className="btn btn-edit"><span className="ico-editar"></span> Editar</button>
                    }
                </div>
            </div>
            <div className="col-md-8 pt-2"> 
                <div className="hd_input d-flex align-items-center">
                    <form onSubmit={handleSubmit} className="d-flex align-items-center">
                        <div className="input-group">
                            <input
                                type="text"
                                name="nameU"
                                className="form-control"
                                value={nameU}
                                onChange={handleInputchange}
                                disabled={active}
                            />
                        </div>
                        {
                            button &&
                            <button type="submit" className="btn btn-edit"><span className="ico-guardar"></span> Guardar</button>
                        }
                        
                    </form>
                    
                    {
                        buttonU &&
                        <button onClick={handleActive} className="btn btn-edit"><span className="ico-editar"></span> Editar</button>
                    }
                </div>
                <div className="perfil_correo mt-2">
                    <p>{email}</p>
                </div>
                
                
                
            </div>
        </div>
    )
}
