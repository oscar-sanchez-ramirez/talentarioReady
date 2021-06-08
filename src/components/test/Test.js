import React from 'react'
import { Sidebar } from '../menu/SideBar'
import { SelfRecognition } from './SelfRecognition'

export const Test = () => {
    return (
        <>
            <Sidebar />
            <div className="contenido">            
                <div className="titulo_principal">
                    <div className="container">
                        <div className="row">
                            <h1>Evaluación de Talentos</h1>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            
                            <SelfRecognition />
                                
                        </div>                        
                    </div>
                </div>                
            </div>
        </>
    )
}
