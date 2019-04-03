var mysql = require('mysql');
var inquirer = require('inquirer');
var colors = require('colors');

//connect to the mysql databse with creentials

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'recordDistro_db'
})

//first display all of the items available for sale. Include the ids, names, and prices of products for sale.

connection.connect(function (err) {
    if (err) throw (err);
    console.log('connected as id ' + connection.threadId + '\n');

    readProducts();
})

//function which prompts the user for ID of product they would like to buy, and how many units they would like to buy

function readProducts() {
     // console.log('\n--------------------99-C-E-N-T-D-I-S-T-R-O--------------------\n'.black.bgCyan)
     console.log('\n\n      Welcome to 99¢ Record Distribution\n\n'.bgBlue.yellow.bold+ 'Wholesale price and quantity of available titles are listed below...\n'.bgBlack.yellow + '\n\n')

    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++){
            if (res[i].stock_quantity > 0){
                console.log(
                    res[i].id +  ' | ' + 
                    '$' + res[i].price.toFixed(2) + 
                    ' | ' + res[i].product_name
                    );
            }
            
        }
    
        console.log('--------------------------------------------------------------------------------------------------')
     
    })

    customerPrompt();
}


function customerPrompt() {

    //query the database for all items listed in products table
    connection.query('SELECT * FROM products',
        function (err, res) {
            if (err) throw err;

            inquirer
                .prompt([
                    {
                        name: 'buyWhat',
                        type: 'rawlist',
                        message: 'Select:',
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
                    var chosenProduct;
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].product_name === answer.buyWhat) {
                            chosenProduct = res[i];
                        }
                    };

                    var howMany = parseInt(answer.howMany)

                    // var buyWhat = answer.buyWhat

                    var grandTotal = chosenProduct.price * howMany;

                    if (chosenProduct.stock_quantity < howMany) {
                        console.log('Order exceeds available supply. Please try again...\n')

                        // connection.end();
                        customerPrompt();
                    } else if (chosenProduct.stock_quantity > howMany) {

                        var newTotal = chosenProduct.stock_quantity - howMany;

                        updateProduct(chosenProduct.product_name, newTotal);
                        
                        console.log('\n\nSales receipt____________________________________________________'.bold.yellow)
                        console.log(
                            '\n Thank you for purchasing \n' + howMany + ' copies of ' + chosenProduct.product_name + '. \n',
                            'Your total is $' + grandTotal.toFixed(2) +  '\n' +
                            'Your order will ship within 2-3 business days.'
                        )
                        console.log('\n for inquiries msg \n  norequests@99centradio.com\n____________________________________'.yellow+
                        '\n_______________________________'.yellow+
                        '\n_________________________'.yellow)
              
                    }
                })
        })
}

function updateProduct(product_name, stock_quantity) {
    // console.log("Updating all record quantities...\n");
    connection.query('UPDATE products SET ? WHERE ?',
        [
            {
                stock_quantity: stock_quantity
            },
            {
                product_name: product_name
            }
        ],
        function (err, res) {
            if (err) throw err;
            // console.log(res.affectedRows + " products updated! \n")

        },
    );
    connection.end()
    // console.log(query.sql);
}