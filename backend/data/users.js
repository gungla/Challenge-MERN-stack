import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    surname: 'App',
    age: '43',
    email: 'admin@admin.com',
    ci: '12345678',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Usuario',
    surname: 'Beta',
    age: '23',
    email: 'usuario@usuario.com',
    ci: '12345678',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
