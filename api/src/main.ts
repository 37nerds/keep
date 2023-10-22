import app from "./base/app";
import env from "./configs/env";

const main = async () => {
    const a = await app();
    a.listen(env.PORT, () => {
        console.log(`Server in running on port: ${env.PORT}`);
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
