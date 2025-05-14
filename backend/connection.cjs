const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const USUARIO = process.env.USUARIO;
const SENHA = process.env.SENHA;

const Player = mongoose.model("Player", mongoose.Schema({
    nome: {type: String, required: true},
    nickname: {type: String},
    ra: {type: String, required: true},
    area: {type: String, required: false},
    cargo: {type: String, required: true}
}).plugin(uniqueValidator).plugin(AutoIncrement, { inc_field: 'p_id' }));

const Equipes = mongoose.model("Equipes", mongoose.Schema({
    nome: {type: String, required: true, unique: true},
    membros: {type: [String]}
}).plugin(uniqueValidator).plugin(AutoIncrement, { inc_field: 'e_id' }));

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
module.exports.Equipes = Equipes;
