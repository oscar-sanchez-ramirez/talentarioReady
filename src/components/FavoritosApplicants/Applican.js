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
        <div>
            {
                (status === 0) && (
                    <div>
                        <img src={image}  alt={name} width="100px"/>
                        <p>{name}</p>
                        <p>{fullName}</p>
                        <p>{age}</p>
                        <p>{email}</p>
                    </div>
                )
            }

        </div>
    )
}
