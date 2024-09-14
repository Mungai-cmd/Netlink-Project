const mysql = require('mysql2');

const connection = mysql.createPool({
    host: '3306',
    user: 'root',
    password: 'Musiwaziki@1624',
    database: 'myapp_db'
});

module.exports = connection.promise();
