import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage });

//画像アップロード用API
router.post("/", upload.single("file"), (req, res) => {
    try{
        return res.status(200).json("画像アップロードに成功しました");
    }catch(err){
        console.log(err);
    }
})

export default router;