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


### Routes in Oak  

Routes in web applications for the backend are used to map URIs to middleware.  

