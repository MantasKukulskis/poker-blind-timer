import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SettingsForm({ onStart }) {
    const { t } = useTranslation();

    const [duration, setDuration] = useState(0.17);
    const [smallBlind, setSmallBlind] = useState(10);
    const [bigBlind, setBigBlind] = useState(20);
    const [growthType, setGrowthType] = useState("double");
    const [fixedIncrease, setFixedIncrease] = useState(10);
    const [breakEvery, setBreakEvery] = useState(2);
    const [breakDuration, setBreakDuration] = useState(0.08);

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
            className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 relative"
            style={{
                backgroundImage: `url('/img/poker_backgound.jpg')`,
            }}
        >
            <div className="absolute top-4 right-4">
                <LanguageSwitcher />
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-black bg-opacity-80 p-8 rounded-3xl shadow-2xl max-w-xl w-full text-white space-y-6 border border-yellow-500"
            >
                <h2 className="text-4xl font-bold text-yellow-400 text-center uppercase tracking-wider mb-4">
                    {t("tournamentSettings")}
                </h2>

                <div>
                    <label className="block mb-1 font-medium">{t("levelDuration")}</label>
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
                        <label className="block mb-1 font-medium">{t("smallBlind")}</label>
                        <input
                            type="number"
                            value={smallBlind}
                            onChange={(e) => setSmallBlind(Number(e.target.value))}
                            className="w-full p-2 rounded bg-gray-800 border border-yellow-300"
                            min={1}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">{t("bigBlind")}</label>
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
                    <label className="block mb-1 font-medium">{t("blindGrowth")}</label>
                    <select
                        value={growthType}
                        onChange={(e) => setGrowthType(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 border border-yellow-300"
                    >
                        <option value="double">{t("double")}</option>
                        <option value="fixed">{t("fixedIncrease")}</option>
                        <option value="standard">{t("standard")}</option>
                    </select>
                </div>

                {growthType === "fixed" && (
                    <div>
                        <label className="block mb-1 font-medium">{t("increaseAmount")}</label>
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
                        <label className="block mb-1 font-medium">{t("breakEvery")}</label>
                        <input
                            type="number"
                            value={breakEvery}
                            onChange={(e) => setBreakEvery(Number(e.target.value))}
                            className="w-full p-2 rounded bg-gray-800 border border-yellow-300"
                            min={1}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">{t("breakDuration")}</label>
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
                    {t("start")}
                </button>
            </form>
        </div>
    );
}