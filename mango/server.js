const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const lancer=require('./Schema/lancer');
const client = require("./Schema/client");
const project = require("./Schema/project");
const c = require("./Schema/client");

app.listen(5000, function () {
  console.log("Listening on port 5000");
});
const url =
  "mongodb+srv://malay:1234@cluster0.t0pj9ge.mongodb.net/tt?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url).then(() => console.log('Connected to database')).catch((error) => console.log(error))

app.use(cors());
app.use(express.json());

app.set("views",'src');
app.post('/login',async (req,res)=>{

    const { username , password } = req.body;

    try{
        const flag=0;
        let t = client.findOne({ username }).then((result) => {
          if(result){
                if(result.password != password)
                {
                  res.send({
                    message : 'Invalid password',
                    flag : 1
                  })
                }
                res.send({
                    message : 'Login_Client',
                    result,
                    flag : 0
                })
          }
        });
        t = lancer.findOne({username}).then((result)=>{
            if(result){
                if(result.password != password)
                {
                  res.send({
                    message : 'Invalid password',
                    flag : 1
                  })
                }
                res.send({
                    message : 'Login_lancer',
                    result,
                })
            }
            else{
                res.send({
                    message : "Please enter a valid username"
                })
            }
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            message : 'Internal Server Error'
        })
    }
});


app.post("/signup", async (req, res) => {
  const { name, username , password,email,skills } = req.body;

  try {
    const flag = 0;

    const user2=new lancer({
        name : name,
        username : username,
        password : password,
        email : email,
        skills : skills,
        rating :0

    })

    let t = client.findOne({ username }).then((result) => {
      if (result) {
        res.send({
          message: "enter another user name",
          flag:1
        });
      }
    });
    t = lancer.findOne({ username }).then((result) => {
      if (result) {
        res.send({
          message: "enter another user name",
          flag:1
        });
      } else {
        user2.save();
        res.send({
            message:"Done",
            flag:0
        })
      }
    });    
    
   
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});


app.post("/myprofile/:user",(req,res)=>{
  const url= req.url;
  let id = '';
  for(let i=0;i<url.length;i++)
  {
     if(url[i]=='/')id='';
     else id+=url[i];
  }
  const username = id;
  // console.log(username);  
    try{
        const flag=0;
        let t = client.findOne({ username }).then((result) => {
          if(result){
                res.send({
                    flag : 1,
                    result
                })
          }
        });
        t = lancer.findOne({username}).then((result)=>{
            if(result){
                res.send({
                    flag : 0,
                    result,
                })
            }
            else{
                res.send({
                   flag : 2,
                })
            }
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            message : 'Internal Server Error'
        })
    }
})

app.post("/update",(req,res)=>{
     const { name, username, password, email, skills } = req.body;

     try {
       const flag = 0;
      lancer.findOneAndDelete({username})
      .then(()=>{
        const user2 = new lancer({
          name: name,
          username: username,
          password: password,
          email: email,
          skills: skills,
          rating: 0,
        });
         user2.save();
         res.status(500).send({
           message: "Doneee",
         });
      })
     } catch (error) {
       console.log(error);
       res.status(500).send({
         message: "Internal Server Error",
       });
     }
})