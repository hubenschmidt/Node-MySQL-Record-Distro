## Overview

A CLI application serving three end user types:

-Customer
-Business Manager
-Business Owner

The app takes in orders from customers and depletes stock from the store's inventory. Product sales are tracked across the store's departments, new products are entered, and an executive report provides summary data on highest-grossing departments, along with the option to add new departments.

Featuring simple Node.js command line directives that communicate with a MySQL instance.

Based on a record distributor model, where departments are defined by music genre.

## Setup
To run this application, you will need MySQL and Node.js installed on your computer, along with a MySQL database visualizer, such as Sequel Pro or MySQL Workbench. 

Open your MySQL client and create a new instance "recordDistro_db." Then, in the repository find recordDistro.sql which contains SQL queries which populate the database with dummy data upon import to MySQL client.

Then,

clone the repo
navigate command line to cloned repo
run command npm install to get packages including 
  -mysql
  -inquirer
  -colors
  
Run node commands:
-node customer.js (end user)
-node manager.js (end user)
-node supervisor.js (end user)

Follow the prompts at each of the the three end user screens.
-
Customer Demo
The customer interface:

1) Presents the customer with a table of all available products
2) Asks for the ID of the customer's desired product
3) Asks how many items the customer would like to purchase
4) Confirms order & updates product inventory in database
customer demo

