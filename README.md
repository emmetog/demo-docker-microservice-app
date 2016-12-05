# Demo Docker Microservice App
This project is a demo docker microservices application 
containing MongoDB, Redis, a web interface, an API and a queue consumer.

## The Accompanying Course

This demo is used in the online course "[How To Automatically Test Docker Applications](http://docker-courses.teachable.com/p/how-to-automatically-test-docker-applications)". 
In the couse we create a suite of tests to test each 
of the five services described below. The course 
is intended to help developers and devops write 
automatic tests to ensure that their dockerized 
services always work as expected.

## Architecture

There are 5 moving parts to this application:

**web**

The web service is a simple Angular 2 application, it 
is the frontend for our demo. It gets a list of 
"favourite foods" from the **api** and displays 
them in a nice list. It also allows new "favourite 
foods" to be created, it sends these new favourite 
foods to the **api** to be created.

**api**

The api is a simple NodeJS application. It has two 
endpoints, one to list all the favourite foods and 
one to create a new favourite food. The endpoint 
which lists the foods asks the **mongo** database 
directly for the results, but the endpoint which 
creates new favourite foods sends the food to create 
to **redis**.

**redis**

The redis server is used as a queue for favourite 
foods to be created. The **api** service produces 
data and puts it in the redis queue. The **worker** 
service consumes the redis queue.

**worker**

The worker is a simple Java application that consumes 
the **redis** queue and inserts the new favourite 
foods into the **mongo** database.

**mongo**

A MongoDB database, the favourite foods are stored 
persistently here.

## Running The Demo

To run the demo, use docker-compose:

```
$ git clone git@github.com:emmetog/demo-docker-microservice-app.git
$ cd demo-docker-microservice-app
$ docker-compose up
```

That will bring up all five of the services listed 
above.

The web will be available at [http://127.0.0.1:81](http://127.0.0.1:81) 
and the api will be available at [http://127.0.0.1:82](http://127.0.0.1:82) 
(non-standard ports are used to avoid conflict if you already 
have a webserver listening on port 80).

License
-------

MIT

Author Information
------------------

Made with love by Emmet O'Grady.

I am the founder of [NimbleCI](https://nimbleci.com) which builds 
Docker containers for feature branch workflow projects in Github.

I blog on my [personal blog](http://blog.emmetogrady.com) and about 
Docker related things on the [NimbleCI blog](http://blog.nimbleci.com).