import {
    calculateCurrentCaffeineLevel,
    coffeeConsumptionHistory,
    getCaffeineAmount,
    timeSinceConsumption,
} from "../utils";

export default function History() {
    return (
        <div className="flex flex-col gap-4 py-12">
            <div className="flex items-center gap-2 text-3xl font-semibold">
                <span class="material-symbols-outlined text-3xl">timeline</span>
                <h2>History</h2>
            </div>
            <p className="italic">Hover for more information!</p>
            <div className="flex flex-wrap gap-x-2">
                {Object.keys(coffeeConsumptionHistory)
                    .sort((a, b) => b - a)
                    .map((utcTime, coffeeIndex) => {
                        const coffee = coffeeConsumptionHistory[utcTime];
                        const timeSinceConsume = timeSinceConsumption(utcTime);
                        const originalAmount = getCaffeineAmount(coffee.name);
                        const remainingAmount = calculateCurrentCaffeineLevel({
                            [utcTime]: coffee,
                        });

                        const summary = `${coffee.name} | ${timeSinceConsume} | $${coffee.cost} | ${remainingAmount}mg / ${originalAmount}mg`;

                        return (
                            <div
                                title={summary}
                                key={coffeeIndex}
                                className="flex cursor-pointer"
                            >
                                <span class="material-symbols-outlined text-3xl">
                                    coffee
                                </span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
