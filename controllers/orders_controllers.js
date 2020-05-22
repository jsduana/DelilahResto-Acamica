/*---------------------------------------------REQUIREMENTS--------------------------------------------*/
const sequelize = require('../config/db_config');

/*---------------------------------------------ORDERS--------------------------------------------*/
/*-----------------ADD A ORDER-----------------*/
exports.addOne = (req, res) => {
    /*getting all products info to: 
    -make the order description
    -make the order total payment (I dont know if this is needed because the client should know before this info is sent to the back-end)
    -make array of objects to send to the join db products_orders
    */
    if (req.body.payment_method === 'cash' || req.body.payment_method === 'credit card' || req.body.payment_method === 'debit card') {
        if (req.body.payment_method === undefined || req.body.products === undefined || req.body.products[0] === undefined || req.body.products[0].product_id === undefined || req.body.products[0].product_quantity === undefined) {
            res.status(400).json(
                {
                    "error":
                    {
                        "status": "400",
                        "message": "the request is missing information needed to create the order"
                    }
                }
            )
        } else {
            let order_description = "";
            let products_order = [];
            let total = 0;
            async function get() {
                let total_product_quantity = req.body.products.length;
                let product_number = 0;
                for (let i = 0; i < total_product_quantity; i++) {
                    let current_product_id = req.body.products[i].product_id;
                    let current_product_quantity = req.body.products[i].product_quantity;

                    let sql = `SELECT * FROM products WHERE product_id = ?`;
                    await sequelize.query(sql, {
                        replacements: [current_product_id], type: sequelize.QueryTypes.SELECT
                    }).then(result => {
                        if (result[0] === undefined) {
                            res.status(404).json(
                                {
                                    "error":
                                    {
                                        "status": "404",
                                        "message": `one or more of the products sent doesn't exist in our database.`
                                    }
                                }
                            )
                        } else if (isNaN(current_product_quantity)) {
                            res.status(400).json(
                                {
                                    "error":
                                    {
                                        "status": "400",
                                        "message": "one or more of the product quantities sent is not a number"
                                    }
                                }
                            )
                        } else {
                            product_number += 1;
                            order_description += current_product_quantity + "x" + result[0].abbreviation + " ";
                            total += current_product_quantity * (+result[0].price);
                            products_order.push({
                                "product_id": current_product_id,
                                "product_quantity": current_product_quantity,
                                "user_id": req.user[0].user_id
                            })
                            /*Checking for the last iteration so the info can be sent to be inserted in the order and products_orders tables */
                            if (product_number === total_product_quantity) {
                                insert(products_order, order_description, total);
                            }
                        }
                    }).catch((err) => {
                        res.status(500).json(
                            {
                                "error":
                                {
                                    "status": "500",
                                    "message": "Internal Server Error: " + err
                                }
                            }
                        )
                    })
                };
            }
            get();
            function insert(products_order, order_description, total) {
                let order = {
                    status: 'new',
                    date: new Date(),
                    order_description: order_description,
                    payment_method: req.body.payment_method,
                    total: total,
                    user_id: req.user[0].user_id
                };
                let sql = `INSERT INTO orders
                        SET status = :status, date = :date, order_description = :order_description, payment_method = :payment_method, total= :total, user_id = :user_id`;
                sequelize.query(sql, {
                    replacements: order
                }).then(result => {
                    products_order.forEach(product => {
                        product["order_id"] = result[0];
                        let sql = `INSERT INTO products_orders 
                                        SET order_id= :order_id, product_id = :product_id, product_quantity = :product_quantity, user_id = :user_id`;
                        sequelize.query(sql, {
                            replacements: product
                        }).catch((err) => {
                            res.status(500).json(
                                {
                                    "error":
                                    {
                                        "status": "500",
                                        "message": "Internal Server Error: " + err
                                    }
                                }
                            )
                        })
                    })
                    res.status(200).json({ 'message': 'order created', 'order_id': result[0] });
                }).catch((err) => {
                    res.status(500).json(
                        {
                            "error":
                            {
                                "status": "500",
                                "message": "Internal Server Error: " + err
                            }
                        }
                    )
                })
            }
        }
    } else {
        res.status(400).json(
            {
                "error":
                {
                    "status": "400",
                    "message": "payment_method value is incorrect"
                }
            }
        )
    }
}

/*-----------------SEE ALL ORDERS-----------------*/
exports.findAll = (req, res) => {
    function seeAllOrders(sqlQuery) {
        let sql = sqlQuery;
        sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        }).then(all_orders => {
            if (all_orders.length === 0) {
                res.status(404).json(
                    {
                        "error":
                        {
                            "status": "404",
                            "message": "database doesn't have any order yet"
                        }
                    }
                )
            } else {
                let orders = [];
                let order;
                let product;
                function createProduct(i) {
                    product = {
                        product_quantity: all_orders[i].product_quantity,
                        product_id: all_orders[i].product_id,
                        product_name: all_orders[i].product_name,
                        abbreviation: all_orders[i].abbreviation,
                        price: all_orders[i].price,
                        img_url: all_orders[i].img_url,
                        product_description: all_orders[i].product_description
                    }
                }
                function createOrder(i) {
                    order = {
                        order_id: all_orders[i].order_id,
                        status: all_orders[i].status,
                        date: all_orders[i].date,
                        order_description: all_orders[i].order_description,
                        payment_method: all_orders[i].payment_method,
                        total: all_orders[i].total,
                        user_id: all_orders[i].user_id,
                        products: []
                    }
                }
                for (let i = 0; i < all_orders.length; i++) {
                    if (i === 0 || all_orders[i].order_id !== all_orders[i - 1].order_id) {
                        createOrder(i);
                        createProduct(i);
                        order.products.push(product);
                        if (i === (all_orders.length - 1) || all_orders[i].order_id !== all_orders[i + 1].order_id) {
                            orders.push(order);
                        }
                    } else if (i === (all_orders.length - 1) || all_orders[i].order_id !== all_orders[i + 1].order_id) {
                        createProduct(i);
                        order.products.push(product);
                        orders.push(order);
                    } else {
                        createProduct(i);
                        order.products.push(product);
                    }
                }
                res.status(200).json(orders);
            }
        }).catch((err) => {
            res.status(500).json(
                {
                    "error":
                    {
                        "status": "500",
                        "message": "Internal Server Error: " + err
                    }
                }
            )
        })
    }
    if (req.user[0].is_admin === 'TRUE') {
        let sql = `SELECT * FROM orders 
        INNER JOIN products_orders ON products_orders.order_id = orders.order_id 
        INNER JOIN products ON products_orders.product_id = products.product_id`;
        seeAllOrders(sql);
    } else {
        let sql = `SELECT * FROM orders 
        INNER JOIN products_orders ON products_orders.order_id = orders.order_id 
        INNER JOIN products ON products_orders.product_id = products.product_id 
        WHERE orders.user_id = ${req.user[0].user_id}`;
        seeAllOrders(sql);
    }
}

/*-----------------SEE A ORDER-----------------*/
exports.findOne = (req, res) => {
    let sql = `SELECT *
                FROM orders 
                INNER JOIN products_orders ON products_orders.order_id = orders.order_id 
                INNER JOIN products ON products_orders.product_id = products.product_id 
                WHERE orders.order_id = ?`;
    sequelize.query(sql, {
        replacements: [req.params.id], type: sequelize.QueryTypes.SELECT
    }).then(result_order => {
        if (result_order.length === 0) {
            res.status(404).json(
                {
                    "error":
                    {
                        "status": "404",
                        "message": "database doesn't have any order with the id: " + req.params.id
                    }
                }
            )
        } else {
            if (req.user[0].user_id === result_order[0].user_id || req.user[0].is_admin === 'TRUE') {
                let order = {
                    order_id: result_order[0].order_id,
                    status: result_order[0].status,
                    date: result_order[0].date,
                    order_description: result_order[0].order_description,
                    payment_method: result_order[0].payment_method,
                    total: result_order[0].total,
                    user_id: result_order[0].user_id,
                    products: []
                }
                for (let i = 0; i < result_order.length; i++) {
                    let product = {
                        product_quantity: result_order[i].product_quantity,
                        product_id: result_order[i].product_id,
                        product_name: result_order[i].product_name,
                        abbreviation: result_order[i].abbreviation,
                        price: result_order[i].price,
                        img_url: result_order[i].img_url,
                        product_description: result_order[i].product_description
                    }
                    order.products.push(product);
                }
                res.status(200).json(order);
            } else {
                res.status(403).json(
                    {
                        "error":
                        {
                            "status": "403",
                            "message": "user not authorized to see this information"
                        }
                    }
                )
            }
        }
    }).catch((err) => {
        res.status(500).json(
            {
                "error":
                {
                    "status": "500",
                    "message": "Internal Server Error: " + err
                }
            }
        )
    })
}

/*-----------------UPDATE A ORDER-----------------*/
/*only status can be changed*/
exports.updateOne = (req, res) => {
    if (req.body.status === 'new'
        || req.body.status === 'confirmed'
        || req.body.status === 'preparing'
        || req.body.status === 'sending'
        || req.body.status === 'delivered'
        || req.body.status === 'canceled') {

        let sql = `UPDATE orders 
                    SET  status = :status
                    WHERE order_id = :order_id`;

        sequelize.query(sql, {
            replacements: { status: req.body.status, order_id: req.params.id }
        }).then(order => {
            /* the order doenst exists or status was changed to the same value*/
            if (order[0].affectedRows === 0) {
                res.status(400).json(
                    {
                        "error":
                        {
                            "status": "400",
                            "message": "order doesn't exist in our database or the order already had the order state value given in the request"
                        }
                    }
                )
            } else {
                res.status(200).json((`Successfully changed state of the order with the id ${req.params.id} to '${req.body.status}'`));
            }
        }).catch((err) => {
            res.status(500).json(
                {
                    "error":
                    {
                        "status": "500",
                        "message": "Internal Server Error: " + err
                    }
                }
            )
        })
    } else {
        res.status(400).json(
            {
                "error":
                {
                    "status": "400",
                    "message": "status value sent is not valid"
                }
            }
        )
    }
}

/*-----------------DELETE A ORDER-----------------*/
exports.deleteOne = (req, res) => {
    let sql = [
        `DELETE products_orders FROM orders INNER JOIN products_orders ON orders.order_id = products_orders.order_id
            WHERE orders.order_id = ?;`,
        `DELETE orders FROM orders WHERE orders.order_id = ?;`
    ].join(' ');
    sequelize.query(sql, {
        replacements: [req.params.id, req.params.id]
    }).then((order_result) => {
        if (order_result[0][0].affectedRows === 0 && order_result[0][1].affectedRows === 0) {
            res.status(404).json(
                {
                    "error":
                    {
                        "status": "404",
                        "message": "database doesn't have an order with the id: " + req.params.id
                    }
                }
            )
        }
        else {
            res.status(200).json('Successfully deleted order with the id: ' + req.params.id);
        }
    }).catch((err) => {
        res.status(500).json(
            {
                "error":
                {
                    "status": "500",
                    "message": "Internal Server Error: " + err
                }
            }
        )
    })
}