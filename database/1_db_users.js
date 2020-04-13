/*---------------------------------------------REQUIREMENTS--------------------------------------------*/
const db_data = require('../database/db_connection_data');

const sequelize = require('../database/db_config');

/*---------------------------------------------CREATE USERS--------------------------------------------*/
let dbsql = [
    //`SET FOREIGN_KEY_CHECKS = 0;`,
    //`TRUNCATE TABLE ${db_data.conf_db_name}.users;`,
    //`SET FOREIGN_KEY_CHECKS = 1;`,
    `INSERT INTO ${db_data.conf_db_name}.users 
        (user_id, username, password, full_name, email, phone, delivery_address, is_admin, is_disabled) VALUES
        (NULL, 'jsduana', 'seba1234', 'Juan Sebastian Duana', 'jsduana@gmail.com', 154603705, 'Av. del Valle 369', TRUE, FALSE),
        (NULL, 'nflanders', 'ned1234', 'Ned Flanders', 'nedflanders@gmail.com', 154477902, 'Avenida Siempreviva 780', FALSE, FALSE),
        (NULL, 'sskinner', 'skinner1234', 'Seymour Skinner', 'sskinner@gmail.com', 154477902, 'Escuela Primaria de Springfield 598', FALSE, FALSE),
        (NULL, 'mszyslak', 'moe1234', 'Moe Szyslak ', 'mszyslak@gmail.com', 154477902, 'Calle Falsa 123', FALSE, FALSE),
        (NULL, 'mburns', 'burns1234', 'Montgomery Burns', 'mburns@gmail.com', 154477902, 'Planta de energía nuclear 19', FALSE, FALSE),
        (NULL, 'hsimpson', 'homero1234', 'Homero Simpson', 'homerosimpsons@gmail.com', 154123456, 'Avenida Siempreviva 742', FALSE, FALSE);`,
        `ALTER TABLE ${db_data.conf_db_name}.users
        MODIFY user_id int(64) AUTO_INCREMENT NOT NULL, AUTO_INCREMENT=7;`
].join(' ');

sequelize.query(dbsql, {
}).then(result => {
    console.log('Successfully created Users')
}).catch((err) => {
    console.log('Error: ' + err);
})