// a reducer is how we specify the app state changes in res to certain actions to our context
export default (state, action) => {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      return {
        ...state,
        // send all transactions except the one that was deleted
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };

    case "ADD_TRANSACTION":
      return {
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};
