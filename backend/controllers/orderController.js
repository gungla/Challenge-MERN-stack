import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import nodemailer from 'nodemailer';

// Creo nueva orden
// POST /api/orders
// Privado
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No hay artículos en el pedido')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }

  // create transporter object with smtp server details
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREAL_MAIL,
        pass: process.env.ETHEREAL_PASS
    }
  });

  // send email
  await transporter.sendMail({
    from: process.env.GMAIL_MAIL,
    to: req.user.email,
    subject: 'Detalle de compra de MERN STACK Backend',
    html: `
      <h1>Número de orden ${req.user._id}</h1>
      <p>
        Nombre ${req.user.name} ${req.user.surname}
      </p>
      <p>
        Precio initario $ ${req.body.itemsPrice}
      </p>
      <p>
        Decuento $ ${req.body.shippingPrice}
      </p>
      <p>
        TAX $ ${req.body.taxPrice}
      </p>
      <p>
        Total $ ${req.body.totalPrice}
      </p>
      `
  });

  console.log('Envio mail al administrador con el núermo de pedido y datos a ethereal');

})

// Get traigo la orden por ID
// GET /api/orders/:id
// Privado
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Orden no encontrada')
  }
})

// Update orden para entregar
// GET /api/orders/:id/deliver
// Privada/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Orden no encontrada')
  }

  // create transporter object with smtp server details
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASS
    }
  });

  // send email
  await transporter.sendMail({
    from: req.user.email,
    to: process.env.GMAIL_MAIL,
    subject: 'Detalle de compra de MERN STACK Backend',
    html: `
      <h1>Número de orden ${req.user._id}</h1>
      <p>
       Su pedido fue completado
      </p>
      `
  });

  console.log('Envio mail al usuario avisandole que su pedido esta completado');

})

// Get pedidos de usuarios registrados
// GET /api/orders/myorders
// Privada
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// Get todas las ordenes
// GET /api/orders
// Privada/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
}
