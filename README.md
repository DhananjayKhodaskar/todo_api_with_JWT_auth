
# 🛡️Node.js RESTful API for Todo App with JWT Authentication

## Introduction

* This is RESTful API that Implemented using a Node.js and Express to manage tasks in a Todo App.
* Users is able to register, log in, and receive a JWT upon successful authentication. 
* Implemented authorization to ensure that only authenticated users can perform CRUD operations on their own tasks. 
* Users is able to create, read, update, and delete tasks using appropriate HTTP methods (POST, GET, PUT, DELETE).
* Implemented JWT authentication using jsonwebtoken. 
* Used MongoDB as the database to store task information, including task names, descriptions, and statuses (e.g., completed,pending)
## Tech Stack
 
**Framework:** Nodejs

**Tools:** Node,Express,MongoDB,Json Web Token,Bcryptjs.

## 📐Installation
1)Download Zip and Extract it.

2)Install my-project by running below command in console
```bash
  npm install
```
3)I intentionally uploaded `.env` file too so it will be easy for you to set up.

4)But,if you want to connect your own mongo db server make sure choose below option:
![Screenshot_1](https://user-images.githubusercontent.com/125384723/233826541-3a1cc592-2629-4939-a88d-d21efac1ce4d.png )
  
4)execute below command to run the server on localhost.
```bash
  npm start
```
5)Site will be Running on:
```bash
http://localhost:3000/
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

## Demonstration of API using Postman

**1)You can Signup by Sending Request like shown below:**
![Screenshot_2](https://user-images.githubusercontent.com/125384723/233836769-93b4eb39-90fe-4669-803a-ea77522f78f7.png)

**2)You can send your correct login credential and on success you will get JWT token,use this token whenever you want to perform CRUD Operations:**
![Screenshot_3](https://user-images.githubusercontent.com/125384723/233836785-656fb699-13a9-4efe-a655-30c8516ac813.png)

**3)You have to use token like this in the Header whenever you want to perform CRUD operation:**
![Screenshot_1](https://user-images.githubusercontent.com/125384723/233836791-4b4d4455-1231-441f-a243-1b53da506276.png)

**5)You can create task like shown below:**
![Screenshot_4](https://user-images.githubusercontent.com/125384723/233836798-dfba3293-c01f-470b-893e-dc98c51f376a.png)

**6)You will get Response like shown below:**

![Screenshot_5](https://user-images.githubusercontent.com/125384723/233836800-97fb7c35-9a3d-4399-a709-5d0d94e212eb.png)

**7)You can get all your task by sending GET request as i have also pagination:**
![Screenshot_6](https://user-images.githubusercontent.com/125384723/233836804-7d587cfa-c8da-4dfe-90e2-4e0bebe6fef4.png)

**8)If there are more than 2 task  it will be shown in the next page:**
![Screenshot_7](https://user-images.githubusercontent.com/125384723/233836806-6a494a7f-fa8c-423d-8165-1717bc599e14.png)

**9)You can Acces another more task by adding page no in params ,like demonstrated below:**
![Screenshot_8](https://user-images.githubusercontent.com/125384723/233836807-6042c4ee-bf82-4cb6-b024-9ead728915ba.png)

**10)You can Update task by adding task id in the url,and you have to pass compalsarily all parameter to update the task or you will get error:**
![Screenshot_9](https://user-images.githubusercontent.com/125384723/233836811-336e96a8-a472-4b12-8ff7-95ecd771f023.png)

**11)After task has been deleted you will get message as shown:**
![Screenshot_10](https://user-images.githubusercontent.com/125384723/233836813-d6c4c384-a15c-4122-952d-f48be7643c2e.png)





