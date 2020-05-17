/*---------------------------------------------REQUIREMENTS--------------------------------------------*/
const db_data = require('../config/db_connection_data');

const sequelize = require('../config/db_config');

/*---------------------------------------------CREATE USERS--------------------------------------------*/
let dbsql = [
    //`SET FOREIGN_KEY_CHECKS = 0;`,
    //`TRUNCATE TABLE ${db_data.conf_db_name}.users;`,
    //`SET FOREIGN_KEY_CHECKS = 1;`,
    `INSERT INTO ${db_data.conf_db_name}.users 
        (user_id, username, password, full_name, email, phone, delivery_address, is_admin) VALUES
        (NULL, 'jsduana', '$2a$10$msjtso3viunyQw4vo.mQve.Dtv5jcBzkBx0P5xyXLLyDVC2FvEWj.', 'Juan Sebastian Duana', 'jsduana@gmail.com', 154603705, 'Av. del Valle 369', 'TRUE'),
        (NULL, 'nflanders', '$2a$10$ogzcOCUk/tEoLlDqPa9FxucfVJjk7FnWYrkt/8jw1/g4ZTty0k8uu', 'Ned Flanders', 'nedflanders@gmail.com', 154477902, 'Avenida Siempreviva 780', 'FALSE'),
        (NULL, 'sskinner', '$2a$10$kHVNeEyA9FLe9OXZzsNM5.oGtDb/gBfAG3fLJQsqsTOlsn5oqB95W', 'Seymour Skinner', 'sskinner@gmail.com', 154477902, 'Escuela Primaria de Springfield 598', 'FALSE'),
        (NULL, 'mszyslak', '$2a$10$Xo2y3/8blGXDWuLDPNcgsevG5Z4jAOu0eOQwS.DMz0fcHrm9TdX.a', 'Moe Szyslak', 'mszyslak@gmail.com', 154477902, 'Calle Falsa 123', 'FALSE'),
        (NULL, 'mburns', '$2a$10$uZ.8DkuSILgVCB6XMmgt3.y1LCbli6TqTYcN1QkvWWbE2qeJMI14S', 'Montgomery Burns', 'mburns@gmail.com', 154477902, 'Planta de energía nuclear 19', 'FALSE'),
        (NULL, 'hsimpson', '$2a$10$xoWSqdJm4xT1XPKOnnGg2O8rF7UBJeA.Dvswmfdrzlj.YCUcs7SP.', 'Homero Simpson', 'homerosimpsons@gmail.com', 154123456, 'Avenida Siempreviva 742', 'FALSE');`,
    `ALTER TABLE ${db_data.conf_db_name}.users
        MODIFY user_id int(64) AUTO_INCREMENT NOT NULL, AUTO_INCREMENT=7;`
].join(' ');

sequelize.query(dbsql, {
}).then(result => {
    console.log('Successfully created Users')
}).catch((err) => {
    console.log('Error: ' + err);
})