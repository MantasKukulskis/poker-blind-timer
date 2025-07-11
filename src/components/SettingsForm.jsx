import { useState } from "react";

export default function SettingsForm({ onStart }) {
    const [duration, setDuration] = useState(10); // minutėmis
    const [smallBlind, setSmallBlind] = useState(100);
    const [bigBlind, setBigBlind] = useState(200);
    const [growthType, setGrowthType] = useState("double"); // "double" arba "fixed"
    const [fixedIncrease, setFixedIncrease] = useState(100);

    const handleSubmit = (e) => {
        e.preventDefault();
        onStart({
            duration: duration * 60,  // ← BŪTINA konvertuoti į sekundes
            smallBlind,
            bigBlind,
            growthType,
            fixedIncrease: growthType === "fixed" ? fixedIncrease : null,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-2">Nustatymai</h2>

            <div>
                <label className="block mb-1 font-medium">Lygio trukmė (min.)</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full border rounded p-2"
                    min={1}
                />
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block mb-1 font-medium">Small Blind</label>
                    <input
                        type="number"
                        value={smallBlind}
                        onChange={(e) => setSmallBlind(Number(e.target.value))}
                        className="w-full border rounded p-2"
                        min={1}
                    />
                </div>
                <div className="flex-1">
                    <label className="block mb-1 font-medium">Big Blind</label>
                    <input
                        type="number"
                        value={bigBlind}
                        onChange={(e) => setBigBlind(Number(e.target.value))}
                        className="w-full border rounded p-2"
                        min={1}
                    />
                </div>
            </div>

            <div>
                <label className="block mb-1 font-medium">Blindų augimas</label>
                <select
                    value={growthType}
                    onChange={(e) => setGrowthType(e.target.value)}
                    className="w-full border rounded p-2"
                >
                    <option value="double">Dvigubai</option>
                    <option value="fixed">Fiksuotas padidėjimas</option>
                </select>
            </div>

            {growthType === "fixed" && (
                <div>
                    <label className="block mb-1 font-medium">Kiek pridėti SB/BB</label>
                    <input
                        type="number"
                        value={fixedIncrease}
                        onChange={(e) => setFixedIncrease(Number(e.target.value))}
                        className="w-full border rounded p-2"
                        min={1}
                    />
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
                Start
            </button>
        </form>
    );
}