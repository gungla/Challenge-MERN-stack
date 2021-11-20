import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// Autorizar usuario y obtener token
// POST /api/users/login
// Publica
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Correo electrónico o contraseña no válidos')
  }
})

// Registrar un nuevo usuario
// POST /api/users
// Publica
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, ci, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('El usuario ya existe')
  }

  const user = await User.create({
    name,
    email,
    ci,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      ci: user.ci,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Datos de usuario no válidos')
  }
})

// Get perfil del usuario
// GET /api/users/profile
// Privada
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      ci: user.ci,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Usuario no encontrado')
  }
})

// Update perfil de usuario
// PUT /api/users/profile
// Privada
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.ci = req.body.ci || user.ci
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      ci: updatedUser.ci,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('Usuario no encontrado')
  }
})

// Get todos los uusarios
// GET /api/users
// Privada/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// Delete usuario
// DELETE /api/users/:id
// Privada/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'Usuario eliminado' })
  } else {
    res.status(404)
    throw new Error('Usuario no encontrado')
  }
})

// Get traigo usuario por ID
// GET /api/users/:id
// Privada/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('Usuario no encontrado')
  }
})

// Update usuario
// PUT /api/users/:id
// Privada/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.ci = req.body.ci || user.ci
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      ci: updatedUser.ci,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Usuario no encontrado')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
