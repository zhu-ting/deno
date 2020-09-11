import { Application } from "https://deno.land/x/oak/mod.ts";
import todoRouter from "./routes/todo.ts";

const app = new Application();

app.use(todoRouter.routes());

await app.listen("127.0.0.1:8000");