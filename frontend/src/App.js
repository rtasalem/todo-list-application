import ListHeader from "./components/ListHeader";
import AddTodo from "./components/AddTodo";
import Search from "./components/Search";
import YourTodoLists from "./components/YourTodoLists";

const App = () => {
  return (
    <div className="app">
      <header>
        <ListHeader />
      </header>
      <main>
        <AddTodo />
        <Search />
        <YourTodoLists />
      </main>
    </div>
  );
}

export default App;