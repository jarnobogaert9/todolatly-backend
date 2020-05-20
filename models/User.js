const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async (newPwd, cb) => {
    try {
        const isMatch = await bcrypt.compare(newPwd, this.password);
        return cb(null, isMatch)        
    } catch (err) {
        return cb(err);
    }
}

module.exports = mongoose.model('User', userSchema);