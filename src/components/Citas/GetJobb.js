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
        <>
            <div className="col-md-3">
                <div className="card">
                    <div>
                        {
                            dataCompany && (
                                <div>
                                    <img src={dataCompany.imageUrl} alt={dataCompany.name} width="40"/>
                                    <p>Nombre de la empresa: {dataCompany.name}</p>
                                    <p>{dataCompany.email}</p>
                                    <p>Fecha de la cita: {fecha}</p>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        {
                            dataJob && (
                                <div>
                                    <p>{dataJob.positionName}</p>
                                    <p>Sueldo: {dataJob.salary}</p>
                                    <p>Descripción: {dataJob.description}</p>
                                    <p>Dirección: {dataJob.location}</p>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        {
                            dataCompany && (
                                <div>
                                    <p>{dataCompany.phone1}</p>
                                    <p>{dataCompany.phone2}</p>
                                    <p>{handleContactPrefer(dataCompany.contactPref)}</p>
                                    <p>{dataCompany.fullName.replace('+', ' ')}</p>
                                    <hr />
                                </div>
                            )
                        }
                    </div>
                </div >
            </div>
        </>
    )
}
