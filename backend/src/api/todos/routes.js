
const express = require("express");
const router = express.Router();
const { protect, authorize } = require('../../middleware/auth.js')

const todoController = require("./contoller.js");

router.route("/")
        .post(protect, todoController.addTodo)
        .get(protect, todoController.getAllTodos)

router.route("/:id")
        .delete(protect, todoController.deleteTodo)
        .put(protect, todoController.editTodos)
        .get(protect, todoController.getTodo);

module.exports = router;