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
        <div>
            <Sidebar />
            <br />
            <br />
            <h2 className="text-center mt-5">Citas</h2>

            <div >
                {
                    data ?
                        (
                            Object.keys(data).map(item => (
                                <div key={data[item].id} className="container">
                                  { (isCompany === false) ? <GetJobb fecha={data[item].date} user={data[item].applicantId} jobb={data[item].companyId + '§' + data[item].jobId} company={data[item].companyId} /> : <CitasCompany  fecha={data[item].date} jobb={data[item].companyId + '§' + data[item].jobId} /> }
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
