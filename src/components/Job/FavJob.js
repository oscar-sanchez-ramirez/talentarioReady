import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import { FavoritesJob } from './FavoritesJob';

export const FavJob = () => {

    const { uid } = useSelector(state => state.auth);


    const state = useFetch('https://us-central1-talentario-a3d9a.cloudfunctions.net/api/favoriteJobs/' + uid);
    // const state = useFetch('https://us-central1-talentario-a3d9a.cloudfunctions.net/api/favoriteJobs/sdDQmkjPYaXba17r5GJrDrg6zUE3');
    const { data, error } = state;

    const [datos, setuid] = useState({ jobF: null, cargando: true });
    const { jobF, cargando } = datos;
    // console.log(jobF)

    const separador = (data) => {
        const jobArray = [];
        data &&
            Object.keys(data).map(ids => {
                const fin = ids.indexOf('§');
                const uidCom = ids.substr(0, (fin));
                jobArray.push({
                    uidCompany: uidCom,
                    idFav: ids,

                })
                return true;
            })
        setuid({ jobF: jobArray, cargando: false })

    }


    useEffect(() => {
        separador(data);
    }, [data])


    return (
        <div className="row">
            {error ? (<h2 className="text-center">No hay favoritos</h2>) :
                (
                    !cargando &&
                    jobF.map((item, index) => (
                        <div key={index} className="col-xl-4 col-md-6 mb-4 job_offers">
                            <div className="card shadow h-100">
                                <FavoritesJob companyID={item.uidCompany} idFav={item.idFav} />
                            </div>
                        </div>
                    ))
                )

            }
        </div>
    )
}
