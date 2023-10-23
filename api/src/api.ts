import app from "@base/app";
import env from "@configs/env";

const main = async () => {
    (await app()).listen(env.PORT, () => {
        console.log(`api is running... on port: ${env.PORT}`);
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
