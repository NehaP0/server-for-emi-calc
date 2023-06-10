const express = require("express")
const UserModel = require("../models/users.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRoutes = express.Router()

userRoutes.post("/register", async(req, res)=>{
    const {name, email, password} = req.body
    try{
        bcrypt.hash(password, 5, async function(err, hash){
            if(hash){
                const user = UserModel({name, email, password : hash})
                await user.save()
                res.status(200).send({"msg":"User Registered"})
            }
            else{
                res.status(200).send({"msg": "Hashing Failed"})
            }
        })
    }
    catch(err){
        res.status(400).send({"msg": err.message})
    }
})


userRoutes.post("/login", async(req, res)=>{
    const {email, password} = req.body
    try{
        const user = await UserModel.findOne({email})

        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({user: user._id}, "masai")                    
                    // localStorage.setItem("token", token)
                    // localStorage.setItem("email",user._id)

                    res.status(200).send({"msg": "Login Successfull", token: token})
                }
                else{
                    res.status(200).send({"msg": "Incorrect password"})
                }
            })
        }
        else{
            res.status(200).send({"msg" : "Invalid Credentials"})
        }
    }

    catch(err){
        res.send({"msg" : err.message})
    }
})

// userRoutes.get("/id", async(req, res)=>{    
//     const id = localStorage.getItem("id")
//         const user = await UserModel.findOne({_id : id})
//         res.status(200).send({user : user})   

// })




module.exports = userRoutes
