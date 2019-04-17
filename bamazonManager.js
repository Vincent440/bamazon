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
    console.log("\n======  Manager-View Inventory  ========\n");
    connection.query("SELECT item_id,product_name,price,stock_quantity FROM products", (err, stock) => {
      if (err) throw err;
      let table = new Table({ head: ["ID", "ITEM NAME", "UNIT PRICE $","STOCK QTY"]});
      stock.forEach(inv=>{
        table.push([inv.item_id,inv.product_name.toUpperCase(),inv.price.toFixed(2)+"$",inv.stock_quantity]);
      });
      console.log(table.toString());
      managerPrompt();
    });
}

function displayLow(){
    console.log("\n======  Manager-View LOW Inventory STOCK < 300  ========\n");
    connection.query("SELECT item_id,product_name,price,stock_quantity FROM products WHERE stock_quantity < 300", (err, stock) => {
      if (err) throw err;
      let table = new Table({ head: ["ID", "ITEM NAME", "UNIT PRICE $","STOCK QTY"]});
      stock.forEach(inv=>{
        table.push([inv.item_id,inv.product_name.toUpperCase(),inv.price.toFixed(2)+"$",inv.stock_quantity]);
      });
      console.log(table.toString());
      managerPrompt();
    });
}

function changeCurrentInv(id,qty){
    console.log("Working on Adding STOCK to item ID: "+ id + " | ADDING "+ qty +" STOCK AMOUNT: ");
    managerPrompt();
}

function addNewToInv(){
    console.log("Working on adding a new item to inventory");
    managerPrompt();
}

function managerPrompt(){
    console.log("\n=====  Manager Selection Screen:  =====\n")
    connection.query("SELECT item_id FROM products", (err, dataIds) => {        
        let invIds = [];
        dataIds.forEach(ids=>{invIds.push(ids.item_id)});       
        if (err) throw err;
        inquirer
        .prompt([
            {
                type: "list",
                message: "Select a command from the options Menu below: ",
                name: "menu",
                choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product","EXIT"]
            },
            {
                type: "number",
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
              {
                type: "number",
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
                  } return false;
              }
            }
            ])
            .then(manager => {
                switch(manager.menu) {
                case"View Products for Sale":
                    return display();
                case"View Low Inventory":
                    return displayLow();
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