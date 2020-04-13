/*---------------------------------------------REQUIREMENTS--------------------------------------------*/
const db_data = require('../database/db_connection_data');

const sequelize = require('../database/db_config');

/*---------------------------------------------CREATE PRODUCTS--------------------------------------------*/
let dbsql = [
    //`SET FOREIGN_KEY_CHECKS = 0;`,
    //`TRUNCATE TABLE ${db_data.conf_db_name}.orders;`,
    //`SET FOREIGN_KEY_CHECKS = 1;`,
    `INSERT INTO ${db_data.conf_db_name}.orders 
        (order_id, status, date, description, payment_method, total, user_id, is_disabled) VALUES
        (NULL, 'delivered', NOW(), '1xHamVegg 1xAgua', 'cash', 360, 1, FALSE),
        (NULL, 'canceled', NOW(), '1xTacCarn', 'debit card', 230, 2, FALSE),
        (NULL, 'sending', NOW(), '3xHamDob 2xCervLat 1xAgua', 'cash', 1350, 3, FALSE),
        (NULL, 'preparing', NOW(), '2xTacPol 2xBebLim', 'credit card', 580, 4, FALSE),
        (NULL, 'confirmed', NOW(), '1xPizzaMuzza', 'cash', 350, 5, FALSE),
        (NULL, 'new', NOW(), '1xSandVegg 1xEnsCesar 2xCheeChoc 1xBebLim', 'debit card', 780, 6, FALSE),
        (NULL, 'delivered', NOW(), '1xPizzaRuc 1xCervBot', 'cash', 560, 3, FALSE),
        (NULL, 'new', NOW(), '1xTacCarPic', 'cash', 220, 4, FALSE),
        (NULL, 'delivered', NOW(), '2xHamDob 1xHamVegg 3xFritas 6xCervLat', 'credit card', 1865, 1, FALSE),
        (NULL, 'sending', NOW(), '1xBagPo 1xNachCar 1xCheeAran 2xBebPom', 'cash', 585, 2, FALSE),
        (NULL, 'new', NOW(), '1xPizza4Q 1xCheeChoc 2xBebPom', 'debit card', 710, 6, FALSE),
        (NULL, 'delivered', NOW(), '2xSandJyQ 2xCocaLat500', 'credit card', 520, 5, FALSE),
        (NULL, 'delivered', NOW(), '1xBagSalm', 'cash', 150, 3, FALSE),
        (NULL, 'sending', NOW(), '2xHamDob 2xHamBac 4xFritas 8xCervLat', 'credit card', 2640, 2, FALSE),
        (NULL, 'delivered', NOW(), '2xTostJyQ 1xLemonP 1xAgua', 'cash', 560, 5, FALSE);`,
    `ALTER TABLE ${db_data.conf_db_name}.orders
        MODIFY order_id int(64) AUTO_INCREMENT NOT NULL, AUTO_INCREMENT=16;`,
].join(' ');

sequelize.query(dbsql, {
}).then(result => {
    console.log('Successfully created Orders!')
}).catch((err) => {
    console.log('Error: ' + err);
})