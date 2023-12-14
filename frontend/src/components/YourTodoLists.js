import YourTodoListIconBar from "./YourTodoListIconBar";

const YourTodoLists = () => {
    return (
        <div className="your-todo-list-container">
            <h2>Your To-Do Lists</h2>

            {/* TODO: Refactor this... */}
            <div className="form-container">
                <form>
                    <input type="text" placeholder="Todo 1" />
                </form>
                <div className="icon-bar-container">
                    <YourTodoListIconBar />
                </div>
            </div>

            <div className="form-container">
                <form>
                    <input type="text" placeholder="Todo 2" />
                </form>
                <div className="icon-bar-container">
                    <YourTodoListIconBar />
                </div>
            </div>

            <div className="form-container">
                <form>
                    <input type="text" placeholder="Todo 3" />
                </form>
                <div className="icon-bar-container">
                    <YourTodoListIconBar />
                </div>
            </div>

            <div className="form-container">
                <form>
                    <input type="text" placeholder="Todo 4" />
                </form>
                <div className="icon-bar-container">
                    <YourTodoListIconBar />
                </div>
            </div>


        </div>
    );
}

export default YourTodoLists;