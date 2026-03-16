const db = require('../config/db');

class JobPosition {
  static async create({ title, location, type, department, description, requirements }) {
    const query = `
      INSERT INTO job_positions (title, location, type, department, description, requirements)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [title, location, type, department, description, requirements];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = `SELECT * FROM job_positions ORDER BY created_at DESC;`;
    const { rows } = await db.query(query);
    return rows;
  }

  static async findById(id) {
    const query = `SELECT * FROM job_positions WHERE id = $1;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async update(id, { title, location, type, department, description, requirements, is_active }) {
    const query = `
      UPDATE job_positions 
      SET title=$1, location=$2, type=$3, department=$4, description=$5, requirements=$6, is_active=$7
      WHERE id=$8
      RETURNING *;
    `;
    const values = [title, location, type, department, description, requirements, is_active, id];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async deleteById(id) {
    const query = `DELETE FROM job_positions WHERE id = $1 RETURNING *;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = JobPosition;
