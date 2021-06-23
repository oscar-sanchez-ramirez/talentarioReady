import React from 'react'

export const Loading = () => {
    return (
        <div className="body-load">
            <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow-circle"></div>
                <div className="shadow-circle"></div>
                <div className="shadow-circle"></div>
                <span>Cargando</span>
            </div>
        </div>
    )
}
