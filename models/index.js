const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const Route = sequelize.define('Route', {
  origin: { type: Sequelize.STRING, allowNull: false },
  destination: { type: Sequelize.STRING, allowNull: false },
  date: { type: Sequelize.DATE, allowNull: false },
  availableSeats: { type: Sequelize.INTEGER, allowNull: false },
});

const Luggage = sequelize.define('Luggage', {
  weight: { type: Sequelize.FLOAT, allowNull: false },
  description: { type: Sequelize.STRING },
});

const Seat = sequelize.define('Seat', {
  number: { type: Sequelize.INTEGER, allowNull: false },
  class: { type: Sequelize.STRING, allowNull: false },
});

const Payment = sequelize.define('Payment', {
  amount: { type: Sequelize.FLOAT, allowNull: false },
  method: { type: Sequelize.STRING, allowNull: false },
});

const Ticket = sequelize.define('Ticket', {
  number: { type: Sequelize.INTEGER, allowNull: false },
  status: { type: Sequelize.STRING, defaultValue: 'pending' },
});

module.exports = {
  sequelize,
  Route,
  Luggage,
  Seat,
  Payment,
  Ticket,
};