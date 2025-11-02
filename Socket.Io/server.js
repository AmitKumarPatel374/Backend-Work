// const express = require("express");
// const http = require("http");
// const path = require("path");
// const socketIo=require("socket.io");


// const app = express();
// const server = http.createServer(app);
// const io = new socketIo.Server(server);

// app.set('view engine','ejs');
// app.set('views',path.join(__dirname,"views"));

// app.get('/',(req,res)=>{
//     res.render("index",{id:"mamamamamamam"});
// })

// io.on("connection",(socket)=>{
//     console.log("user Connected",socket.id);
//     socket.on("message",(msg)=>{
//         // console.log("very good",msg);
//         io.emit("message","server from this side");
//     })
// })


// server.listen(3000,()=>{
//     console.log("server is running on port 300");
// })


const express = require("express");
const http = require("http");
const path = require("path");
const socketIo=require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));

app.get('/',(req,res)=>{
    res.render("index",{id:"mamamamamamam"});
})

io.on("connection",(socket)=>{
    console.log("user Connected",socket.id);
    socket.on("join-room",(obj)=>{
        socket.join(obj.roomId);
        console.log("room created with this room name->",obj);
        io.to(obj.roomId).emit("room-created",obj);
        // console.log("very good",msg);
        socket.emit("joined-room","tune room join kiya!");
    })
    socket.on("joined-room",(msg)=>{
        console.log(msg);
    })

    socket.on("chat",(msg)=>{
        console.log(msg);
        socket.emit("chat","mill gya")
    })
})


server.listen(3000,()=>{
    console.log("server is running on port 300");
})