import { firebase, db } from '../../firebase/firebase-config'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export const UpdateIne = () => {

    const { uid } = useSelector(state => state.auth)
    const { ineUrl } = useSelector(state => state.user)
    const [show, setShow] = useState(true)

    const handleActive = () => {
        document.querySelector('#idIne').click();
        setShow(false)
    }

    const [ine, setIne] = useState(null);
    const handleInputchangee = (e) => {
        if (e.target.files[0]) {
            setIne(e.target.files[0]);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const metadata = {
            contentType: 'application/pdf',
        };
        if (ine) {

            Swal.fire({
                title: 'Uploading...',
                text: 'Please wait...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
            });
            firebase.storage().ref(`${uid}-ine`).put(ine, metadata).then(function (snapshot) {
                snapshot.ref.getDownloadURL().then(function (downloadURL) {

                    db.ref('users/' + uid).update({

                        ineUrl: downloadURL,

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
        <div>
            <input
                id="idIne"
                type="file"
                onChange={handleInputchangee}
                style={{ display: 'none' }}
            />
            <br />
            <p>INE Representante Legal: <a href={ineUrl} target="_blanck">Ver</a></p>
            {
                !show &&
                <form onSubmit={handleSubmit} >
                    <button type="submit">Guardar</button>
                </form>
            }

            {
                show &&
                <button onClick={handleActive}>Editar</button>
            }
        </div>
    )
}
