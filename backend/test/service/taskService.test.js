const { Task } = require("../../database/associations");
const TaskService = require("../../service/TaskService");

jest.mock("../../database/associations");

describe("TaskService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test: GET all tasks
  it("should get all tasks", async () => {
    const mockTasks = [
      {
        id: 1,
        name: "Mock Task 1",
        description: "Description for Mock Task 1",
        endDate: "2023-12-25",
        completed: false,
      },
      {
        id: 2,
        name: "Mock Task 2",
        description: "Description for Mock Task 2",
        endDate: "2050-01-13",
        completed: true,
      },
    ];
    Task.findAll.mockResolvedValue(mockTasks);

    const tasks = await TaskService.getAllTasks();
    expect(tasks).toEqual(mockTasks);
  });

  // Test: GET task by id
  it("should get a task by id", async () => {
    const id = 1;
    const mockTask = {
      id: id,
      name: "Mock Task 1",
      description: "Description for Mock Task 1",
      endDate: "2098-03-25",
      completed: false,
    };
    Task.findByPk.mockResolvedValue(mockTask);

    const task = await TaskService.getTaskById(id);
    expect(task).toEqual(mockTask);
  });

  // Test: POST create task
  it("should create a task", async () => {
    const mockTaskData = {
      name: "New Mock Task",
      description: "Description for New Mock Task",
      endDate: "2034-09-24",
      completed: true,
    };
    const mockCreatedTask = { id: 1, ...mockTaskData };
    Task.create.mockResolvedValue(mockCreatedTask);

    const newMockTask = await TaskService.createTask(mockTaskData);
    expect(newMockTask).toEqual(mockCreatedTask);
  });

  // Test: PUT update task
  it("should update a task", async () => {
    const id = 1;
    const mockUpdatedTaskData = {
      name: "Mock Task",
      description: "Description for Mock Task",
      endDate: "2045-07-27",
      completed: false,
    };
    const mockTask = { id: id, ...mockUpdatedTaskData };
    Task.findByPk.mockResolvedValue(mockTask);
    mockTask.update.mockResolvedValue(mockTask);

    const mockUpdatedTask = await TaskService.updateTask(
      id,
      mockUpdatedTaskData
    );
    expect(mockUpdatedTask).toEqual(mockTask);
  });

  // Test: PATCH task
  it("should patch a task", async () => {
    const id = 1;
    const mockPatchedTaskData = {
      description: "Description for Mock Patched Task",
    };
    const mockTask = { id: id, ...mockPatchedTaskData };
    Task.findByPk.mockResolvedValue(mockTask);

    const mockPatchedTask = await TaskService.patchTask(
      id,
      mockPatchedTaskData
    );
    expect(mockPatchedTask).toEqual(mockTask);
  });

  // Test: DELETE task by id
  it("should delete a task by id", async () => {
    const id = 1;
    const mockTask = {
      id: id,
      name: "Mock Task",
      description: "Description for Mock Task",
      endDate: "2056-01-02",
      completed: true,
    };
    Task.findByPk.mockResolvedValue(mockTask);
    mockTask.destroy.mockResolvedValue(true);

    const result = await TaskService.deleteTaskById(id);
    expect(result).toEqual({ message: "Task successfully deleted." });
  });
});
