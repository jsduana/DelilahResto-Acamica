/*---------------------------------------------ORDERS--------------------------------------------*/
module.exports = server => {
    /*-----------------REQUIREMENTS-----------------*/
    const orders = require("../controllers/orders_controllers");
    const middlewares = require("../middlewares/middlewares");
    let router = require("express").Router();

    /*-----------------ADD A ORDER-----------------*/
    router.post('/', middlewares.authenticateUser, orders.addOne);

    /*example of info to send in the body:
    {
        "payment_method": "cash",
        "products": [
            {"product_id": 7,
            "product_quantity":1},
            {"product_id": 30,
            "product_quantity":1},
            {"product_id": 40,
            "product_quantity":1}
        ]
    }
    */

    /*-----------------SEE ALL ORDERS-----------------*/
    router.get('/', middlewares.authenticateUser, orders.findAll);

    /*-----------------SEE A ORDER-----------------*/
    router.get('/:id', middlewares.authenticateUser, orders.findOne);

    /*-----------------UPDATE A ORDER-----------------*/
    router.put('/:id', middlewares.authorizateUser, orders.updateOne);

    /*example of info to send in the body:
    {
        "status": "delivered"
    }
    */

    /*-----------------DELETE A ORDER-----------------*/
    router.delete('/:id', middlewares.authorizateUser, orders.deleteOne);
 
    server.use('/orders', router);
};