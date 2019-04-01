// ### Challenge #2: Manager View (Next Level)

// * Create a new Node application called `bamazonManager.js`. Running this application will:

//   * List a set of menu options:

//     * View Products for Sale
    
//     * View Low Inventory
    
//     * Add to Inventory
    
//     * Add New Product

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'recordDistro_db'
});

connection.connect(function(err){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n')
    //list menu options
    menuOptions();

})

function menuOptions(){
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
    ).then(function(answer){
        switch(answer.menu){
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

function viewProducts(){
    console.log('display products')
}

function viewLowInventory(){
    console.log('view inventory less than five')
}

function addInventory(){
    console.log('add to inventory')
};

function addProduct(){
    console.log('add to Product DB')
}
    
function exitManager(){
    console.log('exit program')
    connection.end();
};
   

 