const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Task = require('../models/task');
const User = require('../models/user');

exports.getTasks = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;

  User.findById(req.userId) 
    .populate({
      path: 'tasks',
      options: {
        skip: (currentPage - 1) * perPage,
        limit: perPage,
      },
    })
    .exec()
    .then(user => {
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      totalItems = user.tasks.length;
      res.status(200).json({
        message: 'Fetched tasks successfully.',
        tasks: user.tasks,
        totalItems: totalItems,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createTask = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const description = req.body.description;
  const status = req.body.status;
  let creator;
  const task = new Task({
    name: name,
    description: description,
    status : status,
    creator: req.userId
  });
  task
    .save()
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      creator = user;
      user.tasks.push(task);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Task created successfully!',
        task: task,
        creator: { _id: creator._id, name: creator.name }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then(task => {
      if (!task) {
        const error = new Error('Could not find task.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Task fetched.', task: task });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateTask = (req, res, next) => {
  const taskId = req.params.taskId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const description = req.body.description;
  const status = req.body.status;

  Task.findById(taskId)
    .then(task => {
      // If task is not found, throw an error
      if (!task) {
        const error = new Error('Could not find task.');
        error.statusCode = 404;
        throw error;
      }

      // Check if the logged-in user is the creator of the task
      if (task.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
  
      // Update the task
      task.name = name;
      task.description = description;
      task.status = status;
      return task.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Task updated!', task: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  // Find the task by ID
  Task.findById(taskId)
    .then(task => {
      // If task is not found, throw a 404 error
      if (!task) {
        const error = new Error('Could not find task.');
        error.statusCode = 404;
        throw error;
      }
      // If the user trying to delete the task is not the creator of the task, throw a 403 error
      if (task.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      // If the task is found and the user is authorized, delete the task
      return Task.findByIdAndRemove(taskId);
    })
    .then(result => {
      // Find the user who created the task and remove the task from their list of tasks
      return User.findById(req.userId);
    })
    .then(user => {
      user.tasks.pull(taskId);
      return user.save();
    })
    .then(result => {
      // Send a 200 response with a success message
      res.status(200).json({ message: 'Deleted task.' });
    })
    .catch(err => {
      // If there is an error, set the status code and pass the error to the error handling middleware
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};



