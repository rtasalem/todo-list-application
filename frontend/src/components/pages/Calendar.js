import './Calendar.css';
import  React, { useState , useEffect } from 'react'

const Calendar = () => {

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    
      const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
      const [selectedDate, setSelectedDate] = useState(null);
    
      const goToPreviousMonth = () => {
        setCurrentMonthIndex((prevIndex) => (prevIndex - 1 + 12) % 12);
      };
    
      const goToNextMonth = () => {
        setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % 12);
      };
    
      const currentYear = new Date().getFullYear();
      const currentMonth = months[currentMonthIndex];
    
      const handleDateClick = (day) => {
        setSelectedDate(day);
      };
    
      const lastDayOfMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    
      const daysInMonth = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    });

    return(
        <div className="calendar-container">
            <div className="month">
                <ul>
                <li className="prev" onClick={goToPreviousMonth}>&#10094;</li>
                <li className="next" onClick={goToNextMonth}>&#10095;</li>
                <li>{`${currentMonth} ${currentYear}`}</li>
                </ul>
            </div>

            <ul className="weekdays">
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
                <li>Sun</li>
            </ul>

            <ul className="days">
        {daysInMonth.map(day => (
            <li
            key={day}
            className={`${
                selectedDate === day ? 'active' : ''
            } ${day >= 1 && day <= 5 ? 'mon-fri' : ''}`}
            onClick={() => handleDateClick(day)}
            >
            {day}
            </li>
        ))}
        </ul>

            </div>
    );
};

export default Calendar;
