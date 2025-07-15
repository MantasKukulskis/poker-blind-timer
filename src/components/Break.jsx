import { useEffect, useState, useRef } from "react";
import { useTournament } from "../context/TournamentContext";

export default function Break() {
    const {
        breakDuration,
        setIsBreak,
        setRemainingTime,
        setCurrentLevel,
        currentLevel,
        durationPerLevel,
        blinds,
    } = useTournament();

    const [timeLeft, setTimeLeft] = useState(breakDuration);
    const [breakStarted, setBreakStarted] = useState(false);
    const intervalRef = useRef(null);
    const hasEndedRef = useRef(false);

    useEffect(() => {
        if (!breakStarted) {
            const audio = new Audio("/audio/break_start.mp3");
            audio.play().catch(() => { });
            setBreakStarted(true);
        }
    }, [breakStarted]);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (timeLeft === 0 && !hasEndedRef.current) {
            hasEndedRef.current = true;
            handleEndBreak(true);
        }
    }, [timeLeft]);

    const handleEndBreak = (auto = false) => {
        clearInterval(intervalRef.current);
        setIsBreak(false);
        setRemainingTime(durationPerLevel);
        setCurrentLevel((prev) => prev + 1);

        if (auto) {
            const audio = new Audio("/audio/break_end.mp3");
            audio.play().catch(() => { });
        }
    };

    const formatTime = (s) => {
        const m = String(Math.floor(s / 60)).padStart(2, "0");
        const sec = String(s % 60).padStart(2, "0");
        return `${m}:${sec}`;
    };

    const nextBlinds = blinds?.[currentLevel + 1] ?? { small: "-", big: "-" };

    return (
        <div className="relative flex flex-col items-center justify-start h-[100vh] text-center pt-4 overflow-hidden">
            <div className="text-blue-900 text-9xl font-extrabold font-mono mt-6 mb-4">
                {formatTime(timeLeft)}
            </div>

            <div className="mt-64">
                <div className="text-indigo-900 text-5xl font-extrabold tracking-widest mb-4">
                    Kitas lygis: {currentLevel + 1}
                </div>
                <div className="text-red-800 text-4xl font-extrabold tracking-wide">
                    Blindai: {nextBlinds.small} / {nextBlinds.big}
                </div>
            </div>

            <div className="absolute bottom-8 right-8">
                <button
                    onClick={() => handleEndBreak(false)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-bold py-3 px-6 rounded-xl shadow-md transition"
                >
                    Tęsti žaidimą dabar
                </button>
            </div>
        </div>
    );
}