import todos from "../stubs/todos.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

export default {
    getAllTodos: ({ response }: { response: any }) => {
        response.status = 200;
        response.body = {
            success: true,
            data: todos
        }
    },
    createTodo: async({ request, response } : { request: any; response: any }) => {
        const body = await request.body();
        if (!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                message: "No data provided",
            };
            return;
        }

        let newTodo = {
            id: v4.generate(),
            todo: body.value.todo,
            isCompleted: false
        };
        response.body = {
            success: true,
            data: [...todos, newTodo],
        }
    },
    getTodoById: (
        { params, response } : { params: { id: string }; response: any }
    ) => {
        const todo = todos.find(todo => {
            return todo.id === params.id;
        });
        if(!todo) {
            response.status = 404;
            response.body = {
                success: false,
                message: "No todo found",
            };
            return;
        }

        response.status = 200;
        response.body = {
            success: true,
            data: todo,
        };
    },
    updateTodoById: async (
        { params, request, response }: {
            params: { id: string },
            request: any,
            response: any,
        },
    ) => {
        const todo = todos.find(todo => todo.id === params.id );
        if (!todo) {
            response.status = 404;
            response.body = {
                success: false,
                message: "No todo found",
            };
            return;
        }

        const body = await request.body();
        const updatedData: { todo?: string; isCompleted?: boolean } = body.value;
        let newTodos = todos.map(todo => {
            return todo.id === params.id ? {...todo, ...updatedData } : todo;
        });
        response.status = 200;
        response.body = {
            success: true,
            data: newTodos,
        };
    },
    deleteTodoById: (
        { params, response }: { params: {id: string}; response: any },
    ) => {
        const allTodos = todos.filter(todo => todo.id !== params.id );
        response.status = 200;
        response.body = {
            success: true,
            data: allTodos,
        };
    },
}