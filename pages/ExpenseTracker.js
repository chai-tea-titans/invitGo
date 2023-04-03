import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpendingAsync,
  selectSpending,
  createSpendingAsync,
  deleteSpendingAsync,
} from "./api/store/spendingSlice";

function ExpenseTracker({ dayOfMonth, monthName, currentYear }) {
  const [inputExpense, setInputExpense] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const spending = useSelector(selectSpending);
  useEffect(() => {
    dispatch(fetchSpendingAsync());
  }, [dispatch]);

  useEffect(() => {
    const filteredExpenses = spending.filter(event => {
      if (event && event.month) {
        return (
          event.month === monthName &&
          event.day === dayOfMonth &&
          event.year === currentYear
        );
      } else {
        return false;
      }
    });

    const total = filteredExpenses.reduce(
      (acc, curr) => acc + parseFloat(curr.spendingamount),
      0
    );
    setTotalAmount(total);
  }, [spending, dayOfMonth, monthName, currentYear]);

  const filteredExpenses = spending.filter(event => {
    if (event && event.month) {
      return (
        event.month === monthName &&
        event.day === dayOfMonth &&
        event.year === currentYear
      );
    } else {
      return false;
    }
  });

  const handleNameChange = event => {
    setInputExpense(event.target.value);
  };

  const handleAmountChange = event => {
    setInputAmount(event.target.value);
  };

  const handleOnClick = async () => {
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
      await dispatch(fetchSpendingAsync());
      setInputExpense("");
      setInputAmount("");
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleRemoveClick = async id => {
    try {
      await dispatch(deleteSpendingAsync(id));
      dispatch(fetchSpendingAsync());
    } catch (error) {
      console.error("Error removing spending: ", error);
    }
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
                  {event.spendingname}:  ${event.spendingamount}
                </p>
                <button onClick={() => handleRemoveClick(event.id)}>
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div>No matching events found</div>
          )}
        </>
        <p>Total amount: ${+totalAmount.toFixed(2)}</p>
        {}
      </div>
    </div>
  );
}

export default ExpenseTracker;
