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

    mainMenu();
})

function mainMenu() {
    console.log('Supervisor View '.bold.green
        + '99¢ Record Distribution\n'.bgGreen.black + '\n')
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
        ).then(function (answer) {
            switch (answer.menu) {
                case 'View product sales by Department': viewProductsByDept();
                    break;
                case 'Create new Department': createDepartment();
                    break;
                case 'Exit': exitManager();

            }
        })
}
var cellArr
var t;

function cell(value) {
    cellArr = []
    var string = value;
    var blankSpace = '                ';
    var addString = string + blankSpace;
    t = addString.slice(0, 15) + '|'.grey
    cellArr.push(t)
    return cellArr
}


function viewProductsByDept() {

    connection.query(
        'SET SESSION sql_mode="STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION";SELECT d.department_id AS dept_id, d.department_name AS dept_name, d.over_head_costs AS overhead_cost, p.department_name, IFNULL(SUM(p.product_sales), 0) AS product_sales, IFNULL(SUM(p.product_sales), 0) - IFNULL(d.over_head_costs, 0) AS total_profit FROM departments AS d LEFT JOIN products AS p ON d.department_name = p.department_name GROUP BY d.department_name ORDER BY total_profit', 
        function (err, res) {
            if (err) throw err;
            var propertyIndexArr = []
            propertyIndexArr.push(Object.getOwnPropertyNames(res[1][0]));
            firstIndex = propertyIndexArr[0]
            buildHeaders(firstIndex)
            buildRows(res[1])

          

            function buildHeaders(arr) {
                var headers = ' ' + cell(arr[0]) + ' ' + cell(arr[1]) + ' ' + cell(arr[2]) + ' ' + cell(arr[4]) + ' ' + cell(arr[5]);
                console.log('\n                                                           Total Profit by Department\n'.green.underline +
                    headers+ '\n' +
                    '----------------| ---------------| ---------------| ---------------| ---------------|'.grey)
            }

            function buildRows(arr) {
                arr.forEach(function (element, index, array) {
                    var items = Object.values(element)

                    var rows = ' ' + cell(items[0]) + ' ' + cell(items[1]) + ' ' + cell(items[2]) + ' ' + cell(items[4]) + ' ' + cell(items[5]);


                    var format = rows.white+ '\n' +
                    '----------------|'.grey+'----------------|'.grey+'----------------|'.grey+'----------------|'.grey+'----------------|'.grey
                    console.log(format)
                    
                })
            }
            exitView()
        }
    )
}

function createDepartment() {

    console.log('hellow')

    connection.query('SELECT * FROM departments', 
    function(err, res){
        if (err) throw err;

        console.log(connection.sql)

        // inquirer
        // .prompt(
        //     [
        //         {
        //             name: 'department_name',
        //             type: 'input',
        //             message: 'Department name?',
        //             validate: function (value) {
        //                 if (typeof value === 'string' || value instanceof String) {
        //                     return true
        //                 }
        //                 return false
        //             }
        //         },
        //     ]).then(function(answer){

        //         console.log(answer.department_name)

        //         var query = connection.query('INSERT INTO departments SET ?',
        //         {
        //             department_name: answer.department_name
        //         },
        //         function (err, res){

        //             if (err) throw err;

        //             console.log('\n\n' + answer.department_name + ' added to the department list...' +
        //             '\n The following change was made:'.bgGreen.black)

        //                     console.log(query.sql.yellow + '\n\n')
        //                     console.log('____________________________________\n'.underline.yellow)
        //                     exitView();
        //         }
                 
        //         )
        
        //     })
    })
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
                case 'Menu': mainMenu()
                    break;
                case 'Exit': exitManager();

            }
        })
}

function exitManager() {
    console.log('exit program')
    connection.end();
};