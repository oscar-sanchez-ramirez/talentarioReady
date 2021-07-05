import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase-config';

export const GetJobb = ({ user, jobb, fecha }) => {



    const [infor, setInfor] = useState({ data: null, loading: true });
    const { data } = infor;
    // console.log(data && data)

    const [inforJob, setInforjob] = useState({ dataJob: null, carga: true });
    const { dataJob } = inforJob;
    // console.log(dataJob && dataJob)


    const getUser = (user) => {
        const starCountRef = db.ref('users/' + user);
        starCountRef.on('value', (snapshot) => {
            const info = snapshot.val();
            setInfor({ data: info, loading: false })
        });
    }

    const getJobb = (jobb) => {
        const starCountRef = db.ref('jobOffers/' + jobb);
        starCountRef.on('value', (snapshot) => {
            const infoJob = snapshot.val();
            setInforjob({ dataJob: infoJob, carga: false })
        });
    }

    useEffect(() => {
        getUser(user)
        getJobb(jobb)
    }, [user, jobb])



    return (
        <div>
            <div>
                {
                    dataJob && (
                        <div>
                            <p><b>Fecha de la cita: {fecha}</b></p>
                            <p>{data.name} {data.fullName.replace('+', '')}</p>
                            <img src={data.imageUrl} alt={data.name} width="60" />
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


                            <hr />
                        </div>
                    )
                }
            </div>
        </div >
    )
}
