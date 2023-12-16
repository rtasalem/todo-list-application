import ListHeader from "./components/ListHeader";
import AddTodo from "./components/AddTodo";
import Search from "./components/Search";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="app">
      <header>
        <ListHeader />
      </header>
      <main>
        <AddTodo />
        <Search />
        <TodoList />
      </main>
    </div>
  );
}

export default App;