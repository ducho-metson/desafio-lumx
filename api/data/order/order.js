
// Define the data function for creating order 
function parseOrder(id, owner) {
    return {
      id: id,
      owner: owner,
    };
  }
  
// Define temporary data array for order list DB to be implemented
function getAll() {
  return ordersList;
}

var ordersList = [
    parseOrder(0, 1)
];

 
module.exports = { getAll };
