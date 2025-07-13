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
            duration: Math.round(duration * 60),
            smallBlind,
            bigBlind,
            growthType,
            fixedIncrease: growthType === "fixed" ? fixedIncrease : null,
            breakEvery,
            breakDuration: Math.round(breakDuration * 60),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-[url('/backgrounds/cards-dark.jpg')] bg-cover bg-center p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto text-white border-4 border-yellow-400"
        >
            <h2 className="text-4xl font-extrabold text-center mb-8 tracking-wide drop-shadow">Pokerio Turnyro Nustatymai</h2>

            <div className="mb-4">
                <label className="block mb-1 font-semibold">Lygio trukmė (min.)</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full rounded-lg p-3 text-black"
                    step="0.01"
                    min={0.01}
                />
            </div>

            <div className="flex gap-4 mb-4">
                <div className="flex-1">
                    <label className="block mb-1 font-semibold">Small Blind</label>
                    <input
                        type="number"
                        value={smallBlind}
                        onChange={(e) => setSmallBlind(Number(e.target.value))}
                        className="w-full rounded-lg p-3 text-black"
                        min={1}
                    />
                </div>
                <div className="flex-1">
                    <label className="block mb-1 font-semibold">Big Blind</label>
                    <input
                        type="number"
                        value={bigBlind}
                        onChange={(e) => setBigBlind(Number(e.target.value))}
                        className="w-full rounded-lg p-3 text-black"
                        min={1}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-semibold">Blindų augimas</label>
                <select
                    value={growthType}
                    onChange={(e) => setGrowthType(e.target.value)}
                    className="w-full rounded-lg p-3 text-black"
                >
                    <option value="double">Dvigubai</option>
                    <option value="fixed">Fiksuotas padidėjimas</option>
                    <option value="standard">Standartinis</option>
                </select>
            </div>

            {growthType === "fixed" && (
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Kiek pridėti SB/BB</label>
                    <input
                        type="number"
                        value={fixedIncrease}
                        onChange={(e) => setFixedIncrease(Number(e.target.value))}
                        className="w-full rounded-lg p-3 text-black"
                        min={1}
                    />
                </div>
            )}

            <div className="flex gap-4 mb-8">
                <div className="flex-1">
                    <label className="block mb-1 font-semibold">Pertrauka kas tiek lygių</label>
                    <input
                        type="number"
                        value={breakEvery}
                        onChange={(e) => setBreakEvery(Number(e.target.value))}
                        className="w-full rounded-lg p-3 text-black"
                        min={1}
                    />
                </div>
                <div className="flex-1">
                    <label className="block mb-1 font-semibold">Pertraukos trukmė (min.)</label>
                    <input
                        type="number"
                        value={breakDuration}
                        onChange={(e) => setBreakDuration(Number(e.target.value))}
                        className="w-full rounded-lg p-3 text-black"
                        step="0.01"
                        min={0.01}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl text-xl mb-4 shadow-md"
            >
                Pradėti Turnyrą
            </button>

            <button
                type="button"
                onClick={() => {
                    setDuration(0.17);
                    setSmallBlind(10);
                    setBigBlind(20);
                    setGrowthType("double");
                    setFixedIncrease(10);
                    setBreakEvery(2);
                    setBreakDuration(0.08);
                }}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-xl text-lg shadow"
            >
                Demo/Test Režimas (10s lygis, 5s pertrauka)
            </button>
        </form>
    );
}
