const { Task } = require("../../database/associations");
const TaskService = require("../../service/TaskService");

jest.mock("../../database/associations");

describe("TaskService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // TEST - getAllTasks:
  it("should get all tasks", async () => {
    const mockTasks = [
      {
        id: 1,
        name: "Mock Task 1",
        description: "Description for Mock Task 1",
        endDate: "2031-06-13",
        completed: true,
      },
      {
        id: 2,
        name: "Mock Task 2",
        description: "Description for Mock Task 2",
        endDate: "2019-03-22",
        completed: false,
      },
    ];
    Task.findAll.mockResolvedValue(mockTasks);

    const tasks = await TaskService.getAllTasks();
    expect(tasks).toEqual(mockTasks);
  });

  // TEST - getTaskById:
  it("should get a task by id", async () => {
    const id = 1;
    const mockTask = {
      id: id,
      description: "Description for Mock Task 1",
      endDate: "2044-11-15",
      completed: true,
    };
    Task.findByPk.mockResolvedValue(mockTask);

    const task = await TaskService.getTaskById(id);
    expect(task).toEqual(mockTask);
  });

  // TEST - createTask:
  it("should create a task", async () => {
    const mockTaskData = {
      name: "Mock New Task",
      description: "Description for New Mock Task",
      endDate: "2133-04-05",
      completed: false,
    };
    const createdTask = { id: 1, ...mockTaskData };
    Task.create.mockResolvedValue(createdTask);

    const newTask = await TaskService.createTask(mockTaskData);
    expect(newTask).toEqual(createdTask);
  });

  // TEST - updateTask:
  it("should update a task", async () => {
    const id = 1;
    const mockUpdateTaskData = {
      name: "Mock Updated Task",
      description: "Description for Mock Updated Task",
    };
    const mockTask = { id: id, ...mockUpdateTaskData };
    Task.findByPk.mockResolvedValue(mockTask);
    mockedTask.update.mockResolvedValue(mockTask);

    const updatedTask = await TaskService.updateTask(id, mockUpdateTaskData);
    expect(updatedTask).toEqual(mockTask);
  });

  // TEST - patchTask:
  it("should patch a task", async () => {
    const id = 1;
    const mockPathcedTaskData = {
      description: "Description for Mock Patched Task",
    };
    const mockTask = { id: id, ...mockPathcedTaskData };
    Task.findByPk.mockResolvedValue(mockTask);
    Task.update.mockResolvedValue(mockTask);

    const patchedTask = await TaskService.patchTask(taskId, patchedTaskData);
    expect(patchedTask).toEqual(mockedTask);
  });

  // TEST - deleteTaskById:
  it("should delete a task by id", async () => {
    const id = 1;
    const mockTask = {
      id: id,
      name: "Mock Task",
      description: "Description for Mock Task",
      endDate: "2052-04-13",
      completed: true,
    };
    Task.findByPk.mockResolvedValue(mockTask);
    // mockTask.destroy.mockResolvedValue(true);
    Task.destroy.mockResolvedValue(mockTask);

    const result = await TaskService.deleteTaskById(id);
    expect(result).toEqual({ message: "Task successfully deleted." });
  });

  // TEST - deleteTaskById - Error Handling
  it("should return null when attempting to delete a non-existing task", async () => {
    const id = 1000;
    Task.findByPk.mockResolvedValue(null);

    const result = await TaskService.deleteTaskById(id);
    expect(result).toBeNull();
  });
});
