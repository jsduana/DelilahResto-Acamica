SET
    SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";

SET
    AUTOCOMMIT
= 0;

START TRANSACTION;

SET
    time_zone
= "+00:00";

-- Drop Database
DROP DATABASE IF EXISTS delilah_resto;

-- Drop Tables
DROP TABLE IF EXISTS delilah_resto.products_orders;
DROP TABLE IF EXISTS delilah_resto.products;
DROP TABLE IF EXISTS delilah_resto.orders;
DROP TABLE IF EXISTS delilah_resto.users;

-- Database Creation
CREATE DATABASE delilah_resto;

-- Table Creation
CREATE TABLE delilah_resto.users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR
(60) NOT NULL UNIQUE KEY,
    password VARCHAR
(60) NOT NULL,
    full_name VARCHAR
(60) NOT NULL,
    email VARCHAR
(60) NOT NULL UNIQUE KEY,
    phone INT NOT NULL,
    delivery_address VARCHAR
(60) NOT NULL,
    is_admin enum
('FALSE', 'TRUE') NOT NULL DEFAULT 'FALSE'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE delilah_resto.products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR
(60) NOT NULL UNIQUE KEY,
    abbreviation varchar
(8) NOT NULL,
    price FLOAT NOT NULL,
    img_url VARCHAR
(200) NOT NULL,
    product_description VARCHAR
(150) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE delilah_resto.orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    status enum
(
        'new',
        'confirmed',
        'preparing',
        'sending',
        'delivered',
        'canceled'
    ) NOT NULL DEFAULT 'new',
    date DATETIME NOT NULL,
    order_description VARCHAR
(150) NOT NULL,
    payment_method enum
('cash', 'credit card', 'debit card') NOT NULL,
    total FLOAT NOT NULL,
    user_id INT,
    FOREIGN KEY
(user_id) REFERENCES users
(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE delilah_resto.products_orders (
    order_prod_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    product_quantity INT NOT NULL,
    user_id INT,
    FOREIGN KEY
(order_id) REFERENCES orders
(order_id),
    FOREIGN KEY
(product_id) REFERENCES products
(product_id),
    FOREIGN KEY
(user_id) REFERENCES users
(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Inserts into users table
INSERT INTO
    delilah_resto.users
    (
    user_id,
    username,
    password,
    full_name,
    email,
    phone,
    delivery_address,
    is_admin
    )
VALUES
    (
        NULL,
        'jsduana',
        '$2a$10$msjtso3viunyQw4vo.mQve.Dtv5jcBzkBx0P5xyXLLyDVC2FvEWj.',
        'Juan Sebastian Duana',
        'jsduana@gmail.com',
        154603705,
        'Av. del Valle 369',
        'TRUE'
    ),
    (
        NULL,
        'nflanders',
        '$2a$10$ogzcOCUk/tEoLlDqPa9FxucfVJjk7FnWYrkt/8jw1/g4ZTty0k8uu',
        'Ned Flanders',
        'nedflanders@gmail.com',
        154477902,
        'Avenida Siempreviva 780',
        'FALSE'
    ),
    (
        NULL,
        'sskinner',
        '$2a$10$kHVNeEyA9FLe9OXZzsNM5.oGtDb/gBfAG3fLJQsqsTOlsn5oqB95W',
        'Seymour Skinner',
        'sskinner@gmail.com',
        154477902,
        'Escuela Primaria de Springfield 598',
        'FALSE'
    ),
    (
        NULL,
        'mszyslak',
        '$2a$10$Xo2y3/8blGXDWuLDPNcgsevG5Z4jAOu0eOQwS.DMz0fcHrm9TdX.a',
        'Moe Szyslak',
        'mszyslak@gmail.com',
        154477902,
        'Calle 
Falsa 123',
        'FALSE'
    ),
    (
        NULL,
        'mburns',
        '$2a$10$uZ.8DkuSILgVCB6XMmgt3.y1LCbli6TqTYcN1QkvWWbE2qeJMI14S',
        'Montgomery Burns',
        'mburns@gmail.com',
        154477902,
        'Planta de energía nuclear 19',
        'FALSE'
    ),
    (
        NULL,
        'hsimpson',
        '$2a$10$xoWSqdJm4xT1XPKOnnGg2O8rF7UBJeA.Dvswmfdrzlj.YCUcs7SP.',
        'Homero Simpson',
        'homerosimpsons@gmail.com',
        154123456,
        'Avenida Siempreviva 742',
        'FALSE'
    );

ALTER TABLE
    delilah_resto.users
MODIFY
    user_id int
(64) AUTO_INCREMENT NOT NULL,
    AUTO_INCREMENT = 7;

-- Inserts into products table    
INSERT INTO delilah_resto.products
    (product_id, product_name, abbreviation, price, img_url, product_description)
VALUES
    (NULL, 'Hamburguesa Veggie', 'HamVegg', 300, 'https://images.unsplash.com/photo-1540265556701-ae209ac395cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', 'Hamburguesa vegetariana con queso, lechuga y tomate'),
    (NULL, 'Hamburguesa Doble con Cheddar', 'HamDob', 370, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Dos medallones de carne con cheddar y bacon entre 2 panes Brioche'),
    (NULL, 'Hamburguesa Clásica', 'HamClas', 310, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Un medallon de carne con cheddar entre 2 panes Brioche'),
    (NULL, 'Hamburguesa de Pollo', 'HamPol', 340, 'https://images.unsplash.com/photo-1566217688581-b2191944c2f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Un medallon de pollo con cheddar entre 2 panes Brioche'),
    (NULL, 'Hamburguesa con Bacon', 'HamBac', 400, 'https://images.unsplash.com/photo-1565060050382-f180053db6fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Un medallon de carne  con cheddar y bacon entre 2 panes Brioche'),
    (NULL, 'Papas Fritas', 'Fritas', 95, 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Una porción de papas fritas, ricas y deliciosas'),
    (NULL, 'Pizza grande de muzzarella', 'PizzaMuz', 350, 'https://images.unsplash.com/photo-1545016803-a7e357a737e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Pizza grande de muzzarella de 8 porciones'),
    (NULL, 'Pizza grande de rúcula', 'PizzaRuc', 420, 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Pizza grande de muzzarella con rúcula y tomates cherry de 8 porciones'),
    (NULL, 'Pizza grande de cuatro quesos', 'Pizza4Q', 420, 'https://images.unsplash.com/photo-1566843971939-1fe9e277a0c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Pizza grande de cuatro quesos de 8 porciones'),
    (NULL, 'Sandwich Veggie', 'SandVegg', 200, 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Sandwich de berenjenas y zucchinis grillados, palta, tomate, queso dambo y un aderezo a base de queso crema, salsa de soja y semillas de sésamo'),
    (NULL, 'Sandwich de Carne', 'SandCarn', 250, 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Sandwich de carne con cebolla caramelizada, tomate y lechuga'),
    (NULL, 'Sandwich de Jamón y Queso', 'SandJyQ', 180, 'https://images.unsplash.com/photo-1520174691701-bc555a3404ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', 'Sandwich relleno con jamón y queso'),
    (NULL, 'Tostado de Jámon y Queso', 'TostJyQ', 200, 'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Sandwich tostado relleno con jamón y queso'),
    (NULL, 'Bagel de Salmón', 'BagSalm', 150, 'https://images.unsplash.com/photo-1572137162111-fc6e04414e21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Bagel de Salmon Ahumado'),
    (NULL, 'Bagel con Pollo', 'BagPol', 120, 'https://images.unsplash.com/photo-1554474217-1c86a5163807?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Bagel con pollo, queso, tomates cherry y rúcula'),
    (NULL, 'Ensalada Veggie', 'EnsVegg', 220, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Ensalada con tomate, huevo, remolacha y choclo'),
    (NULL, 'Ensalada Cesar', 'EnsCes', 270, 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Ensalada de lechuga romana con salsa césar, crutones tostados y queso parmesano'),
    (NULL, 'Ensalada de Lechuga y Tomate', 'EnsLyT', 220, 'https://images.unsplash.com/photo-1569760142069-bc6838de16c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Ensalada de lechuga romana con tomate'),
    (NULL, 'Taco de Carne', 'TacCarn', 230, 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Tacos de pollo los cuales llevan morron rojo, cebolla y tomate'),
    (NULL, 'Taco de Pollo', 'TacPol', 200, 'https://images.unsplash.com/photo-1568106690101-fd6822e876f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Tacos de pollo los cuales llevan morron rojo, cebolla, cilantro y un poco de limón'),
    (NULL, 'Taco Veggie', 'TacVegg', 180, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Tacos vegetarianos con harina de maiz rellenos de guacamole'),
    (NULL, 'Taco de Carne Picante', 'TacPic', 220, 'https://images.unsplash.com/photo-1574782091246-c65ed4510300?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Tacos de carne picada con chile'),
    (NULL, 'Nachos con Carne', 'NacCarn', 175, 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Nachos con carne picada y queso'),
    (NULL, 'Nachos con Salsas Veggie', 'NacVeg', 160, 'https://images.unsplash.com/photo-1523634700860-90d0ef74f137?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Deliciosos nachos veganos con carne picada de soja texturizada'),
    (NULL, 'Lemon Pie (Porción)', 'LemPie', 100, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Una porción de lemon pie'),
    (NULL, 'Tarta de Arándanos (Porción)', 'TArand', 100, 'https://images.unsplash.com/photo-1476887334197-56adbf254e1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Una porción de tarta de arándanos'),
    (NULL, 'Tarta de Peras (Porción)', 'TPera', 100, 'https://images.unsplash.com/photo-1562007908-72e11e85b1cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Una porción de tarta de pera'),
    (NULL, 'Cheesecake con Salsa de Caramelo (Porción)', 'CheeCar', 110, 'https://images.unsplash.com/photo-1547414368-ac947d00b91d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Una porción de Cheesecake con salsa de caramelo suave y cremoso'),
    (NULL, 'Cheesecake de Arándanos (Porción)', 'CheeAran', 110, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Una porción de Cheesecake de arándanos suave y cremoso'),
    (NULL, 'Cheesecake de Chocolate (Porción)', 'CheeChoc', 110, 'https://images.unsplash.com/photo-1508737804141-4c3b688e2546?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Una porción de Cheesecake de chocolate suave y cremoso'),
    (NULL, 'Cheesecake de Mango (Porción)', 'CheeMang', 110, 'https://images.unsplash.com/photo-1570781148825-b9c37b9531e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Una porción de Cheesecake de mango suave y cremoso'),
    (NULL, 'Cerveza (500ml)', 'CervLat', 90, 'https://images.unsplash.com/photo-1580805375657-ea29c6624dd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Cerveza Imperial Lager de 500 ml su aroma frutado y su inconfundible sabor fresco e intenso la convierten en la auténtica cerveza especial Argentina'),
    (NULL, 'Cerveza (1l)', 'CervBot', 140, 'https://images.unsplash.com/photo-1499424474736-c040d0665d84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Cerveza Imperial Lager de 1 l su aroma frutado y su inconfundible sabor fresco e intenso la convierten en la auténtica cerveza especial Argentina'),
    (NULL, 'Limonada (600ml)', 'BebLim', 90, 'https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Limonada con menta y jengibre de 600 ml'),
    (NULL, 'Pomelada (600ml)', 'BebPom', 90, 'https://images.unsplash.com/photo-1500631195312-e3a9a5819f92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Pomelo con menta y jengibre de 600 ml'),
    (NULL, 'Pepsi (330ml)', 'PepsiLat', 50, 'https://images.unsplash.com/photo-1546695259-ad30ff3fd643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Gaseosa saborizada sabor Cola de 300 ml'),
    (NULL, 'Pepsi (500ml)', 'PepsiBot', 80, 'https://images.unsplash.com/photo-1558456210-a51b371a4b63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Gaseosa saborizada sabor Cola de 500 ml'),
    (NULL, 'Coca-Cola (330ml)', 'CocaLat', 50, 'https://images.unsplash.com/photo-1571814582435-672b9e1df15d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Siente el sabor de Coca-Cola Original con su presentación en botella de 300 ml'),
    (NULL, 'Coca-Cola (500ml)', 'CocaBot', 80, 'https://images.unsplash.com/flagged/photo-1567861248188-7f920f024c8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Siente el sabor de Coca-Cola Original con su presentación en botella de 500 ml'),
    (NULL, 'Agua mineral', 'Agua', 60, 'https://images.unsplash.com/photo-1546498159-9a2fac87e770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', 'Agua mineral sin gas 500 ml');
ALTER TABLE delilah_resto.products
        MODIFY product_id int
(64) AUTO_INCREMENT NOT NULL, AUTO_INCREMENT=41;

-- Inserts into orders table  
INSERT INTO delilah_resto.orders
    (order_id, status, date, order_description, payment_method, total, user_id)
VALUES
    (NULL, 'delivered', NOW(), '1xHamVegg 1xAgua', 'cash', 360, 1),
    (NULL, 'canceled', NOW(), '1xTacCarn', 'debit card', 230, 2),
    (NULL, 'sending', NOW(), '3xHamDob 2xCervLat 1xAgua', 'cash', 1350, 3),
    (NULL, 'preparing', NOW(), '2xTacPol 2xBebLim', 'credit card', 580, 4),
    (NULL, 'confirmed', NOW(), '1xPizzaMuz', 'cash', 350, 5),
    (NULL, 'new', NOW(), '1xSandVegg 1xEnsCesar 2xCheeChoc 1xBebLim', 'debit card', 780, 6),
    (NULL, 'delivered', NOW(), '1xPizzaRuc 1xCervBot', 'cash', 560, 3),
    (NULL, 'new', NOW(), '1xTacPic', 'cash', 220, 4),
    (NULL, 'delivered', NOW(), '2xHamDob 1xHamVegg 3xFritas 6xCervLat', 'credit card', 1865, 1),
    (NULL, 'sending', NOW(), '1xBagPol 1xNachCarn 1xCheeAran 2xBebPom', 'cash', 585, 2),
    (NULL, 'new', NOW(), '1xPizza4Q 1xCheeChoc 2xBebPom', 'debit card', 710, 6),
    (NULL, 'delivered', NOW(), '2xSandJyQ 2xCocaLat', 'credit card', 520, 5),
    (NULL, 'delivered', NOW(), '1xBagSalm', 'cash', 150, 3),
    (NULL, 'sending', NOW(), '2xHamDob 2xHamBac 4xFritas 8xCervLat', 'credit card', 2640, 2),
    (NULL, 'delivered', NOW(), '2xTostJyQ 1xLemPie 1xAgua', 'cash', 560, 5);
ALTER TABLE delilah_resto.orders
        MODIFY order_id int
(64) AUTO_INCREMENT NOT NULL, AUTO_INCREMENT=16;


-- Inserts into products orders table  
INSERT INTO delilah_resto.products_orders
    (order_prod_id, order_id, product_id, product_quantity, user_id)
VALUES
    (NULL, 1, 1, 1, 1),
    (NULL, 1, 40, 1, 1),
    (NULL, 2, 19, 1, 2),
    (NULL, 3, 2, 3, 3),
    (NULL, 3, 32, 2, 3),
    (NULL, 3, 40, 1, 3),
    (NULL, 4, 20, 2, 4),
    (NULL, 4, 34, 2, 4),
    (NULL, 5, 7, 1, 5),
    (NULL, 6, 10, 1, 6),
    (NULL, 6, 17, 1, 6),
    (NULL, 6, 30, 2, 6),
    (NULL, 6, 34, 1, 6),
    (NULL, 7, 8, 1, 3),
    (NULL, 7, 33, 1, 3),
    (NULL, 8, 22, 1, 4),
    (NULL, 9, 2, 2, 1),
    (NULL, 9, 1, 1, 1),
    (NULL, 9, 6, 3, 1),
    (NULL, 9, 32, 6, 1),
    (NULL, 10, 15, 1, 2),
    (NULL, 10, 23, 1, 2),
    (NULL, 10, 29, 1, 2),
    (NULL, 10, 35, 2, 2),
    (NULL, 11, 9, 1, 6),
    (NULL, 11, 30, 1, 6),
    (NULL, 11, 35, 2, 6),
    (NULL, 12, 12, 2, 5),
    (NULL, 12, 39, 2, 5),
    (NULL, 13, 14, 1, 3),
    (NULL, 14, 2, 2, 2),
    (NULL, 14, 5, 2, 2),
    (NULL, 14, 6, 4, 2),
    (NULL, 14, 32, 8, 2),
    (NULL, 15, 13, 2, 5),
    (NULL, 15, 25, 1, 5),
    (NULL, 15, 40, 1, 5);