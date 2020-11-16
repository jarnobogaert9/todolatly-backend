const router = require('express').Router();
const jwt = require('jsonwebtoken');
const TodoService = require('../services/TodoService');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, async (req, res) => {
    const id = req.decoded;
    const { text } = req.body;
    if (!text) {
        return res.status(400).send({
            msg: "Text field is required"
        })
    }

    try {
        const {todo} = await TodoService.create(text, id);
        return res.status(201).send({
            msg: `Created todo successfully`,
            todo
        })
    } catch (err) {
        return res.status(500).send({
            msg: "Something went wrong while trying to create a todo",
            detail: err
        });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const id = req.decoded;
        const todos = await TodoService.getTodos(id);
        res.status(200).send(todos);
    } catch (err) {
        return res.status(500).send({
            msg: "Something went wrong while trying to fetch all todos",
            detail: err
        });
    }

});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id: todoId } = req.params;
        console.log("Delete todo with id:", todoId);
        const userId = req.decoded;
        const removedTodo = await TodoService.removeTodo(userId, todoId);
        removedTodo ? 
        res.status(200).send({msg: "Todo deleted successfully"}) : 
        res.status(400).send({msg: "Something went wrong while deleting todo."})
        console.log(`Removed todo: ${removedTodo}`);
    } catch (err) {
        return res.status(500).send({
            msg: "Something went wrong while trying to remove a todo",
            detail: err
        });
    }
});

module.exports = router;