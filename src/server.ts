import express from "express";
import colors from 'colors'
import router from "./router";
import db from "./config/db";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'

// Conectar a db

export const connectDB = async () => {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.bgCyan.bold('Conexión exitosa a la base de datos'))
  } catch (error) {
    console.log(error)
    console.log(colors.bgRed.white.bold('Hubo un error al conectar la base de datos'))
  }
}

connectDB()

// Instancia de express
const server = express()

// Leer datos de formularios
server.use(express.json())
server.use('/api/products', router)

//Docs

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server