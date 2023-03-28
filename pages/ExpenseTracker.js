import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpendingAsync,
  selectSpending,
  createSpendingAsync,
  deleteSpendingAsync,
} from "./store/spendingSlice";

function ExpenseTracker({ dayOfMonth, monthName, currentYear }) {
  const [inputExpense, setInputExpense] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const dispatch = useDispatch();
  const spending = useSelector(selectSpending);
  useEffect(() => {
    dispatch(fetchSpendingAsync());
  }, [dispatch]);

  const filteredExpenses = spending.filter(event => {
    return (
      event.month === monthName &&
      event.day === dayOfMonth &&
      event.year === currentYear
    );
  });

  const handleNameChange = event => {
    setInputExpense(event.target.value);
  };

  const handleAmountChange = event => {
    setInputAmount(event.target.value);
  };

  const handleOnClick = async () => {
    if (!inputAmount) {
      console.log("Amount cannot be empty");
      return;
    }
    try {
      await dispatch(
        createSpendingAsync({
          month: monthName,
          day: dayOfMonth,
          year: currentYear,
          spendingname: inputExpense,
          spendingamount: inputAmount,
        })
      );
      setInputExpense("");
      setInputAmount("");
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleRemoveClick = async id => {
    //console.log("this is the id: " + id);
    dispatch(deleteSpendingAsync(id));
  };

  return (
    <div>
      <div>
        <label>
          Expense Name:
          <input type="text" value={inputExpense} onChange={handleNameChange} />
        </label>
        <label>
          Expense Amount:
          <input
            type="number"
            value={inputAmount}
            onChange={handleAmountChange}
          />
        </label>
        <button onClick={handleOnClick}>Add Expense</button>
        <>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((event, index) => (
              <div key={event.id}>
                <p>
                  {event.spendingname}: ${event.spendingamount}
                </p>
                <p>{event.id}</p>
                <button onClick={() => handleRemoveClick(event.id)}>
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div>No matching events found</div>
          )}
        </>
      </div>
    </div>
  );
}

export default ExpenseTracker;
