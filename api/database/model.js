const database = require("./database")

const User = database.acess.model('user', { name: String, email: String });
const Order = database.acess.model('order', { owner: Number, type: String });

module.exports = {
    User,
    Order
};