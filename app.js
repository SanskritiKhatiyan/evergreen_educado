// ======================REQUIRED=========================
require("dotenv").config();
let express = require("express"),
	app = express(),
	bodyparser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
	Book = require("./models/book"),
	Contact = require("./models/contact"),
	Comment = require("./models/reviews"),
	User = require("./models/user"),
	methodOverride = require("method-override"),
	nodemailer = require('nodemailer');

//=====================APP CONFIG==========================

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser : true, useUnifiedTopology : true});
app.use(methodOverride("_method"));


//PASSPORT CONFIG

app.use(require("express-session")({
	secret : "Its all in the mind",
	resave : false,
	saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

//	MIDDLEWARES

let middlewareObj = {}; 
middlewareObj.isAdmin = function(req,res,next){
	if(req.user && req.user.username===process.env.ADMIN){
		next();
	}
	else{
		res.redirect("back");
	}
}

// NODEMAILER

let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.ADMINEMAIL,
		pass: process.env.ADMINPASS
	}
});

// ===================ROUTES===============================

app.get("/",function(req,res){
	res.render("index");
});

// --------------------CAT--------------------------------

app.get("/cat",function(req,res){
	Book.find({},function(err,cat){
		if(err)
			console.log(err)
		else
		res.render("cat/index",{book: cat});	
	});
});

app.get("/cat/:id",function(req,res){
	Book.findById(req.params.id).populate("comments").exec(function(err,book){
		if(err)
			console.log(err);
		else
			res.render("books/show",{book:book});
	});
});


// --------------------NEET--------------------------------

app.get("/neet",function(req,res){
	Book.find({},function(err,book){
		if(err)
			console.log(err)
		else
		res.render("neet/index",{book: book});	
	});
});

app.get("/neet/:id",function(req,res){
	Book.findById(req.params.id).populate("comments").exec(function(err,book){
		if(err)
			console.log(err);
		else
			res.render("books/show",{book:book});
	});
});


// --------------------JEE MAINS--------------------------------

app.get("/jee-mains",function(req,res){
	Book.find({},function(err,book){
		if(err)
			console.log(err)
		else
		res.render("jee/index",{book: book});	
	});
});

app.get("/jee-mains/:id",function(req,res){
	Book.findById(req.params.id).populate("comments").exec(function(err,book){
		if(err)
			console.log(err);
		else
			res.render("books/show",{book:book});
	});
});


// --------------------CLAT--------------------------------

app.get("/clat",function(req,res){
	Book.find({},function(err,book){
		if(err)
			console.log(err)
		else
		res.render("clat/index",{book: book});	
	});
});

app.get("/clat/:id",function(req,res){
	Book.findById(req.params.id).populate("comments").exec(function(err,book){
		if(err)
			console.log(err);
		else
			res.render("books/show",{book:book});
	});
});


// --------------------NDA--------------------------------

app.get("/nda",function(req,res){
	Book.find({},function(err,book){
		if(err)
			console.log(err)
		else
		res.render("nda/index",{book: book});	
	});
});

app.get("/nda/:id",function(req,res){
	Book.findById(req.params.id).populate("comments").exec(function(err,book){
		if(err)
			console.log(err);
		else
			res.render("books/show",{book:book});
	});
});

// --------------------GATE--------------------------------

app.get("/gate-categories",function(req,res){
	res.render("gate/index");	
});

//CSE

app.get("/gate-cse",function(req,res){
	Book.find({},function(err,book){
		if(err)
			console.log(err)
		else
		res.render("gate/cse/index",{book: book});	
	});
});

app.get("/gate-cse/:id",function(req,res){
	Book.findById(req.params.id).populate("comments").exec(function(err,book){
		if(err)
			console.log(err);
		else
			res.render("books/show",{book:book});
	});
});

//ELECTRICAL

app.get("/gate-electrical",function(req,res){
	Book.find({},function(err,book){
		if(err)
			console.log(err)
		else
		res.render("gate/electrical/index",{book: book});	
	});
});

app.get("/gate-electrical/:id",function(req,res){
	Book.findById(req.params.id).populate("comments").exec(function(err,book){
		if(err)
			console.log(err);
		else
			res.render("books/show",{book:book});
	});
});


//CIVIL

app.get("/gate-civil",function(req,res){
	Book.find({},function(err,book){
		if(err)
			console.log(err)
		else
		res.render("gate/civil/index",{book: book});	
	});
});

app.get("/gate-civil/:id",function(req,res){
	Book.findById(req.params.id).populate("comments").exec(function(err,book){
		if(err)
			console.log(err);
		else
			res.render("books/show",{book:book});
	});
});


//ELECTRONICS

app.get("/gate-electronics",function(req,res){
	Book.find({},function(err,book){
		if(err)
			console.log(err)
		else
		res.render("gate/electronics/index",{book: book});	
	});
});

app.get("/gate-electronics/:id",function(req,res){
	Book.findById(req.params.id).populate("comments").exec(function(err,book){
		if(err)
			console.log(err);
		else
			res.render("books/show",{book:book});
	});
});

//MECHANICAL

app.get("/gate-mechanical",function(req,res){
	Book.find({},function(err,book){
		if(err)
			console.log(err)
		else
		res.render("gate/mechanical/index",{book: book});	
	});
});

app.get("/gate-mechanical/:id",function(req,res){
	Book.findById(req.params.id).populate("comments").exec(function(err,book){
		if(err)
			console.log(err);
		else
			res.render("books/show",{book:book});
	});
});


// ---------------------------COMMON ROUTES---------------------------------

app.get("/admin",function(req,res){
	res.render("admin");
});

app.get("/admin/books",middlewareObj.isAdmin,function(req,res){
	res.render("books/index");
});

app.get("/admin/books/new",middlewareObj.isAdmin,function(req,res){
	res.render("books/new");
});
	
app.post("/admin/books",middlewareObj.isAdmin,function(req,res){
	Book.create(req.body.book,function(err,newBook){
		if(err)
			console.log(err)
		else
			res.redirect("/admin/books");
	});
});

app.get("/admin/books/:id/edit",middlewareObj.isAdmin,function(req,res){
	Book.findById(req.params.id,function(err,updateBook){
		if(err)
			console.log(err);
		else
			res.render("books/edit",{book:updateBook});
	});
});

app.put("/admin/books/:id",middlewareObj.isAdmin,function(req,res){
	Book.findByIdAndUpdate(req.params.id,req.body.book,function(err,updatedBook){
		if(err)
			console.log(err)
		else
			res.redirect("/admin/books");
	});
});

app.get("/admin/books/:id/delete",middlewareObj.isAdmin,function(req,res){
	Book.findByIdAndDelete(req.params.id,function(err){
		if(err)
			console.log("Didnt delete",err)
		else
			res.redirect("/admin/books")
	});
});

// ---------------------------COMMENTS-------------------------------

// CAT
// app.get("/cat/:id/reviews/new",function(req,res){
// 	Book.findById(req.params.id,function(err,book){
// 		if(err)
// 			console.log(err)
// 		else
// 			res.render("comments/cat/new",{book : book});
// 	});
// });

app.post("/cat/:id/reviews",function(req,res){
	Book.findById(req.params.id,function(err,book){
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

app.delete("/cat/:id/reviews/:comment_id",middlewareObj.isAdmin,function(req,res){
	Book.findById(req.params.id,function(err,book){
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

// NEET
app.get("/neet/:id/reviews/new",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else
			res.render("comments/neet/new",{book : book});
	});
});

app.post("/neet/:id/reviews",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err){
			console.log(err);
			res.redirect("/neet")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err)
				else
					book.comments.push(comment);
					book.save();
					res.redirect("/neet/" + book._id);
			});
		}
	});
});

app.delete("/neet/:id/reviews/:comment_id",middlewareObj.isAdmin,function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else{
			Comment.findByIdAndRemove(req.params.comment_id,function(err){
				if(err)
					console.log(err)
				else{
					res.redirect("/neet/"+req.params.id);
				}
			});
		}
	});
});

// JEE MAINS
app.get("/jee-mains/:id/reviews/new",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else
			res.render("comments/jee/new",{book : book});
	});
});

app.post("/jee-mains/:id/reviews",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err){
			console.log(err);
			res.redirect("/jee-mains")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err)
				else
					book.comments.push(comment);
					book.save();
					res.redirect("/jee-mains/" + book._id);
			});
		}
	});
});

app.delete("/jee-mains/:id/reviews/:comment_id",middlewareObj.isAdmin,function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else{
			Comment.findByIdAndRemove(req.params.comment_id,function(err){
				if(err)
					console.log(err)
				else{
					res.redirect("/jee-mains/"+req.params.id);
				}
			});
		}
	});
});

// CLAT
app.get("/clat/:id/reviews/new",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else
			res.render("comments/clat/new",{book : book});
	});
});

app.post("/clat/:id/reviews",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err){
			console.log(err);
			res.redirect("/clat")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err)
				else
					book.comments.push(comment);
					book.save();
					res.redirect("/clat/" + book._id);
			});
		}
	});
});

app.delete("/clat/:id/reviews/:comment_id",middlewareObj.isAdmin,function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else{
			Comment.findByIdAndRemove(req.params.comment_id,function(err){
				if(err)
					console.log(err)
				else{
					res.redirect("/clat/"+req.params.id);
				}
			});
		}
	});
});


// NDA
app.get("/nda/:id/reviews/new",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else
			res.render("comments/nda/new",{book : book});
	});
});

app.post("/nda/:id/reviews",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err){
			console.log(err);
			res.redirect("/nda")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err)
				else
					book.comments.push(comment);
					book.save();
					res.redirect("/nda/" + book._id);
			});
		}
	});
});

app.delete("/nda/:id/reviews/:comment_id",middlewareObj.isAdmin,function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else{
			Comment.findByIdAndRemove(req.params.comment_id,function(err){
				if(err)
					console.log(err)
				else{
					res.redirect("/nda/"+req.params.id);
				}
			});
		}
	});
});

//GATE CSE

app.get("/gate-cse/:id/reviews/new",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else
			res.render("comments/gate/cse/new",{book : book});
	});
});

app.post("/gate-cse/:id/reviews",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err){
			console.log(err);
			res.redirect("/gate-cse")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err)
				else
					book.comments.push(comment);
					book.save();
					res.redirect("/gate-cse/" + book._id);
			});
		}
	});
});

app.delete("/gate-cse/:id/reviews/:comment_id",middlewareObj.isAdmin,function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else{
			Comment.findByIdAndRemove(req.params.comment_id,function(err){
				if(err)
					console.log(err)
				else{
					res.redirect("/gate-cse/"+req.params.id);
				}
			});
		}
	});
});


//GATE ELECTRICAL

app.get("/gate-electrical/:id/reviews/new",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else
			res.render("comments/gate/electrical/new",{book : book});
	});
});

app.post("/gate-electrical/:id/reviews",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err){
			console.log(err);
			res.redirect("/gate-electrical")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err)
				else
					book.comments.push(comment);
					book.save();
					res.redirect("/gate-electrical/" + book._id);
			});
		}
	});
});

app.delete("/gate-electrical/:id/reviews/:comment_id",middlewareObj.isAdmin,function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else{
			Comment.findByIdAndRemove(req.params.comment_id,function(err){
				if(err)
					console.log(err)
				else{
					res.redirect("/gate-electrical/"+req.params.id);
				}
			});
		}
	});
});


//GATE CIVIL

app.get("/gate-civil/:id/reviews/new",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else
			res.render("comments/gate/civil/new",{book : book});
	});
});

app.post("/gate-civil/:id/reviews",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err){
			console.log(err);
			res.redirect("/gate-civil")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err)
				else
					book.comments.push(comment);
					book.save();
					res.redirect("/gate-civil/" + book._id);
			});
		}
	});
});

app.delete("/gate-civil/:id/reviews/:comment_id",middlewareObj.isAdmin,function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else{
			Comment.findByIdAndRemove(req.params.comment_id,function(err){
				if(err)
					console.log(err)
				else{
					res.redirect("/gate-civil/"+req.params.id);
				}
			});
		}
	});
});


//GATE ELECTRICAL

app.get("/gate-electronics/:id/reviews/new",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else
			res.render("comments/gate/electronics/new",{book : book});
	});
});

app.post("/gate-electronics/:id/reviews",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err){
			console.log(err);
			res.redirect("/gate-electronics")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err)
				else
					book.comments.push(comment);
					book.save();
					res.redirect("/gate-electronics/" + book._id);
			});
		}
	});
});

app.delete("/gate-electronics/:id/reviews/:comment_id",middlewareObj.isAdmin,function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else{
			Comment.findByIdAndRemove(req.params.comment_id,function(err){
				if(err)
					console.log(err)
				else{
					res.redirect("/gate-electronics/"+req.params.id);
				}
			});
		}
	});
});

// GATE MECHANICAL

app.get("/gate-mechanical/:id/reviews/new",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else
			res.render("comments/gate/mechanical/new",{book : book});
	});
});

app.post("/gate-mechanical/:id/reviews",function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err){
			console.log(err);
			res.redirect("/gate-mechanical")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err)
				else
					book.comments.push(comment);
					book.save();
					res.redirect("/gate-mechanical/" + book._id);
			});
		}
	});
});

app.delete("/gate-mechanical/:id/reviews/:comment_id",middlewareObj.isAdmin,function(req,res){
	Book.findById(req.params.id,function(err,book){
		if(err)
			console.log(err)
		else{
			Comment.findByIdAndRemove(req.params.comment_id,function(err){
				if(err)
					console.log(err)
				else{
					res.redirect("/gate-mechanical/"+req.params.id);
				}
			});
		}
	});
});


// ---------------------ABOUT-----------------------------

app.get("/about-us",function(req,res){
	res.render("about/index");	
});

// ------------------Contact-------------------------------------

app.get("/contact-us",function(req,res){
	res.render("contact/index");	
});

app.post("/contact-us",function(req,res){
	let firstName = req.body.contact.firstName;
	let lastName = req.body.contact.lastName;
	let email = req.body.contact.email;
	let mobile = req.body.contact.mobile;
	let message = req.body.contact.message;
	let newMessage = {firstName:firstName, lastName : lastName, email:email, mobile:mobile,message:message};
	Contact.create(newMessage,function(err,newMessage){
		if(err){
			console.log(err)
		}
		else{
			let contactDetails = {
				from: process.env.ADMINEMAIL,
				to: process.env.ADMINPASS,
				subject: req.body.contact.firstName + ' ' + req.body.contact.lastName + ' ' + 'has filled the Contact Form!',
				text: `Hi! A new person has filled out the contact form.\nForm Details-\nName:${req.body.contact.firstName} ${req.body.contact.lastName}\nEmail: ${req.body.contact.email}\nMobile:${req.body.contact.mobile}\nMessage: ${req.body.contact.message}`
			};
			mailTransporter.sendMail(contactDetails, function(err, data) {
				if(err) {
					console.log('Error Occurs');
					console.log(err);
				} else {
					console.log('Email sent successfully');
				}
			});
			res.redirect("/contact-us");
		}
	});
});


//-------------------AUTH routes---------------------------

app.get("/login",function(req,res){
	res.render("login");
});
app.post("/login",passport.authenticate("local",{
		successRedirect : "/",
		failureRedirect : "/login"
	}) ,function(req,res){
});

app.get("/register",function(req,res){
	res.render("register");
});

app.post("/register",function(req,res){
	let newUser = new User({username : req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err)
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/");
		});
	});
});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

//===========================RUNNING PORT===========================

app.listen(process.env.PORT || 3000,function(){
	console.log("Server listening on port 3000!");
});