import AddTodoIconBar from "./AddTodoIconBar";

const AddTodo = () => {
    return (
        <div className="add-todo">
            <h2>Add a To-Do...</h2>
            <div className="form-container">
                <form>
                    <input type="text" placeholder="What do you need to-do?" />
                </form>
                <div className="icon-bar-container">
                    <AddTodoIconBar />
                </div>
            </div>
        </div>
    );
}

export default AddTodo;