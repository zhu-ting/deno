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
    getTodoById: () => {},
    updateTodoById: () => {},
    deleteTodoById: () => {},
}