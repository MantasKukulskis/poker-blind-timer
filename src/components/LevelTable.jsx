import { useTournament } from "../context/TournamentContext";

export default function LevelTable() {
    const { blinds, currentLevel } = useTournament();

    if (!blinds.length) return null;

    return (
        <div className="mt-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2 text-center">Blindų Lygiai</h3>
            <table className="w-full border text-center">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-2 py-1">Lygis</th>
                        <th className="border px-2 py-1">Small Blind</th>
                        <th className="border px-2 py-1">Big Blind</th>
                    </tr>
                </thead>
                <tbody>
                    {blinds.map((b) => (
                        <tr key={b.level} className={b.level === currentLevel ? "bg-yellow-100" : ""}>
                            <td className="border px-2 py-1">{b.level}</td>
                            <td className="border px-2 py-1">{b.smallBlind}</td>
                            <td className="border px-2 py-1">{b.bigBlind}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}