import express from "express"
import { getAllCodes, getCodeById, insertNewCode } from "./index.js"
import cors from "cors"
import bodyParser from "body-parser"
import 'dotenv/config'
const app = express()
const port=3000
const url=process.env.url
app.use(cors({
    origin:url
}
))
app.use(bodyParser.json())
app.get("/codes",async (req,res)=>{
    const resp=await getAllCodes()
    return res.json(resp)
})
app.post("/codes/add",async (req,res)=>{
    const {name,language,code,stdin,stdout,status}=req.body
    try{
    await insertNewCode(name , code , stdin , language , stdout,status)
    res.sendStatus(200);
    }
    catch(error){
        res.json({error,})
    }
})
app.get("/codes/:id",async (req,res)=>{
    const id=(Number)(req.params.id)
    const resp=await getCodeById(id)
    res.json({code:resp})
})
app.listen(3000,()=>{
    console.log("Listening on port 3000")
})