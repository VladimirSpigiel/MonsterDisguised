
"use strict"

module.exports = function(io, sessionStore){
	var cookieMod = require('cookie');
	var MatchMacker = require("./class/matchmaker");
	var Player = require("./class/player");

	var matchmaker = new MatchMacker();



	io.set("authorization", function(handshakeData, callback){
		var cookies = cookieMod.parse(handshakeData.headers.cookie);

		var sessionID = cookies['sid'].split('s:')[1].split('.')[0];


		if(!sessionID){
			callback('No session', false);

		}else{
			sessionStore.get(sessionID, function(err, session){
				if(session && session.user){
					handshakeData.user = session.user._id;
					
					
					callback(null, true);
				}else{
					callback('Not found', false);
				}
			})
		}
	})



	io.on("connection", function(socket){

		socket.emit("connected");


		socket.on("matchmaking_request", function(){
			matchmaker.addUser(socket);

		})


		socket.on("disconnect", function(){

			console.log("DISCONNECT")

			var battle = matchmaker.findBattle(socket);
			matchmaker.removeUser(socket);
			if(battle){
				battle.endBattle(socket.opponent);
				
			}
		})


		socket.on("attack", function(atk){
			var battle = matchmaker.findBattle(socket);
				
			battle.attackFrom(socket, atk);
		})

		socket.on("switchMob", function(mob){
			var battle = matchmaker.findBattle(socket);

			if(battle){
				battle.switchMob(socket, mob)
			}

		})


		socket.on("nextMob", function(){
			var battle = matchmaker.findBattle(socket);

			if(battle){
				battle.nextMob(socket)
			}

		})


	});


}