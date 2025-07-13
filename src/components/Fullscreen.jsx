import { useTournament } from "../context/TournamentContext";
import { useEffect, useState } from "react";

export default function Fullscreen({ onExit }) {
    const {
        currentLevel,
        blinds,
        remainingTime,
        breakEvery,
        isBreak,
        breakDuration,
        setIsBreak,
        setRemainingTime,
    } = useTournament();

    const currentBlind = blinds.find((b) => b.level === currentLevel);
    const levelsUntilBreak = breakEvery - ((currentLevel - 1) % breakEvery);

    const [isFullscreen, setIsFullscreen] = useState(false);

    const formatTime = (s) => {
        const m = String(Math.floor(s / 60)).padStart(2, "0");
        const sec = String(s % 60).padStart(2, "0");
        return `${m}:${sec}`;
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
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

    useEffect(() => {
        let interval;
        if (isFullscreen && isBreak) {
            interval = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsBreak(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isFullscreen, isBreak]);

    const backgroundImage = isBreak
        ? "url('/images/break-background.jpg')"
        : "url('/images/game-background.jpg')";

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col justify-center items-center text-white transition-opacity duration-300 ${isFullscreen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                } overflow-hidden`}
            style={{ backgroundImage, backgroundSize: "cover", backgroundPosition: "center" }}
        >
            {isBreak ? (
                <>
                    <div className="text-7xl font-extrabold mb-12 text-yellow-400 animate-pulse">
                        {formatTime(remainingTime)}
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
                        Lygis {currentBlind?.level}
                    </div>
                    <div className="text-4xl text-green-400 mb-8">
                        {currentBlind?.smallBlind} / {currentBlind?.bigBlind}
                    </div>
                    <div className="text-2xl text-gray-300">
                        Liko {levelsUntilBreak} lyg. iki pertraukos
                    </div>
                </>
            )}
        </div>
    );
}