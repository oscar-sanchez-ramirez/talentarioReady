import React from 'react'
import { useSelector } from 'react-redux'
import { Sidebar } from './SideBar'

export const ProfileScreen = () => {

    const   { name, fullName }   = useSelector(state => state.user);
    console.log(name);

    return (
        <>
            <Sidebar />
            <hr />
            <div>
                <h1>Profile</h1>
                { name } 
                <br />
                { fullName }
            </div>
        </>
    )
}
