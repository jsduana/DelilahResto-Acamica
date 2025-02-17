/*---------------------------------------------REQUIREMENTS--------------------------------------------*/
const sequelize = require('../config/db_config');

/*---------------------------------------------PRODUCTS--------------------------------------------*/
/*-----------------ADD A PRODUCT-----------------*/
exports.addOne = (req, res) => {
    let missingInfo = [];
    const { product_name = '', abbreviation = '', price = '', img_url = '', product_description = ''  } = req.body;
    Object.values(req.body).forEach(value => {
     if(!value) {
        missingInfo.push(value)
     }
    })
    if(!missingInfo.length) {
        let sql = `SELECT  *
                        FROM products 
                        WHERE product_name = ?`;
        sequelize.query(sql, {
            replacements: [req.body.product_name], type: sequelize.QueryTypes.SELECT
        }).then(repeated_product => {
            if (repeated_product.length === 0) {
                let new_product = {
                    product_name: req.body.product_name,
                    abbreviation: req.body.abbreviation,
                    price: req.body.price,
                    img_url: req.body.img_url,
                    product_description: req.body.product_description
                };
                let sql = `INSERT  INTO products 
                                SET product_name = :product_name,
                                    abbreviation = :abbreviation,
                                    price        = :price, 
                                    img_url     = :img_url, 
                                    product_description = :product_description`;
                sequelize.query(sql, {
                    replacements: new_product
                }).then(result => {
                    new_product.product_id = result[0].insertId;
                    res.status(200).json(new_product);
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
                //error handling when there is a repeated product_name 
                let product_name = 0;
                //checking what is repeated
                repeated_product.forEach(oneProduct => {
                    if (oneProduct.product_name === req.body.product_name) {
                        product_name++;
                    }
                });
                //sending error message
                if (product_name > 0) {
                    res.status(400).json(
                        {
                            "error":
                            {
                                "status": "400",
                                "message": "product with this product name already exists in our database"
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
    } else {
        res.status(400).json(
            {
                "error":
                {
                    "status": "400",
                    "message": "the request is missing the following information: " + missingInfo
                }
            }
        )
    }
}

/*-----------------SEE ALL PRODUCTS-----------------*/
exports.findAll = (req, res) => {
    let sql = 'SELECT * FROM products';
    sequelize.query(sql, {
        replacements: [req.params.id], type: sequelize.QueryTypes.SELECT
    }).then(products => {
        if (products.length === 0) {
            res.status(404).json(
                {
                    "error":
                    {
                        "status": "404",
                        "message": "database doesn't have any product yet"
                    }
                }
            )
        } else {
            res.status(200).json(products);
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

/*-----------------SEE A PRODUCT-----------------*/
exports.findOne = (req, res) => {
    let sql = `SELECT * FROM products 
                WHERE product_id = ?`;
    sequelize.query(sql, {
        replacements: [req.params.id], type: sequelize.QueryTypes.SELECT
    }).then(product => {
        if (product.length === 0) {
            res.status(404).json(
                {
                    "error":
                    {
                        "status": "404",
                        "message": `product with the id ${req.params.id} doens't exist in our database.`
                    }
                }
            )
        } else {
            res.status(200).json(product[0]);
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

/*-----------------UPDATE A PRODUCT-----------------*/
exports.updateOne = (req, res) => {
    let sql = `SELECT * FROM products 
                WHERE product_id = ?`;
    sequelize.query(sql, {
        replacements: [req.params.id], type: sequelize.QueryTypes.SELECT
    }).then(product => {
        if (product.length === 0) {
            res.status(404).json(
                {
                    "error":
                    {
                        "status": "404",
                        "message": `product with the id ${req.params.id} doens't exist in our database.`
                    }
                }
            )
        } else {
            function updateProduct() {
                let current_product = product;
                /*Conditional in case not all the info is sent in the body is added*/
                let changed_product = {
                    product_id: current_product[0].product_id,
                    product_name: req.body.product_name !== undefined ? req.body.product_name : current_product[0].product_name,
                    abbreviation: req.body.abbreviation !== undefined ? req.body.abbreviation : current_product[0].abbreviation,
                    price: req.body.price !== undefined ? req.body.price : current_product[0].price,
                    img_url: req.body.img_url !== undefined ? req.body.img_url : current_product[0].img_url,
                    product_description: req.body.product_description !== undefined ? req.body.product_description : current_product[0].product_description
                };
                let sql = `UPDATE products 
                SET product_name = :product_name, abbreviation = :abbreviation, price = :price, img_url = :img_url, product_description = :product_description
                WHERE product_id = :product_id `;
                sequelize.query(sql, {
                    replacements: changed_product
                }).then(update_result => {
                    res.status(200).json(changed_product);
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

            if (req.body.product_name !== undefined) {
                let sql = `SELECT * FROM products 
                            WHERE  (product_name = ? AND  product_id != ?)`;
                sequelize.query(sql, {
                    replacements: [req.body.product_name, req.params.id], type: sequelize.QueryTypes.SELECT
                }).then(repeated_product => {
                    if (repeated_product.length === 0) {
                        updateProduct();
                    } else {
                        //error handling when there is/are repeated product_name and/or product_description
                        let product_name = 0;
                        //checking what is repeated
                        repeated_product.forEach(oneProduct => {
                            if (oneProduct.product_name === req.body.product_name) {
                                product_name++;
                            }
                        });
                        //sending error message
                        if (product_name > 0) {
                            res.status(400).json(
                                {
                                    "error":
                                    {
                                        "status": "400",
                                        "message": "product with this product name already exists in our database"
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
            } else {
                updateProduct();
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

/*-----------------DELETE A PRODUCT-----------------*/
exports.deleteOne = (req, res) => {
    let sql = `DELETE FROM products 
                WHERE product_id = ?`;
    sequelize.query(sql, {
        replacements: [req.params.id]
    }).then(product => {
        if (product[0].affectedRows === 0) {
            res.status(404).json(
                {
                    "error":
                    {
                        "status": "404",
                        "message": `product with the id ${req.params.id} doens't exist in our database.`
                    }
                }
            )
        } else {
            res.status(200).json(`Successfully delete product with the id: ${req.params.id}`);
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