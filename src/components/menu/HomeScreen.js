import React from 'react'
// import { useFetch } from '../../hooks/useFetch'
import { Sidebar } from './SideBar'

export const HomeScreen = () => {

    // const state = useFetch(`https://us-central1-talentario-a3d9a.cloudfunctions.net/api/user/t0mH5L55oBgsWa6raawwBNu6U3k2`,
    //     {
    //         mode: 'cors',
	//         headers: {
    //         	'Access-Control-Allow-Origin': '*',
    //     	}
    //     });
    // console.log(state)

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
