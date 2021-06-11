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
                    (<div className="position-relative">                        
                        <div className="job_img  top-50 translate-middle rounded">
                            <img src={data.imageUrl} alt="Imagen de perfil" className="img-fluid" />
                        </div>
                        <p className="mb-0">{data.name}</p>
                    </div>)
            }
        </>
    )
}
