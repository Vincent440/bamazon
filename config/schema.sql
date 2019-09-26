DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255),
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(10) DEFAULT 0,
PRIMARY KEY (item_id)
);