var fake = require("faker");

// Using faker library prroduct
// names and prices

for (var i = 0; i < 10; i++){
	console.log(fake.commerce.productName() + " : $" + fake.finance.amount());
}

