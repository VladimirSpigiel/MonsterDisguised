"use strict"

module.exports = function(app, path){

	let Attack = require("../models/attack")

	app.get('/', function(req, res, next){
		res.sendfile("./public/app/index.html");

	})


	app.get('/simulate/form/register', function(req, res, next){
		res.sendfile("./public/register.html");
	})


	app.get('/simulate/form/monster', function(req, res, next){

		

		Attack.find({}, function(err, attacks){

			let html = "\
			<form method='post' action='/monster/create'>\
				<label> name : </label><input name='name'/> <br>\
				<label> type : </label>\
				<select name='type'>\
				<option value='FEU'>FEU</option>\
				<option value='AIR'>AIR</option>\
				<option value='EAU'>EAU</option>\
				<option value='SOL'>SOL</option>\
				<option value='INSECTE'>INSECTE</option>\
				</select><br>\
				<label> rarete : </label><input name='rarity' value=0.5 ><br>\
				<label> starter : </label><input type='checkbox' name='isStarter'/><br>\
				<label> level : </label><input name='level' value=1><br>\
				<label> hp : </label><input name='hp' value=200 ><br>\
				<label> attack : </label><input name='statistics.attack' value=200 ><br>\
				<label> defense : </label><input name='statistics.defense' value=200 /><br>\
				<label> vitesse : </label><input name='statistics.speed' value=200 ><br>\
				";

			for(let i=0; i < 4; i++){
				html += "\
				<select name='attacks'>";

				attacks.forEach(function(attack){

						html+="\
					<option value='"+ attack._id +"'>" + attack.name+"</option>"
				
				})

				html += "\
				</select>"
			}

			html+="\
				<button type='submit'>Envoyer</button>\
				</form>"

			res.send(html)
			
		})



		
	})


	app.get('/simulate/form/attack', function(req, res, next){



		res.send("\
			<form method='post' action='/attack/create'>\
				<label> name : </label><input name='name'/> <br>\
				<label> power : </label><input name='power' value=100 /><br>\
				<label> type : </label><select name='type'>\
				<option value='FEU'>FEU</option>\
				<option value='AIR'>AIR</option>\
				<option value='EAU'>EAU</option>\
				<option value='SOL'>SOL</option>\
				<option value='INSECTE'>INSECTE</option>\
				</select><br>\
				<label> precision : </label><input name='precision' value=0.7 /><br>\
				<label> description : </label><input name='rarity'/><br>\
				<button type='submit'>Envoyer</button>\
			</form>\
			")
	})




}