import React from 'react'
import { Sidebar } from '../menu/SideBar'
import { RepresentativeData } from './RepresentativeData'
import { UpdateCompany } from './UpdateCompany'

export const CompanyProfile = () => {

    
    return (
        <>
            <Sidebar />
            <div className="contenido">
                <div className="titulo_principal">
                    <div className="container">
                        <div className="row">
                            <h1>Perfil</h1>
                        </div>
                    </div>
                </div>
                <div className="datos_cuenta mb-4 pt-4">
                    <div className="container">
                        <div className="row">
                            <UpdateCompany /> 
                        </div>
                    </div>
                </div>
            
                <div className="container">
                     <RepresentativeData />
                </div>
            </div>
            
        </>
    )
}
