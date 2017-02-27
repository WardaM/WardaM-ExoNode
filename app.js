var express = require('express'),
    app = express(),
    body =     require('body-parser'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require("fs"),
    mysql = require('mysql'),    // On utilise le module node-mysql

    users = []; // Bdd par défaut vide

    
server.listen(3001,"0.0.0.0"); // Lancement du serveur





