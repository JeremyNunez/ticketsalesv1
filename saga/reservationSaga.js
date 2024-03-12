const { sequelize } = require('../models');
const { startReservation, rollbackReservation } = require('../utils/transaction');

async function reserveTicket(ticketDetails) {
  let transaction;

  try {
    // Iniciar la transacción
    transaction = await sequelize.transaction();

    // Pasos de la reserva de boletos
    const route = await startReservation(transaction, 'route', ticketDetails.route);
    const luggage = await startReservation(transaction, 'luggage', ticketDetails.luggage);
    const seat = await startReservation(transaction, 'seat', ticketDetails.seat);
    const payment = await startReservation(transaction, 'payment', ticketDetails.payment);
    const ticket = await startReservation(transaction, 'ticket', ticketDetails.ticket);

    // Confirmar la transacción
    await transaction.commit();

    return { route, luggage, seat, payment, ticket };
  } catch (error) {
    // En caso de error, deshacer la transacción
    if (transaction) {
      await rollbackReservation(transaction);
    }
    throw error;
  }
}

module.exports = {
  reserveTicket,
};