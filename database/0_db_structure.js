/*---------------------------------------------REQUIREMENTS--------------------------------------------*/
const db_data = require('../config/db_connection_data');

const sequelize = require('../config/db_config');

/*---------------------------------------------CREATE DATABASE and TABLES--------------------------------------------*/
let dbsql = [
    `SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";`,
    `SET AUTOCOMMIT = 0;`,
    `START TRANSACTION;`,
    `SET time_zone = "+00:00";`,
    `DROP DATABASE IF EXISTS ${db_data.conf_db_name};`,
    `DROP TABLE IF EXISTS ${db_data.conf_db_name}.products_orders;`,
    `DROP TABLE IF EXISTS ${db_data.conf_db_name}.products;`,
    `DROP TABLE IF EXISTS ${db_data.conf_db_name}.orders;`,
    `DROP TABLE IF EXISTS ${db_data.conf_db_name}.users;`,
    `CREATE DATABASE ${db_data.conf_db_name};`,
    `CREATE TABLE ${db_data.conf_db_name}.users (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR (60) NOT NULL,
        password VARCHAR (60) NOT NULL,
        full_name VARCHAR(60) NOT NULL,
        email VARCHAR(60) NOT NULL,
        phone INT NOT NULL,
        delivery_address VARCHAR (60) NOT NULL,
        is_admin enum('FALSE','TRUE') NOT NULL DEFAULT 'FALSE'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    `CREATE TABLE ${db_data.conf_db_name}.products (    
        product_id INT PRIMARY KEY AUTO_INCREMENT,
        product_name VARCHAR (60) NOT NULL,
        price FLOAT NOT NULL,
        img_url VARCHAR(200) NOT NULL,
        description VARCHAR(150) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    `CREATE TABLE ${db_data.conf_db_name}.orders (    
        order_id INT PRIMARY KEY AUTO_INCREMENT,
        status enum('new','confirmed','preparing','sending','delivered','canceled') NOT NULL DEFAULT 'new',
        date DATETIME NOT NULL,
        description VARCHAR(150) NOT NULL,
        payment_method enum('cash','credit card','debit card') NOT NULL,
        total FLOAT NOT NULL,
        user_id INT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    `CREATE TABLE ${db_data.conf_db_name}.products_orders (
        order_prod_id INT PRIMARY KEY AUTO_INCREMENT,
        order_id INT,
        product_id INT,
        product_quantity INT NOT NULL,
        user_id INT,
        FOREIGN KEY(order_id) REFERENCES orders(order_id),
        FOREIGN KEY(product_id) REFERENCES products(product_id),
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
].join(' ');

sequelize.query(dbsql, {
}).then(result => {
    console.log('Base de datos y estructura de tablas creadas con éxito')
}).catch((err) => {
    console.log('Error: ' + err);
})