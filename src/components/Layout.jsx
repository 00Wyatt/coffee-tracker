import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Layout({ children, setShowModal }) {
    const header = (
        <header className="mx-auto flex max-w-screen-xl items-center px-5 py-4 lg:px-16">
            <div className="flex flex-auto flex-col gap-x-3 sm:flex-row sm:items-end">
                <h1 className="text-2xl font-bold uppercase">Coffee Tracker</h1>
                <p className="font-lg italic">For Caffeine Insatiates</p>
            </div>
            <div className="flex flex-auto items-center justify-end gap-8">
                <ThemeToggle />
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 rounded-md bg-cyan-500 px-6 py-3 font-semibold text-white duration-200 hover:bg-cyan-400"
                >
                    Sign up free
                    <span className="material-symbols-outlined">coffee</span>
                </button>
            </div>
        </header>
    );

    const footer = (
        <footer className="flex justify-center bg-cyan-50 p-2 text-xs dark:bg-slate-900">
            <p>Developed by Wyatt Channings</p>
        </footer>
    );

    return (
        <>
            {header}
            <main className="mx-auto max-w-screen-xl px-5 lg:px-16">
                {children}
            </main>
            {footer}
        </>
    );
}
