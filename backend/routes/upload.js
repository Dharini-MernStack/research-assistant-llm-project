import express from "express";
import multer from "multer";
import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    const previewText = data.text.substring(0, 500);

    console.log("Extracted Text Preview:");
    console.log(previewText);

    res.json({
      message: "PDF processed successfully",
      preview: previewText
    });

  } catch (error) {
    console.error("PDF processing error:", error);
    res.status(500).json({ error: "PDF processing failed" });
  }
});

export default router;