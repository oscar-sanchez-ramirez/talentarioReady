import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import { FavInfo } from './FavInfo';

export const FavoritesJob = ({ companyID, idFav }) => {

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
                        <FavInfo idFav={idFav}/>
                    </div>
                )
            }
        </div>
    )
}
