import Calendar from 'react-calendar'
import { useRef, useEffect, useContext } from 'react'
import { SimpleContainer } from "../utils/types";
import '../theme/calendar.css'
import calendarBorder from '../utils/func/calendarBorder';
import { AppContext } from './AppContext';
import getRange from '../utils/func/getRange';
import { ReturnDayByISO } from '../utils/func/dayFuncs';
import { useHistory } from 'react-router-dom'
export function CalendarContainer({children}: SimpleContainer) {
    const { scrollValue, setScrollValue, setDay } = useContext(AppContext)   
    const range = getRange(scrollValue)
    return (
        <div className=" w-screen flex justify-center mt-3" style={{ opacity: range, display: range < 0.15 ? 'none' : 'flex'}}>
            {children}
        </div>
    )
}

export function ModifiedCalendar() {
    const { scrollValue, setScrollValue, setDay } = useContext(AppContext)
    function HandleBorderSystem() {
        const elements = document.getElementsByClassName('react-calendar__tile') as HTMLCollection;
        calendarBorder(elements)
        
    }
    useEffect(() => {
       const interval = setInterval(() => HandleBorderSystem(), 300)
       return () => clearInterval(interval) 
    }, [])
    return (
        <Calendar onClickDay={(data, e) => {
            setDay(data.toISOString());
            setScrollValue(0)
            const breakpoint = window.innerHeight / 7.2 + 24
            setScrollValue(window.innerHeight * -1 + (breakpoint + 1))
        }} 
        />
    )
}
