import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/Connector.js';

const UserService = {
  register: async ({ email, password, name }) => {
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) throw new Error('User already exists!');

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query('INSERT INTO users (email, name, password) VALUES (?, ?, ?)', [
      email,
      name,
      hashedPassword,
    ]);

    return { id: result[0].insertId, email };
  },

  login: async ({ email, password }) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) throw new Error('User not found!');

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid password!');

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return token;
  },

  getUserById: async (id) => {
    const [rows] = await pool.query('SELECT id, email, name FROM users WHERE id = ?', [id]);
    if (rows.length === 0) throw new Error('User not found!');
    return rows[0];
  },
};

export default UserService;