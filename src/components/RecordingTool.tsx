"use client";

import React, { useState, useRef } from "react";

interface RecordingToolProps {
    onSave: (blob: Blob) => void;
}

export default function RecordingTool({ onSave }: RecordingToolProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/ogg; codecs=opus" });
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
                onSave(blob);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone", err);
            alert("마이크 접근 권한이 필요합니다.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
        }
    };

    return (
        <div className="glass card animate-fade-in" style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1rem", color: "hsl(var(--secondary))" }}>🎙️ 대화 연습 & 녹음</h2>
            <p style={{ marginBottom: "1.5rem" }}>완성된 대화문을 짝과 함께 읽으며 녹음해보세요.</p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                {!isRecording ? (
                    <button className="btn-primary" onClick={startRecording}>
                        녹음 시작
                    </button>
                ) : (
                    <button
                        className="btn-primary"
                        style={{ background: "hsl(0, 100%, 50%)", animation: "pulse 1.5s infinite" }}
                        onClick={stopRecording}
                    >
                        녹음 중지
                    </button>
                )}
            </div>

            {audioUrl && (
                <div className="animate-fade-in">
                    <p style={{ marginBottom: "0.5rem" }}>내 목소리 듣기:</p>
                    <audio src={audioUrl} controls style={{ width: "100%" }} />
                </div>
            )}

            <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
        }
      `}</style>
        </div>
    );
}
