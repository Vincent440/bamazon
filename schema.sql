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

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES
("apples","produce", 3.5 , 300),
("oranges","produce", 2 , 500),
("snickers","candy", 1 , 4000),
("almond joy","candy", 1 , 3000),
("milk","dairy", 3.25 , 500),
("cheese","dairy", 4 , 1000),
("butter","dairy", 3.5 , 2500),
("bread","pastries", 3.5 , 750),
("cookies","pastries", 2, 250),
("cakes","pastries",10, 200),
("strawberries","produce", 3.5 , 200),
("raspberries","produce", 3.5 , 2000);

--SELECT * FROM products;--