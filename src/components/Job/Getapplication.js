import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebase-config';
import { Sidebar } from '../menu/SideBar';

export const Getapplication = () => {

    const { uid } = useParams();
    // console.log(uid)

    const { uid: userId } = useSelector(state => state.auth)


    const [description, setDescription] = useState(null)
    const [location, setLocation] = useState(null)
    const [positionName, setPositionName] = useState(null)
    const [salary, setSalary] = useState(null)
    const [companyId, setCompanyId] = useState(null)
    const [idJob, setIdJob] = useState(null)

    const [imageUrll, setImageUrl] = useState(null)
    const [name, setName] = useState(null)

    const getApplication = (uid) => {
        const starCountRef = db.ref('jobOffers/' + uid);
        starCountRef.on('value', (snapshot) => {
            const datos = snapshot.val();

            setCompanyId(datos.companyId)
            setIdJob(datos.id)


            setDescription(datos.description)
            setLocation(datos.location)
            setPositionName(datos.positionName)
            setSalary(datos.salary)

            // console.log(datos)


            const starCount = db.ref('users/' + datos.companyId);
            starCount.on('value', (snapshot) => {
                const data = snapshot.val();
                setImageUrl(data.imageUrl)
                setName(data.name)
            });


        });

    }



    useEffect(() => {

        getApplication(uid)
        return () => {
            setDescription({});
            setLocation({});
            setPositionName({});
            setSalary({});
            setCompanyId({});
            setIdJob({});
            setImageUrl({});
            setName({});
        };

    }, [uid])


    const handleApli = () => {
        Swal.fire({
            title: '¿Estás seguro de aplicar a este oferta laboral?',
            showCancelButton: true,
            confirmButtonText: `Aplicar`,
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const url = `https://us-central1-talentario-a3d9a.cloudfunctions.net/api/newApplication/${userId}/${companyId}/${idJob}`;
                fetch(url, {
                    method: 'POST',
                })
                    .then(resp => {
                        Swal.fire('Aplico!', '', 'success')
                        document.getElementById('favorite').click();
                    })
                    .catch(error => console.log(error))
            }
        })


    }

    const handleFav = () => {
        Swal.fire({
            title: '¿Estás seguro de agregar a favoritos?',
            showCancelButton: true,
            confirmButtonText: `Agregar`,
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const url = `https://us-central1-talentario-a3d9a.cloudfunctions.net/api/favoriteJob/${userId}/${companyId}/${idJob}`;
                fetch(url, {
                    method: 'POST',
                })
                    .then(resp => {
                        Swal.fire('Se agrego!', '', 'success')
                        document.getElementById('favorite').click();
                    })
                    .catch(error => console.log(error))
            }
        })


    }


    return (
        <>
            <Sidebar />
            <br />
            <br />
            <br />
            <br />
            <Link to="/favorite" id="favorite"></Link>
            <div>

                <img src={imageUrll} alt="imagen" width="70" />
                <p>Empresa: {name}</p>
                <p>Puesto: {positionName}</p>
                <p>Descripción: {description}</p>
                <p>Salario: {salary}</p>
                <p>Dirección: {location}</p>
                <button onClick={handleApli}>Aplicar</button>
                <button onClick={handleFav}>Agregar a favoritos</button>
            </div>
        </>
    )
}
