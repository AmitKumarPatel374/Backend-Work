const express = require("express")
const cors = require("cors")
const multer = require("multer")
const path = require("path")


const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,"uploads")));


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{    
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,Math.random()+file.originalname);
    }
})

const upload = multer({storage});

app.post("/upload",upload.single("image"),(req,res)=>{
    let path = req.file?.filename;
    console.log(path);
    res.send(path);
})


app.listen(3000,()=>{
    console.log("server is running on port 3000");
})