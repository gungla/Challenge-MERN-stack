import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// Fetch todos los productos
// GET /api/products
// Publica
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// Fetch producto seleccionado por ID
// GET /api/products/:id
// Publica
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Producto no encontrado')
  }
})

// Delete un producto por ID
// DELETE /api/products/:id
// Privada/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Producto eliminado' })
  } else {
    res.status(404)
    throw new Error('Producto no encontrado')
  }
})

// Creo un producto
// POST /api/products
// Privada/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Nombre del producto',
    price: 0,
    user: req.user._id,
    image: '/images/imagen.jpg',
    brand: 'Marca',
    category: 'Categoría',
    countInStock: 0,
    numReviews: 0,
    description: 'Descripción',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// Update un producto
// PUT /api/products/:id
// Privada/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Producto no encontrado')
  }
})

// Create nueva reseña
// POST /api/products/:id/reviews
// Privada
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Producto ya reseñado')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Revisión agregada' })
  } else {
    res.status(404)
    throw new Error('Producto no encontrado')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
}