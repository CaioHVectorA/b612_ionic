import React, { useState } from "react";
import { SimpleContainer } from "../utils/types";


type AppContextValue = {
    scrollValue: number;
    setScrollValue: React.Dispatch<React.SetStateAction<number>>;
    day: string,
    setDay: React.Dispatch<React.SetStateAction<string>>;
    turma: number;
    setTurma: React.Dispatch<React.SetStateAction<number>>;
  };

export const AppContext = React.createContext<AppContextValue>({
    scrollValue: 0,
    setScrollValue: () => {},
    day: new Date().toISOString(),
    setDay: () => {},
    turma: 3002,
    setTurma: () => {},
})

export const ContextContainer = ({children}: SimpleContainer) => {
    const [scrollValue, setScrollValue] = useState<number>(0);
    const [day, setDay] = useState<string>(new Date().toISOString());
    const [turma, setTurma] = useState<number>(3002)
    return (<AppContext.Provider value={{ scrollValue, setScrollValue, day, setDay, turma, setTurma }}>
        {children}
    </AppContext.Provider>)
}