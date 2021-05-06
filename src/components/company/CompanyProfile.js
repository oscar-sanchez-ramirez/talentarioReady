import React from 'react'
import { Sidebar } from '../menu/SideBar'
import { RepresentativeData } from './RepresentativeData'
import { UpdateCompany } from './UpdateCompany'

export const CompanyProfile = () => {

    
    return (
        <div>
            <Sidebar />
            <hr />
            <h2>Perfil</h2>
            <UpdateCompany />
            <hr />
            <RepresentativeData />
        </div>
    )
}
