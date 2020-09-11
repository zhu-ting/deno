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
    updateTodoById: () => {},
    deleteTodoById: () => {},
}