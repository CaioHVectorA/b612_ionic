import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from './AppContext'
import getRange from '../utils/func/getRange'
const breakpoint = window.innerHeight / 7.2 + 24
export default function DrawerSlider({isCalendar = false}: {isCalendar?: boolean}) {
    const { scrollValue, setScrollValue } = useContext(AppContext)
    const [prevValue,setValue] = useState(scrollValue)
    const [transitionValue, setTransition] = useState<string>('0.1s')
    const divisionPoint = getRange(scrollValue) > 0.15 
    function handleTouch(e: any) {
        setTransition('0s')
        if (scrollValue + window.innerHeight > breakpoint) {
            setScrollValue(e.changedTouches[0].pageY - window.innerHeight)
        } else {
            setScrollValue(window.innerHeight * -1 + (breakpoint + 1))
        }
    }
    function handleLeave(e: any) {
        setTransition('0.3s')
        if (scrollValue * -1 > window.innerHeight / 2 || scrollValue - 300 < prevValue) {
            setScrollValue(window.innerHeight * -1 + (breakpoint + 1))
        } else {
            setScrollValue(0)
        }
        setValue(scrollValue)
    }
    useEffect(() => {
        if (divisionPoint) {
            setTransition('0.5s')
            setScrollValue(0)
        }
    }, [divisionPoint])
    return (
        <div className={divisionPoint ? `fixed ${isCalendar ? 'bottom-2 py-5' : 'bottom-4 py-12'} w-screen flex justify-center items-center` : 'py-4 w-screen flex justify-center items-center'}  onTouchMove={handleTouch} onTouchEnd={handleLeave} style={{transform: divisionPoint ? `translate(0%,${scrollValue}px)` : 'translate(0px,0px)', transition: transitionValue}}>
            <div className={divisionPoint ?  'rounded-full h-4 w-1/3 bg-black opacity-40 ' : 'rounded-full h-2 w-1/3 mx-auto bg-white opacity-70'} />
        </div>
    )
} 