# deno

Oak, the successor of Koa, is the mosst popular choice when it comes to building web applications with Deno

Let's start by using Oak in your Deno application.

In your src/server.ts TypeScript file, use the following code to import Oak, to create an instance, and to start it as Oak server:

``` 
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello world!";
});

await app.listen("127.0.0.1:8000");  
```  

The Oak application has 2 methods: use and listen.  
While the listen method starts the server and starts processing requests with registered middleware, the use method sets up the middleware in the first place.  

And then you would run the following command:  

```  
deno run --allow-net server.ts  
```  

When navigating on your local machine to 127.0.0.1:8000 you should see the Hello world! message in your browser.  

### Middleware in Oak  

Essentially every Oak application is just a series of middleware function calls.  

What happens if we have 2 middleware instead of one:

```  
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
});

app.use((ctx) => {
  console.log('running the second use ...');
  ctx.response.body = "Hello world!";
});

await app.listen("127.0.0.1:8000");  
```  

The log will not 'running the second use ...'

Oak stops after the first middleware in the series of middleware has been called. In order to jump from one middleware to the next middleware, we have to use Oak's next function with async/await:

```  
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use(async(ctx, next) => {
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
  await next();
});

app.use((ctx) => {
    console.log('running the second use ...');
    ctx.response.body = "Hello world!";
  });

await app.listen("127.0.0.1:8000");  
```     

Now the output on the command line should read:
```
HTTP GET on http://127.0.0.1:8000/favicon.ico
running the second use ...  
```  

You can manipulate the order of when each middleware should be called by moving the next function invocation around:

```  
app.use(async(ctx, next) => {
  await next();   // move before the log
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
});  
```  

Now the output on the command line should read:

```   
running the second use ...
HTTP GET on http://127.0.0.1:8000/   
```  

A middleware function, because it is a function, can be extracted as such and reused as middleware in your Deno application.

```   
import { Application, Context } from 'https://deno.land/x/oak/mod.ts';
 
const port = 8000;
const app = new Application();
 
const logging = async (ctx: Context, next: Function) => {
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
  await next();
};
 
app.use(logging);
 
app.use((ctx) => {
  console.log('returning a response ...');
  ctx.response.body = 'Hello Deno';
});
 
app.addEventListener('listen', () => {
  console.log(`Listening on localhost:${port}`);
});
 
await app.listen({ port });   
```   

Often abstract middleware is often available as library for Oak. By using Oak's use method, we can opt-in any third-library middleware. Eventually you will run in a few of these middleware when using Deno for larger projects.


### Routes in Oak  

Routes in web applications for the backend are used to map URIs to middleware.  

