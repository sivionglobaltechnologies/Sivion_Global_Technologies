const db = require('../config/db');

class Contact {
  static async create({ name, email, phone, message }) {
    const query = `
      INSERT INTO contacts (name, email, phone, message)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, email, phone, message];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = `SELECT * FROM contacts ORDER BY created_at DESC;`;
    const { rows } = await db.query(query);
    return rows;
  }

  static async deleteById(id) {
    const query = `DELETE FROM contacts WHERE id = $1 RETURNING *;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = Contact;
