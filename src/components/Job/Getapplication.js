import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { db } from '../../firebase/firebase-config';
import { Sidebar } from '../menu/SideBar';

export const Getapplication = () => {

    const { uid } = useParams();
    // console.log(uid)

    const { uid:userId } = useSelector(state => state.auth)

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

            console.log(datos)


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

    }, [uid])


    const handleApli = () => {
        const url = `https://us-central1-talentario-a3d9a.cloudfunctions.net/api/newApplication/${userId}/${companyId}/${idJob}`;
        fetch(url, {
            method: 'POST',
        })
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
    }


    return (
        <>
            <Sidebar />
            <br />
            <br />
            <br />
            <br />
            <div>

                <img src={imageUrll} alt="imagen" width="70" />
                <p>Empresa: {name}</p>
                <p>Puesto: {positionName}</p>
                <p>Descripción: {description}</p>
                <p>Salario: {salary}</p>
                <p>Dirección: {location}</p>
                <button onClick={handleApli}>Aplicar</button>
            </div>
        </>
    )
}
