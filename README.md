# Bamazon Command Line Application

Welcome to my BAMAZON app. This Application is an Amazon-like storefront display in command line tables through Node.js.

Utilizing Node.js and MySQL database queries to manipulate the database in the command line according to the user input received through inquirer Prompts.

The app will take in orders from customers and deplete stock from the store's inventory.

__NAVIGATION:__
* [Customer File Description](#Bamazon-Customer)
* [Manager File Description](#Bamazon-Manager)
* [Wiki Home Page](https://github.com/Vincent440/bamazon/wiki)
* [Getting Started](https://github.com/Vincent440/bamazon/wiki/Getting-Started)
* [Customer App DEMO](https://github.com/Vincent440/bamazon/wiki/Customer-Demo)
* [Manager App DEMO]()
* [About the creator](#By-Vince-Shury)

**There are Two parts of this application __BamazonCustomer.js & BamazonManager.js.__**

The Customer file allows the user to:
* View all items currently in-stock in the Database. 
* Subtract individual item's stock quantities from the SQL database by succesfully placing an order with an item ID and order amount. 

The Manager file allows the user to: 
* View all items in the inventory with all of the stored information .
* View specifically items with a low Stock amount.
* ADD Stock to a specific item by inputting an ID and Amount to add to the Inventory.
* CREATE an entirely new Item to add to the Database:
* Exit the application.

--- 

##    Bamazon Customer

__The bamazonCustomer.js File:__

This is the customer view of the Bamazon application, Which has very limited options for the user, App displays the Available Stock in the MySQL Bamazon Database, then prompts the user to Enter a valid ITEM ID that was displayed and order amount, Upon submitting that input the app will then attempt to place an order from the database either displaying the successful order followed by a prompt allowing the user to either, exit or continue to view the updated inventory and make another purchase,Or the order will be unsuccessful because the amount entered is not available in the store inventory and the inventory will be displayed again starting the next order input. 

*what the customer app does*

1. When you run the file it displays a console table of the current inventory items in the MySQL products table of the Bamazon database Showing the customer:
   * ID
   * Item Name
   * Price

1. Prompts For the user to enter a Item ID
   * The ID entered must a _whole number & **Valid** item-ID_
   * A Valid ID would only be an item ID that was displayed to the user from the table showing all items currently IN-Stock in the database. 

1. Prompts for the Amount of that Item they would like to buy
   * This must be a valid whole number input, greater then 0.

1. Once the User has entered an ID , and an Order Amount:
   * __IF Amount is in-stock:__ 
      * Then the order is placed and the total cost of the order is displayed in a table with order information. An inquirer confirm prompt is then displayed to the user:
         * Would you like to make another purchase?

            * YES displays the updated inventory & prompts user to enter ID + Amount to make another purchase.

            * NO to exit the application. 

   * __IF amount is NOT in-stock:__

        * The Order is blocked 
        * The attempted order information is displayed
        * The Current inventory is redisplayed and the user is prompted to again to enter item ID and amount to place new order

---

##    Bamazon Manager

__The bamazonManager.js File:__

This is the Manager view of the application which allows the user to select from 5 different options well the exit option will end the program, any other command will return to the menu prompt.

The Menu prompt will allow the user to either: 
* View all items
* View only items with a low stock quantity
* Add to a specific items Stock Quantity
* Create and add an entirely new item
* Exit the application. 

*what the manager app commands do*

The Bamazon Managers View, allows the user to:
* "View Products for Sale" :
  Display contents of the entire Database.
   * Selects all data from the products table of the Bamazon database and displays it in the console in a table format

* "View Low Inventory":
 Display only items with a stock quantity. 
   * Prompts user to enter number amount, then Selects from the products table all item data that has a stock quantity less then the amount the user has input, Default is: 100

* "Add to Inventory": ADD to the stock amount of a specific Item ID
   * Prompts user to enter a valid item ID from the products table, prompts for a number to add to that stock quantity of that item, updates the database to increase the stock amount by that number for the item of the ID the user entered. 

* "Add New Product": ADD a completely new item to the Inventory.
   * Prompts user to enter the New Product information:
      * Name
      * Department
      * Stock quantity
      * Price $
   * This information is then Pushed to the products table of the Bamazon database, creating the new product information from what the user has entered. 

* "EXIT": Exits the application.
   * Every command will send the user back to the menu screen, this option is available to Exit the application at anytime user is at the menu screen. 

---


#### By Vince Shury
Thanks again for viewing my repository.

If you like this application please check out my [Github Profile](https://github.com/Vincent440) to see my other repositories.

Don't forget to view my [Github Portfolio page](https://vincent440.github.io/) well you are there Thanks!

[Click here to go back to the Top of Page](#Bamazon-Command-Line-Application)