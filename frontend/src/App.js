import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import Search from "./components/Search";
import TodoList from "./components/TodoList";
import Auth from "./components/Auth";

const App = () => {

  const authToken = true;

  return (
    <div className="app">
      {!authToken && <Auth /> }
      {authToken &&
      <>
      <header>
        <Header />
      </header>
      <main>
        <AddTodo />
        <Search />
        <TodoList />
      </main>
      </>}
    </div>
  );
}

export default App;