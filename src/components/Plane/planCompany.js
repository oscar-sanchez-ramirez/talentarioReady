import React from 'react'
import { Sidebar } from '../menu/SideBar'

export const planCompany = () => {
    return (
        <div>
            <Sidebar />
            <div className="contenido">
                <div className="titulo_principal mb-5">
                    <div className="container">
                        <div className="row">
                            <h1>Planes</h1>
                        </div>
                    </div>
                </div>
                <div className="container planes">
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div className="card shadow h-100">
                                <div className="card-header py-3">
                                    <h2 className="text-center">Plan Básico</h2>
                                </div>
                                <div className="card-body">
                                    <h3 className="text-center">Gratuito</h3>
                                    <ul>
                                        <li>Vacantes publicables: 1</li>
                                        <li>Duración de la vacante: 5 días</li>
                                        <li>Posibles candidatos: 10</li>
                                        <li>Usuarios R. H: 1</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow h-100">
                                <div className="card-header py-3">
                                    <h2 className="text-center">Plan por evento</h2>
                                </div>
                                <div className="card-body">
                                    <h3 className="text-center">$800 / vacante</h3>
                                    <ul>
                                        <li>Vacantes publicables: 10</li>
                                        <li>Duración de la vacante: 10 días</li>
                                        <li>Posibles candidatos: 10</li>
                                        <li>Videos de candidatos</li>
                                        <li>Índice de habilidades</li>
                                        <li>Búsqueda de candidatos: 10</li>
                                        <li>Gestión calendario</li>
                                        <li>Usuarios R. H: 1</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow h-100">
                                <div className="card-header py-3">
                                    <h2 className="text-center">Plan por tiempo</h2>
                                </div>
                                <div className="card-body">
                                    <h3 className="text-center">$2,000 / mes</h3>
                                    <ul>
                                        <li>Vacantes publicables: Ilimitado</li>
                                        <li>Duración de la vacante: Ilimitado</li>
                                        <li>Posibles candidatos: Ilimitado</li>
                                        <li>Videos de candidatos</li>
                                        <li>Índice de habilidades</li>
                                        <li>Ver todos los candidatos</li>
                                        <li>Búsqueda de candidatos: Ilimitado</li>
                                        <li>Gestión calendario</li>
                                        <li>Duración del plan: 1 año</li>
                                        <li>Usuarios R. H: 5</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
