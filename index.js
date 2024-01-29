express = require("express")

app =  express()
port = 8080
const path = require('path')
const {v4:uuidv4} = require("uuid")

app.use(express.urlencoded({extended:true}));
app.set("views engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")));

app.listen(port,() =>{
    console.log(`we are hearing you on ${port}`);
})

posts = [
    {
        id: uuidv4(),
        username : "Kunjesh",
        content :"Love to code" ,
        

    }
]
app.get("/post" ,(req,res) =>{
    res.render('index.ejs' , { posts })
})

app.get("/post/new",(req,res)=>{

    res.render("new.ejs")
})

app.post("/post",(req,res) =>{
    console.log(req.body);
    let {username ,content } = req.body;
    let id = uuidv4()
    posts.push({id,username,content})
    res.redirect("/post")
})

app.get("/post/:id" ,(req,res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id)
    console.log(post);
    res.render("show.ejs",{post});
  
});


app.patch("/post/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent
    res.redirect("/post")
})

app.get("post/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.redirect("/post")

})

app.get("/post/:id",(req,res)=>{
    let {id} =  req.params;
    post = posts.filter((p)=> id !== p.id)
    res.redirect("/post")

})