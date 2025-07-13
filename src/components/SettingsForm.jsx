import { useState } from "react";

export default function SettingsForm({ onStart }) {
    const [duration, setDuration] = useState(0.17); // ~10 sekundžių
    const [smallBlind, setSmallBlind] = useState(10);
    const [bigBlind, setBigBlind] = useState(20);
    const [growthType, setGrowthType] = useState("double");
    const [fixedIncrease, setFixedIncrease] = useState(10);
    const [breakEvery, setBreakEvery] = useState(2);
    const [breakDuration, setBreakDuration] = useState(0.08); // ~5 sek

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
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
            style={{
                backgroundImage: `url('/img/poker_backgound.')`,
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-black bg-opacity-80 p-8 rounded-3xl shadow-2xl max-w-xl w-full text-white space-y-6 border border-yellow-500"
            >
                <h2 className="text-4xl font-bold text-yellow-400 text-center uppercase tracking-wider mb-4">
                    Turnyro Nustatymai
                </h2>

                <div>
                    <label className="block mb-1 font-medium">Lygio trukmė (min.)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full p-2 rounded bg-gray-800 border border-yellow-300"
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
                            className="w-full p-2 rounded bg-gray-800 border border-yellow-300"
                            min={1}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">Big Blind</label>
                        <input
                            type="number"
                            value={bigBlind}
                            onChange={(e) => setBigBlind(Number(e.target.value))}
                            className="w-full p-2 rounded bg-gray-800 border border-yellow-300"
                            min={1}
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Blindų augimas</label>
                    <select
                        value={growthType}
                        onChange={(e) => setGrowthType(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 border border-yellow-300"
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
                            className="w-full p-2 rounded bg-gray-800 border border-yellow-300"
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
                            className="w-full p-2 rounded bg-gray-800 border border-yellow-300"
                            min={1}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">Pertraukos trukmė (min.)</label>
                        <input
                            type="number"
                            value={breakDuration}
                            onChange={(e) => setBreakDuration(Number(e.target.value))}
                            className="w-full p-2 rounded bg-gray-800 border border-yellow-300"
                            step="0.01"
                            min={0.01}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-600 transition-colors"
                >
                    Start
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
                    className="w-full mt-2 bg-gray-500 text-white font-semibold py-2 rounded hover:bg-gray-600"
                >
                    Demo/Test režimas (10s lygis, 5s pertrauka)
                </button>
            </form>
        </div>
    );
}