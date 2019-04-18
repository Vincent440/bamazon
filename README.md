# Bamazon Node.js & mySql Command Line Application.


Welcome to my BAMAZON app. This Application is an Amazon-like storefront display in command line tables through Node.js.

Utilizing Node.js and mySql database quieries to manipulate the database according to user input in the command line from inquirer Prompts.

The app will take in orders from customers and deplete stock from the store's inventory.

__NAVIGATION:__
* [BamazonCustomer File Description](#Bamazon-Customer)
* [BamazonManager File Description](#Bamazon-Manager)
* [About the creator](#By-Vince-Shury)

**There are Two parts of this application __BamazonCustomer.js & BamazonManager.js.__**

The Customer file allows the user to:
* View all items currently in-stock in the Database. 
* Subtract Item stock quantity from the SQL database by Succesfully placing an Order with an Item ID and Order Amount. 

The Manager file allows the user to: 
* View all items in the inventory with all of the stored information 
* View specifically items with a low Stock amount
* ADD Stock to a specific item by inputting an ID and Amount to add to the Inventory
* CREATE an entirely new Item to add to the Database:
   * Name
   * Department
   * Price
   * Stock amount. 

--- 

## Bamazon Customer

__The bamazonCustomer.js File:__

This is the customer view of the Bamazon application, Which has very limited options for the user, App displays the Available Stock in the MySQL Bamazon Database,prompts the user to Enter a valid ITEM ID that was displayed and order amount, Upon submitting that input  attempts to place an order from the database. 


* Upon loading the file Displays a console table of the current inventory items in the mySql products database Showing the customer:
   * ID
   * Item Name
   * Price

* Prompts For the user to enter a Item ID
   * The ID entered must a _whole number & **Valid** item-ID_
   * A Valid ID would only be an item ID that was displayed to the user from the table showing all items currently IN-Stock in the database. 

* Prompts for the Amount of that Item they would like to buy
   * This must be a valid whole number input, greater then 0.

* Once the User has input an ID , as well as a Order Amount:
    * __IF Amount ordered is in-stock,__  Then the order is placed and the total cost of the order is displayed in a table with order information.
    A inquirer confirm prompt is then displayed to the user to 
    Confirming:
    
     __YES__ to make another purchase/continue in application.

     __NO__ to exit the application. 

    * __HOWEVER IF amount is NOT in-stock__ The Order is blocked, the attempted order information is displayed, then
    
    the user is sent back to the Enter ID screen after the Current inventory is redisplayed.

---

## Bamazon Manager

__The bamazonManager.js File:__

This is the Bamazon Managers View, which allows the user to:

* Display contents of the entire Database.
* Display only Low-Inventory
* ADD to the stock amount of a specific Item ID
* ADD a completely new item to the Inventory


---

#### By Vince Shury
Thanks again for viewing my repository 
If you like this application please check out my [Github Profile](https://github.com/Vincent440) to see my other repositories.

Don't forget to view my [Github Portfolio page](https://vincent440.github.io/) well you are there Thanks!