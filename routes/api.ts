import { Router } from "express";
import Website from "../models/websiteModel";
import { isEmpty } from "../util";

const router = Router();

// Create Website

router.post("/website", async (req, res) => {
    if (isEmpty(req.body.userID) || isEmpty(req.body.url) || isEmpty(req.body.title)) {
        return res.status(403).json({ success: false, message: "403 Forbidden" });
    }

    const user_id = req.body.userID as string,
          url = req.body.url as string,
          title = req.body.title as string;

    await Website.findOne({ authorID: user_id }, async (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, err });
        } else {
            if (!result) {
                const db = new Website({ url, title, authorID: user_id });
                db.save().then(() => {
                    return res.status(200).json({ success: true, message: "Your website has been added!" });
                }).catch(e => console.error(e));
            } else {
                await Website.find({}, (error, results) => {
                    if (error) {
                        return res.status(400).json({ success: false, error });
                    }
                    if (!results.length) {
                        return res.status(404).json({ success: false, message: "No more websites" });
                    } else {
                        const user = results.filter(obj => (obj as any).authorID === user_id);
                        if (user.filter(sub => (sub as any).url === url).length == 1) {
                            return res.status(200).json({ success: false, message: "URL is added!" });
                        } else {
                            const db = new Website({ url, title, authorID: user_id });
                            db.save().then(() => {
                                return res.status(200).json({ success: true, message: "Your URL has been added!" });
                            }).catch(ep => console.error(ep));
                        }
                    }
                });
            }
        }
    });
});

// Delete website

router.delete("/website/:id", async (req, res) => {
    if (isEmpty(req.params.id)) {
        return res.status(403).json({ success: false, message: "ID cannot be empty!" });
    } else {
        await Website.findOneAndDelete({ _id: req.params.id }, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    err
                });
            }
            if (!result) {
                return res.status(404).json({ success: false, message: "Not found" });
            }
            return res.status(200).json({ success: true, result });
        }).catch(e => console.error(e));
    }
});

export = router;