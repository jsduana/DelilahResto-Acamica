// Delilah Resto - Nodejs Server

// Express
const express = require("express");
const server = express();

// Middlewares
const bp = require("body-parser");

// JWT
const jwt = require("jsonwebtoken");
const signature = require("./jwt");

// DB setup/connection
const { conf_db_host, conf_db_name, conf_user, conf_password, conf_port } = require("../database/db_connection_data");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(`mysql://${conf_user}:${conf_password}@${conf_db_host}:${conf_port}/${conf_db_name}`);

// Server Setup
server.use(bp.json());
server.listen("3000", () => {
	const date = new Date();
	console.log(`Delilah Resto - Server Started ${date}`);
});


// Functions & Middlewares
function generate_token(info) {
	return jwt.sign(info, signature, { expiresIn: "1h" });
}

async function validate_token(req, res, next) {
	const token = req.headers.authorization.split(" ")[1];
	try {
		const verification = jwt.verify(token, signature);
		const found_user = await get_by_param("users", "user_id", verification.id);
		const isDisabled = !!found_user.is_disabled;
		if (isDisabled) {
			res.status(401).json("Unauthorized - User account is disabled");
		} else {
			req.token_info = verification;
			next();
		}
	} catch (e) {
		res.status(401).json("Unauthorized - Invalid Token");
	}
}

function is_admin(req, res, next) {
	req.token_info.is_admin ? next() : res.status(401).json("Unauthorized - Not an admin");
}

function filter_empty_props(inputObject) {
	Object.keys(inputObject).forEach((key) => !inputObject[key] && delete inputObject[key]);
	return inputObject;
}

async function get_by_param(table, tableParam = "TRUE", inputParam = "TRUE", all = false) {
	const searchResults = await sequelize.query(`SELECT * FROM ${table} WHERE ${tableParam} = :replacementParam`, {
		replacements: { replacementParam: inputParam },
		type: QueryTypes.SELECT,
	});
	return !!searchResults.length ? (all ? searchResults : searchResults[0]) : false;
}



// Generic error detection
server.use((err, req, res, next) => {
	if (!err) return next();
	console.log("An error has occurred", err);
	res.status(500).json(err.message);
	throw err;
});



// Products
server.get("/v1/products", validate_token, async (req, res, next) => {
	const products = await get_by_param("products", "is_disabled", false, true);
	res.status(200).json(products);
});

server.post("/v1/products", validate_token, is_admin, async (req, res, next) => {
	const { name, price, img_url, description } = req.body;
	try {
		if (name && price && img_url && description) {
			const insert = await sequelize.query(
				"INSERT INTO products (name, price, img_url, description) VALUES (:name, :price, :img_url, :description)",
				{ replacements: { name, price, img_url, description } }
			);
			console.log("Product Added to database", insert);
			res.status(200).json(insert);
		} else {
			res.status(400).json("Error validating input data");
		}
	} catch (error) {
		next(new Error(error));
	}
});

server.get("/v1/products/:id", validate_token, async (req, res, next) => {
	const product_id = req.params.id;
	const product_found = await get_by_param("products", "product_id", product_id);
	product_found ? res.status(200).json(product_found) : res.status(404).json("No product matches the ID provided");
});

server.put("/v1/products/:id", validate_token, is_admin, async (req, res, next) => {
	const product_id = req.params.id;
	try {
		const product_found = await get_by_param("products", "product_id", product_id);
		if (product_found) {
			const { name, price, img_url, description, is_disabled } = req.body;
			// Filters "", null or undefined props and puts remaining into new object
			const filtered_props = filter_empty_props({ name, price, img_url, description, is_disabled });
			// Creates new object applying only the filtered Props over the previous ones
			const updatedProduct = { ...product_found, ...filtered_props };
			const update = await sequelize.query(
				"UPDATE products SET name = :name, price = :price, img_url = :img_url, description = :description, is_disabled = :is_disabled WHERE product_id = :product_id",
				{
					replacements: {
						product_id: product_id,
						name: updatedProduct.name,
						price: updatedProduct.price,
						img_url: updatedProduct.img_url,
						description: updatedProduct.description,
						is_disabled: updatedProduct.is_disabled,
					},
				}
			);
			res.status(200).json(`Product with id ${product_id} modified correctly`);
		} else {
			res.status(404).json("No product matches the ID provided");
		}
	} catch (error) {
		next(new Error(error));
	}
});

server.delete("/v1/products/:id", validate_token, is_admin, async (req, res, next) => {
	const product_id = req.params.id;
	try {
		const product_found = await get_by_param("products", "product_id", product_id);
		if (product_found) {
			const update = await sequelize.query("UPDATE products SET is_disabled = true WHERE product_id = :product_id", {
				replacements: {
					product_id: product_id,
				},
			});
			res.status(200).json(`Product with id ${product_id} was disabled correctly`);
		} else {
			res.status(404).json("No product matches the ID provided");
		}
	} catch (error) {
		next(new Error(error));
	}
});