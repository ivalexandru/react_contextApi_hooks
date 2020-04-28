import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//initial state
// expense = negative nr, income = positive nr
const initialState = {
  transactions: [],
  error: null,
  loading: true, //once req is made, set it to false
};

//create context
export const GlobalContext = createContext(initialState);

//PROVIDER component (we'll wrap all of our components
// (ele sunt 'children' ) from App.js in this component)
// AppReducer == numele fisierului in care ai reducerul
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions(sent to the reducer):

  //no need for http://localhost pt ca proxy
  // res.data will give us the obj; vrei doar array, mai pui 1x .data
  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transactions");
      //we wanna send the results trough the state:
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`); //deletes from db

      //deletes from frontend:
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  //accesezi chestii din initialState cu state.ceVrei..
  // (acum ai un singur array acolo, dar poti avea mai multe)
  //la fel, aici pui si functiile pe care vrei sa le accesezi altundeva
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        getTransactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
