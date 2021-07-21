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
            <div className="col-md-3">
                {
                    !!datos ?
                        (
                            <div className="card">
                                {dataJob &&
                                    (
                                        <div>
                                            <p>{fecha}</p>
                                            <p>{dataJob.positionName}</p>
                                        </div>
                                    )
                                }
                                <img src={datos.imageUrl} alt={datos.name} width="40" />
                                <p>{datos.name}</p>
                                <p>{datos.email}</p>
                                <p>{datos.phone1}</p>
                                <p>{datos.phone2}</p>
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
