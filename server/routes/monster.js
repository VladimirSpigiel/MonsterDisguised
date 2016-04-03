"use strict"




module.exports = function(app){
	let model = "monster"

	let secure = require("./secure")
	let modelSchema = require("../models/" + model);

	// Si on essaye d'acceder à model* alors on va d'abord au middleware secure qui va vérifier si la personne est connecté. 
	// Si c'est le cas, on fera next() et on express se chargera d'executer la route qui match.
	app.all("/"+ model + '*', secure.requireLoginAsAdmin, function(req, res, next){
		next();
	})

	// ------------------------------- GET ALL ------------------------------------- //

	app.get("/" + model + '/', function(req, res, next){
		

		modelSchema.find({}, function(err, data){
			res.json(data)
		})
		
		
	})

	
	// ------------------------------- GET ONE ------------------------------------- //


	app.get("/" + model + '/show/:id', function(req, res, next){



		modelSchema.findOne({_id: req.params.id}).populate('attacks').exec(function(err, data){
			res.json(data);
		})

	})

	// ------------------------------- CREATE ------------------------------------- //

	app.post("/" + model + '/create', function(req, res, next){
		
		let m = modelSchema(req.body)

		m.save(function(err){
			if(!err)
				res.sendStatus(200);
			else
				res.sendStatus(400);
		})


	})


	// ------------------------------- UPDATE ONE ------------------------------------- //


	app.put("/" + model + '/update/:id', function(req, res, next){

		delete req.body._id;

		modelSchema.findByIdAndUpdate(req.params.id, {$set : req.body}, function(err, result){
			if(!err)
				res.sendStatus(200);
			else
				res.sendStatus(400);
		});

	})


	// ------------------------------- DELETE ONE ------------------------------------- //


	app.delete("/" + model + '/delete/:id', function(req, res, next){


		modelSchema.findByIdAndRemove(req.params.id, function(err){
			if(!err)
				res.sendStatus(200);
			else
				res.sendStatus(400);
		})
	})
} 
