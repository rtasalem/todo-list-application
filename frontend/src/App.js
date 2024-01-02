import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ListHeader from "./components/ListHeader";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Calendar from "./components/pages/Calendar"

const App = () => {
    return (
        <div className="app">
            {!authToken && <Auth />}
            {authToken &&
                <>
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
                    </>
                }
        </div>
  );
};

export default App;
