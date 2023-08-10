import React, { useState } from "react";
import { SimpleContainer } from "../utils/types";


type AppContextValue = {
    scrollValue: number;
    setScrollValue: React.Dispatch<React.SetStateAction<number>>;
    day: string,
    setDay: React.Dispatch<React.SetStateAction<string>>;
  };

export const AppContext = React.createContext<AppContextValue>({
    scrollValue: 0,
    setScrollValue: () => {},
    day: new Date().toISOString(),
    setDay: () => {}
})

export const ContextContainer = ({children}: SimpleContainer) => {
    const [scrollValue, setScrollValue] = useState<number>(0);
    const [day, setDay] = useState<string>(new Date().toISOString());
    return (<AppContext.Provider value={{ scrollValue, setScrollValue, day, setDay }}>
        {children}
    </AppContext.Provider>)
}