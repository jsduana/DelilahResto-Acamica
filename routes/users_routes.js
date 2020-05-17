/*---------------------------------------------USERS--------------------------------------------*/
module.exports = server => {
	/*-----------------REQUIREMENTS-----------------*/
	const users = require("../controllers/users_controllers");
	const middlewares = require("../middlewares/middlewares");
	let router = require("express").Router();

	/*-----------------ADD A USER-----------------*/
	router.post('/', users.addOne);

    /*example of info to send in the body:
    {
        "username": "lsimpson",
        "password": "lisa1234",
        "full_name": "Lisa Simpson",
        "email": "lsimpson@gmail.com",
        "phone": 15112233,
        "delivery_address": "Avenida Siempreviva 742",
        "is_admin": "TRUE"
    }
    */

	/*-----------------ADD AN ADMIN-----------------*/
	router.post('/admins', middlewares.authorizateUser, users.addAdmin);

	/*-----------------SEE ALL USERS-----------------*/
	router.get('/', middlewares.authorizateUser, users.findAll)

	/*-----------------SEE A USER-----------------*/
	router.get('/:id', middlewares.authenticateUser, users.findOne);

	/*-----------------UPDATE A USER-----------------*/
	router.put('/:id', middlewares.authenticateUser, users.updateOne);

    /*example of info to send in the body:
    {
        "username": "lsimpson",
        "password": "lisa1234",
        "full_name": "Lisa Simpson",
        "email": "lsimpson@gmail.com",
        "phone": 15443322,
        "delivery_address": "Avenida Siempreviva 742"
    }
    */

	/*-----------------DELETE A USER-----------------*/
	router.delete('/:id', middlewares.authenticateUser, users.deleteOne);

	/*---------------------------------------------USER LOG IN---------------------------------------------*/
	router.post('/login', users.login)

	server.use('/users', router);
};
