import { useEffect, useRef } from "react";
import { useTournament } from "../context/TournamentContext";

export default function SoundWarning() {
    const { remainingTime } = useTournament();
    const audioRef = useRef(null);
    const hasPlayedRef = useRef(false);

    useEffect(() => {
        if (remainingTime === 60 && !hasPlayedRef.current) {
            audioRef.current?.play();
            hasPlayedRef.current = true;
        }

        // Reset leidimą kai laikas pasikeičia (naujas levelis)
        if (remainingTime > 60) {
            hasPlayedRef.current = false;
        }
    }, [remainingTime]);

    return (
        <audio ref={audioRef} preload="auto">
            <source src="/beep.mp3" type="audio/mpeg" />
        </audio>
    );
}