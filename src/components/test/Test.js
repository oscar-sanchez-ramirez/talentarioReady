import React from 'react'
import { Sidebar } from '../menu/SideBar'
import { SelfRecognition } from './SelfRecognition'

export const Test = () => {
    return (
        <div>
            <Sidebar />
            <hr />
            <h3>Evaluación de Talentos</h3>
            <SelfRecognition />
        </div>
    )
}
