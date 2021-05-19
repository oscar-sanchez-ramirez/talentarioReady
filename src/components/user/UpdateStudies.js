import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebase-config';
import { useForm } from '../../hooks/useForm';

export const UpdateStudies = () => {

    const [active, setActive] = useState(true);
    const [button, setButton] = useState(false);
    const [buttonU, setUbutton] = useState(true);

    const { uid } = useSelector(state => state.auth)

    const {
        noStudiesNeeded,
        secundaria,
        bachillerato,
        licenciatura,
        maestria,
        doctorado,
        licStatus,
        licCareer,
        licIndustry,
        maesDropdown,
        docDropdown,


    } = useSelector(state => state.user);
    const noStu = (noStudiesNeeded === true) ? '1' : '0';
    const secun = (secundaria === true) ? '1' : '0';
    const bach = (bachillerato === true) ? '1' : '0';
    const licen = (licenciatura === true) ? '1' : '0';
    const maes = (maestria === true) ? '1' : '0';
    const doct = (doctorado === true) ? '1' : '0';



    const [formValues, handleInputchange] = useForm({
        noStudiesNeededU: noStu,
        secundariaU: secun,
        bachilleratoU: bach,
        licenciaturaU: licen,
        maestriaU: maes,
        doctoradoU: doct,
        licStatusU: licStatus,
        licCareerU: licCareer,
        licIndustryU: licIndustry,
        maesDropdownU: maesDropdown,
        docDropdownU: docDropdown,

    });
    const {
        noStudiesNeededU,
        secundariaU,
        bachilleratoU,
        licenciaturaU,
        maestriaU,
        doctoradoU,
        licStatusU,
        licCareerU,
        licIndustryU,
        maesDropdownU,
        docDropdownU,
    } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        db.ref('users/' + uid).update({
            noStudiesNeeded: (noStudiesNeededU === '1') ? true : false,
            secundaria: (secundariaU === '1') ? true : false,
            bachillerato: (bachilleratoU === '1') ? true : false,
            licenciatura: (licenciaturaU === '1') ? true : false,
            maestria: (maestriaU === '1') ? true : false,
            doctorado: (doctoradoU === '1') ? true : false,

            licStatus: licStatusU,
            licCareer: licCareerU,
            licIndustry: licIndustryU,
            maesDropdown: maesDropdownU,
            docDropdown: docDropdownU,


        }, (error) => {
            if (error) {
                setActive(true);
                setButton(false);
                setUbutton(true);
                Swal.fire('Error', error, 'error');
            } else {
                setActive(true);
                setButton(false);
                setUbutton(true);
                Swal.fire('Success', 'Data saved successfully!', 'success');
            }
        });
    };



    const handleActive = () => {
        setActive(false);
        setButton(true);
        setUbutton(false);
    };

    




    return (
        <div>
            <h2>Nivel de <strong>estudios</strong></h2>
            <form onSubmit={handleSubmit}>
                <label>Mi trabajo no necesita estudio a nivel profesional</label>
                <br />
                <label>Sí</label>
                <input
                    type="radio"
                    name="noStudiesNeededU"
                    value="1"
                    onChange={handleInputchange}
                    disabled={active}
                    checked={noStudiesNeededU === '1'}
                />

                <label>No</label>
                <input
                    type="radio"
                    name="noStudiesNeededU"
                    value="0"
                    onChange={handleInputchange}
                    disabled={active}
                    checked={noStudiesNeededU === '0'}
                />
                <br />
                <label>Secundaria</label>
                <br />
                <label>Sí</label>
                <input
                    type="radio"
                    name="secundariaU"
                    value="1"
                    onChange={handleInputchange}
                    disabled={active}
                    checked={secundariaU === '1'}
                />

                <label>No</label>
                <input
                    type="radio"
                    name="secundariaU"
                    value="0"
                    onChange={handleInputchange}
                    disabled={active}
                    checked={secundariaU === '0'}
                />
                <br />
                <label>Bachillerato</label>
                <br />
                <label>Sí</label>
                <input
                    type="radio"
                    name="bachilleratoU"
                    value="1"
                    onChange={handleInputchange}
                    disabled={active}
                    checked={bachilleratoU === '1'}
                />

                <label>No</label>
                <input
                    type="radio"
                    name="bachilleratoU"
                    value="0"
                    onChange={handleInputchange}
                    disabled={active}
                    checked={bachilleratoU === '0'}
                />
                <br />
                <label>Licenciatura</label>
                <br />
                <label>Sí</label>
                <input
                    type="radio"
                    name="licenciaturaU"
                    value="1"
                    onChange={handleInputchange}
                    disabled={active}
                    checked={licenciaturaU === '1'}
                />

                <label>No</label>
                <input
                    type="radio"
                    name="licenciaturaU"
                    value="0"
                    onChange={handleInputchange}
                    disabled={active}
                    checked={licenciaturaU === '0'}
                />
                <br />
                <label>Maestria</label>
                <br />
                <label>Sí</label>
                <input
                    type="radio"
                    name="maestriaU"
                    value="1"
                    onChange={handleInputchange}
                    disabled={active}
                    checked={maestriaU === '1'}
                />

                <label>No</label>
                <input
                    type="radio"
                    name="maestriaU"
                    value="0"
                    onChange={handleInputchange}
                    disabled={active}
                    checked={maestriaU === '0'}
                />
                <br />
                <label>Doctorado</label>
                <br />
                <label>Sí</label>
                <input
                    type="radio"
                    name="doctoradoU"
                    value="1"
                    onChange={handleInputchange}
                    disabled={active}
                    checked={doctoradoU === '1'}
                />

                <label>No</label>
                <input
                    type="radio"
                    name="doctoradoU"
                    value="0"
                    onChange={handleInputchange}
                    disabled={active}
                    checked={doctoradoU === '0'}
                />
                <br />
                <br />
                <label>Carrera</label>
                <select
                    name="licStatusU"
                    value={licStatusU}
                    onChange={handleInputchange}
                    disabled={active}
                >
                    <option value="1">Titulado</option>
                    <option value="2">Pasante</option>
                    <option value="3">Solo Kardex</option>
                    <option value="4">Trunca</option>
                </select>
                <br />
                <div>
                    <label>Licenciatura profesional en</label>
                    <input
                        type="text"
                        name="licCareerU"
                        value={licCareerU}
                        onChange={handleInputchange}
                        disabled={active}
                    />
                </div>
                <br />
                <label>Industria</label>
                <select
                    name="licIndustryU"
                    value={licIndustryU}
                    onChange={handleInputchange}
                    disabled={active}
                >
                    <option value="1">Agropecuario</option>
                    <option value="2">Industrial</option>
                    <option value="3">Servicios</option>
                </select>
                <br />
                <label>Maestria</label>
                <p>Maestria en</p>
                <input
                    type="text"
                    name="maesDropdownU"
                    value={maesDropdownU}
                    onChange={handleInputchange}
                    disabled={active}
                />
                <br />
                <label>Doctorado</label>
                <p>Doctorado en</p>
                <input
                    type="text"
                    name="docDropdownU"
                    value={docDropdownU}
                    onChange={handleInputchange}
                    disabled={active}
                />
                <br />

                <p>
                {
                    button &&
                    <button type="submit" className="btn btn_login mt-5">Guardar</button>
                }
                </p>

            </form>
            <p>
            {
                buttonU &&
                <button onClick={handleActive} className="btn btn_login">Editar</button>
            }
            </p>
        </div>
    )
}
