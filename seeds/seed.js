const sequelize = require('../config/connection');

const seedUser = require('./userData');
const seedFavorite = require("./favorite-seeds")

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  await seedUser();
  
  await seedFavorite();
  
  process.exit(0);
};

seedDatabase();
