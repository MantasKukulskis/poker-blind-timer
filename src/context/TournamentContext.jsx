import { createContext, useContext, useState } from "react";
import { generateBlinds } from "../utils/blindGenerator";

const TournamentContext = createContext();

export function useTournament() {
    return useContext(TournamentContext);
}

export function TournamentProvider({ children }) {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [remainingTime, setRemainingTime] = useState(0);
    const [durationPerLevel, setDurationPerLevel] = useState(60);
    const [blinds, setBlinds] = useState([]);

    const startTournament = (settings) => {
        const { duration } = settings;
        const generated = generateBlinds(settings);

        setBlinds(generated);
        setDurationPerLevel(duration);
        setCurrentLevel(1);
        setRemainingTime(duration);
        setIsRunning(true);
        setIsPaused(false);
    };

    const pauseTournament = () => setIsPaused(true);
    const resumeTournament = () => setIsPaused(false);

    const resetTournament = () => {
        setIsRunning(false);
        setIsPaused(false);
        setCurrentLevel(1);
        setRemainingTime(durationPerLevel);
        setBlinds([]);
    };

    const nextLevel = () => {
        setCurrentLevel((lvl) => {
            if (lvl < blinds.length) {
                setRemainingTime(durationPerLevel);
                return lvl + 1;
            } else {
                setIsRunning(false);
                return lvl;
            }
        });
    };

    return (
        <TournamentContext.Provider
            value={{
                isRunning,
                isPaused,
                currentLevel,
                remainingTime,
                durationPerLevel,
                blinds,
                startTournament,
                pauseTournament,
                resumeTournament,
                resetTournament,
                nextLevel,
                setRemainingTime,
            }}
        >
            {children}
        </TournamentContext.Provider>
    );
}