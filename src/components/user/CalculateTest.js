import React from 'react'

export const CalculateTest = () => {

    var url = 'https://us-central1-talentario-a3d9a.cloudfunctions.net/api/calculateTestResults/';
    var data = {

        selfRecognition: 6,
        selfEsteem: 6,
        procrastinationControl: 6,
        victimizationControl: 6,
        adaptability: 5,

        observation: 5,
        creativityInnovation: 5,
        entrepreneurshipInitiative: 4,
        improvisation: 4,
        problemSolving: 4,

        emotionalIntelligence: 3,
        rationalIntelligence: 3,
        focus: 3,
        collaboration: 3,
        negotiation: 2,

        selfConfidence: 2,
        frustrationTolerance: 2,
        assertiveCommunication: 1,
        conflictManagement: 1,
        resilience: 1,

        leadership: 7,
        reliability: 7,
        teamWork: 7,
        belongingSense: 7,
        empathy: 7
    };

    

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), // JSON.stringify(data)
        headers: {
            'Accept': 'application/x-www-form-urlencoded',
        }
    }).then(res => res )
    .then( data => console.log(data) )
    .catch( console.log )



    return (
        <div>
            <h5>Test</h5>
        </div>
    )
}
