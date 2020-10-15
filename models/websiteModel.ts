import { model, Schema } from "mongoose";

const website = new Schema(
    {
        url: String,
        title: String,
        authorID: String
    },
    {
        timestamps: true
    }
);

export = model("websites", website);