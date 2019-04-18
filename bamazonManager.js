var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table3');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});
connection.connect(err => {
    if (err) throw err;
    managerPrompt();
});
function display(){
    console.log("\n========  Manager-View Entire Inventory  ==========\n");
    connection.query("SELECT * FROM products ORDER BY department_name ASC", (err, stock) => {
      if (err) throw err;
      let table = new Table({ head: ["DEPARTMENT","ID", " ITEM NAME ", "UNIT PRICE $","STOCK QTY"]});
      stock.forEach(inv=>{
        table.push([inv.department_name.toUpperCase(),"ID: "+inv.item_id,inv.product_name.toUpperCase(),"$"+inv.price.toFixed(2),"x "+inv.stock_quantity+" In-Stock"]);
      });
      console.log(table.toString());
      managerPrompt();
    });
}
function displayLow(amount){
  if(amount === undefined){
    amount = 100;
  }
    console.log("\n======  Manager-View LOW Inventory STOCK < "+amount+"  ========");
    connection.query("SELECT item_id,product_name,price,stock_quantity FROM products WHERE stock_quantity <= ?",amount, (err, stock) => {
      if (err) throw err;
      let table = new Table({ head: ["ID", "ITEM NAME", "$ UNIT PRICE ","STOCK QTY"]});
      stock.forEach(inv=>{
        table.push([inv.item_id,inv.product_name.toUpperCase(),"$"+inv.price.toFixed(2),inv.stock_quantity]);
      });
      console.log(table.toString());
      managerPrompt();
    });
}

function changeCurrentInv(id,qty){
  let updateQuery = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?";
  connection.query(updateQuery,[qty,id],(err, res)=> {
    if (err) throw err;
      console.log("\nAdded STOCK to item ID: "+ id + " | ADDED "+ qty +" TO STOCK AMOUNT: \n");
      managerPrompt();
    }
  );
}

function addNewToInv(){
  console.log("\n=== NEW PRODUCT CREATION SCREEN ===\nENTER NEW ITEM INFORMATION BELOW:\n\n");
  inquirer.prompt([
    { message:"New Product Name? ",
      name:"name",
      validate: input => {
        if (input.length > 0 && input !== ""){
          return true;
        }
        return false;
      }
  },
  { message:"Department of New Product? ",
    name:"dep",
    validate: input => {
      if (input.length > 0 && input !== ""){
      return true;
      }
      return false;
    }
  },
  { type: "number",
    message: "Stock Amount Of New Product? ",
    name: "qty",
    validate: amt => {
      var valid = !isNaN(parseFloat(amt)); 
      if(valid && (Number.isInteger(amt)) && amt > 0){
        return true;
      }
      return "Please enter a positive whole number for stock amount!";
    }
  },
  { type: "number",
    message: "Price of New Product? ",
    name: "cost",
    validate: amt => {
      var valid = !isNaN(parseFloat(amt)); 
      if(valid && amt > 0){
        return true;
      }
      return "Please enter a positive whole number for order amount!";
    }
  }]).then(newItem=>{
    connection.query(
      "INSERT INTO products SET ?",
      { product_name: newItem.name,
        price: newItem.cost,
        department_name:newItem.dep,
        stock_quantity: newItem.qty
      },(err, res) => {
      if (err) throw err;
        let display = new Table({ head: ["NEW ITEM NAME", "$ UNIT PRICE ","ITEMS DEPARTMENT","AMOUNT IN STOCK"]});
        display.push([newItem.name.toUpperCase(),"$"+newItem.cost.toFixed(2),newItem.dep.toUpperCase(),newItem.qty])
        console.log(display.toString());
        managerPrompt();
      }
    );
  });
}

function managerPrompt(){
    console.log("\n=====  Manager Selection Screen:  =====\n")
    connection.query("SELECT item_id FROM products", (err, dataIds) => {        
        let invIds = [];
        dataIds.forEach(ids=>{invIds.push(ids.item_id)});       
        if (err) throw err;
        inquirer
        .prompt([
            { type: "list",
              message: "Select a command from the options Menu below: ",
              name: "menu",
              choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product","EXIT"]
            },
            { type: "number",
              message: "ITEM ID You are ADDING MORE Stock Quantity To? ",
              name: "id",
              validate: id => {
                if (invIds.includes(id)) {        
                  return true;
                }
                return "MUST BE A VALID PRODUCT ID";
                },
              when: cmd => {
                if (cmd.menu === "Add to Inventory") {
                  return true;
                }
                return false;
                }
              },
              { type: "number",
                message: "Amount of Stock to Add to that ITEM IDS Inventory? ",
                name: "qty",
                validate: amt => {
                  var valid = !isNaN(parseFloat(amt)); 
                  if(valid && (Number.isInteger(parseFloat(amt))) && amt > 0){
                    return true;
                  }
                return "Amount To Add to inventory Must be a whole number above Zero...";
              },
              when: select =>{
                if (select.menu ==="Add to Inventory") {
                  return true;
                }
                return false;
              }
              },
              {
                type: "number",
                message: "Enter a Number , To view the inventory that is Less then that Amount ",
                name: "amt",
                default: 100,
                validate: qty => {
                  var valid = !isNaN(parseFloat(qty)); 
                  if(valid && (Number.isInteger(qty)) && qty >= 0){
                    return true;
                  }
                  return "Please enter a positive whole number for stock amount!";
                },
                when: command =>{
                  if (command.menu === "View Low Inventory"){
                    return true;
                  }
                  return false;
                }
              }
              ]).then(manager => {
              switch(manager.menu) {
              case"View Products for Sale":
                return display();
              case"View Low Inventory":
                return displayLow(manager.amt);
              case"Add to Inventory":
                return changeCurrentInv(manager.id,manager.qty);
              case"Add New Product":
                return addNewToInv();
              default:
              connection.end();
            }        
        });
    });
}