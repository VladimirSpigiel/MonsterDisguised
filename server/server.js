"use strict"

// Import des modules npm
let express = require("express"); // Gérer les routes
let bodyParser = require("body-parser"); // Gérer les données des formulaires POST
let session = require("express-session");	// Gérer les sessions entre le naviguateur du l'utilisateur et le server
let mongoose = require("mongoose") 	//Driver mongoDB + des fonctions qui vont bien
let cookieParser = require("cookie-parser");
let MemoryStore = require('express-session').MemoryStore;


// Création d'une instance d'express.
let app = express();


// Configuration du module bodyParser. Utile pour les paramètres POST des formulaires dans les requêtes que va catch express.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Configuration de la session d'express. Utile pour créer dans l'espace utilisateur un cookie afin que son interface sache qu'il est connecté ( voir AngularJS )
var sessionStore = new MemoryStore();

app.use(session({ 
	secret: '0x1c', 
	cookie: { maxAge: 60000*60*24*30 },
	resave: true,
	saveUninitialized : true,
	httpOnly: false,
	secure: false,
	store: sessionStore,
	key: 'sid'

}))

app.use(cookieParser('0x1c'));
app.use(express.static('public/app'));

// Connection à la BDD 'test' de mongo en localhost. 
mongoose.connect('mongodb://localhost/test');


// Import des routes perso.
require("./routes/main")(app, "");
require("./routes/account")(app, "/account");
require("./routes/base")(app, "/account/base");
require("./routes/team")(app, "/account/team");
require("./routes/buy")(app, "/account/buy");

//Create, read, update, delete sur les modeles. Création de leurs routes.
require("./routes/monster")(app);
require("./routes/user")(app);
require("./routes/attack")(app);

//Créer tout ce qui va bien pour les sockets
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var sessionSockets = new SessionSockets(io, sessionStore, cookieParser);
// On inclut le service de routes
require("./socket/entrypoint.js")(io, sessionStore);



// Ouvrir le serveur
http.listen(8000);


