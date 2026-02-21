"use client";

import React, { useState, useEffect } from "react";

type DialogOption = {
    id: string;
    en: string;
    ko: string;
};

type DialogTemplate = {
    part: "A" | "B";
    text: string;
    placeholders: string[];
};

const JOB_OPTIONS: DialogOption[] = [
    { id: "doctor", en: "doctor", ko: "의사" },
    { id: "teacher", en: "teacher", ko: "선생님" },
    { id: "pilot", en: "pilot", ko: "조종사" },
    { id: "artist", en: "artist", ko: "화가" },
    { id: "chef", en: "chef", ko: "요리사" },
];

const REASON_OPTIONS: Record<string, DialogOption[]> = {
    doctor: [{ id: "help", en: "help sick people", ko: "아픈 사람들을 돕는 것" }],
    teacher: [{ id: "teach", en: "teach students", ko: "학생들을 가르치는 것" }],
    pilot: [{ id: "fly", en: "fly airplanes", ko: "비행기를 조종하는 것" }],
    artist: [{ id: "draw", en: "draw beautiful pictures", ko: "멋진 그림을 그리는 것" }],
    chef: [{ id: "cook", en: "cook delicious food", ko: "맛있는 음식을 요리하는 것" }],
};

interface ScriptBuilderProps {
    onComplete: (script: string, selectedJob: string) => void;
}

export default function ScriptBuilder({ onComplete }: ScriptBuilderProps) {
    const [selectedJob, setSelectedJob] = useState<DialogOption | null>(null);
    const [selectedReason, setSelectedReason] = useState<DialogOption | null>(null);
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (selectedJob && selectedReason) {
            const fullScript = `A: What do you want to be?\nB: I want to be a ${selectedJob.en}.\nA: Why do you want to be a ${selectedJob.en}?\nB: Because I like to ${selectedReason.en}.`;
            onComplete(fullScript, selectedJob.id);
        }
    }, [selectedJob, selectedReason, onComplete]);

    return (
        <div className="glass card animate-fade-in">
            <h2 style={{ marginBottom: "1.5rem", color: "hsl(var(--primary))" }}>
                {step === 1 ? "🎨 어떤 직업이 되고 싶나요?" : "💡 왜 그 직업이 되고 싶나요?"}
            </h2>

            <div className="script-container" style={{ marginBottom: "2rem" }}>
                <p>A: What do you want to be?</p>
                <p>
                    B: I want to be a{" "}
                    <span
                        className={`placeholder ${selectedJob ? 'filled' : ''}`}
                        onClick={() => setStep(1)}
                    >
                        {selectedJob ? selectedJob.en : "[직업 선택]"}
                    </span>.
                </p>

                {selectedJob && (
                    <div className="animate-fade-in">
                        <p>A: Why do you want to be a {selectedJob.en}?</p>
                        <p>
                            B: Because I like to{" "}
                            <span
                                className={`placeholder ${selectedReason ? 'filled' : ''}`}
                                onClick={() => setStep(2)}
                            >
                                {selectedReason ? selectedReason.en : "[이유 선택]"}
                            </span>.
                        </p>
                    </div>
                )}
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {step === 1 ? (
                    JOB_OPTIONS.map((job) => (
                        <button
                            key={job.id}
                            className="btn-primary"
                            style={{ padding: "0.5rem 1.25rem", background: selectedJob?.id === job.id ? "hsl(var(--secondary))" : "" }}
                            onClick={() => {
                                setSelectedJob(job);
                                setSelectedReason(null);
                                setStep(2);
                            }}
                        >
                            {job.ko} ({job.en})
                        </button>
                    ))
                ) : (
                    selectedJob && REASON_OPTIONS[selectedJob.id].map((reason) => (
                        <button
                            key={reason.id}
                            className="btn-primary"
                            style={{ padding: "0.5rem 1.25rem", background: selectedReason?.id === reason.id ? "hsl(var(--secondary))" : "" }}
                            onClick={() => {
                                setSelectedReason(reason);
                            }}
                        >
                            {reason.ko} ({reason.en})
                        </button>
                    ))
                )}
            </div>

            {step === 2 && (
                <button
                    style={{ marginTop: "1rem", textDecoration: "underline", color: "hsl(var(--primary))", background: "none" }}
                    onClick={() => setStep(1)}
                >
                    이전 단계로
                </button>
            )}
        </div>
    );
}
