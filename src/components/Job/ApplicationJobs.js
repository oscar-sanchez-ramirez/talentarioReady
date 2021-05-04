import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { AppInfo } from './AppInfo';

export const ApplicationJobs = ({ companyID, idJob }) => {


    const url = `https://us-central1-talentario-a3d9a.cloudfunctions.net/api/user/${companyID}`;
    const state = useFetch(url);
    const { data, loading } = state;


    return (

        <div>
            {
                loading ? (<p>Cargando...</p>) : (
                    <div>
                        <p>{data.name}</p>
                        <img src={data.imageUrl} alt="imagen" width={ 50 }/> 
                        <AppInfo idJob={idJob}/>
                        <hr />
                    </div>
                )
            }
            
        </div>

    )
}
