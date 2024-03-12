const { sequelize } = require('../models');

async function startReservation(transaction, modelName, data) {
  try {
    const model = sequelize.models[modelName];
    return await model.create(data, { transaction });
  } catch (error) {
    console.error(`Failed to start reservation for ${modelName}`);
    throw error;
  }
}

async function rollbackReservation(transaction) {
  try {
    await transaction.rollback();
    console.log('Transaction rolled back successfully');
  } catch (error) {
    console.error('Failed to rollback transaction:', error);
    throw error;
  }
}

module.exports = {
  startReservation,
  rollbackReservation,
};