import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { db } from '../../firebase/firebase-config'
import Swal from 'sweetalert2';





export const DeleteFav = ({ company, job }) => {

    const { uid } = useSelector(state => state.auth);

    const handleDeleteFav = () => {

        Swal.fire({
            title: '¿Estás seguro de esta acción?',
            showCancelButton: true,
            confirmButtonText: `Borrar`,
            cancelButtonText: `Cancelar`,
        }).then((result) => {

            if (result.isConfirmed) {

                db.ref('users/' + uid + '/favoriteJobs/' + job).remove(
                    (error) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Data saved successfully');
                            document.getElementById('favoriteID').click();

                        }
                    });

            }
        })

    };


    return (
        <div>
            <Link to="/favorite" id="favoriteID"></Link>
            <button className="btn btn-danger" onClick={handleDeleteFav}>Borrar</button>
        </div>
    )
}
