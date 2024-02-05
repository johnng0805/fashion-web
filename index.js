const express = require("express");
const path = require("path");
const multer = require("multer");
const { default: axios } = require("axios");

const app = express();
const PORT = 4001;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + "_" + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static("static"));
app.use(express.static("uploads"));
app.use(express.static("fashion-training")); // put your fashion-training folder here

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.post("/upload", upload.single("image"), async (req, res) => {
    var data = {
        "image": req.protocol + "://" + req.get("host") + "/" + req.file.filename,
        "attrs": req.body.user_text
    }

    await axios.post("http://localhost:8000/submit", data).then(response => {
        res.send(response.data);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});