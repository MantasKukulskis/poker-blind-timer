import { useState } from "react";

export default function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={toggleFullscreen}
                className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
                {isFullscreen ? "Išeiti iš viso ekrano" : "Visas ekranas"}
            </button>
        </div>
    );
}