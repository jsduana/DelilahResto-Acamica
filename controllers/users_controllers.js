/*---------------------------------------------REQUIREMENTS--------------------------------------------*/
const sequelize = require('../config/db_config');
const reqs = require('../config/config');

/*---------------------------------------------USERS--------------------------------------------*/
/*-----------------ADD A USER-----------------*/
exports.addOne = (req, res) => {
    let missingInfo = [];
    const { username = '', password = '', full_name = '', email = '', phone = '', delivery_address = '' } = req.body;
    Object.values(req.body).forEach(value => {
        if (!value) {
            missingInfo.push(value)
        }
    })
    if (!missingInfo.length) {
        function validateEmail(email) {
            let emailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailregex.test(email);
        }
        //check if is a valid email adress with regulaar expressions
        if (validateEmail(req.body.email)) {
            let sql = `SELECT username, full_name, email, phone, delivery_address, is_admin 
                                FROM users 
                                WHERE username = ? OR email = ?`;
            sequelize.query(sql, {
                replacements: [req.body.username, req.body.email], type: sequelize.QueryTypes.SELECT
            }).then(repeated_user => {
                if (repeated_user.length === 0) {
                    /*hashing password before sending information*/
                    reqs.bcrypt.genSalt(reqs.saltRounds, function (err, salt) {
                        reqs.bcrypt.hash(req.body.password, salt, function (err, hash) {
                            let user = {
                                user_id: null,
                                username: req.body.username,
                                password: hash,
                                full_name: req.body.full_name,
                                email: req.body.email,
                                phone: req.body.phone,
                                delivery_address: req.body.delivery_address,
                                is_admin: 'FALSE'
                            };
                            let sql = `INSERT INTO users VALUES (:user_id, :username, :password, :full_name, :email, :phone, :delivery_address, :is_admin)`;
                            sequelize.query(sql, {
                                replacements: user
                            }).then(result => {
                                user.user_id = result[0];
                                delete user.password;
                                res.status(200).json(user);
                                /*it should also return the token so it can be already logged in ?*/
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
                        });
                    });
                } else {
                    //error handling when there is/are repeated username and/or email
                    let email = 0;
                    let name = 0;
                    //checking what is repeated
                    repeated_user.forEach(oneUser => {
                        if (oneUser.username === req.body.username && oneUser.email === req.body.email) {
                            email++;
                            name++;
                        } else if (oneUser.username === req.body.username) {
                            name++;
                        } else if (oneUser.email === req.body.email) {
                            email++;
                        }
                    });
                    //sending error message
                    if (email > 0 && name > 0) {
                        res.status(400).json(
                            {
                                "error":
                                {
                                    "status": "400",
                                    "message": "user with this username and email already exists in our database"
                                }
                            }
                        )
                    } else if (name > 0) {
                        res.status(400).json(
                            {
                                "error":
                                {
                                    "status": "400",
                                    "message": "user with this username already exists in our database"
                                }
                            }
                        )
                    } else if (email > 0) {
                        res.status(400).json(
                            {
                                "error":
                                {
                                    "status": "400",
                                    "message": "user with this email already exists in our database"
                                }
                            }
                        )
                    } else {
                        res.status(400).json(
                            {
                                "error":
                                {
                                    "status": "400",
                                    "message": "user with this username or email already exists in our database"
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
                        "message": "email adress sent in the request is not valid"
                    }
                }
            )
        }
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

/*-----------------ADD AN ADMIN-----------------*/
exports.addAdmin = (req, res) => {
    //error message in case of missing required info 422 or 400?
    let missingInfo = [];
    const { username = '', password = '', full_name = '', email = '', phone = '', delivery_address = '' } = req.body;
    Object.values(req.body).forEach(value => {
        if (!value) {
            missingInfo.push(value)
        }
    })
    if (!missingInfo.length) {
        function validateEmail(email) {
            let emailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailregex.test(email);
        }
        //check if is a valid email adress with regulaar expressions
        if (validateEmail(req.body.email)) {
            let sql = `SELECT username, full_name, email, phone, delivery_address, is_admin 
                                FROM users 
                                WHERE username = ? OR email = ?`;
            sequelize.query(sql, {
                replacements: [req.body.username, req.body.email], type: sequelize.QueryTypes.SELECT
            }).then(repeated_user => {
                if (repeated_user.length === 0) {
                    /*hashing password before sending information*/
                    reqs.bcrypt.genSalt(reqs.saltRounds, function (err, salt) {
                        reqs.bcrypt.hash(req.body.password, salt, function (err, hash) {
                            let user = {
                                user_id: null,
                                username: req.body.username,
                                password: hash,
                                full_name: req.body.full_name,
                                email: req.body.email,
                                phone: req.body.phone,
                                delivery_address: req.body.delivery_address,
                                is_admin: 'TRUE'
                            };
                            let sql = `INSERT INTO users VALUES (:user_id, :username, :password, :full_name, :email, :phone, :delivery_address, :is_admin)`;
                            sequelize.query(sql, {
                                replacements: user
                            }).then(result => {
                                user.user_id = result[0];
                                delete user.password;
                                res.status(200).json(user);
                                /*it should also return the token so it can be already logged in ?*/
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
                        });
                    });
                } else {
                    //error handling when there is/are repeated username and/or email
                    let email = 0;
                    let name = 0;
                    //checking what is repeated
                    repeated_user.forEach(oneUser => {
                        if (oneUser.username === req.body.username && oneUser.email === req.body.email) {
                            email++;
                            name++;
                        } else if (oneUser.username === req.body.username) {
                            name++;
                        } else if (oneUser.email === req.body.email) {
                            email++;
                        }
                    });
                    //sending error message
                    if (email > 0 && name > 0) {
                        res.status(400).json(
                            {
                                "error":
                                {
                                    "status": "400",
                                    "message": "user with this username and email already exists in our database"
                                }
                            }
                        )
                    } else if (name > 0) {
                        res.status(400).json(
                            {
                                "error":
                                {
                                    "status": "400",
                                    "message": "user with this username already exists in our database"
                                }
                            }
                        )
                    } else if (email > 0) {
                        res.status(400).json(
                            {
                                "error":
                                {
                                    "status": "400",
                                    "message": "user with this email already exists in our database"
                                }
                            }
                        )
                    } else {
                        res.status(400).json(
                            {
                                "error":
                                {
                                    "status": "400",
                                    "message": "user with this username or email already exists in our database"
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
                        "message": "email adress sent in the request is not valid"
                    }
                }
            )
        }
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

/*-----------------SEE ALL USERS-----------------*/
exports.findAll = (req, res) => {
    let sql = `SELECT user_id, username, password, full_name, email, phone, delivery_address, is_admin FROM users`;
    sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT
    }).then(all_users => {
        if (all_users.length === 0) {
            res.status(404).json(
                {
                    "error":
                    {
                        "status": "404",
                        "message": "database doesn't have any users yet"
                    }
                }
            )
        } else {
            res.status(200).json(all_users);
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

/*-----------------SEE A USER-----------------*/
exports.findOne = (req, res) => {
    if (req.user[0].user_id == req.params.id || req.user[0].is_admin === 'TRUE') {
        let sql = `SELECT user_id, username, password, full_name, email, phone, delivery_address, is_admin 
                        FROM users 
                        WHERE user_id = ?`;
        sequelize.query(sql, {
            replacements: [req.params.id], type: sequelize.QueryTypes.SELECT
        }).then(user => {
            if (user.length === 0) {
                res.status(404).json(
                    {
                        "error":
                        {
                            "status": "404",
                            "message": `user with the id ${req.params.id} doens't exist in our database.`
                        }
                    }
                )
            } else {
                res.status(200).json(user[0]);
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

/*-----------------UPDATE A USER-----------------*/
exports.updateOne = (req, res) => {
    if (req.user[0].user_id == req.params.id) {
        function validateEmail(email) {
            let emailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailregex.test(email);
        }
        //check if is a valid email adress with regulaar expressions
        if (req.body.email === undefined || validateEmail(req.body.email)) {
            /*Search for the current user object*/
            let sql = `SELECT user_id, username, password, full_name, email, phone, delivery_address, is_admin
                        FROM users 
                        WHERE user_id = ?`;
            sequelize.query(sql, {
                replacements: [req.params.id], type: sequelize.QueryTypes.SELECT
            }).then(result => {
                if (result.length > 0) {
                    /*hashed password sent, if nothing is sent in the req.body.password it simply doesn't send it, so the password stays hashed as before*/
                    reqs.bcrypt.genSalt(reqs.saltRounds, function (err, salt) {
                        reqs.bcrypt.hash(req.body.password, salt, function (err, hash) {
                            //created general function to update user
                            function updateUser() {
                                let current_user = result;
                                /*Added conditional in case the request body doesnt send all the users information, in the case of a info not being given it sends the same info that was already in the db*/
                                let changed_user = {
                                    user_id: req.params.id,
                                    username: req.body.username !== undefined ? req.body.username : current_user[0].username,
                                    password: req.body.password !== undefined ? hash : current_user[0].password,
                                    full_name: req.body.full_name !== undefined ? req.body.full_name : current_user[0].full_name,
                                    email: req.body.email !== undefined ? req.body.email : current_user[0].email,
                                    phone: req.body.phone !== undefined ? req.body.phone : current_user[0].phone,
                                    delivery_address: req.body.delivery_address !== undefined ? req.body.delivery_address : current_user[0].delivery_address,
                                    is_admin: current_user[0].is_admin
                                };
                                let sql = `UPDATE users SET username = :username, password = :password, full_name = :full_name, email = :email, phone = :phone, delivery_address = :delivery_address, is_admin = :is_admin
                                            WHERE user_id = :user_id`;
                                sequelize.query(sql, {
                                    replacements: changed_user
                                }).then(result => {
                                    delete changed_user.password;
                                    res.status(200).json(changed_user);
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
                            //repetead username or email validation - only if new email or username info is sent
                            if (req.body.username !== undefined || req.body.email !== undefined) {
                                let sql = `SELECT username, password, full_name, email, phone, delivery_address, is_admin 
                                FROM users 
                                WHERE (username = ? OR email = ?) AND user_id != ?`;
                                sequelize.query(sql, {
                                    replacements: [req.body.username, req.body.email, req.params.id], type: sequelize.QueryTypes.SELECT
                                }).then(repeated_user => {
                                    //error message in case of repeated username or email
                                    if (repeated_user.length !== 0) {
                                        let email = false;
                                        let username = false;
                                        for (let i = 0; i < repeated_user.length; i++) {
                                            if (repeated_user[i].username === req.body.username) { username = true }
                                            if (repeated_user[i].email === req.body.email) { email = true }
                                        }
                                        if (email === true && username === true) {
                                            res.status(400).json(
                                                {
                                                    "error":
                                                    {
                                                        "status": "400",
                                                        "message": "user with the username: " + req.body.username + " and email: " + req.body.email + " already exists in our database"
                                                    }
                                                }
                                            )
                                        } else if (email === true) {
                                            res.status(400).json(
                                                {
                                                    "error":
                                                    {
                                                        "status": "400",
                                                        "message": "user with the email: " + req.body.email + " already exists in our database"
                                                    }
                                                }
                                            )
                                        } else {
                                            res.status(400).json(
                                                {
                                                    "error":
                                                    {
                                                        "status": "400",
                                                        "message": "user with the username: " + req.body.username + " already exists in our database"
                                                    }
                                                }
                                            )
                                        }
                                        //if not repeated update user
                                    } else {
                                        updateUser();
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
                                //if not email or username info sent user updated without the extra query
                                updateUser();
                            }
                        });
                    });
                } else {
                    res.status(404).json(
                        {
                            "error":
                            {
                                "status": "404",
                                "message": `user with the id ${req.params.id} doens't exist in our database.`
                            }
                        }
                    )
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
                        "message": "email adress sent in the request is not valid"
                    }
                }
            )
        }
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

/*-----------------DELETE A USER-----------------*/
exports.deleteOne = (req, res) => {
    if (req.user[0].user_id == req.params.id || req.user[0].is_admin === 'TRUE') {
        let sql = `DELETE FROM users 
                    WHERE user_id = ?`;
        sequelize.query(sql, {
            replacements: [req.params.id]
        }).then(deleted_user => {
            if (deleted_user[0].affectedRows === 0) {
                res.status(404).send(`Error: usuario con id ${req.params.id} no existente`);
            } else {
                res.status(200).json(`Successfully deleted user with the id: ${req.params.id}`);
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
        res.status(403).json(
            {
                "error":
                {
                    "status": "403",
                    "message": "user not authorized to delete this user"
                }
            }
        )
    }
}

/*---------------------------------------------USER LOG IN--------------------------------------------*/
exports.login = (req, res) => {
    const jwtPass = reqs.jwtPass;
    let sql = `SELECT * FROM users 
                WHERE (username = :username OR email = :email)`;
    sequelize.query(sql, {
        replacements: { username: req.body.username, email: req.body.username }, type: sequelize.QueryTypes.SELECT
    }).then(result => {
        async function checkPass() {
            const match = await reqs.bcrypt.compare(req.body.password, result[0].password);
            console.log('1:' + match);
            /*error management*/
            if (match) {
                /*token created and sent when correct data is given*/
                let user_id = result[0].user_id;
                const token = reqs.jwt.sign({
                    user_id,
                }, jwtPass);
                res.status(200).json({ token: token, user_id: user_id });
            } else {
                res.status(401).json(
                    {
                        "error":
                        {
                            "status": "401",
                            "message": "user information sent is incorrect"
                        }
                    }
                )
            }
        }
        checkPass();
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