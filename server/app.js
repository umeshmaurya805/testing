var express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var path = require("path");

(passport = require("passport")),
(User = require("./model/users.js")),
(Blog = require("./model/blog.js")),
(LocalStrategy = require("passport-local"));

var methodOverride = require("method-override");

 
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.json({ type: 'application/json' }))


mongoose
  .connect(
    "mongodb+srv://hits:hits@hitswebsite.qtgeh.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

app.use(
  require("express-session")({
    secret: "Once again the monsoon arrives!",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use('/api/products', require('./routes/productsRoutes'));

/* app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
}); */

/* app.get("/", function (req, res) {
  res.render("index");
}); */

/* app.get("/login", function (req, res) {
  res.render("login");
 //res.json("logged in");
}); */

/* app.get("/register", function (req, res) {
  res.render("register");
}); */

app.get("/logout", function (req, res) {
    console.log(req.user);
    req.logout();
    req.flash("success", "Logged Out !! Successfully ");
  
    res.redirect("/");
  });
  
  app.get("/users",function(req,res){
    console.log(req.user._id);
    User.find()
      .then(users=> res.json(users))
      .catch(err => res.status(400).json('Error:'+err));
  });
  /* 
app.post("/test",function(req,res){
  console.log(req.body.username);
  res.send(req.body.username);
});
 */
app.post("/register", function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            
            res.send(err);
          }
        passport.authenticate("local")(req, res, function(){
            //req.flash("success", "Welcome to YelpCamp " + user.username);
           res.send("done"); 
        });
    });
      
    });
    
    app.post(
      "/login",
      passport.authenticate("local", {
        successRedirect: "/users",
        failureRedirect: "/register"
       // failureFlash: true,
      }),
      function (req, res) {
        //const usern = req.body.username;
        //console.log(error + success);
        console.log("done");
        res.send("success");
      }
    );
  
    app.get("/blog", function(req, res){
      // Get all campgrounds from DB
      Blog.find({}, function(err, allBlogs){
         if(err){
             console.log(err);
         } else {
          res.json(allBlogs);
          // res.render("campgrounds/index",{campgrounds:allCampgrounds});      
         }
      });
  });
  /* app.get("/blog/new",(req,res)=> {
  res.render("blognew");
  }); */
  
      app.post("/blog/new",(req,res)=> {
       const {name,image,description}=req.body;
       /*  var author={
            id: "5fe44acf0a983cc72c726b73",
            username: "gt@hits.com"
        } */
  
        if(!name || !description  || !image){
          res.json({err:"All fields are required"});
        }
        const newBlog = new Blog({name, image, description});
        
      
        // Create a new campground and save to DB
        newBlog.save().then(()=>{
          res.json({msg: "Post Created"});
          
        }).catch((err)=> {
          console.log(err);
        });
          
           
      });
  
      //blog update
  
      app.put("/blog/:id", function(req, res){
        // find and update the correct campground
        Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
           if(err){
            res.json({err:err});
               //res.redirect("/blogs");
           } else {
               //redirect somewhere(show page)
               res.json({msg: "Post Updated"});
              // res.redirect("/blogs/" + req.params.id);
           }
        });
    });
  
    
    /* function isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/login");
    }
     */
    
    const PORT = process.env.PORT || 8000;
    
    app.listen(PORT, function () {
      console.log("server started at 8000 port");
    });