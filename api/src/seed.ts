import domains from "@configs/domains";
import { loadDynamically } from "@helpers/units";
import { faker } from "@faker-js/faker";

const main = async () => {
    for (const domain of domains) {
        const m = await loadDynamically(`domains/${domain}/seeder`);
        await m.default(faker);
    }
};

main().then(() => {});
