import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";

export const TransactionList = () => {
  //   const context = useContext(GlobalContext);
  //   console.log(context); //{transactions: Array(4)} (aka initialState)

  //in loc sa folosesc aici context.transactions,  fol direct destructuring:
  const { transactions } = useContext(GlobalContext);
  //   console.log(transactions); // array-ul cu cele 4 obj

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          //it needs to know what transaction to render
          //so we pass it as a prop
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
