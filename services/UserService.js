const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSerivce = {
    create: (username, password) => new Promise(async(resolve, reject) => {
        try {
            const foundUser = await User.findOne({username: username});
            if (foundUser) {
                return resolve(false);
            }
            const user = new User({
                username,
                password
            });
            await user.save();
            return resolve(true);
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    }),
    login: (username, password) => new Promise(async (resolve, reject) => {
        try {
            const foundUser = await User.findOne({username: username});
            if (!foundUser) {
                return resolve(false);
            }
            const isMatch = await bcrypt.compare(password, foundUser.password);
            if (!isMatch) {
                return resolve(false);
            }
            const token = await jwt.sign({
                _id: foundUser._id
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            return resolve(token);
        } catch (err) {
            return reject(err);
        }
    })
}

module.exports = UserSerivce;