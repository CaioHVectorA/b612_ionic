import { useContext, useEffect, useState, useRef } from "react";
import getRange from "../../utils/func/getRange";
import { AppContext } from "../AppContext";
import { ColumnContainer } from "../styled/container";
import { error } from 'veclog'
import "../styled/horarios.css";
import {
  ReturnDayByISO,
  ReturnMonthByISO,
  arrayDateNums,
  months,
  weekDays,
} from "../../utils/func/dayFuncs";
import days from "../DaysBackend.json";
import { SimpleContainer } from "../../utils/types";
import { LOGO } from "../../utils/assets";
import { LOCAL_STORAGE, URL } from "../../utils/envariables";
import getMateriaImg from "../../utils/func/getMateriaImg";
type _Horario = {
  Materia: string;
  Prof: string | null;
  Sala: number | null | string;
  Horario: string;
  index: number;
};
function HorariosContainer({ children }: SimpleContainer) {
  return (
    <ColumnContainer className=" w-screen px-6 bg-light rounded-2xl py-6 -z-20">
      {children}
    </ColumnContainer>
  );
}
function Horario({ Horario, Materia, Prof, Sala, index }: _Horario) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  return (
    <ColumnContainer className=" z-50">
      <div
        onClick={() => setActive(!active)}
        ref={ref}
        className=" bg-dark flex justify-around rounded-2xl p-3 items-center text-white"
      >
        <img src={getMateriaImg(Materia)} className=" w-20 object-cover" />
        <h3 className=" text-3xl">{Materia}</h3>
      </div>
      <div
        className={` bg-darkest ${
          !active && "horario"
        } flex transition-all justify-between rounded-2xl relative ${
          active ? "bottom-6" : "bottom-24 shadow-2xl"
        } -z-10 text-white p-6 pt-10`}
        // style={{ marginBottom: !active && !isIndex ? "-70px" : "0px" }}
      >
        <ColumnContainer className=" w-full items-center">
          <div className=" flex gap-2">
            <p>{`Professor (a): `}</p>
            <span className=" text-secondary">{Prof ? Prof : "Nenhum"}</span>
          </div>
          <div className=" flex gap-2">
            <p>{Horario}</p>
            <span>| {Sala ? Sala : "Convivência"}</span>
          </div>
        </ColumnContainer>
      </div>
    </ColumnContainer>
  );
}
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
export default function Horarios() {
  const { scrollValue, setScrollValue, day, setDay } = useContext(AppContext);
  const [sampleDay, setSample] = useState(day);
  const [numbers, setNumbers] = useState<number[]>(arrayDateNums(sampleDay));
  //@ts-ignore
  const [horariosData, setHorarios] = useState<T_Horario[][]>(JSON.parse(localStorage.getItem(LOCAL_STORAGE.HORARIOS_DATA)) || []);
  const { turma } = useContext(AppContext);
  function HandleSetNumber(num: number) {
    const data = new Date(sampleDay);
    data.setDate(data.getDate() + num);
    setSample(data.toISOString());
    setNumbers(arrayDateNums(data.toISOString()));
  }
  useEffect(() => {
    setSample(day);
    fetch(URL + "/horario/" + turma)
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem(LOCAL_STORAGE.HORARIOS_DATA, JSON.stringify(data))    
        setHorarios(data);
      }).catch(err => error(err, false))
    setNumbers(arrayDateNums(new Date(day).toISOString()));
  }, [day]);
  const Rotina = () => {
      return (
        <>
          <HorariosContainer>
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
                              <div
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
                                  className={` bg-main flex flex-col items-center text-zinc-50 py-2  ${
                                    (index === 2 &&
                                      !!!horariosData[
                                        ReturnDayByISO(sampleDay) - 1
                                      ][0]) ||
                                    index === 0
                                      ? "bottom-4"
                                      : "bottom-16"
                                  } relative`}
                                >
                                  <p>{item.tempo.materia}</p>
                                  <p>{item.tempo.horario}</p>
                                </div>
                              </div>
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
                  ),
                )}
              </>
            ) : (
              <div className=" w-full items-center gap-6 flex flex-col text-center">
              <h1 className=" text-3xl font-bold">Hoje não há aula!</h1>
              <h3>Aproveite o seu dia! {':)'}</h3>
              <img src="/free_il.png"/>
              </div>
            )}
            {horariosData.length === 0 && <h1>Carregando...</h1>}
          </HorariosContainer>
        </>
      );
  };
  if (getRange(scrollValue) > 0.15) return;
  return (
    <ColumnContainer
      className=" items-center my-6 -z-50 bg-dark"
      style={{
        paddingTop: `${window.innerHeight / 6 + scrollValue / 12 + 72}px`,
      }}
    >
      <div className=" grid-numbers items-center px-2 w-screen mb-2">
        {numbers.map((item: number, index) => (
          <h3
            onClick={() => HandleSetNumber(index - 2)}
            className={` w-8 text-white kufam ${
              index === 2 ? " text-2xl text-main" : "text-md"
            }`}
            key={item}
          >
            {item.toString()}
          </h3>
        ))}
      </div>
      <h3 className=" text-white">
        {weekDays[ReturnDayByISO(sampleDay)]},{" "}
        {months[ReturnMonthByISO(sampleDay)]}
      </h3>
      <div className=" w-11/12 rounded-full mx-auto px-6 bg-black h-0.5 opacity-30 mt-4" />
      <Rotina />
    </ColumnContainer>
  );
}
