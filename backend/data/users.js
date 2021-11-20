import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Gunther',
    email: 'gglahn@gmail.com',
    ci: '12345678',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Cristian',
    email: 'cristiancinetto@gmail.com',
    ci: '12345678',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Usuario Uno',
    email: 'usuariouno@example.com',
    ci: '12345678',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Usuario Dos',
    email: 'usuariodos@example.com',
    ci: '12345678',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
