import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  const authToken = true;

  return (
    <div className="app">
      <>
        <header>
          <Header />
        </header>
        <main>
          <AddTodo />
          <TodoList />
        </main>
      </>
    </div>
  );
};

export default App;
