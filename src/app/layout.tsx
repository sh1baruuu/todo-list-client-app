import AppContextProvider from '@/context/AppContext';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Fugaz_One } from 'next/font/google';
import './globals.css';
const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const fugazOne = Fugaz_One({
    variable: '--font-fugaz-one',
    subsets: ['latin'],
    weight: '400',
});

export const metadata: Metadata = {
    title: 'Todo List Client App',
    description: 'Developed by Rudolph De Villa',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${fugazOne.variable} antialiased`}
            >
                <AppContextProvider>
                    <div className="border-b">
                        <div className="flex items-center justify-center lg:justify-start max-w-screen-xl mx-auto py-4 px-6 lg:px-0">
                            <h1 className="text-xl lg:text-2xl  font-bold font-[family-name:var(--font-fugaz-one)]">TODOLIST</h1>
                        </div>
                    </div>
                    {children}
                </AppContextProvider>
            </body>
        </html>
    );
}

