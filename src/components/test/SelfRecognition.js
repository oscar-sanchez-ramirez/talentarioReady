import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebase-config';
import { SelfEsteem } from './SelfEsteem';


export const SelfRecognition = () => {



    const [msjError, setMsjError] = useState(null);
    const { uid } = useSelector(state => state.auth)

    const [show, setShow] = useState(1);


    const handleSubmit = (e) => {
        e.preventDefault()
        const valor = e.target.option.value;
        const valor_R = parseInt(valor);
        if (valor_R) {
            setMsjError(null);

            db.ref('users/' + uid).update({
                selfRecognition: valor_R,
                selfEsteem: 0,
                procrastinationControl: 0,
                victimizationControl: 0,
                adaptability: 0,

                observation: 0,
                creativityInnovation: 0,
                entrepreneurshipInitiative: 0,
                improvisation: 0,
                problemSolving: 0,

                emotionalIntelligence: 0,
                rationalIntelligence: 0,
                focus: 0,
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
                    
                    <h2 className="mb-5">Asumir la responsabilidad propia (<strong>PA</strong>)</h2>
                    <label className="fs-3">Auto Reconocimiento</label>
                    <p className="auth__alert-error">{msjError}</p>

                    <div className="input-group text-center">
                        <div className="mx-auto d-sm-flex">
                            <div>
                                <label htmlFor="option7" className="label-radio ms-2">7</label>
                                <input type="radio" name="option" id="option7" value="7" className="ms-1 me-3" />
                            </div>

                            <div>
                                <label htmlFor="option6" className="label-radio ms-2">6</label>
                                <input type="radio" name="option" id="option6" value="6" className="ms-1 me-3" />
                            </div>

                            <div>
                                <label htmlFor="option5" className="label-radio ms-2">5</label>
                                <input type="radio" name="option" id="option5" value="5" className="ms-1 me-3" />
                            </div>

                            <div>
                                <label htmlFor="option4" className="label-radio ms-2">4</label>
                                <input type="radio" name="option" id="option4" value="4" className="ms-1 me-3" />
                            </div>

                            <div>
                                <label htmlFor="option3" className="label-radio ms-2">3</label>
                                <input type="radio" name="option" id="option3" value="3" className="ms-1 me-3" />
                            </div>

                            <div>
                                <label htmlFor="option2" className="label-radio ms-2">2</label>
                                <input type="radio" name="option" id="option2" value="2" className="ms-1 me-3" />
                            </div>

                            <div>
                                <label htmlFor="option1" className="label-radio ms-2">1</label>
                                <input type="radio" name="option" id="option1" value="1" className="ms-1 me-3" />
                            </div>
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
                                <td>5/5</td>
                                <td>4/4</td>
                                <td>3/3</td>
                                <td>3/3</td>
                                <td>4/4</td>
                                <td>3/3</td>
                                <td>3/3</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            }
            {   (show === 2) &&
                <SelfEsteem />
            }
        </>
    )
}
