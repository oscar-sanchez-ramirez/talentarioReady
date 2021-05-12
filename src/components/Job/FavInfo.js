import React from 'react'
import { useFetch } from '../../hooks/useFetch';

export const FavInfo = ({ idFav }) => {

    const url = `https://us-central1-talentario-a3d9a.cloudfunctions.net/api/jobOffer/${idFav}`;
    const state = useFetch(url);
    const { data, loading } = state;

    return (
        <div>
            { loading ? (<p>cargando...</p>) :
                (<div key={data.id}>
                    <p>{data.positionName}</p>
                    <p>{data.salary}</p>
                    <p>{data.location}</p>
                    <hr />
                </div>
                )
            }
        </div>
    )
}
