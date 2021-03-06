const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path: 'backend/config/.env'})
const port = process.env.PORT || 8080
const connectDatabase = require('./config/database')
const coffeeRoutes = require('./routes/coffeeRoutes')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoute = require('./routes/paymentRoute')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const cookieParser = require('cookie-parser')
const path = require("path");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Coffee Shop API",
			version: "1.0.0",
			description: "Express Library API for Online Coffee Shop",
		},
		servers: [
			{
				url: "http://localhost:8080",
			},
		],
	},
	apis: ["backend/routes/*.js", "backend/models/*.js"],
};

const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

connectDatabase()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV !== "PRODUCTION") {
	dotenv.config({ path: "backend/config/.env" });
  }

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use('/api', coffeeRoutes, authRoutes, userRoutes, orderRoutes, paymentRoute)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
});

const server = app.listen(port, () => console.log(`Server running on port ${port}`))
