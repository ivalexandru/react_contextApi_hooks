import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

//initial state
// expense = negative nr, income = positive nr
const initialState = {
  transactions: [],
};

//create context
export const GlobalContext = createContext(initialState);

//PROVIDER component (we'll wrap all of our components
// (ele sunt 'children' ) from App.js in this component)
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions:
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  //accesezi chestii din initialState cu state.ceVrei..
  // (acum ai un singur array acolo, dar poti avea mai multe)
  //la fel, aici pui si functiile pe care vrei sa le accesezi altundeva
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
