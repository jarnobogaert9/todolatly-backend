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
        await TodoService.create(text, id);
        return res.send({
            msg: `Created todo successfully`
        })
    } catch (err) {
        return res.status(500).send({
            msg: "Something went wrong",
            detail: err
        });
    }
});

module.exports = router;