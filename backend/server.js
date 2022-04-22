const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path: 'backend/config/.env'})
const port = process.env.PORT || 8080
const connectDatabase = require('./config/database')
const greenCoffeeRoutes = require('./routes/greenCoffeeRoutes')
const roastedCoffeeRoutes = require('./routes/roastedCoffeeRoutes')
const authRoutes = require('./routes/authRoutes')

connectDatabase()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', greenCoffeeRoutes, roastedCoffeeRoutes, authRoutes)


app.listen(port, () => console.log(`Server running on port ${port}`))