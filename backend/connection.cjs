const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const USUARIO = process.env.USUARIO;
const SENHA = process.env.SENHA;

const Player = mongoose.model("Player", mongoose.Schema({
    nome: {type: String, required: true},
    nickname: {type: String},
    ra: {type: String, required: true},
    area: {type: String, required: false},
    cargo: {type: String, required: true}
}).plugin(AutoIncrement, { inc_field: 'p_id' }));

const Equipes = mongoose.model("Equipes", mongoose.Schema({
    nome: {type: String, required: true},
    membros: {type: [String]}
}).plugin(AutoIncrement, { inc_field: 'e_id' }));

const Evento = mongoose.model("Evento", mongoose.Schema({
    titulo: {type: String, required: true},
    data: {type: Date, required: true},
    descricao: {type: String, required: true}
}));

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
module.exports.Evento = Evento;
