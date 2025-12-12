import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "住まいMBTI診断 | 32問で分かる住まい選びの性格タイプ",
  description: "32問の心理診断であなたの「住まいの本性」を可視化。拠点派？身軽派？街派？巣派？16タイプの中からあなたの住まい選びの傾向を発見しよう。",
  keywords: ["住まい", "MBTI", "診断", "不動産", "住宅", "性格診断", "タイプ診断"],
  openGraph: {
    title: "住まいMBTI診断 | 住む家の選び方、性格でバレる。",
    description: "32問で「住まいの本性」を可視化。拠点派？身軽派？街派？巣派？",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "住まいMBTI診断",
    description: "32問で「住まいの本性」を可視化。拠点派？身軽派？街派？巣派？",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
