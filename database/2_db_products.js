/*---------------------------------------------REQUIREMENTS--------------------------------------------*/
const db_data = require('../database/db_connection_data');

const sequelize = require('../database/db_config');

/*---------------------------------------------CREATE PRODUCTS--------------------------------------------*/
let dbsql = [
    //`SET FOREIGN_KEY_CHECKS = 0;`,
    //`TRUNCATE TABLE ${db_data.conf_db_name}.products;`,
    //`SET FOREIGN_KEY_CHECKS = 1;`,
    `INSERT INTO ${db_data.conf_db_name}.products
        (product_id, name, price, img_url, description, is_disabled) VALUES      
        (NULL, 'Hamburguesa Veggie', 300, 'https://images.unsplash.com/photo-1540265556701-ae209ac395cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60','Hamburguesa vegetariana con queso, lechuga y tomate', FALSE),
        (NULL, 'Hamburguesa Doble con Cheddar', 370, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Dos medallones de carne con cheddar y bacon entre 2 panes Brioche', FALSE),
        (NULL, 'Hamburguesa Clásica', 310, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Un medallon de carne con cheddar entre 2 panes Brioche', FALSE),
        (NULL, 'Hamburguesa de Pollo', 340, 'https://images.unsplash.com/photo-1566217688581-b2191944c2f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Un medallon de pollo con cheddar entre 2 panes Brioche', FALSE),
        (NULL, 'Hamburguesa con Bacon', 400, 'https://images.unsplash.com/photo-1565060050382-f180053db6fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Un medallon de carne  con cheddar y bacon entre 2 panes Brioche', FALSE),
        (NULL, 'Papas Fritas', 95, 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Una porción de papas fritas, ricas y deliciosas', FALSE),
        (NULL, 'Pizza grande de muzzarella', 350, 'https://images.unsplash.com/photo-1545016803-a7e357a737e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Pizza grande de muzzarella de 8 porciones', FALSE),
        (NULL, 'Pizza grande de rúcula', 420, 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Pizza grande de muzzarella con rúcula y tomates cherry de 8 porciones', FALSE),
        (NULL, 'Pizza grande de cuatro quesos', 420, 'https://images.unsplash.com/photo-1566843971939-1fe9e277a0c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Pizza grande de cuatro quesos de 8 porciones', FALSE),
        (NULL, 'Sandwich Veggie', 200, 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Sandwich de berenjenas y zucchinis grillados, palta, tomate, queso dambo y un aderezo a base de queso crema, salsa de soja y semillas de sésamo', FALSE),
        (NULL, 'Sandwich de Carne', 250, 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Sandwich de carne con cebolla caramelizada, tomate y lechuga', FALSE),
        (NULL, 'Sandwich de Jamón y Queso', 180, 'https://images.unsplash.com/photo-1520174691701-bc555a3404ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60','Sandwich relleno con jamón y queso', FALSE),
        (NULL, 'Tostado de Jámon y Queso', 200, 'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Sandwich tostado relleno con jamón y queso', FALSE),
        (NULL, 'Bagel de Salmón', 150, 'https://images.unsplash.com/photo-1572137162111-fc6e04414e21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Bagel de Salmon Ahumado', FALSE),
        (NULL, 'Bagel con Pollo', 120, 'https://images.unsplash.com/photo-1554474217-1c86a5163807?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Bagel con pollo, queso, tomates cherry y rúcula', FALSE),
        (NULL, 'Ensalada Veggie', 220, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Ensalada con tomate, huevo, remolacha y choclo', FALSE),
        (NULL, 'Ensalada Cesar', 270, 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Ensalada de lechuga romana con salsa césar, crutones tostados y queso parmesano', FALSE),
        (NULL, 'Ensalada de Lechuga y Tomate', 220, 'https://images.unsplash.com/photo-1569760142069-bc6838de16c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Ensalada de lechuga romana con tomate', FALSE),
        (NULL, 'Taco de Carne', 230, 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Tacos de pollo los cuales llevan morron rojo, cebolla y tomate', FALSE),
        (NULL, 'Taco de Pollo', 200, 'https://images.unsplash.com/photo-1568106690101-fd6822e876f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Tacos de pollo los cuales llevan morron rojo, cebolla, cilantro y un poco de limón', FALSE),
        (NULL, 'Taco Veggie', 180, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Tacos vegetarianos con harina de maiz rellenos de guacamole', FALSE),
        (NULL, 'Taco de Carne Picante', 220, 'https://images.unsplash.com/photo-1574782091246-c65ed4510300?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Tacos de carne picada con chile', FALSE),
        (NULL, 'Nachos con Carne', 175, 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Nachos con carne picada y queso', FALSE),
        (NULL, 'Nachos con Salsas Veggie', 160, 'https://images.unsplash.com/photo-1523634700860-90d0ef74f137?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Deliciosos nachos veganos con carne picada de soja texturizada', FALSE),
        (NULL, 'Lemon Pie (Porción)', 100, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Una porción de lemon pie', FALSE),
        (NULL, 'Tarta de Arándanos (Porción)', 100, 'https://images.unsplash.com/photo-1476887334197-56adbf254e1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Una porción de tarta de arándanos', FALSE),
        (NULL, 'Tarta de Peras (Porción)', 100, 'https://images.unsplash.com/photo-1562007908-72e11e85b1cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Una porción de tarta de pera', FALSE),
        (NULL, 'Cheesecake con Salsa de Caramelo (Porción)', 110, 'https://images.unsplash.com/photo-1547414368-ac947d00b91d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Una porción de Cheesecake con salsa de caramelo suave y cremoso', FALSE),
        (NULL, 'Cheesecake de Arándanos (Porción)', 110, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Una porción de Cheesecake de arándanos suave y cremoso', FALSE),
        (NULL, 'Cheesecake de Chocolate (Porción)', 110, 'https://images.unsplash.com/photo-1508737804141-4c3b688e2546?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Una porción de Cheesecake de chocolate suave y cremoso', FALSE),
        (NULL, 'Cheesecake de Mango (Porción)', 110, 'https://images.unsplash.com/photo-1570781148825-b9c37b9531e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Una porción de Cheesecake de mango suave y cremoso', FALSE),
        (NULL, 'Cerveza (500ml)', 90, 'https://images.unsplash.com/photo-1580805375657-ea29c6624dd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Cerveza Imperial Lager de 500 ml su aroma frutado y su inconfundible sabor fresco e intenso la convierten en la auténtica cerveza especial Argentina', FALSE),
        (NULL, 'Cerveza (1l)', 140, 'https://images.unsplash.com/photo-1499424474736-c040d0665d84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Cerveza Imperial Lager de 1 l su aroma frutado y su inconfundible sabor fresco e intenso la convierten en la auténtica cerveza especial Argentina', FALSE),
        (NULL, 'Limonada (600ml)', 90, 'https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Limonada con menta y jengibre de 600 ml', FALSE),
        (NULL, 'Pomelada (600ml)', 90, 'https://images.unsplash.com/photo-1500631195312-e3a9a5819f92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Pomelo con menta y jengibre de 600 ml', FALSE),
        (NULL, 'Pepsi (330ml)', 50, 'https://images.unsplash.com/photo-1546695259-ad30ff3fd643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Gaseosa saborizada sabor Cola de 300 ml', FALSE),
        (NULL, 'Pepsi (500ml)', 80, 'https://images.unsplash.com/photo-1558456210-a51b371a4b63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Gaseosa saborizada sabor Cola de 500 ml', FALSE),
        (NULL, 'Coca-Cola (330ml)', 50, 'https://images.unsplash.com/photo-1571814582435-672b9e1df15d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Siente el sabor de Coca-Cola Original con su presentación en botella de 300 ml', FALSE),
        (NULL, 'Coca-Cola (500ml)', 80, 'https://images.unsplash.com/flagged/photo-1567861248188-7f920f024c8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60','Siente el sabor de Coca-Cola Original con su presentación en botella de 500 ml', FALSE),
        (NULL, 'Agua mineral', 60, 'https://images.unsplash.com/photo-1546498159-9a2fac87e770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60','Agua mineral sin gas 500 ml', FALSE);`,
    `ALTER TABLE ${db_data.conf_db_name}.products
        MODIFY product_id int(64) AUTO_INCREMENT NOT NULL, AUTO_INCREMENT=41;`,
].join(' ');

sequelize.query(dbsql, {
}).then(result => {
    console.log('Successfully created Products!')
}).catch((err) => {
    console.log('Error: ' + err);
})