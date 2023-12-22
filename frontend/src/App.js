import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Auth from "./components/Auth";

const App = ({ toggleTheme }) => {
    const authToken = true;

    return (
        <div className="app">
            {!authToken && <Auth />}
            {authToken &&
                <>
                    <button onClick={toggleTheme}>Toggle Theme</button>
                    <header>
                        <Header />
                    </header>
                    <main>
                        <AddTodo />
                        <TodoList />
                    </main>
                </>
            }
        </div>
    );
};

export default App;
