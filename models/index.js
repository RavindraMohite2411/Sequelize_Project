const { Sequelize,DataTypes,Model } = require('sequelize');


const sequelize = new Sequelize('ravidb','root','Ravi@2411',{
    host:'localhost',
    logging: false,
    dialect:'mysql',
    pool:{max:5,min:0,idle:10000}
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const db = {};
  db.Sequelize=Sequelize;
  db.sequelize=sequelize;
  
  db.user = require('./users')(sequelize,DataTypes,Model)
  db.contact = require('./contact')(sequelize,DataTypes)
  

  db.user.hasMany(db.contact,{foreignKey: 'user_id',as:'contactsDetails'});//
  db.contact.belongsTo(db.user,{foreignKey: 'user_id',as:'userDetails'});

  db.sequelize.sync({ force: true });

  module.exports=db;