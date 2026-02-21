"use client";

import React, { useState } from "react";
import ScriptBuilder from "@/components/ScriptBuilder";
import RecordingTool from "@/components/RecordingTool";
import ComprehensionQuiz from "@/components/ComprehensionQuiz";

export default function Home() {
  const [completeScript, setCompleteScript] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const handleComplete = (script: string, jobId: string) => {
    setCompleteScript(script);
    setSelectedJobId(jobId);
  };

  return (
    <div style={{ paddingBottom: "5rem" }}>
      <header className="animate-fade-in" style={{ marginBottom: "3rem", paddingTop: "2rem" }}>
        <h1>My Reading Dialog</h1>
        <p style={{ textAlign: "center", color: "#64748b", fontSize: "1.1rem" }}>
          직접 선택하고 구성하는 나만의 영어 대화문
        </p>
      </header>

      <section style={{ marginBottom: "3rem" }}>
        <ScriptBuilder onComplete={handleComplete} />
      </section>

      {completeScript && selectedJobId && (
        <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <section>
            <RecordingTool onSave={(blob) => console.log("Recording saved", blob)} />
          </section>

          <section>
            <ComprehensionQuiz jobId={selectedJobId} />
          </section>

          <footer style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              className="btn-primary"
              style={{ background: "#10b981" }}
              onClick={() => window.print()}
            >
              대화문 인쇄하기 (포트폴리오)
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}
