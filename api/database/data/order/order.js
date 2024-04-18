const model = require("../../model")
const errors = require("../../../utils/errors")

async function getAll() {
  const orders = await model.Order.find();
  return orders.map(order => ({
    _id: order._id,
    owner: order.owner,
    type: order.type
  }));
}

async function get(id) {
  const order = await model.Order.findOne({ _id: id });
  if (!order) {
    throw errors.notFound;
  }

  return order;
}

async function add(owner, type) {
  const ownerUser = await model.User.findOne({ email: owner });
  if (!ownerUser) {
    throw errors.notFound;
  }

  const orderId = await model.getNextSequenceValue('orderId');
  const newOrder = new model.Order({ _id: orderId, owner, type });
  await newOrder.save();

  return orderId
}

async function remove(id) {
  const order = await model.Order.findOne({ _id: id });
  if (!order) {
    throw errors.notFound;
  }

  await model.Order.deleteOne({ _id: id });
}

async function update(id, owner, type) {
  const order = await model.Order.findOne({ _id: id });
  if (!order) {
    throw errors.notFound;
  }

  const ownerUser = await model.User.findOne({ email: owner });
  if (!ownerUser) {
    throw errors.notFound;
  }

  order.owner = owner;
  order.type = type;

  await order.save();
}

module.exports = {
  getAll,
  get,
  add,
  remove,
  update
};
