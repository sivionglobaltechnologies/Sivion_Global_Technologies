const db = require('../config/db');

class Quote {
  static async create({ name, email, phone, company_name, service, budget, project_details }) {
    const query = `
      INSERT INTO quote_requests (name, email, phone, company_name, service, budget, project_details)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [name, email, phone, company_name, service, budget, project_details];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = `SELECT * FROM quote_requests ORDER BY created_at DESC;`;
    const { rows } = await db.query(query);
    return rows;
  }

  static async deleteById(id) {
    const query = `DELETE FROM quote_requests WHERE id = $1 RETURNING *;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = Quote;
