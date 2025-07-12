import { useEffect, useState, useRef } from "react";
import { useTournament } from "../context/TournamentContext";

export default function Timeout() {
    const {
        isBreak,
        breakDuration,
        setIsBreak,
        setIsPaused,
        setIsRunning,
        setRemainingTime,
        setCurrentLevel,
        durationPerLevel,
    } = useTournament();

    const [breakTimeLeft, setBreakTimeLeft] = useState(0);
    const [breakEnded, setBreakEnded] = useState(false);
    const intervalRef = useRef(null);

    // Pertraukos pradžia
    useEffect(() => {
        if (isBreak) {
            setBreakTimeLeft(breakDuration);
            setIsPaused(true);
            setBreakEnded(false);
        }
    }, [isBreak]);

    // Skaičiuojam laiką
    useEffect(() => {
        if (isBreak && intervalRef.current === null) {
            intervalRef.current = setInterval(() => {
                setBreakTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        setBreakEnded(true); // Tik čia pažymim kad baigėsi
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isBreak]);

    // Tik ČIA padarom visus setState po pertraukos
    useEffect(() => {
        if (breakEnded) {
            setIsBreak(false);
            setIsPaused(false);
            setIsRunning(true);
            setRemainingTime(durationPerLevel);
            setCurrentLevel((prevLevel) => {
                return prevLevel + 1;
            });
        }
    }, [breakEnded]);

    if (!isBreak) return null;

    const formatTime = (s) => {
        const m = String(Math.floor(s / 60)).padStart(2, "0");
        const sec = String(s % 60).padStart(2, "0");
        return `${m}:${sec}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
                <h2 className="text-2xl font-bold text-yellow-700 mb-2">Pertrauka</h2>
                <p className="text-4xl text-yellow-800 font-mono">
                    {formatTime(breakTimeLeft)}
                </p>
            </div>
        </div>
    );
}