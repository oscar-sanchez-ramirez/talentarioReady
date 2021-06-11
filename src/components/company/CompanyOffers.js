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
        <>
            { loading ? <p>cargando...</p> :
                (<div id="jobFs" className="row">
                    {objJob &&
                        objJob.map(iterador => (
                            <div key={iterador.uid} className="col-xl-4 col-md-6 mb-4 job_offers">
                                <div className="card shadow h-100">
                                    <div className="card-body">
                                        <h5 className="mb-0"><strong>{iterador.cargo}</strong></h5>
                                        <DatosCompany companyId={iterador.companyId} />
                                        <p className="d-inline-flex"><span className="salario">{iterador.salario}</span></p>
                                        <p className="fs-6 text-secondary">{iterador.localidad}</p>
                                        <p className="mb-0">
                                            <Link className="btn btn_ver_oferta btn-sm" to={`/getApplication/${iterador.uid}`}
                                            >Ver</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                )
            }
            
        </>
    )
}
