const mongoose = require('mongoose');
const chat = require("./models/chat.js");

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatDB');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let Allchats = [
    {
    from : "Sahil",
    to : "Garima",
    msg : "Love you laa",
    created_at : new Date(),
    },
    {
    from : "Ronaldo",
    to : "Messi",
    msg : "k xa vai",
    created_at : new Date(),
    },
    {
    from : "Sahil",
    to : "Garimas",
    msg : "Love you moree laaa",
    created_at : new Date(),
    },
    {
    from : "Refree",
    to : "Ronaldo",
    msg : "You pendaldo",
    created_at : new Date(),
    }
];

chat.insertMany(Allchats);

// chat.save().then((res)=>{
//     console.log(res);
// });