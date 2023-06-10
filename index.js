const express = require("express")
const cors = require("cors")
const connection = require("./db")
const userRoutes = require("./routes/users.routes")

const auth = require("./middlewares/auth")

const server = express()

server.use(express.json())
server.use(cors())

server.use("/users", userRoutes)

server.use(auth)


server.listen(7000, async()=>{
    try{
        await connection
        console.log("connection established");

    }
    catch(err){
        console.log(err);
    }

    console.log("server running at port 7000");
})