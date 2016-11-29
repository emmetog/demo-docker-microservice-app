This is an API of favourite foods. It is the 
backend for the web application.

### Helpful commands

These commands can help during development or debugging.
They assume the application has been brought up in 
local using docker-compose.

To get all the favourite foods, run this:

```
$ curl http://127.0.0.1:81/favourite-foods
```

To add a new favourite food to the API, run this:

```
$ curl -X POST -H "Content-Type: application/json" --data '{"person":"Peter","food":"Pizza"}' http://127.0.0.1:81/favourite-foods
```