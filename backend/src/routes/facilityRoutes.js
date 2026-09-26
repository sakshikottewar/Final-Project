import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT f.*, d.name AS department_name
      FROM facilities f
      LEFT JOIN departments d ON d.id = f.department_id
      ORDER BY f.id DESC
    `);
    res.json(rows);
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM facilities WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Facility not found' });
    res.json(rows[0]);
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, location, facility_type, status = 'Active', department_id } = req.body;
    if (!name || !location || !facility_type) {
      return res.status(400).json({ message: 'Name, location and facility type are required' });
    }
    const [result] = await pool.query(
      'INSERT INTO facilities (name, location, facility_type, status, department_id) VALUES (?, ?, ?, ?, ?)',
      [name, location, facility_type, status, department_id || null]
    );
    res.status(201).json({ id: result.insertId, message: 'Facility created successfully' });
  } catch (error) { next(error); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, location, facility_type, status, department_id } = req.body;
    const [result] = await pool.query(
      'UPDATE facilities SET name=?, location=?, facility_type=?, status=?, department_id=? WHERE id=?',
      [name, location, facility_type, status, department_id || null, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ message: 'Facility not found' });
    res.json({ message: 'Facility updated successfully' });
  } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM facilities WHERE id=?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Facility not found' });
    res.json({ message: 'Facility deleted successfully' });
  } catch (error) { next(error); }
});

export default router;
