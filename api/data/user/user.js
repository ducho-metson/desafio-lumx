
// Define the data function for creating user 
function parseUser(id, name) {
    return {
      id: id,
      name: name,
    };
  }
  
// Define temporary data array for user list DB to be implemented
function getAll() {
  return usersList;
}

var usersList = [
  parseUser(0, "bruno")
];

 
module.exports = { getAll };
