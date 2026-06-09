- Create a git repository
- Initialize the git repository
- node_modules, package.json, package-lock.json
- Install express js
- Create first express server
- Listen to Port 7070
- Write request handlers for /, /about
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde (^ vs ~)

- Is route order matters?
- Difference between package.json and package-lock.json
- Difference between app.use(), app.get(), app.post() etc

- Created .gitignore file
- Push all code to remote origin
- Play with routes
- Install postman
- Created different routes GET, POST, PATCH, DELETE api calls
- Working with optional {}, *, + routes
- Reading the dynamic routes
- Multiple Routes handlers
- next()
- next funtion and errors along  with res.send()
- app.use("/route", handler-1, handler-2, handler-3, handler-4, handler-5)

- What is middleware
- How express.js basically handles requests behind the scenes
- Difference between app.use() and app.all()
- Write a dummy auth for admin/user middleware
- Error handling using app.use("/", (err, req, res, next)=>{})

- Signup on mongodb Atlas
- Create a free cluster on MongoDB official site
- Install a mongoose library
- Connect your application to the database "using connection url"
- In mongo >>> Project → Cluster → Database → Collection → Documents
- Call the connectDB function and connect to database before starting application on 7070
- Create a userSchema and user Model
- Create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error handling using try and catch

- JS object vs JSON (difference)
- Add the express.json as middleware to our app
-  Make your signup API dynamic to receive data from the end user