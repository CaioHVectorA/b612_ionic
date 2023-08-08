import React, { useState } from "react";
import { SimpleContainer } from "../utils/types";


type AppContextValue = {
    scrollValue: number;
    setScrollValue: React.Dispatch<React.SetStateAction<number>>;
  };

export const AppContext = React.createContext<AppContextValue>({
    scrollValue: 0,
    setScrollValue: () => {},
})

export const ContextContainer = ({children}: SimpleContainer) => {
    const [scrollValue, setScrollValue] = useState<number>(0);
    return (<AppContext.Provider value={{ scrollValue, setScrollValue }}>
        {children}
    </AppContext.Provider>)
}