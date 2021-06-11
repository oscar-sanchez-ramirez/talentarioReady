import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebase-config';
// import { useForm } from '../../hooks/useForm';
import { Sidebar } from '../menu/SideBar';

export const Getapplication = () => {

    const { uid } = useParams();
    // console.log(uid)

    const { uid: userId } = useSelector(state => state.auth)
    const { isCompany } = useSelector(state => state.user)


    const [description, setDescription] = useState(null)
    const [location, setLocation] = useState(null)
    const [positionName, setPositionName] = useState(null)
    const [salary, setSalary] = useState(null)
    const [companyId, setCompanyId] = useState(null)
    const [idJob, setIdJob] = useState(null)
    const [weekSchedule, setWeekSchedule] = useState(null)
    const [scheduleStart, setScheduleStart] = useState(null)
    const [scheduleEnd, setScheduleEnd] = useState(null)

    const [imageUrll, setImageUrl] = useState(null)
    const [name, setName] = useState(null)

    const getApplication = (uid) => {
        const starCountRef = db.ref('jobOffers/' + uid);
        starCountRef.on('value', (snapshot) => {
            const datos = snapshot.val();

            setCompanyId(datos.companyId)
            setIdJob(datos.id)


            setDescription(datos.description)
            setLocation(datos.location)
            setPositionName(datos.positionName)
            setSalary(datos.salary)
            setWeekSchedule(datos.weekSchedule);
            setScheduleStart(datos.scheduleStart);
            setScheduleEnd(datos.scheduleEnd);

            // console.log(datos)


            const starCount = db.ref('users/' + datos.companyId);
            starCount.on('value', (snapshot) => {
                const data = snapshot.val();
                setImageUrl(data.imageUrl)
                setName(data.name)
            });


        });

    }

    // const [formValues, handleInputchange] = useForm({
         
    // })

    // const updateJoffer = () => {

    //     db.ref('jobOffers/' + uid).update({

    //     }, (error) => {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log('exito');
    //         }
    //     })

    // }



    useEffect(() => {

        getApplication(uid)
        return () => {
            setDescription({});
            setLocation({});
            setPositionName({});
            setSalary({});
            setCompanyId({});
            setIdJob({});
            setImageUrl({});
            setName({});
            setWeekSchedule({});
            setScheduleStart({});
            setScheduleEnd({});
        };

    }, [uid])


    const handleApli = () => {
        Swal.fire({
            title: '¿Estás seguro de aplicar a este oferta laboral?',
            showCancelButton: true,
            confirmButtonText: `Aplicar`,
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const url = `https://us-central1-talentario-a3d9a.cloudfunctions.net/api/newApplication/${userId}/${companyId}/${idJob}`;
                fetch(url, {
                    method: 'POST',
                })
                    .then(resp => {
                        Swal.fire('Aplico!', '', 'success')
                        document.getElementById('favorite').click();
                    })
                    .catch(error => console.log(error))
            }
        })

    }

    const handleFav = () => {
        Swal.fire({
            title: '¿Estás seguro de agregar a favoritos?',
            showCancelButton: true,
            confirmButtonText: `Agregar`,
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const url = `https://us-central1-talentario-a3d9a.cloudfunctions.net/api/favoriteJob/${userId}/${companyId}/${idJob}`;
                fetch(url, {
                    method: 'POST',
                })
                    .then(resp => {
                        Swal.fire('Se agrego!', '', 'success')
                        document.getElementById('favorite').click();
                    })
                    .catch(error => console.log(error))
            }
        })

    }


    return (
        <>
            <Sidebar />
            <div className="contenido">
                <div className="titulo_principal">
                    <div className="container">
                        <div className="row">
                            <h1>{positionName}</h1>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row my-5">
                        <Link to="/favorite" id="favorite"></Link>
                        <div className="col-lg-4 order-lg-2">
                            <div className="card shadow oferta_aplicar p-4">
                                <div className="card-body">
                                    <div className="oferta_imagen">
                                        <img src={imageUrll} alt="imagen" className="img-fluid" />
                                    </div>
                                    <h5><small>{name}</small></h5>
                                    <h3><strong>{positionName}</strong></h3>
                                    {
                                        (isCompany === false) &&

                                        (
                                            <div className="text-center">
                                                <p><button onClick={handleFav}className="btn agregar_fav align-items-center">Agregar a favoritos<span className="ico-favoritos"></span></button></p>
                                                <p><button onClick={handleApli} className="btn btn_login w-100 mt-0">Aplicar</button></p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 order-lg-1">
                            <div className="card shadow ">
                                <div className="card-body">
                            
                            
                            <p>Descripción: {description}</p>
                            <p>Salario: {salary}</p>
                            <p>Horario: {scheduleStart} a {scheduleEnd}</p>
                            <p>Jornada laboral: {weekSchedule}</p>
                            <p>Dirección: {location}</p>
                            
                        </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
