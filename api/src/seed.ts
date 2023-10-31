import { loadDynamically } from "@/helpers/units";
import { faker } from "@faker-js/faker";

import domains, { seed_items_count } from "@/configs/domains";
import app from "@/base/app";
import log from "@/helpers/log";

const main = async () => {
    await app();

    const firstArgument = process.argv[2];

    const dropBeforeSeed = firstArgument === "drop before seed";

    for (const domain of domains) {
        await log.time(`seeding: ${domain}`, async () => {
            const m = await loadDynamically(`domains/${domain}/seeder`);
            const count: number = seed_items_count[domain] || 5;
            await m.default(faker, count, dropBeforeSeed);
        });
    }

    process.exit(0);
};

main().then(() => {});
