import React, { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch';
import { db } from '../../firebase/firebase-config';
// import { useSelector } from 'react-redux';


export const CitasCompany = ({ fecha, jobb }) => {

    // const {uid} = useSelector(state => state.auth)
    // console.log(uid)


    const url = `https://us-central1-talentario-a3d9a.cloudfunctions.net/api/datesCompany/dJGuqs5Ha2R9rQqGk4qKjWCwjuT2`;
    const state = useFetch(url);
    const { data, loading } = state;


    const [infor, setInfor] = useState({ datos: null, loading: true });
    const { datos } = infor;
    // console.log(!!datos && datos)

    const [inforJob, setInforjob] = useState({ dataJob: null, carga: true });
    const { dataJob } = inforJob;
    // console.log(dataJob && dataJob)


    const getJobb = (jobb) => {
        const starCountRef = db.ref('jobOffers/' + jobb);
        starCountRef.on('value', (snapshot) => {
            const infoJob = snapshot.val();
            setInforjob({ dataJob: infoJob, carga: false })
        });
    }

    useEffect(() => {
        getJobb(jobb)
    }, [jobb])



    useEffect(() => {

        let dataUser = [];
        let dataID = [];
        if (data) {

            dataUser = Object.values(data);
            dataID = Object.values(dataUser[0]);

            const starCountRef = db.ref('users/' + dataID[0]);
            starCountRef.on('value', (snapshot) => {
                const info = snapshot.val();
                setInfor({ datos: info, loading: false })
            });

        }

    }, [data, loading])



    return (
        <>
            <div className="card shadow h-100">
                {
                    !!datos ?
                        (
                            <div className="card-body">
                               {/*  {dataJob &&
                                    (
                                        <div>
                                            <p>Fecha: {fecha}</p>
                                            <p>Posicion: {dataJob.positionName}</p>
                                        </div>
                                    )
                                } */}
                                <div>
                                    <p>Fecha:</p>
                                    <p>Posicion: </p>
                                </div>
                                <img src={datos.imageUrl} alt={datos.name} width="40" />
                                <p>Nombre: {datos.name}</p>
                                <p>Correo: {datos.email}</p>
                                <p>Telefono 1: {datos.phone1}</p>
                                <p>Telefono 2: {datos.phone2}</p>
                            </div>
                        )
                        :
                        (
                            <p>No hay citas</p>
                        )
                }
            </div>
        </>
    )
}
