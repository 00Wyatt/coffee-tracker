import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Authentication({ showModal, handleCloseModal }) {
    const [isRegistration, setIsRegistration] = useState(true);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ auth: "", email: "", password: "" });
    const emailInputRef = useRef(null);
    const { signup, login } = useAuth();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Focus email input when modal opens
    useEffect(() => {
        if (showModal) {
            emailInputRef.current.focus();
        }
    }, [showModal, isRegistration]);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({
            ...prev,
            [name]: value.trim()
                ? ""
                : `${name === "email" ? "Email" : "Password"} is required`,
        }));
    }

    function validateForm() {
        const newErrors = { auth: "" };

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        // Validate password
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }
        setErrors(newErrors);

        // Return true if no new errors
        return Object.values(newErrors).every((error) => error === "");
    }

    async function handleSubmit() {
        if (!validateForm() || isAuthenticating) {
            return;
        }
        try {
            setIsAuthenticating(true);

            if (isRegistration) {
                // Register a user
                await signup(formData.email, formData.password);
            } else {
                // Log a user in
                await login(formData.email, formData.password);
            }
            handleCloseModal();
        } catch (err) {
            console.log(err);
            setErrors((prev) => ({
                ...prev,
                auth: err.message,
            }));
        } finally {
            setIsAuthenticating(false);
        }
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="mb-[-2.5rem] flex justify-end">
                    <button
                        className="material-symbols-outlined z-10 duration-200 focus-within:text-cyan-500 hover:text-cyan-500"
                        onClick={handleCloseModal}
                    >
                        close
                    </button>
                </div>
                <h2 className="text-3xl font-semibold">
                    {isRegistration ? "Sign Up" : "Login"}
                </h2>
                <p>
                    {isRegistration
                        ? "Create an account!"
                        : "Sign in to your account!"}
                </p>
                {errors.auth && (
                    <p className="flex gap-1">
                        <span className="material-symbols-outlined text-red-500">
                            error
                        </span>
                        {errors.auth}
                    </p>
                )}
                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        ref={emailInputRef}
                        placeholder="Email"
                        className="dark:focus:border-cyan-40 block w-full rounded-md border border-slate-200 bg-slate-100 p-4 focus:border-cyan-500 dark:border-slate-600 dark:bg-slate-800"
                    />
                    {errors.email && (
                        <span className="text-sm text-red-500">
                            {errors.email}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="********"
                        className="dark:focus:border-cyan-40 block w-full rounded-md border border-slate-200 bg-slate-100 p-4 focus:border-cyan-500 dark:border-slate-600 dark:bg-slate-800"
                    />
                    {errors.password && (
                        <span className="text-sm text-red-500">
                            {errors.password}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={isAuthenticating}
                    className="self-start rounded-md bg-cyan-500 px-6 py-3 font-semibold text-white duration-200 hover:bg-cyan-400"
                >
                    {isAuthenticating ? "Authenticating..." : "Submit"}
                </button>
            </div>
            <hr className="my-4" />
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
        </>
    );
}
