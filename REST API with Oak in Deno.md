An Oak application is most often used as a backend application in a client-server architecture. Over the years, there existed a few popular
communication interfaces(APIs) between clients and servers. The most popular one is called [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) defined in 2000 by Roy Fielding. It's
an architecture the leverages the [HTTP protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) to enable communication between a client and a server application.

### CURL for REST APIs  

This section gives you a short excursus about what is cURL and how to use it to interact with REST APIs. 
The [cURL](https://en.wikipedia.org/wiki/CURL) is a computer software project providing a library(libcurl) and command-line tool(curl) for transferring
data using various network protocols. The name stands for 'Client URL', which was first released in 1997.

For MacOS users, installl it with the following command:

``` 
brew install curl  
```    

Now start your Oak server from the [previous section](https://github.com/zhu-ting/deno).  
Once your section is started, execute the following in another command line window

```  
➜ ~ curl http://127.0.0.1:8000/
Hello world!%  
```     

After executing the command, you should see the 'Hello World' printed on the command line. You just have consumed your Oak server as a client with something else than a browser. 
Whether you access your Oak application on http://127.0.0.1:8000/ in the browser or via the command line with cURL, you should see the same result.  


### Deno Routes: HTTP Methods are REST Operations  

Oak is a perfect choice for a server when it comes to creating and exposing APIs to communicate as a client with your server application. Previously you have already
implemented a Oak route, which sends a 'Hello world' that you have accessed via the browser and cURL.  
Let's set up more routes to accommodate a RESTful API for your application eventually.  

```  
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

const port = 8000;
const app = new Application();

const router = new Router();

router.get('/', ctx => {
  ctx.response.body = 'Received a GET method';
});

router.post('/', ctx => {
  ctx.response.body = 'Received a POST method';
});

router.put('/', ctx => {
  ctx.response.body = 'Received a PUT method';
})

router.delete('/', ctx => {
  ctx.response.body = 'Received a DELETE method';
});

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });   
```   

Every Oak Router instance's method maps to a HTTP method. You should see the following output for the commands:

```  
➜ ~ curl http://127.0.0.1:8000/
Received a GET method%                                                   
➜ ~ curl -X POST http://127.0.0.1:8000/
Received a POST method%                                                  
➜ ~ curl -X PUT http://127.0.0.1:8000/
Received a PUT method%                                                   
➜ ~ curl --request DELETE http://127.0.0.1:8000/
Received a DELETE method%   
```  
By default cURL will use a GET method. However, you can specify the method with the -X flag (or --request flag). Depending on the method you are choosing, you will
access different routes of your Oak application.  

Read more about [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)


### Oak Routes: URIs are REST resources 

Another important aspect of REST is that every URI acts as a resource. So far, you have only operated on the root URI with your CRUD operations, which doesn't
really represent a resource in REST. In contrast, a resource could be a user resourse. 
Change the previously introduced routes to the following:

```  
... 
router.get('/users', ctx => {
  ctx.response.body = 'Received a GET method on users resource';
});

router.post('/users', ctx => {
  ctx.response.body = 'Received a POST method on users resource';
});

router.put('/users', ctx => {
  ctx.response.body = 'Received a PUT method on users resource';
})

router.delete('/users', ctx => {
  ctx.response.body = 'Received a DELETE method on users resource';
});  
...  
```    

With cURL on your command line, you can go through the resource -- represented by one URI http://127.0.0.1:8000/users , which offers all the CRUD operations
You will see a similar output as before, but this time you are operating on a user resource.  

```  
➜ ~ curl http://127.0.0.1:8000/users
Received a GET method on users resource%                                 
➜ ~ curl -X POST http://127.0.0.1:8000/users
Received a POST method on users resource%                                
➜ ~ curl -X PUT http://127.0.0.1:8000/users
Received a PUT method on users resource%                                 
➜ ~ curl -X DELETE http://127.0.0.1:8000/users
Received a DELETE method on users resource%  
```  

Obviously, we don't transfer any information for creating a user yet. However, the API endpoint for creating a user would be available now.
One piece is missing to make the PUT and DELETE method from a URI's point of view:

```  
router.put('/users/:userId', ctx => {
  ctx.response.body = `Received a PUT method on user/${ctx.params.userId} resource`;
})

router.delete('/users/:userId', ctx => {
  ctx.response.body = `Received a DELETE method on user/${ctx.params.userId} resource`;
});  
```   

In order to delete or update a user resource, you would need to know the exact user. That is where unique identifiers are used. 
In our Oak routes, we can assign unique identifiers with parameters in the URI. The the callback function holds the URI's parameters in the context object.
Optionally, Oak offers a utility function called [getQuery](https://github.com/oakserver/oak#getqueryctx-options) which allows us to retrieve all parameters from the URI:

```  
import { Application, Router, helpers } from 'https://deno.land/x/oak/mod.ts';  

router.put('/users/:userId', ctx => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = `PUT method on user/${userId} resource`; 
});

router.delete('/users/:userId', ctx => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = `DELETE method on user/${userId} resource`;
});  
```   

Try again a cURL operation on /users/1, /users/2 or another identifier with a DELETE or PUT method and verify that the identify shows up in the command line as output.  

### Making sense of REST with Oak  









