import React from 'react'
import { Link } from 'react-router-dom';
import { Sidebar } from '../menu/SideBar'
// import { Test } from '../test/Test';

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
        <div>
            <Sidebar />
            <hr />
            <h3>Evaluación de Talentos</h3>
           <Link to="/test-start">Editar</Link>
        </div>
    )
}
