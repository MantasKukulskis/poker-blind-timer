import { useEffect, useRef, useState } from "react";
import { useTournament } from "../context/TournamentContext";
import ConfirmResetModal from "./ConfirmResetModal";

export default function Timer() {
    const {
        isRunning,
        isPaused,
        remainingTime,
        setRemainingTime,
        nextLevel,
        pauseTournament,
        resumeTournament,
        resetTournament,
        setCurrentLevel,
        currentLevel,
    } = useTournament();

    const intervalRef = useRef(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingNextLevel, setPendingNextLevel] = useState(false);

    useEffect(() => {
        if (isRunning && !isPaused && intervalRef.current === null && !pendingNextLevel) {
            intervalRef.current = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        if ((!isRunning || isPaused || pendingNextLevel) && intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning, isPaused, pendingNextLevel, setRemainingTime]);

    useEffect(() => {
        if (isRunning && remainingTime === 0 && !pendingNextLevel) {
            setPendingNextLevel(true);
        }
    }, [isRunning, remainingTime, pendingNextLevel]);

    useEffect(() => {
        if (pendingNextLevel) {
            const timeout = setTimeout(() => {
                const broke = nextLevel(currentLevel);
                if (!broke) {
                    setCurrentLevel((prev) => prev + 1);
                }
                setPendingNextLevel(false);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [pendingNextLevel, nextLevel, setCurrentLevel, currentLevel]);

    const formatTime = (s) => {
        const m = String(Math.floor(s / 60)).padStart(2, "0");
        const sec = String(s % 60).padStart(2, "0");
        return `${m}:${sec}`;
    };

    const handleFullscreen = () => {
        const el = document.documentElement;
        if (!document.fullscreenElement) {
            el.requestFullscreen().catch((err) => {
            });
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div className="text-center mt-6">
            <p className="text-8xl font-mono text-blue-700">{formatTime(remainingTime)}</p>

            <div className="mt-6 flex justify-center gap-4 flex-wrap">
                {!isPaused ? (
                    <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                        onClick={pauseTournament}
                    >
                        Pause
                    </button>
                ) : (
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={resumeTournament}
                    >
                        Resume
                    </button>
                )}
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => setShowConfirm(true)}
                >
                    Reset
                </button>
                <button
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                    onClick={handleFullscreen}
                >
                    Fullscreen
                </button>
            </div>

            {showConfirm && (
                <ConfirmResetModal
                    isOpen={showConfirm}
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={() => {
                        resetTournament();
                        setShowConfirm(false);
                    }}
                />
            )}
        </div>
    );
}