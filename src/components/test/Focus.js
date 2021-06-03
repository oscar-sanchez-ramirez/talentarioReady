import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebase-config';
import { Collaboration } from './Collaboration';

export const Focus = () => {

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

                focus: valor_R,
                collaboration: 0,
                negotiation: 0,

                selfConfidence: 0,
                frustrationTolerance: 0,
                assertiveCommunication: 0,
                conflictManagement: 0,
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
        <>
            {
                (show === 1) &&
                <form onSubmit={handleSubmit}>
                    
                    <h2 className="mb-5">Toma de decisiones (<strong>TD</strong>)</h2>
                    <label className="fs-3">Enfoque</label>
                    <p className="auth__alert-error">{msjError}</p>

                    <div className="input-group text-center">
                        <div className="mx-auto d-sm-flex">
                            {
                                (result7.length < 5) &&
                                (
                                    <div>
                                        <label htmlFor="option7" className="label-radio ms-2">7</label>
                                        <input type="radio" name="option" id="option7" value="7" className="ms-1 me-3" />
                                    </div>
                                )
                            }
                            {
                                (result6.length < 4) &&
                                (
                                    <div>
                                        <label htmlFor="option6" className="label-radio ms-2">6</label>
                                        <input type="radio" name="option" id="option6" value="6" className="ms-1 me-3" />
                                    </div>
                                )
                            }

                            {
                                (result5.length < 3) &&
                                (
                                    <div>
                                        <label htmlFor="option5" className="label-radio ms-2">5</label>
                                        <input type="radio" name="option" id="option5" value="5" className="ms-1 me-3" />
                                    </div>
                                )
                            }

                            {
                                (result4.length < 3) &&
                                (
                                    <div>
                                        <label htmlFor="option4" className="label-radio ms-2">4</label>
                                        <input type="radio" name="option" id="option4" value="4" className="ms-1 me-3" />
                                    </div>
                                )
                            }

                            {
                                (result3.length < 4) &&
                                (
                                    <div>
                                        <label htmlFor="option3" className="label-radio ms-2">3</label>
                                        <input type="radio" name="option" id="option3" value="3" className="ms-1 me-3" />
                                    </div>
                                )
                            }

                            {
                                (result2.length < 3) &&
                                (
                                    <div>
                                        <label htmlFor="option2" className="label-radio ms-2">2</label>
                                        <input type="radio" name="option" id="option2" value="2" className="ms-1 me-3" />
                                    </div>
                                )
                            }

                            {
                                (result1.length < 3) &&
                                (
                                    <div>
                                        <label htmlFor="option1" className="label-radio ms-2">1</label>
                                        <input type="radio" name="option" id="option1" value="1" className="ms-1 me-3" />
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <button className="btn btn_login mb-5">Guardar</button>
                    <div className="table-responsive">
                        <table align="center" cellPadding="5" border="0" className="table table-striped evaluacion">
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
                    </div>
                </form>
            }
            {
                (show === 2) &&
                <Collaboration />
            }
        </>
    )
}
