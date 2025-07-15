import { useTournament } from "../context/TournamentContext";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Fullscreen({ onExit }) {
    const {
        currentLevel,
        blinds,
        remainingTime,
        breakEvery,
        isBreak,
        breakDuration,
        isPaused,
        pauseTournament,
        resumeTournament,
    } = useTournament();

    const { t } = useTranslation();

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
            document.body.style.overflow = isFs ? "hidden" : "auto";
        };

        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        handleFullscreenChange();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.body.style.overflow = "auto";
        };
    }, [onExit]);

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col justify-center items-center text-white transition-opacity duration-300 ${isFullscreen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            style={{
                backgroundImage: "url('/img/in_game.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {isBreak ? (
                <>
                    <div className="text-7xl font-extrabold mb-12 text-yellow-400 animate-pulse">
                        {formatTime(localTime)}
                    </div>
                    <div className="text-7xl font-extrabold mb-8 text-red-500 animate-bounce drop-shadow-md tracking-wider">
                        {t("break")}
                    </div>
                    <div className="text-2xl text-gray-300">
                        {t("nextLevelStarts", { level: currentLevel + 1 })}
                    </div>
                </>
            ) : (
                <>
                    <div className="text-7xl font-extrabold mb-12 text-yellow-400 animate-pulse">
                        {formatTime(remainingTime)}
                    </div>
                    <div className="text-5xl font-bold mb-6">
                        {t("level")} {currentBlind?.level || "-"}
                    </div>
                    <div className="text-4xl text-green-400 mb-8">
                        {currentBlind?.small} / {currentBlind?.big}
                    </div>
                    {levelsUntilBreak !== null && (
                        <div className="text-2xl text-gray-300 mb-6">
                            {t("levelsUntilBreak", {
                                count: levelsUntilBreak,
                            })}
                        </div>
                    )}

                    <div className="mt-6">
                        {!isPaused ? (
                            <button
                                onClick={pauseTournament}
                                className="bg-yellow-500 text-black font-bold px-6 py-2 rounded-lg shadow-md"
                            >
                                {t("pause")}
                            </button>
                        ) : (
                            <button
                                onClick={resumeTournament}
                                className="bg-green-500 text-black font-bold px-6 py-2 rounded-lg shadow-md"
                            >
                                {t("resume")}
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}