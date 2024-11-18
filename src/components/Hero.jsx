export default function Hero() {
    return (
        <div className="flex flex-col gap-8 py-12 lg:py-24">
            <h1 className="text-4xl font-bold">
                Coffee Tracking for Caffeine Enthusiasts!
            </h1>
            <div>
                <p className="mb-4 text-xl font-semibold">
                    Try Coffee Tracker and start ...
                </p>
                <ul className="pl-4 text-lg *:flex *:items-center *:gap-2">
                    <li className="mb-1">
                        <span className="material-symbols-outlined text-3xl text-cyan-500">
                            check_circle
                        </span>
                        Tracking every coffee
                    </li>
                    <li className="mb-1">
                        <span className="material-symbols-outlined text-3xl text-cyan-500">
                            check_circle
                        </span>
                        Measuring your blood caffeine levels
                    </li>
                    <li>
                        <span className="material-symbols-outlined text-3xl text-cyan-500">
                            check_circle
                        </span>
                        Costing and quanitifying your addition
                    </li>
                </ul>
            </div>
            <div className="max-w-xl rounded-md bg-slate-100 px-5 py-6 dark:bg-slate-900">
                <div className="mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">info</span>
                    <p className="text-2xl font-semibold">Did you know...</p>
                </div>

                <p className="mb-2 font-semibold">
                    That caffeine&apos;s half-life is about 5 hours?
                </p>
                <p>
                    This means that after 5 hours, half the caffeine you
                    consumed is still in your system, keeping you alert longer!
                    So if you drink a cup of coffee with 200 mg of caffeine, 5
                    hours, later, you&apos;ll still have about 100 mg of
                    caffeine in your system.
                </p>
            </div>
        </div>
    );
}
