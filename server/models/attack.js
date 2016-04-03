"use strict"


let mongoose = require("mongoose")

let schema = mongoose.Schema({

			name: { 
				type: String,
				unique: true,
				required: true
			},

			power: {
				type: Number,
				default: 0
			},

			precision: {
				type: Number,
				max: 1,
				min: 0,
				default: 0.5
			},

			type: {
				type: String,
				enum: ["INSECTE", "SOL", "EAU", "FEU", "AIR"]
			},

			description: {
				type: String
			}

			

		});

var Attack = mongoose.model('Attack', schema);

module.exports = Attack;


