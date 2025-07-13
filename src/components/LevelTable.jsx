import { useTournament } from "../context/TournamentContext";

export default function LevelTable() {
    const { blinds, currentLevel } = useTournament();

    if (!blinds.length) return null;

    return (
        <div className="mt-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center text-yellow-300">Blindų Lygiai</h3>
            <table className="w-full table-auto border-collapse overflow-hidden shadow-xl rounded-xl">
                <thead>
                    <tr className="bg-yellow-800 text-yellow-100">
                        <th className="p-3 text-left">Lygis</th>
                        <th className="p-3 text-left">Small Blind</th>
                        <th className="p-3 text-left">Big Blind</th>
                    </tr>
                </thead>
                <tbody>
                    {blinds.map((b) => (
                        <tr
                            key={b.level}
                            className={`transition-all duration-200 ${b.level === currentLevel
                                    ? "bg-yellow-400 text-black font-bold animate-pulse"
                                    : "bg-gray-800 text-white"
                                }`}
                        >
                            <td className="p-3">{b.level}</td>
                            <td className="p-3">{b.smallBlind}</td>
                            <td className="p-3">{b.bigBlind}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}