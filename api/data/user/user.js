const model = require("../../database/model")

async function getAll() {
  const users = await model.User.find();
  return users.map(user => ({
    name: user.name,
    email: user.email
  }));
}

async function get(name) {
  const user = await model.User.findOne({ name });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
}

async function add(name, email) {
  const newUser = new model.User({ name, email });
  await newUser.save();
}

async function remove(name) {
  const user = await model.User.findOne({ name });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  await model.User.deleteOne({ name });
}

async function update(name, email) {
  const user = await model.User.findOne({ name });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  user.email = email;
  await user.save();
}

module.exports = {
  getAll,
  get,
  add,
  remove,
  update
}
