import React from 'react'
import { useSelector } from 'react-redux';

export const Evaluation = () => {

    const {
        selfRecognition,
        selfEsteem,
        procrastinationControl,
        victimizationControl,
        adaptability,

        observation,
        creativityInnovation,
        entrepreneurshipInitiative,
        improvisation,
        problemSolving,

        emotionalIntelligence,
        rationalIntelligence,
        focus,
        collaboration,
        negotiation,

        selfConfidence,
        frustrationTolerance,
        assertiveCommunication,
        conflictManagement,
        resilience,

        leadership,
        reliability,
        teamWork,
        belongingSense,
        empathy,
    } = useSelector(state => state.user)

    const calculate = () => {


        let rSelfRecognition = selfRecognition / 5;
        let rSelfEsteem = selfEsteem / 5;
        let rProcrastinationControl = procrastinationControl / 5;
        let rVictimizationControl = victimizationControl / 5;
        let rAdaptability = adaptability / 5;

        let moduleValuePA = rSelfRecognition + rSelfEsteem + rProcrastinationControl + rVictimizationControl + rAdaptability;

        let rSelfRecognitionRelated = observation + emotionalIntelligence + frustrationTolerance + belongingSense;
        let rSelfEsteemRelated = problemSolving + rationalIntelligence + selfConfidence + leadership;
        let rProcrastinationControlRelated = entrepreneurshipInitiative + focus + frustrationTolerance + conflictManagement;
        let rVictimizationControlRelated = creativityInnovation + emotionalIntelligence + negotiation + conflictManagement;
        let rAdaptabilityRelated = improvisation + collaboration + resilience + belongingSense;

        let relatedModuleValuePA = rSelfRecognitionRelated + rSelfEsteemRelated + rProcrastinationControlRelated + rVictimizationControlRelated + rAdaptabilityRelated;

        //end PA

        let rObservation = observation / 5;
        let rCreativityInnovation = creativityInnovation / 5;
        let rEntrepreneurshipInitiative = entrepreneurshipInitiative / 5;
        let rImprovisation = improvisation / 5;
        let rProblemSolving = problemSolving / 5;

        let moduleValuePD = rObservation + rCreativityInnovation + rEntrepreneurshipInitiative + rImprovisation + rProblemSolving;

        let rObservationRelated = procrastinationControl + focus + frustrationTolerance + empathy;
        let rCreativityInnovationRelated = adaptability + rationalIntelligence + resilience + teamWork;
        let rEntrepreneurshipInitiativeRelated = selfEsteem + rationalIntelligence + frustrationTolerance + empathy;
        let rImprovisationRelated = victimizationControl + emotionalIntelligence + conflictManagement + empathy;
        let rProblemSolvingRelated = selfRecognition + collaboration + assertiveCommunication + reliability;

        let relatedModuleValuePD = rObservationRelated + rCreativityInnovationRelated + rEntrepreneurshipInitiativeRelated + rImprovisationRelated + rProblemSolvingRelated;

        // end PD

        let rEmotionalIntelligence = emotionalIntelligence / 5;
        let rRationalIntelligence = rationalIntelligence / 5;
        let rFocus = focus / 5;
        let rCollaboration = collaboration / 5;
        let rNegotiation = negotiation / 5;

        let moduleValueTD = rEmotionalIntelligence + rRationalIntelligence + rFocus + rCollaboration + rNegotiation;

        let rEmotionalIntelligenceRelated = selfEsteem + entrepreneurshipInitiative + selfConfidence + leadership;
        let rRationalIntelligenceRelated = procrastinationControl + problemSolving + conflictManagement + reliability;
        let rFocusRelated = selfRecognition + observation + frustrationTolerance + reliability;
        let rCollaborationRelated = victimizationControl + creativityInnovation + frustrationTolerance + teamWork;
        let rNegotiationRelated = adaptability + improvisation + assertiveCommunication + empathy;

        let relatedModuleValueTD = rEmotionalIntelligenceRelated + rRationalIntelligenceRelated + rFocusRelated + rCollaborationRelated + rNegotiationRelated;

        // end TD

        let rSelfConfidence = selfConfidence / 5;
        let rFrustrationTolerance = frustrationTolerance / 5;
        let rAssertiveCommunication = assertiveCommunication / 5;
        let rConflictManagement = conflictManagement / 5;
        let rResilience = resilience / 5;

        let moduleValueDC = rSelfConfidence + rFrustrationTolerance + rAssertiveCommunication + rConflictManagement + rResilience;

        let rSelfConfidenceRelated = selfRecognition + creativityInnovation + emotionalIntelligence + leadership;
        let rFrustrationToleranceRelated = adaptability + problemSolving + emotionalIntelligence + reliability;
        let rAssertiveCommunicationRelated = selfRecognition + observation + negotiation + teamWork;
        let rConflictManagementRelated = adaptability + problemSolving + rationalIntelligence + teamWork;
        let rResilienceRelated = victimizationControl + entrepreneurshipInitiative + focus + leadership;

        let relatedModuleValueDC = rSelfConfidenceRelated + rFrustrationToleranceRelated + rAssertiveCommunicationRelated + rConflictManagementRelated + rResilienceRelated;

        // end DC

        let rLeadership = leadership / 5;
        let rReliability = reliability / 5;
        let rTeamWork = teamWork / 5;
        let rBelongingSense = belongingSense / 5;
        let rEmpathy = empathy / 5;

        let moduleValueTE = rLeadership + rReliability + rTeamWork + rBelongingSense + rEmpathy;

        let rLeadershipRelated = selfRecognition + observation + focus + conflictManagement;
        let rReliabilityRelated = victimizationControl + creativityInnovation + emotionalIntelligence + selfConfidence;
        let rTeamWorkRelated = adaptability + creativityInnovation + collaboration + resilience;
        let rBelongingSenseRelated = selfEsteem + entrepreneurshipInitiative + focus + conflictManagement;
        let rEmpathyRelated = selfRecognition + improvisation + collaboration + frustrationTolerance;

        let relatedModuleValueTE = rLeadershipRelated + rReliabilityRelated + rTeamWorkRelated + rBelongingSenseRelated + rEmpathyRelated;

        // end TE

        let results = {
            PA: moduleValuePA + relatedModuleValuePA,
            PD: moduleValuePD + relatedModuleValuePD,
            TD: moduleValueTD + relatedModuleValueTD,
            DC: moduleValueDC + relatedModuleValueDC,
            TE: moduleValueTE + relatedModuleValueTE
        }
        return results;

    }


    const { PA, PD, TD, DC, TE } = calculate();

    return (
        <div>
            <h5>PA: { empathy && PA}</h5>
            <h5>PD: { empathy && PD}</h5>
            <h5>TD: { empathy && TD}</h5>
            <h5>DC: { empathy && DC}</h5>
            <h5>TE: { empathy && TE}</h5>
        </div>
    )
}
