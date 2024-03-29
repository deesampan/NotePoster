import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

const emoji = [
    "😎","😱","😭","😡","😛","😂","😨","🙄","😴","🤑","🤢","🥶","🥺","🤔","😋","🤡","🧐","👽"
];

const data = [

];

app.get("/",(req,res)=>{
    res.render("index.ejs",{data: data});
});

app.get("/send",(req,res)=>{ 
    res.redirect("/");
});

app.post("/delete",(req,res)=>{
    console.log(data);
    console.log(req.body);
    
    for(var i = 0; i< data.length;i++){
        if (data[i].title === req.body.delName){
            console.log("yes!! its at : ", i);
            data.splice(i,1);
        }
    }

    console.log(data);

    res.render("index.ejs",{data: data});
});

app.post("/send",(req,res)=>{
    
    if (req.body.dateChoice === undefined){
        res.render("index.ejs",{data: data});
        
        console.log("you forgot to choose date");
    }else{
        console.log(req.body)
        const newData = {
            title: req.body.topicer,
            dateChoice: req.body.dateChoice + emoji[Math.floor(Math.random() * emoji.length)],
            content: req.body.contenter
        };

        data.push(newData);

        res.render("index.ejs",{data: data});

        console.log("you got it!");
    }
});

app.listen(port,()=>{
    console.log("server is work");
})