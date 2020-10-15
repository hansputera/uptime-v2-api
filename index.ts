import express from "express";
import { json, urlencoded } from "body-parser";
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.get("/", (_, res) => res.send(""));
app.use("/api", require("./routes/api"));

const listener = app.listen(process.env.PORT ? process.env.PORT : 8080, () => {
    console.info(`Listening to ${(listener.address() as any).port}`);
});