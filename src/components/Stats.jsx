import {
    calculateCoffeeStats,
    calculateCurrentCaffeineLevel,
    coffeeConsumptionHistory,
    getTopThreeCoffees,
    statusLevels,
} from "../utils";

function StatCard({ lg, title, children }) {
    return (
        <div
            className={
                "rounded-md border-2 border-cyan-200 bg-cyan-50 p-4 dark:border-slate-700 dark:bg-slate-900" +
                (lg ? " sm:col-span-2" : "")
            }
        >
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            {children}
        </div>
    );
}

export default function Stats() {
    const stats = calculateCoffeeStats(coffeeConsumptionHistory);

    const caffeineLevel = calculateCurrentCaffeineLevel(
        coffeeConsumptionHistory,
    );

    const warningLevel =
        caffeineLevel < statusLevels["low"].maxLevel
            ? "low"
            : caffeineLevel < statusLevels["moderate"].maxLevel
              ? "moderate"
              : "high";

    return (
        <div className="flex flex-col gap-6 py-12">
            <div className="flex items-center gap-2 text-3xl font-semibold">
                <span class="material-symbols-outlined text-3xl">
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
                        <span className="text-lg">{stats.daily_caffeine}</span>
                        mg
                    </p>
                </StatCard>
                <StatCard title="Avg # of Coffees">
                    <p className="text-lg">{stats.average_coffees}</p>
                </StatCard>
                <StatCard title="Daily Cost ($)">
                    <p>
                        $ <span className="text-lg">{stats.daily_cost}</span>
                    </p>
                </StatCard>
                <StatCard title="Total Cost ($)">
                    <p>
                        $ <span className="text-lg">{stats.total_cost}</span>
                    </p>
                </StatCard>
                <table className="col-span-2 text-lg">
                    <thead className="dark:bg-slate-900">
                        <tr className="*:px-4 *:py-2">
                            <th>Coffee Name</th>
                            <th>Number of Purchase</th>
                            <th>Percentage of Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTopThreeCoffees(coffeeConsumptionHistory).map(
                            (coffee, coffeeIndex) => {
                                return (
                                    <tr
                                        key={coffeeIndex}
                                        className="text-center"
                                    >
                                        <td>{coffee.coffeeName}</td>
                                        <td>{coffee.count}</td>
                                        <td>{coffee.percentage}</td>
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
