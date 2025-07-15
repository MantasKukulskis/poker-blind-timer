import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex justify-center gap-4 mt-2 mb-4">
            <button
                onClick={() => changeLanguage("lt")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border ${i18n.language === "lt" ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"}`}
            >
                <img src="/img/lithuania.jpeg" alt="LT" className="w-5 h-5" />
                LT
            </button>
            <button
                onClick={() => changeLanguage("en")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border ${i18n.language === "en" ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"}`}
            >
                <img src="/img/english.jpg" alt="EN" className="w-5 h-5" />
                EN
            </button>
        </div>
    );
}