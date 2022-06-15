import { v4 as uuidv4 } from "uuid";
import { Product, Category, User } from "./src/models/index";

const users_uuidv4 = [];

for (let i = 0; i < 2; i++) {
  users_uuidv4.push(uuidv4());
}

console.log(users_uuidv4);

const users = [];

// id, name, email, password, phone, address, "profileImage", role, state,
// 1, 'User', 'user@gmail.com', 'password', null, null, null, 'user', 'active'
