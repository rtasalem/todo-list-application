const request = require("supertest");
const express = require("express");
const TaskController = require("../../controller/TaskController");
const TaskService = require("../../service/TaskService");

jest.mock("../../service/TaskService");

const app = express();
app.use(express.json());
app.use("api/v1/tasks", TaskController);

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
                endDate: "2023-12-20",
                completed: true,
            },
            {
                id: 2,
                name: "Mock Task 2",
                description: "Description for Mock Task 2",
                endDate: "2024-02-14",
                completed: false,
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
            name: "Mock Task 1",
            description: "Description for Mock Task 1",
            endDate: "2025-05-07",
            completed: true,
        };
        TaskService.getTaskById.mockResolvedValue(mockTask);

        const response = await request(app).get(`/api/v1/tasks/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockTask);
    });

    it("should create a new task", async () => {
        const newMockTask = {
            name: "New Mock Task",
            description: "Description for New Mock Task",
            endDate: "2050-07-12",
            completed: false,
        };
        TaskService.createTask.mockResolvedValue(newMockTask);

        const response = await request(app).post("/api/v1/tasks").send(newMockTask);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(newMockTask);
    });

    it("should update a task by id", async () => {
        const id = 1;
        const updatedMockTask = {
            name: "Updated Mock Task",
            description: "Description for Updated Mock Task",
            endDate: "2075-04-02",
            completed: true,
        };
        TaskService.updateTask.mockResolvedValue(updatedMockTask);

        const response = await request(app)
            .put(`/api/v1/tasks/${id}`)
            .send(updatedMockTask);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedMockTask);
    });

    it("should patch a task by id", async () => {
        const id = 1;
        const patchedMockTaskData = {
            description: "Description for Patched Mock Task",
        };
        TaskService.patchTask.mockResolvedValue(patchedMockTaskData);

        const response = await request(app)
            .patch(`/api/v1/tasks/${id}`)
            .send(patchedMockTaskData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(patchedMockTaskData);
    });

    it('should delete a task by id', async () => {
        const id = 1;
        const deleteMessage = { message: "Task successfully deleted." };
        TaskService.deleteTaskById.mockResolvedValue(deleteMessage);

        const response = await request(app).delete(`/api/v1/tasks/${id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(deleteMessage);
    });
});
