import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children, setShowModal }) {
    const [showMenu, setShowMenu] = useState(false);
    const { globalUser, logout } = useAuth();

    function handleToggleMenu() {
        setShowMenu(!showMenu);
    }

    const header = (
        <header className="mx-auto flex max-w-screen-xl flex-wrap items-center gap-6 bg-white px-5 py-4 lg:px-16 dark:bg-slate-800">
            <div className="flex flex-auto items-center gap-x-3">
                <a href="/">
                    <h1 className="text-2xl font-bold uppercase">
                        Coffee Tracker
                    </h1>
                </a>
            </div>
            <div
                className={
                    "order-1 w-full flex-auto items-center justify-between gap-8 sm:flex sm:w-auto sm:justify-end" +
                    (showMenu ? " flex" : " hidden")
                }
            >
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
            <div className="flex flex-auto justify-end sm:hidden">
                <button
                    onClick={handleToggleMenu}
                    className="duration-200 hover:text-cyan-500"
                >
                    {showMenu ? (
                        <span className="material-symbols-outlined">close</span>
                    ) : (
                        <span className="material-symbols-outlined">menu</span>
                    )}
                </button>
            </div>
        </header>
    );

    const footer = (
        <footer className="mx-auto flex max-w-screen-xl justify-center bg-white p-2 text-xs dark:bg-slate-800">
            <p>
                Developed by{" "}
                <a
                    href="https://github.com/00Wyatt"
                    target="_blank"
                    className="font-semibold duration-200 hover:text-cyan-500"
                >
                    Wyatt Channings
                </a>
            </p>
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
