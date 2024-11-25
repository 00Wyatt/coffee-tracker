import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children, setShowModal }) {
    const { globalUser, logout } = useAuth();

    const header = (
        <header className="mx-auto flex max-w-screen-xl flex-col gap-6 bg-white px-5 py-4 sm:flex-row sm:items-center lg:px-16 dark:bg-slate-800">
            <div className="flex flex-auto flex-col items-center gap-x-3 sm:flex-row sm:items-end">
                <h1 className="text-2xl font-bold uppercase">Coffee Tracker</h1>
            </div>
            <div className="flex flex-auto items-center justify-between gap-8 sm:justify-end">
                <ThemeToggle />
                {globalUser ? (
                    <button
                        onClick={logout}
                        className="flex rounded-md bg-cyan-500 px-6 py-3 font-semibold text-white duration-200 hover:bg-cyan-400"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 rounded-md bg-cyan-500 px-6 py-3 font-semibold text-white duration-200 hover:bg-cyan-400"
                    >
                        Sign up free
                        <span className="material-symbols-outlined">
                            coffee
                        </span>
                    </button>
                )}
            </div>
        </header>
    );

    const footer = (
        <footer className="mx-auto flex max-w-screen-xl justify-center bg-white p-2 text-xs dark:bg-slate-800">
            <p>Developed by Wyatt Channings</p>
        </footer>
    );

    return (
        <>
            {header}
            <main className="mx-auto max-w-screen-xl bg-white px-5 lg:px-16 dark:bg-slate-800">
                {children}
            </main>
            {footer}
        </>
    );
}
