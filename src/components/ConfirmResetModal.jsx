import React from "react";
import { useTranslation } from "react-i18next";

export default function ConfirmResetModal({ onConfirm, onCancel }) {
    const { t } = useTranslation();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl max-w-md w-[90%] text-center border-2 border-yellow-500">
                <h2 className="text-2xl font-bold mb-4 tracking-wide text-yellow-400">
                    {t("confirmExitTitle")}
                </h2>
                <p className="mb-6 text-lg text-gray-300">
                    {t("confirmExitDescription")}
                </p>
                <div className="flex justify-center gap-6">
                    <button
                        className="px-6 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold transition duration-200"
                        onClick={onCancel}
                    >
                        {t("no")}
                    </button>
                    <button
                        className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition duration-200"
                        onClick={onConfirm}
                    >
                        {t("yes")}
                    </button>
                </div>
            </div>
        </div>
    );
}