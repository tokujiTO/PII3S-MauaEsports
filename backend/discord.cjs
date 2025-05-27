require('dotenv').config();
const fetch = require('node-fetch');

const token =  process.env.BOT_TOKEN;

const fetchUser = async (id) => {
    try{
        const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
            headers: {
                Authorization: `Bot ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = fetchUser;