import { useContext, useEffect, useState } from "react"
import { URL } from "../utils/envariables"
import axios, {AxiosPromise} from "axios"
import { AppContext } from "../components/AppContext";
import { IonContent, IonPage } from "@ionic/react";
import { ReturnDayByISO } from "../utils/func/dayFuncs";
import { Horario } from "../components/pagesComponents/Horarios";
const Rotina = ({ horariosData,sampleDay }: { sampleDay: string, horariosData: T_Horario[][] }) => {
    return (
      <div className="flex flex-col py-6 mx-0">
          {horariosData.length > 0 &&
          ReturnDayByISO(sampleDay) - 1 !== -1 &&
          ReturnDayByISO(sampleDay) !== 6 ? (
            <>
              {horariosData[ReturnDayByISO(sampleDay) - 1].map(
                (item: T_Horario | null, index) => (
                  <>
                    {item ? (
                      <>
                        {item.tempo.isBreak ? (
                          <>
                            {/* <div
                              key={index}
                              className={` w-screen px-6 h-9 break_horario self-center  ${
                                index === 2 &&
                                !!!horariosData[
                                  ReturnDayByISO(sampleDay) - 1
                                ][0]
                                  ? "next-mt"
                                  : ""
                              }`}
                            >
                              <div
                                key={index}
                                className={` bg-dark flex px-6 justify-center gap-6 py-3 items-center text-zinc-50 py-2  ${
                                  (index === 2 &&
                                    !!!horariosData[
                                      ReturnDayByISO(sampleDay) - 1
                                    ][0]) ||
                                  index === 0
                                    ? "bottom-4"
                                    : "bottom-16"
                                } relative`}
                              >
                                <p className=" text-3xl">
                                  {item.tempo.materia}
                                </p>
                                <p className=" text-xl">{item.tempo.horario}</p>
                              </div>
                            </div> */}
                          </>
                        ) : (
                          <Horario
                            index={index}
                            Horario={item.tempo.horario}
                            //  @ts-ignore
                            Sala={item.tempo.sala}
                            Materia={item.tempo.materia}
                            //  @ts-ignore
                            Prof={item.tempo.professor}
                            key={item.tempo.horario}
                          />
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )
              )}
            </>
          ) : (
            <div className=" w-full items-center gap-6 flex flex-col text-center">
              <h1 className=" text-3xl font-bold">Hoje não há aula!</h1>
              <h3>Aproveite o seu dia! {":)"}</h3>
              <img src="/free_il.png" />
            </div>
          )}
          {horariosData.length === 0 && <h1>Carregando...</h1>}
      </div>
    );
  };
type T_Horario = {
    tempo: {
      horario: string;
      materia: string;
      professor: string;
      sala: string;
      isBreak: boolean;
    };
    turma: string;
  };
  type indexes = {start: number, end: number}
export default function AllHorarios() {
    const [allHorarios, setAllHorarios] = useState<T_Horario[][][] | null>(null)
    const [indexes, setIndexes] = useState<{start: number, end: number}>({end: 4, start: 0})
    const { day } = useContext(AppContext)
    useEffect(() => {
        let arrPromises: AxiosPromise[] = []
        for (let x = 1; x <= 3; x++) {
            for (let y = 1; y <= 4; y++) {
                console.log('URL'+'/horario/'+`${x}00${y}`)
                arrPromises.push(axios(URL+'/horario/'+`${x}00${y}`))
            }
        }
        Promise.all(arrPromises).then(data => {
            setAllHorarios(data.map(d => {
                return d.data
            }))
        })
    }, [])
    // console.log(allHorarios.slice(0))
    const indexesData: {
        text: string,
        index: indexes
        }[] = [
            {
                index: {end: 4,start: 0},
                text: "1° Ano",
            },
            {
                index: {end: 8,start: 4},
                text: "2° Ano",
            },
            {
                index: {end: 12,start: 8},
                text: "3° Ano",
            },
        ]
    return (
        <IonPage>
            <IonContent fullscreen>
                <div style={{zIndex: '999999'}} className="max-md:fixed max-md:top-0 max-md:bg-white">
                    <ul className=" flex gap-8  w-screen justify-center mt-8">
                        {indexesData.map(data => <li className=" text-2xl cursor-pointer" onClick={() => setIndexes(data.index)}>{data.text}</li>)}
                    </ul>
                    <hr />
                </div>
            <div className="flex flex-wrap gap-3 justify-center w-screen">
                {allHorarios && (
                    <>
                        {allHorarios.slice(indexes.start,indexes.end).map(horario => (
                            <div className=" w-72 mt-2">
                                <h1 className=" text-center text-3xl">{horario[0][0].turma}</h1>
                                <Rotina horariosData={horario} sampleDay={day} />
                            </div>
                            ))}
                    </>
                )}
            </div>
            </IonContent>
        </IonPage>
    )
}