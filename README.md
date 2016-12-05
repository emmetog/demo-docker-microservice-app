# Demo Docker Microservice App
This project is a demo docker microservices application 
containing MongoDB, Redis, a web interface, an API and a queue consumer.

## The Accompanying Course

This demo is used in the online course "[How To Automatically Test Docker Applications](http://docker-courses.teachable.com/p/how-to-automatically-test-docker-applications)" 
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