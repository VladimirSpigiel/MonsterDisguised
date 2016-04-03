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
			res.json(user.base);
		})	


	})

	app.get(path + '/show/:id', function(req, res, next){


		User.findOne({_id: req.session.user._id}).exec(function(err, user){
			
			Monster.populate(user.base, {path: "attacks"}, function(err, monsters){
				for(let i=0;i<monsters.length;i++){

					if(monsters[i]._id == req.params.id){
						res.json(monsters[i]);
						return;
					}

					
				}

				res.status(400);
				res.send("Mob not found");
			})

		});
	})


}