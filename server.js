const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const s = require("./schema");
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index", {});
});
app.use(express.urlencoded({extended : true}));
const url =
  "mongodb+srv://malay:1234@cluster0.t0pj9ge.mongodb.net/tt?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(url)
  .then((result) => console.log("hi"))
  .catch((err) => console.log(err));

app.listen(3000);
app.get("/add", (req, res) => {
  const a = new s({
    username: "aditya randva",
    password: "12345678n",
  });
  a.save();
  for (let i = 0; i < 10; i++) {
    const k = "naam" + i;
    const p = "123" + i;
    const mee = new s({
      username: k,
      password: p,
    });
    mee.save();
  }

  res.render("index");
});
app.get("/show", (req, res) => {
   s.find()
     .sort({ createdAt: -1 })
     .then((result) => {
       res.render("show", { s: result, title: "All blogs" });
     })
     .catch((err) => {
       console.log(err);
     });
});

app.get('/register',(req,res)=>{
  res.render('takeinput');
})
app.post('/he',(req,res)=>{
  const prof= new s(req.body);
  prof.save()
  .then((result)=>{
     const link = '/show/'+ result._id.toString();
     res.redirect(link);
  })
 

})
app.get('/login',(req,res)=>{
    res.render('lgin');
})
app.post('/login',(req,res)=>{
    const username = req.body.username;
    const t = s.findOne({username}).then((result)=>
    {if(result)
    {
      console.log('here');
    }
    else
    {
        res.json({ redirect :'/login'})
    }}
  );
})
app.get('/show/:id',(req,res)=>{
  const id =req.params.id;
  s.findById(id)
  .then(result=>{
    res.render('getone',{id : result});
  })
})