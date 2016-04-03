"use strict"


let mongoose = require("mongoose")

let schema = mongoose.Schema({

			name: { 
				type: String,
				unique: true,
				required: true
			},

			experience: {
				type: Number,
				default: 0
			},

			type: {
				type: String,
				enum: ["INSECTE", "SOL", "EAU", "FEU", "AIR"],
				required: true
			},

			rarity: {
				type: Number,
				max: 1,
				min: 0,
				default: 0.5
			},

			isStarter: {
				type: Boolean,
				default: false
			},

			level: {
				type: Number,
				default: 1,
			},

			hp: {
				type: Number,
				default: 100
			},

			statistics: {

				attack: {
					type: Number,
					default: 0
				},

				defense: {
					type: Number,
					default: 0
				},

				speed: {
					type: Number,
					default: 0
				}
			},

			attacks: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Attack'
			}]

			

		});




var Monster = mongoose.model('Monster', schema);

module.exports = Monster;


