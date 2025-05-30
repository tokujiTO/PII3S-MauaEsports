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
        console.error(err);
    }
}

const fetchGuild = async (guildId) => {
  const url = `https://discord.com/api/v10/guilds/${guildId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bot ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const guildData = await response.json();
    console.log('Dados do servidor:', guildData);
    return guildData;

  } catch (err) {
    console.error('Erro ao buscar o servidor:', err.message);
    return null;
  }
};
const fetchGuildMembers = async (guildId, limit = 10) => {
  const url = `https://discord.com/api/v10/guilds/${guildId}/members?limit=${limit}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bot ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const members = await response.json();
    console.log('Membros:', members);
    return members;

  } catch (err) {
    console.error('Erro ao buscar membros:', err.message);
  }
};


const isUserInGuild = async (guildId, userId) =>{
    const url = `https://discord.com/api/v10/guilds/${guildId}/members/${userId}`;

    try{
        const response = await fetch(url, {
            headers: {
                Authorization: `Bot ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if(response.status === 200){
            console.log('Usuário está no servidor!');
            return true;
        }
        else{
            console.log('Usuário NÃO está no servidor.');
            return false;
        }
    }
    catch(err){
        console.error(err);
        return false;
    }
}

module.exports = {
    fetchUser,
    fetchGuild,
    fetchGuildMembers,
    isUserInGuild
};