//methods that will use the model to interact with the db
//we import and use our model (Transaction) for CRUD
const Transaction = require("../models/Transaction");

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "srv err",
    });
  }
};

exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);
    //pt ca fol modelul (Transaction)
    //indiferent ce vine din frontend prin req.body,
    // app va accepta doar ce ai tu definit in model.

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    // console.log(err);//pt a vedea sub ce forma sunt erorile,
    //   sa stii ce sa cauti cu map in caz ca vrei sa afisezi ceva mai exact
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "srv err",
      });
    }
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "no transaction found",
      });
    }

    await transaction.remove(); // not called on the model, direct pe resursa!?

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "srv err",
    });
  }
};
