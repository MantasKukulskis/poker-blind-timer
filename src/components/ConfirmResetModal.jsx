import React from "react";

export default function ConfirmResetModal({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Confirm Reset</h2>
                <p className="mb-6">Are you sure you want to reset the tournament?</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        No
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}