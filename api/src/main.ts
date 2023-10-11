import boot from "./boot";
import env from "./configs/env";
import domains from "./configs/domains";

const main = async () => {
    const app = await boot(domains);
    app.listen(env.PORT, () => {
        console.log(`Server in running on port: ${env.PORT}`);
    });
};

main().catch((err) => {
    console.error(err);
    process.exit();
});
