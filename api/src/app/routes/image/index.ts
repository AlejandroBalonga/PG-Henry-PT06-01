import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const {CLOUDINARY_CLOUD_NAME, CLOUDINARY_APY_KEY, CLOUDINARY_APY_SECRET } = process.env

const uploader = multer({ dest: "uploads/" });

const imageRoutes = Router();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_APY_KEY,
  api_secret: CLOUDINARY_APY_SECRET,
});

imageRoutes.post("/", uploader.single("image"), async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: "ok" });
  }
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(201).json({ url: result.url });
  } catch (error) {
    res.status(404).send("no responde");
  }
});

export default imageRoutes;