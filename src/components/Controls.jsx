import { useState } from "react";
import { useTournament } from "../context/TournamentContext";
import ConfirmDialog from "./ConfirmDialog";

export default function Controls() {
    const {
        isPaused,
        pauseTournament,
        resumeTournament,
        resetTournament,
    } = useTournament();

    const [showConfirm, setShowConfirm] = useState(false);

    const handleResetClick = () => {
        setShowConfirm(true);
    };

    const handleConfirmReset = () => {
        resetTournament();
        setShowConfirm(false);
    };

    const handleCancelReset = () => {
        setShowConfirm(false);
    };

    return (
        <div className="mt-6 flex justify-center gap-4 relative">
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
                onClick={handleResetClick}
            >
                Reset
            </button>

            {showConfirm && (
                <ConfirmDialog
                    message="Ar tikrai nori perkrauti turnyrą?"
                    onConfirm={handleConfirmReset}
                    onCancel={handleCancelReset}
                />
            )}
        </div>
    );
}