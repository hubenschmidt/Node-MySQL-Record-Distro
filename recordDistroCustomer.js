
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

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    start();
    // readProducts();
})

//function which prompts the user for ID of product they would like to buy, and how many units they would like to buy

function start() {

    //query the database for all items listed in products table
    connection.query('SELECT * FROM products',
    function (err, res){
        if (err) throw err;
    
    inquirer
        .prompt([
            {
                name: 'buyWhat',
                type: 'list',
                message: 'Which record would you like to buy?',
                choices: function(){
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
                validate: function(value){
                    if (isNaN(value) === false){
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer){
            var chosenProduct;
            for (var i = 0; i < res.length; i++){
                if (res[i].product_name === answer.choice) {
                    chosenProduct = res[i];
                    console.log(answer.choice)
                }
            }


            //determine if bid was high enough

            if (chosenProdudct)

           

        })

    })
}


function readProducts() {
    console.log('Display all products...\n')
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    })
}
