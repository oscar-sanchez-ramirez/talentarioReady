import React, { useEffect, useState } from 'react'
import { Sidebar } from '../menu/SideBar'
import { useSelector } from 'react-redux'
import { useFetch } from '../../hooks/useFetch'
import { ApplicationJobs } from '../Job/ApplicationJobs'
import { FavJob } from '../Job/FavJob'


export const FavoriteScreen = () => {

    const { uid } = useSelector(state => state.auth);

    // const state = useFetch('https://us-central1-talentario-a3d9a.cloudfunctions.net/api/applications/sdDQmkjPYaXba17r5GJrDrg6zUE3');
    const state = useFetch('https://us-central1-talentario-a3d9a.cloudfunctions.net/api/applications/' + uid);
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
        <>
            <Sidebar />
            <div className="contenido favoritos">
                <div className="titulo_principal">
                    <div className="container">
                        <div className="row">
                            <h1>Favoritos</h1>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row py-4">
                        <ul className="nav justify-content-center mb-4" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-job active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#aplicados" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Recientemente aplicados</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-job" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#favoritos" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Todos los favoritos</button>
                            </li>
                        </ul>
                        
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="aplicados" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className="row">
                                    {error ? (<h2 className="text-center">No hay recientemente aplicados</h2>) :
                                        (
                                            !cargando &&
                                            jobA.map(item => (
                                                <div key={item.idJob} className="col-xl-4 col-md-6 mb-4 job_offers aparece">
                                                    <ApplicationJobs companyID={item.uidCompany} idJob={item.idJob} />
                                                </div>
                                            ))
                                        )

                                    }
                                </div>
                            </div>
                            <div className="tab-pane fade" id="favoritos" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <FavJob />
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </>
    )
}
