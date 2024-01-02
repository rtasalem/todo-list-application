import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Calendar from "./components/pages/Calendar";

const App = () => {
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
