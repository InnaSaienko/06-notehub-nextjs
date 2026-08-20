import type {Metadata} from "next";
import "./globals.css";
import "modern-normalize";
import "./globals.css";
import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
    title: "Note HUB",
    description: "The App for your notes",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body>
        <Header/>
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer/>
        </body>
        </html>
    );
}
