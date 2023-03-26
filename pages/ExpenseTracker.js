import React, { useState } from "react";

function ExpenseTracker() {
  // Define state for expenses and current expense
  const [expenses, setExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState({
    name: "",
    amount: "",
  });

  // Define functions to handle changes in the name and amount input fields
  const handleNameChange = event => {
    setCurrentExpense({ ...currentExpense, name: event.target.value });
  };

  const handleAmountChange = event => {
    setCurrentExpense({ ...currentExpense, amount: event.target.value });
  };

  // Define function to handle form submission
  const handleSubmit = event => {
    event.preventDefault();
    // Check if either name or amount input fields are empty or whitespace
    if (
      currentExpense.name.trim() === "" ||
      currentExpense.amount.trim() === ""
    ) {
      // If so, return without adding expense
      return;
    }
    // Add new expense to expenses state and reset currentExpense state
    setExpenses([currentExpense, ...expenses]);
    setCurrentExpense({ name: "", amount: "" });
  };

  // Define function to handle deletion of expense
  const handleDelete = index => {
    // Create a copy of expenses state, remove the expense at the specified index, and update expenses state
    const newExpenses = expenses.slice();
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
  };
  const totalAmount = expenses.reduce((total, expense) => {
    return total + parseFloat(expense.amount);
  }, 0);
  // Render form and list of expenses
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Expense Name:
          <input
            type="text"
            value={currentExpense.name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Expense Amount:
          <input
            type="number"
            value={currentExpense.amount}
            onChange={handleAmountChange}
          />
        </label>
        <button type="submit">Add Expense</button>
      </form>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {expenses
          .slice()
          .reverse()
          .map((expense, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "5px",
              }}
            >
              <span>
                {expense.name}: ${expense.amount}
              </span>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        Total amount spent: ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
}

export default ExpenseTracker;
