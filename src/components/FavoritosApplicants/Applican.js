import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase-config';

export const Applican = ({ uid, status }) => {



    const [name, setName] = useState('')
    const [fullName, setFullname] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')


    const handleSetInfo = (uid) => {

        const starCountRef = db.ref('users/' + uid);
        starCountRef.on('value', (snapshot) => {
            const info = snapshot.val();
            console.log(info)
            setName(info.name)
            const fullname = info.fullName;
            const Realfullname = fullname.replace('+', ' ');
            setFullname(Realfullname)
            setAge(info.age)
            setEmail(info.email)
            setImage(info.imageUrl)

        });

    }

    useEffect(() => {
        handleSetInfo(uid)
    }, [uid])


    return (
        <>
            {
                (status === 0) && (
                    <div className="col-xl-4 col-md-6 mb-4 job_offers aparece">
                        <div className="card shadow h-100">
                            <div className="card-body">
                                <h5 className="mb-0"><strong>{name}</strong></h5>
                                <div className="position-relative empresa_logo">
                                    <div className="job_img  top-50 translate-middle rounded">
                                        <img src={image}  alt={name}  className="img-fluid" />
                                    </div>
                                    <p className="mb-0">{fullName}</p>
                                </div>
                                <p><strong>{age} años</strong></p>
                                <p className="fs-6 text-secondary mb-0">{email}</p>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}
