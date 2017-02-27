var express = require('express'),
    app = express(),
    body =     require('body-parser'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require("fs"),
    mysql = require('mysql'),    // On utilise le module node-mysql

    users = []; // Bdd par défaut vide

    
server.listen(3001,"0.0.0.0"); // Lancement du serveur



/********** ROUTE **************/

/* Home - GET (Route par default pour le navigateur web) */
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

/* Register - POST */ //S'inscrire
app.post('/register', function(req, res){
    users.push(req.body); // Insert Into
    fichierBdd();
    res.send(users);


});

// route pour connection
/* Login - POST */
app.post('/login', function(req, res){
    // definir une function a vide pour stocker les infos de notre utilisateur
    var theUser = {};
    // on definit la variable qui contient le message d'erreur
    var error = {"error":true,"message":"Fail"};
    users.forEach(function(user){ // fetchAll - Foreach
        // si le phone poster par l'utilisateur (y en a un)
        if (req.body.phone){
            // un des phone de notre Jason est egal au phone poster par l'utilisateur
            if(user.phone == req.body.phone)
                // je stock toute les infos de notre utilisateur dans une variable
                theUser = user
        }else{
            // pareil pour le mail
            if(user.mail == req.body.mail)
                theUser = user
        }
    });
    // si le password  poster de notre utilisateur  (y en a un)
    if(theUser.password){
        //  password poster par l'utilisateur est egal a un des password de notre Jason
        if(theUser.password == req.body.password)
            // je retourne les infos de l'utilisateur qui c'est co
            res.send(theUser);
        else
            res.send(error);
    }else
        res.send(error);
});


// route pour mot de passe oublié

app.put('/login', function(req, res){
    var theUser = {};
    usersBis = []; // Bdd
    var newPassword;
    users.forEach(function(user){
        if (req.body.phone){
            // un des phone de notre Jason est egal au phone posté par l'utilisateur
            if(req.body.phone == user.phone){
            	// génération d'un nouveau mot de passe random
                newPassword = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
                user.password = newPassword;
                //on "associe" l'ancien mot de passe au nouveau généré
            }
            usersBis.push(user); // Insert Into    
        }
    });
    users = usersBis;
    fichierBdd();
    res.send(newPassword);
    
});



app.delete('/login', function (req, res){
	var theUser = {};
	usersDeleted = [];

	users.forEach(function(user){
 		if (req.body.phone){
 			//si le numéro est différent
            if(req.body.phone != user.phone)
            	usersDeleted.push(user);
        }
    });
    users = usersDeleted;
    fichierBdd();
    res.send(theUser);
});





// modification des infos users, subtilités selon les données envoyés par l'utilisateur
//route en put car update d'information
app.put('/editInfomation', function(req, res){
	var theUser = {};
	usersBis = [];

	users.forEach(function(user){
 		if (req.body.phone){
            if(req.body.phone == user.phone){
            	for (var param in req.body) {
            		user.password = (req.body.password)? req.body.password : user.password;
            		user.name = (req.body.name)? req.body.name : user.name;
            		user.mail = (req.body.mail)? req.body.mail : user.mail;
            		theUser = user;
				}
				
            }
            usersBis.push(user);
        }
    });
    users = usersBis;
    fichierBdd();
    res.send(theUser);
});



app.post('/file', function(req, res){
        if (fichierBdd())
            res.send({"error":false,"message":"It\'s saved!"});
        else
            res.send({"error":true,"message":"Fail"})    
});



function fichierBdd(){
    // j'ouvre le fichier bdd.json r=  Ouvre en lecture seule, et place le pointeur de fichier au début du fichier.
    // dataBdd sert a stocker les infos du fichier bdd.json, est utilisé par fs.open aucune utilité pour nous
    fs.open('bdd.json', 'w', (err, fd) => {
         if (!err) {
            fs.writeFile('bdd.json', JSON.stringify(users), (err) => {
                // si il y a une erreur envoi de la variable error declaré plus haut
                if(err) return false;
                // sinon envoi de la variable avec le message
                return true;
            });
         }
    });
};




