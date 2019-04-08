## Overview

A CLI application serving three end user types:

*Customer
*Business Manager
*Business Owner

The app takes in orders from customers and depletes stock from the store's inventory. Product sales are tracked across the store's departments, new products are entered, and an executive report provides summary data on highest-grossing departments, along with the option to add new departments.

The code includes a $.99 surcharge per unit sold to achieve profitability for the business, which deals in vinyl record wholesale distribution. Departments are defined by music genre.

Featuring simple Node.js command line directives that communicate with a MySQL instance.

## Setup
To run this application, you will need MySQL and Node.js installed on your computer, along with a MySQL database visualizer, such as Sequel Pro or MySQL Workbench. 

Open your MySQL client and create a new instance "recordDistro_db." Then, in the repository find recordDistro.sql which contains SQL queries which populate the database with dummy data upon import to MySQL client.

Then,

1. clone the repo
2. navigate command line to cloned repo
3. run command npm install to get packages including 
  *mysql
  *inquirer
  *colors
  
4.Run node commands:
*node customer.js (end user)
*node manager.js (end user)
*node supervisor.js (end user)

Follow the prompts at each of the the three end user screens.
-

## Customer Demo
The customer interface:

1) Presents the customer with a table of all available products
2) Asks for the ID of the customer's desired product
3) Asks how many items the customer would like to purchase
4) Confirms order & updates product inventory in database
customer demo

![customer-demo](https://github.com/hubenschmidt/liri-node-app/blob/fe82709ee2aca35b8f143319c5504acbca2cd912/gifs/liri%20concert-this.gif)

