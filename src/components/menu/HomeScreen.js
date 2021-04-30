import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase-config';
import { useFetch } from '../../hooks/useFetch'
import { Sidebar } from './SideBar'

export const HomeScreen = () => {


    const state = useFetch(`https://us-central1-talentario-a3d9a.cloudfunctions.net/api/jobOffers`);
    const { data, loading } = state;

    // console.log(data)

    const [objJob, setobjJob] = useState(data);
    console.log(objJob)

    const ofertas = (data) => {
        const offf = [];
        data &&
            Object.keys(data).map(iterador => {
                
            return offf.push({ uid: iterador, cargo: data[iterador].positionName, salario: data[iterador].salary, localidad: data[iterador].location })
            
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




    return (
        <div>
            <Sidebar />
            <hr />

            <h1>Ofertas de trabajo</h1>

            <input
                type='text'
                name="search"
                placeholder="Buscador..."
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
            />

            { loading ? 'espere..' :
                (<div id="jobFs">
                    {objJob &&
                        objJob.map(iterador => (
                            <div key={iterador.uid}>
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
    )
}
