const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.get('/notes',(req,res)=>{
    res.send(notes);
})

app.post("/notes",(req,res)=>{
    notes.push(req.body);
    res.send("note added successfully");
})

app.delete("/notes/:index",(req,res)=>{
    const index = req.params.index
    delete notes[index]
    res.send("note deleted succesfully!");
})

app.patch("/notes/:index",(req,res)=>{
    const index = req.params.index;
    const description = req.body.description;

    notes[index].description = description;

    res.send("notes updated successfully!")
})

app.listen(3000,()=>{
    console.log("runnig on port 3000");
})