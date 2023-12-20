const request = require("supertest");
const express = require("express");
const TaskController = require("../../controller/TaskController");
const TaskService = require("../../service/TaskService");

jest.mock("../../service/TaskService");

const app = express();
app.use(express.json());
app.use("/api/v1/tasks", TaskController);

describe("TaskController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // TEST - GET all tasks:
  it("should get all tasks", async () => {
    const mockTasks = [
      {
        id: 1,
        name: "Mock Task 1",
        description: "Description for Mock Task 1",
        endDate: "2065-04-12",
        completed: false,
      },
      {
        id: 2,
        name: "Mock Task 2",
        description: "Description for Mock Task 2",
        endDate: "2079-10-31",
        completed: true,
      },
    ];
    TaskService.getAllTasks.mockResolvedValue(mockTasks);

    const response = await request(app).get("/api/v1/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTasks);
  });

  // TEST - GET task by id:
  it("should get a task by id", async () => {
    const id = 1;
    const mockTask = {
      id: id,
      name: "Mock Task",
      description: "Description for Mock Task",
      endDate: "2024-01-04",
      completed: false,
    };
    TaskService.getTaskById.mockResolvedValue(mockTask);

    const response = await request(app).get(`/api/v1/tasks/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTask);
  });

  // TEST - GET task by id - Error Handling:
  it("should return 404 if task not found", async () => {
    TaskService.getTaskById.mockResolvedValue(null);

    const response = await request(app).get("/api/v1/tasks/1000");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: `Task with id of 1000 not found.`,
    });
  });

  // TEST - POST create task:
  it("should create a new task", async () => {
    const newMockTaskData = {
      name: "New Mock Task",
      description: "Description for New Mock Task",
      endDate: "2001-01-27",
      completed: true,
    };
    TaskService.createTask.mockResolvedValue(newMockTaskData);

    const response = await request(app)
      .post("/api/v1/tasks")
      .send(newMockTaskData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newMockTaskData);
  });

  // TEST - PUT update task:
  it("should update a task by id", async () => {
    const id = 1;
    const mockUpdatedTaskData = {
      name: "Mock Updated Task",
      description: "Description for Mock Updated Task",
      endDate: "1934-07-03",
      completed: false,
    };
    TaskService.updateTask.mockResolvedValue(mockUpdatedTaskData);

    const response = await request(app)
      .put(`/api/v1/tasks/${id}`)
      .send(mockUpdatedTaskData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUpdatedTaskData);
  });

  // TEST - PATCH task by id:
  it("should patch a task by id", async () => {
    const id = 1;
    const mockPatchedTaskData = {
      description: "Description for Mock Patched Task",
    };
    TaskService.patchTask.mockResolvedValue(mockPatchedTaskData);

    const response = await request(app)
      .patch(`/api/v1/tasks/${id}`)
      .send(mockPatchedTaskData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPatchedTaskData);
  });

  // TEST - DELETE task by id:
  it("should delete a task by id", async () => {
    const id = 1;
    const mockDeleteMessage = { message: "Task deleted successfully." };
    TaskService.deleteTaskById.mockResolvedValue(mockDeleteMessage);

    const response = await request(app).delete(`/api/v1/tasks/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDeleteMessage);
  });

  // TEST - DELETE task by id - Error Handling:
  it("should return 404 if task not found (GET by id)", async () => {
    TaskService.getTaskById.mockResolvedValue(null);

    const response = await request(app).get("/api/v1/tasks/1000");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: `Task with id of 1000 not found.`,
    });
  });

  // TEST - DELETE task by id - Error Handling:
  it("should return 404 if task not found (DELETE by id)", async () => {
    TaskService.deleteTaskById.mockResolvedValue(null);

    const response = await request(app).delete("/api/v1/tasks/1000");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: `Task with id of 1000 not found.`,
    });
  });
});
