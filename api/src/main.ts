import boot from "./boot";
import env from "./configs/env";

const main = async () => {
    const app = await boot();
    app.listen(env.PORT, () => {
        console.log(`Server in running on port: ${env.PORT}`);
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
