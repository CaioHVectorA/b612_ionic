import { useContext, useState } from "react";
import getRange from "../../utils/func/getRange";
import { AppContext } from "../AppContext";
import { ColumnContainer } from "../styled/container";
import { ReturnDayByISO, ReturnMonthByISO, arrayDateNums, months, weekDays } from "../../utils/func/dayFuncs";
import days from '../DaysBackend.json'





export default function Horarios() {
    const { scrollValue, setScrollValue, day, setDay } = useContext(AppContext)
    const [sampleDay, setSample] = useState(day)
    const [numbers, setNumbers] = useState<number[]>(arrayDateNums(sampleDay))
    
    function HandleSetNumber(num: number) {
        const data = new Date(sampleDay)
        data.setDate(data.getDate() + num)
        console.log(num, data.toISOString())
        setSample(data.toISOString())
        setNumbers(arrayDateNums(data.toISOString()))
    }
        const Rotina = () => {
            const day = days.find(day => day.Dia === weekDays[ReturnDayByISO(sampleDay)])
            console.log(day, weekDays[ReturnDayByISO(sampleDay)])
            if (day) {
                const tempos = day.Turmas.find(turma => turma.Ref === 3002) // depois mudar pra turma em questão etc etc
                return (
                    <>
                        {tempos?.Tempos.map(item => (
                            <pre>{JSON.stringify(item, null, 2)}</pre>
                        ))}
                    </>
                )
            }
            return <h1>Hoje não há aula, aproveite o seu dia!</h1>
        }
    if (getRange(scrollValue) > 0.15) return;
    return (
        <ColumnContainer className=" items-center  my-6">
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