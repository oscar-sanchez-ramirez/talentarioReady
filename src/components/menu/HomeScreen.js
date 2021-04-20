import React from 'react'
import { Sidebar } from './SideBar'

export const HomeScreen = () => {

    // const newUser = async () => {

    //     const url = 'https//us-central1-talentario-a3d9a.cloudfunctions.net/api/user/3uSyUb81m3gYbjtQMobixPBaVRy1';
    //     // const resp = await fetch( url );
    //     const resp = await fetch(url,
    //         {
    //             'mode': 'no-cors',
    //             'headers': {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //                 'Access-Control-Allow-Origin': '*'
    //             }
    //         });

    //     const data = await resp;
    //     console.log(data);

    // }

    // newUser();

    return (
        <>
            <Sidebar />
            <hr />
            <div>
                <h1>Home</h1>
            </div>

        </>
    )
}
