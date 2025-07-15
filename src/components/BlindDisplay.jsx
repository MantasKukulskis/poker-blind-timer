import { useTournament } from "../context/TournamentContext";
import { useTranslation } from "react-i18next";

export default function BlindDisplay() {
    const { currentLevel, blinds } = useTournament();
    const { t } = useTranslation();

    const currentBlind = blinds.find((b) => b.level === currentLevel);

    if (!currentBlind) return null;

    return (
        <div className="bg-gradient-to-br from-black to-gray-900 border-4 border-yellow-500 rounded-3xl shadow-2xl p-6 mt-8 max-w-md mx-auto text-center text-white">
            <h2 className="text-2xl font-bold tracking-wide mb-3 text-yellow-400">{t("currentLevel")}</h2>
            <div className="text-4xl font-extrabold text-white mb-2">
                {t("level")} {currentBlind.level}
            </div>
            <div className="text-2xl text-green-400 font-semibold">
                {currentBlind.small} / {currentBlind.big}
            </div>
        </div>
    );
}