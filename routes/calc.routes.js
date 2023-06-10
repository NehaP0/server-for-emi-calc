const express = require("express")
const CalcModel = require("../models/calc.model")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")

const calcRoutes = express.Router()

calcRoutes.post("/calc", async(req, res)=>{
    const {loan,interestRate,tenure} = req.body
    try{
        const data = {
            "EMI" : 0,
            "Interest" : 0,
            "TotalPayment" : 0
        }

        // E = P*r*( 1 + r )n/(( 1 + r )n - 1 ) 
        let E = loan*(interestRate/12/100)*(1+(interestRate/12/100)*tenure*12 / ((1+(interestRate/12/100)*tenure*12)-1))
        data["EMI"] = E
    }
    catch(err){
        res.status(400).send({"msg": err.message})
    }
})
