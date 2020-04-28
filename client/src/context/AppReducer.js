// a reducer is how we specify the app state changes in response to certain actions to our context

export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };

    case "TRANSACTION_ERROR":
      return {
        ...state,
        // loading: false,
        error: action.payload,
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        // send all transactions except the one that was deleted
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };

    case "ADD_TRANSACTION":
      return {
        transactions: [...state.transactions, action.payload],
      };
    default:
      return state;
  }
};
