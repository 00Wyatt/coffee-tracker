import { coffeeOptions } from "../utils";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CoffeeForm({ isAuthenticated, setShowModal }) {
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
    const [coffeeCost, setCoffeeCost] = useState(0);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);

    const { globalData, setGlobalData, globalUser } = useAuth();

    async function handleSubmitForm() {
        if (!isAuthenticated) {
            setShowModal(true);
            return;
        }

        if (!selectedCoffee) {
            return;
        }

        try {
            const newGlobalData = {
                ...(globalData || {}),
            };

            const nowTime = Date.now();
            const timeToSubtract = hour * 60 * 60 * 1000 + min * 60 * 1000;
            const timestamp = nowTime - timeToSubtract;

            const newData = {
                name: selectedCoffee,
                cost: coffeeCost,
            };
            newGlobalData[timestamp] = newData;

            setGlobalData(newGlobalData);

            const userRef = doc(db, "users", globalUser.uid);
            const res = await setDoc(
                userRef,
                {
                    [timestamp]: newData,
                },
                { merge: true },
            );

            setSelectedCoffee(null);
            setHour(0);
            setMin(0);
            setCoffeeCost(0);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="flex flex-col gap-6 pb-8 sm:pb-12">
            <div className="flex items-center gap-2 text-3xl font-semibold">
                <span className="material-symbols-outlined text-3xl">edit</span>
                <h2>Start Tracking Today</h2>
            </div>
            <h3 className="text-lg sm:text-xl">Select coffee type</h3>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
                    return (
                        <button
                            onClick={() => {
                                setSelectedCoffee(option.name);
                                setShowCoffeeTypes(false);
                            }}
                            className={
                                "rounded-md border-2 bg-slate-100 px-2 py-6 duration-200 hover:border-cyan-500 sm:p-8 dark:bg-slate-900 " +
                                (option.name === selectedCoffee
                                    ? "border-cyan-500"
                                    : "border-slate-200 dark:border-slate-700")
                            }
                            key={optionIndex}
                        >
                            <p className="text-lg font-semibold sm:text-xl">
                                {option.name}
                            </p>
                            <p className="">{option.caffeine} mg</p>
                        </button>
                    );
                })}
                <button
                    onClick={() => {
                        setShowCoffeeTypes(true);
                        setSelectedCoffee(null);
                    }}
                    className={
                        "rounded-md border-2 bg-slate-100 p-6 duration-200 hover:border-cyan-500 sm:p-8 dark:bg-slate-900 " +
                        (showCoffeeTypes
                            ? "border-cyan-500"
                            : "border-slate-200 dark:border-slate-700")
                    }
                >
                    <p className="text-lg font-semibold sm:text-xl">Other</p>
                    <p className="">n/a</p>
                </button>
            </div>
            {showCoffeeTypes && (
                <select
                    onChange={(e) => setSelectedCoffee(e.target.value)}
                    id="coffee-list"
                    name="coffee-list"
                    className="rounded-md border border-slate-200 bg-slate-100 p-4 focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900"
                >
                    <option value={null}>Select type</option>
                    {coffeeOptions.map((option, optionIndex) => {
                        return (
                            <option value={option.name} key={optionIndex}>
                                {option.name} ({option.caffeine}mg)
                            </option>
                        );
                    })}
                </select>
            )}
            <h3 className="text-lg sm:text-xl">Add the cost ($)</h3>
            <input
                onChange={(e) => {
                    setCoffeeCost(e.target.value);
                }}
                value={coffeeCost}
                className="rounded-md border border-slate-200 bg-slate-100 p-4 focus:border-cyan-500 sm:w-1/4 dark:border-slate-700 dark:bg-slate-900"
                type="number"
                min="0"
            />
            <h3 className="text-lg sm:text-xl">Time since consumption</h3>
            <div className="flex gap-4">
                <div>
                    <p className="mb-2">Hours</p>
                    <select
                        onChange={(e) => setHour(e.target.value)}
                        value={hour}
                        className="rounded-md border border-slate-200 bg-slate-100 p-4 focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900"
                        id="hours-select"
                    >
                        {[
                            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                            15, 16, 17, 18, 19, 20, 21, 22, 23,
                        ].map((hour, hourIndex) => {
                            return (
                                <option key={hourIndex} value={hour}>
                                    {hour}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <p className="mb-2">Mins</p>
                    <select
                        onChange={(e) => setMin(e.target.value)}
                        value={min}
                        className="rounded-md border border-slate-200 bg-slate-100 p-4 focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900"
                        id="mins-select"
                    >
                        {[0, 5, 10, 15, 30, 45].map((min, minIndex) => {
                            return (
                                <option key={minIndex} value={min}>
                                    {min}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <button
                onClick={handleSubmitForm}
                className="self-start rounded-md bg-cyan-500 px-6 py-3 font-semibold text-white duration-200 hover:bg-cyan-400"
            >
                <p>Add Entry</p>
            </button>
        </div>
    );
}
