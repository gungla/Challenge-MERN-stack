import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@admin.com',
    ci: '12345678',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Usuario',
    email: 'usuario@usuario.com',
    ci: '12345678',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
