import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';


import { db } from '../../firebase/firebase-config';
import { useForm } from '../../hooks/useForm';
import { UpdateUser } from '../user/UpdateUser';
import { UpdateStudies } from '../user/UpdateStudies';
import { Sidebar } from './SideBar';

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

    }


    useEffect(() => {
        if (formValues.nameU === undefined) {

            document.querySelector('#reload').click();

        }

    }, [formValues])




    return (
        <>
            <Sidebar />
            <div className="contenido">
                <div className="titulo_principal">
                    <div className="container">
                        <div className="row">
                            <h1>Perfil</h1>
                        </div>
                    </div>
                </div>
                <div className="datos_cuenta mb-4 py-4">
                    <div className="container">
                        <div className="row">

                            <UpdateUser />

                            <div className="col-md-2 py-4">
                                <p className="position-relative">
                                    <Link
                                        id="reload"
                                        to="/profile"
                                        className="btn btn-edit"
                                    >
                                        <span className="ico-recargar"></span> Recargar datos
                                    </Link>
                                </p>
                            </div>  
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="card shadow perfil_input">
                            <div className="card-body">                                                    
                                <h2>Información <strong>Personal</strong></h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">                                    
                                        <div className="col-lg-4 py-2">
                                            <div className="input-group">
                                                <label>Nombre(s): </label>
                                                <input
                                                    type="text"
                                                    placeholder="Todos tus nombres"
                                                    name="nameU"
                                                    autoComplete="off"
                                                    className="form-control p-0 mx-2"
                                                    value={nameU}
                                                    onChange={handleInputChange}
                                                    disabled={active}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 py-2">
                                            <div className="input-group">
                                                <label>Apellido Paterno: </label>
                                                <input
                                                    type="text"
                                                    name="fullNameU"
                                                    autoComplete="off"
                                                    className="form-control p-0 mx-2"
                                                    value={fullNameU}
                                                    onChange={handleInputChange}
                                                    disabled={active}

                                                />
                                            </div>                                            
                                        </div>
                                        <div className="col-lg-4 py-2">
                                            <div className="input-group">
                                                <label>Apellido Materno: </label>
                                                <input
                                                    type="text"
                                                    name="fullNameM"
                                                    className="form-control p-0 mx-2"
                                                    autoComplete="off"
                                                    value={fullNameM}
                                                    onChange={handleInputChange}
                                                    disabled={active}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-5  col-xl-4 py-2">
                                                <div className="input-group">
                                                    <label>Fecha de nacimiento: </label>
                                                    <input
                                                        type="date"
                                                        name="birthdayU"
                                                        className="form-control p-0 mx-2"
                                                        value={birthdayU}
                                                        onChange={handleInputChange}
                                                        disabled={active}

                                                    />
                                            </div>
                                        </div>
                                        <div className="col-lg-2  col-xl-4 py-2">
                                            <div className="input-group">
                                                <label>Edad: </label>
                                                <p className="mx-2 my-0">{age}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-5  col-xl-4 py-2">
                                            <div className="input-group">
                                                <label>Sexo:&nbsp;</label>
                                                <label className="label-radio">Hombre</label>
                                                <input
                                                    type="radio"
                                                    name="sexU"
                                                    value="1"
                                                    className="mx-2"
                                                    onChange={handleInputChange}
                                                    disabled={active}
                                                    checked={sexU === '1'}
                                                />
                                               <label className="label-radio">Mujer</label> 
                                                <input
                                                    type="radio"
                                                    name="sexU"
                                                    value="2"
                                                    className="mx-2"
                                                    onChange={handleInputChange}
                                                    disabled={active}
                                                    checked={sexU === '2'}

                                                />
                                                <label className="label-radio">Otro</label>
                                                <input
                                                    type="radio"
                                                    name="sexU"
                                                    value="3"
                                                    className="mx-2"
                                                    onChange={handleInputChange}
                                                    disabled={active}
                                                    checked={sexU === '3'}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row"> 
                                        <div className="col-lg-4 py-2">
                                            <div className="input-group">
                                                <label>Teléfono Móvil</label>
                                                <input
                                                    type="text"
                                                    name="phone1U"
                                                    className="form-control p-0 mx-2"
                                                    value={phone1U}
                                                    onChange={handleInputChange}
                                                    disabled={active}

                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 py-2">
                                            <div className="input-group">
                                                <label>Teléfono Fijo</label>
                                                <input
                                                    type="text"
                                                    name="phone2U"
                                                    className="form-control p-0 mx-2"
                                                    value={phone2U}
                                                    onChange={handleInputChange}
                                                    disabled={active}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 py-2">
                                            <div className="input-group">
                                                <label>RFC:</label>
                                                <input
                                                    type="text"
                                                    name="rfcU"
                                                    className="form-control p-0 mx-2"
                                                    value={rfcU}
                                                    onChange={handleInputChange}
                                                    disabled={active}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-lg-6 py-2">
                                            <div className="input-group">
                                                <label>Nacionalidad:</label>
                                                <label className="label-radio ms-2">Mexicano</label>
                                                <input
                                                    type="radio"
                                                    name="nationalityU"
                                                    value="1"
                                                    className="mx-2"
                                                    onChange={handleInputChange}
                                                    disabled={active}
                                                    checked={nationalityU === '1'}

                                                />
                                                <label className="label-radio">Extranjero</label>
                                                <input
                                                    type="radio"
                                                    name="nationalityU"
                                                    value="2"
                                                    className="mx-2"
                                                    onChange={handleInputChange}
                                                    disabled={active}
                                                    checked={nationalityU === '2'}
                                                />
                                            </div>
                                        </div>
                                        
                                        <br />
                                    </div>

                                    <div className="row">
                                        <h2>Ubicación</h2>
                                        <div className="col-lg-4 py-2">
                                            <div className="input-group">                                                
                                                <label>Estado:</label>
                                                <select
                                                    name="countryU"
                                                    className="form-control p-0 mx-2"
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
                                            </div>
                                        </div>
                                        <div className="col-lg-4 py-2">
                                            <div className="input-group">
                                                <label>Ciudad:</label>
                                                <input
                                                    type="text"
                                                    name="cityU"
                                                    className="form-control p-0 mx-2"
                                                    value={cityU}
                                                    onChange={handleInputChange}
                                                    disabled={active}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 py-2">
                                            <div className="input-group">
                                                <label>Código Postal:</label>
                                                <input
                                                    type="text"
                                                    name="postalCodeU"
                                                    className="form-control p-0 mx-2"
                                                    value={postalCodeU}
                                                    onChange={handleInputChange}
                                                    disabled={active}
                                                />
                                            </div>
                                        </div>
                                       
                                        <p>
                                        {
                                            buttonSave &&
                                            <button type="submit" className="btn btn_login mt-5">Guardar</button>
                                        }
                                        </p>
                                    </div>
                                </form>
                                <p>
                                {
                                    buttonEdit &&
                                    <button onClick={handleActive} className="btn btn_login">Editar</button>
                                }
                                </p>
                            </div>
                        </div>
                        <div className="card shadow perfil_input my-5">
                            <UpdateStudies />
                        </div>
                        <div className="card shadow perfil_input py-5 mb-5">
                            <div className="card-body text-center">
                                <Link
                                    to="/describe"
                                    className="btn btn-azul mx-3"
                                >
                                    Descríbete
                                </Link>
                                <Link
                                    to="/test"
                                    className="btn btn-azul mx-3 my-2"
                                >
                                    Evaluación de habilidades
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

