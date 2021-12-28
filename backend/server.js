import path from 'path'
import express from 'express'

import cors from 'cors';
import http from 'http';
import { Server } from "socket.io";

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

const PORT = process.env.PORT || 5000;
const PORT2 = process.env.PORT2 || 4004;
const NEW_MESSAGE_EVENT = "new-message-event";

const app = express();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: true,
  origins:["localhost:4004"]
});

app.use(cors());

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


const room = "Chat: Usuario - Sistema"
io.on("connection", (socket) => {
  socket.join(room);

  socket.on(NEW_MESSAGE_EVENT, (data) => {
    io.in(room).emit(NEW_MESSAGE_EVENT, data);
    console.log(NEW_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    socket.leave(room);
    console.log('Usuario desconetacado');
  });
});


app.listen(
  PORT,
  console.log(
    `Servidor que se ejecuta en modo ${process.env.NODE_ENV} en el puerto ${PORT}`.yellow.bold
  )
)


server.listen(
  PORT2,
  console.log(
    `Servidor sockets que se ejecuta en modo ${process.env.NODE_ENV} en el puerto ${PORT2}`.yellow.bold
  )
)
