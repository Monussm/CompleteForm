const express=require('express');
const app=express();
const hbs=require('hbs');
const path=require('path');
const port=process.env.port || 3000
const mypath=path.join(__dirname,"../public");
const mypartials=path.join(__dirname,"../partials");
app.use(express.static(mypath));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine','hbs');
hbs.registerPartials(mypartials);
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
mongoose.set('strictQuery', true);
await mongoose.connect('mongodb://127.0.0.1:27017/info');
};
const forminfo= new mongoose.Schema({
    fullname:String,
    fullemail:String,
    fullmobileno:Number,
    fullpassword:Number,
    fullconfirm:Number
  });
  const form= mongoose.model('form',forminfo);
app.get("/",(req,res)=>{
const params={}
res.render('index')
})
app.post("/",async(req,res)=>{
const mydata=new form({
fullname:req.body.fullname,
fullemail:req.body.fullemail,
fullmobileno:req.body.fullmobileno,
fullpassword:req.body.fullpassword,
fullconfirm:req.body.fullconfirm,
})
res.render('register')
await mydata.save()
})
app.listen(port)
