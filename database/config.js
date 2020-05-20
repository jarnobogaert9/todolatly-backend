const mongoose = require('mongoose');

module.exports = {
    connect: async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URL}`, {useNewUrlParser: true, useUnifiedTopology: true});
            return mongoose;
        } catch (err) {
            console.log(err);
            return;
        }
    },
    close: async (mongoose) => {
        (await mongoose).disconnect();
    }
};