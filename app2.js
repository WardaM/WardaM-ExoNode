var express = require('express'),
    app = express(),
    fs =     require('fs'),
    server = require('http').createServer(app),
    fsp = require('fs-promise');
var promesses = [];
var promesses2 = [];

server.listen(3002); // Lancement du serveur



/********************************** Route **********************************/
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    console.log(users);
});

app.post('/', function(req, res){
    var users  = [{id:1,nom:"Lerdorf",prenom:"Rasmus"},{id:2,nom:"lorem",prenom:"bidule"},{id:3,nom:"mike",prenom:"sylvestre"}];
    setFichierBdd('bdd2.json',users);
    // value est le contenu du tableau promesses2
    Promise.race(promesses2).then(function (value){
        res.send({error:false,message:"Good"});
    });   
});

app.put('/', function(req, res){
    usersBis = []; // Bdd
    getFichierBdd2('bdd2.json');
    

   Promise.race(promesses).then(function (users) {
        
        users.forEach(function(user){
            if (user.id == 3){
                user.prenom ="plap";
                user.nom ="Mike";
            }
            usersBis.push(user); // Insert Into  
        });

       var setUsers=setFichierBdd('bdd2.json',usersBis);
        Promise.race(promesses2).then(function (setUsers){
            res.send(usersBis);
        });

   }).catch(function (err) {
        console.error('Une erreur est survenue lors de l\'accès aux scripts');
    });

   
});

// app.put('/', function(req, res){
//     usersBis = []; // Bdd
//     var users = getFichierBdd('bdd2.json');
//     console.log(users);
//     setTimeout(function(){
//         users.forEach(function(user){
//         if (user.id == 2)
//             user.prenom ="Mike";
//             user.nom ="Mike";
//         usersBis.push(user); // Insert Into
//         });
//     },10000);
    
//     setFichierBdd('bdd2.json',usersBis);
//     res.send(usersBis);
// });





app.delete('/', function(req, res){
    // supprimer les données d'un utilisateur
});








/**********************************    Function file **********************************/

function setFichierBdd(files,vars){
    // j'ouvre le fichier bdd.json
    // dataBdd sert a stocker les infos du fichier bdd.json, est utilisé par fs.open aucune utilité pour nous
    
    var ma_promesse =   fsp.writeFile(files, JSON.stringify(vars))
    // On demande une promesse sur la lecture du fichier
    promesses2.push(ma_promesse);
    // promesses2.push(fsp.writeFile(files, JSON.stringify(vars)));
};


           



function getFichierBdd2(fileName){
    
    // fsp.readFile(fileName, {encoding:'utf8'}).then(function(){
    //      JSON.parse;
    // });
    var ma_promesse = fsp.readFile(fileName, { encoding: 'utf8' }).then(JSON.parse); // On demande une promesse sur la lecture du fichier
    promesses.push(ma_promesse);
   
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
                 console.log("tgt")
        });

  
};