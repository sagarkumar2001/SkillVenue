const express=require("express");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const encrypt=require("mongoose-encryption");
const md5=require("md5");
require('dotenv').config();

const app=express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true});

const userSchema=new mongoose.Schema({
    email:String,
    password:String
});
const feedSchema=new mongoose.Schema({
    user:String,
    email:String,
    detail:String
});
const contactSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    message:String,
    detail:String
});

const User=mongoose.model("User",userSchema);
const People=mongoose.model("People",feedSchema);
const Contact=mongoose.model("Contact",contactSchema);
var check=false;
app.get("/",function(req,res){
    check=false;
    res.render("home");
})
app.get("/home",function(req,res){

    res.render("home");
   
});
app.get("/feedback",function(req,res){
    if(check===true){
    res.render("feedback");
    }
    else{
        res.render("login");
    }
});
app.get("/portfilio",function(req,res){
    if(check===true){
        res.render("portfilio");
        }
        else{
            res.render("login");
        }
    
});
app.get("/review",function(req,res){
    if(check===true){
        res.render("review");
        }
        else{
            res.render("login");
        }
   
});
app.get("/contact",function(req,res){
    if(check===true){
        res.render("contact");
        }
        else{
            res.render("login"); 
        }
    
});
app.get("/services",function(req,res){
    if(check===true){
        res.render("services");
        }
        else{
            res.render("login");
        }
    
});
app.get("/subject",function(req,res){
    if(check===true){
        res.render("subject");
        }
        else{
            res.render("login");
        }
    
});
app.get("/login",function(req,res){
    res.render("login");
});
app.get("/register",function(req,res){
    res.render("register");
});
app.post("/fed",function(req,res){
    const newpeople=new People({
        user:req.body.person,
        email:req.body.mail,
        detail:req.body.additional
    });
    newpeople.save();
    res.render("submit");
});

app.post("/register",function(req,res){
    const newuser= new User({
       email: req.body.username,
       password:md5(req.body.password)
    });
    newuser.save();
    res.render("login");
});
app.post("/contact",function(req,res){
    const newcontact= new Contact({
        firstName:req.body.fname,
        lastName:req.body.lname,
        email:req.body.email,
        message:req.body.message,
        detail:req.body.additional
    });
    newcontact.save();
    res.render("submit");
});




app.post("/login",function(req,res){
   const username = req.body.username;
   const password = md5(req.body.password);

   User.findOne({email:username})
   .then((foundUser) => {
       if(foundUser){
           if(foundUser.password === password){
              check=true;
               res.render("home");
         }
           else{
            res.redirect("login");
           }
       }
  })
  .catch(() => {
      res.redirect("login");
  });
     
});


app.listen(3000,function(){
    console.log("Server is running at port at 3000");
})
