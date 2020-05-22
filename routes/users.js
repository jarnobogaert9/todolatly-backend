const router = require('express').Router();
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');

router.post('/', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).send({
            msg: "All fields are required"
        }); 
    }

    try {
        const created = await UserService.create(username, password);
        if (!created) {
            return res.status(400).send({
                msg: "User already exists"
            }); 
        }
        return res.status(201).send({
            msg: "Created user."
        });
    } catch (err) {
        res.status(500).send({
            msg: "Somehting went wrong",
            detail: err,
        });
    }
});

router.get('/login', async (req, res) => {
    const {username, password} = req.query;

    if (!username || !password) {
        return res.status(400).send({
            msg: "All fields are required"
        }); 
    }

    try {
        // Invalid credentials if token is false
        const token = await UserService.login(username, password);
        if (!token) {
            return res.status(400).send({
                msg: 'Invalid credentials'
            })
        }
        return res.status(200).send({
            msg: "Valid credentials",
            data: {
                token
            }
        })
    } catch (err) {
        res.status(500).send({
            msg: "Something went wrong",
            detail: err,
        })
    }
});

router.get('/profile', verifyToken,  async (req, res) => {
    const id = req.decoded;
    
    const profile = await UserService.getUser(id);
    if (!profile) {
        return res.send({
            msg: 'Please retry'
        });
    }
    res.send({
        data: profile
    });
});

module.exports = router;