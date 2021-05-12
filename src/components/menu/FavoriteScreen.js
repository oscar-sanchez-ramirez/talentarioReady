import React, { useEffect, useState } from 'react'
import { Sidebar } from '../menu/SideBar'
// import { useSelector } from 'react-redux'
import { useFetch } from '../../hooks/useFetch'
import { ApplicationJobs } from '../Job/ApplicationJobs'
import { FavJob } from '../Job/FavJob'

export const FavoriteScreen = () => {

    // const { uid } = useSelector(state => state.auth);

    const state = useFetch('https://us-central1-talentario-a3d9a.cloudfunctions.net/api/applications/sdDQmkjPYaXba17r5GJrDrg6zUE3');
    // const state = useFetch('https://us-central1-talentario-a3d9a.cloudfunctions.net/api/applications/' + uid);
    const { data, error } = state;

    const [datos, setuid] = useState({ jobA: null, cargando: true });
    const { jobA, cargando } = datos;
    // console.log(jobA)

    const separador = (data) => {
        const jobArray = [];
        data &&
            Object.keys(data).map(ids => {
                const fin = ids.indexOf('§');
                const uidCom = ids.substr(0, (fin));
                jobArray.push({
                    uidCompany: uidCom,
                    idJob: ids,

                })
                return true;
            })
        setuid({ jobA: jobArray, cargando: false })

    }

    useEffect(() => {
        separador(data);
    }, [data])


    return (
        <div>
            <Sidebar />
            <hr />
            <h2 className="text-primary">Favoritos</h2>
            <hr />
            <div>
                <h5>Recientemente aplicados</h5>
                <hr />

                {error ? (<p>No hay recientemente aplicados</p>) :
                    (
                        !cargando &&
                        jobA.map(item => (
                            <div key={item.idJob}>
                                <ApplicationJobs companyID={item.uidCompany} idJob={item.idJob} />
                            </div>
                        ))
                    )

                }
            </div>
            <div>
                <FavJob />
            </div>
        </div>
    )
}
