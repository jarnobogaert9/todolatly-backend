const Todo = require('../models/Todo');

const TodoService = {
    create: (text, userId) => new Promise(async (resolve, reject) => {
        try {
            const todo = new Todo({
                text: text,
                userId: userId
            });
            const saved = await todo.save();
            if (!saved) {
                return reject("Error occured while trying to save todo.")
            }
            return resolve(true);
        } catch (err) {
            return reject(err);
        }
    }),
    getTodos: (userId) => new Promise(async (resolve, reject) => {
        try {
            const todos = await Todo.find({userId: userId});
            return resolve(todos);
        } catch (err) {
            return reject(err);
        }
    })
}

module.exports = TodoService;