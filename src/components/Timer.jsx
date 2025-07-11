import { useEffect } from "react";
import { useTournament } from "../context/TournamentContext";

export default function Timer() {
    const {
        isRunning,
        setIsRunning,
        remainingTime,
        setRemainingTime,
        nextLevel,
        currentLevel,
        blinds,
    } = useTournament();

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    nextLevel();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning]);

    // Sekundžių formatavimas į MM:SS
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const currentBlind = blinds.find((b) => b.level === currentLevel);

    return (
        <div className="text-center mt-6">
            <h2 className="text-2xl font-bold mb-2">Lygis {currentLevel}</h2>
            {currentBlind && (
                <p className="text-lg mb-4 text-gray-700">
                    {currentBlind.sb} / {currentBlind.bb}
                </p>
            )}
            <div className="text-4xl font-mono mb-4 text-blue-800">
                {formatTime(remainingTime)}
            </div>
            <button
                onClick={() => setIsRunning((prev) => !prev)}
                className="px-6 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
            >
                {isRunning ? "Pause" : "Resume"}
            </button>
        </div>
    );
}