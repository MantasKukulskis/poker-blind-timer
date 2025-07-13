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
        currentLevel,
    } = useTournament();

    const [breakTimeLeft, setBreakTimeLeft] = useState(0);
    const [breakEnded, setBreakEnded] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isBreak) {
            setBreakTimeLeft(breakDuration);
            setIsPaused(true);
            setBreakEnded(false);
        }
    }, [isBreak]);

    useEffect(() => {
        if (isBreak && intervalRef.current === null) {
            intervalRef.current = setInterval(() => {
                setBreakTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        setBreakEnded(true);
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

    useEffect(() => {
        if (breakEnded) {
            setIsBreak(false);
            setIsPaused(false);
            setIsRunning(true);
            setRemainingTime(durationPerLevel);
            setCurrentLevel((prevLevel) => prevLevel + 1);
        }
    }, [breakEnded]);

    if (!isBreak) return null;

    const formatTime = (s) => {
        const m = String(Math.floor(s / 60)).padStart(2, "0");
        const sec = String(s % 60).padStart(2, "0");
        return `${m}:${sec}`;
    };

    return (
        <div
            className="fixed inset-0 bg-gradient-to-br from-green-900 via-gray-900 to-black z-50 flex items-center justify-center animate-fade-in"
        >
            <div className="bg-black bg-opacity-70 border-4 border-yellow-500 p-12 rounded-3xl shadow-2xl text-center transform transition-transform duration-500 animate-scale-up w-[90%] max-w-4xl">
                <h2 className="text-5xl font-extrabold text-yellow-400 mb-8 uppercase tracking-wider">Poilsio Pertrauka</h2>
                <p className="text-[7rem] font-mono font-bold text-yellow-200 mb-6">
                    {formatTime(breakTimeLeft)}
                </p>
                <p className="text-2xl text-yellow-100 font-semibold">
                    Po pertraukos – prasidės <span className="text-yellow-300">{currentLevel + 1}</span> lygis
                </p>
            </div>
        </div>
    );
}