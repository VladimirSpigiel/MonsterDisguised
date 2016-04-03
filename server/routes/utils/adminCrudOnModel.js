"use strict"




module.exports = function(app, model){

	let secure = require("../secure")
	let modelSchema = require("../../models/" + model);

	// Si on essaye d'acceder à model* alors on va d'abord au middleware secure qui va vérifier si la personne est connecté. 
	// Si c'est le cas, on fera next() et on express se chargera d'executer la route qui match.
	/*app.all("/"+ model + '*', secure.requireLoginAsAdmin, function(req, res, next){
		next();
	})*/

	// ------------------------------- GET ALL ------------------------------------- //

	app.get("/" + model + '/', function(req, res, next){
		

		modelSchema.find({}, function(err, data){
			res.json(data)
		})
		
		
	})


	// ------------------------- GET BY CRITERIA --------------------------------- //

	/*app.get("/" + model + '/:key/:val', function(req, res, next){

		console.log("fail", req.params.id)
		var finder = {}
		finder[req.params.key] = req.params.val

		modelSchema.find(finder, function(err, data){
			res.json(data)
		})
		
		
	})*/

	// ------------------------------- GET ONE ------------------------------------- //


	app.get("/" + model + '/show/:id', function(req, res, next){

		/*modelSchema.findOne({_id: req.params.id}, function(err, result){
			if(err) throw err;

			res.json(result)
		})*/


		modelSchema.findOne({_id: req.params.id}).populate('attacks').exec(function(err, data){
			res.json(data);
		})

	})

	// ------------------------------- CREATE ------------------------------------- //

	app.post("/" + model + '/create', function(req, res, next){
		
		let m = modelSchema(req.body)

		m.save(function(err){
			
			console.log(err)
		})

		res.redirect("/")

	})


	// ------------------------------- UPDATE ONE ------------------------------------- //


	app.put("/" + model + '/update/:id', function(req, res, next){


		modelSchema.findByIdAndUpdate(req.params.id, {$set : req.body}, function(err, result){
			if(err) throw err;

			res.redirect("/")
		});

	})


	// ------------------------------- DELETE ONE ------------------------------------- //


	app.delete("/" + model + '/delete/:id', function(req, res, next){


		modelSchema.findByIdAndRemove(req.params.id, function(err){
			if(err) throw err;

			res.redirect("/")
		})
	})
} 
