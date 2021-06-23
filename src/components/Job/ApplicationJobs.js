import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { AppInfo } from './AppInfo';


export const ApplicationJobs = ({ companyID, idJob }) => {


    const url = `https://us-central1-talentario-a3d9a.cloudfunctions.net/api/user/${companyID}`;
    const state = useFetch(url);
    const { data, loading } = state;

    


    return (

        <div className="card shadow h-100">
            <div className="card-body">
            {
                loading ? (<p className="aparece">Cargando...</p>) : (
                    <>
                        <h5 className="mb-0"><strong>{data.name}</strong></h5>
                        <div className="position-relative empresa_logo">
                            <div className="job_img  top-0 translate-middle rounded">
                                <img src={data.imageUrl} alt="Imagen Company" className="img-fluid" />
                            </div>
                            <AppInfo idJob={idJob}/>
                        </div>
                    </>
                )
            }
            
            </div>
        </div>

    )
}
