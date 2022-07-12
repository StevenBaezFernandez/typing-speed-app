import { createContext, useState, useEffect } from "react";
import { randomText } from "../data/random-text";
export const SetupContext = createContext({
    minutes: 1,
    text: 'random'
});

export const SetupProvider = ({children}) => {
    const [ minutes, setMinutes ] = useState(1);
    const [ text, setText ] = useState('random');

    useEffect(() => {
        if(text === 'random'){
            setText(randomText[Math.floor(Math.random() * randomText.length)].texto);
        }
    }, [minutes, text]);

    const addText = (text) => {
        if(text === 'random'){
            setText(randomText[Math.floor(Math.random() * randomText.length)].texto);
        }else{
            setText(text);
        }
    }

    const value = {
        minutes,
        setMinutes,
        text,
        addText
    }

    return(
        <SetupContext.Provider value={value}>{children}</SetupContext.Provider>
    )
};