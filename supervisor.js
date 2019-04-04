var mysql = require('mysql');
var inquirer = require('inquirer');
var colors = require('colors');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'recordDistro_db',
    multipleStatements: true
})

connection.connect(function (err) {
    if (err) throw (err);
    console.log('connected as id ' + connection.threadId + '\n');

    readDepartments();
})


function supervisorMenu(){
    console.log('Super')
}

function readDepartments(){
    console.log('Supervisor View '.bold.red
    + '99¢ Record Distribution\n'.bgRed.black + '\n')
    inquirer
    .prompt(
        [
            {
                name: 'menu',
                type: 'list',
                message: "Choose an action..",
                choices: ['View product sales by Department', 'Create New Department', 'Exit']

    }
        ]
    ).then (function(answer){
        switch(answer.menu){
            case 'View product sales by Department': viewProductsByDept();
            break;
            case 'Create new Department': createDept();
            break;
            case 'Exit': exitSupervisor();

        }
    })

}

function viewProductsByDept(){
    console.log('\nWholesale price and quantity of available titles are listed below...\n'.underline)

   

    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {
            console.log(
                ('ID: ' + res[i].unique_id + ' | ' +
                    'quantity: ' + res[i].stock_quantity + ' | ' +
                    'price: $' + res[i].price.toFixed(2) + ' | ' +
                    'title: ' + res[i].product_name)
            )
        }

        exitSupervisor();
    })
}




// 3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

//    * View Product Sales by Department
   
//    * Create New Department