import React, { useEffect, useState } from 'react';


import { Sidebar } from '../menu/SideBar'
import { db } from '../../firebase/firebase-config';
import { useSelector } from 'react-redux';
import { GetJobb } from '../Citas/GetJobb';



export const CalendarScreen = () => {

    const { uid } = useSelector(state => state.auth);



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
        <div>
            <Sidebar />
            <hr />
            <h2>Citas</h2>
            <br />
            <div >
                {
                    data ?
                        (
                            Object.keys(data).map(item => (
                                <div key={data[item].id}>
                                    <p><b>Fecha de la cita: {data[item].date}</b></p>
                                    <GetJobb user={data[item].applicantId} jobb={data[item].companyId + '§' + data[item].jobId} />
                                </div>
                            ))
                        ) :
                        (<p>No hay citas</p>)

                }
            </div>
            <br />
            <br />

        </div>
    )
}
