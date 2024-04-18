const database = require("./database")

const counterSchema = new database.acess.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = database.acess.model('Counter', counterSchema);

async function getNextSequenceValue(sequenceName) {
    const counter = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
}

const ordersSchema = new database.acess.Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
    },
    owner: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
    }
});

const userSchema = new database.acess.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const User = database.acess.model('user', userSchema);
const Order = database.acess.model('order', ordersSchema);

module.exports = {
    User,
    Order,
    getNextSequenceValue
};