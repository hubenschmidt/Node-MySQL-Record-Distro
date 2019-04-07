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

function readDepartments() {
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
                case 'Create new Department': createDept();
                    break;
                case 'Exit': exitSupervisor();

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
    t = addString.slice(0, 15) + '|'
    cellArr.push(t)
    return cellArr
}

function viewProductsByDept() {

    connection.query(
        'SET SESSION sql_mode="STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION";SELECT d.department_id AS dept_id, d.department_name AS dept_name, d.over_head_costs AS overhead_cost, p.department_name, SUM(p.product_sales) AS product_sales, (IFNULL(Sum(p.product_sales), 0) - IFNULL(Sum(d.over_head_costs), 0)) AS total_profit FROM departments AS d LEFT JOIN products AS p ON d.department_name = p.department_name GROUP BY d.department_name ORDER BY total_profit', 
        function (err, res) {
            if (err) throw err;
            var propertyIndexArr = []
            propertyIndexArr.push(Object.getOwnPropertyNames(res[1][0]));
            firstIndex = propertyIndexArr[0]
            buildHeaders(firstIndex)
            buildRows(res[1])

            function buildHeaders(arr) {
                var headers = ' ' + cell(arr[0]) + ' ' + cell(arr[1]) + ' ' + cell(arr[2]) + ' ' + cell(arr[4]) + ' ' + cell(arr[5]);
                console.log('\n                                                           Total Profit by Department\n'.bgGreen.black +
                    headers.bgBlack.green.bold + '\n' +
                    '----------------| ---------------| ---------------| ---------------| ---------------|'
                .bgBlack)
            }

            function buildRows(arr) {
                arr.forEach(function (element, index, array) {
                    var items = Object.values(element)
                    var rows = ' ' + cell(items[0]) + ' ' + cell(items[1]) + ' ' + cell(items[2]) + ' ' + cell(items[4]) + ' ' + cell(items[5]);
                    console.log(rows.bgBlack.green)
                })
            }

            connection.end()
        }
    )
}