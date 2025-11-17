const express= require("express");
const path = require("path");
const fs = require("fs")
const app =  express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine","ejs")

function toCamelCase(str) {
  return str.split(/[\s_-]+/)
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

app.get("/",(req,res)=>{
    fs.readdir("./files",(err,files)=>{
        res.render("index",{files: files})
    })
})

app.post("/create",(req,res) => {
    fs.writeFile(`./files/${toCamelCase(req.body.title)}.txt`,`${req.body.description}`,(err)=>{
        res.redirect("/")
    })
})

app.get("/files/:filename",(req,res) => {
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        res.render("card_view",{filename: req.params.filename, filedata: filedata})
    })
})





app.listen(3000 , console.log("Server is running at localhost:3000"));

