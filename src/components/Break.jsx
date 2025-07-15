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
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            setIsBreak(false);
            setRemainingTime(durationPerLevel);
            setCurrentLevel((prev) => prev + 1);
        }
    }, [timeLeft, setIsBreak, setRemainingTime, setCurrentLevel, currentLevel, durationPerLevel]);

    const formatTime = (s) => {
        const m = String(Math.floor(s / 60)).padStart(2, "0");
        const sec = String(s % 60).padStart(2, "0");
        return `${m}:${sec}`;
    };

    const blindObj = blinds?.[currentLevel + 1];
    const nextBlinds = (blindObj && blindObj.small && blindObj.big)
        ? blindObj
        : { small: "?", big: "?" };

    return (
        <div className="flex flex-col items-center justify-start h-[100vh] text-center pt-2">
            <div className="text-blue-900 text-9xl font-extrabold font-mono mb-4 mt-0">
                {formatTime(timeLeft)}
            </div>

            <div className="mt-52">
                <div className="text-indigo-900 text-5xl font-extrabold tracking-widest mb-4">
                    Kitas lygis: {currentLevel + 1}
                </div>

                <div className="text-red-800 text-4xl font-extrabold tracking-wide">
                    Blindai: {nextBlinds.small} / {nextBlinds.big}
                </div>
            </div>
        </div>
    );
}