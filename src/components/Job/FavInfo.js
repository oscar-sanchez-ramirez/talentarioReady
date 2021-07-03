import React from 'react'
import { useFetch } from '../../hooks/useFetch';

export const FavInfo = ({ idFav }) => {

    const url = `https://us-central1-talentario-a3d9a.cloudfunctions.net/api/jobOffer/${idFav}`;
    const state = useFetch(url);
    const { data } = state;

    return (
        <>
            { !data ? (<p className="aparece">cargando...</p>) :
                (<div key={data.id}>
                    <p className="mb-0">{data.positionName}</p>
                    <p className="d-inline-flex"><span className="salario">{data.salary}</span></p>
                    <p className="fs-6 text-secondary">{data.location}</p>
                </div>
                )
            }
        </>
    )
}
