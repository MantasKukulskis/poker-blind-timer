import { createContext, useContext, useState } from "react";
import { generateBlinds } from "../utils/blindGenerator";

const TournamentContext = createContext();

export function useTournament() {
    return useContext(TournamentContext);
}

export function TournamentProvider({ children }) {
    const [isRunning, setIsRunning] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [remainingTime, setRemainingTime] = useState(0); // sekundėmis
    const [durationPerLevel, setDurationPerLevel] = useState(0);
    const [blinds, setBlinds] = useState([]);

    const startTournament = (settings) => {
        const generated = generateBlinds(settings);
        setBlinds(generated);
        setDurationPerLevel(settings.duration);
        setRemainingTime(settings.duration);
        setCurrentLevel(1);
        setIsRunning(true);
    };

    const resetTournament = () => {
        setIsRunning(false);
        setCurrentLevel(1);
        setRemainingTime(durationPerLevel);
    };

    const nextLevel = () => {
        if (currentLevel < blinds.length) {
            setCurrentLevel((lvl) => lvl + 1);
            setRemainingTime(durationPerLevel);
        } else {
            setIsRunning(false);
        }
    };

    return (
        <TournamentContext.Provider
            value={{
                isRunning,
                setIsRunning,
                currentLevel,
                remainingTime,
                setRemainingTime,
                durationPerLevel,
                blinds,
                startTournament,
                resetTournament,
                nextLevel,
            }}
        >
            {children}
        </TournamentContext.Provider>
    );
}