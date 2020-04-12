// Delilah Resto - Nodejs Server

// Express
const express = require("express");
const server = express();

// Middlewares
const bp = require("body-parser");

// JWT
const jwt = require("jsonwebtoken");

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

// Products
server.get("/v1/products", async (req, res) => {
	const products = await sequelize.query("SELECT * FROM products", {
		type: sequelize.QueryTypes.SELECT
	});
	res.status(200).json(products);
});
