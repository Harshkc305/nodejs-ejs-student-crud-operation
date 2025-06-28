

require("dotenv").config()
const express=require("express");
const app=express();

const db=require("./config/db")


// const path= require("path")

app.set("view engine", "ejs")
app.set("views", "views")


app.use(express.urlencoded({extended:true}))


app.use(require("./routes/app.routes"))


app.listen(process.env.port, async()=>{

    await db.connectDb()

    console.log(`server is nunning @http://127.88.01:${process.env.port}`)
})