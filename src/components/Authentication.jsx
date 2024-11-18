import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Authentication({ handleCloseModal }) {
    const [isRegistration, setIsRegistration] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState(null);

    const { signup, login } = useAuth();

    async function handleAuthenticate() {
        if (
            !email ||
            !email.includes("@") ||
            !password ||
            password.length < 6 ||
            isAuthenticating
        ) {
            return;
        }
        try {
            setIsAuthenticating(true);
            setError(null);

            if (isRegistration) {
                // register a user
                await signup(email, password);
            } else {
                // login a user
                await login(email, password);
            }
            handleCloseModal();
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        } finally {
            setIsAuthenticating(false);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold">
                {isRegistration ? "Sign Up" : "Login"}
            </h2>
            <p>
                {isRegistration
                    ? "Create an account!"
                    : "Sign in to your account!"}
            </p>
            {error && <p>❌ {error}</p>}
            <input
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                placeholder="Email"
                className="dark:focus:border-cyan-40 rounded-md border border-slate-200 bg-slate-100 p-4 focus:border-cyan-500 dark:border-slate-600 dark:bg-slate-800"
            />
            <input
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                placeholder="********"
                type="password"
                className="dark:focus:border-cyan-40 rounded-md border border-slate-200 bg-slate-100 p-4 focus:border-cyan-500 dark:border-slate-600 dark:bg-slate-800"
            />
            <button
                onClick={handleAuthenticate}
                className="self-start rounded-md bg-cyan-500 px-6 py-3 font-semibold text-white duration-200 hover:bg-cyan-400"
            >
                {isAuthenticating ? "Authenticating..." : "Submit"}
            </button>
            <hr />
            <div>
                <p className="mb-1">
                    {isRegistration
                        ? "Already have an account?"
                        : "Don't have an account?"}
                </p>
                <button
                    onClick={() => {
                        setIsRegistration(!isRegistration);
                    }}
                    className="font-semibold text-cyan-500 duration-200 hover:text-cyan-600"
                >
                    {isRegistration ? "Sign in" : "Sign up"}
                </button>
            </div>
        </div>
    );
}
