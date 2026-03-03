import express from "express";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postsRoute from "./routes/posts.js";
import uploadRoute from "./routes/upload.js";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

//データベース接続
mongoose.connect(
    process.env.MONGOURL
).then(() => {
    console.log("DBと接続中・・・");
}).catch((err) => {
    console.log(err);
});

//ミドルウェア
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/upload", uploadRoute);

// app.get("/", (req, res) => {
//     console.log(req.query.test)
//     res.send("hello express");
// });

// app.get("/kanaya", (req, res) => {
//     res.send("kanaya!");
// });

app.listen(PORT, () => console.log("サーバーが起動しました"));