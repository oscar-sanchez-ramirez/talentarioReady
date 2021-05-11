import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebase-config';
import { Resilience } from './Resilience';

export const ConflictManagement = () => {

    const [msjError, setMsjError] = useState(null);
    const { uid } = useSelector(state => state.auth)
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
    } = useSelector(state => state.user)

    const inputs = [
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
    ];

    const result7 = inputs.filter(item => item === 7);
    const result6 = inputs.filter(item => item === 6);
    const result5 = inputs.filter(item => item === 5);
    const result4 = inputs.filter(item => item === 4);
    const result3 = inputs.filter(item => item === 3);
    const result2 = inputs.filter(item => item === 2);
    const result1 = inputs.filter(item => item === 1);

    const scort7 = result7 && (5 - result7.length);
    const scort6 = result6 && (4 - result6.length);
    const scort5 = result5 && (3 - result5.length);
    const scort4 = result4 && (3 - result4.length);
    const scort3 = result3 && (4 - result3.length);
    const scort2 = result2 && (3 - result2.length);
    const scort1 = result1 && (3 - result1.length);

    const [show, setShow] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault()
        const valor = e.target.option.value;
        const valor_R = parseInt(valor);
        if (valor_R) {
            setMsjError(null);

            db.ref('users/' + uid).update({

                conflictManagement: valor_R,
                resilience: 0,

                leadership: 0,
                reliability: 0,
                teamWork: 0,
                belongingSense: 0,
                empathy: 0,

            }, (error) => {
                if (error) {
                    Swal.fire('Error', error, 'error');
                } else {
                    Swal.fire('Success', 'Data saved successfully!', 'success');
                    setShow(show + 1)
                }
            });


        } else {
            setMsjError('Debes elegir una opción');
        }
    }

    return (
        <div>
            {
                (show === 1) &&
                <form onSubmit={handleSubmit}>
                    
                    <h4>Desarollo del carácter (DC)</h4>
                    <h5>Manejo de conflictos</h5>
                    <h5>{msjError}</h5>

                    {
                        (result7.length < 5) &&
                        (
                            <div>
                                <label htmlFor="option7">7</label>
                                <input type="radio" name="option" id="option7" value="7" style={{ marginRight: '20px' }} />
                            </div>
                        )
                    }
                    {
                        (result6.length < 4) &&
                        (
                            <div>
                                <label htmlFor="option6">6</label>
                                <input type="radio" name="option" id="option6" value="6" style={{ marginRight: '20px' }} />
                            </div>
                        )
                    }

                    {
                        (result5.length < 3) &&
                        (
                            <div>
                                <label htmlFor="option5">5</label>
                                <input type="radio" name="option" id="option5" value="5" style={{ marginRight: '20px' }} />
                            </div>
                        )
                    }

                    {
                        (result4.length < 3) &&
                        (
                            <div>
                                <label htmlFor="option4">4</label>
                                <input type="radio" name="option" id="option4" value="4" style={{ marginRight: '20px' }} />
                            </div>
                        )
                    }

                    {
                        (result3.length < 4) &&
                        (
                            <div>
                                <label htmlFor="option3">3</label>
                                <input type="radio" name="option" id="option3" value="3" style={{ marginRight: '20px' }} />
                            </div>
                        )
                    }

                    {
                        (result2.length < 3) &&
                        (
                            <div>
                                <label htmlFor="option2">2</label>
                                <input type="radio" name="option" id="option2" value="2" style={{ marginRight: '20px' }} />
                            </div>
                        )
                    }

                    {
                        (result1.length < 3) &&
                        (
                            <div>
                                <label htmlFor="option1">1</label>
                                <input type="radio" name="option" id="option1" value="1" style={{ marginRight: '20px' }} />
                            </div>
                        )
                    }

                    <button>Guardar</button>
                    <br />
                    <br />
                    <table>
                        <thead>
                            <tr>
                                <th>7</th>
                                <th>6</th>
                                <th>5</th>
                                <th>4</th>
                                <th>3</th>
                                <th>2</th>
                                <th>1</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{scort7}/5</td>
                                <td>{scort6}/4</td>
                                <td>{scort5}/3</td>
                                <td>{scort4}/3</td>
                                <td>{scort3}/4</td>
                                <td>{scort2}/3</td>
                                <td>{scort1}/3</td>
                            </tr>
                        </tbody>
                    </table>

                </form>
            }
            {
                (show === 2) &&
                <Resilience />
            }
        </div>
    )
}
