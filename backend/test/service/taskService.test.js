const { Task } = require('../../database/associations');
const TaskService = require('./TaskService');

jest.mock('../../database/associations');

describe('TaskService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get all tasks', async () => {
        const mockedTasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
        Task.findAll.mockResolvedValue(mockedTasks);

        const tasks = await TaskService.getAllTasks();
        expect(tasks).toEqual(mockedTasks);
    });

    it('should get a task by id', async () => {
        const taskId = 1;
        const mockedTask = { id: taskId, title: 'Task 1' };
        Task.findByPk.mockResolvedValue(mockedTask);

        const task = await TaskService.getTaskById(taskId);
        expect(task).toEqual(mockedTask);
    });

    // Add other test cases for createTask, updateTask, patchTask, deleteTaskById similarly
});
