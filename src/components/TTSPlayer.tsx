"use client";

import React, { useState, useEffect } from "react";

interface TTSPlayerProps {
    script: string;
}

export default function TTSPlayer({ script }: TTSPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const playScript = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            return;
        }

        const lines = script.split("\n");
        setIsPlaying(true);

        const speakLine = (index: number) => {
            if (index >= lines.length) {
                setIsPlaying(false);
                return;
            }

            const line = lines[index];
            const utterance = new SpeechSynthesisUtterance(line.replace(/^[AB]: /, ""));

            // Determine voice (A: Male, B: Female)
            const isA = line.startsWith("A:");
            const preferredLang = "en-US";

            const maleVoice = voices.find(v => v.lang.includes(preferredLang) && (v.name.toLowerCase().includes("male") || v.name.includes("David") || v.name.includes("Mark")));
            const femaleVoice = voices.find(v => v.lang.includes(preferredLang) && (v.name.toLowerCase().includes("female") || v.name.includes("Zira") || v.name.includes("Samantha")));
            const fallbackVoice = voices.find(v => v.lang.includes(preferredLang));

            if (isA) {
                utterance.voice = maleVoice || fallbackVoice || null;
                utterance.pitch = 0.9; // Slightly lower for male
            } else {
                utterance.voice = femaleVoice || fallbackVoice || null;
                utterance.pitch = 1.1; // Slightly higher for female
            }

            utterance.rate = 0.9; // Natural native speed (slightly slower than default 1.0)
            utterance.lang = "en-US";

            utterance.onend = () => {
                speakLine(index + 1);
            };

            utterance.onerror = () => {
                setIsPlaying(false);
            };

            window.speechSynthesis.speak(utterance);
        };

        speakLine(0);
    };

    return (
        <div className="glass card animate-fade-in" style={{ textAlign: "center", border: "2px solid hsl(var(--primary))" }}>
            <h2 style={{ marginBottom: "1rem", color: "hsl(var(--primary))" }}>🎧 대화 들어보기</h2>
            <p style={{ marginBottom: "1.5rem" }}>네이티브 스피커의 목소리로 발음을 확인해보세요. (A: 남성, B: 여성)</p>

            <button className="btn-primary" onClick={playScript}>
                {isPlaying ? "정지하기" : "네이티브 목소리로 듣기"}
            </button>

            <div style={{ marginTop: "1.5rem", textAlign: "left", fontSize: "1.1rem", padding: "1rem", background: "white", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                {script.split("\n").map((line, i) => (
                    <p key={i} style={{ marginBottom: "0.5rem", color: line.startsWith("A:") ? "hsl(var(--primary))" : "hsl(var(--secondary))", fontWeight: "600" }}>
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
}
