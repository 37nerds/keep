import worker from "@base/worker";

worker().then(() => {
    console.log("worker is running...");
});
