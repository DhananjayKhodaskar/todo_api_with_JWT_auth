
# 🛡️Node.js RESTful API for Todo App with JWT Authentication

## Introduction

* This is RESTful API that Implemented using a Node.js and Express to manage tasks in a Todo App.
* Users is able to register, log in, and receive a JWT upon successful authentication.* Implemented authorization to ensure that only authenticated users can perform CRUD operations on their own tasks.* Users is able to create, read, update, and delete tasks using appropriate HTTP methods (POST, GET, PUT, DELETE).
* Implement JWT authentication using jsonwebtoken. 
* Use MongoDB as the database to store task information, including task names, descriptions, and statuses (e.g., completed,pending)
## Tech Stack
 
**Framework:** Nodejs

**Tools:** Node,Express,MongoDB,Json Web Token,Bcryptjs.

## 📐Installation
1)Download Zip and Extract it and then run following commands in directory.

2)Install my-project by running below command in console
```bash
  npm install
```
3)I intentionally uploaded `.env` file too so it will be easy for you to set up.

4)But,if you want to connect your own mongo db server make sure choose below option:
![Screenshot_1](https://user-images.githubusercontent.com/125384723/233826541-3a1cc592-2629-4939-a88d-d21efac1ce4d.png)
  
4)execute below command to run the server on localhost
```bash
  npm start
```

## API Endpoints
| HTTP Method | URI | Request Parameters | Description | Expected Response |
| --- | --- | --- | --- | --- |
| PUT | /auth/signup | name, email, password | Create a new user account | Success: User created!, Failure: Error message |
| POST | /auth/login | email, password | Log in an existing user | Success: JWT token, Failure: Error message |
| GET | /todo/tasks | JWT token | Retrieve all tasks for the authenticated user | Success: List of user's tasks, Failure: Error message |
| POST | /todo/task | JWT token, task name, task description, task status | Create a new task for the authenticated user | Success: New task details, Failure: Error message |
| PUT | /todo/task/:taskId | JWT token, updated task name, updated task description, updated task status | Update a specific task for the authenticated user | Success: Updated task details, Failure: Error message |
| DELETE | /todo/task/:taskId | JWT token | Delete a specific task for the authenticated user | Success: Deleted task message, Failure: Error message |


