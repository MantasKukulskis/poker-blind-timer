import { useEffect } from "react";
import { useTournament } from "../context/TournamentContext";

export default function Break() {
    const {
        breakDuration,
        setIsBreak,
        setRemainingTime,
        setCurrentLevel,
        currentLevel,
        durationPerLevel,
    } = useTournament();

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log("⏰ Break.jsx | Laikas baigėsi — pereinam į kitą lygį");
            setIsBreak(false);
            setRemainingTime(durationPerLevel);
            setCurrentLevel(currentLevel + 1);
        }, breakDuration * 1000); // sekundės

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="text-center mt-10 text-white text-3xl font-bold">
            <p>💤 Pertrauka</p>
            <p>Po jos prasidės lygis {currentLevel + 1}</p>
        </div>
    );
}