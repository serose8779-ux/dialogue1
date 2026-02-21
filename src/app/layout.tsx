import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Reading Dialog - 나만의 영어 대화문 만들기",
  description: "학생들이 직접 만드는 인터랙티브 영어 리딩 대화 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
