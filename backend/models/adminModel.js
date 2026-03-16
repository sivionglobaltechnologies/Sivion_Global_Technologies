const db = require('../config/db');

class Admin {
  static async create({ name, email, password_hash, role = 'admin' }) {
    const query = `
      INSERT INTO admins (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at;
    `;
    const values = [name, email, password_hash, role];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = `SELECT * FROM admins WHERE email = $1;`;
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }

  static async findById(id) {
    const query = `SELECT id, name, email, role, created_at FROM admins WHERE id = $1;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = Admin;
