"use strict"

var User = require('../../models/user');

class Player{

	constructor(socket){
		this.socket = socket
		this.opponent = null;

		User.findOne({_id: this.socket.request.user}, function(err, data){
			Player.updateSocketData(data);
		})
		
	}

	updateSocketData(data){
		this.socket.use = data;
	}




}

module.exports = Player;