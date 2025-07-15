import { useEffect, useRef } from "react";
import { useTournament } from "../context/TournamentContext";

export default function SoundWarning() {
    const {
        remainingTime,
        isBreak,
        currentLevel,
        breakDuration,
    } = useTournament();

    const oneMinuteRef = useRef(null);
    const newLevelRef = useRef(null);
    const breakStartRef = useRef(null);
    const breakEndRef = useRef(null);

    const playedOneMinute = useRef(false);
    const playedNewLevel = useRef(false);
    const playedBreakStart = useRef(false);
    const playedBreakEnd = useRef(false);
    const prevIsBreak = useRef(isBreak);
    const prevLevel = useRef(currentLevel);

    useEffect(() => {
        if (remainingTime === 60 && !playedOneMinute.current) {
            oneMinuteRef.current?.play();
            playedOneMinute.current = true;
        }

        if (remainingTime > 60) {
            playedOneMinute.current = false;
        }
    }, [remainingTime]);

    useEffect(() => {
        if (
            currentLevel > 1 &&
            currentLevel !== prevLevel.current &&
            !isBreak &&
            !playedNewLevel.current
        ) {
            newLevelRef.current?.play();
            playedNewLevel.current = true;
        }

        if (currentLevel !== prevLevel.current) {
            prevLevel.current = currentLevel;
            playedNewLevel.current = false;
        }
    }, [currentLevel, isBreak]);

    useEffect(() => {
        if (isBreak && !prevIsBreak.current) {
            breakStartRef.current?.play();
            playedBreakStart.current = true;
        }
        prevIsBreak.current = isBreak;
    }, [isBreak]);

    useEffect(() => {
        if (!isBreak && prevIsBreak.current && breakDuration > 0) {
            breakEndRef.current?.play();
            playedBreakEnd.current = true;
        }

        if (isBreak !== prevIsBreak.current) {
            prevIsBreak.current = isBreak;
            playedBreakEnd.current = false;
        }
    }, [isBreak, breakDuration]);

    return (
        <>
            <audio ref={oneMinuteRef} preload="auto">
                <source src="/audio/one_minute_left.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={newLevelRef} preload="auto">
                <source src="/audio/new_level.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={breakStartRef} preload="auto">
                <source src="/audio/break_start.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={breakEndRef} preload="auto">
                <source src="/audio/break_end.mp3" type="audio/mpeg" />
            </audio>
        </>
    );
}