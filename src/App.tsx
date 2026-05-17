import { useState, useEffect, useRef } from "react";
import type { Screen, Bug } from "./@types";
import { MAX_TIME, BUGS } from "./utils/constants";
import { DS } from "./style/theme";

import Intro from "./pages/Intro";
import Game from "./pages/Game";
import Result from "./pages/Result";

export default function BugHunter() {
    const [screen, setScreen] = useState<Screen>("intro");
    const [found, setFound] = useState<Set<string>>(new Set());
    const [active, setActive] = useState<Bug | null>(null);
    const [pulse, setPulse] = useState<string | null>(null);
    const [timer, setTimer] = useState(0);
    const [running, setRunning] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
                setTimer((t) => {
                    const next = t + 1;
                    if (next >= MAX_TIME) {
                        setRunning(false);
                        clearInterval(intervalRef.current!);
                        setScreen("result");
                    }
                    return next;
                });
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [running]);

    const startGame = () => {
        if (countdownRef.current) clearInterval(countdownRef.current);
        setFound(new Set());
        setActive(null);
        setTimer(0);
        setCountdown(null);
        setRunning(true);
        setScreen("game");
    };

    const goToIntro = () => {
        setRunning(false);
        if (countdownRef.current) clearInterval(countdownRef.current);
        setFound(new Set());
        setActive(null);
        setTimer(0);
        setCountdown(null);
        setScreen("intro");
    };

    const startCountdown = () => {
        let secs = 4;
        setCountdown(secs);
        countdownRef.current = setInterval(() => {
            secs -= 1;
            if (secs <= 0) {
                clearInterval(countdownRef.current!);
                setCountdown(null);
                setScreen("result");
            } else {
                setCountdown(secs);
            }
        }, 1000);
    };

    const handleClickBug = (bug: Bug) => {
        if (!found.has(bug.id)) {
            const next = new Set(found);
            next.add(bug.id);
            setFound(next);
            setPulse(bug.id);
            setTimeout(() => setPulse(null), 600);
            if (next.size === BUGS.length) {
                setRunning(false);
                startCountdown();
            }
        }
        setActive(bug);
    };

    const formatTime = (s: number) =>
        `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

    const timeLeft = Math.max(0, MAX_TIME - timer);

    const score = () => {
        const base = found.size * 100;
        const timeBonus = Math.max(0, MAX_TIME - timer) * 2;
        return base + timeBonus;
    };

    return (
        <div style={{
            fontFamily: DS.fonts.body,
            background: DS.colors.bg,
            minHeight: "100vh",
            color: DS.colors.text,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 ${DS.colors.success}88; } 100% { box-shadow: 0 0 0 16px transparent; } }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        @keyframes countPop { 0%{transform:scale(1.5);opacity:0.4;} 100%{transform:scale(1);opacity:1;} }
        @keyframes timerWarn { 0%,100%{color:${DS.colors.danger};} 50%{color:#ff8888;} }
        .bug-zone { cursor: default; transition: all 0.15s; border-radius: 4px; }
        .bug-zone:hover { background: rgba(245,166,35,0.15) !important; }
        .found-zone { cursor: default !important; }
        .pulse { animation: pulseRing 0.6s ease-out; }
        .fade-in { animation: fadeIn 0.5s ease both; }
        .blink { animation: blink 1s step-end infinite; }
        .count-pop { animation: countPop 0.4s ease both; }
        .timer-warn { animation: timerWarn 0.8s ease-in-out infinite; }
      `}</style>

            {screen === "intro" && <Intro onStart={startGame} />}

            {screen === "game" && (
                <Game
                    bugs={BUGS}
                    found={found}
                    active={active}
                    pulse={pulse}
                    timeLeft={timeLeft}
                    countdown={countdown}
                    onClickBug={handleClickBug}
                    onClosePanel={() => setActive(null)}
                    formatTime={formatTime}
                />
            )}

            {screen === "result" && (
                <Result
                    found={found}
                    bugs={BUGS}
                    timer={timer}
                    score={score()}
                    timedOut={timer >= MAX_TIME}
                    onRestart={startGame}
                    onGoIntro={goToIntro}
                    formatTime={formatTime}
                />
            )}
        </div>
    );
}
