const model = require("../../model")
const errors = require("../../../utils/errors")

async function getAll() {
  const users = await model.User.find();
  return users.map(user => ({
    name: user.name,
    email: user.email
  }));
}

async function get(email) {
  const user = await model.User.findOne({ email });
  if (!user) {
    throw errors.notFound
  }

  return user;
}

async function add(name, email) {
  const newUser = new model.User({ name, email });
  await newUser.save();
}

async function remove(email) {
  const user = await model.User.findOne({ email });
  if (!user) {
    throw errors.notFound
  }

  await model.User.deleteOne({ name });
}

async function update(name, email) {
  const user = await model.User.findOne({ email });
  if (!user) {
    throw errors.notFound
  }

  user.name = name;
  await user.save();
}

module.exports = {
  getAll,
  get,
  add,
  remove,
  update
}
