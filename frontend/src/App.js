import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Calendar from "./components/pages/Calendar";
import Auth from "./components/Auth";
import Search from "./components/Search";

const App = () => {
  const authToken = true;

  return (
    <div className="app">
      <Router>
        <header>
          <Header />
        </header>
        <main>
          <AddTodo />
          <TodoList />

          <Routes>
            <Route path="/" />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
