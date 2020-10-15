import mongoose from "mongoose";
import { mongodb_uri } from "../config.json";

mongoose.connect(mongodb_uri, { useUnifiedTopology: true, useNewUrlParser: true })
.catch(e => console.error(e));

export = mongoose.connection;