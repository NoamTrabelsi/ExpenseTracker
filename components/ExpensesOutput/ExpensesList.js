import { FlatList } from "react-native";
import ExpensesItem from "./ExpensesItem";

function renderExpensesItem(itemData) {
  return <ExpensesItem {...itemData.item} />;
}
function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpensesItem}
      keyExtractor={(item) => item.id}
    />
  );
}
export default ExpensesList;
