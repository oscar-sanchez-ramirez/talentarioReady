import { firebase, db } from '../../firebase/firebase-config'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export const UpdateValidation = () => {

    const { uid } = useSelector(state => state.auth)
    const { hdaUrl } = useSelector(state => state.user)
    const [show, setShow] = useState(true)

    const handleActive = () => {
        document.querySelector('#idFile').click();
        setShow(false)
    }

    const [hda, setHda] = useState(null);
    const handleInputchangee = (e) => {
        if (e.target.files[0]) {
            setHda(e.target.files[0]);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const metadata = {
            contentType: 'application/pdf',
        };
        if (hda) {

            Swal.fire({
                title: 'Uploading...',
                text: 'Please wait...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
            });
            firebase.storage().ref(`${uid}-hda`).put(hda, metadata).then(function (snapshot) {
                snapshot.ref.getDownloadURL().then(function (downloadURL) {

                    db.ref('users/' + uid).update({

                        hdaUrl: downloadURL,

                    }, (error) => {
                        if (error) {
                            Swal.fire('Error', error, 'error');
                        } else {
                            setShow(true)
                            Swal.close();
                            Swal.fire({
                                icon: 'success',
                                title: 'Documento guardado',
                                showConfirmButton: true,
                                timer: 2000,
                                timerProgressBar: true
                            });
                        }
                    });

                });
            });

        } else {
            setShow(true)
            Swal.fire('Error', 'File null', 'error');
        }

    }

    return (
        <div className="col-lg-4 col-md-6">           
            <input
                id="idFile"
                type="file"
                onChange={handleInputchangee}
                style={{ display: 'none' }}
            />
            <p className="position-relative pt-3 mb-0"> Alta Hacienda: <a href={hdaUrl} target="_blanck" className="btn btn-edit"><span className="ico-documento"></span> Ver</a></p>
            {
                !show &&
                <form onSubmit={handleSubmit} >
                    <button type="submit" className="btn btn_login">Guardar</button>
                </form>
            }
            <p>
            {
                show &&
                <button onClick={handleActive} className="btn btn_login">Editar</button>
            }
            </p>

        </div>
    )
}
