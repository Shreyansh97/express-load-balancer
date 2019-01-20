const Sequelize = require('sequelize');
const path = require('path');
const path_to_db = path.join(__dirname,'..','db.sqlite');
const fs = require('fs');
const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: path_to_db
});

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;