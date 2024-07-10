
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { functions, lowerCase } = require("lodash");

const homeStartingContent = "Introducing \"Asmi's Corner\" a captivating blend of thoughts, ideas, and experiences curated by me. With an insatiable curiosity for the world and a passionate voice yearning to be heard, I invites you to join my on a journey of self-discovery and exploration through my personal blog. Through heartfelt anecdotes, insightful musings, and a touch of whimsy, Asmi's Corner is a digital sanctuary where authenticity reigns supreme. So grab a cup of tea, settle into a cozy spot, and let my words transport you to a realm where imagination knows no bounds and inspiration awaits at every turn. ";
const aboutContent = "Hello there! I'm Asmi, a passionate soul with an insatiable love for all things creative and technological. As a CSE (Computer Science and Engineering) student on a journey of self-discovery, I am fascinated by the ever-evolving world of web development.When I'm not immersed in the world of web development, you can find me lost in the mesmerizing melodies of music, which has the power to transport me to another realm.   In this ever-evolving journey of self-discovery, I aim to embrace every experience that life offers and share the wonders of my world with you through my personal blog.Together, let's explore the wonders of the digital landscape and the beauty that surrounds us in the natural world. Welcome to my corner of inspiration and innovation!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let posts =[];


app.get("/",function(req,res){

  res.render("home", {homeStartingContent: homeStartingContent, posts:posts});
})


app.get("/contact",function(req,res){

  res.render("contact");
})


app.get("/about",function(req,res){

  res.render("about", {aboutContent: aboutContent});
})

app.get("/compose",function(req,res){

  res.render("compose");
})

app.get("/posts/:topic",function(req,res){
  
  posts.forEach((function(post){
    let topi = lowerCase( req.params.topic);
    if(lowerCase(post.title) == topi ){

      res.render("post",{title:post.title, content:post.content});
    }
  }))

})


app.post("/compose",function(req,res){
  
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  
  res.redirect("/");

})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
