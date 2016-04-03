"use strict"


let User = require("../models/user");
let Monster = require("../models/monster");
let mongoose = require('mongoose')

let secure = require("./secure")




module.exports = function(app, path){


	app.all(path + '*', secure.requireLoginAsUser, function(req, res, next){
		next();
	})


	// Lorsque l'utiliateur veut acheter un monstre ....
	app.get(path + '/monster', function(req, res, next){

		// On récupère cet utilisateur en question grâce à la session
		User.findOne({_id: req.session.user._id}, function(err, user){
			
			// Si il a plus de 1500 gold ( argent minimum pour acheter )
			if(user.gold >= 1500){

				// On créer un nombre aléatoire entre 0 et 1
				// et on essaye de trouver un mob dans la BDD qui a une rareté inférieur au nombre obtenu
				Monster.find({rarity: {'$lte' : Math.random()}, isStater: {'$ne': true}}, function(err, monsters){
					if(!err){
						// Plusieurs monstres sortent en résultats. Car on peut avoir un monstre avec une rareté 0.4 et un autre avec 0.6 si le nombre généré est 0.8
						// Donc au sein de ce tableau de monstres, on en choisi un au hasard.
						let monsterSelected = monsters[Math.floor(Math.random() * monsters.length)];
					
						if(monsterSelected){
							// Si il y'a un monstre, on l'ajoute à la base de l'utilisateur
							monsterSelected._id = mongoose.Types.ObjectId();
							user.base.push(monsterSelected);
							// On lui retire la somme vu qu'il a eu un nouveau mob
							user.gold -= 1500

							// On met à jour l'utilisateur dans la BDD
							User.update({_id: user._id},{gold: user.gold, base: user.base}, function(err, result){
								if(err){
									res.status(400);
									res.send("Error when updating your base")
								}else{

									res.json(monsterSelected);
								}
							})


						}else{
							res.status(400);
							res.json("No monster has been selected. Retry please :(")
						}

					}
				})
			}else{
				res.status(400);
				res.json("Not enough money. You need 1500 gold.")
			}
		})	


	})




}