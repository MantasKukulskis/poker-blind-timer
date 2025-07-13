import { useTournament } from "../context/TournamentContext";
import { useEffect, useState, useRef } from "react";

export default function Fullscreen({ onExit }) {
    const {
        currentLevel,
        blinds,
        remainingTime,
        breakEvery,
        isBreak,
        breakDuration,
    } = useTournament();

    const currentBlind = blinds?.find((b) => b.level === currentLevel);
    const levelsUntilBreak = breakEvery ? breakEvery - ((currentLevel - 1) % breakEvery) : null;
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [localTime, setLocalTime] = useState(remainingTime);
    const intervalRef = useRef(null);

    useEffect(() => {
        setLocalTime(isBreak ? breakDuration : remainingTime);
    }, [isBreak, remainingTime, breakDuration]);

    useEffect(() => {
        if (isFullscreen && isBreak) {
            if (intervalRef.current === null) {
                intervalRef.current = setInterval(() => {
                    setLocalTime((prev) => Math.max(0, prev - 1));
                }, 1000);
            }
        } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        };
    }, [isFullscreen, isBreak]);

    const formatTime = (s) => {
        const m = String(Math.floor(s / 60)).padStart(2, "0");
        const sec = String(s % 60).padStart(2, "0");
        return `${m}:${sec}`;
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                if (document.fullscreenElement) document.exitFullscreen();
                if (onExit) onExit();
            }
        };

        const handleFullscreenChange = () => {
            const isFs = !!document.fullscreenElement;
            setIsFullscreen(isFs);
        };

        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        handleFullscreenChange();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [onExit]);

    return (
        <div className={`fixed inset-0 z-50 flex flex-col justify-center items-center text-white transition-opacity duration-300 ${isFullscreen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} bg-gradient-to-br from-black to-gray-900 overflow-hidden`}>
            {isBreak ? (
                <>
                    <div className="text-7xl font-extrabold mb-12 text-yellow-400 animate-pulse">
                        {formatTime(localTime)}
                    </div>
                    <div className="text-5xl font-bold mb-6 text-red-400 animate-bounce">PERTRAUKA</div>
                    <div className="text-2xl text-gray-300">
                        Po pertraukos – prasidės lygis {currentLevel + 1}
                    </div>
                </>
            ) : (
                <>
                    <div className="text-7xl font-extrabold mb-12 text-yellow-400 animate-pulse">
                        {formatTime(remainingTime)}
                    </div>
                    <div className="text-5xl font-bold mb-6">
                        Lygis {currentBlind?.level || "-"}
                    </div>
                    <div className="text-4xl text-green-400 mb-8">
                        {currentBlind?.smallBlind} / {currentBlind?.bigBlind}
                    </div>
                    {levelsUntilBreak !== null && (
                        <div className="text-2xl text-gray-300">
                            Liko {levelsUntilBreak} lyg. iki pertraukos
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
