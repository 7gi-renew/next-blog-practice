import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="jp">
      <body>
        <div className="w-[95%] mx-auto">{children}</div>
      </body>
    </html>
  );
}
