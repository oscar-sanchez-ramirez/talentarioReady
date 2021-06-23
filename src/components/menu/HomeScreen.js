import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch'
import { CompanyOffers } from '../company/CompanyOffers';
import { Datosjob } from '../Job/Datosjob';
import { Sidebar } from './SideBar'

export const HomeScreen = () => {


    const state = useFetch(`https://us-central1-talentario-a3d9a.cloudfunctions.net/api/jobOffers`);
    const { data, loading } = state;
    // console.log(data)

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


    const handleInputChange = (e) => {
        const offer = ofertas(data);
        const eliminarDiacriticos = (texto) => {
            return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        }
        const search = e.target.value;
        const getOffersByPositionName = (positionName) => offer.filter(jobPosition => eliminarDiacriticos(jobPosition.cargo.toLowerCase()).includes(eliminarDiacriticos(positionName.toLowerCase())));
        setobjJob(getOffersByPositionName(search));
    }





    useEffect(() => {
        ofertas(data)

    }, [data])


    const { isCompany } = useSelector(state => state.user)



    return (
        <>

            <Sidebar />
            {
                !isCompany ? (
                    <div className="contenido">
                        <div className="titulo_principal">
                            <div className="container">
                                <div className="row">
                                   <h1>Ofertas de trabajo</h1>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row my-4 align-items-end">
                                <div className="input_search">
                                    <div className="input-group">
                                        <input
                                            type='text'
                                            name="search"
                                            placeholder="Buscador..."
                                            className="form-control"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            {loading ? <p className="aparece">cargando...</p> :
                                (<div id="jobFs" className="row">
                                    {objJob &&
                                        objJob.map(iterador => (
                                            <div key={iterador.uid} className="col-xl-4 col-md-6 mb-4 job_offers aparece">
                                                <div className="card shadow h-100">
                                                    <div className="card-body">
                                                        <h5 className="mb-0"><strong>{iterador.cargo}</strong></h5>
                                                        <Datosjob companyId={iterador.companyId} />
                                                        <p className="d-inline-flex"><span className="salario">{iterador.salario}</span></p>
                                                        <p className="fs-6 text-secondary">{iterador.localidad}</p>
                                                        <p className="mb-0"><Link className="btn btn_ver_oferta btn-sm" to={`/getApplication/${iterador.uid}`}
                                                        >Ver oferta</Link></p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                )
                            }
                        </div>
                    </div>
                ) : (

                    <div className="contenido">
                        <div className="titulo_principal">
                            <div className="container">
                                <div className="row">
                                   <h1>Ofertas de trabajo</h1>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row py-4">
                                <ul className="nav justify-content-center mb-4" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-job active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#ofertas-empresa" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Ofertas de la empresa</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-job" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#ofertas-todas" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Todas las ofertas</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="ofertas-empresa" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <CompanyOffers />
                                    </div>
                                    <div className="tab-pane fade" id="ofertas-todas" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <div className="input_search">
                                            <div className="input-group">
                                                <input
                                                    type='text'
                                                    name="search"
                                                    placeholder="Buscador..."
                                                    className="form-control"
                                                    onChange={handleInputChange}
                                                    style={{ marginBottom: '20px' }}
                                                />
                                            </div>
                                        </div>
                                        {loading ? <p className="aparece">cargando...</p> :
                                            (<div id="jobFs" className="row">
                                                {objJob &&
                                                    objJob.map(iterador => (
                                                        <div key={iterador.uid} className="col-xl-4 col-md-6 mb-4 job_offers aparece">
                                                            <div className="card shadow h-100">
                                                                <div className="card-body">
                                                                    <h5 className="mb-0"><strong>{iterador.cargo}</strong></h5>
                                                                    <Datosjob companyId={iterador.companyId} />
                                                                    <p className="d-inline-flex"><span className="salario">{iterador.salario}</span></p>
                                                                    <p className="fs-6 text-secondary">{iterador.localidad}</p>
                                                                    <p className="mb-0">
                                                                        <Link className="btn btn_ver_oferta btn-sm" to={`/getApplication/${iterador.uid}`}>Ver</Link>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}
