"use strict"


let User = require("../models/user");
let Monster = require("../models/monster");
let secure = require("./secure")




module.exports = function(app, path){


	app.post(path + '/login', function(req, res, next){

		// On essaye de trouver un utilisateur qui a ce pseudo et ce mot de passe. ( On met un regExp sur le pseudo pour le pas être sensible aux majuscules)
		User.findOne({pseudo: req.body.pseudo.toLowerCase(), password : req.body.password}, function(err, result){

			if(err) throw err;

			// Si il existe un utilisateur, on lui attribut une clé 'user' à sa session qui vaudra la valeur de l'utilisateur
			if(result){
				req.session.user = result
				
				res.sendStatus(200);
			}else{
				res.status(400);
				res.send("Your pseudo or password are wrong");
			}


		})


	})


	app.post(path + '/register', function(req, res, next){

		// On essaye d'abord de voir si un utlisateur a le même pseudo que choisi par celui qui veut s'inscrire.
		User.findOne({pseudo: new RegExp(req.body.pseudo, "i")}, function(err, result){

			if(err) throw err;

			// Si il en existe un alors on ne l'enregistre pas. Sinon on créer un utilisateur et on le persiste sur mongoDB. ( + on lui attribut la clé 'user' a sa session )
			if(result){
				res.status(400);
				res.send("This pseudo is already taken")
			}else{
				
				let user = User(req.body)

				user.save(function(err){
					if(err) throw err;
				})

				req.session.user = user
				res.sendStatus(200);
			}

		})
	})


	app.get(path + '/begin', secure.requireLoginAsUser, function(req, res, next){

		User.findOne({_id : req.session.user._id}, function(err, user){
		
			if(user.base.length == 0){
				Monster.find({isStarter: true}, function(err, monsters){

					let monsterSelected = monsters[Math.floor(Math.random() * monsters.length)];

					if(monsterSelected){

						user.base.push(monsterSelected)

						User.update({_id: user._id}, {base: user.base}, function(err){
							if(err){
								res.status(400);
								res.json("Could not update your base. Please retry.")
							}else{
								res.json(monsterSelected)
							}
						})

					}else{
						res.status(400);
						res.json("No starter have been found. Please retry :(")
					}
				})

			}else{
				res.status(400);
				res.json("Already began")
			}
		})
	})


	app.post(path + '/profile', secure.requireLoginAsUser, function(req, res, next){

		User.findByIdAndUpdate(req.session.user._id, {$set : req.body}, function(err, result){
			if(err) throw err;

			res.redirect("/")
		});

	})


	app.get(path + '/profile', secure.requireLoginAsUser, function(req, res, next){
		User.findOne({_id: req.session.user._id}, function(err, user){
			res.json(user)
		})
	})


	app.get(path + '/disconnect', function(req, res, next){
		req.session.destroy();
		//res.clearCookie('user');

		res.json("disconnected")		
	})



}