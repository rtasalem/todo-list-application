const TaskService = require("../../backend/service/TaskService.js");

jest.mock("../../backend/database/model/Task.js", () => Task);

describe("TaskService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockTaskData = {
    id: 1,
    name: "Test Task",
    description: "Test Description",
  };

  // Mock functions for Sequelize Model methods
  Task.findAll.mockResolvedValue([mockTaskData]);
  Task.findByPk.mockImplementation((id) => {
    if (id === 1) {
      return Promise.resolve(mockTaskData);
    }
    return Promise.resolve(null);
  });
  Task.create.mockResolvedValue(mockTaskData);
  Task.update.mockResolvedValue([1]); // Number of affected rows
  Task.destroy.mockResolvedValue(1); // Number of deleted rows

  // Test getAllTasks
  test("getAllTasks should return an array of tasks", async () => {
    const tasks = await TaskService.getAllTasks();
    expect(tasks).toEqual([mockTaskData]);
  });

  // Test getTaskById
  test("getTaskById should return a task for a valid id", async () => {
    const taskId = 1;
    const task = await TaskService.getTaskById(taskId);
    expect(task).toEqual(mockTaskData);
  });

  test("getTaskById should throw an error for an invalid id", async () => {
    const taskId = 2;
    await expect(TaskService.getTaskById(taskId)).rejects.toThrow(
      "Task not found."
    );
  });

  // Test createTask
  test("createTask should return the created task", async () => {
    const newTaskData = {
      name: "New Task",
      description: "New Description",
    };
    const createdTask = await TaskService.createTask(newTaskData);
    expect(createdTask).toEqual(mockTaskData);
  });

  // Test updateTask
  test("updateTask should return the updated task", async () => {
    const taskId = 1;
    const updatedTaskData = {
      name: "Updated Task",
      description: "Updated Description",
    };
    const updatedTask = await TaskService.updateTask(taskId, updatedTaskData);
    expect(updatedTask).toEqual(mockTaskData);
  });

  test("updateTask should throw an error for an invalid id", async () => {
    const taskId = 2;
    const updatedTaskData = {
      name: "Updated Task",
      description: "Updated Description",
    };
    await expect(
      TaskService.updateTask(taskId, updatedTaskData)
    ).rejects.toThrow("Task not found.");
  });

  // Test deleteTaskById
  test("deleteTaskById should return a success message for a valid id", async () => {
    const taskId = 1;
    const result = await TaskService.deleteTaskById(taskId);
    expect(result).toEqual({ message: "Task successfully deleted." });
  });

  test("deleteTaskById should throw an error for an invalid id", async () => {
    const taskId = 2;
    await expect(TaskService.deleteTaskById(taskId)).rejects.toThrow(
      "Task not found."
    );
  });
});
