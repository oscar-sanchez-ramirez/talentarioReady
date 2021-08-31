import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase-config';
import { handleContactPrefer } from '../helpers/ContactPrefer';

export const GetJobb = ({ user, jobb, fecha, company }) => {




    // const [infor, setInfor] = useState({ data: null, loading: true });
    // const { data } = infor;
    // console.log(data && data)

    const [inforJob, setInforjob] = useState({ dataJob: null, carga: true });
    const { dataJob } = inforJob;
    // console.log(dataJob && dataJob)

    const [infoCompany, setInfoCompany] = useState({ dataCompany: null, termino: true });
    const { dataCompany } = infoCompany;
    // console.log(dataCompany && dataCompany);

    // const getUser = (user) => {
    //     const starCountRef = db.ref('users/' + user);
    //     starCountRef.on('value', (snapshot) => {
    //         const info = snapshot.val();
    //         setInfor({ data: info, loading: false })
    //     });
    // }

    const getCompany = (company) => {
        const starCountRef = db.ref('users/' + company);
        starCountRef.on('value', (snapshot) => {
            const info = snapshot.val();
            setInfoCompany({ dataCompany: info, termino: false })
        });
    }

    const getJobb = (jobb) => {
        const starCountRef = db.ref('jobOffers/' + jobb);
        starCountRef.on('value', (snapshot) => {
            const infoJob = snapshot.val();
            setInforjob({ dataJob: infoJob, carga: false })
        });
    }



    // useEffect(() => {
    //     getUser(user)
    // }, [user])

    useEffect(() => {
        getJobb(jobb)
    }, [jobb])

    useEffect(() => {
        getCompany(company)
    }, [company])




    return (
        <div className="card shadow h-100">
            <div className="card-body">
                <div className="row">
                    {
                        dataCompany && (
                            <>
                                <div className="col-md-12">
                                    <p><strong>{dataCompany.name}</strong></p>
                                    <p className="text-secondary">{dataCompany.email}</p>
                                    
                                </div>
                                <hr/>
                                <div className="col-md-3 col-lg-2">
                                    <p><img src={dataCompany.imageUrl} alt={dataCompany.name} className="img-fluid"/></p>
                                </div>
                            </>
                        )
                    }
                    <div className="col-md-9 col-lg-10">
                        <div className="bloque_datos">
                            {/*  {
                                    dataJob && (
                                        <>
                                            <p>Posicion: {dataJob.positionName}</p>
                                            <p>Sueldo: {dataJob.salary}</p>
                                            <p>Descripción: {dataJob.description}</p>
                                            <p>Dirección: {dataJob.location}</p>
                                        </>
                                    )
                                } */}
                                {
                                    dataJob && (
                                        <>
                                            <p><strong>Descripción</strong></p>
                                            <p>{dataJob.description}</p>
                                            <p><strong>Dirección</strong></p>
                                            <p>{dataJob.location}</p>
                                        </>
                                    )
                                }
                                

                                {
                                    dataCompany && (
                                        <>
                                            
                                            <p>Modo de contacto: <strong>{handleContactPrefer(dataCompany.contactPref)}</strong></p>
                                            <div className="d-flex justify-content-between flex-column flex-xxl-row">
                                                <div>
                                                    <p>Fecha y hora de Cita: <strong>{fecha}</strong></p>
                                                </div>
                                                <div>
                                                    <p>Empresa: <strong>{dataCompany.fullName.replace('+', ' ')}</strong></p>
                                                </div>
                                                <div>
                                                    <p>Teléfonos: <strong>{dataCompany.phone1} / {dataCompany.phone2}</strong></p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    dataJob && (
                                        <>
                                            <div className="d-flex  justify-content-start flex-column flex-xxl-row">
                                                <div className="pe-4">
                                                    <p>Posicion: <strong>{dataJob.positionName}</strong></p>
                                                </div>
                                                <div>
                                                    <p>Sueldo: <strong>${dataJob.salary}</strong></p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
