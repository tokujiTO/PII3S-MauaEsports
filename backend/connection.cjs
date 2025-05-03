const express = require('express');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const app = express();
const PORT = process.env.PORT || 3000;

const USUARIO = process.env.USUARIO;
const SENHA = process.env.SENHA;

const Player = mongoose.model("Player", mongoose.Schema({
    nome: {type: String, required: true},
    id: {type: String, required: true, unique: true}
}).plugin(uniqueValidator));

async function connectToMongo() {
    try{
        await mongoose.connect(`mongodb+srv://${USUARIO}:${SENHA}@cluster0.efzawfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("CONECTADO BORAAAA");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.connectToMongo = connectToMongo;
module.exports.Player = Player;
