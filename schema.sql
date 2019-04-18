DROP DATABASE IF EXISTS bamazon;
--create the bamazon database--
CREATE DATABASE bamazon;
--select the database--
USE bamazon;
--Create the products table to hold the store inventory--
CREATE TABLE products(
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255),
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(10) DEFAULT 0,
PRIMARY KEY (item_id)
);