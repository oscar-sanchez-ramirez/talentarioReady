import React, { useEffect, useState } from 'react'
import { Sidebar } from '../menu/SideBar'
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

export const CalendarScreen = () => {


    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        document.querySelector('#calendar').click();
    }, [])


    return (
        <div>
            <Sidebar />
            <h2>Calendario</h2>
            <br />
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} id="calendar"/>
        </div>
    )
}
