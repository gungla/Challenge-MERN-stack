import path from 'path'
import express from 'express'
import logger from "./winston.js"
import dotenv from 'dotenv'
import colors from 'colors';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
connectDB();
colors.enable();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API se está ejecutando....')
  })
}

app.use(notFound)
app.use(errorHandler)

logger.error("Esto es un error log")
logger.warn("Esto es un error log")

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Servidor que se ejecuta en modo ${process.env.NODE_ENV} en el puerto ${PORT}`.yellow.bold
  )
)
