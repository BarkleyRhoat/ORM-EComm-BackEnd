const express = require('express');
const routes = require('./routes');
const { Model, DataTypes } = require('sequelize');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// Assuming "sequelize" is your Sequelize instance and has been configured earlier
sequelize.sync({ force: false }).then(() => {
  console.log('Sequelize models synced with the database');
}).catch((error) => {
  console.error('Error syncing Sequelize models:', error);
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});