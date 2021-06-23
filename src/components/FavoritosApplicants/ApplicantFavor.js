import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch';
import { Sidebar } from '../menu/SideBar'
import { Applican } from '../FavoritosApplicants/Applican'

export const ApplicantFavor = () => {

    const { uid } = useParams();
    // console.log(uid);

    const state = useFetch(`https://us-central1-talentario-a3d9a.cloudfunctions.net/api/jobOffer/${uid}`);
    const { data, loading } = state;
    // console.log(!loading && data.applicants);

    const [job, setJob] = useState([])



    useEffect(() => {


       if( !loading ){
           if(data.applicants){

               setJob(Object.values(data.applicants))
           }else{
               setJob('')
           }
       }


    }, [data, loading])


    console.log(job)



    return (
        <div>
            <Sidebar />
            <h1>Aplicante favorito</h1>
            {
                (job !== '') ? (
                    job.map(item => (
                        <Applican key={item.userId} uid={item.userId} status={item.status} />
                    ))
                )
                    : (<p>No hay favoritos</p>)
            }
        </div>
    )
}


