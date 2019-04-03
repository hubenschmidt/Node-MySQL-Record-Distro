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

    console.log('Manager View '.bold.green
        + '99¢ Record Distribution\n'.bgCyan.black + '\n')
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

function listProducts(res) {
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

function addInventory() {



    connection.query('SELECT * FROM products',
        function (err, res) {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: 'listWhat',
                        type: 'rawlist',
                        message: 'Select item to update stock',
                        choices: function () {
                            var choiceArr = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArr.push(res[i].product_name);
                            }
                            return choiceArr;
                        }
                    },
                    {
                        name: 'howMany',
                        type: 'input',
                        message: 'How many copies?',
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            return false;
                        }
                    }

                ]).then(function (answer) {
                    var selectedItem;

                    for (var i = 0; i < res.length; i++) {
                        if (res[i].product_name === answer.listWhat) {
                            selectedItem = res[i];
                        }
                    };

                    var howMany = parseInt(answer.howMany)

                    var query = connection.query('UPDATE products SET ? WHERE ?',
                        [
                            {
                                stock_quantity: selectedItem.stock_quantity + howMany,
                            },
                            {
                                product_name: selectedItem.product_name
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;

                            console.log('\n\n' + selectedItem.product_name.cyan + ' updated...' + '\nThe following change was made to the product database:'.bgGreen.black)

                            console.log(query.sql.green + '\n\n')
                            console.log('____________________________________\n'.underline.cyan)

                            exitView();

                        }

                    )

                    // var query = connection.query('INSERT INTO products SET ?',
                    // {
                    //     // id: selectedItem.id,
                    //     artist_name: selectedItem.artist_name,
                    //     title:  selectedItem.title,
                    //     product_name: selectedItem.product_name,
                    //     department_name: selectedItem.department_name,
                    //     price: selectedItem.price,
                    //     stock_quantity: howMany
                    // },  

                    // function (err, res){
                    //     if (err) throw err;
                    //     console.log(res.affectedRows + 'product inserted!\n')

                    // })
                })
        }
    )

}


function addProduct() {
            inquirer
                .prompt(
                    [
                        {
                            name: 'artist_name',
                            type: 'input',
                            message: 'Artist name?',
                            validate: function (value) {
                                if (typeof value === 'string' || value instanceof String) {
                                    return true
                                }
                                return false
                            }
                        },
                        {
                            name: 'title',
                            type: 'input',
                            message: 'Record title?',
                            validate: function (value) {
                                if (typeof value === 'string' || value instanceof String) {
                                    return true
                                }
                                return false
                            }
                        },
                        {
                            name: 'howMany',
                            type: 'input',
                            message: 'How many copies?',
                            validate: function(value){
                                if (isNaN(value) === false){
                                    return true
                                }
                                return false
                            }   
                        },
                        {
                            name: 'whatPrice',
                            type: 'input',
                            message: 'Set wholesale price (please enter whole numbers, no decimals):',
                            validate: function(value){
                                if ((value - Math.floor(value)) !==0){
                                    return false
                                }
                                return true
                            }
                        }

                    ]).then(function(answer){
                        console.log(answer)
                    })

        }
    

function exitManager() {
    console.log('exit program')
    connection.end();
};


