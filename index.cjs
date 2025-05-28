require('dotenv').config();
const app = require('./backend/app.cjs');
const connection = require('./backend/connection.cjs');
const {fetchUser, fetchGuild, fetchGuildMembers, isUserInGuild} = require('./backend/discord.cjs');


const PORT = process.env.PORT || 3000;

connection.connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});