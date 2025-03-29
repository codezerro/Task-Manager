import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromStorage = (userId) => {
    const tasks = localStorage.getItem(`tasks_${userId}`);
    return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToStorage = (tasks, userId) => {
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
};

const initialState = {
    tasks: [],
    filter: {
        status: "all",
        category: "all",
        search: "",
    },
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        initializeTasks: (state, action) => {
            state.tasks = loadTasksFromStorage(action.payload);
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            if (action.payload.userId) {
                saveTasksToStorage(state.tasks, action.payload.userId);
            }
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
            if (state.tasks[0]?.userId) {
                saveTasksToStorage(state.tasks, state.tasks[0].userId);
            }
        },
        toggleTask: (state, action) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                if (task.userId) {
                    saveTasksToStorage(state.tasks, task.userId);
                }
            }
        },
        updateTaskPriority: (state, action) => {
            const task = state.tasks.find(
                (task) => task.id === action.payload.id
            );
            if (task) {
                task.priority = action.payload.priority;
                if (task.userId) {
                    saveTasksToStorage(state.tasks, task.userId);
                }
            }
        },
        updateTaskCategory: (state, action) => {
            const task = state.tasks.find(
                (task) => task.id === action.payload.id
            );
            if (task) {
                task.category = action.payload.category;
                if (task.userId) {
                    saveTasksToStorage(state.tasks, task.userId);
                }
            }
        },
        updateTaskDueDate: (state, action) => {
            const task = state.tasks.find(
                (task) => task.id === action.payload.id
            );
            if (task) {
                task.dueDate = action.payload.dueDate;
                if (task.userId) {
                    saveTasksToStorage(state.tasks, task.userId);
                }
            }
        },
        reorderTasks: (state, action) => {
            state.tasks = action.payload;
            if (state.tasks[0]?.userId) {
                saveTasksToStorage(state.tasks, state.tasks[0].userId);
            }
        },
        setFilter: (state, action) => {
            state.filter = { ...state.filter, ...action.payload };
        },
    },
});

export const {
    initializeTasks,
    addTask,
    removeTask,
    toggleTask,
    updateTaskPriority,
    updateTaskCategory,
    updateTaskDueDate,
    reorderTasks,
    setFilter,
} = taskSlice.actions;

export default taskSlice.reducer;
