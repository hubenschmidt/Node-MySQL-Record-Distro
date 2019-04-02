// ### Challenge #2: Manager View (Next Level)

// * Create a new Node application called `bamazonManager.js`. Running this application will:

//   * List a set of menu options:

//     * View Products for Sale

//     * View Low Inventory

//     * Add to Inventory

//     * Add New Product

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

var mysql = require('mysql');
var inquirer = require('inquirer');
var colors = require('colors');

var recordDistroCustomer = require('./recordDistroCustomer')


var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'recordDistro_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n')
    //list menu options
    menuOptions();

})

function exitView() {
    inquirer
        .prompt(
            [
                {
                    name: 'Navigator',
                    type: 'list',
                    choices: ['Menu', 'Exit']
                }
            ]
        ).then(function (answer) {
            switch (answer.Navigator) {
                case 'Menu': menuOptions()
                    break;
                case 'Exit': exitManager();

            }
        })
}

function menuOptions() {

    console.log('Manager View '.underline.cyan
        + '99¢ Record Distribution\n'.bgCyan.black)
    inquirer
        .prompt(
            [
                {
                    name: 'menu',
                    type: 'list',
                    message: 'Choose an action..',
                    choices: ['View products for sale', 'View low inventory', 'Add to inventory', 'Add new product', 'Exit']

                }
            ]
        ).then(function (answer) {
            switch (answer.menu) {
                case 'View products for sale': viewProducts();
                    break;
                case 'View low inventory': viewLowInventory();
                    break;
                case 'Add to inventory': addInventory();
                    break;
                case 'Add new product': addProduct();
                    break;
                case 'Exit': exitManager();

            }
        })
}

function listProducts(res){
    for (i = 0; i < res.length; i++) {
        console.log(
            ('ID: ' + res[i].id + ' | ' +
                'quantity: ' + res[i].stock_quantity + ' | ' +
                'price: $' + res[i].price.toFixed(2) + ' | ' +
                'title: ' + res[i].product_name).white
        )
    }
}

function viewProducts() {
    // console.log
    console.log('\nWholesale price and quantity of available titles are listed below...\n'.underline.cyan)

    connection.query('SELECT * FROM products', function (err, result) {
        if (err) throw err;

        listProducts(result);

        console.log('\n'.black.bgCyan)
        menuOptions();
    })
}

function viewLowInventory() {

    connection.query('SELECT *  FROM products WHERE stock_quantity < 1000', function (err, result) {
        if (err) throw err;

       listProducts(result);

        // console.log('\ntest'.black.bgCyan+'\n')
        exitView()

    })

}

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

function addInventory(){

    connection.query('SELECT * FROM products', function(err, res){
        if (err) throw err;

        recordDistroCustomer.whatHowMany

      
    })
}





    // connection.query('INSERT INTO products SET ?',
    // {
        
    // })



function addProduct() {
    console.log('add to Product DB')
}

function exitManager() {
    console.log('exit program')
    connection.end();
};


