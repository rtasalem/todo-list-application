import './Calendar.css';
import  React, { useState , useEffect } from 'react'

const Calendar = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    });

    return(
        <h1>
        <div className='date-time-box'>
            <p className='time'>{date.toLocaleTimeString()}</p>
            <p className='date'>{date.toLocaleDateString()}</p>
        </div>
        </h1>
    )
}

export default Calendar;
