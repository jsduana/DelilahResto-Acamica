/*---------------------------------------------REQUIREMENTS--------------------------------------------*/
const db_data = require('./db_connection_data');

const sequelize = require('./db_config');

/*---------------------------------------------CREATE PRODUCTS--------------------------------------------*/
let dbsql = [
    //`SET FOREIGN_KEY_CHECKS = 0;`,
    //`TRUNCATE TABLE ${db_data.conf_db_name}.products_orders;`,
    //`SET FOREIGN_KEY_CHECKS = 1;`,
    `INSERT INTO ${db_data.conf_db_name}.products_orders 
        (order_prod_id, order_id, product_id, product_quantity) VALUES
        (NULL, 1, 1, 1),
        (NULL, 1, 40, 1),
        (NULL, 2, 19, 1),
        (NULL, 3, 2, 3),
        (NULL, 3, 32, 2),
        (NULL, 3, 40, 1),
        (NULL, 4, 20, 2),
        (NULL, 4, 34, 2),
        (NULL, 5, 7, 1),
        (NULL, 6, 10, 1),
        (NULL, 6, 17, 1),
        (NULL, 6, 30, 2),
        (NULL, 6, 34, 1),
        (NULL, 7, 8, 1),
        (NULL, 7, 33, 1),
        (NULL, 8, 22, 1),
        (NULL, 9, 2, 2),
        (NULL, 9, 1, 1),
        (NULL, 9, 6, 3),
        (NULL, 9, 32, 6),
        (NULL, 10, 15, 1),
        (NULL, 10, 23, 1),
        (NULL, 10, 29, 1),
        (NULL, 10, 35, 2),
        (NULL, 11, 9, 1),
        (NULL, 11, 30, 1),
        (NULL, 11, 35, 2),
        (NULL, 12, 12, 2),
        (NULL, 12, 39, 2),
        (NULL, 13, 14, 1),
        (NULL, 14, 2, 2),
        (NULL, 14, 5, 2),
        (NULL, 14, 6, 4),
        (NULL, 14, 32, 8),
        (NULL, 15, 13, 2),
        (NULL, 15, 25, 1),
        (NULL, 15, 40, 1);`
].join(' ');

sequelize.query(dbsql, {
}).then(result => {
    console.log('Successfully created data product orders!')
}).catch((err) => {
    console.log('Error: ' + err);
})