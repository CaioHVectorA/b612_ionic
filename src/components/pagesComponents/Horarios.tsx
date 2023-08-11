import { useContext, useEffect, useState } from "react";
import getRange from "../../utils/func/getRange";
import { AppContext } from "../AppContext";
import { ColumnContainer } from "../styled/container";
import { ReturnDayByISO, ReturnMonthByISO, arrayDateNums, months, weekDays } from "../../utils/func/dayFuncs";
import days from '../DaysBackend.json'
import { SimpleContainer } from "../../utils/types";
import { LOGO } from "../../utils/assets";
type _Horario = {
    Materia: string,
    Prof: string | null,
    Sala: number | null | string,
    Horario: string,
}
function HorariosContainer({children}: SimpleContainer) {
    return (
        <ColumnContainer className="gap-3 w-screen px-6 bg-light rounded-2xl py-6 -z-20">
            {children}
        </ColumnContainer>
    )

}
function Horario({Horario, Materia, Prof, Sala}: _Horario) {
    const [active, setActive] = useState(false)
    return (
            <ColumnContainer>
                <div onClick={() => console.log('NAO TA ATIVANDO !!!')} className=" bg-dark flex justify-around rounded-2xl p-3 items-center text-white">
                    <img src={LOGO} className=" w-16"/>
                    <h3 className=" text-3xl">{Materia}</h3>
                </div>
                <div className={` bg-darkest flex transition-all justify-between rounded-2xl relative ${active ? "bottom-6" : "bottom-24"} -z-10 text-white p-6 pt-10`}>
                    <div className={` absolute w-0.5 h-full bg-bg bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 ${active ? 'opacity-25' : 'opacity-0'} `}/>
                    <ColumnContainer>
                    <div className=" flex gap-2">
                        <p>Professor: </p>
                        <span className=" text-secondary">{Prof ? Prof : 'Nenhum'}</span>
                    </div>
                    <div className=" flex gap-2">
                    <p>{Horario}</p>
                     <span> | {Sala ? Sala : 'Convivência'}</span>
                    </div>
                    </ColumnContainer>
                    <p className=" text-secondary text-end">dasdaddasdad dasdaddasdad</p>
                </div>
            </ColumnContainer>
    )
}


export default function Horarios() {
    const { scrollValue, setScrollValue, day, setDay } = useContext(AppContext)
    const [sampleDay, setSample] = useState(day)
    const [numbers, setNumbers] = useState<number[]>(arrayDateNums(sampleDay))
    
    function HandleSetNumber(num: number) {
        const data = new Date(sampleDay)
        data.setDate(data.getDate() + num)
        setSample(data.toISOString())
        setNumbers(arrayDateNums(data.toISOString()))
    }
    useEffect(() => {
        setSample(day)
        setNumbers(arrayDateNums(new Date(day).toISOString()))
    }, [day])
    const Rotina = () => {
            const day = days.find(day => day.Dia === weekDays[ReturnDayByISO(sampleDay)])
            if (day) {
                const tempos = day.Turmas.find(turma => turma.Ref === 3002) // depois mudar pra turma em questão etc etc
                return (
                    <>
                        <HorariosContainer>
                            {tempos?.Tempos.map(item => (
                                    <Horario Horario={item.Horario} Materia={item.Materia} Prof={item.Prof} Sala={item.Sala} key={JSON.stringify(item)} />
                                    ))}
                        </HorariosContainer>
                    </>
                )
            }
            return <h1>Hoje não há aula, aproveite o seu dia!</h1>
        }
    if (getRange(scrollValue) > 0.15) return;
    return (
        <ColumnContainer className=" items-center my-6" style={{paddingTop:  `${(window.innerHeight / 6 + scrollValue / 12) + 72}px`}}>
            <div className=" grid-numbers px-2 w-screen mb-2">
                {numbers.map((item: number, index) => (
                    <h3 onClick={() => HandleSetNumber(index - 2)} className={` w-8 text-2xl kufam ${index === 2 && ' text-2xl text-dark'}`} key={item}>{item.toString()}</h3>
                    ))}
            </div>
            <h3>{weekDays[ReturnDayByISO(sampleDay)]}, {months[ReturnMonthByISO(sampleDay)]}</h3>
            <div className=" w-11/12 rounded-full mx-auto px-6 bg-black h-0.5 opacity-30 mt-4"/>
            <Rotina />
        </ColumnContainer>
    )
}