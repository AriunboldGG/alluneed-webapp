import React from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AllYouNeed - Your All-in-One Platform",
  description: "Your comprehensive platform for everything you need. Streamline your workflow and achieve your goals.",
};

export default function RootLayout({ children }) {
  return React.createElement('html', { lang: 'en' }, [
    React.createElement('body', {
      key: 'body',
      className: `${geistSans.variable} ${geistMono.variable} antialiased`
    }, [
      React.createElement(Layout, { key: 'layout' }, children)
    ])
  ]);
} 