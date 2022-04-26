const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path: 'backend/config/.env'})
const port = process.env.PORT || 8080
const connectDatabase = require('./config/database')
const greenCoffeeRoutes = require('./routes/greenCoffeeRoutes')
const roastedCoffeeRoutes = require('./routes/roastedCoffeeRoutes')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

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
	apis: ["backend/routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

connectDatabase()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', greenCoffeeRoutes, roastedCoffeeRoutes, authRoutes, userRoutes)


app.listen(port, () => console.log(`Server running on port ${port}`))