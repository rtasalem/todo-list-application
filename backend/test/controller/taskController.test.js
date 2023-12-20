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

  it("should create a new task", async () => {
    const newTaskData = {
      title: "New Task",
      description: "A newly created task",
    };
    TaskService.createTask.mockResolvedValue(newTaskData);

    const response = await request(app).post("/api/v1/tasks").send(newTaskData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newTaskData);
  });

  it("should update a task by id", async () => {
    const taskId = 1;
    const updatedTaskData = {
      title: "Updated Task",
      description: "An updated task",
    };
    TaskService.updateTask.mockResolvedValue(updatedTaskData);

    const response = await request(app)
      .put(`/api/v1/tasks/${taskId}`)
      .send(updatedTaskData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedTaskData);
  });

  it("should patch a task by id", async () => {
    const taskId = 1;
    const patchedTaskData = { description: "Patched task description" };
    TaskService.patchTask.mockResolvedValue(patchedTaskData);

    const response = await request(app)
      .patch(`/api/v1/tasks/${taskId}`)
      .send(patchedTaskData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(patchedTaskData);
  });

  it("should delete a task by id", async () => {
    const taskId = 1;
    const deleteMessage = { message: "Task successfully deleted." };
    TaskService.deleteTaskById.mockResolvedValue(deleteMessage);

    const response = await request(app).delete(`/api/v1/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(deleteMessage);
  });

  it("should return 404 if task not found (GET by id)", async () => {
    TaskService.getTaskById.mockResolvedValue(null);

    const response = await request(app).get("/api/v1/tasks/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Task not found." });
  });

  it("should return 404 if task not found (DELETE by id)", async () => {
    TaskService.deleteTaskById.mockResolvedValue(null);

    const response = await request(app).delete("/api/v1/tasks/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Task not found." });
  });
});
