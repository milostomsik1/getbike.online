# GETBIKE.ONLINE
Official repo of getbike.online - second hand bikes, equipment, tools and services

#### Design:
* Sketch

#### Backend:
* Node.js
* Express.js
* Apollo Server
* GraphQL
* Sequelize (ORM)
* PostgreSQL (previously MongoDB)

#### Backend Testing:
* Jest

#### Frontend:
* React
* Redux
* Apollo Client

#### Frontend Testing:
* Jest

## Development:
#### Backend:
* Create PostgreSQL databases named 'getbike' and 'getbike_test'  
* `cd ./backend`  to move to backend directory  
* `yarn` to install the dependencies  
* `yarn server` to start the development server (doesn't run the seeder)  
* `yarn server:test` to start the development server with test DB(runs the seeder)  
* `yarn test` to run the tests (needs to have running test db)  
To repeat testing first restart test server by closing current test server and executing `yarn server:test` and then run `yarn test` again.
* Optionally you can run `yarn seed` or `yarn seed:test` to seed development or test database.