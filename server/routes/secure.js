
module.exports.requireLoginAsUser = function requireLoginAsUser(req, res, next) {

	  // Si l'utilisateur a une session qui contient la clé user. Alors il est connecté. On l'autorise a aller à la prochaine route.
	  if (req.session.user) {
	    next(); 
	  } else {
	    // Sinon besoin de se connecter.
	    res.status(400);
	    res.send("You're not connected")
	  }
	}



module.exports.requireLoginAsAdmin = function requireLoginAsAdmin(req, res, next) {

	  // Si l'utilisateur a une session qui contient la clé user et que son role = ADMIN. Alors il est connecté. On l'autorise a aller à la prochaine route.
	  if (req.session.user && req.session.user.role === "ROLE_ADMIN") {
	    next(); 
	  } else {
	    res.status(400);
	    res.send("You're not connected as administrator")
	  }
	}