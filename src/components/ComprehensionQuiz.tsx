"use client";

import React, { useState } from "react";

interface Question {
    id: number;
    question: string;
    options: string[];
    answer: number;
}

interface ComprehensionQuizProps {
    jobId: string;
}

export default function ComprehensionQuiz({ jobId }: ComprehensionQuizProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const getQuestions = (id: string): Question[] => {
        const questions: Record<string, Question[]> = {
            doctor: [
                { id: 1, question: "What does the speaker want to be?", options: ["Teacher", "Doctor", "Pilot", "Chef"], answer: 1 },
                { id: 2, question: "Why does the speaker want to be a doctor?", options: ["To fly airplanes", "To draw pictures", "To help sick people", "To cook food"], answer: 2 },
            ],
            teacher: [
                { id: 1, question: "What does the speaker want to be?", options: ["Doctor", "Teacher", "Artist", "Pilot"], answer: 1 },
                { id: 2, question: "Why does the speaker want to be a teacher?", options: ["To teach students", "To help people", "To cook", "To fly"], answer: 0 },
            ],
            pilot: [
                { id: 1, question: "What does the speaker want to be?", options: ["Chef", "Pilot", "Doctor", "Artist"], answer: 1 },
                { id: 2, question: "Why does the speaker want to be a pilot?", options: ["To draw", "To fly airplanes", "To teach", "To help"], answer: 1 },
            ],
            artist: [
                { id: 1, question: "What does the speaker want to be?", options: ["Artist", "Doctor", "Chef", "Teacher"], answer: 0 },
                { id: 2, question: "Why does the speaker want to be an artist?", options: ["To help", "To draw pictures", "To cook", "To fly"], answer: 1 },
            ],
            chef: [
                { id: 1, question: "What does the speaker want to be?", options: ["Pilot", "Doctor", "Chef", "Teacher"], answer: 2 },
                { id: 2, question: "Why does the speaker want to be a chef?", options: ["To fly", "To help", "To cook delicious food", "To draw"], answer: 2 },
            ],
        };
        return questions[id] || [];
    };

    const quizData = getQuestions(jobId);

    const handleAnswer = (index: number) => {
        if (index === quizData[currentStep].answer) {
            setScore(score + 1);
        }

        if (currentStep + 1 < quizData.length) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsFinished(true);
        }
    };

    if (quizData.length === 0) return null;

    return (
        <div className="glass card animate-fade-in">
            <h2 style={{ marginBottom: "1.5rem", color: "hsl(var(--accent))" }}>🧠 내용 이해 퀴즈</h2>

            {!isFinished ? (
                <div>
                    <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "0.5rem" }}>
                        문제 {currentStep + 1} / {quizData.length}
                    </p>
                    <p style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                        {quizData[currentStep].question}
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        {quizData[currentStep].options.map((option, idx) => (
                            <button
                                key={idx}
                                className="btn-primary"
                                style={{ background: "white", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))", boxShadow: "none" }}
                                onClick={() => handleAnswer(idx)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>퀴즈 완료! 🎉</h3>
                    <p style={{ fontSize: "1.25rem" }}>점수: {score} / {quizData.length}</p>
                    <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => {
                        setCurrentStep(0);
                        setScore(0);
                        setIsFinished(false);
                    }}>
                        다시 풀기
                    </button>
                </div>
            )}
        </div>
    );
}
