import Calendar from 'react-calendar'
import { useRef, useEffect, useContext } from 'react'
import { SimpleContainer } from "../utils/types";
import '../theme/calendar.css'
import calendarBorder from '../utils/func/calendarBorder';
import { AppContext } from './AppContext';
import getRange from '../utils/func/getRange';
export function CalendarContainer({children}: SimpleContainer) {
    const { scrollValue, setScrollValue } = useContext(AppContext)   
    const range = getRange(scrollValue)
    return (
        <div className=" w-screen flex justify-center mt-3" style={{ opacity: range, display: range < 0.15 ? 'none' : 'flex' }}>
            {children}
        </div>
    )
}

export function ModifiedCalendar() {
    function HandleBorderSystem() {
        const elements = document.getElementsByClassName('react-calendar__tile') as HTMLCollection;
        calendarBorder(elements)
        
    }
    useEffect(HandleBorderSystem, [])
    return (
        <Calendar onClickDay={HandleBorderSystem} />
    )
}
