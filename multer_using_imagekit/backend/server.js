require("dotenv").config()
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { log } = require("console");
const { sendFiles } = require("./src/services/imagekit");

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, "uploads")));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.array("image"), async (req, res) => {
    try {
        // let path = req.files?.map((elem) => `${elem.filename}`);
        // console.log(path);
        console.log(req.files);
        
        let response = await Promise.all(
            req.files.map(
                async (elem) =>
                    await sendFiles({ file: elem.buffer, fileName: elem.originalname })
            )
        )

        console.log("uploaded image here->", response);

        let imagekitURL = response?.map((elem) => elem.url);
        console.log(imagekitURL);
        res.send(imagekitURL);

    } catch (error) {
        console.log("error->", error);
    }
})

let PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
    
})
