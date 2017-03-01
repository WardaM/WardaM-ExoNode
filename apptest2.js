var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    fs = require("fs"),
    users = []; // Bdd par défaut vide

  
    
server.listen(3002,"0.0.0.0"); // Lancement du serveur


// Home - GET (Route par default pour le navigateur web) */
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//ajouter 2id
app.post('/', function(req, res){
    //un tableau d'objets(id nom prenom)
    users = [{id:"0", name: "Moulier", prenom :"Warda"}, {id:"1", name:"blabla", prenom:"blabla"}];

    fichierBdd('bdd2.json', users);
    res.send(users); 
});


 //modification des id

app.put('/', function(req, res){
    usersBis =[];

    if(users[0].id == 1 ){
        users.name = "test";
        users.prenom ="test";
    
    }   
    users.push('users'); // Insert Into

    // fichierBdd('bdd2.json', users);
    res.send(users);
});


app.delete('/', function(req, res){
    
});





function fichierBdd(files, user){
    // j'ouvre le fichier bdd.json r=  Ouvre en lecture seule, et place le pointeur de fichier au début du fichier.
    // dataBdd sert a stocker les infos du fichier bdd.json, est utilisé par fs.open aucune utilité pour nous
    fs.open(files, 'w', (err, fd) => {
         if (!err) {
            fs.writeFile(files, JSON.stringify(user), (err) => {
                // si il y a une erreur envoi de la variable error declaré plus haut
                if(err) return false;
                // sinon envoi de la variable avec le message
                return true;
            });
         }
    });
};

//post ajouter 3 id
//put modifier les id
//delete les supprimer