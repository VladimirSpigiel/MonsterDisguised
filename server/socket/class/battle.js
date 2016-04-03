"use strict"


var User = require("../../models/user")

class Battle{

	

	constructor(socket1, socket2){
		this.J1 = socket1;
		this.J2 = socket2;
		this.number = Battle.nr;
		this.J1.battleNumber = this.number;
		this.J2.battleNumber = this.number;
		this.ended = false;
		Battle.nr++;

		this.setOpponent(this.J1, this.J2);

		this.setCurrentMob(this.J1, this.J1.user.team.monsters[0]);
		this.setCurrentMob(this.J2, this.J2.user.team.monsters[0]);


		this.J1.emit("ready", this.J2.user.pseudo);
		this.J2.emit("ready", this.J1.user.pseudo);

		this.roundRobbin(this.J1);

	}


	setCurrentMob(socket, mob){
		// Update mob data in team

		var index = socket.user.team.monsters.indexOf(socket.currentMob);
		socket.user.team.monsters[index] = socket.currentMob;
		

		socket.emit("updateTeam", socket.user.team);

		if(mob.hp > 0){
			socket.currentMob = mob;
			socket.emit("currentMob", mob);
			socket.opponent.emit("currentOpponentMob", mob);
		}
	}

	switchMob(socket, mob){

		if(socket.turn == true){
			var index;
			var mobSelected;
			if(mob){
				console.log(mob);
				console.log("-------------");
				console.log(socket.user.team.monsters);
				for(let i=0; i < socket.user.team.monsters.length; i++){
					if(socket.user.team.monsters[i]._id == mob._id){
						index = i;
						break;
					}
				}
			}
			console.log("SWITCH MOB ", index);

			mobSelected = socket.user.team.monsters[index];
			if(mobSelected){
				console.log("IN IF ", mobSelected)
				this.setCurrentMob(socket, socket.user.team.monsters[index]);
			}

			this.roundRobbin(socket.opponent);
		}
	}

	nextMob(socket){


				
		var index = socket.user.team.monsters.indexOf(socket.currentMob);
		index++;

		if(index >= socket.user.team.monsters.length)
			index = 0;

	
		this.setCurrentMob(socket, socket.user.team.monsters[index]);

			
		
	}

	attackFrom(socket, atk){

		let opponent = socket.opponent;

		if(socket.turn == true){
			if(Math.random() <= atk.precision){

				let currentMobStats = socket.currentMob.statistics;

				/* COMPUTE DAMAGE THE OPPONENT'S MOB WILL GET */
				let damage = (currentMobStats.attack - currentMobStats.defense) / currentMobStats.attack;
				damage += 1
				damage *= atk.power;
				/* -------------------------------------------*/
				socket.emit("touchTarget", damage);

				opponent.currentMob.hp -= damage
				opponent.emit("updateCurrentMob", opponent.currentMob);
				socket.emit("updateCurrentOpponentMob", opponent.currentMob);
				if(opponent.currentMob.hp <= 0){

					socket.currentMob.experience += 500;

					if((socket.currentMob.experience / 500) > 0){
						socket.currentMob = this.levelUp(socket.currentMob);
					}

					socket.emit("updateCurrentMob", socket.currentMob);
					opponent.emit("mobIsDead", opponent.currentMob);
					
					var oneLeft = false;
					for(let i=0; i < opponent.user.team.monsters.length; i++){
						if(opponent.user.team.monsters[i].hp > 0){
							oneLeft = true;

						}
					}

					if(!oneLeft){
						this.endBattle(socket);
					}else{
						this.nextMob(opponent);
					}
				
				}

			}else{
				socket.emit("missTarget");
			}

			this.roundRobbin(socket.opponent);
		}



		
	}

	levelUp(mob){

		var levelWon = mob.experience / 500;
		mob.experience = mob.experience % 500;


		for(let i=0; i < levelWon; i++){

			mob.statistics.attack = ((mob.statistics.attack + mob.level * 5)/100) + mob.statistics.attack ;
			mob.statistics.defense = ((mob.statistics.defense + mob.level * 5)/100) + mob.statistics.defense ;
			mob.statistics.speed = ((mob.statistics.speed + mob.level * 5)/100) + mob.statistics.speed ;


			mob.level++;
		}
					

		return mob;
	}




	roundRobbin(next){
		next.turn = true;
		next.opponent.turn = false;

		next.emit("yourTurn");
		next.opponent.emit("opponentTurn");
	}


	

	endBattle(winner){
		if(winner && !this.ended){
			winner.user.gold += 1500;
			winner.user.wins++;
			winner.emit("winBattle", winner.user.gold);
			
			
			winner.opponent.emit("looseBattle");
			winner.opponent.user.looses++;

			this.updateUser(winner);
			this.updateUser(winner.opponent);

			winner.opponent.disconnect()
			winner.disconnect()

			
		}

		this.ended = true;

	}

	updateUser(socket){

		let player = socket;


		for(let i=0; i < player.userSaved.team.monsters.length; i++){
			for(let j=0; j < player.userSaved.base.length; j++){
				if(player.user.team.monsters[i]._id == player.userSaved.base[j]._id ){
					player.userSaved.base[j].experience = player.user.team.monsters[i].experience
					player.userSaved.base[j].level = player.user.team.monsters[i].level
					player.userSaved.base[j].statistics = player.user.team.monsters[i].statistics;

				
				}
			}
		}

		player.userSaved.gold = player.user.gold;
		player.userSaved.wins = player.user.wins;
		player.userSaved.looses = player.user.looses;



		User.findOne({_id: player.userSaved._id}, function(err, user){

			user.gold = player.userSaved.gold;
			user.wins = player.userSaved.wins;
			user.looses = player.userSaved.looses;
			user.base = player.userSaved.base;

			user.save();
		})

	}




	getOpponent(socket){
		if(socket == this.J1)
			return this.J2;
		else
			return this.J1;
	}

	setOpponent(socket1, socket2){
		socket1.opponent = socket2;
		socket2.opponent = socket1;
	}

}

Battle.nr = 0;

module.exports = Battle;