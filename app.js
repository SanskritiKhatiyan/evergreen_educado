// ======================REQUIRED=========================
require("dotenv").config();
var express = require("express"),
	app = express(),
	bodyparser = require("body-parser"),
	mongoose = require("mongoose"),
	Cat = require("./models/cat"),
	Comment = require("./models/reviews"),
	methodOverride = require("method-override");

//=====================APP CONFIG==========================

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser : true, useUnifiedTopology : true});
app.use(methodOverride("_method"));

// ===================ROUTES===============================

app.get("/",function(req,res){
	res.render("index");
});

// --------------------CAT--------------------------------

app.get("/cat",function(req,res){
	Cat.find({},function(err,cat){
		if(err)
			console.log(err)
		else
		res.render("cat/index",{cat: cat});	
	});
});

app.get("/cat/new",function(req,res){
	res.render("cat/new");
});
	
app.post("/cat",function(req,res){
	Cat.create(req.body.cat,function(err,newCatBook){
		if(err)
			console.log(err)
		else
			res.redirect("/cat");
	});
});

app.get("/cat/:id/edit",function(req,res){
	Cat.findById(req.params.id,function(err,updateBook){
		if(err)
			console.log(err);
		else
			res.render("cat/edit",{cat:updateBook});
	});
});

app.put("/cat/:id",function(req,res){
	Cat.findByIdAndUpdate(req.params.id,req.body.cat,function(err,updatedBook){
		if(err)
			console.log(err)
		else
			res.redirect("/cat/"+req.params.id);
	});
});

app.get("/cat/:id/delete",function(req,res){
	Cat.findByIdAndDelete(req.params.id,function(err){
		if(err)
			console.log("Didnt delete",err)
		else
			res.redirect("/cat")
	});
});

app.get("/cat/:id",function(req,res){
	Cat.findById(req.params.id).populate("comments").exec(function(err,book){
		if(err)
			console.log(err);
		else
			res.render("cat/show",{book:book});
	});
});

app.get("/cat/:id/comments/new",function(req,res){
	Cat.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else
			res.render("comments/cat/new",{book : book});
	});
});

app.post("/cat/:id/comments",function(req,res){
	Cat.findById(req.params.id,function(err,book){
		if(err){
			console.log(err);
			res.redirect("/cat")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err)
				else
					book.comments.push(comment);
					book.save();
					res.redirect("/cat/" + book._id);
			});
		}
	});
});

app.delete("/cat/:id/comments/:comment_id",function(req,res){
	Cat.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else{
			Comment.findByIdAndRemove(req.params.comment_id,function(err){
				if(err)
					console.log(err)
				else{
					res.redirect("/cat/"+req.params.id);
				}
			});
		}
	});
});

// ---------------------------------

app.get("/jee-mains",function(req,res){
	res.render("jee/index");	
});

app.get("/gate-categories",function(req,res){
	res.render("gate/index");	
});

app.get("/gate-cse",function(req,res){
	res.render("gate/cse/index");	
});

app.get("/gate-electrical",function(req,res){
	res.render("gate/electrical/index");	
});

app.get("/gate-electronics",function(req,res){
	res.render("gate/electronics/index");	
});

app.get("/gate-mechanical",function(req,res){
	res.render("gate/mechanical/index");	
});

app.get("/gate-civil",function(req,res){
	res.render("gate/civil/index");	
});

app.get("/clat",function(req,res){
	res.render("clat/index");	
});

app.get("/neet",function(req,res){
	res.render("neet/index");	
});

app.get("/nda",function(req,res){
	res.render("nda/index");	
});

app.get("/contact-us",function(req,res){
	res.render("contact/index");	
});

app.get("/about-us",function(req,res){
	res.render("about/index");	
});

//===========================RUNNING PORT===========================

app.listen(process.env.PORT || 3000,function(){
	console.log("Server listening on port 3000!")
});
