import { useEffect, useRef } from "react";
import { useTournament } from "../context/TournamentContext";

export default function Timer() {
    const {
        isRunning,
        isPaused,
        remainingTime,
        setRemainingTime,
        nextLevel,
    } = useTournament();

    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning && !isPaused && intervalRef.current === null) {
            intervalRef.current = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        nextLevel();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        if ((!isRunning || isPaused) && intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning, isPaused]);

    const formatTime = (s) => {
        const m = String(Math.floor(s / 60)).padStart(2, "0");
        const sec = String(s % 60).padStart(2, "0");
        return `${m}:${sec}`;
    };

    return (
        <div className="text-center mt-6">
            <h2 className="text-xl font-bold mb-2">Lygis</h2>
            <p className="text-4xl font-mono text-blue-700">{formatTime(remainingTime)}</p>
        </div>
    );
}