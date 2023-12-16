const express = require("express");
const taskService = require("../../service/TaskService.js");
const taskRouter = require("../../controller/TaskController.js");

const app = express();
app.use(express.json());
app.use("/", taskRouter);

describe("Task Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /", () => {
    it("should get all tasks", async () => {
      taskService.getAllTasks.mockResolvedValueOnce([
        { id: 1, title: "Task 1" },
      ]);
      const response = await supertest(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: 1, title: "Task 1" }]);
    });

    it("should handle errors during getting all tasks", async () => {
      taskService.getAllTasks.mockRejectedValueOnce(
        new Error("Database error")
      );
      const response = await supertest(app).get("/");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Database error" });
    });
  });

  describe("GET /:id", () => {
    it("should get a task by ID", async () => {
      taskService.getTaskById.mockResolvedValueOnce({ id: 1, title: "Task 1" });
      const response = await supertest(app).get("/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, title: "Task 1" });
    });

    it("should handle not finding a task by ID", async () => {
      taskService.getTaskById.mockResolvedValueOnce(null);
      const response = await supertest(app).get("/1");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Task not found." });
    });

    it("should handle errors during getting a task by ID", async () => {
      taskService.getTaskById.mockRejectedValueOnce(
        new Error("Database error")
      );
      const response = await supertest(app).get("/1");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Database error" });
    });
  });

  // Add similar tests for other endpoints (POST, PUT, PATCH, DELETE)
});
