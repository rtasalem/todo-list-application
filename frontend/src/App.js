import ListHeader from "./components/ListHeader";
import AddTodo from "./components/AddTodo";

const App = () => {
  return (
    <div className = "app">
      <ListHeader listName={'To-Do List 📋'}/>
      <AddTodo />
    </div>
  );
}

export default App;