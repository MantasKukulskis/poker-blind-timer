import { useTournament } from "../context/TournamentContext";

export default function BlindDisplay() {
    const { currentLevel, blinds } = useTournament();

    const currentBlind = blinds.find((b) => b.level === currentLevel);

    if (!currentBlind) return null;

    return (
        <div className="bg-white rounded shadow-md p-4 mt-6 max-w-sm mx-auto text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Dabartinis Lygis</h2>
            <div className="text-2xl font-bold text-blue-800 mb-1">
                Lygis {currentBlind.level}
            </div>
            <div className="text-xl text-green-700">
                {currentBlind.sb} / {currentBlind.bb}
            </div>
        </div>
    );
}