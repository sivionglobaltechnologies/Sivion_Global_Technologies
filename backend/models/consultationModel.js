const db = require('../config/db');

class Consultation {
  static async create({ first_name, last_name, email, company, preferred_date, preferred_time, message }) {
    const query = `
      INSERT INTO consultations (first_name, last_name, email, company, preferred_date, preferred_time, message)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [first_name, last_name, email, company, preferred_date, preferred_time, message];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = `SELECT * FROM consultations ORDER BY created_at DESC;`;
    const { rows } = await db.query(query);
    return rows;
  }

  static async deleteById(id) {
    const query = `DELETE FROM consultations WHERE id = $1 RETURNING *;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE consultations 
      SET status = $1 
      WHERE id = $2 
      RETURNING *;
    `;
    const { rows } = await db.query(query, [status, id]);
    return rows[0];
  }
}

module.exports = Consultation;
