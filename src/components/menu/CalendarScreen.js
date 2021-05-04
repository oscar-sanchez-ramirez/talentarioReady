import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { formatDate } from '@fullcalendar/react'


import { Sidebar } from '../menu/SideBar'
import Swal from 'sweetalert2';



export const CalendarScreen = () => {

    const [evento, setEvento] = useState([])
    console.log(evento)

    const [count, setCount] = useState(0);

    const dateFormat = (fecha) =>{
        let str = formatDate(fecha, {
            month: 'long',
            year: 'numeric',
            day: 'numeric',
            // timeZoneName: 'short',
            // timeZone: 'UTC',
            locale: 'es'
        })
        return str;
    }

    const handleDateClick = async (dateClickInfo) => {
        let str = formatDate(dateClickInfo.dateStr, {
            month: 'long',
            year: 'numeric',
            day: 'numeric',
            // timeZoneName: 'short',
            // timeZone: 'UTC',
            locale: 'es'
        })

        const { value: texto } = await Swal.fire({
            title: 'Título de la cita',
            input: 'text',
            inputValue: '',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Necesitas escribir un título!'
                }
            }
        })

        if (texto) {
            Swal.fire({
                icon: 'success',
                // title: 'La cita se guardó correctamente',
                text: `Titulo: ${texto}, Fecha: ${str}`,
                timer: 3000,
                timerProgressBar: true,
            })
            setCount(count + 1);
            setEvento([
                ...evento,
                { id: count, title: texto, date: dateClickInfo.dateStr }
            ])
        }

    }


    const handleEventClick = (clickInfo) => {
        const getEventsByPositionName = (id) => evento.filter(eventPosition => eventPosition.id !== id);
        const id = parseInt(clickInfo.event.id)
        const eventoUpdate = getEventsByPositionName(id)

        Swal.fire({
            title: `¿Estás seguro de borrar?`,
            text: 'Se eliminara: '+clickInfo.event.title,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clickInfo.event.remove()
                setEvento(eventoUpdate);
            }
        })

    }



    return (
        <div>
            <Sidebar />
            <hr />
            <h2>Calendario</h2>
            <br />
            <div style={{ padding: '100px', width: '70%' }}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}

                    initialView="dayGridMonth"
                    dateClick={handleDateClick}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    locales="es"
                    buttonText={{ today: 'Hoy' }}
                    events={evento}
                    eventClick={handleEventClick}

                />
            </div>
            <ul>
                {
                    evento.map( (item,index) =>  (
                        <li key={index}>Título:{ item.title }, Fecha:{ dateFormat(item.date) }</li>
                    ))
                }
            </ul>
            <br />
            <br />

        </div>
    )
}
