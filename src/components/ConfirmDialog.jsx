export default function ConfirmDialog({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md text-center max-w-sm w-full">
                <p className="mb-4 text-lg">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded"
                        onClick={onConfirm}
                    >
                        Taip
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={onCancel}
                    >
                        Ne
                    </button>
                </div>
            </div>
        </div>
    );
}