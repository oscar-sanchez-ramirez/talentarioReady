import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import { DatosCompany } from './DatosCompany';

export const CompanyOffers = () => {

    // const { uid } = useSelector(state => state.auth)
    // const state = useFetch(`https://us-central1-talentario-a3d9a.cloudfunctions.net/api/companyJobOffers/${uid}`);


    const state = useFetch(`https://us-central1-talentario-a3d9a.cloudfunctions.net/api/companyJobOffers/sdDQmkjPYaXba17r5GJrDrg6zUE3`);
    const { data, loading } = state;
    // console.log(!loading && data)

    const [objJob, setobjJob] = useState(data);
    // console.log(objJob)

    const ofertas = (data) => {
        const offf = [];
        data &&
            Object.keys(data).map(iterador => {

                return offf.push({ uid: iterador, companyId: data[iterador].companyId, cargo: data[iterador].positionName, salario: data[iterador].salary, localidad: data[iterador].location })
            })
        setobjJob(offf)

        return offf;

    }

    useEffect(() => {

        ofertas(data)

    }, [data])

    return (
        <div>
            <hr />
            <h5>Ofertas de la empresa</h5>
            <hr />
            { loading ? <p>cargando...</p> :
                (<div id="jobFs">
                    {objJob &&
                        objJob.map(iterador => (
                            <div key={iterador.uid}>
                                <p>{iterador.cargo}</p>
                                <DatosCompany companyId={iterador.companyId} />
                                <p>{iterador.salario}</p>
                                <p>{iterador.localidad}</p>
                                <Link to={`/getApplication/${iterador.uid}`}
                                >Ver</Link>
                                <hr />
                            </div>
                        ))
                    }
                </div>
                )
            }
            <br />
            <h5>Ofertas populares</h5>
            <hr />
        </div>
    )
}
