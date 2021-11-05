import React from 'react'
import { Link } from 'react-router-dom';
import { Sidebar } from '../menu/SideBar'
import { Evaluation } from '../test/Evaluation';

export const CalculateTest = () => {

    // var data = {

    //     selfRecognition: 6,
    //     selfEsteem: 6,
    //     procrastinationControl: 6,
    //     victimizationControl: 6,
    //     adaptability: 5,

    //     observation: 5,
    //     creativityInnovation: 5,
    //     entrepreneurshipInitiative: 4,
    //     improvisation: 4,
    //     problemSolving: 4,

    //     emotionalIntelligence: 3,
    //     rationalIntelligence: 3,
    //     focus: 3,
    //     collaboration: 3,
    //     negotiation: 2,

    //     selfConfidence: 2,
    //     frustrationTolerance: 2,
    //     assertiveCommunication: 1,
    //     conflictManagement: 1,
    //     resilience: 1,

    //     leadership: 7,
    //     reliability: 7,
    //     teamWork: 7,
    //     belongingSense: 7,
    //     empathy: 7
    // };


    const handleShow = () => {
        const divP = document.querySelector('#principal');
        const divS = document.querySelector('#secundario');
        divP.classList.add('animate__bounceOutLeft');
        divP.addEventListener('animationend', () => {
            divP.style.display = 'none';
            divS.style.display = 'block';
            divS.classList.add('animate__bounceInRight');
        });
    }

    const handleHiden = () => {
        const divP = document.querySelector('#principal');
        const divS = document.querySelector('#secundario');
        divP.classList.remove('animate__bounceOutLeft');
        divS.classList.remove('animate__bounceInRight');
        divP.style.display = 'block';
        divS.style.display = 'none';

    }

    return (
        <>
            <Sidebar />
            <div className="contenido">
                <div className="titulo_principal">
                    <div className="container">
                        <div className="row">
                            <h1>Evaluación de Talentos</h1>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <div className="card shadow perfil_input my-5 animate__animated" id="principal">
                                <div className="card-body text-center px-sm-3 px-md-5 py-5">
                                    <Evaluation />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 text-center">
                                        <Link to="/test-start" className="btn btn_login">Editar</Link>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <button onClick={handleShow} className="btn btn_login">Instrucciones</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow perfil_input my-5 animate__animated" id="secundario" style={{ display: 'none' }}>
                                <div className="card-body text-center px-sm-3 px-md-5 py-5">
                                    <h5>Define la destreza de tus habilidades eliguiendo los valores en cada evaluación</h5>
                                    <hr />
                                    <h5>Ten en mente que cuentas con una cantidad limitada de cada valor, toma decisiones sabias al momento de tu evaluación</h5>
                                    <Link to="/test-start" className="btn btn_login">Editar</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}
