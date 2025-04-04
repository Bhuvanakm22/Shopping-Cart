const mysql=require('mysql2');
 
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password: 'Password#1',
    database:'nodecomplete'
});

module.exports = pool.promise();