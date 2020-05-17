// Delilah Resto - Nodejs Server
/*---------------------------------------------REQUIREMENTS--------------------------------------------*/
const reqs = require('../config/config');

/*---------------------------------------------ROUTES--------------------------------------------*/
require('../routes/users_routes')(reqs.server);
require('../routes/products_routes')(reqs.server);
//require('../routes/orders_routes')(reqs.server);
reqs.server.get('/*', (req, res)=> {
    res.status(404).send("Error: Endpoint no existente");
})

/*---------------------------------------------LISTENER CREATED IN PORT 3000--------------------------------------------*/
reqs.server.listen("3000", () => {
	const date = new Date();
	console.log(`Delilah Resto - Server Started ${date}`);
});
