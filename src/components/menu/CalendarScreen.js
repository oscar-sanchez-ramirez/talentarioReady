import React, { useEffect, useState } from 'react';


import { Sidebar } from '../menu/SideBar'
import { db } from '../../firebase/firebase-config';
import { useSelector } from 'react-redux';
import { GetJobb } from '../Citas/GetJobb';
import { CitasCompany } from '../Citas/CitasCompany';



export const CalendarScreen = () => {

    const { uid } = useSelector(state => state.auth);
    const { isCompany } = useSelector(state => state.user);
    // console.log(isCompany)




    const [datos, setDatos] = useState({ data: null, loading: true });
    const { data } = datos;
    // console.log(datos)




    const getCita = (uid) => {
        const starCountRef = db.ref('users/'+uid);
        starCountRef.on('value', (snapshot) => {
            const info = snapshot.val();
            const datos = info.scheduledDates;
            if (datos) {
                setDatos({ data: info.scheduledDates, loading: false })
            }
        });
    }


    useEffect(() => {
        getCita(uid)
    }, [uid])







    return (
        <>
            <Sidebar />
            <div className="contenido">
                <div className="titulo_principal mb-4">
                    <div className="container">
                        <div className="row">
                            <h1>Citas</h1>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">                   
                        {
                            data ?
                                (
                                    Object.keys(data).map(item => (
                                        <div key={data[item].id} className="col-lg-6 job_offers mb-4">
                                        { (isCompany === false) ? <GetJobb fecha={data[item].date} user={data[item].applicantId} jobb={data[item].companyId + '§' + data[item].jobId} company={data[item].companyId} /> : <CitasCompany  fecha={data[item].date} jobb={data[item].companyId + '§' + data[item].jobId} /> }
                                        </div>
                                    ))
                                ) :
                                (<h2 className="text-center">No hay citas</h2>)

                        }
                    </div>
                </div>
            </div>
        </>
    )
}
