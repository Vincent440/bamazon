/* eslint-disable no-undef */
/* eslint-disable no-console */
var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});
connection.connect(err => {
  if (err) throw err;
  readProducts();
});
function purchaseItem(item,amount){

  console.log("\n\n"+item.product_name+" NOW PLACING ORDER FOR: "+ item.item_id + " ID FOR THE AMOUNT OF: "+ amount);

  let newInvAmount = item.stock_quantity - amount;

  let sqlQuery = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";

  connection.query(sqlQuery,[newInvAmount,item.item_id],(err) => {
    if (err) throw err;
    console.log("Your order for: "+item.product_name+" For the amount of: "+amount+" PER UNIT COST: "+item.price+"$ \n Has Succesfully been placed!\n"+
    "\nTotal Cost of this order: "+(item.price * amount)+" $" );
    readProducts();
  });
}
function readProducts() {
  console.log("\nGREETING WELCOME TO THE BAMAZON STORE, HERE IS THE CURRENT INVENTORY:\n\n");
  connection.query("SELECT product_name,price,item_id,stock_quantity FROM products", (err, stockData) => {
    if (err) throw err;
    let stockIds = [];
    for (let i = 0; i < stockData.length; i++) {
      console.log("\nPRODUCT NAME: " + stockData[i].product_name +" PRICE: " + stockData[i].price +"$ ID: " + stockData[i].item_id+"\n");

      stockIds.push(stockData[i].item_id);

    }
    console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }], ['a']);
    //customerPrompt(stockIds);

  });
}

function customerPrompt(invIds) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "ID of the Product you would like to purchase?  ",
        name: "itemID",
        validate: val=>{
          if (invIds.includes(Number(val))) {
            return true;
          }
          return "MUST BE A VALID PRODUCT ID";
        },filter: Number
      },
      {
        type: "input",
        message: "AMOUNT of the Product you would like to purchase?  ",
        name: "units",
        validate: function(value) {
          var valid = !isNaN(parseFloat(value));
          return valid || "Please enter a number";
        },
        filter: Number
      }
    ])
    .then(custOrder => {
      let itemID = custOrder.
      itemID;
      let qty = custOrder.units;
      console.log("\n\nCHECKING STOCK FOR ITEM ID : " + itemID + " FOR QUANTITY: " + qty);
      checkInventory(itemID,qty);
    });
}
function checkInventory(itemID,amount){
    let sqlQuery = "SELECT item_id,stock_quantity,price,product_name FROM products GROUP BY item_id = ? HAVING item_id = ?";
    connection.query(sqlQuery,[itemID,itemID],(err, itemData) => {
    if (err) throw err;
    let item =itemData[0],
    stockAmt = item.stock_quantity,
    stockId = item.item_id;
    if(stockAmt >= amount && stockId === itemID){
      console.log("\nYOU ARE IN LUCK\n\nSTOCK AVAILIABLE MAKING PURCHSE NOW....\n");
      purchaseItem(item,amount);
    }
    else{
      console.log("\nInsufficient quantity!\n");
      return readProducts();
    }
  });
}

//TRANSFORM INQUIRER THE USER ID INTO THE NAME OF THE ITEM TO DISPLAY???
//(IGNORE THIS IF NOT COMPLETE... BONUS SIDE: display in table as "extra")


// == IGNORE/BONUS ==  ask user if the order is correct and allow them to restart
// or go change one input before verifying order and submitting  ==

//Once the customer has placed the order,
//app should check if store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.