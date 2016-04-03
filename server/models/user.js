"use strict"


let mongoose = require("mongoose")

let Monster = require("./monster");

//var deepPopulate = require('mongoose-deep-populate')(mongoose);

let schema = mongoose.Schema({

			pseudo: { 
				type: String,
				unique: true,
				required: true
			},

			password: {
				type: String,
				required: true
			},

			gold: {
				type: Number,
				default: 1500
			},

			role: {
				type: String,
				enum: ['ROLE_USER', 'ROLE_ADMIN'],
				default : 'ROLE_USER'
			},

			base: {
				type: Array
			},

			team: {
				monsters: [{
					type: mongoose.Schema.Types.ObjectId
				}],

			},

			wins: {
				type: Number,
				default: 0
			},

			looses: {
				type: Number,
				default: 0
			}

		});

//schema.plugin(deepPopulate);


schema.methods.populateTeam = function populateTeam(cb){
	for(var i=0; i < this.base.length; i++){
		var indexTeam = this.team.monsters.indexOf(this.base[i]._id);

		if(indexTeam != -1){
			this.team.monsters[indexTeam] = this.base[i]; 
		}
	}

	Monster.populate(this.team.monsters, {path: 'attacks'}, function(err, monsters){
		cb(null, monsters)
	})


	
}


var User = mongoose.model('User', schema);

function monsterLimit(val) {
  return val.length <= 4;
}



module.exports = User;


