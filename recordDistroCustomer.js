//require the mysql database

var mysql = require('mysql');

//connect to the mysql databse with creentials

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'recordDistro_db'
})

connection.connect(function(err){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    readProducts();
})

//function to read

function readProducts(){
    console.log('Display all products...\n')
    connection.query('SELECT * FROM products', function(err, res){
        if (err) throw err;
        console.log(res);
        connection.end();
    })
}
