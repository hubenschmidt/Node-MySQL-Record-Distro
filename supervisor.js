var mysql = require('mysql');
var inquirer = require('inquirer');
var colors = require('colors');

//lodash 
var _ = require('lodash');

//lodash method category
var array = require('lodash/array');

var object = require('lodash/object')

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

function sumTotals(arr, index) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += parseInt(arr[index]);
    }
    console.log(sum);
}

function viewProductsByDept() {

    console.log('\nWholesale price and quantity of available titles are listed below...\n'.underline)

    connection.query('SELECT d.department_id AS babylon, d.department_name AS rebelmuzik, d.over_head_costs AS working4DeRentMon, p.product_sales AS herbManIsa_HerbManHustling, p.department_name FROM departments AS d LEFT JOIN products AS p ON d.department_name = p.department_name;SELECT SUM(product_sales) FROM products', function (err, res) {
        if (err) throw err;

        var rows = _.uniq(_.map(res[0]))

        var propertyIndexArr = []

        propertyIndexArr.push(Object.getOwnPropertyNames(res[0][0]));

        firstIndex = propertyIndexArr[0]
        buildHeaders(firstIndex)
        buildRows(res[0][0])
        


        function buildHeaders(arr) {
            var headers = ' ' + cell(arr[0]) + ' ' + cell(arr[1]) + ' ' + cell(arr[2]) + ' ' + cell(arr[3]) + ' ';
            console.log(
                        '| department_id | department_name| over_head_costs| product_sales | total_profit |'+'\n'+
                        '| ------------- | ---------------| ---------------| ------------- | ------------ |'+'\n'+
                        headers+'\n'+
                        '| ------------- | ---------------| ---------------| ------------- | ------------ |'+'\n'
                        )
        }

        function buildRows(arr) {
            rows.forEach(function (element, index, array) {
                var headers = ' ' + cell(arr[0]) + ' ' + cell(arr[1]) + ' ' + cell(arr[2]) + ' ' + cell(arr[3]) + ' ';
                console.log(headers +
                    '\n')
            })

        }


        console.log(summarizeColumn(rows));

        
        function summarizeColumn(arr){
            for (i = 0; i < arr.length; i++){
                console.log(arr[i])

                var values = [];
                values.push(Object.values(arr[i]))

                return values
             } 
            }
       
    }
    )
}




var findOne = function (haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
};



//  overhead.push(res[0][9]);

//             productSales.push(res[i].herbManIsa_HerbManHustling)

//     var viewHeaders = makeReportHeaders(headerIndex)

//     function customizer(objValue, srcValue) {
//         if (_.isArray(objValue)) {
//           return objValue.concat(srcValue);
//         }
//       }

    // var customizer = customizer(valuesObjIndex, headerIndex)

    // return customizer

    // function makeReportHeaders(arr) {
    //     //make list of unique report headers
    //     if (headerIndex) {

    //         var arr = [];

    //         arr.push(Object.keys(array[0])[index])

    //         //make list of values and create new object of key-value pairs with headers
    //         valuesObjIndex.push(index)                

    //     }
    // }

    //  valuesArr.forEach(function(index){

    //  })


// function viewProductsByDept() {}
//     console.log('\nWholesale price and quantity of available titles are listed below...\n'.underline)

//     connection.query('SELECT d.department_id AS babylon, d.department_name AS rebelmuzik, d.over_head_costs AS working4DeRentMon, p.product_sales AS herbManIsa_HerbManHustling, p.department_name FROM departments AS d LEFT JOIN products AS p ON d.department_name = p.department_name;SELECT SUM(product_sales) FROM products', function (err, res) {
//         if (err) throw err;

//         var propertyArr = []

//         propertyArr.push(Object.getOwnPropertyNames(res[0]));

//         var overhead = [];
//         var productSales = [];


//     _.forEach(res[0], function(value, key) {
//               console.log(value, key+'lodashhin it');



//         })
//     }

        // for (i = 0; i < propertyArr[0].length; i++) {

        //     // console.log(propertyArr[0].length)

        //     // var babyArr = []

        //     // babyArr.push(res[0][i].babylon)

        //     // console.log(babyArr)



            // var arr = []

            // arr.push(res)

            // console.log(arr)

            // console.log(Object.getOwnPropertyNames(arr[0]+ 'get '))


            // var someLoot = res[1][1];

            // var bread;

            // overhead.push(res[0][9]);

            // productSales.push(res[i].herbManIsa_HerbManHustling)




        // console.log(overhead)
        // exitSupervisor();


// function createDept() {
//     console.log('create dept')
// }




// 3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

//    * View Product Sales by Department

//    * Create New Department