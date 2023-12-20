const request = require('supertest');
const express = require('express');
const TaskController = require('../../controller/TaskController');
const TaskService = require('../../service/TaskService');

jest.mock('../../service/TaskService');

const app = express();
app.use(express.json());
app.use('api/v1/tasks', TaskController);

describe('TaskController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get all tasks', async () => {
        const mockedTasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
        TaskService.getAllTasks.mockResolvedValue(mockedTasks);

        const response = await request(app).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockedTasks);
    });

    it('should get a task by id', async () => {
        const mockedTask = { id: 1, title: 'Task 1' };
        TaskService.getTaskById.mockResolvedValue(mockedTask);

        const response = await request(app).get('/tasks/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockedTask);
    });

    it('should create a new task', async () => {
        const newTaskData = { title: 'New Task', description: 'A newly created task' };
        TaskService.createTask.mockResolvedValue(newTaskData);

        const response = await request(app)
            .post('/tasks')
            .send(newTaskData);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(newTaskData);
    });

    it('should update a task by id', async () => {
        const taskId = 1;
        const updatedTaskData = { title: 'Updated Task', description: 'An updated task' };
        TaskService.updateTask.mockResolvedValue(updatedTaskData);

        const response = await request(app)
            .put(`/tasks/${taskId}`)
            .send(updatedTaskData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedTaskData);
    });

    it('should patch a task by id', async () => {
        const taskId = 1;
        const patchedTaskData = { description: 'Patched task description' };
        TaskService.patchTask.mockResolvedValue(patchedTaskData);

        const response = await request(app)
            .patch(`/tasks/${taskId}`)
            .send(patchedTaskData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(patchedTaskData);
    });

    it('should delete a task by id', async () => {
        const taskId = 1;
        const deleteMessage = { message: 'Task successfully deleted.' };
        TaskService.deleteTaskById.mockResolvedValue(deleteMessage);

        const response = await request(app).delete(`/tasks/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(deleteMessage);
    });

    it('should return 404 if task not found (GET by id)', async () => {
        TaskService.getTaskById.mockResolvedValue(null);

        const response = await request(app).get('/tasks/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Task not found.' });
    });

    it('should return 404 if task not found (DELETE by id)', async () => {
        TaskService.deleteTaskById.mockResolvedValue(null);

        const response = await request(app).delete('/tasks/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Task not found.' });
    });

    // Add other test cases as necessary
});
