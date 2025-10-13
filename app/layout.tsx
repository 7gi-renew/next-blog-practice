import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="jp">
      <body className="bg-stone-100 px-6 py-8 min-h-screen">
        <div className="w-[95%] mx-auto">{children}</div>
      </body>
    </html>
  );
}
