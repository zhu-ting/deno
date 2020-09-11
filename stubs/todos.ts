import { v4 } from "https://deno.land/std/uuid/mod.ts";

let todos = [
    {
        id: v4.generate(),
        todo: 'brush teeth',
        isCompleted: true
    },{
        id: v4.generate(),
        todo: 'eat breakfast',
        isCompleted: false
    }
];

export default todos;