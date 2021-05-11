import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';


import { db } from '../../firebase/firebase-config';
import { useForm } from '../../hooks/useForm';
import { UpdateUser } from '../user/UpdateUser';
import { UpdateStudies } from '../user/UpdateStudies';
import { Sidebar } from './SideBar'

export const ProfileScreen = () => {



    const { uid } = useSelector(state => state.auth);


    const {
        name,
        fullName,
        birthday,
        age,
        sex,
        phone1,
        phone2,
        rfc,
        nationality,
        postalCode,
        city,
        country,
    } = useSelector(state => state.user);


    const birthdayT = birthday && birthday.replaceAll("/", "-");

    const calcularEdad = (fecha) => {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    }

    const apellidos = fullName && fullName.split('+');

    const ApU = fullName && apellidos[0];
    const AmU = fullName && apellidos[1];

    const [formValues, handleInputChange] = useForm(
        {
            nameU: name,
            fullNameU: ApU,
            fullNameM: AmU,
            birthdayU: birthdayT,
            ageU: age,
            sexU: sex,
            phone1U: phone1,
            phone2U: phone2,
            rfcU: rfc,
            nationalityU: nationality,
            postalCodeU: postalCode,
            cityU: city,
            countryU: country,


        });


    const {
        nameU,
        fullNameU,
        fullNameM,
        birthdayU,
        sexU,
        phone1U,
        phone2U,
        rfcU,
        nationalityU,
        postalCodeU,
        cityU,
        countryU,
    } = formValues;


    const [active, setActive] = useState(true);
    const [buttonSave, setButtonSave] = useState(false)
    const [buttonEdit, setButtonEdit] = useState(true)


    const handleActive = () => {
        setActive(false);
        setButtonSave(true);
        setButtonEdit(false);
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        db.ref('users/' + uid).update({
            name: nameU,
            fullName: fullNameU+'+'+fullNameM,
            birthday: birthdayU.replaceAll("-", "/"),
            age: calcularEdad(birthdayU),
            sex: sexU,
            phone1: phone1U,
            phone2: phone2U,
            rfc: rfcU,
            nationality: nationalityU,
            postalCode: postalCodeU,
            city: cityU,
            country: countryU,

        }, (error) => {
            if (error) {
                setActive(true);
                setButtonEdit(true);
                setButtonSave(false);
                Swal.fire('Error', error, 'error');
            } else {
                setActive(true);
                setButtonEdit(true);
                setButtonSave(false);
                Swal.fire('Success', 'Data saved successfully!', 'success');
            }
        });

    }


    useEffect(() => {
        if (formValues.nameU === undefined) {

            document.querySelector('#reload').click();

        }

    }, [formValues])




    return (
        <div>
            <Sidebar />
            <hr />
            <div>
                <h1>Perfil</h1>
                <Link
                    id="reload"
                    to="/profile"
                    className="link"
                >
                    Reload Data
                </Link>
                <UpdateUser />
                <hr />
                <h2>Datos personales</h2>
                <form onSubmit={handleSubmit}>
                    <label>Todos tus nombres</label>
                    <input
                        type="text"
                        placeholder="Todos tus nombres"
                        name="nameU"
                        autoComplete="off"
                        value={nameU}
                        onChange={handleInputChange}
                        disabled={active}
                    />
                    <br />
                    <label>Apellido Paterno</label>
                    <input
                        type="text"
                        name="fullNameU"
                        autoComplete="off"
                        value={fullNameU}
                        onChange={handleInputChange}
                        disabled={active}

                    />
                    <label>Apellido Materno</label>
                    <input
                        type="text"
                        name="fullNameM"
                        autoComplete="off"
                        value={fullNameM}
                        onChange={handleInputChange}
                        disabled={active}

                    />
                    <br />
                    <label>Fecha de nacimiento</label>
                    <input
                        type="date"
                        name="birthdayU"
                        value={birthdayU}
                        onChange={handleInputChange}
                        disabled={active}

                    />
                    <br />
                    <label>Edad</label>
                    <p>{age}</p>
                    {/* <input
                        type="text"
                        name="ageU"
                        placeholder="Edad"
                        value={ageU}
                        onChange={handleInputChange}
                        disabled={active}

                    /> */}
                    <br />
                    <p>Sexo</p>
                    <label>Hombre</label>
                    <input
                        type="radio"
                        name="sexU"
                        value="1"
                        onChange={handleInputChange}
                        disabled={active}
                        checked={sexU === '1'}
                    />
                    <label>Mujer</label>
                    <input
                        type="radio"
                        name="sexU"
                        value="2"
                        onChange={handleInputChange}
                        disabled={active}
                        checked={sexU === '2'}

                    />
                    <label>Otro</label>
                    <input
                        type="radio"
                        name="sexU"
                        value="3"
                        onChange={handleInputChange}
                        disabled={active}
                        checked={sexU === '3'}

                    />
                    <br />
                    <label>Teléfono Móvil</label>
                    <input
                        type="text"
                        name="phone1U"
                        value={phone1U}
                        onChange={handleInputChange}
                        disabled={active}

                    />
                    <br />
                    <label>Teléfono Fijo</label>
                    <input
                        type="text"
                        name="phone2U"
                        value={phone2U}
                        onChange={handleInputChange}
                        disabled={active}
                    />
                    <br />
                    <label>RFC</label>
                    <input
                        type="text"
                        name="rfcU"
                        value={rfcU}
                        onChange={handleInputChange}
                        disabled={active}
                    />
                    <br />
                    <p>Nacionalidad</p>
                    <label>Mexicano</label>
                    <input
                        type="radio"
                        name="nationalityU"
                        value="1"
                        onChange={handleInputChange}
                        disabled={active}
                        checked={nationalityU === '1'}

                    />
                    <label>Extranjero</label>
                    <input
                        type="radio"
                        name="nationalityU"
                        value="2"
                        onChange={handleInputChange}
                        disabled={active}
                        checked={nationalityU === '2'}
                    />
                    <br />
                    <h2>Ubicación</h2>
                    <label>Estado</label>
                    <select
                        name="countryU"
                        value={countryU}
                        onChange={handleInputChange}
                        disabled={active}
                    >
                        <option value="1">AGUASCALIENTES</option>
                        <option value="2">BAJA CALIFORNIA</option>
                        <option value="3">BAJA CALIFORNIA SUR</option>
                        <option value="4">CHIHUAHUA</option>
                        <option value="5">CHIAPAS</option>
                        <option value="6">CAMPECHE</option>
                        <option value="7">CIUDAD DE MEXICO</option>
                        <option value="8">COAHUILA</option>
                        <option value="9">COLIMA</option>
                        <option value="10">DURANGO</option>
                        <option value="11">GUERRERO</option>
                        <option value="12">GUANAJUATO</option>
                        <option value="13">HIDALGO</option>
                        <option value="14">JALISCO</option>
                        <option value="15">MICHOACAN</option>
                        <option value="16">ESTADO DE MEXICO</option>
                        <option value="17">MORELOS</option>
                        <option value="18">NAYARIT</option>
                        <option value="19">NUEVO LEON</option>
                        <option value="20">OAXACA</option>
                        <option value="21">PUEBLA</option>
                        <option value="22">QUINTANA ROO</option>
                        <option value="23">QUERETARO</option>
                        <option value="24">SINALOA</option>
                        <option value="25">SAN LUIS POTOSI</option>
                        <option value="26">SONORA</option>
                        <option value="27">TABASCOO</option>
                        <option value="28">TLAXCALA</option>
                        <option value="29">TAMAULIPAS</option>
                        <option value="30">VERACRUZ</option>
                        <option value="31">YUCATAN</option>
                        <option value="32">ZACATECAS</option>
                    </select>
                    <br />
                    <label>Ciudad</label>
                    <input
                        type="text"
                        name="cityU"
                        value={cityU}
                        onChange={handleInputChange}
                        disabled={active}
                    />
                    <br />
                    <label>Código Postal</label>
                    <input
                        type="text"
                        name="postalCodeU"
                        value={postalCodeU}
                        onChange={handleInputChange}
                        disabled={active}
                    />

                    {
                        buttonSave &&
                        <button type="submit">Guardar</button>
                    }
                </form>
                {
                    buttonEdit &&
                    <button onClick={handleActive}>Editar</button>
                }
                <hr />
                <UpdateStudies />
                <hr />
                <Link
                    to="/describe"
                    className="link"
                >
                    Describete
                </Link>
                <hr />
                <Link
                    to="/test"
                    className="link"
                >
                    Evaluación de habilidades
                </Link>

                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}

