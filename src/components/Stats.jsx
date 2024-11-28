import { useAuth } from "../context/AuthContext";
import {
    calculateCoffeeStats,
    calculateCurrentCaffeineLevel,
    getTopThreeCoffees,
    statusLevels,
} from "../utils";

function StatCard({ lg, title, children }) {
    return (
        <div
            className={
                "rounded-md border-2 border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-900" +
                (lg ? " sm:col-span-2" : "")
            }
        >
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">{title}</h3>
            {children}
        </div>
    );
}

export default function Stats() {
    const { globalData } = useAuth();

    const stats = calculateCoffeeStats(globalData);

    const caffeineLevel = calculateCurrentCaffeineLevel(globalData);

    const warningLevel =
        caffeineLevel < statusLevels["low"].maxLevel
            ? "low"
            : caffeineLevel < statusLevels["moderate"].maxLevel
              ? "moderate"
              : "high";

    return (
        <div className="flex flex-col gap-6 py-8 sm:py-12">
            <div className="flex items-center gap-2 text-3xl font-semibold">
                <span className="material-symbols-outlined text-3xl">
                    bar_chart
                </span>
                <h2>Stats</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <StatCard lg title="Active Caffeine Level">
                    <div className="mb-2 flex items-center gap-4">
                        <p className="text-lg">
                            <span>{caffeineLevel}</span>mg
                        </p>
                        <p
                            className="inline-block rounded px-4 py-1 font-bold capitalize"
                            style={{
                                color: statusLevels[warningLevel].color,
                                background:
                                    statusLevels[warningLevel].background,
                            }}
                        >
                            {warningLevel}
                        </p>
                    </div>
                    <p>{statusLevels[warningLevel].description}</p>
                </StatCard>
                <StatCard title="Daily Caffeine">
                    <p>
                        <span className="sm:text-lg">
                            {stats.daily_caffeine}
                        </span>
                        mg
                    </p>
                </StatCard>
                <StatCard title="Avg # of Coffees">
                    <p className="sm:text-lg">{stats.average_coffees}</p>
                </StatCard>
                <StatCard title="Daily Cost ($)">
                    <p>
                        $ <span className="sm:text-lg">{stats.daily_cost}</span>
                    </p>
                </StatCard>
                <StatCard title="Total Cost ($)">
                    <p>
                        $ <span className="sm:text-lg">{stats.total_cost}</span>
                    </p>
                </StatCard>
                <table className="border-separate border-spacing-0 rounded-md border-2 border-slate-200 text-sm sm:col-span-2 sm:text-lg dark:border-slate-700">
                    <thead>
                        <tr className="*:border-b-2 *:bg-slate-100 *:px-4 *:py-2 *:dark:border-slate-700 *:dark:bg-slate-900">
                            <th className="rounded-tl-[4px]">Coffee Name</th>
                            <th className="border-l-2">Number of Purchase</th>
                            <th className="rounded-tr-[4px] border-l-2">
                                Percentage of Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTopThreeCoffees(globalData).map(
                            (coffee, coffeeIndex) => {
                                return (
                                    <tr
                                        key={coffeeIndex}
                                        className="text-center *:px-4 *:py-1"
                                    >
                                        <td>{coffee.coffeeName}</td>
                                        <td className="border-l-2 border-slate-200 dark:border-slate-700">
                                            {coffee.count}
                                        </td>
                                        <td className="border-l-2 border-slate-200 dark:border-slate-700">
                                            {coffee.percentage}
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
