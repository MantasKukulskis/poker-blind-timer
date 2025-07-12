import { useState } from "react";

export default function SettingsForm({ onStart }) {
    const [duration, setDuration] = useState(0.17); // ~10 sekundžių
    const [smallBlind, setSmallBlind] = useState(10);
    const [bigBlind, setBigBlind] = useState(20);
    const [growthType, setGrowthType] = useState("double");
    const [fixedIncrease, setFixedIncrease] = useState(10);
    const [breakEvery, setBreakEvery] = useState(2); // kas kelintą lygį
    const [breakDuration, setBreakDuration] = useState(0.08); // ~5 sekundės

    const handleSubmit = (e) => {
        e.preventDefault();
        onStart({
            duration: Math.round(duration * 60),        // pavertimas į sekundes
            smallBlind,
            bigBlind,
            growthType,
            fixedIncrease: growthType === "fixed" ? fixedIncrease : null,
            breakEvery,
            breakDuration: Math.round(breakDuration * 60), // pavertimas į sekundes
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-4 rounded shadow-md max-w-md mx-auto"
        >
            <h2 className="text-xl font-bold mb-2">Nustatymai</h2>

            <div>
                <label className="block mb-1 font-medium">Lygio trukmė (min.)</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full border rounded p-2"
                    step="0.01"
                    min={0.01}
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
                    <option value="standard">Standartinis</option>
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

            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block mb-1 font-medium">Pertrauka kas tiek lygių</label>
                    <input
                        type="number"
                        value={breakEvery}
                        onChange={(e) => setBreakEvery(Number(e.target.value))}
                        className="w-full border rounded p-2"
                        min={1}
                    />
                </div>
                <div className="flex-1">
                    <label className="block mb-1 font-medium">Pertraukos trukmė (min.)</label>
                    <input
                        type="number"
                        value={breakDuration}
                        onChange={(e) => setBreakDuration(Number(e.target.value))}
                        className="w-full border rounded p-2"
                        step="0.01"
                        min={0.01}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
                Start
            </button>

            <button
                type="button"
                onClick={() => {
                    setDuration(0.17);          // ≈10 sek
                    setSmallBlind(10);
                    setBigBlind(20);
                    setGrowthType("double");
                    setFixedIncrease(10);
                    setBreakEvery(2);
                    setBreakDuration(0.08);     // ≈5 sek
                }}
                className="w-full bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
            >
                Demo/Test režimas (10s lygis, 5s pertrauka)
            </button>
        </form>
    );
}