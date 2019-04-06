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



function viewProductsByDept() {
    console.log('\nWholesale price and quantity of available titles are listed below...\n'.underline)


    connection.query('SELECT d.department_id AS babylon, d.department_name AS rebelmuzik, d.over_head_costs AS working4DeRentMon, p.product_sales AS herbManIsa_HerbManHustling, p.department_name FROM departments AS d LEFT JOIN products AS p ON d.department_name = p.department_name;SELECT SUM(product_sales) FROM products', function (err, res) {
        if (err) throw err;


        var bread

    

        res[0].forEach(function (element, index, array) {

            var t;
            var propertyNamesArr = [];
            var valuesObjIndex = []
            
            var valuesArr = []

            valuesArr.push(Object.values(element))

            var valuesObj;
            // valuesObj = Object.assign(valuesArr[index])

            //make list of unique report headers
            if (Object.keys(array[0])[index] != undefined) {


                propertyNamesArr.push(Object.keys(array[0])[index])
                // console.log(propertyNamesArr[0])

            //make list of values and create new object of key-value pairs with headers
                valuesObjIndex.push(index)
                

                var keyPairArr = valuesObjIndex + '\''

                console.log(_.zipObject(valuesObjIndex, propertyNamesArr));

                
                // +propertyNamesArr+'\''

                // console.log(keyPairArr)

                // function objectify(arr) {
                //     return arr.reduce(function(result, currentArray) {
                //         result[currentArray[0]] = currentArray;
                //         return result;
                //     }, {});
                // }

                // console.log(objectify([keyPairArr]))

//                 console.log(objectify([ [1, 'a'], [2, 'b'], [3, 'c'] ]));
// # { '1': 'a', '2': 'b', '3': 'c' }

    
                

                   //make list of all report values

            




            }

        
          


         

            


          



            // console.log(valuesObj[index])

            // console.log(_.uniq(valuesObj))

            // if (valuesObj != undefined){
            //     console.log(_.uniq(valuesObj))


            // var count = 0;
            // for(var i = 0; i < valuesObj.length; i++){
            //     if(valuesObj[i])
            //         count++;

            //     console.log(count)
            // }

            // }



            // console.log(valuesArr)

            function cell(value) {
                cellArr = [];
                var string = value;
                var blankSpace = '                ';
                var addString = string + blankSpace;
                t = addString.slice(0, 15) + '|'
                cellArr.push(t)
                // console.log(cellArr)
            }

            //  valuesArr.forEach(function(index){

            //  })


            // console.log(
            //     // '| department_id | department_name | over_head_costs | product_sales | total_profit |\n' +
            //     // '| ------------- | --------------- | --------------- | ------------- | ------------ |\n' +
            //     report
            // )

            // var report = buildReport(element.babylon) + '             | ' + element.rebelmuzik + '        | ' + element.working4DeRentMon + '              | ' + element.herbManIsa_HerbManHustling + '           | ' +  + '           |\n' 


        });



    });

}




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