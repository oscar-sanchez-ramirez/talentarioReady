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
                Swal.fire({
                    icon: 'success',
                    title: 'Datos guardados con éxito',
                    showConfirmButton: true,
                    timer: 1500,
                    timerProgressBar: true,
                    // position: 'top-end',
                });
            }
        });
    };



    const handleActive = () => {
        setActive(false);
        setButton(true);
        setUbutton(false);
    };

    




    return (
        <div className="card-body">
            <div className="card-title">
                <h2>Nivel de <strong>estudios</strong></h2>                
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="table-responsive">
                            <table align="center" cellPadding="5" border="0" className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nivel</th>
                                        <th>Si</th>
                                        <th>No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-3">
                                            Mi trabajo no necesita estudio a nivel profesional
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="noStudiesNeededU"
                                                value="1"
                                                className="mx-2"
                                                onChange={handleInputchange}
                                                disabled={active}
                                                checked={noStudiesNeededU === '1'}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="noStudiesNeededU"
                                                value="0"
                                                className="mx-2"
                                                onChange={handleInputchange}
                                                disabled={active}
                                                checked={noStudiesNeededU === '0'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3">
                                            Secundaria
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="secundariaU"
                                                value="1"
                                                className="mx-2"
                                                onChange={handleInputchange}
                                                disabled={active}
                                                checked={secundariaU === '1'}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="secundariaU"
                                                value="0"
                                                className="mx-2"
                                                onChange={handleInputchange}
                                                disabled={active}
                                                checked={secundariaU === '0'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3">
                                            Bachillerato
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="bachilleratoU"
                                                value="1"
                                                className="mx-2"
                                                onChange={handleInputchange}
                                                disabled={active}
                                                checked={bachilleratoU === '1'}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="bachilleratoU"
                                                value="0"
                                                className="mx-2"
                                                onChange={handleInputchange}
                                                disabled={active}
                                                checked={bachilleratoU === '0'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3">
                                            Licenciatura 
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="licenciaturaU"
                                                value="1"
                                                className="mx-2"
                                                onChange={handleInputchange}
                                                disabled={active}
                                                checked={licenciaturaU === '1'}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="licenciaturaU"
                                                value="0"
                                                className="mx-2"
                                                onChange={handleInputchange}
                                                disabled={active}
                                                checked={licenciaturaU === '0'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3">
                                            Maestria
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="maestriaU"
                                                value="1"
                                                className="mx-2"
                                                onChange={handleInputchange}
                                                disabled={active}
                                                checked={maestriaU === '1'}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="maestriaU"
                                                value="0"
                                                className="mx-2"
                                                onChange={handleInputchange}
                                                disabled={active}
                                                checked={maestriaU === '0'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3">
                                            Doctorado
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="doctoradoU"
                                                value="1"
                                                className="mx-2"
                                                onChange={handleInputchange}
                                                disabled={active}
                                                checked={doctoradoU === '1'}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="doctoradoU"
                                                value="0"
                                                className="mx-2"
                                                onChange={handleInputchange}
                                                disabled={active}
                                                checked={doctoradoU === '0'}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="bloque_datos my-5">
                    <div className="row">
                        <div className="col-lg-12 py-2">
                            <div className="input-group">
                            <label>Carrera:&nbsp;</label>
                                <select
                                    name="licStatusU"
                                    className="form-control p-0 mx-2"
                                    value={licStatusU}
                                    onChange={handleInputchange}
                                    disabled={active}
                                >
                                    <option value="1">Titulado</option>
                                    <option value="2">Pasante</option>
                                    <option value="3">Solo Kardex</option>
                                    <option value="4">Trunca</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-12 py-2">
                            <div className="input-group">
                                <label>Licenciatura profesional en:&nbsp;</label>
                                <input
                                    type="text"
                                    name="licCareerU"
                                    className="form-control p-0 mx-2"
                                    value={licCareerU}
                                    onChange={handleInputchange}
                                    disabled={active}
                                />
                            </div>
                        </div>
                        <div className="col-lg-12 py-2">
                            <div className="input-group">
                                <label>Industria:&nbsp;</label>
                                <select
                                    name="licIndustryU"
                                    className="form-control p-0 mx-2"
                                    value={licIndustryU}
                                    onChange={handleInputchange}
                                    disabled={active}
                                >
                                    <option value="1">Agropecuario</option>
                                    <option value="2">Industrial</option>
                                    <option value="3">Servicios</option>
                                </select>
                            </div>
                        </div>        
                        <div className="col-lg-12 py-2">
                            <div className="input-group">
                                <label>Maestría en:&nbsp;</label>
                                <input
                                    type="text"
                                    name="maesDropdownU"
                                    className="form-control p-0 mx-2"
                                    value={maesDropdownU}
                                    onChange={handleInputchange}
                                    disabled={active}
                                />
                            </div>
                        </div>
                        <div className="col-lg-12 py-2">
                            <div className="input-group">
                                <label>Doctorado en:&nbsp;</label>
                                <input
                                    type="text"
                                    name="docDropdownU"
                                    className="form-control p-0 mx-2"
                                    value={docDropdownU}
                                    onChange={handleInputchange}
                                    disabled={active}
                                />
                            </div>
                        </div>
                        
                        {
                            button &&
                            <p>
                                <button type="submit" className="btn btn_login">Guardar</button>
                            </p>
                        }
                    </div>
                </div>
                

            </form>
            
            {
                buttonU &&
                <p>
                    <button onClick={handleActive} className="btn btn_login">Editar</button>
                </p>
            }
        </div>
    )
}
