var express = require('express'),
    app = express(),
    fs =     require('fs'),
    server = require('http').createServer(app);


server.listen(3002); // Lancement du serveur




/********************************** Route **********************************/
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    console.log(users);
});

app.post('/', function(req, res){
    var users  = [{id:1,nom:"Lerdorf:",prenom:"Rasmus:"},{id:2,nom:"lorem:",prenom:"bidule:"},{id:3,nom:"mike:",prenom:"sylvestre:"}];
    setFichierBdd('bdd2.json',users);
    console.log(users);
    res.send(users);
});

app.put('/', function(req, res){
    usersBis = []; // Bdd
var users = getFichierBdd('bdd2.json');
    console.log(users);

    setTimeout(function(){ 
        users.forEach(function(user){
            if (user.id == 2)
                user.prenom ="Mike";
            usersBis.push(user); // Insert Into
        });
      },10000);

    setFichierBdd('bdd2.json',usersBis);
    res.send(usersBis);
});

app.delete('/', function(req, res){
    // supprimer les données d'un utilisateur
});




/**********************************    Function file **********************************/

function setFichierBdd(files,vars){
    // j'ouvre le fichier bdd.json
    // dataBdd sert a stocker les infos du fichier bdd.json, est utilisé par fs.open aucune utilité pour nous
    fs.open(files, 'w', (err, dataBdd) => {
         if (!err) {
            fs.writeFile(files, JSON.stringify(vars), (err) => {
                // si il y a une erreur envoi de la variable error declaré plus haut
                if(err) return false;
                // sinon envoi de la variable avec le message
                return true;
            });
         }
    })
};

function getFichierBdd(files){

        fs.open(files, 'rs+', (err, dataBdd) => {
        console.log(dataBdd)
             if (!err) {
                 console.log("tgt22222")
                 var data = fs.readFileSync(files);
                 console.log(data.toString());
                return JSON.parse(data.toString());
             }else
                 console.log("tgt")}
        });
};