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
                                <div className="d-md-flex flex-md-row-reverse flex-lg-column flex-xl-row-reverse align-items-center bloque_datos px-0 bg-transparent">

                                    <div className="flex-item col-4 align-items-center text-center mx-auto">
                                        <img src={datos.imageUrl} alt={datos.name} className="img-fluid img-thumbnail" />
                                    </div>
                                    <div className="flex-item col-xl-8  mx-auto">
                                        <p>Nombre: <strong>{datos.name}</strong></p>
                                        {dataJob &&
                                            (
                                                <>
                                                    <p>Posicion: <strong>{dataJob.positionName}</strong></p>
                                                </>
                                            )
                                        }
                                        
                                        <p>Correo: <strong>{datos.email}</strong></p>
                                        <p>Telefono 1: <strong>{datos.phone1}</strong></p>
                                        <p>Telefono 2: <strong>{datos.phone2}</strong></p>
                                        {dataJob &&
                                            (
                                                <>
                                                    <p>Fecha: <strong>{fecha}</strong></p>
                                                </>
                                            )
                                        }
                                        
                                    </div>                                
                                </div>
                            </div>
                        )
                        :
                        (
                            <h2 className="text-center">No hay citas</h2>
                        )
                }
            </div>
        </>
    )
}
