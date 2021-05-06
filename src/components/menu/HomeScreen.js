import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch'
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
        <div>

            <Sidebar />
            {
                !isCompany ? (
                    <div>
                        <hr />

                        <h1>Ofertas de trabajo</h1>

                        <input
                            type='text'
                            name="search"
                            placeholder="Buscador..."
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px' }}
                        />

                        { loading ? <p>cargando...</p> :
                            (<div id="jobFs">
                                {objJob &&
                                    objJob.map(iterador => (
                                        <div key={iterador.uid}>
                                            <Datosjob companyId={iterador.companyId} />
                                            <p>{iterador.cargo}</p>
                                            <p>{iterador.salario}</p>
                                            <p>{iterador.localidad}</p>
                                            <hr />
                                        </div>
                                    ))
                                }
                            </div>
                            )
                        }
                    </div>
                ) : (
                    <div>
                        <hr />
                        <p>Ofertas de la empresa</p>
                        <br />
                        <p>Ofertas populares</p>
                    </div>
                )
            }

        </div>
    )
}
