import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


import { Sidebar } from '../menu/SideBar'
import Swal from 'sweetalert2';



export const CalendarScreen = () => {


    const handleDateClick = (dateClickInfo) => {
        Swal.fire('Fecha', dateClickInfo.dateStr, 'info',)
    }

    return (
        <div>
            <Sidebar />
            <hr />
            <h2>Calendario</h2>
            <br />
            <div style={ {padding: '100px', width: '50%'} }>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                selectable={true}
                locales="es"
                buttonText={{today: 'Hoy'}}
                              
            />
            </div>
        </div>
    )
}
