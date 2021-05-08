import React from 'react'
import { useFetch } from '../../hooks/useFetch'

export const Datosjob = ({ companyId }) => {

    const state = useFetch(`https://us-central1-talentario-a3d9a.cloudfunctions.net/api/user/${companyId}`);

    const { data, loading } = state;

    // console.log(!loading && data)

    return (
        <>
            {
                loading ? (<p>cargando...</p>) :
                    (<div>
                        <p>{data.name}</p>
                        <img src={data.imageUrl} alt="Imagen de perfil" width={ 50 }/>
                    </div>)
            }
        </>
    )
}
