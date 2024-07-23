const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const chat = require("./models/chat.js")
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatDB');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// let chat1 = new chat({
//     from : "Sahil",
//     to : "Garima",
//     msg : "Love you laa",
//     created_at : new Date(),
// });

// chat1.save().then((res)=>{
//     console.log(res);
// });

app.get("/chats",async (req,res)=>{
    let chats = await chat.find();//chat.find is an asyncronous process so we need to wait
    res.render("chat.ejs",{chats});
})

app.get("/",(req,res)=>{
    console.log("root is working");
})

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/chat",(req,res)=>{
    let {name, message, receiver} = req.body;
    let chat3 = new chat({
        from : name, 
        to : receiver, 
        msg : message ,
        created_at : new Date(),
    })
    chat3.save()
    .then((res)=>console.log("working"))
    .catch((err)=>console.log("error in database"));

    res.redirect("/chats");
})

app.get("/chat/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let Chat = await chat.findById(id);
    res.render("edit.ejs", {Chat});
})

app.get("/chat/:id/delete",async (req,res)=>{
    let {id} = req.params;
    let Chat = await chat.findById(id);
    res.render("delete.ejs", {Chat});
})

app.put("/chat/:id", async(req,res)=>{
    let {id} = req.params;
    let { message} = req.body;
    let updatedMsg = await chat.findByIdAndUpdate(id, {$set :{msg : message}},
    {runValidators:true},{new:true})
    console.log(updatedMsg)
    res.redirect("/chats");
})

app.delete("/chat/:id", async(req,res)=>{
    let {id} = req.params;
    let updatedMsg = await chat.findByIdAndDelete(id)
    res.redirect("/chats");
})


app.listen(3000,(req,res)=>{
    console.log(`Server is listening on port 3000`);
})

