import React, { useState } from "react";
import { SimpleContainer } from "../utils/types";

type AppContextValue = {
    scrollValue: number;
    setScrollValue: React.Dispatch<React.SetStateAction<number>>;
    day: string,
    setDay: React.Dispatch<React.SetStateAction<string>>;
    turma: number;
    setTurma: React.Dispatch<React.SetStateAction<number>>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
  };

export const AppContext = React.createContext<AppContextValue>({
    scrollValue: 0,
    setScrollValue: () => {},
    day: new Date().toISOString(),
    setDay: () => {},
    turma: 0,
    setTurma: () => {},
    name: '',
    setName: () => {}
})

export const ContextContainer = ({children}: SimpleContainer) => {
    const [scrollValue, setScrollValue] = useState<number>(0);
    const [day, setDay] = useState<string>(new Date().toISOString());
    const [turma, setTurma] = useState<number>(0)
    const [name, setName] = useState<string>('')
    return (<AppContext.Provider value={{ scrollValue, setScrollValue, day, setDay, turma, setTurma, name, setName}}>
        {children}
    </AppContext.Provider>)
}