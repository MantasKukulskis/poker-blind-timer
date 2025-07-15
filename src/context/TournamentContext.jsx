import { createContext, useContext, useState } from "react";
import { generateBlinds } from "../utils/blindGenerator";

const TournamentContext = createContext();

export function useTournament() {
    return useContext(TournamentContext);
}

export function TournamentProvider({ children }) {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [remainingTime, setRemainingTime] = useState(0);
    const [durationPerLevel, setDurationPerLevel] = useState(60);
    const [breakEvery, setBreakEvery] = useState(null);
    const [breakDuration, setBreakDuration] = useState(0);
    const [blinds, setBlinds] = useState([]);

    const startTournament = (settings) => {
        const { duration, breakEvery, breakDuration } = settings;
        const generated = generateBlinds(settings);

        setBlinds(generated);
        setDurationPerLevel(duration);
        setRemainingTime(duration);
        setBreakEvery(breakEvery);
        setBreakDuration(breakDuration);
        setCurrentLevel(1);
        setIsRunning(true);
        setIsPaused(false);
        setIsBreak(false);
    };

    const pauseTournament = () => setIsPaused(true);
    const resumeTournament = () => setIsPaused(false);

    const resetTournament = () => {
        setIsRunning(false);
        setIsPaused(false);
        setIsBreak(false);
        setCurrentLevel(1);
        setRemainingTime(durationPerLevel);
        setBlinds([]);
    };

    const nextLevel = (levelNumber) => {
        const shouldBreak = breakEvery && levelNumber > 0 && levelNumber % breakEvery === 0;

        console.log("🧩 nextLevel į:", levelNumber + 1, "| shouldBreak:", shouldBreak);

        if (shouldBreak) {
            setIsBreak(true);
        } else {
            setRemainingTime(durationPerLevel);
        }

        return shouldBreak;
    };

    return (
        <TournamentContext.Provider
            value={{
                isRunning,
                isPaused,
                isBreak,
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
                breakEvery,
                breakDuration,
                setIsBreak,
                setIsPaused,
                setIsRunning,
                setCurrentLevel,
            }}
        >
            {children}
        </TournamentContext.Provider>
    );
}