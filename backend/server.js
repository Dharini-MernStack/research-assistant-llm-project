require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const uploadRoute = require("./routes/upload.js");

const app = express();

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

app.use(cors());
app.use(express.json());
app.use("/upload", uploadRoute);

app.get("/", (req, res) => {
    res.json({ message: "Research Assistant Backend Running 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));