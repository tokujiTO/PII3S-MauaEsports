const mongoose = require('mongoose');

const USUARIO = process.env.USUARIO;
const SENHA = process.env.SENHA;

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
