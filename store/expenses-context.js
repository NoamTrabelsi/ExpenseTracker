import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.paylod, ...state];
    case "SET":
      const inverted = action.paylod.reverse();
      return inverted;
    case "UPDATE":
      const updatatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.paylod.id
      );
      const updatatableExpense = state[updatatableExpenseIndex];
      const updateItem = { ...updatatableExpense, ...action.paylod.data };
      const updataExpenses = [...state];
      updataExpenses[updatatableExpenseIndex] = updateItem;
      return updataExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.paylod);
    default:
      return state;
  }
}
function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpenses(expenseData) {
    dispatch({ type: "ADD", paylod: expenseData });
  }
  function setExpenses(expenses) {
    dispatch({ type: "SET", paylod: expenses });
  }
  function deleteExpenses(id) {
    dispatch({ type: "DELETE", paylod: id });
  }
  function updateExpenses(id, expenseData) {
    dispatch({
      type: "UPDATE",
      paylod: { id: id, data: expenseData },
    });
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpenses: addExpenses,
    deleteExpenses: deleteExpenses,
    updateExpenses: updateExpenses,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
