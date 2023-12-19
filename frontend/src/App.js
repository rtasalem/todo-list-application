import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ListHeader from "./components/ListHeader";
import AddTodo from "./components/AddTodo";
import Search from "./components/Search";
import TodoList from "./components/TodoList";

import Calendar from "./components/pages/Calendar"

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <ListHeader />
        </header>
        <main>
          <AddTodo />
          <Search />
          <TodoList />
          
          <Routes>
            <Route path='/' />
            <Route path='/calendar' element={<Calendar />} />
          </Routes>

        </main>

      </div>
      </Router>
      
  );
}

export default App;