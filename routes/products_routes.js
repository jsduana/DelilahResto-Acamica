/*---------------------------------------------PRODUCTS---------------------------------------------*/
module.exports = server => {
    /*-----------------REQUIREMENTS-----------------*/
    const products = require("../controllers/products_controllers");
    const middlewares = require("../middlewares/middlewares");
    let router = require("express").Router();

    /*-----------------ADD A PRODUCT-----------------*/
    router.post('/', middlewares.authorizateUser, products.addOne);

    /*example of info to send in the body:
    {
        "product_name": "Pizza grande especial",
        "abbreviation": "PizzaEsp",
        "price": 380,
        "img_url": "https://images.unsplash.com/photo-1545016803-a7e357a737e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "description": "Pizza grande especial de 8 porciones"
    }
    */

    /*-----------------SEE ALL PRODUCTS-----------------*/
    router.get('/', middlewares.authenticateUser, products.findAll);

    /*-----------------SEE A PRODUCT-----------------*/
    router.get('/:id', middlewares.authenticateUser, products.findOne);

    /*-----------------UPDATE A PRODUCT-----------------*/
    router.put('/:id', middlewares.authorizateUser, products.updateOne);

    /*example of info to send in the body:
    {
        "product_name": "Pizza grande especial",
        "abbreviation": "PizzaEsp",
        "price": 420,
        "img_url": "https://images.unsplash.com/photo-1545016803-a7e357a737e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "description": "Pizza grande especial de 8 porciones"
    }
    */

    /*-----------------DELETE A PRODUCT-----------------*/
    router.delete('/:id', middlewares.authorizateUser, products.deleteOne);

    server.use('/products', router);
};