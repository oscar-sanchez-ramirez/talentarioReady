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
                    title: 'Subiendo...',
                    text: 'Por favor espere...',
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
                                    title: 'PDF guardado con éxito',
                                    showConfirmButton: true,
                                    timer: 1500,
                                    timerProgressBar: true,
                                    // position: 'top-end',
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
        <>
            <Sidebar />
            <div className="contenido">
                <div className="titulo_principal">
                    <div className="container">
                        <div className="row">
                            <h1>Descríbete</h1>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <p className="position-relative text-end py-4">
                            <Link
                                id="reload"
                                to="/describe"
                                className="btn btn-recargar"
                            >
                                Recargar datos
                            </Link>
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-md-8">                        
                            <div className="card shadow perfil_input mb-5">
                                <div className="card-body">
                                    <div className="card-title">
                                        <h2>Video de introducción</h2>
                                    </div>
                                    {
                                        edit &&
                                        <form onSubmit={handleSubmitInfo}>
                                            <div className="input-group">                                            
                                                <label>URL del video:&nbsp;</label>
                                                <input
                                                    type="text"
                                                    name="urlVideoU"
                                                    className="form-control p-0 mx-2"
                                                    value={urlVideoU}
                                                    onChange={handleInputchange}
                                                />
                                            </div>
                                            <p className="text-secondary"><small>El video debe ser de la plataforma de YouTube</small></p>
                                            <h2>Expericiencia y logros</h2>
                                            <label>Describe tu expericiencia y logros:</label>
                                            <div className="input-group">
                                                
                                                <textarea
                                                    type="text"
                                                    name="experienceDescriptionU"
                                                    className="form-control p-0 mx-2"
                                                    rows="6"
                                                    value={experienceDescriptionU}
                                                    onChange={handleInputchange}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn_login">Guardar</button>
                                        </form>
                                    }
                                    
                                    <p className="position-relative py-3">
                                        <a href={urlVideo} target="_blank" className="btn btn-edit"><span className="ico-video"></span> Ver video</a>
                                    </p>                                   
                                    <div className="card-title">
                                        <h2>Expericiencia y logros</h2>
                                    </div>
                                    <p>{experienceDescription}</p>
                                    {
                                        (!edit) &&
                                        < button onClick={handleEdit} className="btn btn_login">Editar</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow perfil_input">
                                <div className="card-body">
                                    <div className="card-title">
                                        <h2>Curriculum</h2>
                                    </div>
                                    <div className="input-group">
                                        <input
                                            id="idFile"
                                            type="file"
                                            className="form-control p-0 mx-2"
                                            onChange={handleInputchangee}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                    
                                    <p className="position-relative py-3">
                                        <a href={urlCurriculum} target="_blanck" className="btn btn-edit"><span className="ico-documento"></span> Ver curriculum</a>
                                    </p>
                                    {
                                        active &&
                                        (
                                            <form onSubmit={handleSubmit} >
                                                
                                                <button type="submit" className="btn btn_login">Guardar</button>

                                            </form>
                                        )
                                    }
                                    
                                    {
                                        buttonPDF &&
                                        < button onClick={handleActive} className="btn btn_login my-3">Editar</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>                        
                </div>
            </div>
        </>
    )
}