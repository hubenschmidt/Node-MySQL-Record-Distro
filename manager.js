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

///////DATABASE WARNING\\\\\\\\
////////////proceed no further
//if not first ye..............
///////////////\\\\\\\\\\\\\\\\
//////////DEDUPLICATE!\\\\\\\\\\
//////////////\\\\\\\\\\\\\\\\\\
//☠☠☠☠☠☠☠☠  or  ☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠
//Risk the Sea of Infinite Peril 
//☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠
function removeDupes(names){
    var unique = {};
    names.forEach(function(i){
        if(!unique[i]){
            unique[i] = true;
        }
    });
    return Object.keys(unique)
}

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

    console.log('Manager View '.bold.magenta
        + '99¢ Record Distribution\n'.bgMagenta.black + '\n')
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
                'title: ' + res[i].product_name)
        )
    }
}

function viewProducts() {
    // console.log
    console.log('\nWholesale price and quantity of available titles are listed below...\n'.underline)

    connection.query('SELECT * FROM products', function (err, result) {
        if (err) throw err;

        listProducts(result);

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
                            console.log('____________________________________\n'.underline.green)

                            exitView();

                        }

                    )

                })
        }
    )
}

function addProduct() {

    connection.query('SELECT * FROM products', 
    function(err, res){
        if (err) throw err;

        inquirer
        .prompt(
            [
                {
                    name: 'department_name',
                    type: 'list',
                    message: 'Select genre:',
                    choices: function () {
                        var choiceArr = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArr.push(res[i].department_name);
                        }
                     
                        // console.log(removeDupes(choiceArr));
                        return removeDupes(choiceArr);
                    }
                },
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
                    name: 'stock_quantity',
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
                    name: 'price',
                    type: 'input',
                    message: '99¢ stocking fee included in all wholesale prices...\n'.yellow + 'Set wholesale price (whole numbers, no decimals:)',
                    validate: function(value){
                        if ((value - Math.floor(value)) !==0){
                            return false
                        }
                        return true
                    }
                },
                
            ]).then(function(answer){

                let ninetyNineCents = parseFloat(answer.price + '.99')

                console.log(answer.artist_name + ' - ' + answer.title)

                var query = connection.query('INSERT INTO products SET ?',
                {
                    product_name: answer.artist_name + ' - ' + answer.title,
                    artist_name: answer.artist_name,
                    title: answer.title,
                    department_name: answer.department_name,
                    stock_quantity: answer.stock_quantity,
                    price: ninetyNineCents
                },
                function (err, res){

                    if (err) throw err;

                    console.log('\n\n' + answer.stock_quantity.yellow + ' copies of '.yellow + answer.artist_name.yellow + ' - '.yellow + answer.title.yellow + ' at '.yellow + '$'.yellow+answer.price.yellow +'.99 per unit'.yellow + ' added to the product database...' +
                    '\n The following change was made:'.bgYellow.black)

                            console.log(query.sql.yellow + '\n\n')
                            console.log('____________________________________\n'.underline.yellow)
                            exitView();
                }
                 
                )
        
            })
    })
        }

function exitManager() {
    console.log('exit program')
    connection.end();
};


