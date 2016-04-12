var express = require("express");
var parser = require("body-parser");
var hbs  = require("express-handlebars");
var mongoose  = require("./db/connection");

var app     = express();

var Candidate = mongoose.model("Candidate");

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
  Candidate.findOne({name: req.params.name}).then(function(candidates){
    res.render("candidates-index",{
      candidates: candidates
    });
  });
});

app.get("/candidates/:name", function(req, res){
  var desiredName = req.params.name;
  var candidateOutput;
  db.candidates.forEach(function(candidate){
    if(desiredName === candidate.name){
      candidateOutput = candidate;
    }
  });
  res.post("/candidates", function(req, res){
    res.json(req.body);
    Candidate.create(req.body.candidate).then(function(candidate){
      res.redirect("/candidates" + candidate.name);
    });
  });
});
app.post("/candidates/:name/delete", function(req, res){
  Candidate.findOneAndRemove({name: req.params.name}).then(function(){
    res.redirect("/canidates")
  });
});

app.post("/candidates/:name", function(req, res){
  Candidate.findOneAndUpdate({name: req.params.name}, req.body.candidate, res.redirect("/candidate/"+candidate.name);
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
