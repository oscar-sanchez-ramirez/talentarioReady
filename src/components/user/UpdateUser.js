import { db, firebase } from '../../firebase/firebase-config'
import React, { useEffect, useRef, useState } from 'react'
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

    const isMounted = useRef(true);

    useEffect(() => {

        return () => {
            isMounted.current = false;
        }
    }, [])

    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isMounted.current) {

            firebase.auth().onAuthStateChanged((user) => {

                user.updateProfile({
                    displayName: nameU
                }).then(function () {
                    dispatch(login(user.uid, user.displayName, user.photoURL, user.email));
                    setUbutton(true);
                    setbutton(false);
                    setActive(true);
                    Swal.fire({
                        icon: 'success',
                        title: 'Nombre guarado con éxito',
                        showConfirmButton: true,
                        timer: 1500,
                        timerProgressBar: true,
                        // position: 'top-end',
                    });

                }).catch(function (error) {
                    setUbutton(true);
                    setbutton(false);
                    setActive(true);
                    Swal.fire('Error', error, 'error');
                });
            });
        }

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
            const imgID = document.getElementById('imgUser');
            const imgCodified = URL.createObjectURL(e.target.files[0]);
            imgID.src = imgCodified;
            const imgBOX = document.getElementById('boxIMG');
            imgBOX.classList.add('animate__animated', 'animate__pulse');

        }
    }

    const handleSubmitImagen = (e) => {
        e.preventDefault();


        if (isMounted.current) {

            if (imagen) {
                Swal.fire({
                    title: 'Subiendo...',
                    text: 'Por favor espere...',
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
                                    title: 'Imagen subida con éxito',
                                    showConfirmButton: true,
                                    timer: 1500,
                                    timerProgressBar: true,
                                    // position: 'top-end',
                                });

                            }).catch(function (error) {
                                setOcultar(false);
                                Swal.fire('Error', error, 'error');
                            });
                        });

                        db.ref('users/' + uid).update({
                            imageUrl: downloadURL

                        }, (error) => {
                            if (error) {

                            } else {

                            }
                        });

                    });
                });
            } else {
                Swal.fire('Error', 'File null', 'error');
            }

        }
    }

    return (
        <div className="col-lg-9">
            <div className="row">
                <div className="col-xl-2 col-md-3">
                    <div className="bd-img_perfil img_perfil mx-auto" id="boxIMG">
                        <img src={photoURL} width={"100%"} alt={name} className="img-fluid" id="imgUser" />
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
                            <button onClick={handleOcultar} className="btn btn-edit">Editar Imágen</button>
                        }
                    </div>
                </div>
                <div className="col-xl-10 col-md-9 pt-2">
                    <div className="hd_input d-flex align-items-center">
                        <form onSubmit={handleSubmit} className="d-flex align-items-center">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="nameU"
                                    className="form-control lh-sm py-0 mb-2"
                                    value={nameU}
                                    onChange={handleInputchange}
                                    disabled={active}
                                />
                            </div>
                            {
                                button &&
                                <button type="submit" className="btn btn-edit">Guardar</button>
                            }

                        </form>

                        {
                            buttonU &&
                            <button onClick={handleActive} className="btn btn-edit">Editar Nombre</button>
                        }
                    </div>
                    <div className="perfil_correo mt-2">
                        <p className="px-2">{email}</p>
                    </div>



                </div>
            </div>
        </div>
    )
}
