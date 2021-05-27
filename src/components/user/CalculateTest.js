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
                            <div className="card shadow perfil_input my-5">
                                <div className="card-body text-center">
                                    <Evaluation />
                                    <p><Link to="/test-start" className="btn btn_login mt-3 mb-0">Editar</Link></p>
                                </div>                                
                            </div>
                        </div>                        
                    </div>
                </div>
                
            </div>
            
        </>
    )
}
