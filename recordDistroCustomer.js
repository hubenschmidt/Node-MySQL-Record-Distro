
var mysql = require('mysql');
var inquirer = require('inquirer');

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
    console.log('Display all products...\n')
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log(res);
        // connection.end();
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
                        message: 'Which record would you like to buy?',
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
                ])

                // 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

                //    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

                .then(function (answer) {

                    // get the information of the chosen product
                    // console.log(answer)
                    var chosenProduct;
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].product_name === answer.buyWhat) {
                            chosenProduct = res[i];
                        }
                    }

                    var howMany = parseInt(answer.howMany)

                    var buyWhat = answer.buyWhat
                
                    if (chosenProduct.stock_quantity < howMany) {
                        console.log('Insufficient quantity!')
                        connection.end();
                    } else if (chosenProduct.stock_quantity > howMany) {

                        updateProduct(buyWhat, howMany);

                        //     var updatedStock = chosenProduct.stock_quantity - parseInt(answer.howMany)

                        //     console.log(updatedStock)

                    }

                })
        })
}

function updateProduct(product_name, stock_quantity) {
    console.log("Updating all record quantities...\n");
    var query = connection.query('UPDATE products SET ? WHERE ?',
    [
        {
            stock_quantity: stock_quantity
        },
        {
            product_name: product_name
        }
    ],
    function(err, res){
        if (err) throw err;
        console.log(res.affectedRows + " products updated! \n")
        
    },
    
    
    );
    connection.end()

    console.log(query.sql);
    // console.log(stock_quantity)



}



// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.


