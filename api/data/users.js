const { v4: uuidv4 } = require("uuid");

// id, name, email, password, phone, address, "profileImage", role, state,
// 1, 'User', 'user@gmail.com', 'password', null, null, null, 'user', 'active'
const users = [
  {
    id: uuidv4(),
    name: "Usuario",
    email: "usuario@correo.com",
    password: "123",
    phone: 231323,
    address: "San martin 324",
    profileImage: null,
    role: "user",
  },
  {
    id: uuidv4(),
    name: "User",
    email: "user@correo.com",
    password: "123",
    phone: 231323233,
    address: "calle 123",
    profileImage: null,
    role: "user",
  },
  {
    id: uuidv4(),
    name: "Soy admin",
    email: "admin@correo.com",
    password: "123",
    phone: 3234251252,
    address: "hola 123",
    profileImage: null,
    role: "admin",
  },
];

module.exports = users;
