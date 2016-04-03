"use strict"


let User = require("../models/user");
let Monster = require("../models/monster");
let secure = require("./secure")




module.exports = function(app, path){


	app.all(path + '*', secure.requireLoginAsUser, function(req, res, next){
		next();
	})

	app.get(path + '/', function(req, res, next){


		User.findOne({_id: req.session.user._id}, function(err, user){
			user.populateTeam(function(err, result){
				
				delete user.team.monsters;
				user.team.monsters = result;
				
				res.json(user.team);


			})	
		})	


	})

	app.get(path + '/hire/:id', function(req, res, next){


		// Charger les données de l'utilisateur 
		User.findOne({_id: req.session.user._id}, function(err, user){

			if(!err){
				// On trouve le monstre qui correspond à celui que l'on veut mettre dans l'equipe
				
						let alreadyInsideTeam = false
						
						// On vérifie si il n'est pas déjà dans la team
						user.team.monsters.forEach(function(mID){
							
							if(mID == req.params.id){
								alreadyInsideTeam = true
								return;
								
							}

						})

						let insideBase = false

						// On vérifie si le mob existe dans la base
						user.base.forEach(function(m){
							if(m._id == req.params.id){
								insideBase = true
								return;
								
							}
						})

						if(alreadyInsideTeam){
							res.status(400);
							res.send("this mob is already in your team !")
							return;
						}

						if(!insideBase){
							res.status(400);
							res.send("this mob is not in your base.")
							return;
						}

						// On vérifie qu'il n'y a pas plus de 3 mob dans la team
						if(user.team.monsters.length < 4){
							
							// On l'ajoute au monstres de la team
							user.team.monsters.push(req.params.id)

							// On met à jour l'utilisateur en BDD
							User.update({_id: user._id}, {"$set": {team: user.team }}, function(err, result){
								
							})

							res.sendStatus(200);
							//res.cookie('user', user);
						}else{
							res.status(400);
							res.send("Your team is full.")
						}


						
					
			
			}else{
				res.json("Error while fetching your informations.")
			}
			
		})	
	})

	app.get(path + '/fire/:id', function(req, res, next){

		User.findOne({_id: req.session.user._id}, function(err, user){

			if(!err){
						let insideTeam = false
						
						

						user.team.monsters.forEach(function(mID){
							
							if(mID == req.params.id){
								insideTeam = true
								return;
								
							}

						})

						
						if(!insideTeam){
							res.status(400);
							res.send("this mob is not in your team !")
							return;
						}
						
	
						var index = user.team.monsters.indexOf(req.params.id);
						
						//user.team.monsters = user.team.monsters.splice(index, 1)
						
						user.team.monsters = []
						
						User.update({_id: user._id}, {"$set": {team: user.team }}, function(err, result){
								res.sendStatus(200);
						})

												
						
					
			}else{
				res.status(400);
				res.send("Error while fetching your informations.")
			}
			
		})

	})


}