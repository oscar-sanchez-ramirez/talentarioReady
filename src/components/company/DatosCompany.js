import React from 'react'
import { useFetch } from '../../hooks/useFetch';

export const DatosCompany = ({ companyId }) => {

    const state = useFetch(`https://us-central1-talentario-a3d9a.cloudfunctions.net/api/user/${companyId}`);
    const { data, loading } = state;


    return (
        <>
            {
                loading ? (<p>cargando...</p>) :
                    (<div>
                        
                        <img src={data.imageUrl} alt="Imagen de perfil" width={ 50 }/>
                        <p>{data.name}</p>
                    </div>)
            }
        </>
    )
}
