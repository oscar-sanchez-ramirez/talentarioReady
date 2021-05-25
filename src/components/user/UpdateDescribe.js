import { firebase, db } from '../../firebase/firebase-config';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Sidebar } from '../menu/SideBar'
import Swal from 'sweetalert2';

export const UpdateDescribe = () => {

    const [active, setActive] = useState(false);
    const [buttonPDF, setbuttonPDF] = useState(true);
    const [edit, setEdit] = useState(false)

    const { uid } = useSelector(state => state.auth)
    const { urlVideo, urlCurriculum, experienceDescription } = useSelector(state => state.user);

    const [formValues, handleInputchange] = useForm({
        urlVideoU: urlVideo,
        experienceDescriptionU: experienceDescription
    });

    const { urlVideoU, experienceDescriptionU } = formValues;

    const handleActive = () => {
        document.querySelector('#idFile').click();
        setActive(true);
        setbuttonPDF(false)
    }

    const handleEdit = () => {
        setEdit(true)
    }

    const handleSubmit = (e) => {
        if (isMounted.current) {

            e.preventDefault();
            const metadata = {
                contentType: 'application/pdf',
            };

            if (pdf) {
                Swal.fire({
                    title: 'Uploading...',
                    text: 'Please wait...',
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                        Swal.showLoading();
                    }
                });
                firebase.storage().ref(`${uid}-curriculum`).put(pdf, metadata).then(function (snapshot) {
                    snapshot.ref.getDownloadURL().then(function (downloadURL) {

                        db.ref('users/' + uid).update({

                            urlCurriculum: downloadURL,

                        }, (error) => {
                            if (error) {
                                Swal.fire('Error', error, 'error');
                            } else {
                                setActive(false);
                                setbuttonPDF(true)
                                Swal.close();
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Data saved',
                                    showConfirmButton: true,
                                    timer: 2000,
                                    timerProgressBar: true
                                });
                            }
                        });

                    });
                });
            } else {
                setActive(false);
                setbuttonPDF(true)
                Swal.fire('Error', 'File null', 'error');
            }
        }
    }

    const [pdf, setPdf] = useState(null);
    const handleInputchangee = (e) => {
        if (e.target.files[0]) {
            setPdf(e.target.files[0]);
        }
    }

    const handleSubmitInfo = (e) => {
        if (isMounted.current) {

            e.preventDefault();
            db.ref('users/' + uid).update({

                urlVideo: urlVideoU,
                experienceDescription: experienceDescriptionU,


            }, (error) => {
                if (error) {
                    setEdit(false)
                    Swal.fire('Error', error, 'error');
                } else {
                    setEdit(false)
                    Swal.fire('Success', 'Data saved successfully!', 'success');
                }
            });
        }
    }

    useEffect(() => {
        if (formValues.urlVideoU === undefined) {

            document.querySelector('#reload').click();

        }

    }, [formValues])

    const isMounted = useRef(true);

    useEffect(() => {

        return () => {
            isMounted.current = false;
        }
    }, [])


    return (
        <div>
            <Sidebar />
            <hr />
            <Link
                id="reload"
                to="/describe"
                className="link"
            >
                Reload Data
            </Link>
            <br />
            <h2>Describete</h2>
            <br />
            {
                active &&
                (
                    <form onSubmit={handleSubmit} >



                        <button type="submit">Guardar</button>

                    </form>
                )
            }

            <input
                id="idFile"
                type="file"
                onChange={handleInputchangee}
                style={{ display: 'none' }}
            />
            <br />

            <a href={urlCurriculum} target="_blanck">PDF</a>
            <p>Curriculum</p>
            {
                buttonPDF &&
                < button onClick={handleActive}>Editar</button>
            }
            <hr />
            {
                edit &&
                <form onSubmit={handleSubmitInfo}>
                    <label>URL del video</label>
                    <input
                        type="text"
                        name="urlVideoU"
                        value={urlVideoU}
                        onChange={handleInputchange}
                    />
                    <p>El video debe ser de la plataforma de YouTube</p>
                    <br />
                    <br />


                    <textarea
                        type="text"
                        name="experienceDescriptionU"
                        value={experienceDescriptionU}
                        onChange={handleInputchange}
                    />

                    <button type="submit">Guardar</button>
                </form>
            }

            <a href={urlVideo} target="_blanck">URL video</a>
            <p>Video de introducción</p>
            <br />
            <p>Expericiencia y logros</p>
            <p>{experienceDescription}</p>
            {
                (!edit) &&
                < button onClick={handleEdit}>Editar</button>
            }







        </div >
    )
}